// Ripple rules from git history: which articles change together, and — the
// interesting part — which of those pairs cross a zone boundary, since that's
// the pairing nobody remembers on their own. Pure: takes commit records, not
// a repository, so it's testable without git (see git.mjs for the reader).

// A commit touching more than this many articles is a sweep — a bulk rename, a
// translation pass, a lint fix. Pairing everything in it with everything else
// would drown the real signal, so it contributes nothing.
const SWEEP_LIMIT = 12;

export function parseLog(text) {
  const commits = [];
  let current = null;
  for (const line of text.split('\n')) {
    // A header line is `%h\t%s` from `git log --format=%h\t%s --name-only`: the
    // only line in the whole log that contains a literal tab (file paths from
    // --name-only never do). Match on that shape rather than constraining the
    // sha to hex/a fixed length — real short shas are hex but vary in length,
    // and matching by "has a tab" is both sufficient and unambiguous.
    const header = line.match(/^(\S+)\t(.*)$/);
    if (header) {
      current = { sha: header[1], subject: header[2], ids: [] };
      commits.push(current);
      continue;
    }
    if (!current || !line.trim()) continue;
    const m = line.match(/^src\/content\/docs\/(?:.*\/)?([^/]+)\.mdx$/);
    if (m) current.ids.push(m[1]);
  }
  return commits;
}

export function coChanges(commits, { zoneOf } = {}) {
  const counts = new Map();
  for (const commit of commits) {
    const ids = [...new Set(commit.ids)].sort();
    if (ids.length < 2 || ids.length > SWEEP_LIMIT) continue;
    for (let i = 0; i < ids.length; i++) {
      for (let j = i + 1; j < ids.length; j++) {
        const key = `${ids[i]} ${ids[j]}`;
        const entry = counts.get(key) ?? { a: ids[i], b: ids[j], commits: 0, subjects: [] };
        entry.commits++;
        entry.subjects.push(commit.subject);
        counts.set(key, entry);
      }
    }
  }
  return [...counts.values()]
    .map(e => ({ ...e, crossZone: zoneOf ? zoneOf.get(e.a) !== zoneOf.get(e.b) : undefined }))
    .sort((x, y) => y.commits - x.commits || x.a.localeCompare(y.a));
}
