export const SOURCE_KINDS = new Set(['local-clone', 'in-repo-spec', 'remote']);
const FIELDS = new Set(['path', 'remote', 'default_ref', 'ref_pattern', 'kind']);

// One H2 per source: `## <id> — <title>`. Typed `key: value` lines directly
// under it are parsed; everything else in the section is free prose.
export function parseSources(md) {
  const sources = [];
  const blocks = md.split(/^##\s+/m).slice(1);
  for (const block of blocks) {
    const [heading, ...lines] = block.split('\n');
    const [id, ...titleParts] = heading.split('—');
    const source = { id: id.trim(), title: titleParts.join('—').trim(), notes: '' };
    const notes = [];
    for (const line of lines) {
      const m = line.match(/^([a-z_]+):\s*(.+?)\s*$/);
      if (m && FIELDS.has(m[1])) {
        source[m[1]] = m[1] === 'ref_pattern' ? m[2].split(',').map(s => s.trim()).filter(Boolean) : m[2];
      } else {
        notes.push(line);
      }
    }
    source.notes = notes.join('\n').trim();
    sources.push(source);
  }
  return sources;
}

// Per-machine clone locations. `sources.md` is shared and records one person's
// layout (`~/Documents/...`); a writer whose clones live elsewhere lists them in
// `sources.local.md` (gitignored) — same `## <id>` + `path:` format, and only
// `path:` is honoured. The override lands in `localPath`, never `path`: `path`
// stays canonical so `sourceAliases` (and therefore which sources a brief is
// seen to cite) reads the same on every machine. Returns the ids the local file
// names that the registry doesn't, so the caller can warn — a typo there would
// otherwise silently leave the canonical path in force, which is the exact
// failure the file exists to prevent.
export function applyLocalPaths(sources, localMd) {
  const byId = new Map(sources.map(s => [s.id, s]));
  const unknown = [];
  for (const local of parseSources(localMd)) {
    const target = byId.get(local.id);
    if (!target) { unknown.push(local.id); continue; }
    if (local.path) target.localPath = local.path;
  }
  return unknown;
}

// Where the clone actually is on this machine.
export function clonePath(source) {
  return source.localPath ?? source.path;
}

// `existsOnDisk` is injected so validation stays pure and testable; the caller
// supplies real filesystem access.
export function sourceErrors(sources, { referencedIds, existsOnDisk }) {
  const errors = [];
  const seen = new Set();
  for (const s of sources) {
    // Check kind validity before the duplicate short-circuit: a duplicate entry
    // with a bad kind should surface both problems, not just the duplicate.
    if (!SOURCE_KINDS.has(s.kind)) errors.push({ kind: 'unknown-kind', id: s.id, value: s.kind });
    if (seen.has(s.id)) { errors.push({ kind: 'duplicate-id', id: s.id }); continue; }
    seen.add(s.id);
    if (s.kind === 'local-clone') {
      if (!s.remote) errors.push({ kind: 'missing-remote', id: s.id });
      const p = clonePath(s);
      if (p && !existsOnDisk(p)) errors.push({ kind: 'missing-path', id: s.id, path: p });
    }
    if (!referencedIds.has(s.id)) errors.push({ kind: 'unreferenced', id: s.id });
  }
  return errors;
}

export function matchesPattern(branch, patterns) {
  return (patterns ?? []).some(p => (p.endsWith('*') ? branch.startsWith(p.slice(0, -1)) : branch === p));
}

export function formatRefsReport(states) {
  const out = [];
  for (const s of states) {
    out.push(`${s.id}  ${s.path ?? s.remote ?? ''}`);
    if (!s.present) {
      out.push(`  NO CLONE → git clone ${s.remote} ${s.path}`);
      out.push('');
      continue;
    }
    if (s.error) {
      // Lag and candidates are both derived from git calls that ran (or
      // depended on) the same inspection that failed — showing them anyway,
      // even labeled, would imply they're trustworthy when they're not. Stop
      // at the error instead of rendering stale or partial numbers.
      out.push(`  git inspection failed: ${s.error}`);
      out.push('');
      continue;
    }
    // `behind` can be 0 (verified current) or undefined (the git layer couldn't
    // determine lag — no network, an ambiguous merge-base, a failed fetch).
    // Those are different facts and must render differently: showing "unknown"
    // as "up to date" would send an agent to read a possibly-stale branch.
    let lag;
    if (s.behind === undefined) lag = ' (lag unknown)';
    else if (s.behind === 0) lag = ' (up to date)';
    else lag = ` (behind origin by ${s.behind} commit(s))`;
    out.push(`  local:      ${s.localBranch}${lag}`);
    if (s.candidates?.length) {
      out.push('  branches matching ref_pattern, newest first:');
      // Align short refs in a column at 34 chars, but never let the gap before
      // `age` drop below 2 spaces — real branch names (e.g.
      // "feature/adp-6745-manage-adapty-with-coding-agents") can exceed the
      // column width, and a single space there reads as one run-on word.
      for (const c of s.candidates) {
        const gap = ' '.repeat(Math.max(2, 34 - c.ref.length));
        out.push(`    ${c.ref}${gap}${c.age}`);
      }
    } else {
      out.push('  no branches match ref_pattern');
    }
    out.push('');
  }
  return out.join('\n');
}

// A brief names a repo or a spec file, not a registry id — it says
// `noty-wave-backend` because that is the directory a reader would cd into, and
// `adapty-api.yaml` because that is the file they would open. The registry calls
// those `mail-backend` and `server-side-api-spec`. Scanning for ids alone found
// zero sources in 14 of 34 briefs that plainly depend on several, so the
// tooling learns the synonyms instead of asking writers to memorise ids.
//
// The alias is the path's last segment: a clone's directory name, or a spec's
// filename. Deliberately not the remote URL — nobody writes that in prose.
export function sourceAliases(source) {
  const aliases = [source.id];
  const tail = source.path?.split('/').filter(Boolean).pop();
  if (tail && tail !== source.id) aliases.push(tail);
  return aliases;
}

// Source ids cited anywhere in `text`, matched by any alias, in backticks or in
// bold — writers use both and one brief bolds every source it names. A bare
// mention still does not count, for the same reason the dangling-id check
// ignores one: unmarked prose is about a topic, not a reference to a repo.
export function citedSources(text, sources) {
  const cited = new Set();
  for (const source of sources) {
    for (const alias of sourceAliases(source)) {
      if (text.includes(`\`${alias}\``) || text.includes(`**${alias}**`)) { cited.add(source.id); break; }
    }
  }
  return [...cited].sort();
}
