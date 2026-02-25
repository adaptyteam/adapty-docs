/**
 * Group items into a Map by a key function.
 */
export function groupBy(items, keyFn) {
  const map = new Map();
  for (const item of items) {
    const key = keyFn(item);
    if (!map.has(key)) map.set(key, []);
    map.get(key).push(item);
  }
  return map;
}

/**
 * Group + sort by count descending. Returns [key, items[]][].
 */
export function sortedGroupBy(items, keyFn) {
  return [...groupBy(items, keyFn).entries()].sort((a, b) => b[1].length - a[1].length);
}

// ── HTML helpers ──────────────────────────────────────────────────

export function esc(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

export const HTTP_STATUS_LABELS = {
  400: '400 Bad Request', 401: '401 Unauthorized', 403: '403 Forbidden',
  404: '404 Not Found', 405: '405 Method Not Allowed', 408: '408 Timeout',
  410: '410 Gone', 429: '429 Rate Limited', 500: '500 Server Error',
  502: '502 Bad Gateway', 503: '503 Unavailable', 504: '504 Gateway Timeout',
};

export function statusLabel(b) {
  if (b.severity === 'bot-protected') return 'Bot-protected';
  if (b.severity === 'rate-limited') return 'Rate-limited';
  if (b.severity === 'internal-redirect') return 'Internal redirect';
  if (b.severity === 'redirect') return 'Redirected';
  if (b.severity === 'login') return 'Login required';
  if (b.severity === 'anchor') return 'Missing anchor';
  if (b.error) return esc(b.error);
  if (b.type === 'internal') return 'Page not found in docs';
  return esc(HTTP_STATUS_LABELS[b.status] || `HTTP ${b.status}`);
}

export function statusClass(b) {
  if (b.severity === 'bot-protected') return 'status-bot';
  if (b.severity === 'rate-limited') return 'status-bot';
  if (b.severity === 'internal-redirect') return 'status-internal-redirect';
  if (b.severity === 'redirect') return 'status-warning';
  if (b.severity === 'login') return 'status-login';
  if (b.severity === 'anchor') return 'status-warning';
  if (b.error) return 'status-error';
  if (b.type === 'internal') return 'status-internal';
  return `status-${b.status}`;
}

// ── Named grouping functions ──────────────────────────────────────

export function groupByDomain(items) {
  return sortedGroupBy(
    items.filter(i => i.type === 'external'),
    b => { try { return new URL(b.url).hostname; } catch { return 'unknown'; } }
  );
}

export function groupBySource(items) {
  return sortedGroupBy(items, b => b.source);
}

export function groupByUrl(items) {
  return sortedGroupBy(items, b => b.url);
}

export function groupByStatusLabel(items) {
  return sortedGroupBy(items, b => statusLabel(b));
}

export function groupByInternalPage(items) {
  return sortedGroupBy(
    items.filter(i => i.type === 'internal'),
    b => b.url.replace(/#.*$/, '').replace(/^\.?\//, '')
  );
}
