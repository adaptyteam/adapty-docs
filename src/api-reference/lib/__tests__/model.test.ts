import { test } from 'node:test';
import assert from 'node:assert/strict';
import { loadSpec, clearSpecCache } from '../load-spec.ts';
import { buildApiSpec } from '../model.ts';

const config = {
  name: 'Adapty API', slug: 'api-adapty', specFile: 'adapty-api.yaml',
  defaultAuth: { apikeyAuth: 'Api-Key YOUR_SECRET_API_KEY' },
};

test('builds an ApiSpec from adapty-api.yaml', async () => {
  clearSpecCache();
  const deref = await loadSpec('adapty-api.yaml');
  const spec = buildApiSpec(deref, config, '/docs');
  assert.equal(spec.slug, 'api-adapty');
  assert.ok(spec.operations.length >= 10);
  const create = spec.operations.find(o => o.operationId === 'createProfile');
  assert.ok(create, 'createProfile operation should exist');
  assert.equal(create!.method, 'POST');
  assert.match(create!.descriptionHtml, /<p>/);
  assert.equal(spec.specFileUrl, '/docs/api-specs/adapty-api.yaml');
});

test('filters x-internal operations', async () => {
  clearSpecCache();
  const deref = await loadSpec('adapty-api.yaml');
  // Inject a synthetic internal op
  deref.paths['/__internal'] = {
    post: { operationId: 'synthInternal', 'x-internal': true, responses: {} },
  };
  const spec = buildApiSpec(deref, config, '/docs');
  assert.ok(!spec.operations.find(o => o.operationId === 'synthInternal'));
});

test('skips operations without operationId', async () => {
  clearSpecCache();
  const deref = await loadSpec('adapty-api.yaml');
  deref.paths['/__no-id'] = { post: { responses: {} } };
  const spec = buildApiSpec(deref, config, '/docs');
  // No throw, no entry, just a warning logged
  assert.ok(spec.operations.length >= 10);
});

test('handles cyclic schemas without stack overflow', () => {
  const cyclic: any = { type: 'object', properties: {} };
  cyclic.properties.self = cyclic;  // self-reference
  // Synthesize a minimal deref doc that buildApiSpec will traverse
  const deref = {
    openapi: '3.1.0',
    info: { version: '1.0.0' },
    paths: {
      '/cyclic': {
        post: {
          operationId: 'cyclicOp',
          summary: 'Cyclic',
          requestBody: {
            content: {
              'application/json': {
                schema: cyclic,
              },
            },
          },
          responses: {},
        },
      },
    },
  };
  const cfg = { name: 'X', slug: 'x', specFile: 'x.yaml' } as any;
  // Must not throw
  const spec = buildApiSpec(deref, cfg, '/');
  const op = spec.operations.find(o => o.operationId === 'cyclicOp');
  assert.ok(op, 'cyclicOp should exist');
  assert.ok(op!.requestBody, 'cyclic requestBody should be present');
  // The schema graph must round-trip via the same `seen` reference
  const root = op!.requestBody!.schema;
  assert.equal(root.type, 'object');
  assert.equal(root.properties!.self, root, 'self-property should reference root');
});

test('merges path-item-level parameters with operation-level (op overrides on conflict)', () => {
  const deref = {
    openapi: '3.1.0',
    info: { version: '1.0.0' },
    paths: {
      '/items/{id}': {
        parameters: [
          { name: 'id', in: 'path', required: true, schema: { type: 'string' }, description: 'shared' },
          { name: 'extra', in: 'query', schema: { type: 'string' }, description: 'shared extra' },
        ],
        get: {
          operationId: 'getItem',
          summary: 'Get item',
          parameters: [
            // Override 'id' with a different description to verify op wins
            { name: 'id', in: 'path', required: true, schema: { type: 'string' }, description: 'overridden' },
          ],
          responses: {},
        },
      },
    },
  };
  const cfg = { name: 'X', slug: 'x', specFile: 'x.yaml' } as any;
  const spec = buildApiSpec(deref, cfg, '/');
  const op = spec.operations.find(o => o.operationId === 'getItem')!;
  const idParam = op.parameters.find(p => p.name === 'id')!;
  const extraParam = op.parameters.find(p => p.name === 'extra')!;
  assert.match(idParam.descriptionHtml, /overridden/, 'op-level should override');
  assert.match(extraParam.descriptionHtml, /shared extra/, 'inherited path-item param should appear');
});

test('falls back to document-level security when op.security is omitted', () => {
  const deref = {
    openapi: '3.1.0',
    info: { version: '1.0.0' },
    security: [{ apikeyAuth: [] }],
    paths: {
      '/x': {
        post: {
          operationId: 'inheritsAuth',
          summary: 'Inherits',
          // no `security:` field
          responses: {},
        },
      },
    },
  };
  const cfg = { name: 'X', slug: 'x', specFile: 'x.yaml' } as any;
  const spec = buildApiSpec(deref, cfg, '/');
  const op = spec.operations.find(o => o.operationId === 'inheritsAuth')!;
  assert.deepEqual(op.security, ['apikeyAuth']);
});

test('explicit op.security: [] means unauthenticated, overriding document-level', () => {
  const deref = {
    openapi: '3.1.0',
    info: { version: '1.0.0' },
    security: [{ apikeyAuth: [] }],
    paths: {
      '/public': {
        get: {
          operationId: 'publicEndpoint',
          summary: 'Public',
          security: [],  // explicit "no auth"
          responses: {},
        },
      },
    },
  };
  const cfg = { name: 'X', slug: 'x', specFile: 'x.yaml' } as any;
  const spec = buildApiSpec(deref, cfg, '/');
  const op = spec.operations.find(o => o.operationId === 'publicEndpoint')!;
  assert.deepEqual(op.security, []);
});
