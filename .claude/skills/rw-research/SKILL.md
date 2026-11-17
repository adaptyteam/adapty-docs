---
name: rw-research
description: "Called by recursive-writer: the facts stage. Writes the screen inventory, researches only the gaps, records each settled fact with its source in facts.md, and puts what it can't settle in dev-questions.md."
user-invocable: false
when_to_use: "Only when a running /recursive-writer session's manager calls for this stage. Never on your own initiative, and never outside a /recursive-writer session."
argument-hint: "[session folder] [the task or gap list]"
context: fork
agent: general-purpose
---

# rw-research

Called by recursive-writer: mode F (the first stage, and again for each gap rw-questions finds), a
fact request in mode E, and the one fact batch in mode R.
- Runs as: its own agent (`context: fork`), which the manager starts with the Skill tool, passing the
  session folder and the task or gap list. It reads lib/preamble.md and lib/pass1-shared.md itself, and
  may split the work into subagents, one per question group.
- In: the ticket, the MR or diff, `facts.md`, and the gap list when rw-questions relaunches research.
- Out (session folder): `screen.md`, `facts.md`, and `dev-questions.md`.
- Loads: lib/preamble.md, lib/pass1-shared.md, and `checks-all.txt`, with these in particular:
  lib/checks/spec-vs-behavior.md (every claim about product behavior), 07-terms.md (grep the frontend
  before bolding a label), 05-claims.md (the edge cases to test), L4-article.md (the article that owns
  a mechanism), and lib/reference/domain-rules.md. `lib/` is
  `.claude/skills/recursive-writer/lib/`.

## Screen inventory (first)

Before the facts, the agent that covers the UI writes `screen.md`: the screen's regions and objects in
the order the reader sees them, top to bottom, by their UI names, taken from the frontend or a
screenshot. One line each. For a feature that spans several screens or windows, one block per screen,
in the order the reader opens them. rw-questions brainstorms per region, and rw-plan builds the tree
from it.

## Facts, once

Pass 1 owns verification. Before any research, search the ticket's `facts.md` and the fact store of
every article in scope (`<repo>/_temp/facts/<article slug>.md`): research only the gaps, split by
question, never by repository, and record each fact with its source as soon as it's settled.

Every settled fact goes into the ticket's `facts.md` and into the store of each article it concerns,
with the date, its source, and the ticket ID. A fact cut from the page stays in both. A stored fact is
reused without new research. Re-check it only when it will go on the page and its source has changed
since the date it records (for code: `git log` on the cited file since that date). After pass
1, nothing re-verifies a fact in `facts.md`. A claim it doesn't cover gets one "needs a fact" line; the
main agent collects these in `dev-questions.md`, closes what research can between rounds (in one batch,
then updates `facts.md`), and gives the rest to the user once, in the final hand-off, as one line
with the count and the path.

## Facts

- **Facts** (one agent per question group, never per repository): answer the missing questions, and
  check every claim in the text against the sources. Search `facts.md` and the article stores first,
  and research only the gaps. Record each settled fact with its source in `facts.md` and the article
  stores; put what you can't settle in `dev-questions.md`.
  - A control the article will document: follow it end to end, from the frontend call through the
    backend route to an implemented handler. A stub (a 501, a TODO, an empty list) is a fact: record
    it, and don't document the control as working.
  - Before you record a side effect, search the docs for the article that owns that mechanism (`L4`)
    and use its facts.
  - A claim about what a third-party tool does with forwarded data (aggregates, deduplicates, or
    reports it) needs that tool's own documentation or a test: event names and Adapty's code settle
    only the Adapty side. Verify each part of a compound claim, or cut the part you can't verify.
  - Name an icon from its SVG or a screenshot, never from its file name.
  - A scenario the text puts to the reader is a claim: check that the product allows it ("if you publish
    a broken flow" fails when publishing blocks broken flows).
  - Release state: start as if the feature is unreleased, and never gate research or drafting on
    whether it shipped. When release state is the question, confirm it in code: a ticket status, a
    chat announcement, or a wiki page is a claim, not proof. Scan the recently merged changes rather
    than titles that name the feature, and find the change on the production branch. When a team
    brief contradicts production, document production. A readiness report separates what code
    confirms, what only a document claims, and what you can't verify.
