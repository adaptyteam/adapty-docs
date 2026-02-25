# API Spec Localization Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add locale-prefixed API reference routes (e.g., `/zh/api-web`) that render Stoplight Elements against a machine-translated YAML spec, using the same translate.mjs automation as MDX articles.

**Architecture:** `translate.mjs` gains a `--api-specs` mode that sends full English YAML to Claude with YAML-specific rules and writes `{name}.{lang}.yaml` alongside the English originals in `src/api-reference/specs/`. The existing prebuild step already copies everything in that directory to `public/api-specs/`, so no pipeline changes are needed. Two new Astro page files mirror the existing English API routes but with a `[locale]` prefix, resolving the spec URL to the localized YAML when it exists and falling back to English otherwise.

**Tech Stack:** Node.js ESM (translate script), Astro 5 static pages, Stoplight Elements web component, Anthropic SDK (already a dependency).

---

## Task 1: Add `--api-specs` support to `translate.mjs`

**Files:**
- Modify: `scripts/translate.mjs`

This is the only file that changes in the translation layer. We add four things: a constant, a CLI flag, a new system prompt builder, and a new per-language function. Finally, we wire the function into the existing `main()` loop.

**Step 1: Add the `API_SPECS_DIR` constant**

Open `scripts/translate.mjs`. After the existing directory constants at the top (lines 22–25), add:

```js
const API_SPECS_DIR  = path.resolve(__dirname, '../src/api-reference/specs');
```

**Step 2: Add `flagApiSpecs` to the CLI arg parsing block**

After the existing `const flagIncremental = args.includes('--incremental');` line (around line 41), add:

```js
const flagApiSpecs    = args.includes('--api-specs');
```

**Step 3: Add the YAML system prompt builder**

After the existing `buildSystemPrompt()` function (around line 108), add:

```js
function buildApiSpecSystemPrompt(targetLanguage) {
  return `You are a technical documentation translator. Translate the OpenAPI YAML specification below from English to ${targetLanguage}.

PRESERVE exactly (never translate):
- All YAML keys and property names
- $ref values, operationId values, server url values
- Security scheme names and their values
- enum values, format values, type values, pattern values
- example and examples field values
- HTTP status codes
- Tag name values (under "tags: - name:") — they are used as internal anchors by Stoplight Elements
- All technical identifiers, punctuation tokens, and formatting characters

TRANSLATE:
- summary fields under operations, parameters, responses, and schemas
- description fields under operations, parameters, responses, schemas, and info
- info.title and info.description
- Tag description fields (not name fields)
- x-* extension fields whose values are human-readable prose sentences

Output valid YAML only. No explanation, no commentary, no markdown fences wrapping the output.`;
}
```

**Step 4: Add `translateApiSpecsForLang()`**

After the existing `translateSidebarsForLang()` function, add:

```js
async function translateApiSpecsForLang(client, lang, localesDir, hashesDir, targetLanguage, glossary, tag) {
  const apiHashesDir = path.resolve(hashesDir, 'api-specs');
  const systemPrompt = buildApiSpecSystemPrompt(targetLanguage) + glossary;

  // Collect English source specs only — exclude already-localized files.
  // English files have exactly one dot: "adapty-api.yaml" → ["adapty-api","yaml"] (length 2).
  // Localized files have two dots: "adapty-api.zh.yaml" → length 3.
  const entries = await fs.readdir(API_SPECS_DIR, { withFileTypes: true });
  const specFiles = entries
    .filter(e => e.isFile() && e.name.endsWith('.yaml') && e.name.split('.').length === 2)
    .map(e => ({ name: e.name, full: path.join(API_SPECS_DIR, e.name), basename: path.basename(e.name, '.yaml') }));

  const toTranslate = [];
  for (const spec of specFiles) {
    const outputPath = path.join(API_SPECS_DIR, `${spec.basename}.${lang}.yaml`);

    if (flagIncremental || flagAll) {
      const currentHash = await fileHash(spec.full);
      const storedHash  = await getStoredHash(spec.basename, apiHashesDir);
      if (!flagAll && storedHash === currentHash) continue;
      toTranslate.push(spec);
    } else if (fileId) {
      if (spec.basename === fileId) toTranslate.push(spec);
    } else {
      try { await fs.access(outputPath); } catch { toTranslate.push(spec); }
    }
  }

  if (toTranslate.length === 0) {
    console.log(`${tag} API specs: all up to date.`);
    return;
  }

  console.log(`${tag} ${toTranslate.length} API spec(s) to translate.`);

  for (const spec of toTranslate) {
    try {
      const content = await fs.readFile(spec.full, 'utf-8');
      const response = await client.messages.create({
        model: 'claude-sonnet-4-6',
        max_tokens: 16384,
        system: systemPrompt,
        messages: [{ role: 'user', content }],
      });
      const translated = response.content[0].text;
      const outputPath = path.join(API_SPECS_DIR, `${spec.basename}.${lang}.yaml`);
      await fs.writeFile(outputPath, translated, 'utf-8');

      const hash = await fileHash(spec.full);
      await fs.mkdir(apiHashesDir, { recursive: true });
      await fs.writeFile(
        path.join(apiHashesDir, `${spec.basename}.json`),
        JSON.stringify({ hash }),
        'utf-8'
      );
      console.log(`  ✓ api-spec:${spec.basename}`);
    } catch (err) {
      console.error(`  ✗ api-spec:${spec.basename}: ${err.message}`);
    }
  }
}
```

**Step 5: Wire into `main()`**

Inside `main()`, inside the `for (const currentLang of langs)` loop, after the existing `translateSidebarsForLang(...)` call (around line 177), add:

```js
    if (flagApiSpecs || flagIncremental) {
      await translateApiSpecsForLang(client, currentLang, localesDir, hashesDir, targetLanguage, glossary, tag);
    }
```

**Step 6: Verify manually**

```bash
ANTHROPIC_API_KEY=sk-... node scripts/translate.mjs --lang zh --api-specs --file web-api
```

Expected output:
```
[translate:zh] 1 API spec(s) to translate.
  ✓ api-spec:web-api
```

Expected file created: `src/api-reference/specs/web-api.zh.yaml`

Open it and confirm: YAML keys are in English, `summary` and `description` values are in Chinese, `operationId` values and `$ref` values are untouched.

**Step 7: Run for all specs**

```bash
ANTHROPIC_API_KEY=sk-... node scripts/translate.mjs --lang zh --api-specs
```

Expected: all three specs translated (`adapty-api.zh.yaml`, `web-api.zh.yaml`, `export-analytics-api.zh.yaml`).

**Step 8: Commit**

```bash
git add scripts/translate.mjs
git commit -m "feat: add --api-specs translation mode to translate.mjs"
```

---

## Task 2: Add locale-prefixed API reference top-level page

**Files:**
- Create: `src/pages/[locale]/[slug].astro`

This mirrors `src/pages/[slug].astro` but generates paths for `SUPPORTED_LOCALES × apiConfig` and resolves the spec URL to the localized YAML when available.

**Step 1: Create the file**

Create `src/pages/[locale]/[slug].astro` with the following content:

```astro
---
import fs from 'node:fs';
import path from 'node:path';
import DocsLayout from '../../layouts/DocsLayout.astro';
import ApiReferencePage from '../../components/ApiReferencePage.astro';
import apiConfig from '../../api-reference/config.json';
import { SUPPORTED_LOCALES } from '../../data/locales';

export async function getStaticPaths() {
  const paths = [];
  for (const locale of SUPPORTED_LOCALES) {
    for (const api of apiConfig) {
      // Resolve localized spec file, fall back to English
      const specBasename = api.specFile.replace(/\.yaml$/, '');
      const localizedSpecFile = `${specBasename}.${locale}.yaml`;
      const localizedSpecPath = path.join(process.cwd(), 'public', 'api-specs', localizedSpecFile);
      const specFile = fs.existsSync(localizedSpecPath) ? localizedSpecFile : api.specFile;

      paths.push({
        params: { locale, slug: api.slug },
        props: { api, locale, specFile },
      });
    }
  }
  return paths;
}

const { api, locale, specFile } = Astro.props;
const { slug } = Astro.params;

const specUrl = api.specUrl || `${import.meta.env.BASE_URL}/api-specs/${specFile}`.replace(/\/+/g, '/');
const basePath = `${import.meta.env.BASE_URL}/${locale}/${slug}`.replace(/\/+/g, '/');

const breadcrumbs = [
  { label: 'Home', href: `${import.meta.env.BASE_URL}/`.replace(/\/+/g, '/') },
  { label: api.name }
];
---

<DocsLayout
  title={api.name}
  description={`${api.name} reference documentation`}
  keywords={api.name}
  rank={70}
  sidebarData={null}
  currentPlatformId="api"
  currentSlug={slug}
  currentLocale={locale}
  breadcrumbs={breadcrumbs}
  isFullWidth={true}
>
  <ApiReferencePage api={api} slug={`${locale}/${slug}`} specUrl={specUrl} basePath={basePath} />
</DocsLayout>
```

**Step 2: Verify the build compiles**

```bash
npm run dev
```

Expected: dev server starts with no errors. Visit `http://localhost:4321/docs/zh/api-web` — should show the Stoplight Elements interface loaded with the Chinese YAML.

**Step 3: Confirm spec URL in browser**

Open DevTools → Network, filter by `.yaml`. Confirm the request is for `web-api.zh.yaml` (not `web-api.yaml`).

If `web-api.zh.yaml` doesn't exist yet in `public/api-specs/` (prebuild hasn't run since Task 1), run:

```bash
npm run prebuild
```

Then restart dev server.

**Step 4: Commit**

```bash
git add "src/pages/[locale]/[slug].astro"
git commit -m "feat: add locale-prefixed API reference top-level pages"
```

---

## Task 3: Add locale-prefixed per-operation pages

**Files:**
- Create: `src/pages/[locale]/[slug]/[...rest].astro`

This mirrors `src/pages/[slug]/[...rest].astro`. It generates one page per API operation per locale for SEO, loading operation metadata from the localized YAML.

**Step 1: Create the directory**

```bash
mkdir -p "src/pages/[locale]/[slug]"
```

**Step 2: Create the file**

Create `src/pages/[locale]/[slug]/[...rest].astro`:

```astro
---
import fs from 'node:fs';
import path from 'node:path';
import DocsLayout from '../../../layouts/DocsLayout.astro';
import ApiReferencePage from '../../../components/ApiReferencePage.astro';
import apiConfig from '../../../api-reference/config.json';
import { SUPPORTED_LOCALES } from '../../../data/locales';

export async function getStaticPaths() {
  function parseOperations(specContent) {
    const lines = specContent.split('\n');
    const operations = [];
    let currentPath = '';

    for (let i = 0; i < lines.length; i++) {
      const pathMatch = lines[i].match(/^  (\/\S+):\s*$/);
      if (pathMatch) { currentPath = pathMatch[1]; continue; }

      const methodMatch = lines[i].match(/^\s{4}(get|post|put|patch|delete):\s*$/);
      if (!methodMatch) continue;

      const method = methodMatch[1].toUpperCase();
      let operationId = '', summary = '', description = '', tag = '';

      for (let j = i + 1; j < lines.length; j++) {
        if (/^  \/\S+:\s*$/.test(lines[j]) || /^\s{4}(get|post|put|patch|delete):\s*$/.test(lines[j])) break;

        const opIdMatch = lines[j].match(/^\s{6}operationId:\s*(\S+)/);
        if (opIdMatch) { operationId = opIdMatch[1]; continue; }

        const sumMatch = lines[j].match(/^\s{6}summary:\s*(.+)/);
        if (sumMatch && !summary) { summary = sumMatch[1].trim(); continue; }

        const descMatch = lines[j].match(/^\s{6}description:\s*(.+)/);
        if (descMatch && !description) {
          const rawValue = descMatch[1].trim();
          if (/^[|>][+\-\d]*\s*$/.test(rawValue)) {
            const contentLines = [];
            while (j + 1 < lines.length) {
              const nextLine = lines[j + 1];
              if (!/^\s{7,}\S/.test(nextLine) && !/^\s*$/.test(nextLine)) break;
              if (/^\s{7,}\S/.test(nextLine)) contentLines.push(nextLine.trim());
              j++;
            }
            const fullText = contentLines.join(' ');
            const sentenceMatch = fullText.match(/^(.+?\.)\s/);
            description = sentenceMatch ? sentenceMatch[1] : fullText;
          } else {
            description = rawValue;
          }
          continue;
        }

        const tagMatch = lines[j].match(/^\s{8}- ([A-Za-z][\w\s]*)/);
        if (tagMatch && !tag && lines[j - 1]?.match(/^\s{6}tags:\s*$/)) {
          tag = tagMatch[1].trim();
        }
      }

      if (operationId) {
        operations.push({ operationId, summary, description, method, path: currentPath, tag });
      }
    }
    return operations;
  }

  const paths = [];

  for (const locale of SUPPORTED_LOCALES) {
    for (const api of apiConfig) {
      // Resolve localized spec, fall back to English
      const specBasename = api.specFile.replace(/\.yaml$/, '');
      const localizedSpecFile = `${specBasename}.${locale}.yaml`;
      const localizedSpecPath = path.join(process.cwd(), 'public', 'api-specs', localizedSpecFile);
      const specFile = fs.existsSync(localizedSpecPath) ? localizedSpecFile : api.specFile;

      const specPath = path.join(process.cwd(), 'public', 'api-specs', specFile);
      const specContent = fs.readFileSync(specPath, 'utf-8');
      const operations = parseOperations(specContent);

      for (const op of operations) {
        paths.push({
          params: { locale, slug: api.slug, rest: `operations/${op.operationId}` },
          props: {
            api,
            locale,
            specFile,
            operationSummary: op.summary,
            operationDescription: op.description,
            operationMethod: op.method,
            operationPath: op.path,
            operationTag: op.tag,
          },
        });
      }
    }
  }

  return paths;
}

const { api, locale, specFile, operationSummary, operationDescription, operationMethod, operationPath } = Astro.props;
const { slug } = Astro.params;

const specUrl = api.specUrl || `${import.meta.env.BASE_URL}/api-specs/${specFile}`.replace(/\/+/g, '/');
const basePath = `${import.meta.env.BASE_URL}/${locale}/${slug}`.replace(/\/+/g, '/');

const title = operationSummary ? `${operationSummary} (API)` : api.name;
const description = operationDescription || '';
const keywords = operationSummary || '';

const breadcrumbs = [
  { label: 'Home', href: `${import.meta.env.BASE_URL}/`.replace(/\/+/g, '/') },
  { label: api.name, href: `${import.meta.env.BASE_URL}/${locale}/${slug}`.replace(/\/+/g, '/') },
  { label: operationSummary || 'Operation' }
];
---

<DocsLayout
  title={title}
  description={description}
  keywords={keywords}
  rank={70}
  sidebarData={null}
  currentPlatformId="api"
  currentSlug={slug}
  currentLocale={locale}
  breadcrumbs={breadcrumbs}
  isFullWidth={true}
>
  <div class="api-seo-content">
    {operationSummary && <h1>{operationSummary}</h1>}
    {operationMethod && operationPath && <p>{operationMethod} {operationPath}</p>}
    {operationDescription && <p>{operationDescription}</p>}
  </div>
  <ApiReferencePage api={api} slug={`${locale}/${slug}`} specUrl={specUrl} basePath={basePath} />
</DocsLayout>
```

**Step 3: Verify the build**

```bash
npm run dev
```

Expected: no build errors. Visit `http://localhost:4321/docs/zh/api-adapty/operations/createProfile` (replace `createProfile` with any real `operationId` from `adapty-api.yaml`). Should render the full Stoplight Elements view.

**Step 4: Confirm per-operation page title**

The `<title>` tag should show the translated Chinese operation summary — visible in the browser tab or DevTools → Elements → `<head>`.

**Step 5: Commit**

```bash
git add "src/pages/[locale]/[slug]/[...rest].astro"
git commit -m "feat: add locale-prefixed per-operation API reference pages"
```

---

## Task 4: End-to-end smoke test

**Step 1: Run a clean prebuild**

```bash
npm run prebuild
```

Expected: `public/api-specs/` now contains both English and localized YAML files:
```
public/api-specs/adapty-api.yaml
public/api-specs/adapty-api.zh.yaml
public/api-specs/web-api.yaml
public/api-specs/web-api.zh.yaml
public/api-specs/export-analytics-api.yaml
public/api-specs/export-analytics-api.zh.yaml
```

**Step 2: Check all three localized API top-level pages**

- `http://localhost:4321/docs/zh/api-web` — Web API in Chinese
- `http://localhost:4321/docs/zh/api-adapty` — Adapty API in Chinese
- `http://localhost:4321/docs/zh/api-export-analytics` — Analytics Export API in Chinese

Each should render Stoplight Elements with Chinese `summary` and `description` text in the sidebar and content area.

**Step 3: Check English pages are unchanged**

- `http://localhost:4321/docs/api-web` — still English, still works

**Step 4: Verify fallback behavior**

Temporarily rename `public/api-specs/web-api.zh.yaml` to `public/api-specs/web-api.zh.yaml.bak`, restart dev server, visit `/docs/zh/api-web`. Should silently fall back to English spec. Rename it back.
