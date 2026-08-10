// Context mill: builds .claude/context-mill/docs-map.jsonl (mechanical layer)
// and reports per-zone drift against the zone briefs (human-curated layer).
//
// Usage:
//   node scripts/context-mill/extract.mjs extract   # rebuild docs-map.jsonl
//   node scripts/context-mill/extract.mjs status    # list new/stale/deleted enrichment
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  parseFrontmatter, extractHeadings, contentHash,
  splitFences, extractSymbols, extractComponents, extractLinks,
  shapeHash, apiHash, parseSpec, duplicateIds,
} from './lib.mjs';
import { loadZones, partitionErrors, zoneHash, zoneDrift, snapshotZone, normalizeZones, stateOrphans } from './zones.mjs';
import { buildRows, renderRoster, undeclaredMatrixKeys } from './roster.mjs';
import { missingSections, replaceAutoBlock, isStub, briefState, parseBrief, referencedArticleIds, sectionBody, briefTemplate } from './briefs.mjs';
import { parseSources, sourceErrors, formatRefsReport } from './sources.mjs';
import { inspectSource, existsOnDisk, readDocsLog } from './git.mjs';
import { coChanges, parseLog } from './cochange.mjs';
import { parseRollout, rolloutErrors, rolloutTemplate } from './rollouts.mjs';
import { categoryPaths, proposeZones, proposeFamily, proposeVersion, proposeRole, proposeAudience } from './propose.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '../..');
const SIDEBARS_DIR = path.join(ROOT, 'src/data/sidebars');
const DOCS_BASE = path.join(ROOT, 'src/content/docs');
// config.json, not a glob of the specs directory: it lists exactly the specs the
// site publishes, so the map cannot drift from what readers actually see, and
// the per-locale copies sitting next to them (adapty-api.ru.yaml and friends)
// are excluded for free — those are generated translations, same as src/locales.
const API_CONFIG_FILE = path.join(ROOT, 'src/api-reference/config.json');
const SPECS_DIR = path.join(ROOT, 'src/api-reference/specs');
// Overridable so tests can point the CLI at a scratch directory instead of the
// real mill — production runs must never set MILL_DIR. Read defensively
// (globalThis.process?.env?…) rather than a bare `process.env.X`: a Vite
// `define` has previously replaced `process.env` with `{}` and silently
// broken a bare read like this elsewhere in the build.
const MILL_DIR = globalThis.process?.env?.MILL_DIR || path.join(ROOT, '.claude/context-mill');
const MAP_FILE = path.join(MILL_DIR, 'docs-map.jsonl');
const ZONES_FILE = path.join(MILL_DIR, 'zones.json');
const ZONE_MAP_FILE = path.join(MILL_DIR, 'zone-map.json');
const ZONES_DIR = path.join(MILL_DIR, 'zones');
const ZONE_STATE_FILE = path.join(MILL_DIR, '.zone-state.json');
const SOURCES_FILE = path.join(MILL_DIR, 'sources.md');
const ROLLOUTS_DIR = path.join(MILL_DIR, 'rollouts');

// Same shape as collectDocIds in generate-llms.mjs, but records WHICH sidebar.
function collectDocIds(items, ids) {
  for (const item of items) {
    if (item.type === 'category') {
      if (item.link && item.link.type === 'doc') ids.add(item.link.id);
      else if (item.id) ids.add(item.id);
      if (item.items) collectDocIds(item.items, ids);
    } else if (item.type === 'doc' && item.id) {
      ids.add(item.id);
    }
  }
}

async function buildSidebarMembership() {
  const membership = new Map(); // docId -> Set<sidebarName>
  const files = (await fs.readdir(SIDEBARS_DIR)).filter(f => f.endsWith('.json'));
  for (const file of files) {
    const name = file.replace(/\.json$/, '');
    const data = JSON.parse(await fs.readFile(path.join(SIDEBARS_DIR, file), 'utf-8'));
    const ids = new Set();
    collectDocIds(Array.isArray(data) ? data : [], ids);
    for (const id of ids) {
      if (!membership.has(id)) membership.set(id, new Set());
      membership.get(id).add(name);
    }
  }
  return membership;
}

async function* walkMdx(dir) {
  for (const entry of await fs.readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) yield* walkMdx(full);
    else if (entry.name.endsWith('.mdx')) yield full;
  }
}

function parseArticle(filePath, content, sidebars) {
  const id = path.basename(filePath, '.mdx');
  const { fm, body } = parseFrontmatter(content);
  const { text, fences } = splitFences(body);
  const title = fm.title ?? null;
  const headings = extractHeadings(text);
  const symbols = extractSymbols(fences);
  const sidebarList = [...sidebars].sort();
  return {
    id,
    kind: 'article',
    path: path.relative(ROOT, filePath),
    sidebars: sidebarList,
    orphan: sidebars.size === 0,
    draft: fm.draft === true,
    title,
    description: fm.description ?? null,
    slug: fm.customSlug ?? null,
    headings,
    symbols,
    components: extractComponents(text),
    links: extractLinks(text),
    content_hash: contentHash(content),
    shape_hash: shapeHash({ title, headings, sidebars: sidebarList }),
    api_hash: apiHash(symbols),
  };
}

// Absent or unreadable config.json means "no specs registered" rather than a
// failure: the mill's other layers must keep working in a checkout where the API
// reference has been removed. A spec that config.json *does* name but that is
// missing on disk is a real inconsistency, so that one warns.
async function readSpecs() {
  const config = await readJson(API_CONFIG_FILE, null);
  if (!Array.isArray(config)) return [];
  const specs = [];
  for (const entry of config) {
    if (!entry?.specFile) continue;
    const filePath = path.join(SPECS_DIR, entry.specFile);
    let content;
    try { content = await fs.readFile(filePath, 'utf-8'); }
    catch { console.warn(`⚠ config.json names ${entry.specFile}, which is not in src/api-reference/specs`); continue; }
    specs.push(parseSpec({
      // The id keeps its `.yaml` extension: `web-api.yaml` and `web-api.mdx` are
      // two different documents, and stripping it made them one record. No
      // article id contains a dot, so the extension also marks a spec on sight.
      id: entry.specFile,
      relPath: path.relative(ROOT, filePath),
      content,
      name: entry.name,
    }));
  }
  return specs;
}

async function readJsonl(file) {
  let raw;
  try { raw = await fs.readFile(file, 'utf-8'); } catch { return []; }
  const entries = [];
  for (const [i, line] of raw.split('\n').entries()) {
    if (!line.trim()) continue;
    try { entries.push(JSON.parse(line)); }
    catch { console.warn(`⚠ ${path.basename(file)}:${i + 1} is not valid JSON — skipped`); }
  }
  return entries;
}

async function readJson(file, fallback) {
  try { return JSON.parse(await fs.readFile(file, 'utf-8')); } catch { return fallback; }
}

// The zone layer is optional until a later plan populates it, so every command
// must work with zones.json absent.
async function loadZoneLayer() {
  const raw = await readJson(ZONES_FILE, null);
  if (!raw) return null;
  return loadZones(raw);
}

function briefPath(zoneId) {
  return path.join(ZONES_DIR, `${zoneId}.md`);
}

async function extract() {
  const membership = await buildSidebarMembership();
  const records = [];
  for await (const filePath of walkMdx(DOCS_BASE)) {
    const content = await fs.readFile(filePath, 'utf-8');
    const id = path.basename(filePath, '.mdx');
    records.push(parseArticle(filePath, content, membership.get(id) ?? new Set()));
  }
  for (const spec of await readSpecs()) records.push(spec);
  records.sort((a, b) => a.id.localeCompare(b.id));
  const collisions = duplicateIds(records);
  if (collisions.length) {
    console.error('✗ two documents share one id — the map would silently keep only one of each:');
    for (const c of collisions) console.error(`  ${c}`);
    process.exitCode = 1;
    return;
  }
  await fs.mkdir(MILL_DIR, { recursive: true });
  await fs.writeFile(MAP_FILE, records.map(r => JSON.stringify(r)).join('\n') + '\n');
  const specCount = records.filter(r => r.kind === 'spec').length;
  const enrichable = records.filter(r => !r.orphan && !r.draft).length;
  console.log(`docs-map.jsonl: ${records.length - specCount} articles + ${specCount} API specs (${enrichable} enrichable, ${records.length - enrichable} orphan/draft)`);

  const zonesData = await loadZoneLayer();
  if (!zonesData) {
    console.log('zones.json not present — skipping roster rendering');
    return;
  }
  let rendered = 0;
  let failed = 0;
  for (const [zoneId, zone] of zonesData.zones) {
    let brief;
    try { brief = await fs.readFile(briefPath(zoneId), 'utf-8'); }
    catch { console.warn(`⚠ ${zoneId}: no brief at ${path.relative(ROOT, briefPath(zoneId))}`); continue; }
    // A malformed brief (e.g. missing/typo'd markers) must not abort the whole
    // run — zones ordered after it in zones.json still deserve their roster.
    try {
      const next = replaceAutoBlock(brief, 'roster', renderRoster(zone, buildRows(zoneId, records, zonesData)));
      if (next !== brief) { await fs.writeFile(briefPath(zoneId), next); rendered++; }
    } catch (err) {
      console.warn(`⚠ ${zoneId}: ${err.message}`);
      failed++;
    }
  }
  console.log(`rosters: ${rendered} brief(s) updated of ${zonesData.zones.size}${failed ? ` · ${failed} failed` : ''}`);
}

async function status() {
  const map = await readJsonl(MAP_FILE);
  if (map.length === 0) {
    console.error('docs-map.jsonl is missing or empty — run `npm run mill` first.');
    process.exitCode = 1;
    return;
  }
  // The Phase 1 NEW/STALE/DELETED block used to report here, comparing the map
  // against a per-article enrichment layer. Retired 2026-08-10: per-zone drift
  // replaces it and is the better signal, because it names *which* member
  // changed instead of announcing that some file's bytes moved. The 3,802
  // curated search terms that layer carried now live in the briefs' Ticket
  // language sections.
  const zonesData = await loadZoneLayer();
  const mapIds = new Set(map.map(e => e.id));

  // Rollouts are checked independently of the zone layer, and before its
  // early-return below: the bootstrap order deliberately puts rollouts ahead
  // of the ~35 zone briefs, so rollouts are in daily use while zones.json is
  // still absent. Their articles and platform rows can be validated against
  // docs-map.jsonl alone, which always exists — only zone-name validation
  // needs the zone layer, and rolloutErrors already knows to skip that when
  // zoneIds is null.
  const rolloutFiles = await fs.readdir(ROLLOUTS_DIR).catch(() => []);
  const rolloutIssues = [];
  const activeRollouts = [];
  for (const file of rolloutFiles.filter(f => f.endsWith('.md'))) {
    const rollout = parseRollout(await fs.readFile(path.join(ROLLOUTS_DIR, file), 'utf-8'));
    rolloutIssues.push(...rolloutErrors(rollout, {
      zoneIds: zonesData ? new Set(zonesData.zones.keys()) : null,
      articleIds: mapIds,
    }));
    if (rollout.fm.status !== 'done') activeRollouts.push(rollout);
  }
  if (rolloutIssues.length) {
    console.log('\nROLLOUT ERRORS');
    for (const e of rolloutIssues) console.log(`  ${e.kind}: ${e.id} → ${e.value}`);
    process.exitCode = 1;
  }
  if (activeRollouts.length) {
    console.log('\nROLLOUTS IN FLIGHT');
    for (const r of activeRollouts) {
      const shipped = r.platforms.filter(p => p.docs === 'shipped').map(p => p.platform);
      const next = r.platforms.find(p => p.docs === 'next');
      console.log(`  ${r.fm.rollout}: shipped ${shipped.join(', ') || 'none'}${next ? ` · next ${next.platform}` : ''}`);
    }
  }

  if (!zonesData) {
    console.log('\nzones.json not present — zone reporting skipped');
    return;
  }

  // sources.md is authored in a later phase, exactly like zones.json — skip
  // the sources: cross-check silently until then.
  let sourceIds = null;
  try {
    sourceIds = new Set(parseSources(await fs.readFile(SOURCES_FILE, 'utf-8')).map(s => s.id));
  } catch { /* not authored yet */ }

  // ZONE DRIFT first: with ~40 zones vs. hundreds of unassigned articles at
  // this stage, the actionable per-zone notes would otherwise be buried
  // under the partition dump.
  const errors = partitionErrors(map, zonesData);
  const state = await readJson(ZONE_STATE_FILE, {}); // read once, reused below by stateOrphans too
  const byId = new Map(map.map(e => [e.id, e]));
  console.log('\nZONE DRIFT');
  for (const [zoneId, zone] of zonesData.zones) {
    const members = zonesData.membersOf(zoneId).map(id => byId.get(id)).filter(Boolean);
    const drift = zoneDrift(members, state[zoneId]);
    let brief = null;
    try { brief = await fs.readFile(briefPath(zoneId), 'utf-8'); } catch { /* reported below */ }
    const notes = [];
    // no brief and missing sections are errors, not warnings: the design
    // calls both "this is broken", so both must flip the exit code that is
    // an agent's only channel for noticing.
    if (brief === null) { notes.push('no brief'); process.exitCode = 1; }
    else {
      const missing = missingSections(brief);
      if (missing.length) { notes.push(`missing sections: ${missing.join(', ')}`); process.exitCode = 1; }
      const stub = isStub(brief);
      const fm = parseBrief(brief).fm;
      if (fm.reviewed_shape && fm.reviewed_shape !== zoneHash(members)) notes.push('reviewed_shape out of date');
      // js-yaml auto-parses an unquoted YYYY-MM-DD scalar into a real Date
      // (a !!timestamp), so a plain date has to be re-flattened here rather
      // than interpolated as-is, or it prints as a full Date#toString().
      const reviewedAt = fm.reviewed_at instanceof Date
        ? fm.reviewed_at.toISOString().slice(0, 10)
        : (fm.reviewed_at || null);
      notes.push(briefState({ stub, reviewedAt }));
      // Reader jobs is one of the judgment sections isStub() already checks —
      // don't report the same emptiness under two different names.
      if (!stub && sectionBody(brief, 'Reader jobs') === '') notes.push('no reader jobs');
      // A dangling id in a brief IS an error: it sends the agent to a file
      // that does not exist. But a brief legitimately backticks other
      // vocabularies that are shaped like article ids — a neighbouring zone in
      // Boundaries, a declared family key, a version — so exclude everything the
      // curation layer already knows by name before calling a token dangling.
      // (Commit SHAs and markup words are filtered inside referencedArticleIds.)
      const knownVocabulary = new Set([
        ...zonesData.zones.keys(),
        ...[...zonesData.articles.values()].flatMap(e => [e.family, e.version].filter(Boolean)),
      ]);
      const dangling = referencedArticleIds(brief)
        .filter(id => !mapIds.has(id) && !knownVocabulary.has(id));
      if (dangling.length) { notes.push(`dangling ids: ${dangling.join(', ')}`); process.exitCode = 1; }
      // A brief's sources: frontmatter pointing at an id sources.md doesn't
      // have resolves to nothing for whoever follows it — an error, like the
      // dangling-id case above.
      if (sourceIds) {
        const unknownSources = (fm.sources ?? []).filter(id => !sourceIds.has(id));
        if (unknownSources.length) { notes.push(`unknown sources: ${unknownSources.join(', ')}`); process.exitCode = 1; }
      }
    }
    const rows = buildRows(zoneId, map, zonesData);
    // An undeclared family/version member renders under its own id, which in
    // an sdk-matrix zone looks like a genuine one-platform family AND makes
    // the real family show a false hole — the exact setup that gets an agent
    // to write a duplicate article. Warning only: it isn't broken, it's
    // unfinished curation.
    const undeclared = undeclaredMatrixKeys(zone, rows);
    if (undeclared.length) notes.push(`undeclared family/version: ${undeclared.join(', ')}`);
    if (drift.changed.length) notes.push(`changed: ${drift.changed.join(', ')}`);
    if (drift.added.length) notes.push(`added: ${drift.added.join(', ')}`);
    if (drift.removed.length) notes.push(`removed: ${drift.removed.join(', ')}`);
    console.log(`  ${zoneId.padEnd(28)} ${notes.length ? notes.join(' · ') : 'ok'}`);
  }

  // Summary by kind before the full enumeration, so the shape of the
  // problem is visible without scrolling past hundreds of lines — the
  // full list still follows in full, nothing is capped or hidden.
  const byKind = new Map();
  for (const e of errors) byKind.set(e.kind, (byKind.get(e.kind) ?? 0) + 1);
  const kindSummary = [...byKind.entries()].map(([kind, n]) => `${kind}: ${n}`).join(', ');
  console.log(`\nPARTITION: ${errors.length} error(s)${kindSummary ? ` — ${kindSummary}` : ''}`);
  for (const e of errors) {
    console.log(`  ${e.kind}: ${e.id}${e.zone ? ` → ${e.zone}` : ''}`);
  }
  if (errors.length) process.exitCode = 1;

  // Its own labelled section, not folded into the partition dump above: these
  // two findings are about the zone layer's own bookkeeping (not the
  // article↔zone partition), and printed at the same two-space indent right
  // after a potentially 680-line enumeration they were invisible.
  console.log('\nCONSISTENCY');
  for (const orphan of stateOrphans(state, zonesData)) {
    console.log(`  stale-zone-state: ${orphan} (zone deleted — remove it from .zone-state.json)`);
    process.exitCode = 1;
  }
  const briefFiles = await fs.readdir(ZONES_DIR).catch(() => []);
  for (const file of briefFiles.filter(f => f.endsWith('.md'))) {
    const id = file.replace(/\.md$/, '');
    if (!zonesData.zones.has(id)) {
      console.log(`  unregistered-brief: ${id} (brief file with no entry in zones.json)`);
      process.exitCode = 1;
    }
  }
}

// Stamps a brief as reviewed against the current corpus and snapshots its member
// hashes, so the next `status` can name exactly what changed since.
async function reviewed(zoneId) {
  if (!zoneId) { console.error('Usage: reviewed <zone-id>'); process.exitCode = 1; return; }
  const map = await readJsonl(MAP_FILE);
  // Same guard status() uses. Without it, an empty/missing map makes every
  // zone's `members` empty, so the code below would stamp reviewed_shape
  // with the hash of the empty set (identical for every zone) and write
  // `{}` into .zone-state.json — destroying the review record while
  // reporting success, before anything else runs.
  if (map.length === 0) {
    console.error('docs-map.jsonl is missing or empty — run `npm run mill` first.');
    process.exitCode = 1;
    return;
  }
  const zonesData = await loadZoneLayer();
  if (!zonesData?.zones.has(zoneId)) { console.error(`Unknown zone: ${zoneId}`); process.exitCode = 1; return; }
  const byId = new Map(map.map(e => [e.id, e]));
  const members = zonesData.membersOf(zoneId).map(id => byId.get(id)).filter(Boolean);
  const file = briefPath(zoneId);
  let brief;
  try { brief = await fs.readFile(file, 'utf-8'); }
  catch {
    console.error(`${zoneId}: no brief at ${path.relative(ROOT, file)} — write it (or run \`new-zone\`) first`);
    process.exitCode = 1;
    return;
  }
  // A half-written brief with no reviewed_shape/reviewed_at line would leave
  // .replace() as a silent no-op: the brief and the snapshot would then
  // disagree, and status's `fm.reviewed_shape && …` check can never fire
  // again for this zone. Fail loudly instead of writing an inconsistent state.
  const missingFields = [];
  if (!/^reviewed_shape:/m.test(brief)) missingFields.push('reviewed_shape');
  if (!/^reviewed_at:/m.test(brief)) missingFields.push('reviewed_at');
  if (missingFields.length) {
    console.error(`${zoneId}: brief is missing frontmatter field(s): ${missingFields.join(', ')} — not reviewed`);
    process.exitCode = 1;
    return;
  }
  if (members.length === 0) console.warn(`⚠ ${zoneId} has no members — reviewed anyway`);
  const today = new Date().toISOString().slice(0, 10);
  const stamped = brief
    .replace(/^reviewed_shape:.*$/m, `reviewed_shape: ${zoneHash(members)}`)
    .replace(/^reviewed_at:.*$/m, `reviewed_at: ${today}`);
  await fs.writeFile(file, stamped);
  const state = await readJson(ZONE_STATE_FILE, {});
  state[zoneId] = snapshotZone(members);
  await fs.writeFile(ZONE_STATE_FILE, JSON.stringify(state, null, 2) + '\n');
  console.log(`${zoneId}: reviewed at ${today}, ${members.length} member(s) snapshotted`);
}

// Collects every source id referenced by a brief's `sources:` frontmatter, so an
// unreferenced source can be reported as dead.
async function referencedSourceIds(zonesData) {
  const ids = new Set();
  if (!zonesData) return ids;
  for (const [zoneId] of zonesData.zones) {
    try {
      const brief = await fs.readFile(briefPath(zoneId), 'utf-8');
      for (const id of parseBrief(brief).fm.sources ?? []) ids.add(id);
    } catch { /* a missing brief is reported by status */ }
  }
  return ids;
}

// The inverse of `reviewed`. Needed because a stub can get stamped by accident —
// e.g. stamping a zone just to clear drift after moving articles into it — and a
// `reviewed_at` on a brief nobody wrote is exactly the lie this layer exists to
// prevent: it tells the next agent a human vouched for content that is empty.
async function unreviewed(zoneId) {
  if (!zoneId) { console.error('Usage: unreviewed <zone-id>'); process.exitCode = 1; return; }
  const zonesData = await loadZoneLayer();
  if (!zonesData?.zones.has(zoneId)) { console.error(`Unknown zone: ${zoneId}`); process.exitCode = 1; return; }
  const file = briefPath(zoneId);
  let brief;
  try { brief = await fs.readFile(file, 'utf-8'); }
  catch { console.error(`${zoneId}: no brief at ${path.relative(ROOT, file)}`); process.exitCode = 1; return; }
  await fs.writeFile(file, brief
    .replace(/^reviewed_shape:.*$/m, 'reviewed_shape:')
    .replace(/^reviewed_at:.*$/m, 'reviewed_at:'));
  const state = await readJson(ZONE_STATE_FILE, {});
  delete state[zoneId];
  await fs.writeFile(ZONE_STATE_FILE, JSON.stringify(state, null, 2) + '\n');
  console.log(`${zoneId}: review stamp cleared`);
}

async function refs() {
  let md;
  try { md = await fs.readFile(SOURCES_FILE, 'utf-8'); }
  catch {
    // An absent sources.md is a state, not an error: the source-catalog layer
    // simply hasn't been authored yet, exactly like zones.json during
    // bootstrap (see status()'s "zones.json not present" branch above) — so
    // this must exit 0. That's different from a sources.md that DOES exist
    // but is malformed (missing-remote, missing-path, unknown-kind below):
    // those are real breakage in a file someone wrote, and still exit 1.
    console.error(`No ${path.relative(ROOT, SOURCES_FILE)} yet — nothing to inspect.`);
    return;
  }
  const sources = parseSources(md);
  const errors = sourceErrors(sources, {
    referencedIds: await referencedSourceIds(await loadZoneLayer()),
    existsOnDisk,
  });
  // missing-remote, missing-path, and unknown-kind are errors by design: a
  // local-clone with no remote (or a bad kind) can't be resolved in CI at
  // all. unreferenced stays a warning — an unused source is clutter, not
  // breakage.
  const REFS_ERROR_KINDS = new Set(['missing-remote', 'missing-path', 'unknown-kind']);
  for (const e of errors) {
    console.warn(`⚠ ${e.kind}: ${e.id}${e.path ? ` (${e.path})` : ''}`);
    if (REFS_ERROR_KINDS.has(e.kind)) process.exitCode = 1;
  }
  const states = [];
  for (const source of sources) {
    if (source.kind !== 'local-clone') continue;
    states.push(await inspectSource(source));
  }
  console.log(formatRefsReport(states));
}

// Bootstrap-only: expands ~40 category rules into a per-article proposal a human
// edits, rather than making 719 separate decisions. Heuristics live in
// propose.mjs and never run at render or validate time.
async function propose() {
  const map = await readJson(ZONE_MAP_FILE, null);
  if (!map) { console.error(`No ${path.relative(ROOT, ZONE_MAP_FILE)} — write the category → zone rules first.`); process.exitCode = 1; return; }
  const sidebars = {};
  for (const file of (await fs.readdir(SIDEBARS_DIR)).filter(f => f.endsWith('.json'))) {
    sidebars[file.replace(/\.json$/, '')] = JSON.parse(await fs.readFile(path.join(SIDEBARS_DIR, file), 'utf-8'));
  }
  const records = await readJsonl(MAP_FILE);
  const paths = categoryPaths(sidebars);
  const proposals = proposeZones(paths, map);
  const rows = [];
  const unmapped = [];
  // A same-depth conflict between two category rules is a decision, not a
  // coin flip — kept out of the main body so it cannot be imported unnoticed.
  const tied = [];
  for (const entry of records) {
    if (entry.orphan || entry.draft) continue;
    // A spec has no sidebar placement, so every category rule and every
    // filename heuristic below is blind to it — but its zone is not a guess, it
    // is a standing decision in zone-map.json's overrides. Emit that row here so
    // specs still travel the one path to assignment (propose → assign) instead
    // of needing to be typed into zones.json by hand. Role is always `reference`:
    // for the server-side and web APIs the spec *is* the reference.
    if (entry.kind === 'spec') {
      const zone = map.overrides?.[entry.id] ?? null;
      const line = [entry.id, zone ?? '', zone ? 'override' : '', '', '', 'reference', proposeAudience(zone, map).join(',')].join('\t');
      (zone ? rows : unmapped).push(line);
      continue;
    }
    const p = proposals.get(entry.id) ?? { zone: null, via: null };
    const role = proposeRole(entry.id, paths.get(entry.id) ?? []);
    const audience = proposeAudience(p.zone, map);
    // A proposed family equal to the id means the heuristic found no platform
    // token to strip, i.e. it learned nothing — emit it as blank so the article
    // shows up in `mill:status` as needing a declaration. A family that really
    // does equal its id (the canonical iOS member of a 7-platform family) is a
    // judgment call, so it gets typed in deliberately rather than inferred here.
    const family = proposeFamily(entry.id);
    const line = [
      entry.id, p.zone ?? '', p.via ?? '', family === entry.id ? '' : family, proposeVersion(entry.id) ?? '',
      role ?? '', audience.join(','),
    ].join('\t');
    if (!p.zone) unmapped.push(line);
    else if (p.tie) tied.push(`${line}\t# TIE: ${p.tie.join(' vs ')}`);
    else rows.push(line);
  }
  console.log('# id\tzone\tvia\tfamily\tversion\trole\taudience');
  for (const r of rows.sort()) console.log(r);
  if (tied.length) {
    console.log(`# ${tied.length} article(s) whose sidebar categories tie between zones — resolve each with an override`);
    for (const r of tied.sort()) console.log(r);
  }
  if (unmapped.length) {
    console.log(`# ${unmapped.length} article(s) no rule covers — assign a zone or add a category rule`);
    for (const r of unmapped.sort()) console.log(r);
  }
}

function parseFlags(argv) {
  const flags = {};
  for (const arg of argv) {
    const m = arg.match(/^--([a-z-]+)=(.*)$/);
    if (m) flags[m[1]] = m[2];
  }
  return flags;
}

async function writeZones(data) {
  await fs.writeFile(ZONES_FILE, JSON.stringify(normalizeZones(data), null, 2) + '\n');
}

// Assignment is part of writing an article, not separate housekeeping: this is
// the one-liner a doc-writing session runs before it finishes.
async function assign(articleId, zoneId, flags) {
  if (!articleId || !zoneId) { console.error('Usage: assign <article-id> <zone-id> [--role=] [--audience=] [--family=] [--version=]'); process.exitCode = 1; return; }
  const raw = await readJson(ZONES_FILE, { zones: [], articles: {} });
  raw.articles[articleId] = {
    zone: zoneId,
    ...(flags.role ? { role: flags.role } : {}),
    ...(flags.audience ? { audience: flags.audience.split(',').map(s => s.trim()) } : {}),
    ...(flags.family ? { family: flags.family } : {}),
    ...(flags.version ? { version: flags.version } : {}),
  };
  // loadZones throws on structurally invalid zones.json — a bad `kind`, a
  // duplicate zone id, an invalid `role`/`audience`. Left uncaught, that
  // throw would escape as an unhandled rejection (a raw stack trace, no
  // exit-code discipline) — the same failure mode every other command here
  // avoids by catching and printing a one-line message instead. Catching here
  // also guarantees writeZones is never reached, so a rejected assignment
  // leaves zones.json untouched.
  let zonesData;
  try {
    zonesData = loadZones(raw);
  } catch (err) {
    console.error(`assign: ${err.message}`);
    process.exitCode = 1;
    return;
  }
  // loadZones does NOT check that `entry.zone` names a registered zone — that
  // check has to live here, not in loadZones. partitionErrors reports an
  // unrecognized zone as an `unknown-zone` finding, which requires loadZones
  // to succeed on a zones.json that contains one; if loadZones threw on it
  // instead, `mill:status` would crash on a typo'd zone rather than report
  // it — destroying the exact diagnostic that exists for this.
  if (!zonesData.zones.has(zoneId)) {
    console.error(`assign: unknown zone "${zoneId}" — not registered in zones.json`);
    process.exitCode = 1;
    return;
  }
  await writeZones(raw);
  // Warn here, at assign time, not just later via mill:status's
  // undeclaredMatrixKeys — by the time status catches it the curator may have
  // already lost the ability to find counterparts for that topic
  // article (see undeclaredMatrixKeys's comment in roster.mjs for the
  // making-purchases/Capacitor incident this already caused). Warning only:
  // the assignment above already succeeded and the exit code stays 0 —
  // assigning first and backfilling the key later is legitimate.
  const zone = zonesData.zones.get(zoneId);
  if (zone.kind === 'sdk-matrix' && !flags.family) {
    console.warn(`⚠ ${articleId}: no --family given for sdk-matrix zone "${zoneId}" — it will get its own roster row instead of sitting beside its counterparts, so "which article covers this on Android" won't work for this topic. Backfill with --family=<id>.`);
  }
  if (zone.kind === 'version-matrix' && !flags.version) {
    console.warn(`⚠ ${articleId}: no --version given for version-matrix zone "${zoneId}" — it will not appear in the version grid at all, under-reporting migration coverage. Backfill with --version=<v>.`);
  }
  console.log(`${articleId} → ${zoneId}`);
}

// Imports a propose-shaped TSV in one validated write: a partially applied
// batch is worse than a rejected one, because the operator cannot tell which
// half landed. So the whole batch is parsed and validated against the
// current zones.json before a single byte is written.
async function assignBatch(file) {
  const raw = await readJson(ZONES_FILE, { zones: [], articles: {} });
  const text = await fs.readFile(file, 'utf-8');
  let applied = 0;
  let withRole = 0;
  let withAudience = 0;
  for (const line of text.split('\n')) {
    if (!line.trim() || line.startsWith('#')) continue;
    // role/audience are the two columns propose added after version — read
    // when present, but a row with fewer columns (a hand-written batch predating
    // them) must still work, so both are optional here.
    const [id, zone, , family, version, role, audience] = line.split('\t').map(c => c?.trim());
    if (!zone) continue;
    raw.articles[id] = {
      zone,
      // Any non-empty family is honoured, including one equal to the id. Those
      // are not redundant: the canonical member of a 7-platform family is often
      // named after the family itself (the iOS article in the making-purchases
      // family IS `making-purchases`), and it needs the declaration as much as
      // its siblings. Deciding what counts as "no family" belongs to `propose`,
      // which leaves the column empty when its heuristic learned nothing.
      ...(family ? { family } : {}),
      ...(version ? { version } : {}),
      ...(role ? { role } : {}),
      ...(audience ? { audience: audience.split(',').map(s => s.trim()).filter(Boolean) } : {}),
    };
    applied++;
    if (role) withRole++;
    if (audience) withAudience++;
  }
  // Same discipline as assign(): loadZones can throw on structurally invalid
  // zones.json (bad kind, duplicate id, invalid role/audience) — caught here
  // rather than left to escape as a raw stack trace, and before a single
  // byte of the batch is written.
  try {
    loadZones(raw);
  } catch (err) {
    console.error(`assign --batch: ${err.message}`);
    process.exitCode = 1;
    return;
  }
  const unknown = Object.entries(raw.articles).filter(([, e]) => !raw.zones.some(z => z.id === e.zone));
  if (unknown.length) {
    console.error(`assign --batch: ${unknown.length} row(s) name a zone that is not registered:`);
    for (const [id, e] of unknown.slice(0, 10)) console.error(`  ${id} → ${e.zone}`);
    process.exitCode = 1;
    return;
  }
  await writeZones(raw);
  console.log(`assigned ${applied} article(s)`);
  console.log(`role set for ${withRole}/${applied}, audience set for ${withAudience}/${applied} — the rest still need a human's judgment`);
}

async function newZone(zoneId, flags) {
  if (!zoneId || !flags.kind || !flags.title) { console.error('Usage: new-zone <zone-id> --kind=flat|sdk-matrix|version-matrix --title="…"'); process.exitCode = 1; return; }
  const raw = await readJson(ZONES_FILE, { zones: [], articles: {} });
  if (raw.zones.some(z => z.id === zoneId)) { console.error(`Zone "${zoneId}" already exists`); process.exitCode = 1; return; }
  raw.zones.push({ id: zoneId, title: flags.title, kind: flags.kind });
  try {
    loadZones(raw);
  } catch (err) {
    console.error(`new-zone: ${err.message}`);
    process.exitCode = 1;
    return;
  }
  await fs.mkdir(ZONES_DIR, { recursive: true });
  // `wx` refuses to overwrite: a brief left behind by a deleted zone holds real
  // judgment someone wrote, so re-registering the zone must not silently replace
  // it with a blank scaffold. Reported as a message, not an EEXIST stack trace.
  try {
    await fs.writeFile(briefPath(zoneId), briefTemplate(zoneId), { flag: 'wx' });
  } catch (err) {
    const why = err.code === 'EEXIST'
      ? `a brief already exists at ${path.relative(ROOT, briefPath(zoneId))} — inspect it before re-creating the zone`
      : err.message;
    console.error(`new-zone: ${why}`);
    process.exitCode = 1;
    return;
  }
  await writeZones(raw);
  console.log(`created ${path.relative(ROOT, briefPath(zoneId))} — fill it via the skill's interview mode`);
  console.log(`then update Boundaries in every adjacent zone, on both sides`);
}

// Ripple rules from git history: which articles change together, and — the
// useful part — which of those pairs cross a zone boundary, since co-change
// within a zone is expected and mostly noise. With zones.json absent, zoneOf
// stays empty and `crossZone` is `undefined` on every pair, so nothing gets
// flagged as cross-zone (and a zone id filter yields nothing) — that's the
// correct behavior for this bootstrap stage, not a bug.
async function cochange(zoneId) {
  const stdout = await readDocsLog(ROOT);
  const zonesData = await loadZoneLayer();
  const zoneOf = new Map();
  if (zonesData) for (const [id, e] of zonesData.articles) zoneOf.set(id, e.zone);
  const pairs = coChanges(parseLog(stdout), { zoneOf: zonesData ? zoneOf : undefined });
  const relevant = zoneId
    ? pairs.filter(p => zoneOf.get(p.a) === zoneId || zoneOf.get(p.b) === zoneId)
    : pairs;
  console.log(`${relevant.length} co-changing pair(s)${zoneId ? ` touching ${zoneId}` : ''}`);
  for (const p of relevant.slice(0, 60)) {
    console.log(`  ${String(p.commits).padStart(3)}×  ${p.a} + ${p.b}${p.crossZone ? '   ← CROSS-ZONE' : ''}`);
  }
  if (relevant.length > 60) console.log(`  … and ${relevant.length - 60} more (not truncated silently: rerun with a zone id to narrow)`);
}

async function newRollout(slug) {
  if (!slug) { console.error('Usage: new-rollout <slug>'); process.exitCode = 1; return; }
  const file = path.join(ROLLOUTS_DIR, `${slug}.md`);
  await fs.mkdir(ROLLOUTS_DIR, { recursive: true });
  try {
    await fs.writeFile(file, rolloutTemplate(slug), { flag: 'wx' });
  } catch (err) {
    const why = err.code === 'EEXIST'
      ? `a rollout already exists at ${path.relative(ROOT, file)}`
      : err.message;
    console.error(`new-rollout: ${why}`);
    process.exitCode = 1;
    return;
  }
  console.log(`created ${path.relative(ROOT, file)}`);
  console.log('fill "What changes" and the zones list; the canon section is written after the first platform ships');
}

const cmd = process.argv[2] || 'extract';
if (cmd === 'extract') await extract();
else if (cmd === 'status') await status();
else if (cmd === 'reviewed') await reviewed(process.argv[3]);
else if (cmd === 'unreviewed') await unreviewed(process.argv[3]);
else if (cmd === 'refs') await refs();
else if (cmd === 'assign') {
  const batchFlag = process.argv.slice(3).find(a => a.startsWith('--batch='));
  if (batchFlag) await assignBatch(batchFlag.slice('--batch='.length));
  else await assign(process.argv[3], process.argv[4], parseFlags(process.argv.slice(5)));
}
else if (cmd === 'propose') await propose();
else if (cmd === 'new-zone') await newZone(process.argv[3], parseFlags(process.argv.slice(4)));
else if (cmd === 'new-rollout') await newRollout(process.argv[3]);
else if (cmd === 'cochange') await cochange(process.argv[3]);
else { console.error(`Unknown command: ${cmd}. Use: extract | status | reviewed | refs | assign | propose | new-zone | new-rollout | cochange`); process.exitCode = 1; }
