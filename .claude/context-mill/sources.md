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

Registered in `config.json` as slug `api-mail`. Public surface is 2 Profile endpoints
(`saveProfile`, `saveTransactionEvent`) at `api-mail.adapty.io`, auth is the Adapty Mail secret key as
a Bearer token — the rest of the underlying service is internal. Don't expand documented scope beyond
those two endpoints from reading this spec file alone.

## developer-api-spec — Developer API (stub, not maintained)
path: src/api-reference/specs/developer-api.yaml
kind: in-repo-spec

**Not a source of truth — do not use.** Confirmed empty: `paths: {}`, no operations defined, and not
registered in `config.json` (unlike the four specs above, which all have a `config.json` entry).
Locale-translated copies sit alongside it (`developer-api.es.yaml`, `.ja.yaml`, etc.) but translate
nothing, because the English source has no content to translate. Open question: why this file is still
committed at all — flagging it here rather than deleting it, since deletion is out of scope for this
registry task.
