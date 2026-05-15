import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SRC_DOCS_DIR = path.resolve(__dirname, '../src/content/docs');
const REUSABLE_COMPONENTS_DIR = path.resolve(__dirname, '../src/components/reusable');
const LOCALES_BASE_DIR = path.resolve(__dirname, '../src/locales');

// Get output dir from args or default to public
const targetDirName = process.argv[2] || '../public';
const OUTPUT_DIR = path.resolve(__dirname, targetDirName);

// Mirrors the BUILD_LOCALES convention from src/data/locales.ts:
//   unset      → build all locales
//   "none"     → English only (skip locale .md generation)
//   "zh"       → only the listed locales (comma-separated)
// Returning the filtered list lets locale-only CI matrix builds emit the
// .md files for their locale into build/<locale>/ so translation-only
// deploys (aws s3 sync --delete) don't wipe them from S3.
const BUILD_LOCALES_ENV = (process.env.BUILD_LOCALES ?? '').trim();
function filterLocales(allAvailableLocales) {
    if (!BUILD_LOCALES_ENV) return allAvailableLocales;
    if (BUILD_LOCALES_ENV === 'none') return [];
    const requested = new Set(BUILD_LOCALES_ENV.split(',').map(s => s.trim()).filter(Boolean));
    return allAvailableLocales.filter(l => requested.has(l));
}

// Helper to convert kebab-case file name to PascalCase component name
const toPascalCase = (str) => {
    if (/^\d/.test(str)) return `Error${str}`;
    return str.replace(/(^\w|-\w)/g, clear => clear.replace('-', '').toUpperCase());
};

async function getReusableComponents() {
    const components = {};
    try {
        const files = await fs.readdir(REUSABLE_COMPONENTS_DIR);
        for (const file of files) {
            if (file.endsWith('.md')) {
                const content = await fs.readFile(path.join(REUSABLE_COMPONENTS_DIR, file), 'utf-8');
                // Clean comments from reusable components
                const cleanedContent = content.replace(/<!---.*?--->\s*\n?/gs, '').trim();
                const componentName = toPascalCase(file.replace('.md', ''));
                components[componentName] = cleanedContent;
            }
        }
    } catch (e) {
        console.warn('No reusable components found or directory missing.');
    }
    return components;
}

function stripContent(content, reusableComponents) {
    let processed = content;

    // 1. Remove imports
    processed = processed.replace(/^import\s+.*?;?\s*$/gm, '');

    // 2. Remove Zoom and ZoomImage tags
    // Remove self-closing ZoomImage: <ZoomImage ... />
    processed = processed.replace(/<ZoomImage\s+[^>]*\/>/g, '');
    // Remove wrapping Zoom: <Zoom>...</Zoom> (keep content)
    processed = processed.replace(/<Zoom>(.*?)<\/Zoom>/gs, '$1');

    // Replace Inline icon component with its alt text: <Inline id="..." alt="Edit" ... /> → Edit
    processed = processed.replace(/<Inline\s+[^>]*alt="([^"]*)"[^>]*\/>/g, '$1');
    processed = processed.replace(/<Inline\s+[^>]*\/>/g, '');

    // Unwrap SDK v4 blocks — keep the content, drop the wrapper tags
    processed = processed.replace(/<SDKv4>([\s\S]*?)<\/SDKv4>/g, '$1');
    // Wrap SDK v3 blocks with an LLM instruction header covering the entire legacy section,
    // then keep the full content so LLMs can reference it when needed.
    processed = processed.replace(/<SDKv3>([\s\S]*?)<\/SDKv3>/g, (_, content) => `

---

> [!WARNING]
> **LLM INSTRUCTION — SDK v3 LEGACY CONTENT**
>
> Everything that follows (until the next horizontal rule or end of document) is the **legacy SDK v3 API reference** (\`getPaywall\`, \`getPaywallForDefaultAudience\`, \`getOnboarding\`, \`getPaywallConfiguration\`). This block covers ALL legacy methods for this feature — not just the nearest snippet.
>
> **Before using any code from this section, check which SDK version the user is on.**
>
> Apply this section ONLY in these two cases:
> 1. The user is **migrating an existing app from SDK v3 to SDK v4+** and needs to understand or replace legacy code.
> 2. The user is **troubleshooting an already-deployed v3 integration**.
>
> **For new integrations (building from scratch):** always recommend the SDK v4+ \`getFlow\` method documented above. Do NOT suggest \`getPaywall\` or \`getOnboarding\` for new setups, even if the user hasn't specified a version — ask first and default to v4+.
>
> **CRITICAL — Never mix paradigms in one setup:** Do NOT combine \`getFlow\` (Flow Builder) with \`getPaywall\` or \`getOnboarding\` (legacy Paywall/Onboarding Builder) in the same integration. These are incompatible patterns. Mixing them will produce inconsistent behavior and is unsupported.

${content}

---
`);


    // 3. Inline Reusable Components
    // Replace <ComponentName /> with the actual content
    for (const [name, componentContent] of Object.entries(reusableComponents)) {
        const regex = new RegExp(`<${name}\\s*\\/>`, 'g');
        processed = processed.replace(regex, componentContent);
    }

    // 4. Remove other self-closing component tags that we might want to strip?
    // For now, let's keep others unless specific instruction, but user said "Remove everything extra".
    // Let's strip standard HTML comments
    processed = processed.replace(/<!--[\s\S]*?-->/g, '');

    // 5. Clean extra empty lines created by stripping
    processed = processed.replace(/\n{3,}/g, '\n\n');

    return processed.trim();
}

function cleanFrontmatter(content) {
    const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n/;
    const match = content.match(frontmatterRegex);

    if (!match) return content;

    const frontmatter = match[1];
    const lines = frontmatter.split('\n');
    const keptLines = [];

    for (const line of lines) {
        const trimmed = line.trim();
        // Keep only title and description
        if (trimmed.startsWith('title:') || trimmed.startsWith('description:')) {
            keptLines.push(line);
        }
    }

    if (keptLines.length === 0) {
        return content.replace(frontmatterRegex, '');
    }

    return content.replace(frontmatterRegex, `---\n${keptLines.join('\n')}\n---\n\n`);
}

async function processFiles(dir, reusableComponents, englishFiles) {
    const entries = await fs.readdir(dir, { withFileTypes: true });

    for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);

        if (entry.isDirectory()) {
            await processFiles(fullPath, reusableComponents, englishFiles);
        } else if (entry.isFile() && (entry.name.endsWith('.md') || entry.name.endsWith('.mdx'))) {
            const rawContent = await fs.readFile(fullPath, 'utf-8');

            // Clean Frontmatter
            let content = cleanFrontmatter(rawContent);

            // Strip and Inline
            content = stripContent(content, reusableComponents);

            // Determine output filename (flattened basename logic)
            let basename = entry.name.replace(/\.(md|mdx)$/, '');

            const destPath = path.join(OUTPUT_DIR, `${basename}.md`);

            await fs.writeFile(destPath, content, 'utf-8');
            englishFiles.set(basename, content);
        }
    }
}

async function processLocaleFiles(locale, baseComponents, englishFiles) {
    const localeDir = path.join(LOCALES_BASE_DIR, locale);
    const localeOutputDir = path.join(OUTPUT_DIR, locale);
    await fs.mkdir(localeOutputDir, { recursive: true });

    // Load locale-specific reusable component overrides
    const components = { ...baseComponents };
    const localeReusableDir = path.join(localeDir, 'reusable');
    try {
        const files = await fs.readdir(localeReusableDir);
        for (const file of files) {
            if (file.endsWith('.md') || file.endsWith('.mdx')) {
                const content = await fs.readFile(path.join(localeReusableDir, file), 'utf-8');
                const cleanedContent = content.replace(/<!---.*?--->\s*\n?/gs, '').trim();
                const componentName = toPascalCase(file.replace(/\.(md|mdx)$/, ''));
                components[componentName] = cleanedContent;
            }
        }
    } catch { /* no locale-specific reusable overrides */ }

    // Collect translated file basenames
    const translatedBasenames = new Set();
    const entries = await fs.readdir(localeDir, { withFileTypes: true });
    for (const entry of entries) {
        if (!entry.isFile() || (!entry.name.endsWith('.md') && !entry.name.endsWith('.mdx'))) continue;

        const rawContent = await fs.readFile(path.join(localeDir, entry.name), 'utf-8');
        let content = cleanFrontmatter(rawContent);
        content = stripContent(content, components);

        const basename = entry.name.replace(/\.(md|mdx)$/, '');
        translatedBasenames.add(basename);
        await fs.writeFile(path.join(localeOutputDir, `${basename}.md`), content, 'utf-8');
    }

    // Fall back to English .md files for untranslated articles
    for (const [basename, content] of englishFiles) {
        if (!translatedBasenames.has(basename)) {
            await fs.writeFile(path.join(localeOutputDir, `${basename}.md`), content, 'utf-8');
        }
    }
}

async function main() {
    console.log('Starting Markdown generation...');

    await fs.mkdir(OUTPUT_DIR, { recursive: true });

    const reusableComponents = await getReusableComponents();
    const englishFiles = new Map();
    await processFiles(SRC_DOCS_DIR, reusableComponents, englishFiles);

    // Generate .md files for each locale (falls back to English for untranslated articles)
    try {
        const localeEntries = await fs.readdir(LOCALES_BASE_DIR, { withFileTypes: true });
        const allLocales = localeEntries.filter(e => e.isDirectory() && !e.name.startsWith('.')).map(e => e.name);
        const locales = filterLocales(allLocales);
        if (BUILD_LOCALES_ENV && locales.length === 0) {
            console.log(`Skipping locale markdown generation (BUILD_LOCALES=${BUILD_LOCALES_ENV})`);
        }
        for (const locale of locales) {
            await processLocaleFiles(locale, reusableComponents, englishFiles);
            console.log(`Locale markdown generated: ${locale}`);
        }
    } catch { /* no locales directory */ }

    console.log('Markdown generation complete.');
}

main().catch(console.error);
