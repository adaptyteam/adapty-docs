import React, { useEffect, useState } from 'react';

const NoSSR = ({ children }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null; // Render nothing on the server
  }

  return <>{children}</>;
};

export default NoSSR;
