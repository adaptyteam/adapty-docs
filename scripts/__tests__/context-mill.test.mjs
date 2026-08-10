import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  parseFrontmatter,
  extractHeadings,
  contentHash,
  splitFences,
  extractSymbols,
  extractComponents,
  extractLinks,
  duplicateIds,
  parseSpec,
  shapeHash,
  apiHash,
} from '../context-mill/lib.mjs';

const SAMPLE = `---
title: "Test article"
description: "A test description"
---

Intro paragraph.

## First heading {#custom-anchor}

Text.

### Sub heading

More text.

#### H4 ignored
`;

test('parseFrontmatter returns fm object and body', () => {
  const { fm, body } = parseFrontmatter(SAMPLE);
  assert.equal(fm.title, 'Test article');
  assert.equal(fm.description, 'A test description');
  assert.ok(body.startsWith('\nIntro paragraph.'));
});

test('parseFrontmatter falls back to regex on broken YAML', () => {
  const broken = '---\ntitle: "a "quoted" mess"\ndescription: "ok desc"\n---\nBody\n';
  const { fm } = parseFrontmatter(broken);
  assert.equal(fm.description, 'ok desc');
});

test('parseFrontmatter fallback also recovers title, not just description', () => {
  const broken = '---\ntitle: "a "quoted" mess"\ndescription: "ok desc"\n---\nBody\n';
  const { fm } = parseFrontmatter(broken);
  assert.equal(fm.title, 'a "quoted" mess');
});

test('parseFrontmatter fallback recovers customSlug and reports fmError: true', () => {
  const broken = '---\ntitle: "a "quoted" mess"\ndescription: "ok desc"\ncustomSlug: "my-slug"\n---\nBody\n';
  const { fm, fmError } = parseFrontmatter(broken);
  assert.equal(fm.customSlug, 'my-slug');
  assert.equal(fmError, true);
});

test('parseFrontmatter does not set fmError on valid YAML or missing frontmatter', () => {
  const { fmError: e1 } = parseFrontmatter(SAMPLE);
  assert.ok(!e1);
  const { fmError: e2 } = parseFrontmatter('Just body.');
  assert.ok(!e2);
});

test('parseFrontmatter handles CRLF line endings', () => {
  const crlf = '---\r\ntitle: "CRLF test"\r\ndescription: "d"\r\n---\r\nBody line\r\n';
  const { fm, body } = parseFrontmatter(crlf);
  assert.equal(fm.title, 'CRLF test');
  assert.equal(fm.description, 'd');
  assert.ok(body.startsWith('Body line'));
});

test('parseFrontmatter handles no frontmatter', () => {
  const { fm, body } = parseFrontmatter('Just body.');
  assert.deepEqual(fm, {});
  assert.equal(body, 'Just body.');
});

test('extractHeadings returns H2/H3 without anchors, skips H4', () => {
  const { body } = parseFrontmatter(SAMPLE);
  assert.deepEqual(extractHeadings(body), ['First heading', 'Sub heading']);
});

test('extractHeadings strips escaped {#anchor} suffixes and unescapes backslash-escaped punctuation', () => {
  const body = [
    '## Step 1. Check bundle ID \\{#step-2-check-bundle-id\\}',
    '',
    '## 2\\. Reporting timezone',
    '',
    '## First heading {#custom-anchor}',
  ].join('\n');
  assert.deepEqual(extractHeadings(body), [
    'Step 1. Check bundle ID',
    '2. Reporting timezone',
    'First heading',
  ]);
});

test('extractHeadings strips ATX closing hashes', () => {
  assert.deepEqual(extractHeadings('## Closing hashes ##'), ['Closing hashes']);
});

test('contentHash is stable and 12 hex chars', () => {
  assert.equal(contentHash('abc'), contentHash('abc'));
  assert.match(contentHash('abc'), /^[0-9a-f]{12}$/);
  assert.notEqual(contentHash('abc'), contentHash('abd'));
});

const BODY = `
Intro with [a link](getting-started.md) and [external](https://example.com).

<Tabs groupId="platform">
<TabItem value="ios" label="iOS">

\`\`\`swift
let paywall = try await Adapty.getPaywall(placementId: "main")
Adapty.activate(with: configuration)
if condition { return }
\`\`\`

</TabItem>
</Tabs>

<ZoomImage id="pic.webp" width="700px" alt="desc" />
<Button id="quickstart-paywalls">Go</Button>
<CustomDocCardList ids={['id-one', "id-two"]} />

See [anchor link](web-api.md#auth) too.
`;

test('splitFences separates prose from code fences', () => {
  const { text, fences } = splitFences(BODY);
  assert.equal(fences.length, 1);
  assert.equal(fences[0].lang, 'swift');
  assert.ok(fences[0].code.includes('Adapty.getPaywall'));
  assert.ok(!text.includes('Adapty.activate'));
  assert.ok(text.includes('Intro with'));
});

// --- C: an odd/unclosed fence marker must not swallow the rest of the doc ---

const TWO_CLOSED_FENCES = `
Intro [link one](one.md) before the first fence.

\`\`\`js
console.log('a');
\`\`\`

Middle prose with [link two](two.md).

\`\`\`swift
print("b")
\`\`\`

Trailing prose.
`;

test('splitFences: two properly closed fences stay balanced and keep surrounding prose links', () => {
  const { text, fences, balanced } = splitFences(TWO_CLOSED_FENCES);
  assert.equal(fences.length, 2);
  assert.equal(balanced, true);
  assert.ok(text.includes('Intro [link one](one.md) before the first fence.'));
  assert.ok(text.includes('Middle prose with [link two](two.md).'));
});

const UNCLOSED_FENCE = '```js\nsome code that never closes\n\nProse after with [a link](target.md).\n';

test('splitFences: an unclosed fence is left as literal prose, not swallowing what follows', () => {
  const { text, fences, balanced } = splitFences(UNCLOSED_FENCE);
  assert.equal(balanced, false);
  assert.equal(fences.length, 0);
  assert.ok(text.includes('[a link](target.md)'));
});

const INDENTED_FENCE_BODY = `
1. Do the first thing.

   \`\`\`kotlin
   val paywallView = AdaptyUI.getPaywallView(activity)
   \`\`\`

2. Do the second thing with [a link](guide.md).
`;

test('splitFences recognizes fences indented inside a numbered list item', () => {
  const { text, fences, balanced } = splitFences(INDENTED_FENCE_BODY);
  assert.equal(fences.length, 1);
  assert.equal(fences[0].lang, 'kotlin');
  assert.ok(fences[0].code.includes('AdaptyUI.getPaywallView'));
  assert.equal(balanced, true);
  assert.ok(text.includes('[a link](guide.md)'));
});

// --- E: ~~~ fences must be recognized too, closed only by the same marker type ---

const TILDE_FENCE_BODY = `
Intro prose.

~~~diff
-old line
+new line
~~~

Prose with [a link](guide.md) after the tilde fence.
`;

test('splitFences recognizes ~~~ fences the same way as ```', () => {
  const { text, fences, balanced } = splitFences(TILDE_FENCE_BODY);
  assert.equal(fences.length, 1);
  assert.equal(fences[0].lang, 'diff');
  assert.ok(fences[0].code.includes('+new line'));
  assert.equal(balanced, true);
  assert.ok(text.includes('[a link](guide.md)'));
});

// A closing fence on the very last line of a file, with no trailing newline,
// must still close its fence. Real corpus trigger: migration-to-unity330.mdx
// ends with a bare ``` and no final newline. Requiring \n after the marker
// made that fence unclosed, so the whole code block was dropped from symbols
// (6 files, ~116 symbols lost, including every Adapty* name in them).
const FENCE_CLOSED_AT_EOF = `Intro prose.

\`\`\`swift
Adapty.activate(with: configuration)
\`\`\``;

test('splitFences closes a fence terminated at EOF without a trailing newline', () => {
  const { fences, balanced } = splitFences(FENCE_CLOSED_AT_EOF);
  assert.equal(balanced, true);
  assert.equal(fences.length, 1);
  assert.equal(fences[0].lang, 'swift');
  assert.ok(fences[0].code.includes('Adapty.activate'));
  assert.ok(extractSymbols(fences).includes('Adapty.activate'));
});

test('extractSymbols finds dotted identifiers and call names', () => {
  const { fences } = splitFences(BODY);
  const symbols = extractSymbols(fences);
  assert.ok(symbols.includes('Adapty.getPaywall'));
  assert.ok(symbols.includes('Adapty.activate'));
  // Real keyword-stoplist coverage (control-flow keywords used *with*
  // parens, which is what actually exercises CODE_KEYWORDS) lives in the
  // 'extractSymbols stoplist rejects control-flow keywords...' test below —
  // `if condition { return }` here has no parens, so it never reaches the
  // bare-call-name candidate path and would prove nothing about the
  // stoplist.
});

test('extractComponents finds capitalized JSX tags in prose', () => {
  const { text } = splitFences(BODY);
  const components = extractComponents(text);
  for (const c of ['Tabs', 'TabItem', 'ZoomImage', 'Button', 'CustomDocCardList']) {
    assert.ok(components.includes(c), `missing ${c}`);
  }
});

test('extractComponents ignores JSX-looking placeholders inside inline code spans', () => {
  const text = [
    'Use `<Key>` and `<Value>` for the setting.',
    'Use the `<USERNAME>` placeholder and `<ProjectName>` too.',
    'Use `<URL>` as well.',
    'Real component here: <ZoomImage id="x.png" />',
  ].join('\n');
  const components = extractComponents(text);
  for (const bogus of ['Key', 'Value', 'USERNAME', 'ProjectName', 'URL']) {
    assert.ok(!components.includes(bogus), `should not include ${bogus}`);
  }
  assert.ok(components.includes('ZoomImage'));
});

test('extractLinks finds internal doc ids from md links, Button, CustomDocCardList', () => {
  const { text } = splitFences(BODY);
  const links = extractLinks(text);
  assert.deepEqual(
    [...links].sort(),
    ['getting-started', 'id-one', 'id-two', 'quickstart-paywalls', 'web-api']
  );
});




// --- Issue 1: extractLinks must not treat images as doc links ---

test('extractLinks ignores markdown image syntax', () => {
  const links = extractLinks('![alt](shared/img/pic.png)');
  assert.deepEqual([...links], []);
});

test('extractLinks still extracts a normal .md link', () => {
  const links = extractLinks('[text](guide.md)');
  assert.deepEqual([...links], ['guide']);
});

test('extractLinks still extracts an extensionless internal target', () => {
  const links = extractLinks('[text](getting-started)');
  assert.deepEqual([...links], ['getting-started']);
});

test('extractLinks drops targets with non-doc file extensions', () => {
  const links = extractLinks(
    '[spec](specs/openapi.yaml) [icon](icon.svg) [data](data.json) [pic](pic.webp)'
  );
  assert.deepEqual([...links], []);
});

// --- B: API-reference operation links must not collide with SDK symbol names ---

test('extractLinks prefixes api-adapty operation links with api: to avoid SDK-name collisions', () => {
  const links = extractLinks('[x](api-adapty/operations/getProfile)');
  assert.deepEqual([...links], ['api:getProfile']);
});

test('extractLinks prefixes api-web operation links with api: too', () => {
  const links = extractLinks('[x](api-web/operations/foo)');
  assert.deepEqual([...links], ['api:foo']);
});

test('extractLinks leaves normal internal links unprefixed', () => {
  const links = extractLinks('[x](getting-started.md)');
  assert.deepEqual([...links], ['getting-started']);
});

// --- F: absolute https://adapty.io/docs/... .md links are real internal doc edges ---

test('extractLinks treats absolute adapty.io/docs .md links as internal doc ids', () => {
  const links = extractLinks('[x](https://adapty.io/docs/adapty-cursor-android.md)');
  assert.deepEqual([...links], ['adapty-cursor-android']);
});

test('extractLinks still drops other external URLs, including non-.md llms files', () => {
  const links = extractLinks(
    '[a](https://example.com/page) [b](https://adapty.io/docs/llms.txt) [c](https://adapty.io/docs/llms-full.txt)'
  );
  assert.deepEqual([...links], []);
});

// --- J: <Button> id extraction must not match data-id, and must accept single quotes ---

test('extractLinks Button-id regex ignores data-id and accepts either quote style', () => {
  const text = [
    '<Button data-id="sneaky">Go</Button>',
    `<Button id='single-quoted'>Go</Button>`,
    '<Button id="double-quoted">Go</Button>',
  ].join('\n');
  const links = extractLinks(text);
  assert.deepEqual([...links].sort(), ['double-quoted', 'single-quoted']);
});

// --- Issue 2: ids={[...]} must be scoped to CustomDocCardList only ---

test('extractLinks only reads ids={[...]} off CustomDocCardList, not arbitrary tags', () => {
  const text = `<SomethingElse ids={["sneaky"]} />\n<CustomDocCardList ids={['a']} />`;
  const links = extractLinks(text);
  assert.deepEqual([...links].sort(), ['a']);
});

// --- Issue 3: keyword stoplist must be exercised by real parenthesized keywords ---

const KEYWORD_BODY = `
\`\`\`swift
if (x) { return; }
while (y) {}
switch (z) {}
let paywall = getPaywall(placementId: "main")
\`\`\`
`;

test('extractSymbols rejects dotted noise from URLs and filenames inside fences', () => {
  const code = [
    'See https://adapty.io/docs/release-checklist.md for details.',
    'Also check example.com, github.com, email.com,',
    'strings.xml, en.json, collection.dart, hero_image_preview.png, class.java',
  ].join('\n');
  const symbols = extractSymbols([{ lang: '', code }]);
  for (const junk of [
    'adapty.io', 'example.com', 'github.com', 'email.com',
    'release-checklist.md', 'checklist.md', 'strings.xml', 'en.json',
    'collection.dart', 'hero_image_preview.png', 'class.java',
  ]) {
    assert.ok(!symbols.includes(junk), `should not include ${junk}`);
  }
});

test('extractSymbols keeps legitimate dotted API names alongside the URL/filename filter', () => {
  const code = [
    'Adapty.activate(with: configuration)',
    'AdaptyPurchaseResult.Success',
    'profile.accessLevels',
  ].join('\n');
  const symbols = extractSymbols([{ lang: '', code }]);
  assert.ok(symbols.includes('Adapty.activate'));
  assert.ok(symbols.includes('AdaptyPurchaseResult.Success'));
  assert.ok(symbols.includes('profile.accessLevels'));
});

test('extractSymbols stoplist rejects control-flow keywords used with parens, keeps real calls', () => {
  const { fences } = splitFences(KEYWORD_BODY);
  const symbols = extractSymbols(fences);
  assert.ok(!symbols.includes('if'));
  assert.ok(!symbols.includes('while'));
  assert.ok(!symbols.includes('switch'));
  assert.ok(!symbols.includes('return'));
  assert.ok(symbols.includes('getPaywall'));
});

test('shapeHash ignores prose and depends on title, headings, sidebars', () => {
  const a = shapeHash({ title: 'T', headings: ['One', 'Two'], sidebars: ['ios'] });
  const b = shapeHash({ title: 'T', headings: ['One', 'Two'], sidebars: ['ios'] });
  const c = shapeHash({ title: 'T', headings: ['One'], sidebars: ['ios'] });
  const d = shapeHash({ title: 'T', headings: ['One', 'Two'], sidebars: ['android'] });
  assert.equal(a, b);
  assert.notEqual(a, c);
  assert.notEqual(a, d);
  assert.match(a, /^[0-9a-f]{12}$/);
});

test('shapeHash is stable against sidebar order and tolerates a null title', () => {
  assert.equal(
    shapeHash({ title: null, headings: ['H'], sidebars: ['ios', 'android'] }),
    shapeHash({ title: null, headings: ['H'], sidebars: ['android', 'ios'] }),
  );
});

test('apiHash depends on the symbol set, not its order', () => {
  assert.equal(apiHash(['Adapty.activate', 'getPaywall']), apiHash(['getPaywall', 'Adapty.activate']));
  assert.notEqual(apiHash(['Adapty.activate']), apiHash(['Adapty.activate', 'getPaywall']));
  assert.match(apiHash([]), /^[0-9a-f]{12}$/);
});

test('apiHash deduplicates, so a merged symbol list hashes as a set', () => {
  assert.equal(apiHash(['Adapty.activate', 'Adapty.activate']), apiHash(['Adapty.activate']));
});

// A published API spec belongs to the corpus even though it is not an article:
// an endpoint change IS a docs change. Its structure maps onto the same narrow
// hashes — URL paths behave like headings, operationIds like symbols.
test('parseSpec builds a record whose headings are paths and symbols are operationIds', () => {
  const spec = [
    'openapi: 3.0.0',
    'info:',
    '  title: Adapty server-side API',
    '  description: The API for your backend.',
    'paths:',
    '  /profiles/:',
    '    post:',
    '      operationId: createProfile',
    '    get:',
    '      operationId: getProfile',
    '  /transactions/:',
    '    post:',
    '      operationId: setTransaction',
    '',
  ].join('\n');
  const r = parseSpec({ id: 'adapty-api', relPath: 'src/api-reference/specs/adapty-api.yaml', content: spec, name: 'Server-side API v2' });
  assert.equal(r.kind, 'spec');
  assert.equal(r.title, 'Adapty server-side API');
  assert.deepEqual(r.headings, ['/profiles/', '/transactions/']);
  assert.deepEqual(r.symbols, ['createProfile', 'getProfile', 'setTransaction']);
  // Not an orphan: a spec is reachable at its own route, it is simply not a
  // sidebar doc entry — and that is what makes the partition demand a zone.
  assert.equal(r.orphan, false);
  assert.deepEqual(r.sidebars, []);
  assert.match(r.api_hash, /^[0-9a-f]{12}$/);
});

test('parseSpec api_hash tracks operationIds, shape_hash tracks paths', () => {
  const base = 'info:\n  title: T\npaths:\n  /a/:\n    get:\n      operationId: getA\n';
  const renamed = 'info:\n  title: T\npaths:\n  /a/:\n    get:\n      operationId: fetchA\n';
  const added = 'info:\n  title: T\npaths:\n  /a/:\n    get:\n      operationId: getA\n  /b/:\n    get:\n      operationId: getB\n';
  const mk = (c) => parseSpec({ id: 's', relPath: 'p.yaml', content: c, name: 'S' });
  assert.notEqual(mk(base).api_hash, mk(renamed).api_hash);
  assert.equal(mk(base).shape_hash, mk(renamed).shape_hash);
  assert.notEqual(mk(base).shape_hash, mk(added).shape_hash);
});

test('parseSpec falls back to the config name and survives an empty spec', () => {
  const r = parseSpec({ id: 'x', relPath: 'x.yaml', content: 'openapi: 3.0.0\n', name: 'Fallback Name' });
  assert.equal(r.title, 'Fallback Name');
  assert.deepEqual(r.headings, []);
  assert.deepEqual(r.symbols, []);
});

// A spec id keeps its extension because `web-api.yaml` and `web-api.mdx` are
// two different documents that would otherwise share the id `web-api` and
// silently overwrite each other in every id-keyed Map downstream.
test('duplicateIds names records that share an id', () => {
  const records = [
    { id: 'web-api', path: 'a/web-api.mdx' },
    { id: 'web-api', path: 'b/web-api.yaml' },
    { id: 'quickstart', path: 'a/quickstart.mdx' },
  ];
  assert.deepEqual(duplicateIds(records), ['web-api -> a/web-api.mdx, b/web-api.yaml']);
});

test('duplicateIds is empty for a clean corpus', () => {
  assert.deepEqual(duplicateIds([{ id: 'a', path: 'a.mdx' }, { id: 'a.yaml', path: 'a.yaml' }]), []);
});
