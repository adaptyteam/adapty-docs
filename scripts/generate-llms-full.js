const fs = require('fs-extra');
const path = require('path');

const BUILD_DIR = path.join(__dirname, '..', 'build');
const OUTPUT_PATH = path.join(__dirname, '..', 'static', 'llms-full.txt');

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

// Read and process markdown file content
async function processMarkdownFile(filePath) {
  try {
    const content = await fs.readFile(filePath, 'utf8');
    const relativePath = path.relative(BUILD_DIR, filePath);
    
    // Add file header
    let processedContent = `\n\n# File: ${relativePath}\n`;
    processedContent += '---\n\n';
    processedContent += content;
    processedContent += '\n\n---\n';
    
    return processedContent;
  } catch (error) {
    console.error(`Error reading file ${filePath}:`, error);
    return '';
  }
}

async function main() {
  try {
    // Check if build directory exists
    if (!(await fs.pathExists(BUILD_DIR))) {
      console.error('Build directory does not exist. Please run the build first.');
      process.exit(1);
    }

    console.log('Finding all Markdown files in build directory...');
    const markdownFiles = await findMarkdownFiles(BUILD_DIR);
    
    if (markdownFiles.length === 0) {
      console.log('No Markdown files found in build directory.');
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
      console.log(`Processing: ${path.relative(BUILD_DIR, filePath)}`);
      const fileContent = await processMarkdownFile(filePath);
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
