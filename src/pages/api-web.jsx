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
          <div>Loading Web API documentation...</div>
        </div>
      }
    >
      {() => {
        // eslint-disable-next-line no-undef
        const { API } = require('@stoplight/elements');
        
        // Determine CORS proxy URL based on environment
        const isLocalhost = typeof window !== 'undefined' && 
          (window.location.hostname === 'localhost' || 
           window.location.hostname === '127.0.0.1' ||
           window.location.hostname === 'dev-docs.adapty.io');
        const corsProxy = isLocalhost 
          ? 'http://localhost:3000/api-proxy'
          : 'https://adapty-cors-proxy-58n71f2j3-eandreeva-twrs-projects.vercel.app';

        return (
          <div className={clsx('elements-container', layout)}>
            <API
              className="stacked"
              apiDescriptionUrl="/docs/api/web-api.yaml"
              basePath="/"
              router="hash"
              layout={layout}
              hideSchemas
              hideInternal
              tryItCorsProxy={corsProxy}
            />
          </div>
        );
      }}
    </BrowserOnly>
  );
}

export default function WebAPIPage() {
  return (
    <Layout
      title="Web API"
      description="Explore Adapty's Web API documentation. Learn how to integrate paywalls, record views, and add attribution data to your web applications."
      noFooter
      wrapperClassName="api-reference"
    >
      <Head>
        {/* Load styles for Stoplight Elements */}
        <title>Web API | Adapty Docs</title>
        <link rel="preload" href="https://unpkg.com/@stoplight/elements@7.7.11/styles.min.css" as="style" />
        <link rel="stylesheet" href="https://unpkg.com/@stoplight/elements@7.7.11/styles.min.css" />
        <meta
          name="description"
          content="Explore Adapty's Web API documentation. Learn how to integrate paywalls, record views, and add attribution data to your web applications."
        />
      </Head>

      <APIElement layout="sidebar" />
    </Layout>
  );
}