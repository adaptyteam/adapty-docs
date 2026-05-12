---
name: update-whats-new
description: Use when adding a new monthly section to src/content/docs/release-notes/whats-new.mdx — gathers commits to main over a date range, identifies user-facing updates worth featuring, confirms scope with the user, then drafts the section in the existing style.
---

# Update what's new

## Overview

Add a new monthly section to `src/content/docs/release-notes/whats-new.mdx` based on what landed on `main` during a user-specified period. The skill scopes the period, scans commits, classifies them into "include / question / skip", confirms with the user, drafts the section in the established style, and inserts it in the right chronological place.

The page advertises **user-visible updates** — new features, new SDK releases, new integrations, new tools, new platforms, new languages, major site improvements. It is not a changelog of every doc edit.

## When to use

- User says: "update what's new", "draft what's new for [month]", "add a what's new entry", "monthly what's new", or equivalent.
- Filling in a missing month, even if not the most recent one.

## When NOT to use

- The user wants to edit an existing entry → use the `editor` skill instead.
- The user wants a per-PR or per-commit changelog → not this skill.

## Workflow

### 1. Determine the date range

If the user specified a month/year (or any explicit range), use it. Convert to absolute ISO dates.

If not specified, ask both questions in one prompt using AskUserQuestion:
- **Month**: January … December
- **Year**: current year and previous year as options, plus "Other" for free-form

Default unit is a single calendar month — sections in the file are titled `## {Month} {Year}`. Only deviate if the user explicitly asks for a different range.

Convert the answer to `--since=YYYY-MM-01` and `--until=YYYY-MM-01` of the next month (exclusive). Example for March 2026: `--since=2026-03-01 --until=2026-04-01`.

### 2. Read current content to anchor on style

Read `src/content/docs/release-notes/whats-new.mdx` end to end. Note:
- The exact bullet format (see "Style rules" below).
- Which months already exist and their ordering (newest-first).
- Which kinds of items appear — so you can match scope.

If a section for the target month already exists, stop and ask the user whether to append, replace, or rename to a different month.

### 3. Pull commits to main

Run from the repo root:

```bash
git log --since=<start> --until=<end> --pretty=format:"%h|%s" --name-only main
```

This gives commit hash, subject, and changed files for each commit. Keep the full list in working memory — you'll need files-changed to classify.

If the range is wide and the list is long (>~80 commits), batch the analysis but classify every commit.

### 4. Classify each commit

Apply the classifier below. Inspect both subject and changed files — subjects can be misleading.

#### Definitely include (highly likely to be a bullet)

A commit that adds or substantially documents a **user-visible** thing:

- **New feature article(s)** under `src/content/docs/**/*.mdx` introducing something users can now do (e.g., a new dashboard feature, a new analytics chart, a new integration). Look for added `.mdx` files (`A` in `git diff --name-status`) or large additions to existing ones.
- **New SDK migration guide** (filename pattern `migration-to-*`).
- **New integration guide** (filename patterns `ua-*`, `*-integration*`, payment provider guides, attribution guides).
- **New tool, CLI, or AI-assistant guide** (`developer-cli`, `adapty-cursor*`, etc.).
- **New language / locale** for the docs site (entire new directory under `src/locales/<locale>/`).
- **Major doc-site capability** the reader will notice (dark mode, full-text search, redesigned navigation). Small UI polish does NOT count.
- **New platform support** documented (e.g., Capacitor SDK going GA).

#### Worth questioning (present, but ask the user)

Things that are genuinely user-facing but might not clear the bar for this page:

- A new section added to an existing article (e.g., "Revenue override settings for TikTok") — could be a bullet on its own, could be folded into a broader entry, could be skipped.
- A documentation restructure or rewrite of an existing topic.
- A clarification of an SDK behavior that users were confused about.
- New screenshots or examples for an existing article.
- Anything where the commit message says "improve", "update", or "clarify" without naming a new capability.

State the trade-off when presenting these — why it might or might not deserve a bullet.

#### Skip (don't show to the user unless asked)

These are noise. Don't bring them up:

- `chore: update translations` and any commit touching only `src/locales/**` or `.hashes/**`. Localization is auto-translated on push to main.
- Translation script / pipeline changes (`scripts/translate*`, `scripts/generate-*`).
- Lockfile, dependency, or build-config changes (`package*.json`, `yarn.lock`, `astro.config*`, `tsconfig*`, `tailwind.config*`).
- Component / styling changes that don't touch `src/content/docs/**` (`src/components/**`, `src/styles/**`, `src/css/**`).
- Linter, CI, formatting, or tooling commits.
- `minor CLAUDE.md update`, repo-internal docs (`README*`, `TECH_WRITERS_README*`, `.claude/**`).
- Merge commits (`Merge remote-tracking branch …`, `Merge pull request …`) — analyze the commits they reference instead.
- Typo fixes, broken-link fixes, image swaps with no new feature attached.
- The "What's new — {month}" commit itself (don't recursively cite the very entry you replaced).

#### Tie-breakers

- A bullet on this page must answer: "What new thing can a developer do, see, or build?" If you can't answer that in one sentence, it goes in **question** or **skip**.
- Group commits about the same feature into one bullet. Example: three commits adding FunnelFox + Google Ads + revenue-override across `ua-*.mdx` collapse into one or two bullets.
- The same feature shipped across multiple SDKs goes in one bullet with `[iOS](slug) | [Android](slug) | …`-style links.

### 5. Present findings for confirmation

Output three lists in this order. For each item, give: a candidate bullet title, a one-line rationale, and the commit hash(es) it came from. Don't draft full bullets yet.

```
**Recommended (X items)**
- {Title} — {rationale}. Commits: {hash1}, {hash2}
- ...

**Worth questioning (Y items)**
- {Title} — {why this is borderline}. Commits: {hash}
- ...

**Skipping (brief summary)**
N translation chore commits, N build/config commits, N component-only commits.
```

Then ask the user, in plain prose: "Shall I include all recommended? Any of the questioned to add or drop?"

Do not draft the section until the user has confirmed the final list. If the user names something not in the lists, double-check the commits — you may have classified it wrong.

### 6. Draft the section in the established style

Once the list is confirmed, **invoke the `editor` skill** to draft the bullets. Pass:
- The confirmed list of items with commit hashes and the underlying article slugs.
- The style rules (below).
- The final placement instructions (Section 7).

Editor's review mode applies: it should write each bullet against the same STE / clarity bar the rest of the docs use, then check the result.

#### Style rules (from existing entries)

- Section heading: `## {Month} {Year}` — full month name, four-digit year, no punctuation.
- Each bullet: `- **{Feature name}**: {1–2 sentences explaining what it is and why a developer cares}. [Learn more]({slug})`
- Multi-platform feature: `[iOS]({ios-slug}) | [Android]({android-slug}) | [React Native]({rn-slug}) | [Flutter]({flutter-slug}) | [Unity]({unity-slug}) | [Kotlin Multiplatform]({kmp-slug}) | [Capacitor]({cap-slug})` — pipe-separated, no "Learn more" wrapper.
- Anchored link: `[Learn more]({slug}#anchor)`.
- Slugs are filename-based, no `.md`/`.mdx` extension, no folder path. To resolve: take the source `.mdx` filename, drop the extension. Example: `src/content/docs/version-3.0/ua-funnelfox.mdx` → `ua-funnelfox`. If the article defines a `customSlug` in its frontmatter, use that.
- Plain English. No jargon for jargon's sake. Lead with the user-facing capability, not the implementation.
- No images, no code blocks, no `:::callouts`, no nested bullets — single flat list under the heading.
- One blank line between bullets. One blank line between the heading and the first bullet.

### 7. Insert in the correct chronological place

Months run **newest first**. Find the right spot:

- If the new month is more recent than every existing section → insert directly after the intro callout (the `:::note … :::` block), before the first existing `##` heading.
- Otherwise → insert above the first section that's older than the new one.

Use the `Edit` tool. Verify with `Read` after the edit that:
- The new heading appears exactly once.
- The chronological order is preserved.
- No existing section was modified.

### 8. Report

Tell the user, in 2–3 sentences:
- Which month was added.
- How many bullets were included.
- A reminder that `src/locales/**` will be auto-translated on the next push to `main` (no manual edit needed).

## Quick reference

| Step | Tool | What you produce |
|------|------|------------------|
| Scope range | AskUserQuestion (if not given) | `--since`/`--until` ISO dates |
| Read current file | Read | Style anchor + chronological order |
| List commits | Bash (`git log`) | Hash + subject + files for each commit |
| Classify | — | 3 lists: recommended / question / skip |
| Confirm scope | Plain prose | User-approved bullet list |
| Draft section | Skill (`editor`) | Bulleted MDX following Style rules |
| Insert | Edit | Updated `whats-new.mdx` |
| Verify | Read | Heading present once, order preserved |

## Common mistakes

- **Quoting commit subjects verbatim as bullet titles.** Subjects are written for engineers; bullet titles are written for developers reading docs. Rewrite from the user's perspective.
- **Citing translation churn.** `chore: update translations` and `src/locales/**` edits are never user-facing — those locales are auto-generated. Skip silently.
- **Citing the "What's new — {month}" commit itself.** Don't recursively include the entry that wrote the previous month.
- **One bullet per commit.** A single feature often spans many commits and many platforms. Collapse them.
- **Drafting before user confirms.** Section 5 is a hard gate. Don't write bullet copy until the user has signed off on the list.
- **Wrong slug.** A bullet's link must resolve. The slug is the filename, not the folder path. Verify before committing the draft to disk.
- **Inserting in the wrong place.** Newest-first ordering is non-obvious from the file alone — read all existing month headings first, then place.
- **Editing `src/locales/**/whats-new.mdx`.** Never. Translations regenerate on push to `main`.
- **Including UI / styling commits.** Component or CSS changes aren't features unless the reader notices a new capability (e.g., dark mode toggle).
- **Skipping the editor skill.** The user asked for editor to draft so STE rules are applied — don't shortcut that.

## Red flags — STOP and ask

- The target month already has a section in the file.
- The git range produces zero commits (date typo, branch typo, or repo not up to date — run `git fetch origin main` and try again).
- A "Worth questioning" item turns out to map to a doc-only change with no user-facing feature behind it — drop it from the candidate list before presenting.
- Commit history shows a feature shipped but the corresponding `.mdx` article isn't there yet — flag it; the entry can't link to a missing page.
