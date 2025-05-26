---
title: Retrieve funnel data
toc_max_heading_level: 2
---

import Details from '@site/src/components/Details';
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem'; 
import MetricsFilters from '@site/src/components/reusable/MetricsFilters.md';

Retrieves funnel data to track user progression through specific stages of a conversion process.

## Endpoint and method

```http
POST https://api-admin.adapty.io/api/v1/client-api/metrics/funnel/
```
## Request example

<Tabs groupId="api-lang" queryString>  

<TabItem value="curl" label="cURL" default>  

```bash
curl --location 'https://api-admin.adapty.io/api/v1/client-api/metrics/funnel/' \
--header 'Authorization: Api-Key <YOUR_SECRET_API_KEY>' \
--header 'Content-Type: application/json' \
--data '{
  "filters": {
    "date": [
      "2024-01-01",
      "2024-12-31"
    ],
    "compare_date": [
      "2023-01-01",
      "2023-12-31"
    ],
    "offer_category": [
        "promotional"
    ]
  },
  "period_unit": "quarter",
  "show_value_as": "absolute",
  "format": "csv"
}'
```

</TabItem>  

<TabItem value="python" label="Python" default>

  ```python  showLineNumbers
  import requests
  import json
  
  url = "https://api-admin.adapty.io/api/v1/client-api/metrics/funnel/"
  
  payload = json.dumps({
    "filters": {
      "date": [
        "2024-01-01",
        "2024-12-31"
      ],
      "compare_date": [
        "2023-01-01",
        "2023-12-31"
      ],
      "offer_category": [
        "promotional"
      ]
    },
    "period_unit": "quarter",
    "show_value_as": "absolute"
    "format": "csv"
  })
  headers = {
    'Authorization': "Api-Key <YOUR_SECRET_API_KEY>",
    'Content-Type': "application/json"
  }
  
  response = requests.request("POST", url, headers=headers, data=payload)
  
  print(response.text)
  ```

</TabItem>  

<TabItem value="js" label="JavaScript" default>

  ```javascript  showLineNumbers
  const myHeaders = new Headers();
  myHeaders.append("Authorization", "Api-Key <YOUR_SECRET_API_KEY>");
  myHeaders.append("Content-Type", "application/json");
  
  const raw = JSON.stringify({
    "filters": {
      "date": [
        "2024-01-01",
        "2024-12-31"
      ],
      "compare_date": [
        "2023-01-01",
        "2023-12-31"
      ],
      "offer_category": [
        "promotional"
      ]
    },
    "period_unit": "quarter",
    "show_value_as": "absolute",
    "format": "csv"
  });
  
  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow"
  };
  
  fetch("https://api-admin.adapty.io/api/v1/client-api/metrics/funnel/", requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.error(error));
  ```

</TabItem>  

</Tabs>

<!---

```json showLineNumbers
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
    ]
  },
  "period_unit": "month",
  "segmentation": "renewal_status"
}
```

--->

## Parameters

| Name          | Type                                     | Required           | Description                                                  |
| ------------- | ---------------------------------------- | ------------------ | ------------------------------------------------------------ |
| filters       | [MetricsFilters](#metricsfilters-object) | :heavy_plus_sign:  | An object containing filtration parameters. See details below this table. |
| period_unit   | String                                   | :heavy_minus_sign: | <p>Specify the time interval for aggregating analytics data, to view results grouped by selected periods, such as days, weeks, months, etc. Possible values are:</p><ul><li>day</li><li>week</li><li>month</li><li>quarter</li><li>year</li></ul> |
| show_value_as | String                                   | :heavy_minus_sign: | <p>Specify how values are displayed. Possible values are:</p><ul><li>absolute: as a percentage of the total</li><li>relative: as a percentage from the start, starting at 100% for renewal periods</li><li>both</li></ul> |
| segmentation  | String                                   | :heavy_minus_sign: | <p>Sets the basis for segmentation. Possible values are:</p><ul><li>app_id</li><li>period</li><li>renewal_status</li><li>cancellation_reason</li><li>store_product_id</li><li>country</li><li>store</li><li>purchase_container_id</li><li>paywall_id</li><li>audience_id</li><li>placement_id</li><li>attribution_source</li><li>attribution_status</li><li>attribution_channel</li><li>attribution_campaign</li><li>attribution_adgroup</li><li>attribution_adset</li><li>attribution_creative</li><li>duration</li><li>default</li></ul> |
| format        | String                                   | :heavy_minus_sign: | <p>Specify the export file format. Available options are:</p><ul><li>json</li><li>csv</li></ul> |

### MetricsFilters object

<MetricsFilters />
