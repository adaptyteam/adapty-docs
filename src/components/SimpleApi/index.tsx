import React, { useState } from "react";
import styles from "./styles.module.css";

interface ApiEndpoint {
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
}

interface SimpleApiProps {
  title?: string;
  baseUrl?: string;
  endpoints: ApiEndpoint[];
}

const SimpleApi = ({ 
  title = "API Reference", 
  baseUrl = "https://api.adapty.io",
  endpoints = [] 
}: SimpleApiProps) => {
  const [selectedEndpoint, setSelectedEndpoint] = useState<ApiEndpoint | null>(null);
  const [requestData, setRequestData] = useState<Record<string, any>>({});
  const [response, setResponse] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleTryRequest = async (endpoint: ApiEndpoint) => {
    setLoading(true);
    setResponse(null);
    
    try {
      // This is a mock implementation - in a real scenario, you'd make actual API calls
      const mockResponse = {
        status: 200,
        data: {
          message: "This is a mock response. In a real implementation, this would make an actual API call.",
          endpoint: `${endpoint.method} ${endpoint.path}`,
          timestamp: new Date().toISOString()
        }
      };
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setResponse(mockResponse);
    } catch (error) {
      setResponse({
        status: 500,
        error: "Failed to make request"
      });
    } finally {
      setLoading(false);
    }
  };

  const getMethodColor = (method: string) => {
    switch (method.toUpperCase()) {
      case 'GET': return styles.methodGet;
      case 'POST': return styles.methodPost;
      case 'PUT': return styles.methodPut;
      case 'DELETE': return styles.methodDelete;
      default: return styles.methodDefault;
    }
  };

  return (
    <div className={styles.apiContainer}>
      <div className={styles.header}>
        <h2>{title}</h2>
        <p className={styles.baseUrl}>Base URL: <code>{baseUrl}</code></p>
      </div>

      <div className={styles.content}>
        <div className={styles.endpointsList}>
          <h3>Endpoints</h3>
          {endpoints.map((endpoint, index) => (
            <div 
              key={index}
              className={`${styles.endpointItem} ${selectedEndpoint === endpoint ? styles.selected : ''}`}
              onClick={() => setSelectedEndpoint(endpoint)}
            >
              <span className={`${styles.method} ${getMethodColor(endpoint.method)}`}>
                {endpoint.method}
              </span>
              <span className={styles.path}>{endpoint.path}</span>
              <span className={styles.summary}>{endpoint.summary}</span>
            </div>
          ))}
        </div>

        {selectedEndpoint && (
          <div className={styles.endpointDetails}>
            <div className={styles.endpointHeader}>
              <span className={`${styles.method} ${getMethodColor(selectedEndpoint.method)}`}>
                {selectedEndpoint.method}
              </span>
              <span className={styles.path}>{selectedEndpoint.path}</span>
              <button 
                className={styles.tryButton}
                onClick={() => handleTryRequest(selectedEndpoint)}
                disabled={loading}
              >
                {loading ? 'Loading...' : 'Try it out'}
              </button>
            </div>

            <div className={styles.endpointContent}>
              <h4>Description</h4>
              <p>{selectedEndpoint.description || selectedEndpoint.summary}</p>

              {selectedEndpoint.parameters && selectedEndpoint.parameters.length > 0 && (
                <div className={styles.section}>
                  <h4>Parameters</h4>
                  <div className={styles.parametersTable}>
                    <div className={styles.tableHeader}>
                      <span>Name</span>
                      <span>Type</span>
                      <span>Location</span>
                      <span>Required</span>
                      <span>Description</span>
                    </div>
                    {selectedEndpoint.parameters.map((param, index) => (
                      <div key={index} className={styles.tableRow}>
                        <span className={styles.paramName}>{param.name}</span>
                        <span className={styles.paramType}>{param.type}</span>
                        <span className={styles.paramLocation}>{param.in}</span>
                        <span className={styles.paramRequired}>
                          {param.required ? 'Yes' : 'No'}
                        </span>
                        <span className={styles.paramDescription}>{param.description}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {selectedEndpoint.requestBody && (
                <div className={styles.section}>
                  <h4>Request Body</h4>
                  <p>{selectedEndpoint.requestBody.description}</p>
                  <pre className={styles.codeBlock}>
                    {JSON.stringify(selectedEndpoint.requestBody.schema, null, 2)}
                  </pre>
                </div>
              )}

              <div className={styles.section}>
                <h4>Responses</h4>
                {selectedEndpoint.responses.map((response, index) => (
                  <div key={index} className={styles.responseItem}>
                    <span className={styles.responseCode}>{response.code}</span>
                    <span className={styles.responseDescription}>{response.description}</span>
                    {response.example && (
                      <pre className={styles.codeBlock}>
                        {JSON.stringify(response.example, null, 2)}
                      </pre>
                    )}
                  </div>
                ))}
              </div>

              {response && (
                <div className={styles.section}>
                  <h4>Response</h4>
                  <div className={`${styles.responseContainer} ${response.status >= 400 ? styles.error : styles.success}`}>
                    <div className={styles.responseHeader}>
                      <span className={styles.responseStatus}>Status: {response.status}</span>
                    </div>
                    <pre className={styles.codeBlock}>
                      {JSON.stringify(response.data || response.error, null, 2)}
                    </pre>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SimpleApi;
