# Archive — What to Learn From Each Video

A learning tool first. Before drafting anything, find the closest video here and read it, then use the
patterns below rather than inventing an approach.

State and published IDs are at the bottom, for the transcription backlog.

## The four models

These are transcribed from the finished videos, so they show what actually survives the microphone.
Read at least one before writing.

**21-variables-dynamic-text** — the best intro in the series. Two deictic observations, then the
reveal: *"This line knows what the user picked on the previous screen. This price came from the App
Store a second ago. Neither is typed in — both are variables."* Nothing is defined before it's shown.
Copy this shape when a feature is visible on screen.

**20-interaction-basics** — the best structure. Establishes a three-part model (element, trigger,
action), demonstrates it once, names it — *"That's a working button, and this shape never changes"* —
then varies one part at a time. Copy this when teaching a mechanism with several dimensions.

**19-first-screen** — the best end-to-end build. Long (4:27) and earns it, because something is
always being made. Note the presenter's *I'll* for choices and *we* for the walkthrough, and how
layout gets explained only when it becomes visible in Part 5.

**22-virtual-currencies** — the best multi-surface demo. Dashboard, device, and API in 3:21, held
together because each step visibly moves one number. Near the ceiling for how much a single video can
span.

## Patterns worth copying

**Deictic opener** (21, 20, 12) — point at what's on screen and state the gap.
*"This button doesn't do anything yet."*
*"This flow asks the user how experienced a cook they are, then leads into a sales pitch. Let's make
that pitch adapt to their answer."*

**Simplest → most common** (9, and named in the pacing memory) — *"We'll start with the simplest
case — a button that buys one specific product — and then expand it to support multiple plans."* Gives
the video a spine and a reason for Part 2 to exist.

**Rule stated as a negative** (15, 19) — *"you never drop an element onto exact coordinates"*;
*"you don't drag elements around to position them."* Corrects the expectation the viewer arrived with,
which is faster than describing the actual system.

**Triadic setup** (11) — *"manually, on a tap, or automatically from a condition. Let's take all
three."* Promises three beats and delivers three Parts.

**Two sorting questions** (23) — *"Placement. Paywall. Onboarding. Flow — four words that are easy to
mix up. Two questions sort them out: where does it appear, and who draws it?"* The strongest opener
among the drafts, and the model for a conceptual video.

This is not the table-of-contents intro it superficially resembles. **An intro may pose the organizing
question; it may not answer it.** *"Two questions sort them out"* promises a decision procedure and
takes four seconds. *"This video covers placements, paywalls, and onboardings"* recites an agenda and
teaches nothing. The concepts themselves still get explained inside the Parts, over live action, as
`voice.md` requires.

**Outro triad** (19, 20, 21) — gather the video into three items, then close. See `tone.md`.

## Patterns to avoid

**The table-of-contents intro** (7, 8, 9, 13, 5) — *"This video covers…"*, *"This video explains
how…"*. It spends the opening seconds on an agenda while the screen sits still, which is failure 4 in
`regression-checklist.md`. Replace with the deictic opener.

**Panel-by-panel enumeration** (16) — *"**Products** lists every product used in the flow. It's
read-only; you add products from the right panel."* A reference page read aloud. The hardest draft to
rescue, because the whole structure follows the UI rather than a task.

**Identifier density** (12, Part 1) — *"this group is `skillLevel`, so its answer is
`skillLevel.selectedOptionId`"*. Correct, and unspeakable. Say what it means; let the docs carry the
symbol.

**Definitional opening** (7) — *"Interactive elements in the Flow Builder carry multiple visual
states. Which state is active depends on…"* Defines before showing. Invert it: show a state change,
then name it.

## Scenario inventory

What each recorded video actually contrasts. Useful when picking a new scenario — see `scenarios.md`.

| Video | Before | After |
|---|---|---|
| 19-first-screen | Empty canvas | Two finished, wired screens |
| 20-interaction-basics | A button that does nothing | A button that navigates; then non-tap triggers |
| 21-variables-dynamic-text | A product card with no price | Live localized price, and a personalized tagline |
| 22-virtual-currencies | Balance at zero | 1000 credits granted automatically by a purchase |

## Corpus state

**RECORDED** — transcribed from the video. **draft** — written before recording. **LEGACY** — predates
the section format.

| # | Folder | State | steps | desc | Published ID |
|---|---|---|---|---|---|
| 1 | app-store-connect | draft | – | yes | `qUpC2XG-r5E`? |
| 2 | app-store-sandbox | LEGACY | – | yes | `hq4PRU-vuik` |
| 3 | paywall-placement | LEGACY | – | yes | `e4o7Z2tUGL8`? |
| 4 | google-play-console | draft | – | yes | `nlkdKCF0SwY`? |
| 5 | user-profiles | draft | – | yes | none found |
| 6 | flow-builder-quickstart | draft | – | yes | `aa-m459VIuY` |
| 7 | element-states | draft | – | yes | `gdsNfHpKAqQ` |
| 8 | navigation | draft | – | yes | `OLl-WziDMhU` |
| 9 | purchases | draft | – | yes | `LLIZCd94PlE` |
| 10 | selectable-elements | LEGACY | – | yes | `btpZPOm9VRY` |
| 11 | show-hide | draft | – | yes | `3w3YSOmI3tQ` |
| 12 | conditional-logic | draft | – | yes | `xmWSEPxnI0s` |
| 13 | layout-sizing-spacing | draft | yes | yes | `WQ9fpxrndok` |
| 14 | position-alignment | draft | yes | yes | `aRS4Bzb6W4I` |
| 15 | containers | draft | yes | yes | `ZlI-1D1a0cU` |
| 16 | workspace | draft | yes | yes | `n0uV44q318o` |
| 17 | style-system | draft | yes | yes | `auMs_Tr9xtU` |
| 18 | building-a-quiz | draft | yes | yes | `o27JCZpziVo` |
| 19 | first-screen | **RECORDED** | yes | yes | `fSmxx4YWurw` |
| 20 | interaction-basics | **RECORDED** | yes | yes | `uicKwOak-Zo` |
| 21 | variables-dynamic-text | **RECORDED** | yes | yes | `sbBxrJoNI1M` |
| 22 | virtual-currencies | **RECORDED** | yes | yes | unpublished |
| 23 | terminology | draft | – | – | none found |

`?` marks an inferred mapping. Unmarked IDs for videos 6 and 11–19 are confirmed by the series roadmap:
[Flow & paywall builder videos](https://app.notion.com/p/3a41ca4355c380bea4fdc8779d6f62cf), which is the
authoritative queue and status board. Videos 1–5, 22, and 23 are outside its scope.

Re-derive:

```bash
grep -rhoE "^- [^:]+: https://youtu\.be/[A-Za-z0-9_-]+" _videos/*/description.md \
  | sed -E 's|^- (.+): https://youtu\.be/(.+)|\2  \1|' | sort -u

grep -rEo '<YouTube id="[A-Za-z0-9_-]+"' src/content/docs \
  | sed -E 's|src/content/docs/||; s|<YouTube id="||; s|"$||' | sort -u
```

## Eras

- **1–12** — no recording steps; 2, 3, and 10 predate the section format entirely
- **13 onward** — `recording-steps.md` becomes standard
- **19 onward** — scripts get replaced with as-recorded transcripts

Later is better. For voice, read 19–22; for shot lists, 21 and 22.
