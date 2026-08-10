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
      if (s.path && !existsOnDisk(s.path)) errors.push({ kind: 'missing-path', id: s.id, path: s.path });
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
