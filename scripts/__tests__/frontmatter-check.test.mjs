import { test } from 'node:test';
import assert from 'node:assert/strict';
import { frontmatterError } from '../check-mdx-parse.mjs';

test('frontmatterError flags nested-quote frontmatter', () => {
  const content = '---\ntitle: "ok"\ndescription: "带有、"显示所有方案"链接。"\n---\n\nBody\n';
  const err = frontmatterError(content);
  assert.ok(err, 'expected an error object');
  assert.equal(typeof err.message, 'string');
});

test('frontmatterError returns null for valid frontmatter', () => {
  const content = '---\ntitle: "ok"\ndescription: "a clean one"\n---\n\nBody\n';
  assert.equal(frontmatterError(content), null);
});

test('frontmatterError returns null when there is no frontmatter', () => {
  assert.equal(frontmatterError('Just body text, no frontmatter.\n'), null);
});
