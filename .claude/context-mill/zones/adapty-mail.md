---
zone: adapty-mail
sources: []
reviewed_shape:
reviewed_at:
---

## What this is

Adapty Mail is a separate product surface that turns existing Adapty profile data into AI-generated
email sequences aimed at converting trial users into paid subscribers: brand setup, email collection,
flow/trigger and segment targeting, campaign creation, A/B testing of emails, checkout pages,
sending-domain/DNS setup, suppression/unsubscribe handling, analytics, and a server-side API for sending
data without the mobile SDK. It requires its own domain and its own web checkout, and is not part of the
core in-app paywall/subscription product.

## Surfaces

## Sources of truth

## What we document, what we don't

## Articles
<!-- mill:auto:roster -->
| id | role | audience | sections | sidebars |
|---|---|---|---|---|
| adapty-mail | entry | marketer | 4 | tutorial |
| mail-ab-testing | — | marketer | 7 | tutorial |
| mail-analytics | — | marketer | 9 | tutorial |
| mail-brand | — | marketer | 8 | tutorial |
| mail-checkout | — | marketer | 7 | tutorial |
| mail-collect-emails | — | marketer | 3 | tutorial |
| mail-create-campaign | — | marketer | 4 | tutorial |
| mail-create-flow | — | marketer | 4 | tutorial |
| mail-email-campaigns | entry | marketer | 0 | tutorial |
| mail-flows | entry | marketer | 5 | tutorial |
| mail-get-started | — | marketer | 11 | tutorial |
| mail-profiles | — | marketer | 7 | tutorial |
| mail-segments | — | marketer | 7 | tutorial |
| mail-send-data-via-api | — | marketer | 4 | tutorial |
| mail-sending-domain | — | marketer | 8 | tutorial |
| mail-suppression | — | marketer | 5 | tutorial |
<!-- /mill:auto -->
## Reader jobs

## Ripple rules

## Boundaries

- **`integrations`** — is the destination an email/messaging channel Adapty Mail sends to as its own
  product (here), or a third-party messaging/push destination Adapty forwards subscriber events to
  (`integrations`' `messaging`/`braze`/`onesignal`/`pushwoosh`/`slack`)? Adapty Mail composes and sends
  its own emails; `integrations` only forwards event data to platforms the customer already owns.
- **`web-payments`** — `mail-checkout` builds a checkout page for email-driven purchases. Is the ticket
  about the payment-provider connection itself (Stripe/Paddle account setup, `web-payments`), or the
  Adapty-Mail-specific checkout flow/page built on top of it (here)?
- **`subscribers-and-profiles`** — `mail-segments`/`mail-profiles` use the same profile data as
  `subscribers-and-profiles`. Is the ticket about profile data generally (`subscribers-and-profiles`), or
  about how Adapty Mail selects/targets recipients from it (here)?
- **`server-side-api`** — `mail-send-data-via-api` is Adapty Mail's own dedicated API surface
  (`api-mail.adapty.io`), separate from the general `server-side-api` zone's Profile/Purchase endpoints
  on the main Adapty API. Distinguish by which base URL/spec is involved. Note where each half lives:
  the *guide* (`mail-send-data-via-api`) is this zone's, while the endpoint and field reference is the
  `adapty-mail-api.yaml` spec, zoned to **`other-apis`** — so an endpoint or field change is an edit
  there, not here.

## Ticket language

One article per feature, so the roster's own titles already answer "where is segments/analytics/brand".
Rows below are only the cross-cutting concerns — ordering constraints, where data comes from, and the
boundaries that get mis-filed. Corpus-wide synonyms (Adapty Mail ↔ email campaigns ↔ `mail-` prefix)
live in `aliases.md` and are deliberately not repeated here.

| How a ticket says it | Where it actually lives |
|---|---|
| "everything is configured but nothing is sending", "Enable button is greyed out", "campaign stuck in draft" | `mail-get-started` step 6 — the setup order is load-bearing and this is the classic failure. **Enable sending comes last**: the Adapty integration toggle in Settings → Integrations is disabled until at least one flow row exists ("Set up at least one flow before enabling Adapty integration"). A campaign is a separate blocker — it has no publish action and stays `draft` until attached to a flow (`mail-create-campaign`). |
| "our app doesn't collect emails", "no login in the app", "not enough recipients to launch" | `mail-collect-emails`. Two values, in order: a stable `customer_user_id` first (there's no profile to attach an email to otherwise), then `email` via `updateProfile`. Anonymous profiles and profiles with no email are excluded from delivery *and* from campaign analytics. The 30–50% coverage target is a launch gate, not 100%. |
| "checkout link errors out", "user not identified at checkout", "purchase not attributed to the email" | `mail-checkout`. Three distinct causes: the web paywall was never **published**; `Adapty.identify()` wasn't called before the email was sent; or the `cid` parameter is missing from the URL. The attribution mechanism itself (last-click on `scheduled_email_id`, back-filled only onto purchases with no existing attribution that post-date the click) is documented in `mail-analytics` — personalization placeholders are a separate mechanism from attribution. |
| "launch the campaign", "schedule the sequence", "change who gets it and when" | Split by which half of the pair it is. Content (copy, images, delays, email count) is `mail-create-campaign`; trigger + audience + going live is a **flow row** — `mail-create-flow` for the mechanics, `mail-flows` for the concepts. Nearly every "campaign doesn't send" ticket is really a flow-row ticket. |
| "wrong sequence went out", "the broad audience swallowed my targeted one", "All Users row rejected on save" | `mail-flows` priority: rows are walked top to bottom, the first matching segment wins, later rows are never evaluated for that user. The backend rejects saves where an **All Users** row isn't last. |
| "which trigger fires for a cancelled/failed/lapsed/refunded subscription", "add a custom trigger" | `mail-flows`. Five fixed triggers; the list is not extensible. Non-obvious: trial users are **not** in Never purchased — starting a trial counts as an active subscription — and Renewal cancelled / Expired each cover both paid and trial audiences, split via segment filters. |
| "change the targeting on a running flow", "can't edit the segment filters", "combine two conditions with OR" | `mail-segments`. Filters lock as soon as the segment is Live (name and description stay editable) — to retarget, create a new segment and swap the flow row. Filters are AND-only, one filter per field, and there's no audience-size preview. |
| "emails going to spam", "why can we only send 200 a day", "delivery is trickling out over a week" | `mail-sending-domain` — warm-up, not a bug or a plan limit. Every new domain starts at Tier 1 (200/day) and climbs 14 tiers automatically; bounce or complaint rates pause and can reverse advancement. Audience size determines how long launch spreads out. |
| "domain verification stuck", "we want to send from a subdomain", "change or delete our sending domain" | `mail-sending-domain`. Apex domains only; the `mail.`/`email.`/`hello.` prefixes are hardcoded; one domain per project and globally unique across projects; a 7-day verification window (records survive it); manual checks have a 60-second cooldown; **verified domains can't be deleted or swapped from the dashboard — that's a support request**. |
| "this specific person stopped getting emails", "take someone off the suppression list", "GDPR erasure request" | `mail-suppression`. Two mechanisms that read alike and aren't: **suppression** excludes the profile from all future sends in the project (unsubscribe, bounce, complaint, reject, throttle), while a **stop condition** only cancels the current sequence because the user converted — they stay eligible for other campaigns. Any bounce suppresses immediately, including a full mailbox; there's no soft/hard split and no retry. There is no UI to unsuppress or to erase data — support. The one manual action that does exist is per-profile **Unsubscribe** on `mail-profiles`. |
| "open rate is impossibly high", "bounce numbers don't break down", "range too wide warning" | `mail-analytics`. Opens are pixel loads and Apple Mail Privacy Protection pre-fetches them on iOS 15+ — clicks and revenue are the trustworthy signals. Bounces collapse hard and soft into one count. Counts are eventually consistent, not streaming. |
| "attributed revenue doesn't match LTV", "which email drove the purchase" | `mail-profiles` for the per-customer view and the definition split (attributed revenue = purchases after engaging with a campaign; LTV = all revenue from all sources), `mail-analytics` for the aggregate view and the attribution rule. |
| "we have no Adapty SDK", "import our existing subscriber base", "which `event_type` maps to which flow" | `mail-send-data-via-api` — the guide, plus the `event_type` → flow mapping table. Two constraints: profiles sent **before** setup is finished never receive anything, and a profile alone only reaches the Never purchased flow — every other flow needs transaction events. The endpoint/field reference is not here: the `api-mail.adapty.io` spec is owned by `other-apis`, and its public surface is only the two Profile endpoints. |
| "copy is off-brand", "tone is wrong", "replace the App Store URL the AI used" | `mail-brand` is where all generated copy, tone, and visuals come from — one brand per project, one source per type, and **no per-source removal**, so replacing a source means deleting the brand and re-onboarding. Edits are blocked while a source is processing. Tone is locked to a campaign at generation time, so retoning means a new campaign (`mail-create-campaign`). |
| "test two subject lines", "compare two versions of the sequence" | Two different features. Subject lines need nothing: each generated email already ships three variants and the best performer continues automatically (`mail-create-campaign`). Comparing whole sequences is `mail-ab-testing` — each variation is a full campaign, routing is weighted-random per event (not sticky per user), and launch and finish both happen from the flow row, never from the A/B Tests page. |

## Gaps and misses

