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
          <div>Loading Webhooks API documentation...</div>
        </div>
      }
    >
      {() => (
        <div className={clsx('elements-container', layout)}>
          <API
            className="stacked"
            apiDescriptionUrl="/docs/api/webhooks.yaml"
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

export default function WebhooksAPI() {
  return (
    <Layout
      title="Webhooks API"
      description="Explore Adapty's Webhooks API documentation. Learn how to receive and handle webhook events from Adapty."
      noFooter
      wrapperClassName="api-reference"
    >
      <Head>
        {/* Load styles for Stoplight Elements */}
        <title>Webhooks API | Adapty Docs</title>
        <link rel="preload" href="/docs/elements.min.css" as="style" />
        <link rel="stylesheet" href="/docs/elements.min.css" />
        <meta
          name="description"
          content="Explore Adapty's Webhooks API documentation. Learn how to receive and handle webhook events from Adapty."
        ></meta>
      </Head>

      <APIElement layout="sidebar" />
    </Layout>
  );
}
