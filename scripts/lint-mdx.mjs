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
 * Run: `node scripts/lint-mdx.mjs`
 * Exits non-zero on any error.
 */

import fs from 'node:fs/promises';
import path from 'node:path';

const ROOT = process.cwd();

// Components that need a static import even though they're auto-registered
// in the locale route — `client:load` requires a build-time module reference
// for the hydration bundle.
const CLIENT_LOAD_NEEDS_IMPORT = ['CompoundCalculator', 'SimpleCalculator'];

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
  const imports = importedNames(findImportLines(lines));
  for (const comp of CLIENT_LOAD_NEEDS_IMPORT) {
    const usesClientLoad = new RegExp(`<${comp}\\b[^>]*\\bclient:load\\b`).test(stripped);
    if (usesClientLoad && !imports.has(comp)) {
      issues.push({
        file,
        line: 0,
        rule: 'missing-import',
        message: `<${comp} client:load> used but not imported; client-hydrated components need a static import`,
      });
    }
  }
  return issues;
}

const allIssues = [];

for await (const file of walkMdx(path.join(ROOT, 'src'))) {
  const rel = path.relative(ROOT, file);
  // Skip generated/build dirs and our own scripts
  if (rel.startsWith('build/') || rel.includes('/.hashes/')) continue;

  const content = await fs.readFile(file, 'utf-8');
  const lines = content.split('\n');

  allIssues.push(...checkBlankAfterImports(rel, lines));
  allIssues.push(...checkClientLoadImports(rel, content, lines));
}

if (allIssues.length === 0) {
  console.log('lint-mdx: all files OK');
  process.exit(0);
}

console.error(`lint-mdx: found ${allIssues.length} issue(s):`);
for (const i of allIssues) {
  const loc = i.line > 0 ? `${i.file}:${i.line}` : i.file;
  console.error(`  [${i.rule}] ${loc} — ${i.message}`);
}
process.exit(1);
