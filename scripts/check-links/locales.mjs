/**
 * Localized link checking ("localized files only" mode, enabled by --locales).
 *
 * Scans localized files under src/locales/<code>/ and checks their internal
 * links against the ENGLISH doc index (NOT a locale-overlaid one): a bare-slug
 * link in a localized file renders to the no-locale URL /docs/<slug> at runtime,
 * so its validity depends on the English page existing. This is what catches
 * links to orphaned translations (a slug that exists only as a locale file, with
 * no English source, 404s in production). Resolution is therefore
 * locale-independent, so a given URL is checked once and reused across locales.
 *
 * Supported modes (config.mode):
 *   full — scan every selected locale dir (pages + reusable snippets)
 *   diff — only files changed vs a base ref (default: origin/main)
 *   dev  — only files changed since the last push
 *
 * Only outgoing links from the in-scope files are checked. Incoming-link
 * breakage detection (used by the English diff mode for renamed files /
 * removed headings) is intentionally omitted here: translations mirror English
 * filenames and the translator preserves English anchor ids, so a translation
 * cannot break an incoming link that the English check wouldn't already catch.
 *
 * Anchor fragments (#heading) are NOT validated for locales. The translator
 * preserves English anchor ids verbatim (as escaped \{#id\} on translated
 * headings), so anchors carry over from English; validating them here only
 * re-surfaces English-origin anchors. We verify the target page exists.
 */

import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { readFile, readdir } from 'node:fs/promises';
import path from 'node:path';
import { getAllDocFiles, extractLinks, categorizeLinks } from './scan.mjs';
import { checkInternalLink, isLoginRedirect, isCaptchaRedirect } from './check-internal.mjs';
import { checkExternalUrl, closeBrowser } from './check-external.mjs';
import { classifyResults } from './classify.mjs';
import { loadConfig } from './config.mjs';
import { resolveDiffBase } from './diff.mjs';

const execFileAsync = promisify(execFile);
const MD_EXT_RE = /\.(md|mdx)(#|$)/;

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

// ── Locale discovery ─────────────────────────────────────────────

/**
 * List locale directories under src/locales (zh, tr, ru, ...). Non-directory
 * entries (dictionary.json, ui-strings.ts, .DS_Store) are skipped.
 * Optionally filter to an explicit set of codes.
 */
async function getLocaleDirs(localesRoot, localeCodes) {
  let entries;
  try {
    entries = await readdir(localesRoot, { withFileTypes: true });
  } catch {
    return [];
  }
  const dirs = entries
    .filter(e => e.isDirectory() && !e.name.startsWith('.'))
    .map(e => ({ code: e.name, dir: path.join(localesRoot, e.name) }));

  if (!localeCodes) return dirs;

  const known = new Set(dirs.map(d => d.code));
  const missing = localeCodes.filter(c => !known.has(c));
  if (missing.length) {
    console.warn(`Warning: locale(s) not found under ${localesRoot}: ${missing.join(', ')}`);
  }
  return dirs.filter(d => localeCodes.includes(d.code));
}

// ── File lists ───────────────────────────────────────────────────

/** Full scan: every .md/.mdx in each selected locale dir (pages + reusables). */
async function fullFileList(selected) {
  const byLocale = new Map();
  for (const { code, dir } of selected) {
    byLocale.set(code, { dir, files: await getAllDocFiles(dir) });
  }
  return byLocale;
}

/**
 * Changed locale files vs a base ref, grouped by locale. Deleted files (D) are
 * excluded — there are no outgoing links left to check in them.
 */
async function changedFileList(base, selected) {
  const { stdout } = await execFileAsync('git', [
    'diff', '--name-only', '--diff-filter=ACMR', base,
  ]);
  const codeToDir = new Map(selected.map(s => [s.code, s.dir]));
  const byLocale = new Map();

  for (const f of stdout.trim().split('\n')) {
    if (!f || !/\.(md|mdx)$/.test(f)) continue;
    const m = f.match(/^src\/locales\/([^/]+)\//);
    if (!m) continue;
    const code = m[1];
    if (!codeToDir.has(code)) continue;
    if (!byLocale.has(code)) byLocale.set(code, { dir: codeToDir.get(code), files: [] });
    byLocale.get(code).files.push(path.resolve(f));
  }
  return byLocale;
}

// ── Orchestrate ──────────────────────────────────────────────────

function emptyResult(docsDir) {
  return {
    uniqueErrors: [], uniqueWarnings: [], manualCheckList: [], whitelistedWarnings: [],
    files: [], allLinks: [], changedFiles: [],
    reusableImporters: new Map(), reusableFileNames: new Set(),
    docsDir, reusableDir: path.resolve('src/components/reusable'),
  };
}

export async function orchestrateLocales(config) {
  const {
    mode, diffBase: explicitBase,
    docsDir, localesRoot, localeCodes,
    liveSiteBase, concurrency, timeoutMs,
    externalOnly, internalOnly,
  } = config;

  // localesRoot is <repo>/src/locales — derive the repo root for repo-relative
  // link sources (robust regardless of cwd).
  const repoRoot = path.resolve(localesRoot, '..', '..');

  // 1. Resolve which locales to check.
  const selected = await getLocaleDirs(localesRoot, localeCodes);
  if (selected.length === 0) {
    console.log('No locale directories to check.');
    return emptyResult(docsDir);
  }
  console.log(`Checking locales: ${selected.map(s => s.code).join(', ')}`);

  // 2. Build the per-locale file list (full scan or changed files).
  let filesByLocale;
  if (mode === 'diff' || mode === 'dev') {
    const base = await resolveDiffBase(mode, explicitBase);
    if (!base) {
      console.log(`Base ref '${explicitBase}' not found — falling back to full scan.`);
      filesByLocale = await fullFileList(selected);
    } else {
      console.log(`Mode: ${mode} (base: ${base})`);
      filesByLocale = await changedFileList(base, selected);
    }
  } else {
    filesByLocale = await fullFileList(selected);
  }

  const totalFiles = [...filesByLocale.values()].reduce((n, l) => n + l.files.length, 0);
  if (totalFiles === 0) {
    console.log('No localized files in scope.');
    return emptyResult(docsDir);
  }

  const errors = [];
  const warnings = [];
  const allLinks = [];
  const allFiles = [];
  const externalByLocale = []; // collected, checked once at the end
  const internalResultsByUrl = new Map(); // url -> result, shared across locales (resolution is locale-independent)

  // 3. Per-locale: extract & lint, then check internal links against the English index.
  for (const [code, { dir, files }] of filesByLocale) {
    if (files.length === 0) continue;
    console.log(`\n[${code}] ${files.length} file(s)`);

    const localeLinks = [];
    for (const file of files) {
      let content;
      try {
        content = await readFile(file, 'utf-8');
      } catch {
        continue; // unreadable (e.g. just removed) — skip
      }
      // source repo-rooted → "src/locales/zh/ab-tests.mdx" (so CI annotations
      // and reports point at the real file, not under src/content/docs/)
      localeLinks.push(...extractLinks(content, file, repoRoot));
    }
    allLinks.push(...localeLinks);
    allFiles.push(...files);

    const { externalLinks, internalLinks } = categorizeLinks(localeLinks);
    externalByLocale.push(...externalLinks);

    // Lint: internal links must not carry .md/.mdx extensions.
    const mdExtUrls = new Set();
    for (const link of internalLinks) {
      if (MD_EXT_RE.test(link.url)) {
        if (/^https?:\/\//.test(link.url)) {
          // Absolute URLs to the runtime .md exports are real pages (generate-md
          // emits them per locale too) — the AI guides link them on purpose.
          warnings.push({ ...link, type: 'internal', severity: 'md-extension' });
        } else {
          errors.push({ ...link, type: 'internal', status: 'MD_EXTENSION', error: 'Remove .md/.mdx extension from internal link' });
        }
        mdExtUrls.add(link.url);
      }
    }

    if (externalOnly) continue;

    // Internal checks. Resolution is locale-independent (English index + live
    // fallback), so check each URL once and reuse the result across locales.
    // skipAnchors: anchor validation lives in the English check; the translator
    // preserves English anchor ids (escaped \{#id\}), so re-checking here only
    // re-flags English-origin anchors. We verify the target page exists.
    const uniqueInternal = [...new Set(internalLinks.map(l => l.url))].filter(u => !mdExtUrls.has(u));
    let newlyChecked = 0;
    for (const url of uniqueInternal) {
      if (internalResultsByUrl.has(url)) continue;
      internalResultsByUrl.set(url, await checkInternalLink(url, { docsDir, liveSiteBase, timeoutMs, skipAnchors: true }));
      newlyChecked++;
    }
    console.log(`[${code}] ${uniqueInternal.length} internal links (${newlyChecked} newly checked)`);

    for (const link of internalLinks) {
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
  }

  // 4. External checks (opt-in; locale callers pass --internal-only). External
  //    URLs don't vary by locale, so dedupe globally and check once.
  if (!internalOnly && externalByLocale.length > 0) {
    const { jsRendered } = await loadConfig();
    const uniqueExternal = [...new Set(externalByLocale.map(l => l.url))];
    console.log(`\nChecking ${uniqueExternal.length} external URLs (concurrency: ${concurrency})...`);
    const externalResultsByUrl = new Map();

    const tasks = uniqueExternal.map(url => async () => {
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

    for (const link of externalByLocale) {
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
        const severity = isCaptchaRedirect(result.redirect, link.url) ? 'bot-protected'
          : isLoginRedirect(result.redirect, link.url) ? 'login'
          : result.localeRedirect ? 'locale-redirect' : 'redirect';
        warnings.push({ ...link, type: 'external', severity, redirect: result.redirect });
      }
    }
  }

  // 5. Classify and deduplicate.
  const { whitelist } = await loadConfig();
  const classified = classifyResults(errors, warnings, whitelist);

  return {
    ...classified,
    files: allFiles,
    allLinks,
    changedFiles: mode === 'full' ? undefined : allFiles,
    reusableImporters: new Map(),
    reusableFileNames: new Set(),
    docsDir,
    reusableDir: path.resolve('src/components/reusable'),
  };
}
