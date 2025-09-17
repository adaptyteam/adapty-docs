import React from "react";
import { API } from "@stoplight/elements";

const DebugApi = () => {
  return (
    <div style={{ 
      position: 'fixed', 
      top: 0, 
      left: 0, 
      right: 0, 
      bottom: 0, 
      width: '100vw', 
      height: '100vh',
      zIndex: 1000,
      background: 'white'
    }}>
      <API
        apiDescriptionUrl="/docs/api/adapty-api.json"
        router="hash"
        hideInternal="true"
      />
    </div>
  );
};

export default DebugApi;
