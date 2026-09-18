# recording-steps.md

A shot list for the person at the keyboard. Not narration, not documentation — what to click, in
order, with the real values already decided.

Introduced at video 13; standard from there on. The shot-shaped structure below came from a full pass
on video 24 and supersedes the older part-shaped one.

## In one screen

- Organize by shot, not by the script's Parts.
- A shot breaks only where something must happen off camera. Number shots in recording order.
- Reach the state: verb-first instructions, and cover the case where the state isn't there. What
  blocked you belongs back in the script.
- Write against the window you record in. Check framing against the rendered page, not the field list.
- Tag every step with the script line it serves.
- On screen: start where recording begins, one action per numbered item, real values already decided.
- Mark holds, cut points, irreversible steps, and optional shots.
- URLs as clickable links. Name files and lines exactly — never gesture at them.
- Don't write generic recording advice, or editorial decisions dressed as instructions.
- Check the operator's environment. Read the app's source before asserting a constraint.
- Faked data follows `mock-data.md`; setup steps point at the harness and explain nothing.
## Structure

```
## Setup
   Everything that must be true before recording starts.

## Shot 1 / App name
### Reach the state
   1. Step-specific prep, only if needed. Verb first.
### On screen
   **Starts on:** the exact page — with its URL where one exists.
   1. Actions in sequence, one per item, until recording stops.

## Shot 2 / App name
   ...

## After the shoot
```

**Organize by shot, not by the script's Parts.** A Part is a unit of narration; a shot is a unit of
recording. They rarely match, and when the file is shaped like the script the operator has to
reassemble it at the keyboard.

## Shot boundaries

**A shot breaks only where something must happen off camera** — a different application, a different
device, seeding data, an app reinstall, a dev-server restart. Navigating between two pages of the same
site is not a break. Neither is a page that takes a moment to load.

Video 24 went from nine part-shaped sections to **four shots**: the dashboard build sequence in one
take, the dressed results after a server restart, one phone recording, one editor frame.

Ask of every proposed break: *what does the operator have to do between these that the camera cannot
see?* If the answer is nothing, it is one shot.

**A state change is not automatically a break.** A dev-server restart is, but a fixture that changes
in response to something the operator does on camera is not — see *Change the data mid-take instead of
restarting* in `mock-data.md`. Before writing a break around a before/after, ask whether the mock can
do it live.

**Shots are numbered in recording order**, which is rarely script order. If a note ever says "record
Shot 4 before Shot 1", the numbering is wrong — renumber.

## Reach the state

**Instructions, not descriptions.** "draft-run sitting in the Drafts tab" tells the operator nothing.
"Open A/B tests > Drafts. Confirm the test is listed and has never been started" does.

**Every step starts with a verb.** Open, confirm, navigate, start, sign in.

**Cover the failure case** where the state might not be there: what to do if the draft is missing, if
the flag is off, if a test is already running on the placement.

**Make the change yourself; don't write it up as a task.** A shot list describes a state that exists,
not work for the operator to do at the keyboard. The first draft of the profiles shot list told them
which four symbols to edit in the demo app to stage a sign-in — reachable repository, twenty lines,
and it should simply have been done. Where you can make the change, make it, then say what the state
now *is*, where the originals are backed up, and how to revert it afterwards. Leave instructions only
for what you cannot do: anything needing their credentials, their devices, or a judgement that is
theirs.

**Send the failure cases back to the script.** What blocks the operator usually blocks the viewer, and
it is the kind of line no draft predicts. Two of video 24's delivered lines exist only because setup
hit them: "If you don't see your flows in the dropdown, make sure that they're published" and "If, like
me, you use the Flow Builder, you need a flow placement." Neither was in the draft.

**Say when to prepare rather than perform.** "Save the three requests in a collection beforehand — no
typing on camera."

## On screen

**Start with where the recording begins**, as specifically as possible — the page, and its URL if there
is one. Navigation *to* that page happens before the record button, so it does not belong in the steps.
Navigation that is *part of the shot* stays.

**One action per numbered item.** "Main menu > Placements. Open main_paywall and hold on its single
flow" is three steps, not one. Split until each line is a single thing to do.

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

**Write against the window you will record in.** The clean recording window has no address bar, so a
step that says "open `localhost:3000/profiles/users/pf_d47f02`" cannot be followed. Name the row and the
columns that identify it — and put a lookup table in the file if the identifier the fixture uses is not
a column.

**Check framing against the rendered page, not the field list.** Four framing instructions in the
profiles shot list were wrong because they were written from the response type: two fields named next to
each other in the data sat sixteen rows apart on screen, a column a step pointed at did not exist in
that table, and an identifier a step said to keep out of frame sat between the two rows the beat needed.
Open the page, or read a screenshot, before writing "hold on X and Y".

**Tag every step with the script line it serves.** It costs a few words, and it is how you find out that
a cue has no footage, that two steps serve the same line, or that a step exists for no reason. It also
tells the operator what the frame is for, which is what stops them framing it wrongly.

**Check the direction of what you are demonstrating.** A claim that something does *not* carry over
needs its footage in that order — present, then absent. A pair of screens showing absent then present
demonstrates the opposite.

**Write URLs as clickable links**, not code spans:
`[localhost:3000/flows](http://localhost:3000/flows)`. The operator reads this in an editor mid-shoot
and can Cmd-click straight there. A backticked URL has to be retyped.

**Mark what to linger on** — `Hold on the warning banner`, `hold on the toggle`. These name the frames
the narration needs.

**Mark cut points inline** with an HTML comment: `<!-- cut ok: page change -->`. Page changes, dialogs
opening, scrolls, a screen clearing — the frames where a re-record joins invisibly. Without these, a
fumble at step 30 means re-shooting all thirty. Mark irreversible steps the same way:
`<!-- irreversible -->`.

**A cut marker describes what is on screen, not what to do about it.** Write
`<!-- cut ok: the Adapty app is visible across steps 3-4, cut it out -->` and leave it to the operator
whether they stop the capture or cut in post. Both hide the same thing; which one they use is decided
at the time. Encoding the technique produced three revisions on video 24 as the assumed workflow kept
turning out wrong.

**Mark optional shots optional**, so a missing one doesn't block the edit.

**Close on the device instruction** where the video shows real hardware: "Record the flow on a real
phone."

## What not to write

- **Generic recording advice.** Frame size, zoom level, hiding the bookmarks bar. The operator has shot
  twenty of these.
- **Instructions that explain themselves away.** "Don't pre-build the test" — nobody would.
- **Insurance against fumbles that cost nothing.** Spare drafts "in case of a retake" when only the
  final click is irreversible and the dialog can be reopened freely.
- **Prose paragraphs restating the structure.** If the shots show that one test carries the video, do
  not also say so.
- **Editorial decisions dressed as instructions.** "Crop the status bar", "frame tight", "hide the
  panels". How the frame is composed and what survives the edit is the operator's call — they keep the
  status bar, and a stripped-down Xcode does not look like anyone's real workspace. The exception is a
  note that a shot would show something *misleading* — a preview badge implying real assignment, a
  placement ID that contradicts the dashboard. Say what is wrong; don't prescribe the framing.

## Check the operator's environment, don't assume it

Three assumptions cost a revision each on video 24:

- **Which capture method.** Assumed a camera pointed at a phone, then QuickTime; the actual method is
  iOS built-in screen recording. That changes what matters: no framing to match, but a red status-bar
  indicator, and both takes land in one file.
- **Which editor.** "Open the project in the editor" — name it. Xcode for iOS, and use its own panel
  names, not VS Code's.
- **Which environment can do what.** The Adapty phone app signs into production only, while the
  dashboard work runs on dev. So assets have to exist in both, and the setup has to say how they get
  there.

Ask before writing setup steps: what is being captured, with what, signed into which account.

## Name the file, don't gesture at it

"Go to the file holding the placement ID" is useless to someone who did not write the app. It is
`Categories/CategoriesListView.swift`, and the line is
`let flow = try await Adapty.getFlow(placementId: "flow-placement")`. Look it up.

## Check the source before asserting a constraint

Two claims in one shot list turned out to be inventions, both about an app whose repository was
available the whole time:

- *"Check for no preview chrome in shot"* — `FlowPreviewView.swift` hides the navigation bar and the
  tab bar, so there is none.
- *"Give the paywall a close button, or you cannot leave the preview"* — a 0.75s long press raises a
  menu with **Close Flow** in it.

Both sent the operator to solve problems that did not exist, and the second added a requirement to the
flow build.

**Before writing a constraint about an app's behavior into a shot list, read that app's source.** For
the phone shots that is `adaptyteam/adapty-swift-app`; the dashboard is `adapty-dashboard-interface`;
the backend is `adapty-dashboard-api`. If the repository is not cloned, clone it — `gh repo clone`
works where plain `git clone` fails on auth.

The same reading surfaced a hazard inference would not have: that long press fires during a shot
whose instruction is "hold".

## Fabricated data

A dev app has no traffic, so a video that shows results needs numbers that do not exist. Setup steps
say *start the server with mocking on* and point at the harness; they never explain how it works.

Everything about building and checking that data — and the seven rules the video 24 fixture broke — is
in `mock-data.md`. Read it before writing a setup step that switches mocking on.

## Reaching the starting state

Most shot lists assume something already exists — a flow with the right screens, a placement pointing
at it, products in the catalog. For flows, that can be automated: **Adapty's flow-generator skill**
(`adaptyteam/adapty-skills`, documented in `guides/flow-builder/flow-generator-skill.mdx`) builds and
edits flows from a plain-language description through the Adapty CLI — screens, branching, quizzes,
themes, locales, and variants seeded from a flow that already works.

**Always ask before using it. Never fire it automatically.** It writes straight to dashboard flows and
is marked experimental, so the call is the user's every time, even when it looks obviously useful.

Ask when the video needs a flow that doesn't exist, a variant of one that does, or a state tedious to
reach by hand — a localized version, a themed re-skin, a quiz with particular option IDs. Don't raise
it when the video records dashboard surfaces only, when the flow already exists (the series reuses
Recipedia), or when the video is about building the thing — you cannot pre-build what the viewer is
going to watch get built. Pre-build only the *starting* state.

If the answer is yes, work against a **draft or a copy**, never a live flow, and report back what was
created so the shot list can name it exactly.
