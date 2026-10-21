"""Smoke test for load.sh (tiers, fast path) and tools/lint-text.sh. Run: python3 tests/test_load.py"""
import os, subprocess, sys, tempfile

D = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
LOAD = os.path.join(D, "lib", "load.sh")
LINT = os.path.join(D, "lib", "tools", "lint-text.sh")
DOCS = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..", "..", ".."))  # the docs repo root
# No session id (no gate stamps) and a tmp session folder: a run inside a Claude Code session writes nothing real.
ENV = {k: v for k, v in os.environ.items() if k != "CLAUDE_CODE_SESSION_ID"}
ENV.update(RR_SESSIONS_DIR=tempfile.mkdtemp())


def run(cmd, stdin=None, cwd=None):
    r = subprocess.run(cmd, input=stdin, capture_output=True, text=True, cwd=cwd, env=ENV)
    return r.returncode, r.stdout + r.stderr


fails = 0


def case(name, ok, out=""):
    global fails
    if ok:
        print(f"ok   {name}")
    else:
        fails += 1
        print(f"FAIL {name}\n{out[:600]}")


tmp = tempfile.mkdtemp()
strike = os.path.join(tmp, "strike-list.md")
open(strike, "w").write("# Strike list\n")
art = os.path.join(tmp, "a.mdx")
open(art, "w").write("line one\nIf the user closes it, the app opens it.\nline three\n")

code, out = run(["bash", LOAD, "--session"])
case("--session prints SKILL.md only", code == 0 and "===== SKILL.md" in out and "===== checks/" not in out, out)
case("--session prints the manager, not the loop", "# recursive-writer" in out and "===== loop.md" not in out, out)

code, out = run(["bash", LOAD, "--loop"])
case("--loop prints loop.md only", code == 0 and "===== loop.md" in out and "===== SKILL.md" not in out
     and "===== checks/" not in out, out)

code, out = run(["bash", LOAD, "--text", "-", "--strike-list", strike], stdin="Users see the dash.")
case("--text skips SKILL.md and routes.md", code == 0 and "===== SKILL.md" not in out and "===== routes.md" not in out, out)
case("--text prints always-on checks", "===== checks/00-complete.md" in out and "===== checks/L2-paragraph.md" in out, out)
case("--text strips routing lines", "**Triggers:**" not in out and "**Flags:**" not in out, out)
case("--text prints the strike list", "# Strike list" in out, out)

code, out = run(["bash", LOAD, "--text", f"{art}:2-2", "--strike", "No X as Y", "--strike-list", strike])
case("slice prints live lines with numbers", code == 0 and "Live:" in out and "2  If the user closes it" in out, out)
case("slice routes by the live text", "04 (" in out and "===== checks/04-consequences.md" in out, out)
case("--strike appends", "- No X as Y" in open(strike).read(), open(strike).read())

code, out = run(["bash", LOAD, "--session", "--text", "-", "--change", "--strike-list", strike], stdin="x")
case("--session with --text prints both", "===== SKILL.md" in out and "===== checks/preserve-substance.md" in out, out)

code, out = run(["bash", LOAD, "all"])
case("all prints everything", "===== loop.md" in out and "===== reference/domain-rules.md" in out
     and "**Triggers:**" not in out, out)

code, out = run(["bash", LOAD, "--loop", "--text", "-", "--change", "--strike-list", strike], stdin="x")
case("--loop with --text prints both", "===== loop.md" in out and "===== checks/preserve-substance.md" in out, out)

code, out = run(["bash", LOAD, "04", "nope-id"])
case("ids mode warns on unknown ids", "UNKNOWN CHECK ID: nope-id" in out and "===== checks/04-consequences.md" in out, out)

code, out = run(["bash", LOAD, "--text", "-", "--strike", "x", "--strike-list", os.path.join(tmp, "missing", "s.md")], stdin="x")
case("--strike to a bad path fails loudly", code != 0, out)

code, out = run(["bash", LINT, "-"], stdin="This lets you choose a plan.", cwd=DOCS)
case("lint-text flags banned words", code == 0 and "lets you" in out and "choose" in out, out)
code, out = run(["bash", LINT, "-"], stdin="Users see the dash.", cwd=DOCS)
case("lint-text reports a clean text", code == 0 and "no hits" in out, out)

code, out = run(["bash", LOAD, "--text", "-"], stdin="Users see the dash.")
case("terms, definitions, product terms load before every reply",
     all(f"===== {f} =====" in out for f in ["checks/07-terms.md", "checks/definitions.md", "reference/product-terms.md"]), out)

print("PASS" if fails == 0 else f"{fails} FAILED")
sys.exit(1 if fails else 0)
