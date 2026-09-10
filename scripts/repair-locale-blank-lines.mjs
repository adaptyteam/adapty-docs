#!/usr/bin/env node
/**
 * One-off repair for locale MDX files whose block separators were lost.
 *
 * Cause: translate.mjs reassembles a file with `sections.join("\n")`, so a
 * section whose English source ends in a blank line must keep that blank line
 * in translation — it is the separator between this block and the next. Models
 * trim it. `normalizeSectionBoundaries` restores it, but until now it only ran
 * on freshly translated sections; a section already in the hash cache kept its
 * trimmed form on every later run.
 *
 * The visible damage is a table glued to the paragraph above it inside a list:
 * lazy continuation pulls the whole table into the last list item, and it
 * renders as literal `| … |` text instead of a table.
 *
 * This script rebuilds each file the way translate.mjs now does — same cached
 * translations, same guards, same join — and writes the result if it parses.
 * It calls no API and changes no wording: the cached section text is reused
 * verbatim, only boundary whitespace moves.
 *
 * Usage:
 *   node scripts/repair-locale-blank-lines.mjs --check [<file|glob> ...]
 *   node scripts/repair-locale-blank-lines.mjs --write [<file|glob> ...]
 *
 * With no paths, every file under src/locales is considered.
 */

import fs from "node:fs/promises";
import path from "node:path";
import { globSync } from "node:fs";
import {
  splitIntoSections,
  deduplicateSectionIds,
  postProcessTranslation,
} from "./translate.mjs";
import {
  normalizeSectionBoundaries,
  restoreBlankLinesBeforeBlocks,
} from "./mdx-guard.mjs";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkMdx from "remark-mdx";
import remarkGfm from "remark-gfm";

const processor = unified().use(remarkParse).use(remarkMdx).use(remarkGfm);

const ROOT = process.cwd();
const DOCS_DIR = path.join(ROOT, "src/content/docs");
const LOCALES_DIR = path.join(ROOT, "src/locales");

/** Map basename -> English source path. */
async function englishSources() {
  const map = new Map();
  for (const f of globSync("src/content/docs/**/*.mdx", { cwd: ROOT })) {
    map.set(path.basename(f, ".mdx"), path.join(ROOT, f));
  }
  return map;
}

/**
 * A table whose delimiter row survives inside a text node never became a
 * table: it was swallowed by the block above it. This is the render defect,
 * as opposed to the mere absence of a blank line, which GFM often tolerates.
 */
const DELIM_RE = /^\s*\|?\s*:?-{2,}:?\s*(\|\s*:?-{2,}:?\s*)+\|?\s*$/;

function brokenTableLines(source) {
  let tree;
  try {
    tree = processor.parse(source);
  } catch {
    return null; // unparseable — leave it to the MDX gate
  }
  const lines = [];
  (function walk(node) {
    if (node.type === "text" || node.type === "inlineCode") {
      const value = String(node.value ?? "");
      if (value.split("\n").some((l) => DELIM_RE.test(l))) {
        lines.push(node.position?.start?.line ?? 0);
      }
      return;
    }
    for (const child of node.children ?? []) walk(child);
  })(tree);
  return lines;
}

/**
 * Locate every table block in a file: the header row, the delimiter row, and
 * the body rows below it, plus the block's indentation. Fenced code is skipped.
 */
function tableBlocks(text) {
  const lines = text.split("\n");
  const blocks = [];
  let fence = null;
  for (let i = 0; i < lines.length; i++) {
    const fenceMatch = lines[i].match(/^\s*(`{3,}|~{3,})/);
    if (fenceMatch) {
      if (fence === null) fence = fenceMatch[1][0];
      else if (lines[i].trimStart()[0] === fence) fence = null;
      continue;
    }
    if (fence !== null || !DELIM_RE.test(lines[i])) continue;
    // Header row sits directly above the delimiter; body rows run below it.
    const start = i > 0 && /^\s*\|/.test(lines[i - 1]) ? i - 1 : i;
    let end = i;
    while (end + 1 < lines.length && /^\s*\|/.test(lines[end + 1])) end++;
    blocks.push({
      start,
      end,
      indent: lines[start].match(/^\s*/)[0],
    });
    i = end;
  }
  return blocks;
}

/**
 * Structural repair for files whose hash cache is incomplete, so a rebuild
 * would drop content.
 *
 * These tables lost more than the blank line above them: they also lost the
 * indentation that nests them inside a numbered list item. Restoring only the
 * blank line would end the list and reset the numbering of the steps below.
 * Both are taken from the English table at the same ordinal position — table
 * counts are verified to match first, so the pairing is unambiguous.
 */
function repairStructurally(localeText, englishText) {
  const localeBlocks = tableBlocks(localeText);
  const englishBlocks = tableBlocks(englishText);
  if (localeBlocks.length !== englishBlocks.length) {
    return { skip: `table count differs (${localeBlocks.length} vs ${englishBlocks.length})` };
  }

  const lines = localeText.split("\n");
  // Walk backwards so earlier line numbers stay valid as blank lines go in.
  for (let b = localeBlocks.length - 1; b >= 0; b--) {
    const { start, end } = localeBlocks[b];
    const indent = englishBlocks[b].indent;
    for (let i = start; i <= end; i++) {
      lines[i] = indent + lines[i].replace(/^\s*/, "");
    }
    if (start > 0 && lines[start - 1].trim() !== "") lines.splice(start, 0, "");
  }
  return { content: lines.join("\n") };
}

/** Rebuild one locale file from its hash cache, or explain why we can't. */
async function rebuild(localeFile, englishPath, lang) {
  const basename = path.basename(localeFile, ".mdx");
  const hashFile = path.join(
    path.dirname(localeFile),
    ".hashes",
    `${basename}.json`,
  );

  let stored;
  try {
    stored = JSON.parse(await fs.readFile(hashFile, "utf-8")).sections ?? {};
  } catch {
    return { skip: "no hash cache" };
  }

  const english = await fs.readFile(englishPath, "utf-8");
  const sections = deduplicateSectionIds(splitIntoSections(english));

  // Every section must be cached, or the rebuild would drop content.
  const missing = sections.filter((s) => !stored[s.id]?.translation);
  if (missing.length) {
    return { skip: `${missing.length}/${sections.length} sections uncached` };
  }

  const parts = sections.map((s) =>
    normalizeSectionBoundaries(
      restoreBlankLinesBeforeBlocks(stored[s.id].translation, s.content),
      s.content,
    ),
  );
  return { content: postProcessTranslation(parts.join("\n"), lang) };
}

async function main() {
  const args = process.argv.slice(2);
  const write = args.includes("--write");
  const paths = args.filter((a) => !a.startsWith("--"));

  const targets = (
    paths.length
      ? paths.flatMap((p) => globSync(p, { cwd: ROOT }))
      : globSync("src/locales/*/**/*.mdx", { cwd: ROOT })
  )
    .map((p) => path.join(ROOT, p))
    .filter((p) => !p.includes("/.hashes/"))
    .sort();

  const sources = await englishSources();
  const repaired = [];
  const unrepaired = [];
  const skipped = [];

  for (const file of targets) {
    const current = await fs.readFile(file, "utf-8");
    const before = brokenTableLines(current);
    if (!before || before.length === 0) continue;

    const basename = path.basename(file, ".mdx");
    const englishPath = sources.get(basename);
    if (!englishPath) {
      skipped.push([file, "no English source"]);
      continue;
    }
    const lang = path.relative(LOCALES_DIR, file).split(path.sep)[0];

    // Preferred route: rebuild from the hash cache, which reproduces exactly
    // what translate.mjs now writes. Falls back to a structural repair when
    // the cache is incomplete and a rebuild would drop content.
    let result = await rebuild(file, englishPath, lang);
    let how = "cache";
    if (result.skip) {
      const why = result.skip;
      result = repairStructurally(current, await fs.readFile(englishPath, "utf-8"));
      how = "structural";
      if (result.skip) {
        skipped.push([file, `${why}; ${result.skip}`]);
        continue;
      }
    }

    const after = brokenTableLines(result.content);
    if (after === null) {
      skipped.push([file, "rebuilt file does not parse"]);
      continue;
    }
    if (after.length >= before.length) {
      unrepaired.push([file, `${before.length} → ${after.length}`]);
      continue;
    }
    if (write) await fs.writeFile(file, result.content, "utf-8");
    repaired.push([file, `${before.length} → ${after.length}, via ${how}`]);
  }

  const rel = (f) => path.relative(ROOT, f);
  for (const [f, n] of repaired) {
    console.log(`${write ? "fixed" : "fixable"}  ${rel(f)}  (${n})`);
  }
  for (const [f, n] of unrepaired) console.log(`still broken  ${rel(f)}  (${n})`);
  for (const [f, why] of skipped) console.log(`skipped  ${rel(f)}  — ${why}`);

  console.log(
    `\n${repaired.length} ${write ? "repaired" : "repairable"}, ` +
      `${unrepaired.length} still broken, ${skipped.length} skipped`,
  );
  if (!write && repaired.length) console.log("Re-run with --write to apply.");
  process.exitCode = unrepaired.length ? 1 : 0;
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
