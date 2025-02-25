---
title:  Retrieve retention data
toc_max_heading_level: 2
---

import Details from '@site/src/components/Details';
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'
import MetricsFilters from '@site/src/components/reusable/MetricsFilters.md';

Retrieves the retention data to analyze the ability of a product to keep users engaged over time.

## Endpoint and method

```http
POST https://api-admin.adapty.io/api/v1/client-api/metrics/retention/
```
## Request example

The example below shows how to view retention rates by region to identify high-engagement markets and guide localization or regional strategies.

```json showLineNumbers
{
  "filters": {
    "date": [
      "2023-04-01",
      "2023-06-30"
    ]
  },
  "period_unit": "month",
  "segmentation": "country",
  "use_trial": false
}
```

## Parameters

| Name         | Type                                     | Required           | Description.                                                 |
| ------------ | ---------------------------------------- | ------------------ | ------------------------------------------------------------ |
| filters      | [MetricsFilters](#metricsfilters-object) | :heavy_plus_sign:  | An object containing filtration parameters. See details below this table. |
| period_unit  | String                                   | :heavy_minus_sign: | <p>Specify the time interval for aggregating analytics data, to view results grouped by selected periods, such as days, weeks, months, etc. Possible values are:</p><ul><li>day.</li><li>week.</li><li>month.</li><li>quarter.</li><li>year.</li></ul> |
| segmentation | String                                   | :heavy_minus_sign: | <p>Sets the basis for segmentation. Possible values are:</p><ul><li>app_id.</li><li>period.</li><li>renewal_status.</li><li>cancellation_reason.</li><li>store_product_id.</li><li>country.</li><li>store.</li><li>purchase_container_id.</li><li>paywall_id.</li><li>audience_id.</li><li>placement_id.</li><li>attribution_source.</li><li>attribution_status.</li><li>attribution_channel.</li><li>attribution_campaign.</li><li>attribution_adgroup.</li><li>attribution_adset.</li><li>attribution_creative.</li><li>duration.</li><li>default.</li></ul> |
| use_trial    | Boolean                                  | :heavy_minus_sign: | Description.                                                 |
| format       | String                                   | :heavy_minus_sign: | <p>Specify the export file format. Available options are:</p><ul><li>json.</li><li>csv.</li></ul> |

### MetricsFilters object

<MetricsFilters />
