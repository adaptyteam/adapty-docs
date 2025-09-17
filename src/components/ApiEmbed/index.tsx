import React, { useState, Suspense } from "react";
import BrowserOnly from "@docusaurus/BrowserOnly";
import clsx from "clsx";
import styles from "./styles.module.css";

const LazyStoplight = React.lazy(() => import("../Stoplight"));

interface ApiEmbedProps {
  apiUrl: string;
  title?: string;
  height?: string;
}

const ApiEmbed = ({ 
  apiUrl, 
  title = "API Reference", 
  height = "600px" 
}: ApiEmbedProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className={styles.apiEmbed}>
      <div className={styles.header}>
        <h3>{title}</h3>
        <button
          className={styles.toggleButton}
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? "Hide API" : "Show API"}
        </button>
      </div>
      
      {isExpanded && (
        <div className={styles.apiContainer} style={{ height }}>
          <BrowserOnly>
            {() => (
              <Suspense fallback={<div className={styles.loading}>Loading API reference...</div>}>
                <LazyStoplight apiDescriptionUrl={apiUrl} />
              </Suspense>
            )}
          </BrowserOnly>
        </div>
      )}
    </div>
  );
};

export default ApiEmbed;
