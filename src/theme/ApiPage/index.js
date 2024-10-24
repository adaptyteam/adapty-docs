import React from 'react';
import NoSSR from '../../components/NoSSR'; // Import your custom NoSSR component
import OriginalApiPage from '@theme-original/ApiPage';

export default function ApiPageWrapper(props) {
  return (
    <NoSSR>
      <OriginalApiPage {...props} />
    </NoSSR>
  );
}
