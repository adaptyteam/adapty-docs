import { readFile } from 'node:fs/promises';
import { getAllDocFiles, extractLinks, categorizeLinks } from './scan.mjs';
import { checkExternalUrl } from './check-external.mjs';
import { checkInternalLink, isLoginRedirect } from './check-internal.mjs';
import { classifyResults } from './classify.mjs';

async function runWithConcurrency(tasks, limit) {
  const results = [];
  let index = 0;

  async function worker() {
    while (index < tasks.length) {
      const i = index++;
      results[i] = await tasks[i]();
    }
  }

  const workers = Array.from({ length: Math.min(limit, tasks.length) }, () => worker());
  await Promise.all(workers);
  return results;
}

/**
 * Main orchestration pipeline.
 * Returns { files, allLinks, uniqueErrors, uniqueWarnings, manualCheckList }.
 */
export async function orchestrate(config) {
  const { docsDir, liveSiteBase, concurrency, timeoutMs, externalOnly, internalOnly } = config;

  console.log('Scanning docs directory...');
  const files = await getAllDocFiles(docsDir);
  console.log(`Found ${files.length} doc files.`);

  const allLinks = [];
  for (const file of files) {
    const content = await readFile(file, 'utf-8');
    allLinks.push(...extractLinks(content, file, docsDir));
  }
  console.log(`Found ${allLinks.length} total links.`);

  const { externalLinks, internalLinks } = categorizeLinks(allLinks);

  const uniqueExternalUrls = [...new Set(externalLinks.map(l => l.url))];
  const uniqueInternalUrls = [...new Set(internalLinks.map(l => l.url))];

  console.log(`\nExternal URLs: ${uniqueExternalUrls.length} unique (${externalLinks.length} total references)`);
  console.log(`Internal links: ${uniqueInternalUrls.length} unique (${internalLinks.length} total references)\n`);

  const errors = [];
  const warnings = [];

  // External checks
  if (!internalOnly) {
    console.log(`Checking ${uniqueExternalUrls.length} external URLs (concurrency: ${concurrency})...`);
    const externalResults = new Map();

    const tasks = uniqueExternalUrls.map(url => async () => {
      const result = await checkExternalUrl(url, timeoutMs);
      externalResults.set(url, result);
      if (!result.ok) process.stdout.write('x');
      else if (result.botProtected || result.rateLimited) process.stdout.write('!');
      else if (result.redirect || result.anchorMissing) process.stdout.write('~');
      else process.stdout.write('.');
    });

    await runWithConcurrency(tasks, concurrency);
    console.log('\n');

    for (const link of externalLinks) {
      const result = externalResults.get(link.url);
      if (!result) continue;
      if (!result.ok) {
        errors.push({ ...link, type: 'external', status: result.status, error: result.error });
      } else if (result.botProtected) {
        warnings.push({ ...link, type: 'external', severity: 'bot-protected', status: result.status });
      } else if (result.rateLimited) {
        warnings.push({ ...link, type: 'external', severity: 'rate-limited', status: result.status });
      } else if (result.anchorMissing) {
        warnings.push({ ...link, type: 'external', severity: 'anchor', anchor: result.anchorMissing });
      } else if (result.redirect) {
        const severity = isLoginRedirect(result.redirect) ? 'login' : 'redirect';
        warnings.push({ ...link, type: 'external', severity, redirect: result.redirect });
      }
    }
  }

  // Internal checks
  if (!externalOnly) {
    console.log(`Checking ${uniqueInternalUrls.length} internal links...`);
    const internalResults = new Map();

    for (const url of uniqueInternalUrls) {
      const result = await checkInternalLink(url, { docsDir, liveSiteBase, timeoutMs });
      internalResults.set(url, result);
    }

    for (const link of internalLinks) {
      const result = internalResults.get(link.url);
      if (!result) continue;
      if (!result.ok) {
        errors.push({ ...link, type: 'internal', status: result.status, error: result.error });
      } else if (result.internalRedirect) {
        warnings.push({ ...link, type: 'internal', severity: 'internal-redirect', redirect: result.internalRedirect });
      } else if (result.anchorMissing) {
        warnings.push({ ...link, type: 'internal', severity: 'anchor', anchor: result.anchorMissing });
      } else if (result.redirect) {
        warnings.push({ ...link, type: 'internal', severity: 'redirect', redirect: result.redirect });
      }
    }
    console.log('Done.\n');
  }

  const { uniqueErrors, uniqueWarnings, manualCheckList } = classifyResults(errors, warnings);

  return { files, allLinks, uniqueErrors, uniqueWarnings, manualCheckList };
}
