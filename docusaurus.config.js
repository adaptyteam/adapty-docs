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

  onBrokenLinks: 'ignore',
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
          sidebarPath: './sidebars.js',
          lastVersion: '2.0',
          versions: {
            '3.0': {
              label: '3.0',
              path: '3.0',
              banner: 'none',
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
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

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
          { to: '/blog', label: 'Blog', position: 'left' },
          {
            type: 'docsVersionDropdown',
            position: 'right',
            dropdownItemsAfter: [{ to: '/versions' }],
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
        ],
      },
      footer: {
        style: 'dark',
        links: [
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
          {
            title: 'SDK',
            items: [
              {
                label: 'iOS',
                href: 'https://adapty.io/sdk/ios/',
              },
              {
                label: 'Android',
                href: 'https://adapty.io/sdk/android/',
              },
              {
                label: 'React Native',
                href: 'https://adapty.io/sdk/react-native/',
              },
              {
                label: 'Flutter',
                href: 'https://adapty.io/sdk/flutter/',
              },
              {
                label: 'Unity',
                href: 'https://adapty.io/sdk/unity/',
              },
              {
                label: 'Web',
                href: 'https://adapty.io/sdk/web/',
              },
              {
                label: 'Stripe',
                href: 'https://adapty.io/integrations/stripe/',
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
