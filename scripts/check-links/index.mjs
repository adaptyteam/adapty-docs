#!/usr/bin/env node

/**
 * Link checker for documentation.
 * Checks external URLs (HTTP status), internal doc links (file existence),
 * and runtime API routes (against the live site).
 *
 * Usage: node scripts/check-links/index.mjs [--external-only] [--internal-only] [--concurrency=N] [--format=html|ci]
 */

import path from 'node:path';
import { orchestrate } from './runner.mjs';
import { printConsoleSummary } from './format-console.mjs';
import { generateHtmlReport } from './format-html.mjs';
import { emitAnnotations, writeStepSummary } from './format-ci.mjs';

const args = process.argv.slice(2);

const config = {
  docsDir: path.resolve('src/content/docs'),
  liveSiteBase: 'https://adapty.io/docs',
  concurrency: parseInt(args.find(a => a.startsWith('--concurrency='))?.split('=')[1] || '25'),
  timeoutMs: 10000,
  externalOnly: args.includes('--external-only'),
  internalOnly: args.includes('--internal-only'),
};

const formatArg = args.find(a => a.startsWith('--format='))?.split('=')[1];
const isCI = !!process.env.GITHUB_ACTIONS;
const format = formatArg || (isCI ? 'ci' : 'html');

async function main() {
  const results = await orchestrate(config);

  // Always print console summary
  printConsoleSummary(results);
  console.log(`Total links: ${results.allLinks.length}`);

  if (format === 'ci') {
    emitAnnotations(results);
    await writeStepSummary({
      ...results,
      files: results.files,
      allLinks: results.allLinks,
    });
  } else {
    const outputPath = path.resolve('_temp/link-report.html');
    await generateHtmlReport(results, {
      outputPath,
      fileCount: results.files.length,
      totalLinks: results.allLinks.length,
    });
  }

  // Exit with error code if broken links found
  if (results.uniqueErrors.length > 0) {
    process.exit(1);
  }
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
