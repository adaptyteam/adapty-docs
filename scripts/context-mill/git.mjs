import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { matchesPattern } from './sources.mjs';

const run = promisify(execFile);

export function expandHome(p) {
  return p.startsWith('~/') ? path.join(os.homedir(), p.slice(2)) : p;
}

export function existsOnDisk(p) {
  return fs.existsSync(expandHome(p));
}

// Read-only by construction: fetch, rev-parse, rev-list, for-each-ref. Never
// checkout, switch, pull, stash, or merge — the user's working tree in an SDK
// repo is never touched by the mill.
async function git(repo, args) {
  const { stdout } = await run('git', ['-C', expandHome(repo), ...args], { maxBuffer: 32 * 1024 * 1024 });
  return stdout.trim();
}

// Each git call below gets its own try/catch instead of sharing one, on
// purpose: fetch, rev-parse, rev-list, and for-each-ref answer independent
// questions, and repos in this org don't share a branch-naming convention —
// a `default_ref` that doesn't exist in a given clone is a realistic
// misconfiguration, not a corrupt repo. Under a single shared `try`, that one
// bad ref threw out of `rev-list` and discarded everything already gathered,
// including the candidate branch list from `for-each-ref` — which is the
// whole point of running this command. Isolating each call means a failure
// degrades only the field it was computing: `behind` stays undefined (and
// `formatRefsReport` prints "(lag unknown)"), while `localBranch` and
// `candidates` — gathered by calls that succeeded — still make it into the
// report.
export async function inspectSource(source) {
  const state = { id: source.id, path: source.path, remote: source.remote, present: false };
  if (!source.path || !existsOnDisk(source.path)) return state;
  state.present = true;

  // Tracked only to decide whether the source ends up genuinely
  // uninspectable (see below) — never surfaced just because one call failed.
  let firstError;

  try {
    await git(source.path, ['fetch', '--all', '--prune']);
  } catch (err) {
    // Offline, no permissions, whatever — the local branch and the refs
    // already present are still worth reporting, just possibly stale.
    firstError ??= err;
  }

  try {
    state.localBranch = await git(source.path, ['rev-parse', '--abbrev-ref', 'HEAD']);
  } catch (err) {
    firstError ??= err;
  }

  try {
    const upstream = source.default_ref ?? 'origin/HEAD';
    const behind = await git(source.path, ['rev-list', '--count', `HEAD..${upstream}`]);
    // Leave `behind` undefined unless git returned a real count. `Number('')` is
    // 0, which formatRefsReport would print as "up to date" — a false all-clear
    // that could send an agent to a stale branch.
    state.behind = /^\d+$/.test(behind) ? Number(behind) : undefined;
  } catch (err) {
    // A `default_ref` naming a branch absent from this clone lands here.
    // `state.behind` simply stays undefined — this must never blank the rest
    // of the report (that was the actual bug this isolation fixes).
    firstError ??= err;
  }

  try {
    const refs = await git(source.path, [
      'for-each-ref', '--sort=-committerdate', '--count=40',
      '--format=%(refname:short)\t%(committerdate:relative)', 'refs/remotes/origin',
    ]);
    state.candidates = refs.split('\n').filter(Boolean)
      .map(line => { const [ref, age] = line.split('\t'); return { ref, age }; })
      .filter(c => matchesPattern(c.ref.replace(/^origin\//, ''), source.ref_pattern));
  } catch (err) {
    firstError ??= err;
  }

  // `state.error` is reserved for a source that came out of all four calls
  // above with nothing usable at all (e.g. `path` exists but isn't actually a
  // git repo) — that is what formatRefsReport's error branch exists to show.
  // A single failed call already degraded gracefully above (its own field
  // just stayed unset) and must not trip this — in particular, a bad
  // `default_ref` that only breaks `rev-list` leaves `localBranch` and
  // `candidates` set, so this condition stays false and `state.error` is
  // never set merely because the lag could not be computed.
  if (
    state.localBranch === undefined &&
    state.behind === undefined &&
    state.candidates === undefined &&
    firstError
  ) {
    state.error = firstError.message.split('\n')[0];
  }

  return state;
}

// Read-only, like everything else here. `--no-merges` keeps merge commits from
// pairing every article in a branch with every other. Doesn't go through the
// `git()` helper above: that helper hardcodes a 32MB maxBuffer and `.trim()`s
// the result, and a full `--name-only` log needs a much bigger buffer and its
// internal newlines intact — so this calls the same underlying `run` directly,
// the way `git()` itself does, rather than opening a second shell-out site.
export async function readDocsLog(repoRoot) {
  const { stdout } = await run('git', [
    '-C', expandHome(repoRoot), 'log', '--format=%h\t%s', '--name-only', '--no-merges', '--', 'src/content/docs',
  ], { maxBuffer: 256 * 1024 * 1024 });
  return stdout;
}
