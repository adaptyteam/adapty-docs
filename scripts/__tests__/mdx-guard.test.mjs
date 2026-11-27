import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  validateLocaleMdx,
  normalizeSectionBoundaries,
  restoreBlankLinesBeforeBlocks,
  fixFrontmatterBackslashQuotes,
  repairLocaleMdx,
  structureSignature,
  repairAttributeQuotes,
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

test('normalizeSectionBoundaries restores the indentation a model stripped from the first line', () => {
  const en = '\n        3. Select **Connect an existing store product**.\n        4. Add product details:\n';
  const tr = '3. Sélectionnez **Connect an existing store product**.\n        4. Renseignez les détails :';
  assert.equal(
    normalizeSectionBoundaries(tr, en),
    '\n        3. Sélectionnez **Connect an existing store product**.\n        4. Renseignez les détails :\n',
  );
});

test('normalizeSectionBoundaries never adds or removes indentation the English first line lacks', () => {
  assert.equal(normalizeSectionBoundaries('Texte.\n', 'Text.\n'), 'Texte.\n');
  assert.equal(normalizeSectionBoundaries('      Texte.\n', '    Text.\n'), '      Texte.\n');
});

test('a chunk whose first line lost its indentation parses once boundaries are normalized', async () => {
  // quickstart-products (fr, 2026-10-05): the nested list item came back at
  // column 0 and closed the surrounding <TabItem> early.
  const head = '<Tabs>\n    <TabItem value="a" label="A">\n\n';
  const enChunk = '        3. Select **Connect**.\n\n        <Tabs>\n            <TabItem value="b" label="B" default>\n\n                - **ID**: x\n\n            </TabItem>\n        </Tabs>\n';
  const trChunk = '3. Sélectionnez **Connect**.\n\n        <Tabs>\n            <TabItem value="b" label="B" default>\n\n                - **ID** : x\n\n            </TabItem>\n        </Tabs>';
  const tail = '\n    </TabItem>\n</Tabs>\n';
  assert.notEqual(await validateLocaleMdx(head + trChunk + tail), null, 'fixture must reproduce the break');
  assert.equal(await validateLocaleMdx(head + normalizeSectionBoundaries(trChunk, enChunk) + tail), null);
});

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

test('repairLocaleMdx reverts every structurally broken section when no single swap compiles', async () => {
  // Two independently broken sections — single-section fallback cannot fix it.
  const sections = [
    { id: 'a', english: 'A.\n', translation: '<div style={{\n' },
    { id: 'ok', english: 'Fine.\n', translation: 'Хорошо.\n' },
    { id: 'b', english: 'B.\n', translation: '<span style={{\n' },
  ];
  const reassemble = (parts) => parts.join('\n');
  const r = await repairLocaleMdx({
    content: reassemble(sections.map((s) => s.translation)),
    sections,
    reassemble,
    label: 'test',
  });
  assert.equal(r.ok, true);
  assert.deepEqual(r.fallbackSectionIds, ['a', 'b']);
  assert.equal(await validateLocaleMdx(r.content), null);
  assert.match(r.content, /Хорошо/, 'structurally intact sections keep their translation');
});

test('repairLocaleMdx recovers a closing tag de-indented in another para-chunk', async () => {
  // The observer-mode failure shape: <details> opens in one chunk, the list and
  // an indented </details> follow; the translation re-indents the closer into
  // the list, so <details> is still open at </TabItem>.
  const english = [
    '<Tabs>\n<TabItem value="a" label="A">\n<details>\n   <summary>S</summary>\n',
    '   1. One.\n   2. Two.\n\n    </details>\n',
    '</TabItem>\n</Tabs>\n',
  ];
  const translated = [
    '<Tabs>\n<TabItem value="a" label="A">\n<details>\n   <summary>С</summary>\n',
    '   1. Один.\n   2. Два.\n       </details>\n',
    '</TabItem>\n</Tabs>\n',
  ];
  const sections = english.map((en, i) => ({ id: `s${i}`, english: en, translation: translated[i] }));
  const reassemble = (parts) => parts.join('\n');
  const content = reassemble(translated);
  assert.notEqual(await validateLocaleMdx(content), null, 'fixture must reproduce the break');
  const r = await repairLocaleMdx({ content, sections, reassemble, label: 'test' });
  assert.equal(r.ok, true);
  assert.equal(await validateLocaleMdx(r.content), null);
  assert.ok(r.fallbackSectionIds.includes('s1'));
});

test('repairLocaleMdx reports ok:false when nothing helps', async () => {
  // Two broken sections whose markup skeleton matches English: the structural
  // fallback has nothing to revert, and no single swap compiles.
  const sections = [
    { id: 'a', english: 'A {x}.\n', translation: 'А {x.\n' },
    { id: 'b', english: 'B {y}.\n', translation: 'Б {y.\n' },
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

test('repairAttributeQuotes converts quotes a translation put inside an attribute value', async () => {
  const en = '<ZoomImage id="ctx.webp" width="500px" alt="Context menu with the Replace in 2 places submenu open" />\n';
  const zh = '<ZoomImage id="ctx.webp" width="500px" alt="产品条目的上下文菜单，"替换 2 处"子菜单已打开" />\n';
  assert.notEqual(await validateLocaleMdx(zh), null, 'fixture must reproduce the break');
  const fixed = repairAttributeQuotes(zh, en);
  assert.equal(fixed, '<ZoomImage id="ctx.webp" width="500px" alt="产品条目的上下文菜单，“替换 2 处”子菜单已打开" />\n');
  assert.equal(await validateLocaleMdx(fixed), null);
});

test('repairAttributeQuotes handles a quoted value that is not the last attribute', () => {
  const en = '<ZoomImage id="a.webp" alt="Save button" width="500px" />';
  const tr = '<ZoomImage id="a.webp" alt="Le bouton "Enregistrer"" width="500px" />';
  assert.equal(repairAttributeQuotes(tr, en), '<ZoomImage id="a.webp" alt="Le bouton “Enregistrer”" width="500px" />');
});

test('repairAttributeQuotes leaves correct lines, prose and expression attributes alone', () => {
  const en = '<ZoomImage id="a.webp" width="500px" alt="Save" />\nClick "Save".\n<Tabs groupId="x" values={[1]}>';
  const tr = '<ZoomImage id="a.webp" width="500px" alt="Enregistrer" />\nCliquez sur "Enregistrer".\n<Tabs groupId="x" values={[1]}>';
  assert.equal(repairAttributeQuotes(tr, en), tr);
});

test('repairLocaleMdx repairs attribute quotes without falling back to English', async () => {
  const english = ['Intro.\n', '<ZoomImage id="a.webp" width="500px" alt="The Save button" />\n', 'More.\n'];
  const zh = ['介绍。\n', '<ZoomImage id="a.webp" width="500px" alt=""保存"按钮" />\n', '更多。\n'];
  const sections = english.map((en, i) => ({ id: `s${i}`, english: en, translation: zh[i] }));
  const reassemble = (parts) => parts.join('\n');
  const r = await repairLocaleMdx({ content: reassemble(zh), sections, reassemble, label: 'test' });
  assert.equal(r.ok, true);
  assert.deepEqual(r.fallbackSectionIds, []);
  assert.match(r.content, /alt="“保存”按钮"/);
});

test('structureSignature keeps markup and indentation, ignores translated text', () => {
  const en = '<Tabs groupId="x">\n  <TabItem label="Swift">\nText.\n```swift\nlet a = 1\n```\n:::note\nHi\n:::\n  </TabItem>\n</Tabs>\n';
  const tr = '<Tabs groupId="x">\n  <TabItem label="Свифт">\nТекст.\n```swift\nlet a = 1\n```\n:::note\nПривет\n:::\n  </TabItem>\n</Tabs>\n';
  assert.equal(structureSignature(tr), structureSignature(en));
  assert.notEqual(structureSignature(tr.replace('  </TabItem>', '</TabItem>')), structureSignature(en));
  assert.notEqual(structureSignature(tr.replace('<Tabs groupId="x">\n', '')), structureSignature(en));
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
