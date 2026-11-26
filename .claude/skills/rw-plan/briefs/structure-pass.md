# Structure pass brief (pass 1): outlines and judge

Each agent's prompt: lib/preamble.md, the shared part (lib/pass1-shared.md, filled in), and its own
step below. The other pass-1 steps are in rw-research (the screen inventory and the facts),
rw-questions (the scope and the reader questions), and rw-ripple (ripple inventory).

## Outlines (three agents, in parallel)

- **Outlines** (three agents, each on a different cut):
  - (a) one reference section per region of the screen the article is about, in the order of
    `screen.md`, then one section per goal in `scope.md`;
  - (b) one section per goal, with the reference each goal needs inside it;
  - (c) the section kinds the closest siblings use for the same kind of feature (tasks, reference,
    limitations).

  Build H2s and H3s only. The form of each unit (paragraph, list, table, or steps) is decided while
  drafting.
  - A goal section runs from where the reader starts to what they see at the end, then to the goal's
    next step (`reader-questions.md`): in the same section, or in a section of its own.
  - A reference section covers one region of the screen the article is about. Its heading is the UI
    name of that region. A control on another screen that opens the same data (an icon, a marker, a
    link) becomes a step in the section of the goal it serves, or an H3 there, named after what the
    reader is working on.
  - A fact every section depends on (scope, coverage, what's on by default) is one clause in the
    intro, never a section.
  - For each section: its path line (what the reader does there, starting from where the previous
    section leaves them; for a branch, from its condition: "If …"), the `act` questions it answers,
    and, for existing text, the line numbers it takes. Name the article that owns each section's topic
    (`L4`). The article has a path line too: who arrives, with what goal, and where the article leaves
    them. When readers arrive with different goals, the article's path line names each goal, most
    common first. The sections for those goals come in the same order. Every path line is one
    sentence of at most 20 words.
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
- Every reference heading names one region of the screen the article is about. A heading that names a
  control on another screen fails.
- No heading names a UI operation without the outcome it serves.
- No section holds only a fact the intro could hold in a clause.
- Every goal ends at what the reader sees or at its next step; a goal that stops at "you found it"
  fails.
- Each section's path line starts where the previous one ends, or starts with "If …" for a branch. A
  continuing section fails when its first step would work as the article's opening.
- Sections for different goals come in the order in which the article's path line names those goals.
- No heading, path line, or question uses a term found only in the session folder (`07`).

Then score linearity and scannability, as the level checks, `headings`, and `lists` define them. Short
or parallel wording only breaks ties. Reject an outline that leaves an `act` question without a place,
or places a `see` or `edge` question. Merge the best parts into one heading tree, with one line per
choice on why it beats the alternatives.

Output: `outline.md`: the heading tree with each section's path line and the `act` questions it answers,
in the gate-2 form (rw-plan, "Pass 1 and the heading-tree gate"), then the cut candidates. Every path
line is one sentence of at most 20 words. Never mark the tree approved: the user approves it. Final
reply: ONE line with the path.
