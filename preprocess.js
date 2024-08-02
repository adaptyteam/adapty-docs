const fs = require('fs');
const path = require('path');

const docsDir = path.join(__dirname, 'docs-test'); // Adjust the path as necessary

const convertBrokenLinksToText = (dir) => {
  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    const fullPath = path.join(dir, file);

    if (fs.lstatSync(fullPath).isDirectory()) {
      convertBrokenLinksToText(fullPath);
    } else if (path.extname(fullPath) === '.md') {
      let content = fs.readFileSync(fullPath, 'utf8');

      // Convert specific broken link to regular text
      content = content.replace(/\[.*?\]\(\/docs-test\/versions\)/g, 'docs-test/versions');

      fs.writeFileSync(fullPath, content, 'utf8');
    }
  });
};

convertBrokenLinksToText(docsDir);
