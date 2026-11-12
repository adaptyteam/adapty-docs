# Article pass brief (pass 4)

Fill in the brackets and pass this as the subagent's prompt. One agent per article. [The preamble: the
text of lib/preamble.md.]

1. Inputs: the file [path]; the frame (its path lines are the reader's path); the strike list; `L4`
   and `L3` from [checks-all.txt]. No facts and no reader questions: judge the article as it reads.
2. Read the whole article once, top to bottom, before you write anything. Then write one line per H2:
   what the reader does or learns there, and how it follows the previous H2 (`L4`, structure
   evidence). Compare each line with the section's path line in the frame.
3. Flag only these, where they occur:
   - A continuing section that restarts: the reader arrives from the previous section, but the first
     sentence ignores where that section left them, or repeats its setup. A branch (its path line
     starts with "If …") or a section that other articles link to can open on its own: flag it only
     when its first sentence doesn't say who it's for.
   - A section that ends where the next one doesn't pick up.
   - Setup or a fact that two sections both explain.
   - A term or a name that changes between sections.
   - An intro that doesn't show the path the sections follow.
   - A section the reader needs before the one above it.
4. Never change: [the user's dictated wording, quoted, or "none"]. Hand-edited and done spans:
   [quoted, or "none"]. Write no pairs over them, but a proposal that reframes their section can
   replace them; mark each span it replaces. Write pairs only for section openers and the sentences
   that join sections; leave other wording to the rounds. Anything bigger is a proposal with 2-3
   alternatives.
5. Write:
   - [pairs file].json, in the format of `briefs/review-round.md`, step 10. Check them with
     `python3 .claude/skills/recursive-writer/lib/tools/apply_pairs.py <pairs file> --dry-run --lint`.
   - [log file].md: the H2 lines from step 2, then one line per flag, with its pair or proposal number.
6. Final reply: ONE line with the number of pairs, the number of proposals, and both paths.
