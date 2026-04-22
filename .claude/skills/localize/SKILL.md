---
name: localize
description: Use when adding support for a new locale/language to the Adapty docs site. Covers all hardcoded and dynamic locale registration points, translation commands, sitemap setup, Algolia search config, and the step-by-step order to follow.
---

# Adding a New Locale to Adapty Docs

## Overview

Adding a locale touches ~8 files plus new content/sitemap files. Miss any one and the locale will partially break (no search, broken auto-redirect, missing from sitemap, etc.). Follow this checklist in order.

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

### 1g. `src/components/Header.astro`

The header is `transition:persist` and uses two client-side JS objects (in the inline `<script>`) that mirror other locale files but must be updated independently:

**`LOCALE_NAMES_CLIENT`** (around line 387) — mirrors `src/data/locales.ts`:
```js
const LOCALE_NAMES_CLIENT: Record<string, string> = { zh: '中文', tr: 'Türkçe', '{LOCALE}': '{NativeName}' };
```

**`UI_STRINGS_CLIENT`** (around line 390) — a subset of `ui-strings.ts` for client-side reactivity. Add a new locale key:
```js
'{LOCALE}': {
  documentation: '...',
  mobileSdk: '...',
  serverApi: '...',
  whatsNew: '...',
  supportForum: '...',
  signIn: '...',
  signUpFree: '...',
  searchPlaceholder: '...',
  searchNoResults: '...',
},
```

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

## Step 6 — Translate content (run in this order)

> **Note on `CustomDocCardList`:** This component is already locale-aware — it reads titles from `_sidebar-labels.json` and descriptions from the translated article frontmatter automatically. No extra step is needed; it works correctly once sidebar labels (Step 6c `--sidebars`) and article translations are done.

All commands require `ANTHROPIC_API_KEY` to be set.

### 6a. Translate the dictionary first

The dictionary (`src/locales/dictionary.json`) should already have translations added manually in Step 1d. Review it before running article translations — the script uses it as a glossary.

```
# Check dictionary for any missing {LOCALE} entries, then continue.
```

### 6b. Translate tutorial sidebar first 7 articles

These are the entry-point articles every user sees first. Translate them as a batch:

```bash
ANTHROPIC_API_KEY=sk-... node scripts/translate.mjs --lang {LOCALE} --ids "what-is-adapty,is-adapty-right-for-me,integrate-payments,quickstart-products,quickstart-paywalls,quickstart-sdk,quickstart-test"
```

### 6c. Translate sidebar labels and step-by-step docs per sidebar

Translate one sidebar at a time — each command is independent and can be run, reviewed, and committed separately.

**Step-by-step sidebar labels only (all sidebars at once):**
```bash
ANTHROPIC_API_KEY=sk-... node scripts/translate.mjs --lang {LOCALE} --sidebars
```

**Or one sidebar's labels at a time:**
```bash
ANTHROPIC_API_KEY=sk-... node scripts/translate.mjs --lang {LOCALE} --sidebar tutorial
ANTHROPIC_API_KEY=sk-... node scripts/translate.mjs --lang {LOCALE} --sidebar ios
ANTHROPIC_API_KEY=sk-... node scripts/translate.mjs --lang {LOCALE} --sidebar android
ANTHROPIC_API_KEY=sk-... node scripts/translate.mjs --lang {LOCALE} --sidebar react-native
ANTHROPIC_API_KEY=sk-... node scripts/translate.mjs --lang {LOCALE} --sidebar flutter
ANTHROPIC_API_KEY=sk-... node scripts/translate.mjs --lang {LOCALE} --sidebar unity
ANTHROPIC_API_KEY=sk-... node scripts/translate.mjs --lang {LOCALE} --sidebar kmp
ANTHROPIC_API_KEY=sk-... node scripts/translate.mjs --lang {LOCALE} --sidebar capacitor
ANTHROPIC_API_KEY=sk-... node scripts/translate.mjs --lang {LOCALE} --sidebar api
```

**Article docs, one platform/sidebar at a time:**
```bash
ANTHROPIC_API_KEY=sk-... node scripts/translate.mjs --lang {LOCALE} --platform tutorial
ANTHROPIC_API_KEY=sk-... node scripts/translate.mjs --lang {LOCALE} --platform ios
ANTHROPIC_API_KEY=sk-... node scripts/translate.mjs --lang {LOCALE} --platform android
ANTHROPIC_API_KEY=sk-... node scripts/translate.mjs --lang {LOCALE} --platform react-native
ANTHROPIC_API_KEY=sk-... node scripts/translate.mjs --lang {LOCALE} --platform flutter
ANTHROPIC_API_KEY=sk-... node scripts/translate.mjs --lang {LOCALE} --platform unity
ANTHROPIC_API_KEY=sk-... node scripts/translate.mjs --lang {LOCALE} --platform kmp
ANTHROPIC_API_KEY=sk-... node scripts/translate.mjs --lang {LOCALE} --platform capacitor
```

### 6d. Translate API docs

```bash
ANTHROPIC_API_KEY=sk-... node scripts/translate.mjs --lang {LOCALE} --api-specs
```

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

The `translate.yml` workflow is locale-agnostic (uses `src/locales/*/` glob) — no changes needed there.

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
| 1b | Add to `LANGUAGE_NAMES` + `METADATA_TITLE_SUFFIXES` | `scripts/translate.mjs` |
| 1c | Add UI string translations for all groups | `src/locales/ui-strings.ts` |
| 1d | Add dictionary translations | `src/locales/dictionary.json` |
| 1e | Add to `LOCALE_INDEX` + `data-index-name-{LOCALE}` attr | `src/components/Search.astro` |
| 1f | Add locale key to `T` object (~20 strings) | `src/components/Homepage.tsx` |
| 1g | Add to `LOCALE_NAMES_CLIENT` + `UI_STRINGS_CLIENT` | `src/components/Header.astro` |
| 1h | Add auto-redirect block | `src/layouts/DocsLayout.astro` |
| 1i | Add to `SUPPORTED_LOCALES` (scopes the locales collection glob per CI job) | `src/content.config.ts` |
| 2 | Add env vars | `.env` + deployment config |
| 3 | Create sitemap files + update astro.config.mjs | `src/pages/sitemap-{LOCALE}*.xml.ts`, `astro.config.mjs` |
| 4 | Add npm scripts (optional) | `package.json` |
| 5 | Create content directory | `src/locales/{LOCALE}/` |
| 6a | Review/complete dictionary | `src/locales/dictionary.json` |
| 6b | Translate first 7 tutorial articles | `--ids` command |
| 6c | Translate sidebar labels + platform docs | `--sidebars` + `--platform` commands |
| 6d | Translate API specs | `--api-specs` command |
| 7a | Update English crawler exclusion | Algolia dashboard |
| 7b | Create new locale crawler | Algolia dashboard |
| 7c | Create new Algolia index | Algolia dashboard |
| 8a | Add to `matrix: locale: [...]` (×2 jobs) | `s3-deploy-production.yml` |
| 8b | Add artifact download + S3 sync + CloudFront invalidation | `s3-deploy-production.yml` |
| 8c | Add to `matrix: locale: [...]` + artifact download | `s3-deploy-development.yml` |
