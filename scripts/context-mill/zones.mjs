// Loader and validator for .claude/context-mill/zones.json — the Phase 2
// curation layer that partitions the docs-map corpus into product-area
// "zones". This module owns only the zones.json format: no file I/O, no
// rendering, no git.
import crypto from 'node:crypto';

export const KINDS = new Set(['flat', 'sdk-matrix', 'version-matrix']);
export const ROLES = new Set(['entry', 'how-to', 'reference', 'conceptual', 'migration', 'legacy-orphan']);
export const AUDIENCES = new Set(['dev', 'marketer', 'analyst', 'support']);

// Validates zones.json and returns lookup structures. Throws on anything
// structurally wrong: a bad partition is a bug in curation, not a warning to
// live with, because every downstream renderer trusts these values blindly.
export function loadZones(data) {
  const zones = new Map();
  for (const zone of data.zones ?? []) {
    if (!zone.id) throw new Error('zone without an id');
    if (zones.has(zone.id)) throw new Error(`duplicate zone id "${zone.id}"`);
    if (!KINDS.has(zone.kind)) throw new Error(`zone "${zone.id}": unknown kind "${zone.kind}"`);
    zones.set(zone.id, zone);
  }
  const articles = new Map();
  for (const [id, entry] of Object.entries(data.articles ?? {})) {
    if (entry.role !== undefined && !ROLES.has(entry.role)) {
      throw new Error(`article "${id}": invalid role "${entry.role}"`);
    }
    // A string is iterable, so without this guard a typo like
    // "audience": "dev" (instead of ["dev"]) would silently iterate its
    // characters and fail with a baffling `invalid audience "d"`, misdirecting
    // whoever is debugging zones.json.
    if (entry.audience !== undefined && !Array.isArray(entry.audience)) {
      throw new Error(`article "${id}": audience must be an array`);
    }
    for (const a of entry.audience ?? []) {
      if (!AUDIENCES.has(a)) throw new Error(`article "${id}": invalid audience "${a}"`);
    }
    articles.set(id, entry);
  }
  const membersOf = (zoneId) => [...articles.entries()]
    .filter(([, e]) => e.zone === zoneId)
    .map(([id]) => id)
    .sort();
  return { zones, articles, membersOf };
}

// A JSON object cannot hold the same key twice, so "exactly one zone per
// article" is guaranteed by the file format; what needs checking is that both
// sides of every assignment exist, and that nothing enrichable is left out.
export function partitionErrors(mapEntries, zonesData) {
  const errors = [];
  const mapById = new Map(mapEntries.map(e => [e.id, e]));
  for (const [id, entry] of zonesData.articles) {
    if (!mapById.has(id)) errors.push({ kind: 'unknown-article', id });
    else if (!zonesData.zones.has(entry.zone)) errors.push({ kind: 'unknown-zone', id, zone: entry.zone });
  }
  for (const entry of mapEntries) {
    if (entry.orphan || entry.draft) continue;
    if (!zonesData.articles.has(entry.id)) errors.push({ kind: 'unassigned', id: entry.id });
  }
  return errors;
}

// Used by a later task to detect when a rendered zone roster is stale
// relative to the docs-map (any member's shape or API surface changed).
export function zoneHash(members) {
  const parts = members.map(m => `${m.id}:${m.shape_hash}:${m.api_hash}`).sort();
  return crypto.createHash('sha256').update(parts.join('\n')).digest('hex').slice(0, 12);
}

// The snapshot is script-owned state, written by `mill:reviewed` when a brief is
// marked reviewed. It lives in .zone-state.json rather than in the brief so a
// human file never carries hash lists.
export function snapshotZone(members) {
  return Object.fromEntries(members.map(m => [m.id, `${m.shape_hash}:${m.api_hash}`]));
}

export function zoneDrift(members, snapshot) {
  const before = snapshot ?? {};
  const now = snapshotZone(members);
  const changed = [];
  const added = [];
  for (const [id, pair] of Object.entries(now)) {
    if (!(id in before)) added.push(id);
    else if (before[id] !== pair) changed.push(id);
  }
  const removed = Object.keys(before).filter(id => !(id in now));
  return { changed: changed.sort(), added: added.sort(), removed: removed.sort() };
}

// Stable ordering is what keeps zones.json diff-readable at ~700 entries: every
// write goes through here, so a one-line assignment shows up as a one-line diff.
export function normalizeZones(data) {
  return {
    zones: [...(data.zones ?? [])].sort((a, b) => a.id.localeCompare(b.id)),
    articles: Object.fromEntries(
      Object.entries(data.articles ?? {}).sort(([a], [b]) => a.localeCompare(b)),
    ),
  };
}

export function stateOrphans(state, zonesData) {
  return Object.keys(state ?? {}).filter(id => !zonesData.zones.has(id)).sort();
}
