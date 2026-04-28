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

test('curl JSON body continuation lines are indented to match flag indent', () => {
  const out = renderCurl({ operation: op, spec });
  // The first JSON line is inline with --data '{
  // Subsequent lines must start with 2 spaces (matching the --flag indent).
  const lines = out.split('\n');
  const dataLineIdx = lines.findIndex(l => l.includes("--data '{"));
  assert.ok(dataLineIdx >= 0, 'expected a --data line');
  // The next JSON line (a property) must be indented with at least 2 leading spaces.
  const next = lines[dataLineIdx + 1];
  assert.ok(next.startsWith('  '), `expected JSON continuation indented (got: ${JSON.stringify(next)})`);
  // The closing brace should also be indented.
  const closingIdx = lines.findIndex(l => l.match(/^  }'?$/));
  assert.ok(closingIdx > dataLineIdx, `expected indented closing brace, got lines: ${JSON.stringify(lines)}`);
});

test('fetch JSON body continuation lines are indented to match fetch options indent', () => {
  const out = renderFetch({ operation: op, spec });
  const lines = out.split('\n');
  const bodyLineIdx = lines.findIndex(l => l.includes('body: JSON.stringify({'));
  assert.ok(bodyLineIdx >= 0, 'expected a body: JSON.stringify line');
  // Next line must be indented with at least 2 spaces (the fetch object indent).
  const next = lines[bodyLineIdx + 1];
  assert.ok(next.startsWith('  '), `expected fetch JSON continuation indented (got: ${JSON.stringify(next)})`);
});

test('python json arg continuation lines are indented to match call indent', () => {
  const out = renderPython({ operation: op, spec });
  const lines = out.split('\n');
  const jsonLineIdx = lines.findIndex(l => l.includes('json={'));
  assert.ok(jsonLineIdx >= 0, 'expected a json= line');
  // Next line must be indented with at least 4 spaces (the requests.<method>( call indent).
  const next = lines[jsonLineIdx + 1];
  assert.ok(next.startsWith('    '), `expected python json continuation indented 4+ spaces (got: ${JSON.stringify(next)})`);
});
