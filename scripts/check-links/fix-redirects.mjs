#!/usr/bin/env node

/**
 * Read the LLM link report and fix redirect URLs in source files.
 *
 * Usage:
 *   node scripts/check-links/fix-redirects.mjs [options]
 *
 * Options:
 *   --dry-run              Show what would change without writing files
 *   --report=PATH          Path to LLM report (default: _temp/link-report.md)
 *   --skip-domain=DOMAIN   Skip redirects from this domain (repeatable)
 */

import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { stripTrackingParams } from './clean-url.mjs';

const DOCS_DIR = path.resolve('src/content/docs');

function parseRedirects(reportText) {
  const redirects = [];
  let currentFile = null;
  let inStaleSection = false;

  for (const line of reportText.split('\n')) {
    if (line.startsWith('## ')) {
      inStaleSection = line === '## Stale links';
      continue;
    }
    if (!inStaleSection) continue;

    const fileMatch = line.match(/^### (.+)$/);
    if (fileMatch) {
      currentFile = fileMatch[1];
      continue;
    }

    const m = line.match(/^- Line (\d+): (.+?) — Redirected -> (.+)$/);
    if (m && currentFile) {
      redirects.push({
        file: currentFile,
        line: parseInt(m[1]),
        from: m[2],
        to: m[3],
      });
    }
  }
  return redirects;
}

async function main() {
  const args = process.argv.slice(2);
  const dryRun = args.includes('--dry-run');
  const reportPath = args.find(a => a.startsWith('--report='))?.split('=')[1] || '_temp/link-report.md';
  const skipDomains = args.filter(a => a.startsWith('--skip-domain=')).map(a => a.split('=')[1]);

  const report = await readFile(reportPath, 'utf-8');
  const redirects = parseRedirects(report);

  // Filter out skipped domains
  const filtered = redirects.filter(r => {
    try {
      const domain = new URL(r.from).hostname;
      return !skipDomains.some(sd => domain.includes(sd));
    } catch {
      return true;
    }
  });

  // Deduplicate by (file, from) to avoid double-processing
  const seen = new Set();
  const unique = filtered.filter(r => {
    const key = `${r.file}::${r.from}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });

  // Group by file
  const byFile = new Map();
  for (const r of unique) {
    if (!byFile.has(r.file)) byFile.set(r.file, []);
    byFile.get(r.file).push(r);
  }

  let totalFixed = 0;
  for (const [file, items] of byFile) {
    const filePath = path.join(DOCS_DIR, file);
    let content;
    try {
      content = await readFile(filePath, 'utf-8');
    } catch {
      console.log(`  SKIP ${file} (not found)`);
      continue;
    }

    let modified = content;
    for (const item of items) {
      const cleanTarget = stripTrackingParams(item.to);
      const escaped = item.from.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const re = new RegExp(escaped + '(?=[)"\'\\s\\]]|$)', 'g');
      if (re.test(modified)) {
        re.lastIndex = 0;
        modified = modified.replace(re, cleanTarget);
        console.log(`  ${file}:`);
        console.log(`    ${item.from}`);
        console.log(`    → ${cleanTarget}`);
        totalFixed++;
      } else {
        console.log(`  SKIP ${file}:${item.line} (URL not found in file)`);
      }
    }

    if (modified !== content && !dryRun) {
      await writeFile(filePath, modified, 'utf-8');
    }
  }

  console.log(`\n${dryRun ? 'Would fix' : 'Fixed'} ${totalFixed} redirect(s).`);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
