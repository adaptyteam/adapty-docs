import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SIDEBARS_DIR = path.resolve(__dirname, '../src/data/sidebars');

// Get output dir from args or default to public
const targetDirName = process.argv[2] || '../public';
const OUTPUT_DIR = path.resolve(__dirname, targetDirName);

const BASE_URL = 'https://docs.adapty.io'; // Base URL for public links

// Helper: Ensure directory exists
async function ensureDir(dir) {
    try {
        await fs.access(dir);
    } catch {
        await fs.mkdir(dir, { recursive: true });
    }
}

// Recursive function to parse sidebar items
function parseItems(items, depth = 0) {
    let output = '';
    const indent = '  '.repeat(depth);

    for (const item of items) {
        if (item.type === 'category') {
            // Add Category Header
            if (item.label) {
                // Use consistent markdown header levels based on depth
                // Tier 1: ### Label, Tier 2: #### Label, etc?
                // Or just use bullet points for hierarchy which is often cleaner for LLMs.
                // Let's use headers for top level, bullets for nested.
                if (depth === 0) {
                    output += `\n### ${item.label}\n\n`;
                } else {
                    output += `${indent}- **${item.label}**\n`;
                }
            }

            // If category has a link, add it as a doc item too
            if (item.link && item.link.type === 'doc') {
                output += `${indent}  - [Overview](${BASE_URL}/${item.link.id}.md)\n`;
            }

            // Process children
            if (item.items) {
                output += parseItems(item.items, depth + 1);
            }

        } else if (item.type === 'doc') {
            output += `${indent}- [${item.label || item.id}](${BASE_URL}/${item.id}.md)\n`;
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

    let allContent = '# Full Documentation Index\n\n';
    let mainContent = '';

    for (const file of files) {
        if (!file.endsWith('.json')) continue;

        const filePath = path.join(SIDEBARS_DIR, file);
        const content = await fs.readFile(filePath, 'utf-8');
        const sidebarData = JSON.parse(content);

        // Generate content for this sidebar
        let sidebarContent = `# ${file.replace('.json', '')} Documentation\n\n`;
        // Handle array root (tutorial.json) vs object root (others might be different? usually array in Docusaurus/classic structures)
        // The file I read (tutorial.json) is an array. I'll assume all are arrays of items.

        let items = Array.isArray(sidebarData) ? sidebarData : [];
        // If it's an object with 'items' or similar, handle that (Standard Docusaurus sidebars.js export object)
        // But here we just see JSON arrays in the file listing.

        sidebarContent += parseItems(items);

        // Save Platform Specific File
        const platformName = file.replace('.json', '');
        await fs.writeFile(path.join(OUTPUT_DIR, `${platformName}-llms.txt`), sidebarContent);
        console.log(`Generated: ${platformName}-llms.txt`);

        // Add to Full Index
        allContent += sidebarContent + '\n---\n\n';
    }

    // Write Main llms.txt (now same as full or containing all sidebars as requested)
    // "llms.txt and llms-full.txt ... must contain content of all the sidebars"
    await fs.writeFile(path.join(OUTPUT_DIR, 'llms.txt'), allContent);
    console.log('Generated: llms.txt (all sidebars)');

    // Write Full Index (redundant but requested)
    await fs.writeFile(path.join(OUTPUT_DIR, 'llms-full.txt'), allContent);
    console.log('Generated: llms-full.txt');
}

generateLLMFiles().catch(console.error);
