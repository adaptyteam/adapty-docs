import React from "react";
import { API } from "@stoplight/elements";

const DebugStoplight = () => {
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
      <h1>Debug Stoplight Elements</h1>
      <div style={{ height: 'calc(100vh - 100px)', overflow: 'auto' }}>
        <API
          apiDescriptionUrl="/docs/api/adapty-api.json"
          router="hash"
          hideInternal="true"
        />
      </div>
    </div>
  );
};

export default DebugStoplight;
