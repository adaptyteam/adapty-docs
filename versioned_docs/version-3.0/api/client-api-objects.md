---
title: API Objects for exporting analytics data
toc_max_heading_level: 3
---
Adapty API has JSON objects so you can understand a response structure and wrap it into your code.

All datetime values are [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601), for example, "2020-01-15T15:10:36.517975+0000".

### AccountingType

<details>
 <summary>Example (click to expand)</summary>

```json
"revenue"

```

</details>


**Properties**

| Name           | Type   | Required           | Description                                                  |
| -------------- | ------ | ------------------ | ------------------------------------------------------------ |
| AccountingType | string | :heavy_minus_sign: | Possible values are: <ul><li> revenue</li><li> proceeds</li><li> net_revenue</li></ul> |

### ChartMetricsConditions

<details>
 <summary>Example (click to expand)</summary>

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

**Properties**)

| Name            | Type                                                         | Required           | Description      |
| --------------- | ------------------------------------------------------------ | ------------------ | ---------------- |
| filters         | [MetricsFilters](client-api-objects#metricsfilters)          | :heavy_plus_sign:  |                  |
| period_unit     | [PeriodUnit](client-api-objects#periodunit)                  | :heavy_minus_sign: | Enumerated value |
| date_type       | [DateType](client-api-objects#datetype)                      | :heavy_minus_sign: | Enumerated value |
| segmentation_by | [ChartMetricsSegmentation](client-api-objects#chartmetricssegmentation) | :heavy_minus_sign: | Enumerated value |

### ChartMetricsSegmentation

<details>
 <summary>Example (click to expand)</summary>

```json
"app_id"
```
</details>

**Properties**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|ChartMetricsSegmentation|string|:heavy_minus_sign:|none|Possible values are: <ul><li> app_id</li><li> period</li><li> renewal_status</li><li> cancellation_reason</li><li> store_product_id</li><li> country</li><li> store</li><li> purchase_container_id</li><li> paywall_id</li><li> audience_id</li><li> placement_id</li><li> attribution_source</li><li> attribution_status</li><li> attribution_channel</li><li> attribution_campaign</li><li> attribution_adgroup</li><li> attribution_adset</li><li> attribution_creative</li><li> duration</li><li> default</li></ul>|

### ChartMetricsType

<details>
 <summary>Example (click to expand)</summary>

```json
"revenue"
```

</details>

**Properties**

| Name             | Type   | Required           | Description                                                  |
| ---------------- | ------ | ------------------ | ------------------------------------------------------------ |
| ChartMetricsType | string | :heavy_minus_sign: | Possible values are: <ul><li> revenue</li><li> mrr</li><li> arr</li><li> arppu</li><li> arpas</li><li> subscriptions_active</li><li> subscriptions_new</li><li> subscriptions_renewal_cancelled</li><li> subscriptions_expired</li><li> trials_active</li><li> trials_new</li><li> trials_renewal_cancelled</li><li> trials_expired</li><li> grace_period</li><li> billing_issue</li><li> refund_events</li><li> refund_money</li><li> refund_rate</li><li> arpu</li><li> installs</li><li> funnel</li><li> retention</li><li> non_subscriptions</li><li> ltv</li><li> unique_subscribers</li><li> unique_paid_subscribers</li><li> purchases</li><li> install_paid</li><li> install_trial</li><li> trial_paid</li><li> from_paid_to_2_period_conversion</li><li> from_2_period_to_3_period_conversion</li><li> from_3_period_to_4_period_conversion</li><li> from_4_period_to_5_period_conversion</li><li> </li><li> from_paid_to_12_months_conversion</li><li> from_paid_to_24_months_conversion</li></ul> |

### CohortMetricsConditions

<details>
<summary>Example (click to expand)</summary>

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

**Properties**

| Name            | Type                                                      | Required           | Description      |
| --------------- | --------------------------------------------------------- | ------------------ | ---------------- |
| filters         | [MetricsFilters](client-api-objects#metricsfilters)       | :heavy_plus_sign:  |                  |
| period_unit     | [PeriodUnit](client-api-objects#periodunit)               | :heavy_minus_sign: | Enumerated value |
| period_type     | [RenewalPeriodType](client-api-objects#renewalperiodtype) | :heavy_minus_sign: | Enumerated value |
| value_type      | [CohortValueType](client-api-objects#cohortvaluetype)     | :heavy_minus_sign: | Enumerated value |
| value_field     | [CohortValueField](client-api-objects#cohortvaluefield)   | :heavy_minus_sign: | Enumerated value |
| accounting_type | [AccountingType](client-api-objects#accountingtype)       | :heavy_minus_sign: | Enumerated value |
| renewal_days    | integer                                                   | :heavy_minus_sign: |                  |
| format          | [MetricsFormat](client-api-objects#metricsformat)         | :heavy_minus_sign: | Enumerated value |

### CohortValueField

<details>
 <summary>Example (click to expand)</summary>
```json
"revenue"
```
</details>
**Properties** 

| Name             | Type   | Required           | Description                                                  |
| ---------------- | ------ | ------------------ | ------------------------------------------------------------ |
| CohortValueField | string | :heavy_minus_sign: | Possible values are: <ul><li> revenue</li><li> arppu</li><li> arpu</li><li> arpas</li><li> subscribers</li><li> subscriptions</li></ul> |

### CohortValueType

<details>
 <summary>Example (click to expand)</summary>


```json
"absolute"
```

</details>

**Properties** 

| Name            | Type   | Required           | Description                                                  |
| --------------- | ------ | ------------------ | ------------------------------------------------------------ |
| CohortValueType | string | :heavy_minus_sign: | Possible values are: <ul><li> absolute</li><li> relative</li></ul> |

### ConversionsMetricsRequest

<details>
 <summary>Example (click to expand)</summary>


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
**Properties** 

| Name         | Type                                            | Required           | Description                                                  |
| ------------ | ----------------------------------------------- | ------------------ | ------------------------------------------------------------ |
| filters      | [ChartFilters](client-api-objects#chartfilters) | :heavy_plus_sign:  |                                                              |
| segmentation | string                                          | :heavy_minus_sign: | Possible values are: <ul><li> `period` - Period</li><li> `renewal_status` - Renewal status</li><li> `cancellation_reason` - Cancellation reason</li><li> `store_product_id` - Store product id</li> <li> `country` - Country</li><li> `store` - Store</li><li> `purchase_container_id` - Purchase container id</li><li> `paywall_id` - Paywall id</li><li>  `audience_id` - Audience id</li><li> `placement_id` - Placement id</li><li>  `attribution_source` - Attribution source</li><li>  `attribution_status` - Attribution status</li><li>  `attribution_channel` - Attribution channel</li><li>  `attribution_campaign` - Attribution campaign</li><li>  `attribution_adgroup` - Attribution adgroup</li><li>  `attribution_adset` - Attribution adset</li><li>  `attribution_creative` - Attribution creative</li><li>  `duration` - Duration</li><li>  `day` - Day</li><li>  `week` - Week</li><li>  `month` - Month</li><li>  `year` - Year</li><li> listitem</li></ul> |
| from_period  | integer¦null                                    | :heavy_minus_sign: | Possible values are: <ul><li> null - from install; </li><li> 0 - from trial;</li><li> 1, 2, 3, 4, ... - from period.</li></ul> |
| to_period    | string                                          | :heavy_plus_sign:  | Possible values are: <ul><li> 0 - to trial; </li><li> 1, 2, 3, 4, ... - to period;</li><li> 6+, 12+, 24+, ... - to 6+ months, etc</li></ul> |
| period_unit  | string                                          | :heavy_minus_sign: | Possible values are: <ul><li>  `day` - Day</li><li> `week` - Week</li><li>  `month` - Month</li><li> `quarter` - Quarter</li><li> `year` - Year</li><li> `none` - None</li></ul> |

### DateType

<details>
 <summary>Example (click to expand)</summary>


```json
"purchase_date"

```

</details>

**Properties** 

| Name     | Type   | Required           | Description                                                  |
| -------- | ------ | ------------------ | ------------------------------------------------------------ |
| DateType | string | :heavy_minus_sign: | Possible values are: <ul><li> purchase_date</li><li> profile_install_date</li></ul> |

### Duration

<details>
 <summary>Example (click to expand)</summary>
```json
"Weekly"

```

</details>

**Properties** 

| Name     | Type   | Required           | Description                                                  |
| -------- | ------ | ------------------ | ------------------------------------------------------------ |
| Duration | string | :heavy_minus_sign: | Possible values are: <ul><li> listWeeklytem</li><li> Monthly</li><li> 2 months</li><li> 3 months</li><li> 6 months</li><li> Annual</li><li> Lifetime</li><li> Uncategorized</li></ul> |

### FunnelMetricsConditions

<details>
 <summary>Example (click to expand)</summary>

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

**Properties** 

| Name            | Type                                                         | Required           | Description      |
| --------------- | ------------------------------------------------------------ | ------------------ | ---------------- |
| filters         | [MetricsFilters](client-api-objects#metricsfilters)          | :heavy_plus_sign:  |                  |
| period_unit     | [PeriodUnit](client-api-objects#periodunit)                  | :heavy_minus_sign: | Enumerated value |
| date_type       | [DateType](client-api-objects#datetype)                      | :heavy_minus_sign: | Enumerated value |
| segmentation_by | [ChartMetricsSegmentation](client-api-objects#chartmetricssegmentation) | :heavy_minus_sign: | Enumerated value |
| format          | [MetricsFormat](client-api-objects#metricsformat)            | :heavy_minus_sign: | Enumerated value |

### FunnelsMetricsRequest

<details>
 <summary>Example (click to expand)</summary>

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
**Properties** 

| Name         | Type                                            | Required           | Description                                                  |
| ------------ | ----------------------------------------------- | ------------------ | ------------------------------------------------------------ |
| filters      | [ChartFilters](client-api-objects#chartfilters) | :heavy_plus_sign:  |                                                              |
| segmentation | string                                          | :heavy_minus_sign: | Possible values are: <ul><li> `period` - Period</li><li> `renewal_status` - Renewal status</li><li> `cancellation_reason` - Cancellation reason</li><li> `store_product_id` - Store product id</li><li> `country` - Country</li><li> `store` - Store</li><li> `purchase_container_id`- Purchase container id</li><li> `paywall_id` - Paywall id</li><li>  `audience_id` - Audience id</li><li> `placement_id` - Placement id</li><li> `attribution_source` - Attribution source</li><li> `attribution_status` - Attribution status</li><li> `attribution_channel` - Attribution channel</li><li> `attribution_campaign` - Attribution campaign</li><li> `attribution_adgroup` - Attribution adgroup</li><li> `attribution_adset` - Attribution adset</li><li> `attribution_creative` - Attribution creative</li><li> `duration` - Duration</li><li> `day` - Day</li><li> `week` - Week</li><li> `month` - Month</li><li> `year` - Year</li></ul> |

### LTVSegmentation

<details>
 <summary>Example (click to expand)</summary>
```json
"day"
```
</details>

**Properties** 

| Name            | Type   | Required           | Description                                                  |
| --------------- | ------ | ------------------ | ------------------------------------------------------------ |
| LTVSegmentation | string | :heavy_minus_sign: | Possible values are: <ul><li> day</li><li> week</li><li> month</li><li> year</li><li> country</li><li> product</li><li> paywall</li><li> paywalls_group</li><li> audience</li><li> placement</li><li> duration</li><li> store</li></ul> |

### MetricsFilterField

<details>
 <summary>Example (click to expand)</summary>


```json
"app_id"

```

</details>

**Properties** 

| Name               | Type   | Required           | Description                                                  |
| ------------------ | ------ | ------------------ | ------------------------------------------------------------ |
| MetricsFilterField | string | :heavy_minus_sign: | Possible values are: <ul><li> app_id</li><li> country</li><li> store</li><li> audience_id</li><li> paywall_id</li><li> paywalls_group_id</li><li> placement_audience_version_id</li><li> placement_id</li><li> store_product_id</li><li> purchase_container_id</li><li> attribution</li><li> attribution_status</li><li> attribution_channel</li><li> attribution_campaign</li><li> attribution_adgroup</li><li> attribution_adset</li><li> attribution_creative</li><li> attribution_source</li><li> state</li></ul> |

### MetricsFilters

<details>
 <summary>Example (click to expand)</summary>


```json
{
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
}

```

</details>

**Properties** 

| Name                          | Type                     | Required          | Description                                                  |
| ----------------------------- | ------------------------ | ----------------- | ------------------------------------------------------------ |
| date                          | array of strings(data)   | :heavy_plus_sign: | minItems: 2,  maxItems: 2                                    |
| compare_date                  | array of strings(data)   | :heavy_minus_sign: | minItems: 2,  maxItems: 2                                    |
| date_from                     | string(date-time)        | :heavy_plus_sign: |                                                              |
| date_to                       | string(date-time)        | :heavy_plus_sign: |                                                              |
| compare_date_from             | string(date-time)        | :heavy_minus_sign: |                                                              |
| compare_date_to               | string(date-time)        | :heavy_minus_sign: |                                                              |
| store                         | array of strings         | :heavy_minus_sign: |                                                              |
| app_id                        | array of strings(uuid)   | :heavy_minus_sign: |                                                              |
| placement_id                  | array of strings(uuid)   | :heavy_minus_sign: |                                                              |
| audience_id                   | array of strings(uuid)   | :heavy_minus_sign: |                                                              |
| ab_test_id                    | array of strings(uuid)   | :heavy_minus_sign: |                                                              |
| paywalls_group_id             | array of strings(uuid)   | :heavy_minus_sign: |                                                              |
| paywall_id                    | array of strings(uuid)   | :heavy_minus_sign: |                                                              |
| placement_audience_version_id | array of strings(uuid)   | :heavy_minus_sign: |                                                              |
| state                         | array of [State](client-api-objects#state) | :heavy_minus_sign: | Enumerated value                                             |
| purchase_container_id         | array of strings(uuid)   | :heavy_minus_sign: |                                                              |
| country                       | anyOf                    | :heavy_minus_sign: | Possible values are: <ul><li> type: string, minLength: 2, maxLength: 2</li><li> type: string, minLength: 0, maxLength: 0</li></ul> |
| store_product_id         | array of stings                                 | :heavy_minus_sign: | minItems: 2, maxItems: 2 |
| duration                 | array of [Duration](client-api-objects#duration) | :heavy_minus_sign: | Enumerated value |
| attribution_source       | array of stings                           | :heavy_minus_sign: |                 |
| attribution_status       | array of stings                           | :heavy_minus_sign: |                 |
| attribution_channel      | array of stings                           | :heavy_minus_sign: |                 |
| attribution_campaign     | array of stings                           | :heavy_minus_sign: |                 |
| attribution_adgroup      | array of stings                           | :heavy_minus_sign: |                 |
| attribution_adset        | array of stings                           | :heavy_minus_sign: |                 |
| attribution_creative     | array of stings                           | :heavy_minus_sign: |                 |
| renewal_period           | array of integers                         | :heavy_minus_sign: |                 |
| subscription_duration    | integer                                           | :heavy_minus_sign: |                 |
| timezone                 | string                                            | :heavy_minus_sign: |                 |
| profiles_counting_method | [ProfilesCountingMethod](client-api-objects#profilescountingmethod) | :heavy_minus_sign: | Enumerated value |

### MetricsFormat

<details>
 <summary>Example (click to expand)</summary>


```json
"json"

```

</details>

**Properties** 

| Name          | Type   | Required           | Description                                               |
| ------------- | ------ | ------------------ | --------------------------------------------------------- |
| MetricsFormat | string | :heavy_minus_sign: | Possible values are: <ul><li> json</li><li> csv</li></ul> |

### PeriodUnit

<details>
 <summary>Example (click to expand)</summary>


```json
"day"

```

</details>

**Properties** 

| Name       | Type   | Required           | Description                                                  |
| ---------- | ------ | ------------------ | ------------------------------------------------------------ |
| PeriodUnit | string | :heavy_minus_sign: | Possible values are: <ul><li> day</li><li> week</li><li> month</li><li> quarter</li><li> year</li></ul> |

### ProfilesCountingMethod

<details>
 <summary>Example (click to expand)</summary>


```json
"profile_id"

```

</details>

**Properties** 

| Name                   | Type   | Required           | Description                                                  |
| ---------------------- | ------ | ------------------ | ------------------------------------------------------------ |
| ProfilesCountingMethod | string | :heavy_minus_sign: | Possible values are: <ul><li> profile_id</li><li> customer_user_id</li><li> device_id</li></ul> |

### RenewalPeriodType

<details>
 <summary>Example (click to expand)</summary>


```json
"renewals"

```

</details>

**Properties** 

| Name              | Type   | Required           | Description                                                  |
| ----------------- | ------ | ------------------ | ------------------------------------------------------------ |
| RenewalPeriodType | string | :heavy_minus_sign: | Possible values are: <ul><li> renewals</li><li> days</li></ul> |

### RequestDTO

<details>
 <summary>Example (click to expand)</summary>


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

**Properties** 

| Name         | Type                                                      | Required           | Description      |
| ------------ | --------------------------------------------------------- | ------------------ | ---------------- |
| filters      | [MetricsFilters](client-api-objects#metricsfilters)       | :heavy_plus_sign:  |                  |
| format       | [MetricsFormat](client-api-objects#metricsformat)         | :heavy_minus_sign: | Enumerated value |
| period_unit  | [PeriodUnit](client-api-objects#periodunit)               | :heavy_minus_sign: | Enumerated value |
| period_type  | [RenewalPeriodType](client-api-objects#renewalperiodtype) | :heavy_minus_sign: | Enumerated value |
| segmentation | [LTVSegmentation](client-api-objects#ltvsegmentation)     | :heavy_minus_sign: | Enumerated value |
| value_type   | [CohortValueType](client-api-objects#cohortvaluetype)     | :heavy_minus_sign: | Enumerated value |

### RetentionMetricsConditions

<details>
 <summary>Example (click to expand)</summary>

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

**Properties** 

| Name            | Type                                                         | Required           | Description      |
| --------------- | ------------------------------------------------------------ | ------------------ | ---------------- |
| filters         | [MetricsFilters](client-api-objects#metricsfilters)          | :heavy_plus_sign:  |                  |
| period_unit     | [PeriodUnit](client-api-objects#periodunit)                  | :heavy_minus_sign: | Enumerated value |
| date_type       | [DateType](client-api-objects#datetype)                      | :heavy_minus_sign: | Enumerated value |
| segmentation_by | [ChartMetricsSegmentation](client-api-objects#chartmetricssegmentation) | :heavy_minus_sign: | Enumerated value |
| use_trial       | boolean                                                      | :heavy_minus_sign: |                  |
| value_type      | [CohortValueType](client-api-objects#cohortvaluetype)        | :heavy_minus_sign: | Enumerated value |
| format          | [MetricsFormat](client-api-objects#metricsformat)            | :heavy_minus_sign: | Enumerated value |

### RetentionMetricsRequest

<details>
 <summary>Example (click to expand)</summary>


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

**Properties** 

| Name         | Type                                            | Required           | Description                                                  |
| ------------ | ----------------------------------------------- | ------------------ | ------------------------------------------------------------ |
| filters      | [ChartFilters](client-api-objects#chartfilters) | :heavy_plus_sign:  | none                                                         |
| segmentation | string                                          | :heavy_minus_sign: | Possible values are: <ul><li> `period` - Period</li><li> `renewal_status` - Renewal status</li><li> `cancellation_reason` - Cancellation reason</li><li> `store_product_id` - Store product id</li> <li> `country` - Country</li><li> `store` - Store</li><li> `purchase_container_id` - Purchase container id</li><li> `paywall_id` - Paywall id</li><li>  `audience_id` - Audience id</li><li> `placement_id` - Placement id</li><li>  `attribution_source` - Attribution source</li><li>  `attribution_status` - Attribution status</li><li>  `attribution_channel` - Attribution channel</li><li>  `attribution_campaign` - Attribution campaign</li><li>  `attribution_adgroup` - Attribution adgroup</li><li>  `attribution_adset` - Attribution adset</li><li>  `attribution_creative` - Attribution creative</li><li>  `duration` - Duration</li><li>  `day` - Day</li><li>  `week` - Week</li><li>  `month` - Month</li><li>  `year` - Year</li></ul> |
| use_trial    | boolean                                         | :heavy_minus_sign: | none                                                         |

### State

<details>
 <summary>Example (click to expand)</summary>


```json
"live"

```

</details>

**Properties** 

| Name  | Type   | Required           | Description                                                  |
| ----- | ------ | ------------------ | ------------------------------------------------------------ |
| State | string | :heavy_minus_sign: | <ul><li> live</li><li> inactive</li><li> draft</li><li> archived</li></ul> |
