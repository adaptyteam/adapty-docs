import React from 'react';
import NoSSR from '../../components/NoSSR'; // Import your custom NoSSR component
import OriginalApiItem from '@theme-original/ApiItem';

export default function ApiItemWrapper(props) {
  return (
    <NoSSR>
      <OriginalApiItem {...props} />
    </NoSSR>
  );
}
