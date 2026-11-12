# Product terms and domain rules

Current Adapty names and the product-domain rules that no linter checks. Current names win; a date
marks when a term changed. UI labels still come from the frontend (Area 11).

## Terms

- **Flows** are the entity. The tool is the **Flow & Paywall Builder** (capital B, ampersand). Use
  the full name on first mention and wherever it doesn't hurt readability; later mentions can say
  "the builder". Never "Flow Builder" in new text. In text that covers both builder generations,
  "our builder". Never "flow" for a sequence of steps.
- **Old Paywall Builder** is the deprecated builder. Keep "old Paywall Builder" wherever it's used;
  don't change it to "legacy builder". Its paywalls are "paywalls from the old Paywall Builder" or
  "legacy builder paywalls", never "legacy Paywall Builder paywalls".
- **Custom paywall** (2026-09-30): a paywall the app renders itself from SDK product data; remote
  config is optional. Not "headless". In intros where remote config isn't the subject, "manually
  implemented paywall" also works. Keep "custom paywall" where it already exists.
- Flows come before paywalls in every enumeration.
- A placement **serves** one content type (a flow, a paywall, or an onboarding); it doesn't include,
  contain, or have it. Each type has its own remote config.
- "Paywall" has three senses: the SDK paywall object, a paywall from the old Paywall Builder, and a
  paywall screen in a flow. Name the one you mean.
- **Purchases**: a flow displays products and triggers a purchase; a button or a **Purchase** action
  starts it; the store completes it. Nothing in a flow buys, sells, or purchases, and nothing sells
  "on" or "from" a screen.
- **Access levels**, never "entitlements".
- **Profiles**, not "user accounts" or "users", where anonymous profiles count.
- **Field** only for something on screen. SDK and API members are **properties** or **parameters**.
- **Google Analytics** and **Firebase**, never "GA4" or "Firebase Analytics".
- **Apple Ads**, never "Apple Search Ads" in new text; code values such as `apple_search_ads` stay as they are. **Adapty SDK**, not a bare "SDK", where another SDK could be meant.
- **Products panel**: "the products you added to the screen", never "products on the screen".
- **Add element** panel: "Open the **Add element** panel.", with no route: it has several entry
  points.
- 12-month commitment: **upfront plan** and **commitment plan**, never "monthly plan".
- Adapty Mail terms that shadow core Adapty terms get a qualifier: Adapty Mail's **Profiles** vs
  Adapty profiles, Adapty Mail flows vs flows.
- SDK versions: no "current", "legacy", "deprecated", "new", or "modern" labels. Name the version.

## Domain rules

- **Deprecated features**: don't teach, sell, or link a deprecated path. Say it "isn't recommended",
  firmly, scoped to new items. Mention the legacy sense in one line, and say that existing items keep
  working.
- **Rollout state**: document a flag-gated or early-access feature as available. Never mention its
  flag, gating, beta, or limited availability.
- **Account roles**: a task article assumes the reader has the role the task needs. No role
  prerequisites, role tables, or "only admins can" sentences. The article about roles owns their
  definitions.
- **Integrations**: present a third-party tool by what only it does (external channels, its own
  reports). Don't suggest it for what Adapty already does (in-app targeting, paywall A/B tests,
  subscription analytics).
- **Scope**: edit release notes and What's new only as their own task. Code samples are the
  developers' call: never add, drop, or merge them on the writer's authority.
