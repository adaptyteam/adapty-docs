import React from 'react';
import Layout from '@theme/Layout';
import Head from '@docusaurus/Head';
import BrowserOnly from '@docusaurus/BrowserOnly';

// Import our custom API component
import AdaptyAPI from '../components/API/AdaptyAPI';

function APIElement({ layout = 'sidebar' }) {
  return (
    <BrowserOnly
      fallback={
        <div className="loading-container">
          <div>Loading Adapty API documentation...</div>
        </div>
      }
    >
      {() => <AdaptyAPI layout={layout} />}
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
