import { test } from 'node:test';
import assert from 'node:assert/strict';
import { renderMarkdown } from '../render-markdown.ts';

test('empty input returns empty string', () => {
  assert.equal(renderMarkdown(''), '');
  assert.equal(renderMarkdown(undefined), '');
});

test('renders a paragraph with a link', () => {
  const html = renderMarkdown('See [the docs](https://adapty.io).');
  assert.match(html, /<p>/);
  assert.match(html, /<a href="https:\/\/adapty.io"/);
});

test('renders a fenced code block', () => {
  const html = renderMarkdown('```\ncurl https://api.adapty.io\n```');
  assert.match(html, /<pre>/);
  assert.match(html, /<code>/);
});

test('malformed input does not throw', () => {
  assert.doesNotThrow(() => renderMarkdown('```\nunclosed'));
  assert.doesNotThrow(() => renderMarkdown('<<< not real markdown >>>'));
});
