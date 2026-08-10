# Platforms

Per-platform facts for the seven SDK platforms — ground-truth source, current version state, local
quirks, and the release-branch scope rule. Ids match `PLATFORMS` in
`scripts/context-mill/roster.mjs`: `ios`, `android`, `react-native`, `flutter`, `unity`, `kmp`,
`capacitor`. Source ids referenced below (`ios-sdk`, `jscore`, …) are defined in `sources.md`.

**Release-branch scope rule (applies to every platform below, stated once):** in a session working on
one platform's release branch, never edit another platform's docs. If work surfaces something that
belongs to a different platform, spin off a separate task instead of touching it in the same pass.

Version state established 2026-08-06 from each clone's tags and remote branches — see `sources.md` for
exactly which `git` calls were used per repo (`describe --tags --long` against `default_ref`,
`ls-remote --heads` for in-flight branches). Not from institutional memory or the local clone's
checked-out branch, which can be stale or task-specific.

## ios
source: `ios-sdk`

**Version:** GA v4, tag `4.0.2` (established: `git describe --tags --long origin/master` →
`4.0.2-1-g706d185b`, i.e. `origin/master` is 1 commit past the `4.0.2` tag). **In flight:** 4.1 —
`origin/release/4.1.0` exists on the remote (confirmed via `git ls-remote --heads origin`). Per prior
session notes this line is attribution opt-in + API renames + promoted purchases return, tracked as
`migration-to-ios-sdk-41`; not independently re-derived from the 4.1 branch's diff in this pass, so
treat the scope as carried-over context, not freshly confirmed.

**Quirks:**
- SPM-only installation from v4 — CocoaPods support was dropped (commit `bbd8aeb0`, "chore: drop
  CocoaPods support"); no `.podspec` remains in the repo. Confirmed directly against the repo.
- Has a Kids Mode mechanism (confirmed: `KidsMode` references in `Sources/Adapty+Activate.swift` and
  `Sources/Envoriment/Environment.Device.idfa.swift`) — contrast with Capacitor, which has none.

## android
source: `android-sdk`

**Version:** GA v4, tag `4.0.1` (established: `git describe --tags --long origin/master` →
`4.0.1-0-g30ef638`, i.e. `origin/master` tip *is* the `4.0.1` tag). **In flight:** nothing — no
`release/4.1.*` branch, and no branch matching `4.1` or `attribution` exists on the remote as of
2026-08-06 (checked with `git ls-remote --heads origin`). Android is behind iOS in starting the 4.1
line.

**Quirks:**
- Flow Builder / flows rework for Android is tracked against a separate devtool clone,
  `AdaptySDK-Android-UniversalDevtool`, branch `feature/ui_builder_5_mvp` (per prior session notes,
  not re-verified this pass — that clone is not in `sources.md`, it's an internal test/example app, not
  a source of the public SDK API).
- No other Android-specific quirk confirmed in this pass beyond the scope rule above.

**Local clone note:** the checked-out branch (`release/4.0.0`) is 3 commits behind
`origin/release/4.0.0` and carries 1 uncommitted local change that predates this task — don't read
version facts off this working tree, use `origin/master`.

## react-native
source: `rn-sdk` for the wrapper/bridge layer; **`jscore` for the public API** — this is the platform
the mill's `jscore` rule exists for.

**Version:** GA v4, tag `v4.0.1` on `origin/master` (established: `git describe --tags --long
origin/master` → `v4.0.1-0-g616c7db`). **In flight:** nothing — no `release/4.1.*` branch found on the
remote.

**Quirks:**
- The public API is defined in `jscore`, not this repo. Confirmed stale pin as of 2026-08-06: this
  repo's `release/4.0.0` branch pins `@adapty/core@4.0.0-beta.1-dev.e467e14ee232001393e8b37ac05fc9d6906a8e4a`
  in `package.json`, while `jscore`'s own `origin/master` is already at GA `v4.0.1` — reading this
  repo's pinned core for a feature question would give an older iteration of the API.
- Installation docs are split into two articles, not one: `sdk-installation-react-native-expo` and
  `sdk-installation-react-native-pure` (confirmed present, and both wired into the `react-native.json`
  sidebar under those exact ids). Both files currently live under `src/content/docs/version-3.0/`, but
  per the filename-based URL rule the folder doesn't matter — don't assume "version-3.0" means legacy
  here.

## flutter
source: `flutter-sdk`

**Version:** GA v4, tag `4.0.1` (established: `pubspec.yaml`'s `version:` line on the checked-out
branch reads `4.0.1`, and `git describe --tags --long origin/master` independently confirms
`4.0.1-1-gb8a2d77`). **In flight:** 4.1 — branches `feat/sdk-4.1-update` and
`feat/sdk-4.1-ui-integration` exist on the remote (external attribution API alignment + UI
integration, by branch name; scope not independently confirmed from a diff in this pass).

**Quirks:**
- **Could not confirm "three required observer callbacks."** Inspected
  `lib/src/adaptyui_observer.dart` on `origin/master` (the GA/default_ref state): every method on both
  `AdaptyUIFlowsEventsObserver` and `AdaptyUIOnboardingsEventsObserver` has an empty default body
  (`{}`) — none is currently required to override. This may describe a state on the in-flight 4.1
  branches instead, or may be stale. **Recording as an open question, not a fact** — re-check against
  whichever branch is the actual target of a Flutter rollout task before repeating this claim in docs.
- Branch-naming gap: unlike every other platform, Flutter's `release/*` branches stop at `3.17.2` — v4
  shipped by merging straight to `master`, and 4.1 uses `feat/sdk-4.1-*` instead of `release/4.1.*`.
  See `sources.md`'s `flutter-sdk` entry; `mill:refs` candidates for this platform need a manual check
  against `feat/sdk-4.1-*` on top of the `release/*` pattern.

## unity
source: `unity-sdk`

**Version:** v3 GA on `origin/main` (reachable tag `3.17.0`, established via `git describe --tags
--long origin/main` → `3.17.0-1-geef2c09`). v4 is **beta only** — tag `4.0.0-beta.1` exists on
`origin/release/4.0.0`, not yet merged to `main`.

**Quirks:**
- `default_ref` is `origin/main`, not `master` — do not assume `master` for this repo (confirmed via
  `symbolic-ref`; see `sources.md`).
- SPM-only iOS packaging (a quirk carried over from prior session notes for the v4 line) — **could not
  confirm independently in this pass**: found no `Podfile`/`.podspec` for Unity's own iOS integration,
  but also no `Package.swift` or other SPM manifest specific to this repo, so there's no positive
  evidence either way from this repo alone (Unity's native plugin distribution may not go through a
  package manager the way RN/Capacitor's does). Recording as unconfirmed rather than asserting it.

## kmp
source: `kmp-sdk`

**Version:** v3 GA on `origin/main` (reachable tag `3.17.0`). v4 is **beta only** — tag
`4.0.1-beta.1` (dated 2026-08-05) on `origin/release/4.0.0`, 8 commits ahead of the local clone's
checked-out branch.

**Quirks:**
- `default_ref` is `origin/main`, not `master` — same caveat as `unity`, confirmed via `symbolic-ref`.
- Branch naming is mixed by era: `rel_v*` for everything pre-4.0 (`rel_v3.16.2`, `rel_v3.17.0`, …),
  `release/*` from the 4.x line on (`release/4.0.0`). `sources.md`'s `ref_pattern` for `kmp-sdk` lists
  both.
- No restore-behavior change expected for KMP's v4 line, per prior session notes — not independently
  re-verified against a diff in this pass; carried over as context, not a fresh finding.

## capacitor
source: `capacitor-sdk` for the wrapper/bridge layer; **`jscore` for the public API**, same rule as
`react-native`.

**Version:** v3 GA (tag `v3.17.1`) on `origin/master`. v4 is **unreleased** — no v4 tag exists in this
repo at all (checked the full tag list, not just the recent ones). In flight on `origin/release/4.0.0`
and a newer `origin/release/4.0.1-beta.1`.

**Quirks:**
- The public API is defined in `jscore`, not this repo — same caveat as `react-native`. The
  checked-out `release/4.0.0` branch pins `@adapty/core@4.0.0-beta.1`; check `jscore`'s current state
  before writing docs against that pin, since v4 hasn't shipped here yet and the pin may move again.
- No Kids Mode mechanism — confirmed by grepping this repo and `jscore`'s `src/` tree for
  `kidsMode`/`KidsMode`/`kids_mode`: zero hits in either.
- SPM-only iOS packaging — confirmed directly: `Package.swift` present under the repo root, no
  `Podfile` or `.podspec` anywhere in `ios/`.
