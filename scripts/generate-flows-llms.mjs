import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// Generates a dedicated `flows-llms.txt` index for the Flows feature, mirroring
// the approach in generate-llms.mjs (markdown links to `.md` doc exports).
//
// Contents:
//   1. Every article in the `adapty-flow-builder` category of tutorial.json
//      (the category landing page + all nested categories/subcategories/docs).
//   2. For each SDK platform that has a `migration-to-<platform>-sdk-v4` doc:
//      that migration guide, followed by the `<platform>-paywalls` category
//      links that appear *before* `<platform>-implement-paywalls-manually`
//      (the manual-implementation subtree and everything after it is excluded).

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SIDEBARS_DIR = path.resolve(__dirname, '../src/data/sidebars');
const DOCS_BASE = path.resolve(__dirname, '../src/content/docs');

// Output dir from args (matches generate-llms.mjs) or default to public
const targetDirName = process.argv[2] || '../public';
const OUTPUT_DIR = path.resolve(__dirname, targetDirName);

const BASE_URL = 'https://adapty.io/docs';

// Platforms considered, in display order. A platform is only included when its
// `migration-to-<platform>-sdk-v4` doc actually exists.
const PLATFORMS = [
    { key: 'ios', label: 'iOS' },
    { key: 'android', label: 'Android' },
    { key: 'react-native', label: 'React Native' },
    { key: 'flutter', label: 'Flutter' },
    { key: 'unity', label: 'Unity' },
    { key: 'kmp', label: 'Kotlin Multiplatform' },
    { key: 'capacitor', label: 'Capacitor' },
];

const FLOW_CATEGORY_ID = 'adapty-flow-builder';

async function ensureDir(dir) {
    try {
        await fs.access(dir);
    } catch {
        await fs.mkdir(dir, { recursive: true });
    }
}

// Recursively locate a doc file by its filename-based id under DOCS_BASE.
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

function isDraft(content) {
    const match = content.match(/^---\s*\n([\s\S]*?)\n---/);
    if (!match) return false;
    return /^draft:\s*true\s*$/m.test(match[1]);
}

function extractDescription(content) {
    const match = content.match(/^---\s*\n([\s\S]*?)\n---/);
    if (!match) return null;
    const fmMatch = match[1].match(/^description:\s*["']?(.*?)["']?\s*$/m);
    return fmMatch ? fmMatch[1] : null;
}

// The landing-page id for a sidebar node: a category may declare its page via
// `link.id` or directly via `id` (tutorial.json uses the latter); docs use `id`.
function nodeId(item) {
    if (item.type === 'category') {
        return (item.link && item.link.type === 'doc' ? item.link.id : item.id) || null;
    }
    return item.id || null;
}

// Collect every doc id referenced by a set of sidebar nodes (recursively).
function collectIds(items, ids = new Set()) {
    for (const item of items) {
        if (item.type === 'category') {
            const id = nodeId(item);
            if (id) ids.add(id);
            if (item.items) collectIds(item.items, ids);
        } else if (item.type === 'doc' && item.id) {
            ids.add(item.id);
        }
    }
    return ids;
}

// Build a docId → description map for the given ids, skipping drafts.
async function buildDescriptionMap(ids) {
    const descriptions = new Map();
    for (const id of ids) {
        const filePath = await findDocFile(id);
        if (!filePath) {
            console.warn(`[flows-llms] Warning: could not find ${id}.mdx`);
            continue;
        }
        try {
            const content = await fs.readFile(filePath, 'utf-8');
            if (isDraft(content)) continue;
            const desc = extractDescription(content);
            if (desc) descriptions.set(id, desc);
        } catch { /* skip unreadable */ }
    }
    return descriptions;
}

function docLine(id, label, descriptions, indent) {
    const desc = descriptions.get(id);
    const suffix = desc ? `: ${desc}` : '';
    return `${indent}- [${label || id}](${BASE_URL}/${id}.md)${suffix}\n`;
}

// Render a list of sidebar nodes to markdown. Top-level (depth 0) categories
// become `###` headers; nested categories become bold list items.
function renderItems(items, descriptions, depth = 0) {
    let out = '';
    const indent = '  '.repeat(depth);

    for (const item of items) {
        if (item.type === 'category') {
            const label = item.label;
            if (label) {
                if (depth === 0) out += `\n### ${label}\n\n`;
                else out += `${indent}- **${label}**\n`;
            }
            const landingId = nodeId(item);
            if (landingId) {
                out += docLine(landingId, 'Overview', descriptions, `${indent}  `);
            }
            if (item.items) out += renderItems(item.items, descriptions, depth + 1);
        } else if (item.type === 'doc' && item.id) {
            out += docLine(item.id, item.label, descriptions, indent);
        } else if (item.type === 'link') {
            out += `${indent}- [${item.label}](${item.href})\n`;
        }
    }
    return out;
}

// Depth-first search for a category node by its id (link.id or id).
function findCategoryById(items, id) {
    for (const item of items) {
        if (item.type === 'category') {
            if (nodeId(item) === id) return item;
            if (item.items) {
                const found = findCategoryById(item.items, id);
                if (found) return found;
            }
        }
    }
    return null;
}

// Keep only the sibling nodes that appear before the boundary id.
function sliceBefore(items, boundaryId) {
    const result = [];
    for (const item of items) {
        if (nodeId(item) === boundaryId) break;
        result.push(item);
    }
    return result;
}

async function readSidebar(name) {
    const raw = await fs.readFile(path.join(SIDEBARS_DIR, `${name}.json`), 'utf-8');
    const data = JSON.parse(raw);
    return Array.isArray(data) ? data : [];
}

async function main() {
    await ensureDir(OUTPUT_DIR);

    // --- 1. Flow Builder category from tutorial.json ---
    const tutorial = await readSidebar('tutorial');
    const flowCategory = findCategoryById(tutorial, FLOW_CATEGORY_ID);
    if (!flowCategory) {
        throw new Error(`Could not find category "${FLOW_CATEGORY_ID}" in tutorial.json`);
    }

    // --- 2/3. Per-platform migration + paywalls-before-manual ---
    const platformSections = [];
    for (const { key, label } of PLATFORMS) {
        const migrationId = `migration-to-${key}-sdk-v4`;
        const migrationFile = await findDocFile(migrationId);
        if (!migrationFile) continue; // platform has no v4 migration guide yet

        let sidebar;
        try {
            sidebar = await readSidebar(key);
        } catch {
            console.warn(`[flows-llms] No ${key}.json sidebar; skipping`);
            continue;
        }

        const paywallsCat = findCategoryById(sidebar, `${key}-paywalls`);
        const paywallItems = paywallsCat
            ? sliceBefore(paywallsCat.items || [], `${key}-implement-paywalls-manually`)
            : [];

        platformSections.push({ key, label, migrationId, paywallsCat, paywallItems });
    }

    // --- Build the description map from every id we're about to emit ---
    const ids = collectIds(flowCategory.items);
    ids.add(FLOW_CATEGORY_ID);
    for (const s of platformSections) {
        ids.add(s.migrationId);
        if (s.paywallsCat) ids.add(nodeId(s.paywallsCat));
        collectIds(s.paywallItems, ids);
    }
    const descriptions = await buildDescriptionMap(ids);

    // --- Compose the output ---
    let out = '# Adapty Flows — Documentation\n\n';
    out += '> Adapty Flows (Beta) let you build paywalls and onboarding flows visually in the Flow Builder and ship them without app releases. ';
    out += 'This index links the Flow Builder guide plus the per-platform SDK v4 migration and flow/paywall integration docs.\n\n';

    // Section 1: Flow Builder
    out += '## Flow Builder\n';
    out += docLine(FLOW_CATEGORY_ID, 'Overview', descriptions, '');
    out += renderItems(flowCategory.items, descriptions, 0);

    // Section 2: per-platform SDK integration
    if (platformSections.length > 0) {
        out += '\n## SDK integration by platform\n';
        for (const s of platformSections) {
            out += `\n### ${s.label}\n\n`;
            out += docLine(s.migrationId, 'SDK v4 migration guide', descriptions, '');
            if (s.paywallsCat) {
                out += docLine(nodeId(s.paywallsCat), 'Flows & paywalls overview', descriptions, '');
            }
            out += renderItems(s.paywallItems, descriptions, 0);
        }
    }

    const outputPath = path.join(OUTPUT_DIR, 'flows-llms.txt');
    await fs.writeFile(outputPath, out);
    console.log(`Generated: ${path.relative(OUTPUT_DIR, outputPath)}`);
    console.log(`  Flow Builder docs + ${platformSections.length} platform section(s): ${platformSections.map(s => s.key).join(', ')}`);
}

main().catch(err => {
    console.error(err);
    process.exit(1);
});
