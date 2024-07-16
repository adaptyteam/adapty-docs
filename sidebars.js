/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */

// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  // Manually defined sidebar
  tutorialSidebar: [
    {
      type: 'doc',
      id: 'what-is-adapty',
      label: 'What is Adapty?',
    },
    {
      type: 'doc',
      id: 'quickstart',
      label: 'Quickstart guide',
    },
    {
      type: 'category',
      label: 'Migrate to Adapty',
      link: {
        type: 'doc',
        id: 'migrate-to-adapty-from-another-solutions',
      },
      collapsible: true,
      collapsed: true,
      items: [
        {
          type: 'doc',
          id: 'observer-vs-full-mode',
          label: 'Observer mode',
        },
        {
          type: 'doc',
          id: 'migration-from-revenuecat',
          label: 'Migration from RevenueCat',
        },
        {
          type: 'doc',
          id: 'importing-historical-data-to-adapty',
          label: 'Importing historical data to Adapty',
        },
      ],
    },
    {
      type: 'category',
      label: 'Getting started',
      link: {
        type: 'doc',
        id: 'getting-started',
      },
      collapsible: true,
      collapsed: true,
      items: [
        {
          type: 'category',
          label: 'Initial integration with the App Store',
          link: {
            type: 'doc',
            id: 'initial_ios',
          },
          collapsible: true,
          collapsed: true,
          items: [
            {
              type: 'doc',
              id: 'generate-in-app-purchase-key',
              label: 'Generate In-App Purchase Key in App Store Connect',
            },
            {
              type: 'doc',
              id: 'app-store-connection-configuration',
              label: 'Configure App Store integration',
            },
            {
              type: 'doc',
              id: 'enable-app-store-server-notifications',
              label: 'Enable App Store server notifications',
            },
          ],
        },
        {
          type: 'category',
          label: 'Initial integration with Google Play',
          link: {
            type: 'doc',
            id: 'initial-android',
          },
          collapsible: true,
          collapsed: true,
          items: [
            {
              type: 'doc',
              id: 'enabling-of-devepoler-api',
              label: 'Enable Developer APIs in Google Play Console',
            },
            {
              type: 'doc',
              id: 'create-service-account',
              label: 'Create service account in the Google Cloud Console',
            },
            {
              type: 'doc',
              id: 'grant-permissions-to-service-account',
              label: 'Grant permissions to service account in the Google Play Console',
            },
            {
              type: 'doc',
              id: 'create-service-account-key-file',
              label: 'Generate service account key file in the Google Play Console',
            },
            {
              type: 'doc',
              id: 'google-play-store-connection-configuration',
              label: 'Configure Google Play Store integration',
            },{
              type: 'doc',
              id: 'enable-real-time-developer-notifications-rtdn',
              label: 'Enable Real-time developer notifications (RTDN) in Google Play Console',
            },
          ],
        },
        {
          type: 'category',
          label: 'Installation of Adapty SDKs',
          link: {
            type: 'doc',
            id: 'installation-of-adapty-sdks',
          },
          collapsible: true,
          collapsed: true,
          items: [
            {
              type: 'doc',
              id: 'sdk-installation-ios',
              label: 'iOS - Adapty SDK installation & configuration',
            },
            {
              type: 'doc',
              id: 'sdk-installation-android',
              label: 'Android - Adapty SDK Installation and configuration',
            },
            {
              type: 'doc',
              id: 'sdk-installation-flutter',
              label: 'Flutter - Adapty SDK Installation and configuration',
            },
            {
              type: 'doc',
              id: 'sdk-installation-reactnative',
              label: 'React Native - Adapty SDK installation & configuration',
            },
            {
              type: 'doc',
              id: 'sdk-installation-unity',
              label: 'Unity - Adapty SDK installation & configuration',
            },
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'Analytics',
      link: {
        type: 'doc',
        id: 'how-adapty-analytics-works',
      },
      collapsible: true,
      collapsed: true,
      items: [
        {
          type: 'doc',
          id: 'overview',
          label: 'Analytics overview',
        },
        {
          type: 'doc',
          id: 'controls-filters-grouping-compare-proceeds',
          label: 'Analytics controls',
        },
        {
          type: 'category',
          label: 'Analytics charts',
          link: {
            type: 'doc',
            id: 'charts',
          },
          collapsible: true,
          collapsed: true,
          items: [
            {
              type: 'doc',
              id: 'revenue',
              label: 'Revenue',
            },
            {
              type: 'doc',
              id: 'ltv',
              label: 'Lifetime Value (LTV)',
            },
          ],
        },
      ],
    },
  ],
};

export default sidebars;
