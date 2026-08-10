// Builds and renders the per-zone "roster" table that appears in each zone's
// hand-written brief. No file I/O, no markdown parsing, no git — this module
// only turns docs-map records plus zone curation metadata into markdown.

export const PLATFORMS = ['ios', 'android', 'react-native', 'flutter', 'unity', 'kmp', 'capacitor'];

// Platform comes from sidebar membership, which is authoritative, never from the
// filename — some ids keep an old platform token for SEO reasons.
export function platformOf(entry) {
  return (entry.sidebars ?? []).find(s => PLATFORMS.includes(s)) ?? null;
}

export function buildRows(zoneId, mapEntries, zonesData) {
  const byId = new Map(mapEntries.map(e => [e.id, e]));
  return zonesData.membersOf(zoneId).flatMap(id => {
    const entry = byId.get(id);
    if (!entry) return [];
    const meta = zonesData.articles.get(id);
    return [{
      id,
      role: meta.role ?? null,
      audience: meta.audience ?? [],
      family: meta.family ?? id,
      // Whether the curator actually declared these, kept separate from the
      // fallback value. Inferring "undeclared" from `family === id` would be
      // wrong: the canonical member of a family is often named exactly after it
      // (the iOS article in the making-purchases family IS `making-purchases`),
      // so every sdk-matrix zone would raise a false warning for its own base
      // article. Declared values are declared, never derived.
      familyDeclared: meta.family !== undefined,
      versionDeclared: meta.version !== undefined,
      version: meta.version ?? null,
      platform: platformOf(entry),
      headings: (entry.headings ?? []).length,
      sidebars: entry.sidebars ?? [],
    }];
  });
}

const cell = (v) => (v === null || v === undefined || v === '' ? '—' : v);

// `sections`, not `H2`: the column counts H2/H3 headings for an article but URL
// paths for an API spec, and a spec row showing "12" under an H2 header reads as
// twelve headings in a file that has none.
function renderFlat(rows) {
  return [
    '| id | role | audience | sections | sidebars |',
    '|---|---|---|---|---|',
    ...rows.map(r => `| ${r.id} | ${cell(r.role)} | ${cell(r.audience.join(', '))} | ${r.headings} | ${cell(r.sidebars.join(', '))} |`),
  ].join('\n');
}

// Version keys must sort numerically. A plain string sort puts "3.10" before
// "3.9", which silently misorders the migration grid — and the corpus already
// has 3.3, 3.4, 3.8, 3.10, 3.12, 3.14, 3.15, 3.16 and 4.0.
const byVersion = (a, b) => a.localeCompare(b, undefined, { numeric: true });

// A lookup table, NOT a completeness audit. Each cell holds the article id that
// covers that topic on that platform, which answers the question an agent
// actually has — "the iOS article is X, which one is the Android counterpart?"
//
// It deliberately does not mark absences. Reviewing per-platform coverage is not
// this tool's job: not every topic needs an equivalent on all seven platforms,
// and article ids vary in wording (`web-paywall` vs `unity-web-paywalls`,
// `handle-errors` vs `ios-sdk-error-handling`) so a same-key comparison measures
// naming, not coverage. An empty cell means "nothing under this family key here",
// never "missing".
function renderKeyed(rows, keyOf, keyLabel, compare) {
  const keys = [...new Set(rows.map(keyOf).filter(Boolean))].sort(compare);
  const grid = keys.map(key => {
    const byPlatform = new Map(rows.filter(r => keyOf(r) === key && r.platform).map(r => [r.platform, r.id]));
    return `| ${key} | ${PLATFORMS.map(p => byPlatform.get(p) ?? '').join(' | ')} |`;
  });
  return [
    `| ${keyLabel} | ${PLATFORMS.join(' | ')} |`,
    `|---|${PLATFORMS.map(() => '---').join('|')}|`,
    ...grid,
    '',
    renderFlat(rows),
  ].join('\n');
}

export function renderRoster(zone, rows) {
  if (rows.length === 0) return '_No articles assigned yet._';
  if (zone.kind === 'sdk-matrix') return renderKeyed(rows, r => r.family, 'family');
  if (zone.kind === 'version-matrix') return renderKeyed(rows, r => r.version, 'version', byVersion);
  return renderFlat(rows);
}

// buildRows' `family: meta.family ?? id` fallback is deliberate — an undeclared
// member still has to render somewhere rather than vanish — but it is silent,
// and silence breaks the lookup table: an undeclared member gets its own row
// keyed by its id instead of sitting beside its counterparts, so asking "which
// article covers this on Android" stops working for that topic. This function
// names those members so the command layer can ask a human to declare the key.
// It is about grouping, not about coverage.
export function undeclaredMatrixKeys(zone, rows) {
  // An `entry` article is a navigational index and a `legacy-orphan` is a dead
  // page — neither is a grid row. Each platform's `<platform>-sdk-migration-guides`
  // hub has no version by nature, an sdk-matrix zone's landing page belongs to no
  // family, and demanding a family for a known duplicate nobody maintains would
  // fire forever and train people to ignore the whole report.
  const gridRows = rows.filter(r => r.role !== 'entry' && r.role !== 'legacy-orphan');
  if (zone.kind === 'sdk-matrix') {
    return gridRows.filter(r => !r.familyDeclared).map(r => r.id).sort();
  }
  if (zone.kind === 'version-matrix') {
    return gridRows.filter(r => !r.versionDeclared).map(r => r.id).sort();
  }
  return [];
}

