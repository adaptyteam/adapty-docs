const fs = require('fs-extra');
const path = require('path');

async function copyStaticMarkdownAndLlms() {
  const staticDir = path.join(__dirname, '..', 'static');
  const buildDir = path.join(__dirname, '..', 'build');

  if (!fs.existsSync(staticDir)) {
    console.error('Static directory does not exist.');
    process.exit(1);
  }

  try {
    // Copy all .md files from static root
    const files = await fs.readdir(staticDir);
    let copied = [];
    for (const file of files) {
      if (file.endsWith('.md')) {
        await fs.copy(
          path.join(staticDir, file),
          path.join(buildDir, file),
          { overwrite: true }
        );
        copied.push(file);
        console.log(`Copied ${file} to build directory`);
      }
    }
    // Always copy llms.txt if it exists
    const llmsPath = path.join(staticDir, 'llms.txt');
    if (await fs.pathExists(llmsPath)) {
      await fs.copy(llmsPath, path.join(buildDir, 'llms.txt'), { overwrite: true });
      copied.push('llms.txt');
      console.log('Copied llms.txt to build directory');
    }
    if (copied.length === 0) {
      console.log('No markdown files or llms.txt found to copy.');
    } else {
      console.log('Successfully copied markdown files and llms.txt to build directory');
    }
  } catch (err) {
    console.error('Error copying markdown files and llms.txt:', err);
    process.exit(1);
  }
}

copyStaticMarkdownAndLlms(); 
copyStaticMarkdownAndLlms(); 