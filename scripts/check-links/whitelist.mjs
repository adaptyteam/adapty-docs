import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DEFAULT_PATH = path.join(__dirname, 'link-whitelist.json');

function normalizeUrl(url) {
  return url.replace(/\/$/, '').replace(/#.*$/, '');
}

/**
 * Load and compile the whitelist config.
 * Returns { exact: Set<string>, prefixes: string[] }.
 * If the file is missing, returns an empty (no-op) whitelist.
 */
export async function loadWhitelist(filePath = DEFAULT_PATH) {
  let raw;
  try {
    raw = await readFile(filePath, 'utf-8');
  } catch (err) {
    if (err.code === 'ENOENT') return { exact: new Set(), prefixes: [] };
    throw err;
  }

  const config = JSON.parse(raw);
  const entries = config.whitelist || [];

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

/**
 * Check if a URL matches the compiled whitelist.
 */
export function isWhitelisted(url, whitelist) {
  const normalized = normalizeUrl(url);
  if (whitelist.exact.has(normalized)) return true;
  return whitelist.prefixes.some(prefix => normalized.startsWith(prefix));
}
