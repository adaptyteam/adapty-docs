import React from 'react';
import OriginalDocItemLayout from '@theme-original/DocItem/Layout';
import ArticleDropdown from '@site/src/components/ArticleDropdown';

export default function DocItemLayout(props) {
  const { content } = props;
  const currentUrl = content?.metadata?.permalink?.replace(/\/$/, '') || '';

  return (
    <div style={{ position: 'relative' }}>
      <OriginalDocItemLayout {...props} />
      {currentUrl && (
        <div 
          style={{ 
            position: 'fixed',
            top: 'calc(var(--ifm-navbar-height) + 1rem)',
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
  );
} 