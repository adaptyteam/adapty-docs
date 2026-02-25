import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { getAllDocFiles } from './scan.mjs';
import { curlCheck, checkExternalUrl } from './check-external.mjs';

// Prefixes for routes generated at runtime (OpenAPI specs, etc.)
const RUNTIME_ROUTE_PREFIXES = [
  'api-adapty/',
  'api-web/',
  'api-export-analytics/',
];

const MALFORMED_URL_RE = /^[a-z]https?:\/\//i;

const LOGIN_PATTERNS = [
  /\/login/i, /\/signin/i, /\/sign-in/i, /\/sign_in/i,
  /\/auth\b/i, /\/oauth/i, /\/sso\b/i,
  /\/cas\/login/i, /\/saml/i,
  /accounts\.google\.com/i, /login\.microsoftonline\.com/i,
  /appleid\.apple\.com/i, /idmsa\.apple\.com/i,
];

export function isLoginRedirect(redirectUrl) {
  return LOGIN_PATTERNS.some(re => re.test(redirectUrl));
}

/**
 * Generate a heading ID the same way rehype-slug does.
 */
function slugify(text) {
  return text
    .toLowerCase()
    .replace(/<[^>]+>/g, '')
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

const headingIdCache = new Map();
async function getHeadingIds(filePath) {
  if (headingIdCache.has(filePath)) return headingIdCache.get(filePath);
  const ids = new Set();
  try {
    const content = await readFile(filePath, 'utf-8');
    const headingRe = /^#{1,6}\s+(.+)$/gm;
    let m;
    while ((m = headingRe.exec(content)) !== null) {
      const raw = m[1].trim();
      const customMatch = raw.match(/\{#([^}]+)\}\s*$/);
      if (customMatch) {
        ids.add(customMatch[1]);
      } else {
        ids.add(slugify(raw));
      }
    }
  } catch { /* ignore */ }
  headingIdCache.set(filePath, ids);
  return ids;
}

// Doc index: Map<slug, filePath>
let docIndex = null;
async function buildDocIndex(docsDir) {
  if (docIndex) return docIndex;
  docIndex = new Map();
  const files = await getAllDocFiles(docsDir);
  for (const f of files) {
    const basename = path.basename(f).replace(/\.(md|mdx)$/, '');
    const rel = path.relative(docsDir, f).replace(/\.(md|mdx)$/, '');
    if (!docIndex.has(basename)) docIndex.set(basename, f);
    if (!docIndex.has(rel)) docIndex.set(rel, f);
  }
  return docIndex;
}

/**
 * Check an internal doc link. Resolves slug to file, checks anchors,
 * falls back to live site for redirects.
 */
export async function checkInternalLink(url, { docsDir, liveSiteBase, timeoutMs }) {
  const [urlWithoutAnchor, anchor] = url.split('#');
  if (!urlWithoutAnchor) return { ok: true, status: 'anchor-only' };

  if (MALFORMED_URL_RE.test(urlWithoutAnchor)) {
    const badPrefix = urlWithoutAnchor.match(/^([a-z])https?/i)[0];
    return { ok: false, status: 'MALFORMED_URL', error: `Malformed URL — invalid scheme "${badPrefix}://"` };
  }

  const slug = urlWithoutAnchor.replace(/^\.?\//, '').replace(/\/$/, '').replace(/\.(md|mdx)$/, '');

  // Runtime API routes → check against live site
  if (RUNTIME_ROUTE_PREFIXES.some(p => slug.startsWith(p))) {
    const liveUrl = `${liveSiteBase}/${slug}`;
    const result = await checkExternalUrl(liveUrl, timeoutMs);
    return {
      ok: result.ok,
      status: result.ok ? 'live-ok' : 'LIVE_404',
      error: result.ok ? null : `Not found on live site (${liveUrl})`,
      redirect: result.redirect,
    };
  }

  const index = await buildDocIndex(docsDir);

  let filePath = index.get(slug);
  if (!filePath) {
    const basename = slug.split('/').pop();
    if (basename) filePath = index.get(basename);
  }

  if (!filePath) {
    // Slug not found locally — check live site (CloudFront redirect rules, etc.)
    const liveUrl = `${liveSiteBase}/${slug}`;
    const live = await curlCheck(liveUrl, timeoutMs);
    if (live.ok) {
      return { ok: true, internalRedirect: live.redirect || liveUrl };
    }
    return { ok: false, status: 'NOT_FOUND', error: 'Page not found in docs' };
  }

  if (anchor) {
    const headings = await getHeadingIds(filePath);
    if (!headings.has(anchor)) {
      return { ok: true, anchorMissing: `#${anchor} not found` };
    }
  }

  return { ok: true, status: 'found' };
}
