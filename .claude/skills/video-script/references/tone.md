# Delivered Voice

Derived from the four as-recorded scripts — the narration as actually delivered. A draft written to
these conventions needs less rewriting at the microphone.

The two failure directions are **too documentarian** (a reference page read aloud) and **too
conversational** (chatty filler). The delivered voice sits between them, and it's more clipped than
either.

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

**The viewer cannot scroll back.** A pronoun whose antecedent sat two sentences ago is simply gone,
and the listener spends the next line reconstructing it instead of watching the screen. This is the
most common defect in written prose and it costs more in narration.

A worked example, from a draft of the terminology video:

> Placement. Paywall. Onboarding. Flow — four words that are easy to mix up.
> Two questions sort them out: where does it appear, and who draws it?

*Them* is the four words. But *it* — the word? the content? the screen? Three different answers fit,
and by the second question the thread is lost. The fix names the nouns:

> Two questions settle the rest: where does the content appear, and who draws the screen?

**Counting backwards is the same failure.** *The first one*, *the second one*, *the third thing*,
*the latter* — these look precise and behave like pronouns, because the viewer has to replay the video
in their head to resolve them. From the same script:

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

The first is accurate and inert. The second says *no code* and *interactive*, which are the reasons
anyone chooses a flow.

**A definition owes the viewer a consequence.** After naming a thing, say what it lets them do or what
it costs them. A paywall entity described as "a product set — the plans, their order, their offers" is
a schema; add "so plans, prices, and offers change here, and your app picks them up" and it becomes a
reason to create one.

This is the shape documentarian drift takes when the writer knows the product well — the facts are
right, the *so what* is missing. It slips past the usual symptoms, because there is no *allows you to*
in sight.

**But a consequence must be specific, or it's a tautology.** Reaching for this rule at the end of a
script tends to produce a generic purpose statement that recaps nothing:

> All three exist so you can change what users see without shipping an app.

That says the thing exists because it has a purpose. Compare a real consequence, which names what
changes and for whom:

> Copy, design, products, all from here. Ship a change without touching your app.
> So plans, prices, and offers change here, and your app picks them up.

Test it: could the sentence be said about a different feature with two words swapped? Then it isn't
telling the viewer anything.

## Compress jargon out

Written drafts reliably carry more precision than gets spoken. From video 22, the same beat:

| Written draft | Delivered |
|---|---|
| "The call is atomic. If the user can't cover the cost, nothing changes and you get back `insufficient_balance` — so a balance never goes below zero." | "If the balance is insufficient, the request will yield an error." |
| "One call returns every currency the user holds — here, the thousand tokens the subscription just paid out." | "The purchase went through. The user has a thousand tokens in their wallet." |

Identifiers, exact error codes, and words like *atomic* don't survive. Concrete nouns do — *wallet*,
*penguin*, *meal plan*. Write the spoken version and let the docs carry the identifier.

## Define in one line, in parallel

When introducing a set, give each member one line of the same shape:

> Element variables store information about user interactions, like quiz answers and input values.
> Custom variables are the ones that you create and define yourself.
> Product variables store information about the products you're selling in the flow.

## Define by contrast

> A product variable doesn't have to point at a specific plan.
> Product and element variables come from somewhere — the store, or a user interaction. Custom
> variables are all yours.

## Name the shape once

After a mechanism is demonstrated, restate it compactly — often as a triad — then stop:

> That's a working button, and this shape never changes. Element, trigger, action.

## Outros summarize in a triad

Every recorded outro gathers the video into three items, then closes:

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

Write the first form in drafts. Never normalize a transcript back to it.

## Documentarian drift — what it looks like

From an untranscribed draft (16-workspace):

> The center canvas allows you to preview the flow, and approximate what the flow will look like on
> the user's device.
> **Products** lists every product used in the flow. It's read-only; you add products from the right
> panel.

Symptoms: *allows you to*, a panel-by-panel enumeration, no demo, no deixis, nothing happening. This
is the most common failure in the drafts, because reference material is what's easiest to write.

Fix by finding the action: what would someone *do* here, and what changes on screen when they do it.
