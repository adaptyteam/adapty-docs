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
 * parse. Leading whitespace is mirrored for the same reason, including the
 * indentation of the first line.
 */
export function normalizeSectionBoundaries(translation, english) {
  if (!translation || !english) return translation;
  const lead = english.match(/^[\t ]*\n(?:[\t ]*\n)*/)?.[0] ?? "";
  const trail = english.match(/(?:\n[\t ]*)+$/)?.[0] ?? "";
  let core = translation;
  core = core.replace(/^[\t ]*\n(?:[\t ]*\n)*/, "");
  core = core.replace(/(?:\n[\t ]*)+$/, "");
  // Models strip the leading indentation of a chunk's first line. Inside a
  // nested list or tab that moves the line out of its container — a
  // `        3. Select …` returned as `3. Select …` closes the surrounding
  // <TabItem> early. Restore it from the English chunk.
  const enIndent = english.slice(lead.length).match(/^[\t ]*/)[0];
  const trIndent = core.match(/^[\t ]*/)[0];
  if (enIndent.length > trIndent.length) {
    core = enIndent + core.slice(trIndent.length);
  }
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
 *   3. if `sections` are provided: repair straight quotes inside translated
 *      attribute values (`repairAttributeQuotes`) → recompile; the repaired
 *      text is the base for the fallbacks below.
 *   4. find a minimal English fallback — replace
 *      one translated section at a time with its English source and recompile.
 *      The English source is on main and gated, so it always compiles; a
 *      single bad section is by far the common case. The caller must NOT
 *      cache the replaced section (report via `fallbackSectionIds`) so the
 *      next run retries it.
 *   5. still broken → structural fallback: revert every section whose markup
 *      skeleton (`structureSignature`) differs from English, plus at most one
 *      more section, and recompile. Covers two broken sections and tags split
 *      across para-chunks, which no single swap can fix.
 *   6. still broken → give up: `ok: false`, caller must not write the file.
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
    // Deterministic attribute-quote repair: a translated attribute value that
    // quotes a UI label with straight quotes (alt="点击"保存"") ends the string
    // early. Keep the repaired text as the base for the fallbacks below.
    const quoted = sections.map((x) => ({
      ...x,
      translation: repairAttributeQuotes(x.translation, x.english),
    }));
    if (quoted.some((x, i) => x.translation !== sections[i].translation)) {
      const candidate = reassemble(quoted.map((x) => x.translation));
      const qErr = await validateLocaleMdx(candidate);
      if (!qErr) {
        console.warn(
          `  ⚠ ${label}: repaired straight quotes inside translated attribute values`,
        );
        return { ok: true, content: candidate, fallbackSectionIds: [], repaired: true };
      }
      sections = quoted;
      content = candidate;
      err = qErr;
    }

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

  if (sections && reassemble) {
    // Structural fallback: when two sections are broken, or a tag opened in one
    // para-chunk is closed in another, no single swap compiles. Revert every
    // section whose markup skeleton differs from its English source at once,
    // then, if that still fails, try one more single-section swap on top.
    const reverted = new Set(
      sections
        .filter(
          (s) =>
            s.translation !== s.english &&
            structureSignature(s.translation) !== structureSignature(s.english),
        )
        .map((s) => s.id),
    );
    if (reverted.size > 0) {
      const partsFor = (extraId) =>
        sections.map((x) =>
          reverted.has(x.id) || x.id === extraId ? x.english : x.translation,
        );
      const extras = [
        null,
        ...sections
          .filter((x) => !reverted.has(x.id) && x.translation !== x.english)
          .map((x) => x.id),
      ];
      for (const extraId of extras) {
        const candidate = reassemble(partsFor(extraId));
        if (!(await validateLocaleMdx(candidate))) {
          const ids = [...reverted, ...(extraId ? [extraId] : [])];
          console.warn(
            `  ⚠ ${label}: ${ids.length} section(s) broke the MDX parse (${err.message}) — falling back to English for ${ids.join(", ")}; they will be retranslated on the next run`,
          );
          return {
            ok: true,
            content: candidate,
            fallbackSectionIds: ids,
            repaired: true,
          };
        }
      }
    }
  }

  return { ok: false, content, error: err, fallbackSectionIds: [], repaired: false };
}

/**
 * Replace straight double quotes inside translated attribute values with
 * typographic ones (“…”).
 *
 * Only single-line JSX tags are touched, and only when the English line is the
 * same tag: the English attribute names, in order, tell us where each
 * translated value really ends — at the last `"` before the next ` name=` or
 * the tag's closing `>`/`/>`. A correct translation has no quote inside any
 * value, so it is never rewritten.
 */
export function repairAttributeQuotes(translation, english) {
  if (!translation || !english || !translation.includes('"')) return translation;
  const TAG = /^([\t ]*)<([A-Za-z][\w.]*)\s.*\/?>\s*$/;
  const ATTR = /([A-Za-z_:][\w:.-]*)=("|\{)/g;
  const enTags = new Map();
  for (const line of english.split("\n")) {
    const m = line.match(TAG);
    if (!m) continue;
    const attrs = [...line.matchAll(ATTR)].map((a) => ({ name: a[1], quoted: a[2] === '"' }));
    if (!enTags.has(m[2])) enTags.set(m[2], attrs);
  }
  if (enTags.size === 0) return translation;

  const fixLine = (line) => {
    const m = line.match(TAG);
    if (!m || !enTags.has(m[2])) return line;
    const attrs = enTags.get(m[2]);
    let out = line;
    for (let i = 0; i < attrs.length; i++) {
      if (!attrs[i].quoted) continue;
      const open = out.indexOf(` ${attrs[i].name}="`);
      if (open === -1) return line;
      const start = open + attrs[i].name.length + 3;
      let end = -1;
      const next = attrs.slice(i + 1).find((a) => out.indexOf(` ${a.name}=`, start) !== -1);
      if (next) {
        const nextAt = out.indexOf(` ${next.name}=`, start);
        end = out.lastIndexOf('"', nextAt);
      } else {
        const close = out.search(/\s*\/?>\s*$/);
        end = out.lastIndexOf('"', close);
      }
      if (end < start) return line;
      const value = out.slice(start, end);
      if (!value.includes('"')) continue;
      let openQuote = true;
      const fixed = value.replace(/"/g, () => {
        const q = openQuote ? "“" : "”";
        openQuote = !openQuote;
        return q;
      });
      out = out.slice(0, start) + fixed + out.slice(end);
    }
    return out;
  };

  return translation
    .split("\n")
    .map(fixLine)
    .join("\n");
}

/**
 * The markup skeleton of a section: every line that opens or closes a JSX
 * tag, a code fence or a `:::` directive, reduced to its indentation and the
 * marker itself. Attribute values and prose are ignored because they are
 * translated; markup and its indentation must survive translation unchanged,
 * so a translation whose skeleton differs from the English one is the
 * likely cause of a parse failure (a dropped `<Tabs>`, a de-indented
 * `</TabItem>`, a `</details>` moved past `:::`).
 */
export function structureSignature(text) {
  if (!text) return "";
  const MARKER = /^([\t ]*)(<\/?[A-Za-z][\w.]*|`{3,}|~{3,}|:{3,})/;
  const out = [];
  for (const line of text.split("\n")) {
    const m = line.match(MARKER);
    if (m) out.push(`${m[1].length}:${m[2]}`);
  }
  return out.join("\n");
}
