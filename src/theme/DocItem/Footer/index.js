// src/theme/DocItem/Footer/index.js
import React from 'react';
import OriginalDocItemFooter from '@theme-original/DocItem/Footer';
import SupportLink from '../../../components/SupportLink';

export default function DocItemFooter(props) {
  return (
    <>
      <OriginalDocItemFooter {...props} />
      <SupportLink />
    </>
  );
}
