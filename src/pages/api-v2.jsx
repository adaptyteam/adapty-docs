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
          <div>Loading API v2 documentation...</div>
        </div>
      }
    >
      {() => (
        <div className={clsx('elements-container', layout)}>
          <API
            className="stacked"
            apiDescriptionUrl="/docs/api/v2.yaml"
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

export default function APIv2() {
  return (
    <Layout
      title="API v2 (Dyte Test)"
      description="Explore Adapty's API v2 documentation with advanced features and functionalities."
      noFooter
      wrapperClassName="api-reference"
    >
      <Head>
        {/* Load styles for Stoplight Elements */}
        <title>API v2 | Adapty Docs</title>
        <link rel="preload" href="/docs/elements.min.css" as="style" />
        <link rel="stylesheet" href="/docs/elements.min.css" />
        <meta
          name="description"
          content="Explore Adapty's API v2 documentation with advanced features and functionalities."
        ></meta>
      </Head>

      <APIElement layout="sidebar" />
    </Layout>
  );
}
