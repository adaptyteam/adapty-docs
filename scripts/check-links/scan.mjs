import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';

/**
 * Recursively collect all .md/.mdx files from a directory.
 */
export async function getAllDocFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...await getAllDocFiles(fullPath));
    } else if (/\.(md|mdx)$/.test(entry.name)) {
      files.push(fullPath);
    }
  }
  return files;
}

/**
 * Extract markdown links, href attributes, and external src attributes from content.
 */
export function extractLinks(content, filePath, docsDir) {
  const links = [];
  const relPath = path.relative(docsDir, filePath);

  const lineAt = (idx) => content.substring(0, idx).split('\n').length;

  // [text](url) — markdown links (supports balanced parentheses in URLs)
  const mdLinkRe = /\[(?:[^\]]*)\]\(/g;
  let match;
  while ((match = mdLinkRe.exec(content)) !== null) {
    const start = match.index + match[0].length;
    let depth = 1;
    let i = start;
    while (i < content.length && depth > 0) {
      if (content[i] === '(') depth++;
      else if (content[i] === ')') depth--;
      if (depth > 0) i++;
    }
    let url = content.substring(start, i).trim();
    url = url.replace(/\s+"[^"]*"$/, '');
    if (url) links.push({ url, source: relPath, line: lineAt(match.index) });
  }

  // href="url"
  const hrefRe = /href=["']([^"']+)["']/g;
  while ((match = hrefRe.exec(content)) !== null) {
    const url = match[1].trim();
    if (url) links.push({ url, source: relPath, line: lineAt(match.index) });
  }

  // src="url" (external only)
  const srcRe = /src=["']([^"']+)["']/g;
  while ((match = srcRe.exec(content)) !== null) {
    const url = match[1].trim();
    if (url && /^https?:\/\//.test(url)) {
      links.push({ url, source: relPath, line: lineAt(match.index) });
    }
  }

  return links;
}

/**
 * Extract reusable component file paths from import statements.
 * Matches: import Foo from '@site/src/components/reusable/Bar.md';
 */
export function extractReusableImports(content) {
  const imports = [];
  const re = /import\s+\w+\s+from\s+['"]@site\/src\/components\/reusable\/([^'"]+)['"]/g;
  let match;
  while ((match = re.exec(content)) !== null) {
    imports.push(match[1]); // e.g. "AccessLevel.md"
  }
  return imports;
}

/**
 * Self-referential links: absolute URLs that point back at this docs site.
 * Authors (and stale translations) sometimes hardcode
 * `https://adapty.io/docs/<slug>` — or a localized `.../docs/<locale>/<slug>` —
 * instead of a bare slug. These are internal links in disguise: their validity
 * depends on the target doc existing, not on an HTTP round trip. Left as
 * absolute URLs they'd be classified as external and skipped by the
 * `--internal-only` locale gate (and only caught live in the English external
 * pass), which is how orphaned-slug 404s slip into localized files. We instead
 * resolve them as internal against the repo index.
 */
const SELF_SITE_RE = /^https?:\/\/(?:www\.)?adapty\.io\/docs(?=\/|$)/i;

export function isSelfReferentialUrl(url) {
  return SELF_SITE_RE.test(url);
}

/**
 * Reduce a self-referential absolute URL to its internal path, keeping any
 * locale segment and anchor (e.g. `https://adapty.io/docs/tr/foo#bar` →
 * `tr/foo#bar`). Returns null if the URL isn't self-referential. The retained
 * locale segment means the internal check's live fallback hits the exact
 * localized URL, and its basename fallback still resolves the slug against the
 * English index.
 */
export function toInternalPath(url) {
  if (!SELF_SITE_RE.test(url)) return null;
  return url.replace(SELF_SITE_RE, '').replace(/^\//, '');
}

/**
 * Split links into external vs internal, discarding mailto/tel/anchor-only/javascript.
 * Self-referential absolute URLs (see toInternalPath) are treated as internal.
 */
export function categorizeLinks(allLinks) {
  const externalLinks = [];
  const internalLinks = [];

  for (const link of allLinks) {
    const { url } = link;
    if (isSelfReferentialUrl(url)) {
      internalLinks.push(link);
    } else if (/^https?:\/\//.test(url)) {
      externalLinks.push(link);
    } else if (/^mailto:/.test(url) || /^tel:/.test(url) || /^#/.test(url) || /^javascript:/.test(url)) {
      // skip
    } else {
      internalLinks.push(link);
    }
  }

  return { externalLinks, internalLinks };
}
