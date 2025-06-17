const fs = require('fs-extra');
const path = require('path');

async function copyMarkdownFiles() {
  // Only copy from versioned_docs/version-3.0
  const sourceDir = path.join(__dirname, '..', 'versioned_docs', 'version-3.0');
  // Copy directly to static directory since baseUrl is /docs/
  const staticDir = path.join(__dirname, '..', 'static');

  // Function to recursively copy markdown files
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
        // Copy the markdown file
        await fs.copy(fullPath, path.join(staticDir, newRelativePath));
      }
    }
  }

  try {
    await copyFilesRecursively(sourceDir);
    console.log('Successfully copied markdown files to static directory');
  } catch (err) {
    console.error('Error copying markdown files:', err);
    process.exit(1);
  }
}

copyMarkdownFiles(); 