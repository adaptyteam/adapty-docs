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
keywords: ['array', 'of', 'keywords']
rank: 100          # Sort priority, default 50
customSlug: "override-url"  # Optional URL override
```

### Navigation

Sidebars are defined per platform in `src/data/sidebars/*.json` (ios, android, react-native, flutter, unity, kmp, capacitor, tutorial, api). Each entry references an article by its filename-based `id`. To add an article to navigation, add its id to the appropriate sidebar JSON.

### Images

- Article-specific: `src/assets/{article-name}/image.png`
- Shared: `src/assets/shared/image.png`
- Use `<ZoomImage id="image.png" width="700px" alt="desc" />` (preferred)
- Legacy `<Zoom><img src={require(...)}/></Zoom>` still works

### Path aliases

- `@site` → repo root
- `@components` → `src/components/`

## Key components

| Component | Import required? | Usage |
|-----------|-----------------|-------|
| `ZoomImage` | Yes | `<ZoomImage id="file.png" width="700px" alt="..." />` |
| `Tabs`/`TabItem` | Yes | `<Tabs groupId="platform"><TabItem value="ios" label="iOS">...</TabItem></Tabs>` |
| `Details` | Yes | `<Details summary="Title">content</Details>` |
| `InlineTooltip` | Yes | `<InlineTooltip tooltip="hover text">[link](page.md)</InlineTooltip>` |
| `CustomDocCardList` | Yes | `<CustomDocCardList ids={['id1','id2']} />` or `<CustomDocCardList />` for auto |
| `Button` | **No** (auto-registered) | `<Button id="page-id">Text</Button>` or `<Button href="url">Text</Button>` |
| `Callout` | **No** (remark plugin) | `:::note`, `:::tip`, `:::info`, `:::warning`, `:::danger`, `:::important`, `:::link` |

Import path pattern: `import Component from '@site/src/components/Component.astro';`

## Reusable content snippets

`src/components/reusable/` contains MDX snippets that can be imported into multiple articles to avoid content duplication.

## Remark/Rehype plugins (`src/plugins/`)

- `remark-aside` — converts `:::note`/`:::tip`/etc. fenced directives into `<Callout>` components
- `remark-transform-links` — strips `.md`/`.mdx` extensions from internal links
- `remark-transform-require` — handles legacy `require()` image imports
- `remark-transform-details` — processes `<Details>` components
- `remark-heading-id` — auto-generates heading anchors
- `remark-strip-imports` — removes imports during markdown export
- `remark-strip-highlight-comments` — cleans highlight syntax

## Code blocks

````markdown
```swift title="MyApp.swift" {2,4-6}
// Line highlighting and title supported via Shiki transformers
```
````

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

These are the styled visual blocks that articles use — their CSS lives entirely in `global.css`:

- **Code blocks** (`.code-block-wrapper`) — title bar, copy button, Shiki syntax highlighting, dark mode color inversion, diff styling, line highlighting (`.highlight-line`)
- **Callouts** — rendered by remark-aside plugin into `<Callout>` (note/tip/info/warning/danger/important/link)
- **Details/Accordion** (`details`/`summary`) — collapsible sections with chevron animation
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

## Build pipeline details

- `prebuild` copies shared assets (images, API specs) to `public/`
- `build:md` generates plain markdown exports and LLM-optimized files (`scripts/generate-md.mjs`, `generate-llms.mjs`, `generate-platform-llms-full.mjs`)
- Production build runs `astro build` then `build:md:prod` (outputs to `./build/`)

## Reference

Comprehensive component examples and writing guidelines: `TECH_WRITERS_README.md`
