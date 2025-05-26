---
title: Exporting analytics API requests
toc_max_heading_level: 2
---

import Details from '@site/src/components/Details';
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'
import MetricsFilters from '@site/src/components/reusable/MetricsFilters.md';

Exporting your analytics data to CSV gives you the flexibility to dive deeper into your app’s performance metrics, customize reports, and analyze trends over time. With the Adapty API, you can easily pull detailed analytics into a CSV format, making it convenient to track, share, and refine your data insights as needed.

## Postman collection and environment

To simplify using our API for exporting analytics data, we've prepared a Postman collection and an environment file you can download and import into Postman.

- **Request Collection**: Includes all requests available in the Adapty analytics export API. Note that it uses variables that you can define in the environment.
- **Environment**: Contains a list of variables where you can define values once. We've prepared a unified environment for the server-side API, web API, and analytics export API to make things easier for you. After making this environment active, Postman will automatically substitute the defined variable values in your requests.

:::tip

[Download the collection and environment](https://raw.githubusercontent.com/adaptyteam/adapty-docs/refs/heads/main/Downloads/Adapty_export_analytics_API_postman_collection.zip)

:::

For info on how to import a collection and environment to Postman, please refer to the [Postman documentation](https://learning.postman.com/docs/getting-started/importing-and-exporting/importing-data/).

### Variables used

We've created a unified environment for the server-side API, web API, and analytics export API to simplify your workflow. Below are the variables specific to the analytics export API:

| Variable                | Description                                                  | Example Value                                           |
| ----------------------- | ------------------------------------------------------------ | ------------------------------------------------------- |
| secret_api_key          | You can find it in the **Secret key** field in the [**App settings**](https://app.adapty.io/settings/general). | `secret_live_Pj1P1xzM.2CvSvE1IalQRFjsWy6csBVNpH33atnod` |

**Requests:**

- [Retrieve analytics data](export-analytics-api-retrieve-analytics-data)
- [Retrieve cohort data](export-analytics-api-retrieve-cohort-data)
- [Retrieve conversion data](export-analytics-api-retrieve-conversion-data)
- [Retrieve funnel data](export-analytics-api-retrieve-funnel-data)
- [Retrieve Lifetime Value (LTV) data](export-analytics-api-retrieve-ltv)
- [Retrieve retention data](export-analytics-api-retrieve-retention-data)
