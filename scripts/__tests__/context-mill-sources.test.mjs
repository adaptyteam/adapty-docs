import { test } from 'node:test';
import assert from 'node:assert/strict';
import { parseSources, sourceErrors, matchesPattern, formatRefsReport } from '../context-mill/sources.mjs';

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
