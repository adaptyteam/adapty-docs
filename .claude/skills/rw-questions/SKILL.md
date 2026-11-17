---
name: rw-questions
description: "Called by recursive-writer: the questions stage. Writes the scope paragraph for gate 1 and the reader questions, tagged act, see, edge, or owner, with a place for each act question."
user-invocable: false
when_to_use: "Only when a running /recursive-writer session's manager calls for this stage. Never on your own initiative, and never outside a /recursive-writer session."
argument-hint: "[session folder] [the task or gap list]"
context: fork
agent: general-purpose
---

# rw-questions

Called by recursive-writer: mode F after rw-research, and new content in modes E and R.
- Runs as: its own agent (`context: fork`), which the manager starts with the Skill tool, passing the
  session folder and the ticket. It reads lib/preamble.md and lib/pass1-shared.md itself. The manager
  then shows the scope paragraph at gate 1, in the main conversation.
- In (session folder): `facts.md`, `screen.md`, `frame.md`, the ticket, and the sibling articles
  (lib/pass1-shared.md).
- Out (session folder): `scope.md` (gate 1) and `reader-questions.md`. A "needs a fact" line goes to
  the manager, which relaunches rw-research on that gap.
- Loads: lib/preamble.md, lib/pass1-shared.md, and `checks-all.txt`. `lib/` is
  `.claude/skills/recursive-writer/lib/`.

## Scope (gate 1)

Write `scope.md`: one paragraph of at most 120 words, from `facts.md`, `screen.md`, and the ticket. It
says who the article is for, the 2-4 goals the reader comes with, what the article covers, what it
leaves to other articles, and how big the change is (the number of new articles and of ripple files).
Write each goal as the reader's situation, what they want to find out or change, and what they get at
the end, never the route to it (no sidebar, menu, tab, button, or icon). File names, parked facts, and
other detail go below the paragraph. The manager shows only the paragraph at gate 1, before rw-plan runs.

Read the ticket literally, and open every article it names as a model: those words and models define
the deliverable. Quote the ticket's operative words in the scope paragraph; below the paragraph, map
each one to the part of the scope that covers it. A zone brief's scope rule or a reviewer's challenge never narrows the
scope silently: name the conflict and ask. A researched fact with no place goes to a parked list in
`scope.md`, below the paragraph, with a proposed home; gate 1 shows only the paragraph.

## Reader questions (one agent)

Brainstorm per goal and per screen region, from `scope.md` and `screen.md`: for each goal, what the
reader must know or decide to reach its end state; for each region, what the reader must know there.
For each goal, also ask about its next step: what the reader does with what they found (undo it, ask
whoever made it, change a setting). When the screen offers no control for that next step, the question
is still `act`: the article says so and gives the manual route, or says the step isn't possible.

Then tag each question by what the article owes the reader:
- `act`: the reader can't act or conclude correctly without the answer, and the screen doesn't show
  it. Only these get a place in the article.
- `see`: the UI answers it the moment the reader looks or acts: navigation, defaults, and the
  conditions and limits the UI states.
- `edge`: most readers never hit it.
- `owner`: another article owns it; this one links there where the reader needs it. When this
  article's own task runs into it, it's also `act`: one line where the reader hits it, with the link.

Map each `act` question: answered here (section, line); missing (where it would go); needs a fact. List
the `see` and `edge` questions under "Left out", one line each with the reason, for the user to overrule.
Then tag each fact in `facts.md` with the `act` question it answers, or `ref` when it answers none.
Only `act` facts reach the text. `ref` facts stay in `facts.md` and the article's fact store
(rw-research), for verification and later tasks.
Output: `reader-questions.md`.
