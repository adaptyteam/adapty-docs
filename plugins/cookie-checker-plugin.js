module.exports = function cookieCheckerPlugin(context, options) {
  return {
    name: 'cookie-checker-plugin',
    injectHtmlTags() {
      return {
        headTags: [
          {
            tagName: 'script',
            attributes: {
              type: 'text/javascript',
              src: '/docs/cookie-checker.js',
            },
          },
        ],
      };
    },
  };
}; 