"""The load gate's stamps: proof that load.sh --text ran on a file in this session, recently.

load.py records a stamp per file (and "-" for text from the chat). apply_pairs.py (--stat, --approved)
and hooks/require-load.py refuse docs files without a fresh one. No session id, no gate.
The stamps live in <session folder>/<session id>/loads.json; paths.sessions_dir() finds the folder.
"""
import json, os, sys, time

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import paths  # noqa: E402

WINDOW = 2 * 3600  # seconds a load stays fresh
CHAT = "-"


def sessions_dir(cwd=None):
    return paths.sessions_dir(cwd)


def _path(sid, cwd=None):
    d = sessions_dir(cwd)
    return os.path.join(d, sid, "loads.json") if d else None


def _read(sid, cwd=None):
    p = _path(sid, cwd)
    try:
        return json.load(open(p)) if p else {}
    except (OSError, ValueError):
        return {}


def key(path):
    return CHAT if path == CHAT else os.path.realpath(path)


def record(sid, path, cwd=None):
    """Stamp the path for this session. Returns the stamps file, or None without a session folder."""
    p = _path(sid, cwd)
    if not p:
        return None
    data = _read(sid, cwd)
    data[key(path)] = time.time()
    os.makedirs(os.path.dirname(p), exist_ok=True)
    with open(p, "w") as fh:
        json.dump(data, fh, indent=1)
    return p


def fresh(sid, path, window=WINDOW, cwd=None):
    t = _read(sid, cwd).get(key(path))
    return t is not None and time.time() - t <= window


def is_docs(path):
    p = os.path.realpath(path)
    return "/src/content/docs/" in p and p.endswith((".md", ".mdx"))


MESSAGE = ("recursive-writer: run `bash " + paths.tilde(paths.LOAD) + " --text <file>:<start>-<end> --change` "
           "(or `--text -` for new text) and check the wording before you propose or write it "
           "(rw-edit, step 2; rw-draft, \"Writing\"). "
           "Every change to docs wording goes through the loop (lib/loop.md), in every iteration. Not loaded: ")
