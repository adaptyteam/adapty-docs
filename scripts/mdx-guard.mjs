/**
 * MDX guard — compile-validation and deterministic structure repair for
 * translated locale files.
 *
 * translate.mjs is the only writer of src/locales/**&#47;*.mdx, but until this
 * module existed nothing compiled its output before it was committed: the
 * first MDX parse happened at the production deploy gate, AFTER the broken
 * file had landed on main (runs 29109077335, 29119534029). This module lets
 * the translator validate every file it is about to write and repair the two
 * recurring failure classes deterministically:
 *
 *   1. Dropped structural blank lines. Models trim blank lines that MDX
 *      treats as block separators — most often between a list/paragraph and
 *      a following column-0 JSX block (`<div style={{…`), producing
 *      "Unexpected lazy line in expression in container". Because the JSX
 *      line itself is preserved verbatim by translation, the English section
 *      tells us exactly which lines require a blank line above them.
 *
 *   2. Invalid YAML escapes in frontmatter. Translations of values with
 *      apostrophes come back as `'flow\'lar'` — backslash-escaping is not
 *      valid YAML in single- OR double-quoted scalars, so the frontmatter
 *      fails to parse.
 *
 * Everything here is pure (content in → content out) so it is unit-testable
 * without the Anthropic client. The compile mirrors scripts/check-mdx-parse.mjs
 * exactly — same plugins, same options — so "valid here" means "valid at the
 * deploy gate".
 */

import { compile } from "@mdx-js/mdx";
import remarkDirective from "remark-directive";
import { remarkAside } from "../src/plugins/remark-aside.mjs";
import { frontmatterError } from "./check-mdx-parse.mjs";

/**
 * Compile `content` the same way the deploy gate does. Returns null when the
 * file is valid, or `{ message, line, column }` for the first error.
 */
export async function validateLocaleMdx(content) {
  const fmErr = frontmatterError(content);
  if (fmErr) {
    return {
      message: `frontmatter: ${fmErr.message}`,
      line: fmErr.line,
      column: fmErr.column,
    };
  }
  try {
    await compile(content, {
      jsx: true,
      remarkPlugins: [remarkDirective, remarkAside],
    });
    return null;
  } catch (err) {
    return {
      message: err.message.split("\n")[0],
      line: err.place?.start?.line ?? null,
      column: err.place?.start?.column ?? null,
    };
  }
}

/**
 * Restore the section's boundary whitespace from the English source.
 *
 * Sections are reassembled with `parts.join("\n")`, so a section whose English
 * content ends in a blank line MUST keep that blank line in translation — it
 * is the block separator between this section and the next. Models routinely
 * trim it, which glues a list to the next section's `<div …>` and breaks the
 * parse. Leading whitespace is mirrored for the same reason.
 */
export function normalizeSectionBoundaries(translation, english) {
  if (!translation || !english) return translation;
  const lead = english.match(/^[\t ]*\n(?:[\t ]*\n)*/)?.[0] ?? "";
  const trail = english.match(/(?:\n[\t ]*)+$/)?.[0] ?? "";
  let core = translation;
  core = core.replace(/^[\t ]*\n(?:[\t ]*\n)*/, "");
  core = core.replace(/(?:\n[\t ]*)+$/, "");
  return lead + core + trail;
}

/**
 * Re-insert blank lines the model dropped above block-level markup.
 *
 * For every line in the ENGLISH section that (a) starts a column-0 JSX block
 * (`<Tag`/`</Tag`), an import, or a `:::` directive fence, (b) is preceded by
 * a blank line in English, and (c) is unique within the English section, find
 * the identical line in the translation and make sure it has a blank line
 * above it too. Markup lines survive translation byte-for-byte (the prompt
 * requires it), so exact-match is reliable; the uniqueness requirement keeps
 * the transform conservative.
 */
export function restoreBlankLinesBeforeBlocks(translation, english) {
  if (!translation || !english) return translation;
  const BLOCK_RE = /^(<[A-Za-z/]|:{3}|import\s)/;

  const enLines = english.split("\n");
  const counts = new Map();
  for (const l of enLines) counts.set(l, (counts.get(l) ?? 0) + 1);

  const needBlankAbove = new Set();
  for (let i = 1; i < enLines.length; i++) {
    if (
      BLOCK_RE.test(enLines[i]) &&
      enLines[i - 1].trim() === "" &&
      counts.get(enLines[i]) === 1
    ) {
      needBlankAbove.add(enLines[i]);
    }
  }
  if (needBlankAbove.size === 0) return translation;

  const trLines = translation.split("\n");
  // Only lines unique in the translation too — a duplicated line there means
  // we can't tell which occurrence corresponds to the English one.
  const trCounts = new Map();
  for (const l of trLines) trCounts.set(l, (trCounts.get(l) ?? 0) + 1);

  const out = [];
  for (let i = 0; i < trLines.length; i++) {
    const line = trLines[i];
    if (
      i > 0 &&
      needBlankAbove.has(line) &&
      trCounts.get(line) === 1 &&
      out[out.length - 1].trim() !== ""
    ) {
      out.push("");
    }
    out.push(line);
  }
  return out.join("\n");
}

/**
 * Repair invalid backslash-escaped apostrophes in YAML frontmatter.
 *
 * `keywords: ['flow\'lar']` is invalid YAML: single-quoted scalars escape a
 * quote by doubling it (`''`), and double-quoted scalars have no \' escape
 * either. Try the two spellings that could have been intended and keep the
 * first one that parses. Returns the (possibly unchanged) content.
 */
export function fixFrontmatterBackslashQuotes(content) {
  const m = content.match(/^(﻿?---\r?\n)([\s\S]*?)(\r?\n---)/);
  if (!m || !m[2].includes("\\'")) return content;
  const [, open, fm, close] = m;
  const candidates = [
    fm.replace(/\\'/g, "''"), // single-quoted scalar: '' is the escape
    fm.replace(/\\'/g, "'"), // double-quoted scalar: bare ' is fine
  ];
  for (const candidate of candidates) {
    const patched =
      open + candidate + close + content.slice(m[0].length);
    if (!frontmatterError(patched)) return patched;
  }
  return content;
}

/**
 * Validate-and-repair ladder for a fully reconstructed locale file.
 *
 * Steps, cheapest first:
 *   1. compile → already valid? done.
 *   2. deterministic frontmatter repair → recompile.
 *   3. if `sections` are provided: find a minimal English fallback — replace
 *      one translated section at a time with its English source and recompile.
 *      The English source is on main and gated, so it always compiles; a
 *      single bad section is by far the common case. The caller must NOT
 *      cache the replaced section (report via `fallbackSectionIds`) so the
 *      next run retries it.
 *   4. still broken → give up: `ok: false`, caller must not write the file.
 *
 * `reassemble(parts)` maps section parts back to a full file (including
 * postProcessTranslation), so the ladder validates exactly what would be
 * written to disk.
 */
export async function repairLocaleMdx({
  content,
  sections = null,
  reassemble = null,
  label = "",
}) {
  let err = await validateLocaleMdx(content);
  if (!err) return { ok: true, content, fallbackSectionIds: [], repaired: false };

  const fmFixed = fixFrontmatterBackslashQuotes(content);
  if (fmFixed !== content) {
    const fmErr = await validateLocaleMdx(fmFixed);
    if (!fmErr) {
      console.warn(
        `  ⚠ ${label}: repaired invalid \\' escape in frontmatter YAML`,
      );
      return { ok: true, content: fmFixed, fallbackSectionIds: [], repaired: true };
    }
    content = fmFixed;
    err = fmErr;
  }

  if (sections && reassemble) {
    // Single-section English fallback: try replacing each translated section
    // with its English source, one at a time.
    for (let i = 0; i < sections.length; i++) {
      const s = sections[i];
      if (s.translation === s.english) continue; // already English
      const parts = sections.map((x, j) =>
        j === i ? x.english : x.translation,
      );
      const candidate = reassemble(parts);
      if (!(await validateLocaleMdx(candidate))) {
        console.warn(
          `  ⚠ ${label}: section '${s.id}' broke the MDX parse (${err.message}) — falling back to English for that section; it will be retranslated on the next run`,
        );
        return {
          ok: true,
          content: candidate,
          fallbackSectionIds: [s.id],
          repaired: true,
        };
      }
    }
  }

  return { ok: false, content, error: err, fallbackSectionIds: [], repaired: false };
}
