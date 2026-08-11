import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { extractLinks, categorizeLinks, isAnchorOnlyUrl, linkKey, uniqueByKey } from '../check-links/scan.mjs';
import { checkInternalLink, headingIdsFromContent } from '../check-links/check-internal.mjs';

// Regression for the miss behind commit 038aeb51: sdk-installation-ios.mdx linked
// `#set-up-media-cache-configuration-for-adaptyui` after that heading had been
// renamed. categorizeLinks bucketed same-page anchors with mailto:/tel: and threw
// them away, so the checker never looked at them — 21 English and 148 localized
// same-page anchors were broken and unreported.

test('same-page anchors are checkable links, not discarded', () => {
  const links = [
    { url: '#some-heading', sourcePath: '/docs/a.mdx' },
    { url: 'other-page#h', sourcePath: '/docs/a.mdx' },
    { url: 'mailto:x@y.z', sourcePath: '/docs/a.mdx' },
    { url: 'tel:+1', sourcePath: '/docs/a.mdx' },
    { url: '#', sourcePath: '/docs/a.mdx' },            // bare placeholder — no target
    { url: 'https://example.com', sourcePath: '/docs/a.mdx' },
  ];
  const { internalLinks, externalLinks } = categorizeLinks(links);
  assert.deepEqual(internalLinks.map(l => l.url), ['#some-heading', 'other-page#h']);
  assert.deepEqual(externalLinks.map(l => l.url), ['https://example.com']);
});

test('isAnchorOnlyUrl excludes the bare "#" placeholder', () => {
  assert.equal(isAnchorOnlyUrl('#overview'), true);
  assert.equal(isAnchorOnlyUrl('#'), false);
  assert.equal(isAnchorOnlyUrl('page#overview'), false);
});

// `#overview` means a different target in every file, so a URL-keyed result cache
// would reuse one file's verdict for another's.
test('anchor-only links are cached per source file, other links per URL', () => {
  const a = { url: '#overview', sourcePath: '/docs/a.mdx' };
  const b = { url: '#overview', sourcePath: '/docs/b.mdx' };
  const c = { url: 'guide#overview', sourcePath: '/docs/a.mdx' };
  const d = { url: 'guide#overview', sourcePath: '/docs/b.mdx' };

  assert.notEqual(linkKey(a), linkKey(b));
  assert.equal(linkKey(c), linkKey(d));
  assert.equal(uniqueByKey([a, b, c, d]).length, 3);
});

test('extractLinks records the absolute source path', () => {
  const links = extractLinks('see [x](#y)', '/repo/src/content/docs/a.mdx', '/repo/src/content/docs');
  assert.equal(links[0].sourcePath, '/repo/src/content/docs/a.mdx');
  assert.equal(links[0].source, 'a.mdx');
});

// Translated headings carry the English id MDX-escaped: `## 标题 \{#id\}`. The old
// regex /\{#([^}]+)\}/ captured the trailing backslash, so every escaped id read as
// missing — 2,342 findings of which only 148 were real. That is why locale anchor
// checking was switched off wholesale.
test('custom heading ids are read in both plain and escaped form', () => {
  const ids = headingIdsFromContent([
    '## Plain heading',
    '## With custom id {#custom-one}',
    '## 翻译された見出し \\{#custom-two\\}',
  ].join('\n'));

  assert.ok(ids.has('plain-heading'));
  assert.ok(ids.has('custom-one'));
  assert.ok(ids.has('custom-two'), 'escaped \\{#id\\} must not capture the backslash');
  assert.ok(!ids.has('custom-two\\'));
});

test('explicit id="..." attributes count as anchor targets', () => {
  const ids = headingIdsFromContent('<div id="install-tools-title">x</div>');
  assert.ok(ids.has('install-tools-title'));
});

test('duplicate headings get github-slugger suffixes, and state does not leak between files', () => {
  const first = headingIdsFromContent('## Setup\n## Setup');
  assert.ok(first.has('setup') && first.has('setup-1'));
  // A second document must start numbering afresh.
  const second = headingIdsFromContent('## Setup');
  assert.ok(second.has('setup'));
  assert.ok(!second.has('setup-1'));
});

test('checkInternalLink resolves a same-page anchor against its own file', async (t) => {
  const dir = await mkdtemp(path.join(tmpdir(), 'anchor-test-'));
  const file = path.join(dir, 'page.mdx');
  await writeFile(file, [
    '## Media cache configuration for paywalls in AdaptyUI',
    'body',
    '## 翻訳 \\{#escaped-target\\}',
  ].join('\n'));

  const opts = { docsDir: dir, liveSiteBase: 'https://example.invalid', timeoutMs: 1000, sourcePath: file };

  const good = await checkInternalLink('#media-cache-configuration-for-paywalls-in-adaptyui', opts);
  assert.equal(good.anchorMissing, undefined);

  const escaped = await checkInternalLink('#escaped-target', opts);
  assert.equal(escaped.anchorMissing, undefined);

  // The exact anchor that shipped broken in sdk-installation-ios.mdx.
  const bad = await checkInternalLink('#set-up-media-cache-configuration-for-adaptyui', opts);
  assert.match(bad.anchorMissing, /not found on this page/);
  // Anchors are reported as warnings, not errors — they must not fail the build.
  assert.equal(bad.ok, true);
});

test('same-page anchors stay permissive when the source file is unknown', async () => {
  const res = await checkInternalLink('#anything', {
    docsDir: '/nonexistent', liveSiteBase: 'https://example.invalid', timeoutMs: 1000,
  });
  assert.equal(res.ok, true);
  assert.equal(res.anchorMissing, undefined);
});
