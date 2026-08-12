import { test } from 'node:test';
import assert from 'node:assert/strict';
import { parseSources, sourceErrors, matchesPattern, formatRefsReport , sourceAliases, citedSources } from '../context-mill/sources.mjs';

const SOURCES = `# Sources of truth

## jscore — @adapty/core, shared core for RN and Capacitor
path: ~/Documents/AdaptySDK-JS-Core
remote: git@github.com:adaptyteam/AdaptySDK-JS-Core.git
default_ref: origin/dev
ref_pattern: release/*, feature/*
kind: local-clone

Types and public API that RN and Capacitor only re-export.

## adapty-api-spec — the committed OpenAPI spec
path: src/api-reference/specs/adapty-api.yaml
kind: in-repo-spec

The maintained reference for the server-side API.
`;

test('parseSources reads one entry per H2 with its typed fields', () => {
  const sources = parseSources(SOURCES);
  assert.equal(sources.length, 2);
  const [jscore, spec] = sources;
  assert.equal(jscore.id, 'jscore');
  assert.equal(jscore.title, '@adapty/core, shared core for RN and Capacitor');
  assert.equal(jscore.path, '~/Documents/AdaptySDK-JS-Core');
  assert.equal(jscore.remote, 'git@github.com:adaptyteam/AdaptySDK-JS-Core.git');
  assert.equal(jscore.default_ref, 'origin/dev');
  assert.deepEqual(jscore.ref_pattern, ['release/*', 'feature/*']);
  assert.equal(jscore.kind, 'local-clone');
  assert.match(jscore.notes, /only re-export/);
  assert.equal(spec.kind, 'in-repo-spec');
  assert.equal(spec.remote, undefined);
});

test('sourceErrors requires remote on a local-clone', () => {
  const md = SOURCES.replace('remote: git@github.com:adaptyteam/AdaptySDK-JS-Core.git\n', '');
  const errors = sourceErrors(parseSources(md), { referencedIds: new Set(['jscore', 'adapty-api-spec']), existsOnDisk: () => true });
  assert.deepEqual(errors, [{ kind: 'missing-remote', id: 'jscore' }]);
});

test('sourceErrors reports a local clone that is not on disk', () => {
  const errors = sourceErrors(parseSources(SOURCES), {
    referencedIds: new Set(['jscore', 'adapty-api-spec']),
    existsOnDisk: (p) => !p.includes('JS-Core'),
  });
  assert.deepEqual(errors, [{ kind: 'missing-path', id: 'jscore', path: '~/Documents/AdaptySDK-JS-Core' }]);
});

test('sourceErrors reports a source nobody references', () => {
  const errors = sourceErrors(parseSources(SOURCES), { referencedIds: new Set(['jscore']), existsOnDisk: () => true });
  assert.deepEqual(errors, [{ kind: 'unreferenced', id: 'adapty-api-spec' }]);
});

test('sourceErrors reports an unknown kind and a duplicate id', () => {
  const md = SOURCES + '\n## jscore — dupe\nkind: wat\n';
  const errors = sourceErrors(parseSources(md), { referencedIds: new Set(['jscore', 'adapty-api-spec']), existsOnDisk: () => true });
  assert.deepEqual(errors.map(e => e.kind).sort(), ['duplicate-id', 'unknown-kind']);
});

test('matchesPattern handles a trailing glob and an exact name', () => {
  assert.equal(matchesPattern('release/4.1', ['release/*']), true);
  assert.equal(matchesPattern('feature/x', ['release/*']), false);
  assert.equal(matchesPattern('dev', ['dev']), true);
  assert.equal(matchesPattern('anything', []), false);
});

test('formatRefsReport shows local state, lag, and candidates newest first', () => {
  const out = formatRefsReport([{
    id: 'ios-sdk',
    path: '~/Documents/AdaptySDK-iOS',
    present: true,
    localBranch: 'release/4.0',
    behind: 12,
    candidates: [
      { ref: 'origin/release/4.1', age: '2 days ago' },
      { ref: 'origin/release/4.0', age: '3 weeks ago' },
    ],
  }]);
  assert.match(out, /ios-sdk/);
  assert.match(out, /release\/4\.0 \(behind origin by 12 commit\(s\)\)/);
  assert.match(out, /origin\/release\/4\.1\s+2 days ago/);
  assert.ok(out.indexOf('origin/release/4.1') < out.indexOf('origin/release/4.0'));
});

test('formatRefsReport tells you how to clone a missing source', () => {
  const out = formatRefsReport([{ id: 'android-sdk', path: '~/Documents/AdaptySDK-Android', remote: 'git@github.com:adaptyteam/AdaptySDK-Android.git', present: false }]);
  assert.match(out, /NO CLONE/);
  assert.match(out, /git clone git@github\.com:adaptyteam\/AdaptySDK-Android\.git ~\/Documents\/AdaptySDK-Android/);
});

test('formatRefsReport distinguishes verified-current from unknown lag', () => {
  const base = { id: 's', path: '~/p', present: true, localBranch: 'main', candidates: [] };
  assert.match(formatRefsReport([{ ...base, behind: 0 }]), /main \(up to date\)/);
  assert.match(formatRefsReport([{ ...base, behind: undefined }]), /main \(lag unknown\)/);
  assert.match(formatRefsReport([{ ...base, behind: 3 }]), /main \(behind origin by 3 commit\(s\)\)/);
});

test('formatRefsReport says so when no branch matches the pattern', () => {
  const out = formatRefsReport([{ id: 's', path: '~/p', present: true, localBranch: 'main', behind: 0, candidates: [] }]);
  assert.match(out, /no branches match ref_pattern/);
});

test('formatRefsReport reports a failed inspection in the source block, not as no-branches', () => {
  const out = formatRefsReport([{
    id: 'jscore',
    path: '~/Documents/AdaptySDK-JS-Core',
    present: true,
    localBranch: 'release/capacitor',
    error: "fatal: ambiguous argument 'origin/dev'",
  }]);
  assert.match(out, /git inspection failed: fatal: ambiguous argument 'origin\/dev'/);
  assert.doesNotMatch(out, /no branches match ref_pattern/);
  assert.doesNotMatch(out, /up to date/);
});

// Briefs name repos and spec files, not registry ids: a zone brief says
// `noty-wave-backend` or `adapty-api.yaml` because that is what a reader greps
// for. The registry calls those `mail-backend` and `server-side-api-spec`. So a
// scan for ids alone badly under-counts — it found zero sources in 14 of 34
// briefs that demonstrably depend on several. Match on the path's basename too,
// and keep the prose free to use whichever name reads better.
test('sourceAliases covers the id, a clone directory name, and a spec filename', () => {
  assert.deepEqual(
    sourceAliases({ id: 'mail-backend', path: '~/Documents/noty-wave-backend', kind: 'local-clone' }),
    ['mail-backend', 'noty-wave-backend'],
  );
  assert.deepEqual(
    sourceAliases({ id: 'server-side-api-spec', path: 'src/api-reference/specs/adapty-api.yaml', kind: 'in-repo-spec' }),
    ['server-side-api-spec', 'adapty-api.yaml'],
  );
  // No path is not a crash — the id is still an alias.
  assert.deepEqual(sourceAliases({ id: 'lonely' }), ['lonely']);
});

test('citedSources finds a source by any alias, and only inside backticks', () => {
  const sources = [
    { id: 'mail-backend', path: '~/Documents/noty-wave-backend', kind: 'local-clone' },
    { id: 'ua-service', path: '~/Documents/adapty-user-acquisition', kind: 'local-clone' },
    { id: 'ios-sdk', path: '~/Documents/AdaptySDK-iOS', kind: 'local-clone' },
  ];
  const body = [
    'Flow semantics live in `noty-wave-backend`, `src/app/campaign_context/`.',
    'The install model is in `adapty-user-acquisition` — not in any SDK.',
    'Mentioning ios-sdk outside backticks must not count.',
  ].join('\n');
  assert.deepEqual(citedSources(body, sources), ['mail-backend', 'ua-service']);
});

test('citedSources returns each source once however many times it is cited', () => {
  const sources = [{ id: 'server-side-api-spec', path: 'src/api-reference/specs/adapty-api.yaml', kind: 'in-repo-spec' }];
  const body = 'See `adapty-api.yaml`, then `adapty-api.yaml` again, and `server-side-api-spec`.';
  assert.deepEqual(citedSources(body, sources), ['server-side-api-spec']);
});

// Writers mark a source however reads best — one brief bolds them, the rest
// backtick them. Requiring a particular delimiter would mean a real dependency
// goes unrecorded because of punctuation, so both count. This is safe in a way
// a general pattern would not be: the match is against a closed set of 20 known
// names, so a UI label in bold cannot collide with it.
test('citedSources matches a bolded source name as well as a backticked one', () => {
  const sources = [
    { id: 'dashboard-interface', path: '~/Documents/adapty-dashboard-interface', kind: 'local-clone' },
    { id: 'dashboard-backend', path: '~/Documents/adapty-dashboard-api', kind: 'local-clone' },
  ];
  const body = [
    '- **dashboard-interface** — the dashboard labels in the quickstart steps.',
    '- `dashboard-backend` — the set of stores it routes to.',
  ].join('\n');
  assert.deepEqual(citedSources(body, sources), ['dashboard-backend', 'dashboard-interface']);
});
