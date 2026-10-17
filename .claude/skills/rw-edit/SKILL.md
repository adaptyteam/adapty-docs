---
name: rw-edit
description: "Called by recursive-writer: the fix protocol for one request (a problem the user points out, a fix, or options for up to one section), from the restated complaint to the pairs and the change table."
user-invocable: false
when_to_use: "Only when a running /recursive-writer session's manager calls for this stage. Never on your own initiative, and never outside a /recursive-writer session."
argument-hint: "[session folder] [the task or gap list]"
---

# rw-edit

Called by recursive-writer: mode E (step 5), each walk item in mode R, and any fix up to one section.
- Runs as: main thread.
- In: the request; the sync summary line, the live lines, and the strike list (all printed by
  `load.sh --text`); the file's entries in `hand-edits.md` and its done marks in `ledger.md`;
  `facts.md` for a fact.
- Out: `pairs.json` in the scratchpad and the change table (step 4). The proposal goes out through
  steps 5-7 in recursive-writer/SKILL.md, "Hand-offs and approval".
- Loads: lib/loop.md (`load.sh --loop`) and `load.sh --text`. `lib/` is
  `.claude/skills/recursive-writer/lib/`.

## A problem the user points out

1. Restate it in one line from the user's words, and name the check it belongs to, in `log.md` in the
   ticket folder. A question, not a complaint, gets its answer in the reply's first sentence, in three
   sentences at most: no evidence list, no offer to propose.

   **Map the side effects before you draft.** Ask what the fix will do beyond the commented words,
   and write the answer in `log.md`:
   - A promise: the fix shifts what a section, a heading, or the intro says it covers. Re-read the
     sections around it and the intro, as the reader will read them after the fix.
   - A split, merge, or move: the text that will now repeat, the lead-ins and transitions that lose
     their target, and the parent that should hold what both children would say.
   - A term, label, or name: every other place in the article, and in its ripple articles, that uses it.
   - A fact or a limit: every place that restates it or relies on it.
   - An order: what the reader will know at the start of each later section.

   Draft the fix and its side effects as one proposal, so one "apply" leaves the article whole. A side
   effect that needs a structural decision goes into the options.
2. Before drafting, one call: `bash .claude/skills/recursive-writer/lib/load.sh --text <file>:<start>-<end>
   --change --strike "<the pattern>"`. It prints the live lines, adds the pattern to the strike
   list, and loads the checks. For text that exists only in the chat, pipe it in with `--text -` and
   drop `--change`. Make another call only to look up a fact (`facts.md` first) or a UI label.
3. Fix through it at the lowest cost (lib/loop.md, "Loop"):
   a. **Default.** Change only the words the complaint is about, plus what that change breaks (a
      referent, agreement, a repeated word). The rest of the sentence stays as it is.
   b. **Rewrite a sentence only when** no word-level change meets the complaint, or the word-level
      change fails a check. Log which of the two applied.
   c. **Added content.** When the complaint calls for a new sentence, step, or piece of advice, put it where it
      belongs in the section, not automatically next to the commented words. An item in a list of options
      never tells the reader to use another option from the same list: that advice goes outside the list,
      as a tip before it or a sentence after it. Content that makes its unit longer gets L3's
      organization and budget on the whole unit: reshape it (a list, a split, a tip) instead of
      appending. Owner placement and moves: see lib/checks/L4-article.md.
   d. **The reviewer's wording is a hint, not the fix.** When following it literally would mislead or
      harm the reader (for example, publishing a draft only to keep it), meet the complaint's goal
      another way; the one-sentence reason says why.
   e. **Check every changed sentence** for: a phrase that reads as an instrument ("Open a placement with
      the flow"), a relation verb that misstates how two entities connect ("a placement includes the
      flow"), a sequence word without its second step ("first select …" with no "then"), and one phrase
      that covers two objects ("duplicate before you restore").
      A quick list: the rules live in lib/checks/02-one-reading.md, 01-referents.md, and
      lib/reference/product-terms.md.
   f. **Re-read the whole section before you propose.** Every side effect from step 1 is handled in
      the proposal, and `--lint`'s "Side effects" list is empty or answered. Look in particular for structure: steps that
      several routes share but only one route owns, parallel units in different forms, content in a
      unit where it doesn't belong. At most one problem the complaint doesn't cover goes under the
      proposal as "Also noticed:", in one line, and only a defect that makes the text wrong for the
      reader. Never a fact the text could add, a hand edit, an item the user passed over, or one you'd
      recommend skipping. The rest go to `open-items.md` in the ticket folder, shown when the user asks
      what's left. An "Also noticed" item gets fixed only when the user says so.
   Evidence: the complaint's words, then every word the proposal changes; each change outside the
   complaint names what broke without it. All evidence goes in `log.md`, none in the reply.
4. Write the proposal as pairs (`pairs.json` in the scratchpad), and run `python3
   .claude/skills/recursive-writer/lib/tools/apply_pairs.py <pairs.json> --stat --lint` from the docs repo root.
   It lints the new text and prints the change table for step 5.

Steps 5-7 (the hand-off, one pending proposal, the objections): recursive-writer/SKILL.md, "Hand-offs
and approval". Before you re-propose a unit, the list of objections on it (step 7) includes the unit's
entries in `hand-edits.md`: each entry is the writer's objection to the skill's version.
