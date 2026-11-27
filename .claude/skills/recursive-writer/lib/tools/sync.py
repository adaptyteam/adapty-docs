"""Sync: log the writer's hand edits since the skill's last apply, unit by unit.

  python3 sync.py <file>...

Every apply (apply_pairs.py, with or without --approved) saves each changed file's text as its
snapshot, <session folder>/applied/<repo-relative path>, and records the path, hash, and time in
applied/index.json. For each file with a snapshot, sync compares the live file with it, unit by unit
(units.py: a heading, a block between blank lines, a list item, or a table row; never the frontmatter
or code). It appends one entry per changed unit to <session folder>/hand-edits.md: the date, the file,
the unit's heading path and line, the skill's version (snapshot), the writer's version (live), and
the sentences removed and added. It updates the done marks the edits fall in (ledger.py), then moves
the snapshot to the live text, so the same edit is never logged twice. It prints "Hand edits since
the last apply: N units in <file>", or nothing when there are none.

load.sh --text runs it on its file first. apply_pairs.py runs it on each file it is about to write,
so a hand edit made after the last sync is logged before the new snapshot replaces the old one. The
edit hooks do the same for the agent's Edit, Write, and MultiEdit calls on a docs article:
hooks/pre-edit-sync.py syncs the file before the edit, and hooks/post-edit-snapshot.py saves its
snapshot after it (source "edit"). read_log() parses hand-edits.md back into entries (ledger.py uses
it to find a unit the writer changed before its done mark).
"""
import datetime, json, os, re, sys
from dataclasses import dataclass

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import paths, units  # noqa: E402

HEADER = ("# Hand edits\n\n"
          "The writer's edits since the skill's last apply, one entry per unit, logged by sync.py (it runs\n"
          "through `load.sh --text`). The writer's version is approved and the skill's version is rejected\n"
          "(lib/checks/11-approved.md). A fact under \"Removed\" counts as rejected: never re-raise it.\n")


def folder(cwd=None):
    """The session folder (paths.sessions_dir()), or None."""
    return paths.sessions_dir(cwd)


def store(d):
    return os.path.join(d, "applied")


def read(path):
    with open(path, encoding="utf-8") as fh:
        return fh.read()


def write(path, text):
    """Write text to path through a temp file, creating the folders."""
    os.makedirs(os.path.dirname(path), exist_ok=True)
    tmp = path + ".tmp"
    with open(tmp, "w", encoding="utf-8") as fh:
        fh.write(text)
    os.replace(tmp, path)


def rel_path(file):
    """(repo root or None, the file's path relative to it). Outside a git repo, the absolute path
    without its leading slash stands in."""
    a = os.path.realpath(file)
    root = paths.repo_root(os.path.dirname(a))
    if root:
        root = os.path.realpath(root)
        if a.startswith(root + os.sep):
            return root, os.path.relpath(a, root)
    return None, a.lstrip(os.sep)


def read_index(d):
    try:
        with open(os.path.join(store(d), "index.json"), encoding="utf-8") as fh:
            return json.load(fh)
    except (OSError, ValueError):
        return {}


def save_snapshot(file, text=None, d=None, source="apply", where=None):
    """Save `text` (default: the file as it is now) as the file's snapshot, and record its path,
    hash, and time in applied/index.json. Returns the snapshot path, or None without a session folder."""
    d = d or folder()
    if not d:
        return None
    root, rel = where or rel_path(file)
    if rel == "index.json":  # would overwrite the index itself
        return None
    if text is None:
        text = read(file)
    snap = os.path.join(store(d), rel)
    write(snap, text)
    index = read_index(d)
    index[rel] = {"file": os.path.realpath(file), "repo": root, "sha256": units.digest(text),
                  "time": datetime.datetime.now().isoformat(timespec="seconds"), "source": source}
    write(os.path.join(store(d), "index.json"), json.dumps(index, indent=1, sort_keys=True) + "\n")
    return snap


def summary(n, rel):
    return f"Hand edits since the last apply: {n} unit{'' if n == 1 else 's'} in {rel}" if n else None


def log(d, rel, entries, day):
    p = os.path.join(d, "hand-edits.md")
    fresh = not os.path.exists(p) or os.path.getsize(p) == 0
    os.makedirs(d, exist_ok=True)
    with open(p, "a", encoding="utf-8") as fh:
        if fresh:
            fh.write(HEADER)
        for e in entries:
            fh.write("\n" + units.render(e, rel, day, "Writer's version"))


LOG_HEAD = re.compile(r"^## (?P<day>\d{4}-\d{2}-\d{2}) · (?P<file>.+?):(?P<line>\d+) · (?P<where>.*) · "
                      r"(?P<head>changed|added|removed \(line \d+ of the skill's version\)"
                      r"|moved from line \d+ \(.*\))\s*$")
LOG_FENCE = re.compile(r"^(`{3,})text\s*$")


@dataclass
class Logged:
    """One hand-edits.md entry. line: the writer's version's line at sync time (for a removed unit,
    the skill's version's line)."""
    day: str
    file: str
    line: int
    where: str
    kind: str                 # changed, added, removed, or moved
    skill: str = None         # the skill's version (the snapshot's unit), None for an added unit
    writer: str = None        # the writer's version, None for a removed unit


def read_log(d, rel=None):
    """The entries of <d>/hand-edits.md, oldest first; only `rel`'s when given."""
    try:
        lines = read(os.path.join(d, "hand-edits.md")).split("\n")
    except OSError:
        return []
    out, cur, i = [], None, 0
    while i < len(lines):
        line = lines[i]
        m = LOG_HEAD.match(line)
        if m:
            cur = Logged(m.group("day"), m.group("file"), int(m.group("line")), m.group("where"),
                         m.group("head").split()[0])
            out.append(cur)
        elif cur and line in ("Skill's version:", "Writer's version:"):
            j = i + 1
            while j < len(lines) and not lines[j].strip():
                j += 1
            f = LOG_FENCE.match(lines[j]) if j < len(lines) else None
            if f:
                body, j = [], j + 1
                while j < len(lines) and lines[j] != f.group(1):
                    body.append(lines[j])
                    j += 1
                if line.startswith("Skill"):
                    cur.skill = "\n".join(body)
                else:
                    cur.writer = "\n".join(body)
                i = j
        elif cur and line.startswith("Writer's version: the same text"):
            cur.writer = cur.skill
        i += 1
    return [e for e in out if rel is None or e.file == rel]


def sync_file(file, d=None, day=None):
    """Log the hand edits to `file` since its snapshot and move the snapshot to the live text.
    Returns (the number of units logged, the summary line or None). No snapshot: (0, None)."""
    d = d or folder()
    if not d or not os.path.isfile(file):
        return 0, None
    where = rel_path(file)
    snap = os.path.join(store(d), where[1])
    if not os.path.isfile(snap):
        return 0, None
    old, new = read(snap), read(file)
    if old == new:
        return 0, None
    day = day or datetime.date.today().isoformat()
    entries = units.diff(old, new)
    if entries:
        log(d, where[1], entries, day)
        import ledger  # here, not at the top: ledger.py imports this module
        ledger.follow(d, where[1], old, new, entries, day)
    save_snapshot(file, new, d, source="sync", where=where)
    return len(entries), summary(len(entries), where[1])


if __name__ == "__main__":
    files = sys.argv[1:]
    if not files or any(f.startswith("-") for f in files):
        sys.exit("usage: sync.py <file>...")
    d = folder()
    if not d:
        sys.exit("sync.py: no session folder (run it from the docs repo, or set RR_SESSIONS_DIR)")
    missing = 0
    for f in files:
        if not os.path.isfile(f):
            print(f"sync.py: no such file: {f}", file=sys.stderr)
            missing += 1
            continue
        line = sync_file(f, d)[1]
        if line:
            print(line)
    sys.exit(1 if missing else 0)
