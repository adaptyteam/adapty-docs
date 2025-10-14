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
  unity: { sidebarKey: 'sdkunity', name: 'Unity SDK' },
  kmp: { sidebarKey: 'sdkkmp', name: 'Kotlin Multiplatform SDK' },
  capacitor: { sidebarKey: 'sdkcapacitor', name: 'Capacitor SDK' }
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
    if (item.type === 'category') {
      // Handle category with link property
      if (item.link && item.link.type === 'doc') {
        const info = await getDocInfo(item.link.id, item.label);
        if (info) out.push(info);
      }
      // Recursively process category items
      if (item.items) {
        await walkSidebar(item.items, out);
      }
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

// Generate comprehensive content for a specific platform (all sidebars with platform highlighted)
async function generateFullPlatformContent(platformKey, platformConfig, sidebar) {
  let content = `# ${platformConfig.name} - Complete Documentation\n`;
  content += '\n---\n';
  
  // Process tutorial sidebar
  if (sidebar.tutorialSidebar) {
    const tutorialDocs = await walkSidebar(sidebar.tutorialSidebar);
    if (tutorialDocs.length > 0) {
      content += '\n## Tutorial & Getting Started\n\n';
      for (const doc of tutorialDocs) {
        content += `- [${doc.title}](https://adapty.io/docs/${doc.docId}.md)`;
        if (doc.description) content += `  \n  _${doc.description}_`;
        content += '\n';
      }
    }
  }
  
  // Process API sidebar
  if (sidebar.APISidebar) {
    const apiDocs = await walkSidebar(sidebar.APISidebar);
    if (apiDocs.length > 0) {
      content += '\n## API Reference\n\n';
      for (const doc of apiDocs) {
        content += `- [${doc.title}](https://adapty.io/docs/${doc.docId}.md)`;
        if (doc.description) content += `  \n  _${doc.description}_`;
        content += '\n';
      }
    }
  }
  
  // Process all platform sidebars, highlighting the current platform
  for (const [otherPlatformKey, otherPlatformConfig] of Object.entries(PLATFORMS)) {
    if (sidebar[otherPlatformConfig.sidebarKey]) {
      const platformDocs = await walkSidebar(sidebar[otherPlatformConfig.sidebarKey]);
      if (platformDocs.length > 0) {
        const sectionTitle = otherPlatformKey === platformKey 
          ? `## ${otherPlatformConfig.name} (Current Platform)` 
          : `## ${otherPlatformConfig.name}`;
        content += `\n${sectionTitle}\n\n`;
        for (const doc of platformDocs) {
          content += `- [${doc.title}](https://adapty.io/docs/${doc.docId}.md)`;
          if (doc.description) content += `  \n  _${doc.description}_`;
          content += '\n';
        }
      }
    }
  }
  
  content += '\n---\n';
  content += `\n_Last updated: ${new Date().toISOString()}_\n`;
  
  return content;
}

async function main() {
  const sidebar = require(SIDEBAR_PATH);
  
  // Generate main llms.txt (all sidebars combined with headings)
  let content = '# Adapty Documentation Index\n';
  content += '\n---\n';
  
  // Process tutorial sidebar
  if (sidebar.tutorialSidebar) {
    const tutorialDocs = await walkSidebar(sidebar.tutorialSidebar);
    if (tutorialDocs.length > 0) {
      content += '\n## Tutorial & Getting Started\n\n';
      for (const doc of tutorialDocs) {
        content += `- [${doc.title}](https://adapty.io/docs/${doc.docId}.md)`;
        if (doc.description) content += `  \n  _${doc.description}_`;
        content += '\n';
      }
    }
  }
  
  // Process API sidebar
  if (sidebar.APISidebar) {
    const apiDocs = await walkSidebar(sidebar.APISidebar);
    if (apiDocs.length > 0) {
      content += '\n## API Reference\n\n';
      for (const doc of apiDocs) {
        content += `- [${doc.title}](https://adapty.io/docs/${doc.docId}.md)`;
        if (doc.description) content += `  \n  _${doc.description}_`;
        content += '\n';
      }
    }
  }
  
  // Process all platform sidebars
  for (const [platformKey, platformConfig] of Object.entries(PLATFORMS)) {
    if (sidebar[platformConfig.sidebarKey]) {
      const platformDocs = await walkSidebar(sidebar[platformConfig.sidebarKey]);
      if (platformDocs.length > 0) {
        content += `\n## ${platformConfig.name}\n\n`;
        for (const doc of platformDocs) {
          content += `- [${doc.title}](https://adapty.io/docs/${doc.docId}.md)`;
          if (doc.description) content += `  \n  _${doc.description}_`;
          content += '\n';
        }
      }
    }
  }
  
  content += '\n---\n';
  content += `\n_Last updated: ${new Date().toISOString()}_\n`;

  await fs.writeFile(path.join(STATIC_DIR, 'llms.txt'), content);
  console.log('Successfully generated llms.txt');

  // Generate platform-specific files
  for (const [platformKey, platformConfig] of Object.entries(PLATFORMS)) {
    const platformContent = await generatePlatformContent(platformKey, platformConfig, sidebar);
    if (platformContent) {
      // Generate regular platform file (platform-specific only)
      await fs.writeFile(path.join(STATIC_DIR, `${platformKey}-llms.txt`), platformContent);
      console.log(`Successfully generated ${platformKey}-llms.txt`);
      
      // Generate full platform file (all sidebars with platform highlighted)
      const fullContent = await generateFullPlatformContent(platformKey, platformConfig, sidebar);
      await fs.writeFile(path.join(STATIC_DIR, `${platformKey}-llms-full.txt`), fullContent);
      console.log(`Successfully generated ${platformKey}-llms-full.txt`);
    }
  }
}

main().catch(e => { console.error(e); process.exit(1); }); 