# check-links

Scans all `.md`/`.mdx` files in `src/content/docs`, extracts links, and checks them. External URLs are verified via `curl`; internal links are resolved against the doc file index. Results are classified into three tiers and output as either an HTML report or GitHub Actions annotations.

No npm dependencies — uses only Node built-ins and `curl`.

## Usage

```bash
# Check everything, produce HTML report
node scripts/check-links/index.mjs

# Via npm script
npm run check-links

# Internal links only (fast, no network calls for external URLs)
npm run check-links -- --internal-only

# External links only
npm run check-links -- --external-only

# Limit concurrency (default: 25)
npm run check-links -- --concurrency=10

# Force a specific output format
npm run check-links -- --format=html   # HTML report (default locally)
npm run check-links -- --format=ci     # GitHub annotations (default in CI)
```

### Flags

| Flag | Description |
|------|-------------|
| `--internal-only` | Skip external URL checks |
| `--external-only` | Skip internal link checks |
| `--concurrency=N` | Max parallel external requests (default: 25) |
| `--format=html\|ci` | Output format override. Auto-detected: `ci` when `GITHUB_ACTIONS` env is set, `html` otherwise |

### Exit codes

- **0** — no broken links found
- **1** — broken links found (stale links and manual-check items do not cause failure)

## Classification tiers

Every detected issue falls into one of three tiers:

### Broken links (errors)

Links that don't resolve at all. These block CI.

- HTTP 4xx/5xx responses (except 403 Cloudflare challenges and 429 rate limits)
- DNS failures, connection refused, timeouts
- Internal slugs not found in docs or on the live site
- Malformed URL schemes (`khttps://`, `uhttps://`)

### Stale links (warnings)

Links that work but point to the wrong place. Reported but don't block CI.

- **Redirects** — URL resolves but redirects to a different destination
- **Internal redirects** — slug not in source files, but the live site (CloudFront) resolves it to a different page
- **Missing anchors** — page exists but the `#fragment` target is absent from the HTML

### Manual check required

Links that can't be verified programmatically. Reported as warnings in CI.

- **Bot-protected** — 403 with Cloudflare JS challenge (`cf-mitigated: challenge` header)
- **Rate-limited** — 429 response
- **Login required** — URL redirects to an authentication page (Google, Apple, Microsoft, TikTok Ads, `/login`, `/auth`, etc.)
- **Locale redirect** — URL redirects only to add a locale prefix (`/pt-BR`, `/en-us`, etc.) or tracking params — content is unchanged

## Whitelist

URLs that are expected to produce warnings (redirects, bot-protection, login-required) can be whitelisted in `link-whitelist.json`. Whitelisted URLs are moved from the Stale/Manual tabs to a dedicated "Whitelisted" subtab under Manual check. They still appear in the Total tab (marked with a "Whitelisted" badge) but are suppressed from CI annotations.

**Important**: Whitelisting does NOT suppress errors. If a whitelisted URL returns a 404, it still appears as a broken link and blocks CI.

### Config format

The config file is at `scripts/check-links/link-whitelist.json`:

```json
{
  "whitelist": [
    { "url": "https://exact-match.com/page", "reason": "Why this is whitelisted" },
    { "pattern": "https://prefix-match.com/docs/*", "reason": "Why this prefix is whitelisted" }
  ]
}
```

| Field | Description |
|-------|-------------|
| `url` | Exact URL match. Trailing slashes and `#fragment` anchors are ignored during comparison |
| `pattern` | Prefix match with a trailing `*` wildcard. Matches any URL that starts with the prefix before the `*` |
| `reason` | Required. Documents why the URL is whitelisted — helps with future maintenance |

Each entry must have either `url` or `pattern`, not both.

## Output formats

### HTML report (local development)

Written to `_temp/link-report.html`. Features:
- Stats dashboard (total links, broken, stale, health %)
- Four main tabs: **Total**, **Broken links**, **Stale links**, **Manual check**
- Subtabs within each: All, By link, By file, By status, External by domain, Internal by page
- Search filtering scoped to the active tab

### LLM report (local development)

Written to `_temp/link-report.md` alongside the HTML report. A plain-text markdown file structured for easy parsing by LLMs and scripts: one issue per line, grouped by source file, with line numbers, URLs, and status labels.

### CI format (GitHub Actions)

When `GITHUB_ACTIONS` is set:
- `::error` annotations for broken links (appear inline on the PR diff)
- `::warning` annotations for stale links and manual-check items
- Markdown summary table written to `$GITHUB_STEP_SUMMARY`

## GitHub Actions workflow

Defined in `.github/workflows/check-links.yml`. Two jobs:

| Job | Runs on | Blocks PR | What it checks |
|-----|---------|-----------|----------------|
| `internal-links` | All pushes and PRs to `main`/`develop` | Yes | `--internal-only` — file existence, anchors, internal redirects |
| `external-links` | Pushes to `main` only | No (`continue-on-error`) | `--external-only` — HTTP status, redirects, bot detection |

External checks are advisory because third-party sites can be temporarily down or rate-limit CI runners.

## Module structure

```
scripts/check-links/
├── index.mjs            # CLI entry point — arg parsing, format selection, exit code
├── scan.mjs             # getAllDocFiles(), extractLinks(), categorizeLinks()
├── check-external.mjs   # curl-based HTTP checks, bot/rate-limit detection, anchor verification
├── check-internal.mjs   # Doc index, slug resolution, heading ID extraction, live-site fallback
├── classify.mjs         # Dedup + three-tier severity split + whitelist filtering
├── runner.mjs           # Orchestration pipeline with concurrency pool
├── whitelist.mjs        # Whitelist loader and URL matcher
├── link-whitelist.json  # Whitelist config (exact URLs and prefix patterns)
├── group.mjs            # groupBy/sortedGroupBy utilities, statusLabel(), statusClass(), esc()
├── format-html.mjs      # HTML report generator
├── format-llm.mjs       # LLM-friendly plain-text report
├── format-ci.mjs        # GitHub annotations + step summary
├── format-console.mjs   # Console summary
├── clean-url.mjs        # URL cleaning utilities (strip tracking params)
└── fix-redirects.mjs    # CLI tool to auto-fix redirect URLs in articles
```

### Data flow

```
index.mjs
  → runner.orchestrate(config)
      → scan: find files → extract links → categorize (external/internal)
      → check-external: curl each URL (per-domain serialized, concurrent across domains)
      → check-internal: resolve slugs against file index, fall back to live site
      → classify: dedup → split into errors / warnings / manual-check / whitelisted
  → format-*: render results in selected format
  → exit(1) if errors.length > 0
```

## Fixing redirects

After running the link checker, use `fix-redirects.mjs` to automatically update article URLs that have been redirected:

```bash
# Dry run — show what would change
node scripts/check-links/fix-redirects.mjs --dry-run

# Apply fixes, skipping specific domains
node scripts/check-links/fix-redirects.mjs --skip-domain=tiktok.com

# Custom report path
node scripts/check-links/fix-redirects.mjs --report=_temp/link-report.md
```

The script reads the LLM report (`_temp/link-report.md`), extracts redirect entries from the "Stale links" section, strips tracking parameters (`visit_id`, `rd`, UTM params, etc.), and replaces the original URLs in the source files.

## How specific checks work

**External URLs**: Each URL is checked via `curl` with browser-like headers to avoid bot detection. Requests to the same domain are serialized; different domains run in parallel. If a URL has a `#fragment`, the page HTML is fetched and searched for a matching `id` attribute. Text fragments (`#:~:text=`) are skipped since they're browser highlight directives, not element anchors. When comparing original and final URLs, tracking parameters are normalized away. Locale-only redirects (where the only difference is a locale path segment like `/pt-BR`) are detected and classified as manual-check items rather than stale links.

**Internal links**: Slugs are resolved against a Map built from all doc filenames (both basename and relative path). If a slug isn't found locally, the tool checks `https://adapty.io/docs/{slug}` as a fallback — if that resolves, it's classified as an internal redirect rather than broken.

**Runtime API routes** (`api-adapty/`, `api-web/`, `api-export-analytics/`): These are generated at build time from OpenAPI specs and don't exist as source files. They're checked against the live site directly.
