import { test } from 'node:test';
import assert from 'node:assert/strict';
import { loadZones, partitionErrors, zoneHash, zoneDrift, snapshotZone, normalizeZones, stateOrphans } from '../context-mill/zones.mjs';

const ZONES = {
  zones: [
    { id: 'sdk-purchases', title: 'SDK — purchases', kind: 'sdk-matrix' },
    { id: 'webhooks', title: 'Webhooks and ETL', kind: 'flat' },
  ],
  articles: {
    'making-purchases-ios': { zone: 'sdk-purchases', role: 'how-to', audience: ['dev'], family: 'making-purchases' },
    'webhook': { zone: 'webhooks', role: 'entry', audience: ['dev', 'analyst'] },
  },
};

const MAP = [
  { id: 'making-purchases-ios', sidebars: ['ios'], orphan: false, draft: false, headings: ['A'], shape_hash: 'aaa', api_hash: 'bbb' },
  { id: 'webhook', sidebars: ['tutorial'], orphan: false, draft: false, headings: ['A'], shape_hash: 'ccc', api_hash: 'ddd' },
];

test('loadZones indexes zones and articles', () => {
  const z = loadZones(ZONES);
  assert.equal(z.zones.get('webhooks').kind, 'flat');
  assert.equal(z.articles.get('webhook').zone, 'webhooks');
  assert.deepEqual(z.membersOf('sdk-purchases'), ['making-purchases-ios']);
});

test('loadZones rejects an unknown kind', () => {
  assert.throws(
    () => loadZones({ zones: [{ id: 'z', title: 'Z', kind: 'pyramid' }], articles: {} }),
    /unknown kind "pyramid"/,
  );
});

test('loadZones rejects a duplicate zone id', () => {
  assert.throws(
    () => loadZones({ zones: [{ id: 'z', title: 'Z', kind: 'flat' }, { id: 'z', title: 'Z2', kind: 'flat' }], articles: {} }),
    /duplicate zone id "z"/,
  );
});

test('loadZones rejects an invalid role', () => {
  assert.throws(
    () => loadZones({ zones: [{ id: 'z', title: 'Z', kind: 'flat' }], articles: { a: { zone: 'z', role: 'nice-page' } } }),
    /invalid role "nice-page"/,
  );
});

test('partitionErrors is silent on a complete partition', () => {
  assert.deepEqual(partitionErrors(MAP, loadZones(ZONES)), []);
});

test('partitionErrors reports an unassigned non-orphan article', () => {
  const map = [...MAP, { id: 'lonely', sidebars: ['tutorial'], orphan: false, draft: false, headings: [], shape_hash: 'e', api_hash: 'f' }];
  assert.deepEqual(partitionErrors(map, loadZones(ZONES)), [{ kind: 'unassigned', id: 'lonely' }]);
});

test('partitionErrors ignores unassigned orphans and drafts', () => {
  const map = [
    ...MAP,
    { id: 'dead', sidebars: [], orphan: true, draft: false, headings: [], shape_hash: 'e', api_hash: 'f' },
    { id: 'wip', sidebars: ['ios'], orphan: false, draft: true, headings: [], shape_hash: 'g', api_hash: 'h' },
  ];
  assert.deepEqual(partitionErrors(map, loadZones(ZONES)), []);
});

test('partitionErrors allows an orphan that IS assigned, so legacy pages can be tagged', () => {
  const zones = { ...ZONES, articles: { ...ZONES.articles, dead: { zone: 'webhooks', role: 'legacy-orphan' } } };
  const map = [...MAP, { id: 'dead', sidebars: [], orphan: true, draft: false, headings: [], shape_hash: 'e', api_hash: 'f' }];
  assert.deepEqual(partitionErrors(map, loadZones(zones)), []);
});

test('partitionErrors reports assignments to a nonexistent zone or article', () => {
  const zones = {
    ...ZONES,
    articles: { ...ZONES.articles, ghost: { zone: 'webhooks', role: 'how-to' }, 'webhook': { zone: 'nowhere', role: 'entry' } },
  };
  const errors = partitionErrors(MAP, loadZones(zones));
  assert.deepEqual(errors.sort((a, b) => a.kind.localeCompare(b.kind)), [
    { kind: 'unknown-article', id: 'ghost' },
    { kind: 'unknown-zone', id: 'webhook', zone: 'nowhere' },
  ]);
});

const MEMBERS = [
  { id: 'a', shape_hash: 'a1', api_hash: 'a2' },
  { id: 'b', shape_hash: 'b1', api_hash: 'b2' },
];

test('zoneHash is order-independent and changes with membership', () => {
  assert.equal(zoneHash(MEMBERS), zoneHash([...MEMBERS].reverse()));
  assert.notEqual(zoneHash(MEMBERS), zoneHash(MEMBERS.slice(0, 1)));
  assert.match(zoneHash(MEMBERS), /^[0-9a-f]{12}$/);
});

test('zoneHash changes when a member shape changes but not otherwise', () => {
  const reshaped = [{ id: 'a', shape_hash: 'CHANGED', api_hash: 'a2' }, MEMBERS[1]];
  assert.notEqual(zoneHash(MEMBERS), zoneHash(reshaped));
});

// An api_hash-only change is the case the narrow hashes exist for: a new SDK
// method arrives with no new heading, so shape_hash is untouched.
test('zoneHash and zoneDrift both react to an api_hash-only change', () => {
  const reapied = [{ id: 'a', shape_hash: 'a1', api_hash: 'CHANGED' }, MEMBERS[1]];
  assert.notEqual(zoneHash(MEMBERS), zoneHash(reapied));
  assert.deepEqual(zoneDrift(reapied, snapshotZone(MEMBERS)), { changed: ['a'], added: [], removed: [] });
});

test('snapshotZone records each member hash pair', () => {
  assert.deepEqual(snapshotZone(MEMBERS), { a: 'a1:a2', b: 'b1:b2' });
});

test('zoneDrift on an unchanged zone reports nothing', () => {
  assert.deepEqual(zoneDrift(MEMBERS, snapshotZone(MEMBERS)), { changed: [], added: [], removed: [] });
});

test('zoneDrift names changed, added, and removed articles', () => {
  const before = snapshotZone(MEMBERS);
  const now = [
    { id: 'a', shape_hash: 'NEW', api_hash: 'a2' },
    { id: 'c', shape_hash: 'c1', api_hash: 'c2' },
  ];
  assert.deepEqual(zoneDrift(now, before), { changed: ['a'], added: ['c'], removed: ['b'] });
});

test('zoneDrift treats a missing snapshot as never reviewed', () => {
  assert.deepEqual(zoneDrift(MEMBERS, undefined), { changed: [], added: ['a', 'b'], removed: [] });
});

test('loadZones rejects a string audience instead of iterating its characters', () => {
  assert.throws(
    () => loadZones({ zones: [{ id: 'z', title: 'Z', kind: 'flat' }], articles: { a: { zone: 'z', audience: 'dev' } } }),
    /audience must be an array/,
  );
});

test('normalizeZones sorts zones by id and articles by key', () => {
  const out = normalizeZones({
    zones: [{ id: 'webhooks', title: 'W', kind: 'flat' }, { id: 'ab-tests', title: 'A', kind: 'flat' }],
    articles: { zebra: { zone: 'webhooks' }, alpha: { zone: 'ab-tests' } },
  });
  assert.deepEqual(out.zones.map(z => z.id), ['ab-tests', 'webhooks']);
  assert.deepEqual(Object.keys(out.articles), ['alpha', 'zebra']);
});

test('normalizeZones is idempotent, so repeated writes produce no diff', () => {
  const once = normalizeZones({ zones: [{ id: 'b', title: 'B', kind: 'flat' }], articles: { x: { zone: 'b' } } });
  assert.deepEqual(normalizeZones(once), once);
});

test('stateOrphans finds zone-state entries for zones that no longer exist', () => {
  const zonesData = loadZones({ zones: [{ id: 'live', title: 'L', kind: 'flat' }], articles: {} });
  assert.deepEqual(stateOrphans({ live: {}, deleted: {} }, zonesData), ['deleted']);
});
