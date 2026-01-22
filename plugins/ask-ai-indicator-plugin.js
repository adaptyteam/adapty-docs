const fs = require('fs');
const path = require('path');

module.exports = function askAIIndicatorPlugin(context, options) {
  return {
    name: 'ask-ai-indicator-plugin',
    injectHtmlTags() {
      // Read the ask-ai-indicator.js file content
      const scriptPath = path.join(__dirname, '../public/js/ask-ai-indicator.js');
      let scriptContent = '';
      
      try {
        scriptContent = fs.readFileSync(scriptPath, 'utf8');
      } catch (error) {
        console.error('Error reading ask-ai-indicator.js:', error);
        // Fallback to loading from URL
        return {
          postBodyTags: [
            {
              tagName: 'script',
              attributes: {
                type: 'text/javascript',
                src: '/docs/js/ask-ai-indicator.js',
              },
            },
          ],
        };
      }

      return {
        postBodyTags: [
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
