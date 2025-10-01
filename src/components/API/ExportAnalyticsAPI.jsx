import React from 'react';
import { API } from '@stoplight/elements';
import clsx from 'clsx';

// Import the YAML content as a JavaScript module
import exportAnalyticsApiYaml from './specs/export-analytics-api.js';

function ExportAnalyticsAPI({ layout = 'sidebar' }) {
  return (
    <div className={clsx('elements-container', layout)}>
      <API
        className="stacked"
        apiDescriptionDocument={exportAnalyticsApiYaml}
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

export default ExportAnalyticsAPI;
