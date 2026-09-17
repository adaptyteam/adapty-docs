# What Counts as a Regression

Four failures. They are about whether the video works, not how the file is formatted — heading style,
timestamps in headings, whether a transcript keeps its cues, none of that damages a video.

This file is the check. The files it points at are the explanation; don't restate them here.

## 1. A scenario that doesn't make the value apparent

Cannot be fixed in the edit: a weak scenario is replaced, not rewritten. Full criteria in
`scenarios.md`, premise tests in `voice.md`.

- What is the before state, and does the camera see it? Described-only means no demo.
- Would a viewer recognize this as their own problem — not a staged mistake, not a contrived setup?
- Would it happen to someone competent doing their job properly? (This is what catches an invented
  *situation*, which the staged-mistake test misses.)
- Does the opening line say what the viewer gets rather than what goes wrong? Penalty-first framing
  usually means the premise was invented.
- Is the stated difficulty the real one, and can you point at an artifact that proves it — a docs
  heading written to disambiguate, a support thread, a migration note?
- Could they reproduce it in their own dashboard in minutes?
- Does one thing visibly change? "And now it's configured" is not a payoff.
- Is anything on screen described in words its owner wouldn't use for their own app? (`voice.md`)

## 2. Tone drift, in either direction

Both directions are regressions. The delivered voice is more clipped than either. Measure against
`tone.md`.

**Too documentarian** — the common one, because reference prose is easiest to write. Scan for:
*allows you to* / *enables* / *is used for*; UI surfaces enumerated instead of used; sentences joined
by *and* / *which*; identifiers and error codes spoken aloud; no deixis; a definition by location or
mechanism where a capability belongs; a concept named but never cashed out into what it lets the viewer
do.

**Too conversational** — rarer, and it hides in intros and transitions. Scan for: filler openers
("Alright, so…"); narrated trivia ("To show it in action, I'll change the font"); announced structure
("That's all about the left panel"); callbacks to structure ("now the second question", "remember the
three things"); clichés.

**Referents.** Check every *it*, *this*, *that*, *them*, and *the X* on first mention — hardest at the
start of a Part and straight after a cue. **Ordinals count as pronouns**: *the first one*, *the second*,
*the latter* are safe only while the referent is still on screen. Read it aloud; hesitation means the
antecedent is gone.

**Part headings** are noun phrases naming the subject, not questions with the answer attached.

**Cues sit before their line**, and pair with the line immediately *below*. Detect trailing ones by
finding any cue whose next block is a heading or the end of the file.

## 3. On-screen action the viewer can't interpret

Walk the cues in order and ask of each: does every substantial on-screen action have a line against it?
A cue carrying three actions under one short sentence is usually a gap.

**Cover the action; don't fill the clock.** Silence over action is not the defect — footage runs at the
speed it runs at, and a build sequence carries long silent stretches by necessity (`pacing.md`). The
defect is action the viewer cannot interpret. Don't pad narration to cover time.

The reverse is fine too — pausing the visuals to explain is allowed, and often right. Failure 4 is the
one exception.

## 4. A long intro over a static screen

Intros run 15–18 seconds; video 14's was cut to ~8 in review. Err short.

This is about the *opening* only, before anything has happened. Once the demo is running, a pause to
explain is fine. If the intro is explaining a mechanism, move it into a Part (`pacing.md`).

## Quick pass

1. Name the before and after state in one sentence each. If you can't, stop — failure 1.
2. Read the intro aloud and time it. Over ~20 seconds, cut — failure 4.
3. Scan for the failure-2 word lists, and for any pronoun or ordinal you have to hunt for.
4. For every concept named, find the line saying why the viewer should care. Missing means it's a
   definition, not an explanation.
5. Read the `##` headings as a list. Each names a subject; the set makes sense to someone who hasn't
   seen the video.
6. Walk the cues: any run of actions with no narration against it — failure 3.
7. Read it aloud at pace, or run the detector in `speakability.md`. Stumbling twice means rephrase —
   including at the seam between two sentences.

## Re-run this over the whole file when a rule changes

Rules land after most of a script is written, so a file that passed last week has not been checked
against a rule added since. Video 23 carried three ordinal back-references and two question-shaped
headings through several revisions *after* the rules banning them existed, because nobody re-read it
end to end.

Sweep the scripts you are actively working on — not the whole corpus. Recorded scripts are records and
stay as they are.
