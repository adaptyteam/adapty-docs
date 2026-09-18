import { test } from 'node:test';
import assert from 'node:assert/strict';
import { extractDocsSlugs, slugOf, buildCitationMap } from '../context-mill/skill-citations.mjs';

test('slugOf keeps docs pages and strips the .md agents fetch', () => {
  assert.equal(slugOf('https://adapty.io/docs/placements.md'), 'placements');
  assert.equal(slugOf('https://adapty.io/docs/placements'), 'placements');
  assert.equal(slugOf('https://adapty.io/docs/placements?ref=skill-abc#audiences'), 'placements');
});

test('slugOf rejects non-docs urls and llms aggregates', () => {
  assert.equal(slugOf('https://github.com/adaptyteam/adapty-cli'), null);
  assert.equal(slugOf('https://adapty.io/docs/ios-llms-full.txt'), null);
  assert.equal(slugOf('https://adapty.io/docs/'), null);
});

test('extractDocsSlugs skips templates, globs and elided examples', () => {
  const md = [
    'See [placements](https://adapty.io/docs/placements.md) for the list.',
    'Never assemble https://adapty.io/docs/{slug} yourself.',
    'A media url with the hash cut out: https://adapty.io/docs/1e5bbbb4-.../hero.png',
    'Trailing punctuation: https://adapty.io/docs/flow-timer.md.',
  ].join('\n');
  assert.deepEqual(extractDocsSlugs(md), ['placements', 'flow-timer']);
});

test('buildCitationMap groups skills per slug, sorted and deduped', () => {
  const entries = [
    { skill: 'flow-generator', markdown: 'https://adapty.io/docs/placements.md' },
    { skill: 'migrate-placements', markdown: 'https://adapty.io/docs/placements.md' },
    { skill: 'flow-generator', markdown: 'https://adapty.io/docs/placements.md again' },
    { skill: 'adapty-integration', markdown: 'https://adapty.io/docs/flow-timer.md' },
  ];
  assert.deepEqual(buildCitationMap(entries), [
    { slug: 'flow-timer', skills: ['adapty-integration'] },
    { slug: 'placements', skills: ['flow-generator', 'migrate-placements'] },
  ]);
});
