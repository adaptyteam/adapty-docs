#!/usr/bin/env node

/**
 * Audit external links: find pages that don't expose IDs in raw HTML.
 * Groups results by domain and page, showing ID count per page.
 *
 * Usage: node scripts/check-links/audit-js-pages.mjs
 */

import { readFile } from 'node:fs/promises';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { getAllDocFiles, extractLinks, categorizeLinks } from './scan.mjs';
import { BROWSER_HEADERS } from './check-external.mjs';

const execFileAsync = promisify(execFile);

const ID_THRESHOLD = 5; // pages with fewer IDs than this are considered JS shells

async function countIdsOnPage(url, timeoutMs = 15000) {
  try {
    const headerArgs = Object.entries(BROWSER_HEADERS).flatMap(([k, v]) => ['-H', `${k}: ${v}`]);
    const { stdout } = await execFileAsync('curl', [
      '-L', '-s', '--compressed',
      '--max-redirs', '20',
      '--max-time', String(timeoutMs / 1000),
      '-b', '',
      ...headerArgs,
      url,
    ], { maxBuffer: 10 * 1024 * 1024 });
    const ids = stdout.match(/id=["'][^"']+["']/gi) || [];
    return { ids: ids.length, size: stdout.length };
  } catch {
    return { ids: -1, size: 0, error: true };
  }
}

async function main() {
  const docsDir = 'src/content/docs';
  console.log('Scanning docs...');
  const files = await getAllDocFiles(docsDir);

  const allLinks = [];
  for (const f of files) {
    const content = await readFile(f, 'utf-8');
    allLinks.push(...extractLinks(content, f, docsDir));
  }

  const { externalLinks } = categorizeLinks(allLinks);

  // Find external links with anchors
  const withAnchors = externalLinks.filter(l => /#[^/]/.test(l.url) && !/#:~:text=/.test(l.url));
  const uniquePages = new Map(); // pageUrl -> Set of anchors

  for (const link of withAnchors) {
    const [pageUrl, anchor] = link.url.split('#');
    if (!anchor) continue;
    if (!uniquePages.has(pageUrl)) uniquePages.set(pageUrl, new Set());
    uniquePages.get(pageUrl).add(anchor);
  }

  console.log(`Found ${uniquePages.size} unique external pages with anchored links\n`);

  // Check each page
  const results = [];
  let i = 0;
  for (const [pageUrl, anchors] of uniquePages) {
    i++;
    process.stdout.write(`[${i}/${uniquePages.size}] ${pageUrl}\r`);
    const { ids, size, error } = await countIdsOnPage(pageUrl);
    results.push({ pageUrl, anchors: [...anchors], ids, size, error });
  }

  console.log('\n');

  // Group by domain
  const byDomain = new Map();
  for (const r of results) {
    const domain = new URL(r.pageUrl).hostname;
    if (!byDomain.has(domain)) byDomain.set(domain, []);
    byDomain.get(domain).push(r);
  }

  // Print results sorted by ID count
  console.log('=== Pages with few or no IDs in raw HTML ===\n');
  const jsShells = results.filter(r => r.ids >= 0 && r.ids < ID_THRESHOLD);
  if (jsShells.length === 0) {
    console.log('None found.\n');
  } else {
    for (const r of jsShells.sort((a, b) => a.ids - b.ids)) {
      console.log(`${r.ids} IDs (${r.size} bytes) — ${r.pageUrl}`);
      for (const a of r.anchors) console.log(`  #${a}`);
    }
  }

  console.log('\n=== Pages with IDs but anchor not found ===\n');
  const richPages = results.filter(r => r.ids >= ID_THRESHOLD);
  for (const r of richPages.sort((a, b) => a.ids - b.ids)) {
    console.log(`${r.ids} IDs — ${r.pageUrl}`);
    for (const a of r.anchors) console.log(`  #${a}`);
  }

  console.log('\n=== Errors (could not fetch) ===\n');
  const errored = results.filter(r => r.error);
  if (errored.length === 0) {
    console.log('None.\n');
  } else {
    for (const r of errored) {
      console.log(`${r.pageUrl}`);
    }
  }

  // Summary
  console.log('\n=== Summary ===');
  console.log(`Total pages with anchored links: ${results.length}`);
  console.log(`JS shells (< ${ID_THRESHOLD} IDs): ${jsShells.length}`);
  console.log(`Rich HTML (>= ${ID_THRESHOLD} IDs): ${richPages.length}`);
  console.log(`Errors: ${errored.length}`);
}

main().catch(err => {
  console.error('Fatal:', err);
  process.exit(1);
});
