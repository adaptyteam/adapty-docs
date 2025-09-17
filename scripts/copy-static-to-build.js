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
    // Copy all .md and .js files from static root
    const files = await fs.readdir(staticDir);
    let copied = [];
    for (const file of files) {
      if (file.endsWith('.md') || file.endsWith('.js')) {
        await fs.copy(
          path.join(staticDir, file),
          path.join(buildDir, file),
          { overwrite: true }
        );
        copied.push(file);
        console.log(`Copied ${file} to build directory`);
      }
    }
    
    // Copy js directory if it exists
    const jsDir = path.join(staticDir, 'js');
    const buildJsDir = path.join(buildDir, 'js');
    if (await fs.pathExists(jsDir)) {
      await fs.copy(jsDir, buildJsDir, { overwrite: true });
      const jsFiles = await fs.readdir(jsDir);
      copied.push(...jsFiles.map(file => `js/${file}`));
      console.log('Copied js directory to build directory');
    }
    // Always copy llms.txt if it exists
    const llmsPath = path.join(staticDir, 'llms.txt');
    if (await fs.pathExists(llmsPath)) {
      await fs.copy(llmsPath, path.join(buildDir, 'llms.txt'), { overwrite: true });
      copied.push('llms.txt');
      console.log('Copied llms.txt to build directory');
    }
    
    // Always copy llms-full.txt if it exists
    const llmsFullPath = path.join(staticDir, 'llms-full.txt');
    if (await fs.pathExists(llmsFullPath)) {
      await fs.copy(llmsFullPath, path.join(buildDir, 'llms-full.txt'), { overwrite: true });
      copied.push('llms-full.txt');
      console.log('Copied llms-full.txt to build directory');
    }
    
    // Copy platform-specific LLM files
    const platforms = ['ios', 'android', 'react-native', 'flutter', 'unity'];
    for (const platform of platforms) {
      // Copy regular platform LLM file
      const platformLlmsPath = path.join(staticDir, `${platform}-llms.txt`);
      if (await fs.pathExists(platformLlmsPath)) {
        await fs.copy(platformLlmsPath, path.join(buildDir, `${platform}-llms.txt`), { overwrite: true });
        copied.push(`${platform}-llms.txt`);
        console.log(`Copied ${platform}-llms.txt to build directory`);
      }
      
      // Copy full platform LLM file
      const platformLlmsFullPath = path.join(staticDir, `${platform}-llms-full.txt`);
      if (await fs.pathExists(platformLlmsFullPath)) {
        await fs.copy(platformLlmsFullPath, path.join(buildDir, `${platform}-llms-full.txt`), { overwrite: true });
        copied.push(`${platform}-llms-full.txt`);
        console.log(`Copied ${platform}-llms-full.txt to build directory`);
      }
    }
    if (copied.length === 0) {
      console.log('No markdown files or LLM files found to copy.');
    } else {
      console.log('Successfully copied markdown files and LLM files to build directory');
    }
  } catch (err) {
    console.error('Error copying markdown files and LLM files:', err);
    process.exit(1);
  }
}

copyStaticMarkdownAndLlms(); 