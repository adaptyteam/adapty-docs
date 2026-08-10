---
zone: agent-tooling
sources: []
reviewed_shape:
reviewed_at:
---

## What this is

Adapty's tooling for coding agents and AI-assisted development: the SDK integration skill and its per-platform variants, the step-by-step "integrate with AI" guides (adapty-cursor and its platform variants) that walk an AI coding tool through SDK integration stage by stage, the Adapty Developer CLI (a terminal tool an agent can drive to manage apps, products, paywalls, and placements), and guides for pointing an AI agent at the Export Analytics API or at webhook payloads. It's about how a developer's AI coding tool — Cursor, Claude, ChatGPT, or similar — integrates Adapty into an app or automates routine backend/dashboard tasks. It is explicitly not about any AI feature inside the Adapty product itself. Readers are developers setting up an AI-assisted workflow, most often during initial SDK integration or when scripting dashboard changes from the terminal.

## Surfaces

## Sources of truth

## What we document, what we don't

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
| developer-cli-authentication | — | dev | 7 | api |
| developer-cli-quickstart | — | dev | 8 | api |
| developer-cli-reference | — | dev | 31 | api |
| export-analytics-with-ai | — | dev | 6 | tutorial |
| handle-webhooks-with-ai | — | dev | 7 | tutorial |
| manage-adapty-with-ai | entry | dev | 8 | tutorial |
| server-side-api-with-ai | — | dev | 5 | tutorial |
<!-- /mill:auto -->
## Reader jobs

## Ripple rules

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
| "which skill do I install", "the skill didn't set up my app/products" | Two *different* skills, easily conflated. `adapty-sdk-integration` (own repo, marketplace/`gh skill`/`npx skills` install) does the full app-code integration. The `adapty-cli` skill only drives dashboard entities through the CLI — it's linked from `developer-cli`, `developer-cli-quickstart`, `developer-cli-authentication`, and from the dashboard-setup step of every `adapty-cursor*`. |
| "the skill stalled", "the agent went off the rails halfway" | The `adapty-sdk-integration-skill*` pages. The skill is beta and the documented fallback is the matching `adapty-cursor*` guide — that redirect is the answer, not a bug report. |
| "which key does my agent need", "agent got 401", "where's the API key" | The single commonest confusion in this zone, and it splits three ways. SDK integration (`adapty-cursor*`, `adapty-sdk-integration-skill*`) = **public SDK key**, passed to `activate`. Analytics and backend guides (`export-analytics-with-ai`, `server-side-api-with-ai`) = **secret app-specific key**, and note the base URLs differ (`api-admin.adapty.io` for analytics vs `api.adapty.io` for server-side). The CLI (`developer-cli-authentication`) uses **no key at all** — browser device-code login stored in `~/.config/adapty/config.json`. |
| "MCP server for Adapty", "connect Adapty to my agent via MCP" | `manage-adapty-with-ai`. There is no first-party Adapty MCP server. Context7 is third-party and indexes only code snippets, not prose; the CLI is the "agent can actually act" path; analytics needs only a fetch-capable tool. |
| "give my agent the docs", "llms.txt", "Copy for LLM", "context window too small" | `manage-adapty-with-ai` for the overview, `adapty-cursor*` ("Plain text doc index files") for the detail: per-platform subsets (`ios-llms.txt`) exist specifically to save tokens vs `llms-full.txt`, and ChatGPT needs `llms.txt` downloaded and uploaded as a file rather than linked. |
| "ChatGPT/claude.ai can't fetch my numbers", "the model made the metrics up" | `export-analytics-with-ai`. The hard requirement is a tool that can make HTTP calls (Claude Code, Cursor, a fetch tool) — plain chat products cannot, and this is called out explicitly. |
| "ask AI about my revenue", "natural-language LTV/retention query", "export as CSV" | `export-analytics-with-ai`. The mechanism is just handing the agent the OpenAPI spec URL; the two limits that bite are 2 requests/second per key and CSV being a `format` field in the request body. |
| "automate account setup", "configure Adapty without the dashboard", "scripted app/product creation" | `developer-cli-quickstart`. Two boundaries matter more than the commands: connecting App Store Connect / Google Play still requires the dashboard, and segments are read-only from the CLI (`developer-cli-reference`) — you can look up IDs but not create them. |
| "swap a paywall across placements", "`--paywall-id` deprecated warning", "segment routing disappeared" | `developer-cli-reference`. `--paywall-id` rewrites the placement's whole `audiences` array and silently drops segment-specific entries; the safe path is read with `placements get --json`, edit, write back with `--audiences`. |
| "CLI token expired", "log the CLI out everywhere", "credentials leaked" | `developer-cli-authentication`. `auth logout` only clears the local config — the token stays valid server-side; `auth revoke` is the one that invalidates it. `auth status` reads local state, `auth whoami` actually checks with the server. |
| "unlock premium for a support case / promo code / investor", "no `is_active` in the response" | `server-side-api-with-ai`, one article for both. Manual grants reach only the webhook integration and Event Feed, so they never show up in analytics; and the server-side profile has no `is_active` — status must be derived from `access_levels[].expires_at` (`null` = lifetime) plus `is_in_grace_period`. |
| "sync my backend with subscription status", "grant access server-side when someone buys" | Split by direction, and tickets rarely say which they want: event-driven push is `handle-webhooks-with-ai`; an on-demand check or a manual grant is `server-side-api-with-ai`. |
| "duplicate webhook events", "events arrive out of order", "Adapty keeps retrying" | `handle-webhooks-with-ai`. `event_datetime` is business time, so it must not be used for ordering — dedupe on `profile_event_id`. Acknowledge within 10 s; statuses outside 200–404 trigger backoff retries for up to 24 hours. |
| "the agent installed the wrong SDK version" | `adapty-cursor-capacitor` — the only variant with this hazard, because Capacitor's documented API is the v4 pre-release while an LLM left to itself installs the latest stable 3.x. The guide tells you to pin the exact beta version. |

## Gaps and misses

