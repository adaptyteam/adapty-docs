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
      type: 'category',
      label: 'Migrate to Adapty',
      link: {
        type: 'doc',
        id: 'migrate-to-adapty-from-another-solutions',
      },
      collapsible: true,
      collapsed: false,
      items: [
        {
          type: 'doc',
          id: 'migration-from-revenuecat',
          label: 'Migration from RevenueCat',
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
      collapsed: false,
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
          collapsed: false,
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
