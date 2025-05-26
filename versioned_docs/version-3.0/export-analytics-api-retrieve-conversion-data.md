---
title:  Retrieve conversion data
toc_max_heading_level: 2
---

import Details from '@site/src/components/Details';
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem'; 
import MetricsFilters from '@site/src/components/reusable/MetricsFilters.md';

Retrieves conversion data to analyze user actions and measure the effectiveness of marketing efforts over time.

## Endpoint and method

```http
POST https://api-admin.adapty.io/api/v1/client-api/metrics/conversion/
```

## Request example

<Tabs groupId="api-lang" queryString>  

<TabItem value="curl" label="cURL" default>  

```bash
curl --location 'https://api-admin.adapty.io/api/v1/client-api/metrics/conversion/' \
--header 'Authorization: Api-Key <YOUR_SECRET_API_KEY>' \
--header 'Content-Type: application/json' \
--data '{
  "filters": {
    "date": [
      "2024-01-01",
      "2024-12-31"
    ]
  },
  "from_period": 1,
  "to_period": "6+",
  "period_unit": "month",
  "date_type": "purchase_date",
  "segmentation": "country",
  "format": "csv"
}'
```

</TabItem>  

<TabItem value="python" label="Python" default>

  ```python  showLineNumbers
import requests
import json

url = "https://api-admin.adapty.io/api/v1/client-api/metrics/conversion/"

payload = json.dumps({
  "filters": {
    "date": [
      "2024-01-01",
      "2024-12-31"
    ]
  },
  "from_period": 1,
  "to_period": "6+",
  "period_unit": "month",
  "date_type": "purchase_date",
  "segmentation": "country",
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
    ]
  },
  "from_period": 1,
  "to_period": "6+",
  "period_unit": "month",
  "date_type": "purchase_date",
  "segmentation": "country",
  "format": "csv"
});

const requestOptions = {
  method: "POST",
  headers: myHeaders,
  body: raw,
  redirect: "follow"
};

fetch("https://api-admin.adapty.io/api/v1/client-api/metrics/conversion/", requestOptions)
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
      "app_store",
      "play_store"
    ],
    "country": [
      "US",
      "CA"
    ],
    "attribution_source": [
      "appsflyer"
    ],
    "attribution_channel": [
      "social_media",
      "search"
    ]
  },
  "period_unit": "month",
  "date_type": "purchase_date",
  "segmentation": "attribution_channel"
}
```

--->

## Parameters

| Name         | Type                                     | Required           | Description.                                                 |
| ------------ | ---------------------------------------- | ------------------ | ------------------------------------------------------------ |
| filters      | [MetricsFilters](#metricsfilters-object) | :heavy_plus_sign:  | An object containing filtration parameters. See details below this table. |
| from_period | String/null                    | :heavy_plus_sign:  | The user’s starting subscription state of the conversation (e.g., `null` = install, `0` = trial, `1` = first paid period, etc.). See [Conversion types](#conversion-types) for valid values. |
| to_period   | String                                | :heavy_plus_sign:  | The user’s new subscription state after the conversion (e.g., `0` = trial, `1` = first paid period, `6+` = after six months, etc.). See [Conversion types](#conversion-types) for valid values. |
| period_unit  | String                                   | :heavy_minus_sign: | <p>Specify the time interval for aggregating analytics data, to view results grouped by selected periods, such as days, weeks, months, etc. Possible values are:</p><ul><li>day</li><li>week</li><li>month (default)</li><li>quarter</li><li>year</li></ul> |
| date_type    | String                                   | :heavy_minus_sign: | Specify which date should be treated as a user joining date. Possible values:<ul><li>purchase_date (default)</li><li>profile_install_date</li></ul> |
| segmentation | String                                   | :heavy_minus_sign: | <p>Sets the basis for segmentation. Possible values are:</p><ul><li>app_id</li><li>period</li><li>renewal_status</li><li>cancellation_reason</li><li>store_product_id</li><li>country</li><li>store</li><li>purchase_container_id</li><li>paywall_id</li><li>audience_id</li><li>placement_id</li><li>attribution_source</li><li>attribution_status</li><li>attribution_channel</li><li>attribution_campaign</li><li>attribution_adgroup</li><li>attribution_adset</li><li>attribution_creative</li><li>duration</li><li>default</li></ul> |
| format       | String                                   | :heavy_minus_sign: | <p>Specify the export file format. Available options are:</p><ul><li>json</li><li>csv</li></ul> |

### MetricsFilters object

<MetricsFilters />

## Conversion types

Use `from_period` and `to_period` together to specify the exact conversion you want to analyze. Only transitions supported by the Adapty Dashboard are available:

| Conversation                                                 | from_period | to_period |
| ------------------------------------------------------------ | ----------- | --------- |
| **Install → Trial**<p>The user has just installed the app (no subscription yet) and started a free trial.</p> | null          | 0             |
| **Install → Paid**<p>The user has just installed the app and jumped straight to a paid subscription.</p>        | null          | 1             |
| **Trial → Paid**<p>The user switched from a free trial to a paid subscription.</p>                              | 0               | 1             |
| **Paid → 2nd period**<p>The user renewed from the first paid period to the second.</p>                          | 1               | 2             |
| **2nd → 3rd period**<p>The user renewed from the second paid period to the third.</p>                           | 2               | 3             |
| **3rd → 4th period**<p>The user renewed from the third paid period to the fourth.</p>                           | 3               | 4             |
| **4th → 5th period**<p>The user renewed from the fourth paid period to the fifth.</p>                           | 4               | 5             |
| **Paid → 6 months+**<p>The user stayed on a paid subscription for six months or longer.</p>                     | 1               | "6+"         |
| **Paid → 1 year+**<p>The user stayed on a paid subscription for a year or longer.</p>                           | 1               | "12+"         |
| **Paid → 2 years+**<p>The user stayed on a paid subscription for two years or longer.</p>                       | 1               | "24+"         |