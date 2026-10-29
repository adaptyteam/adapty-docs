---
name: recursive-writer
description: "Beta, opt-in only: use it only when the user invokes /recursive-writer or asks for recursive-writer by name. The default docs workflow is /doc-author. A writing manager for Adapty docs: full drafts, iterative edits, and review processing, each checked by a rule loop before the user sees any wording."
disable-model-invocation: true
---

# recursive-writer

Show the user only wording that a full round of these checks left unchanged.

The manager picks the mode, sizes the work, runs the stages, holds the gates, and writes the hand-offs.
It owns the approval words, one pending proposal, and the change table ("Hand-offs and approval"); the
strike-list policy is in lib/loop.md, "Strike list".
- In: the prompt, the ticket or PR, the session id.
- Out (session folder): `mode.md` (the mode, the phase, the pending proposal, and the objections per
  unit), `frame.md` (once per article, before the first stage: lib/checks/frame.md), and the hand-offs.
- `lib/` is `.claude/skills/recursive-writer/lib/`: the checks, the loop, and the tools. Each
  module is a skill folder next to this one, `.claude/skills/rw-*/`: hidden from users, and run only
  when this manager calls it. Start a module with the Skill tool, passing the session folder and the
  task as arguments.

## When

- Beta and opt-in: this skill runs only when the user invokes it. Once invoked, every request in that
  session that adds, changes, moves, or cuts wording runs this skill,
  from the first draft to the last iteration: a fix, a restructure the user dictates, a batch ("all at
  once", "without my approval"), an article split off mid-task, an edit in another file. "Without my
  approval" skips the approval, never the checks. The load gate enforces it: `apply_pairs.py --stat` and
  `--approved`, and the edit hook, refuse a docs file that `load.sh --text` didn't stamp in the last two
  hours.
- Default: the user points out a problem or asks for a fix, up to one section, including several
  options for it. Follow rw-edit.
- Writing: rw-draft, "Writing".
- A whole draft, a whole article, a new article or section (one split off mid-task included), or a
  review the user asks for: read "Rounds" below first, and follow it.
- Exempt: the user's verbatim wording; link targets and anchors (link text is wording); code;
  formatting; file moves.

## Modes

Size the docs change first: feature size isn't doc size. Small runs rw-edit only. Medium runs rw-plan
for the affected section. Large runs every stage.

**F, full draft.** rw-research > rw-questions (gate 1: the scope in one paragraph) > rw-plan (gate 2:
the heading tree, each heading with the reader questions it answers) > rw-ripple (prepares and counts every ripple edit; the edits wait for
the primary article) > rw-draft > hand-off. Each gate stops for the user's approval. A "needs a fact"
line from rw-questions relaunches rw-research on that gap. The draft's hand-off opens with the change
table: the primary article and each prepared ripple file. After the hand-off, every request runs mode E.

**E, iterative edit.** Every later request runs the loop (lib/loop.md), however small.
1. Sync: `load.sh --text <file>` first logs the writer's hand edits since the last apply in
   `hand-edits.md` ("Hand edits and done marks"). A hand-edited unit counts as rejected.
2. Triage: wording, fact, structure, or new content; the unit, and its side effects, mapped before any
   drafting (rw-edit, step 1).
3. Research and questions (rw-research, rw-questions), only for a fact request or new content. New
   content needs a reader question: no question, no addition.
4. Plan (rw-plan), only for a structure request, and only for that section. A request that adds,
   moves, or splits a section or an article runs pass 1 for that part first: the heading tree goes to
   the user.
5. rw-edit with the review loop, one proposal at a time.
6. Ripple (rw-ripple) after the primary file, file by file.

Sync runs before every proposal and every round, through `load.sh --text`.

**R, review processing.** rw-comments runs it, and holds the commands, the grades, and the formats.
1. Fetch unresolved threads, review summaries, and issue comments. Translate, keep the original, parse
   suggestion blocks, and locate outdated threads from the quoted text.
2. Sync and scope: grade every comment, and size the work (small, medium, or large, as above). The git
   sync check runs, and `load.sh --text` syncs each file's hand edits.
3. Facts once: one rw-research batch for every fact item. Gaps become dev questions, and the safest
   action applies until they close.
4. Draft every proposal through the review loop before the user sees anything.
5. Overview: one message with one line per comment, its grade, and its link. The batch is listed first,
   then the walk.
6. Batch: one approval for the mechanical items.
7. Walk: one comment at a time, in article order. Re-read before each.
8. Close: link check, context-mill autolog if a source was opened, reply drafts for each deviation, and
   pattern candidates for the strike list. Never commit, never call it done.

Calls, never copies: context-mill (lookup, rollout, autolog), snippet-master, `scripts/lint-prose.mjs`,
`scripts/lint-mdx.mjs`, and `npm run check-links-diff`. Never invokes editor, writing-planner,
product-manager, review-assistant, or doc-author: they load rules that conflict with these.
Verification ends at `npm run check-links-diff`: never claim the site builds. Ask before a full build,
and only when the change touches a component or rendering code. Other writers run the shared linter,
the tracked hooks, the repo's skills, and its CLAUDE.md: before you change any of them, ask whether
the change is for this user only (personal lint rules: check 10).

## Modules

| Module | Job | Runs as |
|---|---|---|
| rw-research | `screen.md`, `facts.md` with a source per fact (also kept in each article's fact store), and `dev-questions.md`; takes a gap list and researches only those gaps | its own agent (`context: fork`) |
| rw-questions | The scope in one paragraph (gate 1), and the reader questions | its own agent (`context: fork`); gate 1 in this conversation |
| rw-plan | The heading tree from three outlines and a judge (gate 2) | main thread |
| rw-ripple | The other articles and screenshots the change makes wrong: prepares and counts every edit up front | its own agent (`context: fork`) |
| rw-draft | Writes the text into the approved tree, then the fit pass and the wording rounds | main thread or subagents |
| rw-edit | The fix protocol for one request | main thread |
| rw-comments | Mode R: fetch, normalize, sync check, grade, overview, batch, walk, close | main thread |

## Rounds

Read this before rounds: a whole draft, a whole article, a fix that costs 36 in your own draft, or a
review the user asks for. A full review (rounds over a whole article, a PR, or a branch) runs only for a
new article, or when the user asks for a review or to re-read the whole thing.

The cost to cut is the user's waiting time, not tokens: wherever work splits, run agents in parallel.

The passes: 1, structure and facts, is mode F up to gate 2 (rw-research, rw-questions, and rw-plan,
which holds the gate; rw-ripple follows the gate); 2, fit, and 3, wording, are in rw-draft. A cost 36
in your own draft: rw-plan.

- Report to the user once per pass, with the hand-off itself. An agent's report gets one line at
  most, and only when it changes what the writer sees next. Between tool calls, a status line only
  when a step runs long. Lint output, tool quirks, and bookkeeping (the strike list, facts, marks,
  agents) never appear in a reply.

## Session folder

Session files (strike list, frame, facts, reader and developer questions, saved checks) live in
`<docs repo>/_temp/<ticket ID>/` (gitignored), not in the scratchpad: a restart wipes `/tmp`. The
ticket ID comes from `RW_TICKET`, or from the current branch's `[A-Z]+-[0-9]+` key; without one, the
folder is `_temp/edits-<YYYY-MM-DD>/`. `RR_SESSIONS_DIR` overrides it, and `lib/tools/paths.py`
resolves it for every tool and hook. The load gate's stamps go in `<session id>/loads.json` inside it.
The snapshots (`applied/`), `hand-edits.md`, `ledger.md`, and `close-out.md` live there too ("Hand
edits and done marks").

## Hand edits and done marks

What counts as approved text, and what never gets reworded: lib/checks/11-approved.md. The tools are
in `lib/tools/`; run them from the docs repo root.

- **Snapshots.** Every apply (`apply_pairs.py`, with or without `--approved`) saves the new text of
  each changed file in `applied/`, with its path, hash, and time in `applied/index.json`. Before it
  replaces a snapshot, it syncs that file. The sync hooks do the same for an Edit, Write, or MultiEdit
  on a docs article: `pre-edit-sync.py` syncs the file before the edit, and `post-edit-snapshot.py`
  saves the snapshot after it. Change docs articles only through `apply_pairs.py` or the Edit and
  Write tools: an edit through Bash (sed, Python) skips both hooks, so sync logs it as the writer's.
- **Sync.** `load.sh --text <file>` runs `sync.py <file>` first, so sync runs before every proposal
  and every round. Sync compares the live file with its snapshot, unit by unit: a heading, a block
  between blank lines, a list item, or a table row (never the frontmatter or code). Each changed unit
  goes into `hand-edits.md` with the skill's version, the writer's version, and the sentences removed
  and added. Then sync replaces the snapshot with the live text, so it never logs an edit twice. When
  sync logs a unit, the output opens with "Hand edits since the last apply: N units in <file>".
- **Done marks.** A mark in `ledger.md` holds a unit, a section (from its heading to the next heading
  of the same or a higher level), or the whole article: its text, the date, a hash, and its source.
  `ledger.py done --from-pairs <pairs.json>` syncs each file in the pairs and marks the units the
  applied pairs changed, as the text reads now (`source: next-item`). A unit the writer edited by hand
  first gets the note "edited by hand before the mark". `ledger.py file-done <file>` syncs the file,
  refreshes every mark in it to the live text, and records the article mark (`source: file-done`).
  `ledger.py done <file> [--section "<heading text>"]` marks a section or the article by hand.
  `ledger.py status <file>` lists the file's marks. A hand edit inside a marked span updates the mark
  to the writer's text ("updated by hand").
- **Close-out.** `ledger.py close` fetches `origin/main` and compares the shipped text of each applied
  file with its last snapshot, unit by unit. It writes `close-out.md`: each changed unit, then the
  strike-list candidates, one line per change the writer made. It never edits the strike list.

Triggers:
- Before you present the next item in any list (a walkthrough item, a review comment, a ripple
  change), run `ledger.py done --from-pairs <pairs.json>` for the item just finished. An item with no
  applied pairs gets no mark.
- When the work moves on to the next file, or the writer says the file or the article is done, run
  `ledger.py file-done <file>` for the finished file.
- "This section is done" from the writer runs `ledger.py done <file> --section "<heading text>"`.
- "Apply" applies the pairs and saves the snapshot; it never creates a mark. The writer often edits
  the text after "apply", so the mark waits until the writer moves on.
- A merged PR runs `ledger.py close`. Show the writer the strike-list candidates from `close-out.md`;
  a candidate enters the strike list only when the writer says so.
- Hand edits are never "Also noticed" items.

## Hand-offs and approval

Steps 5-7 of rw-edit's protocol; every mode's hand-off follows them.

5. When the scope spans several files, open the hand-off with the change table, as printed: one row
   per file, the link to the file, and the line counts git diff would show (`+x -y`), most changed
   first, prepared ripple files included. Show it again between files, when the work moves on to the
   next one. An edit inside one file gets no table. Per change, four parts and nothing else: the link
   to the file and lines; the reason, one sentence of at most 25 words on what's broken; a `Live:` code
   block with the whole unit; a `Proposed:` code block. Then "Should I apply?", the reply's only
   question. No lint results, no notes on what the proposal reused or changed, no sources. A
   re-proposal of the same unit drops `Live:` when the file hasn't changed since the user saw it. The
   proposal is the final unit with every ripple (other lines and files it changes), so one "apply"
   covers all of it. A bare "good", "lgtm", "yes", or "ok" counts as apply;
   the same word followed by a comment on the change means "good, but": answer the comment, and don't
   apply. Nothing else counts as apply: a question about the proposal isn't approval, and neither is
   "let's start" or "one thing at a time".
6. One proposal is pending at a time. A new request while one is pending folds into it, and the report
   says so. A blanket approval ("apply everything from line 30") covers only what the user has seen:
   show any unseen draft first. Outside mode R (rw-comments formats its own), an overview lists the
   findings in article order, one line each, with no proposed text. Don't ask whether to start: the
   first proposal follows in the same reply, and each proposal's link line opens with "Change k of N".
   A pure anchor retarget or label rename is pre-approved: list it in one line and apply it (in mode R,
   it joins the batch). Show every change to what a sentence claims, however small.
7. Before you re-propose a unit, list every objection the user has made on it in this session, and
   check the new wording against each one. When the user reports a test result, ask what differed
   between the states they compared before you generalize from it.

Every reply:
- Links each file it names, applied edits and findings included, to the lines it means
  (`[file.mdx:148-163](<path>#L148-L163)`); the change table links whole files. Re-read the line
  numbers right before you send.
- Asks in plain text, wording options included. AskUserQuestion is only for a batch of different
  edits (rw-comments, "Batch and walk").
- Never states or implies that an article or task is finished: the writer decides that.
- Never advises when to merge, and states a dependency on unmerged work (which change, and its
  state) only when asked.

## Load

- Once per session, after each compaction, and after a skill change:
  `bash .claude/skills/recursive-writer/lib/load.sh --session` (this file).
- The checks before every reply with wording: lib/loop.md, "Load". `load.sh --loop` prints the loop.
