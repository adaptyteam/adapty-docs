---
title: Retrieve cohort data
toc_max_heading_level: 2
---

import Details from '@site/src/components/Details';
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
 import MetricsFilters from '@site/src/components/reusable/MetricsFilters.md';

Retrieve cohort data to track user groups over time.

## Endpoint and method

```http
POST https://api-admin.adapty.io/api/v1/client-api/metrics/cohort/
```

## Request example

<Tabs groupId="api-lang" queryString>  

<TabItem value="curl" label="cURL" default>  

```bash
curl --location 'https://api-admin.adapty.io/api/v1/client-api/metrics/cohort/' \
--header 'Authorization: Api-Key <YOUR_SECRET_API_KEY>' \
--header 'Content-Type: application/json' \
--data '{
  "filters": {
    "date": [
      "2024-04-01",
      "2024-09-30"
    ],
    "store": [
      "app_store"
    ],
    "country": [
      "us"
    ]
  },
  "period_unit": "month",
  "period_type": "renewals",
  "value_type": "absolute",
  "value_field": "subscriptions"
}'
```

</TabItem>  

<TabItem value="python" label="Python" default>

  ```python  showLineNumbers
import requests
import json

url = "https://api-admin.adapty.io/api/v1/client-api/metrics/cohort/"

payload = json.dumps({
  "filters": {
    "date": [
      "2024-04-01",
      "2024-09-30"
    ],
    "store": [
      "app_store"
    ],
    "country": [
      "us"
    ]
  },
  "period_unit": "month",
  "period_type": "renewals",
  "value_type": "absolute",
  "value_field": "subscriptions"
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
      "2024-04-01",
      "2024-09-30"
    ],
    "store": [
      "app_store"
    ],
    "country": [
      "us"
    ]
  },
  "period_unit": "month",
  "period_type": "renewals",
  "value_type": "absolute",
  "value_field": "subscriptions"
});

const requestOptions = {
  method: "POST",
  headers: myHeaders,
  body: raw,
  redirect: "follow"
};

fetch("https://api-admin.adapty.io/api/v1/client-api/metrics/cohort/", requestOptions)
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
      "2024-04-01",
      "2024-09-30"
    ],
    "store": [
      "app_store"
    ],
    "country": [
      "us"
    ],
    "store_product_id": [
      [
        "monthly.premium.599"
      ]
    ]
  },
  "period_unit": "month",
  "period_type": "renewals",
  "value_type": "absolute",
  "value_field": "subscriptions"
}
```

--->

## Parameters

| Name              | Type                                                         | Required           | Description                                                  |
| ----------------- | ------------------------------------------------------------ | ------------------ | ------------------------------------------------------------ |
| filters           | [MetricsFilters](https://chatgpt.com/g/g-p-67bc9a5c6b2c81919b96582c22e3a8f8-review-text-and-formatting/c/67bf1445-603c-8009-b0dc-7c5cc5d8acba#metricsfilters-object) object | :heavy_plus_sign:  | An object containing filtration parameters. See details below this table. |
| period_unit       | String                                                       | :heavy_minus_sign: | Specify the time interval for aggregating analytics data to view results grouped by selected periods (days, weeks, months, etc.). Possible values are: <ul><li>day</li><li>week</li><li>month (default)</li><li>quarter</li><li>year</li></ul> |
| period_type       | String                                                       | :heavy_minus_sign: | Analyze data by renewals or by days. For a detailed description, see [Tracking by renewals or by days](https://chatgpt.com/g/g-p-67bc9a5c6b2c81919b96582c22e3a8f8-review-text-and-formatting/c/analytics-cohorts#cohorts-by-renewals-or-by-days). Possible values are: <ul><li> listitem</li><li> listitem</li><li> listitem</li></ul>renewals (default).days. |
| value_type        | String                                                       | :heavy_minus_sign: | Specify how values are displayed. Possible values are: <ul><li> absolute (default): as a percentage of the total</li><li> relative: as a percentage from the start, starting at 100% for renewal periods</li></ul> |
| value_field       | String                                                       | :heavy_minus_sign: | Specify the type of values displayed. Possible values are: <ul><li> revenue (default)</li><li> arppu</li><li> arpu</li><li> arpas</li><li> subscribers</li><li> subscriptions</li></ul> |
| accounting_type   | String                                                       | :heavy_minus_sign: | The accounting method used. Possible values are: <ul><li> revenue (default)</li><li> proceeds</li><li> net_revenue</li></ul> |
| renewal_days      | Array of Integers                                            | :heavy_minus_sign: | This is a list of days since the app was installed for the cohort type `period_type=days`. Default: 0, 3, 7, 14, 28, 31, 61, 92, 183, 336, 550, 731. |
| prediction_months | Integer                                                      | :heavy_minus_sign: | Enter how many months of prediction you want. Possible values: 3, 6, 9, 12 (default), 18, 24. |
| format            | String                                                       | :heavy_minus_sign: | Specify the export file format. Available options are:<ul><li> json (default)</li><li> csv</li></ul> |

### MetricsFilters object

| Name                 | Type                         | Required           | Description                                                  |
| -------------------- | ---------------------------- | ------------------ | ------------------------------------------------------------ |
| date                 | array of String values(data) | :heavy_plus_sign:  | Enter the date or period for which you want to retrieve chart data. |
| store                | array of String values       | :heavy_minus_sign: | Filter by the app store where the purchase was made. Possible values include app_store, play_store, stripe, and any custom store ID. If using a custom store, enter its ID as set in the Adapty Dashboard. |
| country              | array of String values       | :heavy_minus_sign: | Filter by the 2-letter country code where the purchase took place, using ISO 3166-1 standard codes. |
| store_product_id     | array of String values       | :heavy_minus_sign: | Unique identifier of a product from the app store. You can see this ID in the [Products](https://app.adapty.io/products) section of the Adapty Dashboard. |
| duration             | array of String              | :heavy_minus_sign: | Specify the subscription duration. Possible values are: <ul><li>Weekly</li><li>Monthly</li><li>2 months</li><li>3 months</li><li>6 months</li><li>Annual</li><li>Lifetime</li><li>Uncategorized</li></ul> |
| attribution_source   | array of String values       | :heavy_minus_sign: | The source integration for attribution. Possible options: <ul><li> adjust</li><li> airbridge</li><li> apple_search_ads</li><li> appsflyer</li><li> branch</li><li> custom</li></ul> |
| attribution_status   | array of String values       | :heavy_minus_sign: | Indicates if the attribution is organic or non-organic. Possible values are: <ul><li> organic</li><li> non-organic</li><li> unknown</li></ul> |
| attribution_channel  | array of String values       | :heavy_minus_sign: | Marketing channel that led to the transaction.               |
| attribution_campaign | array of String values       | :heavy_minus_sign: | Marketing campaign that brought the transaction.             |
| attribution_adgroup  | array of String values       | :heavy_minus_sign: | Attribution ad group that brought the transaction.           |
| attribution_adset    | array of String values       | :heavy_minus_sign: | Attribution ad set that led to the transaction.              |
| attribution_creative | array of String values       | :heavy_minus_sign: | Specific visual or text elements in an ad or campaign tracked to measure effectiveness (e.g., clicks, conversions). |
| offer_category       | array of String values       | :heavy_minus_sign: | Specify the offer categories you want to retrieve data for. Possible values are: <ul><li> introductory</li><li> promotional</li><li> winback</li></ul> |
| offer_type           | array of String values       | :heavy_minus_sign: | Specify the offer types you want to retrieve data for. Possible values are: <ul><li> free_trial</li><li> pay_as_you_go</li><li> pay_up_front</li></ul> |
| offer_id             | array of String values       | :heavy_minus_sign: | Specify the specific offers you want to retrieve data for.   |
