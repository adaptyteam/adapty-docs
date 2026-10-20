# Structure pass brief (pass 1): outlines and judge

Each agent's prompt: lib/preamble.md, the shared part (lib/pass1-shared.md, filled in), and its own
step below. The other pass-1 steps are in rw-research (the screen inventory and the facts),
rw-questions (the scope and the reader questions), and rw-ripple (ripple inventory).

## Outlines (three agents, in parallel)

- **Outlines** (three agents, each on a different cut):
  - (a) the screen's regions as reference sections, in the order of `screen.md`, then one section per
    goal in `scope.md`;
  - (b) one section per goal, with the reference each goal needs inside it;
  - (c) the section kinds the closest siblings use for the same kind of feature (tasks, reference,
    limitations).

  Build H2s and H3s only. The form of each unit (paragraph, list, table, or steps) is decided while
  drafting.
  - A goal section runs from where the reader starts to what they see at the end, then to the goal's
    next step (`reader-questions.md`): in the same section, or in a section of its own.
  - A reference section covers one screen object and takes its UI name.
  - A fact every section depends on (scope, coverage, what's on by default) is one clause in the
    intro, never a section.
  - For each section: its promise in one line, the `act` questions it answers, and, for existing text,
    the line numbers it takes. Name the article that owns each section's topic (`L4`).
  - Then check coverage: every `act` question falls in a section, and no `see` or `edge` question
    does. An `act` question that fits no section is a cut candidate: list it.
  - `L4` sets the article's order and sibling count, keeps one task in one section, and keeps one
    control's options in one list.
  - Length: compare the outline with the sibling articles. An article much longer than its longest
    sibling needs a reason the user would accept.
  - Limitations: what the product can't do in any case and a reader would plausibly try, each with its
    cause. One section at the end, unless the limit changes a step. Not what the product never
    promised, and not what nobody would ask.
  - Troubleshooting: only symptoms a reader hits in normal use, each with a fix they can apply.

  Note the runner-up choice at each level, with one line on why it lost.

## Judge (one agent)

Score each outline on fit first:
- The sections follow the screen's order (`screen.md`) or the reader's goals (`scope.md`).
- Every reference heading names one screen object.
- No heading names a UI operation without the outcome it serves.
- No section holds only a fact the intro could hold in a clause.
- Every goal ends at what the reader sees or at its next step; a goal that stops at "you found it"
  fails.

Then score linearity and scannability, as the level checks, `headings`, and `lists` define them. Short
or parallel wording only breaks ties. Reject an outline that leaves an `act` question without a place,
or places a `see` or `edge` question. Merge the best parts into one heading tree, with one line per
choice on why it beats the alternatives.

Output: `outline.md`: the heading tree with each section's promise and the `act` questions it answers,
in the gate-2 form (rw-plan, "Pass 1 and the heading-tree gate"), then the cut candidates. Never mark
the tree approved: the user approves it. Final reply: ONE line with the path.
