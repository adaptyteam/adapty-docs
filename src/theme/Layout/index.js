import React from 'react';
import OriginalLayout from '@theme-original/Layout';
import AlgoliaAnalytics from '../../components/AlgoliaAnalytics';

export default function Layout(props) {
  return (
    <>
      <OriginalLayout {...props} />
      <AlgoliaAnalytics />
    </>
  );
} 