---
zone: app-and-account-settings
sources: []
reviewed_shape:
reviewed_at:
---

## What this is

The Adapty dashboard's own account and app configuration screens: app details (name, icon, timezone, SDK/API keys, Small Business Program status), entering Apple/Google store credentials so Adapty can talk to the stores, account/billing management, team member permissions, and transferring an app to a different Adapty account. Readers are the person administering the Adapty account or app on the dashboard, not a developer writing app integration code. It's the "settings" surface, distinct from any feature's own configuration — a paywall's or flow's settings live in paywalls-legacy or flow-design/flow-logic, not here.

## Surfaces

## Sources of truth

## What we document, what we don't

## Articles
<!-- mill:auto:roster -->
| id | role | audience | sections | sidebars |
|---|---|---|---|---|
| account | — | dev | 3 | tutorial |
| android-settings | entry | dev | 0 | tutorial |
| general | — | dev | 10 | tutorial |
| ios-settings | — | dev | 0 | tutorial |
| members-settings | — | dev | 3 | tutorial |
| transfer-apps | — | dev | 5 | tutorial |
<!-- /mill:auto -->
## Reader jobs

## Ripple rules

## Boundaries

- **apple-platform / google-platform** — is the ticket about which fields to fill in on Adapty's settings page (app-and-account-settings), or about how to obtain those values from App Store Connect / Google Play Console in the first place (apple-platform/google-platform)? Obtaining credentials is apple-platform/google-platform; entering them into Adapty is app-and-account-settings.
- **testing-and-release** — is this about account/app configuration itself, or about using that configuration to test purchases or submit an app to a store?
- **server-side-api** — is the ticket about the account-level SDK/API key shown in app settings (app-and-account-settings), or about calling the Server-Side API with it (server-side-api)? Managing/viewing the key is app-and-account-settings; authenticating API calls with it is server-side-api.

## Ticket language

Flat zone — rows name articles directly. Corpus-wide synonyms live in `aliases.md` and are not
repeated here. Note the split that catches most tickets: `general` is the **app**-level settings tab,
`account` is the **account**-level one (profile, billing, members) — "settings" alone doesn't say which.

| How a ticket says it | Where it actually lives |
|---|---|
| "who can see revenue/billing", "read-only access for a contractor", "support should only see profiles" | `members-settings`. The role table is the whole answer: only **Owner** has billing access (one per account), Owner and Admin are the only roles that can add members or grant app access, and **Developer** is the role for full write access *without* financial data — everything except analytics and members. |
| "invite is failing", "colleague already has an Adapty account", "can't add a teammate" | `members-settings`. You can only invite an email not already registered in Adapty; the fix is a different address or asking support to delete their standalone account. Not a seat limit — the cap is 256 members and they're free. |
| "hand the whole Adapty account to someone else" | `members-settings` — account ownership transfer is not self-serve, it goes through support. App-level handover is a different thing: `transfer-apps`. |
| "we were acquired", "selling the app", "change app owner", "purchases stopped mid-transfer" | `transfer-apps`. Order is load-bearing: store transfer first, Adapty second, and the Adapty side is a support request, not a dashboard action. App Store Connect API keys are **account-scoped, not app-scoped**, so the new owner regenerates all of them; the app-specific shared secret keeps validating receipts during the window, which is why purchases survive. |
| "where's the SDK key", "which key is public vs secret", "rotate the key", "the secret key leaked" | `general` (SDK and API keys) — public SDK key for SDK activation, secret key for the Server-Side API, generated and revoked in the same place. Developer CLI tokens are **not** here (Settings → Developer API, `agent-tooling`); using the secret key to call the API is `server-side-api`. |
| "analytics is off by a day", "dashboard doesn't match App Store Connect", "integration timestamps differ" | `general` (reporting timezone) — it silently shifts every chart, and the checkbox there applies it to every app in the account at once. Integrations always use UTC regardless, so a dashboard-vs-integration mismatch is expected behavior, not a bug. |
| "install counts don't match App Store Connect / AppsFlyer", "installs are zero", "reinstalls counted twice" | `general` (installs definition). Counting by `customer_user_id` reports **zero** installs for an app that never identifies users, and diverges from the device-based numbers every store and attribution platform reports. Only affects the Analytics page — Overview is configured separately. |
| "raised prices in App Store Connect", "existing subscribers billed the old price", "revenue wrong after a price change" | `general` (App Store price increase logic). The chosen option is not analytics-only — it changes integration payloads and transaction handling too. |
| "commission calculated at the full rate", "we're in the Small Business Program" | `general` (reduced store fee) is where you tell Adapty the status — and it applies to **future transactions only**, so it must be set before the period starts; extending or losing eligibility means editing the period, not just toggling. Whether you qualify and how to enroll is `apple-platform` / `google-platform`. |
| "users still get the old A/B variant", "test ended but the variation persists", "how long is a user pinned to a variation" | `general` (cross-placement variation stickiness; max and default 90 days). Changing it instantly requalifies everyone who already received a variation and can spoil a running test. Designing the test itself is `ab-tests`. |
| "delete the app", "start over with a clean app" | `general` — irreversible, and takes the data with it. |
| "two accounts sharing one subscription", "test device isn't seeing paywall updates" | Both appear as sections of `general`, but the answers live elsewhere: paid-access sharing (which has its own separate sandbox setting) in `subscribers-and-profiles`, test devices in `testing-and-release`. Treat those `general` sections as an index, not the source. |
| "how much does Adapty cost", "what's included in our plan", "revenue limit", "upgrade the plan" | **Not documented in `src/content/docs` at all.** `account` only links out to adapty.io/pricing; no article states plan tiers, limits, or what a paid feature costs. Say so and point at the pricing page or support rather than routing the reader into the docs. |
| "change my password", "wrong date format", "stop/schedule the emailed report" | `account` (General tab). These are per-person account settings, not per-app: date/time format is a display preference, email reports are daily/weekly/monthly, either summarized across all apps or one report per app. |
| "where do I paste the App Store key / service account JSON / RTDN topic" | `ios-settings` and `android-settings` — field lists for Adapty's iOS SDK and Android SDK tabs, and nothing more; every "how do I obtain this value" answer is `apple-platform` / `google-platform`. The one thing readers miss: the App Store Connect shared secret field is **legacy** (pre-SDK 2.9.0) and not part of a new setup. |

## Gaps and misses

