/**
 * Diff-mode and dev-mode link checking.
 *
 * Instead of scanning every file, these modes focus on changed files:
 *
 *   dev-mode  — files changed since the last pushed commit (local work)
 *   diff-mode — files changed in the current PR branch vs main
 *
 * Both modes check:
 *   1. Outgoing links FROM changed files (internal existence + external HTTP)
 *   2. Incoming links TO changed files from ALL other files (detects breakage
 *      caused by renamed files or changed headings)
 */

import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { getAllDocFiles, extractLinks, extractReusableImports, categorizeLinks } from './scan.mjs';
import { checkInternalLink, buildDocIndex, isLoginRedirect, isCaptchaRedirect } from './check-internal.mjs';
import { checkExternalUrl, closeBrowser } from './check-external.mjs';
import { classifyResults } from './classify.mjs';
import { loadConfig } from './config.mjs';

const execFileAsync = promisify(execFile);

// ── Git helpers ──────────────────────────────────────────────────

/**
 * Get the list of changed .md/.mdx files relative to repo root.
 *
 *   dev:  changes since the last pushed commit (unpushed local work)
 *   diff: changes on the current branch vs main
 */
export async function getChangedFiles(mode) {
  let diffBase;

  if (mode === 'dev') {
    // Compare working tree + staged against the upstream tracking branch
    try {
      const { stdout } = await execFileAsync('git', ['rev-parse', '--abbrev-ref', '@{upstream}']);
      diffBase = stdout.trim();
    } catch {
      // No upstream — fall back to HEAD (shows only uncommitted changes)
      diffBase = 'HEAD';
    }
  } else {
    // diff mode: compare against main
    diffBase = 'main';
  }

  const { stdout } = await execFileAsync('git', [
    'diff', '--name-only', '--diff-filter=ACDMR', diffBase,
  ]);

  return stdout.trim().split('\n')
    .filter(f => f && /\.(md|mdx)$/.test(f))
    .filter(f => f.startsWith('src/content/docs/') || f.startsWith('src/components/reusable/'));
}

/**
 * Get files that were renamed/deleted (old paths no longer exist).
 */
async function getDeletedOrRenamedFiles(mode) {
  const diffBase = mode === 'dev' ? '@{upstream}' : 'main';

  try {
    const { stdout } = await execFileAsync('git', [
      'diff', '--name-only', '--diff-filter=DR', diffBase,
    ]);
    return stdout.trim().split('\n')
      .filter(f => f && /\.(md|mdx)$/.test(f))
      .filter(f => f.startsWith('src/content/docs/'));
  } catch {
    return [];
  }
}

// ── Heading diff ─────────────────────────────────────────────────

/**
 * Extract heading IDs from markdown content (matches check-internal.mjs logic).
 */
function extractHeadingIds(content) {
  const ids = new Set();
  const headingRe = /^#{1,6}\s+(.+)$/gm;
  let m;
  while ((m = headingRe.exec(content)) !== null) {
    const raw = m[1].trim();
    const customMatch = raw.match(/\{#([^}]+)\}\s*$/);
    if (customMatch) {
      ids.add(customMatch[1]);
    } else {
      // Simplified slugify matching github-slugger behavior
      ids.add(raw
        .toLowerCase()
        .replace(/<[^>]+>/g, '')
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, ''));
    }
  }
  return ids;
}

/**
 * Get the old version of a file from the diff base.
 */
async function getOldFileContent(filePath, mode) {
  const diffBase = mode === 'dev' ? '@{upstream}' : 'main';
  try {
    const { stdout } = await execFileAsync('git', ['show', `${diffBase}:${filePath}`]);
    return stdout;
  } catch {
    return null; // new file
  }
}

/**
 * Find heading IDs that were removed between old and new versions.
 */
async function getRemovedHeadings(filePath, mode) {
  const oldContent = await getOldFileContent(filePath, mode);
  if (!oldContent) return new Set(); // new file — no removed headings

  let newContent;
  try {
    newContent = await readFile(filePath, 'utf-8');
  } catch {
    return new Set(); // file deleted — handled by getDeletedOrRenamedFiles
  }

  const oldIds = extractHeadingIds(oldContent);
  const newIds = extractHeadingIds(newContent);

  const removed = new Set();
  for (const id of oldIds) {
    if (!newIds.has(id)) removed.add(id);
  }
  return removed;
}

// ── Incoming link detection ──────────────────────────────────────

/**
 * Scan all doc files for links pointing to the given slugs or anchors.
 * Returns an array of { url, source, line } objects.
 */
async function findIncomingLinks(targetSlugs, removedAnchors, docsDir, reusableDir) {
  if (targetSlugs.size === 0 && removedAnchors.size === 0) return [];

  const allFiles = [
    ...await getAllDocFiles(docsDir),
    ...await getAllDocFiles(reusableDir),
  ];

  const incoming = [];

  for (const file of allFiles) {
    const content = await readFile(file, 'utf-8');
    const dir = file.startsWith(reusableDir) ? reusableDir : docsDir;
    const links = extractLinks(content, file, dir);

    for (const link of links) {
      if (/^https?:\/\//.test(link.url)) continue; // skip external
      if (/^#/.test(link.url) || /^mailto:/.test(link.url)) continue;

      const [urlPart, anchor] = link.url.split('#');
      const slug = urlPart.replace(/^\.?\//, '').replace(/\/$/, '').replace(/\.(md|mdx)$/, '').toLowerCase();

      if (targetSlugs.has(slug)) {
        incoming.push(link);
      } else if (anchor && removedAnchors.has(`${slug}#${anchor}`)) {
        incoming.push(link);
      }
    }
  }

  return incoming;
}

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

// ── Main orchestration ───────────────────────────────────────────

/**
 * Run a focused link check on changed files.
 *
 * @param {object} config
 * @param {string} config.mode         'dev' or 'diff'
 * @param {string} config.docsDir      Path to docs directory
 * @param {string} config.liveSiteBase Live site URL base
 * @param {number} config.concurrency  Max parallel HTTP requests
 * @param {number} config.timeoutMs    Per-request timeout
 */
export async function orchestrateDiff(config) {
  const { mode, docsDir, liveSiteBase, concurrency, timeoutMs, externalOnly, internalOnly } = config;
  const reusableDir = 'src/components/reusable';

  // 1. Get changed files
  console.log(`Mode: ${mode}`);
  const changedFiles = await getChangedFiles(mode);

  if (changedFiles.length === 0) {
    console.log('No changed documentation files found.');
    return {
      uniqueErrors: [], uniqueWarnings: [], manualCheckList: [], whitelistedWarnings: [],
      files: [], allLinks: [], changedFiles: [],
      reusableImporters: new Map(), reusableFileNames: new Set(),
      docsDir, reusableDir: path.resolve(reusableDir),
    };
  }

  console.log(`Changed files (${changedFiles.length}):`);
  for (const f of changedFiles) console.log(`  ${f}`);

  // 2. Extract outgoing links from changed files
  const outgoingLinks = [];
  const reusableImporters = new Map();
  const reusableFileNames = new Set();

  for (const file of changedFiles) {
    const content = await readFile(file, 'utf-8');
    const dir = file.startsWith(reusableDir) ? reusableDir : docsDir;
    outgoingLinks.push(...extractLinks(content, file, dir));

    if (file.startsWith('src/content/docs/')) {
      const imports = extractReusableImports(content);
      const slug = path.basename(file).replace(/\.(md|mdx)$/, '');
      for (const reusableFile of imports) {
        if (!reusableImporters.has(reusableFile)) reusableImporters.set(reusableFile, []);
        reusableImporters.get(reusableFile).push(slug);
      }
    } else {
      reusableFileNames.add(path.basename(file));
    }
  }

  const { externalLinks, internalLinks } = categorizeLinks(outgoingLinks);
  console.log(`\nOutgoing links: ${externalLinks.length} external, ${internalLinks.length} internal`);

  // 3. Find incoming links that might be broken
  //    a) Deleted/renamed files → slugs that no longer exist
  const deletedFiles = await getDeletedOrRenamedFiles(mode);
  const deletedSlugs = new Set(
    deletedFiles.map(f => path.basename(f).replace(/\.(md|mdx)$/, '').toLowerCase()),
  );

  //    b) Changed headings → anchors that no longer exist
  const removedAnchors = new Map(); // slug#anchor → source file
  for (const file of changedFiles) {
    if (!file.startsWith('src/content/docs/')) continue;
    const slug = path.basename(file).replace(/\.(md|mdx)$/, '').toLowerCase();
    const removed = await getRemovedHeadings(file, mode);
    for (const anchor of removed) {
      removedAnchors.set(`${slug}#${anchor}`, file);
    }
  }

  const targetSlugs = new Set([
    ...deletedSlugs,
    // Also include changed files' slugs to catch anchor issues
    ...changedFiles
      .filter(f => f.startsWith('src/content/docs/'))
      .map(f => path.basename(f).replace(/\.(md|mdx)$/, '').toLowerCase()),
  ]);

  console.log(`Checking incoming links to ${targetSlugs.size} slugs (${deletedSlugs.size} deleted, ${removedAnchors.size} removed anchors)...`);
  const incomingLinks = await findIncomingLinks(targetSlugs, removedAnchors, docsDir, reusableDir);
  console.log(`Found ${incomingLinks.length} incoming links to check.\n`);

  // 4. Combine and deduplicate links to check
  const allLinks = [...outgoingLinks, ...incomingLinks];
  const allInternal = [...internalLinks, ...incomingLinks.filter(l => !/^https?:\/\//.test(l.url))];
  const uniqueInternalUrls = [...new Set(allInternal.map(l => l.url))];
  const uniqueExternalUrls = [...new Set(externalLinks.map(l => l.url))];

  // 5. Load config
  const { whitelist, jsRendered } = await loadConfig();

  // 6. Lint: .md extensions and self-links
  const errors = [];
  const warnings = [];

  const MD_EXT_RE = /\.(md|mdx)(#|$)/;
  const SELF_DOCS_RE = /^https?:\/\/(www\.)?adapty\.io\/docs(\/|$)/;
  const SELF_LINK_EXCEPTIONS = /\.(txt|md)$|\/api-adapty\/|\/api-web\/|\/api-export-analytics\//;
  const mdExtUrls = new Set();

  for (const link of allInternal) {
    if (MD_EXT_RE.test(link.url)) {
      errors.push({ ...link, type: 'internal', status: 'MD_EXTENSION', error: 'Remove .md/.mdx extension from internal link' });
      mdExtUrls.add(link.url);
    }
  }
  if (!internalOnly) {
    for (const link of externalLinks) {
      if (SELF_DOCS_RE.test(link.url) && !SELF_LINK_EXCEPTIONS.test(link.url)) {
        errors.push({ ...link, type: 'external', status: 'SELF_LINK', error: 'Use an internal link instead of a full URL to adapty.io/docs' });
      }
    }
  }

  // 7. Check internal links
  if (!externalOnly) {
    console.log(`Checking ${uniqueInternalUrls.length} internal links...`);
    const internalResultsByUrl = new Map();
    for (const url of uniqueInternalUrls) {
      if (mdExtUrls.has(url)) continue;
      internalResultsByUrl.set(url, await checkInternalLink(url, { docsDir, liveSiteBase, timeoutMs }));
    }

    for (const link of allInternal) {
      const result = internalResultsByUrl.get(link.url);
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

  // 8. Check external links
  if (!internalOnly && uniqueExternalUrls.length > 0) {
    const selfLinkUrls = new Set(errors.filter(e => e.status === 'SELF_LINK').map(e => e.url));
    const urlsToCheck = uniqueExternalUrls.filter(url => !selfLinkUrls.has(url));

    console.log(`Checking ${urlsToCheck.length} external URLs (concurrency: ${concurrency})...`);
    const externalResultsByUrl = new Map();

    const tasks = urlsToCheck.map(url => async () => {
      const result = await checkExternalUrl(url, timeoutMs, jsRendered);
      externalResultsByUrl.set(url, result);
      if (!result.ok) process.stdout.write('x');
      else if (result.botProtected || result.rateLimited) process.stdout.write('!');
      else if (result.redirect || result.anchorMissing) process.stdout.write('~');
      else process.stdout.write('.');
    });

    await runWithConcurrency(tasks, concurrency);
    await closeBrowser();
    console.log('\n');

    for (const link of externalLinks) {
      const result = externalResultsByUrl.get(link.url);
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

  // 9. Classify
  const classified = classifyResults(errors, warnings, whitelist);

  return {
    ...classified,
    files: changedFiles,
    allLinks,
    changedFiles,
    reusableImporters,
    reusableFileNames,
    docsDir,
    reusableDir: path.resolve(reusableDir),
  };
}
