import { test } from 'node:test';
import assert from 'node:assert/strict';
import { cachedPlanAction, splitIntoSections } from '../translate.mjs';

// Regression for deletion-only English edits: removing a section leaves every
// remaining section a cache hit, and the batch path used to refresh only the
// hash file — the deleted section stayed on every translated page (the
// Facebook CAPI section in facebook-ads, 2026-09-18 → 2026-10-05).

const before = `---\ntitle: "T"\n---\n\nIntro.\n\n## One\n\nFirst.\n\n## Two\n\nSecond.\n\n## Three\n\nThird.\n`;
const afterDeletion = before.replace('## Two\n\nSecond.\n\n', '');

// Identity "translation": the locale file is the reassembled sections.
const reassemble = (md) => splitIntoSections(md).map((s) => s.content).join('\n');

test('deletion-only edit: every section is cached, but the locale file is rewritten', () => {
  const onDisk = reassemble(before);
  const reconstructed = reassemble(afterDeletion);
  assert.notEqual(reconstructed, onDisk);
  assert.equal(
    cachedPlanAction({
      allHits: true,
      reconstructed,
      onDisk,
      storedFileHash: 'sha256:before',
      fileHashCurrent: 'sha256:after',
    }),
    'write',
  );
});

test('all cache hits and the locale file already matches: refresh the hash only', () => {
  const onDisk = reassemble(before);
  assert.equal(
    cachedPlanAction({
      allHits: true,
      reconstructed: onDisk,
      onDisk,
      storedFileHash: 'sha256:old',
      fileHashCurrent: 'sha256:new',
    }),
    'hash',
  );
});

test('nothing changed: no write', () => {
  const onDisk = reassemble(before);
  assert.equal(
    cachedPlanAction({
      allHits: true,
      reconstructed: onDisk,
      onDisk,
      storedFileHash: 'sha256:same',
      fileHashCurrent: 'sha256:same',
    }),
    'none',
  );
});

test('missing locale file is written', () => {
  assert.equal(
    cachedPlanAction({
      allHits: true,
      reconstructed: reassemble(before),
      onDisk: null,
      storedFileHash: 'sha256:same',
      fileHashCurrent: 'sha256:same',
    }),
    'write',
  );
});

test('any section that needed translation is written', () => {
  assert.equal(
    cachedPlanAction({
      allHits: false,
      reconstructed: 'x',
      onDisk: 'x',
      storedFileHash: 'sha256:same',
      fileHashCurrent: 'sha256:same',
    }),
    'write',
  );
});

test('a retry-marked file whose sections now all land clears the marker', async () => {
  const { retryHash } = await import('../translate.mjs');
  const onDisk = reassemble(before);
  const stored = retryHash('sha256:same');
  assert.notEqual(stored, 'sha256:same', 'a retry marker never matches a real hash');
  assert.equal(
    cachedPlanAction({
      allHits: true,
      reconstructed: onDisk,
      onDisk,
      storedFileHash: stored,
      fileHashCurrent: 'sha256:same',
    }),
    'hash',
  );
});
