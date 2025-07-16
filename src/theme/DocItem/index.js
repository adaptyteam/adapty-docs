// src/theme/DocItem/index.js
import React from 'react';
import OriginalDocItem from '@theme-original/DocItem';

export default function DocItemWrapper(props) {
  const { content: DocContent } = props;
  const { frontMatter } = DocContent;
  const whatsNewLinks = frontMatter['whats_new'] || [];

  return <OriginalDocItem {...props} footerProps={{ links: whatsNewLinks }} />;
}
