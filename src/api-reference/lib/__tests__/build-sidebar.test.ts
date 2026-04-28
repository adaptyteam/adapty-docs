// src/api-reference/lib/__tests__/build-sidebar.test.ts
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { buildSidebar } from '../build-sidebar.ts';
import type { ApiSpec } from '../model.ts';

const fakeSpec: ApiSpec = {
  slug: 'api-x', name: 'X API', version: '1.0', descriptionHtml: '',
  servers: [], securitySchemes: {},
  operations: [
    { operationId: 'op1', method: 'GET', path: '/a', summary: 'Op One',
      descriptionHtml: '', tag: 'A', deprecated: false, parameters: [],
      responses: [], security: [], serverUrl: '' },
    { operationId: 'op2', method: 'POST', path: '/b', summary: 'Op Two',
      descriptionHtml: '', tag: 'A', deprecated: false, parameters: [],
      responses: [], security: [], serverUrl: '' },
    { operationId: 'op3', method: 'DELETE', path: '/c', summary: 'Op Three',
      descriptionHtml: '', deprecated: false, parameters: [],
      responses: [], security: [], serverUrl: '' },  // untagged
  ],
  tags: [{ name: 'A', operationIds: ['op1', 'op2'] }],
  defaultAuth: {}, specFileUrl: '/x',
};

test('builds spec-header + Overview + tag groups + Other', () => {
  const sb = buildSidebar(fakeSpec, '/docs');
  assert.equal(sb[0].label, 'X API');
  assert.equal(sb[0].items![0].label, 'Overview');
  assert.equal(sb[0].items![0].href, '/docs/api-x');
  assert.equal(sb[1].label, 'A');  // upper-cased
  assert.equal(sb[1].items!.length, 2);
  assert.equal(sb[1].items![0].href, '/docs/api-x/operations/op1');
  assert.equal(sb[1].items![0].meta!.method, 'GET');
  // Untagged op should land in OTHER
  const other = sb.find(s => s.label === 'OTHER');
  assert.ok(other, 'OTHER group should exist');
  assert.equal(other!.items!.length, 1);
  assert.equal(other!.items![0].label, 'Op Three');
});

test('strips trailing slash from basePath', () => {
  const sb = buildSidebar(fakeSpec, '/docs/');
  assert.equal(sb[0].items![0].href, '/docs/api-x');
});

test('omits OTHER when all ops are tagged', () => {
  const allTagged: ApiSpec = {
    ...fakeSpec,
    operations: fakeSpec.operations.slice(0, 2),  // only ops 1+2 (both tagged)
  };
  const sb = buildSidebar(allTagged, '/docs');
  assert.ok(!sb.find(s => s.label === 'OTHER'));
});

test('prepends a back link when backTo and backToLabel are provided', () => {
  const sb = buildSidebar(fakeSpec, '/docs', {
    backTo: '/server-side-api-specs',
    backToLabel: 'Server-side API docs',
  });
  assert.equal(sb[0].type, 'link');
  assert.equal(sb[0].label, 'Server-side API docs');
  assert.equal(sb[0].href, '/docs/server-side-api-specs');
  assert.equal(sb[0].meta!.kind, 'back');
  // Spec-name category must follow the back link
  assert.equal(sb[1].type, 'category');
  assert.equal(sb[1].label, 'X API');
});

test('omits the back link when options are not provided', () => {
  const sb = buildSidebar(fakeSpec, '/docs');
  // First section should be the spec-name category, not a back link
  assert.equal(sb[0].type, 'category');
  assert.equal(sb[0].label, 'X API');
  assert.ok(!sb.find(s => s.meta?.kind === 'back'));
});

test('omits the back link when only one of backTo/backToLabel is set', () => {
  const sbOnlyTo = buildSidebar(fakeSpec, '/docs', { backTo: '/x' });
  assert.equal(sbOnlyTo[0].type, 'category');
  const sbOnlyLabel = buildSidebar(fakeSpec, '/docs', { backToLabel: 'Y' });
  assert.equal(sbOnlyLabel[0].type, 'category');
});

test('back link href uses cleaned base path (no double slash)', () => {
  const sb = buildSidebar(fakeSpec, '/docs/', {
    backTo: '/server-side-api-specs',
    backToLabel: 'Server-side API docs',
  });
  assert.equal(sb[0].href, '/docs/server-side-api-specs');
});
