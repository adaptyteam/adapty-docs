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
- NEVER move to the next comment without explicit user permission (e.g., "next", "looks good").
- NEVER skip comments or batch them together.
- ALWAYS use multi-line code blocks when you quote text content or suggest edits. Preserve the exact MDX formatting, but insert line breaks so that no line exceeds ~80 characters. Break at logical boundaries (before `<br />`, between table cells, after sentence-ending punctuation).

### Style and grammar

Execute the following MANDATORY steps before offering a suggestion, either one you generate, or one you pull from the comment:

- ALWAYS check the suggestion for bad grammar, stylistic defects, and lack of clarity. Consult the /editor skill for a comprehensive list of grammar / style rules. If asked by the reviewer to revert to a version with issues, suggest a hybrid solution that keeps the old content but improves the writing. Take stylistic clues from the rejected changes and the surrounding text. If the suggestion has issues, rewrite it until it doesn't.
- Before you offer a suggestion, ALWAYS compare your suggestion to the existing text / the reviewer's suggestion and see if the two deviate in meaning and content. Assume the reader doesn't have the willingness to invest any real effort into reading the sentence and will misunderstand anything that can be misinterpreted.

## Step 1: Fetch comments

### 1a. Check for rtk

```bash
which rtk 2>/dev/null && echo "rtk:yes" || echo "rtk:no"
```

If `rtk` is installed, preface all `gh` commands with `rtk proxy` to bypass output compression. This applies to every `gh` call in the entire workflow.

### 1b. Determine the PR

- If `$ARGUMENTS` is provided, use it as the PR number or URL.
- Otherwise, detect the PR for the current branch.

To get the PR number and repo info, run these commands:

```bash
# Get owner/repo from the git remote
REPO=$(git remote get-url origin | sed -E 's|.*github\.com[:/]||; s|\.git$||')

# Get PR number for current branch (always use the API — gh pr view --json is unreliable)
BRANCH=$(git branch --show-current)
gh api "repos/${REPO}/pulls?head=$(echo $REPO | cut -d/ -f1):${BRANCH}&state=open" --jq '.[0] | {number, title}'
```

### 1c. Fetch review comments (inline, unresolved only)

Use GraphQL to fetch review threads so you can filter by resolution status. Only include comments from **unresolved** threads.

```bash
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

### 1d. Fetch top-level PR comments (issue comments)

```bash
gh api "repos/{owner}/{repo}/issues/{number}/comments?per_page=100" \
  --jq '.[] | {author: .user.login, date: .created_at, body: .body, id: .id}'
```

### 1e. Get the PR title

```bash
gh api "repos/{owner}/{repo}/pulls/{number}" --jq .title
```

## Step 2: Create tracking file

1. Ensure `_temp/` exists and is gitignored (check `.gitignore`; add `_temp/` if missing).
2. Write `_temp/pr-{number}-comments.md` with all comments translated to English.

Format:

```markdown
# PR #{number}: {title}

{comment_count} comments from {authors}. Fetched {date}.

## Pending

---

### Comment 1 — {path}:{line} — {status}

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

## Step 3: Present summary

Show a brief summary:

- PR title and number
- Total comment count
- List of files with comment counts (e.g., `app-store-offers.mdx — 14 comments`)

Then say: "Ready to start with Comment 1. Say 'go' to begin."

## Step 4: Check for existing changes

See if the branch deviates from upstream or has other non-committed changes.

## Step 5: Walk through comments

For each comment, in order of appearance:

**Gather context first, then present everything at once.** Run all file reads and git commands BEFORE producing any output for the user. The user should see one uninterrupted block — not text interleaved with tool calls.

1. **Read context (silent, MANDATORY).** Read the relevant section of the current file AND the original from `main` branch (`git show main:{path}`) around the commented line.
2. **Check if already addressed (silent, MANDATORY).** Compare the current working tree against what the reviewer asks for.
3. **Fact-check (silent, MANDATORY).** For EVERY suggestion, verify EVERY factual claim against other content in the project. For new features without existing documentation coverage, check the claim against other changes in the working branch. Do not assume something is true because it sounds plausible. If you cannot verify a claim, explicitly mention it as UNVERIFIED. This applies equally to the reviewer's claims and to anything you add yourself. Search the codebase for evidence before presenting.

4. **Present everything in one block.** Output all of the following together, with no tool calls in between:
   - Comment number (e.g., "Comment 3 of 19"), file and line, and the **full reviewer comment** verbatim (NEVER summarize or paraphrase)
   - **Main** quote (multi-line code block) — the original before the PR
   - **Working tree** quote (multi-line code block) — the current PR state
   - Whether already addressed. If yes, say so immediately, mark as Applied, and ask to move on.
   - How the working tree deviates from the reviewer's request
   - If a suggestion is needed, repeat the **Main** and **Working tree** quotes, then show the **Suggestion** quote immediately after — all three must be visible together in chronological order for easy comparison. If already addressed, skip the suggestion. NEVER show Main and Working tree earlier in the output and then the Suggestion separately — the user must see all three adjacent without scrolling back.

5. **Suggest.** If the comment is NOT already addressed, then based on the comment:
   - If the ask is clear-cut (e.g., "revert this", "swap paragraphs", "change link"), propose a specific edit.
   - If ambiguous or requires a design decision, summarize what the reviewer wants and present options.  Do not offer options that ignore or contradict what the reviewer and the user asked for. Every option must fully address the reviewer's feedback unless the user specifically asks to ignore the request.
   - If the current (PR) version is stylistically better than the reviewer's suggestion, offer a hybrid solution that incorporates the reviewer's intent but maintains the style and clarity.
   - Describe how existing content deviates from the reviewer's request.
   - **Self-check (mandatory).** Before presenting ANY suggestion, re-read it word by word as a finished sentence. Consult the /editor skill for what to check. If you find issues, rewrite silently and check again. Then fact-check it to see if changes to the sentence introduced any inaccuracies. Do not present a suggestion you haven't fully verified.

5. **Wait.** Do not proceed until the user responds. Possible user responses:
   - Approval to edit: make the edit, update tracking file status to `Resolved`, confirm, then wait again.
   - Approval to skip/move on: update tracking file if needed, move to next comment.
   - Discussion: engage, refine the suggestion, wait for approval.

6. **Summarize deviations, if any.** If the user does not follow the reviewer's suggestion 100% exactly, fill in the **Deviations during resolution** section. Write it as a conversational reply to the reviewer — as if the user is responding to their comment on GitHub. Explain what was kept, what changed, and why. Pull the reasoning from the user's conversation with you. Do not quote the article text — keep it focused on the "why." If part of the final result was already in the original PR submission (not a new change), say "I kept..." rather than presenting it as a modification.

## Step 6: Wrap up

After you process all the comments, show:

- Count of resolved vs. pending comments
- List of any still-pending comments
- Remind the user to push changes and resolve comments on GitHub manually.
