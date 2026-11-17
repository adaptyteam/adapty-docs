# recursive-writer (beta)

A writing manager for Adapty docs, with three modes: a full draft from a ticket, iterative edits, and
review processing (a PR's review comments). Every wording it shows goes through a loop of checks first.

**It's opt-in.** Claude never starts it on its own: the manager's `SKILL.md` sets
`disable-model-invocation: true`, so only you can start it, with `/recursive-writer`. The default docs
workflow stays `/doc-author`.

The modules (`rw-*`) are separate skills, hidden from users (`user-invocable: false`). Their
`when_to_use` limits them to a running `/recursive-writer` session: that limit is guidance Claude
follows, not a lock. Research, questions, and ripple run as their own agents (`context: fork`); the
other modules run in the main conversation, because they stop for the writer's approval.

## Use it

Type `/recursive-writer` in Claude Code, then give it the task: a ticket, an edit, or a PR to process.

- `recursive-writer/`: the manager (`SKILL.md`) and its shared library (`lib/`: checks, reference,
  the review loop, and tools), plus `tests/`.
- `rw-*`: the modules the manager calls, one per stage. They never run on their own.
- Session files go to `_temp/<ticket ID>/` (gitignored), named after the branch's ticket key, or
  `_temp/edits-<date>/` without one. Research facts are also kept per article in `_temp/facts/`.
- Optional, local only: `_temp/review-patterns.md`, the standing patterns of a reviewer (for the `P`
  grade in review processing), written as causes.

## Optional hooks (per writer, local only)

The hooks make the skill load at the start of every session, show its always-on checks each turn,
refuse an article edit the checks didn't see, and log your hand edits. Installing them turns the skill
on for every session in your clone, so add them only to your own `.claude/settings.local.json`, never to
the tracked `settings.json`:

```json
{
  "hooks": {
    "SessionStart": [
      { "hooks": [{ "type": "command", "command": "bash \"$CLAUDE_PROJECT_DIR/.claude/skills/recursive-writer/lib/tools/hooks/session-start.sh\" 2>/dev/null || true" }] }
    ],
    "UserPromptSubmit": [
      { "hooks": [{ "type": "command", "command": "python3 \"$CLAUDE_PROJECT_DIR/.claude/skills/recursive-writer/lib/tools/hooks/turn-digest.py\" 2>/dev/null || true" }] }
    ],
    "PreToolUse": [
      { "matcher": "Edit|Write|MultiEdit", "hooks": [
        { "type": "command", "command": "python3 \"$CLAUDE_PROJECT_DIR/.claude/skills/recursive-writer/lib/tools/hooks/require-load.py\"" },
        { "type": "command", "command": "python3 \"$CLAUDE_PROJECT_DIR/.claude/skills/recursive-writer/lib/tools/hooks/pre-edit-sync.py\" 2>/dev/null || true" }
      ] }
    ],
    "PostToolUse": [
      { "matcher": "Edit|Write|MultiEdit", "hooks": [
        { "type": "command", "command": "python3 \"$CLAUDE_PROJECT_DIR/.claude/skills/recursive-writer/lib/tools/hooks/post-edit-snapshot.py\" 2>/dev/null || true" },
        { "type": "command", "command": "FILE=$(jq -r '.tool_input.file_path // empty'); [ -z \"$FILE\" ] && exit 0; echo \"$FILE\" | grep -qE 'src/content/docs/.*\\.mdx$' && node \"$CLAUDE_PROJECT_DIR/.claude/skills/recursive-writer/lib/tools/lint-personal.mjs\" \"$FILE\" || true" }
      ] }
    ]
  }
}
```

## Tests

From the repo root, with a throwaway sessions folder:

```bash
for t in .claude/skills/recursive-writer/tests/test_*.py; do RR_SESSIONS_DIR=$(mktemp -d) python3 "$t" | tail -1; done
node .claude/skills/recursive-writer/tests/test_extra_rules.mjs | tail -1
```
