// src/theme/DocItem/index.js
import React from 'react';
import OriginalDocItem from '@theme-original/DocItem';
import { useDoc } from '@docusaurus/theme-common/internal';

export default function DocItemWrapper(props) {
  const { content: DocContent } = props;
  const { frontMatter } = DocContent;
  const whatsNewLinks = frontMatter['whats_new'] || [];
  const { metadata } = useDoc();

  // Add weight to metadata if it exists in frontmatter
  if (frontMatter.weight) {
    metadata.weight = frontMatter.weight;
  }

  return <OriginalDocItem {...props} footerProps={{ links: whatsNewLinks }} />;
}
