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
          <div>Loading Adapty API documentation...</div>
        </div>
      }
    >
      {() => (
        <div className={clsx('elements-container', layout)}>
          <API
            className="stacked"
            apiDescriptionUrl="/docs/api/adapty-api.yaml"
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

export default function AdaptyAPI() {
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
        <link rel="preload" href="/docs/elements.min.css" as="style" />
        <link rel="stylesheet" href="/docs/elements.min.css" />
        <meta
          name="description"
          content="Explore Adapty's main API documentation. Learn how to integrate with Adapty's subscription management platform."
        ></meta>
      </Head>

      <APIElement layout="sidebar" />
    </Layout>
  );
}
