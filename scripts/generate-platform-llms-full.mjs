import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SIDEBARS_DIR = path.resolve(__dirname, '../src/data/sidebars');
const DOCS_DIR = path.resolve(__dirname, '../src/content/docs/version-3.0');
const REUSABLE_COMPONENTS_DIR = path.resolve(__dirname, '../src/components/reusable');

// Get output dir from args or default to public
const targetDirName = process.argv[2] || '../public';
const OUTPUT_DIR = path.resolve(__dirname, targetDirName);

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

// Strip content (remove imports, Zoom components, inline reusable components)
function stripContent(content, reusableComponents) {
    let processed = content;

    // 1. Remove imports
    processed = processed.replace(/^import\s+.*?;?\s*$/gm, '');

    // 2. Remove Zoom and ZoomImage tags
    processed = processed.replace(/<ZoomImage\s+[^>]*\/>/g, '');
    processed = processed.replace(/<Zoom>(.*?)<\/Zoom>/gs, '$1');

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

// Process a single markdown file
async function processMarkdownFile(docId, reusableComponents) {
    const filePath = path.join(DOCS_DIR, `${docId}.mdx`);
    
    try {
        // Check if file exists
        await fs.access(filePath);
        
        let content = await fs.readFile(filePath, 'utf8');
        
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

// Generate full content file for a platform
async function generatePlatformFullContent(platformName, sidebarData, reusableComponents) {
    console.log(`\nGenerating ${platformName}-llms-full.txt...`);
    
    // Extract all doc IDs from the sidebar
    const docIds = extractDocIds(sidebarData);
    console.log(`Found ${docIds.length} documents in ${platformName} sidebar`);
    
    // Create header
    let combinedContent = `# ${platformName.toUpperCase()} - Adapty Documentation (Full Content)\n`;
    combinedContent += '\nThis file contains the complete content of all documentation pages for this platform.\n';
    combinedContent += `\nGenerated on: ${new Date().toISOString()}\n`;
    combinedContent += `Total files: ${docIds.length}\n`;
    combinedContent += '\n---\n';
    
    // Process each doc
    let processedCount = 0;
    for (const docId of docIds) {
        const fileContent = await processMarkdownFile(docId, reusableComponents);
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

async function main() {
    console.log('Starting platform-specific llms-full.txt generation...');
    
    // Ensure output directory exists
    await ensureDir(OUTPUT_DIR);
    
    // Load reusable components
    const reusableComponents = await getReusableComponents();
    console.log(`Loaded ${Object.keys(reusableComponents).length} reusable components`);
    
    // Read all sidebar files
    const sidebarFiles = await fs.readdir(SIDEBARS_DIR);
    
    for (const file of sidebarFiles) {
        if (!file.endsWith('.json')) continue;
        
        const platformName = file.replace('.json', '');
        const sidebarPath = path.join(SIDEBARS_DIR, file);
        
        try {
            const sidebarContent = await fs.readFile(sidebarPath, 'utf-8');
            const sidebarData = JSON.parse(sidebarContent);
            
            // Generate full content for this platform
            const fullContent = await generatePlatformFullContent(platformName, sidebarData, reusableComponents);
            
            // Write to file
            const outputPath = path.join(OUTPUT_DIR, `${platformName}-llms-full.txt`);
            await fs.writeFile(outputPath, fullContent);
            console.log(`✓ Successfully generated ${platformName}-llms-full.txt`);
            
        } catch (error) {
            console.error(`✗ Error processing ${platformName}:`, error.message);
        }
    }
    
    console.log('\nPlatform-specific llms-full.txt generation complete!');
}

main().catch(console.error);
