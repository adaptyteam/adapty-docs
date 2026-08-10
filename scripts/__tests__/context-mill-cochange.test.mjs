import { test } from 'node:test';
import assert from 'node:assert/strict';
import { parseLog, coChanges } from '../context-mill/cochange.mjs';

const LOG = [
  'abc123\tfix event property table',
  'src/content/docs/messaging.mdx',
  'src/content/docs/analytics-integration.mdx',
  '',
  'def456\tadd original_price',
  'src/content/docs/messaging.mdx',
  'src/content/docs/analytics-integration.mdx',
  'src/content/docs/webhook.mdx',
  '',
  'ghi789\ttypo',
  'src/content/docs/messaging.mdx',
  '',
].join('\n');

test('parseLog groups file lists by commit', () => {
  const commits = parseLog(LOG);
  assert.equal(commits.length, 3);
  assert.deepEqual(commits[0], { sha: 'abc123', subject: 'fix event property table', ids: ['messaging', 'analytics-integration'] });
  assert.deepEqual(commits[2].ids, ['messaging']);
});

test('parseLog ignores non-article paths and a commit that touched none', () => {
  const log = ['aaa\tchore\npackage.json\nscripts/x.mjs\n', 'bbb\tdoc\nsrc/content/docs/webhook.mdx\n'].join('\n');
  const commits = parseLog(log);
  assert.deepEqual(commits.map(c => c.ids), [[], ['webhook']]);
});

test('parseLog reads an article in a nested folder', () => {
  const commits = parseLog('aaa\tx\nsrc/content/docs/version-3.0/ios/making-purchases-ios.mdx\n');
  assert.deepEqual(commits[0].ids, ['making-purchases-ios']);
});

test('coChanges counts pairs and ranks them', () => {
  const pairs = coChanges(parseLog(LOG));
  assert.equal(pairs[0].a, 'analytics-integration');
  assert.equal(pairs[0].b, 'messaging');
  assert.equal(pairs[0].commits, 2);
});

test('coChanges ignores single-file commits, which carry no pairing information', () => {
  const pairs = coChanges(parseLog('aaa\tsolo\nsrc/content/docs/webhook.mdx\n'));
  assert.deepEqual(pairs, []);
});

test('coChanges drops a mass commit that would pair everything with everything', () => {
  const ids = Array.from({ length: 40 }, (_, i) => `src/content/docs/a${i}.mdx`);
  const log = ['bulk\tmass rename', ...ids, ''].join('\n');
  assert.deepEqual(coChanges(parseLog(log)), []);
});

test('coChanges separates cross-zone pairs from within-zone ones', () => {
  const zoneOf = new Map([['messaging', 'integrations'], ['analytics-integration', 'integrations'], ['webhook', 'other']]);
  const pairs = coChanges(parseLog(LOG), { zoneOf });
  const cross = pairs.filter(p => p.crossZone);
  assert.ok(cross.every(p => zoneOf.get(p.a) !== zoneOf.get(p.b)));
  assert.ok(pairs.some(p => !p.crossZone));
});
