---
zone: adapty-mail
sources: [mail-api-spec, mail-backend, mail-frontend]
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

- **Both sources are registered in `sources.md`** as `mail-backend` and `mail-frontend` (corrected
  2026-08-14 — this bullet claimed neither was). On both, `origin/HEAD` resolves to `origin/develop`,
  not `master`, and the local clones sit on unrelated branches — read `origin/develop` explicitly,
  never the working tree. Refs read: backend `1a147338`, frontend `8b5613a` (both 2026-08-13).
- **Neither noty-wave repo was readable on 2026-08-27, and the fallback is the production bundle.** The
  registered clones (`~/Documents/noty-wave-{backend,frontend}`) are gone from disk, and the GitLab
  account `GeneTiterman` (248) cannot reach them: `git ls-remote git@gitlab-ssh.adapty.io:noty-wave/*`
  is denied, `GET /api/v4/namespaces/noty-wave` returns `404 Namespace Not Found`, and the only visible
  groups are `adapty` (20) and `adapty-guest` (137) with three per-project grants inside `adapty`
  (28, 29, 141). Access was requested 2026-08-27 and had not landed. **What still works:** the dashboard's
  production bundle at `https://mail.adapty.io/assets/index-*.js` (read at `index-BNg5VSlt.js`,
  2026-08-26) — minified but complete, carrying gating logic, tooltip strings, error codes, field lists
  and nav labels verbatim. It settles anything frontend and nothing backend, which is where every open
  question below sits. Also: GitLab SSH is `gitlab-ssh.adapty.io`; `gitlab.adapty.io` port 22 times out.
- **Campaign generation is gated on two things; paywall generation on a third** (bundle, 2026-08-26).
  **Generate emails** is `disabled: U || !brand_saved || !company_address_filled`, both from the
  onboarding-status query, tooltips *"Set up your brand to enable generation"* / *"Add your company
  address in Settings to enable generation"*. **Company address** is a section on Settings → **Company**:
  five required fields (`legal_name`, `address_line_1`, `city`, `postal_code`, `country`), two optional
  (`address_line_2`, `state`), banner *"Campaign generation is blocked until the address is filled in"*,
  and it reaches every campaign email through a `{{ company_address }}` merge tag rendered as
  `legal_name / address_line_1 / address_line_2 / "City, State Postal" / country`. AI **paywall**
  generation blocks separately on `brand_required_error` ("Brand is not ready"),
  `stripe_account_required_error` and `stripe_products_required_error`, each replacing the plan picker
  with a panel plus action button; a **Refresh** control on the prerequisites checklist re-syncs status.
  None of these gate *sending*, manual **Add email** (`disabled: U` only), or the manual-URL paywall path
  — so "blocked without a brand" must always be scoped to generation. `mail-brand`'s "New campaigns …
  are blocked" is too broad for the same reason.
- **Setup order is the in-product checklist, and `mail-get-started` now mirrors it** (bundle,
  2026-08-26): `brand_saved` → `domain_verified` → `company_address_filled` → `checkout_created` →
  `campaign_created` → `data_sending`, then either `adapty_connected` ("Enable sending" →
  `/settings?tab=project`) or `start_sending` ("Start sending" → our `mail-send-data-via-api`). It hides
  itself once complete. **The dashboard deep-links `mail-get-started` with no anchor**, so renumbering
  its headings is safe — verified by grepping every `DOCS_URL` use in the bundle.
- **The first sending domain has no "Add domain" button to click first.** Email domains renders
  `<AddDomain autoOpen={domains.length === 0} />`, so a project with no domains gets the form already
  open and the only **Add domain** on screen is its submit; the dashed button appears only once a domain
  exists (bundle, 2026-08-26). Both `mail-get-started` and `mail-sending-domain` told the reader to click
  it as step 1 *and* as the final step — the exact thing that blocked the FunnelFox tech writer. Fixed in
  both on 2026-08-27.
- **A brand can only be started from a store listing, in the UI.** The setup form offers **App Store** and
  **Google Play** only, guarded by `e === "app_store" || e === "play_store"`; empty state reads *"Drop in
  your App Store or Google Play link and we'll build a brand profile from it."*, submit is **Build my
  brand** (bundle, 2026-08-26). **The restriction is the setup screen's, not the backend's** (settled
  2026-08-27 against the live spec at `https://api-mail.adapty.io/openapi.json`, which is public and
  readable without repo access): `SourceType` is `app_store | play_store | landing_page |
  terms_and_privacy | social_media | screenshots`, and `POST /api/v1/brand/{project_id}/source/` takes
  `BrandSourceDTO` with `source_type` as its only required field and **no ordering constraint** — nothing
  requires a store source first. The dashboard's own addable list agrees (`cX`, five types, `landing_page`
  placeholder `https://yourapp.com`). Two limits on that finding: the endpoint authenticates with
  `HTTPBearer`, a dashboard account session, so it is **internal and undocumentable** by the
  auth-dependency rule above; and acceptance of a source is not proof that a landing page *alone* yields a
  brand — the `VFe` empty state ("Sources are processed but no brand was produced") exists for exactly
  that outcome. Docs consequence: `mail-get-started` scopes the claim to the setup screen and routes
  web-to-app readers to support. **Product ask raised 2026-08-27: the setup screen should offer
  `landing_page`, since the backend already accepts it.**
- **Adapty Mail's vocabulary shadows Adapty's in three places, and all three reach the reader**
  (2026-08-27): **flows** (email routing here, in-app screens there — `tutorial.json` now carries a
  top-level *Flows (Beta)* **and** an *Adapty Mail > Flows* category), **segments** (Mail's own filter
  sets over Mail profiles, 11 fields, vs Adapty's placement/A-B-test audiences), and **profiles**.
  Mitigation adopted in the docs: scope the noun on first use ("Adapty Mail includes its own **flows**"),
  define each term where the reader first meets it, and never call the brand object a "profile". This is
  a product naming collision, not a wording problem — raised for the Mail team 2026-08-27.
- **Flow, trigger and send-eligibility behaviour** lives in `noty-wave-backend`, `src/app/campaign_context/`.
  The vocabulary mapping is load-bearing, because no backend symbol is called "flow": a **flow** is a
  `Container` (one row per project per trigger), a **flow row** is a `ContainerSegment` (a `segment_id`
  plus an integer `priority`), and a live send is a `ProfileCampaignAssignment` with one `ScheduledEmail`
  per email. The five fixed triggers are the `TriggerPurchaseState` enum, and
  `services/trigger_purchase_state_resolver.py` is the only place a purchase state becomes a trigger —
  that is where "which trigger fires for a grace-period / auto-renew-off user" is settled.
- **Whether a specific profile is eligible to send** is decided in one file,
  `campaign_context/applications/profile_campaign_assignment.py`: suppression check, then existing active
  assignment, then stop condition, then throttle cooldown, then trigger resolution, then first matching
  segment by priority. Read it before writing any "configured but nothing sent" content — every one of
  those branches is a distinct reason a reader sees silence, and only some of them surface in the UI.
- **Suppression** is `src/common/domains/constants/suppression_reason.py` (five reasons) plus
  `profile_context/applications/ses_event.py` and `applications/profile.py`. It is a single nullable
  field on the profile, first write wins, and nothing in the codebase clears it. Note the ownership
  split inside the five reasons: `bounce`, `complaint` and `reject` are reported by AWS SES, while
  `unsubscribe` and `throttle` are generated by us. The stop condition is a different object entirely —
  a `CancellationReason` on the assignment, not on the profile.
- **The public API surface is established by the auth dependency, not by the OpenAPI tag.** Three
  backend routes take the project-scoped Adapty Mail secret key (`CurrentProjectIdDep` →
  `get_current_project_id`): `profile/save/`, `profile/delete/`, and `profile/transaction-event/save/`.
  Corrected 2026-08-14 — this bullet said two; `profile/delete/` (MAIL-32, right-to-erasure by
  anonymization) shipped since, and returns 204. Everything else, including the profile list / detail /
  journey / suppress routes behind the `mail-profiles` screen, takes a dashboard account session
  (`CurrentAccountDep`), and those sit under the **same `Profile` tag** as the public routes — so "the
  Profile tag is the public surface" is wrong. `adapty-mail-api.yaml` is hand-curated to the public
  paths (nothing but `config.json` references it; there is no generator), which makes the live service
  spec a strict superset of it and not a docs source: a path present there and absent from the YAML is
  internal by construction.
- **`profile/delete/` is idempotent only for the identifier-based paths, never for email** (verified
  2026-08-14 against backend `master`). Deletion resolves through the same ladder as save, and the
  `profile_source_identity` rows survive the wipe — so a repeat carrying `external_profile_id` or
  `customer_user_id` still finds the tombstone, `ProfileApp.delete` no-ops on `is_deleted`, and the
  caller gets 204 again. A repeat carrying only `email` returns 404: `Profile.delete()` nulls `email`
  and `ProfileRepository.get_by_filters` additionally filters `is_deleted == False`, so an email has
  nothing left to match, and `SourceIdentityKeyCollection.factory` never promotes an email to an
  identity key. Never write a flat "the request is idempotent" — the spec did, with `byEmail` as its
  worked example, which documented the one path that fails.
- **Which profile a payload belongs to is decided by one ladder**,
  `ProfileApp.resolve_profile` in `profile_context/applications/profile.py`: the sender's own
  `(source, external_profile_id)` in the `profile_source_identity` link table, then `customer_user_id`
  under `source=custom`, then `(project_id, email)`. `ProfileSource` is `adapty | funnelfox | custom`,
  defaulting to `custom` so the public API stays backward-compatible. Three consequences worth writing
  down, all verified 2026-08-14: **email is write-once** (set at creation, never overwritten, so two
  sources disagreeing on an address can't ping-pong); a transaction that arrives before its identity is
  stored with `profile_id = NULL` and **late-bound** on the next profile save; and `external_profile_id`
  was dropped from `profile_model` outright (migration `2026_08_07_1449`), so any claim that profiles are
  keyed by it is now false. The design record is `docs/specs/MULTI_SOURCE_PROFILES.md` in the backend —
  **its `Status: approved design, not implemented` header is stale**, releases 1–5 have all landed.
- **"FunnelFox" means three different things here, at three different stages** (checked 2026-08-14).
  **(1) The checkout engine — implemented and live.** `FunnelFoxAdapter` in
  `campaign_context/infrastructure/adapters/external/funnel_fox.py` makes real calls (`auth_adapty`,
  `create_funnel`, `is_funnel_published`, `get_stripe_account`, `get_stripe_products`), and
  `WebPaywall.ff_funnel` is a field on the entity — every AI-generated checkout *is* a FunnelFox funnel,
  which is why sandbox test emails route through the FF `/preview/` page. **(2) A profile source —
  half-built.** `ProfileSource.FUNNELFOX` is accepted and the resolution ladder merges it, but nothing
  in noty-wave *sends* it; the sender is the `adaptymail` integration on the FunnelFox side.
  **(3) A partner workspace — stubs.** `FunnelFoxPartnerAccountAdapter.authorize` and all three
  `FunnelFoxPartnerWorkspaceAdapter` methods raise `NotImplementedError(... not implemented yet)`, and
  no branch for it exists in either noty-wave repo. Do not document (2) or (3) as available. When
  writing about (1), avoid framing it as an "integration" the reader sets up — it's the builder they
  already use, and a reader who connected FunnelFox for checkout will otherwise think they've done the
  data integration.
- **Self-serve and partner are distinct product experiences, and the docs must carry both.** A company
  created by self-serve signup has `linked_partners: []`; `adapty_integration_available` on the project
  decides whether the **Adapty Integration** section on Settings → Project renders at all and which
  sending step the onboarding checklist shows. So "enable the Adapty integration" is not universal advice — for a
  self-serve project that section does not exist, and the equivalent step is posting to the API.
- **CTA placeholders are per-source and the old single form is gone.** `BuildCtaUrlService` substitutes
  `{email}`, `{scheduled_email_id}`, and `{<source>.external_profile_id}` for each of the three sources;
  migration `2026_08_07_0800` rewrote stored `web_paywall.url` values from `{external_profile_id}`. The
  canonical list a reader sees is `URL_PLACEHOLDERS` in the frontend's `WebPaywallCreatePage.tsx`.
  Unknown placeholders are left intact and a source the profile lacks resolves to `''`. There is no
  `cid` parameter and no `customer_user_id` placeholder anywhere in either repo.
- **Deliverability is split by owner, and the split is what limits what we may claim.** Ours, in
  `src/app/mailing_context/`: the 14-step warm-up ladder (`TIER_DAY_LIMITS`, 200 → 30000 sends/day),
  the intra-day smoothing of a tier's allowance on its first day, tier promotion, and the throttle that
  fires when a limit is hit. Not ours: sending itself, and the bounce/complaint/reject signals, are AWS
  SES's; the DNS identity requirements are SES's shape (DKIM, MAIL FROM, DMARC); and warm-up traffic and
  its mailbox come from third parties (Warmy, Migadu). The apex-domain-only rule and the fixed `mail.` /
  `email.` sending prefixes with the `hello.` MAIL FROM prefix *are* our constants
  (`value_objects/domain_name.py`, `constants/ses_identity.py`), so those are safe to state flatly. A
  provider-owned fact must be attributed as the provider's, because it can change without us.
- **The domain layer was reshaped between 2026-07-23 and 2026-08-17, and the bullet above is now stale
  in four places** (verified 2026-08-18 against backend `origin/develop` `cab158e8` and frontend
  `origin/develop` `8b5613a`; the `feature/multidomain`, `feature/custom-subdomain` and
  `feature/dig-validate` branches in both repos are merged). (1) **A project holds up to five sending
  domains** — `MAX_DOMAINS_PER_PROJECT = 5` in `constants/ses_identity.py`, `MULTIDOMAIN_RELEASE_DATE =
  2026-07-23` in `constants/email_settings.py`; `MailingApp._select_email_settings` probes candidates
  (sticky `(recipient, campaign)` pair first with **no fallback**, then oldest-domain pinning for
  pre-release profiles, then newest-first) and emits one message-level `THROTTLE` only when every
  candidate is over quota. (2) **The sending prefix is customer-chosen**, one identity per domain, not
  the fixed `mail`/`email` pair: `AUTOWARMUP_SES_SUBDOMAIN_PREFIX = 'mail'` is only the default, and
  `ValidateSubdomainPrefixService` + `anthropic_subdomain_moderator.py` gate it (63 chars, reserved
  `www/smtp/admin/api/mx/dkim`, profanity + brand-impersonation screening, fail-open on LLM outage).
  The two-prefix tuple now applies only to domains registered before this change. (3) **The ladder is
  20 tiers starting at 100/day and ending at 57,000** (`constants/domain_send_tier.py`, commit
  `10c4ebe2` "stretch warm-up ladder to 20 tiers"), not 14 starting at 200; tier 21 means unthrottled.
  (4) **DNS is three record owners, not one** — `DnsRecordOwnerType` is `ses_identity |
  warmup_credentials | custom_hostname`: SES DKIM/MAIL FROM, the Migadu warm-up-mailbox zone under the
  sending subdomain, and a Cloudflare custom hostname `go.<domain>` (`CUSTOM_HOSTNAME_PREFIX = 'go'`)
  serving media and tracked links, whose `active` state is a **required** gate in
  `AutowarmupApp._poll_dns_for_row`. Records now carry per-record `correct | mismatch | missing`
  validation from `DnsRecordApp.validate_records`, and exports are CSV plus GoDaddy/Cloudflare zone
  files (`DnsExportRegistrar`). Also corrected: `MAX_POLL_INTERVAL` is **1 hour**, not 32 minutes, and
  a warm-up domain **can be deleted after verification** — `delete_domain` skips the
  `DomainHasVerifiedIdentitiesError` guard that `delete_pending_domain` applies, so only pre-warm-up
  SES-only domains still need support to remove.
- **The setup-order gate is real but narrower than "a flow must exist."** The dashboard's *Enable Adapty
  integration* button is disabled by `hasFlows = onboardingStatus?.data_sending` in
  `noty-wave-frontend`, `src/pages/settings/ui/SettingsPage.tsx`; the backend computes that field in
  `company_context/applications/onboarding_status.py` as `has_active_flow(project_id)` **or** "the
  project has ever called the ingestion API". So an API-only project satisfies the gate with no flow at
  all. The check is also UI-only — `AdaptyIntegrationApp.enable()` takes no flow into account — so
  "Enable sending last" is correct ordering advice, not an enforced invariant, and must not be written as
  one.
- **Settings has three tabs — Company, Project, DNS — and neither "Email Domains" nor "Integrations"
  is one of them.** `TAB_LABELS` in `noty-wave-frontend`, `src/pages/settings/ui/SettingsPage.tsx`, is
  the ground truth. The domain wizard is an **Email domains** section inside **DNS**, and the
  integration is an **Adapty Integration** section inside **Project**. Commit `a49eb74` (2026-07-23)
  removed `EmailDomainsTab` and folded it into DNS, which is when the old paths went stale; the docs
  carried `Settings → Email Domains` in eight places and `Settings → Integrations` in three until
  2026-08-14. Two button labels sit behind the same `hasFlows` gate and are easy to swap by mistake:
  **Enable Adapty integration** on first setup, plain **Enable** when a disabled integration already
  exists. The tooltip is *"Set up at least one flow before enabling Adapty integration"* with no
  trailing period. Read these strings before writing any navigation path here — a tab rename ships
  without a docs ticket, and nothing in this repo catches it.

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
  is the project-scoped secret key. When a ticket asks for "the Mail API endpoint that does X", check the
  auth dependency first; if it is the account session, the honest answer is that no public endpoint
  exists and the action is dashboard-only.
- **Nothing that reads as a deliverability guarantee.** We may describe the mechanism and that it runs
  automatically; we may not state or imply an outcome — no inbox-placement or deliverability rates, no
  "this keeps you out of spam", no promise of how fast a domain reaches full capacity, and no commitment
  phrased on the sending provider's behalf. Treat any claim that bounce or complaint rates *change tier
  advancement* as unverified until re-read against `mailing_context`: it is the exact shape of sentence
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
| mail-collect-emails | — | marketer | 6 | tutorial |
| mail-create-campaign | — | marketer | 4 | tutorial |
| mail-create-flow | — | marketer | 4 | tutorial |
| mail-email-campaigns | entry | marketer | 0 | tutorial |
| mail-entry-points | entry | marketer | 0 | tutorial |
| mail-flows | entry | marketer | 5 | tutorial |
| mail-get-started | — | marketer | 13 | tutorial |
| mail-profiles | — | marketer | 7 | tutorial |
| mail-segments | — | marketer | 7 | tutorial |
| mail-send-data-via-api | — | marketer | 5 | tutorial |
| mail-sending-domain | — | marketer | 12 | tutorial |
| mail-suppression | — | marketer | 5 | tutorial |
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
  even though the dashboard lists it, and `adapty-mail-api.yaml`, which omits the `source` enum for the
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
| "everything is configured but nothing is sending", "Enable button is greyed out", "campaign stuck in draft" | `mail-get-started` step 6 (**"Start sending"** since the 2026-08-14 restructure) — the setup order is load-bearing and this is the classic failure. **Sending comes last, on both paths**: the Adapty integration toggle on Settings → Project is disabled until at least one flow row exists ("Set up at least one flow before enabling Adapty integration"), and on the API path, profiles posted before setup finishes never receive anything. The product itself branches here — `OnboardingChecklist` appends `PARTNER_SENDING_STEP` ("Enable sending" → Settings) or `SELF_SERVE_SENDING_STEP` ("Start sending" → deep-links our `mail-send-data-via-api`) depending on `adapty_integration_available`, so the docs must keep both branches. A campaign is a separate blocker — it has no publish action and stays `draft` until attached to a flow (`mail-create-campaign`). |
| "our app doesn't collect emails", "no login in the app", "not enough recipients to launch", "how do I connect Adapty to Mail" | `mail-collect-emails` — **retitled "Connect Adapty to Adapty Mail" on 2026-08-14 and now the Adapty *integration* page**, not just an email-collection guide. Filename kept for SEO per the CLAUDE.md convention, so the slug still reads `mail-collect-emails`. It absorbed `mail-get-started`'s SDK-setup and enable-sending sections, and is the whole Adapty path end to end: observer mode → identify → `updateProfile` → enable the integration. Two values, in order: a stable `customer_user_id` first (there's no profile to attach an email to otherwise), then `email` via `updateProfile`. Anonymous profiles and profiles with no email are excluded from delivery *and* from campaign analytics. The 30–50% coverage target is a launch gate, not 100%. |
| "which payment provider does Mail support", "can we use Paddle / PayPal" | `mail-checkout`. **Stripe only for the generated checkout** — `FunnelFoxAdapter.get_stripe_account` / `get_stripe_products` are the only provider calls in the backend, and neither noty-wave repo mentions Paddle or PayPal. Any other provider works only via **Use your own hosted paywall**, where payment happens entirely on the customer's side and Adapty Mail just redirects with substituted placeholders. Corrected 2026-08-14: `adapty-mail` and `mail-get-started` both listed "Stripe, Paddle, or PayPal" flatly, which pointed readers down the AI-generated path with a provider it can't use. |
| "checkout link errors out", "user not identified at checkout", "purchase not attributed to the email" | `mail-checkout`. Three distinct causes: the web paywall was never **published**; `Adapty.identify()` wasn't called before the email was sent; or the manual URL is missing the identity placeholder. Corrected 2026-08-14 — this row named a **`cid` parameter, which exists in neither repo**; see the CTA-placeholder bullet in Sources of truth for the real list. The attribution mechanism itself (last-click on `scheduled_email_id`, back-filled only onto purchases with no existing attribution that post-date the click) is documented in `mail-analytics` — personalization placeholders are a separate mechanism from attribution. |
| "launch the campaign", "schedule the sequence", "change who gets it and when" | Split by which half of the pair it is. Content (copy, images, delays, email count) is `mail-create-campaign`; trigger + audience + going live is a **flow row** — `mail-create-flow` for the mechanics, `mail-flows` for the concepts. Nearly every "campaign doesn't send" ticket is really a flow-row ticket. |
| "wrong sequence went out", "the broad audience swallowed my targeted one", "All Users row rejected on save" | `mail-flows` priority: rows are walked top to bottom, the first matching segment wins, later rows are never evaluated for that user. The backend rejects saves where an **All Users** row isn't last. |
| "which trigger fires for a cancelled/failed/lapsed/refunded subscription", "add a custom trigger" | `mail-flows`. Five fixed triggers; the list is not extensible. Non-obvious: trial users are **not** in Never purchased — starting a trial counts as an active subscription — and Renewal cancelled / Expired each cover both paid and trial audiences, split via segment filters. |
| "change the targeting on a running flow", "can't edit the segment filters", "combine two conditions with OR" | `mail-segments`. Filters lock as soon as the segment is Live (name and description stay editable) — to retarget, create a new segment and swap the flow row. Filters are AND-only, one filter per field, and there's no audience-size preview. |
| "emails going to spam", "why can we only send 100 a day", "delivery is trickling out over a week" | `mail-sending-domain` — warm-up, not a bug or a plan limit. Corrected 2026-08-18: every new domain starts at Tier 1 (**100**/day) and climbs **20** tiers to 57,000, and the claim that bounce or complaint rates pause or reverse advancement **is not in the code** — `DomainSendTierApp.throttle` promotes on used-up allowance alone and never demotes (the tier column is append-only, `is_warmed_up` at tier 21). Warm-up also has a second half the old row missed: a Migadu mailbox on the sending subdomain driven by a third-party warm-up service, which stays paused while its own MX/DKIM/SPF records are unverified. Audience size determines how long launch spreads out. |
| "domain verification stuck", "we want to send from a subdomain", "change or delete our sending domain" | `mail-sending-domain`. Rewritten 2026-08-18 for the multidomain/custom-subdomain release — this row's old contents were stale on four counts, see the domain-layer bullet in Sources of truth. Apex domains only and globally unique across projects still hold; now **up to five domains per project**, the **sending prefix is chosen at registration** (default "mail", fixed afterward, `hello.` MAIL FROM still ours), a 7-day verification window (records survive it), **10-second** manual-check cooldown, and **deleting a domain is a dashboard action** that destroys the warm-up mailbox and its reputation — only pre-warm-up domains hit *"Cannot delete: some identities are verified"* and need support. |
| "this specific person stopped getting emails", "take someone off the suppression list", "GDPR erasure request" | `mail-suppression`. Two mechanisms that read alike and aren't: **suppression** excludes the profile from all future sends in the project (unsubscribe, bounce, complaint, reject, throttle), while a **stop condition** only cancels the current sequence because the user converted — they stay eligible for other campaigns. Any bounce suppresses immediately, including a full mailbox; there's no soft/hard split and no retry. **Unsuppressing** still has no UI and is a support request. **Erasure no longer is** — corrected 2026-08-14: `POST /api/v1/profile/delete/` erases PII and cancels scheduled emails, resolving the profile by any of `external_profile_id` / `customer_user_id` / `email`, and it's final (a later save with the same identifiers won't resurrect the profile). If the ticket is about retries or a 404 on a second call, the answer is the identifier used, not a bug — see the `profile/delete/` idempotency bullet in Sources of truth. The one manual dashboard action is per-profile **Unsubscribe** on `mail-profiles`. |
| "open rate is impossibly high", "bounce numbers don't break down", "range too wide warning" | `mail-analytics`. Opens are pixel loads and Apple Mail Privacy Protection pre-fetches them on iOS 15+ — clicks and revenue are the trustworthy signals. Bounces collapse hard and soft into one count. Counts are eventually consistent, not streaming. |
| "attributed revenue doesn't match LTV", "which email drove the purchase" | `mail-profiles` for the per-customer view and the definition split (attributed revenue = purchases after engaging with a campaign; LTV = all revenue from all sources), `mail-analytics` for the aggregate view and the attribution rule. |
| "how do I test this before launch", "send myself a test email", "sandbox is greyed out", "I paid but nothing shows in the app" | `mail-testing`. Two paths that prove different things, and conflating them is the whole failure mode: the **live chain** (fresh address → shortened delay → real card → refund) is the only one that exercises the automation, while **Send test email** is a standalone send that proves the email renders and the checkout takes payment and nothing else. Three constraints that surprise people: the test goes to the **logged-in account's address** unless a profile is picked in the modal, **Sandbox is unavailable for a manual-URL paywall** (it routes through the FF `/preview/` page, which needs a funnel with sandbox products), and the 1-minute `MIN_DELAY` floor applies only to **AI-generated plans** (`EmailPlanItemDTO`) — the manual save path has no delay validator. Journey chip semantics live here too: **Delivered** replaces **Sent** rather than following it. |
| "we have no Adapty SDK", "import our existing subscriber base", "which `event_type` maps to which flow" | `mail-send-data-via-api` — the guide, plus the `event_type` → flow mapping table. Two constraints: profiles sent **before** setup is finished never receive anything, and a profile alone only reaches the Never purchased flow — every other flow needs transaction events. The endpoint/field reference is not here: the `api-mail.adapty.io` spec is owned by `other-apis`, and its public surface is only the two Profile endpoints. |
| "copy is off-brand", "tone is wrong", "replace the App Store URL the AI used" | `mail-brand` is where all generated copy, tone, and visuals come from — one brand per project, one source per type, and **no per-source removal**, so replacing a source means deleting the brand and re-onboarding. Edits are blocked while a source is processing. Tone is locked to a campaign at generation time, so retoning means a new campaign (`mail-create-campaign`). |
| "test two subject lines", "compare two versions of the sequence" | Two different features. Subject lines need nothing: each generated email already ships three variants and the best performer continues automatically (`mail-create-campaign`). Comparing whole sequences is `mail-ab-testing` — each variation is a full campaign, routing is weighted-random per event (not sticky per user), and launch and finish both happen from the flow row, never from the A/B Tests page. |
| "Generate button is greyed out", "can't generate emails", "nothing happens when I click Generate" | `mail-get-started` steps 2 and 4. Two independent gates, and the tooltip names which: `brand_saved` and `company_address_filled`. The company address (Settings → **Company**) was undocumented anywhere until 2026-08-27 and is the one people never guess. Paywall generation is a *different* gate — brand, Stripe account, Stripe products — so "generation is blocked" always needs a which. |
| "we don't use Stripe", "can we generate a paywall with Paddle", "no payable Stripe products" | `mail-get-started` step 5 / `mail-checkout`. **Generate with AI is Stripe-only** and blocks with a named panel: no account, or no products carrying prices. Any other provider means **Use your own hosted paywall**, where payment happens entirely on the customer's side. Do not soften this into "Stripe, Paddle, or PayPal" — that error has shipped twice. |

## Gaps and misses

Five questions the 2026-08-27 pass could not settle. All turn on backend behaviour, and both noty-wave
repos were unreachable (see the access bullet in Sources of truth). Each names the mechanism already
checked, so the next agent does not redo the frontend half. A sixth — whether a landing page can start a
brand — **was settled** on 2026-08-27 via the live spec; the answer moved to Sources of truth, and the
lesson generalises: `https://api-mail.adapty.io/openapi.json` is public, complete, and answers schema and
enum questions the bundle cannot. Try it before recording a backend question as unanswerable.

- **Can a profile's email be updated?** This brief says write-once (2026-08-14), but
  `adapty-mail-api.yaml`'s `saveProfile` says "Sending the same `external_profile_id` again **updates**
  the existing profile" with no carve-out for `email`, and `mail-collect-emails` tells apps to call
  `updateProfile` with the `email` attribute. Checked in the bundle: the only mutation on a recipient
  profile is `suppressProfile` — no email edit or clear exists in the dashboard, which corroborates
  write-once without proving it. If write-once holds, `mail-collect-emails` needs a warning that a
  corrected address is silently ignored. The claim was deliberately kept out of `mail-get-started`
  pending an answer.
- **Can an email CTA deep-link into the app instead of a web page?** Checked: the manual URL field has no
  client-side validation (not even `type="url"`), no URL- or scheme-related error codes exist in the
  bundle, and "deeplink", "universal link" and "app link" appear zero times in it. The deciding logic is
  `BuildCtaUrlService` plus the send-time rewrite through the `go.<domain>` tracking host, both backend.
- **Do imported historical transaction events classify a profile's purchase state**, or do triggers only
  fire on events arriving live? Decides whether a one-time subscriber import can reach any flow beyond
  Never purchased.
- **Do erased profiles stay in campaign analytics?** The tombstone surviving `is_deleted` hints yes, but
  that is inference from the delete-idempotency bullet, not a finding.
- **Does re-adding a domain after the 7-day window reissue DKIM tokens?** Both `mail-get-started` and
  `mail-sending-domain` now tell the reader their registrar records still apply. If tokens are reissued,
  that reassurance is actively harmful — the reader waits on records that can never verify.

