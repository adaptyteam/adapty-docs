import React from 'react';

export const Layout = ({ children, title, description }: any) => {
  return <div className="docusaurus-layout-shim">{children}</div>;
};

export const Head = ({ children }: any) => {
  return <>{children}</>;
};

export const BrowserOnly = ({ children, fallback }: any) => {
  const [isClient, setIsClient] = React.useState(false);
  React.useEffect(() => setIsClient(true), []);
  return isClient ? <>{children()}</> : <>{fallback}</>;
};

export const Link = ({ children, to, ...props }: any) => {
  return <a href={to} {...props}>{children}</a>;
};

export default { Layout, Head, BrowserOnly, Link };
