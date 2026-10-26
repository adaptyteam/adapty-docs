---
name: rw-plan
description: "Called by recursive-writer: the plan stage. Builds one heading tree from three outlines and a judge, and holds the heading-tree gate."
user-invocable: false
when_to_use: "Only when a running /recursive-writer session's manager calls for this stage. Never on your own initiative, and never outside a /recursive-writer session."
argument-hint: "[session folder] [the task or gap list]"
---

# rw-plan

Called by recursive-writer: mode F after gate 1; a structure request in mode E or R (that section
only); a structural scan on request; a cost-36 fix in your own draft.
- Runs as: main thread; the outline agents and the judge run `briefs/structure-pass.md`.
- In (session folder): `facts.md`, `screen.md`, `reader-questions.md`, `scope.md`, `frame.md`, the
  sibling articles, and the sidebar.
- Out (session folder): `outline-{a..c}.md` and `outline.md` (the heading tree, each section's
  promise, and the `act` questions each section answers). The user's approval of the tree is gate 2,
  which the manager records in `mode.md`.
- Loads: lib/preamble.md and lib/pass1-shared.md for the briefs, and `checks-all.txt`, with these in
  particular: lib/checks/L4-article.md, L3-section.md (the section ladder), lists.md (the form
  ladder), headings.md, misconception.md, and definitions.md. Openers: L4-article.md (the article
  opener and the description), with misconception.md, definitions.md, L2-paragraph.md, and
  L1-sentence.md. `lib/` is `.claude/skills/recursive-writer/lib/`.

## Pass 1 and the heading-tree gate

1. **Structure and facts**: the stages run in mode F's order (recursive-writer/SKILL.md, "Modes");
   here, three outline agents and then a judge merge one heading tree (`briefs/structure-pass.md`). The
   user approves the heading tree before pass 2, in the form below: each heading on its own line,
   and under it, one line per reader question that the section answers. Under the title go the
   questions the intro answers. The questions are the `act` questions in `reader-questions.md`, each
   under the heading that is its home. Nothing else goes in the hand-off.

   ```
   # Title
   {question the intro answers}
   ## H2
   {question the section answers}
   {another question the section answers}
   ### H3
   {question the section answers}
   ```

   Its headings pass the review loop (lib/loop.md) before the user sees them; lint alone isn't a
   pass. A rejected tree gets the lowest-cost fix the objection names: a naming objection renames the
   heading, and an order or grouping objection re-cuts the tree. Either way, remap every question to
   the new tree, and show the whole tree again in the same form.

   The gate holds when the user asks
   for a finished draft: a heading tree isn't a draft, and you never approve it yourself. Existing
   anchors are no reason to keep a heading: retargeting links is mechanical.

## Verbs and headings

Step verbs come from the UI (`screen.md`). Headings come from the screen's regions and the reader's
goals (`scope.md`). Pick one reader-facing verb per action and use it throughout; replace a verb that a
reader could take for the label of a control on the page.

## Owners

Place each fact in the article that owns its topic: see lib/checks/L4-article.md.

## A structural scan on request

A structural scan on request: findings in article order, then the resulting heading tree (its headings
pass the checks first). On approval, rebuild and run the passes.

## Cost 36 in your own unseen draft

Have 2-3 subagents each outline the fix on a different principle; pick the outline that passes the
level checks with the fewest flags, and apply it.
