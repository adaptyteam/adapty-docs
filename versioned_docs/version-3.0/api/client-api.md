---
title: Exporting analytics to CSV with API
toc_max_heading_level: 2
---

import Details from '@site/src/components/Details';
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'

If you need to download analytics into csv file, you can use Adpty API to do so.

## Import request collection to Postman

1. In Postman, click the **Import** button.
2. Drag-and-drop the [**client-api.yaml**](/api/client-api.yaml) file into Postman.
3. Select the **Import to Postman collection** radio-button.
4. Click **Import**.

## Authorization

- **Base URL**: [https://api-admin.adapty.io](http://api-admin.adapty.io/)

- **Authorization header**: API requests must be authenticated by including your secret API key as an **Authorization** header.

  1. In the **Authorization** -> **Auth type** field, choose **API Key**.

<!--- <Zoom>
  <img
    src={require('https://adapty.io/docs/assets/images/auth-type-a1723d86077bdc8dcca5330f8176f2eb.webp').default}
    alt="Create Paywall"
    style={{
      border: '1px solid #727272', /* border width and color */
      width: '700px', /* image width */
      display: 'block', /* for alignment */
      margin: '0 auto' /* center alignment */
    }}
  />
</Zoom>--->

  1. In the **Value** field, enter the API Key in format `Api-Key {secret_token}` to each request, for example, `Api-Key secret_live_BEHrYLTr.ce5zuDEWz06lFRNiaJC8mrLtL8fUwswD`. You can find your secret API key in [Adapty Dashboard -> **App Settings** -> **General** tab API -> **API keys** section](https://app.adapty.io/settings/general). This key is secret, so be careful not to share it publicly.

- **Content-Type header**: The API expects the request to use the **Content-Type** header set to `application/json`.

- **Body**: The API expects the request to use the body as JSON.

## Retrieve analytics data

Retrieves analytics data for insights on user behavior and performance metrics.

### Endpoint

```text
https://api-admin.adapty.io/api/v1/client-api/metrics/analytics/
```

### Method

```text
POST
```

### Parameters

[ChartMetricsConditions](client-api-objects#chartmetricsconditions)  object

### Request example
<details>
   <summary>Example request (click to expand)</summary>

```json
{
  "filters": {
    "date": [
      "2019-08-24",
      "2019-08-24"
    ],
    "compare_date": [
      "2019-08-24",
      "2019-08-24"
    ],
    "date_from": "2019-08-24T14:15:22Z",
    "date_to": "2019-08-24T14:15:22Z",
    "compare_date_from": "2019-08-24T14:15:22Z",
    "compare_date_to": "2019-08-24T14:15:22Z",
    "store": [
      "string"
    ],
    "app_id": [
      "497f6eca-6276-4993-bfeb-53cbbbba6f08"
    ],
    "placement_id": [
      "497f6eca-6276-4993-bfeb-53cbbbba6f08"
    ],
    "audience_id": [
      "497f6eca-6276-4993-bfeb-53cbbbba6f08"
    ],
    "ab_test_id": [
      "497f6eca-6276-4993-bfeb-53cbbbba6f08"
    ],
    "paywalls_group_id": [
      "497f6eca-6276-4993-bfeb-53cbbbba6f08"
    ],
    "paywall_id": [
      "497f6eca-6276-4993-bfeb-53cbbbba6f08"
    ],
    "placement_audience_version_id": [
      "497f6eca-6276-4993-bfeb-53cbbbba6f08"
    ],
    "state": [
      "live"
    ],
    "purchase_container_id": [
      "497f6eca-6276-4993-bfeb-53cbbbba6f08"
    ],
    "country": [
      "st"
    ],
    "store_product_id": [
      [
        "string",
        "string"
      ]
    ],
    "duration": [
      "Weekly"
    ],
    "attribution_source": [
      "string"
    ],
    "attribution_status": [
      "string"
    ],
    "attribution_channel": [
      "string"
    ],
    "attribution_campaign": [
      "string"
    ],
    "attribution_adgroup": [
      "string"
    ],
    "attribution_adset": [
      "string"
    ],
    "attribution_creative": [
      "string"
    ],
    "renewal_period": [
      0
    ],
    "subscription_duration": 0,
    "timezone": "string",
    "profiles_counting_method": "profile_id"
  },
  "period_unit": "month",
  "date_type": "purchase_date",
  "segmentation_by": "app_id"
}
```
</details>

### Responses

|Status|Meaning|Object|
|---|---|---|
|200|Successful request|None|

## Retrieve cohort data

Retrieves cohort data for tracking user groups over time.

### Endpoint

```text
https://api-admin.adapty.io/api/v1/client-api/metrics/cohort/
```

### Method

```text
POST
```

### Parameters

|Name|In|Type|Required|
|---|---|---|---|
|format|query|string|false|
|body|body|[CohortMetricsConditions](client-api-objects#cohortmetricsconditions)|true|

### Request example

<details>
   <summary>Example request (click to expand)</summary>

```json
{
  "filters": {
    "date": [
      "2019-08-24",
      "2019-08-24"
    ],
    "compare_date": [
      "2019-08-24",
      "2019-08-24"
    ],
    "date_from": "2019-08-24T14:15:22Z",
    "date_to": "2019-08-24T14:15:22Z",
    "compare_date_from": "2019-08-24T14:15:22Z",
    "compare_date_to": "2019-08-24T14:15:22Z",
    "store": [
      "string"
    ],
    "app_id": [
      "497f6eca-6276-4993-bfeb-53cbbbba6f08"
    ],
    "placement_id": [
      "497f6eca-6276-4993-bfeb-53cbbbba6f08"
    ],
    "audience_id": [
      "497f6eca-6276-4993-bfeb-53cbbbba6f08"
    ],
    "ab_test_id": [
      "497f6eca-6276-4993-bfeb-53cbbbba6f08"
    ],
    "paywalls_group_id": [
      "497f6eca-6276-4993-bfeb-53cbbbba6f08"
    ],
    "paywall_id": [
      "497f6eca-6276-4993-bfeb-53cbbbba6f08"
    ],
    "placement_audience_version_id": [
      "497f6eca-6276-4993-bfeb-53cbbbba6f08"
    ],
    "state": [
      "live"
    ],
    "purchase_container_id": [
      "497f6eca-6276-4993-bfeb-53cbbbba6f08"
    ],
    "country": [
      "st"
    ],
    "store_product_id": [
      [
        "string",
        "string"
      ]
    ],
    "duration": [
      "Weekly"
    ],
    "attribution_source": [
      "string"
    ],
    "attribution_status": [
      "string"
    ],
    "attribution_channel": [
      "string"
    ],
    "attribution_campaign": [
      "string"
    ],
    "attribution_adgroup": [
      "string"
    ],
    "attribution_adset": [
      "string"
    ],
    "attribution_creative": [
      "string"
    ],
    "renewal_period": [
      0
    ],
    "subscription_duration": 0,
    "timezone": "string",
    "profiles_counting_method": "profile_id"
  },
  "period_unit": "month",
  "period_type": "renewals",
  "value_type": "absolute",
  "value_field": "revenue",
  "accounting_type": "revenue",
  "renewal_days": [
    0
  ],
  "format": "json"
}
```
</details>

### Responses

|Status|Meaning|Object|
|---|---|---|
|200|Successful request|None|

## Retrieve conversion data

Retrieves conversion data to analyze user actions and measure the effectiveness of marketing efforts over time.

### Endpoint

```text
https://api-admin.adapty.io/api/v1/client-api/metrics/conversion/
```

### Method

```text
POST
```

### Parameters
[ChartMetricsConditions](client-api-objects#chartmetricsconditions) object
### Request example

<details>
   <summary>Example request (click to expand)</summary>
```json
{
  "filters": {
    "date": [
      "2019-08-24",
      "2019-08-24"
    ],
    "compare_date": [
      "2019-08-24",
      "2019-08-24"
    ],
    "date_from": "2019-08-24T14:15:22Z",
    "date_to": "2019-08-24T14:15:22Z",
    "compare_date_from": "2019-08-24T14:15:22Z",
    "compare_date_to": "2019-08-24T14:15:22Z",
    "store": [
      "string"
    ],
    "app_id": [
      "497f6eca-6276-4993-bfeb-53cbbbba6f08"
    ],
    "placement_id": [
      "497f6eca-6276-4993-bfeb-53cbbbba6f08"
    ],
    "audience_id": [
      "497f6eca-6276-4993-bfeb-53cbbbba6f08"
    ],
    "ab_test_id": [
      "497f6eca-6276-4993-bfeb-53cbbbba6f08"
    ],
    "paywalls_group_id": [
      "497f6eca-6276-4993-bfeb-53cbbbba6f08"
    ],
    "paywall_id": [
      "497f6eca-6276-4993-bfeb-53cbbbba6f08"
    ],
    "placement_audience_version_id": [
      "497f6eca-6276-4993-bfeb-53cbbbba6f08"
    ],
    "state": [
      "live"
    ],
    "purchase_container_id": [
      "497f6eca-6276-4993-bfeb-53cbbbba6f08"
    ],
    "country": [
      "st"
    ],
    "store_product_id": [
      [
        "string",
        "string"
      ]
    ],
    "duration": [
      "Weekly"
    ],
    "attribution_source": [
      "string"
    ],
    "attribution_status": [
      "string"
    ],
    "attribution_channel": [
      "string"
    ],
    "attribution_campaign": [
      "string"
    ],
    "attribution_adgroup": [
      "string"
    ],
    "attribution_adset": [
      "string"
    ],
    "attribution_creative": [
      "string"
    ],
    "renewal_period": [
      0
    ],
    "subscription_duration": 0,
    "timezone": "string",
    "profiles_counting_method": "profile_id"
  },
  "period_unit": "month",
  "date_type": "purchase_date",
  "segmentation_by": "app_id"
}
```
</details>

### Responses

|Status|Meaning|Object|
|---|---|---|
|200|Successful request|[ConversionsMetricsRequest](client-api-objects#conversionsmetricsrequest)|

### Example responses

<details>
   <summary>200 Response (click to expand)</summary>

```json
{
  "filters": {
    "date": [
      "2019-08-24",
      "2019-08-24"
    ],
    "compare_date": [
      "2019-08-24",
      "2019-08-24"
    ],
    "store": [
      "string"
    ],
    "purchase_container_id": [
      "497f6eca-6276-4993-bfeb-53cbbbba6f08"
    ],
    "audience_id": [
      "497f6eca-6276-4993-bfeb-53cbbbba6f08"
    ],
    "paywall_id": [
      "497f6eca-6276-4993-bfeb-53cbbbba6f08"
    ],
    "placement_id": [
      "497f6eca-6276-4993-bfeb-53cbbbba6f08"
    ],
    "paywalls_group_id": [
      "497f6eca-6276-4993-bfeb-53cbbbba6f08"
    ],
    "placement_audience_version_id": [
      "497f6eca-6276-4993-bfeb-53cbbbba6f08"
    ],
    "segment_id": [
      "497f6eca-6276-4993-bfeb-53cbbbba6f08"
    ],
    "country": [
      "string"
    ],
    "store_product_id": [
      "string"
    ],
    "duration": [
      "string"
    ],
    "attribution_source": [
      "string"
    ],
    "attribution_status": [
      "organic"
    ],
    "attribution_channel": [
      "string"
    ],
    "attribution_campaign": [
      "string"
    ],
    "attribution_adgroup": [
      "string"
    ],
    "attribution_adset": [
      "string"
    ],
    "attribution_creative": [
      "string"
    ]
  },
  "segmentation": "period",
  "from_period": 0,
  "to_period": "string",
  "period_unit": "day"
}
```

</details>

## Retrieve funnel data

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
[FunnelMetricsConditions](client-api-objects#funnelmetricsconditions) object

### Request example

  <details>
   <summary>Example request (click to expand)</summary>
```json
{
  "filters": {
    "date": [
      "2019-08-24",
      "2019-08-24"
    ],
    "compare_date": [
      "2019-08-24",
      "2019-08-24"
    ],
    "date_from": "2019-08-24T14:15:22Z",
    "date_to": "2019-08-24T14:15:22Z",
    "compare_date_from": "2019-08-24T14:15:22Z",
    "compare_date_to": "2019-08-24T14:15:22Z",
    "store": [
      "string"
    ],
    "app_id": [
      "497f6eca-6276-4993-bfeb-53cbbbba6f08"
    ],
    "placement_id": [
      "497f6eca-6276-4993-bfeb-53cbbbba6f08"
    ],
    "audience_id": [
      "497f6eca-6276-4993-bfeb-53cbbbba6f08"
    ],
    "ab_test_id": [
      "497f6eca-6276-4993-bfeb-53cbbbba6f08"
    ],
    "paywalls_group_id": [
      "497f6eca-6276-4993-bfeb-53cbbbba6f08"
    ],
    "paywall_id": [
      "497f6eca-6276-4993-bfeb-53cbbbba6f08"
    ],
    "placement_audience_version_id": [
      "497f6eca-6276-4993-bfeb-53cbbbba6f08"
    ],
    "state": [
      "live"
    ],
    "purchase_container_id": [
      "497f6eca-6276-4993-bfeb-53cbbbba6f08"
    ],
    "country": [
      "st"
    ],
    "store_product_id": [
      [
        "string",
        "string"
      ]
    ],
    "duration": [
      "Weekly"
    ],
    "attribution_source": [
      "string"
    ],
    "attribution_status": [
      "string"
    ],
    "attribution_channel": [
      "string"
    ],
    "attribution_campaign": [
      "string"
    ],
    "attribution_adgroup": [
      "string"
    ],
    "attribution_adset": [
      "string"
    ],
    "attribution_creative": [
      "string"
    ],
    "renewal_period": [
      0
    ],
    "subscription_duration": 0,
    "timezone": "string",
    "profiles_counting_method": "profile_id"
  },
  "period_unit": "month",
  "date_type": "purchase_date",
  "segmentation_by": "app_id",
  "format": "json"
}
```
</details>

### Responses

|Status|Meaning|Object|
|---|---|---|
|200|Successful request|[FunnelsMetricsRequest](client-api-objects#funnelsmetricsrequest)|
  <details>
   <summary>Example: 200 Response</summary>

```json
{
  "filters": {
    "date": [
      "2019-08-24",
      "2019-08-24"
    ],
    "compare_date": [
      "2019-08-24",
      "2019-08-24"
    ],
    "store": [
      "string"
    ],
    "purchase_container_id": [
      "497f6eca-6276-4993-bfeb-53cbbbba6f08"
    ],
    "audience_id": [
      "497f6eca-6276-4993-bfeb-53cbbbba6f08"
    ],
    "paywall_id": [
      "497f6eca-6276-4993-bfeb-53cbbbba6f08"
    ],
    "placement_id": [
      "497f6eca-6276-4993-bfeb-53cbbbba6f08"
    ],
    "paywalls_group_id": [
      "497f6eca-6276-4993-bfeb-53cbbbba6f08"
    ],
    "placement_audience_version_id": [
      "497f6eca-6276-4993-bfeb-53cbbbba6f08"
    ],
    "segment_id": [
      "497f6eca-6276-4993-bfeb-53cbbbba6f08"
    ],
    "country": [
      "string"
    ],
    "store_product_id": [
      "string"
    ],
    "duration": [
      "string"
    ],
    "attribution_source": [
      "string"
    ],
    "attribution_status": [
      "organic"
    ],
    "attribution_channel": [
      "string"
    ],
    "attribution_campaign": [
      "string"
    ],
    "attribution_adgroup": [
      "string"
    ],
    "attribution_adset": [
      "string"
    ],
    "attribution_creative": [
      "string"
    ]
  },
  "segmentation": "period"
}
```
</details>

## Retrieve Lifetime Value (LTV) data

Retrieves LTV data to assess the long-term revenue potential of customers over their engagement period.

### Endpoint

```text
https://api-admin.adapty.io/api/v1/client-api/metrics/ltv/
```

### Method

```text
POST
```

### Parameters

[RequestDTO](client-api-objects#requestdto) object

### Request example

  <details>
   <summary>Example request (click to expand)</summary>
```json
{
  "filters": {
    "date": [
      "2019-08-24",
      "2019-08-24"
    ],
    "compare_date": [
      "2019-08-24",
      "2019-08-24"
    ],
    "date_from": "2019-08-24T14:15:22Z",
    "date_to": "2019-08-24T14:15:22Z",
    "compare_date_from": "2019-08-24T14:15:22Z",
    "compare_date_to": "2019-08-24T14:15:22Z",
    "store": [
      "string"
    ],
    "app_id": [
      "497f6eca-6276-4993-bfeb-53cbbbba6f08"
    ],
    "placement_id": [
      "497f6eca-6276-4993-bfeb-53cbbbba6f08"
    ],
    "audience_id": [
      "497f6eca-6276-4993-bfeb-53cbbbba6f08"
    ],
    "ab_test_id": [
      "497f6eca-6276-4993-bfeb-53cbbbba6f08"
    ],
    "paywalls_group_id": [
      "497f6eca-6276-4993-bfeb-53cbbbba6f08"
    ],
    "paywall_id": [
      "497f6eca-6276-4993-bfeb-53cbbbba6f08"
    ],
    "placement_audience_version_id": [
      "497f6eca-6276-4993-bfeb-53cbbbba6f08"
    ],
    "state": [
      "live"
    ],
    "purchase_container_id": [
      "497f6eca-6276-4993-bfeb-53cbbbba6f08"
    ],
    "country": [
      "st"
    ],
    "store_product_id": [
      [
        "string",
        "string"
      ]
    ],
    "duration": [
      "Weekly"
    ],
    "attribution_source": [
      "string"
    ],
    "attribution_status": [
      "string"
    ],
    "attribution_channel": [
      "string"
    ],
    "attribution_campaign": [
      "string"
    ],
    "attribution_adgroup": [
      "string"
    ],
    "attribution_adset": [
      "string"
    ],
    "attribution_creative": [
      "string"
    ],
    "renewal_period": [
      0
    ],
    "subscription_duration": 0,
    "timezone": "string",
    "profiles_counting_method": "profile_id"
  },
  "format": "json",
  "period_unit": "month",
  "period_type": "renewals",
  "segmentation": "day",
  "value_type": "absolute"
}
```
</details>

### Responses

|Status|Meaning|Object|
|---|---|---|
|200|Successful request|None|

## Retrieve retention data

Retrieves the retention data to analyze the ability of a product to keep users engaged over time.

### Endpoint

```text
https://api-admin.adapty.io/api/v1/client-api/metrics/retention/
```

### Method

```text
POST
```

### Parameters

[RetentionMetricsConditions](client-api-objects#retentionmetricsconditions)

### Request example

<details>
   <summary>Example request (click to expand)</summary>

```json
{
  "filters": {
    "date": [
      "2019-08-24",
      "2019-08-24"
    ],
    "compare_date": [
      "2019-08-24",
      "2019-08-24"
    ],
    "date_from": "2019-08-24T14:15:22Z",
    "date_to": "2019-08-24T14:15:22Z",
    "compare_date_from": "2019-08-24T14:15:22Z",
    "compare_date_to": "2019-08-24T14:15:22Z",
    "store": [
      "string"
    ],
    "app_id": [
      "497f6eca-6276-4993-bfeb-53cbbbba6f08"
    ],
    "placement_id": [
      "497f6eca-6276-4993-bfeb-53cbbbba6f08"
    ],
    "audience_id": [
      "497f6eca-6276-4993-bfeb-53cbbbba6f08"
    ],
    "ab_test_id": [
      "497f6eca-6276-4993-bfeb-53cbbbba6f08"
    ],
    "paywalls_group_id": [
      "497f6eca-6276-4993-bfeb-53cbbbba6f08"
    ],
    "paywall_id": [
      "497f6eca-6276-4993-bfeb-53cbbbba6f08"
    ],
    "placement_audience_version_id": [
      "497f6eca-6276-4993-bfeb-53cbbbba6f08"
    ],
    "state": [
      "live"
    ],
    "purchase_container_id": [
      "497f6eca-6276-4993-bfeb-53cbbbba6f08"
    ],
    "country": [
      "st"
    ],
    "store_product_id": [
      [
        "string",
        "string"
      ]
    ],
    "duration": [
      "Weekly"
    ],
    "attribution_source": [
      "string"
    ],
    "attribution_status": [
      "string"
    ],
    "attribution_channel": [
      "string"
    ],
    "attribution_campaign": [
      "string"
    ],
    "attribution_adgroup": [
      "string"
    ],
    "attribution_adset": [
      "string"
    ],
    "attribution_creative": [
      "string"
    ],
    "renewal_period": [
      0
    ],
    "subscription_duration": 0,
    "timezone": "string",
    "profiles_counting_method": "profile_id"
  },
  "period_unit": "month",
  "date_type": "purchase_date",
  "segmentation_by": "app_id",
  "use_trial": false,
  "value_type": "absolute",
  "format": "json"
}
```
</details>


### Responses

|Status|Meaning|Object|
|---|---|---|
|200|Successful request|[RetentionMetricsRequest](client-api-objects#retentionmetricsrequest)|

<details>
 <summary>200 Response (click to expand)</summary>

```json
{
  "filters": {
    "date": [
      "2019-08-24",
      "2019-08-24"
    ],
    "compare_date": [
      "2019-08-24",
      "2019-08-24"
    ],
    "store": [
      "string"
    ],
    "purchase_container_id": [
      "497f6eca-6276-4993-bfeb-53cbbbba6f08"
    ],
    "audience_id": [
      "497f6eca-6276-4993-bfeb-53cbbbba6f08"
    ],
    "paywall_id": [
      "497f6eca-6276-4993-bfeb-53cbbbba6f08"
    ],
    "placement_id": [
      "497f6eca-6276-4993-bfeb-53cbbbba6f08"
    ],
    "paywalls_group_id": [
      "497f6eca-6276-4993-bfeb-53cbbbba6f08"
    ],
    "placement_audience_version_id": [
      "497f6eca-6276-4993-bfeb-53cbbbba6f08"
    ],
    "segment_id": [
      "497f6eca-6276-4993-bfeb-53cbbbba6f08"
    ],
    "country": [
      "string"
    ],
    "store_product_id": [
      "string"
    ],
    "duration": [
      "string"
    ],
    "attribution_source": [
      "string"
    ],
    "attribution_status": [
      "organic"
    ],
    "attribution_channel": [
      "string"
    ],
    "attribution_campaign": [
      "string"
    ],
    "attribution_adgroup": [
      "string"
    ],
    "attribution_adset": [
      "string"
    ],
    "attribution_creative": [
      "string"
    ]
  },
  "segmentation": "period",
  "use_trial": false
}
```
</details>

