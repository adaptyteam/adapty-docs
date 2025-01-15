---
title: Retrieve funnel data
toc_max_heading_level: 2
---

import Details from '@site/src/components/Details';
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'
import MetricsFilters from '@site/src/components/reusable/MetricsFilters.md';

Retrieves funnel data to track user progression through specific stages of a conversion process.

### Endpoint

```text
https://api-admin.adapty.io/api/v1/client-api/metrics/funnel/
```

### Method

```text
POST
```

### Parameters
| Name            | Type                                                 | Required           | Description                                                  |
| --------------- | ---------------------------------------------------- | ------------------ | ------------------------------------------------------------ |
| filters         | [MetricsFilters](client-api#metricsfilters-object-3) | :heavy_plus_sign:  | An object containing filtration parameters. See details below this table. |
| period_unit     | String                                               | :heavy_minus_sign: | Specify the time interval for aggregating analytics data, to view results grouped by selected periods, such as days, weeks, months, etc. Possible values are: <ul><li> day</li><li> week</li><li> month</li><li> quarter</li><li> year</li></ul> |
| show_value_as      | String                                                      | :heavy_minus_sign: | Specify how values are displayed. Possible values are: <ul><li>absolute: as a percentage of the total</li><li>relative: as a percentage from the start, starting at 100% for renewal periods.</li><li>both</li></ul> |
| segmentation | String                                               | :heavy_minus_sign: | Sets the basis for segmentation. Possible values are: <ul><li> app_id</li><li> period</li><li> renewal_status</li><li> cancellation_reason</li><li> store_product_id</li><li> country</li><li> store</li><li> purchase_container_id</li><li> paywall_id</li><li> audience_id</li><li> placement_id</li><li> attribution_source</li><li> attribution_status</li><li> attribution_channel</li><li> attribution_campaign</li><li> attribution_adgroup</li><li> attribution_adset</li><li> attribution_creative</li><li> duration</li><li> default</li></ul> |
| format          | String                                               | :heavy_minus_sign: | Specify the export file format. Available options are: <ul><li> json</li><li> csv</li></ul> |

#### MetricsFilters object

<MetricsFilters />

### Request example

  <details>
   <summary>Example request (click to expand)</summary>

The example below shows how to monitor how quickly users are unsubscribing to uncover churn patterns or gauge the success of retention efforts, focusing on France and a specific product.

```json
{
  "filters": {
    "date": [
      "2022-01-01",
      "2022-12-31"
    ],
    "compare_date": [
      "2023-01-01",
      "2023-12-31"
    ],
    "country": [
      "fr"
    ],
    "store_product_id": [
      [
        "monthly.premium.599"
      ]
    ],
  },
  "period_unit": "month",
  "segmentation": "renewal_status"
}
```
</details>
