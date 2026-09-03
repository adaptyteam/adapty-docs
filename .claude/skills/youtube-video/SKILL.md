---
name: youtube-video
description: Use when the user gives one or more YouTube links to publish in the docs — any link shape, embed/watch/share/Shorts. Finds the article each video belongs in, inserts a <YouTube> embed at the right spot, and opens a PR.
---

# Publish a YouTube video into the docs

## Overview

The user drops a YouTube link. This skill decides **which article the video belongs in**, puts a `<YouTube>` embed in the **right place inside that article**, and opens a PR.

Usually one article. Occasionally two or three — a video about a concept that genuinely spans them. Never "everything the description links to."

## Input

Any YouTube link shape, or a bare video ID:

```
https://www.youtube.com/embed/uicKwOak-Zo?si=9c_a5eHprETb1L_O
https://www.youtube.com/watch?v=uicKwOak-Zo
https://youtu.be/uicKwOak-Zo?si=9c_a5eHprETb1L_O
uicKwOak-Zo
```

Several at once is fine — run the workflow per video, then batch the result into one PR.

If the user gives no link, ask for one in plain prose. Don't open an `AskUserQuestion` form; they want to paste a URL, not pick from options.

## Step 1 — Fetch the metadata

```bash
node .claude/skills/youtube-video/yt-meta.mjs <url-or-id>
```

Returns JSON: `id`, `title`, `channel`, `watchUrl`, `description`, `docsLinks`, `warnings`.

**Do not use WebFetch for this.** YouTube serves it a navigation-only shell with no title and no description; it returns a confident-sounding "the page doesn't contain that information."

**If `warnings` is non-empty, stop and read it.** The usual case is that YouTube changed its watch-page markup and the description could not be read. The title alone is not enough to place a video — ask the user to paste the description rather than proceeding on a guess.

## Step 2 — Treat `docsLinks` as candidates, not as the answer

Video descriptions carry a `Docs:` block of **related reading**. It is not a placement instruction. "Interaction basics" lists five articles and belongs in one of them.

So: use `docsLinks` to seed the candidate set, then decide properly. Also consider articles the description does *not* link — a description can simply be missing the right one.

## Step 3 — Find the owning article

**Use the `context-mill` skill in lookup mode.** Per CLAUDE.md, do not `grep`, `find`, or `glob` the docs to find the right article, and do not read sidebar JSON to find it either. Zone briefs carry what search can't: which article **owns** a topic and where the boundary against a neighbouring zone falls.

The question to answer is ownership, not relevance:

> If a reader had exactly one question this video answers, which article would they land on?

Signals that an article is the owner:

- Its scope **is** the video's subject, not a neighbour that mentions it.
- Its headings match what the video walks through.
- It's where the concept is *defined*, not where it's *referenced*.

Signals it is not:

- It links to the real owner for this concept.
- It already carries its own video on its own subject — a second, unrelated video buries both.
- It's a platform-specific SDK page and the video is builder/dashboard work (or the reverse).

Resolve a candidate slug to a file by filename — URLs derive from filename alone, not folder path, so `onboarding-actions` is `src/content/docs/**/onboarding-actions.mdx` wherever it sits. Watch for `customSlug` frontmatter overriding the URL.

## Step 4 — Check what's already there

Before proposing anything:

- **Is this video already in the article?** Grep the target file for the video ID. If present, report it and change nothing — re-running is not supposed to duplicate.
- **What videos does the article already carry?** More than two embeds in one article is a signal to reconsider, not a reason to stop.
- **Is the video already elsewhere in the docs?** The same video legitimately appears in two articles (`8Cby6lVGI0o` is in both `adapty-flow-builder` and `migrate-to-flows`). Worth knowing, not disqualifying.

## Step 5 — Decide placement inside the article

Read off the existing embeds:

| Video scope | Goes |
|---|---|
| The article's whole subject | Top of the article — after the intro paragraph, before the first `##` |
| One section's subject | Directly under that `##`/`###` heading, after the section's first paragraph |

Never above the intro paragraph: articles open with prose, not media, and the intro has no heading of its own.

Leave one blank line either side. Match the surrounding indentation — inside a `<TabItem>`, the embed indents with its siblings.

## Step 6 — Propose, then stop

Print the proposal and **wait for confirmation before editing anything**:

```
Video:      "Interaction basics" (uicKwOak-Zo)
Docs links in description: 5

Proposed:   src/content/docs/version-3.0/onboarding-actions.mdx
            under "## Trigger types", after the intro sentence
Because:    <one line on why this article owns the topic>

Rejected:   onboarding-element-visibility — already carries 3w3YSOmI3tQ on its own subject
            onboarding-variables         — video covers variables only in passing
            ...
```

Name the rejected candidates with reasons. A silent choice among five is unreviewable.

## Step 7 — Insert

```mdx
<YouTube id="uicKwOak-Zo" title="Interaction basics" />
```

Pass `title` — it's the iframe's accessible name, and "YouTube video player" tells a screen-reader user nothing. Write the bare video ID, never the full URL: the component accepts URLs so a hand-paste can't break, but the committed repo stays uniform.

**Edit only the English source** in `src/content/docs/`. Never touch `src/locales/` — those are regenerated by the translation workflow on push to main.

**Don't add `keywords`** to the article's frontmatter, and don't touch any other frontmatter.

## Step 8 — Verify

```bash
node scripts/check-mdx-parse.mjs && node scripts/lint-mdx.mjs
```

Both must pass. Do **not** run `npm run build` — it exhausts memory on this repo.

## Step 9 — Open the PR

```bash
git checkout -b docs/<short-video-slug> --no-track
```

`--no-track` matters: a tracking branch has previously caused a push to land on main.

Commit, push, `gh pr create`. In the PR body say which article, why that one, and what was rejected — the same content as the Step 6 proposal, which is the part a reviewer needs.

No Jira, Slack, other PR, or source-repo links in the PR body. No `Co-Authored-By` trailer.

## Edge cases

**Video belongs in more than one article.** Legitimate when both articles genuinely own part of the subject. Propose all of them in one proposal with a reason each; don't split into separate PRs.

**No good home.** Say so, and say what would need to exist. Do not park the video in the nearest loosely-related article — an embed in the wrong place is worse than none, because it looks deliberate.

**Description links no docs at all.** Fine. Fall back to `context-mill` on the title and description text.

**Video supersedes one already in the article.** Ask. Replacing is a content decision, not a mechanical one.
