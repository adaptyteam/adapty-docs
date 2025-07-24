const fs = require('fs-extra');
const path = require('path');

async function copyMarkdownFiles() {
  // Only copy from versioned_docs/version-3.0
  const sourceDir = path.join(__dirname, '..', 'versioned_docs', 'version-3.0');
  // Copy directly to static directory since baseUrl is /docs/
  const staticDir = path.join(__dirname, '..', 'static');
  // Path to reusable components
  const reusableComponentsDir = path.join(__dirname, '..', 'src', 'components', 'reusable');

  // Function to remove imports from markdown content
  function removeImports(content) {
    // Remove import statements (lines starting with 'import' and ending with ';')
    return content.replace(/^import\s+.*?;?\s*$/gm, '').trim();
  }

  // Function to clean frontmatter
  function cleanFrontmatter(content) {
    const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n/;
    const match = content.match(frontmatterRegex);
    
    if (!match) {
      return content; // No frontmatter found
    }

    const frontmatter = match[1];
    const lines = frontmatter.split('\n');
    const cleanedLines = [];

    for (const line of lines) {
      const trimmedLine = line.trim();
      // Skip lines that contain metadata, keywords, or rank
      if (!trimmedLine.startsWith('metadata') && 
          !trimmedLine.startsWith('keywords') && 
          !trimmedLine.startsWith('rank')) {
        cleanedLines.push(line);
      }
    }

    // If frontmatter is empty after cleaning, remove it entirely
    if (cleanedLines.length === 0 || cleanedLines.every(line => line.trim() === '')) {
      return content.replace(frontmatterRegex, '');
    }

    // Reconstruct frontmatter
    const cleanedFrontmatter = cleanedLines.join('\n');
    return content.replace(frontmatterRegex, `---\n${cleanedFrontmatter}\n---\n\n`);
  }

  // Function to get reusable component content
  async function getReusableComponentContent(componentName) {
    const componentPath = path.join(reusableComponentsDir, `${componentName}.md`);
    
    if (await fs.pathExists(componentPath)) {
      const content = await fs.readFile(componentPath, 'utf8');
      // Remove the comment at the top if it exists
      return content.replace(/^<!---.*?--->\s*\n?/s, '').trim();
    }
    
    return null;
  }

  // Function to replace reusable component tags with their content
  async function replaceReusableComponents(content) {
    // Find all component tags like <ComponentName />
    const componentRegex = /<(\w+)\s*\/>/g;
    let match;
    let processedContent = content;

    while ((match = componentRegex.exec(content)) !== null) {
      const componentName = match[1];
      const componentContent = await getReusableComponentContent(componentName);
      
      if (componentContent) {
        processedContent = processedContent.replace(match[0], componentContent);
      }
    }

    return processedContent;
  }

  // Function to process a single markdown file
  async function processMarkdownFile(filePath) {
    try {
      let content = await fs.readFile(filePath, 'utf8');
      
      // Remove imports
      content = removeImports(content);
      
      // Clean frontmatter
      content = cleanFrontmatter(content);
      
      // Replace reusable components
      content = await replaceReusableComponents(content);
      
      return content;
    } catch (error) {
      console.error(`Error processing file ${filePath}:`, error);
      return null;
    }
  }

  // Function to recursively copy and process markdown files
  async function copyFilesRecursively(dir, relativePath = '') {
    if (!fs.existsSync(dir)) {
      return;
    }

    const entries = await fs.readdir(dir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      const newRelativePath = path.join(relativePath, entry.name);

      if (entry.isDirectory()) {
        // Create the directory in static
        await fs.ensureDir(path.join(staticDir, newRelativePath));
        await copyFilesRecursively(fullPath, newRelativePath);
      } else if (entry.isFile() && entry.name.endsWith('.md')) {
        // Process and copy the markdown file
        const processedContent = await processMarkdownFile(fullPath);
        if (processedContent !== null) {
          await fs.writeFile(path.join(staticDir, newRelativePath), processedContent, 'utf8');
        }
      }
    }
  }

  try {
    await copyFilesRecursively(sourceDir);
    console.log('Successfully copied and processed markdown files to static directory');
  } catch (err) {
    console.error('Error copying markdown files:', err);
    process.exit(1);
  }
}

copyMarkdownFiles(); 