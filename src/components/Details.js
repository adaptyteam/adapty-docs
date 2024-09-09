// src/components/Details.js
import React from 'react';

const Details = ({children, ...props}) => (
  <details {...props}>
    {children}
  </details>
);

export default Details;