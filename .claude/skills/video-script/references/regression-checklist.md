# What Counts as a Regression

Four failures. They are about whether the video works, not about how the file is formatted.

Formatting is not on this list. Heading style, timestamps in headings, whether a transcript keeps its
`[VISUAL]` cues — none of that damages a video. Don't spend review attention there.

## 1. A scenario that doesn't make the value apparent

The worst failure, and the only one that can't be fixed in the edit.

Ask, before anything else:

- **What is the before state, and does the camera see it?** If it can only be described, there's no demo.
- **Would a viewer recognize this as their own problem?** Not a staged mistake, not a contrived setup.
- **Would this happen to someone competent, doing their job properly?** If the scenario only makes
  sense once the viewer has blundered, it's staged — see the worked example in `voice.md`. This catches
  invented *situations*, which the staged-mistake rule misses.
- **Does the opening line say what the viewer gets, rather than what goes wrong?** Penalty-first
  framing usually means the premise was invented to create stakes.
- **Is the stated difficulty the real one, and can you point at proof?** A docs heading written to
  disambiguate, a support thread, a migration note. No artifact, no evidence the problem exists.
- **Could they reproduce it in their own dashboard in minutes?**
- **Does one thing visibly change?** If the payoff is "and now it's configured", there's no payoff.

Full criteria in `scenarios.md`. A weak scenario cannot be rescued by good narration — it has to be
replaced.

## 2. Tone drift, in either direction

Both directions are regressions. Measure against `tone.md`, which is derived from the recorded scripts.

**Too documentarian** — the common one, because reference prose is the easiest to write:

- *allows you to*, *enables*, *is used for*
- enumerating UI surfaces instead of doing something with them
- multi-clause sentences joined by *and* / *which*
- identifiers and exact error codes spoken aloud
- no deixis — nothing pointed at on screen
- **definitions by location or mechanism** — "you build it in X", "the SDK renders it" — where a
  capability belongs. The facts are right and the *so what* is missing; see `tone.md`
- **a concept named but never cashed out** — no line saying what it lets the viewer do, or costs them

**Too conversational** — rarer, but it shows up in intros and transitions:

- filler openers: "Alright, so…", "Now, what we're going to do here is…"
- narrating trivia: "To show it in action, I'll change the font"
- announcing structure: "That's all about the left panel"
- calling back to structure: "now the second question", "remember the three things" — the viewer
  holds the screen, not the outline (`voice.md`)
- clichés: "Last but not least"

The delivered voice is more clipped than either. Short sentences, fragments, concrete nouns.

**Referents** belong here too, and narration is where they fail hardest — the viewer cannot scroll
back. Check every *it*, *this*, *that*, *them*, and *the X* on first mention, especially at the start
of a Part or straight after a `[VISUAL]` cue. **Ordinals count as pronouns** — *the first
one*, *the second*, *the third thing* are only safe while their referent is still on screen. Read it
aloud; hesitation means the antecedent is gone. See `tone.md`.

**Part headings** should be noun phrases naming the subject, not questions with answers attached
(`structure.md`).

## 3. Screen busy, narration silent

Long stretches where a lot happens visually and nothing is said. The viewer watches actions they can't
interpret, and the video stops teaching.

Check by walking the script's `[VISUAL]` cues in order: does every substantial on-screen action have a
line against it? A cue carrying three actions with one short sentence is usually a gap.

**The reverse is fine.** Pausing visual activity to explain what's happening is allowed and often
right — see failure 4 for the one exception.

## 4. A long intro over a static screen

The viewer is waiting with nothing to watch. Intros run 15–18 seconds; video 14's was cut to ~8 in review.

This is specifically about the *opening*, before anything has happened. Once the demo is running, a
pause to explain is fine — the viewer has context and something on screen to hold.

Concepts belong inside the Parts, over live action. If the intro is explaining a mechanism, move it.

## Quick pass

1. Name the before state and the after state in one sentence each. If you can't, stop — failure 1.
2. Read the intro aloud and time it. Over ~20 seconds, cut — failure 4.
3. Scan for *allows you to*, *enables*, any sentence over two clauses, and any pronoun or ordinal
   whose antecedent you have to hunt for — failure 2.
4. For every concept the script names, find the line that says why the viewer should care. Missing
   means it's a definition, not an explanation — failure 2.
5. Read the `##` headings as a list. Each should name a subject, and the set should make sense to
   someone who hasn't seen the video.
6. Walk the `[VISUAL]` cues: any run of actions with no narration against it — failure 3.
7. Read the whole thing aloud at pace, or run the detector in `speakability.md`. Stumbling twice on a
   line means rephrase it — including at the seam between two sentences.

## Re-run this over the whole file when a rule changes

Rules land after most of a script is already written. A file that passed last week has not been checked
against a rule added since — video 23 carried three ordinal back-references and two question-shaped
headings through several revisions *after* the rules banning them existed, because nobody re-read the
file end to end.

When you add or change a rule here, sweep the scripts you are actively working on. Not the whole
corpus: recorded scripts are records and stay as they are.
