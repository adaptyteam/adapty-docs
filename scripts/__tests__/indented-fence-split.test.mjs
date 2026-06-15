import { test } from 'node:test';
import assert from 'node:assert/strict';
import { splitIntoRawBlocks } from '../translate.mjs';

// Regression for the kids-mode break: the translation splitter must keep an
// INDENTED fenced code block (one nested in a numbered list item) intact even
// when it contains a blank line. Before the fix, the column-0-only fence regex
// could not see the indented opening fence, so the internal blank line was
// treated as a paragraph boundary and the code block was split across
// translation sections — corrupting the fence on reassembly.

const INDENTED_BLOCK_WITH_BLANK = [
  '1. Update your Podfile:',
  '',
  '   ```ruby showLineNumbers title="Podfile"',
  '   def adapty_enable_kids_mode(installer)',
  '   end',
  '',
  '   post_install do |installer|',
  '     adapty_enable_kids_mode(installer)   # <-- enable Adapty Kids Mode',
  '   end',
  '   ```',
  '',
  '2. Run the command.',
].join('\n');

test('indented fenced block with an internal blank line stays in one raw block', () => {
  const blocks = splitIntoRawBlocks(INDENTED_BLOCK_WITH_BLANK);
  const codeBlocks = blocks.filter((b) => b.includes('```ruby'));
  assert.equal(codeBlocks.length, 1, 'the ```ruby block must not be split');
  const code = codeBlocks[0];
  // The whole code block — both halves and its closing fence — stays together.
  assert.ok(code.includes('def adapty_enable_kids_mode'));
  assert.ok(code.includes('post_install do |installer|'));
  assert.ok(code.includes('# <-- enable Adapty Kids Mode'));
  assert.ok(code.trimEnd().endsWith('```'), 'block must include its closing fence');
  // The intro and the trailing step are separate blocks; the code block is not
  // glued onto either, and the orphaned `post_install` is never its own block.
  assert.ok(blocks.some((b) => b.includes('1. Update your Podfile')));
  assert.ok(blocks.some((b) => b.includes('2. Run the command')));
});

test('a pure indented code block with a blank line is a single block', () => {
  const input = [
    '   ```ruby',
    '   def foo',
    '   end',
    '',
    '   post_install do',
    '   end',
    '   ```',
  ].join('\n');
  assert.equal(splitIntoRawBlocks(input).length, 1);
});

test('column-0 fenced block with an internal blank line is still one block', () => {
  const input = [
    '```ruby',
    'def foo',
    'end',
    '',
    'post_install do',
    'end',
    '```',
  ].join('\n');
  assert.equal(splitIntoRawBlocks(input).length, 1);
});

test('tilde-fenced indented block with a blank line is one block', () => {
  const input = [
    '   ~~~ruby',
    '   def foo',
    '',
    '   end',
    '   ~~~',
  ].join('\n');
  assert.equal(splitIntoRawBlocks(input).length, 1);
});

test('ordinary prose paragraphs still split on blank lines', () => {
  const input = ['First paragraph.', '', 'Second paragraph.'].join('\n');
  assert.equal(splitIntoRawBlocks(input).length, 2);
});
