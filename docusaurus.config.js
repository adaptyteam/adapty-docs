// docusaurus.config.js
// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import { themes as prismThemes } from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Adapty',
  tagline: 'Learn how to start with Adapty and get maximum out of your app',
  favicon: 'img/favicon_black.svg',

  // Set the production url of your site here
  url: 'https://adapty.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/docs-test/',
  
  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'adapty', // Usually your GitHub org/user name.
  projectName: 'adapty-docs', // Usually your repo name.

  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'ignore',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          path: 'docs',
          routeBasePath: '/',
          lastVersion: '2.0',
          versions: {
            '3.0': {
              label: '3.0',
              path: '3.0',
              banner: 'none',
            },
            '2.0': {
              banner: 'none',
              path: '/',
            },
          },
          includeCurrentVersion: false,
        },
        blog: {
          showReadingTime: false,
        },
        gtag: {
          trackingID: 'G-0M1BCR2275', // Replace with your Google Analytics Measurement ID
          anonymizeIP: true, // Optional, anonymize IP addresses
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css')
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
            to: 'https://adapty.io/docs-test/what-is-adapty',
            from: ['/docs-test/'],
          },
        ],
      },
    ],
  ],*/
  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/docusaurus-social-card.jpg',
      navbar: {
        title: '',
        logo: {
          alt: 'Adapty Docs',
          src: 'img/Logo_black.svg',
          href: 'https://adapty.io',
        },
        items: [
          {
            type: 'localeDropdown',
            position: 'right',
          },
          {
            type: 'docSidebar',
            sidebarId: 'tutorialSidebar',
            position: 'left',
            label: 'Documentation',
          },
          {
            label: 'SDK Reference',
            position: 'left',
            items: [
              {
                label: 'iOS',
                href: 'https://swift.adapty.io/documentation/adapty/',
              },
              {
                label: 'Android',
                href: 'https://kotlin.adapty.io/',
              },
              {
                label: 'Flutter',
                href: 'https://pub.dev/documentation/adapty_flutter/latest/adapty_flutter/adapty_flutter-library.html',
              },
              {
                label: 'React Native',
                href: 'https://react-native.adapty.io/classes/adapty',
              },
            ],
          },
          {
            label: 'API Reference',
            position: 'left',
            href: '/getting-started-with-server-side-api',
          },
          {
            type: 'docsVersionDropdown',
            position: 'right',
            //dropdownItemsAfter: [{ to: 'https://adapty.io/docs-test/versions' }],
            dropdownActiveClassDisabled: true,
          },
          {
            href: 'https://app.adapty.io/login',
            label: 'Sign In',
            position: 'right',
          },
          {
            href: 'https://app.adapty.io/registration',
            label: 'Sign Up for Free',
            position: 'right',
          },
          {
            href: 'https://docs.adapty.io/discuss',
            label: 'Share feedback',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'SDK Reference',
            items: [
              {
                label: 'iOS',
                href: 'https://swift.adapty.io/documentation/adapty/',
              },
              {
                label: 'Android',
                href: 'https://kotlin.adapty.io/',
              },
              {
                label: 'Flutter',
                href: 'https://pub.dev/documentation/adapty_flutter/latest/adapty_flutter/adapty_flutter-library.html',
              },
              {
                label: 'React Native',
                href: 'https://react-native.adapty.io/classes/adapty',
              },
              {
                label: 'SDK Models',
                href: 'https://docs.adapty.io/docs/sdk-models',
              },
            ],
          },
          {
            title: 'API Reference',
            items: [
              {
                label: 'Getting started with server-side API',
                href: '/getting-started-with-server-side-api',
              },
              {
                label: 'API specs',
                href: '/server-side-api-specs',
              },
              {
                label: 'API objects',
                href: '/server-side-api-objects',
              },
            ],
          },
          {
            title: 'Sample Apps',
            items: [
             {
                html: `iOS: <a href="https://github.com/adaptyteam/AdaptyUI-iOS">Builder</a> / <a href="https://github.com/adaptyteam/AdaptySDK-iOS/tree/master/Examples">No Builder</a>`,
             },
             {
               html: `Android: <a href="https://github.com/adaptyteam/AdaptyUI-Android">Builder</a> / <a href="https://github.com/adaptyteam/AdaptySDK-Android">No Builder</a>`,
             },
             {
               html: `Flutter: <a href="https://github.com/adaptyteam/AdaptyUI-Flutter">Builder</a> / <a href="https://github.com/adaptyteam/AdaptySDK-Flutter/tree/master/example">No Builder</a>`,
             },
             {
               html: `React Native: <a href="https://github.com/adaptyteam/AdaptyUI-React-Native">Builder</a> / <a href="https://github.com/adaptyteam/AdaptySDK-React-Native">No Builder</a>`,
             },
             {
               html: `Unity: <a href="https://github.com/adaptyteam/AdaptyUI-Unity">Builder</a> / <a href="https://github.com/adaptyteam/AdaptySDK-Unity">No Builder</a>`,
             },
            ],
          },
          {
            title: 'Resources',
            items: [
              {
                label: 'Adapty Dashboard',
                href: 'https://app.adapty.io/',
              },
              {
                label: 'Blog',
                href: 'https://adapty.io/blog/',
              },
              {
                label: 'Support',
                href: 'mailto:support@adapty.io',
              },
            ],
          },
          {
            title: 'Follow Us',
            items: [
              {
                label: 'Twitter',
                href: 'https://twitter.com/AdaptyTeam',
              },
              {
                label: 'LinkedIn',
                href: 'https://www.linkedin.com/company/adaptyio',
              },
              {
                label: 'Discord',
                href: 'https://discord.gg/subscriptions-hub',
              },
              {
                label: 'GitHub',
                href: 'https://github.com/adaptyteam',
              },
              {
                label: 'YouTube',
                href: 'https://www.youtube.com/@SubhubEn',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Adapty Tech Inc.`,
      },
      /*
      algolia: {
      // The application ID provided by Algolia
      appId: 'YOUR_APP_ID',

      // Public API key: it is safe to commit it
      apiKey: 'YOUR_SEARCH_API_KEY',

      indexName: 'YOUR_INDEX_NAME',
      },
      */
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
        additionalLanguages: [
          'java',
          'kotlin',
          'swift',
          'typescript',
          'csharp',
          'dart', // For Flutter, Dart is the primary language
        ],
      },
      sidebar: {
        autoCollapseCategories: true,
        hideable: false,
      },
    }),
};

export default config;
               
