import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  REQUIRED_SECTIONS, parseBrief, missingSections, replaceAutoBlock, isStub,
  referencedArticleIds, sectionBody, briefTemplate, briefState,
} from '../context-mill/briefs.mjs';

const BRIEF = `---
zone: webhooks
sources: [dashboard-api]
reviewed_shape: abc123abc123
reviewed_at: 2026-08-06
---

## What this is
Events out of Adapty.

## Surfaces
Dashboard → Integrations.

## Sources of truth
dashboard-api, integrations module.

## What we document, what we don't
We document the payload. We do not document the queue.

## Articles
<!-- mill:auto:roster -->
stale table
<!-- /mill:auto -->

## Reader jobs
1. React to subscriptions → webhook

## Ripple rules
Property tables are duplicated in messaging.

## Boundaries
server-side-api is pull, this is push.

## Ticket language
event property, payload field

## Gaps and misses
- nothing yet
`;

test('parseBrief reads frontmatter and section order', () => {
  const brief = parseBrief(BRIEF);
  assert.equal(brief.fm.zone, 'webhooks');
  assert.deepEqual(brief.fm.sources, ['dashboard-api']);
  assert.equal(brief.fm.reviewed_shape, 'abc123abc123');
  assert.deepEqual(brief.sections, REQUIRED_SECTIONS);
});

test('missingSections is empty for a complete brief', () => {
  assert.deepEqual(missingSections(BRIEF), []);
});

test('missingSections names every absent section', () => {
  const trimmed = BRIEF.replace('## Ripple rules\nProperty tables are duplicated in messaging.\n\n', '')
    .replace('## Boundaries\nserver-side-api is pull, this is push.\n\n', '');
  assert.deepEqual(missingSections(trimmed), ['Ripple rules', 'Boundaries']);
});

test('replaceAutoBlock swaps only the block content and keeps the markers', () => {
  const out = replaceAutoBlock(BRIEF, 'roster', '| id |\n|---|\n| webhook |');
  assert.match(out, /<!-- mill:auto:roster -->\n\| id \|\n\|---\|\n\| webhook \|\n<!-- \/mill:auto -->/);
  assert.match(out, /## Reader jobs/);
  assert.doesNotMatch(out, /stale table/);
});

test('replaceAutoBlock is idempotent', () => {
  const once = replaceAutoBlock(BRIEF, 'roster', 'CONTENT');
  assert.equal(replaceAutoBlock(once, 'roster', 'CONTENT'), once);
});

test('replaceAutoBlock throws on a missing or unclosed block', () => {
  assert.throws(() => replaceAutoBlock('## Articles\n', 'roster'), /no mill:auto:roster block/);
  assert.throws(() => replaceAutoBlock('<!-- mill:auto:roster -->\n', 'roster', 'x'), /unclosed mill:auto:roster block/);
});

test('isStub is true when the judgment sections are empty', () => {
  const stub = `---
zone: predictions
---

## What this is
Placeholder.

## Surfaces

## Sources of truth

## What we document, what we don't

## Articles
<!-- mill:auto:roster -->
<!-- /mill:auto -->

## Reader jobs

## Ripple rules

## Boundaries

## Ticket language

## Gaps and misses
`;
  assert.equal(isStub(stub), true);
  assert.equal(isStub(BRIEF), false);
});

// Ticket language is scanned too: it is a table of "how a ticket says it → which
// article answers it", so it is denser in article ids than any other section. It
// was left out originally and the tables written into it went unvalidated — a
// typo'd destination there is exactly the failure the check exists to catch.
test('referencedArticleIds collects backticked ids from Reader jobs, Ripple rules and Ticket language', () => {
  const brief = BRIEF
    .replace('1. React to subscriptions → webhook', '1. React to subscriptions → `webhook` → `webhook-events`')
    .replace('Property tables are duplicated in messaging.', 'Duplicated in `messaging` and `analytics-integration`.')
    .replace('event property, payload field', 'event property → `event-feed`');
  assert.deepEqual(
    referencedArticleIds(brief),
    ['analytics-integration', 'event-feed', 'messaging', 'webhook', 'webhook-events'],
  );
});

test('referencedArticleIds ignores non-id-shaped tokens inside Ticket language', () => {
  const brief = BRIEF.replace(
    'event property, payload field',
    'ticket says `pt-BR` and `setFallback` and `price_local` → `event-feed`',
  );
  assert.deepEqual(referencedArticleIds(brief), ['event-feed']);
});

test('referencedArticleIds ignores prose, code, and non-id-shaped backticks', () => {
  const brief = BRIEF.replace(
    '1. React to subscriptions → webhook',
    '1. Call `Adapty.activate()` then read `price_local`, see `webhook`',
  );
  assert.deepEqual(referencedArticleIds(brief), ['webhook']);
});

test('sectionBody returns a whole section, ignoring ## lines inside fenced code', () => {
  const brief = BRIEF.replace(
    '## Reader jobs\n1. React to subscriptions → webhook',
    '## Reader jobs\nExample of a heading we tell writers to avoid:\n\n```markdown\n## Not a real section\n```\n\n1. React to subscriptions → webhook',
  );
  const body = sectionBody(brief, 'Reader jobs');
  assert.match(body, /React to subscriptions/);
  assert.deepEqual(missingSections(brief), []);
  assert.ok(!parseBrief(brief).sections.includes('Not a real section'));
});

test('sectionBody returns the first occurrence when a heading is duplicated', () => {
  const brief = BRIEF.replace('## Boundaries\nserver-side-api is pull, this is push.', '## Boundaries\nfirst copy.\n\n## Boundaries\nsecond copy.');
  assert.equal(sectionBody(brief, 'Boundaries'), 'first copy.');
});

test('sectionBody keeps fenced content, so a diff-only section is not empty', () => {
  const brief = BRIEF.replace(
    '## Ripple rules\nProperty tables are duplicated in messaging.',
    '## Ripple rules\n```diff\n- old field\n+ new field\n```',
  );
  assert.match(sectionBody(brief, 'Ripple rules'), /\+ new field/);
  assert.equal(isStub(brief), false);
});

test('briefTemplate produces a complete but stub brief with a working auto-block', () => {
  const brief = briefTemplate('flow-builder-elements');
  assert.deepEqual(missingSections(brief), []);
  assert.equal(isStub(brief), true);
  assert.equal(parseBrief(brief).fm.zone, 'flow-builder-elements');
  assert.doesNotThrow(() => replaceAutoBlock(brief, 'roster', '| id |'));
});

// A real brief cites commits as evidence, names neighbouring zones, and mentions
// fence languages — all id-shaped. Reporting those as dangling article ids made
// mill:status permanently red, which is a report nobody reads.
test('referencedArticleIds skips commit SHAs, role names, and markup words', () => {
  const brief = BRIEF
    .replace('1. React to subscriptions → webhook', '1. See `webhook`; evidence commit `c65300c71` and `40b608f0b`')
    .replace('Property tables are duplicated in messaging.', 'Shown as a `diff` fence; role `entry`; see `messaging`.');
  assert.deepEqual(referencedArticleIds(brief), ['messaging', 'webhook']);
});

// Ticket language's left column quotes the reader's own words, so it is full of
// id-shaped tokens that are not article ids: pasted error codes, SDK method
// names, JSON field names, and "the `mail-` prefix" shorthand. None may be
// reported as a dangling article id, or the report goes permanently red.
test('referencedArticleIds ignores error codes and prefix stubs', () => {
  const brief = BRIEF.replace(
    'event property, payload field',
    '| "`1000`", "`3001 wrongParam`", "`103`" | the `mail-` and `ads-manager-` articles → `event-feed` |',
  );
  assert.deepEqual(referencedArticleIds(brief), ['event-feed']);
});

test('referencedArticleIds ignores bare SDK method and field names', () => {
  const brief = BRIEF.replace(
    'event property, payload field',
    'call `activate` before `identify`; read `detail`, `format`, `null`, `locale` → `event-feed`',
  );
  assert.deepEqual(referencedArticleIds(brief), ['event-feed']);
});

// HTTP header names are the nastiest class: lowercase, hyphenated, and so
// indistinguishable from an article id by shape alone. They can only be excluded
// by name, which is why the list in briefs.mjs is grouped by reason.
test('referencedArticleIds ignores HTTP header and field names', () => {
  const brief = BRIEF.replace(
    'event property, payload field',
    'send `adapty-profile-id` or `adapty-customer-user-id`; read `value`, `amount`, `metadata` → `event-feed`',
  );
  assert.deepEqual(referencedArticleIds(brief), ['event-feed']);
});

// Three states, not two. A brief whose judgment sections an agent filled but
// nobody reviewed used to print no note at all — indistinguishable from a
// reviewed one. That is the state most of the corpus is about to be in, so it
// needs a name of its own.
test('briefState names stub, drafted and reviewed distinctly', () => {
  assert.equal(briefState({ stub: true, reviewedAt: null }), 'stub');
  assert.equal(briefState({ stub: true, reviewedAt: '2026-08-10' }), 'stub');
  assert.equal(briefState({ stub: false, reviewedAt: null }), 'drafted, unreviewed');
  assert.equal(briefState({ stub: false, reviewedAt: '2026-08-10' }), 'reviewed_at: 2026-08-10');
});
