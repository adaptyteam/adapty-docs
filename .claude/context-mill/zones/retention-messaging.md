---
zone: retention-messaging
sources: []
reviewed_shape:
reviewed_at:
---

## What this is

Apple's Retention Messaging API shows a subscriber a custom message on the iOS **Cancel Subscription**
screen, right before they confirm. Apple calls a realtime endpoint at that moment, and **Adapty hosts and
answers that endpoint** — so the customer writes, localizes, tests and submits messages entirely in the
dashboard, with no SDK call and no app release. The dashboard page is titled **Apple Retention Messaging
API**.

Two message types: a **default** message (plain copy, optional image, acts as the fallback) and a
**promo** message (adds a promotional offer or a plan switch, and requires a default on the same
product). Two environments — sandbox and production — with **separate message lists**, switched by a
**Sandbox mode** toggle. Apple reviews every locale of every message before it goes live. App Store only;
there is no Google Play equivalent.

## Sources of truth

- **Backend and dashboard behavior: Adapty's closed-source code, not citable here — confirm with the
  product team or by testing in the dashboard.** Everything below was verified against dashboard code on
  2026-08-17–20; the backend carries no retention-messaging logic that could be read. The feature moved
  fast in August 2026 (the access-request flow, the app-level preconditions, the realtime-URL query and
  the per-locale field limits all landed then), so re-confirm anything older than that.
- **Message states are exactly `live | in_review | rejected | inactive` — there is no `draft` state on
  the API.** **Draft** is a display-only badge in the message form header and is absent from the
  table's State filter.
- **Preconditions and gating** (dashboard code, 2026-08-20). Setup is blocked in order: app not
  registered → no products → sandbox URL. Sandbox is complete when credentials are present **and** the
  app is registered **and** the sandbox URL points to Adapty **and** the performance test passed;
  production additionally needs the production URL. The **Sandbox mode** toggle is disabled until
  sandbox setup is complete, so production is genuinely unreachable before the test passes — not merely
  discouraged.
- **The endpoint URL the customer submits to Apple** appears in two places: the 3-step guide shown on
  the Retention Messaging page while the app is not registered, and an **Apple Retention Messaging API**
  section on **App settings → iOS SDK**. **One URL serves both environments** — stated verbatim in the
  dashboard copy. If Adapty has not provisioned a URL for the app yet, the block renders a
  contact-support message.
- **UI copy is the only source for what the performance test actually requires**: an active **sandbox
  or TestFlight** transaction, which the developer purchases; **up to an hour** to run; retry button
  **Try Again**. Note what is *not* knowable here — the dashboard shows a flat "Failed to start
  performance test. Please try again." whatever the backend's reason. **Why a test failed is invisible
  in the product**, which is why these tickets all reach support.
- **Content limits** (dashboard code, 2026-08-20): name 60, title 66, body 144 characters; 20 products
  per message; default locale `en-US`; image hint "PNG · 3840 px wide · 160–2160 px tall · No
  transparency", enforced pixel by pixel. The load-bearing one: the **title and body limits apply to
  every locale**, so an AI translation that runs long blocks **Submit To Review** on a cell the reader
  never typed in.
- **The locale set is a fixed 48-entry list**, each Apple locale code mapped to a translation code.
  English (U.S.) is the source language.
- **An edit always resubmits the whole message.** Name, title, body, products and localizations go
  through a single update no matter which step's button was pressed — so **Save Changes** on the
  General step is not a lighter-weight save, and "any edit to a Live message returns it to review" is
  correct as the docs state it.
- **Reactivation does not re-enter Apple's review.** The confirm-modal copy is explicit: deactivating
  hides the message "but not deleted. You can reactivate it anytime without going through review
  again", and activating "may take a few minutes to appear for all users".

## What we document, what we don't

Delta from `scope.md` only.

- **The Apple access request is ours to document, even though Apple owns the decision.** The reader
  cannot guess that the endpoint URL is Adapty-provided, self-serve, and the same for both environments —
  and Apple's form asks for it before anything in Adapty can be configured. This was the single
  highest-volume gap in the zone (the most frequent support handoff in a one-week sample).
- **Skip the visible gating, keep the delayed gating.** Disabled buttons with hints, per-message state
  badges, the 20-product hint and the image-format hint are all on screen — `scope.md`'s obvious-UI rule
  covers them. The exception is a limit that only bites later: the title/body limits reappear on
  *translated* cells and block submission, which the form does not announce up front.
- **Write the prescription for the performance test, not the failure taxonomy.** The product shows one
  generic error, and the causes are backend-side and partly unconfirmed. Documented guidance is
  therefore "use your longest-duration product, keep it active, start the test right after the
  purchase" — which stays correct whichever way the underlying causes are resolved.
- **Don't restate Apple's program terms, review criteria or SLAs.** We document what Adapty does, what
  the reader supplies, and that Apple's review takes up to a month and is Apple's alone.

## Articles
<!-- mill:auto:roster -->
| id | role | audience | sections | sidebars |
|---|---|---|---|---|
| retention-messaging | entry | — | 1 | tutorial |
| retention-messaging-analytics | — | — | 4 | tutorial |
| retention-messaging-create | — | — | 9 | tutorial |
| retention-messaging-setup | — | — | 7 | tutorial |
<!-- /mill:auto -->
## Boundaries

- **`apple-platform`** — the App Store Connect API key and the **App settings → iOS SDK** page belong
  there (`app-store-connection-configuration`). Here we name the key as a prerequisite and point at the
  **Apple Retention Messaging API** section on that page; anything about obtaining or fixing the key
  itself is that zone's.
- **`testing-and-release`** — sandbox accounts, TestFlight, and the accelerated renewal schedule are
  `test-purchases-in-sandbox`. The performance test links to that schedule instead of restating it,
  which is what keeps the two from drifting.
- **`analytics`** — `retention-messaging-analytics` is this zone's (the Shown / Retained / Retention rate
  columns on the Retention Messaging page). `analytics-retention` is cohort retention charts in
  `analytics`, an unrelated feature with a confusingly similar name.
- **`products-and-offers`** — a promo message attaches an App Store promotional offer or a plan switch,
  but creating either is `app-store-offers` / `create-product`.

## Reader jobs

One reader, moving through three stages, and almost every ticket comes from the first two. Grounded in
aggregated support handoffs; the third stage has no ticket evidence yet.

1. **"I'm trying to turn this on and I'm blocked by Apple or by the dashboard."** They are pre-launch,
   often before Apple has approved the app, and the blocker is an unexplained gate: Apple's form wants a
   URL they don't have, a button is disabled, or the performance test fails with one generic error. They
   land on `retention-messaging-setup` and need the sequence and the gates, not the concepts. This is the
   zone's dominant reader by ticket volume, and its questions are answerable only from UI copy and
   support history — never from a spec.
2. **"The message is written and something about the review or the state is confusing me."** They are on
   `retention-messaging-create`, watching a state that isn't moving, or blocked at **Submit To Review**
   by a cell they didn't type. They need the state semantics, what re-enters Apple's review and what
   doesn't, and the per-locale limits.
3. **"It's live and I want to read the numbers."** `retention-messaging-analytics`. Their real question is
   why **Retained** trails **Shown**, which is a definition question, not a bug.

## Ticket language

| How a ticket says it | Where it actually lives |
|---|---|
| "Apple is asking for an endpoint URL", "what URL do I give Apple", "do we have to build the endpoint", "how do we get approved" | `retention-messaging-setup` → *Request access from Apple*. The URL is Adapty's and self-serve: **App settings → iOS SDK** → **Apple Retention Messaging API**, or the 3-step guide on the Retention Messaging page while the app is unregistered. Same URL for sandbox and production. Adapty runs the endpoint, so there is nothing to build. Apple's review takes up to a month and is Apple's alone. |
| "the performance test failed", "test failed again", "what am I supposed to purchase" | `retention-messaging-setup` → *Pass the performance test*. The purchase is the developer's, it must be a **sandbox or TestFlight** purchase of a normal App Store Connect product (there is no sandbox-only product), and it must stay **active** for the whole run. Use the **longest-duration** product: sandbox subscriptions renew on the accelerated schedule in `test-purchases-in-sandbox` and stop after a set number of renewals, so a monthly one can lapse inside the window. The product shows one generic error either way — read Gaps before promising a cause. |
| "how long does the test take", "it's been 20 minutes" | `retention-messaging-setup`. **Up to an hour**, not minutes — the docs said "a few minutes" until 2026-08-20, which is what set the wrong expectation. |
| "can't turn off Sandbox mode", "the production option is greyed out" | `retention-messaging-setup` → *Switch to production*, and `retention-messaging-create` for the create dialog. Production needs the sandbox performance test **passed** and the production URL configured; the toggle is disabled until the first of those, so this is a real block, not a UI glitch. |
| "message says In review days later", "one locale is holding up the whole message" | `retention-messaging-create` → *Message states*. Apple reviews each locale separately and the message goes live only when all are approved. There is no **Draft** state in the list — a message is not saved at all until you submit it. |
| "reactivated a message and it went back to review", "do I have to resubmit after deactivating" | `retention-messaging-create` → *Deactivate and reactivate*. Reactivation **skips** Apple's review and takes a few minutes to reach subscribers. The docs said the opposite until 2026-08-20. |
| "can't submit, a translation is too long", "the AI translation broke my message" | `retention-messaging-create` → *Localization*. Every locale must fit the English limits (66 title / 144 body); an over-long translated cell blocks **Submit To Review** until it is shortened. |
| "Retained is lower than Shown", "the retention numbers don't add up" | `retention-messaging-analytics`. Metrics count cancellation attempts, not people, and Adapty infers the outcome from subscription events — it cannot see the Cancel Subscription screen. |

## Gaps and misses

- **The backend's "no active sandbox transaction" failure remains unverified.** The dashboard has no
  error branch for it (checked 2026-08-20), and the backend carries no retention-messaging code that
  could be read, so this needs product or backend confirmation — another code read will not settle it.
  The documented prerequisite (active sandbox/TestFlight purchase, longest duration) is confirmed
  independently from UI copy and from support, so the published guidance does not depend on this answer.
- **`retention-messaging-create`'s activation-conflict claim could not be confirmed** — "if another
  message of the same type claimed the product while this one was inactive, activation fails". The
  dashboard has no conflict error path for status changes (checked 2026-08-20) and surfaces a flat
  "Failed to update message status. Please try again." Left in the article unchanged and flagged here: it
  may well be a backend rule that was known when the article was written, and this is not evidence
  against it.
- **Both setup screenshots are stale**, neither caused by a docs edit: the sandbox card was retitled and
  its button relabelled 2026-08-04–11, and the test card's copy changed with it.
  `retention-messaging-configure-sandbox-url.webp` and `retention-messaging-test-sandbox-url.webp` both
  need recapture, plus a new one for the access-request guide.
- **How promo offers and plan switches get chosen in the General step is unwritten here** — the
  dashboard asks the backend for suggestions, but what makes a product or plan eligible to appear is
  backend logic this zone has no source for. Wants an interview pass, not another code read. The same
  applies to stage 3 of Reader jobs, which has no ticket evidence behind it yet.
