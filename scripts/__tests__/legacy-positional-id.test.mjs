import { test } from 'node:test';
import assert from 'node:assert/strict';
import { isLegacyPositionalId } from '../translate.mjs';

// Regression for the all-digit-hash cache wipe: modern para-chunk IDs end in
// an 8-char hex content hash, which is all digits for ~2.3% of chunks (e.g.
// migration-to-kmp-sdk-v4's "h3-compose-platform-view-p59406869"). The legacy
// detector previously matched ANY digits after "-p", so one such chunk
// discarded the file's whole section cache on every run — a small edit
// retranslated the entire article.

test('legacy positional counters are detected', () => {
  assert.equal(isLegacyPositionalId('h2-foo-p1'), true);
  assert.equal(isLegacyPositionalId('h2-foo-p12'), true);
  assert.equal(isLegacyPositionalId('preamble-p3'), true);
});

test('modern 8-char hex hashes are NOT legacy — including all-digit ones', () => {
  assert.equal(isLegacyPositionalId('h2-foo-p3f7c1b2a'), false);
  // all-digit hex hashes, the case that used to wipe the cache
  assert.equal(isLegacyPositionalId('h3-compose-platform-view-p59406869'), false);
  assert.equal(isLegacyPositionalId('h2-default-behavior-changes-p71558964'), false);
});

test('non-chunk section ids are NOT legacy', () => {
  assert.equal(isLegacyPositionalId('preamble'), false);
  assert.equal(isLegacyPositionalId('h2-install-the-sdk'), false);
  // heading slug that merely ends in digits (no -p marker)
  assert.equal(isLegacyPositionalId('h2-step-2'), false);
});
