const fs = require('fs');
const path = require('path');

// Scan the api-specs directory for YAML files
function generateApiSpecs() {
  const apiDir = path.join(__dirname, '../api-specs');
  const specs = [];
  
  if (fs.existsSync(apiDir)) {
    const files = fs.readdirSync(apiDir);
    files.forEach(file => {
      if (file.endsWith('.yaml') || file.endsWith('.yml')) {
        const specName = file.replace(/\.(yaml|yml)$/, '');
        specs.push(specName);
      }
    });
  }
  
  return specs;
}

// Generate the specs list
const specs = generateApiSpecs();
console.log('Available API specs:', specs);

// Write to a JSON file that can be imported
const outputPath = path.join(__dirname, '../src/data/api-specs.json');
fs.writeFileSync(outputPath, JSON.stringify(specs, null, 2));
console.log('API specs written to:', outputPath);

module.exports = { generateApiSpecs };
