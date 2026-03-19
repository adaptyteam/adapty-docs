/**
 * Main orchestration pipeline for the link checker.
 *
 * Pipeline stages:
 *   1. Scan — collect all files and extract links
 *   2. Lint  — flag structural issues (self-links, .md extensions)
 *   3. Check — verify external URLs and internal doc links
 *   4. Classify — deduplicate, whitelist, and categorize results
 */

import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { getAllDocFiles, extractLinks, extractReusableImports, categorizeLinks } from './scan.mjs';
import { checkExternalUrl, closeBrowser } from './check-external.mjs';
import { checkInternalLink, isLoginRedirect, isCaptchaRedirect } from './check-internal.mjs';
import { classifyResults } from './classify.mjs';
import { loadConfig } from './config.mjs';

// ── Concurrency helper ───────────────────────────────────────────

async function runWithConcurrency(tasks, limit) {
  const results = [];
  let index = 0;

  async function worker() {
    while (index < tasks.length) {
      const i = index++;
      results[i] = await tasks[i]();
    }
  }

  await Promise.all(
    Array.from({ length: Math.min(limit, tasks.length) }, () => worker()),
  );
  return results;
}

// ── Stage 1: Scan ────────────────────────────────────────────────

async function scanFiles(docsDir) {
  const reusableDir = 'src/components/reusable';

  console.log('Scanning docs directory...');
  const docFiles = await getAllDocFiles(docsDir);
  const reusableFiles = await getAllDocFiles(reusableDir);
  console.log(`Found ${docFiles.length} doc files + ${reusableFiles.length} reusable snippets.`);

  const reusableImporters = new Map();
  const reusableFileNames = new Set();
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

  return {
    files: [...docFiles, ...reusableFiles],
    allLinks,
    externalLinks, internalLinks,
    uniqueExternalUrls, uniqueInternalUrls,
    reusableImporters, reusableFileNames,
    docsDir, reusableDir: path.resolve(reusableDir),
  };
}

// ── Stage 2: Lint rules ──────────────────────────────────────────

function lintLinks(externalLinks, internalLinks) {
  const errors = [];
  const warnings = [];

  // Internal links should not use .md/.mdx extensions
  const MD_EXT_RE = /\.(md|mdx)(#|$)/;
  const mdExtUrls = new Set();
  for (const link of internalLinks) {
    if (MD_EXT_RE.test(link.url)) {
      warnings.push({ ...link, type: 'internal', severity: 'md-extension', error: 'Remove .md/.mdx extension from internal link' });
      mdExtUrls.add(link.url);
    }
  }

  // External links to our own docs should be internal links
  const SELF_DOCS_RE = /^https?:\/\/(www\.)?adapty\.io\/docs(\/|$)/;
  const SELF_LINK_EXCEPTIONS = /\.(txt|md)$|\/api-adapty\/|\/api-web\/|\/api-export-analytics\//;
  for (const link of externalLinks) {
    if (SELF_DOCS_RE.test(link.url) && !SELF_LINK_EXCEPTIONS.test(link.url)) {
      errors.push({ ...link, type: 'external', status: 'SELF_LINK', error: 'Use an internal link instead of a full URL to adapty.io/docs' });
    }
  }

  return { errors, warnings, mdExtUrls };
}

// ── Stage 3a: External checks ────────────────────────────────────

async function checkExternal(uniqueUrls, allLinks, existingErrors, { concurrency, timeoutMs, jsRendered }) {
  const selfLinkUrls = new Set(existingErrors.filter(e => e.status === 'SELF_LINK').map(e => e.url));
  const urlsToCheck = uniqueUrls.filter(url => !selfLinkUrls.has(url));

  console.log(`Checking ${urlsToCheck.length} external URLs (concurrency: ${concurrency})...`);
  const resultsByUrl = new Map();

  const tasks = urlsToCheck.map(url => async () => {
    const result = await checkExternalUrl(url, timeoutMs, jsRendered);
    resultsByUrl.set(url, result);

    if (!result.ok)                                     process.stdout.write('x');
    else if (result.botProtected || result.rateLimited) process.stdout.write('!');
    else if (result.redirect || result.anchorMissing)   process.stdout.write('~');
    else                                                process.stdout.write('.');
  });

  await runWithConcurrency(tasks, concurrency);
  await closeBrowser();
  console.log('\n');

  const errors = [];
  const warnings = [];

  for (const link of allLinks) {
    const result = resultsByUrl.get(link.url);
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

  return { errors, warnings };
}

// ── Stage 3b: Internal checks ────────────────────────────────────

async function checkInternal(uniqueUrls, allLinks, mdExtUrls, { docsDir, liveSiteBase, timeoutMs }) {
  const urlsToCheck = uniqueUrls.filter(url => !mdExtUrls.has(url));

  console.log(`Checking ${urlsToCheck.length} internal links...`);
  const resultsByUrl = new Map();

  for (const url of urlsToCheck) {
    resultsByUrl.set(url, await checkInternalLink(url, { docsDir, liveSiteBase, timeoutMs }));
  }

  const errors = [];
  const warnings = [];

  for (const link of allLinks) {
    const result = resultsByUrl.get(link.url);
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
  return { errors, warnings };
}

// ── Orchestrate ──────────────────────────────────────────────────

export async function orchestrate(config) {
  const { docsDir, liveSiteBase, concurrency, timeoutMs, externalOnly, internalOnly } = config;

  // 1. Scan
  const scan = await scanFiles(docsDir);

  // 2. Lint
  const lint = lintLinks(scan.externalLinks, scan.internalLinks);
  const errors = [...lint.errors];
  const warnings = [...lint.warnings];

  // 3. Load configuration (whitelist + JS-rendered domains)
  const { whitelist, jsRendered } = await loadConfig();

  // 4. Check external URLs
  if (!internalOnly) {
    const ext = await checkExternal(
      scan.uniqueExternalUrls, scan.externalLinks, errors,
      { concurrency, timeoutMs, jsRendered },
    );
    errors.push(...ext.errors);
    warnings.push(...ext.warnings);
  }

  // 5. Check internal links
  if (!externalOnly) {
    const int = await checkInternal(
      scan.uniqueInternalUrls, scan.internalLinks, lint.mdExtUrls,
      { docsDir, liveSiteBase, timeoutMs },
    );
    errors.push(...int.errors);
    warnings.push(...int.warnings);
  }

  // 6. Classify and deduplicate
  const classified = classifyResults(errors, warnings, whitelist);

  return {
    ...classified,
    files: scan.files,
    allLinks: scan.allLinks,
    reusableImporters: scan.reusableImporters,
    reusableFileNames: scan.reusableFileNames,
    docsDir,
    reusableDir: scan.reusableDir,
  };
}
