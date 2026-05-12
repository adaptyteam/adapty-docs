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
 *    can't emit their hydration chunk.
 *
 * Tag-balance checks are intentionally NOT included — JSX-aware tag
 * counting needs a real parser to avoid false positives from <Tag>
 * literals inside code blocks. The translator-prompt change covers the
 * regression class we hit with stray </details>; revisit if it recurs.
 *
 * Run: `node scripts/lint-mdx.mjs` to check.
 *      `node scripts/lint-mdx.mjs --fix` also auto-corrects rules that are
 *      mechanically safe to repair (currently: blank-line). Issues that
 *      remain after the fix pass still cause a non-zero exit. On CI
 *      failure, translate.yml uploads the runner's src/locales/ as an
 *      artifact so the translations can be recovered and repaired by hand
 *      without re-running the translator.
 */

import fs from 'node:fs/promises';
import path from 'node:path';

const ROOT = process.cwd();

// Components that need a static import even though they're auto-registered
// in the locale route — `client:load` requires a build-time module reference
// for the hydration bundle.
const CLIENT_LOAD_NEEDS_IMPORT = ['CompoundCalculator', 'SimpleCalculator'];

const FIX = process.argv.includes('--fix');

// Rules that --fix knows how to repair. Keep conservative — only add a rule
// here if the repair is deterministic and cannot alter valid content.
const FIXABLE_RULES = new Set(['blank-line', 'locale-import-drift']);

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
