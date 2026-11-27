"""The load gate: no wording change reaches a docs file unless load.sh --text ran on it recently.

load.sh --text <file> stamps the file in the session folder (loads.json). apply_pairs.py --stat and
--approved refuse files without a fresh stamp, and the PreToolUse hook (lib/tools/hooks/require-load.py)
blocks Edit and Write on docs MDX without one. Run: python3 tests/test_gate.py
"""
import json, os, subprocess, sys, tempfile, time

D = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
LOAD = os.path.join(D, "lib", "load.sh")
APPLY = os.path.join(D, "lib", "tools", "apply_pairs.py")
HOOK = os.path.join(D, "lib", "tools", "hooks", "require-load.py")

fails = 0


def case(name, ok, out=""):
    global fails
    if ok:
        print(f"ok   {name}")
    else:
        fails += 1
        print(f"FAIL {name}\n{out[:600]}")


def run(cmd, env, stdin=None):
    r = subprocess.run(cmd, input=stdin, capture_output=True, text=True, env=env)
    return r.returncode, r.stdout + r.stderr


sessions = tempfile.mkdtemp()
sid = "test-gate-session"
env = dict(os.environ, CLAUDE_CODE_SESSION_ID=sid, RR_SESSIONS_DIR=sessions)  # stamps and snapshots stay in tmp
stamps = os.path.join(sessions, sid, "loads.json")

docs = tempfile.mkdtemp()
art = os.path.join(docs, "src", "content", "docs", "a.mdx")
os.makedirs(os.path.dirname(art))
open(art, "w").write("Line one.\nLine two.\n")
pairs = os.path.join(docs, "pairs.json")
json.dump([{"file": art, "old": "Line one.", "new": "Line 1."}], open(pairs, "w"))

# 1. Without a load, the proposal table and the approved apply refuse.
code, out = run([sys.executable, APPLY, pairs, "--stat"], env)
case("apply_pairs --stat refuses an unloaded file", code != 0 and "load.sh --text" in out, out)
code, out = run([sys.executable, APPLY, pairs, "--approved"], env)
case("apply_pairs --approved refuses an unloaded file", code != 0 and open(art).read().startswith("Line one."), out)

# 2. The hook blocks a direct edit of an unloaded docs file.
event = {"session_id": sid, "tool_name": "Edit", "tool_input": {"file_path": art}}
code, out = run([sys.executable, HOOK], env, json.dumps(event))
case("hook blocks Edit on an unloaded docs file", code == 2 and "load.sh --text" in out, out)

# 3. A file outside the docs content is never gated.
other = os.path.join(docs, "notes.md")
open(other, "w").write("x")
event_other = {"session_id": sid, "tool_name": "Edit", "tool_input": {"file_path": other}}
code, out = run([sys.executable, HOOK], env, json.dumps(event_other))
case("hook ignores files outside src/content/docs", code == 0, out)

# 4. load.sh --text stamps the file; then everything passes.
code, out = run(["bash", LOAD, "--text", f"{art}:1-2", "--change"], env)
case("load.sh --text writes a stamp", code == 0 and os.path.exists(stamps) and os.path.realpath(art) in json.load(open(stamps)), out)
code, out = run([sys.executable, APPLY, pairs, "--stat"], env)
case("apply_pairs --stat passes after a load", code == 0 and "| File |" in out, out)
code, out = run([sys.executable, HOOK], env, json.dumps(event))
case("hook allows Edit after a load", code == 0, out)

# 5. A stale stamp (older than the window) counts as no load.
data = json.load(open(stamps))
data[os.path.realpath(art)] = time.time() - 3 * 3600
json.dump(data, open(stamps, "w"))
code, out = run([sys.executable, APPLY, pairs, "--stat"], env)
case("a stamp older than the window refuses", code != 0, out)

# 6. A new file: Write is allowed after a chat-text load (load.sh --text -) in this session.
new = os.path.join(docs, "src", "content", "docs", "new.mdx")
event_new = {"session_id": sid, "tool_name": "Write", "tool_input": {"file_path": new}}
code, out = run([sys.executable, HOOK], env, json.dumps(event_new))
case("hook blocks Write of a new docs file before any load", code == 2, out)
code, out = run(["bash", LOAD, "--text", "-"], env, "A new sentence.")
code, out = run([sys.executable, HOOK], env, json.dumps(event_new))
case("hook allows Write of a new file after load.sh --text -", code == 0, out)

# 7. Without a session id, nothing is gated (rounds in other tools, CI).
env_none = {k: v for k, v in env.items() if k != "CLAUDE_CODE_SESSION_ID"}
fresh = os.path.join(docs, "src", "content", "docs", "b.mdx")
open(fresh, "w").write("B.\n")
pairs_b = os.path.join(docs, "pairs-b.json")
json.dump([{"file": fresh, "old": "B.", "new": "Bee."}], open(pairs_b, "w"))
code, out = run([sys.executable, APPLY, pairs_b, "--stat"], env_none)
case("no session id: no gate", code == 0, out)

print(f"\n{'all passed' if not fails else f'{fails} failed'}")
sys.exit(1 if fails else 0)
