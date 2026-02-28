import { writeFile } from 'node:fs/promises';
import {
  esc, statusLabel, statusClass,
  groupBy, sortedGroupBy,
  groupByDomain, groupBySource, groupByUrl, groupByStatusLabel, groupByInternalPage,
} from './group.mjs';

// ── Render helpers (local to this module) ─────────────────────────

function renderRow(b) {
  const urlCell = b.type === 'external'
    ? `<a class="url" href="${esc(b.url)}" target="_blank" rel="noopener">${esc(b.url)}</a>`
    : esc(b.url);
  const statusCell = b.severity === 'bot-protected'
    ? `<span class="status status-bot">Bot-protected</span>`
    : b.severity === 'rate-limited'
    ? `<span class="status status-bot">Rate-limited</span>`
    : b.severity === 'internal-redirect'
    ? `<span class="status status-internal-redirect">Internal redirect</span><br><span class="redirect-target">Live: ${esc(b.redirect)}</span>`
    : b.severity === 'redirect'
    ? `<span class="status status-warning">Redirect</span><br><span class="redirect-target">${esc(b.redirect)}</span>`
    : b.severity === 'login'
    ? `<span class="status status-login">Login required</span><br><span class="redirect-target">${esc(b.redirect)}</span>`
    : b.severity === 'anchor'
    ? `<span class="status status-warning">Missing anchor</span><br><span class="redirect-target">${esc(b.anchor)}</span>`
    : `<span class="status ${statusClass(b)}">${statusLabel(b)}</span>`;
  return `<tr class="row" data-search="${esc((b.type + ' ' + b.source + ' ' + b.url + ' ' + statusLabel(b) + ' ' + (b.redirect || '')).toLowerCase())}">
      <td class="source">${esc(b.source)}:${b.line}</td>
      <td>${urlCell}</td>
      <td><span class="type-badge type-${b.type}">${b.type}</span></td>
      <td>${statusCell}</td>
    </tr>`;
}

function renderByFile(sortedEntries) {
  return sortedEntries.map(([source, items]) => `
    <details>
      <summary><span class="count">${items.length}</span> ${esc(source)}</summary>
      <table>
        <tr><th>Line</th><th>Target</th><th>Type</th><th>Status</th></tr>
        ${items.map(b => `<tr class="row" data-search="${esc((b.source + ' ' + b.url + ' ' + b.type + ' ' + statusLabel(b) + ' ' + (b.redirect || '')).toLowerCase())}">
          <td class="source">${b.line}</td>
          <td>${b.type === 'external' ? `<a class="url" href="${esc(b.url)}" target="_blank" rel="noopener">${esc(b.url)}</a>` : esc(b.url)}</td>
          <td><span class="type-badge type-${b.type}">${b.type}</span></td>
          <td><span class="status ${statusClass(b)}">${statusLabel(b)}</span>${
            b.redirect ? `<br><span class="redirect-target">${esc(b.redirect)}</span>` : ''
          }${
            b.anchor ? `<br><span class="redirect-target">${esc(b.anchor)}</span>` : ''
          }</td>
        </tr>`).join('')}
      </table>
    </details>`).join('');
}

function renderByLink(sortedEntries) {
  return sortedEntries.map(([url, items]) => `
    <details>
      <summary><span class="count">${items.length}</span> ${items[0].type === 'external' ? `<a class="url" href="${esc(url)}" target="_blank" rel="noopener" onclick="event.stopPropagation()">${esc(url)}</a>` : `<span class="domain">${esc(url)}</span>`}
        <span class="status ${statusClass(items[0])}" style="margin-left:0.5rem">${statusLabel(items[0])}</span></summary>
      <table>
        <tr><th>Source</th><th>Line</th><th>Type</th></tr>
        ${items.map(b => `<tr class="row" data-search="${esc((b.source + ' ' + b.url + ' ' + b.type + ' ' + statusLabel(b)).toLowerCase())}">
          <td class="source">${esc(b.source)}</td>
          <td class="source">${b.line}</td>
          <td><span class="type-badge type-${b.type}">${b.type}</span></td>
        </tr>`).join('')}
      </table>
    </details>`).join('');
}

function renderFlatTable(items, headers) {
  if (items.length === 0) return '<p class="empty">Nothing here.</p>';
  return `<table><tr>${headers.map(h => `<th>${h}</th>`).join('')}</tr>${items.map(b => renderRow(b)).join('')}</table>`;
}

function renderByDomainHtml(entries) {
  return entries.map(([domain, items]) => `
    <details>
      <summary><span class="count">${items.length}</span> <span class="domain">${esc(domain)}</span></summary>
      <table><tr><th>Source</th><th>URL</th><th>Type</th><th>Status</th></tr>${items.map(b => renderRow(b)).join('')}</table>
    </details>`).join('');
}

function renderByPageHtml(entries) {
  return entries.map(([page, items]) => `
    <details>
      <summary><span class="count">${items.length}</span> <span class="domain">${esc(page)}</span></summary>
      <table><tr><th>Source</th><th>URL</th><th>Type</th><th>Status</th></tr>${items.map(b => renderRow(b)).join('')}</table>
    </details>`).join('');
}

function renderByStatusHtml(entries) {
  return [...entries].sort((a, b) => b[1].length - a[1].length).map(([label, items]) => {
    const sample = items[0];
    return `
    <details>
      <summary><span class="count">${items.length}</span> <span class="status ${statusClass(sample)}">${label}</span></summary>
      <table><tr><th>Source</th><th>URL</th><th>Type</th><th>Status</th></tr>${items.map(b => renderRow(b)).join('')}</table>
    </details>`;
  }).join('');
}

// ── Main export ───────────────────────────────────────────────────

export async function generateHtmlReport(results, { outputPath, fileCount, totalLinks }) {
  const { uniqueErrors, uniqueWarnings, manualCheckList } = results;
  const timestamp = new Date().toLocaleString('en-US', { dateStyle: 'long', timeStyle: 'short' });

  const allIssues = [...uniqueErrors, ...uniqueWarnings, ...manualCheckList];
  const externalErrors = uniqueErrors.filter(b => b.type === 'external');
  const internalErrors = uniqueErrors.filter(b => b.type === 'internal');

  // Filtered sublists for Bad links
  const internalRedirectList = uniqueWarnings.filter(w => w.severity === 'internal-redirect');
  const redirectWarningsList = uniqueWarnings.filter(w => w.severity === 'redirect');
  const anchorWarningsList = uniqueWarnings.filter(w => w.severity === 'anchor');
  const loginRequiredList = manualCheckList.filter(w => w.severity === 'login');
  const botProtectedList = manualCheckList.filter(w => w.severity === 'bot-protected' || w.severity === 'rate-limited');

  // ── Groupings ──────────────────────────────────────────────────
  // Total
  const allByLink = groupByUrl(allIssues);
  const allBySource = groupBySource(allIssues);
  const allByStatus = groupBy(allIssues, b => statusLabel(b));
  const allByDomain = groupByDomain(allIssues);
  const allByInternalPage = groupByInternalPage(allIssues);

  // Broken links
  const errorsByLink = groupByUrl(uniqueErrors);
  const errorsBySource = groupBySource(uniqueErrors);
  const errorsByStatus = groupBy(uniqueErrors, b => statusLabel(b));
  const errorsByDomain = groupByDomain(uniqueErrors);
  const errorsByInternalPage = sortedGroupBy(
    internalErrors,
    b => b.url.split('/').slice(0, 2).join('/')
  );

  // Bad links
  const warningsByLink = groupByUrl(uniqueWarnings);
  const warningsBySource = groupBySource(uniqueWarnings);

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Link Check Report — ${esc(timestamp)}</title>
<style>
  :root { --bg: #fff; --fg: #1a1a2e; --muted: #6b7280; --border: #e5e7eb; --card: #f9fafb; --red: #dc2626; --orange: #d97706; --amber: #b45309; --blue: #2563eb; --green: #16a34a; --purple: #7c3aed; --yellow-bg: #fefce8; --yellow-border: #fef08a; }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: var(--fg); background: var(--bg); line-height: 1.5; padding: 2rem; max-width: 1400px; margin: 0 auto; }
  h1 { font-size: 1.75rem; margin-bottom: 0.25rem; }
  .subtitle { color: var(--muted); margin-bottom: 2rem; font-size: 0.9rem; }
  .stats { display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 1rem; margin-bottom: 2rem; }
  .stat-card { background: var(--card); border: 1px solid var(--border); border-radius: 8px; padding: 1rem 1.25rem; }
  .stat-card .label { font-size: 0.8rem; color: var(--muted); text-transform: uppercase; letter-spacing: 0.05em; }
  .stat-card .value { font-size: 1.75rem; font-weight: 700; }
  .stat-card .value.red { color: var(--red); }
  .stat-card .value.orange { color: var(--orange); }
  .stat-card .value.amber { color: var(--amber); }
  .stat-card .value.green { color: var(--green); }
  .stat-card .value.blue { color: var(--blue); }
  .main-tabs { display: flex; gap: 0; border-bottom: 2px solid var(--border); margin-bottom: 0; }
  .main-tab { padding: 0.75rem 1.5rem; cursor: pointer; border: none; background: none; font-size: 1.05rem; color: var(--muted); border-bottom: 2px solid transparent; margin-bottom: -2px; transition: all 0.15s; display: flex; align-items: center; gap: 0.5rem; }
  .main-tab:hover { color: var(--fg); }
  .main-tab.active { color: var(--fg); border-bottom-color: var(--fg); font-weight: 600; }
  .main-tab .dot { width: 10px; height: 10px; border-radius: 50%; display: inline-block; }
  .main-tab .dot.red { background: var(--red); }
  .main-tab .dot.yellow { background: var(--amber); }
  .main-tab .dot.grey { background: #9ca3af; }
  .main-tab .badge { background: var(--border); color: var(--fg); font-size: 0.75rem; padding: 0.1em 0.5em; border-radius: 99px; font-weight: 600; }
  .main-panel { display: none; }
  .main-panel.active { display: block; }
  .subtabs { display: flex; gap: 0; border-bottom: 1px solid var(--border); margin-bottom: 1.5rem; margin-top: 0; flex-wrap: wrap; background: var(--card); }
  .subtab { padding: 0.5rem 1rem; cursor: pointer; border: none; background: none; font-size: 0.85rem; color: var(--muted); border-bottom: 2px solid transparent; margin-bottom: -1px; transition: all 0.15s; }
  .subtab:hover { color: var(--fg); }
  .subtab.active { color: var(--blue); border-bottom-color: var(--blue); font-weight: 600; }
  .subtab .badge { background: var(--border); color: var(--fg); font-size: 0.7rem; padding: 0.1em 0.45em; border-radius: 99px; margin-left: 0.3em; font-weight: 600; }
  .subtab .badge.warn { background: var(--yellow-bg); color: var(--amber); border: 1px solid var(--yellow-border); }
  .subtab.active .badge { background: #dbeafe; color: var(--blue); }
  .subpanel { display: none; }
  .subpanel.active { display: block; }
  details { border: 1px solid var(--border); border-radius: 8px; margin-bottom: 0.75rem; overflow: hidden; }
  details[open] { border-color: #c7d2fe; }
  summary { padding: 0.75rem 1rem; cursor: pointer; background: var(--card); font-weight: 500; display: flex; align-items: center; gap: 0.5rem; user-select: none; }
  summary:hover { background: #f3f4f6; }
  summary .count { background: var(--border); font-size: 0.75rem; padding: 0.1em 0.55em; border-radius: 99px; font-weight: 600; }
  summary .domain { color: var(--muted); font-weight: 400; font-size: 0.85rem; }
  table { width: 100%; border-collapse: collapse; font-size: 0.875rem; }
  th { text-align: left; padding: 0.5rem 1rem; color: var(--muted); font-weight: 600; font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.05em; border-bottom: 1px solid var(--border); background: var(--card); }
  td { padding: 0.5rem 1rem; border-bottom: 1px solid var(--border); vertical-align: top; }
  tr:last-child td { border-bottom: none; }
  .url { word-break: break-all; color: var(--blue); text-decoration: none; }
  .url:hover { text-decoration: underline; }
  .status { display: inline-block; padding: 0.15em 0.5em; border-radius: 4px; font-size: 0.8rem; font-weight: 600; }
  .status-404 { background: #fef2f2; color: var(--red); }
  .status-403 { background: #fffbeb; color: var(--orange); }
  .status-429 { background: #fffbeb; color: var(--orange); }
  .status-error { background: #fef2f2; color: var(--red); }
  .status-internal { background: #f5f3ff; color: var(--purple); }
  .status-warning { background: var(--yellow-bg); color: var(--amber); border: 1px solid var(--yellow-border); }
  .status-login { background: #f0f4ff; color: #6366f1; border: 1px solid #c7d2fe; }
  .status-internal-redirect { background: #fef3c7; color: #b45309; border: 1px solid #fbbf24; }
  .status-bot { background: #f3e8ff; color: #7c3aed; border: 1px solid #d8b4fe; }
  .redirect-target { font-family: 'SF Mono', 'Fira Code', monospace; font-size: 0.75rem; color: var(--muted); word-break: break-all; }
  .type-badge { display: inline-block; padding: 0.1em 0.5em; border-radius: 4px; font-size: 0.75rem; font-weight: 600; text-transform: uppercase; }
  .type-external { background: #eff6ff; color: var(--blue); }
  .type-internal { background: #f5f3ff; color: var(--purple); }
  .source { font-family: 'SF Mono', 'Fira Code', monospace; font-size: 0.8rem; color: var(--muted); white-space: nowrap; }
  .filter-bar { margin-bottom: 1rem; display: flex; gap: 0.75rem; align-items: center; flex-wrap: wrap; }
  .filter-bar input { padding: 0.5rem 0.75rem; border: 1px solid var(--border); border-radius: 6px; font-size: 0.875rem; width: 300px; }
  .filter-bar input:focus { outline: none; border-color: var(--blue); box-shadow: 0 0 0 3px #dbeafe; }
  .empty { text-align: center; padding: 3rem; color: var(--muted); }
</style>
</head>
<body>
<h1>Link Check Report</h1>
<p class="subtitle">Generated ${esc(timestamp)} — ${fileCount} doc files scanned</p>

<div class="stats">
  <div class="stat-card"><div class="label">Total links</div><div class="value blue">${totalLinks.toLocaleString()}</div></div>
  <div class="stat-card"><div class="label">Broken</div><div class="value red">${uniqueErrors.length}</div></div>
  <div class="stat-card"><div class="label">Stale</div><div class="value amber">${uniqueWarnings.length}</div></div>
  <div class="stat-card"><div class="label">External broken</div><div class="value orange">${externalErrors.length}</div></div>
  <div class="stat-card"><div class="label">Internal broken</div><div class="value orange">${internalErrors.length}</div></div>
  <div class="stat-card"><div class="label">Files affected</div><div class="value">${allBySource.length}</div></div>
  <div class="stat-card"><div class="label">Health</div><div class="value green">${(100 - (uniqueErrors.length / totalLinks * 100)).toFixed(1)}%</div></div>
</div>

<div class="main-tabs">
  <button class="main-tab active" data-main="total"><span class="dot grey"></span> Total <span class="badge">${allIssues.length}</span></button>
  <button class="main-tab" data-main="broken"><span class="dot red"></span> Broken links <span class="badge">${uniqueErrors.length}</span></button>
  <button class="main-tab" data-main="bad"><span class="dot yellow"></span> Stale links <span class="badge">${uniqueWarnings.length}</span></button>
  <button class="main-tab" data-main="manual"><span class="dot" style="background:#7c3aed"></span> Manual check <span class="badge">${manualCheckList.length}</span></button>
</div>

<!-- TOTAL -->
<div class="main-panel active" id="main-total">
  <div class="subtabs">
    <button class="subtab active" data-sub="total-all">All <span class="badge">${allIssues.length}</span></button>
    <button class="subtab" data-sub="total-by-link">By link <span class="badge">${allByLink.length}</span></button>
    <button class="subtab" data-sub="total-by-file">By file <span class="badge">${allBySource.length}</span></button>
    <button class="subtab" data-sub="total-by-status">By status <span class="badge">${allByStatus.size}</span></button>
    <button class="subtab" data-sub="total-ext-domain">External by domain <span class="badge">${allByDomain.length}</span></button>
    <button class="subtab" data-sub="total-int-page">Internal by page <span class="badge">${allByInternalPage.length}</span></button>
  </div>
  <div class="filter-bar"><input type="text" class="search" placeholder="Filter by URL, file, or status..." autocomplete="off"></div>

  <div class="subpanel active" id="sub-total-all">
  ${renderFlatTable(allIssues, ['Source', 'Target', 'Type', 'Status'])}
  </div>
  <div class="subpanel" id="sub-total-by-link">
  ${allByLink.length === 0 ? '<p class="empty">No issues.</p>' : renderByLink(allByLink)}
  </div>
  <div class="subpanel" id="sub-total-by-file">
  ${allBySource.length === 0 ? '<p class="empty">No issues.</p>' : renderByFile(allBySource)}
  </div>
  <div class="subpanel" id="sub-total-by-status">
  ${allByStatus.size === 0 ? '<p class="empty">No issues.</p>' : renderByStatusHtml(allByStatus.entries())}
  </div>
  <div class="subpanel" id="sub-total-ext-domain">
  ${allByDomain.length === 0 ? '<p class="empty">No external issues.</p>' : renderByDomainHtml(allByDomain)}
  </div>
  <div class="subpanel" id="sub-total-int-page">
  ${allByInternalPage.length === 0 ? '<p class="empty">No internal issues.</p>' : renderByPageHtml(allByInternalPage)}
  </div>
</div>

<!-- BROKEN LINKS -->
<div class="main-panel" id="main-broken">
  <div class="subtabs">
    <button class="subtab active" data-sub="broken-all">All <span class="badge">${uniqueErrors.length}</span></button>
    <button class="subtab" data-sub="broken-by-link">By link <span class="badge">${errorsByLink.length}</span></button>
    <button class="subtab" data-sub="broken-by-file">By file <span class="badge">${errorsBySource.length}</span></button>
    <button class="subtab" data-sub="broken-by-status">By status <span class="badge">${errorsByStatus.size}</span></button>
    <button class="subtab" data-sub="broken-ext-domain">External by domain <span class="badge">${errorsByDomain.length}</span></button>
    <button class="subtab" data-sub="broken-int-page">Internal by page <span class="badge">${errorsByInternalPage.length}</span></button>
  </div>
  <div class="filter-bar"><input type="text" class="search" placeholder="Filter by URL, file, or status..." autocomplete="off"></div>

  <div class="subpanel active" id="sub-broken-all">
  ${renderFlatTable(uniqueErrors, ['Source', 'Target', 'Type', 'Status'])}
  </div>
  <div class="subpanel" id="sub-broken-by-link">
  ${errorsByLink.length === 0 ? '<p class="empty">No broken links.</p>' : renderByLink(errorsByLink)}
  </div>
  <div class="subpanel" id="sub-broken-by-file">
  ${errorsBySource.length === 0 ? '<p class="empty">No broken links.</p>' : renderByFile(errorsBySource)}
  </div>
  <div class="subpanel" id="sub-broken-by-status">
  ${errorsByStatus.size === 0 ? '<p class="empty">No broken links.</p>' : renderByStatusHtml(errorsByStatus.entries())}
  </div>
  <div class="subpanel" id="sub-broken-ext-domain">
  ${errorsByDomain.length === 0 ? '<p class="empty">No broken external links.</p>' : renderByDomainHtml(errorsByDomain)}
  </div>
  <div class="subpanel" id="sub-broken-int-page">
  ${errorsByInternalPage.length === 0 ? '<p class="empty">No broken internal links.</p>' : renderByPageHtml(errorsByInternalPage)}
  </div>
</div>

<!-- BAD LINKS -->
<div class="main-panel" id="main-bad">
  <div class="subtabs">
    <button class="subtab active" data-sub="bad-all">All <span class="badge">${uniqueWarnings.length}</span></button>
    <button class="subtab" data-sub="bad-by-link">By link <span class="badge">${warningsByLink.length}</span></button>
    <button class="subtab" data-sub="bad-by-file">By file <span class="badge">${warningsBySource.length}</span></button>
    <button class="subtab" data-sub="bad-redirects">Redirects <span class="badge">${redirectWarningsList.length}</span></button>
    <button class="subtab" data-sub="bad-internal-redirects">Internal redirects <span class="badge">${internalRedirectList.length}</span></button>
    <button class="subtab" data-sub="bad-anchors">Missing anchors <span class="badge">${anchorWarningsList.length}</span></button>
  </div>
  <div class="filter-bar"><input type="text" class="search" placeholder="Filter by URL, file, or status..." autocomplete="off"></div>

  <div class="subpanel active" id="sub-bad-all">
  ${renderFlatTable(uniqueWarnings, ['Source', 'Target', 'Type', 'Status'])}
  </div>
  <div class="subpanel" id="sub-bad-by-link">
  ${warningsByLink.length === 0 ? '<p class="empty">No stale links.</p>' : renderByLink(warningsByLink)}
  </div>
  <div class="subpanel" id="sub-bad-by-file">
  ${warningsBySource.length === 0 ? '<p class="empty">No stale links.</p>' : renderByFile(warningsBySource)}
  </div>
  <div class="subpanel" id="sub-bad-redirects">
  ${redirectWarningsList.length === 0 ? '<p class="empty">No redirects detected.</p>' : `
  <table><tr><th>Source</th><th>URL</th><th>Type</th><th>Redirects to</th></tr>
    ${redirectWarningsList.map(b => `<tr class="row" data-search="${esc((b.source + ' ' + b.url + ' ' + b.type + ' ' + (b.redirect || '')).toLowerCase())}">
      <td class="source">${esc(b.source)}:${b.line}</td>
      <td>${b.type === 'external' ? `<a class="url" href="${esc(b.url)}" target="_blank" rel="noopener">${esc(b.url)}</a>` : esc(b.url)}</td>
      <td><span class="type-badge type-${b.type}">${b.type}</span></td>
      <td><span class="status status-warning">Redirect</span><br><span class="redirect-target">${esc(b.redirect || '')}</span></td>
    </tr>`).join('')}
  </table>`}
  </div>
  <div class="subpanel" id="sub-bad-internal-redirects">
  ${internalRedirectList.length === 0 ? '<p class="empty">No internal redirects found.</p>' : `
  <table><tr><th>Source</th><th>URL</th><th>Type</th><th>Status</th></tr>
    ${internalRedirectList.map(b => `<tr class="row" data-search="${esc((b.source + ' ' + b.url + ' ' + b.type + ' ' + (b.redirect || '')).toLowerCase())}">
      <td class="source">${esc(b.source)}:${b.line}</td>
      <td>${esc(b.url)}</td>
      <td><span class="type-badge type-${b.type}">${b.type}</span></td>
      <td><span class="status status-internal-redirect">Internal redirect</span><br><span class="redirect-target">Live: ${esc(b.redirect || '')}</span></td>
    </tr>`).join('')}
  </table>`}
  </div>
  <div class="subpanel" id="sub-bad-anchors">
  ${anchorWarningsList.length === 0 ? '<p class="empty">No missing anchors detected.</p>' : `
  <table><tr><th>Source</th><th>URL</th><th>Type</th><th>Anchor</th></tr>
    ${anchorWarningsList.map(b => `<tr class="row" data-search="${esc((b.source + ' ' + b.url + ' ' + b.type + ' ' + (b.anchor || '')).toLowerCase())}">
      <td class="source">${esc(b.source)}:${b.line}</td>
      <td>${b.type === 'external' ? `<a class="url" href="${esc(b.url)}" target="_blank" rel="noopener">${esc(b.url)}</a>` : esc(b.url)}</td>
      <td><span class="type-badge type-${b.type}">${b.type}</span></td>
      <td><span class="status status-warning">Missing anchor</span><br><span class="redirect-target">${esc(b.anchor || '')}</span></td>
    </tr>`).join('')}
  </table>`}
  </div>
</div>

<!-- MANUAL CHECK -->
<div class="main-panel" id="main-manual">
  <div class="subtabs">
    <button class="subtab active" data-sub="manual-bot">Bot-protected <span class="badge">${botProtectedList.length}</span></button>
    <button class="subtab" data-sub="manual-login">Login required <span class="badge">${loginRequiredList.length}</span></button>
  </div>
  <div class="filter-bar"><input type="text" class="search" placeholder="Filter by URL, file, or status..." autocomplete="off"></div>

  <div class="subpanel active" id="sub-manual-bot">
  ${botProtectedList.length === 0 ? '<p class="empty">No bot-protected links detected.</p>' : `
  <table><tr><th>Source</th><th>URL</th><th>Type</th><th>Status</th></tr>
    ${botProtectedList.map(b => `<tr class="row" data-search="${esc((b.source + ' ' + b.url + ' ' + b.type).toLowerCase())}">
      <td class="source">${esc(b.source)}:${b.line}</td>
      <td><a class="url" href="${esc(b.url)}" target="_blank" rel="noopener">${esc(b.url)}</a></td>
      <td><span class="type-badge type-${b.type}">${b.type}</span></td>
      <td><span class="status status-bot">${statusLabel(b)}</span></td>
    </tr>`).join('')}
  </table>`}
  </div>
  <div class="subpanel" id="sub-manual-login">
  ${loginRequiredList.length === 0 ? '<p class="empty">No login-required links detected.</p>' : `
  <table><tr><th>Source</th><th>URL</th><th>Type</th><th>Redirects to</th></tr>
    ${loginRequiredList.map(b => `<tr class="row" data-search="${esc((b.source + ' ' + b.url + ' ' + b.type + ' ' + (b.redirect || '')).toLowerCase())}">
      <td class="source">${esc(b.source)}:${b.line}</td>
      <td><a class="url" href="${esc(b.url)}" target="_blank" rel="noopener">${esc(b.url)}</a></td>
      <td><span class="type-badge type-${b.type}">${b.type}</span></td>
      <td><span class="status status-login">Login required</span><br><span class="redirect-target">${esc(b.redirect || '')}</span></td>
    </tr>`).join('')}
  </table>`}
  </div>
</div>

<script>
  document.querySelectorAll('.main-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.main-tab').forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.main-panel').forEach(p => p.classList.remove('active'));
      tab.classList.add('active');
      document.getElementById('main-' + tab.dataset.main).classList.add('active');
    });
  });
  document.querySelectorAll('.subtab').forEach(tab => {
    tab.addEventListener('click', () => {
      const panel = tab.closest('.main-panel');
      panel.querySelectorAll('.subtab').forEach(t => t.classList.remove('active'));
      panel.querySelectorAll('.subpanel').forEach(p => p.classList.remove('active'));
      tab.classList.add('active');
      panel.querySelector('#sub-' + tab.dataset.sub).classList.add('active');
    });
  });
  document.querySelectorAll('.search').forEach(input => {
    input.addEventListener('input', () => {
      const q = input.value.toLowerCase().trim();
      const panel = input.closest('.main-panel');
      panel.querySelectorAll('.row').forEach(row => {
        row.style.display = !q || row.dataset.search.includes(q) ? '' : 'none';
      });
    });
  });
</script>
</body>
</html>`;

  await writeFile(outputPath, html, 'utf-8');
  console.log(`Report written to: ${outputPath}`);
}
