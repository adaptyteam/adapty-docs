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
          <div>Loading API v1 documentation...</div>
        </div>
      }
    >
      {() => (
        <div className={clsx('elements-container', layout)}>
          <API
            className="stacked"
            apiDescriptionUrl="/docs/api/v1.yaml"
            basePath="/"
            router="hash"
            layout={layout}
            hideSchemas
            hideInternal
          />
        </div>
      )}
    </BrowserOnly>
  );
}

export default function APIv1() {
  return (
    <Layout
      title="API v1 (Dyte Test)"
      description="Explore the comprehensive API documentation provided by Adapty. Learn how to integrate and leverage Adapty's API."
      noFooter
      wrapperClassName="api-reference"
    >
      <Head>
        {/* Load styles for Stoplight Elements */}
        <title>API v1 | Adapty Docs</title>
        <link rel="preload" href="/docs/elements.min.css" as="style" />
        <link rel="stylesheet" href="/docs/elements.min.css" />
        <meta
          name="description"
          content="Explore the comprehensive API documentation provided by Adapty. Learn how to integrate and leverage Adapty's API."
        ></meta>
      </Head>

      <APIElement layout="sidebar" />
    </Layout>
  );
}
