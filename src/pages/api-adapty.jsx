import React from 'react';
import Layout from '@theme/Layout';
import Head from '@docusaurus/Head';
import BrowserOnly from '@docusaurus/BrowserOnly';
import clsx from 'clsx';

function APIElement({ layout = 'sidebar' }) {
  return (
    <BrowserOnly
      fallback={
        <div className="loading-container">
          <div>Loading Adapty API documentation...</div>
        </div>
      }
    >
      {() => {
        // eslint-disable-next-line no-undef
        const { API } = require('@stoplight/elements');
        
        return (
          <div className={clsx('elements-container', layout)}>
            <API
              className="stacked"
              apiDescriptionUrl="/docs/api/adapty-api.yaml"
              basePath="/"
              router="hash"
              layout={layout}
              hideSchemas
              hideInternal
            />
          </div>
        );
      }}
    </BrowserOnly>
  );
}

export default function AdaptyAPIPage() {
  return (
    <Layout
      title="Adapty API"
      description="Explore Adapty's main API documentation. Learn how to integrate with Adapty's subscription management platform."
      noFooter
      wrapperClassName="api-reference"
    >
      <Head>
        {/* Load styles for Stoplight Elements */}
        <title>Adapty API | Adapty Docs</title>
        <link rel="preload" href="https://unpkg.com/@stoplight/elements@7.7.11/styles.min.css" as="style" />
        <link rel="stylesheet" href="https://unpkg.com/@stoplight/elements@7.7.11/styles.min.css" />
        <meta
          name="description"
          content="Explore Adapty's main API documentation. Learn how to integrate with Adapty's subscription management platform."
        />
      </Head>

      <APIElement layout="sidebar" />
    </Layout>
  );
}