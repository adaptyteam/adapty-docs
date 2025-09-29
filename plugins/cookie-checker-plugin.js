const fs = require('fs');
const path = require('path');

module.exports = function cookieCheckerPlugin(context, options) {
  return {
    name: 'cookie-checker-plugin',
    injectHtmlTags() {
      // Read the cookie-checker.js file content
      const scriptPath = path.join(__dirname, '../public/js/cookie-checker.js');
      let scriptContent = '';
      
      try {
        scriptContent = fs.readFileSync(scriptPath, 'utf8');
      } catch (error) {
        console.error('Error reading cookie-checker.js:', error);
        // Fallback to loading from URL
        return {
          headTags: [
            {
              tagName: 'script',
              attributes: {
                type: 'text/javascript',
                src: '/js/cookie-checker.js',
              },
            },
          ],
        };
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