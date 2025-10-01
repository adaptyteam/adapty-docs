const fs = require('fs');
const path = require('path');

function convertYamlToJs() {
  const specsDir = path.join(__dirname, '../src/components/API/specs');
  const yamlFiles = ['adapty-api.yaml', 'export-analytics-api.yaml', 'web-api.yaml'];

  yamlFiles.forEach(yamlFile => {
    const yamlPath = path.join(specsDir, yamlFile);
    const jsFile = yamlFile.replace('.yaml', '.js');
    const jsPath = path.join(specsDir, jsFile);

    try {
      // Read YAML file as raw text
      const yamlContent = fs.readFileSync(yamlPath, 'utf8');
      
      // Convert to JavaScript module that exports the YAML as a string
      const jsContent = `// Auto-generated from ${yamlFile}
export default \`${yamlContent.replace(/`/g, '\\`')}\`;
`;
      
      // Write JavaScript file
      fs.writeFileSync(jsPath, jsContent);
      console.log(`Converted ${yamlFile} to ${jsFile}`);
    } catch (error) {
      console.error(`Error converting ${yamlFile}:`, error.message);
    }
  });
}

convertYamlToJs();
