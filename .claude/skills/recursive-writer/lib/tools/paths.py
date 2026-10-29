"""One place for the suite's paths: the skill folders and the session folder.

Every tool and hook imports this module; `python3 paths.py <name>` prints one path (root, lib, load,
sessions).

- The session folder (sessions_dir): RR_SESSIONS_DIR if set; else <repo root>/_temp/<ticket ID>/,
  where the ticket ID comes from RW_TICKET, or from the current git branch when it holds a
  [A-Z]+-[0-9]+ key (the first match: "ABC-123-webhook" gives "ABC-123"); else
  <repo root>/_temp/edits-<YYYY-MM-DD>/. The repo root is `git rev-parse --show-toplevel` of the
  working directory. Outside a git repo, with no override, there's no session folder (None).
  The load gate's stamps stay keyed by the Claude Code session ID inside it: <folder>/<session id>/loads.json.
- In the session folder: strike-list.md; applied/ (the snapshots, with index.json) and hand-edits.md
  (sync.py); ledger.md and close-out.md (ledger.py).
"""
import datetime, os, re, subprocess, sys

TOOLS = os.path.dirname(os.path.abspath(__file__))
LIB = os.path.dirname(TOOLS)                 # recursive-writer/lib: checks, reference, routes.md, load.sh, loop.md
ROOT = os.path.dirname(LIB)                  # the manager skill folder, recursive-writer/
MANAGER = os.path.join(ROOT, "SKILL.md")
LOOP = os.path.join(LIB, "loop.md")
ROUTES = os.path.join(LIB, "routes.md")
LOAD = os.path.join(LIB, "load.sh")
TICKET = re.compile(r"[A-Z]+-[0-9]+")


def _git(cwd, *args):
    """Stdout of a git command run in cwd (default: the working directory), or None."""
    try:
        r = subprocess.run(["git", "-C", cwd or os.getcwd(), *args], capture_output=True, text=True, timeout=10)
    except (OSError, subprocess.SubprocessError):
        return None
    return r.stdout.strip() if r.returncode == 0 and r.stdout.strip() else None


def repo_root(cwd=None):
    return _git(cwd, "rev-parse", "--show-toplevel")


def ticket(cwd=None):
    """The ticket ID: RW_TICKET, else the first [A-Z]+-[0-9]+ key in the current branch name, else None."""
    if os.environ.get("RW_TICKET"):
        return os.environ["RW_TICKET"]
    m = TICKET.search(_git(cwd, "symbolic-ref", "--short", "-q", "HEAD") or "")  # works before the first commit
    return m.group(0) if m else None


def sessions_dir(cwd=None):
    """The session folder for this working directory, or None outside a git repo without an override."""
    if os.environ.get("RR_SESSIONS_DIR"):
        return os.environ["RR_SESSIONS_DIR"]
    root = repo_root(cwd)
    if not root:
        return None
    t = ticket(cwd)
    return os.path.join(root, "_temp", t or f"edits-{datetime.date.today().isoformat()}")


def strike_list(cwd=None):
    d = sessions_dir(cwd)
    return os.path.join(d, "strike-list.md") if d else None


def tilde(path):
    """The path with the home folder shortened to ~, for messages."""
    home = os.path.expanduser("~")
    return "~" + path[len(home):] if path == home or path.startswith(home + os.sep) else path


if __name__ == "__main__":
    names = {"root": lambda: ROOT, "lib": lambda: LIB, "load": lambda: LOAD, "sessions": sessions_dir}
    if len(sys.argv) != 2 or sys.argv[1] not in names:
        sys.exit("usage: paths.py " + "|".join(names))
    print(names[sys.argv[1]]() or "")
