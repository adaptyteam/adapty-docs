# check-links

Scans all `.md`/`.mdx` files in `src/content/docs` and `src/components/reusable`, extracts links, and checks them. External URLs are verified via `curl`; internal links are resolved against the doc file index. Results are classified into three tiers and output as either an HTML report or GitHub Actions annotations.

Requires one npm dependency: `github-slugger` (for heading anchor generation matching rehype-slug). Uses `curl` for external checks. Optional: `puppeteer` for verifying anchors on JS-rendered pages (Stripe, Apple Developer, etc.).

## Usage

```bash
# Check everything, produce HTML report
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

### Dev mode and diff mode

Focused checks that only look at changed files instead of the entire docs:

```bash
# Dev mode: check files changed since last push (local work in progress)
npm run check-links-dev

# Diff mode: check files changed vs origin/main (default)
npm run check-links-diff

# Diff mode with explicit base ref (tag, branch, commit)
npm run check-links-diff -- --base=last-production-deploy
npm run check-links-diff -- --base=origin/develop
```

Both modes check:
1. **Outgoing links** from changed files (internal existence + external HTTP)
2. **Incoming links** to changed files from all other articles (detects breakage from renamed files or removed headings)

If the base ref doesn't exist (e.g. a deploy tag on first run), the script falls back to a full scan with a warning.

### Flags

| Flag | Description |
|------|-------------|
| `--internal-only` | Skip external URL checks |
| `--external-only` | Skip internal link checks |
| `--dev` | Dev mode — check files changed since last push |
| `--diff` | Diff mode — check files changed vs a base ref (default: `origin/main`) |
| `--base=<ref>` | Override the diff base ref (use with `--diff`). Accepts any git ref: branch, tag, commit SHA |
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
- **`.md`/`.mdx` extension in internal links** — write `[text](article)` not `[text](article.md)`. The remark plugin strips extensions at build time, but source files should use the clean form. Links flagged this way are skipped during the regular internal check to avoid duplicate errors.
- **Self-links** — external URLs pointing to `adapty.io/docs` that should be internal links instead (exceptions: `.txt`/`.md` files used in AI tool instructions, and API reference routes)

### Stale links (warnings)

Links that work but point to the wrong place. Reported but don't block CI.

- **Redirects** — URL resolves but redirects to a different destination
- **Internal redirects** — slug not in source files, but the live site (CloudFront) resolves it to a different page
- **Missing anchors** — page exists but the `#fragment` target is absent from the page headings

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
  ],
  "jsRenderedDomains": [
    "stripe.com",
    "developer.apple.com"
  ]
}
```

**Whitelist entries:**

| Field | Description |
|-------|-------------|
| `url` | Exact URL match. Trailing slashes and `#fragment` anchors are ignored during comparison |
| `pattern` | Prefix match with a trailing `*` wildcard. Matches any URL that starts with the prefix before the `*` |
| `reason` | Required. Documents why the URL is whitelisted — helps with future maintenance |

Each entry must have either `url` or `pattern`, not both.

**`jsRenderedDomains`**: List of domains where anchor IDs are generated by client-side JavaScript. When a static HTML anchor check fails for a URL on one of these domains, the checker retries with a headless browser (Puppeteer). If Puppeteer is not installed, the check is skipped (anchor assumed OK). See the "JS-rendered anchor checking" section below for details.

## Output formats

### HTML report (local development)

Written to `_temp/link-report.html`. Features:
- Stats dashboard (total links, broken, stale, health %)
- Four main tabs: **Total**, **Broken links**, **Stale links**, **Manual check**
- Subtabs within each: All, By link, By file, By status, External by domain, Internal by page
- Search filtering scoped to the active tab
- Clickable source links to the live article on adapty.io/docs
- Clickable target URLs (internal links resolve to the live site)
- **VS** button next to each source — opens the file at the exact line in VSCode via `vscode://file/` deep link

### LLM report (local development)

Written to `_temp/link-report.md` alongside the HTML report. A plain-text markdown file structured for easy parsing by LLMs and scripts: one issue per line, grouped by source file, with line numbers, URLs, and status labels.

### CI format (GitHub Actions)

When `GITHUB_ACTIONS` is set:
- `::error` annotations for broken links (appear inline on the PR diff)
- `::warning` annotations for stale links and manual-check items
- Markdown summary table written to `$GITHUB_STEP_SUMMARY`

## GitHub Actions workflows

### PR checks (`.github/workflows/check-links.yml`)

| Job | Runs on | Blocks PR | What it checks |
|-----|---------|-----------|----------------|
| `internal-links` | PRs and manual dispatch | Yes | `--internal-only` — file existence, anchors, internal redirects |
| `external-links` | Manual dispatch only | No (`continue-on-error`) | `--external-only` — HTTP status, redirects, bot detection |

For pull requests, the diff base is set to `origin/<base-branch>` automatically — the script checks only files changed in the PR relative to its target branch.

For manual dispatch, the diff base is `last-production-deploy` — the script checks everything that changed since the last production deployment. If the tag doesn't exist yet, it falls back to a full scan.

External checks run only via manual dispatch because third-party sites can be temporarily down or rate-limit CI runners. Use the **Run workflow** button in the Actions tab and select `all` or `external-only` to trigger them.

### Deploy checks

The production and development deploy workflows (`.github/workflows/s3-deploy-production.yml`, `s3-deploy-development.yml`) run internal link checks before deploying, using deployment tags as the diff base:

| Workflow | Diff base tag | Updated after |
|----------|--------------|---------------|
| Production deploy | `last-production-deploy` | Successful deploy to production |
| Development deploy | `last-development-deploy` | Successful deploy to development |

On first deploy (before the tag exists), the link check falls back to a full internal scan. After that, each deploy updates the tag so subsequent runs only check what changed since the last deployment.

## Module structure

```
scripts/check-links/
├── index.mjs                # CLI entry point — arg parsing, format selection, exit code
├── runner.mjs               # Full-scan orchestration pipeline with concurrency pool
├── diff.mjs                 # Dev-mode and diff-mode orchestration (changed files only)
├── scan.mjs                 # getAllDocFiles(), extractLinks(), extractReusableImports(), categorizeLinks()
├── check-external.mjs       # curl-based HTTP checks, bot/rate-limit detection, anchor verification
├── check-internal.mjs       # Doc index, slug resolution, heading ID extraction, live-site fallback
├── check-anchor-headless.mjs # Puppeteer-based anchor verification for JS-rendered pages
├── classify.mjs             # Dedup + three-tier severity split + whitelist filtering
├── config.mjs               # Config loader (whitelist + JS-rendered domains)
├── link-whitelist.json      # Config file (whitelist entries, JS-rendered domains)
├── group.mjs                # groupBy/sortedGroupBy utilities, statusLabel(), statusClass(), esc()
├── format-html.mjs          # HTML report generator
├── format-llm.mjs           # LLM-friendly plain-text report
├── format-ci.mjs            # GitHub annotations + step summary
├── format-console.mjs       # Console summary
├── clean-url.mjs            # URL cleaning utilities (strip tracking params)
├── fix-redirects.mjs        # CLI tool to auto-fix redirect URLs in articles
└── audit-js-pages.mjs       # Audit tool to find JS-rendered external pages
```

### Data flow

Full mode:

```
index.mjs
  → runner.orchestrate(config)
      → scan: find doc files + reusable snippets → extract links → categorize (external/internal)
      → lint: flag .md extensions and self-links
      → check-external: curl each URL (per-domain serialized, concurrent across domains)
      → check-internal: resolve slugs against file index, fall back to live site
      → classify: dedup → split into errors / warnings / manual-check / whitelisted
  → format-*: render results in selected format
  → exit(1) if errors.length > 0
```

Dev/diff mode:

```
index.mjs --dev or --diff [--base=<ref>]
  → diff.orchestrateDiff(config)
      → resolve diff base (dev: upstream branch, diff: --base or origin/main)
      → if base ref missing → fall back to full scan via runner.orchestrate()
      → git diff: get changed .md/.mdx files
      → extract outgoing links from changed files
      → find incoming links to changed files from all other articles
      → detect deleted/renamed files and removed headings
      → check all collected links (internal + external)
      → classify results
  → format-*: render results
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

**Internal links**: Slugs are resolved against a case-insensitive Map built from all doc filenames (both basename and relative path) and `customSlug` frontmatter values. If a slug isn't found locally, the tool checks `https://adapty.io/docs/{slug}` as a fallback — if that resolves, it's classified as an internal redirect rather than broken. Anchor checking uses `github-slugger` to generate heading IDs matching rehype-slug behavior, and also collects headings from imported reusable components.

**JS-rendered anchor checking**: Some sites (Stripe, Apple Developer, Android Developer, OneSignal) render page content and anchor IDs via client-side JavaScript. A plain `curl` fetch sees only the shell HTML, so anchors appear missing. When an anchor check fails for a domain listed in `jsRenderedDomains`, the checker retries using a headless browser (Puppeteer). The browser navigates to the full URL (with fragment), waits for `networkidle2`, then checks for `id`, `name`, and `data-testid` attributes, and also checks whether the page scrolled (proving the site's JS handled the fragment). If Puppeteer is not installed, the check is skipped and the anchor is assumed OK.

**Reusable components**: Files in `src/components/reusable/` are scanned for links alongside doc files. The runner builds a reverse map of which articles import each reusable component, used by the HTML report to link reusable sources to live articles.

**Self-link detection**: External URLs pointing to `adapty.io/docs` are flagged as errors — these should be internal links. Exceptions: `.txt`/`.md` files (AI tool instructions) and API reference routes.

**Runtime API routes** (`api-adapty/`, `api-web/`, `api-export-analytics/`): These are generated at build time from OpenAPI specs and don't exist as source files. They're checked against the live site directly (original case preserved).
