---
name: rw-draft
description: "Called by recursive-writer: the draft stage. Writes the text into the approved heading tree one sentence at a time, then runs the fit pass and the wording rounds."
user-invocable: false
when_to_use: "Only when a running /recursive-writer session's manager calls for this stage. Never on your own initiative, and never outside a /recursive-writer session."
argument-hint: "[session folder] [the task or gap list]"
---

# rw-draft

Called by recursive-writer: mode F after gate 2 and rw-ripple, a new article or section, and the
rounds of a review the user asks for ("Rounds").
- Runs as: main thread; the fit agents run `briefs/fit-pass.md`, the round agents
  `briefs/review-round.md`.
- In (session folder): `outline.md`, `facts.md`, `reader-questions.md`, `frame.md`, `ripple.md`,
  `strike-list.md`, `checks-all.txt`, `hand-edits.md`, and `ledger.md`.
- Out: the MDX on the task branch; per round, in the session folder, `w{N}-brief.md`,
  `w{N}-{x}-log.md`, `w{N}-{x}-pairs.json`, `w{N}-all-pairs.json`, `w{N}-delta.md`, and `snap-w{N}/`.
- Loads: lib/loop.md; `load.sh all`, saved once as `checks-all.txt`; lib/preamble.md for the briefs.
  `lib/` is `.claude/skills/recursive-writer/lib/`.

## Writing

- Writing: load before drafting (`all` for a new article or section). Draft one sentence at a time:
  check each sentence before you write the next, and run L2 after each paragraph.
- Write a new article at its real path under `src/content/docs/`, on the task branch; `_temp/` holds
  only working files. On a branch unrelated to the task, ask where to write it.
- Before you write or rewrite a passage that chains actions and outcomes across actors, write it in
  `log.md` in the ticket folder as lettered steps, each with its actor and its source. A step that
  contradicts its source goes to the user, with the evidence, before any wording.
- Screenshots the user captured for the article: rename them `<feature>-<screen>.webp`, convert them
  to WebP, put them in `src/assets/shared/img/`, and propose the `ZoomImage` tags. Point out anything
  in a shot that the text contradicts, without blocking on it. Screenshots shared for verification
  stay reference material. When it's unclear which kind a batch is, ask in one line.

## Passes 2 and 3

2. **Fit** (`briefs/fit-pass.md`): one agent per file, reading the whole file, makes the content fit
   the approved structure. Moves, splits, merges, and cuts; no wording polish.
3. **Wording, and every round after it** (`briefs/review-round.md`): 5-7 agents per file, each on its
   own line range. Follow-up rounds cover the changed units and their neighbors, split by range too
   when the delta is large. Stop when a round changes nothing, or at a round cap the user sets: apply
   the last round's pairs, present, and put its open flags in `open-items.md` in the ticket folder; the
   hand-off names their count and, as "Also noticed", at most one that makes the text wrong for the reader.

## Running a round

- The main agent writes the frame once (`frame.md`) and saves `load.sh all` once (`checks-all.txt`).
  Every agent reads both and the strike list, and gets the writer's hand-edited and done spans in its
  range through the brief's "Never change" slot; no agent re-derives the frame or reloads the checks.
- Before each round, sync each file: `load.sh --text <file>`, or `python3 lib/tools/sync.py <file>...`
  for the same sync without the checks. The "Never change" slot then quotes the latest hand edits.
- One shared brief file per round; each agent's prompt adds only its range and output paths. Relay a
  note about another agent's range to that agent (SendMessage) while it runs.
- Snapshot the files before each round. Apply the pairs with
  `python3 .claude/skills/recursive-writer/lib/tools/apply_pairs.py <pairs.json>`. Write the delta with each changed
  unit's old and new text, so the next round can check what a cut left behind (02).
- When a round fixes a consistency problem across units (a term, a phrasing), add the pattern to the
  strike list, so later rounds check for it too.
