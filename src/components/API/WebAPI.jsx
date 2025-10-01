import React from 'react';
import { API } from '@stoplight/elements';
import clsx from 'clsx';

// Import the YAML content as a JavaScript module
import webApiYaml from './specs/web-api.js';

function WebAPI({ layout = 'sidebar' }) {
  return (
    <div className={clsx('elements-container', layout)}>
      <API
        className="stacked"
        apiDescriptionDocument={webApiYaml}
        basePath="/"
        router="hash"
        layout={layout}
        hideSchemas
        hideInternal
        tryItCredentialsPolicy="omit"
        tryItCorsProxy="https://cors-anywhere.herokuapp.com/"
      />
    </div>
  );
}

export default WebAPI;
