export const MANUAL_SEVERITIES = new Set(['login', 'bot-protected', 'rate-limited']);

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
 */
export function classifyResults(rawErrors, rawWarnings) {
  const uniqueErrors = dedup(rawErrors);
  const allWarnings = dedup(rawWarnings);

  const uniqueWarnings = allWarnings.filter(w => !MANUAL_SEVERITIES.has(w.severity));
  const manualCheckList = allWarnings.filter(w => MANUAL_SEVERITIES.has(w.severity));

  return { uniqueErrors, uniqueWarnings, manualCheckList };
}
