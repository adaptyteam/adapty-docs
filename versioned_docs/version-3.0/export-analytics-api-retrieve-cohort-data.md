---
title: Retrieve cohort data
toc_max_heading_level: 2
---

import Details from '@site/src/components/Details';
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'
import MetricsFilters from '@site/src/components/reusable/MetricsFilters.md';

Retrieves cohort data for tracking user groups over time.

## Endpoint and method

```http
POST https://api-admin.adapty.io/api/v1/client-api/metrics/cohort/
```

## Request example

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
    ]
  },
  "period_unit": "month",
  "period_type": "renewals",
  "value_type": "absolute",
  "value_field": "subscriptions"
}
```

## Parameters

| Name            | Type                                                         | Required           | Description.                                                 |
| --------------- | ------------------------------------------------------------ | ------------------ | ------------------------------------------------------------ |
| filters         | [MetricsFilters](https://chatgpt.com/g/g-p-67bc9a5c6b2c81919b96582c22e3a8f8-test/c/67bd57ea-9810-8009-8c52-c7929f2020f7#metricsfilters-object) object | :heavy_plus_sign:  | An object containing filtration parameters. See details below this table. |
| period_unit     | String                                                       | :heavy_minus_sign: | Specify the time interval for aggregating analytics data, to view results grouped by selected periods, such as days, weeks, months, etc. Possible values are: day.week.month.quarter.year. |
| period_type     | String                                                       | :heavy_minus_sign: | Analyze data by renewals or by days. For a detailed description, see [Tracking by renewals or by days](https://chatgpt.com/g/g-p-67bc9a5c6b2c81919b96582c22e3a8f8-test/c/analytics-cohorts#cohorts-by-renewals-or-by-days). Possible values are: renewals.days. |
| value_type      | String                                                       | :heavy_minus_sign: | Specify how values are displayed. Possible values are: absolute: as a percentage of the total.relative: as a percentage from the start, starting at 100% for renewal periods. |
| value_field     | String                                                       | :heavy_minus_sign: | Specify the type of values displayed. Possible values are: revenue.arppu.arpu.arpas.subscribers.subscriptions. |
| accounting_type | String                                                       | :heavy_minus_sign: | The accounting method used. Possible values are: revenue.proceeds.net_revenue. |
| renewal_days    | Array of Integers                                            | :heavy_minus_sign: | This is a list of days since the app was installed for the cohort type `period_type=days`. Default: 0.3.7.14.28.31.61.92.183.336.550.731. |
| format          | String                                                       | :heavy_minus_sign: | Specify the export file format. Available options are: json.csv. |

### MetricsFilters object

| Name                 | Type             | Required           | Description.                                                 |
| -------------------- | ---------------- | ------------------ | ------------------------------------------------------------ |
| date                 | array of Strings | :heavy_plus_sign:  | Enter the date or period for which you want to retrieve chart data. |
| store                | array of Strings | :heavy_minus_sign: | Filter by the app store where the purchase was made. Possible values include **app_store**, **play_store**, **stripe**, and any custom store ID. If you’re using a custom store, enter its ID as set in the Adapty Dashboard. |
| country              | array of Strings | :heavy_minus_sign: | Filter by the 2-letter country code where the purchase took place, using ISO 3166-1 standard codes. |
| store_product_id     | array of Strings | :heavy_minus_sign: | Unique identifier of a product from the app store. You can see this ID in the [Products](https://app.adapty.io/products) section of the Adapty Dashboard. |
| duration             | array of Strings | :heavy_minus_sign: | Specify the subscription duration. Possible values are: Weekly.Monthly.2 months.3 months.6 months.Annual.Lifetime.Uncategorized. |
| attribution_source   | array of Strings | :heavy_minus_sign: | The source integration for attribution. Possible options: adjust.airbridge.apple_search_ads.appsflyer.branch.custom. |
| attribution_status   | array of Strings | :heavy_minus_sign: | Indicates if the attribution is organic or non-organic. Possible values are: organic.non-organic.unknown. |
| attribution_channel  | array of Strings | :heavy_minus_sign: | Marketing channel that led to the transaction.               |
| attribution_campaign | array of Strings | :heavy_minus_sign: | Marketing campaign that brought the transaction.             |
| attribution_adgroup  | array of Strings | :heavy_minus_sign: | Attribution ad group that brought the transaction.           |
| attribution_adset    | array of Strings | :heavy_minus_sign: | Attribution ad set that led to the transaction.              |
| attribution_creative | array of Strings | :heavy_minus_sign: | Specific visual or text elements in an ad or campaign tracked to measure effectiveness (e.g., clicks, conversions). |
| offer_category       | array of Strings | :heavy_minus_sign: | Specify the offer categories you want to retrieve data for. Possible values are: introductory.promotional.winback. |
| offer_type           | array of Strings | :heavy_minus_sign: | Specify the offer types you want to retrieve data for. Possible values are: free_trial.pay_as_you_go.pay_up_front. |
| offer_id             | array of Strings | :heavy_minus_sign: | Specify the specific offers you want to retrieve data for.   |
