import { test } from 'node:test';
import assert from 'node:assert/strict';
import { categoryPaths, proposeFamily, proposeVersion, proposeZones, proposeRole, proposeAudience } from '../context-mill/propose.mjs';

const SIDEBAR = [
  { type: 'category', label: 'Flows (Beta)', link: { type: 'doc', id: 'adapty-flow-builder' }, items: [
    { type: 'doc', id: 'builder-styling' },
    { type: 'category', label: 'Elements', items: [{ type: 'doc', id: 'paywall-element-text' }] },
  ] },
  { type: 'doc', id: 'webhook' },
];

test('categoryPaths records the full label path for every article', () => {
  const paths = categoryPaths({ tutorial: SIDEBAR });
  assert.deepEqual(paths.get('builder-styling'), [{ sidebar: 'tutorial', path: ['Flows (Beta)'], isCategoryLanding: false }]);
  assert.deepEqual(paths.get('paywall-element-text'), [{ sidebar: 'tutorial', path: ['Flows (Beta)', 'Elements'], isCategoryLanding: false }]);
  assert.deepEqual(paths.get('adapty-flow-builder'), [{ sidebar: 'tutorial', path: ['Flows (Beta)'], isCategoryLanding: true }]);
  assert.deepEqual(paths.get('webhook'), [{ sidebar: 'tutorial', path: [], isCategoryLanding: false }]);
});

test('proposeZones prefers the deepest matching category', () => {
  const map = { categories: { 'Flows (Beta)': 'flow-logic', 'Flows (Beta) > Elements': 'flow-design' }, overrides: {} };
  const out = proposeZones(categoryPaths({ tutorial: SIDEBAR }), map);
  assert.equal(out.get('builder-styling').zone, 'flow-logic');
  assert.equal(out.get('paywall-element-text').zone, 'flow-design');
  assert.equal(out.get('paywall-element-text').via, 'Flows (Beta) > Elements');
});

test('proposeZones lets an override beat the category map', () => {
  const map = { categories: { 'Flows (Beta)': 'flow-logic' }, overrides: { 'builder-styling': 'flow-design' } };
  const out = proposeZones(categoryPaths({ tutorial: SIDEBAR }), map);
  assert.equal(out.get('builder-styling').zone, 'flow-design');
  assert.equal(out.get('builder-styling').via, 'override');
});

test('proposeZones reports an article no rule covers', () => {
  const out = proposeZones(categoryPaths({ tutorial: SIDEBAR }), { categories: {}, overrides: {} });
  assert.equal(out.get('webhook').zone, null);
});

test('proposeFamily strips platform tokens, wherever they sit in the id', () => {
  assert.equal(proposeFamily('making-purchases-ios'), 'making-purchases');
  assert.equal(proposeFamily('ios-making-purchases'), 'making-purchases');
  assert.equal(proposeFamily('migration-to-react-native-sdk-34'), 'migration-to-sdk-34');
  assert.equal(proposeFamily('transaction-management'), 'transaction-management');
});

test('proposeVersion reads a version out of a migration id, or gives up honestly', () => {
  assert.equal(proposeVersion('migration-to-ios330'), '3.3');
  assert.equal(proposeVersion('migration-to-ios-315'), '3.15');
  assert.equal(proposeVersion('migration-to-ios-sdk-v4'), '4.0');
  assert.equal(proposeVersion('migration-to-flutter-sdk-34'), '3.4');
  assert.equal(proposeVersion('handle-webhooks-with-ai'), null);
});

test('proposeRole marks a category landing page as an entry', () => {
  const paths = categoryPaths({ tutorial: SIDEBAR });
  assert.equal(proposeRole('adapty-flow-builder', paths.get('adapty-flow-builder')), 'entry');
  assert.equal(proposeRole('builder-styling', paths.get('builder-styling')), null);
});

test('proposeRole marks a migration guide, wherever it sits', () => {
  assert.equal(proposeRole('migration-to-ios330', []), 'migration');
  assert.equal(proposeRole('migrate-to-flows', []), 'migration');
});

test('proposeRole returns null rather than guessing how-to versus reference', () => {
  assert.equal(proposeRole('webhook', [{ sidebar: 'tutorial', path: [], isCategoryLanding: false }]), null);
});

test('proposeAudience returns the zone-mapped audience list', () => {
  const map = { audiences: { analytics: ['analyst'] } };
  assert.deepEqual(proposeAudience('analytics', map), ['analyst']);
});

test('proposeAudience returns an empty array, not undefined, for an unmapped zone', () => {
  const map = { audiences: { analytics: ['analyst'] } };
  assert.deepEqual(proposeAudience('sdk-purchases', map), []);
});

test('proposeAudience returns an empty array for a null zone', () => {
  const map = { audiences: { analytics: ['analyst'] } };
  assert.deepEqual(proposeAudience(null, map), []);
});

// The label `Paywalls` exists in both the tutorial sidebar (legacy dashboard
// paywalls) and the unity one (SDK paywall display), so a bare rule alone would
// misroute Unity's SDK articles into the legacy dashboard zone.
const COLLIDING = {
  tutorial: [{ type: 'category', label: 'Paywalls', items: [{ type: 'doc', id: 'create-paywall' }] }],
  unity: [{ type: 'category', label: 'Paywalls', items: [{ type: 'doc', id: 'present-paywalls-unity' }] }],
};

test('proposeZones lets a sidebar-scoped rule beat a bare one at the same depth', () => {
  const map = { categories: { 'Paywalls': 'paywalls-legacy', 'unity:Paywalls': 'sdk-flows-display' }, overrides: {} };
  const out = proposeZones(categoryPaths(COLLIDING), map);
  assert.equal(out.get('create-paywall').zone, 'paywalls-legacy');
  assert.equal(out.get('present-paywalls-unity').zone, 'sdk-flows-display');
  assert.equal(out.get('present-paywalls-unity').via, 'unity:Paywalls');
});

test('proposeZones still applies a bare rule where no scoped rule exists', () => {
  const map = { categories: { 'Paywalls': 'paywalls-legacy' }, overrides: {} };
  const out = proposeZones(categoryPaths(COLLIDING), map);
  assert.equal(out.get('present-paywalls-unity').zone, 'paywalls-legacy');
});

test('proposeZones prefers a deeper bare rule over a shallower scoped one', () => {
  const sidebars = { unity: [{ type: 'category', label: 'Paywalls', items: [
    { type: 'category', label: 'Implement paywalls manually', items: [{ type: 'doc', id: 'manual-unity' }] },
  ] }] };
  const map = { categories: { 'unity:Paywalls': 'sdk-flows-display', 'Paywalls > Implement paywalls manually': 'sdk-flows-manual' }, overrides: {} };
  assert.equal(proposeZones(categoryPaths(sidebars), map).get('manual-unity').zone, 'sdk-flows-manual');
});

// This corpus deliberately lists one file in two navigations — a legacy category
// and its flow-era replacement — to keep old links working. When both map to
// different zones at the same depth, the winner must not be decided by iteration
// order.
test('proposeZones reports a same-depth conflict as a tie instead of picking silently', () => {
  const sidebars = { tutorial: [
    { type: 'category', label: 'Flows (Beta)', items: [
      { type: 'category', label: 'Localization', items: [{ type: 'doc', id: 'paywall-localization' }] },
    ] },
    { type: 'category', label: 'Paywalls', items: [
      { type: 'category', label: 'Paywall localization', items: [{ type: 'doc', id: 'paywall-localization' }] },
    ] },
  ] };
  const map = { categories: {
    'Flows (Beta) > Localization': 'flow-design',
    'Paywalls > Paywall localization': 'paywalls-legacy',
  }, overrides: {} };
  const got = proposeZones(categoryPaths(sidebars), map).get('paywall-localization');
  assert.deepEqual(got.tie, ['flow-design', 'paywalls-legacy']);
});

test('proposeZones reports no tie when an override settles it', () => {
  const sidebars = { tutorial: [
    { type: 'category', label: 'A', items: [{ type: 'doc', id: 'x' }] },
    { type: 'category', label: 'B', items: [{ type: 'doc', id: 'x' }] },
  ] };
  const map = { categories: { A: 'zone-a', B: 'zone-b' }, overrides: { x: 'zone-a' } };
  const got = proposeZones(categoryPaths(sidebars), map).get('x');
  assert.equal(got.tie, undefined);
  assert.equal(got.zone, 'zone-a');
});
