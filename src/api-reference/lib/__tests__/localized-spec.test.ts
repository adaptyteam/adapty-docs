import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mergeSpecWithEnglishFallback } from '../localized-spec.ts';
import type { ApiSpec, ApiOperation } from '../model.ts';

function op(operationId: string, tag: string, summary = operationId): ApiOperation {
  return {
    operationId,
    method: 'GET',
    path: `/${operationId}/`,
    summary,
    descriptionHtml: '',
    tag,
    deprecated: false,
    parameters: [],
    requestBody: undefined,
    responses: [],
    security: [],
    serverUrl: 'https://api.example.com',
  };
}

function spec(operations: ApiOperation[], overrides: Partial<ApiSpec> = {}): ApiSpec {
  const tagOrder: string[] = [];
  const tagOps = new Map<string, string[]>();
  for (const o of operations) {
    if (!o.tag) continue;
    if (!tagOps.has(o.tag)) {
      tagOps.set(o.tag, []);
      tagOrder.push(o.tag);
    }
    tagOps.get(o.tag)!.push(o.operationId);
  }
  return {
    slug: 'api-test',
    name: 'Test API',
    version: '1.0.0',
    descriptionHtml: '',
    servers: [],
    securitySchemes: {},
    operations,
    tags: tagOrder.map(name => ({ name, descriptionHtml: '', operationIds: tagOps.get(name)! })),
    defaultAuth: {},
    specFileUrl: '/docs/api-specs/test.yaml',
    ...overrides,
  };
}

test('operation missing from the localized spec falls back to English', () => {
  const en = spec([op('getProfile', 'Profile'), op('createVcTransaction', 'Virtual currency')]);
  const locale = spec([op('getProfile', 'Profile', 'Profil abrufen')]);

  const merged = mergeSpecWithEnglishFallback(locale, en);

  assert.deepEqual(
    merged.operations.map(o => o.operationId),
    ['getProfile', 'createVcTransaction'],
  );
  // Localized content wins where present; English fills the gap.
  assert.equal(merged.operations[0].summary, 'Profil abrufen');
  assert.equal(merged.operations[1].summary, 'createVcTransaction');
  // Fallback operation is navigable: its tag group exists.
  assert.deepEqual(
    merged.tags.map(t => t.name),
    ['Profile', 'Virtual currency'],
  );
  assert.deepEqual(merged.tags[1].operationIds, ['createVcTransaction']);
});

test('up-to-date localized spec is returned unchanged', () => {
  const en = spec([op('getProfile', 'Profile'), op('deleteProfile', 'Profile')]);
  const locale = spec([
    op('getProfile', 'Profil', 'Profil abrufen'),
    op('deleteProfile', 'Profil', 'Profil löschen'),
  ]);

  const merged = mergeSpecWithEnglishFallback(locale, en);

  assert.equal(merged, locale);
  // Localized tag names survive when no fallback is needed.
  assert.deepEqual(merged.tags.map(t => t.name), ['Profil']);
});

test('operation removed from the English spec is dropped from the locale', () => {
  const en = spec([op('getProfile', 'Profile')]);
  const locale = spec([
    op('getProfile', 'Profile', 'Profil abrufen'),
    op('legacyOp', 'Legacy'),
  ]);

  const merged = mergeSpecWithEnglishFallback(locale, en);

  assert.deepEqual(merged.operations.map(o => o.operationId), ['getProfile']);
  assert.deepEqual(merged.tags.map(t => t.name), ['Profile']);
});

test('non-locale content (info, servers, auth) stays localized', () => {
  const en = spec([op('getProfile', 'Profile'), op('newOp', 'Profile')], {
    descriptionHtml: '<p>English intro</p>',
  });
  const locale = spec([op('getProfile', 'Profile')], {
    descriptionHtml: '<p>Introducción</p>',
  });

  const merged = mergeSpecWithEnglishFallback(locale, en);

  assert.equal(merged.descriptionHtml, '<p>Introducción</p>');
  assert.equal(merged.operations.length, 2);
});
