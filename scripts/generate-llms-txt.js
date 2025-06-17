const fs = require('fs-extra');
const path = require('path');
const matter = require('gray-matter');

const DOCS_DIR = path.join(__dirname, '..', 'versioned_docs', 'version-3.0');
const SIDEBAR_PATH = path.join(__dirname, '..', 'versioned_sidebars', 'version-3.0-sidebars.json');
const OUTPUT_PATH = path.join(__dirname, '..', 'static', 'llms.txt');

// Helper to get doc info from file
async function getDocInfo(docId, sidebarLabel) {
  const filePath = path.join(DOCS_DIR, `${docId}.md`);
  if (!(await fs.pathExists(filePath))) return null;
  const raw = await fs.readFile(filePath, 'utf8');
  const { data } = matter(raw);
  const title = sidebarLabel || data.title || docId;
  const description = data.description || '';
  return { docId, title, description };
}

// Recursively walk sidebar
async function walkSidebar(items, out = []) {
  for (const item of items) {
    if (item.type === 'category' && item.items) {
      await walkSidebar(item.items, out);
    } else if (item.type === 'doc') {
      const info = await getDocInfo(item.id, item.label);
      if (info) out.push(info);
    } else if (typeof item === 'string') {
      // fallback for string doc IDs
      const info = await getDocInfo(item, null);
      if (info) out.push(info);
    }
  }
  return out;
}

async function main() {
  const sidebar = require(SIDEBAR_PATH);
  const sidebarItems = sidebar.tutorialSidebar;
  const docs = await walkSidebar(sidebarItems);

  let content = '# Adapty Documentation Index\n';
  content += '\n---\n';
  for (const doc of docs) {
    content += `- [${doc.title}](https://adapty.io/docs/${doc.docId}.md)`;
    if (doc.description) content += `  \n  _${doc.description}_`;
    content += '\n';
  }
  content += '\n---\n';
  content += `\n_Last updated: ${new Date().toISOString()}_\n`;

  await fs.writeFile(OUTPUT_PATH, content);
  console.log('Successfully generated llms.txt');
}

main().catch(e => { console.error(e); process.exit(1); }); 