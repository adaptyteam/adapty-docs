"""The loader behind load.sh. Two tiers: the manager's SKILL.md once per session; the checks before every reply.

  load.sh --session                    the manager's SKILL.md: once per session, after each compaction, after a skill change
  load.sh --loop                       lib/loop.md, the review loop (rw-edit, rw-draft, and the round briefs load it)
  load.sh --text <file[:a-b]|-> [--change] [--opener] [--draft] [--strike "<pattern>"] [--strike-list <path>]
                                       live lines (for a file slice), what fired, the always-on and routed
                                       checks, and the strike list; add --session or --loop to print that file first.
                                       For a file, sync.py runs first: its summary line ("Hand edits since the
                                       last apply: ...") tops the output when there are hand edits
  load.sh <ids>                        lib/loop.md, routes.md, the always-on checks, and the named ones
  load.sh all                          lib/loop.md, routes.md, and every check and reference file (round 1)

The strike list defaults to strike-list.md in the session folder (paths.sessions_dir(): the docs
repo's _temp/<ticket ID>/, or RR_SESSIONS_DIR), outside /tmp, so a restart doesn't wipe it.
"""
import glob, os, re, sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import paths  # noqa: E402
from route import D, FLAGS, route, summary  # noqa: E402

FILES = sorted(glob.glob(f"{D}/checks/*.md")) + sorted(glob.glob(f"{D}/reference/*.md"))
ROUTING = re.compile(r"^\*\*(Triggers|Flags):\*\* .*\n", re.M)


def show(path):
    base = D if os.path.abspath(path).startswith(D + os.sep) else paths.ROOT  # the manager shows as SKILL.md
    print(f"\n===== {os.path.relpath(path, base)} =====")
    print(ROUTING.sub("", open(path).read()), end="")


def always_on():
    return [f for f in FILES if re.search(r"^\*\*Applies when:\*\* always\.$", open(f).read(), re.M)]


def by_ids(ids):
    out = []
    for i in ids:
        hits = [f for f in FILES if os.path.basename(f).startswith(i)]
        if not hits:
            print(f"\n!!!!! UNKNOWN CHECK ID: {i} (nothing loaded) !!!!!")
        out += hits
    return out


def show_all(paths):
    seen = set()
    for p in paths:
        if p not in seen:
            seen.add(p)
            show(p)


def default_strike_list():
    return paths.strike_list()


def take(args, name):
    """Remove `name value` from args and return value (None if absent)."""
    if name not in args:
        return None
    i = args.index(name)
    if i + 1 >= len(args):
        sys.exit(f"load.sh: {name} needs a value")
    val = args[i + 1]
    del args[i:i + 2]
    return val


args = sys.argv[1:]
session = "--session" in args
loop = "--loop" in args
args = [a for a in args if a not in ("--session", "--loop")]
text_src = take(args, "--text")
strike = take(args, "--strike")
explicit_list = take(args, "--strike-list")
strike_list = explicit_list or default_strike_list()

if text_src is None:
    if (session or loop) and not args:
        if session:
            show(paths.MANAGER)
        if loop:
            show(paths.LOOP)
    elif args == ["all"]:
        show_all([paths.LOOP, paths.ROUTES] + FILES)
    else:
        show_all([paths.LOOP, paths.ROUTES] + always_on() + by_ids(args))
    sys.exit(0)

flags = [a for a in args if a in FLAGS]
bad = [a for a in args if a not in FLAGS]
if bad:
    sys.exit(f"load.sh: unknown argument {' '.join(bad)}; flags: {' '.join(sorted(FLAGS))}")

if text_src == "-":
    text = sys.stdin.read()
else:
    m = re.match(r"^(.*):(\d+)-(\d+)$", text_src)
    path, a, b = (m.group(1), int(m.group(2)), int(m.group(3))) if m else (text_src, None, None)
    try:  # the writer's hand edits since the last apply, logged before anything else prints
        import sync
        note = sync.sync_file(path)[1]
    except Exception as e:  # sync never blocks a load
        note = None
        print(f"load.sh: sync failed on {path}: {e}", file=sys.stderr)
    if note:
        print(note)
    lines = open(path).read().split("\n")
    if a:
        lines = lines[a - 1:b]
        print(f"Live: {path}:{a}-{b}")
        for n, line in enumerate(lines, a):
            print(f"{n:>5}  {line}")
    text = "\n".join(lines)

if os.environ.get("CLAUDE_CODE_SESSION_ID"):  # the stamp apply_pairs.py and the edit hook ask for
    import gate
    if not gate.record(os.environ["CLAUDE_CODE_SESSION_ID"], gate.CHAT if text_src == "-" else path):
        print("load.sh: no session folder (run it from the docs repo, or set RR_SESSIONS_DIR); nothing stamped",
              file=sys.stderr)

if session:
    show(paths.MANAGER)
if loop:
    show(paths.LOOP)
routed = route(text, flags)
print("\n" + summary(routed))
show_all(always_on() + [p for s, _ in routed for p in FILES if os.path.basename(p)[:-3] == s])

if strike:
    if not strike_list:
        sys.exit("load.sh: no session folder found; pass --strike-list <path>")
    try:
        if not explicit_list:  # only the default session folder is created on demand
            os.makedirs(os.path.dirname(strike_list), exist_ok=True)
        with open(strike_list, "a") as fh:
            fh.write(f"- {strike}\n")
    except OSError as e:
        sys.exit(f"load.sh: can't add to the strike list: {e}")
if strike_list and os.path.exists(strike_list):
    print(f"\n===== strike list ({strike_list}) =====")
    print(open(strike_list).read(), end="")
else:
    print("\n===== strike list: none yet =====")
