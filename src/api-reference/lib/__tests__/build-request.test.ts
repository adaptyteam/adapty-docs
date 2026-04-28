import { test } from 'node:test';
import assert from 'node:assert/strict';
import { buildRequest } from '../../../components/api-reference/try-it/build-request.ts';

const op = {
  operationId: 'getPaywall', method: 'GET' as const,
  path: '/api/v2/paywalls/{paywall_id}/', serverUrl: 'https://api.adapty.io',
  parameters: [], security: ['apikeyAuth'],
};
const schemes = { apikeyAuth: { type: 'apiKey' as const, in: 'header' as const, name: 'Authorization' } };

test('substitutes path params', () => {
  const r = buildRequest({
    operation: op, pathParams: { paywall_id: 'abc-123' },
    queryParams: {}, headerParams: {}, body: undefined,
    auth: { apikeyAuth: 'Api-Key X' }, securitySchemes: schemes,
  });
  assert.equal(r.url, 'https://api.adapty.io/api/v2/paywalls/abc-123/');
  assert.equal(r.headers['Authorization'], 'Api-Key X');
  assert.equal(r.method, 'GET');
  assert.equal(r.body, undefined);
});

test('drops empty query params', () => {
  const r = buildRequest({
    operation: { ...op, path: '/x' },
    pathParams: {}, queryParams: { a: '1', b: '', c: '2' },
    headerParams: {}, body: undefined,
    auth: { apikeyAuth: 'Api-Key X' }, securitySchemes: schemes,
  });
  assert.equal(r.url, 'https://api.adapty.io/x?a=1&c=2');
});

test('skips body on GET; sends body on POST with Content-Type', () => {
  const post = { ...op, method: 'POST' as const, contentType: 'application/json' };
  const r = buildRequest({
    operation: post, pathParams: {},
    queryParams: {}, headerParams: {}, body: '{"x":1}',
    auth: { apikeyAuth: 'Api-Key X' }, securitySchemes: schemes,
  });
  assert.equal(r.body, '{"x":1}');
  assert.equal(r.headers['Content-Type'], 'application/json');
});
