---
name: "seo"
description: Use when improving the search visibility of docs articles, auditing a set of articles for SEO, or reviewing frontmatter title/description/metadataTitle quality — including duplicate titles across SDK platforms, SERP truncation, cannibalizing pages, and thin hub pages.
---

# SEO - Search Visibility for Adapty Docs

Improve how docs articles are found, without changing what they say.

**Core principle: an SEO pass edits metadata and structure. It does not add claims, rename URLs, or rewrite the product's vocabulary.** Every SEO change must also pass the `editor` skill. When the two conflict, `editor` wins — a page that ranks and then misinforms is worse than one that ranks lower.

## What is actually a lever

Technical SEO is already handled sitewide in `src/layouts/DocsLayout.astro` — canonical URLs with the trailing-slash rule, reciprocal hreflang, `TechArticle` JSON-LD, og tags, `noindex`, per-locale sitemaps. **Do not touch it, and do not propose schema, `og:image`, or llms.txt work as part of an article SEO pass.** Google's own AI-search guidance says machine-readable files, content chunking, AI-specific rewrites, and special schema are unnecessary.

| Field | Renders as | SEO lever? |
|---|---|---|
| `metadataTitle` | `<title>` (falls back to `title`) | **Yes — the primary lever** |
| `description` | `<meta name="description">`, `og:description`, JSON-LD description, **doc-card subtitle, site-search snippet** | **Yes** |
| `title` | H1, breadcrumb, JSON-LD headline | No — see Hard rules |
| `keywords` | `<meta name="keywords">` | **No — Google ignores it. Never touch** |
| filename | URL slug | **No — never rename** |
| `rank` | inert `<meta name="rank">` | No |
| `customSlug` | URL override, not a redirect | No |
| body headings | ToC, `#anchors`, SERP jump-links | Yes, within limits |

## Hard rules

These are the rules agents break. Each one was observed in baseline testing.

### Never touch `keywords`

Not to expand it. Not to fix its casing. Not to remove a bad token. Not to "repair" it. `keywords` feeds Algolia doc search, and CLAUDE.md forbids changing it unless the user explicitly asks. Report the problem as a finding and move on.

**No exceptions:** "it's a repair, not an expansion", "the casing is wrong for this platform's API", "`'cross'` is obviously a truncated fragment", "I'm keeping the count the same" — all of these are the same violation. Leave the field byte-identical.

### Never change `title` to chase a query

`title` is the H1, the breadcrumb, the JSON-LD headline, and the doc-card label. Editing it invalidates all 7 locale translations, and it is the field most likely to carry a deliberate product name.

It does **not** break navigation — the sidebar `label` in `src/data/sidebars/` is an independent string (usually a shorter, generic form like `"Restore purchases"`). Don't argue the rule from navigation damage; argue it from the fact that `metadataTitle` is the lever that costs nothing.

`metadataTitle` exists precisely so the `<title>` tag can carry search phrasing while the H1 keeps product vocabulary. **Use it. Leave the H1 alone.**

Change `title` only when it is *factually wrong* — it claims scope the article doesn't cover, or it contains a grammatical error like `"Restore purchases in mobile app in Unity SDK"`. That is an `editor` fix that happens to live in an SEO pass, so flag it as such. Never restructure an H1 for keywords, and never "improve" a product or UI feature name: per `editor` §6, feature names outrank grammatical consistency. `"A/B test"` may be the product's name for the thing.

### Never rename a file, and never add `customSlug` for keywords

There is no redirect layer. `astro.config.mjs` has exactly one 301 (the `/docs` homepage trailing slash) and no redirect map. A rename produces a hard 404 at the old URL, breaks the sidebar `id`, breaks every `.md` cross-link, and desynchronizes the hreflang cluster across 7 locales. `customSlug` overrides the URL — it does not redirect the old one.

Slug keywords are a negligible signal next to the title tag. The trade is never worth it. Say so and move on.

### Never add a factual claim

An SEO pass has no new information in it. Do not write store-policy statements ("Apple requires a restore button", "both stores expect…"), do not assert cross-platform behavior ("one call covers both targets"), do not invent capabilities. If the page has a real content gap, name it as a follow-up for `doc-author` or the feature owner — don't fill it from inference.

### Stay inside the scope of an SEO pass

Things that are *not* SEO and must not ride along in the diff: removing unused imports, fixing stray Unicode characters, adding or changing `rank`, migrating Paywall→Flow terminology, removing no-op `displayed_sidebar`, adding `og:image`. Note them separately — use `spawn_task` for anything substantial. An SEO pass that also does five other things is unreviewable.

## `metadataTitle`

**Two house patterns, split by page type.** Both are Title Case and both end `| Adapty Docs`. Do not invent a third.

| Page type | Pattern | Example |
|---|---|---|
| Leaf article on a platform | `Topic in {Platform} \| Adapty Docs` | `Troubleshoot Purchases in Unity \| Adapty Docs` |
| Hub / category page | `Topic \| {Platform} SDK \| Adapty Docs` | `Best Practices \| Unity SDK \| Adapty Docs` |
| Not platform-specific | `Topic \| Adapty Docs` | `A/B Tests \| Adapty Docs` |

Rules:
- **≤60 characters including the suffix.** Past that, Google truncates.
- If it doesn't fit, **shorten the topic** — never drop the platform name or "SDK" to buy characters. An inconsistent title is worse than a slightly long one. If the platform genuinely cannot fit, keep the platform and accept the truncation.
- **Front-load the searched term inside the topic segment.** `Restoring Purchases in Adapty` → `Restore Purchases in Unity`: the wasted words are "in Adapty", not the position of the pattern. The `| Adapty Docs` suffix already brands the page, so "in Adapty" is always removable.
- **Consistency across a set outranks front-loading.** A hub whose topic is genuinely generic (`Best Practices | Unity SDK`) is correct as-is — every platform hub uses that shape, and breaking one page out of a consistent set costs more than the word order gains. Don't "fix" it.
- **It may differ from the H1 — but keep it recognizably aligned.** Carrying search phrasing the H1 can't is the whole reason the field exists. Still, Google rewrites most title tags and prefers the H1 when the two diverge, so a title tag that reads as a different claim than the H1 is likely to be replaced by the H1 anyway. Same topic, better phrasing — not a different topic.

## `description`

Target **120–160 characters**. Under ~120 the field is usually restating the title; over 160 Google truncates.

**Shape:** `{What the reader does or gets}, {the concrete situation or the exact API symbol}.`

✅ `Restore purchases in your Unity app with Adapty.RestorePurchases so users regain subscriptions after a reinstall or a device switch.`
❌ `Learn how to restore purchases in Adapty to ensure seamless user experience.`

Requirements:
- **It is also the doc-card subtitle and the site-search snippet.** It must read as one clean sentence, not a keyword string. Readability beats hitting 160.
- **True of the whole page.** A description promising error handling on a page that doesn't cover it costs clicks and is an `editor` §8 scope mismatch.
- **Not ad copy.** No "Learn how to…" opener, no CTR bait, no promises like "in minutes". The banned vocabulary in `editor` §3 applies here verbatim — 21 descriptions currently say "seamless".
- **Include the exact API symbol** where one exists, in that platform's casing (`RestorePurchases` for C#, `restorePurchases` for Kotlin). Developers paste identifiers into search.
- **Name the platform in every sibling.** Beyond that, a templated description is acceptable — differing only by the platform token costs nothing at Google. Rewriting each sibling for variety's sake is optional polish, and it must never introduce a platform-specific claim you can't verify on that page.

## Duplicates across platforms — what is and isn't a problem

**Duplication is not itself a ranking problem, and there is no duplicate-content, duplicate-title, or duplicate-description penalty.** Google has said so repeatedly. Do not treat "make these 29 values unique" as the goal, and do not sell uniqueness to the user as a ranking win. Uniqueness is a *diagnostic*, not an objective.

117 pages share 29 `metadataTitle` values and 78 share 22 descriptions. What that actually costs, strongest reason first:

1. **A missing disambiguating term.** `"Restoring Purchases in Adapty"` never says "Unity", and 59 platform pages never say their platform in the body either. For the query *unity restore purchases*, the page has a weak relevance signal. **This is the real defect — duplication is just how you notice it.** The check that matters is `title-tag-no-platform`, not the duplicate group.
2. **You forfeit control of the title.** Google rewrites roughly three-quarters of title tags, and leans on the H1 when it judges the `<title>` unhelpful. A vague, sibling-identical title is prime rewrite material. Because the H1s here *are* platform-qualified, Google may already be disambiguating these pages for us — so the gain from fixing the title tag is partly about choosing the wording ourselves rather than about rescuing a broken page.
3. **On-site surfaces, which we fully control.** `description` is the doc-card subtitle and the Algolia snippet. Seven identical card subtitles is a plain product defect, no search engine involved. For `description` this is the *best* reason to act — Google frequently discards meta descriptions and writes its own snippet anyway.
4. **SERP filtering and CTR.** When two results are near-identical, one can be filtered out of a given result set, and identical rows read as boilerplate. Real but modest — and filtering is driven by **page similarity, not by the metadata string**.

Which means:

- **Near-identical bodies are the thing that can actually cause filtering.** The restore pages share a byte-identical opening paragraph across platforms. That is a content problem for `doc-author`, not something a metadata pass fixes. Say so instead of implying the title fix solved it.
- **Differentiate. Do not canonicalize, `noindex`, or merge.** The seven platform intents are real and each should own its own query.
- **Fix the whole cluster in one pass** — but because the goal is "every page names its platform," not "no two strings match." The script prints every member of each group.
- **A templated description that is accurate is acceptable.** Seven descriptions differing only by the platform token are fine for Google. Vary the wording for human quality if you like, but do not claim a ranking benefit, and never invent a platform-specific angle just to break the pattern.
- **Duplicate `title` (H1) within one platform is the closest thing to a genuine issue** — e.g. `unity-check-subscription-status` and `unity-listen-subscription-changes` share an H1. Even there the cost is reader confusion and split internal links, not a penalty. It is a content-architecture question: report it, don't resolve it by editing metadata.

**Calibration:** if the user asks whether duplicates hurt rankings, the honest answer is "not directly." Lead with the missing platform term and the on-site surfaces.

## Findability from abstract terms

The docs are written in Adapty's vocabulary; readers search in their own. Someone whose user reinstalled the app and lost premium does not search *restore purchases* — they search *user lost subscription after reinstall*, or they paste an error string. Product nouns like "access level", "placement", and "flow" are terms a reader learns **from** the docs, so they can't be the only way in.

**The rule: the page should contain the reader's phrasing of the problem it already solves — once, in the intro.** That is a vocabulary bridge, not a keyword.

What this licenses:
- Naming the **symptom or trigger** in the opening sentence when the page's job is to fix it: "after a reinstall or a device switch", "when products come back empty", "if the user is offline".
- Including the **error code or message** the reader would paste into a search box, when the page addresses it (`#2002`, `notActivated`, `cantMakePayments`).
- Saying the platform and the API symbol in prose (see below).

What it does not license:
- **Synonym lists, term variants, or "also known as" padding.** Google resolves synonyms; `editor` forbids the padding.
- **Any new claim.** The problem statement must describe what the page already documents. If the page doesn't actually cover the symptom, the gap is a `doc-author` job — do not paper over it with a sentence in the intro.
- **Repetition.** Once. A second mention adds nothing and reads as filler.

On-site search is a separate matter: abstract queries inside the docs are served by Algolia, whose lever is the `keywords` field — which you may **not** edit. When a page is clearly missing its symptom vocabulary for on-site search, surface it as a recommendation for the user to approve, and let them decide. Never edit `keywords` yourself.

## Cross-linking related concepts

Related means **a concept named in the prose that has its own article** — regardless of which sidebar it lives in. `android-sdk-models` says "grace period" twice and never links [grace-period]; that reader has to go searching.

**There is deliberately no script check for this.** An earlier version matched sidebar labels by document frequency and was removed: on the Firebase page half its suggestions pointed at *Firebase's* Predictions and A/B Testing rather than Adapty's same-named articles, and no frequency statistic can tell those apart. Deciding whether a term deserves a link requires knowing what the term refers to. **Do not rebuild it as a check.**

Work it by reading:

1. **Read the article and list the Adapty-specific nouns it names** — the terms a reader would need explained to follow the page. Ignore ordinary vocabulary; you are looking for named concepts, not keywords.
2. **Confirm the concept has its own article.** Look it up in `src/data/sidebars/*.json`, which is the source of truth for article discovery per CLAUDE.md — do not grep the docs tree.
3. **Establish whose feature it is.** See below.
4. **Check it isn't already linked** anywhere on the page. If it is, you are done — one link per concept is enough.
5. **Judge whether this mention earns a link.** A term in a sentence explaining behavior is a strong case. The same term in a field-reference table row, or in a passing aside, usually is not. A page dense with links is harder to read, and `editor` prioritizes clarity.
6. **Link the first meaningful mention only**, and aim for a handful of good links rather than exhaustive coverage.

**On third-party integration pages, check whose feature the term names.** Firebase has Predictions, A/B Testing, and Remote Config; so does Adapty.

- **Do not** wrap the vendor's feature name in a link to the Adapty article — `[Predictions](ua-predicted-metrics)` inside a list of Firebase features tells the reader that Firebase Predictions is documented on Adapty's page. That is the error.
- **Do** consider a disambiguating cross-reference, which is genuinely useful — a reader meeting two same-named features needs to know they are different things. `firebase-and-google-analytics.mdx` is the model: *"(Not to be confused with [Adapty Remote Config](customize-paywall-with-remote-config), which configures flow/paywall content.)"* and *"(For paywall variants, use [Adapty A/B Tests](ab-tests).)"*
- Note the boundary: wrapping a term already in the prose is in scope for an SEO pass; **adding a parenthetical is new prose**, so propose it as a finding rather than applying it silently.
- **Do not rewrite anchor text.** Bare "here" links are an accepted convention in this repo and are never a finding.
- **Adding a link is in scope. Adding a sentence to hold a link is not.** If the concept isn't already mentioned, that's a content decision, not an SEO one.
- **Do not add a "Next steps" section** as part of an SEO pass. Linking a term already in the prose is different from designing a page's onward navigation.

## API symbols in prose

If a page documents a method, the symbol should appear **once in the surrounding prose**, in that platform's casing — not only inside the code fence. Developers paste identifiers into search, and a fenced-only mention is invisible to a reader scanning the page.

✅ "call the `RestorePurchases` method when the user taps your restore button"
❌ prose that says "call the method below" with `Adapty.RestorePurchases` only in the fence

Reported as `symbol-not-in-prose`. Two constraints: use the casing that platform actually uses (`RestorePurchases` in C#, `restorePurchases` in Kotlin — verify against the page's own code block, don't copy a sibling's), and once is enough.

## Structure

- **At least one `##`** on any article over ~150 words, for ToC entries, `#anchor` deep links, and SERP jump-links.
- **Promoting an existing bare label** (`Response parameters:` → `## Response parameters`) is free and in scope.
- **Adding a new section is not an SEO change.** Don't invent sections to create anchors or to hold keywords.
- **Never a rhetorical-question heading** — `editor` §1 forbids them. A question heading is acceptable only when it is the reader's literal query and the section answers exactly it.
- **Keep the platform name in the body**, not just in frontmatter. 59 platform pages never say their own platform in the prose.
- **Card-list hubs** should carry one or two sentences of orientation above `<CustomDocCardList />`, framing the problem the children solve. Without it, every word on the URL is generated from elsewhere. This is the one place where writing new prose is in scope — and it must state only what the children already establish.
- **Front-load the answer in the intro.** The opening sentence should define or resolve the page's topic, because it is what gets lifted as a snippet. This agrees with `editor`'s what/why/when requirement — "what it is" comes first. Do not put a cross-product `:::tip` above the intro; per house convention it goes right before the first `##`.

## Workflow

### Step 1 — run the mechanical pass first

```bash
node scripts/seo-audit.mjs --diff
```

Also accepts explicit filenames, `--platform unity`, `--json`, or no argument for the whole tree. It reports lengths, duplicate groups, missing fields, banned vocabulary, missing headings, thin bodies, and absent platform names. **Do not re-derive these by hand** — three baseline agents spent 275k tokens rediscovering what the script prints in 0.1s.

Read the output before opening any article. It tells you which cluster a page belongs to, which is usually the real finding.

**Known limitation: folder ≠ platform.** The script infers platform from the filename prefix and directory, so unprefixed files in `version-3.0/` are read as platform-neutral — `restore-purchase.mdx` is really the **iOS** page, and it will not be flagged for a missing platform token even though it is the 7th member of its cluster. When a duplicate group spans platforms, confirm each member's real platform in `src/data/sidebars/*.json` before proposing values.

### Step 2 — add the judgment the script can't

Per article in scope, decide: does the `metadataTitle` match the right house pattern and front-load the query? Does the `description` say something specific and true? Is a duplicate group a differentiation job or a cannibalization report? Is a thin page a hub (fine) or a neglected article (a content problem, not an SEO one)?

Infer target intent from the article itself — its topic, platform, error codes, and API symbols. State that it is an inference. There is no query data wired into this skill; if the user supplies a Search Console export, prioritize by impressions instead.

### Step 3 — report, then apply interactively

Mirror the `editor` skill's review flow:

1. Number every finding sequentially across all severities.
2. Present the whole picture first — one line each: `**N.** slug: current → proposed`.
3. Group cluster fixes as a single numbered item covering all members, showing the per-platform values.
4. Ask whether to go through them interactively.
5. If yes, use `AskUserQuestion` in batches of 4. Header `#N Topic`; body `#N — slug: [current] → [proposed]`; options **Accept** / **Skip**.
6. Apply only accepted changes, after all answers are collected.

### Step 4 — verify

```bash
node scripts/seo-audit.mjs --diff
```

Then `node scripts/check-mdx-parse.mjs` and `node scripts/lint-mdx.mjs` if any body text changed. Do not run `npm run build` — it exhausts memory.

Note in the summary that changed English frontmatter will be re-translated across 7 locales on the next push to `main`.

## Rationalizations

| Excuse | Reality |
|---|---|
| "Fixing the `keywords` casing is a repair, not an expansion" | Still a `keywords` edit. CLAUDE.md forbids it. Report it. |
| "`'cross'` is clearly a truncated fragment" | Probably true. Still not yours to fix. Report it. |
| "The H1 is awkward, so rewriting it is an improvement" | `metadataTitle` is the lever. Awkward ≠ factually wrong. |
| "'A/B test' matches no search query" | It may be the product's name. `editor` §6: feature names win. |
| "Pluralizing the slug matches how people search" | No redirect layer. A 404 costs more than the phrasing gains. |
| "I flagged the claim for a reviewer, so proposing it is fine" | An SEO pass adds no claims. Flagging doesn't license inventing. |
| "Removing the unused imports is a free LCP win" | Out of scope. `spawn_task` it. |
| "Dropping 'SDK' keeps the title under 60" | Consistency beats the character count. Shorten the topic. |
| "Adding a section captures long-tail intent" | That's content work. Hand it to `doc-author`. |
| "I'll fix the Unity page now and the siblings later" | Partial cluster fixes hand traffic to the unfixed siblings. |
| "A 158-char description maximizes the SERP" | It's also a doc-card subtitle. Readability wins. |
| "Chunking / llms.txt / FAQ schema would help AI search" | Google says explicitly they are unnecessary. |
| "These 7 duplicate titles are hurting our rankings" | There is no duplicate-title or duplicate-description penalty. Argue from the missing platform term and the doc-card surface, or don't argue. |
| "Making the descriptions unique will improve rankings" | It won't, directly. Uniqueness is a diagnostic. Promise only what you can defend. |
| "The near-identical bodies are fixed now that titles differ" | Metadata never fixed the bodies. That's a `doc-author` problem — say so. |
| "Adding synonyms helps people searching abstract terms" | Google resolves synonyms. Name the symptom once; don't build a term list. |
| "I'll add a sentence so I can link this concept" | Link terms already in the prose. Adding prose to host a link is content work. |
| "I'll script the cross-link check so it's repeatable" | It was scripted and removed — statistics can't tell whose feature a term names. Read the page. |
| "This integration page mentions Predictions, so link our Predictions article" | Check whose feature it is first. On a Firebase page it's Firebase's. Disambiguate; don't relabel. |
| "Linking every concept mention maximizes internal links" | Link count isn't the goal. A handful of good links beats fifteen mechanical ones. |
| "Shorter articles rank better" | Readability isn't a ranking factor, and fragmentation can leave a query unanswered. `editor` owns sentence length. |

## Red flags — stop

- You are editing `keywords`.
- You are editing `title` for a reason other than a factual error.
- You are renaming a file or adding `customSlug`.
- Your diff contains a sentence stating something you learned by inference.
- Your diff touches imports, `rank`, `displayed_sidebar`, or terminology.
- You wrote a heading ending in `?`.
- You fixed one member of a duplicate group.
- Your description opens with "Learn how to".

**All of these mean: revert that part and report it as a finding instead.**

## Common mistakes

- **Running the script and then re-checking everything manually.** Trust it for the mechanical layer; spend your effort on wording.
- **Treating a card-list hub as thin content.** It's thin by design; it needs an intro sentence, not an article.
- **Auditing one file when the finding is a cluster.** Always look at the duplicate group.
- **Writing two sibling descriptions that differ by one word.** That is still duplication.
- **Proposing a `<title>` pattern the repo doesn't use.** There are two. Pick the one that matches the page type.
