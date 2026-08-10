---
zone: subscribers-and-profiles
sources: []
reviewed_shape:
reviewed_at:
---

## What this is

The customer record: how Adapty creates, links, and tracks user profiles (anonymous, identified,
parent/inheritor relationships), the CRM view for browsing and searching profiles, segmenting profiles
for support or targeting, the raw per-profile event feed, and sharing paid access across a user's
multiple accounts or devices. This is the "who is this user and what's true about them" layer, read by
support and analyst roles far more than by developers writing code.

## Surfaces

## Sources of truth

## What we document, what we don't

## Articles
<!-- mill:auto:roster -->
| id | role | audience | sections | sidebars |
|---|---|---|---|---|
| event-feed | — | support, analyst | 0 | tutorial |
| how-profiles-work | — | support, analyst | 6 | tutorial |
| profiles-crm | entry | support, analyst | 8 | tutorial |
| segments | — | support, analyst | 7 | tutorial |
| sharing-paid-access-between-user-accounts | — | support, analyst | 6 | tutorial |
<!-- /mill:auto -->
## Reader jobs

## Ripple rules

## Boundaries

- **`access-levels`** — is the ticket about a customer's current entitlement state as shown on their
  profile (here), or about defining/assigning the entitlement itself (`access-levels`)?
- **`analytics`** — is the ticket about one individual customer's record/history (here), or about
  aggregate metrics/charts across all customers (`analytics`)?
- **`placements-and-audiences`** — "segment" is used in both zones. Is the ticket about a CRM/profile
  segment for lookup and support (here), or an audience used to target a placement variant
  (`placements-and-audiences`)?
- **`attribution`** — does the ticket concern a profile's identity/CRM data (here), or the
  acquisition/campaign data attached to that profile (`attribution`)? `sharing-paid-access-between-user-accounts`
  is squarely here since it's about entitlement continuity, not acquisition.
- **`integrations`** — `event-feed` shows raw events on a profile for reading; the webhook/event
  delivery mechanism that forwards those same events to third parties is `integrations` — same events,
  different lens.

## Ticket language

Five articles, so rows name article ids directly. Corpus-wide synonyms (profile ↔ customer profile ↔
`getProfile`) live in `aliases.md` and are deliberately not repeated here.

| How a ticket says it | Where it actually lives |
|---|---|
| "did this transaction even reach Adapty", "the webhook never fired", "integration didn't send", "check delivery status" | `event-feed` — the first debugging stop for anything shaped like *did Adapty see it, and did it forward it*. Two blind spots make the feed lie: server-side API **v1** transactions never appear (v2 `setTransaction` does), and events that arrived before the SDK identified anyone have no profile to hang on. AppsFlyer, Facebook Ads and Branch statuses can read as success wrongly — those partners don't always return errors. |
| "the event is in the export/analytics but not on the profile", "counts don't match the Profiles list" | `how-profiles-work` § Transactions without profiles. S2S store notifications (App Store, Google Play, Stripe, Paddle) for users who never touched your app through the SDK land with `profile_id = null` — visible in charts and exports, absent from Profiles. Filter `profile_id IS NULL` to find them. |
| "duplicate profiles for one person", "restore created a second profile", "`profile_id` changed after reinstall", "renewals only show on one of the two profiles" | `how-profiles-work` § Parent and inheritor profiles. The parent is whichever profile **recorded the purchase first** (receipt order, not creation order), and only it gets transactional events; inheritors get `access_level_updated` only. `profile_id` is therefore not stable across a chain — reconcile on `store_original_transaction_id`. |
| "webhook event dated in the future", "renewal event arrived a day early" | `how-profiles-work` § Event timestamps with future dates. Apple pushes renewal and trial-conversion notifications ahead of time (Google does not). The knock-on effect is the real ticket: future-dated events are hidden from Analytics and the Event Feed until the timestamp passes, but are forwarded to integrations immediately. |
| "find the user who complained", "search by email", "look up by transaction ID" | `profiles-crm` § Finding users. Only four keys are searchable, and email is one **only if the app sent it as a custom attribute** — a support team that never set it can't search by it. |
| "comp a subscription", "give this user premium after a billing issue", "extend their access manually" | `profiles-crm` § Granting a subscription. Constraints do the work: the expiration date must be in the future and can never be decreased, and granting creates **no** store purchase event — so this user's feed and analytics won't match a real purchase. Programmatic equivalent (`grantAccessLevel`) is `server-side-api`. |
| "I just set the attribute / the user just signed up and I don't see it" | Expected: the shared delay note in `profiles-crm` and `segments`. Event-feed data reaches the dashboard with a lag, so new profiles and attribute changes aren't immediately visible or immediately segment-matched. |
| "one subscription across several logins", "user lost their sub after reinstalling", "stop people sharing accounts", "one device per subscriber" | `sharing-paid-access-between-user-accounts`. All of these are the same three-way policy choice on General settings. The load-bearing warning: **Disabled** risks failing store review, because a legitimate user reinstalling can end up unable to reach a purchase they made. |
| "switched to Transfer access and nothing changed", "both the old and new profile still have access" | `sharing-paid-access-between-user-accounts` § Transfer access to new user. Two separate mechanisms: existing profiles only re-evaluate on the **next store event** (renewal, restore), and the old profile is revoked only if the new one already has a Customer User ID when the transaction propagates — hence the required order `activate` → `identify` → `restorePurchases`. |
| "sandbox behaves differently from production", "the parent profile keeps changing while testing" | `sharing-paid-access-between-user-accounts` § Sharing paid access on sandbox. Sandbox has its own policy setting, and Apple's minutes-long sandbox renewals can reshuffle which profile is parent — a chain pattern production rarely produces. Don't conclude from sandbox. Sandbox mechanics themselves are `testing-and-release`. |
| "can't delete this segment", "segment is blocked / in use" | `segments` § Delete segments. Blocked by any non-deleted placement, **or an A/B test that is Live *or Completed*** — Completed still serves the post-test variant to that audience, which is the part nobody expects. Deletion is permanent. |
| "target users on app version X", "roll the paywall out to the new build" | `segments` § Available attributes — the **App version (current)** vs **App version (on install)** split is the whole answer, and picking wrong silently drops upgraders. Both require strict SemVer; a leading zero (`26.03.4`) matches nobody with no error. |
| "language/country targeting matches no users", "wrong paywall by region", "VPN users get the wrong variant" | `segments` § Available attributes. Language is stored as 2-letter ISO 639-1, so `pt-BR` and `zh-Hant-TW` appear in the dropdown and match zero users. **Country** is IP-derived and refreshed at most weekly (so it drifts); **Country from store account** is the store-account country instead. |
| "attribute isn't available for segmenting", "can't filter by age / gender / campaign / my own field" | `segments`. Not a dashboard limitation — those attributes are never set automatically. They have to arrive from the app (`sdk-users-access`) or from an attribution integration (`attribution`). Also a hard ceiling: 30 custom attributes per profile. |
| "who sees this paywall", "target this group with a paywall or A/B test" | Split: defining the group is `segments`; wiring it to a placement or A/B test as an audience is `placements-and-audiences`. Tickets phrased as targeting usually need both, and the segment side is the one people skip. |

## Gaps and misses

