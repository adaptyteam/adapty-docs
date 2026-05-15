import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SIDEBARS_DIR = path.resolve(__dirname, '../src/data/sidebars');
const DOCS_BASE = path.resolve(__dirname, '../src/content/docs');
const LOCALES_BASE_DIR = path.resolve(__dirname, '../src/locales');
const REUSABLE_COMPONENTS_DIR = path.resolve(__dirname, '../src/components/reusable');

// Get output dir from args or default to public
const targetDirName = process.argv[2] || '../public';
const OUTPUT_DIR = path.resolve(__dirname, targetDirName);

// Mirrors the BUILD_LOCALES convention from src/data/locales.ts:
//   unset      → build all locales
//   "none"     → English only (skip locale llms-full generation)
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

// Helper to convert kebab-case file name to PascalCase component name
const toPascalCase = (str) => {
    if (/^\d/.test(str)) return `Error${str}`;
    return str.replace(/(^\w|-\w)/g, clear => clear.replace('-', '').toUpperCase());
};

// Get reusable components
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

// Layer locale-specific reusable component overrides (src/locales/<locale>/reusable/)
// on top of the English defaults. Same logic as generate-md.mjs.
async function getLocaleReusableComponents(baseComponents, locale) {
    const components = { ...baseComponents };
    const localeReusableDir = path.join(LOCALES_BASE_DIR, locale, 'reusable');
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
    return components;
}

// Strip content (remove imports, Zoom components, inline reusable components)
function stripContent(content, reusableComponents) {
    let processed = content;

    // 1. Remove imports
    processed = processed.replace(/^import\s+.*?;?\s*$/gm, '');

    // 2. Remove Zoom and ZoomImage tags
    processed = processed.replace(/<ZoomImage\s+[^>]*\/>/g, '');
    processed = processed.replace(/<Zoom>(.*?)<\/Zoom>/gs, '$1');

    // Replace Inline icon component with its alt text: <Inline id="..." alt="Edit" ... /> → Edit
    processed = processed.replace(/<Inline\s+[^>]*alt="([^"]*)"[^>]*\/>/g, '$1');
    processed = processed.replace(/<Inline\s+[^>]*\/>/g, '');

    // 3. Inline Reusable Components
    for (const [name, componentContent] of Object.entries(reusableComponents)) {
        const regex = new RegExp(`<${name}\\s*\\/>`, 'g');
        processed = processed.replace(regex, componentContent);
    }

    // 4. Remove HTML comments
    processed = processed.replace(/<!--[\s\S]*?-->/g, '');

    // 5. Clean extra empty lines
    processed = processed.replace(/\n{3,}/g, '\n\n');

    return processed.trim();
}

// Check if a document is marked as draft
function isDraft(content) {
    const match = content.match(/^---\s*\n([\s\S]*?)\n---/);
    if (!match) return false;
    return /^draft:\s*true\s*$/m.test(match[1]);
}

// Clean frontmatter (keep only title and description)
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

// Extract doc IDs from sidebar items recursively
function extractDocIds(items, docIds = []) {
    for (const item of items) {
        if (item.type === 'category') {
            // If category has a link, add it
            if (item.link && item.link.type === 'doc') {
                docIds.push(item.link.id);
            }
            // Process children
            if (item.items) {
                extractDocIds(item.items, docIds);
            }
        } else if (item.type === 'doc') {
            // Only add if id exists (some sidebar items may not have an id)
            if (item.id) {
                docIds.push(item.id);
            }
        }
    }
    return docIds;
}

// Find a doc file by searching all subdirectories under DOCS_BASE (recursively)
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

// Find the source file for a docId. When `locale` is provided, prefer
// src/locales/<locale>/<docId>.{mdx,md} and fall back to the English file
// in src/content/docs (recursive search).
async function findSourceFile(docId, locale) {
    if (locale) {
        for (const ext of ['mdx', 'md']) {
            const localePath = path.join(LOCALES_BASE_DIR, locale, `${docId}.${ext}`);
            try {
                await fs.access(localePath);
                return localePath;
            } catch { /* try next */ }
        }
    }
    return findDocFile(docId);
}

// Process a single markdown file. When `locale` is provided, the locale
// translation is preferred and the English content is used as a fallback.
async function processMarkdownFile(docId, reusableComponents, locale = null) {
    const filePath = await findSourceFile(docId, locale);

    if (!filePath) {
        console.warn(`Warning: Could not find ${docId}.mdx in any content directory`);
        return null;
    }

    try {
        let content = await fs.readFile(filePath, 'utf8');

        // Skip draft documents
        if (isDraft(content)) return null;

        // Clean frontmatter
        content = cleanFrontmatter(content);

        // Strip content
        content = stripContent(content, reusableComponents);

        return content;
    } catch (error) {
        console.warn(`Warning: Could not process file ${docId}.mdx:`, error.message);
        return null;
    }
}

// Generate full content file for a platform. When `locale` is set,
// translated source is used per-doc with English fallback for any doc that
// hasn't been translated yet.
async function generatePlatformFullContent(platformName, sidebarData, reusableComponents, locale = null) {
    const tag = locale ? `${locale}/${platformName}` : platformName;
    console.log(`\nGenerating ${tag}-llms-full.txt...`);

    // Extract all doc IDs from the sidebar
    const docIds = extractDocIds(sidebarData);
    console.log(`Found ${docIds.length} documents in ${platformName} sidebar`);

    // Create header
    let combinedContent = `# ${platformName.toUpperCase()} - Adapty Documentation (Full Content)\n`;
    combinedContent += '\nThis file contains the complete content of all documentation pages for this platform.\n';
    if (locale) combinedContent += `\nLocale: ${locale}\n`;
    combinedContent += `\nGenerated on: ${new Date().toISOString()}\n`;
    combinedContent += `Total files: ${docIds.length}\n`;
    combinedContent += '\n---\n';

    // Process each doc
    let processedCount = 0;
    for (const docId of docIds) {
        const fileContent = await processMarkdownFile(docId, reusableComponents, locale);
        if (fileContent !== null) {
            // Add file header
            combinedContent += `\n\n# File: ${docId}\n`;
            combinedContent += '---\n\n';
            combinedContent += fileContent;
            combinedContent += '\n\n---\n';
            processedCount++;
        }
    }

    // Add footer
    combinedContent += '\n\n# End of Documentation\n';
    combinedContent += `\n_Generated on: ${new Date().toISOString()}_\n`;
    combinedContent += `_Successfully processed: ${processedCount}/${docIds.length} files_\n`;

    return combinedContent;
}

// Build platform full files + a combined llms-full.txt for one language
// (English when `locale` is null) into `outputDir`.
async function buildPlatformFullFiles(outputDir, sidebarFiles, reusableComponents, locale = null) {
    const allPlatformContents = [];

    for (const file of sidebarFiles) {
        if (!file.endsWith('.json')) continue;

        const platformName = file.replace('.json', '');
        const sidebarPath = path.join(SIDEBARS_DIR, file);

        try {
            const sidebarContent = await fs.readFile(sidebarPath, 'utf-8');
            const sidebarData = JSON.parse(sidebarContent);

            const fullContent = await generatePlatformFullContent(platformName, sidebarData, reusableComponents, locale);

            const outputPath = path.join(outputDir, `${platformName}-llms-full.txt`);
            await fs.writeFile(outputPath, fullContent);
            console.log(`✓ Generated ${path.relative(OUTPUT_DIR, outputPath)}`);

            allPlatformContents.push([platformName, fullContent]);
        } catch (error) {
            console.error(`✗ Error processing ${platformName}${locale ? ` (${locale})` : ''}:`, error.message);
        }
    }

    let combinedFull = '# Adapty Documentation (Full Content)\n\n';
    combinedFull += '> Complete documentation content across all platforms.\n\n';
    if (locale) combinedFull += `Locale: ${locale}\n\n`;
    combinedFull += `Generated on: ${new Date().toISOString()}\n\n---\n`;
    for (const [, content] of allPlatformContents) combinedFull += content;

    const combinedOutputPath = path.join(outputDir, 'llms-full.txt');
    await fs.writeFile(combinedOutputPath, combinedFull);
    console.log(`✓ Generated ${path.relative(OUTPUT_DIR, combinedOutputPath)}`);
}

async function main() {
    console.log('Starting platform-specific llms-full.txt generation...');

    // Ensure output directory exists
    await ensureDir(OUTPUT_DIR);

    // Load reusable components
    const reusableComponents = await getReusableComponents();
    console.log(`Loaded ${Object.keys(reusableComponents).length} reusable components`);

    // Read all sidebar files
    const sidebarFiles = await fs.readdir(SIDEBARS_DIR);

    // English (always emitted at OUTPUT_DIR root)
    await buildPlatformFullFiles(OUTPUT_DIR, sidebarFiles, reusableComponents);

    // Localized variants — one llms-full.txt + per-platform llms-full.txt per
    // locale under OUTPUT_DIR/<locale>/. Each doc falls back to English when
    // a translation isn't available.
    try {
        const localeEntries = await fs.readdir(LOCALES_BASE_DIR, { withFileTypes: true });
        const allLocales = localeEntries.filter(e => e.isDirectory() && !e.name.startsWith('.')).map(e => e.name);
        const locales = filterLocales(allLocales);
        if (BUILD_LOCALES_ENV && locales.length === 0) {
            console.log(`Skipping locale llms-full generation (BUILD_LOCALES=${BUILD_LOCALES_ENV})`);
        }
        for (const locale of locales) {
            const localeOutputDir = path.join(OUTPUT_DIR, locale);
            await ensureDir(localeOutputDir);
            const localeReusable = await getLocaleReusableComponents(reusableComponents, locale);
            await buildPlatformFullFiles(localeOutputDir, sidebarFiles, localeReusable, locale);
            console.log(`Locale llms-full generated: ${locale}`);
        }
    } catch { /* no locales directory */ }

    console.log('\nPlatform-specific llms-full.txt generation complete!');
}

main().catch(console.error);
