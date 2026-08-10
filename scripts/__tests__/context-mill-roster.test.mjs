import { test } from 'node:test';
import assert from 'node:assert/strict';
import { PLATFORMS, platformOf, buildRows, renderRoster, undeclaredMatrixKeys } from '../context-mill/roster.mjs';
import { loadZones } from '../context-mill/zones.mjs';

const map = [
  { id: 'making-purchases-ios', sidebars: ['ios'], headings: ['A', 'B'], orphan: false, draft: false, shape_hash: 's1', api_hash: 'a1' },
  { id: 'making-purchases-android', sidebars: ['android'], headings: ['A'], orphan: false, draft: false, shape_hash: 's2', api_hash: 'a2' },
  { id: 'transaction-management', sidebars: ['ios'], headings: ['A'], orphan: false, draft: false, shape_hash: 's3', api_hash: 'a3' },
  { id: 'webhook', sidebars: ['tutorial'], headings: ['A', 'B', 'C'], orphan: false, draft: false, shape_hash: 's4', api_hash: 'a4' },
  { id: 'migration-to-ios330', sidebars: ['ios'], headings: ['A'], orphan: false, draft: false, shape_hash: 's5', api_hash: 'a5' },
];

const zones = loadZones({
  zones: [
    { id: 'sdk-purchases', title: 'SDK — purchases', kind: 'sdk-matrix' },
    { id: 'webhooks', title: 'Webhooks', kind: 'flat' },
    { id: 'sdk-migrations', title: 'SDK migrations', kind: 'version-matrix' },
  ],
  articles: {
    'making-purchases-ios': { zone: 'sdk-purchases', role: 'how-to', audience: ['dev'], family: 'making-purchases' },
    'making-purchases-android': { zone: 'sdk-purchases', role: 'how-to', audience: ['dev'], family: 'making-purchases' },
    'transaction-management': { zone: 'sdk-purchases', role: 'reference', audience: ['dev'], family: 'transaction-management' },
    'webhook': { zone: 'webhooks', role: 'entry', audience: ['dev', 'analyst'] },
    'migration-to-ios330': { zone: 'sdk-migrations', role: 'migration', audience: ['dev'], version: '3.3' },
  },
});

test('platformOf reads the platform off the sidebars, not the id', () => {
  assert.equal(platformOf({ sidebars: ['react-native'] }), 'react-native');
  assert.equal(platformOf({ sidebars: ['tutorial'] }), null);
  assert.equal(platformOf({ sidebars: [] }), null);
});

test('buildRows returns one row per article, sorted by id', () => {
  const rows = buildRows('webhooks', map, zones);
  assert.deepEqual(rows.map(r => r.id), ['webhook']);
  assert.equal(rows[0].role, 'entry');
  assert.equal(rows[0].headings, 3);
  assert.deepEqual(rows[0].audience, ['dev', 'analyst']);
});

test('flat rendering lists every column', () => {
  const out = renderRoster(zones.zones.get('webhooks'), buildRows('webhooks', map, zones));
  assert.match(out, /\| id \| role \| audience \| sections \| sidebars \|/);
  assert.match(out, /\| webhook \| entry \| dev, analyst \| 3 \| tutorial \|/);
});

test('sdk-matrix groups siblings by family and names the counterpart per platform', () => {
  const out = renderRoster(zones.zones.get('sdk-purchases'), buildRows('sdk-purchases', map, zones));
  assert.match(out, new RegExp(`\\| family \\| ${PLATFORMS.join(' \\| ')} \\|`));
  // Cells name the counterpart article, not a presence tick: this is a lookup
  // table, and an empty cell carries no claim about coverage.
  assert.match(out, /\| making-purchases \| making-purchases-ios \| making-purchases-android \|  \|/);
  assert.match(out, /\| transaction-management \| transaction-management \|  \|/);
  assert.match(out, /\| making-purchases-ios \| how-to \| dev \| 2 \| ios \|/);
});

test('sdk-matrix falls back to the id when no family is declared', () => {
  const partial = loadZones({
    zones: [{ id: 'z', title: 'Z', kind: 'sdk-matrix' }],
    articles: { 'making-purchases-ios': { zone: 'z', role: 'how-to' } },
  });
  const out = renderRoster(partial.zones.get('z'), buildRows('z', map, partial));
  assert.match(out, /\| making-purchases-ios \| making-purchases-ios \|  \|/);
});

test('version-matrix uses the declared version as the row key', () => {
  const out = renderRoster(zones.zones.get('sdk-migrations'), buildRows('sdk-migrations', map, zones));
  assert.match(out, /\| version \| ios \|/);
  assert.match(out, /\| 3\.3 \| migration-to-ios330 \|/);
});

test('an empty zone renders a placeholder rather than a headerless table', () => {
  const empty = loadZones({ zones: [{ id: 'empty', title: 'E', kind: 'flat' }], articles: {} });
  assert.equal(renderRoster(empty.zones.get('empty'), buildRows('empty', map, empty)), '_No articles assigned yet._');
});

test('version-matrix sorts versions numerically, not lexicographically', () => {
  const many = loadZones({
    zones: [{ id: 'm', title: 'M', kind: 'version-matrix' }],
    articles: {
      'mig-33': { zone: 'm', role: 'migration', version: '3.3' },
      'mig-315': { zone: 'm', role: 'migration', version: '3.15' },
      'mig-40': { zone: 'm', role: 'migration', version: '4.0' },
    },
  });
  const entries = ['mig-33', 'mig-315', 'mig-40'].map(id => ({
    id, sidebars: ['ios'], headings: [], orphan: false, draft: false, shape_hash: 's', api_hash: 'a',
  }));
  const out = renderRoster(many.zones.get('m'), buildRows('m', entries, many));
  assert.ok(out.indexOf('| 3.3 |') < out.indexOf('| 3.15 |'), '3.3 must come before 3.15');
  assert.ok(out.indexOf('| 3.15 |') < out.indexOf('| 4.0 |'), '3.15 must come before 4.0');
});

test('flat rendering shows an em dash for a missing role and empty audience', () => {
  const z = loadZones({ zones: [{ id: 'w', title: 'W', kind: 'flat' }], articles: { webhook: { zone: 'w' } } });
  const out = renderRoster(z.zones.get('w'), buildRows('w', map, z));
  assert.match(out, /\| webhook \| — \| — \| 3 \| tutorial \|/);
});

test('undeclaredMatrixKeys names sdk-matrix members with no declared family', () => {
  const z = loadZones({
    zones: [{ id: 'z', title: 'Z', kind: 'sdk-matrix' }],
    articles: {
      'making-purchases-ios': { zone: 'z', role: 'how-to', family: 'making-purchases' },
      'making-purchases-android': { zone: 'z', role: 'how-to' },
    },
  });
  assert.deepEqual(undeclaredMatrixKeys(z.zones.get('z'), buildRows('z', map, z)), ['making-purchases-android']);
});

test('undeclaredMatrixKeys names version-matrix members with no declared version', () => {
  const z = loadZones({
    zones: [{ id: 'm', title: 'M', kind: 'version-matrix' }],
    articles: { 'migration-to-ios330': { zone: 'm', role: 'migration' } },
  });
  assert.deepEqual(undeclaredMatrixKeys(z.zones.get('m'), buildRows('m', map, z)), ['migration-to-ios330']);
});

test('undeclaredMatrixKeys is silent for a flat zone and for fully declared matrices', () => {
  const flat = loadZones({ zones: [{ id: 'w', title: 'W', kind: 'flat' }], articles: { webhook: { zone: 'w' } } });
  assert.deepEqual(undeclaredMatrixKeys(flat.zones.get('w'), buildRows('w', map, flat)), []);
  const done = loadZones({
    zones: [{ id: 'm', title: 'M', kind: 'version-matrix' }],
    articles: { 'migration-to-ios330': { zone: 'm', role: 'migration', version: '3.3' } },
  });
  assert.deepEqual(undeclaredMatrixKeys(done.zones.get('m'), buildRows('m', map, done)), []);
});

// The canonical member of a family is often named exactly after the family (the
// iOS article in the making-purchases family IS `making-purchases`), so a
// declared family that happens to equal the id must NOT read as undeclared.
test('undeclaredMatrixKeys does not false-flag a member whose declared family equals its id', () => {
  const z = loadZones({
    zones: [{ id: 'z', title: 'Z', kind: 'sdk-matrix' }],
    articles: {
      'making-purchases-ios': { zone: 'z', role: 'how-to', family: 'making-purchases-ios' },
      'making-purchases-android': { zone: 'z', role: 'how-to' },
    },
  });
  assert.deepEqual(
    undeclaredMatrixKeys(z.zones.get('z'), buildRows('z', map, z)),
    ['making-purchases-android'],
  );
});

// Each platform's `<platform>-sdk-migration-guides` hub genuinely has no version,
// and an sdk-matrix landing page belongs to no family. A permanent warning on
// those would train people to ignore the report.
test('undeclaredMatrixKeys exempts entry articles, which are indexes not grid rows', () => {
  const z = loadZones({
    zones: [{ id: 'm', title: 'M', kind: 'version-matrix' }],
    articles: {
      'migration-to-ios330': { zone: 'm', role: 'entry' },
      'migration-to-ios-315': { zone: 'm', role: 'migration' },
    },
  });
  const entries = ['migration-to-ios330', 'migration-to-ios-315'].map(id => ({
    id, sidebars: ['ios'], headings: [], orphan: false, draft: false, shape_hash: 's', api_hash: 'a',
  }));
  assert.deepEqual(
    undeclaredMatrixKeys(z.zones.get('m'), buildRows('m', entries, z)),
    ['migration-to-ios-315'],
  );
});

// A legacy-orphan is a dead duplicate nobody maintains; demanding a family for
// it would warn forever, which trains people to ignore the report.
test('undeclaredMatrixKeys exempts legacy-orphan articles too', () => {
  const z = loadZones({
    zones: [{ id: 'z', title: 'Z', kind: 'sdk-matrix' }],
    articles: {
      'subscription-status': { zone: 'z', role: 'legacy-orphan' },
      'making-purchases-android': { zone: 'z', role: 'how-to' },
    },
  });
  const entries = ['subscription-status', 'making-purchases-android'].map(id => ({
    id, sidebars: ['ios'], headings: [], orphan: false, draft: false, shape_hash: 's', api_hash: 'a',
  }));
  assert.deepEqual(
    undeclaredMatrixKeys(z.zones.get('z'), buildRows('z', entries, z)),
    ['making-purchases-android'],
  );
});
