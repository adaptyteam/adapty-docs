import React from 'react';
import Layout from '@theme/Layout';
import Head from '@docusaurus/Head';
import BrowserOnly from '@docusaurus/BrowserOnly';

// Import our custom API component
import WebAPI from '../components/API/WebAPI';

function APIElement({ layout = 'sidebar' }) {
  return (
    <BrowserOnly
      fallback={
        <div className="loading-container">
          <div>Loading Web API documentation...</div>
        </div>
      }
    >
      {() => <WebAPI layout={layout} />}
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
        <link rel="preload" href="/docs/elements.min.css" as="style" />
        <link rel="stylesheet" href="/docs/elements.min.css" />
        <meta
          name="description"
          content="Explore Adapty's Web API documentation. Learn how to integrate paywalls, record views, and add attribution data to your web applications."
        ></meta>
      </Head>

      <APIElement layout="sidebar" />
    </Layout>
  );
}
