import { test } from 'node:test';
import assert from 'node:assert/strict';
import { headingLevels, headingStructureMismatch } from '../translate.mjs';

// Two failures seen on 2026-11-26 after a full retranslation: the model
// promoted a lone label line to a heading, and dropped a one-word heading.

test('a label line promoted to a heading is a mismatch', () => {
  const en = 'Response parameters:\n';
  const fr = '## Paramètres de réponse \\{#response-parameters\\}\n';
  assert.equal(headingStructureMismatch(en, fr), true);
});

test('a dropped heading is a mismatch', () => {
  const en = '### Text\n\n:::link\nMain article: [Text content](onboarding-text)\n:::\n';
  const es = ':::link\nArtículo principal: [Contenido de texto](onboarding-text)\n:::\n';
  assert.equal(headingStructureMismatch(en, es), true);
});

test('a translated heading with an anchor matches', () => {
  const en = '### Text\n\nA text element can contain static text.\n';
  const fr = '### Texte \\{#text\\}\n\nUn élément texte peut contenir du texte statique.\n';
  assert.equal(headingStructureMismatch(en, fr), false);
});

test('a changed heading level is a mismatch', () => {
  assert.equal(headingStructureMismatch('## A\n', '### A\n'), true);
});

test('lines inside code blocks are not headings', () => {
  const en = '```bash\n# install\nnpm i\n```\n';
  const tr = '```bash\n# install\nnpm i\n```\n';
  assert.deepEqual(headingLevels(en), []);
  assert.equal(headingStructureMismatch(en, tr), false);
});

test('a fragment with no headings matches', () => {
  assert.equal(headingStructureMismatch('Plain text.\n', 'Texte simple.\n'), false);
});
