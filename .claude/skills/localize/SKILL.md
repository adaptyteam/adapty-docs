---
name: localize
description: Use when adding support for a new locale/language to the Adapty docs site. Covers all hardcoded and dynamic locale registration points, translation commands, sitemap setup, Algolia search config, and the step-by-step order to follow.
---

# Adding a New Locale to Adapty Docs

## Overview

Adding a locale touches ~9 files plus new content/sitemap files. Miss any one and the locale will partially break (no search, broken auto-redirect, missing from sitemap, etc.). Follow this checklist in order.

**Active locales:** `zh` (Chinese), `tr` (Turkish), `ru` (Russian). All examples use `{LOCALE}` as placeholder — replace with the actual code (e.g. `ja`, `ko`, `de`).

---

## Step 1 — Register the locale in source code

Edit these files before running any translation:

### 1a. `src/data/locales.ts`

Add the locale code to `SUPPORTED_LOCALES` and `LOCALE_NAMES`:

```ts
export const SUPPORTED_LOCALES = ['zh', 'tr', '{LOCALE}'] as const;
export const LOCALE_NAMES: Record<Locale, string> = {
  zh: '中文',
  tr: 'Türkçe',
  '{LOCALE}': '{NativeName}',   // e.g. ja: '日本語'
};
```

### 1b. `scripts/translate.mjs`

Add to both `LANGUAGE_NAMES` and `METADATA_TITLE_SUFFIXES`:

```js
const LANGUAGE_NAMES = {
  zh: 'Simplified Chinese (zh-CN)',
  tr: 'Turkish (tr-TR)',
  '{LOCALE}': '{Full language name}',  // e.g. ja: 'Japanese (ja-JP)'
};

const METADATA_TITLE_SUFFIXES = {
  zh: '| Adapty 文档',
  tr: '| Adapty Dokümanları',
  '{LOCALE}': '| Adapty {LocaleDocWord}',  // e.g. ja: '| Adapty ドキュメント'
};
```

Then add the new language's **refusal patterns** to `REFUSAL_PATTERNS` (search for the `// Russian (ru)` comment to find the localized block). The auto-translator occasionally injects a refusal / "this is only code, not a full document" meta-message **in the target language** — sometimes mid-output, after translating the leading prose — instead of translating. `looksLikeRefusal()` must recognize it so the existing hardened-retry / English-fallback path kicks in; otherwise the broken reply lands on `main` and fails the production deploy's `check-mdx-parse` gate (this is what happened on 2026-06-16). Scope patterns to refusal-meta phrasing — references to the input/document being incomplete, or a request to "provide the full document" — and **avoid generic words** like "code snippet" that appear in real docs:

```js
  // {LANGUAGE} ({LOCALE})
  /<refusal phrase>/iu,   // e.g. "I don't see the full MDX document"
  /<request-for-full-doc phrase>/iu,
```

To collect real phrasings, translate the known English refusals into the new language: *"I don't see the full MDX document / you sent only a code fragment"*, *"please provide the complete MDX document"*, *"this is just a code block, no translation needed"*. Then add the new locale's refusal strings to the regression test `scripts/__tests__/refusal-detection.test.mjs`, which asserts every active locale's refusal is caught (and that a normal translated body is not).

### 1c. `src/locales/ui-strings.ts`

Add translations for every key in every group. Groups: `feedback`, `header`, `search`, `articleButtons`, `toc`, `mobileSidebar`, `footer`. Pattern:

```ts
question: { en: 'Was this page helpful?', zh: '...', tr: '...', '{LOCALE}': '...' },
```

### 1d. `src/locales/dictionary.json`

Add a `"{LOCALE}"` key to every term entry alongside existing `zh`, `ja`, `tr` keys:

```json
"A/B test": {
  "_note": "...",
  "zh": "A/B 测试",
  "ja": "A/B テスト",
  "tr": "A/B testi",
  "{LOCALE}": "..."
}
```

### 1e. `src/components/Search.astro`

Add to `LOCALE_INDEX` mapping (lines 17-20) and to the data attributes on the `<input>` (lines 47-50):

```ts
const LOCALE_INDEX: Record<string, string | undefined> = {
  zh: import.meta.env.PUBLIC_ALGOLIA_INDEX_NAME_ZH,
  tr: import.meta.env.PUBLIC_ALGOLIA_INDEX_NAME_TR,
  '{LOCALE}': import.meta.env.PUBLIC_ALGOLIA_INDEX_NAME_{LOCALE_UPPER},
};
```

```html
data-index-name-{LOCALE}={import.meta.env.PUBLIC_ALGOLIA_INDEX_NAME_{LOCALE_UPPER} ?? ''}
```

### 1f. `src/components/Homepage.tsx`

The homepage component has its own hardcoded `T` constant (lines 4–80) with strings for `en`, `zh`, and `tr` — **separate from `ui-strings.ts` and not touched by the translate script**. Add a new locale key with all ~20 strings:

```ts
const T = {
  en: { hero: "...", discoverTitle: "...", ... },
  zh: { ... },
  tr: { ... },
  '{LOCALE}': {
    hero: "...",
    discoverTitle: "...",
    discoverDesc: "...",
    discoverCta: "...",
    ecosystemTitle: "...",
    ecosystemDesc: "...",
    ecosystemCta: "...",
    quickstartTitle: "...",
    quickstartDesc: "...",
    quickstartBtn: "...",
    nextTitle: "...",
    abTitle: "...",
    abDesc: "...",
    analyticsTitle: "...",
    analyticsDesc: "...",
    integrationsTitle: "...",
    integrationsDesc: "...",
    paywallTitle: "...",
    paywallDesc: "...",
    platformsTitle: "...",
    ios: "...",
    android: "...",
    reactNative: "...",
    flutter: "...",
    unity: "...",
    kmp: "...",
    capacitor: "...",
  },
} as const;
```

### 1g. `src/components/Header.astro` — auto-handled, just verify

The header is `transition:persist` and its inline `<script>` still reads two client-side objects (`LOCALE_NAMES_CLIENT`, `UI_STRINGS_CLIENT`), **but these are no longer hardcoded.** The frontmatter now injects them as JSON from the canonical sources:

```astro
<script id="cc-locale-names" type="application/json" set:html={JSON.stringify(LOCALE_NAMES)} />
<script id="cc-ui-strings" type="application/json" set:html={JSON.stringify(clientUIStrings)} />
```

`LOCALE_NAMES` comes from `src/data/locales.ts` (1a) and `clientUIStrings` is built from `getUIStrings()` over `['en', ...SUPPORTED_LOCALES]` (1c). So **once 1a and 1c are done, the header picks up the new locale automatically — no edit to Header.astro is required.** Just confirm the locale switcher shows the new language after building. (If a future refactor reintroduces a hardcoded client map, add the locale key there too.)

### 1h. `src/layouts/DocsLayout.astro`

Add auto-redirect logic to the inline script (around lines 87-95):

```js
} else if (lang.startsWith('{LOCALE}')) {
  localStorage.setItem('preferred-locale', '{LOCALE}');
  var newPath = window.location.pathname.replace(/^(\/docs\/)/, '$1{LOCALE}/');
  if (newPath !== window.location.pathname) window.location.replace(newPath);
}
```

### 1i. `src/content.config.ts`

Add the locale to `SUPPORTED_LOCALES` inside the content config. This is what scopes the `locales` collection glob per CI matrix job — omitting this means every locale build loads every locale's MDX, which OOMs the runner as content grows.

```ts
const SUPPORTED_LOCALES = ['zh', 'tr', 'ru', '{LOCALE}'] as const;
```

The glob itself is derived from `BUILD_LOCALES` and doesn't need editing — only the tuple of allowed locales does.

### 1j. `src/components/SkillPromo.astro`

Like `Homepage.tsx` (1f), this component carries its own hardcoded `T` constant — **separate from `ui-strings.ts` and not touched by the translate script**. It detects the locale from the URL and renders the SDK-integration-skill promo (used on every SDK overview, manual integration guide, and `what-is-adapty`). Add a new locale key with all three strings:

```ts
const T: Record<string, { label: string; desc: string; linkText: string }> = {
  en: { label: "...", desc: "...", linkText: "..." },
  zh: { ... },
  tr: { ... },
  ru: { ... },
  es: { ... },
  '{LOCALE}': {
    label: "...",     // short eyebrow, e.g. "Automated integration · Beta"
    desc: "...",      // the one-sentence promo
    linkText: "...",  // CTA, e.g. "Use the skill"
  },
};
```

Locale detection reuses `SUPPORTED_LOCALES` from `src/data/locales.ts` (1a) — once the locale is added there, the component recognizes it automatically; you only add the `T` entry here. A missing entry falls back to English.

### 1k. `src/components/MethodPromo.astro`

Same situation as `SkillPromo` (1j) and `Homepage.tsx` (1f): MethodPromo carries its own hardcoded `T` constant — **separate from `ui-strings.ts` and not touched by the translate script**. It renders the "What `getFlow` retrieves" promo box on the present-paywalls / get-paywalls articles. Crucially, the visible defaults (`items`, `note`, `noteLinkText`, and the `label` template) live in this component, **not** in the MDX — when an article writes `<MethodPromo method="getFlow" />` with no props, those defaults render in **English on every localized page** unless this `T` table has an entry for the locale. (Explicit props like `label="..."` written in MDX *are* translated by the script; the component defaults are not.) Add a new locale key with all four fields:

```ts
const T: Record<string, { label: string; items: Item[]; note: string; noteLinkText: string }> = {
  en: { ... },
  zh: { ... },
  tr: { ... },
  ru: { ... },
  es: { ... },
  '{LOCALE}': {
    label: "{method} で取得される内容",   // MUST contain the literal "{method}" placeholder — it is replaced with the method name and rendered as <code>, then split on that name
    items: [
      { title: "...", desc: "...", beta: true },  // "Flows" item — keep "Flow Builder"/"Paywall Builder" product names in English
      { title: "...", desc: "..." },              // "Paywall Builder paywalls" item
    ],
    note: "...",          // e.g. "Building a custom paywall?"
    noteLinkText: "...",  // e.g. "See the manual integration guide."
  },
};
```

Locale detection reuses `SUPPORTED_LOCALES` (1a), like SkillPromo. Keep the `{method}` placeholder intact — the component does `t.label.replace('{method}', method)` and then splits the result on the method name to wrap it in `<code>`, so the literal method name must survive translation.

### 1l. `src/data/product-map.{LOCALE}.json` (ProductMap component)

The ecosystem overview's product map (`src/components/ProductMap.astro`) reads its data from `src/data/product-map.json` (English) and — unlike the `const T` components above — keeps each locale's strings in a **separate JSON file**, `src/data/product-map.{LOCALE}.json`. The component detects the locale from the URL and loads the matching file automatically, falling back to English when none exists. `translate.mjs` does not touch this data file, so create the localized copy by hand:

1. Copy `src/data/product-map.json` to `src/data/product-map.{LOCALE}.json`.
2. Translate only the display strings: `stageColumnLabel`, each column's `label`, each row's `stage`, and every cell entry's `text` and `tooltip`.
3. Keep every `href`, `isLast`, and the overall structure **identical** — hrefs are shared English slugs.

Until this file exists, the product map renders in English on that locale's pages.

> **General rule:** any component with its own hardcoded `T` locale table — currently `Homepage.tsx` (1f), `SkillPromo.astro` (1j), and `MethodPromo.astro` (1k) — is invisible to `translate.mjs` and must get a new locale key by hand. `ProductMap.astro` (1l) is the same story but keeps its strings in a per-locale JSON data file rather than a `const T`. Before finishing, `grep -rl "const T" src/components` **and** check for `src/data/product-map.*.json` to catch anything added since this skill was written.

---

## Step 2 — Add env vars

In `.env` (and in the deployment environment / Vercel env vars):

```
PUBLIC_ALGOLIA_INDEX_NAME_{LOCALE_UPPER}=adapty_{LOCALE}
```

e.g. for Japanese: `PUBLIC_ALGOLIA_INDEX_NAME_JA=adapty_ja`

---

## Step 3 — Create sitemap files

Copy `src/pages/sitemap-tr.xml.ts` → `src/pages/sitemap-{LOCALE}.xml.ts` and change `tr` → `{LOCALE}`.

Copy `src/pages/sitemap-tr-index.xml.ts` → `src/pages/sitemap-{LOCALE}-index.xml.ts` and change the URLs inside to use `sitemap-{LOCALE}.xml`.

### Update `astro.config.mjs` sitemap filter

In the `sitemap({ filter: ... })` call (around line 90), add the new locale to the exclusion:

```js
filter: (page) => !page.includes('/docs/zh/') && !page.includes('/docs/tr/') && !page.includes('/docs/{LOCALE}/'),
```

---

## Step 4 — Add the `package.json` scripts (optional convenience)

```json
"translate:{LOCALE}": "node scripts/translate.mjs --lang {LOCALE}",
"translate:{LOCALE}:build": "node scripts/translate.mjs --lang {LOCALE} --incremental",
```

---

## Step 5 — Create the locale content directory

```
mkdir -p src/locales/{LOCALE}
```

The translation script creates `.mdx` files and `.hashes/` automatically. You only need to create the directory.

---

## Step 6 — Translate content (phased, gated by native-speaker reviews)

> **Flow overview:** (1) research dictionary terminology → (2) native speaker reviews word-pair list → (3) translate tutorial 7 articles → (4) deploy to develop → (5) native speaker reviews rendered pages → (6) translate the rest → (7) on "we are done", run MDX lint + parse + localized link checks locally and auto-fix.
>
> **Note on `CustomDocCardList`:** This component is already locale-aware — it reads titles from `_sidebar-labels.json` and descriptions from the translated article frontmatter automatically. No extra step is needed; it works correctly once sidebar labels (Step 6f `--sidebars`) and article translations are done.

All `translate.mjs` commands require `ANTHROPIC_API_KEY` to be set.

### Phase 1 — Dictionary research and native-speaker word-list review

#### 6a. Deeply research target-language mobile dev community terminology

Do not guess dictionary entries from training knowledge. **Run web searches** to verify how the target-language mobile dev community actually refers to each concept. This materially affects the quality of every translated article downstream.

**Sources to consult (in priority order):**

1. **Platform-official docs in the target locale** — authoritative terminology developers will expect:
   - App Store Connect help pages (`developer.apple.com/help/app-store-connect/` — often has locale routes)
   - Google Play Console help (`support.google.com/googleplay/android-developer?hl={LOCALE}`)
   - Firebase docs (`firebase.google.com/docs?hl={LOCALE}`)
2. **Competitor docs in the target locale**, if available — RevenueCat, Superwall, Stripe.
3. **Native-language mobile dev press** — e.g. iPhoneSoft, iGeneration, Citronnoir (FR); equivalents exist for most major locales. Search `"<term>" site:<locale-press-domain>` to see real usage.
4. **Glossaries on affiliate-marketing / MMP sites** — AppsFlyer, Adjust, and similar publish locale-specific glossaries.
5. **Professional translators' references** — Linguee and Reverso Context show real-world parallel translations across tech content.

**For each dictionary term, verify:**

- Which form does platform-official (Apple / Google) documentation use in the target locale?
- Is there divergence between Apple FR/DE/etc. and Google Play FR/DE/etc.? (Yes — frequently. Flag these.)
- What term does the target-locale mobile dev press actually use in practice?
- Is the term commonly kept in English as a loanword? (`paywall`, `sandbox`, `onboarding`, `SDK`, `store`, `remote config`, `dashboard` are often kept; `subscription`, `access level`, `grace period`, `consumable` usually translate.)
- Does the candidate translation conflict with another common meaning in the target locale? (e.g. "placement" = "investment" in French — check context fit.)

**Rules of thumb:**

- **Product names stay in English** — `Paywall Builder`, `Remote Config`, `Adapty Dashboard`.
- **Apple's in-app terms have official locale translations** — look up `introductory offer`, `promotional offer`, `win-back offer`, `grace period` in Apple FR/DE/etc. help before guessing.
- **When mobile dev press keeps a term in English, follow them.** Formal dictionaries often propose alternatives (e.g. "bac à sable" for sandbox) that no French iOS developer actually uses.
- **Match the feel of existing locales** — look at how `zh`, `tr`, `ru` handle each term; they already made similar loanword-vs-translation calls. If all three kept a term in English, the new locale probably should too.

#### 6b. Generate a word-pair list and send it for native-speaker review (BLOCKING)

After updating `src/locales/dictionary.json` with researched translations, **stop and generate a plain text list** of `English → {LOCALE}` pairs — one line per term, alphabetical by English source — and tell the user to copy it and send it to a native-speaking reviewer.

**Format to output:**

```
A/B test → <target translation>
access level → <target translation>
...
```

No sources, no rationale — just the pairs. The user will paste this into Slack/email verbatim.

**After outputting the list, STOP.** Do not proceed to article translation. Wait for the user to either:

- Confirm "we're good to go" (dictionary stands as-is), or
- Apply native-speaker corrections to `dictionary.json` and then confirm.

### Phase 2 — Translate tutorial and deploy for rendered review

#### 6c. Generate the two translation commands (BLOCKING)

Once the user confirms the dictionary is approved, **output the following two commands** in a single message for the user to run in their own terminal. Do not execute them — `ANTHROPIC_API_KEY` is a secret and translation is long-running and potentially costly; the user runs it themselves.

```bash
export ANTHROPIC_API_KEY=sk-ant-...
```

```bash
node scripts/translate.mjs --lang {LOCALE} --ids "what-is-adapty,is-adapty-right-for-me,integrate-payments,quickstart-products,quickstart-paywalls,quickstart-sdk,quickstart-test"
```

These are the 7 tutorial entry-point articles every first-time user sees. After outputting, **wait for the user to say the translation finished.**

#### 6d. Deploy the tutorial translations to `develop` for rendered review

Once the user confirms translation is done, invoke the `sync-branch-to-develop` skill to commit the generated MDX files, push the feature branch, and merge into `develop` so the native-speaker reviewer can see them rendered on the staging URL.

#### 6e. Wait for the native speaker to review the rendered pages

Tell the user to share the staging URL with their reviewer. **Stop** until the user returns with approval or revision requests. If revisions are needed, iterate on the dictionary or specific article frontmatter/body; do not start Phase 3 until the tutorial 7 are approved.

### Phase 3 — Full content translation

Only start this phase after the tutorial 7 are approved by the native-speaker reviewer. Same pattern as Phase 2: **output commands, do not execute** — the user runs them in their terminal with `ANTHROPIC_API_KEY` already exported from Phase 2.

#### 6f. Translate sidebar labels

All sidebars at once:

```bash
node scripts/translate.mjs --lang {LOCALE} --sidebars
```

Or one sidebar's labels at a time, if you want to review incrementally:

```bash
node scripts/translate.mjs --lang {LOCALE} --sidebar tutorial
node scripts/translate.mjs --lang {LOCALE} --sidebar ios
node scripts/translate.mjs --lang {LOCALE} --sidebar android
node scripts/translate.mjs --lang {LOCALE} --sidebar react-native
node scripts/translate.mjs --lang {LOCALE} --sidebar flutter
node scripts/translate.mjs --lang {LOCALE} --sidebar unity
node scripts/translate.mjs --lang {LOCALE} --sidebar kmp
node scripts/translate.mjs --lang {LOCALE} --sidebar capacitor
node scripts/translate.mjs --lang {LOCALE} --sidebar api
```

#### 6g. Translate reusable snippets

Reusable MDX snippets in `src/components/reusable/` are skipped by `--platform`, `--ids`, `--sidebar`, and `--sidebars` runs (to avoid re-translating them on every targeted run). They must be translated in their own pass:

```bash
node scripts/translate.mjs --lang {LOCALE} --reusables
```

Run this before the platform translations — platform articles import reusables, so the staging build will render mixed-language content until the snippets are translated.

#### 6h. Translate platform article docs, one platform at a time

```bash
node scripts/translate.mjs --lang {LOCALE} --platform tutorial
node scripts/translate.mjs --lang {LOCALE} --platform ios
node scripts/translate.mjs --lang {LOCALE} --platform android
node scripts/translate.mjs --lang {LOCALE} --platform react-native
node scripts/translate.mjs --lang {LOCALE} --platform flutter
node scripts/translate.mjs --lang {LOCALE} --platform unity
node scripts/translate.mjs --lang {LOCALE} --platform kmp
node scripts/translate.mjs --lang {LOCALE} --platform capacitor
node scripts/translate.mjs --lang {LOCALE} --platform api
```

`--platform api` translates the MDX articles referenced from `src/data/sidebars/api.json` (e.g. developer CLI guides, server-side API intro/auth pages). This is separate from the OpenAPI YAML specs themselves — those are translated by `--api-specs` below.

#### 6i. Translate API OpenAPI specs

```bash
node scripts/translate.mjs --lang {LOCALE} --api-specs
```

This translates the YAML specs in `src/api-reference/specs/` (e.g. `adapty-api.yaml` → `adapty-api.{LOCALE}.yaml`) — the source for the rendered API reference pages. Distinct from `--platform api`, which translates the surrounding MDX articles.

#### 6j. Validate MDX parses cleanly before deploy (BLOCKING — triggers on "we are done")

**Trigger:** the user says "we're done", "that's it", "everything is translated", or otherwise signals end of translation work. Do not run this earlier — broken intermediate state is normal during translation.

Three checks must pass before merging to `main` (and they're enforced in `s3-deploy-production.yml` via the `lint-mdx`, `check-mdx-parse`, and `check-localized-links` jobs). Run them locally and resolve issues before the user pushes:

**1. Run the lint check with auto-fix:**

```bash
node scripts/lint-mdx.mjs --fix
```

This auto-corrects the `blank-line` rule (missing blank line after the last `import` — Acorn's most common crash). Other rules (e.g. `missing-import` for `client:load` components like `CompoundCalculator`, `SimpleCalculator`) are reported but not auto-fixed; you must add the missing import line at the top of each flagged file.

**2. Run the parse check:**

```bash
node scripts/check-mdx-parse.mjs
```

This compiles every `.mdx` under `src/content/docs/`, `src/locales/`, and `src/components/reusable/` using the same MDX plugins Astro uses. It reports every parse error at once (Astro's locale build halts at the first, so this surfaces hidden failures stacked behind it).

**3. Run the localized link check:**

```bash
node scripts/check-links/index.mjs --locales={LOCALE} --internal-only
```

This checks internal links in the new locale's files only, resolving each
against the English doc set with the locale's translated pages overlaid. It
catches links a translation corrupted into a non-existent slug. Anchors
(`#heading`) are intentionally not validated (the translator preserves English
anchor ids), so the report stays focused on broken page links. A non-zero exit
means at least one broken link — the same gate runs at deploy
(`check-localized-links`), so resolve everything before pushing.

Link breakage is **not** auto-fixable: for each broken link, open the flagged
file at the reported line, compare to the English source, and fix the slug
(usually the translator mangled a bare slug or invented a target). Re-run after
each fix.

**4. Auto-fix the remainder:**

For every remaining issue from the lint/parse scripts, read the file at the reported line, identify the cause, and edit it directly. Common causes after translation:

- **JSX comments** (`{/* ... */}`) inside MDX — crash the content collection. Replace with `:::note` callouts.
- **Inline callout syntax** — `:::note text :::` on one line. Split into three lines: `:::note`, content, `:::`.
- **Mismatched JSX tags** — usually a `</Tag>` introduced or dropped by the translator. Compare the locale file to the English source and restore the original tag balance.
- **Smart-quote contamination** in attribute values (e.g. `title=" "`) — replace with straight ASCII quotes.
- **Stray backslashes** in heading anchors — `\{#id\}` must keep its backslash escapes exactly.

After each edit pass, re-run all three scripts. Loop until they all exit clean. Only then tell the user the locale is ready to deploy.

---

## Step 7 — Algolia: update English crawler + create new locale crawler

### 7a. Add locale to the English crawler exclusion pattern

In the Algolia dashboard, open the **English crawler config** and add `/{LOCALE}/` to the URL exclusion pattern so English-only content is not contaminated with locale paths. The existing exclusion already covers `zh` and `tr` — add `{LOCALE}` alongside them.

### 7b. Create a new crawler for the locale

In Algolia, create a new crawler pointing to:
- **Start URL:** `https://adapty.io/docs/{LOCALE}/`
- **Sitemap:** `https://adapty.io/docs/sitemap-{LOCALE}-index.xml`
- Index name: `adapty_{LOCALE}`

Use the existing `zh` or `tr` crawler config as a template — the only changes are the start URL, sitemap URL, and index name.

### 7c. Create the Algolia index

Create a new index named `adapty_{LOCALE}` in Algolia. Copy replica/ranking settings from the `adapty_zh` index to ensure consistent relevance tuning.

---

## Step 8 — Update GitHub Actions deploy workflows

The `translate.yml` workflow is locale-agnostic (uses `src/locales/*/` glob) — no changes needed there. The `check-localized-links` gate in `s3-deploy-production.yml` is also locale-agnostic (runs `--locales` over every locale dir) — no edit needed when adding a locale.

Both deploy workflows have `[zh, tr]` hardcoded and **must be updated** in multiple places each.

### `s3-deploy-production.yml`

**1. `build-locale-full` matrix** (line ~99):
```yaml
strategy:
  matrix:
    locale: [zh, tr, {LOCALE}]
```

**2. `deploy-full` artifact downloads** (lines ~150–156) — add a new step alongside the existing `build-zh` and `build-tr` blocks:
```yaml
- uses: actions/download-artifact@v4
  with:
    name: build-{LOCALE}
    path: build/{LOCALE}/
```

**3. `build-locale-only` matrix** (line ~183):
```yaml
strategy:
  matrix:
    locale: [zh, tr, {LOCALE}]
```

**4. `deploy-translations` artifact downloads** (lines ~229–235) — add a new step alongside the existing `build-tr-only-zh` and `build-tr-only-tr` blocks:
```yaml
- uses: actions/download-artifact@v4
  with:
    name: build-tr-only-{LOCALE}
    path: build/{LOCALE}/
```

**5. `deploy-translations` S3 sync** (lines ~241–242):
```bash
aws s3 sync build/{LOCALE}/ s3://${{ secrets.S3_BUCKET }}/{LOCALE}/ --delete
```

**6. `deploy-translations` CloudFront invalidation** (lines ~246–248):
```bash
aws cloudfront create-invalidation \
  --distribution-id ${{ secrets.CLOUDFRONT_DISTRIBUTION_ID }} \
  --paths "/zh/*" "/tr/*" "/{LOCALE}/*"
```

### `s3-deploy-development.yml`

**1. `build-locale` matrix** (line ~47):
```yaml
strategy:
  matrix:
    locale: [zh, tr, {LOCALE}]
```

**2. `deploy` artifact downloads** (lines ~96–104) — add a new step:
```yaml
- uses: actions/download-artifact@v4
  with:
    name: build-{LOCALE}
    path: build/{LOCALE}/
```

---

## Complete checklist

| # | What | File(s) |
|---|------|---------|
| 1a | Add to `SUPPORTED_LOCALES` + `LOCALE_NAMES` | `src/data/locales.ts` |
| 1b | Add to `LANGUAGE_NAMES` + `METADATA_TITLE_SUFFIXES` + localized `REFUSAL_PATTERNS` (+ regression test) | `scripts/translate.mjs`, `scripts/__tests__/refusal-detection.test.mjs` |
| 1c | Add UI string translations for all groups | `src/locales/ui-strings.ts` |
| 1d | Add dictionary translations | `src/locales/dictionary.json` |
| 1e | Add to `LOCALE_INDEX` + `data-index-name-{LOCALE}` attr | `src/components/Search.astro` |
| 1f | Add locale key to `T` object (~20 strings) | `src/components/Homepage.tsx` |
| 1g | **Auto-handled** — Header now injects `LOCALE_NAMES` + `getUIStrings` as JSON (sourced from 1a + 1c). No edit needed; just verify after 1a/1c. | `src/components/Header.astro` |
| 1h | Add auto-redirect block | `src/layouts/DocsLayout.astro` |
| 1i | Add to `SUPPORTED_LOCALES` (scopes the locales collection glob per CI job) | `src/content.config.ts` |
| 1j | Add locale key to `T` object (label, desc, linkText) — like 1f; detection reuses `SUPPORTED_LOCALES` | `src/components/SkillPromo.astro` |
| 1k | Add locale key to `T` object (label, items, note, noteLinkText) — like 1j; keep `{method}` placeholder | `src/components/MethodPromo.astro` |
| 1l | Create translated copy of the product map — strings only, keep hrefs/structure | `src/data/product-map.{LOCALE}.json` |
| 2 | Add env vars | `.env` + deployment config |
| 3 | Create sitemap files + update astro.config.mjs | `src/pages/sitemap-{LOCALE}*.xml.ts`, `astro.config.mjs` |
| 4 | Add npm scripts (optional) | `package.json` |
| 5 | Create content directory | `src/locales/{LOCALE}/` |
| 6a | Deeply research target-language mobile dev terminology (web searches) | `src/locales/dictionary.json` |
| 6b | **BLOCKING:** Generate word-pair list; wait for native-speaker review | conversation |
| 6c | **BLOCKING:** Output two commands (export key + translate tutorial 7); wait for user to run them | conversation |
| 6d | Deploy tutorial translations to develop via `sync-branch-to-develop` skill | `sync-branch-to-develop` |
| 6e | **BLOCKING:** Wait for native speaker to review rendered tutorial pages on staging | — |
| 6f | Output command to translate sidebar labels | `--sidebars` |
| 6g | Output command to translate reusable snippets (skipped by targeted runs) | `--reusables` |
| 6h | Output commands to translate platform article docs | `--platform` per sidebar |
| 6i | Output command to translate API specs | `--api-specs` |
| 6j | **BLOCKING on "we are done":** Run lint-mdx --fix + check-mdx-parse + localized link check (`--locales={LOCALE} --internal-only`); auto-fix/​resolve remaining issues | `scripts/lint-mdx.mjs`, `scripts/check-mdx-parse.mjs`, `scripts/check-links/index.mjs` |
| 7a | Update English crawler exclusion | Algolia dashboard |
| 7b | Create new locale crawler | Algolia dashboard |
| 7c | Create new Algolia index | Algolia dashboard |
| 8a | Add to `matrix: locale: [...]` (×2 jobs) | `s3-deploy-production.yml` |
| 8b | Add artifact download + S3 sync + CloudFront invalidation | `s3-deploy-production.yml` |
| 8c | Add to `matrix: locale: [...]` + artifact download | `s3-deploy-development.yml` |
