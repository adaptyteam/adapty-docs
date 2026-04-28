import { test } from 'node:test';
import assert from 'node:assert/strict';
import { renderMarkdown, renderMarkdownInline } from '../render-markdown.ts';

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

test('renderMarkdownInline: empty input returns empty string', () => {
  assert.equal(renderMarkdownInline(''), '');
  assert.equal(renderMarkdownInline(undefined), '');
});

test('renderMarkdownInline: renders bold and code without wrapping <p>', () => {
  const html = renderMarkdownInline('Pass `Api-Key` as the **Authorization** header.');
  assert.doesNotMatch(html, /<p>/, 'inline output must not be wrapped in <p>');
  assert.match(html, /<code>Api-Key<\/code>/);
  assert.match(html, /<strong>Authorization<\/strong>/);
});

test('renderMarkdownInline: malformed input does not throw', () => {
  assert.doesNotThrow(() => renderMarkdownInline('`unclosed'));
});
