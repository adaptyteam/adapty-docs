const fs = require('fs');
const path = require('path');

module.exports = function liveChatPlugin(context, options) {
  return {
    name: 'livechat-plugin',
    injectHtmlTags() {
      // Read the livechat-widget.js file content
      const scriptPath = path.join(__dirname, '../public/js/livechat-widget.js');
      let scriptContent = '';
      
      try {
        scriptContent = fs.readFileSync(scriptPath, 'utf8');
      } catch (error) {
        console.error('Error reading livechat-widget.js:', error);
        // Fallback to loading from URL
        return {
          postBodyTags: [
            {
              tagName: 'script',
              attributes: {
                type: 'text/javascript',
                src: '/docs/js/livechat-widget.js',
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
