import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const CONFIG_PATH = path.join(__dirname, 'link-whitelist.json');

/**
 * Load the link-checker configuration from link-whitelist.json.
 *
 * Returns:
 *   whitelist  — compiled URL whitelist for suppressing warnings
 *   jsRendered — Set of domains that render anchors via client-side JS
 */
export async function loadConfig(filePath = CONFIG_PATH) {
  let raw;
  try {
    raw = await readFile(filePath, 'utf-8');
  } catch (err) {
    if (err.code === 'ENOENT') return { whitelist: emptyWhitelist(), jsRendered: new Set() };
    throw err;
  }

  const json = JSON.parse(raw);

  return {
    whitelist: compileWhitelist(json.whitelist || []),
    jsRendered: new Set(json.jsRenderedDomains || []),
  };
}

// ── Whitelist ────────────────────────────────────────────────────

function emptyWhitelist() {
  return { exact: new Set(), prefixes: [] };
}

function compileWhitelist(entries) {
  const exact = new Set();
  const prefixes = [];

  for (const entry of entries) {
    if (entry.url) {
      exact.add(normalizeUrl(entry.url));
    } else if (entry.pattern) {
      prefixes.push(normalizeUrl(entry.pattern.replace(/\*$/, '')));
    }
  }

  return { exact, prefixes };
}

export function isWhitelisted(url, whitelist) {
  const normalized = normalizeUrl(url);
  if (whitelist.exact.has(normalized)) return true;
  return whitelist.prefixes.some(prefix => normalized.startsWith(prefix));
}

function normalizeUrl(url) {
  return url.replace(/\/$/, '').replace(/#.*$/, '');
}

// ── JS-rendered domains ──────────────────────────────────────────

export function isJsRenderedDomain(url, jsRendered) {
  try {
    const hostname = new URL(url).hostname;
    for (const domain of jsRendered) {
      if (hostname === domain || hostname.endsWith('.' + domain)) return true;
    }
  } catch {}
  return false;
}
