# Voice

How the narration sounds. Every rule below came from a reviewer rejecting the opposite.

## In one screen

- Speak to the viewer, not to the docs.
- Real problems only. The test: would this happen to someone competent, doing their job properly?
- Name the artifact that proves the difficulty exists — and don't build the hook on it.
- Never penalty-first. State the purpose, not the punishment.
- Never describe the customer's app in words they wouldn't use for it themselves.
- No meta-transitions, and never call back to your own structure.
- No clichés.
- Every video is a cold open.
- Concepts go inside the Parts, and only with an artifact on screen.

## Speak to the viewer

"Here, you'll see a QR code" — not "outputs a QR code". Mechanical phrasing reads like documentation
recited aloud, which is what it usually is: docs prose pasted into a script.

## Show a real problem, never a staged one

The before/after is the point of these videos — see `scenarios.md`. What a reviewer rejects is a
problem invented for the camera, not problem-framing itself.

The styles video originally opened by staging a mistake: "oops, I used mismatched colors everywhere."
It was cut in review as slow and unrealistic — nobody makes that error that way, and the setup cost
fifteen seconds before anything was demonstrated.

The distinction:

- ✅ **Real state a viewer recognizes** — a screen with hardcoded prices, a balance sitting at zero, a
  flow with no second screen yet. Show it, then change it.
- ❌ **Staged incompetence** — deliberately doing it wrong on camera so you can fix it.

**The premise test: would this happen to someone competent, doing their job properly?**

A staged problem doesn't always wear the costume of a staged *mistake*. It also shows up as a staged
*situation* — a moment invented so the video has somewhere to start. Both fail the same way.

A worked example. A draft of the terminology video opened:

> You built a paywall screen. Now this page wants to know whether it's a flow, a paywall, or an
> onboarding. Pick wrong, and fixing it costs an app release.

The underlying fact is true and documented: placement type is fixed at creation, IDs are unique and
uneditable, so switching type means a new ID, and the app hardcodes the ID. The framing invents a
moment that never occurs — nobody is interrogated by a page after building a screen — and the
consequence only reaches a viewer who chose carelessly. It presumes the audience blundered.

The honest version of the same fact is a **migration**: you shipped a paywall placement a year ago,
flows exist now, and moving over needs a new placement ID. Same consequence, and it catches careful
people. Reach for that.

**State the difficulty that actually exists, not a plausible-sounding one.**

A premise can pass the competence test and still be wrong, by naming the wrong difficulty. The same
terminology video opened by claiming four words were "easy to mix up". They aren't — nobody confuses a
placement with a paywall in the abstract. The real difficulty is narrower and only shows up while
reading: one word carries two meanings, and a given page doesn't always signal which.

**Name the artifact that proves the problem is real.** Before writing the premise, find the thing that
exists *because* of the difficulty:

- a docs section that had to be written to disambiguate — `paywalls.mdx` has a heading called
  `What "paywall" means`, which is proof the ambiguity bites
- a support thread or ticket asking the question
- a UI warning, a migration note, a FAQ entry

If nothing like that exists, the difficulty may be invented. A guessed problem produces a video that
answers a question nobody asked.

**Don't build the hook on a docs page.** Evidence that a problem exists is not the same as a reason
the viewer cares. A draft opened with "Adapty's own docs have a section called *What paywall means*" —
true, and useless as a hook, because most viewers now reach documentation through an agent rather than
by browsing pages. A premise resting on "the docs say" assumes a reading habit the audience has
largely dropped.

Use the artifact to *verify* the problem is real. Then open on the problem itself, in the product,
where the viewer meets it.

**Penalty-first framing signals an invented premise.** If the opening line is what goes wrong rather
than what the viewer gets, check the premise. State the purpose, not the punishment.

State the benefit once, briefly — then the mechanism. The demo is the argument, and the narration
shouldn't make it twice. `tone.md` has the sequencing and what goes wrong without it.

## Never describe the customer's app unflatteringly

The audience is the developer whose app is on screen, and their colleagues. A line that makes their
product sound cheap or crude is what they hear instead of the feature.

A draft of video 24 described multiple placements as apps that **"ask for money in more than one
place"**. Accurate in a narrow sense, and unusable: no customer wants their app characterized that way
in a vendor's official video.

**Use the product's own noun for the thing.** That sentence was reaching for *placements* the whole
time:

> ❌ plenty of apps sell in several places
> ❌ plenty of apps ask for money in more than one place
> ✅ plenty of apps have several placements — onboarding, an upgrade button, a paywall on trial conclusion

**The test: would you say this sentence to the customer whose app is in the shot?** If it needs
softening before you would, it needs rewriting before it is narrated.

Watch the examples too — see the example-list checks in `terminology.md`. All three of that draft's
examples were paywalls, which quietly redefined a placement as somewhere you charge. Leading with
*onboarding* fixes the definition as well as the tone.

## No meta-transitions

Don't announce section boundaries or narrate small actions:

- ❌ "That's all about the left panel."
- ❌ "To show it in action, I'll change the font."

Each step does too little to deserve commentary. The visual carries it. Use a short connective —
next, now, finally — plus a pause.

**Never call back to the video's own structure.** *"Now the second question"*, *"as I mentioned"*,
*"remember the three things"* — the viewer holds the screen, not your outline. Two minutes after an
intro promised two questions, nobody is counting.

Re-establish by naming the things instead:

> Now the second question. Whichever one you built, your app doesn't name it.
> → In code, you don't name the flow or the paywall entity. You name a placement.

Structure is a writing tool. The audience does not carry it.

## No clichés

"Last but not least" and relatives. Cut them.

## Every video is a cold open

Viewers don't carry context between videos unless they're binge-watching. Establish the scenario
inside the video and present any prebuilt flow as a given.

- ❌ "The flow we built earlier…"
- ✅ "This flow already has a welcome screen and a paywall."

Cross-references for depth are fine: "see our element states video".

## Where concepts go

Inside the numbered Parts, over on-screen action — never in the intro, where nothing is moving.
`pacing.md` has the intro budget; `scenarios.md` has where the before/after belongs.

**A concept with no artifact on screen gets cut at the microphone.** Video 24 was drafted with a Part
on crossplacement tests — 70 words, no demo. It was dropped during recording as theoretical, and
returned only when it had something to sit on: a second placement column added to the form on camera.
Write a concept with the artifact that shows it, or leave it out of the draft.
