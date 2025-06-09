// src/theme/DocItem/index.js
import React from 'react';
import OriginalDocItem from '@theme-original/DocItem';
import { Helmet } from 'react-helmet';

export default function DocItemWrapper(props) {
  const { content: DocContent } = props;
  const { frontMatter } = DocContent;
  const whatsNewLinks = frontMatter['whats_new'] || [];
  const rank = frontMatter.rank;

  return (
    <>
      {/* Inject rank as a meta tag if it exists */}
      {rank !== undefined && (
        <Helmet>
          <meta name="rank" content={String(rank)} />
        </Helmet>
      )}
      <OriginalDocItem {...props} footerProps={{ links: whatsNewLinks }} />
    </>
  );
}
