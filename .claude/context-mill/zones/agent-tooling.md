---
zone: agent-tooling
sources: [adapty-cli, analytics-export-api-spec, capacitor-sdk, dashboard-backend, developer-api-spec, jscore, kmp-sdk, sdk-integration-skill, server-side-api-spec]
reviewed_shape:
reviewed_at:
---

## What this is

Adapty's tooling for coding agents and AI-assisted development: the SDK integration skill and its per-platform variants, the step-by-step "integrate with AI" guides (adapty-cursor and its platform variants) that walk an AI coding tool through SDK integration stage by stage, the Adapty Developer CLI (a terminal tool an agent can drive to manage apps, products, paywalls, and placements), and guides for pointing an AI agent at the Export Analytics API or at webhook payloads. It's about how a developer's AI coding tool — Cursor, Claude, ChatGPT, or similar — integrates Adapty into an app or automates routine backend/dashboard tasks. It is explicitly not about any AI feature inside the Adapty product itself. Readers are developers setting up an AI-assisted workflow, most often during initial SDK integration or when scripting dashboard changes from the terminal.

## Surfaces

## Sources of truth

Unusual for this corpus: half of what this zone asserts is owned by two Adapty repos that
`sources.md` does not list, and a further slice is owned by nobody we can commit to.

- **The CLI — `adapty-cli` (`https://github.com/adaptyteam/adapty-cli`), `origin/main`. Not in
  `sources.md`.** Command surface is one oclif command per file under `src/commands/<topic>/<verb>.ts`;
  the topic list is the `oclif.topics` block in `package.json`. There is **no committed manifest** —
  `prepack` runs `oclif manifest && oclif readme` and `postpack` deletes `oclif.manifest.json` — so the
  flag definitions in the TypeScript are the only checked-in truth, and both the repo's `README.md` and
  `skills/adapty-cli/references/cli-commands.md` are restatements of it that can drift. Auth flow is
  `src/commands/auth/login.ts`: OAuth device grant, `POST /auth/device` then poll `POST /auth/token`
  with `client_id: adapty-cli`, handling `authorization_pending` / `slow_down` / `expired_token`.
  Config is `src/lib/config.ts` — `~/.config/adapty/config.json`, written with mode `0o600`, holding
  `access_token` plus `user`. The npm package is named **`adapty`**, and `origin/main` is `v0.8.2` (checked 2026-08-31 via
  `gh api "repos/adaptyteam/adapty-cli/contents/package.json?ref=main"` and `npm view adapty version`,
  which agree; it was v0.4.0 on 2026-08-17).
- **The CLI's API is the one API in the corpus with no spec we publish.** `src/lib/api-client.ts` sets
  `DEFAULT_API_URL = 'https://api-admin.adapty.io/api/v1/developer'`, and `developer-api-spec`
  (`developer-api.yaml`) is the empty stub its own `sources.md` entry warns about — 14 lines,
  `paths: {}`, not in `config.json`. So a question about what a CLI flag sends or what a returned field
  means resolves only in `src/lib/api-schemas.ts` and the command files. Nothing machine-checked exists
  to diff a `developer-cli-reference` claim against.
- **Three CLI behaviours live in the source and in no article.** `ADAPTY_TOKEN` (checked before the
  config file in `src/lib/auth.ts`, and documented in the repo's own README), `ADAPTY_API_URL`, and the
  config path itself: `auth login`/`auth status` read and write oclif's `this.config.configDir`, not the
  `~/.config/adapty` constant, so `ADAPTY_CONFIG_DIR` or `XDG_CONFIG_HOME` silently relocates the file
  that `developer-cli-authentication` prints as a fixed path. Established by grep over the whole corpus,
  not assumed.
  TODO(owner): is the env-var token path deliberately undocumented — a CI/headless story we don't
  support yet — or a gap in `developer-cli-authentication`?
- **The skill — `adapty-sdk-integration-skill`, `origin/main`. Also not in `sources.md`.** Content is
  `skills/adapty-integration/SKILL.md` plus `references/<platform>.md`. It is not generated from the
  SDKs: it is **pinned to our published docs**, and `scripts/lint-symbols.mjs` says so in its own header
  ("the docs are verified against SDK sources by the docs team's own release process, so 'symbol appears
  in the docs' transitively means 'symbol exists in the SDK'. This lint closes the remaining gap:
  skill <-> docs drift"). It resolves every Adapty-branded symbol in the references against
  `https://adapty.io/docs/` `llms.txt` and `.md` pages. **This makes our docs upstream of the skill**:
  renaming a page or a symbol breaks it, and the thing that tells you is
  `.github/workflows/skill-lints.yml` — a daily cron that files (or comments on) a `skill-drift` issue
  when the docs move with no skill commit involved. To judge a skill instruction stale: check that repo
  for an open `skill-drift` issue and run `node scripts/lint-symbols.mjs` / `node scripts/lint-links.mjs`.
- **Version pins are exactly what that lint does not cover, so they go stale in docs and skill
  together.** `references/kmp.md` pins `io.adapty:adapty-kmp:4.0.0-beta.1`, identical to
  `sdk-installation-kotlin-multiplatform`'s pin, while `kmp-sdk`'s newest tag is `4.0.1-beta.1`. The
  lint checks symbols against docs and never versions against an SDK, so agreement between the skill and
  our install article is not evidence of currency. Re-establish a pin from the platform source per
  `platforms.md`, never from the skill or from a neighbouring article.
- **The `adapty-cursor*` guides are hand-written and pinned to nothing.** Every stage's payload is a
  literal list of `https://adapty.io/docs/<id>.md` URLs, so the only automation touching them is this
  repo's own `scripts/check-links/`, which confirms a URL resolves — not that the stage order, the API
  taught, or the version named is current. One guide pins a pre-release outright:
  `adapty-cursor-capacitor` instructs `npm install @adapty/capacitor@4.0.0-beta.2`, while the skill's own
  `references/capacitor.md` installs unpinned `npm install @adapty/capacitor` — the two families
  disagree about the very hazard the Ticket language table attributes to this platform. Re-derive the
  current pre-release from `capacitor-sdk`/`jscore` before repeating either.
- **For the "with AI" guides the spec YAML is authoritative for host, auth scheme and rate limit — never
  the article.** `export-analytics-with-ai` drives `analytics-export-api-spec`: `servers:` is
  `https://api-admin.adapty.io`, `securitySchemes.apikeyAuth` is `type: apiKey` / `in: header` /
  `name: Authorization`, and the 2-requests-per-second limit is stated in every operation description
  plus a `429` response per path. `server-side-api-with-ai` drives `server-side-api-spec`:
  `https://api.adapty.io`, `Authorization: Api-Key {secret}`. **The spec and the article currently
  disagree on the server-side limit** — `server-side-api-with-ai` and `ss-authorization` both say 40,000
  requests per minute per app; the spec's `429` says "600 requests per minute per app and 6000 requests
  per minute globally". Quote the spec, and see Gaps and misses.
- **`handle-webhooks-with-ai` drives no API at all** — no host, no Adapty key; the reader's own endpoint
  receives the `POST` and the shared secret is a string they invent. Its ground truth is the webhook
  payload schema, which the `integrations` brief records as having no registered source: use
  `dashboard-backend` and name the module you read. The delivery contract it restates (10-second ack,
  retries outside 200–404, `profile_event_id` for dedupe) is canonically
  `webhook-event-types-and-fields` and `set-up-webhook-integration`, not this page.
- **A third skill exists beyond the two above** (verified 2026-08-18, `git show origin/main:docs/agent/skills/adapty-cli-setup/SKILL.md` in `adapty-cli`): `adapty-cli-setup` — install + device-code auth for agent sessions (Cowork/cloud). It lives in the `adapty-cli` repo but **ships in the `adaptyteam/apple-ads-cli` plugin marketplace** alongside the `apple-ads` skill (its own closing line says so). That marketplace repo is the URL `developer-cli-cowork` and `developer-cli-ads-manager-skill` tell readers to add, and it is registered nowhere in `sources.md`. Cowork-behavior claims in `developer-cli-cowork` (settings apply at task start, clean machine per task, apex + wildcard both needed, ~15-min code TTL) trace to this skill file plus the PM's screenshots.
- **Say plainly which claims have no source we control.** Context7's coverage, `skills.sh` / `npx skills`,
  `claude plugin marketplace add`, `gh skill install`, `gemini skills install`, Cursor's plan mode, and
  "which chat products can make HTTP calls" are third-party surfaces that can be invalidated with no
  commit anywhere in Adapty. Nothing in this repo or either skill repo verifies them — the link checker
  only proves a URL returns a status. The nearest thing to one source for the install commands is
  `src/data/agent-tools.json` (which feeds `InstallToolsModal.astro`); the prose reusable
  `AdaptySdkIntegrationSkill.mdx` restates them by hand and has already diverged, sending Codex to
  `npx skills add` where the JSON clones the repo into `~/.agents/skills/`. Treat this class of claim as
  reader-reported: correct it when someone reports it, and never assert its freshness in a review.
  TODO(owner): register `adapty-cli` and `adapty-sdk-integration-skill` in `sources.md` (both are
  `local-clone`, `default_ref: origin/main`, confirmed by `symbolic-ref`) — this zone currently has
  `sources: []` and cannot cite an id for either.

## What we document, what we don't

The delta that matters here is that most of the surface belongs to someone else — a third-party editor
on one side, a non-deterministic agent on the other.

- **We document what to hand the tool and in what order; we never document the tool's own UI.** An
  install command, the `/adapty-integration` invocation, and "use plan mode if your tool has one"
  are in scope. A walkthrough of Cursor's settings, an editor screenshot, or an MCP config file is not —
  it belongs to someone else's release schedule, and per `scope.md` the reader can see it anyway.
  Confirmed as current practice: `adapty-cursor` mentions plan mode in a single clause and delegates
  Context7 setup to `npx ctx7 setup` plus the upstream repo rather than walking it, and the skill pages
  are a one-screen wrapper (`AdaptySdkIntegrationSkill.mdx`) that hands off immediately. Corollary: we
  don't maintain a survey of which tools support skills — the reusable's "Supported tools" line plus
  `agent-tools.json` is the whole commitment, and extending it is a product decision.
  **One sanctioned exception (product decision, 2026-08-18): `developer-cli-cowork`** walks Claude's own
  settings with PM-supplied screenshots. The carve-out is narrow and shouldn't be generalized: it covers
  settings that are hard prerequisites the CLI cannot work without (the sandbox's domain allowlist, the
  plugin marketplace), in one article, for one tool, with the product team supplying the screenshots.
  "Cursor changed its settings page" still doesn't create doc work anywhere else in the zone — and when
  Anthropic changes Claude's UI, this one article is the whole blast radius (see Ripple rules).
- **Duplication in the agent-facing guides is deliberate and bounded.** `server-side-api-with-ai` and
  `handle-webhooks-with-ai` each open with a `:::tip` telling the reader to use **Copy for LLM** on the
  whole page, and then carry a runnable code block, the field gotchas, and the limits inline — content
  that also lives in the canonical articles. That is the design: a page pasted into an agent cannot
  depend on links the agent may not follow. So `scope.md`'s no-duplication reflex does not apply to
  these two; keep them self-contained, and keep the duplication scoped to what one paste needs (the full
  event list and full field tables stay a link, and do).
- **Duplication elsewhere in the zone is accidental and should not be blessed by the rule above.** The
  seven `adapty-cursor*` guides are near-identical prose differing mainly in their `.md` lists; their
  "Before you start: dashboard setup" section restates `developer-cli-quickstart`'s job and the
  quickstart articles it links to; and the install commands exist twice, in `agent-tools.json` and in
  the reusable, already disagreeing. When one of these changes, change both copies or delete one — don't
  cite the Copy-for-LLM rationale to justify them.
- **We do not promise determinism, and no guide may imply it.** A guide may state what to give the tool,
  in what order, what a correct result looks like, and what the tool cannot do. It may not promise that
  the agent produces particular code, finishes unattended, or produces the same result twice. The
  established shapes for this: the `:::tip[Checkpoint]` blocks in every `adapty-cursor*` guide, which
  assert an **Expected** observable state and a **Gotcha** rather than an agent behaviour; the one-line
  disclaimer both AI guides close their agent section with ("The agent writes the code, but it can't
  deploy your endpoint or configure the dashboard"); and the beta callout on every
  `adapty-sdk-integration-skill*` page, which answers "it went off the rails" with a documented fallback
  to the matching `adapty-cursor*` guide instead of a reliability claim. Write to observable end state,
  never to agent conduct.
- **Work the agent structurally cannot do gets one sentence and a link, not a procedure.** Store
  connection, dashboard credentials, hosting the endpoint, and setting keys are all stated as the
  reader's job in a single line in the guides that touch them — which is `scope.md`'s
  auto-provisioned/elsewhere-owned rule applied to a second reason (the agent has no browser and no
  secrets), and the reason `developer-cli-quickstart` stops at "connecting App Store Connect / Google
  Play still requires the dashboard".

## Articles
<!-- mill:auto:roster -->
| id | role | audience | sections | sidebars |
|---|---|---|---|---|
| adapty-cursor | — | dev | 15 | ios |
| adapty-cursor-android | — | dev | 15 | android |
| adapty-cursor-capacitor | — | dev | 15 | capacitor |
| adapty-cursor-flutter | — | dev | 15 | flutter |
| adapty-cursor-kmp | — | dev | 15 | kmp |
| adapty-cursor-react-native | — | dev | 15 | react-native |
| adapty-cursor-unity | — | dev | 15 | unity |
| adapty-sdk-integration-skill | — | dev | 0 | ios |
| adapty-sdk-integration-skill-android | — | dev | 0 | android |
| adapty-sdk-integration-skill-capacitor | — | dev | 0 | capacitor |
| adapty-sdk-integration-skill-flutter | — | dev | 0 | flutter |
| adapty-sdk-integration-skill-kmp | — | dev | 0 | kmp |
| adapty-sdk-integration-skill-react-native | — | dev | 0 | react-native |
| adapty-sdk-integration-skill-unity | — | dev | 0 | unity |
| developer-cli | entry | dev | 0 | api |
| developer-cli-ads-manager | entry | dev | 13 | api |
| developer-cli-ads-manager-reference | — | dev | 51 | api |
| developer-cli-ads-manager-skill | — | dev | 10 | api |
| developer-cli-authentication | — | dev | 7 | api |
| developer-cli-cowork | how-to | dev | 6 | api |
| developer-cli-quickstart | — | dev | 8 | api |
| developer-cli-reference | — | dev | 31 | api |
| export-analytics-with-ai | — | dev | 6 | tutorial |
| handle-webhooks-with-ai | — | dev | 7 | tutorial |
| manage-adapty-with-ai | entry | dev | 9 | tutorial |
| server-side-api-with-ai | — | dev | 5 | tutorial |
<!-- /mill:auto -->
## Reader jobs

## Ripple rules

- **`developer-cli-cowork` is the single Cowork-setup page; three things point at it and must move with
  it.** The `developer-cli-quickstart` intro links it as the "set up Cowork first" pointer, the
  `AdsManagerSkill.mdx` reusable links it (so the link renders on `developer-cli-ads-manager-skill`),
  and the `developer-cli` hub lists it in its doc-card list plus the api sidebar. It replaced an inline
  "Run the CLI in Cowork" section in the quickstart (2026-08-18); locale copies of the quickstart keep
  the old section and its `cowork-network-egress.png` until the next auto-translation run — don't delete
  that image or "fix" the locale files by hand.
- **Claude's UI labels and screenshots in `developer-cli-cowork` are Anthropic-owned** — Settings,
  Plugins, Capabilities, the allowlist controls — and can drift with no commit anywhere in Adapty, same
  class as the install-command claims in Sources of truth: reader-reported, corrected when someone
  reports them, freshness never asserted in a review. The Adapty-owned parts (marketplace repo URL,
  domain list, device-code flow, code TTL) verify against the adapty-cli-setup skill file instead.

## Boundaries

- **ai-advisory** — is the AI acting as a coding/dev tool integrating Adapty (agent-tooling), or is it Adapty's own AI Growth Advisor/Autopilot feature analyzing a marketer's account (ai-advisory)? These are unrelated "AI" surfaces — never route an Autopilot ticket here.
- **ads-manager** — same distinction for the Search Ads Manager's "AI Agent" chat: that belongs to ads-manager, not agent-tooling.
- **sdk-quickstart / sdk-flows-manual** — is the ticket about the actual SDK integration steps/content (owned by the relevant platform SDK zone), or about the AI-driven wrapper around them (agent-tooling)? A bug in the installation instructions belongs to sdk-quickstart even if reached via the skill; a bug in the skill's own automation or prompting belongs here.
- **server-side-api / other-apis** — is the ticket about the API endpoint itself, or about the AI-agent guide that wraps it (server-side-api-with-ai, export-analytics-with-ai, handle-webhooks-with-ai)? The wrapping guide is agent-tooling; the endpoint reference is server-side-api or other-apis.

## Ticket language

Rows name articles. Where a row covers a per-platform variant set, it names the base id and the
suffixes rather than all seven: `adapty-cursor*` and `adapty-sdk-integration-skill*` both exist as
the bare id (= iOS) plus `-android`, `-react-native`, `-flutter`, `-unity`, `-kmp`, `-capacitor`.
Corpus-wide synonyms live in `aliases.md` and are not repeated here.

| How a ticket says it | Where it actually lives |
|---|---|
| "vibe code the integration", "have Cursor/Claude add Adapty to my app", "AI pair-programming for IAP" | Two competing families, and `manage-adapty-with-ai` is the router between them: `adapty-sdk-integration-skill*` = one command, the agent drives the whole thing; `adapty-cursor*` = staged walkthrough where the developer feeds docs and reviews each step. Pick by how much control the reader wants, not by tool. |
| "which skill do I install", "the skill didn't set up my app/products" | Three *different* skills, easily conflated. `adapty-integration` (own repo, marketplace/`gh skill`/`npx skills` install) does the full app-code integration. The `adapty-cli` skill only drives dashboard entities through the CLI — it's linked from `developer-cli`, `developer-cli-quickstart`, `developer-cli-authentication`, and from the dashboard-setup step of every `adapty-cursor*`. The third, adapty-cli-setup (ships in the apple-ads-cli plugin), only installs and authenticates the CLI in agent sessions — `developer-cli-cowork` is the article that has readers install it. |
| "the skill stalled", "the agent went off the rails halfway" | The `adapty-sdk-integration-skill*` pages. The skill is beta and the documented fallback is the matching `adapty-cursor*` guide — that redirect is the answer, not a bug report. |
| "which key does my agent need", "agent got 401", "where's the API key" | The single commonest confusion in this zone, and it splits three ways. SDK integration (`adapty-cursor*`, `adapty-sdk-integration-skill*`) = **public SDK key**, passed to `activate`. Analytics and backend guides (`export-analytics-with-ai`, `server-side-api-with-ai`) = **secret app-specific key**, and note the base URLs differ (`api-admin.adapty.io` for analytics vs `api.adapty.io` for server-side). The CLI (`developer-cli-authentication`) uses **no key at all** — browser device-code login. **Refined 2026-08-11 against `adapty-cli` `origin/main`:** the docs describe only the device-code path, but the CLI checks `ADAPTY_TOKEN` in the environment *before* it reads the config file, and the config location is oclif's `configDir` (`~/.config/adapty/config.json` by default on darwin, overridable via `XDG_CONFIG_HOME`), not a fixed path. So "no key at all" is true of the documented flow and false of the tool — a reader debugging a 401 in CI needs the env-var branch, which no article mentions. |
| "MCP server for Adapty", "connect Adapty to my agent via MCP" | `manage-adapty-with-ai`. There is no first-party Adapty MCP server. Context7 is third-party and indexes only code snippets, not prose; the CLI is the "agent can actually act" path; analytics needs only a fetch-capable tool. |
| "give my agent the docs", "llms.txt", "Copy for LLM", "context window too small" | `manage-adapty-with-ai` for the overview, `adapty-cursor*` ("Plain text doc index files") for the detail: per-platform subsets (`ios-llms.txt`) exist specifically to save tokens vs `llms-full.txt`, and ChatGPT needs `llms.txt` downloaded and uploaded as a file rather than linked. |
| "ChatGPT/claude.ai can't fetch my numbers", "the model made the metrics up" | `export-analytics-with-ai`. The hard requirement is a tool that can make HTTP calls (Claude Code, Cursor, a fetch tool) — plain chat products cannot, and this is called out explicitly. |
| "ask AI about my revenue", "natural-language LTV/retention query", "export as CSV" | `export-analytics-with-ai`. The mechanism is just handing the agent the OpenAPI spec URL; the two limits that bite are 2 requests/second per key and CSV being a `format` field in the request body. |
| "automate account setup", "configure Adapty without the dashboard", "scripted app/product creation" | `developer-cli-quickstart`. Two boundaries matter more than the commands: connecting App Store Connect / Google Play still requires the dashboard, and segments are read-only from the CLI (`developer-cli-reference`) — you can look up IDs but not create them. |
| "swap a paywall across placements", "`--paywall-id` deprecated warning", "segment routing disappeared" | `developer-cli-reference`. `--paywall-id` rewrites the placement's whole `audiences` array and silently drops segment-specific entries; the safe path is read with `placements get --json`, edit, write back with `--audiences`. |
| "the CLI doesn't work in Cowork", "Claude can't reach adapty.io", "network error installing the CLI", "it keeps asking me to log in again", "the authorization code expired" | `developer-cli-cowork`, and the causes are what make the lookup land: the sandbox blocks non-allowlisted domains and needs **both** `adapty.io` and `*.adapty.io` (a wildcard doesn't cover the apex); settings apply only when a task starts, so a mid-conversation change does nothing until a new task; every task starts on a clean machine, so reinstall-and-login each session is by design, not a bug; and the device code dies after ~15 minutes — the fix is a fresh link, never retyping the old one. |
| "CLI token expired", "log the CLI out everywhere", "credentials leaked" | `developer-cli-authentication`. `auth logout` only clears the local config — the token stays valid server-side; `auth revoke` is the one that invalidates it. `auth status` reads local state, `auth whoami` actually checks with the server. |
| "unlock premium for a support case / promo code / investor", "no `is_active` in the response" | `server-side-api-with-ai`, one article for both. Manual grants reach only the webhook integration and Event Feed, so they never show up in analytics; and the server-side profile has no `is_active` — status must be derived from `access_levels[].expires_at` (`null` = lifetime) plus `is_in_grace_period`. |
| "sync my backend with subscription status", "grant access server-side when someone buys" | Split by direction, and tickets rarely say which they want: event-driven push is `handle-webhooks-with-ai`; an on-demand check or a manual grant is `server-side-api-with-ai`. |
| "duplicate webhook events", "events arrive out of order", "Adapty keeps retrying" | `handle-webhooks-with-ai`. `event_datetime` is business time, so it must not be used for ordering — dedupe on `profile_event_id`. Acknowledge within 10 s; statuses outside 200–404 trigger backoff retries for up to 24 hours. |
| "the agent installed the wrong SDK version" | `adapty-cursor-capacitor` is the only variant that **warns** about this, not the only one exposed to it — corrected 2026-08-11. Capacitor's documented API is the v4 pre-release while an LLM left to itself installs the latest stable 3.x, and the guide says to pin the exact beta. KMP and Unity are v4-beta-only too (`platforms.md`), yet `adapty-cursor-kmp` and `adapty-cursor-unity` contain zero occurrences of `beta` or `4.0.0` — and KMP is worse, because Gradle cannot resolve a pre-release through a version range at all. Treat the silence in those two as a documentation gap, not as evidence the hazard is absent. |

## Gaps and misses

