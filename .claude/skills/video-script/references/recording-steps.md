# recording-steps.md

A shot list for the person at the keyboard. Not narration, not documentation — what to click, in
order, with the real values already decided.

Introduced at video 13; standard from there on. Models: 21 and 22.

## Shape

```
<pre-roll setup lines>

### Part 1 — Title  [Surface]
action
action

### Part 2 — Title  [Surface]
action
```

## Reaching the starting state

Most shot lists assume something already exists — a flow with the right screens, a placement pointing
at it, products in the catalog. Getting there is part of the work, and for flows it can be automated.

**Adapty's flow-generator skill** (`adaptyteam/adapty-skills`, documented in
`guides/flow-builder/flow-generator-skill.mdx`) builds and edits flows from a plain-language
description through the Adapty CLI: screens, branching, quizzes, themes, locales, and variants seeded
from a flow that already works.

**Always ask before using it. Never fire it automatically.** It writes straight to flows in the
dashboard and is marked experimental, so the call is the user's every time — even when it looks
obviously useful.

Ask when the video needs a flow that doesn't exist yet, a variant of one that does, or a state that is
tedious to reach by hand: a localized version, a themed re-skin, a quiz with particular option IDs.

Don't raise it at all when:

- **the video records dashboard surfaces only** — placements, products, virtual currency, profiles
- **the flow already exists.** The series reuses Recipedia; most videos need no new flow
- **the video is about building the thing.** You cannot pre-build what the viewer is going to watch
  get built. Pre-build only the *starting* state — the screen as it stands before the first edit

If the answer is yes, work against a **draft or a copy**, never a live flow, and report back what was
created so the shot list can name it exactly.

## Rules

**Pre-roll first.** Anything that must be true before recording starts, before Part 1: which profile,
which products, secrets moved into environment variables so they stay masked on screen.

**Parts mirror the script's Parts** — same order, same names, so the two files read side by side. Rename
here whenever the script's Part is renamed.

**Tag each Part with its surface**: `[Dashboard]`, `[Device]`, `[Bruno]`. Recording crosses machines and
windows; the tag makes the switch obvious.

**Concrete values, never placeholders.** `Code: TOKENS`. `Credit per cycle: 1000`. Deciding a value on
camera wastes takes.

**Full request bodies**, ready to paste:

```
POST https://api.adapty.io/api/v2/server-side-api/vc/transactions/
  Authorization: Api-Key {{adapty_secret}}
  adapty-customer-user-id: <profile>
  Content-Type: application/json
  Body: {"items": [{"currency_code": "TOKENS", "amount": -100}]}
```

**Mark what to linger on** — `Hold on the warning banner`, `hold on the toggle`. These name the frames
the narration needs.

**Mark optional shots optional**, so a missing one doesn't block the edit.

**Say when to prepare rather than perform** — "Save the three requests in a collection beforehand — no
typing on camera."

**Close on the device instruction** where the video shows real hardware: "Record the flow on a real
phone."
