#!/usr/bin/env python3
"""PreToolUse hook for the docs repos: blocks Edit and Write on docs MDX until load.sh --text ran on it.

An existing file needs its own fresh stamp; a new file needs a fresh `load.sh --text -`. Exit 2 blocks
the tool call and shows the message to Claude. No session id or a file outside src/content/docs: allow.
The stamps come from the session folder of the event's working directory (paths.sessions_dir()).
"""
import json, os, sys

sys.path.insert(0, os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))
import gate  # noqa: E402

try:
    data = json.load(sys.stdin)
except Exception:
    sys.exit(0)
if data.get("tool_name") not in ("Edit", "Write", "MultiEdit"):
    sys.exit(0)
path = (data.get("tool_input") or {}).get("file_path") or ""
sid = data.get("session_id") or os.environ.get("CLAUDE_CODE_SESSION_ID")
if not path or not sid or not gate.is_docs(path):
    sys.exit(0)
cwd = data.get("cwd") or None
ok = (gate.fresh(sid, path, cwd=cwd) if os.path.exists(path)
      else (gate.fresh(sid, gate.CHAT, cwd=cwd) or gate.fresh(sid, path, cwd=cwd)))
if not ok:
    print(gate.MESSAGE + path, file=sys.stderr)
    sys.exit(2)
sys.exit(0)
