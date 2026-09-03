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
