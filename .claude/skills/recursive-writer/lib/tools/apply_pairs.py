"""Apply a review round's old/new pairs verbatim, or report what they would change.

Usage: python3 apply_pairs.py pairs.json [--dry-run] [--stat [--lint]] [--approved]   (flags in any position)
pairs.json: [{"file": "/abs/path.mdx", "old": "exact text", "new": "replacement"}, ...]
Each "old" must occur exactly once in its file; otherwise nothing is written.
--stat writes nothing and prints the change table: one row per file, the git diff line counts the
pairs would produce, most changed first. Links are relative to the current directory (the VS Code
workspace root); a docs article shows its slug (its URL path without /docs/), any other file its name. --lint also runs
tools/lint-text.sh on the new text of every pair (run from the docs repo root).
--approved: the user approved these pairs. Its only effect is the load gate below; it writes no
ledger entry. Rounds apply their own pairs without it.
Every apply that writes, with or without --approved, saves each changed file's new text as its
snapshot in the session folder (tools/sync.py: applied/<repo-relative path>, recorded in
applied/index.json). Before it replaces a snapshot, it syncs that file, so a hand edit made since the
last sync is logged first.
The load gate: with a session id, --stat and --approved refuse a docs file that load.sh --text hasn't
stamped in the last two hours (tools/gate.py).
"""
import json, os, re, subprocess, sys, tempfile

paths = [a for a in sys.argv[1:] if not a.startswith("--")]
if len(paths) != 1:
    sys.exit("usage: apply_pairs.py pairs.json [--dry-run] [--stat [--lint]] (flags in any position)")
pairs = json.load(open(paths[0]))
stat = "--stat" in sys.argv
sid = os.environ.get("CLAUDE_CODE_SESSION_ID")
if sid and (stat or "--approved" in sys.argv):  # the load gate: proposals and approved applies only
    sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
    import gate
    stale = sorted({p["file"] for p in pairs if gate.is_docs(p["file"]) and not gate.fresh(sid, p["file"])})
    if stale:
        print("NOT CHECKED: " + gate.MESSAGE + ", ".join(stale))
        sys.exit(2)
dry = "--dry-run" in sys.argv or stat
texts, originals, errors = {}, {}, []
for i, p in enumerate(pairs):
    t = texts.setdefault(p["file"], originals.setdefault(p["file"], open(p["file"]).read()))
    n = t.count(p["old"])
    if n != 1:
        errors.append(f"pair {i}: 'old' occurs {n} times in {p['file']}")
        continue
    texts[p["file"]] = t.replace(p["old"], p["new"], 1)
if errors:
    print("NOT APPLIED:\n" + "\n".join(errors)); sys.exit(1)


def label(f):
    m = re.search(r"/src/content/docs/(?:.*/)?([^/]+)\.mdx?$", f)
    if not m:
        return os.path.basename(f)
    slug = re.search(r"^customSlug:\s*[\"']?([^\"'\n]+)", originals[f], re.M)
    return slug.group(1).strip("/") if slug else m.group(1)


def link(f):
    rel = os.path.relpath(f)
    return (f if rel.startswith("..") else rel).replace(" ", "%20")


if stat:
    rows = []
    with tempfile.TemporaryDirectory() as tmp:
        for f, t in texts.items():
            new = os.path.join(tmp, os.path.basename(f))
            open(new, "w").write(t)
            out = subprocess.run(["git", "diff", "--no-index", "--numstat", f, new],
                                 capture_output=True, text=True).stdout.split()
            add, rem = (int(out[0]), int(out[1])) if out else (0, 0)
            rows.append((add + rem, add, rem, f))
    rows.sort(key=lambda r: (-r[0], label(r[3])))
    print("| File | Change |\n|---|---|")
    for _, add, rem, f in rows:
        print(f"| [{label(f)}]({link(f)}) | +{add} -{rem} |")
    if "--lint" in sys.argv:
        lint = os.path.join(os.path.dirname(os.path.abspath(__file__)), "lint-text.sh")
        r = subprocess.run(["bash", lint, "-"], input="\n\n".join(p["new"] for p in pairs),
                           capture_output=True, text=True)
        print("\nLint:\n" + (r.stdout + r.stderr).strip("\n"))
        sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
        import growth
        grown = growth.flags(pairs, label)
        if grown:
            print("\nGrowth:\n" + "\n".join(grown))
        import knockon
        side = knockon.flags(pairs, texts, os.getcwd(), label)
        if side:
            print("\nSide effects:\n" + "\n".join(side))
    sys.exit(0)

if not dry:
    sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
    import sync
    folder = sync.folder()
    changed = [f for f, t in texts.items() if t != originals[f]]
    for f in changed if folder else []:  # log the hand edits the new snapshot would hide
        line = sync.sync_file(f, folder)[1]
        if line:
            print(line)
    for f, t in texts.items():
        open(f, "w").write(t)
    if not folder:
        print("apply_pairs: no session folder (run it from the docs repo, or set RR_SESSIONS_DIR); "
              "no snapshot saved", file=sys.stderr)
    elif changed:
        for f in changed:
            sync.save_snapshot(f, texts[f], folder)
        print(f"snapshots: {len(changed)} in {sync.store(folder)}")
print(f"{'checked' if dry else 'applied'} {len(pairs)} pairs in {len(texts)} files")
