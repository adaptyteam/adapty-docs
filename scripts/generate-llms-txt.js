const fs = require('fs-extra');
const path = require('path');
const matter = require('gray-matter');

const DOCS_DIR = path.join(__dirname, '..', 'versioned_docs', 'version-3.0');
const SIDEBAR_PATH = path.join(__dirname, '..', 'versioned_sidebars', 'version-3.0-sidebars.json');
const STATIC_DIR = path.join(__dirname, '..', 'static');

// Platform configurations
const PLATFORMS = {
  ios: { sidebarKey: 'sdkios', name: 'iOS SDK' },
  android: { sidebarKey: 'sdkandroid', name: 'Android SDK' },
  'react-native': { sidebarKey: 'sdkreactnative', name: 'React Native SDK' },
  flutter: { sidebarKey: 'sdkflutter', name: 'Flutter SDK' },
  unity: { sidebarKey: 'sdkunity', name: 'Unity SDK' }
};

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

// Generate content for a specific platform
async function generatePlatformContent(platformKey, platformConfig, sidebar) {
  const sidebarItems = sidebar[platformConfig.sidebarKey];
  if (!sidebarItems) {
    console.warn(`No sidebar found for platform: ${platformKey}`);
    return null;
  }

  const docs = await walkSidebar(sidebarItems);
  
  let content = `# ${platformConfig.name} Documentation Index\n`;
  content += '\n---\n';
  for (const doc of docs) {
    content += `- [${doc.title}](https://adapty.io/docs/${doc.docId}.md)`;
    if (doc.description) content += `  \n  _${doc.description}_`;
    content += '\n';
  }
  content += '\n---\n';
  content += `\n_Last updated: ${new Date().toISOString()}_\n`;
  
  return content;
}

async function main() {
  const sidebar = require(SIDEBAR_PATH);
  
  // Generate main llms.txt (tutorial sidebar)
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

  await fs.writeFile(path.join(STATIC_DIR, 'llms.txt'), content);
  console.log('Successfully generated llms.txt');

  // Generate platform-specific files
  for (const [platformKey, platformConfig] of Object.entries(PLATFORMS)) {
    const platformContent = await generatePlatformContent(platformKey, platformConfig, sidebar);
    if (platformContent) {
      // Generate regular platform file
      await fs.writeFile(path.join(STATIC_DIR, `${platformKey}-llms.txt`), platformContent);
      console.log(`Successfully generated ${platformKey}-llms.txt`);
      
      // Generate full platform file (same content for now, but can be extended)
      await fs.writeFile(path.join(STATIC_DIR, `${platformKey}-llms-full.txt`), platformContent);
      console.log(`Successfully generated ${platformKey}-llms-full.txt`);
    }
  }
}

main().catch(e => { console.error(e); process.exit(1); }); 