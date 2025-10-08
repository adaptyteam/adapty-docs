// docusaurus.config.js
// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import { themes as prismThemes } from "prism-react-renderer";

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "Adapty",
  tagline: "Learn how to start with Adapty and get maximum out of your app",
  favicon: "img/favicon_black.svg",

  // Set the production url of your site here
  url: "https://adapty.io",
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: "/docs/",

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "adapty", // Usually your GitHub org/user name.
  projectName: "adapty-docs", // Usually your repo name.

  onBrokenLinks: "warn",
  onBrokenMarkdownLinks: "ignore",

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
          path: "docs",
          routeBasePath: "/",
          lastVersion: '3.0',
          versions: {
            "3.0" : {
              label: "3.0",
              path: "/",
              banner: "none",
            },
          },
          includeCurrentVersion: false,
        },
        blog: {
          showReadingTime: false,
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      }),
    ],
  ],
  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: "img/opengraph_adapty.png",
      metadata: [
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'keywords', content: 'adapty, subscription management, mobile subscriptions, app monetization, in-app purchases, subscription analytics, paywall, revenue optimization' }
      ],
      navbar: {
        title: "",
        logo: {
          alt: "Adapty Docs",
          src: "img/Logo_black.svg",
          href: "https://adapty.io",
        },
        items: [
          /*{
            type: "localeDropdown",
            position: "right",
            class: "navbar__link navbar__locale-link",
          },*/
          {
            type: "docSidebar",
            sidebarId: "tutorialSidebar",
            position: "left",
            label: "Documentation",
          },
          {
            label: "Mobile SDK ⏷",
            position: "left",
            items: [
              {
                label: "iOS",
                type: "docSidebar",
                sidebarId: "sdkios",
              },
              {
                label: "Android",
                type: "docSidebar",
                sidebarId: "sdkandroid",
              },
              {
                label: "Flutter",
                type: "docSidebar",
                sidebarId: "sdkflutter",
              },
              {
                label: "React Native",
                type: "docSidebar",
                sidebarId: "sdkreactnative",
              },
              {
                label: "Unity",
                type: "docSidebar",
                sidebarId: "sdkunity",
              },
              {
                label: "Capacitor",
                type: "docSidebar",
                sidebarId: "sdkcapacitor",
              },
              {
                label: "Kotlin Multiplatform",
                type: "docSidebar",
                sidebarId: "sdkkmp",
              }
            ],
          },
          {
            label: "Server API",
            position: "left",
            type: "docSidebar",
            sidebarId: "APISidebar",
          },
          {
            label: "Support Forum",
            position: "left",
            href: "https://ask.adapty.io/questions",
          },
          /*{
            type: "docsVersionDropdown",
            position: "right",
            dropdownActiveClassDisabled: true,
          },*/
          {
            href: "https://app.adapty.io/login",
            label: "Sign In",
            position: "right",
            className: "navbar__item navbar__link navbar__link--sign-in",
          },
          {
            href: "https://app.adapty.io/registration",
            label: "Sign Up for Free",
            position: "right",
            className: "navbar__item navbar__link navbar__link--sign-up",
          },
          // {
          //   href: "https://docs.adapty.io/discuss",
          //   label: "Share feedback",
          //   position: "right",
          //   class: "navbar__item navbar__link navbar__link--feedback",

          // },
        ],
      },

      footer: {
        style: "dark",
        links: [
          {
            title: null,
            items: [
              {
                html: `
              
              <div class="footer__header">  
                 <a href="https://adapty.io" target="_blank" rel="noopener noreferrer" class="footer__logo-icon">
                    <img src="/docs/img/Logo_white.svg" alt="Adapty Docs" class="footer__logo-svg">
                </a>
                <div class="footer__social">
                  <a href="https://twitter.com/AdaptyTeam" target="_blank" rel="noopener noreferrer" class="footer__social-icon">
                      <img class="footer__social-svg" src="/docs/img/logo_Twitter_white.svg" alt="Twitter"> 
                  </a>
                  <a href="https://www.linkedin.com/company/adaptyio" target="_blank" rel="noopener noreferrer" class="footer__social-icon">
                      <img class="footer__social-svg" src="/docs/img/logo_In_white.svg" alt="LinkedIn"> 
                  </a>
                  <a href="https://github.com/adaptyteam" target="_blank" rel="noopener noreferrer" class="footer__social-icon">
                      <img class="footer__social-svg" src="/docs/img/logo_github_white.svg" alt="GitHub"> 
                  </a>
                  <a href="https://www.youtube.com/@SubhubEn" target="_blank" rel="noopener noreferrer" class="footer__social-icon">
                      <img class="footer__social-svg" src="/docs/img/logo_youtube_white.svg" alt="YouTube"> 
                  </a>
                </div>
       
                </div>
                `,
              },
            ],
          },
          {
            title: "Adapty SDK Sample Apps",
            items: [
              {
                label: "iOS",
                href: "https://github.com/adaptyteam/AdaptySDK-iOS/tree/master/Examples",
              },
              {
                label: "Android",
                href: "https://github.com/adaptyteam/AdaptySDK-Android",
              },
              {
                label: "Flutter",
                href: "https://github.com/adaptyteam/AdaptySDK-Flutter/tree/master/example",
              },
              {
                label: "Unity",
                href: "https://github.com/adaptyteam/AdaptySDK-Unity",
              },
            ],
          },
          {
            title: "SDK Reference",
            items: [
              {
                label: "iOS",
                href: "/sdk-installation-ios",
              },
              {
                label: "Android",
                href: "/sdk-installation-android",
              },
              {
                label: "Flutter",
                href: "/sdk-installation-flutter",
              },
              {
                label: "React Native",
                href: "/sdk-installation-reactnative",
              },
              {
                label: "SDK Models",
                href: "https://adapty.io/docs/sdk-models",
              },
            ],
          },
          {
            title: "API Reference",
            items: [
              {
                label: "Server-side API",
                href: "/getting-started-with-server-side-api",
              },
              {
                label: "Web API",
                href: "/web-api",
              },
              {
                label: "Analytics export API",
                href: "/export-analytics-api",
              },
            ],
          },
          {
            title: "Resources",
            items: [
              {
                label: "Adapty Dashboard",
                href: "https://app.adapty.io/",
              },
              {
                label: "Blog",
                href: "https://adapty.io/blog/",
              },
              {
                label: "Support",
                href: "mailto:support@adapty.io",
              },
            ],
          },
        ],
        copyright: `© ${new Date().getFullYear()} Adapty Tech Inc.`,
      },

      
      algolia: {
      // The application ID provided by Algolia
      appId: 'IPH9RRTSQS',

      // Public API key: it is safe to commit it
      apiKey: '5e3fd9357b98f9f0d44bab0f0b7634c0',

      indexName: 'adapty',
      
      // Enable click analytics to get queryID for proper event attribution
      clickAnalytics: true,
      },
      
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
        additionalLanguages: [
          "java",
          "kotlin",
          "swift",
          "typescript",
          "csharp",
          "diff",
          "javascript",
          "dart", // For Flutter, Dart is the primary language
          "toml",
          "groovy",
          "json",
          "php",
          "HTTP",
          "ruby",
          "python",
          "bash",
          "http"

        ],
        magicComments: [
        // Remember to extend the default highlight class name as well!
        {
          className: 'theme-code-block-highlighted-line',
          line: 'highlight-next-line',
          block: {start: 'highlight-start', end: 'highlight-end'},
        },
        {
          className: 'code-block-error-line',
          line: 'This will error',
        },
      ],
      },

      // Configure the color mode to default to light and disable the dark mode switch
      colorMode: {
        defaultMode: 'light', // Set default theme to light mode
        disableSwitch: true,  // Disable the toggle for switching themes
        respectPrefersColorScheme: false, // Ignore system preference for dark mode
      },
      sidebar: {
        autoCollapseCategories: true,
        hideable: true,
      },
    }),

     scripts: [
    {
      src: 'https://survey.survicate.com/workspaces/af55d3f51f8189593de1c948b75c88f6/web_surveys.js',
      async: true,
    },
  ],

  plugins: [
    require('./plugins/cookie-checker-plugin'),
    require.resolve('./plugins/custom-meta-plugin.js'),
    [require('./plugins/gtm-plugin'), {
      trackingID: 'GTM-PXJV3N7',
    }],
    // Existing build plugins
    function copyMarkdownPlugin() {
      return {
        name: 'copy-markdown-plugin',
        async postBuild() {
          const { execSync } = require('child_process');
          try {
            execSync('node scripts/copy-markdown.js', { stdio: 'inherit' });
          } catch (e) {
            console.error('Error running copy-markdown.js:', e);
          }
        },
      };
    },
    function generateLlmsTxtPlugin() {
      return {
        name: 'generate-llms-txt-plugin',
        async postBuild() {
          const { execSync } = require('child_process');
          try {
            execSync('node scripts/generate-llms-txt.js', { stdio: 'inherit' });
          } catch (e) {
            console.error('Error running generate-llms-txt.js:', e);
          }
        },
      };
    },
    function generateLlmsFullPlugin() {
      return {
        name: 'generate-llms-full-plugin',
        async postBuild() {
          const { execSync } = require('child_process');
          try {
            execSync('node scripts/generate-llms-full.js', { stdio: 'inherit' });
          } catch (e) {
            console.error('Error running generate-llms-full.js:', e);
          }
        },
      };
    },
    function copyStaticToBuildPlugin() {
      return {
        name: 'copy-static-to-build-plugin',
        async postBuild() {
          const { execSync } = require('child_process');
          try {
            execSync('node scripts/copy-static-to-build.js', { stdio: 'inherit' });
          } catch (e) {
            console.error('Error running copy-static-to-build.js:', e);
          }
        },
      };
    },
  ],
};

export default config;
