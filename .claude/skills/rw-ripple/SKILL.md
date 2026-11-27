---
name: rw-ripple
description: "Called by recursive-writer: the ripple stage. Finds every published sentence or screenshot the change makes wrong, in any article, and prepares and counts each edit up front."
user-invocable: false
when_to_use: "Only when a running /recursive-writer session's manager calls for this stage. Never on your own initiative, and never outside a /recursive-writer session."
argument-hint: "[session folder] [the task or gap list]"
context: fork
agent: general-purpose
---

# rw-ripple

Called by recursive-writer: mode F after gate 2, mode E after the primary file, and mode R when a
comment touches other articles.
- Runs as: its own agent (`context: fork`), which the manager starts with the Skill tool, passing the
  session folder and the diff. It reads lib/preamble.md and lib/pass1-shared.md itself.
- In: the diff, `facts.md`, `outline.md`, and the screenshots.
- Out (session folder): `ripple.md` (each hit: file and line, or the image) and `ripple-pairs.json`,
  whose files become rows in the change table. The edits wait for the primary article.
- Loads: lib/preamble.md, lib/pass1-shared.md, and `checks-all.txt`, with lib/checks/L4-article.md
  (one owner per fact), L3-section.md, and preserve-substance.md. `lib/` is
  `.claude/skills/recursive-writer/lib/`.

## Scope

Ripple scope comes from what the change does, not from the ticket's topic. List every user-visible
change in the diff (labels, dialogs, menus, defaults, behavior) and search the docs and the screenshots
for each. Every published sentence or screenshot the change makes wrong is in scope; the ticket only
limits what the primary article covers. A scope decision never drops such a hit: list it for the user.

## Ripple inventory

- **Ripple inventory** (one agent): list every user-visible change in the diff (labels, dialogs, menus,
  defaults, behavior), not only the ticket's topic. Search the docs and the screenshots for each, and
  record every hit (file and line, or image). Every hit is in scope ("Scope" above). A hit in an
  article about a deprecated feature, such as a deprecated builder, gets a "no change: deprecated" row
  and no pair, unless the task targets that article.

## Ripple articles

- In ripple articles, a round checks the whole unit around each change (L3 organization and budget),
  not only the changed lines.
