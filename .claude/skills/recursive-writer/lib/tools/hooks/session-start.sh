#!/bin/bash
# SessionStart hook for the docs repos: puts the manager's SKILL.md (recursive-writer) into context at
# startup, resume, and after every compaction, so a session never works without the router. The
# modules (rw-*) and lib/loop.md load on demand.
out="$(bash "$(cd "$(dirname "$0")/../.." && pwd)/load.sh" --session 2>/dev/null)"
[ -n "$out" ] || exit 0
printf '%s' "$out" | python3 -c 'import json, sys; print(json.dumps({"hookSpecificOutput": {"hookEventName": "SessionStart", "additionalContext": sys.stdin.read()}}))'
