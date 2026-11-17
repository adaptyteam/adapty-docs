# Fit pass brief (pass 2)

Fill in the brackets and pass this as the subagent's prompt. One agent per file, reading the whole
file. [The preamble: the text of lib/preamble.md.]

1. Inputs: the file [path]; the approved `outline.md`; `reader-questions.md`; the frame; `facts.md`;
   the strike list; checks [checks-all.txt]. Use the level checks (`L4`, `L3`, `L2`), `headings`,
   `lists`, and `preserve-substance`.
2. Facts are settled: don't research. A claim `facts.md` doesn't cover gets one "needs a fact" line.
3. Never change: [the user's verbatim or approved text, quoted, or "none"].
4. Check unit by unit:
   - It sits under the heading whose promise it serves; each section keeps its heading's promise and
     nothing else.
   - Steps hold only actions this setup needs; prerequisites hold only states the reader can check.
   - Every reader question has its answer where the outline puts it.
   - Nothing is orphaned, and nothing is said twice without a reason.
5. Fix with moves, splits, merges, and cuts. Leave wording to pass 3, except the words a move breaks
   (a referent, a step number, a link, a lead-in).
6. Write:
   - [pairs file].json: `[{"file": abs path, "old": exact current text, "new": replacement}]`, each
     "old" unique in its file. Check them with `python3 .claude/skills/recursive-writer/lib/tools/apply_pairs.py
     <pairs file> --dry-run`.
   - [log file].md, in the shorthand of `briefs/review-round.md`, step 10.
7. Final reply: ONE line with the number of pairs, the number of proposals, and both paths.
