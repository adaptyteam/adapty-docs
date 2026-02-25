import { execFile } from 'node:child_process';
import { promisify } from 'node:util';

const execFileAsync = promisify(execFile);

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

const delay = ms => new Promise(r => setTimeout(r, ms));

// Per-domain lock to serialize requests to the same host
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

/**
 * Check a URL via curl. Returns { status, ok, redirect?, error? }
 */
export async function curlCheck(url, timeoutMs = 10000) {
  try {
    const headerArgs = Object.entries(BROWSER_HEADERS).flatMap(([k, v]) => ['-H', `${k}: ${v}`]);
    const { stdout } = await execFileAsync('curl', [
      '-L', '-s', '-o', '/dev/null',
      '-w', '%{http_code}\\n%{url_effective}',
      '--max-redirs', '20',
      '--max-time', String(timeoutMs / 1000),
      '-b', '',
      ...headerArgs,
      url,
    ]);
    const lines = stdout.trim().split('\n');
    const status = parseInt(lines[0], 10);
    const finalUrl = lines[1] || url;
    const normalise = u => u.replace(/#.*$/, '').replace(/\/$/, '');
    const redirected = normalise(finalUrl) !== normalise(url);
    return {
      status,
      ok: status >= 200 && status < 400,
      redirect: redirected ? finalUrl : null,
    };
  } catch (err) {
    const exitCode = err.code;
    const friendlyMsg = CURL_EXIT_MESSAGES[exitCode] || `Connection failed (curl exit ${exitCode})`;
    return { status: 0, ok: false, error: friendlyMsg };
  }
}

/**
 * Fetch page body and check whether an element with the given ID exists.
 */
async function checkAnchorOnPage(url, anchor, timeoutMs = 10000) {
  try {
    const headerArgs = Object.entries(BROWSER_HEADERS).flatMap(([k, v]) => ['-H', `${k}: ${v}`]);
    const { stdout } = await execFileAsync('curl', [
      '-L', '-s', '--compressed',
      '--max-redirs', '20',
      '--max-time', String(timeoutMs / 1000),
      '-b', '',
      ...headerArgs,
      url,
    ], { maxBuffer: 10 * 1024 * 1024 });
    const escaped = anchor.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const idRe = new RegExp(`id=["']?${escaped}["'\\s>]`, 'i');
    return idRe.test(stdout);
  } catch {
    return true; // can't fetch body — don't flag
  }
}

/**
 * Check whether a 403 is a Cloudflare JS challenge (bot protection).
 */
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

/**
 * Check an external URL with per-domain serialization.
 * Handles bot-protection, rate-limiting, anchor checking.
 */
export async function checkExternalUrl(url, timeoutMs = 10000) {
  let domain;
  try { domain = new URL(url).hostname; } catch { domain = 'unknown'; }

  const releaseLock = await acquireDomainLock(domain);
  try {
    const result = await curlCheck(url, timeoutMs);
    await delay(50);

    // 403 with Cloudflare JS challenge → bot-protected
    if (result.status === 403) {
      const cf = await isCloudflareChallenged(url);
      if (cf) return { ...result, ok: true, botProtected: true };
    }

    // 429 → rate-limited
    if (result.status === 429) {
      return { ...result, ok: true, rateLimited: true };
    }

    // If the page is OK and has an anchor, verify the anchor exists in the HTML
    const fragmentMatch = url.match(/#(.+)$/);
    if (result.ok && fragmentMatch) {
      const anchor = fragmentMatch[1];
      const pageUrl = url.replace(/#.*$/, '');
      const found = await checkAnchorOnPage(pageUrl, anchor, timeoutMs);
      if (!found) {
        return { ...result, ok: true, anchorMissing: `#${anchor} not found in HTML` };
      }
    }

    return result;
  } finally {
    releaseLock();
  }
}
