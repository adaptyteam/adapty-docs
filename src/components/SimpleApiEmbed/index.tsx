import React, { useState } from "react";
import SimpleApi from "../SimpleApi";
import styles from "./styles.module.css";

interface SimpleApiEmbedProps {
  title?: string;
  baseUrl?: string;
  endpoints: Array<{
    method: string;
    path: string;
    summary: string;
    description?: string;
    parameters?: Array<{
      name: string;
      in: string;
      required: boolean;
      description: string;
      type: string;
    }>;
    requestBody?: {
      description: string;
      schema: any;
    };
    responses: Array<{
      code: string;
      description: string;
      example?: any;
    }>;
  }>;
  height?: string;
}

const SimpleApiEmbed = ({ 
  title = "API Reference",
  baseUrl = "https://api.adapty.io",
  endpoints = [],
  height = "600px"
}: SimpleApiEmbedProps) => {
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
          <SimpleApi 
            title={title}
            baseUrl={baseUrl}
            endpoints={endpoints}
          />
        </div>
      )}
    </div>
  );
};

export default SimpleApiEmbed;
