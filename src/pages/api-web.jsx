import React from 'react';
import Layout from '@theme/Layout';
import Head from '@docusaurus/Head';
import BrowserOnly from '@docusaurus/BrowserOnly';
import clsx from 'clsx';

function DynamicAPIElement({ layout = 'sidebar' }) {
  const [APIComponent, setAPIComponent] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    import('@stoplight/elements')
      .then((elements) => {
        console.log('Loaded elements:', elements);
        console.log('API component:', elements.API);
        console.log('API type:', typeof elements.API);
        
        if (elements.API && typeof elements.API === 'function') {
          setAPIComponent(() => elements.API);
        } else {
          throw new Error('API component is not a valid React component');
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to load @stoplight/elements:', err);
        setError(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <div>Loading API documentation...</div>
      </div>
    );
  }

  if (error || !APIComponent) {
    return (
      <div className="loading-container">
        <div>Failed to load API documentation: {error?.message || 'Unknown error'}</div>
      </div>
    );
  }

  return (
    <div className={clsx('elements-container', layout)}>
      <APIComponent
        className="stacked"
        apiDescriptionUrl="/docs/api/web-api.yaml"
        basePath="/"
        router="hash"
        layout={layout}
        hideSchemas
        hideInternal
      />
    </div>
  );
}

function APIElement({ layout = 'sidebar' }) {
  return (
    <BrowserOnly
      fallback={
        <div className="loading-container">
          <div>Loading Web API documentation...</div>
        </div>
      }
    >
      {() => <DynamicAPIElement layout={layout} />}
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