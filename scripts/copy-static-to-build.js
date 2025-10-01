const fs = require('fs-extra');
const path = require('path');

async function copyStaticMarkdownAndLlms() {
  const staticDir = path.join(__dirname, '..', 'static');
  const buildDir = path.join(__dirname, '..', 'build');
  const apiSpecsDir = path.join(__dirname, '..', 'api-specs');

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
    // Copy API YAML files from static/api to build/api directory
    const apiDir = path.join(staticDir, 'api');
    const buildApiDir = path.join(buildDir, 'api');
    if (await fs.pathExists(apiDir)) {
      // Ensure build/api directory exists
      await fs.ensureDir(buildApiDir);
      
      const apiFiles = await fs.readdir(apiDir);
      for (const file of apiFiles) {
        if (file.endsWith('.yaml') || file.endsWith('.yml')) {
          await fs.copy(
            path.join(apiDir, file),
            path.join(buildApiDir, file),
            { overwrite: true }
          );
          copied.push(`api/${file}`);
          console.log(`Copied ${file} to build/api directory`);
        }
      }
    }
    
    if (copied.length === 0) {
      console.log('No markdown files, LLM files, or API YAML files found to copy.');
    } else {
      console.log('Successfully copied markdown files, LLM files, and API YAML files');
    }
  } catch (err) {
    console.error('Error copying markdown files and LLM files:', err);
    process.exit(1);
  }
}

copyStaticMarkdownAndLlms(); 