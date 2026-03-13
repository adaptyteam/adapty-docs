import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { getAllDocFiles, extractLinks, extractReusableImports, categorizeLinks } from './scan.mjs';
import { checkExternalUrl } from './check-external.mjs';
import { checkInternalLink, isLoginRedirect, isCaptchaRedirect } from './check-internal.mjs';
import { classifyResults } from './classify.mjs';
import { loadWhitelist } from './whitelist.mjs';

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
 * Returns { files, allLinks, uniqueErrors, uniqueWarnings, manualCheckList, whitelistedWarnings }.
 */
export async function orchestrate(config) {
  const { docsDir, liveSiteBase, concurrency, timeoutMs, externalOnly, internalOnly } = config;

  const reusableDir = 'src/components/reusable';

  console.log('Scanning docs directory...');
  const docFiles = await getAllDocFiles(docsDir);
  const reusableFiles = await getAllDocFiles(reusableDir);
  const files = [...docFiles, ...reusableFiles];
  console.log(`Found ${docFiles.length} doc files + ${reusableFiles.length} reusable snippets.`);

  // Build reverse map: reusable filename → [article slug, ...]
  const reusableImporters = new Map();

  const allLinks = [];
  for (const file of docFiles) {
    const content = await readFile(file, 'utf-8');
    allLinks.push(...extractLinks(content, file, docsDir));

    const imports = extractReusableImports(content);
    const slug = path.basename(file).replace(/\.(md|mdx)$/, '');
    for (const reusableFile of imports) {
      if (!reusableImporters.has(reusableFile)) reusableImporters.set(reusableFile, []);
      reusableImporters.get(reusableFile).push(slug);
    }
  }
  const reusableFileNames = new Set();
  for (const file of reusableFiles) {
    const content = await readFile(file, 'utf-8');
    allLinks.push(...extractLinks(content, file, reusableDir));
    reusableFileNames.add(path.basename(file));
  }
  console.log(`Found ${allLinks.length} total links.`);

  const { externalLinks, internalLinks } = categorizeLinks(allLinks);

  const uniqueExternalUrls = [...new Set(externalLinks.map(l => l.url))];
  const uniqueInternalUrls = [...new Set(internalLinks.map(l => l.url))];

  console.log(`\nExternal URLs: ${uniqueExternalUrls.length} unique (${externalLinks.length} total references)`);
  console.log(`Internal links: ${uniqueInternalUrls.length} unique (${internalLinks.length} total references)\n`);

  const errors = [];
  const warnings = [];

  // Flag external links to our own docs — these should be internal links
  // Exclude: llms*.txt, *.md files (used in AI tool instructions), and API reference routes
  const SELF_DOCS_RE = /^https?:\/\/(www\.)?adapty\.io\/docs(\/|$)/;
  const SELF_LINK_EXCEPTIONS = /\.(txt|md)$|\/api-adapty\/|\/api-web\/|\/api-export-analytics\//;
  for (const link of externalLinks) {
    if (SELF_DOCS_RE.test(link.url) && !SELF_LINK_EXCEPTIONS.test(link.url)) {
      errors.push({ ...link, type: 'external', status: 'SELF_LINK', error: 'Use an internal link instead of a full URL to adapty.io/docs' });
    }
  }

  // External checks
  if (!internalOnly) {
    const selfLinkUrls = new Set(errors.filter(e => e.status === 'SELF_LINK').map(e => e.url));
    const externalUrlsToCheck = uniqueExternalUrls.filter(url => !selfLinkUrls.has(url));
    console.log(`Checking ${externalUrlsToCheck.length} external URLs (concurrency: ${concurrency})...`);
    const externalResults = new Map();

    const tasks = externalUrlsToCheck.map(url => async () => {
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
        const severity = isCaptchaRedirect(result.redirect) ? 'bot-protected'
          : isLoginRedirect(result.redirect) ? 'login'
          : result.localeRedirect ? 'locale-redirect' : 'redirect';
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

  const whitelist = await loadWhitelist();
  const { uniqueErrors, uniqueWarnings, manualCheckList, whitelistedWarnings } = classifyResults(errors, warnings, whitelist);

  return { files, allLinks, uniqueErrors, uniqueWarnings, manualCheckList, whitelistedWarnings, reusableImporters, reusableFileNames, docsDir, reusableDir: path.resolve(reusableDir) };
}
