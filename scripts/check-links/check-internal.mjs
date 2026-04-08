import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { getAllDocFiles, extractReusableImports } from './scan.mjs';
import { curlCheck, checkExternalUrl } from './check-external.mjs';
import GithubSlugger from 'github-slugger';

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
  /play\.google\.com\/console\/about/i,
  /ads\.tiktok\.com\/i18n\/home\?redirect=/i,
  /console\.aws\.amazon\.com\/iamv2\b/i,
];

const CAPTCHA_PATTERNS = [
  /\/showcaptcha/i, /\/captcha/i, /\/challenge/i,
  /recaptcha/i,
];

export function isLoginRedirect(redirectUrl) {
  return LOGIN_PATTERNS.some(re => re.test(redirectUrl));
}

export function isCaptchaRedirect(redirectUrl) {
  return CAPTCHA_PATTERNS.some(re => re.test(redirectUrl));
}

/**
 * Generate a heading ID the same way rehype-slug does.
 */
// Use github-slugger for heading ID generation
const slugger = new GithubSlugger();
function slugify(text) {
  return slugger.slug(text);
}

const headingIdCache = new Map();

function collectHeadingIds(content, ids) {
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
}

async function getHeadingIds(filePath) {
  if (headingIdCache.has(filePath)) return headingIdCache.get(filePath);
  const ids = new Set();
  slugger.reset();
  try {
    const content = await readFile(filePath, 'utf-8');
    collectHeadingIds(content, ids);

    // Also collect headings from imported reusable components
    const reusableImports = extractReusableImports(content);
    for (const fileName of reusableImports) {
      try {
        const reusablePath = path.join('src/components/reusable', fileName);
        const reusableContent = await readFile(reusablePath, 'utf-8');
        collectHeadingIds(reusableContent, ids);
      } catch { /* reusable file not found — skip */ }
    }
  } catch { /* ignore */ }
  headingIdCache.set(filePath, ids);
  return ids;
}

// Doc index: Map<lowercased-slug, filePath>
let docIndex = null;
async function buildDocIndex(docsDir) {
  if (docIndex) return docIndex;
  docIndex = new Map();
  const files = await getAllDocFiles(docsDir);
  for (const f of files) {
    const basename = path.basename(f).replace(/\.(md|mdx)$/, '');
    const rel = path.relative(docsDir, f).replace(/\.(md|mdx)$/, '');
    const baseKey = basename.toLowerCase();
    const relKey = rel.toLowerCase();
    if (!docIndex.has(baseKey)) docIndex.set(baseKey, f);
    if (!docIndex.has(relKey)) docIndex.set(relKey, f);

    // Also index customSlug from frontmatter
    try {
      const content = await readFile(f, 'utf-8');
      const slugMatch = content.match(/^customSlug:\s*["']?\/?([^"'\n]+)["']?\s*$/m);
      if (slugMatch) {
        const customKey = slugMatch[1].trim().toLowerCase();
        if (!docIndex.has(customKey)) docIndex.set(customKey, f);
      }
    } catch { /* ignore */ }
  }
  return docIndex;
}

/** Expose the doc index for external use (e.g. diff mode). */
export { buildDocIndex };

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

  const rawSlug = urlWithoutAnchor.replace(/^\.?\//, '').replace(/\/$/, '').replace(/\.(md|mdx)$/, '');

  // Runtime API routes → check against live site (preserve original case).
  // Retries with backoff because these HTTP checks are sensitive to transient
  // network issues on CI runners (DNS blips, CDN edge cache misses, etc.).
  if (RUNTIME_ROUTE_PREFIXES.some(p => rawSlug.startsWith(p))) {
    const liveUrl = `${liveSiteBase}/${rawSlug}`;
    const RETRY_BACKOFF = [2000, 5000];
    let result;
    for (let attempt = 0; attempt <= RETRY_BACKOFF.length; attempt++) {
      result = await checkExternalUrl(liveUrl, timeoutMs);
      if (result.ok || result.status === 404) break;
      if (attempt < RETRY_BACKOFF.length) {
        await new Promise(r => setTimeout(r, RETRY_BACKOFF[attempt]));
      }
    }
    return {
      ok: result.ok,
      status: result.ok ? 'live-ok' : 'LIVE_404',
      error: result.ok ? null : `Not found on live site (${liveUrl})`,
      redirect: result.redirect,
    };
  }

  // Case-insensitive lookup against the doc index
  const slug = rawSlug.toLowerCase();
  const index = await buildDocIndex(docsDir);

  let filePath = index.get(slug);
  if (!filePath) {
    const basename = slug.split('/').pop();
    if (basename) filePath = index.get(basename);
  }

  if (!filePath) {
    // Slug not found locally — check live site (CloudFront redirect rules, etc.)
    const liveUrl = `${liveSiteBase}/${rawSlug}`;
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
