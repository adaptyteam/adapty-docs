// Integration tests for the context-mill command layer (scripts/context-mill/extract.mjs).
// Every test runs the CLI as a real child process against a scratch mill
// directory (MILL_DIR override) so exit codes are the real ones a CI step or
// an agent would see — never against .claude/context-mill/, the live mill.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import os from 'node:os';
import crypto from 'node:crypto';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { fileURLToPath } from 'node:url';
import { REQUIRED_SECTIONS } from '../context-mill/briefs.mjs';
import { zoneHash, snapshotZone } from '../context-mill/zones.mjs';
import { rolloutTemplate } from '../context-mill/rollouts.mjs';

const execFileAsync = promisify(execFile);
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(__dirname, '../..');
const EXTRACT_BIN = path.join(REPO_ROOT, 'scripts/context-mill/extract.mjs');

// --- scratch directory plumbing ---------------------------------------------

async function mkScratch() {
  return fs.mkdtemp(path.join(os.tmpdir(), 'context-mill-test-'));
}

async function rmScratch(dir) {
  await fs.rm(dir, { recursive: true, force: true });
}

// Runs the CLI as a child process. A non-zero exit must not throw — it's
// captured as {code, stdout, stderr} like any other result, because "exits 1
// with a message" is a behaviour under test, not a test failure.
async function runCli(millDir, args) {
  try {
    const { stdout, stderr } = await execFileAsync('node', [EXTRACT_BIN, ...args], {
      env: { ...process.env, MILL_DIR: millDir },
    });
    return { code: 0, stdout, stderr };
  } catch (err) {
    return { code: typeof err.code === 'number' ? err.code : 1, stdout: err.stdout ?? '', stderr: err.stderr ?? '' };
  }
}

function mapFile(dir) { return path.join(dir, 'docs-map.jsonl'); }
function zonesFile(dir) { return path.join(dir, 'zones.json'); }
function zoneStateFile(dir) { return path.join(dir, '.zone-state.json'); }
function sourcesFile(dir) { return path.join(dir, 'sources.md'); }
function briefFile(dir, zoneId) { return path.join(dir, 'zones', `${zoneId}.md`); }
function rolloutFile(dir, slug) { return path.join(dir, 'rollouts', `${slug}.md`); }

// Patches rolloutTemplate(slug)'s frontmatter `zones:` list and/or one
// platform row (default "ios"), so a fixture that only cares about a couple
// of fields still comes from the real template — it can't drift out of sync
// with the format rollouts.mjs actually parses the way a hand-written
// markdown table could.
function rolloutContent(slug, { zones, platform = 'ios', ...row } = {}) {
  let content = rolloutTemplate(slug);
  if (zones) {
    content = content.replace('zones: []', `zones: [${zones.join(', ')}]`);
  }
  if (Object.keys(row).length) {
    const defaultRow = `| ${platform} | — | not started | — | — | — | — |`;
    const cols = {
      codeBranch: '—', code: 'not started', docs: '—', articles: '—', docsCommit: '—', docsPr: '—',
      ...row,
    };
    const newRow = `| ${platform} | ${cols.codeBranch} | ${cols.code} | ${cols.docs} | ${cols.articles} | ${cols.docsCommit} | ${cols.docsPr} |`;
    assert.notEqual(content.indexOf(defaultRow), -1, `rolloutTemplate row for "${platform}" not found — template format changed`);
    content = content.replace(defaultRow, newRow);
  }
  return content;
}

// `content` is either raw markdown (existing call sites) or an options object
// — { zones, platform, ...platformRowFields } — built into a real template
// via rolloutContent() above.
async function writeRollout(dir, slug, content) {
  const text = typeof content === 'string' ? content : rolloutContent(slug, content);
  await fs.mkdir(path.join(dir, 'rollouts'), { recursive: true });
  await fs.writeFile(rolloutFile(dir, slug), text);
}

async function writeMap(dir, records) {
  await fs.writeFile(mapFile(dir), records.map(r => JSON.stringify(r)).join('\n') + '\n');
}

async function writeZones(dir, data) {
  await fs.writeFile(zonesFile(dir), JSON.stringify(data, null, 2) + '\n');
}

async function writeBrief(dir, zoneId, content) {
  await fs.mkdir(path.join(dir, 'zones'), { recursive: true });
  await fs.writeFile(briefFile(dir, zoneId), content);
}

async function writeSources(dir, content) {
  await fs.writeFile(sourcesFile(dir), content);
}

async function fileExists(p) {
  try { await fs.access(p); return true; } catch { return false; }
}

function makeRecord(id, overrides = {}) {
  return {
    id,
    path: `src/content/docs/${id}.mdx`,
    sidebars: ['tutorial'],
    orphan: false,
    draft: false,
    title: id,
    description: null,
    slug: null,
    headings: ['Intro'],
    symbols: [],
    components: [],
    links: [],
    content_hash: 'deadbeef0000',
    shape_hash: 'shape000001',
    api_hash: 'api0000001',
    ...overrides,
  };
}

// Builds a brief whose section list is derived from briefs.mjs's own
// REQUIRED_SECTIONS (not a hardcoded ten strings), so it cannot drift out of
// sync with the format the production code actually checks against. Every
// judgment section gets real, non-placeholder prose by default so a fixture
// is "complete" unless a test deliberately hollows out or omits a section.
function makeBrief(zoneId, { omit = [], overrides = {}, reviewedShape = '', reviewedAt = '', sources = [] } = {}) {
  const sections = REQUIRED_SECTIONS.filter(name => !omit.includes(name));
  const body = sections.map(name => {
    if (Object.hasOwn(overrides, name)) return `## ${name}\n${overrides[name]}`;
    if (name === 'Articles') return '## Articles\n<!-- mill:auto:roster -->\n_No articles assigned yet._\n<!-- /mill:auto -->';
    return `## ${name}\nReal judgment prose for ${name.toLowerCase()}.`;
  }).join('\n\n');
  const sourcesYaml = sources.length ? `[${sources.join(', ')}]` : '[]';
  return `---\nzone: ${zoneId}\nsources: ${sourcesYaml}\nreviewed_shape: ${reviewedShape}\nreviewed_at: ${reviewedAt}\n---\n\n${body}\n`;
}

// --- 1. status: missing brief file -------------------------------------------

test('status reports a zone whose brief file is absent, and exits 1', async () => {
  const dir = await mkScratch();
  try {
    await writeMap(dir, [makeRecord('art-a')]);
    await writeZones(dir, { zones: [{ id: 'z1', title: 'Z1', kind: 'flat' }], articles: { 'art-a': { zone: 'z1', role: 'entry' } } });
    // Deliberately no zones/z1.md.
    const { code, stdout } = await runCli(dir, ['status']);
    assert.equal(code, 1);
    assert.match(stdout, /z1\s+.*no brief/);
  } finally {
    await rmScratch(dir);
  }
});

// --- 2. status: brief missing a required section -----------------------------

test('status names a missing required section, and exits 1', async () => {
  const dir = await mkScratch();
  try {
    await writeMap(dir, [makeRecord('art-a')]);
    await writeZones(dir, { zones: [{ id: 'z1', title: 'Z1', kind: 'flat' }], articles: { 'art-a': { zone: 'z1', role: 'entry' } } });
    await writeBrief(dir, 'z1', makeBrief('z1', { omit: ['Boundaries'] }));
    const { code, stdout } = await runCli(dir, ['status']);
    assert.equal(code, 1);
    assert.match(stdout, /missing sections: Boundaries/);
  } finally {
    await rmScratch(dir);
  }
});

// --- 3. status: dangling article id in a brief --------------------------------

test('status reports a backticked article id absent from the map as dangling, and exits 1', async () => {
  const dir = await mkScratch();
  try {
    await writeMap(dir, [makeRecord('art-a')]);
    await writeZones(dir, { zones: [{ id: 'z1', title: 'Z1', kind: 'flat' }], articles: { 'art-a': { zone: 'z1', role: 'entry' } } });
    await writeBrief(dir, 'z1', makeBrief('z1', {
      overrides: { 'Reader jobs': 'See `nonexistent-article-id` for context.' },
    }));
    const { code, stdout } = await runCli(dir, ['status']);
    assert.equal(code, 1);
    assert.match(stdout, /dangling ids: nonexistent-article-id/);
  } finally {
    await rmScratch(dir);
  }
});

// --- 4. status: complete, reviewed, fully-assigned corpus exits 0 ------------

test('status exits 0 on a complete, reviewed, fully-assigned scratch corpus', async () => {
  const dir = await mkScratch();
  try {
    const record = makeRecord('art-a');
    await writeMap(dir, [record]);
    await writeZones(dir, { zones: [{ id: 'z1', title: 'Z1', kind: 'flat' }], articles: { 'art-a': { zone: 'z1', role: 'entry' } } });
    const hash = zoneHash([record]);
    // `reviewedAt` matters as much as `reviewedShape`: without it the brief is
    // complete but unreviewed, which is its own reported state. This fixture
    // claims to be reviewed, so it has to carry both.
    await writeBrief(dir, 'z1', makeBrief('z1', { reviewedShape: hash, reviewedAt: '2026-08-10' }));
    // Matching zone-state so there's no "added"/"changed" drift note either —
    // this fixture is meant to be genuinely, entirely clean.
    await fs.writeFile(zoneStateFile(dir), JSON.stringify({ z1: snapshotZone([record]) }, null, 2) + '\n');
    const { code, stdout } = await runCli(dir, ['status']);
    assert.equal(code, 0);
    assert.match(stdout, /z1\s+reviewed_at: 2026-08-10/);
    assert.match(stdout, /PARTITION: 0 error\(s\)/);
  } finally {
    await rmScratch(dir);
  }
});

// A brief an agent filled but nobody checked is the state most of this corpus
// will pass through. It must be named, not reported as clean — before this, a
// complete-but-unreviewed brief printed `ok`, indistinguishable from reviewed
// work, which is exactly how an agent's draft gets mistaken for judgment.
test('status names a complete but unreviewed brief as drafted, and still exits 0', async () => {
  const dir = await mkScratch();
  try {
    const record = makeRecord('art-a');
    await writeMap(dir, [record]);
    await writeZones(dir, { zones: [{ id: 'z1', title: 'Z1', kind: 'flat' }], articles: { 'art-a': { zone: 'z1', role: 'entry' } } });
    // Every judgment section written, no review stamp of any kind.
    await writeBrief(dir, 'z1', makeBrief('z1'));
    const { code, stdout } = await runCli(dir, ['status']);
    assert.equal(code, 0);
    assert.match(stdout, /z1\s+drafted, unreviewed/);
    assert.doesNotMatch(stdout, /z1\s+ok/);
  } finally {
    await rmScratch(dir);
  }
});

// --- 5. status: stub brief is a warning only, exits 0 -------------------------

test('status reports a stub brief as a warning and still exits 0 when nothing else is wrong', async () => {
  const dir = await mkScratch();
  try {
    const record = makeRecord('art-a');
    await writeMap(dir, [record]);
    await writeZones(dir, { zones: [{ id: 'z1', title: 'Z1', kind: 'flat' }], articles: { 'art-a': { zone: 'z1', role: 'entry' } } });
    // 'Surfaces' present but empty -> isStub() flags it, but this alone must
    // not flip the exit code.
    await writeBrief(dir, 'z1', makeBrief('z1', { overrides: { Surfaces: '' } }));
    const { code, stdout } = await runCli(dir, ['status']);
    assert.equal(code, 0);
    assert.match(stdout, /z1\s+.*stub/);
  } finally {
    await rmScratch(dir);
  }
});

// --- 6. reviewed: empty/absent docs-map.jsonl must refuse without touching anything ---

test('reviewed refuses on an absent docs-map.jsonl, exits 1, and writes neither the brief nor .zone-state.json', async () => {
  const dir = await mkScratch();
  try {
    await writeZones(dir, { zones: [{ id: 'z1', title: 'Z1', kind: 'flat' }], articles: {} });
    const briefContent = makeBrief('z1');
    await writeBrief(dir, 'z1', briefContent);
    // Deliberately no docs-map.jsonl at all.
    const { code, stderr } = await runCli(dir, ['reviewed', 'z1']);
    assert.equal(code, 1);
    assert.match(stderr, /docs-map\.jsonl is missing or empty/);
    const after = await fs.readFile(briefFile(dir, 'z1'), 'utf-8');
    assert.equal(after, briefContent);
    assert.equal(await fileExists(zoneStateFile(dir)), false);
  } finally {
    await rmScratch(dir);
  }
});

// --- 7. reviewed: absent brief -> one-line error, no stack trace -------------

test('reviewed on a zone with no brief prints a one-line error, exits 1, and never a raw stack trace', async () => {
  const dir = await mkScratch();
  try {
    await writeMap(dir, [makeRecord('art-a')]);
    await writeZones(dir, { zones: [{ id: 'z1', title: 'Z1', kind: 'flat' }], articles: { 'art-a': { zone: 'z1', role: 'entry' } } });
    // Deliberately no zones/z1.md.
    const { code, stdout, stderr } = await runCli(dir, ['reviewed', 'z1']);
    assert.equal(code, 1);
    assert.match(stderr, /z1: no brief at/);
    const combined = stdout + stderr;
    assert.doesNotMatch(combined, /at async/);
    assert.doesNotMatch(combined, /Error:[^\n]*\n\s+at /);
  } finally {
    await rmScratch(dir);
  }
});

// --- 8. reviewed on a healthy fixture stamps the brief and state, then status sees it as clean ---

test('reviewed stamps reviewed_shape/reviewed_at, writes .zone-state.json, exits 0, and a later status sees the zone as clean', async () => {
  const dir = await mkScratch();
  try {
    const record = makeRecord('art-a');
    await writeMap(dir, [record]);
    await writeZones(dir, { zones: [{ id: 'z1', title: 'Z1', kind: 'flat' }], articles: { 'art-a': { zone: 'z1', role: 'entry' } } });
    await writeBrief(dir, 'z1', makeBrief('z1'));
    const { code, stdout } = await runCli(dir, ['reviewed', 'z1']);
    assert.equal(code, 0);
    assert.match(stdout, /z1: reviewed at \d{4}-\d{2}-\d{2}, 1 member\(s\) snapshotted/);

    const stamped = await fs.readFile(briefFile(dir, 'z1'), 'utf-8');
    assert.match(stamped, new RegExp(`^reviewed_shape: ${zoneHash([record])}$`, 'm'));
    assert.match(stamped, /^reviewed_at: \d{4}-\d{2}-\d{2}$/m);

    const state = JSON.parse(await fs.readFile(zoneStateFile(dir), 'utf-8'));
    assert.deepEqual(state, { z1: snapshotZone([record]) });

    // Second run: dangling/missing-section/stub/no-brief must all be silent now.
    const second = await runCli(dir, ['status']);
    assert.equal(second.code, 0);
    const zoneLine = second.stdout.split('\n').find(l => l.trim().startsWith('z1'));
    assert.ok(zoneLine, 'expected a ZONE DRIFT line for z1');
    assert.doesNotMatch(zoneLine, /no brief|missing sections|dangling ids|stub/);
  } finally {
    await rmScratch(dir);
  }
});

// --- 9. assign: unregistered zone ---------------------------------------------

test('assign refuses an unregistered zone, exits 1, and leaves zones.json byte-identical', async () => {
  const dir = await mkScratch();
  try {
    const before = JSON.stringify({ zones: [{ id: 'z1', title: 'Z1', kind: 'flat' }], articles: {} }, null, 2) + '\n';
    await fs.writeFile(zonesFile(dir), before);
    const { code, stderr } = await runCli(dir, ['assign', 'art-a', 'nonexistent-zone']);
    assert.equal(code, 1);
    assert.match(stderr, /unknown zone "nonexistent-zone"/);
    const after = await fs.readFile(zonesFile(dir), 'utf-8');
    assert.equal(after, before);
  } finally {
    await rmScratch(dir);
  }
});

// --- 10. assign: invalid role ------------------------------------------------

test('assign refuses an invalid role, exits 1, and leaves zones.json byte-identical', async () => {
  const dir = await mkScratch();
  try {
    const before = JSON.stringify({ zones: [{ id: 'z1', title: 'Z1', kind: 'flat' }], articles: {} }, null, 2) + '\n';
    await fs.writeFile(zonesFile(dir), before);
    const { code, stderr } = await runCli(dir, ['assign', 'art-a', 'z1', '--role=nonsense']);
    assert.equal(code, 1);
    assert.match(stderr, /invalid role "nonsense"/);
    const after = await fs.readFile(zonesFile(dir), 'utf-8');
    assert.equal(after, before);
  } finally {
    await rmScratch(dir);
  }
});

// --- 11. assign: valid target writes role + audience, keys sorted ------------

test('assign on a valid target exits 0 and writes both role and audience, with articles sorted by key', async () => {
  const dir = await mkScratch();
  try {
    await writeZones(dir, {
      zones: [{ id: 'z1', title: 'Z1', kind: 'flat' }],
      articles: { 'zzz-existing': { zone: 'z1', role: 'entry' } },
    });
    const { code, stdout } = await runCli(dir, ['assign', 'art-a', 'z1', '--role=entry', '--audience=dev,analyst']);
    assert.equal(code, 0);
    assert.match(stdout, /art-a → z1/);
    const written = JSON.parse(await fs.readFile(zonesFile(dir), 'utf-8'));
    assert.deepEqual(written.articles['art-a'], { zone: 'z1', role: 'entry', audience: ['dev', 'analyst'] });
    const keys = Object.keys(written.articles);
    assert.deepEqual(keys, [...keys].sort((a, b) => a.localeCompare(b)));
  } finally {
    await rmScratch(dir);
  }
});

// --- 12. new-zone: already-registered id, and a pre-existing brief file ------

test('new-zone refuses a duplicate zone id and, separately, a pre-existing brief file — neither touches zones.json', async () => {
  const dir = await mkScratch();
  try {
    const before = JSON.stringify({ zones: [{ id: 'z1', title: 'Z1', kind: 'flat' }], articles: {} }, null, 2) + '\n';
    await fs.writeFile(zonesFile(dir), before);

    // Case A: zone id already registered.
    const dup = await runCli(dir, ['new-zone', 'z1', '--kind=flat', '--title=Z1 dup']);
    assert.equal(dup.code, 1);
    assert.match(dup.stderr, /Zone "z1" already exists/);
    assert.equal(await fs.readFile(zonesFile(dir), 'utf-8'), before);

    // Case B: zone id free, but a brief file is already sitting on disk
    // (e.g. left behind by a deleted zone).
    await fs.mkdir(path.join(dir, 'zones'), { recursive: true });
    await fs.writeFile(briefFile(dir, 'z2'), 'leftover brief content\n');
    const brieflyBefore = await fs.readFile(zonesFile(dir), 'utf-8');
    const collide = await runCli(dir, ['new-zone', 'z2', '--kind=flat', '--title=Z2']);
    assert.equal(collide.code, 1);
    assert.match(collide.stderr, /a brief already exists at/);
    assert.doesNotMatch(collide.stderr, /EEXIST/);
    assert.doesNotMatch(collide.stdout + collide.stderr, /at async/);
    assert.equal(await fs.readFile(zonesFile(dir), 'utf-8'), brieflyBefore);
  } finally {
    await rmScratch(dir);
  }
});

// --- 13. refs: local-clone source with no remote ------------------------------
// Unlike test 14 below, sources.md DOES exist here — this is malformed data in
// a file that exists, not an unauthored data layer, so it must still exit 1
// after Fix 1.

test('refs exits 1 on a local-clone source with no remote', async () => {
  const dir = await mkScratch();
  try {
    // path points at the scratch dir itself — it exists on disk but is not a
    // git repo, so no network access or real clone is involved.
    await writeSources(dir, `# Sources\n\n## src-a — Some source\nkind: local-clone\npath: ${dir}\n`);
    const { code, stdout, stderr } = await runCli(dir, ['refs']);
    assert.equal(code, 1);
    assert.match(stdout + stderr, /missing-remote: src-a/);
  } finally {
    await rmScratch(dir);
  }
});

// --- 14. refs: no sources.md at all -------------------------------------------
// An absent sources.md is a bootstrap state (the data layer hasn't been
// authored yet), not breakage — same discipline as status()'s "zones.json not
// present" — so this must exit 0, with the "nothing to inspect" message as
// the actual signal.

test('refs exits 0 with a clear message when sources.md does not exist', async () => {
  const dir = await mkScratch();
  try {
    const { code, stderr } = await runCli(dir, ['refs']);
    assert.equal(code, 0);
    assert.match(stderr, /No .*sources\.md yet — nothing to inspect\./);
  } finally {
    await rmScratch(dir);
  }
});

// --- 15. status: brief sources: id absent from a present sources.md ----------

test('status names an unknown sources: id and exits 1 when sources.md exists but lacks it', async () => {
  const dir = await mkScratch();
  try {
    const record = makeRecord('art-a');
    await writeMap(dir, [record]);
    await writeZones(dir, { zones: [{ id: 'z1', title: 'Z1', kind: 'flat' }], articles: { 'art-a': { zone: 'z1', role: 'entry' } } });
    await writeSources(dir, '# Sources\n\n## known-src — Some known source\nkind: in-repo-spec\n');
    await writeBrief(dir, 'z1', makeBrief('z1', { sources: ['unknown-src'] }));
    const { code, stdout } = await runCli(dir, ['status']);
    assert.equal(code, 1);
    assert.match(stdout, /unknown sources: unknown-src/);
  } finally {
    await rmScratch(dir);
  }
});

// --- 16. new-rollout: scaffolds a rollout, refuses to overwrite --------------

test('new-rollout scaffolds a rollout with a Platform state section, then refuses a second run cleanly', async () => {
  const dir = await mkScratch();
  try {
    const first = await runCli(dir, ['new-rollout', 'my-feature']);
    assert.equal(first.code, 0);
    const content = await fs.readFile(rolloutFile(dir, 'my-feature'), 'utf-8');
    assert.match(content, /## Platform state/);

    const second = await runCli(dir, ['new-rollout', 'my-feature']);
    assert.equal(second.code, 1);
    assert.match(second.stderr, /a rollout already exists/);
    assert.doesNotMatch(second.stdout + second.stderr, /EEXIST/);
    assert.doesNotMatch(second.stdout + second.stderr, /at async/);
  } finally {
    await rmScratch(dir);
  }
});

// --- 17. status: rollout platform row names an article absent from the map --

test('status reports a rollout referencing an unknown article under ROLLOUT ERRORS, and exits 1', async () => {
  const dir = await mkScratch();
  try {
    await writeMap(dir, [makeRecord('art-a')]);
    await writeZones(dir, { zones: [], articles: {} });
    const template = rolloutTemplate('feature-x');
    const withArticle = template.replace(
      '| ios | — | not started | — | — | — | — |',
      '| ios | — | not started | — | ghost-article | — | — |',
    );
    await writeRollout(dir, 'feature-x', withArticle);
    const { code, stdout } = await runCli(dir, ['status']);
    assert.equal(code, 1);
    assert.match(stdout, /ROLLOUT ERRORS[\s\S]*unknown-article: feature-x → ghost-article/);
  } finally {
    await rmScratch(dir);
  }
});

// --- 18. status: in-progress rollout appears under ROLLOUTS IN FLIGHT, done doesn't --

test('status lists an in-progress rollout under ROLLOUTS IN FLIGHT with shipped/next platforms, and omits a done one', async () => {
  const dir = await mkScratch();
  try {
    await writeMap(dir, [makeRecord('art-a')]);
    await writeZones(dir, { zones: [], articles: {} });

    const inProgress = rolloutTemplate('feature-in-flight')
      .replace(
        '| ios | — | not started | — | — | — | — |',
        '| ios | — | merged | shipped | — | abc1234 | — |',
      )
      .replace(
        '| android | — | not started | — | — | — | — |',
        '| android | — | in progress | next | — | — | — |',
      );
    await writeRollout(dir, 'feature-in-flight', inProgress);

    const done = rolloutTemplate('feature-done').replace('status: in-progress', 'status: done');
    await writeRollout(dir, 'feature-done', done);

    const { stdout } = await runCli(dir, ['status']);
    assert.match(stdout, /ROLLOUTS IN FLIGHT/);
    assert.match(stdout, /feature-in-flight: shipped ios · next android/);
    assert.doesNotMatch(stdout, /feature-done/);
  } finally {
    await rmScratch(dir);
  }
});

// --- 19. status: no rollout reporting when rollouts/ does not exist ---------

test('status says nothing about rollouts when rollouts/ does not exist', async () => {
  const dir = await mkScratch();
  try {
    const record = makeRecord('art-a');
    await writeMap(dir, [record]);
    await writeZones(dir, { zones: [{ id: 'z1', title: 'Z1', kind: 'flat' }], articles: { 'art-a': { zone: 'z1', role: 'entry' } } });
    const hash = zoneHash([record]);
    await writeBrief(dir, 'z1', makeBrief('z1', { reviewedShape: hash }));
    await fs.writeFile(zoneStateFile(dir), JSON.stringify({ z1: snapshotZone([record]) }, null, 2) + '\n');
    // Deliberately no rollouts/ directory.
    const { code, stdout } = await runCli(dir, ['status']);
    assert.equal(code, 0);
    assert.doesNotMatch(stdout, /ROLLOUTS IN FLIGHT/);
    assert.doesNotMatch(stdout, /ROLLOUT ERRORS/);
  } finally {
    await rmScratch(dir);
  }
});

// --- 20. new-rollout: no slug -------------------------------------------------

test('new-rollout with no slug exits 1 and prints usage', async () => {
  const dir = await mkScratch();
  try {
    const { code, stderr } = await runCli(dir, ['new-rollout']);
    assert.equal(code, 1);
    assert.match(stderr, /Usage: new-rollout <slug>/);
  } finally {
    await rmScratch(dir);
  }
});

// --- 21. status: rollouts are validated even while the zone layer is absent --
// This is the regression test for the bug: rollout validation used to sit
// after the `if (!zonesData) return` early exit, so it never ran during
// bootstrap — the exact window a rollout is meant to be used in, before any
// zone briefs exist.

test('status validates rollouts even when zones.json is absent', async () => {
  const dir = await mkScratch();
  try {
    await writeMap(dir, [makeRecord('art-a')]);
    // Deliberately no zones.json and no zones/ directory.
    await writeRollout(dir, 'r', { articles: 'no-such-article', docs: 'shipped', docsCommit: 'abc1234' });
    const { code, stdout } = await runCli(dir, ['status']);
    assert.match(stdout, /zones\.json not present/);
    assert.match(stdout, /unknown-article: r → no-such-article/);
    assert.equal(code, 1);
  } finally {
    await rmScratch(dir);
  }
});

// --- 22. status: an absent zone layer must not turn every rollout zone into
// a false "unknown-zone" — the subtlety the fix above has to get right.

test('status does not report a rollout zone as unknown while the zone layer is absent', async () => {
  const dir = await mkScratch();
  try {
    await writeMap(dir, [makeRecord('art-a')]);
    // Deliberately no zones.json and no zones/ directory.
    await writeRollout(dir, 'r', { zones: ['not-created-yet'] });
    const { code, stdout } = await runCli(dir, ['status']);
    assert.doesNotMatch(stdout, /unknown-zone/);
    assert.equal(code, 0);
  } finally {
    await rmScratch(dir);
  }
});

// --- 23. assign: sdk-matrix zone with no --family warns, but still succeeds --
// See undeclaredMatrixKeys's comment in roster.mjs: an sdk-matrix member with
// no declared family falls back to rendering under its own id, which looks
// its own roster row instead of beside its counterparts, breaking the lookup on
// the real family — the exact setup that got a duplicate `making-purchases`
// article written for real. The warning must fire at assign time (cheap to
// fix), but it is a warning only: exit code stays 0 and the assignment lands.

test('assign into an sdk-matrix zone with no --family exits 0, writes the assignment, and warns', async () => {
  const dir = await mkScratch();
  try {
    await writeZones(dir, { zones: [{ id: 'z1', title: 'Z1', kind: 'sdk-matrix' }], articles: {} });
    const { code, stdout, stderr } = await runCli(dir, ['assign', 'art-a', 'z1']);
    assert.equal(code, 0);
    assert.match(stdout, /art-a → z1/);
    assert.match(stdout + stderr, /family/i);
    const written = JSON.parse(await fs.readFile(zonesFile(dir), 'utf-8'));
    assert.deepEqual(written.articles['art-a'], { zone: 'z1' });
  } finally {
    await rmScratch(dir);
  }
});

// --- 24. assign: sdk-matrix zone WITH --family does not warn -----------------

test('assign into an sdk-matrix zone with --family exits 0 and does not warn', async () => {
  const dir = await mkScratch();
  try {
    await writeZones(dir, { zones: [{ id: 'z1', title: 'Z1', kind: 'sdk-matrix' }], articles: {} });
    const { code, stdout, stderr } = await runCli(dir, ['assign', 'art-a', 'z1', '--family=making-purchases']);
    assert.equal(code, 0);
    assert.match(stdout, /art-a → z1/);
    assert.doesNotMatch(stdout + stderr, /family/i);
    const written = JSON.parse(await fs.readFile(zonesFile(dir), 'utf-8'));
    assert.deepEqual(written.articles['art-a'], { zone: 'z1', family: 'making-purchases' });
  } finally {
    await rmScratch(dir);
  }
});

// --- 25. assign: version-matrix zone with/without --version ------------------

test('assign into a version-matrix zone warns without --version, and does not warn with it', async () => {
  const dir = await mkScratch();
  try {
    await writeZones(dir, { zones: [{ id: 'z1', title: 'Z1', kind: 'version-matrix' }], articles: {} });

    const without = await runCli(dir, ['assign', 'art-a', 'z1']);
    assert.equal(without.code, 0);
    assert.match(without.stdout + without.stderr, /version/i);

    const withFlag = await runCli(dir, ['assign', 'art-b', 'z1', '--version=4.0']);
    assert.equal(withFlag.code, 0);
    assert.doesNotMatch(withFlag.stdout + withFlag.stderr, /version/i);

    const written = JSON.parse(await fs.readFile(zonesFile(dir), 'utf-8'));
    assert.deepEqual(written.articles['art-a'], { zone: 'z1' });
    assert.deepEqual(written.articles['art-b'], { zone: 'z1', version: '4.0' });
  } finally {
    await rmScratch(dir);
  }
});

// --- 26. assign: flat zone never warns about family/version ------------------
// The spurious-noise guard: a flat zone has no coverage-gap concept at all, so
// warning here would train people to ignore the output — the one case that
// would turn this fix into noise.

test('assign into a flat zone without --family or --version does not warn', async () => {
  const dir = await mkScratch();
  try {
    await writeZones(dir, { zones: [{ id: 'z1', title: 'Z1', kind: 'flat' }], articles: {} });
    const { code, stdout, stderr } = await runCli(dir, ['assign', 'art-a', 'z1', '--role=entry']);
    assert.equal(code, 0);
    assert.match(stdout, /art-a → z1/);
    assert.doesNotMatch(stdout + stderr, /family/i);
    assert.doesNotMatch(stdout + stderr, /version/i);
  } finally {
    await rmScratch(dir);
  }
});

// --- 27. propose: no zone-map.json --------------------------------------------

test('propose exits 1 with a clear message when zone-map.json does not exist', async () => {
  const dir = await mkScratch();
  try {
    const { code, stderr } = await runCli(dir, ['propose']);
    assert.equal(code, 1);
    assert.match(stderr, /write the category → zone rules first/);
  } finally {
    await rmScratch(dir);
  }
});

// --- 28. propose: header line, and an uncovered article sits under the
// "no rule covers" comment, not in the main body -------------------------------
// Deliberately asserts only structure (header shape, comment-then-row
// ordering), never a specific article id or category name: SIDEBARS_DIR is
// NOT overridable, so this test reads the repo's real sidebar JSONs. Using an
// id that cannot possibly appear in a real sidebar keeps the assertion stable
// as the docs corpus changes.

test('propose emits the header line and puts an uncovered article under the "no rule covers" comment', async () => {
  const dir = await mkScratch();
  try {
    await fs.writeFile(path.join(dir, 'zone-map.json'), JSON.stringify({ categories: {} }, null, 2) + '\n');
    const uncoveredId = 'context-mill-test-fixture-not-a-real-article';
    await writeMap(dir, [makeRecord(uncoveredId)]);
    const { code, stdout } = await runCli(dir, ['propose']);
    assert.equal(code, 0);
    const lines = stdout.split('\n');
    assert.equal(lines[0], '# id\tzone\tvia\tfamily\tversion\trole\taudience');
    const commentIndex = lines.findIndex(l => /no rule covers/.test(l));
    assert.notEqual(commentIndex, -1, 'expected a "no rule covers" comment line');
    const rowIndex = lines.findIndex(l => l.startsWith(uncoveredId));
    assert.notEqual(rowIndex, -1, 'expected the uncovered article to appear in the output');
    assert.ok(rowIndex > commentIndex, 'uncovered article must appear below the comment, not in the main body');
  } finally {
    await rmScratch(dir);
  }
});

// --- 29. assign --batch: applies every row and reports the count --------------

test('assign --batch applies every row in the file and reports the count', async () => {
  const dir = await mkScratch();
  try {
    await writeZones(dir, { zones: [{ id: 'z1', title: 'Z1', kind: 'flat' }], articles: {} });
    const batchFile = path.join(dir, 'batch.tsv');
    await fs.writeFile(batchFile, [
      '# id\tzone\tvia\tfamily\tversion',
      'art-a\tz1\tsome > path\tart-a\t',
      'art-b\tz1\tsome > path\tart-b\t',
    ].join('\n') + '\n');
    const { code, stdout } = await runCli(dir, ['assign', `--batch=${batchFile}`]);
    assert.equal(code, 0);
    assert.match(stdout, /assigned 2 article\(s\)/);
    const written = JSON.parse(await fs.readFile(zonesFile(dir), 'utf-8'));
    assert.deepEqual(written.articles['art-a'], { zone: 'z1', family: 'art-a' });
    assert.deepEqual(written.articles['art-b'], { zone: 'z1', family: 'art-b' });
  } finally {
    await rmScratch(dir);
  }
});

// --- 30. assign --batch: a row naming an unregistered zone exits 1 and leaves
// zones.json byte-identical — hashed before and after, since this is the
// guarantee that matters most: validate the whole batch before writing a
// single byte, so a rejected batch can never land half-applied.

test('assign --batch with an unregistered zone exits 1 and leaves zones.json byte-identical', async () => {
  const dir = await mkScratch();
  try {
    await writeZones(dir, { zones: [{ id: 'z1', title: 'Z1', kind: 'flat' }], articles: {} });
    const before = await fs.readFile(zonesFile(dir), 'utf-8');
    const beforeHash = crypto.createHash('sha256').update(before).digest('hex');

    const batchFile = path.join(dir, 'batch.tsv');
    await fs.writeFile(batchFile, [
      '# id\tzone\tvia\tfamily\tversion',
      'art-a\tz1\tsome > path\tart-a\t',
      'art-b\tnonexistent-zone\tsome > path\tart-b\t',
    ].join('\n') + '\n');
    const { code, stderr } = await runCli(dir, ['assign', `--batch=${batchFile}`]);
    assert.equal(code, 1);
    assert.match(stderr, /row\(s\) name a zone that is not registered/);
    assert.match(stderr, /art-b → nonexistent-zone/);

    const after = await fs.readFile(zonesFile(dir), 'utf-8');
    const afterHash = crypto.createHash('sha256').update(after).digest('hex');
    assert.equal(afterHash, beforeHash, 'zones.json must be byte-identical after a rejected batch');
    assert.equal(after, before);
  } finally {
    await rmScratch(dir);
  }
});

// --- 31. assign --batch: family is set only when it differs from the id ------

// A family equal to the id is NOT redundant and must be honoured: the canonical
// member of a 7-platform family is usually named after the family itself (the iOS
// article in the making-purchases family IS `making-purchases`), and without the
// declaration the coverage grid renders it as its own one-platform family and
// reports a false hole on the real one. Deciding what counts as "no family"
// belongs to `propose`, which blanks the column when its heuristic learned
// nothing — see the propose test asserting exactly that.
test('assign --batch honours a family equal to the id, and a differing one', async () => {
  const dir = await mkScratch();
  try {
    await writeZones(dir, { zones: [{ id: 'z1', title: 'Z1', kind: 'flat' }], articles: {} });
    const batchFile = path.join(dir, 'batch.tsv');
    await fs.writeFile(batchFile, [
      '# id\tzone\tvia\tfamily\tversion',
      'making-purchases\tz1\tsome > path\tmaking-purchases\t',
      'making-purchases-android\tz1\tsome > path\tmaking-purchases\t',
      // A blank family column is how "no family" is expressed.
      'transaction-management\tz1\tsome > path\t\t',
    ].join('\n') + '\n');
    const { code } = await runCli(dir, ['assign', `--batch=${batchFile}`]);
    assert.equal(code, 0);
    const written = JSON.parse(await fs.readFile(zonesFile(dir), 'utf-8'));
    assert.deepEqual(written.articles['making-purchases'], { zone: 'z1', family: 'making-purchases' });
    assert.deepEqual(written.articles['making-purchases-android'], { zone: 'z1', family: 'making-purchases' });
    assert.deepEqual(written.articles['transaction-management'], { zone: 'z1' });
  } finally {
    await rmScratch(dir);
  }
});

// --- 32. assign --batch: output reports role/audience counts, not a blanket
// "not set" claim — a five-column TSV (no role/audience columns at all) means
// every row carries neither, so the count is 0 out of the total applied. -----

test('assign --batch output reports how many rows carried a role and how many carried an audience', async () => {
  const dir = await mkScratch();
  try {
    await writeZones(dir, { zones: [{ id: 'z1', title: 'Z1', kind: 'flat' }], articles: {} });
    const batchFile = path.join(dir, 'batch.tsv');
    await fs.writeFile(batchFile, [
      '# id\tzone\tvia\tfamily\tversion',
      'art-a\tz1\tsome > path\tart-a\t',
    ].join('\n') + '\n');
    const { code, stdout } = await runCli(dir, ['assign', `--batch=${batchFile}`]);
    assert.equal(code, 0);
    assert.match(stdout, /role set for 0\/1/i);
    assert.match(stdout, /audience set for 0\/1/i);
  } finally {
    await rmScratch(dir);
  }
});

// --- 33. propose: emits the seven-column header, with role and audience ------

test('propose emits the seven-column header including role and audience', async () => {
  const dir = await mkScratch();
  try {
    await fs.writeFile(path.join(dir, 'zone-map.json'), JSON.stringify({ categories: {} }, null, 2) + '\n');
    await writeMap(dir, [makeRecord('context-mill-test-fixture-header-check')]);
    const { code, stdout } = await runCli(dir, ['propose']);
    assert.equal(code, 0);
    const lines = stdout.split('\n');
    assert.equal(lines[0], '# id\tzone\tvia\tfamily\tversion\trole\taudience');
  } finally {
    await rmScratch(dir);
  }
});

// --- 34. assign --batch: applies role and audience from the TSV --------------

test('assign --batch applies role and audience from the TSV, and zones.json contains them', async () => {
  const dir = await mkScratch();
  try {
    await writeZones(dir, { zones: [{ id: 'z1', title: 'Z1', kind: 'flat' }], articles: {} });
    const batchFile = path.join(dir, 'batch.tsv');
    await fs.writeFile(batchFile, [
      '# id\tzone\tvia\tfamily\tversion\trole\taudience',
      'art-a\tz1\tsome > path\tart-a\t\tentry\tdev,analyst',
    ].join('\n') + '\n');
    const { code, stdout } = await runCli(dir, ['assign', `--batch=${batchFile}`]);
    assert.equal(code, 0);
    assert.match(stdout, /assigned 1 article\(s\)/);
    const written = JSON.parse(await fs.readFile(zonesFile(dir), 'utf-8'));
    assert.deepEqual(written.articles['art-a'], { zone: 'z1', family: 'art-a', role: 'entry', audience: ['dev', 'analyst'] });
  } finally {
    await rmScratch(dir);
  }
});

// --- 35. assign --batch: still works on a five-column TSV (backwards compat) -

test('assign --batch still works on a five-column TSV with no role/audience columns', async () => {
  const dir = await mkScratch();
  try {
    await writeZones(dir, { zones: [{ id: 'z1', title: 'Z1', kind: 'flat' }], articles: {} });
    const batchFile = path.join(dir, 'batch.tsv');
    await fs.writeFile(batchFile, [
      '# id\tzone\tvia\tfamily\tversion',
      'art-a\tz1\tsome > path\tart-a\t',
    ].join('\n') + '\n');
    const { code, stdout } = await runCli(dir, ['assign', `--batch=${batchFile}`]);
    assert.equal(code, 0);
    assert.match(stdout, /assigned 1 article\(s\)/);
    const written = JSON.parse(await fs.readFile(zonesFile(dir), 'utf-8'));
    assert.deepEqual(written.articles['art-a'], { zone: 'z1', family: 'art-a' });
  } finally {
    await rmScratch(dir);
  }
});

// --- 36. assign --batch: an invalid role in the TSV exits 1 and leaves
// zones.json byte-identical — proves whole-batch validation still guards the
// new columns, not just the pre-existing ones. -------------------------------

test('assign --batch with an invalid role in the TSV exits 1 and leaves zones.json byte-identical', async () => {
  const dir = await mkScratch();
  try {
    await writeZones(dir, { zones: [{ id: 'z1', title: 'Z1', kind: 'flat' }], articles: {} });
    const before = await fs.readFile(zonesFile(dir), 'utf-8');
    const beforeHash = crypto.createHash('sha256').update(before).digest('hex');

    const batchFile = path.join(dir, 'batch.tsv');
    await fs.writeFile(batchFile, [
      '# id\tzone\tvia\tfamily\tversion\trole\taudience',
      'art-a\tz1\tsome > path\tart-a\t\tnonsense\t',
    ].join('\n') + '\n');
    const { code, stderr } = await runCli(dir, ['assign', `--batch=${batchFile}`]);
    assert.equal(code, 1);
    assert.match(stderr, /invalid role "nonsense"/);

    const after = await fs.readFile(zonesFile(dir), 'utf-8');
    const afterHash = crypto.createHash('sha256').update(after).digest('hex');
    assert.equal(afterHash, beforeHash, 'zones.json must be byte-identical after a rejected batch');
    assert.equal(after, before);
  } finally {
    await rmScratch(dir);
  }
});

// --- 37. assign --batch: summary line reports role/audience counts -----------

test('assign --batch summary line reports role and audience counts out of total applied', async () => {
  const dir = await mkScratch();
  try {
    await writeZones(dir, { zones: [{ id: 'z1', title: 'Z1', kind: 'flat' }], articles: {} });
    const batchFile = path.join(dir, 'batch.tsv');
    await fs.writeFile(batchFile, [
      '# id\tzone\tvia\tfamily\tversion\trole\taudience',
      'art-a\tz1\tsome > path\tart-a\t\tentry\tdev',
      'art-b\tz1\tsome > path\tart-b\t\t\t',
    ].join('\n') + '\n');
    const { code, stdout } = await runCli(dir, ['assign', `--batch=${batchFile}`]);
    assert.equal(code, 0);
    assert.match(stdout, /role set for 1\/2/i);
    assert.match(stdout, /audience set for 1\/2/i);
  } finally {
    await rmScratch(dir);
  }
});

// A stub can get stamped by accident — e.g. stamping a zone only to clear drift
// after moving articles into it. A `reviewed_at` on a brief nobody wrote is the
// lie this layer exists to prevent, so there has to be a way back.
test('unreviewed clears the stamp and drops the zone from .zone-state.json', async () => {
  const dir = await mkScratch();
  try {
    await writeMap(dir, [makeRecord('art-a')]);
    await writeZones(dir, { zones: [{ id: 'z1', title: 'Z1', kind: 'flat' }], articles: { 'art-a': { zone: 'z1', role: 'entry' } } });
    await writeBrief(dir, 'z1', makeBrief('z1'));
    const stamped = await runCli(dir, ['reviewed', 'z1']);
    assert.equal(stamped.code, 0);
    assert.ok(await fileExists(zoneStateFile(dir)));

    const cleared = await runCli(dir, ['unreviewed', 'z1']);
    assert.equal(cleared.code, 0);
    assert.match(cleared.stdout, /review stamp cleared/);
    const brief = await fs.readFile(briefFile(dir, 'z1'), 'utf-8');
    assert.match(brief, /^reviewed_shape:\s*$/m);
    assert.match(brief, /^reviewed_at:\s*$/m);
    assert.deepEqual(JSON.parse(await fs.readFile(zoneStateFile(dir), 'utf-8')), {});
  } finally { await rmScratch(dir); }
});

test('unreviewed on an unknown zone exits 1', async () => {
  const dir = await mkScratch();
  try {
    await writeMap(dir, [makeRecord('art-a')]);
    await writeZones(dir, { zones: [{ id: 'z1', title: 'Z1', kind: 'flat' }], articles: {} });
    const out = await runCli(dir, ['unreviewed', 'nope']);
    assert.equal(out.code, 1);
  } finally { await rmScratch(dir); }
});
