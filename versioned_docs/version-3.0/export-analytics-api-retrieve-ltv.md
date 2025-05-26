---
title:  Retrieve Lifetime Value (LTV) data
toc_max_heading_level: 2
---

import Details from '@site/src/components/Details';
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem'; 
import MetricsFilters from '@site/src/components/reusable/MetricsFilters.md';

Retrieves LTV data to assess the long-term revenue potential of customers over their engagement period.

## Endpoint and method

```http
POST https://api-admin.adapty.io/api/v1/client-api/metrics/ltv/
```
## Request example

<Tabs groupId="api-lang" queryString>  

<TabItem value="curl" label="cURL" default>  

```bash
curl --location 'https://api-admin.adapty.io/api/v1/client-api/metrics/ltv/' \
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
      "introductory"
    ],
    "store": [
      "app_store"
    ],
    "country": [
      "us"
    ],
    "attribution_source": [
      "appsflyer"
    ],
    "attribution_status": [
      "organic"
    ],
    "attribution_channel": [
      "social_media"
    ]
  },
  "period_unit": "quarter",
  "period_type": "renewals",
  "segmentation": "store_product_id",
  "format": "csv"
}'
```

</TabItem>  

<TabItem value="python" label="Python" default>

  ```python  showLineNumbers
import requests
import json

url = "https://api-admin.adapty.io/api/v1/client-api/metrics/ltv/"

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
      "introductory"
    ],
    "store": [
      "app_store"
    ],
    "country": [
      "us"
    ],
    "attribution_source": [
      "appsflyer"
    ]
  },
  "period_unit": "quarter",
  "period_type": "renewals",
  "segmentation": "store_product_id",
  "format": "csv"
})
headers = {
  'Authorization':"Api-Key <YOUR_SECRET_API_KEY>",
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
      "introductory"
    ],
    "store": [
      "app_store"
    ],
    "country": [
      "us"
    ],
    "attribution_source": [
      "appsflyer"
    ]
  },
  "period_unit": "quarter",
  "period_type": "renewals",
  "segmentation": "store_product_id",
  "format": "csv"
});

const requestOptions = {
  method: "POST",
  headers: myHeaders,
  body: raw,
  redirect: "follow"
};

fetch("https://api-admin.adapty.io/api/v1/client-api/metrics/ltv/", requestOptions)
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
      "2023-01-01",
      "2023-12-31"
    ],
    "store": [
      "app_store"
    ],
    "country": [
      "us"
    ],
    "store_product_id": [
      "premium_subscription"
    ],
    "attribution_source": [
      "appsflyer"
    ]
  },
  "period_unit": "month",
  "period_type": "renewals",
  "segmentation": "audience"
}
```

--->

## Parameters

| Name         | Type                                     | Required           | Description                                                  |
| ------------ | ---------------------------------------- | ------------------ | ------------------------------------------------------------ |
| filters      | [MetricsFilters](#metricsfilters-object) | :heavy_plus_sign:  | An object containing filtration parameters. See details below this table. |
| period_unit  | String                                   | :heavy_minus_sign: | <p>Specify the time interval for aggregating analytics data, to view results grouped by selected periods, such as days, weeks, months, etc. Possible values are:</p><ul><li>day</li><li>week</li><li>month</li><li>quarter</li><li>year</li></ul> |
| period_type  | String                                   | :heavy_minus_sign: | <p>Possible values are:</p><ul><li>renewals</li><li>days</li></ul> |
| segmentation | String                                   | :heavy_minus_sign: | <p>Possible values are:</p><ul><li>day</li><li>week</li><li>month</li><li>year</li><li>country</li><li>product</li><li>paywall</li><li>paywalls_group</li><li>audience</li><li>placement</li><li>duration</li><li>store</li></ul> |
| format       | String                                   | :heavy_minus_sign: | <p>Specify the export file format. Available options are:</p><ul><li>json</li><li>csv</li></ul> |

### MetricsFilters object

<MetricsFilters />
