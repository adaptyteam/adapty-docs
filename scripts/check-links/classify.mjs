import { isWhitelisted } from './whitelist.mjs';

export const MANUAL_SEVERITIES = new Set(['login', 'bot-protected', 'rate-limited', 'locale-redirect']);

/**
 * Deduplicate issues by url+source key.
 */
function dedup(arr) {
  const seen = new Set();
  return arr.filter(b => {
    const key = `${b.url}|${b.source}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

/**
 * Takes raw error/warning arrays and returns classified, deduplicated results.
 * If a whitelist is provided, matching warnings and manual-check items are
 * moved to whitelistedWarnings. Errors are never whitelisted.
 */
export function classifyResults(rawErrors, rawWarnings, whitelist = null) {
  const uniqueErrors = dedup(rawErrors);
  const allWarnings = dedup(rawWarnings);

  const nonManual = allWarnings.filter(w => !MANUAL_SEVERITIES.has(w.severity));
  const manual = allWarnings.filter(w => MANUAL_SEVERITIES.has(w.severity));

  if (!whitelist) {
    return { uniqueErrors, uniqueWarnings: nonManual, manualCheckList: manual, whitelistedWarnings: [] };
  }

  const uniqueWarnings = [];
  const whitelistedWarnings = [];
  const manualCheckList = [];

  for (const w of nonManual) {
    if (isWhitelisted(w.url, whitelist)) {
      whitelistedWarnings.push({ ...w, whitelisted: true });
    } else {
      uniqueWarnings.push(w);
    }
  }

  for (const w of manual) {
    if (isWhitelisted(w.url, whitelist)) {
      whitelistedWarnings.push({ ...w, whitelisted: true });
    } else {
      manualCheckList.push(w);
    }
  }

  return { uniqueErrors, uniqueWarnings, manualCheckList, whitelistedWarnings };
}
