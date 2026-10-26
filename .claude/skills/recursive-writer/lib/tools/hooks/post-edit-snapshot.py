#!/usr/bin/env python3
"""PostToolUse hook for the docs repos: saves a docs article's snapshot after an Edit, Write, or
MultiEdit lands, with sync.save_snapshot (the function apply_pairs.py uses; index source "edit").

The agent's own edit becomes the new reference point, so the next sync logs only the writer's edits.
hooks/pre-edit-sync.py synced the file before the edit, so no hand edit gets lost in the new snapshot.
Two cases save something else:
- The writer changed the proposal in the permission dialog before accepting it
  (tool_response.userModified): the snapshot is the agent's proposal, rebuilt from tool_input (and
  tool_response.originalFile for an edit), so the next sync logs the writer's changes as hand edits.
  When the proposal can't be rebuilt, it saves nothing, and the next sync logs the whole change as the
  writer's.
- A staged edit (tool_response.staged: held for review, the file unchanged) saves nothing.
The path rule is the load gate's (gate.is_docs); the session folder comes from the event's working
directory. It prints nothing and always exits 0.
"""
import json, os, sys

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

EDITS = ("Edit", "Write", "MultiEdit")


def proposal(tool, ti, tr):
    """The file text the agent proposed, or None when tool_input and tool_response can't rebuild it."""
    if tool == "Write":
        return ti.get("content") if isinstance(ti.get("content"), str) else None
    text = tr.get("originalFile")
    if not isinstance(text, str):
        return None
    for e in (ti.get("edits") if tool == "MultiEdit" else [ti]) or []:
        old, new = e.get("old_string"), e.get("new_string")
        if not isinstance(old, str) or not isinstance(new, str) or not old or old not in text:
            return None
        text = text.replace(old, new) if e.get("replace_all") else text.replace(old, new, 1)
    return text


def main():
    data = json.load(sys.stdin)
    if not isinstance(data, dict) or data.get("tool_name") not in EDITS:
        return
    ti = data.get("tool_input") or {}
    tr = data.get("tool_response") if isinstance(data.get("tool_response"), dict) else {}
    cwd = data.get("cwd") or None
    path = ti.get("file_path") or tr.get("filePath") or ""
    if path and cwd and not os.path.isabs(path):
        path = os.path.join(cwd, path)
    import gate, sync
    if not path or not gate.is_docs(path) or not os.path.isfile(path) or tr.get("staged"):
        return
    d = sync.folder(cwd)
    if not d:
        return
    text = None  # the file as it is now
    if tr.get("userModified"):
        text = proposal(data.get("tool_name"), ti, tr)
        if text is None:
            return
    sync.save_snapshot(path, text, d, source="edit")


try:
    main()
except Exception as e:  # a failed snapshot never fails the edit
    print(f"post-edit-snapshot: {e}", file=sys.stderr)
sys.exit(0)
