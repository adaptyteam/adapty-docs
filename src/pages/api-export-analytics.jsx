import React from 'react';
import Layout from '@theme/Layout';
import Head from '@docusaurus/Head';
import BrowserOnly from '@docusaurus/BrowserOnly';
import clsx from 'clsx';

// Import Stoplight Elements at the top level
import { API } from '@stoplight/elements';

function APIElement({ layout = 'sidebar' }) {
  return (
    <BrowserOnly
      fallback={
        <div className="loading-container">
          <div>Loading Export Analytics API documentation...</div>
        </div>
      }
    >
      {() => (
        <div className={clsx('elements-container', layout)}>
          <API
            className="stacked"
            apiDescriptionUrl="/docs/api/export-analytics-api.yaml"
            basePath="/"
            router="hash"
            layout={layout}
            hideSchemas
            hideInternal
            tryItCredentialsPolicy="omit"
            tryItCorsProxy="https://cors-anywhere.herokuapp.com/"
          />
        </div>
      )}
    </BrowserOnly>
  );
}

export default function ExportAnalyticsAPI() {
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
        ></meta>
      </Head>

      <APIElement layout="sidebar" />
    </Layout>
  );
}
