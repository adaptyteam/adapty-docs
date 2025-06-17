// src/theme/DocItem/index.js
import React from 'react';
import OriginalDocItem from '@theme-original/DocItem';
import Head from '@docusaurus/Head';
import ArticleDropdown from '@site/src/components/ArticleDropdown';

export default function DocItemWrapper(props) {
  const { content: DocContent } = props;
  const { frontMatter } = DocContent;
  const whatsNewLinks = frontMatter['whats_new'] || [];
  const rank = frontMatter.rank;
  const currentUrl = DocContent?.metadata?.permalink?.replace(/\/$/, '') || '';

  return (
    <>
      {rank !== undefined && (
        <Head>
          <meta name="rank" content={String(rank)} />
        </Head>
      )}
      <div style={{ position: 'relative' }}>
        <OriginalDocItem {...props} footerProps={{ links: whatsNewLinks }} />
        {currentUrl && (
          <div 
            style={{ 
              position: 'fixed',
              top: 'calc(var(--ifm-navbar-height) + 0.2rem)',
              right: '2rem',
              zIndex: 1000,
              backgroundColor: 'var(--ifm-background-color)',
              padding: '0.5rem',
              display: 'flex',
              justifyContent: 'flex-end',
            }}
          >
            <ArticleDropdown articleUrl={currentUrl} />
          </div>
        )}
      </div>
    </>
  );
}
