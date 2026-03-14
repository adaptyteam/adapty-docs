/**
 * External URL checker.
 *
 * Checks each URL via curl, then applies special handling:
 *   - Bot-protected pages (Cloudflare 403 challenges)
 *   - Rate-limited responses (429)
 *   - Anchor verification: first via static HTML (curl), then via headless
 *     browser for domains known to render anchors client-side
 */

import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { stripTrackingParams } from './clean-url.mjs';
import { isJsRenderedDomain } from './config.mjs';
import { checkAnchorHeadless, closeBrowser } from './check-anchor-headless.mjs';

export { closeBrowser };

const execFileAsync = promisify(execFile);
const delay = ms => new Promise(r => setTimeout(r, ms));

// ── Constants ────────────────────────────────────────────────────

export const BROWSER_HEADERS = {
  'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
  'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
  'Accept-Language': 'en-US,en;q=0.9',
  'Accept-Encoding': 'gzip, deflate, br',
  'Connection': 'keep-alive',
  'Upgrade-Insecure-Requests': '1',
  'Sec-Fetch-Dest': 'document',
  'Sec-Fetch-Mode': 'navigate',
  'Sec-Fetch-Site': 'none',
  'Sec-Fetch-User': '?1',
};

const CURL_EXIT_MESSAGES = {
  5: 'Proxy resolution failed',
  6: 'Domain not found (DNS)',
  7: 'Connection refused',
  22: 'HTTP error',
  28: 'Request timed out',
  35: 'SSL/TLS handshake failed',
  47: 'Too many redirects',
  51: 'SSL certificate problem',
  52: 'Empty response from server',
  56: 'Connection reset',
  60: 'SSL certificate not trusted',
};

// ── Per-domain lock ──────────────────────────────────────────────
// Serializes requests to the same host to avoid rate-limiting.

const domainLocks = new Map();

async function acquireDomainLock(domain) {
  while (domainLocks.get(domain)) {
    await domainLocks.get(domain);
  }
  let resolve;
  const promise = new Promise(r => { resolve = r; });
  domainLocks.set(domain, promise);
  return () => { domainLocks.delete(domain); resolve(); };
}

// ── Curl helpers ─────────────────────────────────────────────────

function headerArgs() {
  return Object.entries(BROWSER_HEADERS).flatMap(([k, v]) => ['-H', `${k}: ${v}`]);
}

/**
 * HEAD+follow check via curl. Returns { status, ok, redirect?, error? }.
 */
export async function curlCheck(url, timeoutMs = 10000) {
  try {
    const { stdout } = await execFileAsync('curl', [
      '-L', '-s', '-o', '/dev/null',
      '-w', '%{http_code}\\n%{url_effective}',
      '--max-redirs', '20',
      '--max-time', String(timeoutMs / 1000),
      '-b', '',
      ...headerArgs(),
      url,
    ]);

    const lines = stdout.trim().split('\n');
    const status = parseInt(lines[0], 10);
    const finalUrl = lines[1] || url;

    const normalise = u => stripTrackingParams(u).replace(/#.*$/, '').replace(/\/$/, '').replace(/:(443|80)(?=\/|$)/, '').replace(/\/\/www\./, '//');
    const normaliseLocale = u => normalise(u).replace(/\?.*$/, '').replace(/\/[a-z]{2}(-[a-zA-Z]{2,4})?(?=\/|$)/g, '');

    const redirected = normalise(finalUrl) !== normalise(url);
    const localeOnly = redirected && normaliseLocale(finalUrl) === normaliseLocale(url);

    return {
      status,
      ok: status >= 200 && status < 400,
      redirect: redirected ? finalUrl : null,
      finalUrl,
      localeRedirect: localeOnly || undefined,
    };
  } catch (err) {
    const msg = CURL_EXIT_MESSAGES[err.code] || `Connection failed (curl exit ${err.code})`;
    return { status: 0, ok: false, error: msg };
  }
}

// ── Anchor checking (static HTML) ────────────────────────────────

/**
 * Fetch page HTML and search for id="anchor" via regex.
 */
async function checkAnchorInHtml(pageUrl, anchor, timeoutMs = 10000) {
  try {
    const { stdout } = await execFileAsync('curl', [
      '-L', '-s', '--compressed',
      '--max-redirs', '20',
      '--max-time', String(timeoutMs / 1000),
      '-b', '',
      ...headerArgs(),
      pageUrl,
    ], { maxBuffer: 10 * 1024 * 1024 });

    const escaped = anchor.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const re = new RegExp(`id=["']?${escaped}["'\\s>]`, 'i');
    return re.test(stdout);
  } catch {
    return true; // fetch failed — assume anchor exists
  }
}

/**
 * Parse a URL fragment, ignoring text-fragment directives and path-style hashes.
 * Returns the anchor string, or null if the URL has no checkable fragment.
 */
function extractAnchor(url) {
  const match = url.match(/#(.+)$/);
  if (!match) return null;
  const frag = match[1];
  if (frag.startsWith(':~:text=') || frag.startsWith('/')) return null;
  return frag;
}

// ── Bot / challenge detection ────────────────────────────────────

async function isCloudflareChallenged(url) {
  try {
    const { stdout } = await execFileAsync('curl', [
      '-s', '-D', '-', '-o', '/dev/null',
      '--max-time', '5',
      '-H', `User-Agent: ${BROWSER_HEADERS['User-Agent']}`,
      url,
    ]);
    return /cf-mitigated:\s*challenge/i.test(stdout);
  } catch {
    return false;
  }
}

// ── Main entry point ─────────────────────────────────────────────

/**
 * Check a single external URL.
 *
 * @param {string}  url
 * @param {number}  timeoutMs
 * @param {object}  jsRendered  Set of domains with client-rendered anchors
 * @returns {object} { status, ok, redirect?, error?, botProtected?, rateLimited?, anchorMissing? }
 */
export async function checkExternalUrl(url, timeoutMs = 10000, jsRendered = null) {
  let domain;
  try { domain = new URL(url).hostname; } catch { domain = 'unknown'; }

  const releaseLock = await acquireDomainLock(domain);
  try {
    const result = await curlCheck(url, timeoutMs);
    await delay(50);

    // Cloudflare JS challenge → bot-protected
    if (result.status === 403) {
      if (await isCloudflareChallenged(url)) {
        return { ...result, ok: true, botProtected: true };
      }
    }

    // Rate-limited
    if (result.status === 429) {
      return { ...result, ok: true, rateLimited: true };
    }

    // Anchor verification
    const anchor = extractAnchor(url);
    if (result.ok && anchor) {
      const pageUrl = url.replace(/#.*$/, '');
      const foundInHtml = await checkAnchorInHtml(pageUrl, anchor, timeoutMs);

      if (!foundInHtml) {
        // Static HTML miss — retry with headless browser for JS-rendered sites
        if (jsRendered && isJsRenderedDomain(url, jsRendered)) {
          if (await checkAnchorHeadless(url, anchor)) return result;
        }
        return { ...result, ok: true, anchorMissing: `#${anchor} not found in HTML` };
      }
    }

    return result;
  } finally {
    releaseLock();
  }
}
