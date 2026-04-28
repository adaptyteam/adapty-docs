import { test } from 'node:test';
import assert from 'node:assert/strict';
import { loadSpec, clearSpecCache } from '../load-spec.ts';

test('loads adapty-api.yaml and dereferences refs', async () => {
  clearSpecCache();
  const doc: any = await loadSpec('adapty-api.yaml');
  assert.equal(doc.openapi, '3.1.0');
  assert.ok(doc.paths['/api/v2/server-side-api/profile/']);
  const op = doc.paths['/api/v2/server-side-api/profile/'].post;
  // ProfileResponse $ref must be inlined now
  assert.equal(op.responses['200'].content['application/json'].schema.type, 'object');
});

test('locale fallback: missing locale file falls back to English', async () => {
  clearSpecCache();
  // adapty-api.jp.yaml does NOT exist → must fall back to adapty-api.yaml
  const doc: any = await loadSpec('adapty-api.yaml', 'jp');
  assert.equal(doc.info.title, 'Adapty server-side API');
});

test('locale: localized file is loaded when present', async () => {
  clearSpecCache();
  // adapty-api.zh.yaml exists → must load the localized title
  const doc: any = await loadSpec('adapty-api.yaml', 'zh');
  assert.equal(doc.info.title, 'Adapty 服务端 API');
});
