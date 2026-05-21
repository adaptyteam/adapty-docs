#!/usr/bin/env node
/**
 * MDX parse sweep — compiles every .mdx in the content tree using Astro's
 * MDX-relevant remark plugins (remark-directive, remark-aside) and reports
 * every parse error in one pass instead of bailing at the first.
 *
 * Why: Astro's locale builds halt at the first MDX parse error and surface
 * a single failure per CI run. When several broken files exist (typical
 * after a buggy translator pass), only one is visible; the rest stay
 * hidden until each preceding error is fixed and the deploy retried. This
 * check surfaces the whole set up front.
 *
 * Run: `node scripts/check-mdx-parse.mjs`
 * Exits non-zero if any file fails to compile.
 */

import fs from 'node:fs/promises';
import path from 'node:path';
import { compile } from '@mdx-js/mdx';
import remarkDirective from 'remark-directive';
import { remarkAside } from '../src/plugins/remark-aside.mjs';

const ROOT = process.cwd();
const SCAN_DIRS = ['src/content/docs', 'src/locales', 'src/components/reusable'];

// Compile in chunks to avoid spinning up too many parsers in parallel on
// constrained CI runners.
const CONCURRENCY = 8;

async function* walk(dir) {
  let entries;
  try {
    entries = await fs.readdir(dir, { withFileTypes: true });
  } catch {
    return;
  }
  for (const e of entries) {
    if (e.name.startsWith('.') || e.name === 'node_modules') continue;
    const full = path.join(dir, e.name);
    if (e.isDirectory()) yield* walk(full);
    else if (e.isFile() && full.endsWith('.mdx')) yield full;
  }
}

async function checkFile(file) {
  try {
    await compile(await fs.readFile(file, 'utf-8'), {
      jsx: true,
      remarkPlugins: [remarkDirective, remarkAside],
    });
    return null;
  } catch (err) {
    return {
      file: path.relative(ROOT, file),
      message: err.message.split('\n')[0],
      line: err.place?.start?.line ?? null,
      column: err.place?.start?.column ?? null,
    };
  }
}

const files = [];
for (const dir of SCAN_DIRS) {
  for await (const f of walk(path.join(ROOT, dir))) files.push(f);
}

const issues = [];
for (let i = 0; i < files.length; i += CONCURRENCY) {
  const chunk = files.slice(i, i + CONCURRENCY);
  const results = await Promise.all(chunk.map(checkFile));
  for (const r of results) if (r) issues.push(r);
}

issues.sort((a, b) => a.file.localeCompare(b.file));

if (issues.length === 0) {
  console.log(`check-mdx-parse: ${files.length} file(s) parsed cleanly`);
  process.exit(0);
}

console.error(`check-mdx-parse: ${files.length} scanned, ${issues.length} parse error(s):\n`);
for (const i of issues) {
  const loc = i.line ? `${i.file}:${i.line}${i.column ? ':' + i.column : ''}` : i.file;
  console.error(`  ${loc}`);
  console.error(`    ${i.message}\n`);
}
process.exit(1);
