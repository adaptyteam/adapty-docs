---
name: sync-branch-to-develop
description: Use when finishing work on a feature branch and wanting to promote it to develop (or another integration branch) while staying on the original branch. Handles commit, push, merge, push develop, and return.
---

# Sync branch to develop

## Overview

Promote the current branch to the `develop` integration branch and return, so the user keeps working where they were. The sequence: commit any pending work, push the current branch, fast-forward-update develop, merge the branch into develop, push develop, check out the original branch.

Users end where they started. Never leave them on `develop`.

## When to use

- User says: "sync to develop", "push and merge to develop", "promote this branch to staging", "land this on develop", or equivalent.
- A feature branch is ready to land on the integration branch while work continues.

## When NOT to use

- Current branch IS `develop`, `main`, or another protected trunk → refuse, explain why.
- Target is not `develop` → confirm the target branch name with the user before proceeding.
- User wants to merge via PR, not directly → skip this skill and open a PR instead.

## Workflow

**Before step 1:** capture the starting branch with `git rev-parse --abbrev-ref HEAD`. You return here at the end no matter what — including on failure.

### 1. Commit pending work (skip if clean)

- Run `git status --porcelain`. Empty → skip this step.
- Read all pending changes: `git status` + `git diff` (staged + unstaged).
- Look at recent commit history to match the repo's style: `git log --oneline -10`.
- Draft the commit message following the rules in "Writing the commit message" below.
- Show the user the diff summary **and** the drafted message. Commit only after they approve (or implicitly approve by telling you to proceed).
- Stage specific files by name. Never `git add -A` or `git add .` (risks staging secrets, unrelated files).
- Refuse to stage files that likely contain secrets (`.env`, `credentials.json`, private keys). Warn and skip.
- Use a HEREDOC to pass the commit message so multi-line formatting is preserved (see example below).
- If a pre-commit hook fails: surface the error, fix the underlying issue, re-stage, and create a **new** commit. Never `--amend` (the failed commit didn't happen), never `--no-verify`.

#### Writing the commit message

Match the repo's existing style (check `git log --oneline -10` first). General rules:

- **Subject line:** one line, imperative mood, ≤70 characters, no trailing period. Match the pattern of recent commits.
- **Body (optional, only if helpful):** 1–2 sentences explaining *why* the change was made, not what it does. Wrap at ~72 chars.
- **Verb choice reflects nature:** "Add" for wholly new features, "Update" for enhancements, "Fix" for bugs, "Refactor" for internal restructuring, "Remove" for deletions, "Docs" for documentation-only changes.
- **No filler:** don't reference the task/PR number unless the repo convention does it; don't narrate ("this commit…"); don't list every file.
- **No Co-Authored-By trailer** — the commit content may not have been authored by Claude; only add it if the user explicitly asks.

Commit via HEREDOC (preserves formatting):

```bash
git commit -m "$(cat <<'EOF'
Subject line here

Optional short body explaining why.
EOF
)"
```

### 2. Push the current branch

- First push: `git push -u origin <branch>`
- Otherwise: `git push`
- If push is rejected (non-fast-forward, protected branch, etc.) — stop and report. Never force-push without an explicit ask.

### 3. Update develop locally

- `git fetch origin`
- `git checkout develop`
- `git pull --ff-only origin develop`
- If the fast-forward fails (local develop has diverged), stop and ask the user how to proceed. Do not `reset --hard` or force-pull.

### 4. Merge the branch into develop

- `git merge --no-ff <branch>` — `--no-ff` keeps the feature branch identifiable in history. Only omit if the user prefers fast-forward merges.
- On conflict: stop, list conflicted files, ask the user. Never use `-X ours/theirs`, `--strategy=ours`, or force-resolve silently.

### 5. Push develop

- `git push origin develop`
- On rejection (protected branch, diverged remote), stop and report. Never force-push develop.

### 6. Return to the original branch

- `git checkout <original-branch>`
- Run `git status` to confirm state. Report to user: what landed on develop, which commit SHA, remote status.

## Quick reference

| Step | Command | Skip when |
|------|---------|-----------|
| Commit | `git add <files> && git commit -m "msg"` | Working tree clean |
| Push branch | `git push [-u origin <branch>]` | Never |
| Fetch | `git fetch origin` | Never |
| Update develop | `git checkout develop && git pull --ff-only origin develop` | Never |
| Merge | `git merge --no-ff <branch>` | Never |
| Push develop | `git push origin develop` | Never |
| Return | `git checkout <original-branch>` | Never |

## Common mistakes

- **Committing without review.** Always show the diff summary and the drafted message first, then wait for approval.
- **`git add -A` / `git add .`** — stage specific files by name.
- **Vague commit messages** ("updates", "fixes things") — check `git log` for the repo's voice and write a message that says *what* changed at a conceptual level and *why*.
- **Adding a Co-Authored-By trailer by default** — the commit contents may not have been written by Claude. Omit unless the user asks for it.
- **Bypassing hook failures with `--no-verify`** — fix the underlying issue instead.
- **`git commit --amend` after a hook failure** — the failed commit didn't happen; amend would modify the previous real commit. Create a new commit instead.
- **`git reset --hard` or force-pull on develop divergence** — stop and ask.
- **Silent conflict resolution** — surface conflicts, don't auto-pick sides.
- **Force-pushing develop or origin branch** — never, without explicit user instruction.
- **Forgetting to return** — the final `checkout <original-branch>` is mandatory.
- **Running on main** — refuse. `main → develop` is not this workflow.

## Red flags — STOP and ask

- User rejects the drafted commit message → re-draft or ask for theirs; do not commit
- Pre-commit / pre-push hook failure
- `git pull --ff-only origin develop` fails (diverged)
- Merge conflict
- Push rejected (any branch)
- Current branch is `develop`, `main`, or another trunk
- Staged diff includes a file that looks like it holds secrets (`.env*`, `*.pem`, `credentials*`)

On any red flag: stop the workflow, report state, checkout back to the starting branch if you left it, ask the user.
