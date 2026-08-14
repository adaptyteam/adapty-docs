# Sources

Registry of ground-truth code and spec sources for context-mill rollout mode. Parsed by
`scripts/context-mill/sources.mjs` — only `path:`, `remote:`, `default_ref:`, `ref_pattern:`, `kind:`
lines directly under each `## <id> — <title>` heading are read; everything else below a heading is
free prose for a human or agent to read, not for the parser.

`kind` ∈ `local-clone` | `in-repo-spec` | `remote`. `remote:` is mandatory on every `local-clone` — it
is the only way the source resolves in an environment with no local clones (unattended/Phase 3 runs).

Established 2026-08-06 by inspecting the actual clones under `~/Documents`, not by assumption: every
`default_ref` below is the real `git symbolic-ref refs/remotes/origin/HEAD` (or, where that failed, the
branch a released tag is actually reachable from) for that clone, and every `ref_pattern` is checked
against real remote branch names (`git ls-remote --heads origin`), not the org's most common
convention. See `platforms.md` for the per-platform version/quirk layer that sits on top of these.

## ios-sdk — iOS SDK
path: ~/Documents/AdaptySDK-iOS
remote: https://github.com/adaptyteam/AdaptySDK-iOS.git
default_ref: origin/master
ref_pattern: release/*
kind: local-clone

Public API lives in `Sources/`. Packaging is now SPM-only — confirmed by commit `bbd8aeb0` ("chore:
drop CocoaPods support") and the absence of any `.podspec` in the repo; `Package.swift` is the only
manifest. Confirm a version from `git tag` (sorted by `creatordate`, not lexically — semver strings
don't sort correctly as text). `origin/master` is GA-current (reachable tag `4.0.2` as of 2026-08-06).
`origin/release/4.1.0` exists on the remote and is the 4.1 line in flight — see `platforms.md`.

## android-sdk — Android SDK
path: ~/Documents/AdaptySDK-Android
remote: https://github.com/adaptyteam/AdaptySDK-Android.git
default_ref: origin/master
ref_pattern: release/*
kind: local-clone

`origin/master` carries reachable tag `4.0.1` (GA). No `release/4.1.*` (or any `4.1`/`attribution`
named) branch exists on the remote as of 2026-08-06 — Android has not started a 4.1 line yet, unlike
iOS. The local clone's checked-out branch (`release/4.0.0`) is 3 commits behind
`origin/release/4.0.0` and carries 1 uncommitted local change that predates this task — read
`origin/master` for current facts, not this working tree.

## rn-sdk — React Native SDK
path: ~/Documents/AdaptySDK-React-Native
remote: https://github.com/adaptyteam/AdaptySDK-React-Native.git
default_ref: origin/master
ref_pattern: release/*
kind: local-clone

**Do not treat this repo as the source of the public API — see `jscore` below.** This package wraps
`@adapty/core`; its `package.json` pin on that dependency is frequently older than `jscore`'s own
`origin/master`. Confirmed 2026-08-06: this repo's `release/4.0.0` branch pins
`@adapty/core@4.0.0-beta.1-dev.e467e14ee232001393e8b37ac05fc9d6906a8e4a`, while `jscore`'s
`origin/master` is already at the GA tag `v4.0.1`. Use this repo only for the RN-specific
wrapper/bridge layer, TypeScript re-exports, and the example app. `origin/master` is GA-current
(reachable tag `v4.0.1`); no `release/4.1.*` branch exists yet. Installation docs are split into two
articles — see `platforms.md` for the exact ids, which differ from the shorthand "expo"/"pure" naming
sometimes used in conversation.

## flutter-sdk — Flutter SDK
path: ~/Documents/AdaptySDK-Flutter
remote: https://github.com/adaptyteam/AdaptySDK-Flutter.git
default_ref: origin/master
ref_pattern: release/*
kind: local-clone

Public API lives in `lib/src/`. `origin/master` is GA-current (reachable tag `4.0.1`); confirm a
version from `pubspec.yaml`'s `version:` line or `git tag`. **Open question / known gap in this
pattern:** unlike every other platform repo, Flutter never used a `release/4.x` branch for the v4 line
— its `release/*` branches stop at `3.17.2`, meaning v4 shipped by merging straight to `master`. The
4.1 line currently in flight lives on `feat/sdk-4.1-update` and `feat/sdk-4.1-ui-integration`, not on a
`release/4.1.*` branch. `ref_pattern: release/*` will **not** surface this branch — `mill:refs`
candidates for Flutter must be cross-checked by hand against `feat/sdk-4.1-*` until/unless this repo's
branching convention changes.

## unity-sdk — Unity SDK
path: ~/Documents/AdaptySDK-Unity
remote: https://github.com/adaptyteam/AdaptySDK-Unity.git
default_ref: origin/main
ref_pattern: release/*
kind: local-clone

Public API lives under `Packages/com.adapty.unity-sdk/`. **`default_ref` is `origin/main`, not
`master`** — confirmed via `git symbolic-ref refs/remotes/origin/HEAD`; do not assume `master` for this
repo. `origin/main` is still on the v3 line (reachable tag `3.17.0`); v4 is beta-only, on
`origin/release/4.0.0` (tag `4.0.0-beta.1`), not yet merged to `main`.

## kmp-sdk — Kotlin Multiplatform SDK
path: ~/Documents/AdaptySDK-KMP
remote: https://github.com/adaptyteam/AdaptySDK-KMP.git
default_ref: origin/main
ref_pattern: release/*, rel_v*
kind: local-clone

**`default_ref` is `origin/main`, not `master`** — confirmed via `symbolic-ref`, same as `unity-sdk`.
This repo used `rel_v*` branch naming for pre-4.0 releases (`rel_v3.16.2`, `rel_v3.17.0`, …) and only
switched to `release/*` for the 4.x line (`release/4.0.0`) — both patterns are listed so `mill:refs`
candidates aren't silently dropped for either era. `origin/main` is still on v3 (reachable tag
`3.17.0`); v4 is beta-only on `origin/release/4.0.0` (tag `4.0.1-beta.1`, dated 2026-08-05), 8 commits
ahead of the local clone's checked-out branch.

## capacitor-sdk — Capacitor SDK
path: ~/Documents/AdaptySDK-Capacitor
remote: https://github.com/adaptyteam/AdaptySDK-Capacitor
default_ref: origin/master
ref_pattern: release/*
kind: local-clone

**Do not treat this repo as the source of the public API — see `jscore` below**, same rule as
`rn-sdk`: this package wraps `@adapty/core`. `origin/master` has **no v4 tag at all yet** (full tag
list checked; latest reachable tag is `v3.17.1`) — Capacitor v4 is unreleased, in progress on
`origin/release/4.0.0` and a newer `origin/release/4.0.1-beta.1`. The local clone's checked-out branch
is `release/4.0.0`, pinning `@adapty/core@4.0.0-beta.1` — check `jscore`'s current state before writing
docs against that pin, it may already be stale. Native iOS side is SPM-only: `Package.swift` present,
no `Podfile`/`.podspec` anywhere in the repo. No Kids Mode mechanism exists here or in `jscore`
(grepped both `src/` trees for `kidsMode`/`KidsMode`/`kids_mode`, zero hits) — do not document a
Capacitor Kids Mode toggle.

## jscore — @adapty/core, shared core for React Native and Capacitor
path: ~/Documents/AdaptySDK-JS-Core
remote: https://github.com/adaptyteam/AdaptySDK-JS-Core
default_ref: origin/master
ref_pattern: release/*
kind: local-clone

**Truth lives HERE, not in the platform repo.** `rn-sdk` and `capacitor-sdk` both depend on
`@adapty/core` at a pinned version, and that pin is routinely behind this repo's own `origin/master` —
confirmed 2026-08-06 for both (see their entries above: RN pins a beta-dev snapshot, Capacitor pins
`4.0.0-beta.1`, while this repo is already at GA `v4.0.1`). A React Native or Capacitor task must read
`jscore`'s API, not the platform repo's re-export of it. Public API surface is `src/index.ts` plus
`src/types/`, `src/adapters/`, `src/ui-builder/`; confirm a version from `package.json`'s `version`
field or `git tag` against `default_ref` for the released state. Branch naming here is mixed:
`release/4.0.0` exists (version-shaped, matches `ref_pattern`) but the other two non-`master` branches
are `release/capacitor` and `release/beta-2-capacitor` — integration branches for the Capacitor pin,
not version releases. A `ref_pattern: release/*` match on this repo does not always mean "a new jscore
version" — it can mean "a Capacitor integration branch." Read the branch name, not just the pattern
match, before acting on a candidate here.

## dashboard-backend — adapty-dashboard-api
path: ~/Documents/adapty-dashboard-api
remote: https://gitlab.adapty.io/adapty/adapty-dashboard-api.git
default_ref: origin/develop
kind: local-clone

> **This clone goes stale faster than any other here — never read its working tree.** Measured
> 2026-08-12: the local checkout sat at 2026-05-20 while `origin/develop` was at 2026-08-11, **1,989
> commits ahead**. Two separate reviews found real differences between the two (a proceeds rate that
> exists on the ref and not in the tree, among others). Always `git show origin/develop:<path>` or
> `git grep <pattern> origin/develop -- <path>`. Note the default ref is `develop`, not `master`.

Integration form field labels, `required` flags, and hint text shown on the dashboard's integration
setup screens come from `portal/integration_context/constants/share.py` in this repo — confirmed at
`src/portal/integration_context/constants/share.py` (e.g. the Mixpanel data-residency field's title and
required flag live there). **Not** from `adapty-dashboard-interface` — see that entry below, which
only carries the field key, not its display metadata. Branches here are Jira-ticket-numbered
(`ADP-<n>-develop` / `ADP-<n>-DEVELOP`, casing inconsistent across tickets), not version-shaped, so
`ref_pattern` is deliberately omitted: there is no mechanical pattern to filter candidates by, and
`mill:refs` correctly reports "no branches match ref_pattern" for this source rather than a false
positive. Confirm any specific change against the ticket branch actually named in the task.

## dashboard-interface — adapty-dashboard-interface
path: ~/Documents/adapty-dashboard-interface
remote: https://gitlab.adapty.io/adapty/adapty-dashboard-interface.git
default_ref: origin/master
kind: local-clone

Dashboard frontend, including the Flow Builder UI (`packages/unified-builder`) — the authority for
exact builder labels and control naming (conditional actions, boolean operators, preset names). Does
**not** carry integration-form display metadata — see `dashboard-backend`'s `share.py` rule above; this
repo only has the field key, not its title/required/hint. Branches are Jira-ticket-numbered here too
(`ADP-<n>-develop`); `ref_pattern` omitted for the same reason as `dashboard-backend`.

## server-side-api-spec — Server-side API v2 (maintained)
path: src/api-reference/specs/adapty-api.yaml
kind: in-repo-spec

Registered in `src/api-reference/config.json` as slug `api-adapty`. This is the maintained,
machine-checked source for Server-side API v2 endpoints. Per house rule: never call it "Server API";
link endpoint mentions to `api-adapty/operations/<operationId>`, and the concept link is
`getting-started-with-server-side-api`, not this spec file directly.

## web-api-spec — Web API (maintained)
path: src/api-reference/specs/web-api.yaml
kind: in-repo-spec

Registered in `config.json` as slug `api-web`. Note the separate, explicitly **unmaintained**
`web-api-objects.mdx` article that documents the same domain objects in prose — per existing house
rule, that article is never updated; this YAML spec is the maintained reference.

## analytics-export-api-spec — Analytics Export API (maintained)
path: src/api-reference/specs/export-analytics-api.yaml
kind: in-repo-spec

Registered in `config.json` as slug `api-export-analytics`.

## mail-api-spec — Adapty Mail API (maintained)
path: src/api-reference/specs/adapty-mail-api.yaml
kind: in-repo-spec

Registered in `config.json` as slug `api-mail`. Public surface is 3 Profile endpoints
(`saveProfile`, `deleteProfile`, `saveTransactionEvent`) at `api-mail.adapty.io`, auth is the Adapty
Mail secret key as a Bearer token — the rest of the underlying service is internal. Don't expand
documented scope beyond those three endpoints from reading this spec file alone. Count corrected
2026-08-14: `deleteProfile` shipped after this entry was written, so treat the number here as a
snapshot and re-check the auth dependency in `mail-backend` before relying on it.

## developer-api-spec — Developer API (stub, not maintained)
path: src/api-reference/specs/developer-api.yaml
kind: in-repo-spec

**Not a source of truth — do not use.** Confirmed empty: `paths: {}`, no operations defined, and not
registered in `config.json` (unlike the four specs above, which all have a `config.json` entry).
Locale-translated copies sit alongside it (`developer-api.es.yaml`, `.ja.yaml`, etc.) but translate
nothing, because the English source has no content to translate. Open question: why this file is still
committed at all — flagging it here rather than deleting it, since deletion is out of scope for this
registry task.

## adapty-cli — Developer CLI

path: ~/Documents/adapty-cli
remote: https://github.com/adaptyteam/adapty-cli
default_ref: origin/main
ref_pattern: release/*
kind: local-clone

Ground truth for everything the `agent-tooling` zone says about the CLI: its command surface
(`src/commands/**`), the device-code login flow (`src/commands/auth/login.ts`), the token resolution
order (`src/lib/auth.ts` — note it reads `ADAPTY_TOKEN` from the environment *before* the config file,
which the docs don't mention) and the config location (`src/lib/config.ts`, via oclif's `configDir`).
There is no committed oclif manifest, so the TypeScript is the only surface description.

**This CLI drives the one Adapty API with no published spec** — `api-admin.adapty.io/api/v1/developer`,
set as `DEFAULT_API_URL` in `src/lib/api-client.ts`. `developer-api.yaml` in this repo is an empty stub
(`paths: {}`), so unlike every other API surface there is nothing to quote: read the client.

Registered 2026-08-11. It was missing until then, which is why CLI claims had no registered source.

## sdk-integration-skill — Adapty SDK integration skill

path: ~/Documents/adapty-sdk-integration-skill
remote: https://github.com/adaptyteam/adapty-sdk-integration-skill.git
default_ref: origin/main
ref_pattern: release/*
kind: local-clone

The packaged skill the `agent-tooling` zone documents. **The dependency runs the other way from every
other source here: this repo is pinned to our published docs, not to the SDKs.**
`scripts/lint-symbols.mjs` resolves every Adapty symbol it mentions against `adapty.io/docs`'s
`llms.txt`, and a cron files a `skill-drift` issue when our docs move — so a rename on our side breaks
the skill, and the skill is never upstream of us.

The gap that lint does *not* close is version pins: it checks symbols, never versions. So skill and docs
can go stale together on a pre-release pin (its `references/kmp.md` pins `4.0.0-beta.1` while the KMP SDK
has since tagged `4.0.1-beta.1`).

Registered 2026-08-11, same reason as `adapty-cli`.

## ua-service — Adapty User Acquisition service

path: ~/Documents/adapty-user-acquisition
remote: https://gitlab.adapty.io/adapty/adapty-user-acquisition.git
default_ref: origin/develop
ref_pattern: release/*
kind: local-clone

The service behind `api-ua.adapty.io`, and ground truth for almost everything the `attribution` zone
claims. **Note `default_ref` is `origin/develop`, not `origin/master`** — `git symbolic-ref
refs/remotes/origin/HEAD` resolves there. Reading `master` or the working tree will mislead you.

The attribution data model lives here and **in no SDK**: the SDKs carry an opaque JSON payload string,
so an SDK repo can confirm how to read install data but never what is in it. Two lists that look alike
and are not: the wire `channel` value (produced by a small partner map plus free text a marketer typed
into a tracking link's Channel field) versus the analytics reporting taxonomy — `organic` legitimately
exists only in the second. The daily export's writer and cron also live here, so a column difference
between the three storage articles is drift, never a product difference.

Registered 2026-08-11.

## mail-backend — Adapty Mail backend (noty-wave)

path: ~/Documents/noty-wave-backend
remote: https://gitlab.adapty.io/noty-wave/backend.git
default_ref: origin/develop
ref_pattern: release/*
kind: local-clone

Ground truth for the `adapty-mail` zone: flow/trigger semantics, send eligibility, suppression, and the
warm-up ladder. **`default_ref` is `origin/develop`.** The vocabulary does not match the docs — no
backend symbol is called "flow" — so read the mapping in the zone brief before grepping for one.

**The public API surface is decided by the auth dependency, not by the OpenAPI tag.** Only the routes
taking the project-scoped Adapty Mail secret key are public; the same `Profile` tag also holds routes
that take a dashboard account session and are internal. A route being visible in Swagger or a network
tab is not evidence it may be documented.

`docs/specs/` holds design records — useful, but **read the migrations and the code before trusting a
spec's `Status:` header**. `MULTI_SOURCE_PROFILES.md` still says "approved design, not implemented"
while all five of its releases have shipped.

Registered 2026-08-11. Read at `1a147338` (2026-08-13).

## mail-frontend — Adapty Mail dashboard (noty-wave)

path: ~/Documents/noty-wave-frontend
remote: https://gitlab.adapty.io/noty-wave/frontend.git
default_ref: origin/develop
ref_pattern: release/*
kind: local-clone

Where a Mail dashboard control's enabled/disabled state is decided — useful when an article claims a
setup ordering. Worked example: the *Enable Adapty integration* button is gated on a field the backend
computes as "has an active flow **or** has ever called the ingestion API", and the gate is UI-only. So
"enable sending last" is sound ordering advice, not an enforced invariant, and must not be written as one.

Also the canonical source for **user-visible strings** — nav labels, chip labels, modal copy, disabled-state
hints. Worked example: the profile list is under a **Profiles** nav item, not "CRM"; and `SES_META` in
`features/crm/lib/meta.ts` is where the Journey chip labels are defined, including that **Delivered**
supersedes **Sent** rather than following it.

Read at `8b5613a` (2026-08-13).

Registered 2026-08-11.
