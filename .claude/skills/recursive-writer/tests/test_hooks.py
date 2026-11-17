"""The hooks and the paths they share with the tools (lib/tools/paths.py). Run: python3 tests/test_hooks.py

- SessionStart (session-start.sh) puts only the manager's SKILL.md into context.
- UserPromptSubmit (turn-digest.py) prints the always-on checks and the strike list of the session folder.
- paths.sessions_dir(): RR_SESSIONS_DIR, else <repo>/_temp/<ticket ID>/ (RW_TICKET, else the branch's
  key), else <repo>/_temp/edits-<date>/; None outside a repo. load.py and require-load.py agree on it.
- The edit hooks, fed events the way Claude Code sends them: PreToolUse (pre-edit-sync.py) logs the
  writer's hand edits before the agent's edit lands; PostToolUse (post-edit-snapshot.py) saves the
  agent's edit as the snapshot, so the next sync logs nothing.
Every repo here is a temp `git init` with HEAD pointed at a branch name: no commit, no checkout.
"""
import datetime, json, os, subprocess, sys, tempfile

D = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
TOOLS = os.path.join(D, "lib", "tools")
HOOKS = os.path.join(TOOLS, "hooks")
LOAD = os.path.join(D, "lib", "load.sh")
PATHS = os.path.join(TOOLS, "paths.py")

fails = 0


def case(name, ok, out=""):
    global fails
    if ok:
        print(f"ok   {name}")
    else:
        fails += 1
        print(f"FAIL {name}\n{str(out)[:600]}")


def env(**over):
    """os.environ without the session and data variables, plus the overrides (None removes a key)."""
    e = {k: v for k, v in os.environ.items()
         if k not in ("CLAUDE_CODE_SESSION_ID", "RR_SESSIONS_DIR", "RW_TICKET")}
    for k, v in over.items():
        if v is None:
            e.pop(k, None)
        else:
            e[k] = v
    return e


def run(cmd, e, stdin=None, cwd=None):
    r = subprocess.run(cmd, input=stdin, capture_output=True, text=True, env=e, cwd=cwd)
    return r.returncode, r.stdout, r.stderr


def repo(branch):
    d = os.path.realpath(tempfile.mkdtemp())
    subprocess.run(["git", "-C", d, "init", "-q"], check=True)
    subprocess.run(["git", "-C", d, "symbolic-ref", "HEAD", f"refs/heads/{branch}"], check=True)
    return d


# 1. SessionStart: the manager only.
code, out, err = run(["bash", os.path.join(HOOKS, "session-start.sh")], env(RR_SESSIONS_DIR=tempfile.mkdtemp()))
ctx = json.loads(out)["hookSpecificOutput"]["additionalContext"] if code == 0 and out else ""
case("session-start puts the manager into context", "# recursive-writer" in ctx and "## Modes" in ctx, out + err)
case("session-start leaves out the loop and the checks", "## Loop" not in ctx and "===== checks/" not in ctx, ctx[:300])

# 2. UserPromptSubmit: always-on Requires lines and the strike list of RR_SESSIONS_DIR (no hardcoded path).
sessions = tempfile.mkdtemp()
open(os.path.join(sessions, "strike-list.md"), "w").write("# Strike list\n- No X as Y\n")
event = json.dumps({"session_id": "test-hooks", "prompt": "fix line 3", "cwd": sessions})
code, out, err = run([sys.executable, os.path.join(HOOKS, "turn-digest.py")], env(RR_SESSIONS_DIR=sessions), event)
ctx = json.loads(out)["hookSpecificOutput"]["additionalContext"] if code == 0 and out else ""
case("turn-digest prints the always-on Requires lines", "- 00: " in ctx and "- L2: " in ctx, out + err)
case("turn-digest names the new loader", "recursive-writer/lib/load.sh --text" in ctx, ctx[:300])
case("turn-digest reads the strike list from RR_SESSIONS_DIR", "- No X as Y" in ctx and sessions in ctx, ctx[-400:])
note = json.dumps({"session_id": "test-hooks", "prompt": "<task-notification>done</task-notification>"})
code, out, err = run([sys.executable, os.path.join(HOOKS, "turn-digest.py")], env(RR_SESSIONS_DIR=sessions), note)
case("turn-digest skips task notifications", code == 0 and out == "", out + err)

# 3. sessions_dir() resolution order.
today = datetime.date.today().isoformat()
r1 = repo("ABC-1234-webhook")
code, out, err = run([sys.executable, PATHS, "sessions"], env(), cwd=r1)
case("branch key names the folder", out.strip() == os.path.join(r1, "_temp", "ABC-1234"), out + err)
code, out, err = run([sys.executable, PATHS, "sessions"], env(RW_TICKET="DOC-7"), cwd=r1)
case("RW_TICKET wins over the branch", out.strip() == os.path.join(r1, "_temp", "DOC-7"), out + err)
override = tempfile.mkdtemp()
code, out, err = run([sys.executable, PATHS, "sessions"], env(RR_SESSIONS_DIR=override, RW_TICKET="DOC-7"), cwd=r1)
case("RR_SESSIONS_DIR wins over everything", out.strip() == override, out + err)
r2 = repo("main")
code, out, err = run([sys.executable, PATHS, "sessions"], env(), cwd=r2)
case("no ticket: edits-<date>", out.strip() == os.path.join(r2, "_temp", f"edits-{today}"), out + err)
outside = os.path.realpath(tempfile.mkdtemp())
code, out, err = run([sys.executable, PATHS, "sessions"], env(), cwd=outside)
case("outside a repo: no session folder", code == 0 and out.strip() == "", out + err)

# 4. load.py stamps <folder>/<session id>/loads.json; the edit hook finds it through the same function.
art = os.path.join(r1, "src", "content", "docs", "a.mdx")
os.makedirs(os.path.dirname(art))
open(art, "w").write("Line one.\n")
e = env(CLAUDE_CODE_SESSION_ID="test-hooks-sid")
edit = json.dumps({"session_id": "test-hooks-sid", "tool_name": "Edit", "tool_input": {"file_path": art}, "cwd": r1})
code, out, err = run([sys.executable, os.path.join(HOOKS, "require-load.py")], e, edit, cwd=outside)
case("require-load blocks before a load", code == 2 and "load.sh --text" in err, out + err)
code, out, err = run(["bash", LOAD, "--text", f"{art}:1-1", "--change"], e, cwd=r1)
stamps = os.path.join(r1, "_temp", "ABC-1234", "test-hooks-sid", "loads.json")
case("load.sh stamps the ticket folder, keyed by session id",
     code == 0 and os.path.exists(stamps) and art in json.load(open(stamps)), out[-300:] + err)
code, out, err = run([sys.executable, os.path.join(HOOKS, "require-load.py")], e, edit, cwd=outside)
case("require-load reads the same folder (the event's cwd)", code == 0, out + err)
code, out, err = run(["bash", LOAD, "--text", "-", "--strike", "No A as B"], e, "Users see the dash.", cwd=r1)
case("--strike writes the ticket folder's strike list",
     "- No A as B" in open(os.path.join(r1, "_temp", "ABC-1234", "strike-list.md")).read(), out[-300:] + err)

# 5. The edit hooks, fed events as Claude Code sends them (stdin JSON).
PRE, POST = os.path.join(HOOKS, "pre-edit-sync.py"), os.path.join(HOOKS, "post-edit-snapshot.py")
SYNC = os.path.join(TOOLS, "sync.py")
r3 = repo("main")
rel = "src/content/docs/guides/hooks.mdx"
doc = os.path.join(r3, rel)
sess = tempfile.mkdtemp()
e3 = env(RR_SESSIONS_DIR=sess)
snap = os.path.join(sess, "applied", rel)
edits_log = os.path.join(sess, "hand-edits.md")
FIRST = "## Setup\n\nOpen the **Settings** page. Then click **Save**.\n\nThe list updates.\n"


def event(name, tool, tool_input, tool_response=None, cwd=r3):
    ev = {"session_id": "test-hooks-sid", "transcript_path": os.path.join(sess, "transcript.jsonl"), "cwd": cwd,
          "permission_mode": "default", "hook_event_name": name, "tool_name": tool, "tool_input": tool_input,
          "tool_use_id": "toolu_test"}
    if tool_response is not None:
        ev["tool_response"] = tool_response
    return json.dumps(ev)


def hook(script, ev, e=None):
    return run([sys.executable, script], e or e3, ev, cwd=outside)


def text(p):
    return open(p).read() if os.path.exists(p) else None


def source(p_rel):
    p = os.path.join(sess, "applied", "index.json")
    return json.load(open(p)).get(p_rel, {}).get("source") if os.path.exists(p) else None


# The first draft: a Write of a new article. Nothing to sync before it; the snapshot after it.
w = {"file_path": doc, "content": FIRST}
code, out, err = hook(PRE, event("PreToolUse", "Write", w))
case("pre-edit hook: nothing to sync for a new article", code == 0 and out == "" and not os.path.exists(snap), out + err)
os.makedirs(os.path.dirname(doc))
open(doc, "w").write(FIRST)  # the Write lands
code, out, err = hook(POST, event("PostToolUse", "Write", w, {"type": "create", "filePath": doc, "content": FIRST,
                                                             "structuredPatch": [], "originalFile": None}))
case("post-edit hook snapshots a new article from Write", code == 0 and out == "" and text(snap) == FIRST
     and source(rel) == "edit", out + err)

# The writer edits by hand, then the agent's Edit: the pre-edit hook logs the hand edit first.
hand = FIRST.replace("Then click **Save**.", "Click **Save**.")
open(doc, "w").write(hand)
ed = {"file_path": doc, "old_string": "The list updates.", "new_string": "The list shows the new entry.",
      "replace_all": False}
code, out, err = hook(PRE, event("PreToolUse", "Edit", ed))
ctx = json.loads(out).get("hookSpecificOutput", {}) if code == 0 and out else {}
case("pre-edit hook logs a hand edit before the agent's edit",
     ctx.get("hookEventName") == "PreToolUse"
     and ctx.get("additionalContext") == f"Hand edits since the last apply: 1 unit in {rel}"
     and "permissionDecision" not in ctx
     and "Writer's version:\n\n```text\nOpen the **Settings** page. Click **Save**.\n```" in (text(edits_log) or "")
     and text(snap) == hand, out + err)

# The Edit lands: the post-edit hook snapshots it, so the next sync logs nothing.
agent = hand.replace("The list updates.", "The list shows the new entry.")
open(doc, "w").write(agent)
code, out, err = hook(POST, event("PostToolUse", "Edit", ed, {
    "filePath": doc, "oldString": ed["old_string"], "newString": ed["new_string"], "originalFile": hand,
    "structuredPatch": [], "userModified": False, "replaceAll": False}))
logged = text(edits_log)
c2, o2, e2 = run([sys.executable, SYNC, doc], e3, cwd=r3)
case("post-edit hook snapshots the agent's edit, so the next sync logs nothing",
     code == 0 and out == "" and text(snap) == agent and c2 == 0 and o2 == "" and text(edits_log) == logged,
     out + err + o2 + e2)
code, out, err = hook(PRE, event("PreToolUse", "Edit", ed))
case("pre-edit hook prints nothing without hand edits", code == 0 and out == "", out + err)

# The writer changes the proposal in the permission dialog: the snapshot is the agent's proposal,
# and the next sync logs the writer's change.
ed2 = {"file_path": doc, "old_string": "Open the **Settings** page.", "new_string": "Open **Settings**.",
       "replace_all": False}
landed = agent.replace("Open the **Settings** page.", "Go to **Settings**.")
open(doc, "w").write(landed)
code, out, err = hook(POST, event("PostToolUse", "Edit", ed2, {
    "filePath": doc, "oldString": ed2["old_string"], "newString": "Go to **Settings**.", "originalFile": agent,
    "structuredPatch": [], "userModified": True, "replaceAll": False}))
c2, o2, e2 = run([sys.executable, SYNC, doc], e3, cwd=r3)
lg = text(edits_log) or ""
case("a proposal the writer changed in the dialog: the agent's version is the snapshot, the writer's is logged",
     code == 0 and o2.strip() == f"Hand edits since the last apply: 1 unit in {rel}"
     and "Skill's version:\n\n```text\nOpen **Settings**. Click **Save**.\n```" in lg
     and "Writer's version:\n\n```text\nGo to **Settings**. Click **Save**.\n```" in lg, out + err + o2 + e2)

# A staged edit (held for review, the file unchanged) saves no snapshot.
kept = text(snap)
open(doc, "w").write(landed.replace("Go to", "Open"))  # a hand edit the next sync must still see
code, out, err = hook(POST, event("PostToolUse", "Edit", ed2, {"filePath": doc, "staged": True}))
case("a staged edit saves no snapshot", code == 0 and out == "" and text(snap) == kept, out + err)

# Outside the docs, and a broken event: no output, no snapshot, exit 0.
note = os.path.join(r3, "notes.md")
open(note, "w").write("x\n")
ne = {"file_path": note, "old_string": "x", "new_string": "y"}
res = [hook(PRE, event("PreToolUse", "Edit", ne)), hook(POST, event("PostToolUse", "Edit", ne, {"filePath": note})),
       hook(PRE, "not json"), hook(POST, "not json")]
case("edit hooks skip files outside src/content/docs and bad input, and always exit 0",
     all(c == 0 and o == "" for c, o, _ in res) and not os.path.exists(os.path.join(sess, "applied", "notes.md")),
     res)

# Without RR_SESSIONS_DIR, the session folder comes from the event's cwd, as in require-load.py.
code, out, err = hook(POST, event("PostToolUse", "Edit", ed2, {"filePath": doc}), env())
case("edit hooks find the session folder from the event's cwd",
     code == 0 and text(os.path.join(r3, "_temp", f"edits-{today}", "applied", rel)) == text(doc), out + err)

print(f"\n{'all passed' if not fails else f'{fails} failed'}")
sys.exit(1 if fails else 0)
