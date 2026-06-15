#!/usr/bin/env node
/**
 * Static checks for MDX files — runs in CI before astro build to surface
 * structural issues with a clear message instead of a deep build crash.
 *
 * Each check targets a regression class we've actually hit in production:
 *
 *  - "blank-line": MDX parser fails on the line after the last `import`
 *    if it isn't blank/another import — Acorn tries to parse prose as
 *    a JS expression and chokes on the first non-ASCII character.
 *
 *  - "missing-import": the locale route auto-registers many components,
 *    but components hydrated with `client:load` (CompoundCalculator,
 *    SimpleCalculator) need a static import in the file or the bundler
 *    can't emit their hydration chunk. Auto-fixable: --fix inserts a
 *    relative-path import after the existing import block.
 *
 *  - "reusable-missing-import": an MDX file imported as a child of another
 *    MDX page (typically `src/components/reusable/*.mdx` and its locale
 *    copies) does NOT inherit the parent route's <Content components={...}>
 *    prop. Any auto-registered component used inside must be imported
 *    explicitly. Today this rule fires when a reusable uses a `:::note`/
 *    `:::tip`/etc. directive (which remark-aside rewrites to <Callout>)
 *    without importing Callout — the build then crashes with "Expected
 *    component Callout to be defined" deep inside Astro's renderer.
 *    Auto-fixable.
 *
 * Tag-balance checks are intentionally NOT included — JSX-aware tag
 * counting needs a real parser to avoid false positives from <Tag>
 * literals inside code blocks. The translator-prompt change covers the
 * regression class we hit with stray </details>; revisit if it recurs.
 *
 * Run: `node scripts/lint-mdx.mjs` to check.
 *      `node scripts/lint-mdx.mjs --fix` also auto-corrects rules listed
 *      in FIXABLE_RULES below. Issues that remain after the fix pass
 *      still cause a non-zero exit. translate.yml runs --fix in
 *      best-effort mode (`|| true`), so any autofixable issue is repaired
 *      and committed transparently; unfixable issues fall through to the
 *      deploy workflow's lint gate.
 */

import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
// Heavy parse dependencies (@mdx-js/mdx, remark-*, js-yaml) are imported
// lazily inside parsesClean() — see note there. The strict lint gate runs in
// a dependency-free CI job (no `npm ci`), so they must NOT be imported at the
// top level or the whole script fails to load with ERR_MODULE_NOT_FOUND.

const ROOT = process.cwd();

// Components that need a static import even though they're auto-registered
// in the locale route — `client:load` requires a build-time module reference
// for the hydration bundle.
const CLIENT_LOAD_NEEDS_IMPORT = ['CompoundCalculator', 'SimpleCalculator'];

// Callout directive names handled by remark-aside. Used by
// checkReusableCalloutDirective to detect when a reusable will require an
// explicit Callout import.
const CALLOUT_DIRECTIVES = ['note', 'tip', 'info', 'warning', 'danger', 'important', 'link'];

const FIX = process.argv.includes('--fix');

// Rules that --fix knows how to repair. Keep conservative — only add a rule
// here if the repair is deterministic and cannot alter valid content.
const FIXABLE_RULES = new Set([
  'blank-line',
  'locale-import-drift',
  'missing-import',
  'reusable-missing-import',
  'nested-quote',
]);

async function* walkMdx(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const e of entries) {
    if (e.name.startsWith('.') || e.name === 'node_modules') continue;
    const full = path.join(dir, e.name);
    if (e.isDirectory()) yield* walkMdx(full);
    else if (e.isFile() && (e.name.endsWith('.mdx') || e.name.endsWith('.md'))) yield full;
  }
}

function stripCodeBlocks(content) {
  return content.replace(/```[\s\S]*?```/g, '').replace(/`[^`]*`/g, '');
}

function findImportLines(lines) {
  // Top-level imports: lines starting with `import ` before the first H2,
  // skipping anything inside fenced code blocks (e.g. Go's `import ( ... )`).
  // Also tolerate occasional leading whitespace on real imports.
  const imports = [];
  let codeFence = null;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    // Tolerate leading whitespace on fences — MDX inside JSX often indents
    // the entire content block, including code fences.
    const fence = line.match(/^\s*(`{3,}|~{3,})/);
    if (fence) {
      if (codeFence === null) codeFence = fence[1][0];
      else if (line.trimStart()[0] === codeFence) codeFence = null;
      continue;
    }
    if (codeFence !== null) continue;
    if (/^##\s/.test(line)) break;
    if (/^\s*import\s/.test(line)) imports.push({ line: i, text: line });
  }
  return imports;
}

function importedNames(importLines) {
  const names = new Set();
  for (const { text } of importLines) {
    let m = text.match(/^import\s+([A-Z][A-Za-z0-9]*)\s+from/);
    if (m) names.add(m[1]);
    m = text.match(/^import\s+\{([^}]+)\}\s+from/);
    if (m) {
      for (const n of m[1].split(',')) {
        const cleaned = n.trim().replace(/.+\s+as\s+/, '');
        if (/^[A-Z]/.test(cleaned)) names.add(cleaned);
      }
    }
  }
  return names;
}

function checkBlankAfterImports(file, lines) {
  const imports = findImportLines(lines);
  if (imports.length === 0) return [];
  const lastIdx = imports[imports.length - 1].line;
  if (lastIdx + 1 >= lines.length) return [];
  const next = lines[lastIdx + 1];
  if (next.trim() === '' || /^\s*import\s/.test(next) || /^\s*export\s/.test(next)) return [];
  return [{
    file,
    line: lastIdx + 2, // 1-indexed line of the offending content
    rule: 'blank-line',
    message: 'missing blank line between imports block and prose; MDX parser will fail on next line',
  }];
}

function checkClientLoadImports(file, content, lines) {
  const issues = [];
  const stripped = stripCodeBlocks(content);
  const importLines = findImportLines(lines);
  const imports = importedNames(importLines);
  for (const comp of CLIENT_LOAD_NEEDS_IMPORT) {
    const usesClientLoad = new RegExp(`<${comp}\\b[^>]*\\bclient:load\\b`).test(stripped);
    if (!usesClientLoad) continue;
    if (!imports.has(comp)) {
      issues.push({
        file,
        line: 0,
        rule: 'missing-import',
        message: `<${comp} client:load> used but not imported; client-hydrated components need a static import`,
        // Autofix metadata: named import, no .astro extension (matches the
        // existing convention for SimpleCalculator/CompoundCalculator).
        _autofixImportName: comp,
        _autofixModule: `src/components/${comp}`,
        _autofixDefault: false,
      });
      continue;
    }
    // Path-aware check: remark-strip-imports drops any import line that
    // contains "'@" (other than src/components/reusable/). A "present"
    // import for a client:load component is useless if it gets stripped.
    const line = importLines.find(({ text }) => text.includes(comp))?.text ?? '';
    if (line.includes("'@") && !line.includes('src/components/reusable/')) {
      issues.push({
        file,
        line: 0,
        rule: 'stripped-import',
        message: `import for ${comp} uses an '@'-aliased path; remark-strip-imports will delete it at build time. Use a relative path (e.g. '../../components/${comp}').`,
      });
    }
  }
  return issues;
}

function isReusableFile(rel) {
  return /^src\/components\/reusable\//.test(rel)
    || /^src\/locales\/[^/]+\/reusable\//.test(rel);
}

// Reusables (MDX files imported as children of other MDX) don't inherit the
// parent route's <Content components={...}> prop. remark-aside still runs on
// the imported file, so any :::callout-type directive becomes a <Callout>
// JSX element — but Callout is undefined in the imported file's scope unless
// it's explicitly imported. The Astro build then crashes deep inside MDX
// renderers ("Expected component Callout to be defined"). This rule catches
// that before deploy. Only .mdx files are checked: .md reusables go through
// Astro's plain-markdown render path (compiled to HTML at build), so the
// missing-scope failure does not apply to them.
function checkReusableCalloutDirective(file, content, lines) {
  if (!isReusableFile(file)) return [];
  if (!file.endsWith('.mdx')) return [];
  const stripped = stripCodeBlocks(content);
  const directiveRegex = new RegExp(
    `^\\s*:::(?:${CALLOUT_DIRECTIVES.join('|')})\\b`,
    'm',
  );
  if (!directiveRegex.test(stripped)) return [];
  const imports = importedNames(findImportLines(lines));
  if (imports.has('Callout')) return [];
  return [{
    file,
    line: 0,
    rule: 'reusable-missing-import',
    message:
      'reusable uses a ":::" callout directive but does not import Callout; the parent page\'s <Content components> prop does not propagate into imported MDX, so the build will fail with "Expected component Callout to be defined"',
    // Autofix metadata: default import, includes .astro extension (matches
    // the existing convention in other reusables, e.g. InstallationPrereqs).
    _autofixImportName: 'Callout',
    _autofixModule: 'src/components/Callout.astro',
    _autofixDefault: true,
  }];
}

// Cross-locale check: when a locale reusable uses a JSX component that ≥2 other
// locales of the same file import statically, but this locale doesn't, flag it.
// Translators sometimes drop the import line, and the local parse check can't
// catch it (the component is referenced as JSX and parses cleanly; the failure
// only shows up at Astro/rollup build time as "Expected component X to be defined").
//
// Comparing across locales (not against the English source) is intentional:
// the English file uses a different relative-path convention than locales.
// Other locales share the same path convention, so they're a reliable oracle.
function checkLocaleReusableImportDrift(localeReusables) {
  const issues = [];
  for (const [basename, byLocale] of localeReusables) {
    if (byLocale.size < 3) continue; // need ≥2 "others" to vote
    // Per-locale: imported component name -> import line
    const perLocaleImports = new Map();
    for (const [locale, { content }] of byLocale) {
      const lines = content.split('\n');
      const map = new Map();
      for (const { text } of findImportLines(lines)) {
        const m1 = text.match(/^\s*import\s+([A-Z][A-Za-z0-9_]*)\s+from/);
        if (m1) map.set(m1[1], text.trim());
        const m2 = text.match(/^\s*import\s+\{([^}]+)\}\s+from/);
        if (m2) for (const n of m2[1].split(',')) {
          const cleaned = n.trim().replace(/.+\s+as\s+/, '');
          if (/^[A-Z]/.test(cleaned)) map.set(cleaned, text.trim());
        }
      }
      perLocaleImports.set(locale, map);
    }
    for (const [locale, { rel, content }] of byLocale) {
      const myNames = new Set(perLocaleImports.get(locale).keys());
      const tally = new Map();
      for (const [other, imports] of perLocaleImports) {
        if (other === locale) continue;
        for (const [name, line] of imports) {
          if (!tally.has(name)) tally.set(name, { count: 0, sampleLine: line });
          tally.get(name).count++;
        }
      }
      const stripped = stripCodeBlocks(content);
      for (const [name, { count, sampleLine }] of tally) {
        if (count < 2 || myNames.has(name)) continue;
        if (!new RegExp(`<${name}\\b`).test(stripped)) continue;
        issues.push({
          file: rel,
          line: 0,
          rule: 'locale-import-drift',
          message: `<${name}> used but not imported; ${count} other locale(s) import it. Suggested: ${sampleLine}`,
          _autofixLine: sampleLine,
        });
      }
    }
  }
  return issues;
}

// Repair a double-quoted YAML frontmatter scalar whose value contains raw
// (unescaped) inner double-quotes — the translator wraps UI terms in `"` even
// when the English source uses single quotes. Converts each raw inner `"` to
// `'` (matching the English convention) and leaves the delimiters intact.
// Single-line scalars only (title/description/metadataTitle are always one line).
export function fixFrontmatterQuotes(fmText) {
  let changed = false;
  const lines = fmText.split('\n').map((line) => {
    const m = line.match(/^(\s*[\w-]+:\s*)"(.*)"(\s*)$/);
    if (!m) return line;
    const [, pre, val, post] = m;
    // Only act when a raw (non-escaped) inner quote is present.
    if (!val.replace(/\\"/g, '').includes('"')) return line;
    const fixedVal = val.replace(/\\?"/g, (q) => (q === '\\"' ? q : "'"));
    changed = true;
    return `${pre}"${fixedVal}"${post}`;
  });
  return { result: lines.join('\n'), changed };
}

// Within a single JSX tag string, convert raw inner double-quotes inside a
// double-quoted attribute value to single quotes. The real closing quote is the
// one followed (after optional whitespace) by another `name=`, by `>`/`/>`, or
// by end-of-tag; any earlier `"` is an inner quote and gets converted. Escaped
// `\"` is preserved. Returns { result, changed }.
export function fixTagAttrQuotes(tag) {
  let out = '';
  let changed = false;
  let i = 0;
  const n = tag.length;
  const prevNonSpaceIsEq = () => {
    for (let k = out.length - 1; k >= 0; k--) {
      if (/\s/.test(out[k])) continue;
      return out[k] === '=';
    }
    return false;
  };
  while (i < n) {
    if (tag[i] === '"' && prevNonSpaceIsEq()) {
      out += '"'; // opening delimiter
      i++;
      let value = '';
      while (i < n) {
        if (tag[i] === '\\' && tag[i + 1] === '"') { value += '\\"'; i += 2; continue; }
        if (tag[i] === '"') {
          // Decide whether this `"` is the real closing delimiter or a stray
          // inner quote. In valid JSX, a closed attribute value is followed
          // (after optional whitespace) by the tag close (`>` / `/>`), another
          // attribute name (`[A-Za-z_]…`, valued or boolean), or a `{…}`
          // expression/spread. Anything else (CJK, digits, punctuation — i.e.
          // continuation of the value text) means this `"` was an inner quote.
          let j = i + 1;
          while (j < n && /\s/.test(tag[j])) j++;
          const next = j < n ? tag[j] : '';
          const isBoundary = j >= n
            || next === '>' || next === '/' || next === '{'
            || /[A-Za-z_]/.test(next);
          if (isBoundary) break; // real closing quote
          value += "'"; // inner quote
          changed = true;
          i++;
          continue;
        }
        value += tag[i];
        i++;
      }
      out += `${value}"`;
      i++; // skip closing quote
      continue;
    }
    out += tag[i];
    i++;
  }
  return { result: out, changed };
}

// Apply fixTagAttrQuotes to every JSX tag in the body, line by line, skipping
// fenced code blocks so code samples are never altered. Inline-code spans are
// not specially handled because the target tags (ZoomImage/Inline alt|title)
// never appear inside backtick spans in practice.
export function fixNestedQuotesInBody(body) {
  let changed = false;
  let fence = null;
  const lines = body.split('\n').map((line) => {
    const f = line.match(/^\s*(`{3,}|~{3,})/);
    if (f) {
      if (fence === null) fence = f[1][0];
      else if (line.trimStart()[0] === fence) fence = null;
      return line;
    }
    if (fence !== null) return line;
    if (!line.includes('"')) return line;
    return line.replace(/<[A-Za-z][A-Za-z0-9]*\b[^>]*?\/?>/g, (tag) => {
      const { result, changed: c } = fixTagAttrQuotes(tag);
      if (c) changed = true;
      return result;
    });
  });
  return { result: lines.join('\n'), changed };
}

// Split a file into its frontmatter block (without fences) and body.
function splitFrontmatter(content) {
  const lines = content.split('\n');
  if (lines[0]?.trim() !== '---') return { fm: null, body: content };
  for (let i = 1; i < lines.length; i++) {
    if (lines[i].trim() === '---') {
      return {
        fm: lines.slice(1, i).join('\n'),
        fmEnd: i,
        head: lines.slice(0, i + 1).join('\n'),
        body: lines.slice(i + 1).join('\n'),
      };
    }
  }
  return { fm: null, body: content };
}

// Repair nested-quote artifacts across the whole file (frontmatter + body).
export function fixNestedQuotes(content) {
  const parts = splitFrontmatter(content);
  if (parts.fm === null) {
    return fixNestedQuotesInBody(content);
  }
  const fmFix = fixFrontmatterQuotes(parts.fm);
  const bodyFix = fixNestedQuotesInBody(parts.body);
  if (!fmFix.changed && !bodyFix.changed) return { result: content, changed: false };
  const result = `---\n${fmFix.result}\n---\n${bodyFix.result}`;
  return { result, changed: true };
}

// True if the content has valid frontmatter YAML AND compiles as MDX.
// Imports its parse dependencies lazily: this is only ever called from the
// --fix path (the translate apply job, which runs `npm ci`), never from the
// strict gate (the dependency-free Lint MDX CI job). Keeping these imports out
// of module scope is what lets the strict gate run without node_modules.
export async function parsesClean(content) {
  const [{ compile }, { default: remarkDirective }, { remarkAside }, { default: yaml }] =
    await Promise.all([
      import('@mdx-js/mdx'),
      import('remark-directive'),
      import('../src/plugins/remark-aside.mjs'),
      import('js-yaml'),
    ]);
  const parts = splitFrontmatter(content);
  if (parts.fm !== null) {
    try { yaml.load(parts.fm); } catch { return false; }
  }
  try {
    await compile(content, { jsx: true, remarkPlugins: [remarkDirective, remarkAside] });
  } catch { return false; }
  return true;
}

// Flags files containing nested-quote artifacts. Detection = "the fixer would
// change something", which only happens on genuinely broken constructs (a raw
// inner quote inside a JSX attribute or a double-quoted frontmatter scalar
// always breaks the parser). So this never fires on valid content.
function checkNestedQuotes(file, content) {
  if (!fixNestedQuotes(content).changed) return [];
  return [{
    file,
    line: 0,
    rule: 'nested-quote',
    message:
      'nested double-quote inside a JSX attribute or frontmatter scalar (translation artifact); inner " must be a single quote',
  }];
}

async function main() {
const allIssues = [];

// Map relative path → absolute path so --fix can write repaired content back.
const absByRel = new Map();

// Locale reusables, grouped by basename for cross-locale import drift check.
// shape: basename -> Map<locale, { rel, content }>
const localeReusables = new Map();

for await (const file of walkMdx(path.join(ROOT, 'src'))) {
  const rel = path.relative(ROOT, file);
  // Skip generated/build dirs and our own scripts
  if (rel.startsWith('build/') || rel.includes('/.hashes/')) continue;
  absByRel.set(rel, file);

  const content = await fs.readFile(file, 'utf-8');
  const lines = content.split('\n');

  allIssues.push(...checkBlankAfterImports(rel, lines));
  allIssues.push(...checkClientLoadImports(rel, content, lines));
  allIssues.push(...checkReusableCalloutDirective(rel, content, lines));
  allIssues.push(...checkNestedQuotes(rel, content));

  // Stash locale reusables for the cross-locale drift pass below.
  const reusableMatch = rel.match(/^src\/locales\/([^/]+)\/reusable\/(.+)\.(mdx?)$/);
  if (reusableMatch) {
    const [, locale, basename] = reusableMatch;
    if (!localeReusables.has(basename)) localeReusables.set(basename, new Map());
    localeReusables.get(basename).set(locale, { rel, content });
  }
}

allIssues.push(...checkLocaleReusableImportDrift(localeReusables));

let fixedCount = 0;
if (FIX) {
  // Group fixable issues by file so we do a single read/write per file.
  // Apply repairs in descending line order so earlier inserts don't
  // invalidate later line numbers.
  const fixableByFile = new Map();
  for (const issue of allIssues) {
    if (!FIXABLE_RULES.has(issue.rule)) continue;
    if (!fixableByFile.has(issue.file)) fixableByFile.set(issue.file, []);
    fixableByFile.get(issue.file).push(issue);
  }
  for (const [rel, issues] of fixableByFile) {
    const abs = absByRel.get(rel);
    if (!abs) continue;
    // nested-quote operates on raw content (not line indices) and uses
    // fix-then-verify: only write the repair if the result parses cleanly,
    // otherwise leave the file for the strict deploy gate to block.
    const hasNestedQuote = issues.some(i => i.rule === 'nested-quote');
    if (hasNestedQuote) {
      const original = await fs.readFile(abs, 'utf-8');
      const { result, changed } = fixNestedQuotes(original);
      if (changed && await parsesClean(result)) {
        await fs.writeFile(abs, result, 'utf-8');
        fixedCount += 1;
      }
      // A nested-quote file has no other line-based fixes queued in practice;
      // skip the rest of this iteration to avoid stale line numbers.
      continue;
    }
    const lines = (await fs.readFile(abs, 'utf-8')).split('\n');
    // locale-import-drift inserts at top-of-body; do those first so existing
    // line-numbered blank-line fixes (later in the file) stay valid.
    const driftIssues = issues.filter(i => i.rule === 'locale-import-drift');
    if (driftIssues.length > 0) {
      // Find frontmatter end: second line that is exactly "---".
      let fmEnd = -1;
      if (lines[0]?.trim() === '---') {
        for (let i = 1; i < lines.length; i++) {
          if (lines[i].trim() === '---') { fmEnd = i; break; }
        }
      }
      // Insert each missing import right after the frontmatter close (or at top
      // if no frontmatter). Order doesn't matter — all inserts go at the same
      // index, building up a contiguous block.
      const insertAt = fmEnd >= 0 ? fmEnd + 1 : 0;
      const toInsert = driftIssues.map(i => i._autofixLine);
      lines.splice(insertAt, 0, ...toInsert);
    }
    // missing-import & reusable-missing-import: append the new import to the
    // existing import block. Compute the relative module path from the file's
    // own location so the fix produces the same convention as hand-written
    // imports in that directory (locale, English source, or reusable).
    const importInserts = issues.filter(i =>
      (i.rule === 'missing-import' || i.rule === 'reusable-missing-import')
      && i._autofixImportName
    );
    for (const issue of importInserts) {
      const fileDir = path.dirname(rel);
      let mod = path.relative(fileDir, issue._autofixModule);
      if (!mod.startsWith('.')) mod = './' + mod;
      const importExpr = issue._autofixDefault
        ? issue._autofixImportName
        : `{ ${issue._autofixImportName} }`;
      const importLine = `import ${importExpr} from '${mod}';`;
      // Re-scan: drift inserts above may have shifted line indices.
      const currentImports = findImportLines(lines);
      if (currentImports.length > 0) {
        const lastIdx = currentImports[currentImports.length - 1].line;
        lines.splice(lastIdx + 1, 0, importLine);
      } else {
        let fmEnd = -1;
        if (lines[0]?.trim() === '---') {
          for (let i = 1; i < lines.length; i++) {
            if (lines[i].trim() === '---') { fmEnd = i; break; }
          }
        }
        const insertAt = fmEnd >= 0 ? fmEnd + 1 : 0;
        // Wrap with blank lines so checkBlankAfterImports stays satisfied
        // on the next run.
        const block = [];
        if (insertAt > 0 && lines[insertAt - 1]?.trim() !== '') block.push('');
        block.push(importLine);
        if (lines[insertAt]?.trim() !== '') block.push('');
        lines.splice(insertAt, 0, ...block);
      }
    }
    for (const issue of issues.filter(i => i.rule === 'blank-line').sort((a, b) => b.line - a.line)) {
      // issue.line is 1-indexed and points at the first non-blank line
      // after the imports block. Insert an empty line just before it.
      lines.splice(issue.line - 1, 0, '');
    }
    await fs.writeFile(abs, lines.join('\n'), 'utf-8');
    fixedCount += issues.length;
  }
  if (fixedCount > 0) console.log(`lint-mdx: auto-fixed ${fixedCount} issue(s).`);
}

const remainingIssues = FIX
  ? allIssues.filter(i => !FIXABLE_RULES.has(i.rule))
  : allIssues;

if (remainingIssues.length === 0) {
  console.log('lint-mdx: all files OK');
  process.exit(0);
}

console.error(`lint-mdx: found ${remainingIssues.length} ${FIX ? 'unfixable ' : ''}issue(s):`);
for (const i of remainingIssues) {
  const loc = i.line > 0 ? `${i.file}:${i.line}` : i.file;
  console.error(`  [${i.rule}] ${loc} — ${i.message}`);
}
process.exit(1);
}

const isMain = process.argv[1]
  && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (isMain) {
  main();
}
