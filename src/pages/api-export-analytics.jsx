import React from 'react';
import Layout from '@theme/Layout';
import Head from '@docusaurus/Head';
import BrowserOnly from '@docusaurus/BrowserOnly';

// Import our custom API component
import ExportAnalyticsAPI from '../components/API/ExportAnalyticsAPI';

// Import API page styles
import '../css/api-pages.css';

function APIElement({ layout = 'sidebar' }) {
  return (
    <BrowserOnly
      fallback={
        <div className="loading-container">
          <div>Loading Export Analytics API documentation...</div>
        </div>
      }
    >
      {() => <ExportAnalyticsAPI layout={layout} />}
    </BrowserOnly>
  );
}

export default function ExportAnalyticsAPIPage() {
  return (
    <Layout
      title="Export Analytics API"
      description="Explore Adapty's Export Analytics API documentation. Learn how to export analytics data to CSV or JSON format for deeper insights into your app's performance metrics."
      noFooter
      wrapperClassName="api-reference"
    >
      <Head>
        {/* Load styles for Stoplight Elements */}
        <title>Export Analytics API | Adapty Docs</title>
        <link rel="preload" href="/docs/elements.min.css" as="style" />
        <link rel="stylesheet" href="/docs/elements.min.css" />
        <meta
          name="description"
          content="Explore Adapty's Export Analytics API documentation. Learn how to export analytics data to CSV or JSON format for deeper insights into your app's performance metrics."
        />
      </Head>

      <APIElement layout="sidebar" />
    </Layout>
  );
}