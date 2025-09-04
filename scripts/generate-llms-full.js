const fs = require('fs-extra');
const path = require('path');

const DOCS_DIR = path.join(__dirname, '..', 'versioned_docs', 'version-3.0');
const OUTPUT_PATH = path.join(__dirname, '..', 'static', 'llms-full.txt');
const REUSABLE_COMPONENTS_DIR = path.join(__dirname, '..', 'src', 'components', 'reusable');

// Function to remove imports from markdown content
function removeImports(content) {
  // Remove import statements (lines starting with optional whitespace + 'import' and ending with ';')
  return content.replace(/^\s*import\s+.*?;?\s*$/gm, '').trim();
}

// Function to remove Zoom components with their content
function removeZoomComponents(content) {
  // Remove <Zoom> components and their entire content (including nested content)
  return content.replace(/<Zoom[^>]*>[\s\S]*?<\/Zoom>/g, '').trim();
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
  const componentPath = path.join(REUSABLE_COMPONENTS_DIR, `${componentName}.md`);
  
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
    
    // Clean frontmatter first
    content = cleanFrontmatter(content);
    
    // Replace reusable components
    content = await replaceReusableComponents(content);
    
    // Remove imports (after replacing components)
    content = removeImports(content);
    
    // Remove Zoom components (after replacing components)
    content = removeZoomComponents(content);
    
    return content;
  } catch (error) {
    console.error(`Error processing file ${filePath}:`, error);
    return null;
  }
}

// Recursively find all .md files in a directory
async function findMarkdownFiles(dir, files = []) {
  const items = await fs.readdir(dir);
  
  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = await fs.stat(fullPath);
    
    if (stat.isDirectory()) {
      await findMarkdownFiles(fullPath, files);
    } else if (item.endsWith('.md')) {
      files.push(fullPath);
    }
  }
  
  return files;
}

// Read and process markdown file content for llms-full.txt
async function processMarkdownFileForLlmsFull(filePath) {
  try {
    const processedContent = await processMarkdownFile(filePath);
    if (processedContent === null) {
      return '';
    }
    
    const relativePath = path.relative(DOCS_DIR, filePath);
    
    // Add file header
    let finalContent = `\n\n# File: ${relativePath}\n`;
    finalContent += '---\n\n';
    finalContent += processedContent;
    finalContent += '\n\n---\n';
    
    return finalContent;
  } catch (error) {
    console.error(`Error reading file ${filePath}:`, error);
    return '';
  }
}

async function main() {
  try {
    // Check if docs directory exists
    if (!(await fs.pathExists(DOCS_DIR))) {
      console.error('Docs directory does not exist.');
      process.exit(1);
    }

    console.log('Finding all Markdown files in docs directory...');
    const markdownFiles = await findMarkdownFiles(DOCS_DIR);
    
    if (markdownFiles.length === 0) {
      console.log('No Markdown files found in docs directory.');
      return;
    }

    console.log(`Found ${markdownFiles.length} Markdown files.`);

    // Create header for the combined file
    let combinedContent = '# Adapty Documentation - Full Content\n';
    combinedContent += '\nThis file contains the complete content of all documentation pages.\n';
    combinedContent += `\nGenerated on: ${new Date().toISOString()}\n`;
    combinedContent += `Total files: ${markdownFiles.length}\n`;
    combinedContent += '\n---\n';

    // Process each markdown file
    for (const filePath of markdownFiles) {
      console.log(`Processing: ${path.relative(DOCS_DIR, filePath)}`);
      const fileContent = await processMarkdownFileForLlmsFull(filePath);
      combinedContent += fileContent;
    }

    // Add footer
    combinedContent += '\n\n# End of Documentation\n';
    combinedContent += `\n_Generated on: ${new Date().toISOString()}_\n`;

    // Write the combined content to llms-full.txt
    await fs.writeFile(OUTPUT_PATH, combinedContent);
    console.log(`Successfully generated llms-full.txt with ${markdownFiles.length} files`);
    console.log(`Output file: ${OUTPUT_PATH}`);

  } catch (error) {
    console.error('Error generating llms-full.txt:', error);
    process.exit(1);
  }
}

main();
