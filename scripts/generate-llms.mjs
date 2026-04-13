import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SIDEBARS_DIR = path.resolve(__dirname, '../src/data/sidebars');
const DOCS_BASE = path.resolve(__dirname, '../src/content/docs');

// Get output dir from args or default to public
const targetDirName = process.argv[2] || '../public';
const OUTPUT_DIR = path.resolve(__dirname, targetDirName);

const BASE_URL = 'https://adapty.io/docs'; // Base URL for public links

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
            if (item.link && item.link.type === 'doc') ids.add(item.link.id);
            if (item.items) collectDocIds(item.items, ids);
        } else if (item.type === 'doc' && item.id) {
            ids.add(item.id);
        }
    }
}

// Build a map of docId → description from all sidebar doc IDs
async function buildDescriptionMap(sidebarFiles) {
    const descriptions = new Map();

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
                const desc = extractDescription(content);
                if (desc) descriptions.set(docId, desc);
            } catch { /* skip */ }
        }
    }

    return descriptions;
}

// Recursive function to parse sidebar items
function parseItems(items, descriptions, depth = 0) {
    let output = '';
    const indent = '  '.repeat(depth);

    for (const item of items) {
        if (item.type === 'category') {
            // Add Category Header
            if (item.label) {
                if (depth === 0) {
                    output += `\n### ${item.label}\n\n`;
                } else {
                    output += `${indent}- **${item.label}**\n`;
                }
            }

            // If category has a link, add it as a doc item too
            if (item.link && item.link.type === 'doc') {
                const desc = descriptions.get(item.link.id);
                const suffix = desc ? `: ${desc}` : '';
                output += `${indent}  - [Overview](${BASE_URL}/${item.link.id}.md)${suffix}\n`;
            }

            // Process children
            if (item.items) {
                output += parseItems(item.items, descriptions, depth + 1);
            }

        } else if (item.type === 'doc') {
            const desc = descriptions.get(item.id);
            const suffix = desc ? `: ${desc}` : '';
            output += `${indent}- [${item.label || item.id}](${BASE_URL}/${item.id}.md)${suffix}\n`;
        } else if (item.type === 'link') {
            // External or manual link
            output += `${indent}- [${item.label}](${item.href})\n`;
        }
    }
    return output;
}

async function generateLLMFiles() {
    await ensureDir(OUTPUT_DIR);
    const files = await fs.readdir(SIDEBARS_DIR);

    // Build descriptions map upfront
    const descriptions = await buildDescriptionMap(files);
    console.log(`Loaded ${descriptions.size} descriptions from doc files`);

    let allContent = '# Adapty Documentation\n\n> Adapty is an in-app purchase platform for mobile apps. It handles subscriptions, one-time purchases, and consumables — from purchase processing and receipt validation to analytics, A/B testing, and integrations.\n\n';

    for (const file of files) {
        if (!file.endsWith('.json')) continue;

        const filePath = path.join(SIDEBARS_DIR, file);
        const content = await fs.readFile(filePath, 'utf-8');
        const sidebarData = JSON.parse(content);

        // Generate content for this sidebar
        let sidebarContent = `# ${file.replace('.json', '')} Documentation\n\n`;
        let items = Array.isArray(sidebarData) ? sidebarData : [];
        sidebarContent += parseItems(items, descriptions);

        // Save Platform Specific File
        const platformName = file.replace('.json', '');
        await fs.writeFile(path.join(OUTPUT_DIR, `${platformName}-llms.txt`), sidebarContent);
        console.log(`Generated: ${platformName}-llms.txt`);

        // Add to Full Index
        allContent += sidebarContent + '\n---\n\n';
    }

    // Write Main llms.txt
    await fs.writeFile(path.join(OUTPUT_DIR, 'llms.txt'), allContent);
    console.log('Generated: llms.txt (all sidebars)');
}

generateLLMFiles().catch(console.error);
