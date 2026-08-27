# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

Adapty documentation site (codename Cassiopeia). Built with **Astro 5 + MDX + React + Tailwind CSS 4**. Covers 7 SDK platforms: iOS, Android, React Native, Flutter, Unity, Kotlin Multiplatform, Capacitor.

Deployed to **https://adapty.io/docs** via AWS S3 + CloudFront. GitHub Actions deploy `develop` → staging, `main` → production.

## Commands

```bash
npm run dev          # Dev server at localhost:4321 (runs prebuild + build:md first)
npm run build        # Production build → ./build/
npm run preview      # Serve production build locally
```

No test suite or linter is configured. Package manager: **Yarn 1.22**.

## Content architecture

All articles live in `src/content/docs` as `.mdx` files. Subdirectories are for organization only — **URLs are derived from filename alone**, not folder path (e.g., `version-3.0/ios/sdk-installation-ios.mdx` → `/docs/sdk-installation-ios`).

### Frontmatter schema

```yaml
title: "Required display title"
description: "SEO description"
metadataTitle: "Browser tab title | Adapty Docs"
keywords: ['array', 'of', 'keywords']  # Don't add or expand unless explicitly asked — see note below
rank: 100          # Sort priority, default 50
customSlug: "override-url"  # Optional URL override
```

**Do not add `keywords` to frontmatter unless the user explicitly asks.** Keywords feed doc search; adding speculative keywords pollutes search results. When writing or editing an article, leave `keywords` out entirely (or untouched if already present). Only populate it on explicit request, and keep it to a few terms.

### Article Discovery

**Do not `grep`, `find`, or `glob` the docs to find the right article — and do not read sidebar JSON to find it either.** Use the **context mill**: invoke the `context-mill` skill (lookup mode). The corpus is partitioned into 34 zones, each with a brief in `.claude/context-mill/zones/<zone>.md` that carries what no search can:

- which article **owns** a topic, and where the boundary against a neighbouring zone falls;
- **how tickets phrase things** versus how the docs phrase them, with the cause attached (`Ticket language`);
- **what else moves** when this moves (`Ripple rules`), including the seven-platform families;
- where **ground truth** for a claim lives (`Sources of truth`) — often an SDK repo or backend, not a doc.

Run `npm run mill` then `npm run mill:status` first: the map is regenerated from disk and the drift report tells you which zones changed since anyone last reviewed them. `.claude/context-mill/docs-map.jsonl` is the searchable index (title, headings, code symbols, links, sidebars) for candidates a brief can't settle.

The four published OpenAPI specs are part of the zoned corpus. **For the server-side and web APIs the spec is the maintained reference**, so an endpoint or field change means editing `src/api-reference/specs/*.yaml`, not a hand-written object article.

### Navigation and Placement

Sidebars answer a different question than discovery: **where an article sits**, and what its neighbours are. The `src/data/sidebars/` folder stores JSON representations of the docs' structure, referencing articles by their filename-based `id`:

```json
{
"type": "doc",
"id": "builder-ui", /* full filename: builder-ui.mdx */
"label": "Interface overview" /* article title */
}
```

1. The `tutorial.json` sidebar is visible when the user views the Dashboard docs. It includes non-framework-specific articles that cover general subjects and the use of the Adapty Dashboard.
2. Framework-specific sidebar files are visible when viewing SDK documentation for that specific framework. They named after the framework (`ios.json`, `android.json`, `react-native.json`, `flutter.json`, `unity.json`, `kmp.json`, `capacitor.json`).
3. The `api.json` file contains the API documentation sidebar. The OpenAPI specs it references live in `src/api-reference/specs/`.

#### Rules and Exceptions

- To add an article to navigation, add its id to the appropriate sidebar JSON.
- Do not rely on the file's name to determine its content. For SEO purposes, some filenames remain unchanged, even as their content changes over time.
- **A folder is not a platform.** Subdirectories organise nothing but themselves — some `version-3.0/*` files are iOS-only. Cross-check the sidebars before reverting or deleting any file under `src/content/docs`.
- Some legacy articles are explicitly excluded from the sidebar. Such articles are available via direct link but can't be discovered spontaneously — which is exactly why a link that resolves can still be a dead end, and why `npm run check-links` cannot catch it.

### Images

**In practice, almost all screenshots live in `src/assets/shared/img/`** (including subdirectories like `flow-builder/`). When looking for new screenshots, check here first.

- Article-specific: `src/assets/{article-name}/image.png` (rarely used)
- Shared: `src/assets/shared/img/image.png`
- Use `<ZoomImage id="image.png" width="700px" alt="desc" />` (preferred)
- Legacy `<Zoom><img src={require(...)}/></Zoom>` still works

### Localization

Translated versions of articles live in `src/locales/{locale}/` (e.g., `src/locales/zh/`, `src/locales/tr/`). A GitHub Actions workflow automatically translates and updates them on every push to `main` — do not edit them as part of normal doc work. Edit only the source English file in `src/content/docs/`. The only exception is targeted manual corrections requested explicitly (e.g., fixing a translation error a native speaker caught).

### Path aliases

- `@site` → repo root
- `@components` → `src/components/`

## Key components

The components below are **auto-registered** in `src/pages/[...slug].astro` — no `import` statement needed in articles. Other components in `src/components/` require an explicit import (see pattern at the bottom of this section).

| Component | Usage |
|-----------|-------|
| `ZoomImage` | `<ZoomImage id="file.png" width="700px" alt="..." />` — add `float="right"` or `float="left"` to float image beside text |
| `Tabs`/`TabItem` | `<Tabs groupId="platform"><TabItem value="ios" label="iOS">...</TabItem></Tabs>` |
| `Details` | `<Details summary="Title">content</Details>`, or `<Details><summary>Title</summary>…`. A plain `<details>` element renders through the same component, so all three shapes look identical — there is one collapsible design, in `Details.astro`. Add `defaultOpen` to start it expanded. |
| `InlineTooltip` | `<InlineTooltip tooltip="hover text">[link](page.md)</InlineTooltip>` |
| `CustomDocCardList` | `<CustomDocCardList ids={['id1','id2']} />` or `<CustomDocCardList />` for auto |
| `Button` | `<Button id="page-id">Text</Button>` or `<Button href="url">Text</Button>` |
| `Inline` | `<Inline id="icon.svg" alt="..." />` — inline SVG/image icon from `src/assets/Inline/` |
| `Callout` (remark plugin) | `:::note`, `:::tip`, `:::info`, `:::warning`, `:::danger`, `:::important`, `:::link` |

Import path pattern: `import Component from '@site/src/components/Component.astro';`

## Reusable content snippets

`src/components/reusable/` contains MDX snippets that several articles render, to avoid duplicating content.

**Rendering a snippet: never import it, just use it.** Both doc routes glob `reusable/*.{md,mdx}` and expose each snippet as a component named after its file, so `<SampleApp />` resolves on its own; the locale route overlays `src/locales/<locale>/reusable/` so localized pages get the translated copy automatically. An explicit `import` shadows that registration and pins the article to one exact path — Vite does no `.md`/`.mdx` substitution — which is what turned a snippet rename into an 800-file edit before these imports were removed. `translate.mjs` carries no snippet import into a locale file that the English source doesn't have, so leaving them out keeps locales clean too.

Three rules for snippet files:

- **A snippet that renders a callout must be `.mdx`, and must use the `<Callout>` tag directly** — `import Callout from '../Callout.astro';` in the snippet, then `<Callout type="note">…</Callout>`. See `BuilderDeprecation.mdx` for the model. A `.md` snippet loses its callout box entirely: Astro compiles `.md` through the plain-markdown pipeline, which can't render the JSX node `remark-aside` emits from `:::`, so only the inner text survives.
- **Inside a snippet, the reverse holds: it must import every component it renders.** A snippet is rendered as a child of the article, and imported MDX does not inherit the route's `<Content components>` prop — so `Callout`, `Zoom`, `Details`, and `MDXImage` each need their own import in the snippet file. Watch for the three a remark plugin introduces without you typing the name: `:::` becomes `Callout`, `<details>` becomes `Details`, and `<img>` becomes `MDXImage`. `scripts/lint-mdx.mjs` enforces all of this and repairs it with `--fix`.
- Add `no_index: true` frontmatter, following the existing snippets.

## Remark/Rehype plugins (`src/plugins/`)

- `remark-aside` — converts `:::note`/`:::tip`/etc. fenced directives into `<Callout>` components
- `remark-transform-links` — strips `.md`/`.mdx` extensions from internal links
- `remark-transform-require` — handles legacy `require()` image imports
- `remark-normalize-details` — renames a plain `<details>` element to `<Details>` so every collapsible renders through one component
- `remark-heading-id` — auto-generates heading anchors
- `remark-strip-imports` — removes imports during markdown export
- `remark-strip-highlight-comments` — cleans highlight syntax

## Markdown conventions

- Use `-` for unordered lists, not `*`.

## Writing rules (always apply)

These apply to every doc edit, however small. They are the rules no linter can check — the mechanical ones (banned words, overclaim candidates, vague verbs, spatial metaphors, roadmap leaks) run automatically via `scripts/lint-prose.mjs` on each MDX edit. Its hits are candidates for judgment, not errors. For a full review or a new article, invoke the `editor` skill, which carries the complete rule set and a pass order.

- **Every referent must resolve.** For each `this`, `that`, `it`, `the X` on first mention, count, and temporal word (`already`, `later`, `still`) — can the reader name what it points at? This is the most common defect by a wide margin.
- **After any edit, re-read the whole bullet or paragraph** from the start, not just the clause you changed. Fixing a clause in isolation is how the next defect gets introduced.
- **Instructions run Goal → Location → Action**, one location per sentence. ✅ "To create a paywall, in the **Paywalls** section, click **Create paywall**."
- **Steps state their purpose, not the penalty for skipping them.** ✅ "To show the copy to users, add it to a placement." Warnings are the exception — those state the consequence.
- **Names come from the source, not from memory.** Grep the frontend for a UI label before bolding it, and quote typos as-is. Use the vendor's own noun. Never a competitor's word — `entitlements` is RevenueCat's; Adapty says **access levels**.
- **Don't document what the UI already says, and don't document a bug.** Skip "click **Save** to save"; keep only the scope or limit the control doesn't advertise. If behavior is broken, write the prescription ("Don't archive a live flow — remove it from every placement first"), not the defect.

## Code blocks

````markdown
```swift title="MyApp.swift" {2,4-6}
// Line highlighting and title supported via Shiki transformers
```
````

## Learning and Memory Management

- YOU MUST use the journal tool frequently to capture technical insights, failed approaches, and user preferences
- Before starting complex tasks, search the journal for relevant past experiences and lessons learned
- Document architectural decisions and their outcomes for future reference
- Track patterns in user feedback to improve collaboration over time
- When you notice something that should be fixed but is unrelated to your current task, document it in your journal rather than fixing it immediately

## Styling architecture

### CSS files

| File | Role |
|------|------|
| `src/styles/global.css` | **Primary stylesheet.** Tailwind import, theme variables (`@theme`), light/dark CSS custom properties, all design block styles (code blocks, details, callouts, tables, zoom images, heading anchors, task lists, highlight lines) |
| `src/css/custom.css` | Legacy Docusaurus-era variables (`--purplePrimary`, `--ifm-*`). Still loaded via `src/css/custom.scss` but superseded by `global.css` for new work |
| `src/css/api-reference.css` | Styles for the Stoplight API reference pages |
| `src/css/fonts/fonts.css` | `@font-face` declarations for Inter, Roboto, Fira Code |

### Theme system

- Light/dark mode toggled via `.dark` class on `<html>` (persisted in `localStorage`)
- All design tokens are CSS custom properties defined in `:root` (light) and `.dark` (dark) blocks in `global.css`
- Key tokens: `--bg-primary`, `--bg-secondary`, `--text-primary`, `--text-secondary`, `--accent-primary` (`#5c13ff` light / `#a78bfa` dark), `--border-primary`, `--shadow-sm/md/lg`
- Brand color: `--color-primary-500: #6720ff`
- Fonts: Inter (body), Fira Code (code blocks)
- Tailwind 4 configured in `global.css` via `@theme` block (custom font sizes, line heights, brand colors)

### Design blocks in `global.css`

These are the styled visual blocks that articles use. Most of their CSS lives in `global.css`; the two component-scoped exceptions are noted below.

- **Code blocks** (`.code-block-wrapper`) — title bar, copy button, Shiki syntax highlighting, dark mode color inversion, diff styling, line highlighting (`.highlight-line`)
- **Callouts** — rendered by remark-aside plugin into `<Callout>` (note/tip/info/warning/danger/important/link). Styles are scoped inside `src/components/Callout.astro`, not `global.css`
- **Details/Accordion** — collapsible sections with a tinted summary bar and chevron. Styles are scoped in `src/components/Details.astro`, not `global.css` (see the `Details` row in the components table)
- **Ordered lists** (`.docs-prose ol`) — circular step-number bullets (Mintlify-inspired)
- **Zoom images** (`.zoom-wrapper`, `.zoom-image`) — bordered, shadowed, hover-scale images
- **Tables** — word-break handling, code wrapping within cells
- **Heading anchors** (`.heading-anchor`) — hover-revealed link icon
- **Task lists** (`li:has(input[type="checkbox"])`) — checkbox styling

### Layout

- Single layout: `src/layouts/DocsLayout.astro` — assembles Header, Sidebar, Breadcrumbs, article content, TableOfContents, FeedbackForm, Footer
- Layout applies Tailwind prose classes (`.docs-prose`) to article content
- Right column (ToC + feedback) visible at `xl:` (1280px+), sidebar at `lg:` (1024px+)
- API reference pages use `isFullWidth` mode (no sidebar/ToC)

### Page routing

- `src/pages/[...slug].astro` — main catch-all route for doc articles
- `src/pages/[slug].astro` + `src/pages/[slug]/[...rest].astro` — API reference pages

### UI components (non-content)

These are layout/interactive components in `src/components/`, not imported by article authors:

- `Header.astro` — top nav with platform switcher, search, theme toggle
- `Sidebar.astro` / `SidebarItem.astro` — left navigation tree
- `PlatformSwitcher.astro` — SDK platform selector in header
- `Search.astro` — Algolia-powered search
- `ThemeToggle.astro` — light/dark mode switch
- `TableOfContents.astro` — right-column heading navigation
- `FeedbackForm.astro` — page feedback widget
- `Breadcrumbs.astro` — breadcrumb trail
- `Footer.astro` — page footer
- `ZoomLightbox.astro` — fullscreen image lightbox overlay
- `Calculator.tsx` — interactive React calculator widget
- `ApiReferencePage.astro` — Stoplight Elements API docs wrapper

For CSS/layout bugs, inspect the DOM structure and existing styles before proposing a fix. Do not guess at specificity or inheritance.

## Build pipeline details

- `prebuild` copies shared assets (images, API specs) to `public/`
- `build:md` generates plain markdown exports and LLM-optimized files (`scripts/generate-md.mjs`, `generate-llms.mjs`, `generate-platform-llms-full.mjs`)
- Production build runs `astro build` then `build:md:prod` (outputs to `./build/`)

## Reference

Comprehensive component examples and writing guidelines: `TECH_WRITERS_README.md`

## Design Context

### Users
Mobile developers (iOS, Android, React Native, Flutter, Unity, KMP, Capacitor) integrating Adapty's in-app purchase and subscription SDK. Technical, time-conscious, task-focused — they arrive to find an answer and get unblocked.

### Brand Personality
**Reliable, clean, developer-first.** Direct and precise. No marketing fluff. Trust is earned by making the right answer obvious and getting out of the developer's way.

### Emotional Goals
Developers should feel **confident** (know exactly what to do), **fast** (find things without hunting), and **welcomed** (smooth onboarding, low barrier to entry).

### Reference
**Stripe Docs** — authoritative, information-dense but scannable, strong typographic hierarchy, no decoration for decoration's sake.

### Anti-References
No heavy animations, neon gradients, or glassmorphism. No generic corporate feel. No cluttered sidebars or competing CTAs. No playful/toy-like UI — this is a technical reference.

### Design Principles
1. **Clarity over cleverness** — every decision serves comprehension, nothing else
2. **Scannability first** — headers, code blocks, callouts, and step numbers are navigation anchors
3. **Trust through restraint** — one brand color (`#6720ff`), subtle shadows, consistent spacing
4. **Code is first-class** — code blocks, syntax highlighting, copy buttons must be beautiful in both themes
5. **Dark mode is equal, not secondary** — full design target, no contrast or legibility compromises
