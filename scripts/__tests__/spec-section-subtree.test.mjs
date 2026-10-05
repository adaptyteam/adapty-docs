import { test } from 'node:test';
import assert from 'node:assert/strict';
import { specSectionSubtree } from '../translate.mjs';

// Regression for the vi spec failures (runs 35324631418, 37284778480): one
// section translated into invalid YAML threw inside the merge and the whole
// spec was dropped. Sections are now checked one by one as results arrive.

test('returns the subtree for each section id shape', () => {
  assert.deepEqual(
    specSectionSubtree('paths:\n  /a/:\n    post:\n      summary: Tóm tắt\n', 'paths::/a/'),
    { post: { summary: 'Tóm tắt' } },
  );
  assert.deepEqual(
    specSectionSubtree('components:\n  schemas:\n    Foo:\n      type: object\n', 'components.schemas::Foo'),
    { type: 'object' },
  );
  assert.deepEqual(
    specSectionSubtree('components:\n  securitySchemes:\n    k: {type: apiKey}\n', 'components.securitySchemes'),
    { k: { type: 'apiKey' } },
  );
  assert.deepEqual(specSectionSubtree('info:\n  title: Tiêu đề\n', 'info'), { title: 'Tiêu đề' });
});

test('throws on invalid YAML (an unquoted colon in a translated value)', () => {
  assert.throws(
    () => specSectionSubtree('paths:\n  /a/:\n    post:\n      description: Tiêu đề: hiển thị\n        x: y\n', 'paths::/a/'),
  );
});

test('throws when the translation lacks the section subtree (model commentary)', () => {
  assert.throws(
    () => specSectionSubtree('Here is the translated YAML you asked for.', 'paths::/a/'),
    /no 'paths::\/a\/' subtree/,
  );
});
