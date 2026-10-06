import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readdirSync, readFileSync } from 'node:fs';
import { join, relative } from 'node:path';

// The context mill ships in a public repo, so it must carry no support
// tickets, task-tracker keys, chat links, or pointers into closed-source repos. The rule lives in
// .claude/skills/context-mill/SKILL.md ("The mill is public: keep it anonymous").
// Names and customer-case retellings can't be matched mechanically — the rule
// covers those.

const ROOT = new URL('../..', import.meta.url).pathname;
const DIRS = ['.claude/context-mill', '.claude/skills/context-mill'];

// Hyphenated identifiers that look like tracker keys but are standards.
const NOT_TRACKER_KEYS = new Set(['ISO-8601', 'ISO-639', 'ISO-4217', 'UTF-16', 'UTF-32', 'SHA-256', 'SHA-512']);

const PATTERNS = [
  { kind: 'tracker key', re: /\b[A-Z][A-Z0-9]{1,9}-\d{2,}\b/g, skip: (m) => NOT_TRACKER_KEYS.has(m) },
  { kind: 'helpdesk link', re: /usepylon\.com|intercom\.(com|io)|zendesk\.com|atlassian\.net/gi },
  { kind: 'helpdesk ticket', re: /\b(pylon|intercom|zendesk)\s+#?\d+/gi },
  { kind: 'chat link', re: /slack\.com\/(archives|app_redirect)/gi },
  { kind: 'internal host', re: /gitlab(-ssh)?\.adapty\.io|\/api\/v4\//gi },
  { kind: 'closed-source repo', re: /adapty-dashboard-(api|interface)|dashboard-(backend|interface)|noty-wave|unified-builder|adapty-agents|asa-analytics|figma-flow|adapty-swift-app|UniversalDevtool|revenue-cat-migrator/gi },
];

function* files(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) yield* files(path);
    else yield path;
  }
}

export function findLeaks(text) {
  const leaks = [];
  for (const { kind, re, skip } of PATTERNS) {
    for (const [match] of text.matchAll(re)) {
      if (!skip?.(match)) leaks.push({ kind, match });
    }
  }
  return leaks;
}

test('findLeaks catches tracker keys, branch names, and helpdesk links', () => {
  assert.deepEqual(findLeaks('read `origin/ABC-1234`'), [{ kind: 'tracker key', match: 'ABC-1234' }]);
  assert.deepEqual(findLeaks('see [Pylon 1234](https://app.usepylon.com/issues?issueNumber=1234)'), [
    { kind: 'helpdesk link', match: 'usepylon.com' },
    { kind: 'helpdesk ticket', match: 'Pylon 1234' },
  ]);
  assert.deepEqual(findLeaks('https://adapty.slack.com/archives/C01/p123'), [{ kind: 'chat link', match: 'slack.com/archives' }]);
});

test('findLeaks catches internal hosts and closed-source repos', () => {
  assert.deepEqual(findLeaks('clone https://gitlab.adapty.io/x.git'), [{ kind: 'internal host', match: 'gitlab.adapty.io' }]);
  assert.deepEqual(findLeaks('read `dashboard-backend` on develop'), [{ kind: 'closed-source repo', match: 'dashboard-backend' }]);
});

test('findLeaks ignores standards and SDK versions', () => {
  assert.deepEqual(findLeaks('ISO-8601 dates, SHA-256 hashes, the SDK-3 line, `migration-to-ios-sdk-41`'), []);
});

test('the context mill carries no tickets, tracker keys, chat links, or closed-source pointers', () => {
  const leaks = [];
  for (const dir of DIRS) {
    for (const path of files(join(ROOT, dir))) {
      for (const leak of findLeaks(readFileSync(path, 'utf8'))) {
        leaks.push(`${relative(ROOT, path)}: ${leak.kind} ${leak.match}`);
      }
    }
  }
  assert.deepEqual(leaks, [], 'Anonymize these — see SKILL.md, "The mill is public"');
});
