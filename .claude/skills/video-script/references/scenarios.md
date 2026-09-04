# Choosing What to Demonstrate

**The before/after is the product.** These videos earn their length by showing a state change the
viewer can see happen — not by explaining a feature. Everything else in this skill serves that.

Pick the scenario before writing a word of narration. A weak scenario cannot be rescued by good
writing; a strong one mostly writes itself.

## The four tests

A scenario is worth recording when it passes all four.

**Real.** Something a developer actually has on their screen right now. Not a mistake staged so it can
be corrected — see `voice.md`.

**Simple.** One problem, one mechanism, one fix. If the setup needs two concepts explained before the
demo starts, the scenario is too big; split the video.

**Replicable.** The viewer can do the same thing in their own dashboard within minutes, with no assets
or data they don't have. A demo resting on a prepared backend teaches nothing they can repeat.

**Relatable.** A recognizable job, not a contrived one. "Show the real price" beats "demonstrate the
variable system."

## Make both states visible

The demo needs a *before* the camera actually sees. Not described — shown.

| Video | Before | After |
|---|---|---|
| 19-first-screen | Empty canvas | Two finished screens |
| 21-variables-dynamic-text | Typed-in placeholder price | Live localized store price |
| 22-virtual-currencies | Balance at zero | 1000 credits, granted automatically by the purchase |

If you can't name the before state in a few words, the scenario isn't framed yet.

**Hold on the before.** It needs a beat on screen to register, and `recording-steps.md` should mark it
— `Hold on the empty balance` — or the edit will cut straight to the payoff and the contrast is lost.

## Concept videos — when there's nothing to build

Some videos explain vocabulary or a model rather than a workflow: what a placement is, how flows
differ from paywalls. The four tests still apply, but the before/after has to be found somewhere other
than a canvas.

**Move the demo surface.** The state change becomes a *reassignment*, not a build. Point the same
placement at a different flow and show the device serving different screens — same ID, no code
touched. That is a visible before/after for a concept with nothing to construct.

**Exhibit the ambiguity — don't assert it.** The strongest opener for a vocabulary video is the same
word attached to visibly different things, one shot each:

> *This is a paywall.* (a flow screen selling products)
> *This is also a paywall.* (a hand-coded screen)
> *And so is this.* (the dashboard entity — products, no canvas)

The viewer sees the problem in nine seconds and needs no persuading it exists. Compare the two premises
this replaced: "four words that are easy to mix up" (a difficulty nobody has) and "pick wrong and it
costs an app release" (a difficulty only the careless have). Both argued for a problem; this one
displays it.

The pattern generalizes: **find the word or control that means different things in different places,
and put those places next to each other.** Then the rest of the video is just the discriminating
questions, in order.

**Pick the most ordinary instance, not the most illustrative one.** The instance that demonstrates a
distinction most crisply is often one few viewers have. A draft used a bespoke hand-coded paywall
screen as the "your own code" example; the version that works uses a subscribe button on a settings
page — smaller, more common, and it makes the better point anyway, that code-drawn doesn't mean
full-screen. When two instances both prove the point, choose the one more viewers already have on
their screen.

**Show an absence.** Opening a paywall entity and finding no canvas — *"No screens in here. Just
products."* — separates two meanings of one word faster than any definition, and the camera can see it.

**Give a decision procedure, not definitions.** The viewer should leave able to sort the next case
themselves. Two or three questions that discriminate beat four paragraphs that describe.

**Don't invent jeopardy to manufacture stakes.** A concept video has no natural conflict, which is
exactly when a fabricated premise gets written. See the premise test in `voice.md`.

## Don't spend the viewer's time on legacy paths

**If someone needs the video, they don't have the legacy thing yet.** A viewer learning what the words
mean has not already built an onboarding in the builder that's being retired, so reassurance about
migration is aimed at people who will never watch.

Name it, date it, point at the replacement, move on. Video 23's legacy section went from 70 words —
what it means, what retires and when, what happens to published ones, what to build instead, and what
*isn't* being deprecated — to 32:

> The third tab is onboarding — a legacy placement type. It comes from the old Onboarding Builder,
> which retires alongside the old Paywall Builder on October 1st, 2026.
>
> Build new ones as flows.

The people who do have the legacy thing need a migration guide, not thirty seconds of a tutorial.

## Where the contrast belongs

**Inside the Parts, over live action.** Not in the intro.

The intro names the payoff in a line and gets out of the way (`pacing.md`). The before/after plays
where the screen is moving, which is also where the viewer is actually watching.

## Scale to the mechanism

The scenario exists to make one mechanism legible. When the demo grows past that — extra screens,
extra products, a second feature — the mechanism gets harder to see, not easier.

22-virtual-currencies is near the ceiling: a dashboard setup, a device purchase, and three API calls,
at 3:21. It works because each step visibly moves one number. Add a fourth surface and it wouldn't.

## Reuse Recipedia

The series uses one app across every video (`terminology.md`), which means the viewer never spends
attention on the scenario itself. Extend it rather than inventing a new app — 22 added an AI recipe
generator with a token allowance, and cost the viewer nothing to follow.
