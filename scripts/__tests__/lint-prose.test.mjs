import { test } from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { mkdtempSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const lint = (mdx) => {
  const file = join(mkdtempSync(join(tmpdir(), 'lint-prose-')), 'article.mdx');
  writeFileSync(file, mdx);
  return execFileSync('node', ['scripts/lint-prose.mjs', '--full', file], { encoding: 'utf8' });
};

const SHOT = '<ZoomImage id="a.webp" width="300px" alt="A" />';
const LEGACY = '<Zoom>\n  <img src="/b.webp" alt="B" />\n</Zoom>';

test('flags two screenshots with nothing between them', () => {
  assert.match(lint(`Intro.\n\n${SHOT}\n\n${SHOT}\n`), /Two screenshots in a row/);
});

test('flags a legacy Zoom block followed by a ZoomImage', () => {
  assert.match(lint(`Intro.\n\n${LEGACY}\n\n${SHOT}\n`), /Two screenshots in a row/);
});

test('does not flag the img inside a single Zoom block', () => {
  assert.doesNotMatch(lint(`Intro.\n\n${LEGACY}\n\nText.\n`), /Two screenshots in a row/);
});

test('does not flag screenshots with a sentence between them', () => {
  assert.doesNotMatch(lint(`${SHOT}\n\nSelect the sheet.\n\n${SHOT}\n`), /Two screenshots in a row/);
});

test('does not flag screenshots inside a fenced code block', () => {
  assert.doesNotMatch(lint('```mdx\n' + `${SHOT}\n${SHOT}\n` + '```\n'), /Two screenshots in a row/);
});
