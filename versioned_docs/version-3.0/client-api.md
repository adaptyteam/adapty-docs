---
title: Exporting analytics with API
toc_max_heading_level: 2
---

import Details from '@site/src/components/Details';
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'
import MetricsFilters from '@site/src/components/reusable/MetricsFilters.md';

Exporting your analytics data to CSV gives you the flexibility to dive deeper into your app’s performance metrics, customize reports, and analyze trends over time. With the Adapty API, you can easily pull detailed analytics into a CSV format, making it convenient to track, share, and refine your data insights as needed.

## Getting started with the API for analytics export

With the analytics export API, you can, for example:

1. **Analyze MRR from Marketing Campaigns**: Measure the impact of last year's marketing campaigns in the USA to see which ones brought in the highest revenue, with weekly tracking. Use the [Retrieve analytics data](client-api#retrieve-analytics-data) method for this.

2. **Track Cohort Retention Over Time**: Follow retention by cohort to spot drop-off points and compare cohorts over time, revealing trends and key moments where engagement strategies could boost retention. Limited to App Store, a specific product, and the USA. Use the [Retrieve cohort data](client-api#retrieve-cohort-data) method for this.

3. **Evaluate Conversion Rates Across Channels**: Analyze conversion rates for key acquisition channels to see which are most effective in driving first-time purchases. This helps prioritize marketing spend on high-performing channels. Use the [Retrieve conversion data](client-api#retrieve-conversion-data) method for this.

4. **Review Churn Rate**: Monitor how quickly users are unsubscribing to uncover churn patterns or gauge the success of retention efforts, focusing on France and a specific product. Use the [Retrieve funnel data](client-api#retrieve-funnel-data) method for this.

5. **Assess LTV by User Segment**: Identify the lifetime value of different user segments to understand which groups bring in the highest revenue over time. Focus on high-value segments like long-term subscribers, and use the results to refine acquisition strategies. Use the [Retrieve LTV data](client-api#retrieve-lifetime-value-ltv-data) method for this.

6. **Check Retention by Country**: Look at retention rates by region to find high-engagement markets and guide localization or regional strategies. Use the [Retrieve retention data](client-api#retrieve-retention-data) method for this.

## Authorization

- **Base URL**: [https://api-admin.adapty.io](https://api-admin.adapty.io/)

- **Authorization header**: API requests must be authenticated by including your secret API key as an **Authorization** header.

  1. In the **Authorization** -> **Auth type** field, choose **API Key**.
  1. In the **Value** field, enter the API Key in format `Api-Key {secret_token}` to each request, for example, `Api-Key secret_live_BEHrYLTr.ce5zuDEWz06lFRNiaJC8mrLtL8fUwswD`. You can find your secret API key in [Adapty Dashboard -> **App Settings** -> **General** tab API -> **API keys** section](https://app.adapty.io/settings/general). This key is secret, so be careful not to share it publicly.

- **Content-Type** header: The API expects the request to use the **Content-Type** header set to `application/json`.

- **Adapty-Tz** header: (optional) Set the timezone to define how the data is grouped and displayed. Use the [IANA Time Zone Database format](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones) (e.g., `Europe/Berlin`).

- **Body**: The API expects the request to use the body as JSON.

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

## Retrieve analytics data

Retrieves analytics data for insights on user behavior and performance metrics to further use in charts.

### Endpoint

```text
https://api-admin.adapty.io/api/v1/client-api/metrics/analytics/
```

### Method

```text
POST
```

### Parameters

| Name         | Type                                                      | Required           | Description                                                  |
| ------------ | --------------------------------------------------------- | ------------------ | ------------------------------------------------------------ |
| chart_id     | String                                                    | :heavy_plus_sign:  | <p>define which char you need.</p><p>Possible values are:</p> <ul><li> revenue</li><li> mrr</li><li> arr</li><li> arppu</li><li> subscriptions_active</li><li> subscriptions_new </li><li> subscriptions_renewal_cancelled</li><li> subscriptions_expired </li><li> trials_active </li><li> trials_new </li><li> trials_renewal_cancelled </li><li> trials_expired </li><li> grace_period </li><li> billing_issue  </li><li> refund_events  </li><li> refund_money </li><li> non_subscriptions </li><li> arpu</li><li> installs</li></ul> |
| filters      | [MetricsFilters](client-api#metricsfilters-object) object | :heavy_plus_sign:  | An object containing filtration parameters. See details below this table. |
| period_unit  | String                                                    | :heavy_minus_sign: | Specify the time interval for aggregating analytics data, to view results grouped by selected periods, such as days, weeks, months, etc. Possible values are: <ul><li> day</li><li> week</li><li> month</li><li> quarter</li><li> year</li></ul> |
| segmentation | String                                                    | :heavy_minus_sign: | Sets the basis for segmentation. See which segmentation is available for different chats in teh Segmentatiuon table below this table |
| format          | String                                                      | :heavy_minus_sign: | Specify the export file format. Available options are: <ul><li> json</li><li> csv</li></ul> |

#### Segmentation

Different charts can use different types of segmentation:

<details>    
  <summary>For ARPU (click to expand)</summary>

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

</details>

<details>    
  <summary>For revenue, MRR, ARR, active subscriptions, and active trials (click to expand)</summary>

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

</details>

<details>    
<summary>For ARRPU (click to expand)</summary>

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

</details>

<details>    
<summary>For new subscriptopns, new trials, and refund events (click to expand)</summary>

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

</details>

<details>   
<summary>For expired subscriptions and expired trials (click to expand)</summary>

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

</details>

<details>   
<summary>For cancelled subscriptipn renewals, cancelled trials, grace periods, billing issues, money refunds, and non-subscription purchases (click to expand) </summary>
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
</details>

<details>   
<summary>For installs (click to expand) </summary>
- country
- store
- attribution_status
- attribution_channel
- attribution_campaign
- attribution_adgroup
- attribution_adset
- attribution_creative
- attribution_source
</details>

### MetricsFilters object

Filtration criteria differe for different chats. Please see below the variants:

<details>    
  <summary>For ARPU and installs (click to expand)</summary>

| Name                 | Type                         | Required           | Description                                                  |
| -------------------- | ---------------------------- | ------------------ | ------------------------------------------------------------ |
| date                 | array of String values(data) | :heavy_plus_sign:  | Enter the date or time period for which you want to retrieve chart data. |
| store                | array of String values       | :heavy_minus_sign: | Filter by the app store where the purchase was made. Possible values include **app_store**, **play_store**, **stripe**, and any custom store ID. If using a custom store, enter its ID as set in the Adapty Dashboard. |
| country              | array of String values       | :heavy_minus_sign: | Filter by the 2-letter country code where the purchase took place, using ISO 3166-1 standard codes. |
| attribution_source   | array of String values       | :heavy_minus_sign: | The source integration for attribution. Possible options:<ul><li>adjust</li><li>airbridge</li><li>apple_search_ads</li><li>appsflyer</li><li>branch</li><li>custom</li></ul> |
| attribution_status   | array of String values       | :heavy_minus_sign: | Indicates if the attribution is organic or non-organic. Possible values are: <ul><li>organic</li><li>non-organic</li><li>unknown</li></ul> |
| attribution_channel  | array of String values       | :heavy_minus_sign: | Marketing channel that led to the transaction.               |
| attribution_campaign | array of String values       | :heavy_minus_sign: | Marketing campaign that brought the transaction.             |
| attribution_adgroup  | array of String values       | :heavy_minus_sign: | Attribution ad group that brought the transaction.           |
| attribution_adset    | array of String values       | :heavy_minus_sign: | Attribution ad set that led to the transaction.              |
| attribution_creative | array of String values       | :heavy_minus_sign: | Specific visual or text elements in an ad or campaign tracked to measure effectiveness (e.g., clicks, conversions). |

</details>

<details>    
  <summary>For cancelled trials, expired trials, grace period, billing issues, cancelled subscription renewals, expired subscriptions (click to expand)</summary>

| Name                 | Type                         | Required           | Description                                                  |
| -------------------- | ---------------------------- | ------------------ | ------------------------------------------------------------ |
| date                 | array of String values(data) | :heavy_plus_sign:  | Enter the date or period for which you want to retrieve chart data. |
| store                | array of String values       | :heavy_minus_sign: | Filter by the app store where the purchase was made. Possible values include **app_store**, **play_store**, **stripe**, and any custom store ID. If using a custom store, enter its ID as set in the Adapty Dashboard. |
| country              | array of String values       | :heavy_minus_sign: | Filter by the 2-letter country code where the purchase took place, using ISO 3166-1 standard codes. |
| store_product_id     | array of String values       | :heavy_minus_sign: | Unique identifier of a product from the app store. You can see this ID in the [**Products**](https://app.adapty.io/products) section of the Adapty Dashboard. |
| duration             | array of String              | :heavy_minus_sign: | Specify the subscription duration. Possible values are: <ul><li>Weekly</li><li>Monthly</li><li>2 months</li><li>3 months</li><li>6 months</li><li>Annual</li><li>Lifetime</li><li>Uncategorized</li></ul> |
| attribution_source   | array of String values       | :heavy_minus_sign: | The source integration for attribution. Possible options:<ul><li>adjust</li><li>airbridge</li><li>apple_search_ads</li><li>appsflyer</li><li>branch</li><li>custom</li></ul> |
| attribution_status   | array of String values       | :heavy_minus_sign: | Indicates if the attribution is organic or non-organic. Possible values are: <ul><li>organic</li><li>non-organic</li><li>unknown</li></ul> |
| attribution_channel  | array of String values       | :heavy_minus_sign: | Marketing channel that led to the transaction.               |
| attribution_campaign | array of String values       | :heavy_minus_sign: | Marketing campaign that brought the transaction.             |
| attribution_adgroup  | array of String values       | :heavy_minus_sign: | Attribution ad group that brought the transaction.           |
| attribution_adset    | array of String values       | :heavy_minus_sign: | Attribution ad set that led to the transaction.              |
| attribution_creative | array of String values       | :heavy_minus_sign: | Specific visual or text elements in an ad or campaign tracked to measure effectiveness (e.g., clicks, conversions). |

</details>

<details>    
  <summary>For all other charts (click to expand) </summary>
<MetricsFilters />
</details>

### Request example

<details>
   <summary>Example request (click to expand)</summary>

Below is an example request for measuring the impact of last year's marketing campaigns in the USA to see which ones brought in the highest revenue, with weekly tracking.

```json
{
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
    ],
  "period_unit": "week",
  "segmentation": "attribution_campaign"
}
```
</details>


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

| Name            | Type                                                        | Required           | Description                                                  |
| --------------- | ----------------------------------------------------------- | ------------------ | ------------------------------------------------------------ |
| filters         | [MetricsFilters](client-api#metricsfilters-object-1) object | :heavy_plus_sign:  | An object containing filtration parameters. See details below this table. |
| period_unit     | String                                                      | :heavy_minus_sign: | Specify the time interval for aggregating analytics data, to view results grouped by selected periods, such as days, weeks, months, etc.  Possible values are: <ul><li> day</li><li> week</li><li> month</li><li> quarter</li><li> year</li></ul> |
| period_type     | String                                                      | :heavy_minus_sign: | <p>Analyze data by renewals or by days. For a detailed description, see [Tracking by renewals or by days](analytics-cohorts#cohorts-by-renewals-or-by-days). </p><p>Possible values are: </p><ul><li> renewals</li><li> days</li></ul> |
| value_type      | String                                                      | :heavy_minus_sign: | Specify how values are displayed. Possible values are: <ul><li>absolute: as a percentage of the total</li><li>relative: as a percentage from the start, starting at 100% for renewal periods.</li></ul> |
| value_field     | String                                                      | :heavy_minus_sign: | Specify the type of values displayed. Possible values are: <ul><li>revenue</li><li>arppu</li><li>arpu</li><li>arpas</li><li>subscribers</li><li>subscriptions</li></ul> |
| accounting_type | String                                                      | :heavy_minus_sign: | The accounting method used. Possible values are: <ul><li>revenue</li><li>proceeds</li><li>net_revenue</li></ul> |
| renewal_days    | Array of Integers                                           | :heavy_minus_sign: | This is a list of days since the app was installed for the cohort type `period_type=days`. Default:  <ul><li>0</li><li> 3</li><li> 7</li><li> 14</li><li> 28</li><li> 31</li><li> 61</li><li> 92</li><li> 183</li><li> 336</li><li> 550</li><li> 731</li></ul> |
| format          | String                                                      | :heavy_minus_sign: | Specify the export file format. Available options are: <ul><li> json</li><li> csv</li></ul> |

#### MetricsFilters object

| Name                 | Type                         | Required           | Description                                                  |
| -------------------- | ---------------------------- | ------------------ | ------------------------------------------------------------ |
| date                 | array of String values(data) | :heavy_plus_sign:  | Enter the date or period for which you want to retrieve chart data. |
| store                | array of String values       | :heavy_minus_sign: | Filter by the app store where the purchase was made. Possible values include **app_store**, **play_store**, **stripe**, and any custom store ID. If using a custom store, enter its ID as set in the Adapty Dashboard. |
| country              | array of String values       | :heavy_minus_sign: | Filter by the 2-letter country code where the purchase took place, using ISO 3166-1 standard codes. |
| store_product_id     | array of String values       | :heavy_minus_sign: | Unique identifier of a product from the app store. You can see this ID in the [**Products**](https://app.adapty.io/products) section of the Adapty Dashboard. |
| duration             | array of String              | :heavy_minus_sign: | Specify the subscription duration. Possible values are: <ul><li>Weekly</li><li>Monthly</li><li>2 months</li><li>3 months</li><li>6 months</li><li>Annual</li><li>Lifetime</li><li>Uncategorized</li></ul> |
| attribution_source   | array of String values       | :heavy_minus_sign: | The source integration for attribution. Possible options:<ul><li>adjust</li><li>airbridge</li><li>apple_search_ads</li><li>appsflyer</li><li>branch</li><li>custom</li></ul> |
| attribution_status   | array of String values       | :heavy_minus_sign: | Indicates if the attribution is organic or non-organic. Possible values are: <ul><li>organic</li><li>non-organic</li><li>unknown</li></ul> |
| attribution_channel  | array of String values       | :heavy_minus_sign: | Marketing channel that led to the transaction.               |
| attribution_campaign | array of String values       | :heavy_minus_sign: | Marketing campaign that brought the transaction.             |
| attribution_adgroup  | array of String values       | :heavy_minus_sign: | Attribution ad group that brought the transaction.           |
| attribution_adset    | array of String values       | :heavy_minus_sign: | Attribution ad set that led to the transaction.              |
| attribution_creative | array of String values       | :heavy_minus_sign: | Specific visual or text elements in an ad or campaign tracked to measure effectiveness (e.g., clicks, conversions). |
| offer_category       | array of String values       | :heavy_minus_sign: | Specify the offer categories you want to retrieve data for. Possible values are:<ul><li>introductory</li><li>promotional</li><li>winback</li></ul> |
| offer_type           | array of String values       | :heavy_minus_sign: | Specify the offer types you want to retrieve data for. Possible values are:<ul><li>free_trial</li><li>pay_as_you_go</li><li>pay_up_front</li></ul>. |
| offer_id             | array of String values       | :heavy_minus_sign: | Specify the specific offers you want to retrieve data for.   |



### Request example

<details>
   <summary>Example request (click to expand)</summary>

The example below shows how to track retention by cohort to spot drop-off points, revealing trends and key moments where engagement strategies could boost retention. Limited to App Store, a specific product, and the USA.

```json
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
    ],
  },
  "period_unit": "month",
  "period_type": "renewals",
  "value_type": "absolute",
  "value_field": "subscriptions"
}
```
</details>


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
| Name         | Type                                                 | Required           | Description                                                  |
| ------------ | ---------------------------------------------------- | ------------------ | ------------------------------------------------------------ |
| filters      | [MetricsFilters](client-api#metricsfilters-object-2) | :heavy_plus_sign:  | An object containing filtration parameters. See details below this table. |
| period_unit  | String                                               | :heavy_minus_sign: | Specify the time interval for aggregating analytics data, to view results grouped by selected periods, such as days, weeks, months, etc. Possible values are: <ul><li> day</li><li> week</li><li> month</li><li> quarter</li><li> year</li></ul> |
| segmentation | String                                               | :heavy_minus_sign: | Sets the basis for segmentation. Possible values are: <ul><li> app_id</li><li> period</li><li> renewal_status</li><li> cancellation_reason</li><li> store_product_id</li><li> country</li><li> store</li><li> purchase_container_id</li><li> paywall_id</li><li> audience_id</li><li> placement_id</li><li> attribution_source</li><li> attribution_status</li><li> attribution_channel</li><li> attribution_campaign</li><li> attribution_adgroup</li><li> attribution_adset</li><li> attribution_creative</li><li> duration</li><li> default</li></ul> |
| format          | String                                                      | :heavy_minus_sign: | Specify the export file format. Available options are: <ul><li> json</li><li> csv</li></ul> |


#### MetricsFilters object

<MetricsFilters />

### Request example

<details>
   <summary>Example request (click to expand)</summary>

The example below shows how to get conversion rates for key acquisition channels to see which are most effective in driving first-time purchases. This helps prioritize marketing spend on high-performing channels.

```json
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

| Name         | Type                                                | Required           | Description                                                  |
| ------------ | --------------------------------------------------- | ------------------ | ------------------------------------------------------------ |
| filters         | [MetricsFilters](client-api#metricsfilters-object-4) | :heavy_plus_sign:  | An object containing filtration parameters. See details below this table. |
| period_unit  | String                                              | :heavy_minus_sign: | Specify the time interval for aggregating analytics data, to view results grouped by selected periods, such as days, weeks, months, etc. Possible values are: <ul><li> day</li><li> week</li><li> month</li><li> quarter</li><li> year</li></ul> |
| period_type  | String                                              | :heavy_minus_sign: | Possible values are: <ul><li> renewals</li><li> days</li></ul> |
| segmentation | String                                              | :heavy_minus_sign: | Possible values are: <ul><li> day</li><li> week</li><li> month</li><li> year</li><li> country</li><li> product</li><li> paywall</li><li> paywalls_group</li><li> audience</li><li> placement</li><li> duration</li><li> store</li></ul> |
| format       | String                                               | :heavy_minus_sign: | Specify the export file format. Available options are: <ul><li> json</li><li> csv</li></ul> |

#### MetricsFilters object

<MetricsFilters />

### Request example

  <details>
   <summary>Example request (click to expand)</summary>

The example below shows how to identify the lifetime value of different user segments to understand which groups bring in the highest revenue over time. Focus on high-value segments like long-term subscribers, and use the results to refine acquisition strategies.

```json
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
    ],
    "attribution_status": [
      "organic"
    ],
    "attribution_channel": [
      "social_media"
    ]
  },
  "period_unit": "month",
  "period_type": "renewals",
  "segmentation": "audience"
}

```
</details>

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

| Name         | Type                                                 | Required           | Description                                                  |
| ------------ | ---------------------------------------------------- | ------------------ | ------------------------------------------------------------ |
| filters      | [MetricsFilters](client-api#metricsfilters-object-5) | :heavy_plus_sign:  | An object containing filtration parameters. See details below this table. |
| period_unit  | String                                               | :heavy_minus_sign: | Specify the time interval for aggregating analytics data, to view results grouped by selected periods, such as days, weeks, months, etc. Possible values are: <ul><li> day</li><li> week</li><li> month</li><li> quarter</li><li> year</li></ul> |
| segmentation | String                                               | :heavy_minus_sign: | Sets the basis for segmentation. Possible values are: <ul><li> app_id</li><li> period</li><li> renewal_status</li><li> cancellation_reason</li><li> store_product_id</li><li> country</li><li> store</li><li> purchase_container_id</li><li> paywall_id</li><li> audience_id</li><li> placement_id</li><li> attribution_source</li><li> attribution_status</li><li> attribution_channel</li><li> attribution_campaign</li><li> attribution_adgroup</li><li> attribution_adset</li><li> attribution_creative</li><li> duration</li><li> default</li></ul> |
| use_trial    | boolean                                              | :heavy_minus_sign: |                                                              |
| format       | String                                               | :heavy_minus_sign: | Specify the export file format. Available options are: <ul><li> json</li><li> csv</li></ul> |



### MetricsFilters object

<MetricsFilters />

### Request example

<details>
   <summary>Example request (click to expand)</summary>

The example below shows how to view retention rates by region to identify high-engagement markets and guide localization or regional strategies

```json
{
  "filters": {
    "date": [
      "2023-04-01",
      "2023-06-30"
    ],
  "period_unit": "month",
  "segmentation": "country",
  "use_trial": false
}
```
</details>
