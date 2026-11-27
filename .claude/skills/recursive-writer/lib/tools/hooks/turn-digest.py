#!/usr/bin/env python3
"""UserPromptSubmit hook for the docs repos: a one-screen reminder on every turn.

Prints the always-on checks' **Requires:** lines (read from the check files, so it never drifts
from them) and the newest entries of this session's strike list, as additionalContext. Paths come from
paths.py: the library for the checks, and paths.sessions_dir() for the strike list, as in load.py.
"""
import json, os, re, sys

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
import paths  # noqa: E402

SKILL = paths.LIB
MAX_STRIKES, MAX_CHARS = 15, 180

try:
    data = json.load(sys.stdin)
except Exception:
    data = {}
prompt = data.get("prompt", "") or ""
# Background-agent reports and task notifications arrive as prompts too; they carry no wording task.
if re.search(r"<task-notification>|\[SYSTEM NOTIFICATION|Subagent hand-back|Another Claude session sent a message", prompt):
    sys.exit(0)

routes = open(paths.ROUTES).read()
m = re.search(r"^Always on: (.*)$", routes, re.M)
ids = re.findall(r"`([^`]+)`", m.group(1)) if m else []

def check_file(cid):
    for d in ("checks", "reference"):
        p = os.path.join(SKILL, d)
        for f in sorted(os.listdir(p)):
            if f == f"{cid}.md" or f.startswith(f"{cid}-"):
                return os.path.join(p, f)
    return None

lines = [f"recursive-writer, always-on checks (full text: bash {paths.tilde(paths.LOAD)} --text <file:lines> --change, before any reply with wording):"]
for cid in ids:
    f = check_file(cid)
    if not f:
        continue
    t = open(f).read()
    r = re.search(r"\*\*Requires:\*\*\s*(.*?)(?=\n\*\*|\n\n|\Z)", t, re.S)
    if r:
        lines.append(f"- {cid}: " + " ".join(r.group(1).split()))

sl = paths.strike_list(data.get("cwd") or None) or ""
if sl and os.path.exists(sl):
    entries = [l.strip() for l in open(sl) if re.match(r"\s*(-|\d+\.)\s", l)]
    if entries:
        lines.append(f"Strike list for this session ({len(entries)} entries, newest {min(len(entries), MAX_STRIKES)}; full list: {sl}):")
        for e in entries[-MAX_STRIKES:]:
            lines.append(e if len(e) <= MAX_CHARS else e[:MAX_CHARS - 1] + "…")

# No sync note here: load.sh --text runs tools/sync.py on its file and prints the hand-edit summary line.

print(json.dumps({"hookSpecificOutput": {"hookEventName": "UserPromptSubmit", "additionalContext": "\n".join(lines)}}))
