import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import yaml from 'js-yaml';
import { LLM_SKILL_NOTE } from './llm-skill-note.mjs';
import { mergeSdkSidebars, renderMergedSdk } from './llms-sdk-merge.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SIDEBARS_DIR = path.resolve(__dirname, '../src/data/sidebars');
const DOCS_BASE = path.resolve(__dirname, '../src/content/docs');
const LOCALES_BASE_DIR = path.resolve(__dirname, '../src/locales');
const API_CONFIG = path.resolve(__dirname, '../src/api-reference/config.json');
const API_SPECS_DIR = path.resolve(__dirname, '../public/api-specs');
const PLATFORMS = JSON.parse(await fs.readFile(path.resolve(__dirname, '../src/data/platforms.json'), 'utf-8'));

// Get output dir from args or default to public
const targetDirName = process.argv[2] || '../public';
const OUTPUT_DIR = path.resolve(__dirname, targetDirName);

const BASE_URL = 'https://adapty.io/docs'; // Base URL for public links

// Mirrors the BUILD_LOCALES convention from src/data/locales.ts:
//   unset      → build all locales
//   "none"     → English only (skip locale llms generation)
//   "zh"       → only the listed locales (comma-separated)
const BUILD_LOCALES_ENV = (process.env.BUILD_LOCALES ?? '').trim();
function filterLocales(allAvailableLocales) {
    if (!BUILD_LOCALES_ENV) return allAvailableLocales;
    if (BUILD_LOCALES_ENV === 'none') return [];
    const requested = new Set(BUILD_LOCALES_ENV.split(',').map(s => s.trim()).filter(Boolean));
    return allAvailableLocales.filter(l => requested.has(l));
}

// Helper: Ensure directory exists
async function ensureDir(dir) {
    try {
        await fs.access(dir);
    } catch {
        await fs.mkdir(dir, { recursive: true });
    }
}

// Find a doc file by searching all subdirectories under DOCS_BASE
async function findDocFile(docId) {
    const filename = `${docId}.mdx`;
    async function search(dir) {
        const entries = await fs.readdir(dir, { withFileTypes: true });
        for (const entry of entries) {
            if (entry.isDirectory()) {
                const result = await search(path.join(dir, entry.name));
                if (result) return result;
            } else if (entry.name === filename) {
                return path.join(dir, entry.name);
            }
        }
        return null;
    }
    return search(DOCS_BASE);
}

// Check if a document is marked as draft
function isDraft(content) {
    const match = content.match(/^---\s*\n([\s\S]*?)\n---/);
    if (!match) return false;
    return /^draft:\s*true\s*$/m.test(match[1]);
}

// Check if a document is marked noindex — those pages are deliberately
// undiscoverable, so they stay out of the llms.txt index too.
function isNoindex(content) {
    const match = content.match(/^---\s*\n([\s\S]*?)\n---/);
    if (!match) return false;
    return /^noindex:\s*true\s*$/m.test(match[1]);
}

// Extract description from MDX frontmatter
function extractDescription(content) {
    const match = content.match(/^---\s*\n([\s\S]*?)\n---/);
    if (!match) return null;
    const fmMatch = match[1].match(/^description:\s*["']?(.*?)["']?\s*$/m);
    return fmMatch ? fmMatch[1] : null;
}

// Collect doc IDs from sidebar items recursively
function collectDocIds(items, ids) {
    for (const item of items) {
        if (item.type === 'category') {
            // A category can BE an article two ways: docusaurus-style
            // link {type:'doc'} or our sidebar shorthand - a bare `id`.
            if (item.link && item.link.type === 'doc') ids.add(item.link.id);
            else if (item.id) ids.add(item.id);
            if (item.items) collectDocIds(item.items, ids);
        } else if (item.type === 'doc' && item.id) {
            ids.add(item.id);
        }
    }
}

// Build a map of docId → description from all sidebar doc IDs
async function buildDescriptionMap(sidebarFiles) {
    const descriptions = new Map();
    // Doc ids to omit from the index entirely, as opposed to the draft skip
    // below, which only withholds a description and still lists the link.
    const noindexDocIds = new Set();

    const allDocIds = new Set();
    for (const file of sidebarFiles) {
        if (!file.endsWith('.json')) continue;
        const content = await fs.readFile(path.join(SIDEBARS_DIR, file), 'utf-8');
        const data = JSON.parse(content);
        const items = Array.isArray(data) ? data : [];
        collectDocIds(items, allDocIds);
    }

    for (const docId of allDocIds) {
        const filePath = await findDocFile(docId);
        if (filePath) {
            try {
                const content = await fs.readFile(filePath, 'utf-8');
                // Drop noindex documents from the index altogether
                if (isNoindex(content)) {
                    noindexDocIds.add(docId);
                    continue;
                }
                // Skip draft documents
                if (isDraft(content)) continue;
                const desc = extractDescription(content);
                if (desc) descriptions.set(docId, desc);
            } catch { /* skip */ }
        }
    }

    return { descriptions, allDocIds, noindexDocIds };
}

// Build a locale-specific description map. Reads each docId's translated
// `.mdx` from src/locales/<locale>/ and uses its description if present;
// falls back to the English description otherwise.
async function buildLocaleDescriptionMap(locale, allDocIds, englishDescriptions) {
    const descriptions = new Map(englishDescriptions);
    for (const docId of allDocIds) {
        for (const ext of ['mdx', 'md']) {
            const localePath = path.join(LOCALES_BASE_DIR, locale, `${docId}.${ext}`);
            try {
                const content = await fs.readFile(localePath, 'utf-8');
                const desc = extractDescription(content);
                if (desc) descriptions.set(docId, desc);
                break;
            } catch { /* try next extension */ }
        }
    }
    return descriptions;
}

// Load translated sidebar labels for a locale. Mirrors the lookup in
// src/pages/[locale]/[...slug].astro: keyed by either doc id or the
// English category label.
async function loadSidebarLabels(locale) {
    const labelsPath = path.join(LOCALES_BASE_DIR, locale, '_sidebar-labels.json');
    try {
        const raw = await fs.readFile(labelsPath, 'utf-8');
        return JSON.parse(raw);
    } catch {
        return {};
    }
}

// Build a map of API slug → { name, operations[] } from the api-reference
// config + raw OpenAPI specs. Each operation carries enough metadata for
// llms.txt to render `METHOD path — summary` lines linking at .md exports
// generated by `[slug]/operations/[op].md.ts`. When `locale` is provided,
// prefers a locale-suffixed spec file (e.g. `api-web.zh.yaml`) so the
// rendered operation summaries match the translated API md exports;
// falls back to the English spec when no translation exists.
async function loadApiCatalog(locale) {
    const catalog = new Map();
    let configEntries;
    try {
        configEntries = JSON.parse(await fs.readFile(API_CONFIG, 'utf-8'));
    } catch (err) {
        console.warn(`[llms] could not read api-reference config: ${err.message}`);
        return catalog;
    }

    async function specPathFor(specFile) {
        if (locale) {
            const localized = specFile.replace(/\.yaml$/, `.${locale}.yaml`);
            const localizedPath = path.join(API_SPECS_DIR, localized);
            try {
                await fs.access(localizedPath);
                return localizedPath;
            } catch { /* fall through to English */ }
        }
        return path.join(API_SPECS_DIR, specFile);
    }

    for (const entry of configEntries) {
        const specPath = await specPathFor(entry.specFile);
        try {
            const raw = await fs.readFile(specPath, 'utf-8');
            const doc = yaml.load(raw);
            const operations = [];
            const tagOrder = [];
            const tagOps = new Map();

            for (const [pathStr, item] of Object.entries(doc.paths ?? {})) {
                if (!item || typeof item !== 'object') continue;
                for (const verb of ['get', 'post', 'put', 'patch', 'delete']) {
                    const op = item[verb];
                    // Skip operations marked internal — they aren't rendered on the
                    // HTML side either (see lib/model.ts → isInternal).
                    if (!op || op['x-internal'] === true) continue;
                    if (!op.operationId) continue;
                    const tag = Array.isArray(op.tags) && op.tags.length > 0 ? op.tags[0] : undefined;
                    operations.push({
                        operationId: op.operationId,
                        method: verb.toUpperCase(),
                        path: pathStr,
                        summary: op.summary ?? op.operationId,
                        deprecated: !!op.deprecated,
                        tag,
                    });
                    if (tag) {
                        if (!tagOps.has(tag)) { tagOps.set(tag, []); tagOrder.push(tag); }
                        tagOps.get(tag).push(op.operationId);
                    }
                }
            }

            catalog.set(`/${entry.slug}`, {
                name: entry.name,
                slug: entry.slug,
                description: doc.info?.description ?? '',
                operations,
                tagOrder,
                tagOps,
            });
        } catch (err) {
            console.warn(`[llms] could not load spec ${entry.specFile}: ${err.message}`);
        }
    }
    return catalog;
}

// Render an API spec entry inline (used when a sidebar `link` points at an
// API slug). Emits the root .md link, then a tag-grouped list of operation
// .md links so an LLM can fetch the index and follow each method directly.
// `urlPrefix` is `''` for English or `/<locale>` for localized indexes —
// the locale API .md exports are produced by `[locale]/[slug].md.ts` and
// `[locale]/[slug]/operations/[op].md.ts`.
function renderApiEntry(api, indent, urlPrefix, titlesOnly = false) {
    const lines = [];
    const summary = titlesOnly ? '' : `: ${api.description.split('\n')[0].trim() || 'API specification'}`;
    lines.push(`${indent}- [${api.name} — API reference](${BASE_URL}${urlPrefix}/${api.slug}.md)${summary}`);

    const opLine = (op, prefix) => {
        const flag = op.deprecated ? ' _(deprecated)_' : '';
        return `${prefix}- \`${op.method} ${op.path}\` — [${op.summary}](${BASE_URL}${urlPrefix}/${api.slug}/operations/${op.operationId}.md)${flag}`;
    };

    // The combined llms.txt lists each API's reference page only; the
    // operation list lives in api-llms.txt.
    if (titlesOnly) return lines.join('\n') + '\n';

    if (api.tagOrder.length === 0) {
        for (const op of api.operations) lines.push(opLine(op, `${indent}  `));
    } else {
        const seen = new Set();
        for (const tag of api.tagOrder) {
            lines.push(`${indent}  - **${tag}**`);
            for (const opId of api.tagOps.get(tag)) {
                const op = api.operations.find(o => o.operationId === opId);
                if (op) { lines.push(opLine(op, `${indent}    `)); seen.add(opId); }
            }
        }
        const rest = api.operations.filter(o => !seen.has(o.operationId));
        if (rest.length > 0) {
            lines.push(`${indent}  - **Other**`);
            for (const op of rest) lines.push(opLine(op, `${indent}    `));
        }
    }
    return lines.join('\n') + '\n';
}

// Translate a sidebar label/id using the locale's _sidebar-labels.json.
// Falls back to the English label/id if no translation exists.
function translateLabel(item, labels) {
    const id = item.id || item.link?.id;
    return (id && labels[id]?.value)
        || (item.label && labels[item.label]?.value)
        || item.label
        || id;
}

// Recursive function to parse sidebar items.
// `ctx` carries: { descriptions, noindexDocIds, apiCatalog, urlPrefix, labels }
//   - urlPrefix: '' for English, '/<locale>' for localized indexes
//   - labels: doc-id → { value } map from _sidebar-labels.json (empty for English)
//   - noindexDocIds: doc ids whose English source is `noindex: true`; omitted
//     from every language's index, since the translation inherits the flag.
// API spec links use the same urlPrefix because `[locale]/[slug].md.ts`
// emits the locale-prefixed exports too.
function parseItems(items, ctx, depth = 0) {
    let output = '';
    const indent = '  '.repeat(depth);
    const { descriptions, apiCatalog, urlPrefix, labels } = ctx;
    const noindexDocIds = ctx.noindexDocIds ?? new Set();

    for (const item of items) {
        if (item.type === 'category') {
            // Add Category Header
            const lbl = translateLabel(item, labels);
            if (lbl) {
                if (depth === 0) {
                    output += `\n### ${lbl}\n\n`;
                } else {
                    output += `${indent}- **${lbl}**\n`;
                }
            }

            // If the category itself is an article (docusaurus link {type:'doc'}
            // or our sidebar shorthand - a bare `id`), add it as a doc item too.
            const categoryDocId = item.link && item.link.type === 'doc' ? item.link.id : item.id;
            if (categoryDocId && !noindexDocIds.has(categoryDocId)) {
                const desc = descriptions.get(categoryDocId);
                const suffix = desc ? `: ${desc}` : '';
                output += `${indent}  - [Overview](${BASE_URL}${urlPrefix}/${categoryDocId}.md)${suffix}\n`;
            }

            // Process children
            if (item.items) {
                output += parseItems(item.items, ctx, depth + 1);
            }

        } else if (item.type === 'doc') {
            if (noindexDocIds.has(item.id)) continue;
            const desc = descriptions.get(item.id);
            const suffix = desc ? `: ${desc}` : '';
            const lbl = translateLabel(item, labels);
            output += `${indent}- [${lbl || item.id}](${BASE_URL}${urlPrefix}/${item.id}.md)${suffix}\n`;
        } else if (item.type === 'link') {
            // If the link points at one of our API spec roots, expand it inline:
            // emit the .md root + a flat list of operation .md links so LLMs
            // see the whole API surface from this index.
            const api = apiCatalog.get(item.href);
            if (api) {
                output += renderApiEntry(api, indent, urlPrefix, ctx.titlesOnly);
            } else {
                output += `${indent}- [${item.label}](${item.href})\n`;
            }
        }
    }
    return output;
}

// Build the per-sidebar `<platform>-llms.txt` files + a combined index for
// a given language. `urlPrefix` is `''` for English or `/<locale>` for
// localized output. `labels` is the parsed _sidebar-labels.json (empty for
// English).
//
// The per-sidebar files carry a description for every page. The combined
// llms.txt lists titles only and merges the seven SDK sidebars into one
// section with a link per platform, so it stays small enough for agents to
// read in one fetch without truncation.
async function buildSidebarFiles(outputDir, sidebarFiles, ctx) {
    const sidebars = new Map();
    for (const file of sidebarFiles) {
        if (!file.endsWith('.json')) continue;
        const sidebarData = JSON.parse(await fs.readFile(path.join(SIDEBARS_DIR, file), 'utf-8'));
        sidebars.set(file.replace('.json', ''), Array.isArray(sidebarData) ? sidebarData : []);
    }

    for (const [platformName, items] of sidebars) {
        const content = `# ${platformName} Documentation\n\n${LLM_SKILL_NOTE}\n\n${parseItems(items, ctx)}`;
        await fs.writeFile(path.join(outputDir, `${platformName}-llms.txt`), content);
        console.log(`Generated: ${path.relative(OUTPUT_DIR, path.join(outputDir, `${platformName}-llms.txt`))}`);
    }

    const titlesCtx = { ...ctx, descriptions: new Map(), titlesOnly: true };
    // Short platform names: each SDK topic line carries up to seven links.
    const SHORT_LABELS = { 'react-native': 'RN', kmp: 'KMP' };
    const sdkPlatforms = PLATFORMS.sdkPlatforms
        .filter(p => sidebars.has(p.id))
        .map(p => ({ ...p, label: SHORT_LABELS[p.id] ?? p.label }));
    const sectionIndexes = [
        { id: 'tutorial', label: 'Tutorial' },
        ...sdkPlatforms,
        { id: 'api', label: 'CLI & APIs' },
    ].filter(p => sidebars.has(p.id))
        .map(p => `[${p.label}](${BASE_URL}${ctx.urlPrefix}/${p.id}-llms.txt)`)
        .join(' · ');

    let allContent = `# Adapty Documentation\n\n> Adapty is an in-app purchase platform for mobile apps. It handles subscriptions, one-time purchases, and consumables — from purchase processing and receipt validation to analytics, A/B testing, and integrations.\n\n${LLM_SKILL_NOTE}\n\nThis index lists page titles only. Each section also has its own index with a one-line summary of every page: ${sectionIndexes}\n\n`;

    if (sidebars.has('tutorial')) {
        allContent += `# Tutorial Documentation\n\n${parseItems(sidebars.get('tutorial'), titlesCtx)}\n---\n\n`;
    }

    if (sdkPlatforms.length > 0) {
        const merged = mergeSdkSidebars(sdkPlatforms.map(p => ({ platformId: p.id, items: sidebars.get(p.id) })));
        allContent += `# SDK Documentation\n\nEach topic links to its page for every platform that has one. RN is React Native, KMP is Kotlin Multiplatform.\n${renderMergedSdk(merged, {
            platforms: sdkPlatforms,
            baseUrl: BASE_URL,
            urlPrefix: ctx.urlPrefix,
            noindexDocIds: ctx.noindexDocIds ?? new Set(),
            translate: item => translateLabel(item, ctx.labels),
        })}\n---\n\n`;
    }

    if (sidebars.has('api')) {
        allContent += `# CLI & APIs Documentation\n\n${parseItems(sidebars.get('api'), titlesCtx)}`;
    }

    await fs.writeFile(path.join(outputDir, 'llms.txt'), allContent);
    console.log(`Generated: ${path.relative(OUTPUT_DIR, path.join(outputDir, 'llms.txt'))} (all sidebars, ${allContent.length} chars)`);
}

async function generateLLMFiles() {
    await ensureDir(OUTPUT_DIR);
    const files = await fs.readdir(SIDEBARS_DIR);

    // Build descriptions map upfront from English source.
    const { descriptions: englishDescriptions, allDocIds, noindexDocIds } = await buildDescriptionMap(files);
    console.log(`Loaded ${englishDescriptions.size} descriptions from doc files`);

    // Load OpenAPI specs so `type: link` entries pointing at API slugs can
    // be expanded inline with their operation list.
    const apiCatalog = await loadApiCatalog();
    const apiOpCount = [...apiCatalog.values()].reduce((n, a) => n + a.operations.length, 0);
    console.log(`Loaded ${apiCatalog.size} API specs (${apiOpCount} operations)`);

    // English (always emitted at OUTPUT_DIR root)
    await buildSidebarFiles(OUTPUT_DIR, files, {
        descriptions: englishDescriptions,
        noindexDocIds,
        apiCatalog,
        urlPrefix: '',
        labels: {},
    });

    // Localized indexes — one llms.txt + per-platform llms.txt per locale
    // under OUTPUT_DIR/<locale>/. Description map, sidebar labels, and
    // API operation summaries all fall back to English when a translation
    // is missing.
    try {
        const localeEntries = await fs.readdir(LOCALES_BASE_DIR, { withFileTypes: true });
        const allLocales = localeEntries.filter(e => e.isDirectory() && !e.name.startsWith('.')).map(e => e.name);
        const locales = filterLocales(allLocales);
        if (BUILD_LOCALES_ENV && locales.length === 0) {
            console.log(`Skipping locale llms generation (BUILD_LOCALES=${BUILD_LOCALES_ENV})`);
        }
        for (const locale of locales) {
            const localeOutputDir = path.join(OUTPUT_DIR, locale);
            await ensureDir(localeOutputDir);
            const localeDescriptions = await buildLocaleDescriptionMap(locale, allDocIds, englishDescriptions);
            const labels = await loadSidebarLabels(locale);
            const localeApiCatalog = await loadApiCatalog(locale);
            await buildSidebarFiles(localeOutputDir, files, {
                descriptions: localeDescriptions,
                noindexDocIds,
                apiCatalog: localeApiCatalog,
                urlPrefix: `/${locale}`,
                labels,
            });
            console.log(`Locale llms generated: ${locale}`);
        }
    } catch { /* no locales directory */ }
}

generateLLMFiles().catch(console.error);
