import { test } from 'node:test';
import assert from 'node:assert/strict';
import { ROLLOUT_SECTIONS, parseRollout, rolloutErrors, rolloutTemplate } from '../context-mill/rollouts.mjs';
import { PLATFORMS } from '../context-mill/roster.mjs';

const ROLLOUT = `---
rollout: sdk-41-attribution-optin
status: in-progress
zones: [sdk-users-access, sdk-migrations]
unattended: false
---

## What changes
Attribution becomes an opt-in flag at activation.

## Canon — decisions made on the first platform
- version notes say "SDK 4.1+", with no platform qualifier
- a separate migration-to-<platform>-sdk-41 guide, not a section in an existing one

## Platform state
| platform | code branch | code | docs | articles written | docs commit | docs PR |
|---|---|---|---|---|---|---|
| ios | origin/release/4.1 | merged | shipped | migration-to-ios-sdk-v4, quickstart-identify | 7dd7956 | #452 |
| android | origin/release/4.1 | in progress | next | — | — | — |

## Open questions for the SDK team
- the locale parameter is still undecided on Flutter
`;

test('parseRollout reads frontmatter, sections, and the platform table', () => {
  const r = parseRollout(ROLLOUT);
  assert.equal(r.fm.rollout, 'sdk-41-attribution-optin');
  assert.equal(r.fm.status, 'in-progress');
  assert.deepEqual(r.fm.zones, ['sdk-users-access', 'sdk-migrations']);
  assert.equal(r.fm.unattended, false);
  assert.deepEqual(r.sections, ROLLOUT_SECTIONS);
  assert.equal(r.platforms.length, 2);
});

test('parseRollout parses a platform row into named fields', () => {
  const [ios, android] = parseRollout(ROLLOUT).platforms;
  assert.equal(ios.platform, 'ios');
  assert.equal(ios.codeBranch, 'origin/release/4.1');
  assert.equal(ios.docs, 'shipped');
  assert.deepEqual(ios.articles, ['migration-to-ios-sdk-v4', 'quickstart-identify']);
  assert.equal(ios.docsCommit, '7dd7956');
  assert.deepEqual(android.articles, []);
  assert.equal(android.docsCommit, null);
});

test('parseRollout skips the header and separator rows, not data rows', () => {
  assert.deepEqual(parseRollout(ROLLOUT).platforms.map(p => p.platform), ['ios', 'android']);
});

test('rolloutErrors is silent on a valid rollout', () => {
  const errors = rolloutErrors(parseRollout(ROLLOUT), {
    zoneIds: new Set(['sdk-users-access', 'sdk-migrations']),
    articleIds: new Set(['migration-to-ios-sdk-v4', 'quickstart-identify']),
  });
  assert.deepEqual(errors, []);
});

test('rolloutErrors reports an unknown platform, zone, and article', () => {
  const text = ROLLOUT
    .replace('zones: [sdk-users-access, sdk-migrations]', 'zones: [sdk-users-access, no-such-zone]')
    .replace('| ios |', '| iphone |')
    .replace('quickstart-identify', 'no-such-article');
  const errors = rolloutErrors(parseRollout(text), {
    zoneIds: new Set(['sdk-users-access', 'sdk-migrations']),
    articleIds: new Set(['migration-to-ios-sdk-v4', 'quickstart-identify']),
  });
  assert.deepEqual(errors.map(e => e.kind).sort(), ['unknown-article', 'unknown-platform', 'unknown-zone']);
  assert.ok(errors.some(e => e.kind === 'unknown-platform' && e.value === 'iphone'));
});

test('rolloutErrors reports a missing required section', () => {
  const text = ROLLOUT.replace(/## Open questions for the SDK team[\s\S]*$/, '');
  const errors = rolloutErrors(parseRollout(text), { zoneIds: new Set(), articleIds: new Set() });
  assert.ok(errors.some(e => e.kind === 'missing-section' && e.value === 'Open questions for the SDK team'));
});

test('rolloutErrors reports a shipped platform with no docs commit', () => {
  const text = ROLLOUT.replace('| 7dd7956 | #452 |', '| — | #452 |');
  const errors = rolloutErrors(parseRollout(text), {
    zoneIds: new Set(['sdk-users-access', 'sdk-migrations']),
    articleIds: new Set(['migration-to-ios-sdk-v4', 'quickstart-identify']),
  });
  assert.deepEqual(errors, [{ kind: 'shipped-without-commit', id: 'sdk-41-attribution-optin', value: 'ios' }]);
});

test('rolloutErrors skips zone checks when zoneIds is null, but still checks articles', () => {
  const errors = rolloutErrors(parseRollout(ROLLOUT), {
    zoneIds: null,
    articleIds: new Set(['migration-to-ios-sdk-v4']),
  });
  assert.deepEqual(errors, [
    { kind: 'unknown-article', id: 'sdk-41-attribution-optin', value: 'quickstart-identify' },
  ]);
});

test('rolloutErrors still reports unknown zones when given an empty Set', () => {
  const errors = rolloutErrors(parseRollout(ROLLOUT), {
    zoneIds: new Set(),
    articleIds: new Set(['migration-to-ios-sdk-v4', 'quickstart-identify']),
  });
  assert.deepEqual(errors.map(e => e.kind), ['unknown-zone', 'unknown-zone']);
});

test('rolloutTemplate scaffolds a file its own validator accepts', () => {
  const r = parseRollout(rolloutTemplate('sdk-42-something'));
  assert.equal(r.fm.rollout, 'sdk-42-something');
  assert.deepEqual(r.sections, ROLLOUT_SECTIONS);
  assert.deepEqual(r.platforms.map(p => p.platform), PLATFORMS);
  assert.deepEqual(rolloutErrors(r, { zoneIds: new Set(), articleIds: new Set() }), []);
});
