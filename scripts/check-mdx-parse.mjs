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
 *
 * `--repair-broken-locales` (used by translate.yml's apply job): instead of
 * failing, run the deterministic mdx-guard repairs (restore blank lines
 * dropped before block-level markup, using the English source as the
 * reference; fix invalid \' YAML escapes in frontmatter) on every broken file
 * under src/locales/ and rewrite it in place when the repair makes it
 * compile. Only files that STILL fail after repair are reverted to their last
 * committed state — together with their section-hash cache, so the next
 * translation run retries them (new files with nothing to revert to are
 * deleted). Always exits 0. This is the last-resort gate that makes it
 * impossible for the translation bot to commit a locale file that would fail
 * the production deploy's MDX parse. Broken files OUTSIDE src/locales/ are
 * reported but never touched — they came from a human commit and are the
 * deploy gate's job.
 */

import fs from 'node:fs/promises';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
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

/**
 * Map a locale content file to its translation hash-cache file, e.g.
 *   src/locales/tr/fallback-flows.mdx        → src/locales/tr/.hashes/fallback-flows.json
 *   src/locales/tr/reusable/ProfileWeb.mdx   → src/locales/tr/.hashes/reusable/ProfileWeb.json
 * Returns null for paths outside src/locales/.
 */
export function hashPathFor(localeFile) {
  const m = localeFile.match(/^(src\/locales\/[^/]+)\/(.+)\.(mdx?|md)$/);
  if (!m) return null;
  return `${m[1]}/.hashes/${m[2]}.json`;
}

/**
 * Locate the English source for a locale file. Article filenames are unique
 * across src/content/docs (URLs are derived from the filename alone), so a
 * basename match is authoritative; reusable snippets live flat under
 * src/components/reusable/. Returns an absolute path or null.
 */
async function englishSourceFor(localeFile) {
  const m = localeFile.match(/^src\/locales\/[^/]+\/(reusable\/)?([^/]+)$/);
  if (!m) return null;
  const [, isReusable, name] = m;
  if (isReusable) {
    for (const candidate of [name, name.replace(/\.md$/, '.mdx')]) {
      const p = path.join(ROOT, 'src/components/reusable', candidate);
      try { await fs.access(p); return p; } catch { /* keep looking */ }
    }
    return null;
  }
  for await (const f of walk(path.join(ROOT, 'src/content/docs'))) {
    if (path.basename(f) === name) return f;
  }
  return null;
}

/**
 * Repair broken locale files in place with the deterministic mdx-guard fixes;
 * revert (or delete, when new) only the files that still fail afterwards, so
 * the next translation run retries them. Returns the files that are broken
 * even at HEAD (they need a human).
 */
async function repairBrokenLocales(issues) {
  // Dynamic import: mdx-guard statically imports frontmatterError from this
  // file, so a static import here would create a module cycle.
  const guard = await import('./mdx-guard.mjs');
  const stillBroken = [];
  for (const issue of issues) {
    if (!issue.file.startsWith('src/locales/')) {
      console.warn(`::warning file=${issue.file}::MDX parse error outside src/locales — not touching it (fix in the source commit): ${issue.message}`);
      continue;
    }
    const abs = path.join(ROOT, issue.file);

    // 1. Repair: same pure fixes translate.mjs applies, re-run here against
    //    the English source so a gap in the translator's own gate still heals.
    let repaired = null;
    try {
      let candidate = guard.fixFrontmatterBackslashQuotes(await fs.readFile(abs, 'utf-8'));
      const englishPath = await englishSourceFor(issue.file);
      if (englishPath) {
        const english = await fs.readFile(englishPath, 'utf-8');
        candidate = guard.normalizeSectionBoundaries(
          guard.restoreBlankLinesBeforeBlocks(candidate, english),
          english,
        );
      }
      if (!(await guard.validateLocaleMdx(candidate))) repaired = candidate;
    } catch { /* unreadable — fall through to revert */ }

    if (repaired !== null) {
      await fs.writeFile(abs, repaired, 'utf-8');
      console.warn(`::warning file=${issue.file}::translated file failed MDX parse (${issue.message}) — repaired in place`);
      continue;
    }

    // 2. Revert: last resort for files the deterministic fixes can't save.
    const targets = [issue.file, hashPathFor(issue.file)].filter(Boolean);
    for (const target of targets) {
      try {
        execFileSync('git', ['checkout', 'HEAD', '--', target], { cwd: ROOT, stdio: 'pipe' });
      } catch {
        // Not tracked at HEAD (newly translated file) — delete instead.
        await fs.rm(path.join(ROOT, target), { force: true });
      }
    }
    // A reverted file can still be broken if HEAD itself is broken — surface
    // that loudly; it needs a human fix regardless of this run.
    const recheck = await checkFile(abs).catch(() => null);
    if (recheck) {
      stillBroken.push(recheck);
      console.warn(`::warning file=${issue.file}::still fails MDX parse after revert — broken at HEAD, needs a manual fix: ${recheck.message}`);
    } else {
      console.warn(`::warning file=${issue.file}::translated file failed MDX parse (${issue.message}) — unrepairable, reverted to last committed state; it will be retranslated on the next run`);
    }
  }
  return stillBroken;
}

async function main() {
  const repairMode = process.argv.includes('--repair-broken-locales');

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

  if (repairMode) {
    await repairBrokenLocales(issues);
    // Never fail in repair mode: broken locale output has been repaired or
    // rolled back, so the translation commit is safe; anything else is the
    // deploy gate's job.
    process.exit(0);
  }

  process.exit(1);
}

const isMain = process.argv[1]
  && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (isMain) {
  main();
}
