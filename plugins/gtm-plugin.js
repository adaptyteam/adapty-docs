/**
 * Google Tag Manager (GTM) plugin for Docusaurus
 * This plugin properly injects GTM code into the head and body sections
 */

module.exports = function gtmPlugin(context, options) {
  const { trackingID } = options;
  
  if (!trackingID) {
    throw new Error('GTM trackingID is required');
  }

  return {
    name: 'gtm-plugin',
    injectHtmlTags() {
      return {
        headTags: [
          // GTM head script
          {
            tagName: 'script',
            innerHTML: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${trackingID}');
            `,
          },
        ],
        preBodyTags: [
          // GTM noscript fallback
          {
            tagName: 'noscript',
            innerHTML: `
              <iframe src="https://www.googletagmanager.com/ns.html?id=${trackingID}"
              height="0" width="0" style="display:none;visibility:hidden"></iframe>
            `,
          },
        ],
      };
    },
  };
};

