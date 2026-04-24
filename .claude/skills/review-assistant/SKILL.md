---
name: review-assistant
description: Walk through unresolved GitHub PR review comments one by one, suggest fixes, and track resolution in a local file. Use when the user wants to address PR feedback.
argument-hint: "[PR number or URL, defaults to current branch]"
---

# Review PR Comments

Walk through unresolved GitHub PR review comments one by one. Suggest fixes and track resolution locally.

## Hard rules

- NEVER mark comments as resolved on GitHub. The user does this manually after pushing.
- NEVER edit files without explicit user permission (e.g., "yes, make the edit").
- After applying an approved edit, immediately present the next comment. Do not ask "ready for next?" or wait for permission to continue.
- NEVER use AskUserQuestion when first presenting a comment. End your message and let the user read and respond in their own time. AskUserQuestion is allowed only after the user has already engaged with the current comment (e.g., to fast-track a batch of easy fixes).
- NEVER skip comments or batch them together — except Easy comments, which may be batch-applied (see Step 6a).
- ALWAYS use multi-line code blocks when you quote text content or suggest edits. Preserve the exact MDX formatting, but insert line breaks so that no line exceeds ~80 characters. Break at logical boundaries (before `<br />`, between table cells, after sentence-ending punctuation).

### Style and grammar

Execute the following MANDATORY steps before offering a suggestion, either one you generate, or one you pull from the comment:

- ALWAYS check the suggestion for bad grammar, stylistic defects, and lack of clarity. Consult the /editor skill for a comprehensive list of grammar / style rules. If asked by the reviewer to revert to a version with issues, suggest a hybrid solution that keeps the old content but improves the writing. Take stylistic clues from the rejected changes and the surrounding text. If the suggestion has issues, rewrite it until it doesn't.
- Before you offer a suggestion, ALWAYS compare your suggestion to the existing text / the reviewer's suggestion and see if the two deviate in meaning and content. Assume the reader doesn't have the willingness to invest any real effort into reading the sentence and will misunderstand anything that can be misinterpreted.

## Step 1: Fetch comments

### 1a. Gather repo info (run all three in parallel)

Run these three commands in a single parallel batch:

```bash
# 1. Get owner/repo slug
git remote get-url origin | sed -E 's|.*github\.com[:/]||; s|\.git$||'
```

```bash
# 2. Get current branch
git branch --show-current
```

```bash
# 3. Check for rtk
which rtk 2>/dev/null && echo "rtk:yes" || echo "rtk:no"
```

If `rtk` is present, preface every subsequent `gh` command with `rtk proxy` to bypass output compression.

### 1b. Determine the PR

- If `$ARGUMENTS` is provided, use it directly as the PR number (skip this step).
- Otherwise, use the owner/repo slug and branch from 1a to find the open PR:

```bash
# Replace {owner}, {repo}, {owner_prefix}, {branch} with values from 1a
gh api "repos/{owner}/{repo}/pulls?head={owner_prefix}:{branch}&state=open" \
  --jq '.[0] | {number, title}'
```

The `{owner_prefix}` is the part before `/` in the slug (e.g. `adaptyteam` from `adaptyteam/adapty-docs`).

### 1c. Fetch comments (run both in parallel)

Run these two in a single parallel batch once you have owner, repo, and PR number:

```bash
# Inline review threads (unresolved only)
gh api graphql -f query='
{
  repository(owner: "{owner}", name: "{repo}") {
    pullRequest(number: {number}) {
      reviewThreads(first: 100) {
        nodes {
          isResolved
          comments(first: 10) {
            nodes {
              path
              line: originalLine
              author { login }
              createdAt
              body
              databaseId
            }
          }
        }
      }
    }
  }
}' --jq '.data.repository.pullRequest.reviewThreads.nodes[] | select(.isResolved == false) | .comments.nodes[] | {path, line, author: .author.login, date: .createdAt, body, id: .databaseId}'
```

```bash
# Top-level PR (issue) comments
gh api "repos/{owner}/{repo}/issues/{number}/comments?per_page=100" \
  --jq '.[] | {author: .user.login, date: .created_at, body: .body, id: .id}'
```

The PR title comes from step 1b — no extra API call needed.

## Step 2: Classify and sort comments

Before writing the tracking file, classify each comment by complexity:

- **Easy** — mechanical changes: typos, link swaps, exact text replacements, reverts, formatting fixes
- **Medium** — rewrites for clarity, moving content, adding small details from existing context
- **Hard** — new content from scratch, design decisions, ambiguous feedback, multi-file changes

Reorder all comments: Easy first, then Medium, then Hard. Number them in this new order.

## Step 3: Create tracking file

(Comments are already sorted by complexity from Step 2.)

1. Ensure `_temp/` exists and is gitignored (check `.gitignore`; add `_temp/` if missing).
2. Write `_temp/pr-{number}-comments.md` with all comments translated to English.

Format:

```markdown
# PR #{number}: {title}

{comment_count} comments from {authors}. Fetched {date}.

## Pending

---

### Comment 1 — {path}:{line} — {complexity} — {status}

**Author:** {author} | **Date:** {date} | **GitHub ID:** {id}

**Original ({detected_language}):**
> {original body}

**Translation:**
> {English translation}

**Deviations during resolution:**

---

## Applied

## Applied with deviations

```

- `{status}` in the heading is either `Pending`, `Applied`, or `Applied with Deviations`.
- If a comment is resolved exactly as requested by the reviewer, update the heading to `Applied` and the Status field, but NEVER remove content. Move the comment to the "Applied" section of the file when resolved, with all the content intact.
- If a comment is resolved with deviations, update the heading to `Applied with Deviations` and the Status field, but NEVER remove content. Move the comment to the "Applied with Deviations" section at the bottom of the file when resolved, with all the content intact.
- **Always update the tracking file in a single edit** — remove the comment from Pending and add it to the target section in one operation. Never split this into multiple edits.

## Step 4: Present summary

Show:

- PR title and number
- Total comment count

Then show a table of all comments sorted by complexity:

| # | File:Line | Complexity | Summary |
|---|-----------|------------|---------|
| 1 | file.mdx:42 | Easy | Fix typo "recieve" → "receive" |
| 2 | file.mdx:78 | Easy | Revert link URL |
| 3 | file.mdx:120 | Medium | Rewrite intro for clarity |
| 4 | file.mdx:200 | Hard | Add missing section on callbacks |

The **Summary** column is a short (under 10 words) description of what the reviewer asks for.

If there are Easy comments, mention that batch-apply is available (see Step 6a).

Then say: "Ready to start with Comment 1. Say 'go' to begin, or 'batch' to batch-apply all Easy fixes."

## Step 5: Check for existing changes

Clear `_temp/backups/` to remove stale backups from previous sessions.

Run `git status` and `git log HEAD..@{u}` (silently). Then:

- If there are uncommitted changes to files that have review comments, warn the user: these edits will mix with uncommitted work.
- If the branch is behind the remote, warn the user: they may want to pull before starting.
- If everything is clean, proceed without comment.

## Step 6: Walk through comments

For each comment, in complexity order (easiest first):

**Gather context first, then present everything at once.** Run all file reads and git commands BEFORE producing any output for the user. The user should see one uninterrupted block — not text interleaved with tool calls.

### Step 6a: Batch-apply Easy comments (optional)

If the user says "batch" at the summary step, or asks to batch-apply during the walkthrough:

1. For each Easy comment, silently read context, check if already addressed, and prepare the fix.
2. Present a table of all Easy fixes:

| # | File:Line | Current text | Suggested fix |
|---|-----------|-------------|---------------|
| 1 | file.mdx:42 | recieve | receive |
| 2 | file.mdx:78 | /old-link | /new-link |

3. Wait for the user to approve the batch.
4. Apply all fixes, back up each file before its first edit (see backup rules below), update the tracking file for each comment.
5. Report how many were applied, then continue with Medium comments using the normal one-by-one flow.

### Step 6b: One-by-one flow

1. **Read context (silent, MANDATORY).** Read the relevant section of the current file AND the original from `main` branch (`git show main:{path}`) around the commented line.
2. **Check if already addressed (silent, MANDATORY).** Compare the current working tree against what the reviewer asks for.
3. **Fact-check (silent, MANDATORY).** For EVERY suggestion, verify EVERY factual claim against other content in the project. For new features without existing documentation coverage, check the claim against other changes in the working branch. Do not assume something is true because it sounds plausible. If you cannot verify a claim, explicitly mention it as UNVERIFIED. This applies equally to the reviewer's claims and to anything you add yourself. Search the codebase for evidence before presenting.

4. **Present everything in one block.** Output all of the following together, with no tool calls in between:
   - Comment number and tier progress (e.g., "Comment 3 of 19 (Easy 3/8)"), file and line, and the **full reviewer comment** verbatim (NEVER summarize or paraphrase)
   - **Main** quote (multi-line code block) — the original before the PR
   - **Working tree** quote (multi-line code block) — the current PR state
   - Whether already addressed. If yes, say so immediately, mark as Applied, and ask to move on.
   - How the working tree deviates from the reviewer's request
   - If a suggestion is needed, repeat the **Main** and **Working tree** quotes, then show the **Suggestion** quote immediately after — all three must be visible together in chronological order for easy comparison. If already addressed, skip the suggestion. NEVER show Main and Working tree earlier in the output and then the Suggestion separately — the user must see all three adjacent without scrolling back.

   End with: **Apply / Skip / or discuss**

5. **Suggest.** If the comment is NOT already addressed, then based on the comment:
   - If the ask is clear-cut (e.g., "revert this", "swap paragraphs", "change link"), propose a specific edit.
   - If ambiguous or requires a design decision, summarize what the reviewer wants and present options.  Do not offer options that ignore or contradict what the reviewer and the user asked for. Every option must fully address the reviewer's feedback unless the user specifically asks to ignore the request.
   - If the current (PR) version is stylistically better than the reviewer's suggestion, offer a hybrid solution that incorporates the reviewer's intent but maintains the style and clarity.
   - Describe how existing content deviates from the reviewer's request.
   - **Self-check (mandatory).** Before presenting ANY suggestion, re-read it word by word as a finished sentence. Consult the /editor skill for what to check. If you find issues, rewrite silently and check again. Then fact-check it to see if changes to the sentence introduced any inaccuracies. Do not present a suggestion you haven't fully verified.

6. **Wait.** Do not proceed until the user responds. Possible user responses:
   - Approval to edit: back up the file (see below), make the edit, update tracking file, then immediately present the next comment (no confirmation prompt needed).
   - Approval to skip/move on: update tracking file if needed, immediately present the next comment.
   - Discussion: engage, refine the suggestion, wait for approval.

7. **Summarize deviations, if any.** If the user does not follow the reviewer's suggestion 100% exactly, fill in the **Deviations during resolution** section. Write it as a conversational reply to the reviewer — as if the user is responding to their comment on GitHub. Explain what was kept, what changed, and why. Pull the reasoning from the user's conversation with you. Do not quote the article text — keep it focused on the "why." If part of the final result was already in the original PR submission (not a new change), say "I kept..." rather than presenting it as a modification.

### File backups

Before the first edit to any file in a session, copy it to `_temp/backups/{path}/{filename}.bak`, preserving the directory structure to avoid name collisions (e.g., `_temp/backups/src/content/docs/version-3.0/file.mdx.bak`). Skip if a backup for this file already exists in `_temp/backups/`. Do not mention backups to the user unless they need to restore a file.

## Step 7: Wrap up

After you process all the comments, show:

- Count of resolved vs. pending comments
- List of any still-pending comments
- Remind the user to push changes and resolve comments on GitHub manually.

Clean up `_temp/backups/`.
