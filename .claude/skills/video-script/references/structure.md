# script.md Structure

**These are conventions, not rules.** Consistency helps whoever reads the file next, but none of it
affects the finished video — see `regression-checklist.md` for what actually does.

## Anatomy

```
Total estimated runtime: ~3m          <- state marker, line 1, always

## Intro

> [VISUAL] terse cue

Narration paragraph.

## Part 1: What the viewer gets

> [VISUAL] terse cue

Narration paragraph.

## Outro

Read the docs in the description to learn more. Drop a comment if you have any
questions. Thanks for watching!
```

## Headings

`## Intro`, `## Part N: Title`, `## Outro` is what the corpus uses. Timestamps in headings are fine if
they're useful to you.

Sub-parts exist where a Part splits naturally — 20-interaction-basics has `## Part 3b: A trigger on a
text element`. Use sparingly.

Name Parts for what the viewer gets, not for the UI surface they happen to sit in.
One idea per Part.

**A heading is a noun phrase, not a question with the answer attached.** A draft of video 23 used
`## Part 1: Who draws the UI — Adapty` and `## Part 2: Who draws the UI — you`. The pair encodes the
video's organizing question, which is useful thinking and unreadable as a label. Name the subject
instead — `## Part 1: The flow`, `## Part 2: Your own code, and the paywall entity` — and let the
narration carry the question.

Recorded scripts bear this out: `The chain`, `Product variables`, `Custom actions`, `Screen
background`. All noun phrases, none of them clever.

## `> [VISUAL]` cues

**Placed before the narration they pair with.** They exist to keep the shot list and the script in
step; a transcript that drops them has lost a convenience, not a quality.

Terse action labels of a few words. Quote names; chain sub-steps with commas or `+`:

- ✅ `Turn "X" selectable`
- ✅ `Group: "id", Single choice`
- ✅ `Style Selected state, duplicate for the rest`
- ✅ `Bruno: POST a transaction with a positive amount, response showing 1100`
- ❌ `Open the Interactions panel, then find the dropdown, then select…`

Drop option lists and full menu navigation — the narration carries the detail.

Cue density in recorded scripts runs roughly one per 30 seconds — 21-variables has 18 cues across
3:29 — but that is a **description, not a target**. Density follows how often the screen changes: a
build video holds one surface for a while, a concept video moves between dashboard pages constantly and
will run two or three times denser. There is no upper bound worth enforcing.

The number that *does* matter runs the other way: every substantial on-screen action needs narration
against it (`regression-checklist.md`, failure 3). If a single cue carries three actions and one short
sentence, add narration — don't remove the cue.

## Sign-off

Write this form in drafts:

> Read the docs in the description to learn more. Drop a comment if you have any questions. Thanks for watching!

**Delivered takes vary**, and the variants are correct as recorded — "Thank you for watching",
"Read our documentation", "Leave a comment if you've got any questions". `tone.md` shows two real
deliveries. When transcribing, keep what was said; never normalize a transcript back to the draft
wording.

## Formatting

- `**Bold**` for UI labels the viewer must find
- No "Pause for N seconds" directives — removed as unnecessary
- `-` for list bullets
