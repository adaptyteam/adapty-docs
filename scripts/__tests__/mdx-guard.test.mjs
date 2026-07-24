import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  validateLocaleMdx,
  normalizeSectionBoundaries,
  restoreBlankLinesBeforeBlocks,
  fixFrontmatterBackslashQuotes,
  repairLocaleMdx,
} from '../mdx-guard.mjs';
import { hashPathFor } from '../check-mdx-parse.mjs';

// ---------------------------------------------------------------------------
// validateLocaleMdx
// ---------------------------------------------------------------------------

test('validateLocaleMdx passes a valid file', async () => {
  const content = '---\ntitle: "ok"\n---\n\nSome prose.\n\n<div style={{maxWidth: "560px"}}>\n  <span>x</span>\n</div>\n';
  assert.equal(await validateLocaleMdx(content), null);
});

test('validateLocaleMdx catches the lazy-line break (list glued to JSX block)', async () => {
  // Regression: src/locales/*/adapty-flow-builder.mdx, deploy run 29119534029.
  const content = '- **Native rendering**: renders natively.\n<div style={{\n    maxWidth: \'560px\',\n  }}>\n</div>\n';
  const err = await validateLocaleMdx(content);
  assert.ok(err, 'expected a parse error');
});

test('validateLocaleMdx catches invalid frontmatter YAML', async () => {
  // Regression: src/locales/tr/fallback-flows.mdx, deploy run 29119534029.
  const content = "---\nkeywords: ['yedek', 'flow\\'lar']\n---\n\nBody\n";
  const err = await validateLocaleMdx(content);
  assert.ok(err, 'expected a frontmatter error');
  assert.match(err.message, /frontmatter/);
});

// ---------------------------------------------------------------------------
// normalizeSectionBoundaries
// ---------------------------------------------------------------------------

test('normalizeSectionBoundaries restores a trailing blank line the model trimmed', () => {
  const english = '- item one\n- item two\n\n';
  const translation = '- элемент один\n- элемент два';
  assert.equal(
    normalizeSectionBoundaries(translation, english),
    '- элемент один\n- элемент два\n\n',
  );
});

test('normalizeSectionBoundaries removes extra blank lines the model invented', () => {
  const english = '## Heading \\{#heading\\}\nProse.';
  const translation = '\n## Заголовок \\{#heading\\}\nПроза.\n\n';
  assert.equal(
    normalizeSectionBoundaries(translation, english),
    '## Заголовок \\{#heading\\}\nПроза.',
  );
});

test('normalizeSectionBoundaries is a no-op when boundaries already match', () => {
  const english = 'Text.\n';
  const translation = 'Texto.\n';
  assert.equal(normalizeSectionBoundaries(translation, english), 'Texto.\n');
});

// ---------------------------------------------------------------------------
// restoreBlankLinesBeforeBlocks
// ---------------------------------------------------------------------------

test('restoreBlankLinesBeforeBlocks re-inserts the dropped blank line before <div', () => {
  // The exact adapty-flow-builder failure shape: blank line between the last
  // list item and the column-0 JSX block was dropped by the translator.
  const english = '- **Update without redeploying**: any time.\n\n<div style={{\n    maxWidth: \'560px\',\n}}>\n</div>\n';
  const translation = '- **Обновляйте без редеплоя**: в любой момент.\n<div style={{\n    maxWidth: \'560px\',\n}}>\n</div>\n';
  const fixed = restoreBlankLinesBeforeBlocks(translation, english);
  assert.match(fixed, /в любой момент\.\n\n<div style=\{\{/);
});

test('restoreBlankLinesBeforeBlocks leaves already-correct translations alone', () => {
  const english = 'Prose.\n\n<Tabs groupId="platform">\n</Tabs>\n';
  const translation = 'Проза.\n\n<Tabs groupId="platform">\n</Tabs>\n';
  assert.equal(restoreBlankLinesBeforeBlocks(translation, english), translation);
});

test('restoreBlankLinesBeforeBlocks skips lines that are not unique', () => {
  // Two identical closing tags — ambiguous, must not touch.
  const english = 'A.\n\n</TabItem>\nB.\n\n</TabItem>\n';
  const translation = 'А.\n</TabItem>\nБ.\n</TabItem>\n';
  assert.equal(restoreBlankLinesBeforeBlocks(translation, english), translation);
});

test('restoreBlankLinesBeforeBlocks does not touch inline < in prose', () => {
  const english = 'Use a value < 100 here.\n\nMore prose.\n';
  const translation = 'Используйте значение < 100.\nЕщё проза.\n';
  assert.equal(restoreBlankLinesBeforeBlocks(translation, english), translation);
});

// ---------------------------------------------------------------------------
// fixFrontmatterBackslashQuotes
// ---------------------------------------------------------------------------

test("fixFrontmatterBackslashQuotes repairs \\' inside a single-quoted scalar", () => {
  const content = "---\nkeywords: ['yedek', 'flow\\'lar']\n---\n\nBody\n";
  const fixed = fixFrontmatterBackslashQuotes(content);
  assert.notEqual(fixed, content);
  assert.ok(!fixed.includes("\\'"), 'backslash escape should be gone');
  assert.match(fixed, /---\n\nBody\n$/, 'body must be untouched');
});

test("fixFrontmatterBackslashQuotes repairs \\' inside a double-quoted scalar", () => {
  const content = '---\ntitle: "flow\\\'lar hakkında"\n---\n\nBody\n';
  const fixed = fixFrontmatterBackslashQuotes(content);
  assert.ok(!fixed.includes("\\'"), 'backslash escape should be gone');
});

test('fixFrontmatterBackslashQuotes is a no-op on valid frontmatter', () => {
  const content = '---\ntitle: "fine"\n---\n\nBody\n';
  assert.equal(fixFrontmatterBackslashQuotes(content), content);
});

// ---------------------------------------------------------------------------
// repairLocaleMdx — the full ladder
// ---------------------------------------------------------------------------

test('repairLocaleMdx passes a valid file through unchanged', async () => {
  const content = '---\ntitle: "ok"\n---\n\nProse.\n';
  const r = await repairLocaleMdx({ content, label: 'test' });
  assert.equal(r.ok, true);
  assert.equal(r.content, content);
  assert.equal(r.repaired, false);
});

test('repairLocaleMdx repairs broken frontmatter deterministically', async () => {
  const content = "---\nkeywords: ['flow\\'lar']\n---\n\nBody\n";
  const r = await repairLocaleMdx({ content, label: 'test' });
  assert.equal(r.ok, true);
  assert.equal(r.repaired, true);
  assert.equal(await validateLocaleMdx(r.content), null);
});

test('repairLocaleMdx falls back to English for a single broken section', async () => {
  const english = ['---\ntitle: "t"\n---\n', 'Fine prose.\n', 'List:\n\n- a\n- b\n\n<div style={{}}>\nx\n</div>\n'];
  const broken = ['---\ntitle: "т"\n---\n', 'Хорошая проза.\n', 'Список:\n- а\n- б\n<div style={{\nx\n</div>\n'];
  const sections = english.map((en, i) => ({
    id: `s${i}`,
    english: en,
    translation: broken[i],
  }));
  const reassemble = (parts) => parts.join('\n');
  const r = await repairLocaleMdx({
    content: reassemble(broken),
    sections,
    reassemble,
    label: 'test',
  });
  assert.equal(r.ok, true);
  assert.deepEqual(r.fallbackSectionIds, ['s2']);
  assert.equal(await validateLocaleMdx(r.content), null);
  assert.match(r.content, /Хорошая проза/, 'good sections keep their translation');
  assert.match(r.content, /List:/, 'broken section reverted to English');
});

test('repairLocaleMdx reports ok:false when nothing helps', async () => {
  // Two independently broken sections — single-section fallback cannot fix it.
  const sections = [
    { id: 'a', english: 'A.\n', translation: '<div style={{\n' },
    { id: 'b', english: 'B.\n', translation: '<span style={{\n' },
  ];
  const reassemble = (parts) => parts.join('\n');
  const r = await repairLocaleMdx({
    content: reassemble(sections.map((s) => s.translation)),
    sections,
    reassemble,
    label: 'test',
  });
  assert.equal(r.ok, false);
  assert.ok(r.error);
});

// ---------------------------------------------------------------------------
// hashPathFor (check-mdx-parse --revert-broken-locales helper)
// ---------------------------------------------------------------------------

test('hashPathFor maps locale pages and reusable snippets', () => {
  assert.equal(
    hashPathFor('src/locales/tr/fallback-flows.mdx'),
    'src/locales/tr/.hashes/fallback-flows.json',
  );
  assert.equal(
    hashPathFor('src/locales/zh/reusable/ProfileWeb.mdx'),
    'src/locales/zh/.hashes/reusable/ProfileWeb.json',
  );
  assert.equal(hashPathFor('src/content/docs/foo.mdx'), null);
});
