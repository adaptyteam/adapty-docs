---
zone: adapty-mail
sources: [mail-api-spec]
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

- **Backend and dashboard behavior is Adapty Mail's closed-source code, not citable here** — confirm
  with the Mail team or by testing in the dashboard. The public API surface is `adapty-mail-api.yaml`
  (`mail-api-spec`). Claims below are dated by when they were checked against that code or the live
  dashboard.
- **Campaign generation is gated on two things; paywall generation on a third** (dashboard, 2026-08-26).
  **Generate emails** stays disabled until the brand is saved and the company address is filled in,
  both from the onboarding status, with tooltips *"Set up your brand to enable generation"* / *"Add your
  company address in Settings to enable generation"*. **Company address** is a section on Settings →
  **Company**: five required fields (legal name, address line 1, city, postal code, country), two
  optional (address line 2, state), banner *"Campaign generation is blocked until the address is filled
  in"*, and it reaches every campaign email through a `{{ company_address }}` merge tag rendered as
  legal name / address line 1 / address line 2 / "City, State Postal" / country. AI **paywall**
  generation blocks separately when the brand isn't ready ("Brand is not ready"), when no Stripe account
  is connected, or when there are no Stripe products, each replacing the plan picker with a panel plus
  action button; a **Refresh** control on the prerequisites checklist re-syncs status. None of these
  gate *sending*, manual **Add email**, or the manual-URL paywall path — so "blocked without a brand"
  must always be scoped to generation. `mail-brand`'s "New campaigns … are blocked" is too broad for the
  same reason.
- **Setup order is the in-product checklist, and `mail-get-started` now mirrors it** (dashboard,
  2026-08-26): brand saved → domain verified → company address filled → checkout created → campaign
  created → data sending, then either "Enable sending" (→ Settings → Project) or "Start sending" (→ our
  `mail-send-data-via-api`). It hides itself once complete. **The dashboard deep-links
  `mail-get-started` with no anchor**, so renumbering its headings is safe.
- **The first sending domain has no "Add domain" button to click first.** With no domains, Email domains
  opens the form already, so the only **Add domain** on screen is its submit; the dashed button appears
  only once a domain exists (dashboard, 2026-08-26). Both `mail-get-started` and `mail-sending-domain`
  told the reader to click it as step 1 *and* as the final step — the exact thing that blocked the
  FunnelFox tech writer. Fixed in both on 2026-08-27.
- **A brand can only be started from a store listing, in the UI.** The setup form offers **App Store** and
  **Google Play** only; empty state reads *"Drop in your App Store or Google Play link and we'll build a
  brand profile from it."*, submit is **Build my brand** (dashboard, 2026-08-26). **The restriction is the
  setup screen's, not the backend's** (settled 2026-08-27 against the Mail service's live schema): the
  backend accepts six source types — App Store, Google Play, landing page, terms and privacy, social
  media, screenshots — with the source type as the only required field and **no ordering constraint**,
  so nothing requires a store source first. The dashboard's own addable-source list agrees (five types,
  landing page among them). Two limits on that finding: the endpoint authenticates with a dashboard
  account session, so it is **internal and undocumentable** by the authentication rule below; and
  acceptance of a source is not proof that a landing page *alone* yields a brand — the dashboard has an
  empty state ("Sources are processed but no brand was produced") for exactly that outcome. Docs
  consequence: `mail-get-started` scopes the claim to the setup screen and routes web-to-app readers to
  support. **Product ask raised 2026-08-27: the setup screen should offer a landing page source, since
  the backend already accepts it.**
- **Adapty Mail's vocabulary shadows Adapty's in three places, and all three reach the reader**
  (2026-08-27): **flows** (email routing here, in-app screens there — `tutorial.json` now carries a
  top-level *Flows (Beta)* **and** an *Adapty Mail > Flows* category), **segments** (Mail's own filter
  sets over Mail profiles, 11 fields, vs Adapty's placement/A-B-test audiences), and **profiles**.
  Mitigation adopted in the docs: scope the noun on first use ("Adapty Mail includes its own **flows**"),
  define each term where the reader first meets it, and never call the brand object a "profile". This is
  a product naming collision, not a wording problem — raised for the Mail team 2026-08-27.
- **Flow, trigger and send-eligibility behaviour** lives in the backend's campaign logic. The vocabulary
  mapping is load-bearing, because the backend does not call anything a "flow": a **flow** is one
  container per project per trigger, a **flow row** is a segment plus an integer priority, and a live
  send is a per-profile campaign assignment with one scheduled email per email. The five fixed triggers
  are a closed set, and a single resolver turns a purchase state into a trigger — that is where "which
  trigger fires for a grace-period / auto-renew-off user" is settled (confirm with the Mail team).
  **Since 2026-08-30 those five are the *marketing* triggers only** (verified 2026-09-03 against backend
  code, released). A second class exists: transactional campaigns run on a single transactional
  trigger, profile created, fire **once per profile per flow**, carry no unsubscribe link or
  `List-Unsubscribe` header, and are not gated by consent. Today the only transactional flow is the one
  double opt-in creates; the dashboard shows both classes as **Marketing** / **Transactional** tabs on
  Flows, Campaigns and A/B Tests.
- **Whether a specific profile is eligible to send** is decided in one place, in this order: suppression
  check, then existing active assignment, then stop condition, then throttle cooldown, then trigger
  resolution, then first matching segment by priority (backend code). Confirm it before writing any
  "configured but nothing sent" content — every one of those branches is a distinct reason a reader sees
  silence, and only some of them surface in the UI. **One more branch since 2026-08-20** (verified
  2026-09-03): a *marketing* campaign is held back while the profile still owes a double opt-in
  confirmation — setting enabled, profile created at or after the setting was last updated, and no
  email confirmation recorded. The hold is released when the profile confirms its email, which re-runs
  the marketing assignment. Turning the setting off lifts the gate but emits no event, so held profiles
  are not started retroactively.
- **Suppression** has **eight** reasons as of 2026-09-03 (backend code) — this bullet said five;
  `deleted`, `internal` and `email_validation_invalid` were added, the last by an email-validator
  release merged 2026-09-02, a pre-save third-party reachability check that suppresses
  invalid/disposable/full/disabled mailboxes at creation. It is a single nullable field on the profile,
  first write wins, and nothing in backend code clears it. Note the ownership split inside the original
  five reasons: `bounce`, `complaint` and `reject` are reported by AWS SES, while `unsubscribe` and
  `throttle` are generated by us. The stop condition is a different object entirely — a cancellation
  reason on the assignment, not on the profile.
- **The public API surface is established by authentication, not by the OpenAPI tag.** Three routes
  take the project-scoped Adapty Mail secret key: `profile/save/`, `profile/delete/`, and
  `profile/transaction-event/save/`. Corrected 2026-08-14 — this bullet said two; `profile/delete/`
  (right-to-erasure by anonymization) shipped since, and returns 204. Everything else, including the
  profile list / detail / journey / suppress routes behind the `mail-profiles` screen, takes a dashboard
  account session, and those sit under the **same `Profile` tag** as the public routes in the service's
  own schema — so "the Profile tag is the public surface" is wrong. `adapty-mail-api.yaml` is
  hand-curated to the public paths (nothing but `config.json` references it; there is no generator),
  which makes the live service schema a strict superset of it and not a docs source: a path present
  there and absent from the YAML is internal by construction.
- **`profile/delete/` is idempotent only for the identifier-based paths, never for email** (verified
  2026-08-14 against backend code). Deletion resolves through the same ladder as save, and the stored
  source-identity links survive the wipe — so a repeat carrying `external_profile_id` or
  `customer_user_id` still finds the tombstone, deletion no-ops on an already-deleted profile, and the
  caller gets 204 again. A repeat carrying only `email` returns 404: deletion nulls the email and
  lookups exclude deleted profiles, so an email has nothing left to match, and an email is never
  promoted to an identity key. Never write a flat "the request is idempotent" — the spec did, with
  `byEmail` as its worked example, which documented the one path that fails.
- **Which profile a payload belongs to is decided by one ladder** (backend code): the sender's own
  source plus `external_profile_id`, then `customer_user_id` under the custom source, then project plus
  `email`. Profile sources are Adapty, FunnelFox and custom, defaulting to custom so the public API stays
  backward-compatible. Three consequences worth writing down, all verified 2026-08-14: **email is
  write-once** (set at creation, never overwritten, so two sources disagreeing on an address can't
  ping-pong); a transaction that arrives before its identity is stored with no profile and
  **late-bound** on the next profile save; and `external_profile_id` was dropped from the profile record
  itself on 2026-08-07, so any claim that profiles are keyed by it is now false.
- **"FunnelFox" means three different things here, at three different stages** (checked 2026-08-14).
  **(1) The checkout engine — implemented and live.** Adapty Mail makes real FunnelFox calls (auth,
  funnel creation, publish status, Stripe account and products), and every AI-generated checkout *is* a
  FunnelFox funnel, which is why sandbox test emails route through the FF `/preview/` page. **(2) A
  profile source — half-built.** FunnelFox is accepted as a source and the resolution ladder merges it,
  but Adapty Mail itself never *sends* it; the sender is the `adaptymail` integration on the FunnelFox
  side. **(3) A partner workspace — stubs.** The partner-account and partner-workspace pieces are not
  implemented yet. Do not document (2) or (3) as available. When writing about (1), avoid framing it as
  an "integration" the reader sets up — it's the builder they already use, and a reader who connected
  FunnelFox for checkout will otherwise think they've done the data integration.
- **Self-serve and partner are distinct product experiences, and the docs must carry both.** A company
  created by self-serve signup has no linked partner, and a per-project flag decides whether the
  **Adapty Integration** section on Settings → Project renders at all and which sending step the
  onboarding checklist shows. So "enable the Adapty integration" is not universal advice — for a
  self-serve project that section does not exist, and the equivalent step is posting to the API.
- **CTA placeholders are per-source and the old single form is gone.** Adapty Mail substitutes
  `{email}`, `{scheduled_email_id}`, and `{<source>.external_profile_id}` for each of the three sources;
  stored paywall URLs were rewritten from `{external_profile_id}` on 2026-08-07. The canonical list a
  reader sees is the placeholder list on the dashboard's web paywall creation page. Unknown placeholders
  are left intact and a source the profile lacks resolves to `''`. There is no `cid` parameter and no
  `customer_user_id` placeholder anywhere in Adapty Mail's code.
- **Deliverability is split by owner, and the split is what limits what we may claim.** Ours: the
  14-step warm-up ladder (200 → 30000 sends/day), the intra-day smoothing of a tier's allowance on its
  first day, tier promotion, and the throttle that fires when a limit is hit. Not ours: sending itself,
  and the bounce/complaint/reject signals, are AWS SES's; the DNS identity requirements are SES's shape
  (DKIM, MAIL FROM, DMARC); and warm-up traffic and its mailbox come from third-party warm-up services.
  The apex-domain-only rule and the fixed `mail.` / `email.` sending prefixes with the `hello.` MAIL
  FROM prefix *are* our constants, so those are safe to state flatly. A provider-owned fact must be
  attributed as the provider's, because it can change without us.
- **The domain layer was reshaped between 2026-07-23 and 2026-08-17, and the bullet above is now stale
  in four places** (verified 2026-08-18 against backend and dashboard code; the multidomain,
  custom-subdomain and DNS-validation releases are merged). (1) **A project holds up to five sending
  domains**, released 2026-07-23. Sending picks a domain by probing candidates — the sticky
  recipient-and-campaign pair first with **no fallback**, then oldest-domain pinning for profiles from
  before that release, then newest-first — and throttles a message only when every candidate is over
  quota. (2) **The sending prefix is customer-chosen**, one identity per domain, not the fixed
  `mail`/`email` pair: `mail` is only the default, and the prefix is validated (63 chars, reserved
  `www/smtp/admin/api/mx/dkim`, profanity + brand-impersonation screening by an LLM moderator that fails
  open on outage). The two-prefix pair now applies only to domains registered before this change.
  (3) **The ladder is 20 tiers starting at 100/day and ending at 57,000**, not 14 starting at 200; tier
  21 means unthrottled. (4) **DNS has three record owners, not one** — SES identity (DKIM/MAIL FROM),
  warm-up credentials (the warm-up-mailbox records under the sending subdomain), and a custom
  hostname: a Cloudflare custom hostname `go.<domain>` serving media and tracked links, whose active
  state is a **required** gate for warm-up to start. Records now carry per-record `correct | mismatch |
  missing` validation, and exports are CSV plus GoDaddy/Cloudflare zone files. Also corrected: the DNS
  poll interval tops out at **1 hour**, not 32 minutes, and a warm-up domain **can be deleted after
  verification** — the verified-identities guard applies only to pending domains, so only pre-warm-up
  SES-only domains still need support to remove.
- **The setup-order gate is real but narrower than "a flow must exist."** The dashboard's *Enable Adapty
  integration* button is disabled until the onboarding status reports data sending, which the backend
  computes as an active flow **or** "the project has ever called the ingestion API" (backend and
  dashboard code). So an API-only project satisfies the gate with no flow at all. The check is
  also UI-only — enabling the integration in the backend takes no flow into account — so "Enable sending
  last" is correct ordering advice, not an enforced invariant, and must not be written as one.
- **Settings has three tabs — Company, Project, DNS — and neither "Email Domains" nor "Integrations"
  is one of them.** The dashboard's own tab labels are the ground truth. The domain wizard is an
  **Email domains** section inside **DNS**, and the integration is an **Adapty Integration** section
  inside **Project**. On 2026-07-23 the dashboard folded the old Email Domains tab into DNS, which is
  when the old paths went stale; the docs carried `Settings → Email Domains` in eight places and
  `Settings → Integrations` in three until 2026-08-14. Two button labels sit behind the same flow gate
  and are easy to swap by mistake: **Enable Adapty integration** on first setup, plain **Enable** when a
  disabled integration already exists. The tooltip is *"Set up at least one flow before enabling Adapty
  integration"* with no trailing period. Check these strings in the dashboard before writing any
  navigation path here — a tab rename ships without a docs ticket, and nothing in this repo catches it.

## What we document, what we don't

- **We document operating the product, not email marketing.** Our line is the mechanics and constraints
  the interface cannot show: what locks when a segment goes Live, which purchase state resolves to which
  trigger, why a row never fired, what a metric counts, what must happen before what. Craft is out —
  subject-line writing, sequence length, delay tuning, cadence, segmentation strategy, "what converts
  best". The AI generates the copy, which makes the copywriting question moot by design; where the
  product has one fixed answer we state the mechanic (three subject variants per email, best performer
  continues automatically), and where it is a judgement call we say what the control does and stop.
- **Internal endpoints are never documentable, however visible they are.** A route seen in the service's
  Swagger, in a dashboard network tab, or in a backend router is not public because it exists — the test
  is the project-scoped secret key. When a ticket asks for "the Mail API endpoint that does X", check its
  authentication first; if it is the account session, the honest answer is that no public endpoint
  exists and the action is dashboard-only.
- **Nothing that reads as a deliverability guarantee.** We may describe the mechanism and that it runs
  automatically; we may not state or imply an outcome — no inbox-placement or deliverability rates, no
  "this keeps you out of spam", no promise of how fast a domain reaches full capacity, and no commitment
  phrased on the sending provider's behalf. Treat any claim that bounce or complaint rates *change tier
  advancement* as unverified until confirmed against backend code with the Mail team: it is the exact shape of sentence
  that turns a mechanism into a promise.
- **What gets written here versus the three neighbours.** Against **`other-apis`**: an endpoint, field,
  enum value, required flag or error shape is an edit to `adapty-mail-api.yaml` in that zone — here we
  write only the walkthrough (what to send first, which flow needs transaction events, what happens to
  profiles sent before setup finishes). A guide that grows a field table has taken over the spec's job.
  Against **`subscribers-and-profiles`**: that zone owns how an email address and a stable
  `customer_user_id` get onto a profile; here we write only the delivery consequence — no email or no
  stable id means excluded from sends *and* from campaign analytics — and link rather than restate the
  SDK call. Against **`analytics`**: `mail-analytics` is its own surface with its own numbers, so email
  metrics are written here, but we never reconcile them with Adapty's revenue/LTV metrics — where a
  reader will compare the two, state the definition difference and stop.

## Articles
<!-- mill:auto:roster -->
| id | role | audience | sections | sidebars |
|---|---|---|---|---|
| adapty-mail | entry | marketer | 4 | tutorial |
| mail-ab-testing | — | marketer | 7 | tutorial |
| mail-analytics | — | marketer | 9 | tutorial |
| mail-brand | — | marketer | 10 | tutorial |
| mail-checkout | — | marketer | 7 | tutorial |
| mail-collect-emails | — | marketer | 7 | tutorial |
| mail-create-campaign | — | marketer | 5 | tutorial |
| mail-create-flow | — | marketer | 4 | tutorial |
| mail-double-opt-in | — | marketer | 6 | tutorial |
| mail-email-campaigns | entry | marketer | 0 | tutorial |
| mail-entry-points | entry | marketer | 0 | tutorial |
| mail-flows | entry | marketer | 8 | tutorial |
| mail-funnelfox | how-to | marketer | 4 | tutorial |
| mail-get-started | — | marketer | 15 | tutorial |
| mail-profiles | — | marketer | 14 | tutorial |
| mail-segments | — | marketer | 7 | tutorial |
| mail-send-data-via-api | — | marketer | 5 | tutorial |
| mail-sending-domain | — | marketer | 13 | tutorial |
| mail-suppression | — | marketer | 10 | tutorial |
| mail-testing | — | marketer | 6 | tutorial |
<!-- /mill:auto -->
## Reader jobs

## Ripple rules

- **Adding a new entry point** (the FunnelFox source, when it ships) is a pure addition — the
  2026-08-14 restructure shaped every touchpoint as a list so nothing needs rewriting. Create the
  article, add it under the **Entry points** category in `tutorial.json` beside `mail-collect-emails`
  and `mail-send-data-via-api`, then add one bullet to each of these four forks: `mail-entry-points`
  (the category landing page, which also feeds the `CustomDocCardList`), `mail-get-started` §1
  *Connect your data*, `mail-get-started` §6 *Start sending* (what "start sending" means for that
  source), and `adapty-mail`'s *Requirements*. Nothing in those passages counts the entry points —
  phrasing like "both paths" and "the two sources" was deliberately removed, so **don't reintroduce a
  count**. Note the API belongs *inside* Entry points, not in a section of its own: a sibling
  "Server API" category was tried and dropped — it collided with the existing top-level **Server API**
  category (Adapty's own server-side API) and hid the self-serve path from anyone browsing the nav.
  Also check `mail-checkout`'s placeholder table, which currently omits `{funnelfox.external_profile_id}`
  even though the dashboard lists it, and `adapty-mail-api.yaml`, which omits the sender-source field for the
  same reason. Both are deliberate deferrals, not oversights.

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
| "everything is configured but nothing is sending", "Enable button is greyed out", "campaign stuck in draft" | `mail-get-started` step 6 (**"Start sending"** since the 2026-08-14 restructure) — the setup order is load-bearing and this is the classic failure. **Sending comes last, on both paths**: the Adapty integration toggle on Settings → Project is disabled until at least one flow row exists ("Set up at least one flow before enabling Adapty integration"), and on the API path, profiles posted before setup finishes never receive anything. The product itself branches here — the onboarding checklist ends in either "Enable sending" (→ Settings) or "Start sending" (→ deep-links our `mail-send-data-via-api`) depending on whether the project has the Adapty integration available, so the docs must keep both branches. A campaign is a separate blocker — it has no publish action and stays `draft` until attached to a flow (`mail-create-campaign`). |
| "our app doesn't collect emails", "no login in the app", "not enough recipients to launch", "how do I connect Adapty to Mail" | `mail-collect-emails` — **retitled "Connect Adapty to Adapty Mail" on 2026-08-14 and now the Adapty *integration* page**, not just an email-collection guide. Filename kept for SEO per the CLAUDE.md convention, so the slug still reads `mail-collect-emails`. It absorbed `mail-get-started`'s SDK-setup and enable-sending sections, and is the whole Adapty path end to end: observer mode → identify → `updateProfile` → enable the integration. Two values, in order: a stable `customer_user_id` first (there's no profile to attach an email to otherwise), then `email` via `updateProfile`. Anonymous profiles and profiles with no email are excluded from delivery *and* from campaign analytics. The 30–50% coverage target is a launch gate, not 100%. |
| "which payment provider does Mail support", "can we use Paddle / PayPal" | `mail-checkout`. **Stripe only for the generated checkout** — the Stripe account and Stripe products lookups are the only payment-provider calls in Adapty Mail's code, which never mentions Paddle or PayPal (2026-08-14). Any other provider works only via **Use your own hosted paywall**, where payment happens entirely on the customer's side and Adapty Mail just redirects with substituted placeholders. Corrected 2026-08-14: `adapty-mail` and `mail-get-started` both listed "Stripe, Paddle, or PayPal" flatly, which pointed readers down the AI-generated path with a provider it can't use. |
| "checkout link errors out", "user not identified at checkout", "purchase not attributed to the email" | `mail-checkout`. Three distinct causes: the web paywall was never **published**; `Adapty.identify()` wasn't called before the email was sent; or the manual URL is missing the identity placeholder. Corrected 2026-08-14 — this row named a **`cid` parameter, which exists nowhere in Adapty Mail's code**; see the CTA-placeholder bullet in Sources of truth for the real list. The attribution mechanism itself (last-click on `scheduled_email_id`, back-filled only onto purchases with no existing attribution that post-date the click) is documented in `mail-analytics` — personalization placeholders are a separate mechanism from attribution. |
| "launch the campaign", "schedule the sequence", "change who gets it and when" | Split by which half of the pair it is. Content (copy, images, delays, email count) is `mail-create-campaign`; trigger + audience + going live is a **flow row** — `mail-create-flow` for the mechanics, `mail-flows` for the concepts. Nearly every "campaign doesn't send" ticket is really a flow-row ticket. |
| "wrong sequence went out", "the broad audience swallowed my targeted one", "All Users row rejected on save" | `mail-flows` priority: rows are walked top to bottom, the first matching segment wins, later rows are never evaluated for that user. The backend rejects saves where an **All Users** row isn't last. |
| "which trigger fires for a cancelled/failed/lapsed/refunded subscription", "add a custom trigger" | `mail-flows`. Five fixed triggers; the list is not extensible. Non-obvious: trial users are **not** in Never purchased — starting a trial counts as an active subscription — and Renewal cancelled / Expired each cover both paid and trial audiences, split via segment filters. |
| "change the targeting on a running flow", "can't edit the segment filters", "combine two conditions with OR" | `mail-segments`. Filters lock as soon as the segment is Live (name and description stay editable) — to retarget, create a new segment and swap the flow row. Filters are AND-only, one filter per field, and there's no audience-size preview. |
| "emails going to spam", "why can we only send 100 a day", "delivery is trickling out over a week" | `mail-sending-domain` — warm-up, not a bug or a plan limit. Corrected 2026-08-18: every new domain starts at Tier 1 (**100**/day) and climbs **20** tiers to 57,000, and the claim that bounce or complaint rates pause or reverse advancement **is not in the code** (backend code, 2026-08-18) — a tier promotes on used-up allowance alone and never demotes, and a domain counts as warmed up at tier 21. Warm-up also has a second half the old row missed: a warm-up mailbox on the sending subdomain driven by a third-party warm-up service, which stays paused while its own MX/DKIM/SPF records are unverified. Audience size determines how long launch spreads out. |
| "domain verification stuck", "we want to send from a subdomain", "change or delete our sending domain" | `mail-sending-domain`. Rewritten 2026-08-18 for the multidomain/custom-subdomain release — this row's old contents were stale on four counts, see the domain-layer bullet in Sources of truth. Apex domains only and globally unique across projects still hold; now **up to five domains per project**, the **sending prefix is chosen at registration** (default "mail", fixed afterward, `hello.` MAIL FROM still ours), a 7-day verification window (records survive it), **10-second** manual-check cooldown, and **deleting a domain is a dashboard action** that destroys the warm-up mailbox and its reputation — only pre-warm-up domains hit *"Cannot delete: some identities are verified"* and need support. |
| "this specific person stopped getting emails", "take someone off the suppression list", "GDPR erasure request" | `mail-suppression`. Two mechanisms that read alike and aren't: **suppression** excludes the profile from all future sends in the project (unsubscribe, bounce, complaint, reject, throttle), while a **stop condition** only cancels the current sequence because the user converted — they stay eligible for other campaigns. Any bounce suppresses immediately, including a full mailbox; there's no soft/hard split and no retry. **Unsuppressing** still has no UI and is a support request. **Erasure no longer is** — corrected 2026-08-14: `POST /api/v1/profile/delete/` erases PII and cancels scheduled emails, resolving the profile by any of `external_profile_id` / `customer_user_id` / `email`, and it's final (a later save with the same identifiers won't resurrect the profile). If the ticket is about retries or a 404 on a second call, the answer is the identifier used, not a bug — see the `profile/delete/` idempotency bullet in Sources of truth. The one manual dashboard action is per-profile **Unsubscribe** on `mail-profiles`. |
| "open rate is impossibly high", "bounce numbers don't break down", "range too wide warning" | `mail-analytics`. Opens are pixel loads and Apple Mail Privacy Protection pre-fetches them on iOS 15+ — clicks and revenue are the trustworthy signals. Bounces collapse hard and soft into one count. Counts are eventually consistent, not streaming. |
| "attributed revenue doesn't match LTV", "which email drove the purchase" | `mail-profiles` for the per-customer view and the definition split (attributed revenue = purchases after engaging with a campaign; LTV = all revenue from all sources), `mail-analytics` for the aggregate view and the attribution rule. |
| "how do I test this before launch", "send myself a test email", "sandbox is greyed out", "I paid but nothing shows in the app" | `mail-testing`. Two paths that prove different things, and conflating them is the whole failure mode: the **live chain** (fresh address → shortened delay → real card → refund) is the only one that exercises the automation, while **Send test email** is a standalone send that proves the email renders and the checkout takes payment and nothing else. Three constraints that surprise people: the test goes to the **logged-in account's address** unless a profile is picked in the modal, **Sandbox is unavailable for a manual-URL paywall** (it routes through the FF `/preview/` page, which needs a funnel with sandbox products), and the 1-minute minimum delay applies only to **AI-generated plans** — the manual save path has no delay validator. Journey chip semantics live here too: **Delivered** replaces **Sent** rather than following it. |
| "we have no Adapty SDK", "import our existing subscriber base", "which `event_type` maps to which flow" | `mail-send-data-via-api` — the guide, plus the `event_type` → flow mapping table. Two constraints: profiles sent **before** setup is finished never receive anything, and a profile alone only reaches the Never purchased flow — every other flow needs transaction events. The endpoint/field reference is not here: the `api-mail.adapty.io` spec is owned by `other-apis`, and its public surface is only the two Profile endpoints. |
| "copy is off-brand", "tone is wrong", "replace the App Store URL the AI used" | `mail-brand` is where all generated copy, tone, and visuals come from — one brand per project, one source per type, and **no per-source removal**, so replacing a source means deleting the brand and re-onboarding. Edits are blocked while a source is processing. Tone is locked to a campaign at generation time, so retoning means a new campaign (`mail-create-campaign`). |
| "new users get nothing", "confirmation email", "verify your email", "EU / GDPR consent", "Transactional tab", "Profile created flow" | `mail-double-opt-in`. One per-project switch on Settings → Project; enabling it writes a Transactional campaign named **Double opt-in** with AI (needs a web paywall, else the generic *"Failed to update double opt-in"* toast) and launches a **Profile created** flow. Two fixed emails (1 min, then 72 h), marketing held for profiles **created after** switch-on only, confirmation recorded once and never re-asked. The silent failure is an emptied Profile created flow while the setting is on — new profiles then receive nothing; the dashboard shows a banner for it. Not implemented despite the internal design spec: per-country opt-in/opt-out, a `marketing_consent` field — don't document them. |
| "test two subject lines", "compare two versions of the sequence" | Two different features. Subject lines need nothing: each generated email already ships three variants and the best performer continues automatically (`mail-create-campaign`). Comparing whole sequences is `mail-ab-testing` — each variation is a full campaign, routing is weighted-random per event (not sticky per user), and launch and finish both happen from the flow row, never from the A/B Tests page. |
| "Generate button is greyed out", "can't generate emails", "nothing happens when I click Generate" | `mail-get-started` steps 2 and 4. Two independent gates, and the tooltip names which: brand and company address. The company address (Settings → **Company**) was undocumented anywhere until 2026-08-27 and is the one people never guess. Paywall generation is a *different* gate — brand, Stripe account, Stripe products — so "generation is blocked" always needs a which. |
| "we don't use Stripe", "can we generate a paywall with Paddle", "no payable Stripe products" | `mail-get-started` step 5 / `mail-checkout`. **Generate with AI is Stripe-only** and blocks with a named panel: no account, or no products carrying prices. Any other provider means **Use your own hosted paywall**, where payment happens entirely on the customer's side. Do not soften this into "Stripe, Paddle, or PayPal" — that error has shipped twice. |

## Gaps and misses

Five questions the 2026-08-27 pass could not settle. All turn on backend behaviour, and Adapty Mail's
backend code was not available to that pass — confirm with the Mail team. Each names the mechanism
already checked, so the next agent does not redo the dashboard half. A sixth — whether a landing page can start a
brand — **was settled** on 2026-08-27 via the live spec; the answer moved to Sources of truth, and the
lesson generalises: the Mail service's live schema answers schema and enum questions the dashboard
cannot. Try it before recording a backend question as unanswerable.

- **Can a profile's email be updated?** This brief says write-once (2026-08-14), but
  `adapty-mail-api.yaml`'s `saveProfile` says "Sending the same `external_profile_id` again **updates**
  the existing profile" with no carve-out for `email`, and `mail-collect-emails` tells apps to call
  `updateProfile` with the `email` attribute. Checked in the dashboard: the only change it can make to a
  recipient profile is suppression — no email edit or clear exists in the dashboard, which corroborates
  write-once without proving it. If write-once holds, `mail-collect-emails` needs a warning that a
  corrected address is silently ignored. The claim was deliberately kept out of `mail-get-started`
  pending an answer.
- **Can an email CTA deep-link into the app instead of a web page?** Checked in the dashboard: the manual
  URL field has no client-side validation, no URL- or scheme-related errors exist, and nothing mentions
  deep links, universal links or app links. The deciding logic is the backend's CTA URL building plus
  the send-time rewrite through the `go.<domain>` tracking host.
- **Do imported historical transaction events classify a profile's purchase state**, or do triggers only
  fire on events arriving live? Decides whether a one-time subscriber import can reach any flow beyond
  Never purchased.
- **Do erased profiles stay in campaign analytics?** The tombstone surviving deletion hints yes, but
  that is inference from the delete-idempotency bullet, not a finding.
- **Does re-adding a domain after the 7-day window reissue DKIM tokens?** Both `mail-get-started` and
  `mail-sending-domain` now tell the reader their registrar records still apply. If tokens are reissued,
  that reassurance is actively harmful — the reader waits on records that can never verify.
- **Campaign type exists as an analytics dimension in the backend, not in the dashboard** (checked
  2026-09-03): the backend can break analytics down by Marketing/Transactional, but no Group by / filter
  option in the dashboard renders it. So `mail-double-opt-in` tells readers to group by **Campaigns** to
  separate the confirmation row; revisit when the UI exposes the dimension.
- **Unverified, deliberately left out of `mail-double-opt-in`**: whether a purchase made on the offer page
  reached from the confirmation click is attributed to the confirmation email. The confirmation click is
  not counted as a content click (so no click-attribution record), but the redirect URL may carry
  `scheduled_email_id` into the checkout; nobody followed that path to the purchase side.
