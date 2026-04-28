// src/api-reference/lib/__tests__/build-sidebar.test.ts
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { buildSidebar } from '../build-sidebar.ts';
import type { ApiSpec } from '../model.ts';

const taggedSpec: ApiSpec = {
  slug: 'api-x', name: 'X API', version: '1.0', descriptionHtml: '',
  servers: [], securitySchemes: {},
  operations: [
    { operationId: 'op1', method: 'GET', path: '/a', summary: 'Op One',
      descriptionHtml: '', tag: 'A', deprecated: false, parameters: [],
      responses: [], security: [], serverUrl: '' },
    { operationId: 'op2', method: 'POST', path: '/b', summary: 'Op Two',
      descriptionHtml: '', tag: 'A', deprecated: false, parameters: [],
      responses: [], security: [], serverUrl: '' },
  ],
  tags: [{ name: 'A', operationIds: ['op1', 'op2'] }],
  defaultAuth: {}, specFileUrl: '/x',
};

const untaggedSpec: ApiSpec = {
  slug: 'api-y', name: 'Y API', version: '1.0', descriptionHtml: '',
  servers: [], securitySchemes: {},
  operations: [
    { operationId: 'op1', method: 'GET', path: '/a', summary: 'Op One',
      descriptionHtml: '', deprecated: false, parameters: [],
      responses: [], security: [], serverUrl: '' },
    { operationId: 'op2', method: 'DELETE', path: '/b', summary: 'Op Two',
      descriptionHtml: '', deprecated: false, parameters: [],
      responses: [], security: [], serverUrl: '' },
  ],
  tags: [],
  defaultAuth: {}, specFileUrl: '/y',
};

test('tagged spec: spec name is a top-level overview link, tag groups follow as non-collapsible sections', () => {
  const sb = buildSidebar(taggedSpec, '/docs');
  assert.equal(sb.length, 2);

  // Spec name → top-level link to overview, no nested Overview child
  assert.equal(sb[0].type, 'link');
  assert.equal(sb[0].label, 'X API');
  assert.equal(sb[0].href, '/docs/api-x');

  // Tag group is a non-collapsible category
  assert.equal(sb[1].type, 'category');
  assert.equal(sb[1].label, 'A');  // upper-cased
  assert.equal(sb[1].noToggle, true);
  assert.equal(sb[1].items!.length, 2);
  assert.equal(sb[1].items![0].href, '/docs/api-x/operations/op1');
  assert.equal(sb[1].items![0].meta!.method, 'GET');
});

test('strips trailing slash from basePath', () => {
  const sb = buildSidebar(taggedSpec, '/docs/');
  assert.equal(sb[0].href, '/docs/api-x');
});

test('untagged spec: spec name is the overview link, ops listed beneath as a non-collapsible group', () => {
  const sb = buildSidebar(untaggedSpec, '/docs');
  assert.equal(sb.length, 1, 'no extra group when there are no tags');

  const root = sb[0];
  assert.equal(root.type, 'category');
  assert.equal(root.label, 'Y API');
  assert.equal(root.href, '/docs/api-y', 'spec title links to the overview');
  assert.equal(root.noToggle, true);

  // Ops live directly under the spec section — no separate Overview child
  assert.equal(root.items!.length, 2);
  assert.equal(root.items![0].label, 'Op One');
  assert.equal(root.items![0].meta!.method, 'GET');
  assert.equal(root.items![1].label, 'Op Two');
  assert.equal(root.items![1].meta!.method, 'DELETE');

  // 'Other' label must not appear anywhere when there are no tags
  for (const s of sb) {
    assert.notEqual((s.label ?? '').toLowerCase(), 'other');
  }
});
