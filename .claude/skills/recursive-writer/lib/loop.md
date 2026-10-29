# The review loop

Called by rw-edit, rw-draft (and its round briefs), and rw-comments. `load.sh` and `tools/` are in
this folder, `.claude/skills/recursive-writer/lib/`; `load.sh --loop` prints this file.

## Load

- Before every reply with wording: `load.sh --text <file[:start-end]|-> [--change] [--opener]
  [--draft] [--strike "<pattern>"]`. It prints the always-on checks, the checks the text triggers,
  and the strike list. A regex can't see three triggers, so pass them as flags: `--change` for
  existing or approved text, `--opener` for an article or section opener, `--draft` for a claim
  drafted from research.

Never apply a check from memory. Re-route after every rewrite; when unsure whether a trigger applies,
load it.

## Loop

0. Lint first. Text in a file: from the docs repo root, run the shared rules (`node
   scripts/lint-prose.mjs --full <file>`) and the user's own (`node
   .claude/skills/recursive-writer/lib/tools/lint-personal.mjs --full <file>`). Text in the chat:
   `.claude/skills/recursive-writer/lib/tools/lint-text.sh`. Each hit is a candidate for check 10.
1. Check outside-in: the frame check, the loaded L4 and L3, L2, L1, then the loaded numbered and named
   checks. In a fix, every loaded check judges what you changed, in its sentence; the rest of that
   sentence and the sentences around it get only 01, L2, and the frame check. In writing and review,
   every sentence gets every loaded check. Write each check's evidence under its id. No evidence: it
   didn't run. Evidence quotes the words in the text that settle it; what you know the writer meant
   doesn't count. No quote: the check fails. Round logs use the shorthand in rw-draft's `briefs/review-round.md`:
   `L<n> ok` certifies that every routed check ran; only flags carry evidence.
2. Fix each flag at the lowest cost: sentence 1, paragraph 2, section 6, article 36. A fix costs its
   largest changed unit. Try cost 1 first; escalate to 2 only when 1 fails, and log why. The fix
   must raise no new flag at any level. Cost ranks fixes that solve the problem equally well: for a
   flag about order (introduce before use, section order), try the move first, and compare it with
   any patch that leaves the order alone.
3. Fix through, not around: the rewrite removes or replaces the exact flagged phrase. Re-check the
   rewrite and the units around it, quoting the flagged phrase to confirm it's gone; repeat until a
   pass flags nothing.

- When two checks pull in opposite directions, linearity (L2: each sentence follows from the one
  before, cause before consequence) and the reader's goal (start from what the reader wants, does,
  or sees, not from system internals) win.
- A sentence that fails 00, or only patches its neighbor: fix the neighbor first, then check whether
  the patch is still needed.
- The first proposal for a unit is your own best choice. After the user's first correction or
  rejection, the next proposal applies that correction in 3 or more structurally different options.
  A second rejection: rebuild the whole unit (its paragraph or section), then offer 3 or more options
  again. Wording the user dictates gets applied as dictated, without options. A hand edit of the unit
  counts as a rejection; a procedure, list, or section counts as one unit.
- Cost 6 or 36: in the user's or published text, propose it with alternatives. In your own unseen
  draft, fix a cost 6 here; for a cost 36, follow rw-plan ("Cost 36 in your own unseen draft").
- Published text: a fix that costs 2 or more needs a correctness reason. Your own draft isn't
  published or existing text.
- Several options in one reply: each passes the loop on its own, and they differ in structure, not in
  swapped words.

## Strike list

Each pattern the user corrects goes into `strike-list.md` in the session folder
(recursive-writer/SKILL.md, "Session folder"; `--strike` adds it). Check every later sentence
against it. Don't fix other hits on your own: search every file the change touches (`git diff
--name-only` and new files), not only the current one, list the hits with file and line, and fix them
only when the user says so. Show the list at session end; it enters the
skill only if the user says so. Propose a pattern for the skill only when its cause recurs in a second
unrelated task, or the user calls it general. Write the rule as the cause, not the phrase, and test it
on a past task it didn't come from.

## Output

Show only what the last round left unchanged, and never re-word it when presenting or applying it:
apply the approved change with the same pairs file (`apply_pairs.py <pairs.json> --approved`).
Rounds apply their own pairs without the flag. Every apply saves a snapshot of each changed file,
which sync compares with the live file; a merged PR runs `ledger.py close` (recursive-writer/SKILL.md,
"Hand edits and done marks").
