#!/usr/bin/env python3
"""PreToolUse hook for the docs repos: syncs a docs article before an Edit, Write, or MultiEdit lands.

The writer's hand edits since the last snapshot go into hand-edits.md first (tools/sync.py), so the
agent's edit can't hide them; hooks/post-edit-snapshot.py then saves the agent's edit as the new
snapshot. The path rule is the load gate's (gate.is_docs), and the session folder comes from the
event's working directory, as in require-load.py. When sync logs a unit, its summary line ("Hand
edits since the last apply: N units in <file>") reaches the model as additionalContext.
It never blocks the edit: it always exits 0, and a failure only prints to stderr. Claude Code runs it
next to require-load.py, in parallel; the edit waits for both, and the two share no file.
"""
import json, os, sys

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

EDITS = ("Edit", "Write", "MultiEdit")


def main():
    data = json.load(sys.stdin)
    if not isinstance(data, dict) or data.get("tool_name") not in EDITS:
        return
    cwd = data.get("cwd") or None
    path = (data.get("tool_input") or {}).get("file_path") or ""
    if path and cwd and not os.path.isabs(path):
        path = os.path.join(cwd, path)
    import gate, sync
    if not path or not gate.is_docs(path) or not os.path.isfile(path):  # a new file has nothing to sync
        return
    d = sync.folder(cwd)
    if not d:
        return
    line = sync.sync_file(path, d)[1]
    if line:
        print(json.dumps({"hookSpecificOutput": {"hookEventName": "PreToolUse", "additionalContext": line}}))


try:
    main()
except Exception as e:  # never block the edit
    print(f"pre-edit-sync: {e}", file=sys.stderr)
sys.exit(0)
