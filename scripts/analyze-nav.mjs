import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SIDEBARS_DIR = path.resolve(__dirname, '../src/data/sidebars');
const DOCS_BASE = path.resolve(__dirname, '../src/content/docs');
const OUTPUT_FILE = path.resolve(__dirname, '../nav-map.md');

const SIDEBAR_FILES = [
  { file: 'ios.json',           platform: 'iOS' },
  { file: 'android.json',       platform: 'Android' },
  { file: 'react-native.json',  platform: 'React Native' },
  { file: 'flutter.json',       platform: 'Flutter' },
  { file: 'unity.json',         platform: 'Unity' },
  { file: 'kmp.json',           platform: 'Kotlin Multiplatform' },
  { file: 'capacitor.json',     platform: 'Capacitor' },
  { file: 'api.json',           platform: 'API' },
  { file: 'tutorial.json',      platform: 'Tutorial' },
];

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

function walkSidebar(items, parentPath = []) {
  const articles = [];
  for (const item of items) {
    if (item.type === 'link') continue; // external/non-doc links, skip

    if (item.type === 'doc' && item.id) {
      articles.push({ id: item.id, labelPath: [...parentPath, item.label || item.id] });
    }

    if (item.type === 'category') {
      const categoryLabel = item.label || '';
      // Category that is itself an article (mutually exclusive with link pattern)
      if (item.id) {
        articles.push({ id: item.id, labelPath: [...parentPath, categoryLabel] });
      } else if (item.link && item.link.type === 'doc' && item.link.id) {
        // Category with a linked landing page doc
        articles.push({ id: item.link.id, labelPath: [...parentPath, categoryLabel] });
      }
      // Recurse into children
      if (item.items) {
        articles.push(...walkSidebar(item.items, [...parentPath, categoryLabel]));
      }
    }
  }
  return articles;
}

function extractFrontmatterTitle(content) {
  const match = content.match(/^---\s*\n([\s\S]*?)\n---/);
  if (!match) return null;
  const titleMatch = match[1].match(/^title:\s*["']?(.*?)["']?\s*$/m);
  return titleMatch ? titleMatch[1].trim() : null;
}

function extractHeadings(content) {
  const lines = content.split('\n');
  const headings = [];
  let inFrontmatter = false;
  let frontmatterDone = false;
  let inCodeBlock = false;
  let frontmatterLineCount = 0;

  for (const line of lines) {
    // Handle frontmatter
    if (!frontmatterDone && line.trim() === '---') {
      frontmatterLineCount++;
      if (frontmatterLineCount === 1) { inFrontmatter = true; continue; }
      if (frontmatterLineCount === 2) { inFrontmatter = false; frontmatterDone = true; continue; }
    }
    if (inFrontmatter) continue;

    // Handle code fences
    if (line.trim().startsWith('```')) {
      inCodeBlock = !inCodeBlock;
      continue;
    }
    if (inCodeBlock) continue;

    // H2
    const h2 = line.match(/^## (.+)/);
    if (h2) {
      const text = h2[1].replace(/\s*\{#[^}]+\}\s*$/, '').trim();
      headings.push({ level: 2, text });
      continue;
    }
    // H3
    const h3 = line.match(/^### (.+)/);
    if (h3) {
      const text = h3[1].replace(/\s*\{#[^}]+\}\s*$/, '').trim();
      headings.push({ level: 3, text });
    }
  }
  return headings;
}

function applyStructuralFlags(headings, title) {
  const flags = [];
  const titleLower = (title || '').toLowerCase().trim();

  for (const h of headings) {
    if (titleLower && h.text.toLowerCase().trim() === titleLower) {
      flags.push(`TITLE_REPEAT: "${h.text}" matches article title`);
    }
  }

  const h2s = headings.filter(h => h.level === 2);
  const h3s = headings.filter(h => h.level === 3);
  if (h2s.length === 1 && h3s.length === 0) {
    flags.push(`SINGLE_HEADING: only one H2, no H3s`);
  }

  return flags;
}

function formatHeadingTree(headings) {
  if (headings.length === 0) return '- (no headings)';

  const hasH2 = headings.some(h => h.level === 2);
  if (!hasH2) {
    // H3-only: prefix with marker line so readers know there are no H2s
    const h3lines = headings.map(h => `  - ${h.text}`).join('\n');
    return `- (H3 only)\n${h3lines}`;
  }

  return headings.map(h => {
    const indent = h.level === 3 ? '  ' : '';
    return `${indent}- ${h.text}`;
  }).join('\n');
}

async function processArticle(id, labelPath, platform) {
  const filePath = await findDocFile(id);
  if (!filePath) {
    console.warn(`[WARN] File not found for id "${id}" (${platform})`);
    return null;
  }

  const content = await fs.readFile(filePath, 'utf-8');
  const extractedTitle = extractFrontmatterTitle(content);
  if (!extractedTitle) console.warn(`[WARN] No title found in frontmatter for "${id}" — using id as fallback`);
  const title = extractedTitle || id;
  const headings = extractHeadings(content);
  const flags = applyStructuralFlags(headings, title);
  const filename = path.basename(filePath);
  const fullPath = `${platform} > ${labelPath.join(' > ')}`;

  let entry = `## ${fullPath}\n\n`;
  entry += `**Title:** ${title}\n`;
  entry += `**File:** ${filename}\n`;
  if (flags.length > 0) {
    entry += `**Auto-flags:** ${flags.join('; ')}\n`;
  }
  entry += `\n${formatHeadingTree(headings)}\n`;

  return entry;
}

async function main() {
  const sections = [];

  for (const { file, platform } of SIDEBAR_FILES) {
    const sidebarPath = path.join(SIDEBARS_DIR, file);
    let data;
    try {
      const raw = await fs.readFile(sidebarPath, 'utf-8');
      data = JSON.parse(raw);
    } catch (err) {
      console.warn(`[WARN] Could not parse ${file}: ${err.message}`);
      continue;
    }

    const articles = walkSidebar(Array.isArray(data) ? data : []);
    console.log(`[${platform}] Found ${articles.length} articles`);

    const entries = [];
    for (const { id, labelPath } of articles) {
      const entry = await processArticle(id, labelPath, platform);
      if (entry) entries.push(entry);
    }
    sections.push(...entries);
  }

  const output = `# Adapty Docs Navigation Map\n\nGenerated: ${new Date().toISOString()}\n\n---\n\n` +
    sections.join('\n---\n\n');
  await fs.writeFile(OUTPUT_FILE, output, 'utf-8');
  console.log(`\nDone. Written to nav-map.md (${sections.length} articles)`);
}

main().catch(err => { console.error(err); process.exit(1); });
