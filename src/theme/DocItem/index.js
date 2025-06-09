// src/theme/DocItem/index.js
import React from 'react';
import OriginalDocItem from '@theme-original/DocItem';
import Head from '@docusaurus/Head';

export default function DocItemWrapper(props) {
  const { content: DocContent } = props;
  const { frontMatter } = DocContent;
  const whatsNewLinks = frontMatter['whats_new'] || [];
  const rank = frontMatter.rank;

  return (
    <>
      {/* Inject rank as a meta tag if it exists */}
      {rank !== undefined && (
        <Head>
          <meta name="rank" content={String(rank)} />
        </Head>
      )}
      <OriginalDocItem {...props} footerProps={{ links: whatsNewLinks }} />
    </>
  );
}
