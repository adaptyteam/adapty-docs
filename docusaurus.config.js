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
            /*"2.0": {
              banner: "none",
              path: "2.0",

            },*/
          },
          includeCurrentVersion: false,
        },
        blog: {
          showReadingTime: false,
        },
        gtag: {
          trackingID: "G-0M1BCR2275", // Replace with your Google Analytics Measurement ID
          anonymizeIP: true, // Optional, anonymize IP addresses
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      }),
    ],
  ],
  /*plugins: [
    [
      '@docusaurus/plugin-client-redirects',
      {
        redirects: [
          {
            to: 'https://adapty.io/docs/what-is-adapty',
            from: ['/docs/'],
          },
        ],
      },
    ],
  ],*/
  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: "img/opengraph_adapty.png",
      metadata: [{ name: 'twitter:card', content: 'summary_large_image' }],
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
          /*{
            label: "SDK Reference",
            position: "left",
            items: [
              {
                label: "iOS",
                href: "https://swift.adapty.io/documentation/adapty/",
              },
              {
                label: "Android",
                href: "https://kotlin.adapty.io/",
              },
              {
                label: "Flutter",
                href: "https://pub.dev/documentation/adapty_flutter/latest/adapty_flutter/adapty_flutter-library.html",
              },
              {
                label: "React Native",
                href: "https://react-native.adapty.io/classes/adapty",
              },
            ],
          },*/
          {
            label: "Server API",
            position: "left",
            href: "/getting-started-with-server-side-api",
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
            class: "navbar__item navbar__link navbar__link--sign-in",
          },
          {
            href: "https://app.adapty.io/registration",
            label: "Sign Up for Free",
            position: "right",
            class: "navbar__item navbar__link navbar__link--sign-up",
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
            title: "Adapty UI Sample Apps ",
            items: [
              {
                label: "iOS",
                href: "https://github.com/adaptyteam/AdaptyUI-iOS",
              },
              {
                label: "Android",
                href: "https://github.com/adaptyteam/AdaptyUI-Android",
              },
              {
                label: "Flutter",
                href: "https://github.com/adaptyteam/AdaptyUI-Flutter",
              },
              {
                label: "React Native",
                href: "https://github.com/adaptyteam/AdaptyUI-React-Native",
              },
              {
                label: "Unity",
                href: "https://github.com/adaptyteam/AdaptyUI-Unity",
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
                label: "React Native",
                href: "https://github.com/adaptyteam/AdaptySDK-React-Native",
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
                href: "https://swift.adapty.io/documentation/adapty/",
              },
              {
                label: "Android",
                href: "https://kotlin.adapty.io/",
              },
              {
                label: "Flutter",
                href: "https://pub.dev/documentation/adapty_flutter/latest/adapty_flutter/adapty_flutter-library.html",
              },
              {
                label: "React Native",
                href: "https://react-native.adapty.io/classes/adapty",
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
                label: "Getting started with server-side API",
                href: "/getting-started-with-server-side-api",
              },
              {
                label: "API specs",
                href: "/server-side-api-specs",
              },
              {
                label: "API objects",
                href: "/server-side-api-objects",
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
};

export default config;
