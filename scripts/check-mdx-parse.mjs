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
import { fileURLToPath } from 'node:url';
import { compile } from '@mdx-js/mdx';
import remarkDirective from 'remark-directive';
import { remarkAside } from '../src/plugins/remark-aside.mjs';
import yaml from 'js-yaml';

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

// Returns a parse-error descriptor for the file's YAML frontmatter, or null if
// the frontmatter is valid / absent. @mdx-js/mdx does not validate frontmatter,
// so this closes the gap that let bad-YAML translations reach the slow build.
export function frontmatterError(content) {
  const m = content.match(/^﻿?---\r?\n([\s\S]*?)\r?\n---/);
  if (!m) return null;
  try {
    yaml.load(m[1]);
    return null;
  } catch (err) {
    return {
      message: err.message.split('\n')[0],
      // js-yaml mark line is 0-based and relative to the frontmatter body;
      // +2 maps it to the file (1 for the opening `---`, 1 for 1-based lines).
      line: err.mark ? err.mark.line + 2 : null,
      column: err.mark ? err.mark.column + 1 : null,
    };
  }
}

async function checkFile(file) {
  const content = await fs.readFile(file, 'utf-8');
  const fmErr = frontmatterError(content);
  if (fmErr) {
    return {
      file: path.relative(ROOT, file),
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
      file: path.relative(ROOT, file),
      message: err.message.split('\n')[0],
      line: err.place?.start?.line ?? null,
      column: err.place?.start?.column ?? null,
    };
  }
}

async function main() {
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
}

const isMain = process.argv[1]
  && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (isMain) {
  main();
}
