# API Spec Localization Design

**Date:** 2026-02-25
**Status:** Approved

## Problem

The API reference pages (`/api-web`, `/api-adapty`, `/api-export-analytics`) are English-only. The localization system covers MDX articles and sidebar labels, but Stoplight Elements renders content directly from YAML specs — so the specs themselves need to be translated and served per locale.

## Goal

Add locale-prefixed API reference routes (e.g., `/zh/api-web`) that render Stoplight Elements against a localized YAML spec, using the same translation automation as MDX articles.

## Approach: Full translated YAML files

Translated YAMLs are generated to `src/api-reference/specs/{name}.{lang}.yaml` and copied to `public/api-specs/` by the existing prebuild step (no prebuild changes needed). Localized routes are added as new Astro page files. The `translate.mjs` script is extended with a `--api-specs` mode.

## File Layout

| What | Path |
|------|------|
| Localized YAML source | `src/api-reference/specs/adapty-api.zh.yaml` |
| Served spec (auto-copied) | `public/api-specs/adapty-api.zh.yaml` |
| Translation hashes | `src/locales/zh/.hashes/api-specs/adapty-api.json` |

Naming convention: `{original-name}.{lang}.yaml`.

## Component 1: translate.mjs extension

New `--api-specs` flag adds `translateApiSpecsForLang()`, parallel to the existing `translateForLang()` and `translateSidebarsForLang()` functions.

### CLI usage

```bash
node scripts/translate.mjs --lang zh --api-specs                    # all specs, untranslated only
node scripts/translate.mjs --lang zh --api-specs --all              # retranslate everything
node scripts/translate.mjs --lang zh --api-specs --file adapty-api  # single spec
node scripts/translate.mjs --incremental                            # includes api-specs automatically
```

`--incremental` (used by `prebuild` in CI) includes api-specs automatically so translations stay current.

### YAML system prompt rules

**PRESERVE — never translate:**
- All YAML keys and property names
- `$ref` values, `operationId`, server `url`, security scheme names
- `enum` values, `format`, `type`, `pattern`, `example`/`examples` field values
- HTTP methods and status codes
- Tag `name` values (used as anchors in Stoplight Elements)

**TRANSLATE:**
- `summary` and `description` under operations, parameters, responses, and schemas
- `info.title`, `info.description`
- Tag `description` (not `name`)
- `x-*` extension fields whose values are human-readable prose

Output valid YAML only — no fences, no commentary.

### Hash tracking

Same mechanism as MDX articles: SHA-256 hash of the English source stored in `src/locales/{lang}/.hashes/api-specs/{name}.json`. Incremental mode skips specs whose hash matches.

## Component 2: New Astro routes

### `src/pages/[locale]/[slug].astro`

Top-level locale-prefixed API reference page.

- `getStaticPaths()` generates `SUPPORTED_LOCALES × apiConfig` entries (e.g., `{locale: 'zh', slug: 'api-web'}`)
- Checks whether `public/api-specs/{specFileBasename}.{locale}.yaml` exists at build time; falls back to English spec if not
- Constructs localized `specUrl` and passes it to `ApiReferencePage`
- Otherwise identical to existing `src/pages/[slug].astro`

**Routing priority:** Astro gives `[locale]/[slug].astro` (named param) higher priority than `[locale]/[...slug].astro` (rest param) for single-segment paths. No collision: `[locale]/[...slug].astro` only generates paths from the `docs` collection, not API slugs.

### `src/pages/[locale]/[slug]/[...rest].astro`

Per-operation locale-prefixed pages (for SEO — one page per API operation).

- Same path generation logic as existing `src/pages/[slug]/[...rest].astro`
- Parses the localized YAML (or English fallback) to extract `operationId`, `summary`, `description` for page metadata
- Constructs localized `specUrl` and passes it to `ApiReferencePage`

## Component 3: Spec URL resolution (shared logic)

Both new route files use the same resolution logic:

```
specFileBasename = api.specFile without .yaml extension
localizedSpecFile = {specFileBasename}.{locale}.yaml
if public/api-specs/{localizedSpecFile} exists at build time:
    specUrl = BASE_URL/api-specs/{localizedSpecFile}
else:
    specUrl = BASE_URL/api-specs/{api.specFile}  (English fallback)
```

## What does NOT change

- `src/api-reference/config.json` — no changes
- `package.json` `prebuild` script — no changes (already copies all `src/api-reference/specs/*.yaml`)
- Existing English API routes (`/api-web` etc.) — untouched
- Existing MDX translation pipeline — untouched

## Rollout

1. Extend `translate.mjs` with `--api-specs` mode
2. Add `src/pages/[locale]/[slug].astro`
3. Add `src/pages/[locale]/[slug]/[...rest].astro`
4. Run `node scripts/translate.mjs --lang zh --api-specs` to generate initial translations
5. Verify `/zh/api-web`, `/zh/api-adapty`, `/zh/api-export-analytics` render correctly
