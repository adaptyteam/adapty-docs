// src/api-reference/lib/__tests__/code-samples.test.ts
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { renderCurl, renderFetch, renderPython } from '../code-samples.ts';
import type { ApiOperation, ApiSpec } from '../model.ts';

const op: ApiOperation = {
  operationId: 'createProfile', method: 'POST',
  path: '/api/v2/server-side-api/profile/', summary: 'Create profile',
  descriptionHtml: '', deprecated: false,
  parameters: [], security: ['apikeyAuth'],
  serverUrl: 'https://api.adapty.io',
  requestBody: {
    required: true, descriptionHtml: '', contentType: 'application/json',
    schema: { type: 'object' },
    examples: [{ name: 'default', value: { first_name: 'Jane' } }],
  },
  responses: [],
};
const spec: ApiSpec = {
  slug: 'api-adapty', name: 'Adapty API', version: '1.0', descriptionHtml: '',
  servers: [], securitySchemes: { apikeyAuth: { type: 'apiKey', in: 'header', name: 'Authorization' } },
  operations: [op], tags: [], defaultAuth: { apikeyAuth: 'Api-Key SECRET' },
  specFileUrl: '/docs/api-specs/adapty-api.yaml',
};

test('curl includes auth header and JSON body', () => {
  const out = renderCurl({ operation: op, spec });
  assert.match(out, /curl --request POST/);
  assert.match(out, /Authorization: Api-Key SECRET/);
  assert.match(out, /first_name/);
});

test('fetch builds a JS template', () => {
  const out = renderFetch({ operation: op, spec });
  assert.match(out, /await fetch/);
  assert.match(out, /method: 'POST'/);
  assert.match(out, /JSON.stringify/);
});

test('python uses requests and converts JSON literals', () => {
  const out = renderPython({ operation: op, spec });
  assert.match(out, /requests\.post/);
  assert.match(out, /["']first_name["']/);  // accept either quote style
});

test('python boolean/null conversion is word-bounded', () => {
  const opWithTrueLove: ApiOperation = {
    ...op,
    requestBody: {
      ...op.requestBody!,
      examples: [{ name: 'default', value: { name: 'trueLove', live: true, dead: false, prev: null } }],
    },
  };
  const out = renderPython({ operation: opWithTrueLove, spec });
  // 'trueLove' must NOT be corrupted to 'TrueLove'
  assert.match(out, /trueLove/);
  assert.ok(!/TrueLove/.test(out), 'word boundary failed: trueLove was converted');
  // But the bare booleans/null SHOULD be converted
  assert.match(out, /True\b/);
  assert.match(out, /False\b/);
  assert.match(out, /None\b/);
});
