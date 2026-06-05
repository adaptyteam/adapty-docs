import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  fixFrontmatterQuotes,
  fixTagAttrQuotes,
  fixNestedQuotesInBody,
  fixNestedQuotes,
  parsesClean,
} from '../lint-mdx.mjs';

test('fixFrontmatterQuotes converts inner double-quotes to single quotes', () => {
  const fm = 'title: "ok"\ndescription: "构建带有、"显示所有方案"链接的付费墙。"';
  const { result, changed } = fixFrontmatterQuotes(fm);
  assert.equal(changed, true);
  assert.equal(
    result,
    'title: "ok"\ndescription: "构建带有、\'显示所有方案\'链接的付费墙。"',
  );
});

test('fixFrontmatterQuotes leaves clean frontmatter untouched', () => {
  const fm = 'title: "ok"\ndescription: "a clean description"';
  const { result, changed } = fixFrontmatterQuotes(fm);
  assert.equal(changed, false);
  assert.equal(result, fm);
});

test('fixFrontmatterQuotes preserves escaped quotes', () => {
  const fm = 'description: "she said \\"hi\\""';
  const { result, changed } = fixFrontmatterQuotes(fm);
  assert.equal(changed, false);
  assert.equal(result, fm);
});

test('fixTagAttrQuotes fixes inner quotes in the last attribute', () => {
  const tag = '<ZoomImage id="a.webp" width="500px" alt="配置了"打开 URL"操作的链接" />';
  const { result, changed } = fixTagAttrQuotes(tag);
  assert.equal(changed, true);
  assert.equal(
    result,
    '<ZoomImage id="a.webp" width="500px" alt="配置了\'打开 URL\'操作的链接" />',
  );
});

test('fixTagAttrQuotes leaves a clean tag untouched', () => {
  const tag = '<ZoomImage id="a.webp" width="500px" alt="clean alt text" />';
  const { result, changed } = fixTagAttrQuotes(tag);
  assert.equal(changed, false);
  assert.equal(result, tag);
});

test('fixTagAttrQuotes does not flag a valueless/boolean attribute', () => {
  // `default` is a boolean attribute — the closing quote of `label` is
  // followed by ` default>`, which must be recognized as a boundary.
  const tag = '<TabItem value="builder" label="Paywall Builder" default>';
  const { result, changed } = fixTagAttrQuotes(tag);
  assert.equal(changed, false);
  assert.equal(result, tag);
});

test('fixTagAttrQuotes leaves a clean tag with trailing boolean attr + close', () => {
  const tag = '<Tag a="x" disabled />';
  const { result, changed } = fixTagAttrQuotes(tag);
  assert.equal(changed, false);
  assert.equal(result, tag);
});

test('fixNestedQuotesInBody skips fenced code blocks', () => {
  // Use a realistic CJK artifact: a stray inner quote followed by non-ASCII
  // text (what the translator actually produces). ASCII continuations are
  // intentionally read as adjacent attributes, not inner quotes.
  const body = [
    '```jsx',
    '<ZoomImage alt="甲"乙"丙" />',
    '```',
    '<ZoomImage alt="甲"乙"丙" />',
  ].join('\n');
  const { result, changed } = fixNestedQuotesInBody(body);
  assert.equal(changed, true);
  const out = result.split('\n');
  // Code-fence line (index 1) preserved verbatim; only the real tag (index 3) fixed.
  assert.equal(out[1], '<ZoomImage alt="甲"乙"丙" />');
  assert.equal(out[3], '<ZoomImage alt="甲\'乙\'丙" />');
});

const BROKEN_FILE = [
  '---',
  'title: "ok"',
  'description: "带有、"显示所有方案"链接。"',
  '---',
  '',
  'Intro.',
  '<ZoomImage id="a.webp" alt="配置了"打开 URL"操作" />',
].join('\n');

test('fixNestedQuotes repairs frontmatter and body together', () => {
  const { result, changed } = fixNestedQuotes(BROKEN_FILE);
  assert.equal(changed, true);
  assert.ok(result.includes('description: "带有、\'显示所有方案\'链接。"'));
  assert.ok(result.includes('alt="配置了\'打开 URL\'操作"'));
});

test('parsesClean: false for broken file, true after fix', async () => {
  assert.equal(await parsesClean(BROKEN_FILE), false);
  const { result } = fixNestedQuotes(BROKEN_FILE);
  assert.equal(await parsesClean(result), true);
});

test('fixNestedQuotes leaves a fully valid file unchanged', () => {
  const ok = '---\ntitle: "ok"\n---\n\n<ZoomImage id="a.webp" alt="clean" />\n';
  const { result, changed } = fixNestedQuotes(ok);
  assert.equal(changed, false);
  assert.equal(result, ok);
});
