---
name: rw-comments
description: "Called by recursive-writer: mode R. Fetches a PR's unresolved review comments, normalizes and grades them, writes the tracker and the overview, then runs the batch, the walk in article order, and the close."
user-invocable: false
when_to_use: "Only when a running /recursive-writer session's manager calls for this stage. Never on your own initiative, and never outside a /recursive-writer session."
argument-hint: "[session folder] [the task or gap list]"
---

# rw-comments

**New in this version (beta):** mode R, review processing.

Called by recursive-writer: mode R (review processing).
- Runs as: main thread.
- In: the PR (the argument, or the current branch's PR), `gh`, the tracker `_temp/pr-<n>-comments.md`
  in the docs repo, and `facts.md`.
- Out: the tracker (each comment with its grade, status, facts, and reply draft), `dev-questions.md` in
  the session folder, the overview, and the walk messages. Pairs go through rw-edit and
  lib/tools/apply_pairs.py.
- Loads: lib/loop.md and `load.sh --text` for every proposal; rw-edit for each walk item; rw-research
  for the fact batch. `lib/` is `.claude/skills/recursive-writer/lib/`.

Never resolve a thread or post a reply on GitHub: reply drafts go in the tracker, and the user posts
them and resolves the threads after pushing.

## Steps

1. **Load.** The session folder and the tracker `_temp/pr-<n>-comments.md`. If the tracker exists,
   resume from its Pending section.
2. **PR and branch.** Get the PR from the argument or with
   `gh pr view --json number,title,url,headRefName`. If `headRefName` isn't the current branch, stop
   and ask. Never switch.
3. **Sync check.** Run `git fetch origin`, `git status --short`, `git log --oneline HEAD..@{u}`
   (behind), and `git log --oneline @{u}..HEAD` (unpushed). Say something only when one of them isn't
   empty. This is the git check; `load.sh --text` syncs the writer's hand edits (step 8).
4. **Fetch**, in one parallel batch ("Fetch commands"), plus `gh api user --jq .login`. The user's own
   replies become context, not items.
5. **Normalize.**
   - One item per unresolved thread; its replies are context.
   - Translate each comment and keep the original.
   - Parse ```` ```suggestion ```` blocks as exact replacement text.
   - Find the current line. For an outdated thread, `line` is null, so search the working tree for the
     end of `diffHunk` or for the text the reviewer quotes (a comment often opens with a `> quote`). If
     neither is found, mark the item "text gone" (a `done` candidate).
6. **Grade and size.** Grade every item ("Grades"). Get the PR diff from the merge base
   (`git diff $(git merge-base origin/main HEAD)`), and size the work:
   - Small: every comment stays local.
   - Medium: a section moves or gets added, so pass 1 runs for that part (rw-plan).
   - Large: an article gets added, or other articles change. Run rw-ripple, or switch to mode F.

   While grading, map each item's side effects (rw-edit, step 1). Two items are dependent when their
   fixes touch the same unit, or one fix changes text another comment refers to. Draft dependent items
   together, in article order, and mark the dependency in the overview.
7. **Facts, once.** One rw-research batch for every F item, and for claims inside other proposals.
   Search `facts.md` first, split the work by question, and cite file and line for each verdict. Gaps
   go to `dev-questions.md`. Until a gap closes, its item gets the safest action.
8. **Draft every proposal** through the loop (lib/loop.md, rw-edit). With many comments, run one
   subagent per file (rw-draft's `briefs/review-round.md`). Then run `apply_pairs.py --stat --lint`.
   The user sees only text that passed.
9. **Write the tracker** in one write ("Tracker"), then send the overview ("Overview").
10. **Batch** on one approval: `apply_pairs.py --approved` (it saves the snapshots for sync), and
    update the tracker in one edit.
11. **Walk**, one item at a time, in article order ("Batch and walk"). Before each item, run
    `ledger.py done --from-pairs <pairs.json>` for the item (or the batch) just finished
    (recursive-writer/SKILL.md, "Hand edits and done marks"). Then re-read the file: the user edits
    between items.
12. **Close.**
    - Run `npm run check-links-diff` and read `_temp/link-report.md`; run the context-mill autolog if
      research opened any source.
    - Report the counts: applied, applied with deviations, skipped, pending.
    - List the reply drafts, the dev questions, and any deferred ripple rows.
    - List the matched standing patterns and the new pattern candidates for the strike list.
    - Remind the user to push and to resolve the threads on GitHub. Never call the review done.

## Fetch commands

The GraphQL query keeps each thread whole, with up to 50 comments, `isOutdated`, `diffHunk`,
`replyTo`, and the review summaries.

```bash
gh api graphql -F owner={owner} -F repo={repo} -F number={number} -f query='
query($owner: String!, $repo: String!, $number: Int!) {
  repository(owner: $owner, name: $repo) {
    pullRequest(number: $number) {
      title url headRefName
      reviews(first: 50) { nodes { author { login } state body submittedAt } }
      reviewThreads(first: 100) {
        totalCount
        nodes {
          id isResolved isOutdated path line originalLine
          comments(first: 50) { nodes { databaseId author { login } createdAt body diffHunk replyTo { databaseId } url } }
        }
      }
    }
  }
}' --jq '.data.repository.pullRequest'
```

```bash
gh api "repos/{owner}/{repo}/issues/{number}/comments?per_page=100" \
  --jq '[.[] | select(.user.type != "Bot") | {author: .user.login, date: .created_at, body, id}]'
```

Keep these:
- threads with `isResolved == false`;
- reviews with a non-empty `body`;
- issue comments.

If `totalCount` is over 100, page through the threads.

## Grades

Each item gets one grade, `<type>·<action>`, plus `·P` when it matches a standing reviewer pattern (the
pattern file: `_temp/review-patterns.md`, kept locally and never committed, written as causes, not quotes).
A `P` match is a strike-list candidate. A reviewer's comments can contradict each other over time, so
only a standing pattern becomes a rule: every other comment gets an answer on its merits. Example:
`W·adapt·P`.

| Type | |
|---|---|
| T | typo or markup |
| L | label, link, or name |
| W | wording |
| F | fact |
| S | structure |
| X | scope |
| Q | question |
| N | no action |

| Action | |
|---|---|
| as-is | the reviewer's text passes the checks |
| adapt | the goal is met another way; the reason says why |
| done | the working tree already covers it |
| verify | research can't settle it: dev question, safest action meanwhile |
| decide | conflicts with the user's rule or another comment: both quotes, 2-3 options |
| reply | no edit, a reply draft only |

## Tracker

`_temp/pr-<n>-comments.md`, the path the older trackers use, so they stay usable. Sections: Pending,
Applied, Applied with deviations, Skipped. Per item: its number, the thread link, `file:line`, the
grade, Original (<language>), Translation, Facts, and the reply draft. Every update is one edit.

## Overview

One message: one line per item, no proposed text, no diffs. A change table only when the PR spans
several files, with the counts from `apply_pairs.py --stat`. Every item links to its file and line. The
decision goes at the bottom.

```
PR #<n> "<title>": <k> open threads from <reviewer> (<m> outdated), <j> top-level comments, <r> review summaries.
Branch in sync with origin. <a>.mdx has uncommitted edits.

| [<slug-a>](src/content/docs/…/<slug-a>.mdx) | +12 -9 |
| [<slug-b>](src/content/docs/…/<slug-b>.mdx) | +4 -18 |

Batch (3): #2 T·as-is, #5 L·as-is, #9 N·done
Walk (6), in article order:
1. [<slug-a>.mdx:56](…#L56) W·adapt·P: cut the restated default > fold it into step 2
3. [<slug-a>.mdx:83](…#L83) S·as-is: make the paragraph a tip > tip after the steps
4. [<slug-a>.mdx:93](…#L93) F·verify: does the style apply to videos? > dev question; safest step meanwhile
6. [<slug-b>.mdx:120](…#L120) X·decide: cut the troubleshooting table > conflicts with <rule>; both quotes inside
…
Facts: 2 settled (facts.md), 1 dev question (#4).
Apply the batch?
```

Each walk item, one per message:

````
Comment 4 of 11 (walk 3 of 6) · [<slug-a>.mdx:88-94](…) · "<article title>" · F·verify
Original (<language>):
> …
Translation:
> …
Issue: <what a reader gets wrong, in one line>
Facts: <fact> (<source>), or "none needed"
Live:
```mdx
…
```
Proposed:
```mdx
…
```
Reply draft (when the proposal deviates): "I kept …, because …"
Also noticed: <at most one line: a defect that makes the text wrong for the reader>
Should I apply?
````

## Batch and walk

The batch comes first, then the walk, in article order.

- **Batch.** T, L, and N items graded `as-is` or `done`, plus pure anchor and label renames. One table
  (`# | link | Live | Proposed`) of up to about 10 rows, with one approval. This is the only place
  AskUserQuestion is allowed (multi-select, to pull rows into the walk).
- **Walk.** Everything else, one item per message, with the full comment verbatim: every item that
  changes what a sentence claims, every W, F, S, and X item, every Q item with an edit, and every
  `adapt` and `decide`.
- **Escalate out of the walk.** An S item that moves or splits a section, or an X item that adds one,
  runs pass 1 for that part (rw-plan), and the heading tree goes to the user first. An X item that adds
  an article or touches other articles goes to rw-ripple: prepare and count those files up front.
- **"Do them all."** This skips the approvals, never the checks. `decide` items still come to the user.
- **`decide` items.** Show both quotes, the evidence, and 2-3 structurally different options, one of
  them a hybrid of the reviewer's text and the current one. Never pick a side between the reviewer and
  the user's rules.
- **Reply drafts.** Every deviation or skip gets a ready-to-post reply in the tracker ("I kept …,
  because …"). It runs through the checks and the public-repo rule (lib/reference/domain-rules.md).
