import React from "react";
import { API } from "@stoplight/elements";

const SimpleTest = () => {
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
      background: 'white',
      overflow: 'hidden'
    }}>
      <div style={{ height: '100%', overflow: 'auto' }}>
        <API
          apiDescriptionUrl="/docs/api/adapty-api.json"
          router="hash"
          hideInternal="true"
        />
      </div>
    </div>
  );
};

export default SimpleTest;
