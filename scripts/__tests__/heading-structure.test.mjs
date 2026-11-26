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

// Source headings the English docs really have. A check that missed them
// flagged correct translations, then accepted only a retry with no heading.
test('a heading with a non-breaking space after the #s is a heading', () => {
  const en = '##  System StoreKit codes\n';
  const es = '## Códigos del sistema StoreKit \\{#system-storekit-codes\\}\n';
  assert.deepEqual(headingLevels(en), ['h2']);
  assert.equal(headingStructureMismatch(en, es), false);
});

test('a heading with two spaces after the #s is a heading', () => {
  const en = '####  Step 1: The automated screening\n';
  const fr = '#### Étape 1 : la vérification automatisée \\{#step-1-the-automated-screening\\}\n';
  assert.equal(headingStructureMismatch(en, fr), false);
});

test('a heading indented by up to 3 spaces is a heading', () => {
  assert.deepEqual(headingLevels('   ### A\n    ### B\n'), ['h3']);
});

test('a hash with no text after it is not a heading', () => {
  assert.deepEqual(headingLevels('#hashtag\n##\n'), []);
});

test('a fragment with no headings matches', () => {
  assert.equal(headingStructureMismatch('Plain text.\n', 'Texte simple.\n'), false);
});
