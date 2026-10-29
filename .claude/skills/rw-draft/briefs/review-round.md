# Review round brief (for a subagent)

Fill in the brackets and pass this as the subagent's prompt. For parallel agents, save the shared part
as one brief file and give each agent only its range and output paths.

You run review round [N] of the recursive-writer skill. [The preamble: the text of lib/preamble.md.]

1. Load the checks: [first wording round: read the saved `load.sh all` output, [checks-all.txt]; later
   rounds: `bash .claude/skills/recursive-writer/lib/load.sh --loop --text <delta file> --change`]. Read it in
   full.
2. Strike list for this session: [path, or "none"]. Every pattern on it is a defect.
3. Frame: [path to frame.md]. Use it as given; don't re-derive it from the articles.
4. Facts: [path to facts.md]. Treat it as settled: don't open source code or other docs to verify a
   claim, and skip the spec-vs-behavior check. A claim that facts.md doesn't cover gets one "needs a
   fact" line in the log, with no pair and no rewrite around it.
5. Scope: [file, and your line range, or "everything" for a single agent; in later rounds, the units in
   [delta file] plus the units around them]. Read the lines around your range for context, but write
   pairs only inside it; log a problem outside it as one line. Where a change adds to an existing unit,
   the whole unit is in scope for L3 organization and budget. Read pages with reusable snippets
   rendered in place.
6. Never change: [the user's manual edits and dictated text in scope, with the writer's hand-edited
   and done spans (from `hand-edits.md` and `ledger.md`), quoted, or "none"]. These stay exactly as
   they are, even when a check flags them; report the flag in the log instead.
7. Alternatives: [units that need N structurally different alternatives, or "none"]. Write them in
   the log as proposals, not as pairs.
8. Out of scope: [lines that don't ship, such as internal "Reason:" notes, or "none"]. Don't check
   or change them.
9. Run the loop from lib/loop.md on every sentence in scope: route, check, fix at the lowest cost,
   re-check the fix, repeat until clean. A fix that deletes words gets the same 02 check on what's left
   as an insertion. Never change the user's verbatim or approved wording without a reader problem
   (change-justification).
10. Write:
   - [pairs file].json: `[{"file": abs path, "old": exact current text, "new": replacement}]`. Each
     "old" must be unique in its file: include enough context. Check them with
     `python3 .claude/skills/recursive-writer/lib/tools/apply_pairs.py <pairs file> --dry-run --lint`.
   - [log file].md, in shorthand. Line numbers are the file's; a table row or list item is one line.
     - `L12 ok`: every routed check passed on every sentence of line 12.
     - A line with a flag gets one entry per sentence: `L14S1 ok`, then
       `L14S2 01: "it" points to "the panel", not "the flow" → pair 3`. Evidence only for flags: the
       check id, the words that settle it, the problem, the pair or proposal number.
     - `L15 needs a fact: <the claim>`; `L40 outside range: <one line>`.
     - Then, separately, every problem that needs a cost-6 or cost-36 fix, as a proposal with
       alternatives (not as pairs).
11. Final reply: ONE line with the number of pairs, the number of proposals, and both paths.
