# Delivered Voice

Derived from the four as-recorded scripts — the narration as actually delivered. A draft written to
these conventions needs less rewriting at the microphone.

The two failure directions are **too documentarian** (a reference page read aloud) and **too
conversational** (chatty filler). The delivered voice sits between them, and it's more clipped than
either.

## In one screen

- One clause per beat. Fragments are normal.
- Point at the screen — *this*, *these*, *one of*.
- Every referent resolves out loud. Ordinals count as pronouns.
- *Let's* = the action, *we* = the walkthrough, *I* = a choice, *you* = a capability, imperative = a click.
- After an action, say what appeared — not what it means.
- Define by capability, not location or mechanism. Every definition owes a specific consequence.
- Benefit once, then mechanism. Each said once, in that order.
- Say who does each step: *we* connected, *Adapty* split.
- Compress jargon out. No identifiers, no error codes.
- Introduce a set in parallel, define by contrast, name the shape once.
- Describe the control, not the strategy for using it. Don't narrate what the screen states.
- Outros vary: a triad in 19–21, one plain sentence in 24.
- The sign-off varies. Never normalize a transcript back to the draft.
## Short sentences, often fragments

One clause per beat. Fragments are normal and match on-screen actions one to one:

> Click the brackets icon.
> Find the linked product.
> And select its price variable.

> The trigger defines when the element reacts. In this case, on tap.

> Navigate next and back. Navigate to a specific screen, open a URL, or close the flow entirely.

If a written sentence has two clauses joined by *and* or *which*, it will be split at the microphone.
Split it in the draft.

## Point at the screen

Deixis carries the demo. Name what's visible with **this / these / one of**:

> This button doesn't do anything yet.
> This line knows what the user picked on the previous screen.
> One of the product cards does not have a price tag.
> This element says, "Click to compare plans."

This is also how the before-state gets established — in a single sentence, about something the viewer
can see (`scenarios.md`).

## Every referent must resolve — out loud

**The viewer cannot scroll back.** A pronoun whose antecedent was two sentences ago is gone, and the
listener reconstructs it instead of watching the screen. It is the most common defect in the drafts.

A worked example, from a draft of the terminology video:

> Placement. Paywall. Onboarding. Flow — four words that are easy to mix up.
> Two questions sort them out: where does it appear, and who draws it?

*Them* is the four words. But *it* — the word? the content? the screen? Three different answers fit,
and by the second question the thread is lost. The fix names the nouns:

> Two questions settle the rest: where does the content appear, and who draws the screen?

**Counting backwards is the same failure.** *The first one*, *the second one*, *the third thing*,
*the latter* — they look precise and behave like pronouns: resolving one means replaying the video.
From the same script:

> The first one is a flow.        →  The screen with the product cards is a flow.
> The second one is your own code. →  The subscribe button is your own code.
> What Adapty holds is the third thing.  →  That leaves the one in the dashboard.

An ordinal is safe only while its referent is still on screen. Once the shot has changed, name the
thing.

**Prefer the concrete noun to the pronoun** at these three points, where the listener has just been
looking elsewhere:

- the first line of a Part
- the first line after a `> [VISUAL]` cue
- anywhere the previous sentence introduced more than one candidate noun

Check every *it*, *this*, *that*, *them*, and *the X* on first mention. Say the line aloud: if you
hesitate over what a pronoun points at, the viewer has already lost it.

## Pronoun discipline

| Pronoun | Used for | Example |
|---|---|---|
| **Let's** | the demo action about to happen | "Let's make it open the next screen." |
| **We** | the shared walkthrough | "We can change this button to include the price." |
| **I / I'll** | a presenter's own choice, or a hypothetical intent | "I'll use the **Right Icon** template." · "Imagine that I want to preload the user's meal plan." |
| **You / you can** | the viewer's capability, stated once | "You can make any element interactive." |
| bare imperative | a click to copy | "Open the Interactions tab." |

The mix matters. All-*you* reads like documentation; all-*we* reads like a guided tour that never
hands over.

## Say the observed result

After an action, state what appeared — don't explain what it means:

> The preview is automatically updated with the product's current price.
> The purchase went through. The user has a thousand tokens in their wallet.
> That's a working button.

## Define by capability, not by location or mechanism

**"You build it in X" says where. "The SDK renders it" says how.** Neither tells the viewer why they
would want one. Lead with what the thing does for them, and let location and mechanism follow only if
they still earn a place.

From video 23, the same definition twice:

| Location and mechanism | Capability |
|---|---|
| "The screen with the product cards is a flow. You build it in the Flow & Paywall Builder — one screen, or a sequence — and the SDK draws it on the device." | "The screen with the product cards is a flow. No code went into it. You build flows visually, and they're interactive — a quiz, a branch, a screen that changes based on what the user tapped two screens back." |

The first is accurate and gives the viewer nothing to act on. The second says *no code* and
*interactive*, which are the reasons anyone chooses a flow.

**A definition owes the viewer a consequence.** After naming a thing, say what it lets them do or what
it costs them. A paywall entity described as "a product set — the plans, their order, their offers" is
a schema; add "so plans, prices, and offers change here, and your app picks them up" and it becomes a
reason to create one.

This is what documentarian drift looks like when the writer knows the product well: the facts are
right and the consequence is missing. No *allows you to* appears, so the usual symptoms don't catch
it.

**But a consequence must be specific, or it's a tautology.** Reaching for this rule at the end of a
script tends to produce a generic purpose statement that recaps nothing:

> All three exist so you can change what users see without shipping an app.

That says the thing exists because it has a purpose. Compare a real consequence, which names what
changes and for whom:

> Copy, design, products, all from here. Ship a change without touching your app.
> So plans, prices, and offers change here, and your app picks them up.

Test it: could the sentence be said about a different feature with two words swapped? Then it isn't
telling the viewer anything.

## Benefit once, then mechanism

The rule above and this one sequence; they don't compete. The benefit earns the attention, and it is
said **once**. Then the mechanism, plainly, because that is what makes the benefit credible and
repeatable.

The failure to watch for is **a benefit sitting in mechanism position**. When a sentence's job is to
explain how something happens, a value claim there is filler, however true. The section above warns
against mechanism instead of benefit; this warns against benefit instead of mechanism. Both are
required, in that order, each said once.

From video 24's intro — a draft, then the rewrite:

| Draft | Delivered |
|---|---|
| "Adapty worked that out, and it can tell you how sure it is." | "And we know which one, because we ran an A/B test." |
| "Nobody shipped an update to find that out." | "Nothing in the app changed. We took an existing placement. Adapty split the placement's traffic between two different flows and measured the performance." |
| "Let's run one." | "Here's how you can set up an A/B test just like this one." |

The draft asserts a benefit in line one, then a *second* benefit where the mechanism belonged, and so
never says what was actually done. The viewer is told twice that it is good and never once how it
works.

**Name the subject in the first line. Don't build to a reveal.** The draft withheld "A/B test" until
the end of the intro and landed it as a payoff — *"That's an A/B test."* The review note was "this
edging is unnecessary." Withholding buys nothing. There is no suspense to build, the viewer will not be
surprised, and every sentence before the reveal describes something unnamed — so the pronouns have no
antecedent and the audience decodes instead of watching.

**Say who does each step.** *We* took, *Adapty* split, *Adapty* measured. "Adapty worked that out"
does all the work in one verb and flattens a two-party process into vendor magic.

**Close the loop on the shot still on screen.** "Let's run one" points at nothing — the intro never
named a test. "An A/B test just like this one" resolves to what the viewer is looking at.

**Order: result, mechanism, invitation.**

## Compress jargon out

Written drafts reliably carry more precision than gets spoken. From video 22, the same beat:

| Written draft | Delivered |
|---|---|
| "The call is atomic. If the user can't cover the cost, nothing changes and you get back `insufficient_balance` — so a balance never goes below zero." | "If the balance is insufficient, the request will yield an error." |
| "One call returns every currency the user holds — here, the thousand tokens the subscription just paid out." | "The purchase went through. The user has a thousand tokens in their wallet." |

Identifiers, exact error codes, and words like *atomic* don't survive. Concrete nouns do — *wallet*,
*penguin*, *meal plan*. Write the spoken version and let the docs carry the identifier.

## Describe the control, not the strategy

What a control does survives the microphone. Advice on how to use it does not. From video 24:

| Draft | Delivered |
|---|---|
| "An even split finds an answer fastest. Weight it the other way if you'd rather keep most people on the version you trust." | "The **Weight** parameter determines how Adapty splits your traffic between the two variants." |
| "A test runs for one audience. Leave it on everyone, or point it at a segment — one country, one app version, users who haven't logged in yet. Same test, narrower question." | "Finally, select an audience. You can run an A/B test for all the users of your app or just a specific segment." |

**And don't narrate what the screen already states.** Two more cuts from the same draft: "It runs from
1 to 100 percent, and Adapty marks the leader in green" — both visible on the results table — and an
enumeration of the three options in the stop dialog, which became "select the winning variant to
display".

## Introducing a set, and closing one

**One line each, the same shape.**

> Element variables store information about user interactions, like quiz answers and input values.
> Custom variables are the ones that you create and define yourself.
> Product variables store information about the products you're selling in the flow.

**Then define by contrast**, which does the discriminating work a definition can't:

> Product and element variables come from somewhere — the store, or a user interaction. Custom
> variables are all yours.

**Name the shape once it has been demonstrated, then stop** — often as a triad:

> That's a working button, and this shape never changes. Element, trigger, action.

## Outros

Three of the recorded videos gather the content into three items, then close. It is a pattern worth
reaching for, not a requirement — 24 closed on one plain sentence, "A/B tests are a great tool to
experiment with new ideas", and dropped the triad its draft had ("A price. A headline. A trial
length."):

> A button that moves the user forward. A line of text that reveals a hidden element. A header that
> sends an invisible signal to your app. All made from the same basic building blocks.

> Live pricing, personalization, and your own values, carried from one screen to the next.

> Two screens, wired together, in just a few minutes.

A cross-reference may follow: "To learn how to drive flow logic with these same variables, watch our
conditional logic tutorial."

## The sign-off varies — don't force it

Delivered forms differ between videos:

> Read the docs in the description to learn more. Drop a comment if you have any questions. Thank you
> for watching.

> Read our documentation to learn more. Leave a comment if you've got any questions. Thank you for
> watching.

Write the standard form in drafts (`structure.md`). Never normalize a transcript back to it.

## Documentarian drift — what it looks like

From an untranscribed draft (16-workspace):

> The center canvas allows you to preview the flow, and approximate what the flow will look like on
> the user's device.
> **Products** lists every product used in the flow. It's read-only; you add products from the right
> panel.

Symptoms: *allows you to*, a panel-by-panel enumeration, no demo, no deixis, nothing happening. This
is the most common failure in the drafts, because reference material is what's easiest to write.

Fix by finding the action: what would someone *do* here, and what changes on screen when they do it.
