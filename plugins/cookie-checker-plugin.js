const path = require('path');
const fs = require('fs');

module.exports = function cookieCheckerPlugin(context, options) {
  return {
    name: 'cookie-checker-plugin',
    injectHtmlTags() {
      const scriptPath = path.join(__dirname, '../static/js/cookie-checker.js');
      let scriptContent = '';
      
      try {
        scriptContent = fs.readFileSync(scriptPath, 'utf8');
      } catch (error) {
        console.error('Error reading cookie-checker.js:', error);
        return {};
      }

      return {
        headTags: [
          {
            tagName: 'script',
            attributes: {
              type: 'text/javascript',
            },
            innerHTML: scriptContent,
          },
        ],
      };
    },
  };
}; 