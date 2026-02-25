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

  // [text](url) — markdown links
  const mdLinkRe = /\[(?:[^\]]*)\]\(([^)]+)\)/g;
  let match;
  while ((match = mdLinkRe.exec(content)) !== null) {
    let url = match[1].trim();
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
 * Split links into external vs internal, discarding mailto/tel/anchor-only/javascript.
 */
export function categorizeLinks(allLinks) {
  const externalLinks = [];
  const internalLinks = [];

  for (const link of allLinks) {
    const { url } = link;
    if (/^https?:\/\//.test(url)) {
      externalLinks.push(link);
    } else if (/^mailto:/.test(url) || /^tel:/.test(url) || /^#/.test(url) || /^javascript:/.test(url)) {
      // skip
    } else {
      internalLinks.push(link);
    }
  }

  return { externalLinks, internalLinks };
}
