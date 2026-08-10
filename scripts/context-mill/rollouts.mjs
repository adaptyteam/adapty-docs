import { parseFrontmatter } from './lib.mjs';
import { PLATFORMS } from './roster.mjs';

export const ROLLOUT_SECTIONS = [
  'What changes',
  'Canon — decisions made on the first platform',
  'Platform state',
  'Open questions for the SDK team',
];

// Column order in the Platform state table. Positional rather than by header
// name: the header is prose a human may reword, the order is the contract.
const COLUMNS = ['platform', 'codeBranch', 'code', 'docs', 'articles', 'docsCommit', 'docsPr'];

const EMPTY = new Set(['—', '-', '–', '']);
const cell = (v) => (EMPTY.has(v) ? null : v);

function parsePlatformTable(section) {
  const rows = [];
  for (const line of section.split('\n')) {
    const trimmed = line.trim();
    if (!trimmed.startsWith('|')) continue;
    // Drop the separator row (|---|---|) and the header row, identified by its
    // first cell rather than by position, so a stray blank line above the table
    // cannot shift which row is treated as the header.
    if (/^\|[\s|:-]+\|$/.test(trimmed)) continue;
    const cells = trimmed.slice(1, -1).split('|').map(c => c.trim());
    if (cells[0].toLowerCase() === 'platform') continue;
    const row = {};
    COLUMNS.forEach((name, i) => { row[name] = cell(cells[i] ?? ''); });
    row.articles = row.articles ? row.articles.split(',').map(s => s.trim()).filter(Boolean) : [];
    rows.push(row);
  }
  return rows;
}

export function parseRollout(text) {
  const { fm, body } = parseFrontmatter(text);
  const sections = [...body.matchAll(/^##\s+(.+?)\s*$/gm)].map(m => m[1]);
  const stateMatch = body.match(/^##\s+Platform state\s*$([\s\S]*?)(?=^##\s|$(?![\s\S]))/m);
  return { fm, body, sections, platforms: stateMatch ? parsePlatformTable(stateMatch[1]) : [] };
}

// Validates that a rollout points at things that exist. A rollout is the memory
// a later automated run relies on, so a dangling reference here sends an agent
// to mirror a change it cannot find.
export function rolloutErrors(rollout, { zoneIds, articleIds }) {
  const errors = [];
  const id = rollout.fm.rollout ?? '(unnamed)';
  const present = new Set(rollout.sections);
  for (const name of ROLLOUT_SECTIONS) {
    if (!present.has(name)) errors.push({ kind: 'missing-section', id, value: name });
  }
  // zoneIds is null/undefined during bootstrap, before zones.json exists at
  // all — a rollout naming a zone that hasn't been created yet is expected in
  // that window, not an error, so zone validation is skipped entirely. Once
  // the zone layer exists, the caller passes a real Set — including an empty
  // one, which genuinely means "no zones are registered" — and every zones:
  // entry is checked against it.
  if (zoneIds) {
    for (const zone of rollout.fm.zones ?? []) {
      if (!zoneIds.has(zone)) errors.push({ kind: 'unknown-zone', id, value: zone });
    }
  }
  for (const row of rollout.platforms) {
    if (!PLATFORMS.includes(row.platform)) {
      errors.push({ kind: 'unknown-platform', id, value: row.platform });
    }
    for (const article of row.articles) {
      if (!articleIds.has(article)) errors.push({ kind: 'unknown-article', id, value: article });
    }
    // A shipped platform whose docs commit is missing cannot serve as the canon
    // for the next platform — the diff to mirror is unlocatable.
    if (row.docs === 'shipped' && !row.docsCommit) {
      errors.push({ kind: 'shipped-without-commit', id, value: row.platform });
    }
  }
  return errors;
}

export function rolloutTemplate(slug) {
  const header = `| platform | code branch | code | docs | articles written | docs commit | docs PR |`;
  const sep = `|---|---|---|---|---|---|---|`;
  const rows = PLATFORMS.map(p => `| ${p} | — | not started | — | — | — | — |`).join('\n');
  return `---
rollout: ${slug}
status: in-progress
zones: []
unattended: false
---

## What changes


## Canon — decisions made on the first platform


## Platform state
${header}
${sep}
${rows}

## Open questions for the SDK team

`;
}
