---
title:  Retrieve analytics data
toc_max_heading_level: 2
---

import Details from '@site/src/components/Details';
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'
import MetricsFilters from '@site/src/components/reusable/MetricsFilters.md';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem'; 

Retrieves analytics data for insights on user behavior and performance metrics to further use in charts.

## Endpoint and method

```http
POST https://api-admin.adapty.io/api/v1/client-api/metrics/analytics/
```
## Request example

<Tabs groupId="api-lang" queryString>  

<TabItem value="curl" label="cURL" default>  

```bash
curl --location 'https://api-admin.adapty.io/api/v1/client-api/metrics/analytics/' \
--header 'Authorization: Api-Key <YOUR_SECRET_API_KEY>' \
--header 'Content-Type: application/json' \
--data '{
  "chart_id": "revenue",
  "filters": {
    "date": [
      "2024-01-01",
      "2024-12-31"
    ],
    "country": [
      "us"
    ],
    "attribution_channel": [
      "social_media_influencers"
    ]
  },
  "period_unit": "week",
  "segmentation": "attribution_campaign"
}'
```

</TabItem>  

<TabItem value="python" label="Python" default>

  ```python  showLineNumbers
import requests
import json

url = "https://api-admin.adapty.io/api/v1/client-api/metrics/analytics/"

payload = json.dumps({
  "chart_id": "revenue",
  "filters": {
    "date": [
      "2024-01-01",
      "2024-12-31"
    ],
    "country": [
      "us"
    ],
    "attribution_channel": [
      "social_media_influencers"
    ]
  },
  "period_unit": "week",
  "segmentation": "attribution_campaign"
})
headers = 
  'Authorization': "Api-Key <YOUR_SECRET_API_KEY>",
  'Content-Type': "application/json"}

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
  "chart_id": "revenue",
  "filters": {
    "date": [
      "2024-01-01",
      "2024-12-31"
    ],
    "country": [
      "us"
    ],
    "attribution_channel": [
      "social_media_influencers"
    ]
  },
  "period_unit": "week",
  "segmentation": "attribution_campaign"
});

const requestOptions = {
  method: "POST",
  headers: myHeaders,
  body: raw,
  redirect: "follow"
};

fetch("https://api-admin.adapty.io/api/v1/client-api/metrics/analytics/", requestOptions)
  .then((response) => response.text())
  .then((result) => console.log(result))
  .catch((error) => console.error(error));
  ```

</TabItem>  

</Tabs>

<!---

```json showLineNumbers
{
  "chart_id": "revenue",
  "filters": {
    "date": [
      "2022-01-01",
      "2022-12-31"
    ],
    "country": [
      "us"
    ],
    "attribution_channel": [
      "social_media_influencers"
    ]
  },
  "period_unit": "week",
  "segmentation": "attribution_campaign"
}
```
--->

## Parameters

| Name         | Type                                            | Required           | Description.                                                 |
| ------------ | ----------------------------------------------- | ------------------ | ------------------------------------------------------------ |
| filters      | [MetricsFilters](#metricsfilters-object) object | :heavy_plus_sign:  | An object containing filter parameters. See details below this table. |
| chart_id     | String                                          | :heavy_minus_sign: | <p>Specify which chart you need.</p><p>Possible values are:</p> <ul><li>revenue</li><li>mrr</li><li>arr</li><li>arppu</li><li>subscriptions_active</li><li>subscriptions_new</li><li>subscriptions_renewal_cancelled</li><li>subscriptions_expired</li><li>trials_active</li><li>trials_new</li><li>trials_renewal_cancelled</li><li>trials_expired</li><li>grace_period</li><li>billing_issue</li><li>refund_events</li><li>refund_money</li><li>non_subscriptions</li><li>arpu</li><li>installs</li></ul> |
| period_unit  | String                                          | :heavy_minus_sign: | Specify the time interval for aggregating analytics data, so you can view results grouped by days, weeks, months, etc. Possible values are: <ul><li>day</li><li>week</li><li>month (default)</li><li>quarter</li><li>year</li></ul> |
| date_type    | String                                          | :heavy_minus_sign: | Possible values are: <ul><li>purchase_date (default)</li><li>profile_install_date</li></ul> |
| segmentation | String                                          | :heavy_minus_sign: | Sets the basis for segmentation. See which segmentation is available for different charts in the [Segmentation](#segmentation) table below. |
| format       | String                                          | :heavy_minus_sign: | Specify the export file format. Available options are: <ul><li>json (default)</li><li>csv</li></ul> |

### Segmentation

Different charts can use different types of segmentation:

### For ARPU

- country  
- store  
- attribution_status  
- attribution_channel  
- attribution_campaign  
- attribution_adgroup  
- attribution_adset  
- attribution_creative  
- attribution_source  
- period  

### For revenue, MRR, ARR, active subscriptions, and active trials

- country  
- store  
- attribution_status  
- attribution_channel  
- attribution_campaign  
- attribution_adgroup  
- attribution_adset  
- attribution_creative  
- attribution_source  
- store_product_id  
- paywall_id  
- audience_id  
- placement_id  
- duration  
- renewal_status  
- period  
- offer_category  
- offer_type  
- offer_id  

### For ARPPU

- country  
- store  
- attribution_status  
- attribution_channel  
- attribution_campaign  
- attribution_adgroup  
- attribution_adset  
- attribution_creative  
- attribution_source  
- store_product_id  
- paywall_id  
- audience_id  
- placement_id  
- duration  
- renewal_status  
- period  

### For new subscriptions, new trials, and refund events

- country  
- store  
- attribution_status  
- attribution_channel  
- attribution_campaign  
- attribution_adgroup  
- attribution_adset  
- attribution_creative  
- attribution_source  
- store_product_id  
- paywall_id  
- audience_id  
- placement_id  
- duration  
- offer_category  
- offer_type  
- offer_id  

### For expired subscriptions and expired trials

- country  
- store  
- attribution_status  
- attribution_channel  
- attribution_campaign  
- attribution_adgroup  
- attribution_adset  
- attribution_creative  
- attribution_source  
- store_product_id  
- paywall_id  
- audience_id  
- placement_id  
- duration  
- cancellation_reason  

### For cancelled subscription renewals, cancelled trials, grace periods, billing issues, money refunds, and non-subscription purchases

- country  
- store  
- attribution_status  
- attribution_channel  
- attribution_campaign  
- attribution_adgroup  
- attribution_adset  
- attribution_creative  
- attribution_source  
- store_product_id  
- paywall_id  
- audience_id  
- placement_id  
- duration  

### For installs

- country  
- store  
- attribution_status  
- attribution_channel  
- attribution_campaign  
- attribution_adgroup  
- attribution_adset  
- attribution_creative  
- attribution_source  

### MetricsFilters object

Filtration criteria differ for different charts. See the variants below:

### For ARPU and installs

| Name                 | Type                         | Required           | Description.                                                 |
| -------------------- | ---------------------------- | ------------------ | ------------------------------------------------------------ |
| date                 | array of String values       | :heavy_plus_sign:  | Enter the date or time period for which you want to retrieve chart data. |
| store                | array of String values       | :heavy_minus_sign: | Filter by the app store where the purchase was made. Possible values include **app_store**, **play_store**, **stripe**, and any custom store ID. If you use a custom store, enter its ID as set in the Adapty Dashboard. |
| country              | array of String values       | :heavy_minus_sign: | Filter by the 2-letter country code where the purchase took place, using ISO 3166-1 standard codes. |
| attribution_source   | array of String values       | :heavy_minus_sign: | The source integration for attribution. Possible options: <ul><li>adjust</li><li>airbridge</li><li>apple_search_ads</li><li>appsflyer</li><li>branch</li><li>custom</li></ul> |
| attribution_status   | array of String values       | :heavy_minus_sign: | Indicates if the attribution is organic or non-organic. Possible values: <ul><li>organic</li><li>non-organic</li><li>unknown</li></ul> |
| attribution_channel  | array of String values       | :heavy_minus_sign: | Marketing channel that led to the transaction.               |
| attribution_campaign | array of String values       | :heavy_minus_sign: | Marketing campaign that brought the transaction.             |
| attribution_adgroup  | array of String values       | :heavy_minus_sign: | Attribution ad group that brought the transaction.           |
| attribution_adset    | array of String values       | :heavy_minus_sign: | Attribution ad set that led to the transaction.              |
| attribution_creative | array of String values       | :heavy_minus_sign: | Specific visual or text elements in an ad or campaign tracked to measure effectiveness (e.g., clicks, conversions). |

### For cancelled trials, expired trials, grace periods, billing issues, cancelled subscription renewals, and expired subscriptions

| Name                 | Type                         | Required           | Description.                                                 |
| -------------------- | ---------------------------- | ------------------ | ------------------------------------------------------------ |
| date                 | array of String values       | :heavy_plus_sign:  | Enter the date or period for which you want to retrieve chart data. |
| store                | array of String values       | :heavy_minus_sign: | Filter by the app store where the purchase was made. Possible values include **app_store**, **play_store**, **stripe**, and any custom store ID. If you use a custom store, enter its ID as set in the Adapty Dashboard. |
| country              | array of String values       | :heavy_minus_sign: | Filter by the 2-letter country code where the purchase took place, using ISO 3166-1 standard codes. |
| store_product_id     | array of String values       | :heavy_minus_sign: | Unique identifier of a product from the app store. You can find this ID in the [Products](https://app.adapty.io/products) section of the Adapty Dashboard. |
| duration             | array of String              | :heavy_minus_sign: | Specify the subscription duration. Possible values: <ul><li>Weekly</li><li>Monthly</li><li>2 months</li><li>3 months</li><li>6 months</li><li>Annual</li><li>Lifetime</li><li>Uncategorized</li></ul> |
| attribution_source   | array of String values       | :heavy_minus_sign: | The source integration for attribution. Possible options: <ul><li>adjust</li><li>airbridge</li><li>apple_search_ads</li><li>appsflyer</li><li>branch</li><li>custom</li></ul> |
| attribution_status   | array of String values       | :heavy_minus_sign: | Indicates if the attribution is organic or non-organic. Possible values: <ul><li>organic</li><li>non-organic</li><li>unknown</li></ul> |
| attribution_channel  | array of String values       | :heavy_minus_sign: | Marketing channel that led to the transaction.               |
| attribution_campaign | array of String values       | :heavy_minus_sign: | Marketing campaign that brought the transaction.             |
| attribution_adgroup  | array of String values       | :heavy_minus_sign: | Attribution ad group that brought the transaction.           |
| attribution_adset    | array of String values       | :heavy_minus_sign: | Attribution ad set that led to the transaction.              |
| attribution_creative | array of String values       | :heavy_minus_sign: | Specific visual or text elements in an ad or campaign tracked to measure effectiveness (e.g., clicks, conversions). |

### For all other charts

<MetricsFilters />