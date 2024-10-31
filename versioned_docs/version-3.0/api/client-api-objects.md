---
title: API Objects for export of analytics
---
Adapty API has JSON objects so you can understand a response structure and wrap it into your code.

All datetime values are [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601), for example, "2020-01-15T15:10:36.517975+0000".

### ABPredict

**Properties**

| Name          | Type                          | Required          | Description                                                  |
| ------------- | ----------------------------- | ----------------- | ------------------------------------------------------------ |
| certainty     | boolean                       | :heavy_plus_sign: |                                                              |
| probabilities | `additionalProperties` object | :heavy_plus_sign: | any of: <ul><li>type: number</li><li> type: string</li></ul> |

<details>
 <summary>Example (click to expand)</summary>
```json
{
  "certainty": true,
  "probabilities": [
    {
      "property1": 0,
      "property2": 0
    }
  ]
}
```
</details>

### ABTest
**Properties**

| Name           | Type                            | Required          |
| -------------- | ------------------------------- | ----------------- |
| ab_test_id     | string(uuid)                    | :heavy_plus_sign: |
| title          | string                          | :heavy_plus_sign: |
| goal           | string                          | :heavy_plus_sign: |
| paywalls_group | [PaywallsGroup](#paywallsgroup) | :heavy_plus_sign: |
| created_at     | string(date-time)               | :heavy_plus_sign: |

 <details>
   <summary>Example (click to expand)</summary>

```
```json
{
  "ab_test_id": "c681ac9d-21b4-4f88-8060-10a3639bfde7",
  "title": "string",
  "goal": "string",
  "paywalls_group": {
    "paywalls_group_id": "c0cb5b73-71c2-4250-9a48-b2e8da0c7144",
    "title": "string"
  },
  "created_at": "2019-08-24T14:15:22Z"
}

```

</details>

### ABTestAggregate

**Properties**

| Name           | Type                                                         | Required           |
| -------------- | ------------------------------------------------------------ | ------------------ |
| ab_test        | [ABTest](#abtest)                                            | :heavy_plus_sign:  |
| paywalls_group | [PaywallsGroup](#paywallsgroup)                              | :heavy_minus_sign: |
| paywalls       | [ABTestPaywallWeightAggregate](#abtestpaywallweightaggregate) | :heavy_plus_sign:  |

  <details>
   <summary>Example (click to expand)</summary>


```json
{
  "ab_test": {
    "ab_test_id": "c681ac9d-21b4-4f88-8060-10a3639bfde7",
    "title": "string",
    "goal": "string",
    "paywalls_group": {
      "paywalls_group_id": "c0cb5b73-71c2-4250-9a48-b2e8da0c7144",
      "title": "string"
    },
    "created_at": "2019-08-24T14:15:22Z"
  },
  "paywalls_group": {
    "paywalls_group_id": "c0cb5b73-71c2-4250-9a48-b2e8da0c7144",
    "title": "string"
  },
  "paywalls": [
    {
      "paywall": {
        "paywall": {
          "paywall_id": "eeb111ae-cdbe-489f-9fe4-30a4b6109051",
          "title": "string",
          "use_paywall_builder": true,
          "use_paywall_builder_v4": true,
          "screenshot": {
            "image_id": 0,
            "url": "http://example.com"
          },
          "builder_screenshot": {
            "image_id": 0,
            "url": "http://example.com"
          },
          "main_screenshot": {
            "image_id": 0,
            "url": "http://example.com"
          }
        },
        "screenshot": {
          "image_id": 0,
          "url": "http://example.com"
        },
        "builder_screenshot": {
          "image_id": 0,
          "url": "http://example.com"
        },
        "products": [
          {
            "product_id": "0d012afa-f885-4e65-aeca-37e27701e2d1",
            "title": "string",
            "product_set": "uncategorised",
            "offer": {
              "product_offer_id": "beaf26e9-01fd-4b9a-a128-2872bf52e733",
              "title": "string"
            },
            "ordering_index": 0
          }
        ]
      },
      "weight": 100,
      "paywalls_group_paywall_id": "652d7bee-751c-4a11-b6de-6615a944c610"
    }
  ]
}

```

</details> 

### ABTestData

**Properties**

| Name           | Type                                       | Required           | Description                                                  |
| -------------- | ------------------------------------------ | ------------------ | ------------------------------------------------------------ |
| title          | string                                     | :heavy_plus_sign:  |                                                              |
| goal           | string                                     | :heavy_plus_sign:  |                                                              |
| paywalls_group | [PaywallsGroupData](#paywallsgroupdata)    | :heavy_minus_sign: | Annotation:    This object is immutable dataset.  @dataclass(frozen=True) |
| paywalls       | [[ABTestPaywallData](#aabtestpaywalldata)] | :heavy_plus_sign:  | Annotation: This object is immutable dataset.  @dataclass(frozen=True) |

<details>
 <summary>Example (click to expand)</summary>

```json
{
  "title": "string",
  "goal": "string",
  "paywalls_group": {
    "paywalls_group_id": "c0cb5b73-71c2-4250-9a48-b2e8da0c7144",
    "title": "string"
  },
  "paywalls": [
    {
      "paywall_id": "eeb111ae-cdbe-489f-9fe4-30a4b6109051",
      "weight": 100
    },
    {
      "paywall_id": "eeb111ae-cdbe-489f-9fe4-30a4b6109051",
      "weight": 100
    }
  ]
}
```

</details>


### ABTestDetailMetricsCollection

<details>
 <summary>Example (click to expand)</summary>

```json
{
  "ab_test": {
    "ab_test_id": "c681ac9d-21b4-4f88-8060-10a3639bfde7",
    "title": "string",
    "goal": "string",
    "paywalls_group": {
      "paywalls_group_id": "c0cb5b73-71c2-4250-9a48-b2e8da0c7144",
      "title": "string"
    },
    "created_at": "2019-08-24T14:15:22Z"
  },
  "state": "live",
  "placement": {
    "placement_id": "d98659e8-3eb1-4328-89b6-1848d40b4461",
    "title": "string",
    "created_at": "2019-08-24T14:15:22Z"
  },
  "audience": {
    "audience_id": "875075bb-caff-4035-8f5f-9fb1430dc417",
    "title": "string",
    "is_default": true
  },
  "placement_audience_priority": 0,
  "started_at": "2019-08-24T14:15:22Z",
  "stopped_at": "2019-08-24T14:15:22Z",
  "metrics": [
    {
      "revenue": 0,
      "proceeds": 0,
      "net_revenue": 0,
      "purchases": 0,
      "trials": 0,
      "trials_cancelled": 0,
      "refunds": 0,
      "unique_subscribers": 0,
      "unique_paid_subscribers": 0,
      "views": 0,
      "unique_profiles_views": 0,
      "in_current_state": true,
      "arppu": 0,
      "arpas": 0,
      "apppu": 0,
      "appas": 0,
      "conversion_rate_purchases": 0,
      "conversion_rate_trials": 0,
      "conversion_rate_refunds": 0,
      "conversion_rate_purchases_by_users": 0,
      "conversion_rate_trials_by_users": 0,
      "items": [
        {
          "revenue": 0,
          "proceeds": 0,
          "net_revenue": 0,
          "purchases": 0,
          "trials": 0,
          "trials_cancelled": 0,
          "refunds": 0,
          "unique_subscribers": 0,
          "unique_paid_subscribers": 0,
          "views": 0,
          "unique_profiles_views": 0,
          "in_current_state": true,
          "arppu": 0,
          "arpas": 0,
          "apppu": 0,
          "appas": 0,
          "conversion_rate_purchases": 0,
          "conversion_rate_trials": 0,
          "conversion_rate_refunds": 0,
          "conversion_rate_purchases_by_users": 0,
          "conversion_rate_trials_by_users": 0
        }
      ],
      "title": "string",
      "paywall": {
        "paywall_id": "eeb111ae-cdbe-489f-9fe4-30a4b6109051",
        "title": "string",
        "use_paywall_builder": true,
        "use_paywall_builder_v4": true,
        "screenshot": {
          "image_id": 0,
          "url": "http://example.com"
        },
        "builder_screenshot": {
          "image_id": 0,
          "url": "http://example.com"
        },
        "main_screenshot": {
          "image_id": 0,
          "url": "http://example.com"
        }
      },
      "values": [
        {
          "revenue": 0,
          "proceeds": 0,
          "net_revenue": 0,
          "purchases": 0,
          "trials": 0,
          "trials_cancelled": 0,
          "refunds": 0,
          "unique_subscribers": 0,
          "unique_paid_subscribers": 0,
          "views": 0,
          "unique_profiles_views": 0,
          "in_current_state": true,
          "arppu": 0,
          "arpas": 0,
          "apppu": 0,
          "appas": 0,
          "conversion_rate_purchases": 0,
          "conversion_rate_trials": 0,
          "conversion_rate_refunds": 0,
          "conversion_rate_purchases_by_users": 0,
          "conversion_rate_trials_by_users": 0,
          "period": "2019-08-24T14:15:22Z",
          "low_boundary": 0,
          "average_per_1000": 0,
          "upper_boundary": 0,
          "probability": 0
        }
      ],
      "weight": 0,
      "low_boundary": 0,
      "average_per_1000": 0,
      "upper_boundary": 0,
      "probability": 0
    }
  ],
  "predict": {
    "certainty": true,
    "probabilities": [
      {
        "property1": 0,
        "property2": 0
      }
    ]
  },
  "segmentation_by": "product"
}

```

</details>


**Properties**

| Name                        | Type                                                         | Required           | Description     |
| --------------------------- | ------------------------------------------------------------ | ------------------ | --------------- |
| ab_test                     | [ABTest](#abtest)                                            | :heavy_plus_sign:  |                 |
| state                       | [ABTestState](#abteststate)                                  | :heavy_plus_sign:  | An enumeration. |
| placement                   | [Placement](#placement)                                      | :heavy_minus_sign: |                 |
| audience                    | [Audience](#audience)                                        | :heavy_minus_sign: |                 |
| placement_audience_priority | integer                                                      | :heavy_minus_sign: |                 |
| started_at                  | string(date-time)                                            | :heavy_minus_sign: |                 |
| stopped_at                  | string(date-time)                                            | :heavy_minus_sign: |                 |
| metrics                     | [ABTestPaywallMetrics](#abtestpaywallmetrics)                | :heavy_plus_sign:  |                 |
| predict                     | [ABPredict](#abpredict)                                      | :heavy_minus_sign: |                 |
| segmentation_by             | [InAppDetailMetricsSegmentation](#inappdetailmetricssegmentation) | :heavy_minus_sign: | An enumeration. |

### ABTestDetailTotalMetricsCollection

<details>
 <summary>Example (click to expand)</summary>

```json
{
  "ab_test": {
    "ab_test_id": "c681ac9d-21b4-4f88-8060-10a3639bfde7",
    "title": "string",
    "goal": "string",
    "paywalls_group": {
      "paywalls_group_id": "c0cb5b73-71c2-4250-9a48-b2e8da0c7144",
      "title": "string"
    },
    "created_at": "2019-08-24T14:15:22Z"
  },
  "state": "live",
  "started_at": "2019-08-24T14:15:22Z",
  "stopped_at": "2019-08-24T14:15:22Z",
  "metrics": [
    {
      "revenue": 0,
      "proceeds": 0,
      "net_revenue": 0,
      "purchases": 0,
      "trials": 0,
      "trials_cancelled": 0,
      "refunds": 0,
      "unique_subscribers": 0,
      "unique_paid_subscribers": 0,
      "views": 0,
      "unique_profiles_views": 0,
      "in_current_state": true,
      "arppu": 0,
      "arpas": 0,
      "apppu": 0,
      "appas": 0,
      "conversion_rate_purchases": 0,
      "conversion_rate_trials": 0,
      "conversion_rate_refunds": 0,
      "conversion_rate_purchases_by_users": 0,
      "conversion_rate_trials_by_users": 0,
      "paywall": {
        "paywall_id": "eeb111ae-cdbe-489f-9fe4-30a4b6109051",
        "title": "string",
        "use_paywall_builder": true,
        "use_paywall_builder_v4": true,
        "screenshot": {
          "image_id": 0,
          "url": "http://example.com"
        },
        "builder_screenshot": {
          "image_id": 0,
          "url": "http://example.com"
        },
        "main_screenshot": {
          "image_id": 0,
          "url": "http://example.com"
        }
      },
      "weight": 0,
      "low_boundary": 0,
      "average_per_1000": 0,
      "upper_boundary": 0,
      "probability": 0
    }
  ],
  "predict": {
    "certainty": true,
    "probabilities": [
      {
        "property1": 0,
        "property2": 0
      }
    ]
  }
}
```

</details>

**Properties**

| Name       | Type                                                      | Required           | Description     |
| ---------- | --------------------------------------------------------- | ------------------ | --------------- |
| ab_test    | [ABTest](#abtest)                                         | :heavy_plus_sign:  |                 |
| state      | [ABTestState](#abteststate)                               | :heavy_plus_sign:  | An enumeration. |
| started_at | string(date-time)                                         | :heavy_minus_sign: |                 |
| stopped_at | string(date-time)                                         | :heavy_minus_sign: |                 |
| metrics    | [[ABTestPaywallTotalMetrics](#abtestpaywalltotalmetrics)] | :heavy_plus_sign:  |                 |
| predict    | [ABPredict](#abpredict)                                   | :heavy_minus_sign: |                 |

<h2 id="tocS_ABTestListMetrics">ABTestListMetrics</h2>

<details>
 <summary>Example (click to expand)</summary>

```
```json
{
  "revenue": 0,
  "proceeds": 0,
  "net_revenue": 0,
  "purchases": 0,
  "trials": 0,
  "trials_cancelled": 0,
  "refunds": 0,
  "unique_subscribers": 0,
  "unique_paid_subscribers": 0,
  "views": 0,
  "unique_profiles_views": 0,
  "in_current_state": true,
  "arppu": 0,
  "arpas": 0,
  "apppu": 0,
  "appas": 0,
  "conversion_rate_purchases": 0,
  "conversion_rate_trials": 0,
  "conversion_rate_refunds": 0,
  "conversion_rate_purchases_by_users": 0,
  "conversion_rate_trials_by_users": 0,
  "items": [
    {
      "revenue": 0,
      "proceeds": 0,
      "net_revenue": 0,
      "purchases": 0,
      "trials": 0,
      "trials_cancelled": 0,
      "refunds": 0,
      "unique_subscribers": 0,
      "unique_paid_subscribers": 0,
      "views": 0,
      "unique_profiles_views": 0,
      "in_current_state": true,
      "arppu": 0,
      "arpas": 0,
      "apppu": 0,
      "appas": 0,
      "conversion_rate_purchases": 0,
      "conversion_rate_trials": 0,
      "conversion_rate_refunds": 0,
      "conversion_rate_purchases_by_users": 0,
      "conversion_rate_trials_by_users": 0,
      "paywall_id": "eeb111ae-cdbe-489f-9fe4-30a4b6109051",
      "probability": 0,
      "weight": 0
    }
  ],
  "ab_test_id": "c681ac9d-21b4-4f88-8060-10a3639bfde7",
  "predict": {
    "certainty": true,
    "probabilities": [
      {
        "property1": 0,
        "property2": 0
      }
    ]
  }
}

```

</details>

**Properties**

| Name                               | Type                                                  | Required           |
| ---------------------------------- | ----------------------------------------------------- | ------------------ |
| revenue                            | number                                                | :heavy_minus_sign: |
| proceeds                           | number                                                | :heavy_minus_sign: |
| net_revenue                        | number                                                | :heavy_minus_sign: |
| purchases                          | integer                                               | :heavy_minus_sign: |
| trials                             | integer                                               | :heavy_minus_sign: |
| trials_cancelled                   | integer                                               | :heavy_minus_sign: |
| refunds                            | integer                                               | :heavy_minus_sign: |
| unique_subscribers                 | integer                                               | :heavy_minus_sign: |
| unique_paid_subscribers            | integer                                               | :heavy_minus_sign: |
| views                              | integer                                               | :heavy_minus_sign: |
| unique_profiles_views              | integer                                               | :heavy_minus_sign: |
| in_current_state                   | boolean                                               | :heavy_minus_sign: |
| arppu                              | number                                                | :heavy_minus_sign: |
| arpas                              | number                                                | :heavy_minus_sign: |
| apppu                              | number                                                | :heavy_minus_sign: |
| appas                              | number                                                | :heavy_minus_sign: |
| conversion_rate_purchases          | number                                                | :heavy_minus_sign: |
| conversion_rate_trials             | number                                                | :heavy_minus_sign: |
| conversion_rate_refunds            | number                                                | :heavy_minus_sign: |
| conversion_rate_purchases_by_users | number                                                | :heavy_minus_sign: |
| conversion_rate_trials_by_users    | number                                                | :heavy_minus_sign: |
| items                              | [ABTestPaywallListMetrics](#abtestpaywalllistmetrics) | :heavy_plus_sign:  |
| ab_test_id                         | string(uuid)                                          | :heavy_plus_sign:  |
| predict                            | [ABPredict](#abpredict)                               | :heavy_minus_sign: |

### ABTestListMetricsCollection

<details>
 <summary>Example (click to expand)</summary>
```json
{
  "data": [
    {
      "revenue": 0,
      "proceeds": 0,
      "net_revenue": 0,
      "purchases": 0,
      "trials": 0,
      "trials_cancelled": 0,
      "refunds": 0,
      "unique_subscribers": 0,
      "unique_paid_subscribers": 0,
      "views": 0,
      "unique_profiles_views": 0,
      "in_current_state": true,
      "arppu": 0,
      "arpas": 0,
      "apppu": 0,
      "appas": 0,
      "conversion_rate_purchases": 0,
      "conversion_rate_trials": 0,
      "conversion_rate_refunds": 0,
      "conversion_rate_purchases_by_users": 0,
      "conversion_rate_trials_by_users": 0,
      "items": [
        {
          "revenue": 0,
          "proceeds": 0,
          "net_revenue": 0,
          "purchases": 0,
          "trials": 0,
          "trials_cancelled": 0,
          "refunds": 0,
          "unique_subscribers": 0,
          "unique_paid_subscribers": 0,
          "views": 0,
          "unique_profiles_views": 0,
          "in_current_state": true,
          "arppu": 0,
          "arpas": 0,
          "apppu": 0,
          "appas": 0,
          "conversion_rate_purchases": 0,
          "conversion_rate_trials": 0,
          "conversion_rate_refunds": 0,
          "conversion_rate_purchases_by_users": 0,
          "conversion_rate_trials_by_users": 0,
          "paywall_id": "eeb111ae-cdbe-489f-9fe4-30a4b6109051",
          "probability": 0,
          "weight": 0
        }
      ],
      "ab_test_id": "c681ac9d-21b4-4f88-8060-10a3639bfde7",
      "predict": {
        "certainty": true,
        "probabilities": [
          {
            "property1": 0,
            "property2": 0
          }
        ]
      }
    }
  ],
  "meta": {
    "pagination": {
      "count": 0,
      "page": 0,
      "pages_count": 0
    }
  }
}
</details>

**Properties**

| Name | Type                                    | Required           |
| ---- | --------------------------------------- | ------------------ |
| data | [ABTestListMetrics](#abtestlistmetrics) | :heavy_plus_sign:  |
| meta | [Meta](#meta)                           | :heavy_minus_sign: |

### ABTestMetrics
<details>
 <summary>Example (click to expand)</summary>

```
```json
{
  "revenue": 0,
  "proceeds": 0,
  "net_revenue": 0,
  "purchases": 0,
  "trials": 0,
  "trials_cancelled": 0,
  "refunds": 0,
  "unique_subscribers": 0,
  "unique_paid_subscribers": 0,
  "views": 0,
  "unique_profiles_views": 0,
  "in_current_state": true,
  "arppu": 0,
  "arpas": 0,
  "apppu": 0,
  "appas": 0,
  "conversion_rate_purchases": 0,
  "conversion_rate_trials": 0,
  "conversion_rate_refunds": 0,
  "conversion_rate_purchases_by_users": 0,
  "conversion_rate_trials_by_users": 0,
  "items": [
    {
      "revenue": 0,
      "proceeds": 0,
      "net_revenue": 0,
      "purchases": 0,
      "trials": 0,
      "trials_cancelled": 0,
      "refunds": 0,
      "unique_subscribers": 0,
      "unique_paid_subscribers": 0,
      "views": 0,
      "unique_profiles_views": 0,
      "in_current_state": true,
      "arppu": 0,
      "arpas": 0,
      "apppu": 0,
      "appas": 0,
      "conversion_rate_purchases": 0,
      "conversion_rate_trials": 0,
      "conversion_rate_refunds": 0,
      "conversion_rate_purchases_by_users": 0,
      "conversion_rate_trials_by_users": 0,
      "items": [
        {
          "revenue": 0,
          "proceeds": 0,
          "net_revenue": 0,
          "purchases": 0,
          "trials": 0,
          "trials_cancelled": 0,
          "refunds": 0,
          "unique_subscribers": 0,
          "unique_paid_subscribers": 0,
          "views": 0,
          "unique_profiles_views": 0,
          "in_current_state": true,
          "arppu": 0,
          "arpas": 0,
          "apppu": 0,
          "appas": 0,
          "conversion_rate_purchases": 0,
          "conversion_rate_trials": 0,
          "conversion_rate_refunds": 0,
          "conversion_rate_purchases_by_users": 0,
          "conversion_rate_trials_by_users": 0,
          "items": [
            {
              "revenue": 0,
              "proceeds": 0,
              "net_revenue": 0,
              "purchases": 0,
              "trials": 0,
              "trials_cancelled": 0,
              "refunds": 0,
              "unique_subscribers": 0,
              "unique_paid_subscribers": 0,
              "views": 0,
              "unique_profiles_views": 0,
              "in_current_state": true,
              "arppu": 0,
              "arpas": 0,
              "apppu": 0,
              "appas": 0,
              "conversion_rate_purchases": 0,
              "conversion_rate_trials": 0,
              "conversion_rate_refunds": 0,
              "conversion_rate_purchases_by_users": 0,
              "conversion_rate_trials_by_users": 0
            }
          ],
          "title": "string",
          "paywall": {
            "paywall_id": "eeb111ae-cdbe-489f-9fe4-30a4b6109051",
            "title": "string",
            "use_paywall_builder": true,
            "use_paywall_builder_v4": true,
            "screenshot": {
              "image_id": 0,
              "url": "http://example.com"
            },
            "builder_screenshot": {
              "image_id": 0,
              "url": "http://example.com"
            },
            "main_screenshot": {
              "image_id": 0,
              "url": "http://example.com"
            }
          },
          "values": [
            {
              "revenue": 0,
              "proceeds": 0,
              "net_revenue": 0,
              "purchases": 0,
              "trials": 0,
              "trials_cancelled": 0,
              "refunds": 0,
              "unique_subscribers": 0,
              "unique_paid_subscribers": 0,
              "views": 0,
              "unique_profiles_views": 0,
              "in_current_state": true,
              "arppu": 0,
              "arpas": 0,
              "apppu": 0,
              "appas": 0,
              "conversion_rate_purchases": 0,
              "conversion_rate_trials": 0,
              "conversion_rate_refunds": 0,
              "conversion_rate_purchases_by_users": 0,
              "conversion_rate_trials_by_users": 0,
              "period": "2019-08-24T14:15:22Z",
              "low_boundary": 0,
              "average_per_1000": 0,
              "upper_boundary": 0,
              "probability": 0
            }
          ],
          "weight": 0,
          "low_boundary": 0,
          "average_per_1000": 0,
          "upper_boundary": 0,
          "probability": 0
        }
      ],
      "paywalls_group": {
        "paywalls_group_id": "c0cb5b73-71c2-4250-9a48-b2e8da0c7144",
        "title": "string"
      }
    }
  ],
  "ab_test": {
    "ab_test_id": "c681ac9d-21b4-4f88-8060-10a3639bfde7",
    "title": "string",
    "goal": "string",
    "paywalls_group": {
      "paywalls_group_id": "c0cb5b73-71c2-4250-9a48-b2e8da0c7144",
      "title": "string"
    },
    "created_at": "2019-08-24T14:15:22Z"
  },
  "predict": {
    "certainty": true,
    "probabilities": [
      {
        "property1": 0,
        "property2": 0
      }
    ]
  },
  "content_type": "ab_test"
}

```

</details>


**Properties**

| Name                               | Type                                                         | Required           | Description     |
| ---------------------------------- | ------------------------------------------------------------ | ------------------ | --------------- |
| revenue                            | number                                                       | :heavy_minus_sign: |                 |
| proceeds                           | number                                                       | :heavy_minus_sign: |                 |
| net_revenue                        | number                                                       | :heavy_minus_sign: |                 |
| purchases                          | integer                                                      | :heavy_minus_sign: |                 |
| trials                             | integer                                                      | :heavy_minus_sign: |                 |
| trials_cancelled                   | integer                                                      | :heavy_minus_sign: |                 |
| refunds                            | integer                                                      | :heavy_minus_sign: |                 |
| unique_subscribers                 | integer                                                      | :heavy_minus_sign: |                 |
| unique_paid_subscribers            | integer                                                      | :heavy_minus_sign: |                 |
| views                              | integer                                                      | :heavy_minus_sign: |                 |
| unique_profiles_views              | integer                                                      | :heavy_minus_sign: |                 |
| in_current_state                   | boolean                                                      | :heavy_minus_sign: |                 |
| arppu                              | number                                                       | :heavy_minus_sign: |                 |
| arpas                              | number                                                       | :heavy_minus_sign: |                 |
| apppu                              | number                                                       | :heavy_minus_sign: |                 |
| appas                              | number                                                       | :heavy_minus_sign: |                 |
| conversion_rate_purchases          | number                                                       | :heavy_minus_sign: |                 |
| conversion_rate_trials             | number                                                       | :heavy_minus_sign: |                 |
| conversion_rate_refunds            | number                                                       | :heavy_minus_sign: |                 |
| conversion_rate_purchases_by_users | number                                                       | :heavy_minus_sign: |                 |
| conversion_rate_trials_by_users    | number                                                       | :heavy_minus_sign: |                 |
| items                              | [PaywallsGroupMetrics](#paywallsgroupmetrics)                | :heavy_plus_sign:  |                 |
| ab_test                            | [ABTest](#abtest)                                            | :heavy_plus_sign:  |                 |
| predict                            | [ABPredict](#abpredict)                                      | :heavy_minus_sign: |                 |
| content_type                       | [PlacementAudienceContentType](placementaudiencecontenttype) | :heavy_minus_sign: | An enumeration. |

### ABTestPaywallData

<details>
 <summary>Example (click to expand)</summary>
```json
{
  "paywall_id": "eeb111ae-cdbe-489f-9fe4-30a4b6109051",
  "weight": 100
}
</details>

**Properties**

| Name       | Type         | Required          |
| ---------- | ------------ | ----------------- |
| paywall_id | string(uuid) | :heavy_plus_sign: |
| weight     | integer      | :heavy_plus_sign: |

### ABTestPaywallListMetrics

<details>
 <summary>Example (click to expand)</summary>

```
```json
{
  "revenue": 0,
  "proceeds": 0,
  "net_revenue": 0,
  "purchases": 0,
  "trials": 0,
  "trials_cancelled": 0,
  "refunds": 0,
  "unique_subscribers": 0,
  "unique_paid_subscribers": 0,
  "views": 0,
  "unique_profiles_views": 0,
  "in_current_state": true,
  "arppu": 0,
  "arpas": 0,
  "apppu": 0,
  "appas": 0,
  "conversion_rate_purchases": 0,
  "conversion_rate_trials": 0,
  "conversion_rate_refunds": 0,
  "conversion_rate_purchases_by_users": 0,
  "conversion_rate_trials_by_users": 0,
  "paywall_id": "eeb111ae-cdbe-489f-9fe4-30a4b6109051",
  "probability": 0,
  "weight": 0
}
```

</details>

**Properties**

| Name                               | Type         | Required           |
| ---------------------------------- | ------------ | ------------------ |
| revenue                            | number       | :heavy_minus_sign: |
| proceeds                           | number       | :heavy_minus_sign: |
| net_revenue                        | number       | :heavy_minus_sign: |
| purchases                          | integer      | :heavy_minus_sign: |
| trials                             | integer      | :heavy_minus_sign: |
| trials_cancelled                   | integer      | :heavy_minus_sign: |
| refunds                            | integer      | :heavy_minus_sign: |
| unique_subscribers                 | integer      | :heavy_minus_sign: |
| unique_paid_subscribers            | integer      | :heavy_minus_sign: |
| views                              | integer      | :heavy_minus_sign: |
| unique_profiles_views              | integer      | :heavy_minus_sign: |
| in_current_state                   | boolean      | :heavy_minus_sign: |
| arppu                              | number       | :heavy_minus_sign: |
| arpas                              | number       | :heavy_minus_sign: |
| apppu                              | number       | :heavy_minus_sign: |
| appas                              | number       | :heavy_minus_sign: |
| conversion_rate_purchases          | number       | :heavy_minus_sign: |
| conversion_rate_trials             | number       | :heavy_minus_sign: |
| conversion_rate_refunds            | number       | :heavy_minus_sign: |
| conversion_rate_purchases_by_users | number       | :heavy_minus_sign: |
| conversion_rate_trials_by_users    | number       | :heavy_minus_sign: |
| paywall_id                         | string(uuid) | :heavy_plus_sign:  |
| probability                        | number       | :heavy_minus_sign: |
| weight                             | integer      | :heavy_minus_sign: |

### ABTestPaywallMetrics

<details>
 <summary>Example (click to expand)</summary>


```json
{
  "revenue": 0,
  "proceeds": 0,
  "net_revenue": 0,
  "purchases": 0,
  "trials": 0,
  "trials_cancelled": 0,
  "refunds": 0,
  "unique_subscribers": 0,
  "unique_paid_subscribers": 0,
  "views": 0,
  "unique_profiles_views": 0,
  "in_current_state": true,
  "arppu": 0,
  "arpas": 0,
  "apppu": 0,
  "appas": 0,
  "conversion_rate_purchases": 0,
  "conversion_rate_trials": 0,
  "conversion_rate_refunds": 0,
  "conversion_rate_purchases_by_users": 0,
  "conversion_rate_trials_by_users": 0,
  "items": [
    {
      "revenue": 0,
      "proceeds": 0,
      "net_revenue": 0,
      "purchases": 0,
      "trials": 0,
      "trials_cancelled": 0,
      "refunds": 0,
      "unique_subscribers": 0,
      "unique_paid_subscribers": 0,
      "views": 0,
      "unique_profiles_views": 0,
      "in_current_state": true,
      "arppu": 0,
      "arpas": 0,
      "apppu": 0,
      "appas": 0,
      "conversion_rate_purchases": 0,
      "conversion_rate_trials": 0,
      "conversion_rate_refunds": 0,
      "conversion_rate_purchases_by_users": 0,
      "conversion_rate_trials_by_users": 0
    }
  ],
  "title": "string",
  "paywall": {
    "paywall_id": "eeb111ae-cdbe-489f-9fe4-30a4b6109051",
    "title": "string",
    "use_paywall_builder": true,
    "use_paywall_builder_v4": true,
    "screenshot": {
      "image_id": 0,
      "url": "http://example.com"
    },
    "builder_screenshot": {
      "image_id": 0,
      "url": "http://example.com"
    },
    "main_screenshot": {
      "image_id": 0,
      "url": "http://example.com"
    }
  },
  "values": [
    {
      "revenue": 0,
      "proceeds": 0,
      "net_revenue": 0,
      "purchases": 0,
      "trials": 0,
      "trials_cancelled": 0,
      "refunds": 0,
      "unique_subscribers": 0,
      "unique_paid_subscribers": 0,
      "views": 0,
      "unique_profiles_views": 0,
      "in_current_state": true,
      "arppu": 0,
      "arpas": 0,
      "apppu": 0,
      "appas": 0,
      "conversion_rate_purchases": 0,
      "conversion_rate_trials": 0,
      "conversion_rate_refunds": 0,
      "conversion_rate_purchases_by_users": 0,
      "conversion_rate_trials_by_users": 0,
      "period": "2019-08-24T14:15:22Z",
      "low_boundary": 0,
      "average_per_1000": 0,
      "upper_boundary": 0,
      "probability": 0
    }
  ],
  "weight": 0,
  "low_boundary": 0,
  "average_per_1000": 0,
  "upper_boundary": 0,
  "probability": 0
}

```

</details>

**Properties**

| Name                               | Type                                        | Required           |
| ---------------------------------- | ------------------------------------------- | ------------------ |
| revenue                            | number                                      | :heavy_minus_sign: |
| proceeds                           | number                                      | :heavy_minus_sign: |
| net_revenue                        | number                                      | :heavy_minus_sign: |
| purchases                          | integer                                     | :heavy_minus_sign: |
| trials                             | integer                                     | :heavy_minus_sign: |
| trials_cancelled                   | integer                                     | :heavy_minus_sign: |
| refunds                            | integer                                     | :heavy_minus_sign: |
| unique_subscribers                 | integer                                     | :heavy_minus_sign: |
| unique_paid_subscribers            | integer                                     | :heavy_minus_sign: |
| views                              | integer                                     | :heavy_minus_sign: |
| unique_profiles_views              | integer                                     | :heavy_minus_sign: |
| in_current_state                   | boolean                                     | :heavy_minus_sign: |
| arppu                              | number                                      | :heavy_minus_sign: |
| arpas                              | number                                      | :heavy_minus_sign: |
| apppu                              | number                                      | :heavy_minus_sign: |
| appas                              | number                                      | :heavy_minus_sign: |
| conversion_rate_purchases          | number                                      | :heavy_minus_sign: |
| conversion_rate_trials             | number                                      | :heavy_minus_sign: |
| conversion_rate_refunds            | number                                      | :heavy_minus_sign: |
| conversion_rate_purchases_by_users | number                                      | :heavy_minus_sign: |
| conversion_rate_trials_by_users    | number                                      | :heavy_minus_sign: |
| items                              | [InAppMetrics](#inappmetrics)               | :heavy_plus_sign:  |
| title                              | string                                      | :heavy_plus_sign:  |
| paywall                            | [Paywall](#paywall)                         | :heavy_plus_sign:  |
| values                             | [ABTestPeriodMetrics](#abtestperiodmetrics) | :heavy_plus_sign:  |
| weight                             | integer                                     | :heavy_plus_sign:  |
| low_boundary                       | number                                      | :heavy_minus_sign: |
| average_per_1000                   | number                                      | :heavy_minus_sign: |
| upper_boundary                     | number                                      | :heavy_minus_sign: |
| probability                        | number                                      | :heavy_minus_sign: |

### ABTestPaywallTotalMetrics

<details>
 <summary>Example (click to expand)</summary>


```json
{
  "revenue": 0,
  "proceeds": 0,
  "net_revenue": 0,
  "purchases": 0,
  "trials": 0,
  "trials_cancelled": 0,
  "refunds": 0,
  "unique_subscribers": 0,
  "unique_paid_subscribers": 0,
  "views": 0,
  "unique_profiles_views": 0,
  "in_current_state": true,
  "arppu": 0,
  "arpas": 0,
  "apppu": 0,
  "appas": 0,
  "conversion_rate_purchases": 0,
  "conversion_rate_trials": 0,
  "conversion_rate_refunds": 0,
  "conversion_rate_purchases_by_users": 0,
  "conversion_rate_trials_by_users": 0,
  "paywall": {
    "paywall_id": "eeb111ae-cdbe-489f-9fe4-30a4b6109051",
    "title": "string",
    "use_paywall_builder": true,
    "use_paywall_builder_v4": true,
    "screenshot": {
      "image_id": 0,
      "url": "http://example.com"
    },
    "builder_screenshot": {
      "image_id": 0,
      "url": "http://example.com"
    },
    "main_screenshot": {
      "image_id": 0,
      "url": "http://example.com"
    }
  },
  "weight": 0,
  "low_boundary": 0,
  "average_per_1000": 0,
  "upper_boundary": 0,
  "probability": 0
}
```

</details>

**Properties**

| Name                               | Type                | Required           |
| ---------------------------------- | ------------------- | ------------------ |
| revenue                            | number              | :heavy_minus_sign: |
| proceeds                           | number              | :heavy_minus_sign: |
| net_revenue                        | number              | :heavy_minus_sign: |
| purchases                          | integer             | :heavy_minus_sign: |
| trials                             | integer             | :heavy_minus_sign: |
| trials_cancelled                   | integer             | :heavy_minus_sign: |
| refunds                            | integer             | :heavy_minus_sign: |
| unique_subscribers                 | integer             | :heavy_minus_sign: |
| unique_paid_subscribers            | integer             | :heavy_minus_sign: |
| views                              | integer             | :heavy_minus_sign: |
| unique_profiles_views              | integer             | :heavy_minus_sign: |
| in_current_state                   | boolean             | :heavy_minus_sign: |
| arppu                              | number              | :heavy_minus_sign: |
| arpas                              | number              | :heavy_minus_sign: |
| apppu                              | number              | :heavy_minus_sign: |
| appas                              | number              | :heavy_minus_sign: |
| conversion_rate_purchases          | number              | :heavy_minus_sign: |
| conversion_rate_trials             | number              | :heavy_minus_sign: |
| conversion_rate_refunds            | number              | :heavy_minus_sign: |
| conversion_rate_purchases_by_users | number              | :heavy_minus_sign: |
| conversion_rate_trials_by_users    | number              | :heavy_minus_sign: |
| paywall                            | [Paywall](#paywall) | :heavy_plus_sign:  |
| weight                             | integer             | :heavy_plus_sign:  |
| low_boundary                       | number              | :heavy_minus_sign: |
| average_per_1000                   | number              | :heavy_minus_sign: |
| upper_boundary                     | number              | :heavy_minus_sign: |
| probability                        | number              | :heavy_minus_sign: |

### ABTestPaywallWeightAggregate

<details>
 <summary>Example (click to expand)</summary>


```json
{
  "paywall": {
    "paywall": {
      "paywall_id": "eeb111ae-cdbe-489f-9fe4-30a4b6109051",
      "title": "string",
      "use_paywall_builder": true,
      "use_paywall_builder_v4": true,
      "screenshot": {
        "image_id": 0,
        "url": "http://example.com"
      },
      "builder_screenshot": {
        "image_id": 0,
        "url": "http://example.com"
      },
      "main_screenshot": {
        "image_id": 0,
        "url": "http://example.com"
      }
    },
    "screenshot": {
      "image_id": 0,
      "url": "http://example.com"
    },
    "builder_screenshot": {
      "image_id": 0,
      "url": "http://example.com"
    },
    "products": [
      {
        "product_id": "0d012afa-f885-4e65-aeca-37e27701e2d1",
        "title": "string",
        "product_set": "uncategorised",
        "offer": {
          "product_offer_id": "beaf26e9-01fd-4b9a-a128-2872bf52e733",
          "title": "string"
        },
        "ordering_index": 0
      }
    ]
  },
  "weight": 100,
  "paywalls_group_paywall_id": "652d7bee-751c-4a11-b6de-6615a944c610"
}

```

</details>


**Properties**

| Name                      | Type                                                | Required           | Description                                        |
| ------------------------- | --------------------------------------------------- | ------------------ | -------------------------------------------------- |
| paywall                   | [PaywallRelatedAggregate](#paywallrelatedaggregate) | :heavy_plus_sign:  | Difference with state of included pydantic fields. |
| weight                    | integer                                             | :heavy_plus_sign:  |                                                    |
| paywalls_group_paywall_id | string(uuid)                                        | :heavy_minus_sign: |                                                    |

### ABTestPeriodMetrics

<details>
 <summary>Example (click to expand)</summary>


```json
{
  "revenue": 0,
  "proceeds": 0,
  "net_revenue": 0,
  "purchases": 0,
  "trials": 0,
  "trials_cancelled": 0,
  "refunds": 0,
  "unique_subscribers": 0,
  "unique_paid_subscribers": 0,
  "views": 0,
  "unique_profiles_views": 0,
  "in_current_state": true,
  "arppu": 0,
  "arpas": 0,
  "apppu": 0,
  "appas": 0,
  "conversion_rate_purchases": 0,
  "conversion_rate_trials": 0,
  "conversion_rate_refunds": 0,
  "conversion_rate_purchases_by_users": 0,
  "conversion_rate_trials_by_users": 0,
  "period": "2019-08-24T14:15:22Z",
  "low_boundary": 0,
  "average_per_1000": 0,
  "upper_boundary": 0,
  "probability": 0
}
```

</details>

**Properties**

| Name                               | Type              | Required           |
| ---------------------------------- | ----------------- | ------------------ |
| revenue                            | number            | :heavy_minus_sign: |
| proceeds                           | number            | :heavy_minus_sign: |
| net_revenue                        | number            | :heavy_minus_sign: |
| purchases                          | integer           | :heavy_minus_sign: |
| trials                             | integer           | :heavy_minus_sign: |
| trials_cancelled                   | integer           | :heavy_minus_sign: |
| refunds                            | integer           | :heavy_minus_sign: |
| unique_subscribers                 | integer           | :heavy_minus_sign: |
| unique_paid_subscribers            | integer           | :heavy_minus_sign: |
| views                              | integer           | :heavy_minus_sign: |
| unique_profiles_views              | integer           | :heavy_minus_sign: |
| in_current_state                   | boolean           | :heavy_minus_sign: |
| arppu                              | number            | :heavy_minus_sign: |
| arpas                              | number            | :heavy_minus_sign: |
| apppu                              | number            | :heavy_minus_sign: |
| appas                              | number            | :heavy_minus_sign: |
| conversion_rate_purchases          | number            | :heavy_minus_sign: |
| conversion_rate_trials             | number            | :heavy_minus_sign: |
| conversion_rate_refunds            | number            | :heavy_minus_sign: |
| conversion_rate_purchases_by_users | number            | :heavy_minus_sign: |
| conversion_rate_trials_by_users    | number            | :heavy_minus_sign: |
| period                             | string(date-time) | :heavy_plus_sign:  |
| low_boundary                       | number            | :heavy_plus_sign:  |
| average_per_1000                   | number            | :heavy_plus_sign:  |
| upper_boundary                     | number            | :heavy_plus_sign:  |
| probability                        | number            | :heavy_plus_sign:  |

### ABTestResultState

<details>
 <summary>Example (click to expand)</summary>


```json
"Significant test result!"

```

</details>

**Properties**

| Name              | Type   | Required           | Description     |
| ----------------- | ------ | ------------------ | --------------- |
| ABTestResultState | string | :heavy_minus_sign: | An enumeration. |

**Enumerated Values**

| Property          | Value                                                        |
| ----------------- | ------------------------------------------------------------ |
| ABTestResultState | <ul><li> Significant test result!</li><li> Insignificant test results.</li></ul> |

### ABTestState

<details>
 <summary>Example (click to expand)</summary>


```json
"live"
```

</details>

**Properties**

| Name        | Type   | Required           | Description     |
| ----------- | ------ | ------------------ | --------------- |
| ABTestState | string | :heavy_minus_sign: | An enumeration. |

**Enumerated Values**

| Property    | Value     |
| ----------- | --------- |
| ABTestState | live      |
| ABTestState | draft     |
| ABTestState | archived  |
| ABTestState | completed |
| ABTestState | inactive  |

### ASACredentials

<details>
 <summary>Example (click to expand)</summary>


```json
{
  "private_key": "string",
  "public_key": "string",
  "team_id": "string",
  "client_id": "string",
  "key_id": "string",
  "save_asa_attribution": true
}

```

</details>

**Properties**

| Name                 | Type        | Required           | Restrictions |
| -------------------- | ----------- | ------------------ | ------------ |
| private_key          | string¦null | :heavy_minus_sign: | write-only   |
| public_key           | string¦null | true               | read-only    |
| team_id              | string¦null | :heavy_minus_sign: |              |
| client_id            | string¦null | :heavy_minus_sign: |              |
| key_id               | string¦null | :heavy_minus_sign: |              |
| save_asa_attribution | boolean     | :heavy_minus_sign: |              |

### AbTestDetailMetricsResponse

<details>
 <summary>Example (click to expand)</summary>


```json
{
  "data": {
    "ab_test": {
      "ab_test_id": "c681ac9d-21b4-4f88-8060-10a3639bfde7",
      "title": "string",
      "goal": "string",
      "paywalls_group": {
        "paywalls_group_id": "c0cb5b73-71c2-4250-9a48-b2e8da0c7144",
        "title": "string"
      },
      "created_at": "2019-08-24T14:15:22Z"
    },
    "state": "live",
    "placement": {
      "placement_id": "d98659e8-3eb1-4328-89b6-1848d40b4461",
      "title": "string",
      "created_at": "2019-08-24T14:15:22Z"
    },
    "audience": {
      "audience_id": "875075bb-caff-4035-8f5f-9fb1430dc417",
      "title": "string",
      "is_default": true
    },
    "placement_audience_priority": 0,
    "started_at": "2019-08-24T14:15:22Z",
    "stopped_at": "2019-08-24T14:15:22Z",
    "metrics": [
      {
        "revenue": 0,
        "proceeds": 0,
        "net_revenue": 0,
        "purchases": 0,
        "trials": 0,
        "trials_cancelled": 0,
        "refunds": 0,
        "unique_subscribers": 0,
        "unique_paid_subscribers": 0,
        "views": 0,
        "unique_profiles_views": 0,
        "in_current_state": true,
        "arppu": 0,
        "arpas": 0,
        "apppu": 0,
        "appas": 0,
        "conversion_rate_purchases": 0,
        "conversion_rate_trials": 0,
        "conversion_rate_refunds": 0,
        "conversion_rate_purchases_by_users": 0,
        "conversion_rate_trials_by_users": 0,
        "items": [
          {
            "revenue": 0,
            "proceeds": 0,
            "net_revenue": 0,
            "purchases": 0,
            "trials": 0,
            "trials_cancelled": 0,
            "refunds": 0,
            "unique_subscribers": 0,
            "unique_paid_subscribers": 0,
            "views": 0,
            "unique_profiles_views": 0,
            "in_current_state": true,
            "arppu": 0,
            "arpas": 0,
            "apppu": 0,
            "appas": 0,
            "conversion_rate_purchases": 0,
            "conversion_rate_trials": 0,
            "conversion_rate_refunds": 0,
            "conversion_rate_purchases_by_users": 0,
            "conversion_rate_trials_by_users": 0
          }
        ],
        "title": "string",
        "paywall": {
          "paywall_id": "eeb111ae-cdbe-489f-9fe4-30a4b6109051",
          "title": "string",
          "use_paywall_builder": true,
          "use_paywall_builder_v4": true,
          "screenshot": {
            "image_id": 0,
            "url": "http://example.com"
          },
          "builder_screenshot": {
            "image_id": 0,
            "url": "http://example.com"
          },
          "main_screenshot": {
            "image_id": 0,
            "url": "http://example.com"
          }
        },
        "values": [
          {
            "revenue": 0,
            "proceeds": 0,
            "net_revenue": 0,
            "purchases": 0,
            "trials": 0,
            "trials_cancelled": 0,
            "refunds": 0,
            "unique_subscribers": 0,
            "unique_paid_subscribers": 0,
            "views": 0,
            "unique_profiles_views": 0,
            "in_current_state": true,
            "arppu": 0,
            "arpas": 0,
            "apppu": 0,
            "appas": 0,
            "conversion_rate_purchases": 0,
            "conversion_rate_trials": 0,
            "conversion_rate_refunds": 0,
            "conversion_rate_purchases_by_users": 0,
            "conversion_rate_trials_by_users": 0,
            "period": "2019-08-24T14:15:22Z",
            "low_boundary": 0,
            "average_per_1000": 0,
            "upper_boundary": 0,
            "probability": 0
          }
        ],
        "weight": 0,
        "low_boundary": 0,
        "average_per_1000": 0,
        "upper_boundary": 0,
        "probability": 0
      }
    ],
    "predict": {
      "certainty": true,
      "probabilities": [
        {
          "property1": 0,
          "property2": 0
        }
      ]
    },
    "segmentation_by": "product"
  },
  "meta": {
    "pagination": {
      "count": 0,
      "page": 0,
      "pages_count": 0
    }
  }
}

```

</details>

**Properties**

| Name | Type                                                         | Required           |
| ---- | ------------------------------------------------------------ | ------------------ |
| data | [ABTestDetailMetricsCollection](#abtestdetailmetricscollection) | true               |
| meta | [Meta](#meta)                                                | :heavy_minus_sign: |

### AbTestDetailTotalMetricsResponse

<details>
 <summary>Example (click to expand)</summary>
```json
{
  "data": {
    "ab_test": {
      "ab_test_id": "c681ac9d-21b4-4f88-8060-10a3639bfde7",
      "title": "string",
      "goal": "string",
      "paywalls_group": {
        "paywalls_group_id": "c0cb5b73-71c2-4250-9a48-b2e8da0c7144",
        "title": "string"
      },
      "created_at": "2019-08-24T14:15:22Z"
    },
    "state": "live",
    "started_at": "2019-08-24T14:15:22Z",
    "stopped_at": "2019-08-24T14:15:22Z",
    "metrics": [
      {
        "revenue": 0,
        "proceeds": 0,
        "net_revenue": 0,
        "purchases": 0,
        "trials": 0,
        "trials_cancelled": 0,
        "refunds": 0,
        "unique_subscribers": 0,
        "unique_paid_subscribers": 0,
        "views": 0,
        "unique_profiles_views": 0,
        "in_current_state": true,
        "arppu": 0,
        "arpas": 0,
        "apppu": 0,
        "appas": 0,
        "conversion_rate_purchases": 0,
        "conversion_rate_trials": 0,
        "conversion_rate_refunds": 0,
        "conversion_rate_purchases_by_users": 0,
        "conversion_rate_trials_by_users": 0,
        "paywall": {
          "paywall_id": "eeb111ae-cdbe-489f-9fe4-30a4b6109051",
          "title": "string",
          "use_paywall_builder": true,
          "use_paywall_builder_v4": true,
          "screenshot": {
            "image_id": 0,
            "url": "http://example.com"
          },
          "builder_screenshot": {
            "image_id": 0,
            "url": "http://example.com"
          },
          "main_screenshot": {
            "image_id": 0,
            "url": "http://example.com"
          }
        },
        "weight": 0,
        "low_boundary": 0,
        "average_per_1000": 0,
        "upper_boundary": 0,
        "probability": 0
      }
    ],
    "predict": {
      "certainty": true,
      "probabilities": [
        {
          "property1": 0,
          "property2": 0
        }
      ]
    }
  },
  "meta": {
    "pagination": {
      "count": 0,
      "page": 0,
      "pages_count": 0
    }
  }
}
</details>

**Properties**

| Name | Type                                                         | Required           |
| ---- | ------------------------------------------------------------ | ------------------ |
| data | [ABTestDetailTotalMetricsCollection](#abtestdetailtotalmetricscollection) | :heavy_plus_sign:  |
| meta | [Meta](#meta)                                                | :heavy_minus_sign: |

### AccountingType

<details>
 <summary>Example (click to expand)</summary>

```
```json
"revenue"

```

</details>


**Properties**

| Name           | Type   | Required           | Description     |
| -------------- | ------ | ------------------ | --------------- |
| AccountingType | string | :heavy_minus_sign: | An enumeration. |

**Enumerated Values**

| Property       | Value                                                        |
| -------------- | ------------------------------------------------------------ |
| AccountingType | <ul><li> revenue</li><li> proceeds</li><li> net_revenue</li></ul> |

### AssetColor

<details>
 <summary>Example (click to expand)</summary>


```json
{
  "id": "string",
  "type": "color",
  "value": "string"
}

```

</details>

**Properties**

| Name  | Type   | Required          | Description          |
| ----- | ------ | ----------------- | -------------------- |
| id    | string | :heavy_plus_sign: |                      |
| type  | string | :heavy_plus_sign: |                      |
| value | string | :heavy_plus_sign: | #RRGGBBAA or #RRGGBB |

**Enumerated Values**

| Property | Value |
| -------- | ----- |
| type     | color |

### AssetColorGradient

<details>
 <summary>Example (click to expand)</summary>


```json
{
  "id": "string",
  "type": "linear-gradient",
  "values": [
    {
      "color": "string",
      "p": 0
    }
  ],
  "points": {
    "x0": 0,
    "y0": 0,
    "x1": 0,
    "y1": 0
  }
}
```

</details>

**Properties**

| Name   | Type                                      | Required          |
| ------ | ----------------------------------------- | ----------------- |
| id     | string                                    | :heavy_plus_sign: |
| type   | string                                    | :heavy_plus_sign: |
| values | [GradientColorValue](#gradientcolorvalue) | :heavy_plus_sign: |
| points | [Points](#points)                         | :heavy_plus_sign: |

**Enumerated Values**

| Property | Value                                                        |
| -------- | ------------------------------------------------------------ |
| type     | <ul><li> linear-gradient</li><li> radial-gradient</li><li> conic-gradient</li></ul> |

### AssetFont

<details>
 <summary>Example (click to expand)</summary>
```json
{
  "id": "string",
  "type": "font",
  "value": "string",
  "resources": [
    "string"
  ],
  "family_name": "string",
  "weight": 0,
  "italic": false,
  "size": 0,
  "color": "string",
  "horizontal_align": "left"
}
</details>

**Properties**

| Name             | Type                                | Required           | Description     |
| ---------------- | ----------------------------------- | ------------------ | --------------- |
| id               | string                              | :heavy_plus_sign:  |                 |
| type             | string                              | :heavy_plus_sign:  |                 |
| value            | string                              | :heavy_plus_sign:  |                 |
| resources        | string                              | :heavy_minus_sign: |                 |
| family_name      | string                              | :heavy_minus_sign: |                 |
| weight           | integer                             | :heavy_minus_sign: |                 |
| italic           | boolean                             | :heavy_minus_sign: |                 |
| size             | number                              | :heavy_minus_sign: |                 |
| color            | string                              | :heavy_minus_sign: |                 |
| horizontal_align | [HorizontalAlign](#horizontalalign) | :heavy_minus_sign: | An enumeration. |

**Enumerated Values**

| Property | Value |
| -------- | ----- |
| type     | font  |

### AssetImage

<details>
 <summary>Example (click to expand)</summary>


```
```json
{
  "id": "string",
  "type": "image",
  "preview_value": "iVBORw0KGgoAAAANSUhEUgAAAHgAAA",
  "url": "http://example.com",
  "media_id": 0
}

```

</details>

**Properties**

| Name          | Type        | Required           |
| ------------- | ----------- | ------------------ |
| id            | string      | :heavy_plus_sign:  |
| type          | string      | :heavy_plus_sign:  |
| preview_value | string      | :heavy_minus_sign: |
| url           | string(uri) | :heavy_minus_sign: |
| media_id      | integer     | :heavy_minus_sign: |

**Enumerated Values**

| Property | Value |
| -------- | ----- |
| type     | image |

### AssetsColor

<details>
 <summary>Example (click to expand)</summary>


```json
{
  "id": "string",
  "type": "color",
  "value": "string"
}

```

</details>

**Properties**

| Name  | Type   | Required          |
| ----- | ------ | ----------------- |
| id    | string | :heavy_plus_sign: |
| type  | string | :heavy_plus_sign: |
| value | string | :heavy_plus_sign: |

**Enumerated Values**

| Property | Value |
| -------- | ----- |
| type     | color |

### AssetsColorGradient

<details>
 <summary>Example (click to expand)</summary>


```json
{
  "id": "string",
  "type": "linear-gradient",
  "values": [
    {
      "color": "string",
      "p": 0
    }
  ],
  "points": {
    "x0": 0,
    "y0": 0,
    "x1": 0,
    "y1": 0
  }
}

```

</details>

**Properties**

| Name   | Type                                                    | Required          |
| ------ | ------------------------------------------------------- | ----------------- |
| id     | string                                                  | :heavy_plus_sign: |
| type   | string                                                  | :heavy_plus_sign: |
| values | [[AssetsColorGradientPoint](#assetscolorgradientpoint)] | :heavy_plus_sign: |
| points | [AssetsColorGradientPoints](#assetscolorgradientpoints) | :heavy_plus_sign: |

**Enumerated Values**

| Property | Value                                                        |
| -------- | ------------------------------------------------------------ |
| type     | <ul><li> linear-gradient</li><li> radial-gradient</li><li> conic-gradient</li></ul> |

### AssetsColorGradientPoint

<details>
 <summary>Example (click to expand)</summary>


```json
{
  "color": "string",
  "p": 0
}

```

</details>

**Properties**

| Name  | Type   | Required          |
| ----- | ------ | ----------------- |
| color | string | :heavy_plus_sign: |
| p     | number | :heavy_plus_sign: |

### AssetsColorGradientPoints

<details>
 <summary>Example (click to expand)</summary>


```json
{
  "x0": 0,
  "y0": 0,
  "x1": 0,
  "y1": 0
}

```

</details>

**Properties**

| Name | Type   | Required          |
| ---- | ------ | ----------------- |
| x0   | number | :heavy_plus_sign: |
| y0   | number | :heavy_plus_sign: |
| x1   | number | :heavy_plus_sign: |
| y1   | number | :heavy_plus_sign: |

### AssetsFont

<details>
 <summary>Example (click to expand)</summary>
```json
{
  "id": "string",
  "type": "font",
  "value": "string",
  "resources": [
    "string"
  ],
  "family_name": "adapty_system",
  "weight": 400,
  "italic": true,
  "size": 15,
  "color": "#000000FF"
}
</details>

**Properties**

| Name  | Type   | Required          | Description                                                  |
| ----- | ------ | ----------------- | ------------------------------------------------------------ |
| id    | string | :heavy_plus_sign: |                                                              |
| type  | string | :heavy_plus_sign: |                                                              |
| value | any    | :heavy_plus_sign: | Any of <ul><li> <ul><li> type: string</li><li> type: array, items:  type: string</li></ul> |
| resources   | Arrow | :heavy_minus_sign: | Items:  type: string |
| family_name | any      | :heavy_minus_sign: | Any of <ul><li> <ul><li> type: string</li><li> type: array, items:  type: string</li></ul><p> default: adapty_system</p> |
| weight | integer | :heavy_minus_sign: | Default: 400, minimum: 0 |
| italic | boolean | :heavy_minus_sign: |                                                              |
| size   | number  | :heavy_minus_sign: | Default: 15 |
| color  | string  | :heavy_minus_sign: | Default: '#000000FF', pattern: ^#([A-Fa-f0-9]{6} |

**Enumerated Values**

| Property | Value |
| -------- | ----- |
| type     | font  |

### AssetsImage

<details>
 <summary>Example (click to expand)</summary>

```
```json
{
  "id": "string",
  "type": "image",
  "value": "string",
  "url": "http://example.com"
}

```

</details>

**Properties**

| Name  | Type        | Required           |
| ----- | ----------- | ------------------ |
| id    | string      | :heavy_plus_sign:  |
| type  | string      | :heavy_plus_sign:  |
| value | string      | :heavy_minus_sign: |
| url   | string(uri) | :heavy_minus_sign: |

**Enumerated Values**

| Property | Value |
| -------- | ----- |
| type     | image |

### AssetsImageUrl

<details>
 <summary>Example (click to expand)</summary>


```json
{
  "url": "http://example.com",
  "preview_value": "string"
}

```

</details>

**Properties**

| Name          | Type        | Required          |
| ------------- | ----------- | ----------------- |
| url           | string(uri) | :heavy_plus_sign: |
| preview_value | string      | :heavy_plus_sign: |

### AssetsImageValue

<details>
 <summary>Example (click to expand)</summary>


```json
{
  "value": "string"
}

```

</details>

**Properties**

| Name  | Type   | Required          |
| ----- | ------ | ----------------- |
| value | string | :heavy_plus_sign: |

### AssetsVideo

<details>
 <summary>Example (click to expand)</summary>


```json
{
  "id": "string",
  "type": "video",
  "url": "http://example.com",
  "image": {
    "value": "string"
  }
}

```

</details>

**Properties**

| Name  | Type        | Required          |
| ----- | ----------- | ----------------- |
| id    | string      | :heavy_plus_sign: |
| type  | string      | :heavy_plus_sign: |
| url   | string(uri) | :heavy_plus_sign: |
| image | any         | :heavy_plus_sign: |

anyOf

| Name          | Type                                  | Required           |
| ------------- | ------------------------------------- | ------------------ |
| » *anonymous* | [AssetsImageValue](#assetsimagevalue) | :heavy_minus_sign: |

or

| Name          | Type                              | Required           |
| ------------- | --------------------------------- | ------------------ |
| » *anonymous* | [AssetsImageUrl](#assetsimageurl) | :heavy_minus_sign: |

**Enumerated Values**

| Property | Value |
| -------- | ----- |
| type     | video |

### Audience

<details>
 <summary>Example (click to expand)</summary>


```json
{
  "audience_id": "875075bb-caff-4035-8f5f-9fb1430dc417",
  "title": "string",
  "is_default": true
}

```

</details>

**Properties**

| Name        | Type         | Required          |
| ----------- | ------------ | ----------------- |
| audience_id | string(uuid) | :heavy_plus_sign: |
| title       | string       | :heavy_plus_sign: |
| is_default  | boolean      | :heavy_plus_sign: |

### AudienceBasedDetailMetrics

<details>
 <summary>Example (click to expand)</summary>


```json
{
  "revenue": 0,
  "proceeds": 0,
  "net_revenue": 0,
  "purchases": 0,
  "trials": 0,
  "trials_cancelled": 0,
  "refunds": 0,
  "unique_subscribers": 0,
  "unique_paid_subscribers": 0,
  "views": 0,
  "unique_profiles_views": 0,
  "in_current_state": true,
  "arppu": 0,
  "arpas": 0,
  "apppu": 0,
  "appas": 0,
  "conversion_rate_purchases": 0,
  "conversion_rate_trials": 0,
  "conversion_rate_refunds": 0,
  "conversion_rate_purchases_by_users": 0,
  "conversion_rate_trials_by_users": 0,
  "items": [
    {
      "revenue": 0,
      "proceeds": 0,
      "net_revenue": 0,
      "purchases": 0,
      "trials": 0,
      "trials_cancelled": 0,
      "refunds": 0,
      "unique_subscribers": 0,
      "unique_paid_subscribers": 0,
      "views": 0,
      "unique_profiles_views": 0,
      "in_current_state": true,
      "arppu": 0,
      "arpas": 0,
      "apppu": 0,
      "appas": 0,
      "conversion_rate_purchases": 0,
      "conversion_rate_trials": 0,
      "conversion_rate_refunds": 0,
      "conversion_rate_purchases_by_users": 0,
      "conversion_rate_trials_by_users": 0,
      "items": [
        {
          "revenue": 0,
          "proceeds": 0,
          "net_revenue": 0,
          "purchases": 0,
          "trials": 0,
          "trials_cancelled": 0,
          "refunds": 0,
          "unique_subscribers": 0,
          "unique_paid_subscribers": 0,
          "views": 0,
          "unique_profiles_views": 0,
          "in_current_state": true,
          "arppu": 0,
          "arpas": 0,
          "apppu": 0,
          "appas": 0,
          "conversion_rate_purchases": 0,
          "conversion_rate_trials": 0,
          "conversion_rate_refunds": 0,
          "conversion_rate_purchases_by_users": 0,
          "conversion_rate_trials_by_users": 0,
          "items": [
            {
              "revenue": 0,
              "proceeds": 0,
              "net_revenue": 0,
              "purchases": 0,
              "trials": 0,
              "trials_cancelled": 0,
              "refunds": 0,
              "unique_subscribers": 0,
              "unique_paid_subscribers": 0,
              "views": 0,
              "unique_profiles_views": 0,
              "in_current_state": true,
              "arppu": 0,
              "arpas": 0,
              "apppu": 0,
              "appas": 0,
              "conversion_rate_purchases": 0,
              "conversion_rate_trials": 0,
              "conversion_rate_refunds": 0,
              "conversion_rate_purchases_by_users": 0,
              "conversion_rate_trials_by_users": 0,
              "items": [
                {
                  "revenue": 0,
                  "proceeds": 0,
                  "net_revenue": 0,
                  "purchases": 0,
                  "trials": 0,
                  "trials_cancelled": 0,
                  "refunds": 0,
                  "unique_subscribers": 0,
                  "unique_paid_subscribers": 0,
                  "views": 0,
                  "unique_profiles_views": 0,
                  "in_current_state": true,
                  "arppu": 0,
                  "arpas": 0,
                  "apppu": 0,
                  "appas": 0,
                  "conversion_rate_purchases": 0,
                  "conversion_rate_trials": 0,
                  "conversion_rate_refunds": 0,
                  "conversion_rate_purchases_by_users": 0,
                  "conversion_rate_trials_by_users": 0
                }
              ],
              "title": "string",
              "paywall": {
                "paywall_id": "eeb111ae-cdbe-489f-9fe4-30a4b6109051",
                "title": "string",
                "use_paywall_builder": true,
                "use_paywall_builder_v4": true,
                "screenshot": {
                  "image_id": 0,
                  "url": "http://example.com"
                },
                "builder_screenshot": {
                  "image_id": 0,
                  "url": "http://example.com"
                },
                "main_screenshot": {
                  "image_id": 0,
                  "url": "http://example.com"
                }
              },
              "values": [
                {
                  "revenue": 0,
                  "proceeds": 0,
                  "net_revenue": 0,
                  "purchases": 0,
                  "trials": 0,
                  "trials_cancelled": 0,
                  "refunds": 0,
                  "unique_subscribers": 0,
                  "unique_paid_subscribers": 0,
                  "views": 0,
                  "unique_profiles_views": 0,
                  "in_current_state": true,
                  "arppu": 0,
                  "arpas": 0,
                  "apppu": 0,
                  "appas": 0,
                  "conversion_rate_purchases": 0,
                  "conversion_rate_trials": 0,
                  "conversion_rate_refunds": 0,
                  "conversion_rate_purchases_by_users": 0,
                  "conversion_rate_trials_by_users": 0,
                  "period": "2019-08-24T14:15:22Z",
                  "low_boundary": 0,
                  "average_per_1000": 0,
                  "upper_boundary": 0,
                  "probability": 0
                }
              ],
              "weight": 0,
              "low_boundary": 0,
              "average_per_1000": 0,
              "upper_boundary": 0,
              "probability": 0
            }
          ],
          "paywalls_group": {
            "paywalls_group_id": "c0cb5b73-71c2-4250-9a48-b2e8da0c7144",
            "title": "string"
          }
        }
      ],
      "ab_test": {
        "ab_test_id": "c681ac9d-21b4-4f88-8060-10a3639bfde7",
        "title": "string",
        "goal": "string",
        "paywalls_group": {
          "paywalls_group_id": "c0cb5b73-71c2-4250-9a48-b2e8da0c7144",
          "title": "string"
        },
        "created_at": "2019-08-24T14:15:22Z"
      },
      "predict": {
        "certainty": true,
        "probabilities": [
          {
            "property1": 0,
            "property2": 0
          }
        ]
      },
      "content_type": "ab_test"
    }
  ],
  "audience": {
    "audience_id": "875075bb-caff-4035-8f5f-9fb1430dc417",
    "title": "string",
    "is_default": true
  },
  "title": "string"
}

```

</details>

**Properties**

| Name                               | Type    | Required          | Description                                                  |
| ---------------------------------- | ------- | ----------------- | ------------------------------------------------------------ |
| revenue                            | number  | :heavy_minus_sign: | Default: 0.0                                                 |
| proceeds                           | number  | :heavy_minus_sign: | Default: 0.0                                                 |
| net_revenue                        | number  | :heavy_minus_sign: | Default: 0.0                                                 |
| purchases                          | integer | :heavy_minus_sign: | Default: 0                                                   |
| trials                             | integer | :heavy_minus_sign: | Default: 0                                                   |
| trials_cancelled                   | integer | :heavy_minus_sign: | Default: 0                                                   |
| refunds                            | integer | :heavy_minus_sign: | Default: 0                                                   |
| unique_subscribers                 | integer | :heavy_minus_sign: | Default: 0                                                   |
| unique_paid_subscribers            | integer | :heavy_minus_sign: | Default: 0                                                   |
| views                              | integer | :heavy_minus_sign: | Default: 0                                                   |
| unique_profiles_views              | integer | :heavy_minus_sign: | Default: 0                                                   |
| in_current_state                   | boolean | :heavy_minus_sign: | Default: true                                                |
| arppu                              | number  | :heavy_minus_sign: | Default: 0.0                                                 |
| arpas                              | number  | :heavy_minus_sign: | Default: 0.0                                                 |
| apppu                              | number  | :heavy_minus_sign: | Default: 0.0                                                 |
| appas                              | number  | :heavy_minus_sign: | Default: 0.0                                                 |
| conversion_rate_purchases          | number  | :heavy_minus_sign: | Default: 0.0                                                 |
| conversion_rate_trials             | number  | :heavy_minus_sign: | Default: 0.0                                                 |
| conversion_rate_refunds            | number  | :heavy_minus_sign: | Default: 0.0                                                 |
| conversion_rate_purchases_by_users | number  | :heavy_minus_sign: | Default: 0.0                                                 |
| conversion_rate_trials_by_users    | number  | :heavy_minus_sign: | Default: 0.0                                                 |
| items                              | array   | :heavy_plus_sign: | Any of: <ul><li> [ABTestMetrics](#ABTestMetrics)</li><li> [PaywallMetrics](#PaywallMetrics)</li></ul> |
| audience | [Audience](#audience) | :heavy_plus_sign: ||
| title    | string                | :heavy_plus_sign: ||

### BaseModel

<details>
 <summary>Example (click to expand)</summary>


```json
{}

```

</details>

**Properties**

None

### Button

<details>
 <summary>Example (click to expand)</summary>


```json
{
  "shape": {
    "background": "string",
    "rect_corner_radius": 0,
    "border": "string",
    "thickness": 0,
    "type": "color",
    "value": "circle"
  },
  "title": {
    "size": 0,
    "color": "string",
    "horizontal_align": "left",
    "font": "string",
    "bullet_space": 0,
    "items": [
      {
        "string_id": "string",
        "font": "string",
        "size": 0,
        "color": "string",
        "horizontal_align": "left",
        "bullet": :heavy_minus_sign:
      }
    ]
  },
  "selected_shape": {
    "background": "string",
    "rect_corner_radius": 0,
    "border": "string",
    "thickness": 0,
    "type": "color",
    "value": "circle"
  },
  "selected_title": {
    "size": 0,
    "color": "string",
    "horizontal_align": "left",
    "font": "string",
    "bullet_space": 0,
    "items": [
      {
        "string_id": "string",
        "font": "string",
        "size": 0,
        "color": "string",
        "horizontal_align": "left",
        "bullet": false
      }
    ]
  },
  "align": "leading",
  "action": {
    "type": "color",
    "url": "string"
  }
}

```

</details>

**Properties**

| Name           | Type                          | Required           | Description     |
| -------------- | ----------------------------- | ------------------ | --------------- |
| shape          | [Shape](#shape)               | :heavy_minus_sign: |                 |
| title          | [Text](#text)                 | :heavy_minus_sign: |                 |
| selected_shape | [Shape](#shape)               | :heavy_minus_sign: |                 |
| selected_title | [Text](#text)                 | :heavy_minus_sign: |                 |
| align          | [ButtonAlign](#buttonalign)   | :heavy_minus_sign: | An enumeration. |
| action         | [ButtonAction](#buttonaction) | :heavy_minus_sign: |                 |

### ButtonAction

<details>
 <summary>Example (click to expand)</summary>


```json
{
  "type": "color",
  "url": "string"
}

```

</details>

**Properties**

| Name         | Type | Required           |
| ------------ | ---- | ------------------ |
| ButtonAction | any  | :heavy_minus_sign: |

anyOf

| Name        | Type                                    | Required           |
| ----------- | --------------------------------------- | ------------------ |
| *anonymous* | [ButtonActionItem1](#buttonactionitem1) | :heavy_minus_sign: |

or

| Name        | Type                                    | Required           |
| ----------- | --------------------------------------- | ------------------ |
| *anonymous* | [ButtonActionItem2](#buttonactionitem2) | :heavy_minus_sign: |

or

| Name        | Type                                    | Required           |
| ----------- | --------------------------------------- | ------------------ |
| *anonymous* | [ButtonActionItem3](#buttonactionitem3) | :heavy_minus_sign: |

### ButtonActionItem1

<details>
 <summary>Example (click to expand)</summary>


```json
{
  "type": "color",
  "url": "string"
}

```

</details>

**Properties**

| Name | Type          | Required          | Description     |
| ---- | ------------- | ----------------- | --------------- |
| type | [Type](#type) | :heavy_plus_sign: | An enumeration. |
| url  | string        | :heavy_plus_sign: |                 |

### ButtonActionItem2

<details>
 <summary>Example (click to expand)</summary>


```json
{
  "type": "color",
  "custom_id": "string"
}

```

</details>

**Properties**

| Name      | Type          | Required          | Description     |
| --------- | ------------- | ----------------- | --------------- |
| type      | [Type](#type) | :heavy_plus_sign: | An enumeration. |
| custom_id | string        | :heavy_plus_sign: |                 |

### ButtonActionItem3

<details>
 <summary>Example (click to expand)</summary>


```json
{
  "type": "color"
}

```

</details>

**Properties**

| Name | Type          | Required          | Description     |
| ---- | ------------- | ----------------- | --------------- |
| type | [Type](#type) | :heavy_plus_sign: | An enumeration. |

### ButtonAlign

<details>
 <summary>Example (click to expand)</summary>
```json
"leading"
</details>
**Properties**

|Name|Type|Required|Description|
|---|---|---|---|
|ButtonAlign|string|:heavy_minus_sign:|An enumeration.|

**Enumerated Values**

| Property    | Value                                                        |
| ----------- | ------------------------------------------------------------ |
| ButtonAlign | <ul><li> leading</li><li> trailing</li><li> center</li><li> fill</li></ul> |

### ChartDashboardMetricsConditions

<details>
 <summary>Example (click to expand)</summary>

```
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
  "metrics_types": [
    "revenue"
  ]
}
```

</details>

**Properties**

| Name            | Type                                                  | Required           | Description     |
| --------------- | ----------------------------------------------------- | ------------------ | --------------- |
| filters         | [MetricsFilters](#metricsfilters)                     | :heavy_plus_sign:  |                 |
| period_unit     | [PeriodUnit](#periodunit)                             | :heavy_minus_sign: | An enumeration. |
| date_type       | [DateType](#datetype)                                 | :heavy_minus_sign: | An enumeration. |
| segmentation_by | [ChartMetricsSegmentation](#chartmetricssegmentation) | :heavy_minus_sign: | An enumeration. |
| metrics_types   | [ChartMetricsType](#chartmetricstype)                 | :heavy_plus_sign:  | An enumeration. |

### ChartFilters

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
}
```
</details>


**Properties**

|Name|Type|Required|
|---|---|---|
|date|[string]|:heavy_plus_sign:|
|compare_date|[string]¦null|:heavy_minus_sign:|
|store|[string]|:heavy_minus_sign:|
|purchase_container_id|[string]|:heavy_minus_sign:|
|audience_id|[string]|:heavy_minus_sign:|
|paywall_id|[string]|:heavy_minus_sign:|
|placement_id|[string]|:heavy_minus_sign:|
|paywalls_group_id|[string]|:heavy_minus_sign:|
|placement_audience_version_id|[string]|:heavy_minus_sign:|
|segment_id|[string]|:heavy_minus_sign:|
|country|[string]|:heavy_minus_sign:|
|store_product_id|[string]|:heavy_minus_sign:|
|duration|[string]|:heavy_minus_sign:|
|attribution_source|[string]|:heavy_minus_sign:|
|attribution_status|[string]|:heavy_minus_sign:|
|attribution_channel|[string]|:heavy_minus_sign:|
|attribution_campaign|[string]|:heavy_minus_sign:|
|attribution_adgroup|[string]|:heavy_minus_sign:|
|attribution_adset|[string]|:heavy_minus_sign:|
|attribution_creative|[string]|:heavy_minus_sign:|

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
</details>

**Properties**)

| Name            | Type                                                  | Required           | Description     |
| --------------- | ----------------------------------------------------- | ------------------ | --------------- |
| filters         | [MetricsFilters](#metricsfilters)                     | :heavy_plus_sign:  |                 |
| period_unit     | [PeriodUnit](#periodunit)                             | :heavy_minus_sign: | An enumeration. |
| date_type       | [DateType](#datetype)                                 | :heavy_minus_sign: | An enumeration. |
| segmentation_by | [ChartMetricsSegmentation](#chartmetricssegmentation) | :heavy_minus_sign: | An enumeration. |

### ChartMetricsSegmentation

<details>
 <summary>Example (click to expand)</summary>


```
```json
"app_id"
```
</details>

**Properties**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|ChartMetricsSegmentation|string|:heavy_minus_sign:|none|An enumeration.|

**Enumerated Values**

|Property|Value|
|---|---|
|ChartMetricsSegmentation|<ul><li> app_id</li><li> period</li><li> renewal_status</li><li> cancellation_reason</li><li> store_product_id</li><li> country</li><li> store</li><li> purchase_container_id</li><li> paywall_id</li><li> audience_id</li><li> placement_id</li><li> attribution_source</li><li> attribution_status</li><li> attribution_channel</li><li> attribution_campaign</li><li> attribution_adgroup</li><li> attribution_adset</li><li> attribution_creative</li><li> duration</li><li> default</li></ul>|

### ChartMetricsType

<details>
 <summary>Example (click to expand)</summary>

```json
"revenue"
```

</details>

**Properties**

| Name             | Type   | Required           | Description     |
| ---------------- | ------ | ------------------ | --------------- |
| ChartMetricsType | string | :heavy_minus_sign: | An enumeration. |

**Enumerated Values** 

| Property         | Value                                                        |
| ---------------- | ------------------------------------------------------------ |
| ChartMetricsType | <ul><li> revenue</li><li> mrr</li><li> arr</li><li> arppu</li><li> arpas</li><li> subscriptions_active</li><li> subscriptions_new</li><li> subscriptions_renewal_cancelled</li><li> subscriptions_expired</li><li> trials_active</li><li> trials_new</li><li> trials_renewal_cancelled</li><li> trials_expired</li><li> grace_period</li><li> billing_issue</li><li> refund_events</li><li> refund_money</li><li> refund_rate</li><li> arpu</li><li> installs</li><li> funnel</li><li> retention</li><li> non_subscriptions</li><li> ltv</li><li> unique_subscribers</li><li> unique_paid_subscribers</li><li> purchases</li><li> install_paid</li><li> install_trial</li><li> trial_paid</li><li> from_paid_to_2_period_conversion</li><li> from_2_period_to_3_period_conversion</li><li> from_3_period_to_4_period_conversion</li><li> from_4_period_to_5_period_conversion</li><li> </li><li> from_paid_to_12_months_conversion</li><li> from_paid_to_24_months_conversion</li></ul> |

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

| Name            | Type                                    | Required           | Description     |
| --------------- | --------------------------------------- | ------------------ | --------------- |
| filters         | [MetricsFilters](#metricsfilters)       | :heavy_plus_sign:  | none            |
| period_unit     | [PeriodUnit](#periodunit)               | :heavy_minus_sign: | An enumeration. |
| period_type     | [RenewalPeriodType](#renewalperiodtype) | :heavy_minus_sign: | An enumeration. |
| value_type      | [CohortValueType](#cohortvaluetype)     | :heavy_minus_sign: | An enumeration. |
| value_field     | [CohortValueField](#cohortvaluefield)   | :heavy_minus_sign: | An enumeration. |
| accounting_type | [AccountingType](#accountingtype)       | :heavy_minus_sign: | An enumeration. |
| renewal_days    | integer                                 | :heavy_minus_sign: |                 |
| format          | [MetricsFormat](#metricsformat)         | :heavy_minus_sign: | An enumeration. |

### CohortValueField

<details>
 <summary>Example (click to expand)</summary>
```json
"revenue"
```
</details>
**Properties** 

| Name             | Type   | Required           | Description     |
| ---------------- | ------ | ------------------ | --------------- |
| CohortValueField | string | :heavy_minus_sign: | An enumeration. |

**Enumerated Values** 

| Property         | Value                                                        |
| ---------------- | ------------------------------------------------------------ |
| CohortValueField | <ul><li> revenue</li><li> arppu</li><li> arpu</li><li> arpas</li><li> subscribers</li><li> subscriptions</li></ul> |

### CohortValueType

<details>
 <summary>Example (click to expand)</summary>


```json
"absolute"
```

</details>

**Properties** 

| Name            | Type   | Required           | Description     |
| --------------- | ------ | ------------------ | --------------- |
| CohortValueType | string | :heavy_minus_sign: | An enumeration. |

**Enumerated Values** 

| Property        | Value                                         |
| --------------- | --------------------------------------------- |
| CohortValueType | <ul><li> absolute</li><li> relative</li></ul> |

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

| Name         | Type                          | Required           | Description                                                  |
| ------------ | ----------------------------- | ------------------ | ------------------------------------------------------------ |
| filters      | [ChartFilters](#chartfilters) | :heavy_plus_sign:  | none                                                         |
| segmentation | string                        | :heavy_minus_sign: | <ul><li> `period` - Period</li><li> `renewal_status` - Renewal status</li><li> `cancellation_reason` - Cancellation reason</li><li> `store_product_id` - Store product id</li> <li> `country` - Country</li><li> `store` - Store</li><li> `purchase_container_id` - Purchase container id</li><li> `paywall_id` - Paywall id</li><li>  `audience_id` - Audience id</li><li> `placement_id` - Placement id</li><li>  `attribution_source` - Attribution source</li><li>  `attribution_status` - Attribution status</li><li>  `attribution_channel` - Attribution channel</li><li>  `attribution_campaign` - Attribution campaign</li><li>  `attribution_adgroup` - Attribution adgroup</li><li>  `attribution_adset` - Attribution adset</li><li>  `attribution_creative` - Attribution creative</li><li>  `duration` - Duration</li><li>  `day` - Day</li><li>  `week` - Week</li><li>  `month` - Month</li><li>  `year` - Year</li><li> listitem</li></ul> |
| from_period  | integer¦null                  | :heavy_minus_sign: | <ul><li> null - from install; </li><li> 0 - from trial;</li><li> 1, 2, 3, 4, ... - from period.</li></ul> |
| to_period    | string                        | :heavy_plus_sign:  | <ul><li> 0 - to trial; </li><li> 1, 2, 3, 4, ... - to period;</li><li> 6+, 12+, 24+, ... - to 6+ months, etc</li></ul> |
| period_unit  | string                        | :heavy_minus_sign: | <ul><li>  `day` - Day</li><li> `week` - Week</li><li>  `month` - Month</li><li> `quarter` - Quarter</li><li> `year` - Year</li><li> `none` - None</li></ul> |

**Enumerated Values** 

| Property     | Value                                                        |
| ------------ | ------------------------------------------------------------ |
| segmentation | <ul><li> period</li><li> renewal_status</li><li> cancellation_reason</li><li> store_product_id</li><li> country</li><li> store</li><li> purchase_container_id</li><li> paywall_id</li><li> audience_id</li><li> placement_id</li><li> attribution_source</li><li> attribution_status</li><li> attribution_channel</li><li> attribution_campaign</li><li> attribution_adgroup</li><li> attribution_adset</li><li> attribution_creative</li><li> duration</li><li> day</li><li> week</li><li> month</li><li> year</li></ul> |
| period_unit  | <ul><li> day</li><li> week</li><li> month</li><li> quarter</li><li> year</li><li> none</li></ul> |

### CornerRadius

<details>
 <summary>Example (click to expand)</summary>


```json
{
  "tl": 0,
  "tr": 0,
  "br": 0,
  "bl": 0
}
```

</details>

**Properties** 

| Name | Type   | Required           |
| ---- | ------ | ------------------ |
| tl   | number | :heavy_minus_sign: |
| tr   | number | :heavy_minus_sign: |
| br   | number | :heavy_minus_sign: |
| bl   | number | :heavy_minus_sign: |

### CustomObject

<details>
 <summary>Example (click to expand)</summary>


```json
{
  "type": "string"
}

```

</details>

**Properties** 

| Name | Type   | Required          |
| ---- | ------ | ----------------- |
| type | string | :heavy_plus_sign: |

### CustomStore

<details>
 <summary>Example (click to expand)</summary>


```json
{
  "custom_store_id": "576656a6-4771-445d-b74a-98f7826a89b5",
  "value": "string",
  "name": "string",
  "app_id": "affd1d10-9538-4fc8-9e0b-4594a28c1335",
  "is_deleted": false
}

```

</details>

**Properties** 

| Name            | Type         | Required           | Description                                                  |
| --------------- | ------------ | ------------------ | ------------------------------------------------------------ |
| custom_store_id | string(uuid) | :heavy_minus_sign: |                                                              |
| value           | string       | :heavy_plus_sign:  |                                                              |
| name            | string       | :heavy_plus_sign:  | A string containing only alphanumeric characters (both lowercase and uppercase), underscores (_), hyphens (-), and points without any whitespace before, after, or inside the string |
| app_id          | string(uuid) | :heavy_plus_sign:  |                                                              |
| is_deleted      | boolean      | :heavy_minus_sign: |                                                              |

### CustomStoreDTO

<details>
 <summary>Example (click to expand)</summary>


```json
{
  "value": "string",
  "name": "string"
}

```

</details>

**Properties** 

| Name  | Type   | Required          | Description                                                  |
| ----- | ------ | ----------------- | ------------------------------------------------------------ |
| value | string | :heavy_plus_sign: | Custom store value. Cannot be any of (adapty, app_store, play_store, stripe) |
| name  | string | :heavy_plus_sign: | A string containing only alphanumeric characters (both lowercase and uppercase), underscores (_), hyphens (-), and points without any whitespace before, after, or inside the string |

### CustomStoreRequest

<details>
 <summary>Example (click to expand)</summary>
```json
{
  "data": {
    "value": "string",
    "name": "string"
  }

```
</details>

**Properties** 

| Name | Type                              | Required          | Description                                                  |
| ---- | --------------------------------- | ----------------- | ------------------------------------------------------------ |
| data | [CustomStoreDTO](#customstoredto) | :heavy_plus_sign: | Annotation:     This object is immutable dataset.  @dataclass(frozen=True) |

### CustomStoreResponse


<details>
 <summary>Example (click to expand)</summary>

```json
{
  "data": {
    "custom_store_id": "576656a6-4771-445d-b74a-98f7826a89b5",
    "value": "string",
    "name": "string",
    "app_id": "affd1d10-9538-4fc8-9e0b-4594a28c1335",
    "is_deleted": false
  }
}

```
</details>

**Properties** 

| Name | Type                        | Required           |
| ---- | --------------------------- | ------------------ |
| data | [CustomStore](#customstore) | :heavy_minus_sign: |

### CustomStoreResponseList

<details>
 <summary>Example (click to expand)</summary>


```json
{
  "data": [
    {
      "custom_store_id": "576656a6-4771-445d-b74a-98f7826a89b5",
      "value": "string",
      "name": "string",
      "app_id": "affd1d10-9538-4fc8-9e0b-4594a28c1335",
      "is_deleted": false
    }
  ]
}

```

</details>

**Properties** 

| Name | Type                        | Required           |
| ---- | --------------------------- | ------------------ |
| data | [CustomStore](#customstore) | :heavy_minus_sign: |

### DateType

<details>
 <summary>Example (click to expand)</summary>


```json
"purchase_date"

```

</details>

**Properties** 

| Name     | Type   | Required           | Description     |
| -------- | ------ | ------------------ | --------------- |
| DateType | string | :heavy_minus_sign: | An enumeration. |

**Enumerated Values** 

| Property | Value                |
| -------- | -------------------- |
| DateType | purchase_date        |
| DateType | profile_install_date |

### DeprecatedPurchaseContainer

<details>
 <summary>Example (click to expand)</summary>


```json
{
  "purchase_container_global_id": "9a3de371-51b1-470b-bff5-a5869bc9bd00",
  "purchase_container_id": "7dbb8ffa-9af1-4086-8587-b5de80aea12d",
  "title": "string"
}

```

</details>

**Properties** 

| Name                         | Type         | Required          |
| ---------------------------- | ------------ | ----------------- |
| purchase_container_global_id | string(uuid) | :heavy_plus_sign: |
| purchase_container_id        | string(uuid) | :heavy_plus_sign: |
| title                        | string       | :heavy_plus_sign: |

### DeprecatedPurchaseGroup

<details>
 <summary>Example (click to expand)</summary>


```json
{
  "purchase_group_global_id": "3267bcff-ba6b-4b40-8ea7-b41b56b53956",
  "purchase_group_id": "ce1dac31-281f-4a9e-9f4c-425f8dfca933",
  "title": "string"
}

```

</details>

**Properties** 

| Name                     | Type         | Required          |
| ------------------------ | ------------ | ----------------- |
| purchase_group_global_id | string(uuid) | :heavy_plus_sign: |
| purchase_group_id        | string(uuid) | :heavy_plus_sign: |
| title                    | string       | :heavy_plus_sign: |

### Duration

<details>
 <summary>Example (click to expand)</summary>


```json
"Weekly"

```

</details>

**Properties** 

| Name     | Type   | Required           | Description     |
| -------- | ------ | ------------------ | --------------- |
| Duration | string | :heavy_minus_sign: | An enumeration. |

**Enumerated Values** 

| Property | Value                                                        |
| -------- | ------------------------------------------------------------ |
| Duration | <ul><li> listWeeklytem</li><li> Monthly</li><li> 2 months</li><li> 3 months</li><li> 6 months</li><li> Annual</li><li> Lifetime</li><li> Uncategorized</li></ul> |

### Errors

<details>
 <summary>Example (click to expand)</summary>


```json
{
  "errors": {
    "property1": [
      "string"
    ],
    "property2": [
      "string"
    ]
  },
  "error_code": "base_error",
  "status_code": 400
}

```

</details>

**Properties** 

| Name                 | Type             | Required           | Description         |
| -------------------- | ---------------- | ------------------ | ------------------- |
| errors               | object           | :heavy_minus_sign: |                     |
| additionalProperties | array of strings | :heavy_minus_sign: |                     |
| error_code           | string           | :heavy_minus_sign: | default: base_error |
| status_code          | integer          | :heavy_minus_sign: | default: 400        |

### FallbackPlacementVariationCollection

<details>
 <summary>Example (click to expand)</summary>


```json
{
  "developer_id": "string",
  "data": [
    {}
  ]
}

```

</details>

**Properties** 

| Name         | Type             | Required          |
| ------------ | ---------------- | ----------------- |
| developer_id | string           | :heavy_plus_sign: |
| data         | Array of objects | :heavy_plus_sign: |

### FallbackVariationCollection

<details>
 <summary>Example (click to expand)</summary>


```json
{
  "data": [
    {
      "developer_id": "string",
      "data": [
        {}
      ]
    }
  ],
  "meta": {
    "version": 0,
    "developer_ids": [
      "string"
    ],
    "response_created_at": 0
  }
}

```

</details>

**Properties** 

| Name | Type                                                         | Required          |
| ---- | ------------------------------------------------------------ | ----------------- |
| data | array of [FallbackPlacementVariationCollection](#fallbackplacementvariationcollection) | :heavy_plus_sign: |
| meta | [FallbackVariationCollectionMeta](#fallbackvariationcollectionmeta) | :heavy_plus_sign: |

### FallbackVariationCollectionMeta

<details>
 <summary>Example (click to expand)</summary>


```json
{
  "version": 0,
  "developer_ids": [
    "string"
  ],
  "response_created_at": 0
}

```

</details>

**Properties** 

| Name                | Type             | Required           |
| ------------------- | ---------------- | ------------------ |
| version             | integer          | :heavy_plus_sign:  |
| developer_ids       | array of strings | :heavy_plus_sign:  |
| response_created_at | integer          | :heavy_minus_sign: |

### FeaturesBlock

<details>
 <summary>Example (click to expand)</summary>


```json
{
  "type": "list"
}
```

</details>

**Properties** 

| Name | Type                                    | Required          | Description     |
| ---- | --------------------------------------- | ----------------- | --------------- |
| type | [FeaturesBlockType](#featuresblocktype) | :heavy_plus_sign: | An enumeration. |

### FeaturesBlockType

<details>
 <summary>Example (click to expand)</summary>


```json
"list"

```

</details>

**Properties** 

| Name              | Type   | Required           | Description     |
| ----------------- | ------ | ------------------ | --------------- |
| FeaturesBlockType | string | :heavy_minus_sign: | An enumeration. |

**Enumerated Values** 

| Property          | Value    |
| ----------------- | -------- |
| FeaturesBlockType | list     |
| FeaturesBlockType | timeline |

### FontDTOCreate

<details>
 <summary>Example (click to expand)</summary>


```json
{
  "font_name": "Roboto-Regular.ttf",
  "font_alias_android": "roboto_regular.ttf",
  "font_alias_ios": "Roboto-Regular.ttf",
  "font": "string"
}

```

</details>

**Properties** 

| Name               | Type           | Required           | Description              |
| ------------------ | -------------- | ------------------ | ------------------------ |
| font_name          | string         | :heavy_plus_sign:  |                          |
| font_alias_android | string         | :heavy_minus_sign: |                          |
| font_alias_ios     | string         | :heavy_minus_sign: |                          |
| font               | string(binary) | :heavy_plus_sign:  | base64 encoded font file |

### FontDTOResponse

<details>
 <summary>Example (click to expand)</summary>


```json
{
  "font_name": "Roboto-Regular.ttf",
  "font_alias_android": "roboto_regular.ttf",
  "font_alias_ios": "Roboto-Regular.ttf",
  "font_id": "cc48777c-5a23-478d-89c6-e52eedca0be6",
  "font_link": "https://public-media.adapty.io/public/aa/bb/3c163353-ebf6-4acc-89c2-d05e1db7f293/Roboto-Regular.ttf"
}
```

</details>
**Properties** 

| Name               | Type         | Required           |
| ------------------ | ------------ | ------------------ |
| font_name          | string       | :heavy_plus_sign:  |
| font_alias_android | string       | :heavy_minus_sign: |
| font_alias_ios     | string       | :heavy_minus_sign: |
| font_id            | string(uuid) | :heavy_minus_sign: |
| font_link          | string(uri)  | :heavy_minus_sign: |

### FontListResponse

<details>
 <summary>Example (click to expand)</summary>


```json
{
  "data": [
    {
      "font_name": "Roboto-Regular.ttf",
      "font_alias_android": "roboto_regular.ttf",
      "font_alias_ios": "Roboto-Regular.ttf",
      "font_id": "cc48777c-5a23-478d-89c6-e52eedca0be6",
      "font_link": "https://public-media.adapty.io/public/aa/bb/3c163353-ebf6-4acc-89c2-d05e1db7f293/Roboto-Regular.ttf"
    }
  ]
}

```

</details>

**Properties** 

| Name | Type                                  | Required           | Description                                                  |
| ---- | ------------------------------------- | ------------------ | ------------------------------------------------------------ |
| data | [[FontDTOResponse](#fontdtoresponse)] | :heavy_minus_sign: | Annotation: This object is immutable dataset.  @dataclass(frozen=True) |

### FontResponse

<details>
<summary>Example (click to expand)</summary>

```json
{
  "data": {
    "font_name": "Roboto-Regular.ttf",
    "font_alias_android": "roboto_regular.ttf",
    "font_alias_ios": "Roboto-Regular.ttf",
    "font_id": "cc48777c-5a23-478d-89c6-e52eedca0be6",
    "font_link": "https://public-media.adapty.io/public/aa/bb/3c163353-ebf6-4acc-89c2-d05e1db7f293/Roboto-Regular.ttf"
  },
  "meta": [
    "497f6eca-6276-4993-bfeb-53cbbbba6f08"
  ]

```
</details> 

**Properties** 

| Name | Type                                | Required           | Description                                                  |
| ---- | ----------------------------------- | ------------------ | ------------------------------------------------------------ |
| data | [FontDTOResponse](#fontdtoresponse) | :heavy_minus_sign: | Annotation:     This object is immutable dataset.  @dataclass(frozen=True) |
| meta | array of strings(uuid)              | :heavy_minus_sign: | none                                                         |

### FunnelMetricsConditions

<details>
 <summary>Example (click to expand)</summary>

```
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

| Name            | Type                                                  | Required           | Description     |
| --------------- | ----------------------------------------------------- | ------------------ | --------------- |
| filters         | [MetricsFilters](#metricsfilters)                     | :heavy_plus_sign:  |                 |
| period_unit     | [PeriodUnit](#periodunit)                             | :heavy_minus_sign: | An enumeration. |
| date_type       | [DateType](#datetype)                                 | :heavy_minus_sign: | An enumeration. |
| segmentation_by | [ChartMetricsSegmentation](#chartmetricssegmentation) | :heavy_minus_sign: | An enumeration. |
| format          | [MetricsFormat](#metricsformat)                       | :heavy_minus_sign: | An enumeration. |

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

| Name         | Type                          | Required           | Description                                                  |
| ------------ | ----------------------------- | ------------------ | ------------------------------------------------------------ |
| filters      | [ChartFilters](#chartfilters) | :heavy_plus_sign:  | none                                                         |
| segmentation | string                        | :heavy_minus_sign: | <ul><li> `period` - Period</li><li> `renewal_status` - Renewal status</li><li> `cancellation_reason` - Cancellation reason</li><li> `store_product_id` - Store product id</li><li> `country` - Country</li><li> `store` - Store</li><li> `purchase_container_id`- Purchase container id</li><li> `paywall_id` - Paywall id</li><li>  `audience_id` - Audience id</li><li> `placement_id` - Placement id</li><li> `attribution_source` - Attribution source</li><li> `attribution_status` - Attribution status</li><li> `attribution_channel` - Attribution channel</li><li> `attribution_campaign` - Attribution campaign</li><li> `attribution_adgroup` - Attribution adgroup</li><li> `attribution_adset` - Attribution adset</li><li> `attribution_creative` - Attribution creative</li><li> `duration` - Duration</li><li> `day` - Day</li><li> `week` - Week</li><li> `month` - Month</li><li> `year` - Year</li></ul> |

**Enumerated Values** 

| Property     | Value                                                        |
| ------------ | ------------------------------------------------------------ |
| segmentation | <ul><li> period</li><li> renewal_status</li><li> cancellation_reason</li><li> store_product_id</li><li> country</li><li> store</li><li> purchase_container_id</li><li> paywall_id</li><li> audience_id</li><li> placement_id</li><li> attribution_source</li><li> attribution_status</li><li> attribution_channel</li><li> attribution_campaign</li><li> attribution_adgroup</li><li> attribution_adset</li><li> attribution_creative</li><li> duration</li><li> day</li><li> week</li><li> month</li><li> year</li></ul> |

### GradientColorValue

<details>
 <summary>Example (click to expand)</summary>


```json
{
  "color": "string",
  "p": 0
}

```

</details>

**Properties** 

| Name  | Type   | Required          |
| ----- | ------ | ----------------- |
| color | string | :heavy_plus_sign: |
| p     | number | :heavy_plus_sign: |

### HorizontalAlign

<details>
 <summary>Example (click to expand)</summary>


```json
"left"
```

</details>

**Properties** 

| Name            | Type   | Required           |
| --------------- | ------ | ------------------ |
| HorizontalAlign | string | :heavy_minus_sign: |

**Enumerated Values** 

| Property        | Value                                                  |
| --------------- | ------------------------------------------------------ |
| HorizontalAlign | <ul><li> left</li><li> center</li><li> right</li></ul> |

### Image

<details>
 <summary>Example (click to expand)</summary>


```json
{
  "image_id": 0,
  "url": "http://example.com"
}

```

</details>

**Properties** 

| Name     | Type        | Required          |
| -------- | ----------- | ----------------- |
| image_id | integer     | :heavy_plus_sign: |
| url      | string(uri) | :heavy_plus_sign: |

### InAppDetailMetricsBasedOn

<details>
 <summary>Example (click to expand)</summary>


```json
"placement"

```

</details>

**Properties** 

| Name                      | Type   | Required           | Description     |
| ------------------------- | ------ | ------------------ | --------------- |
| InAppDetailMetricsBasedOn | string | :heavy_minus_sign: | An enumeration. |

**Enumerated Values** 

| Property                  | Value                                                        |
| ------------------------- | ------------------------------------------------------------ |
| InAppDetailMetricsBasedOn | <ul><li> placement</li><li> audience</li><li> paywall</li></ul> |

### InAppDetailMetricsSegmentation

<details>
 <summary>Example (click to expand)</summary>


```json
"product"
```

</details>

**Properties** 

| Name                           | Type   | Required           | Description     |
| ------------------------------ | ------ | ------------------ | --------------- |
| InAppDetailMetricsSegmentation | string | :heavy_minus_sign: | An enumeration. |

**Enumerated Values** 

| Property                       | Value           |
| ------------------------------ | --------------- |
| InAppDetailMetricsSegmentation | product         |
| InAppDetailMetricsSegmentation | profile_country |
| InAppDetailMetricsSegmentation | store           |

### InAppDetailTotalMetrics

<details>
 <summary>Example (click to expand)</summary>


```json
{
  "revenue": 0,
  "proceeds": 0,
  "net_revenue": 0,
  "purchases": 0,
  "trials": 0,
  "trials_cancelled": 0,
  "refunds": 0,
  "unique_subscribers": 0,
  "unique_paid_subscribers": 0,
  "views": 0,
  "unique_profiles_views": 0,
  "in_current_state": true,
  "arppu": 0,
  "arpas": 0,
  "apppu": 0,
  "appas": 0,
  "conversion_rate_purchases": 0,
  "conversion_rate_trials": 0,
  "conversion_rate_refunds": 0,
  "conversion_rate_purchases_by_users": 0,
  "conversion_rate_trials_by_users": 0,
  "items": [
    {
      "revenue": 0,
      "proceeds": 0,
      "net_revenue": 0,
      "purchases": 0,
      "trials": 0,
      "trials_cancelled": 0,
      "refunds": 0,
      "unique_subscribers": 0,
      "unique_paid_subscribers": 0,
      "views": 0,
      "unique_profiles_views": 0,
      "in_current_state": true,
      "arppu": 0,
      "arpas": 0,
      "apppu": 0,
      "appas": 0,
      "conversion_rate_purchases": 0,
      "conversion_rate_trials": 0,
      "conversion_rate_refunds": 0,
      "conversion_rate_purchases_by_users": 0,
      "conversion_rate_trials_by_users": 0
    }
  ],
  "title": "Total"
}

```

</details>

**Properties** 

| Name                               | Type                            | Required           |
| ---------------------------------- | ------------------------------- | ------------------ |
| revenue                            | number                          | :heavy_minus_sign: |
| proceeds                           | number                          | :heavy_minus_sign: |
| net_revenue                        | number                          | :heavy_minus_sign: |
| purchases                          | integer                         | :heavy_minus_sign: |
| trials                             | integer                         | :heavy_minus_sign: |
| trials_cancelled                   | integer                         | :heavy_minus_sign: |
| refunds                            | integer                         | :heavy_minus_sign: |
| unique_subscribers                 | integer                         | :heavy_minus_sign: |
| unique_paid_subscribers            | integer                         | :heavy_minus_sign: |
| views                              | integer                         | :heavy_minus_sign: |
| unique_profiles_views              | integer                         | :heavy_minus_sign: |
| in_current_state                   | boolean                         | :heavy_minus_sign: |
| arppu                              | number                          | :heavy_minus_sign: |
| arpas                              | number                          | :heavy_minus_sign: |
| apppu                              | number                          | :heavy_minus_sign: |
| appas                              | number                          | :heavy_minus_sign: |
| conversion_rate_purchases          | number                          | :heavy_minus_sign: |
| conversion_rate_trials             | number                          | :heavy_minus_sign: |
| conversion_rate_refunds            | number                          | :heavy_minus_sign: |
| conversion_rate_purchases_by_users | number                          | :heavy_minus_sign: |
| conversion_rate_trials_by_users    | number                          | :heavy_minus_sign: |
| items                              | [[InAppMetrics](#inappmetrics)] | :heavy_minus_sign: |
| title                              | string                          | :heavy_minus_sign: |

### InAppMetrics

<details>
 <summary>Example (click to expand)</summary>


```json
{
  "revenue": 0,
  "proceeds": 0,
  "net_revenue": 0,
  "purchases": 0,
  "trials": 0,
  "trials_cancelled": 0,
  "refunds": 0,
  "unique_subscribers": 0,
  "unique_paid_subscribers": 0,
  "views": 0,
  "unique_profiles_views": 0,
  "in_current_state": true,
  "arppu": 0,
  "arpas": 0,
  "apppu": 0,
  "appas": 0,
  "conversion_rate_purchases": 0,
  "conversion_rate_trials": 0,
  "conversion_rate_refunds": 0,
  "conversion_rate_purchases_by_users": 0,
  "conversion_rate_trials_by_users": 0
}

```

</details>

**Properties** 

| Name                               | Type    | Required           |
| ---------------------------------- | ------- | ------------------ |
| revenue                            | number  | :heavy_minus_sign: |
| proceeds                           | number  | :heavy_minus_sign: |
| net_revenue                        | number  | :heavy_minus_sign: |
| purchases                          | integer | :heavy_minus_sign: |
| trials                             | integer | :heavy_minus_sign: |
| trials_cancelled                   | integer | :heavy_minus_sign: |
| refunds                            | integer | :heavy_minus_sign: |
| unique_subscribers                 | integer | :heavy_minus_sign: |
| unique_paid_subscribers            | integer | :heavy_minus_sign: |
| views                              | integer | :heavy_minus_sign: |
| unique_profiles_views              | integer | :heavy_minus_sign: |
| in_current_state                   | boolean | :heavy_minus_sign: |
| arppu                              | number  | :heavy_minus_sign: |
| arpas                              | number  | :heavy_minus_sign: |
| apppu                              | number  | :heavy_minus_sign: |
| appas                              | number  | :heavy_minus_sign: |
| conversion_rate_purchases          | number  | :heavy_minus_sign: |
| conversion_rate_trials             | number  | :heavy_minus_sign: |
| conversion_rate_refunds            | number  | :heavy_minus_sign: |
| conversion_rate_purchases_by_users | number  | :heavy_minus_sign: |
| conversion_rate_trials_by_users    | number  | :heavy_minus_sign: |

### InAppMetricsConditions

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
  "based_on": "placement",
  "segmentation_by": "product",
  "date_type": "purchase_date"
}

```

</details>

**Properties** 

| Name            | Type                                                         | Required           | Description     |
| --------------- | ------------------------------------------------------------ | ------------------ | --------------- |
| filters         | [MetricsFilters](#metricsfilters)                            | :heavy_plus_sign:  |                 |
| period_unit     | [PeriodUnit](#periodunit)                                    | :heavy_minus_sign: | An enumeration. |
| based_on        | [InAppDetailMetricsBasedOn](#inappdetailmetricsbasedon)      | :heavy_minus_sign: | An enumeration. |
| segmentation_by | [InAppDetailMetricsSegmentation](#inappdetailmetricssegmentation) | :heavy_minus_sign: | An enumeration. |
| date_type       | [DateType](#datetype)                                        | :heavy_minus_sign: | An enumeration. |

### InAppMetricsFilterFieldValueData

<details>
 <summary>Example (click to expand)</summary>
```json
{
  "field": "app_id",
  "value": "string",
  "title": "string",
  "is_trial": false,
  "duration_type": "Weekly",
  "segmentation": "string"
}
</details>

**Properties** 

| Name          | Type                                      | Required           | Description     |
| ------------- | ----------------------------------------- | ------------------ | --------------- |
| field         | [MetricsFilterField](#metricsfilterfield) | :heavy_plus_sign:  | An enumeration. |
| value         | string                                    | :heavy_plus_sign:  |                 |
| title         | string                                    | :heavy_minus_sign: |                 |
| is_trial      | boolean                                   | :heavy_minus_sign: |                 |
| duration_type | [Duration](#duration)                     | :heavy_minus_sign: | An enumeration. |
| segmentation  | any                                       | :heavy_minus_sign: |                 |

anyOf

| Name          | Type   | Required           |
| ------------- | ------ | ------------------ |
| » *anonymous* | string | :heavy_minus_sign: |

or

| Name          | Type         | Required           |
| ------------- | ------------ | ------------------ |
| » *anonymous* | string(uuid) | :heavy_minus_sign: |

### InAppMetricsFilterFieldValuesDataCollection

<details>
 <summary>Example (click to expand)</summary>

```json
{
  "filter_values_data": [
    {
      "field": "app_id",
      "value": "string",
      "title": "string",
      "is_trial": false,
      "duration_type": "Weekly",
      "segmentation": "string"
    }
  ]
}
```

</details>

**Properties** 

| Name               | Type                                                         | Required          |
| ------------------ | ------------------------------------------------------------ | ----------------- |
| filter_values_data | [InAppMetricsFilterFieldValueData](#inappmetricsfilterfieldvaluedata) | :heavy_plus_sign: |

### Integration

<details>
 <summary>Example (click to expand)</summary>
```json
{
  "platform": "string",
  "enabled": true,
  "values": {
    "property1": null,
    "property2": null
  },
  "event_android_map": {
    "property1": null,
    "property2": null
  },
  "event_map": {
    "property1": null,
    "property2": null
  }
}
</details>

**Properties** 

| Name              | Type    | Required           |                        |
| ----------------- | ------- | ------------------ | ---------------------- |
| platform          | string  | :heavy_plus_sign:  |                        |
| enabled           | boolean | :heavy_minus_sign: |                        |
| values            | object  | :heavy_minus_sign: | + additionalProperties |
| event_android_map | object  | :heavy_minus_sign: | + additionalProperties |
| event_map         | object  | :heavy_minus_sign: | + additionalProperties |

### IntegrationEvent

<details>
 <summary>Example (click to expand)</summary>


```
```json
{
  "integrations_event_id": "6cab6579-ed0c-4134-b2f0-6033823a7632",
  "event_type": "string",
  "event_body": "string",
  "store": "string",
  "environment": "string",
  "integrations": "string",
  "event_datetime": "2019-08-24T14:15:22Z"
}

```

</details>

A `ModelSerializer` is just a regular `Serializer`, except that:

* A set of default fields are automatically populated.
* A set of default validators are automatically populated.
* Default `.create()` and `.update()` implementations are provided.

The process of automatically determining a set of serializer fields
based on the model fields is reasonably complex, but you almost certainly
don't need to dig into the implementation.

If the `ModelSerializer` class *doesn't* generate the set of fields that
you need you should either declare the extra/differing fields explicitly on
the serializer class, or simply use a `Serializer` class.

Included Mixins:

* A mixin class to enable sparse fieldsets is included
* A mixin class to enable validation of included resources is included

**Properties** 

| Name                  | Type              | Required           | Restrictions |
| --------------------- | ----------------- | ------------------ | ------------ |
| integrations_event_id | string(uuid)      | :heavy_plus_sign:  | read-only    |
| event_type            | string            | :heavy_plus_sign:  |              |
| event_body            | string            | :heavy_plus_sign:  | read-only    |
| store                 | string¦null       | :heavy_minus_sign: |              |
| environment           | string¦null       | :heavy_minus_sign: |              |
| integrations          | string            | :heavy_plus_sign:  | read-only    |
| event_datetime        | string(date-time) | :heavy_plus_sign:  |              |

### LTVSegmentation

<details>
 <summary>Example (click to expand)</summary>
```json
"day"
</details>

**Properties** 

| Name            | Type   | Required           | Description     |
| --------------- | ------ | ------------------ | --------------- |
| LTVSegmentation | string | :heavy_minus_sign: | An enumeration. |

**Enumerated Values** 

| Property        | Value                                                        |
| --------------- | ------------------------------------------------------------ |
| LTVSegmentation | <ul><li> day</li><li> week</li><li> month</li><li> year</li><li> country</li><li> product</li><li> paywall</li><li> paywalls_group</li><li> audience</li><li> placement</li><li> duration</li><li> store</li></ul> |

### LocaleTranslationData

<details>
 <summary>Example (click to expand)</summary>

```
```json
{
  "payload_type": "localization",
  "payload": {},
  "payload_locale": "US",
  "target_locales": [
    "string"
  ]
}
```

</details>

**Properties** 

| Name           | Type                                              | Required           | Description     |
| -------------- | ------------------------------------------------- | ------------------ | --------------- |
| payload_type   | [TranslationPayloadType](#translationpayloadtype) | :heavy_minus_sign: | An enumeration. |
| payload        | object                                            | :heavy_minus_sign: |                 |
| payload_locale | string                                            | :heavy_minus_sign: |                 |
| target_locales | array of strings                                  | :heavy_minus_sign: |                 |

### LocaleTranslationRequest

<details>
 <summary>Example (click to expand)</summary>
```json
{
  "data": {
    "payload_type": "localization",
    "payload": {},
    "payload_locale": "US",
    "target_locales": [
      "string"
    ]
  }
}

```

</details>

**Properties** 

| Name | Type                                            | Required          | Description                                                  |
| ---- | ----------------------------------------------- | ----------------- | ------------------------------------------------------------ |
| data | [LocaleTranslationData](#localetranslationdata) | :heavy_plus_sign: | Annotation:     This object is immutable dataset.  @dataclass(frozen=True) |

### LocaleTranslationResponse

<details>
 <summary>Example (click to expand)</summary>


```json
{
  "data": [
    {
      "payload_type": "localization",
      "payload": {},
      "payload_locale": "US",
      "target_locales": [
        "string"
      ]
    }
  ]
}

```

</details>

**Properties** 

| Name | Type                                              | Required           | Restrictions | Description                                                  |
| ---- | ------------------------------------------------- | ------------------ | ------------ | ------------------------------------------------------------ |
| data | [[LocaleTranslationData](#localetranslationdata)] | :heavy_minus_sign: | none         | Annotation:     This object is immutable dataset.  @dataclass(frozen=True) |

### Localization

<details>
 <summary>Example (click to expand)</summary>


```json
{
  "id": "en-GB",
  "strings": [
    {
      "id": "str-title",
      "value": "Become a Premium man",
      "has_tags": false,
      "fallback": "string"
    }
  ],
  "assets": [
    {
      "id": "string",
      "type": "color",
      "value": "string"
    }
  ]
}

```

</details>

**Properties** 

| Name    | Type                       | Required           | Description                                                  |
| ------- | -------------------------- | ------------------ | ------------------------------------------------------------ |
| id      | string                     | :heavy_plus_sign:  | example: en-GB                                               |
| strings | array of [String](#string) | :heavy_minus_sign: |                                                              |
| assets  | array                      | :heavy_minus_sign: | <p> discriminator:</p><ul><li> propertyName: type</li><li> mapping: color: [AssetColor](#assetcolor), linear-gradient: [AssetColorGradient](#assetcolorgradient'), radial-gradient: [AssetColorGradient](#assetcolorgradient), conic-gradient: [AssetColorGradient](#assetcolorgradient), image: [AssetImage](#assetimage), font: [AssetFont](#assetfont)</li></ul> <p>oneOf: </p><ul><li> [AssetColor](#assetcolor)</li><li>[AssetColorGradient](#assetcolorgradient)</li><li> [AssetImage](#assetimage)</li><li> [AssetFont](#assetfont)</li></ul> |

### Localizations

<details>
 <summary>Example (click to expand)</summary>
```json
{
  "id": "string",
  "is_right_to_left": true,
  "strings": [
    {
      "id": "string",
      "value": [
        "string"
      ],
      "fallback": [
        "string"
      ]
    }
  ],
  "assets": [
    {
      "id": "string",
      "type": "color",
      "value": "string"
    }
  ]
}
</details>
**Properties** 

| Name             | Type                                        | Required           | Description                                                  |
| ---------------- | ------------------------------------------- | ------------------ | ------------------------------------------------------------ |
| id               | string                                      | :heavy_plus_sign:  |                                                              |
| is_right_to_left | boolean                                     | :heavy_minus_sign: |                                                              |
| strings          | [LocalizationsString](#localizationsstring) | :heavy_plus_sign:  |                                                              |
| assets           | Array                                       | :heavy_plus_sign:  | <p> discriminator:</p><ul><li> propertyName: type</li><li> mapping: color: [AssetColor](#assetcolor), linear-gradient: [AssetColorGradient](#assetcolorgradient'), radial-gradient: [AssetColorGradient](#assetcolorgradient), conic-gradient: [AssetColorGradient](#assetcolorgradient), image: [AssetImage](#assetimage), font: [AssetFont](#assetfont), video: [AssetsVideo](#assetsvideo)</li><li></ul> <p>oneOf: </p><ul><li> [AssetColor](#assetcolor)</li><li>[AssetColorGradient](#assetcolorgradient)</li><li> [AssetImage](#assetimage)</li><li> [AssetFont](#assetfont)</li><li> [AssetsVideo](#assetsvideo)</li></ul> |

### LocalizationsString

<details>
 <summary>Example (click to expand)</summary>

```

```json
{
  "id": "string",
  "value": [
    "string"
  ],
  "fallback": [
    "string"
  ]
}

```

</details>

**Properties** 

| Name     | Type                  | Required           |
| -------- | --------------------- | ------------------ |
| id       | string                | :heavy_plus_sign:  |
| value    | [RichText](#richtext) | :heavy_plus_sign:  |
| fallback | [RichText](#richtext) | :heavy_minus_sign: |

### Media

<details>
 <summary>Example (click to expand)</summary>


```json
{
  "media_id": 0,
  "app_id": "affd1d10-9538-4fc8-9e0b-4594a28c1335",
  "account_id": "449e7a5c-69d3-4b8a-aaaf-5c9b713ebc65",
  "name": "string",
  "url": "http://example.com",
  "source_type": "paywall_builder_asset"
}

```

</details>

**Properties** 

| Name       | Type         | Required          |                                                              |
| ---------- | ------------ | ----------------- | ------------------------------------------------------------ |
| media_id   | integer      | :heavy_plus_sign: |                                                              |
| app_id     | string(uuid) | :heavy_plus_sign: |                                                              |
| account_id | string(uuid) | :heavy_minus_sign: |                                                              |
| name       | string       | :heavy_plus_sign: |                                                              |
| url        | anyOf        | :heavy_plus_sign: | <p>Type: string</p><p>minLength: 1, maxLength: 65536, format: uri</p> |
| source_type | [MediaSourceType](#mediasourcetype) | :heavy_plus_sign: ||

### MediaAggregate

<details>
 <summary>Example (click to expand)</summary>


```json
{
  "media": {
    "media_id": 0,
    "app_id": "affd1d10-9538-4fc8-9e0b-4594a28c1335",
    "account_id": "449e7a5c-69d3-4b8a-aaaf-5c9b713ebc65",
    "name": "string",
    "url": "http://example.com",
    "source_type": "paywall_builder_asset"
  },
  "preview_base64": "string"
}

```

</details>

**Properties** 

| Name           | Type            | Required           |
| -------------- | --------------- | ------------------ |
| media          | [Media](#media) | :heavy_plus_sign:  |
| preview_base64 | string          | :heavy_minus_sign: |

### MediaCUResponse

<details>
 <summary>Example (click to expand)</summary>


```json
{
  "data": {
    "media": {
      "media_id": 0,
      "app_id": "affd1d10-9538-4fc8-9e0b-4594a28c1335",
      "account_id": "449e7a5c-69d3-4b8a-aaaf-5c9b713ebc65",
      "name": "string",
      "url": "http://example.com",
      "source_type": "paywall_builder_asset"
    },
    "preview_base64": "string"
  }
}

```

</details>

**Properties** 

| Name | Type                              | Required           |
| ---- | --------------------------------- | ------------------ |
| data | [MediaAggregate](#mediaaggregate) | :heavy_minus_sign: |

### MediaListResponse

<details>
 <summary>Example (click to expand)</summary>


```json
{
  "data": [
    {
      "media_id": 0,
      "app_id": "affd1d10-9538-4fc8-9e0b-4594a28c1335",
      "account_id": "449e7a5c-69d3-4b8a-aaaf-5c9b713ebc65",
      "name": "string",
      "url": "http://example.com",
      "source_type": "paywall_builder_asset"
    }
  ]
}

```

</details>

**Properties** 

| Name | Type                     | Required           |
| ---- | ------------------------ | ------------------ |
| data | array of [Media](#media) | :heavy_minus_sign: |

### MediaResponse

<details>
 <summary>Example (click to expand)</summary>


```json
{
  "data": {
    "media_id": 0,
    "app_id": "affd1d10-9538-4fc8-9e0b-4594a28c1335",
    "account_id": "449e7a5c-69d3-4b8a-aaaf-5c9b713ebc65",
    "name": "string",
    "url": "http://example.com",
    "source_type": "paywall_builder_asset"
  }
}

```

</details>

**Properties** 

| Name | Type            | Required           |
| ---- | --------------- | ------------------ |
| data | [Media](#media) | :heavy_minus_sign: |

### MediaSourceType

<details>
 <summary>Example (click to expand)</summary>


```json
"paywall_builder_asset"

```

</details>

**Properties** 

| Name            | Type   | Required           |
| --------------- | ------ | ------------------ |
| MediaSourceType | string | :heavy_minus_sign: |

**Enumerated Values** 

| Property        | Value                                                        |
| --------------- | ------------------------------------------------------------ |
| MediaSourceType | <ul><li> paywall_builder_asset</li><li> paywall_builder_font</li></ul> |
| MediaSourceType |                                                              |

### Meta

<details>
 <summary>Example (click to expand)</summary>


```json
{
  "pagination": {
    "count": 0,
    "page": 0,
    "pages_count": 0
  }
}

```

</details>

**Properties** 

| Name       | Type                      | Required          |
| ---------- | ------------------------- | ----------------- |
| pagination | [Pagination](#pagination) | :heavy_plus_sign: |

### MetricsFilterField

<details>
 <summary>Example (click to expand)</summary>


```json
"app_id"

```

</details>

**Properties** 

| Name               | Type   | Required           | Description     |
| ------------------ | ------ | ------------------ | --------------- |
| MetricsFilterField | string | :heavy_minus_sign: | An enumeration. |

**Enumerated Values** 

| Property           | Value                                                        |
| ------------------ | ------------------------------------------------------------ |
| MetricsFilterField | <ul><li> app_id</li><li> country</li><li> store</li><li> audience_id</li><li> paywall_id</li><li> paywalls_group_id</li><li> placement_audience_version_id</li><li> placement_id</li><li> store_product_id</li><li> purchase_container_id</li><li> attribution</li><li> attribution_status</li><li> attribution_channel</li><li> attribution_campaign</li><li> attribution_adgroup</li><li> attribution_adset</li><li> attribution_creative</li><li> attribution_source</li><li> state</li></ul> |
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
| state                         | array of [State](#state) | :heavy_minus_sign: | An enumeration.                                              |
| purchase_container_id         | array of strings(uuid)   | :heavy_minus_sign: |                                                              |
| country                       | anyOf                    | :heavy_minus_sign: | <ul><li> type: string, minLength: 2, maxLength: 2</li><li> type: string, minLength: 0, maxLength: 0</li></ul> |
| store_product_id         | array of stings                                 | :heavy_minus_sign: | minItems: 2, maxItems: 2 |
| duration                 | array of [Duration](#duration)                  | :heavy_minus_sign: | An enumeration. |
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
| profiles_counting_method | [ProfilesCountingMethod](#profilescountingmethod) | :heavy_minus_sign: | An enumeration. |

### MetricsFormat

<details>
 <summary>Example (click to expand)</summary>


```json
"json"

```

</details>

**Properties** 

| Name          | Type   | Required           | Description     |
| ------------- | ------ | ------------------ | --------------- |
| MetricsFormat | string | :heavy_minus_sign: | An enumeration. |

**Enumerated Values** 

| Property      | Value                                |
| ------------- | ------------------------------------ |
| MetricsFormat | <ul><li> json</li><li> csv</li></ul> |

### PaginatedFontListResponseList

<details>
 <summary>Example (click to expand)</summary>
```json
{
  "count": 123,
  "next": "http://api.example.org/accounts/?page[number]=4",
  "previous": "http://api.example.org/accounts/?page[number]=2",
  "results": [
    {
      "data": [
        {
          "font_name": "Roboto-Regular.ttf",
          "font_alias_android": "roboto_regular.ttf",
          "font_alias_ios": "Roboto-Regular.ttf",
          "font_id": "cc48777c-5a23-478d-89c6-e52eedca0be6",
          "font_link": "https://public-media.adapty.io/public/aa/bb/3c163353-ebf6-4acc-89c2-d05e1db7f293/Roboto-Regular.ttf"
        }
      ]
    }
  ]
}
</details>

**Properties** 

| Name     | Type                                           | Required           |
| -------- | ---------------------------------------------- | ------------------ |
| count    | integer                                        | :heavy_minus_sign: |
| next     | string(uri)¦null                               | :heavy_minus_sign: |
| previous | string(uri)¦null                               | :heavy_minus_sign: |
| results  | array of [FontListResponse](#fontlistresponse) | :heavy_minus_sign: |

### PaginatedIntegrationEventList

<details>
 <summary>Example (click to expand)</summary>

```
```json
{
  "count": 123,
  "next": "http://api.example.org/accounts/?page[number]=4",
  "previous": "http://api.example.org/accounts/?page[number]=2",
  "results": [
    {
      "integrations_event_id": "6cab6579-ed0c-4134-b2f0-6033823a7632",
      "event_type": "string",
      "event_body": "string",
      "store": "string",
      "environment": "string",
      "integrations": "string",
      "event_datetime": "2019-08-24T14:15:22Z"
    }
  ]
}
```

</details>

**Properties** 

| Name     | Type                                    | Required           | Description                                                  |
| -------- | --------------------------------------- | ------------------ | ------------------------------------------------------------ |
| count    | integer                                 | :heavy_minus_sign: |                                                              |
| next     | string(uri)¦null                        | :heavy_minus_sign: |                                                              |
| previous | string(uri)¦null                        | :heavy_minus_sign: |                                                              |
| results  | [[IntegrationEvent](#integrationevent)] | :heavy_minus_sign: | <p>A `ModelSerializer` is just a regular `Serializer`, except that: </p><ul><li> A set of default fields are automatically populated.</li><li> A set of default validators are automatically populated.</li><li> Default `.create()` and `.update()` implementations are provided. </li></ul><p> The process of automatically determining a set of serializer fields based on the model fields is reasonably complex, but you almost certainly don't need to dig into the implementation.  If the `ModelSerializer` class *doesn't* generate the set of fields that you need you should either declare the extra/differing fields explicitly on the serializer class, or simply use a `Serializer` class.   Included Mixins: </p>  <ul><li> A mixin class to enable sparse fieldsets is included</li><li> A mixin class to enable validation of included resources is included</li></ul> |

### PaginatedPaginatedResponseList

<details>
 <summary>Example (click to expand)</summary>
```json
{
  "count": 123,
  "next": "http://api.example.org/accounts/?page[number]=4",
  "previous": "http://api.example.org/accounts/?page[number]=2",
  "results": [
    {
      "data": [
        {}
      ],
      "meta": {}
    }
  ]
}
</details>

**Properties** 

| Name     | Type                                      | Required           |
| -------- | ----------------------------------------- | ------------------ |
| count    | integer                                   | :heavy_minus_sign: |
| next     | string(uri)¦null                          | :heavy_minus_sign: |
| previous | string(uri)¦null                          | :heavy_minus_sign: |
| results  | [[PaginatedResponse](#paginatedresponse)] | :heavy_minus_sign: |

### Pagination

<details>
 <summary>Example (click to expand)</summary>


```
```json
{
  "data": [
    {}
  ],
  "meta": {}
}


```

```json
{
  "count": 0,
  "page": 0,
  "pages_count": 0
}

```

</details>

**Properties** 

| Name        | Type    | Required           | Description |
| ----------- | ------- | ------------------ | ----------- |
| count       | integer | :heavy_minus_sign: | default: 0  |
| page        | integer | :heavy_minus_sign: | default: 0  |
| pages_count | integer | :heavy_minus_sign: | default: 0  |

###  PaginatedResponse

<details>
 <summary>Example (click to expand)</summary>
</details>

**Properties** 

| Name | Type                             | Required |
| ---- | -------------------------------- | -------- |
| data | array of [BaseModel](#basemodel) | :heavy_minus_sign: |
| meta | object | :heavy_minus_sign: |

### PatchedASACredentials

<details>
 <summary>Example (click to expand)</summary>

```json
{
  "private_key": "string",
  "public_key": "string",
  "team_id": "string",
  "client_id": "string",
  "key_id": "string",
  "save_asa_attribution": true
}

```

</details>

**Properties** 

| Name                 | Type        | Required           | Restrictions |
| -------------------- | ----------- | ------------------ | ------------ |
| private_key          | string¦null | :heavy_minus_sign: | write-only   |
| public_key           | string¦null | :heavy_minus_sign: | read-only    |
| team_id              | string¦null | :heavy_minus_sign: |              |
| client_id            | string¦null | :heavy_minus_sign: |              |
| key_id               | string¦null | :heavy_minus_sign: |              |
| save_asa_attribution | boolean     | :heavy_minus_sign: |              |

### PatchedFontDTO

<details>
 <summary>Example (click to expand)</summary>


```json
{
  "font_name": "Roboto-Regular.ttf",
  "font_alias_android": "roboto_regular.ttf",
  "font_alias_ios": "Roboto-Regular.ttf",
  "font": "string"
}

```

</details>

**Properties** 

| Name               | Type           | Required           | Description              |
| ------------------ | -------------- | ------------------ | ------------------------ |
| font_name          | string         | :heavy_plus_sign:  |                          |
| font_alias_android | string         | :heavy_minus_sign: |                          |
| font_alias_ios     | string         | :heavy_minus_sign: |                          |
| font               | string(binary) | :heavy_minus_sign: | base64 encoded font file |

### PatchedIntegration

<details>
 <summary>Example (click to expand)</summary>


```json
{
  "platform": "string",
  "enabled": true,
  "values": {
    "property1": null,
    "property2": null
  },
  "event_android_map": {
    "property1": null,
    "property2": null
  },
  "event_map": {
    "property1": null,
    "property2": null
  }
}

```

</details>

**Properties** 

| Name                       | Type    | Required           |
| -------------------------- | ------- | ------------------ |
| platform                   | string  | :heavy_minus_sign: |
| enabled                    | boolean | :heavy_minus_sign: |
| values                     | object  | :heavy_minus_sign: |
| » **additionalProperties** | any     | :heavy_minus_sign: |
| event_android_map          | object  | :heavy_minus_sign: |
| » **additionalProperties** | any     | :heavy_minus_sign: |
| event_map                  | object  | :heavy_minus_sign: |
| » **additionalProperties** | any     | :heavy_minus_sign: |

### Paywall

<details>
 <summary>Example (click to expand)</summary>


```json
{
  "paywall_id": "eeb111ae-cdbe-489f-9fe4-30a4b6109051",
  "title": "string",
  "use_paywall_builder": true,
  "use_paywall_builder_v4": true,
  "screenshot": {
    "image_id": 0,
    "url": "http://example.com"
  },
  "builder_screenshot": {
    "image_id": 0,
    "url": "http://example.com"
  },
  "main_screenshot": {
    "image_id": 0,
    "url": "http://example.com"
  }
}

```

</details>

**Properties** 

| Name                   | Type            | Required           |
| ---------------------- | --------------- | ------------------ |
| paywall_id             | string(uuid)    | :heavy_plus_sign:  |
| title                  | string          | :heavy_plus_sign:  |
| use_paywall_builder    | boolean         | :heavy_plus_sign:  |
| use_paywall_builder_v4 | boolean         | :heavy_plus_sign:  |
| screenshot             | [Image](#image) | :heavy_minus_sign: |
| builder_screenshot     | [Image](#image) | :heavy_minus_sign: |
| main_screenshot        | [Image](#image) | :heavy_minus_sign: |

### PaywallBuilderV3Data

<details>
 <summary>Example (click to expand)</summary>


```json
{
  "paywall_builder_id": "efd2d83b-6e30-40be-8394-74d00b6046a1",
  "paywall_id": "eeb111ae-cdbe-489f-9fe4-30a4b6109051",
  "builder_config": {
    "format": "4.0.0",
    "template_id": "string",
    "template_revision": 0,
    "assets": [
      {
        "id": "string",
        "type": "color",
        "value": "string"
      }
    ],
    "localizations": [
      {
        "id": "string",
        "is_right_to_left": true,
        "strings": [
          {
            "id": "string",
            "value": [
              "string"
            ],
            "fallback": [
              "string"
            ]
          }
        ],
        "assets": [
          {
            "id": "string",
            "type": "color",
            "value": "string"
          }
        ]
      }
    ],
    "default_localization": "string",
    "styles": null
  },
  "front_config": {}
}

```

</details>

**Properties** 

| Name               | Type                                                         | Required           |
| ------------------ | ------------------------------------------------------------ | ------------------ |
| paywall_builder_id | string(uuid)                                                 | :heavy_minus_sign: |
| paywall_id         | string(uuid)                                                 | :heavy_minus_sign: |
| builder_config     | [common__domains__value_objects__paywall_builder__v4__paywall_builder_config__PaywallBuilderV3Config](#common__domains__value_objects__paywall_builder__v4__paywall_builder_config__paywallbuilderv3config) | :heavy_plus_sign:  |
| front_config       | object                                                       | :heavy_plus_sign:  |

### PaywallData

<details>
 <summary>Example (click to expand)</summary>


```json
{
  "title": "string",
  "use_paywall_builder": true,
  "use_paywall_builder_v4": false,
  "remote_config_legacy": "string",
  "screenshot_id": 0,
  "builder_screenshot_id": 0,
  "products": [
    {
      "product_id": "0d012afa-f885-4e65-aeca-37e27701e2d1",
      "offer_id": "d5a7a5b7-a4a3-49e7-9c69-b44d2cbe15cf"
    }
  ],
  "remote_configs": [
    {
      "locale": "string",
      "data": "string"
    }
  ],
  "paywall_builder": {
    "format": "2.0.0",
    "template_id": "basic",
    "template_revision": 2,
    "assets": [
      {
        "id": "string",
        "type": "color",
        "value": "string"
      }
    ],
    "default_localization": "en-GB",
    "localizations": [
      {
        "id": "en-GB",
        "strings": [
          {
            "id": "str-title",
            "value": "Become a Premium man",
            "has_tags": false,
            "fallback": "string"
          }
        ],
        "assets": [
          {
            "id": "string",
            "type": "color",
            "value": "string"
          }
        ]
      }
    ],
    "styles": {
      "property1": {
        "footer_block": {
          "property1": "string",
          "property2": "string"
        },
        "features_block": {
          "type": "list"
        },
        "products_block": {
          "type": "single",
          "main_product_index": 0,
          "products": [
            {
              "product_id": "string",
              "type": "product",
              "order": 0
            }
          ]
        }
      },
      "property2": {
        "footer_block": {
          "property1": "string",
          "property2": "string"
        },
        "features_block": {
          "type": "list"
        },
        "products_block": {
          "type": "single",
          "main_product_index": 0,
          "products": [
            {
              "product_id": "string",
              "type": "product",
              "order": 0
            }
          ]
        }
      }
    },
    "is_hard_paywall": false,
    "main_image_relative_height": 0.56
  },
  "paywall_builder_v3": {
    "paywall_builder_id": "efd2d83b-6e30-40be-8394-74d00b6046a1",
    "paywall_id": "eeb111ae-cdbe-489f-9fe4-30a4b6109051",
    "builder_config": {
      "format": "4.0.0",
      "template_id": "string",
      "template_revision": 0,
      "assets": [
        {
          "id": "string",
          "type": "color",
          "value": "string"
        }
      ],
      "localizations": [
        {
          "id": "string",
          "is_right_to_left": true,
          "strings": [
            {
              "id": "string",
              "value": [
                "string"
              ],
              "fallback": [
                "string"
              ]
            }
          ],
          "assets": [
            {
              "id": "string",
              "type": "color",
              "value": "string"
            }
          ]
        }
      ],
      "default_localization": "string",
      "styles": null
    },
    "front_config": {}
  }
}

```

</details>

**Properties** 

| Name                   | Type                                                         | Required           | Restrictions | Description                                                  |
| ---------------------- | ------------------------------------------------------------ | ------------------ | ------------ | ------------------------------------------------------------ |
| title                  | string                                                       | :heavy_plus_sign:  | none         | none                                                         |
| use_paywall_builder    | boolean                                                      | :heavy_plus_sign:  | none         | none                                                         |
| use_paywall_builder_v4 | boolean                                                      | :heavy_minus_sign: | none         | none                                                         |
| remote_config_legacy   | string                                                       | :heavy_minus_sign: | none         | none                                                         |
| screenshot_id          | integer                                                      | :heavy_minus_sign: | none         | none                                                         |
| builder_screenshot_id  | integer                                                      | :heavy_minus_sign: | none         | none                                                         |
| products               | array of [PaywallProductData](#paywallproductdata)           | :heavy_plus_sign:  | none         | <p>Annotation:     This object is immutable dataset.  @dataclass(frozen=True)</p><p>minItems: 1, uniqueItems: true</p> |
| remote_configs         | array of [PaywallRemoteConfigValue](#paywallremoteconfigvalue) | :heavy_minus_sign: | none         | none                                                         |
| paywall_builder        | [portal__in_app_context__domains__value_objects__paywall_builder_v3_config__PaywallBuilderV3Config](#portal__in_app_context__domains__value_objects__paywall_builder_v3_config__paywallbuilderv3config) | :heavy_minus_sign: | none         | none                                                         |
| paywall_builder_v3     | [PaywallBuilderV3Data](#paywallbuilderv3data)                | :heavy_minus_sign: | none         | Annotation:     This object is immutable dataset.  @dataclass(frozen=True) |

### PaywallDetailMetricsCollection

<details>
 <summary>Example (click to expand)</summary>


```json
{
  "metrics": {
    "revenue": 0,
    "proceeds": 0,
    "net_revenue": 0,
    "purchases": 0,
    "trials": 0,
    "trials_cancelled": 0,
    "refunds": 0,
    "unique_subscribers": 0,
    "unique_paid_subscribers": 0,
    "views": 0,
    "unique_profiles_views": 0,
    "in_current_state": true,
    "arppu": 0,
    "arpas": 0,
    "apppu": 0,
    "appas": 0,
    "conversion_rate_purchases": 0,
    "conversion_rate_trials": 0,
    "conversion_rate_refunds": 0,
    "conversion_rate_purchases_by_users": 0,
    "conversion_rate_trials_by_users": 0,
    "items": [
      {
        "revenue": 0,
        "proceeds": 0,
        "net_revenue": 0,
        "purchases": 0,
        "trials": 0,
        "trials_cancelled": 0,
        "refunds": 0,
        "unique_subscribers": 0,
        "unique_paid_subscribers": 0,
        "views": 0,
        "unique_profiles_views": 0,
        "in_current_state": true,
        "arppu": 0,
        "arpas": 0,
        "apppu": 0,
        "appas": 0,
        "conversion_rate_purchases": 0,
        "conversion_rate_trials": 0,
        "conversion_rate_refunds": 0,
        "conversion_rate_purchases_by_users": 0,
        "conversion_rate_trials_by_users": 0
      }
    ],
    "title": "Total"
  },
  "paywall": {
    "paywall_id": "eeb111ae-cdbe-489f-9fe4-30a4b6109051",
    "title": "string",
    "use_paywall_builder": true,
    "use_paywall_builder_v4": true,
    "screenshot": {
      "image_id": 0,
      "url": "http://example.com"
    },
    "builder_screenshot": {
      "image_id": 0,
      "url": "http://example.com"
    },
    "main_screenshot": {
      "image_id": 0,
      "url": "http://example.com"
    }
  },
  "state": "live",
  "started_at": "2019-08-24T14:15:22Z",
  "stopped_at": "2019-08-24T14:15:22Z",
  "segmentation_by": "product",
  "based_on": "placement"
}

```

</details>

**Properties** 

| Name            | Type                                                         | Required           | Description     |
| --------------- | ------------------------------------------------------------ | ------------------ | --------------- |
| metrics         | [InAppDetailTotalMetrics](#inappdetailtotalmetrics)          | :heavy_plus_sign:  |                 |
| paywall         | [Paywall](#paywall)                                          | :heavy_plus_sign:  |                 |
| state           | [PaywallState](#paywallstate)                                | :heavy_plus_sign:  | An enumeration. |
| started_at      | string(date-time)                                            | :heavy_minus_sign: |                 |
| stopped_at      | string(date-time)                                            | :heavy_minus_sign: |                 |
| segmentation_by | [InAppDetailMetricsSegmentation](#inappdetailmetricssegmentation) | :heavy_minus_sign: | An enumeration. |
| based_on        | [InAppDetailMetricsBasedOn](#inappdetailmetricsbasedon)      | :heavy_plus_sign:  | An enumeration. |

### PaywallDetailMetricsResponse

<details>
 <summary>Example (click to expand)</summary>


```json
{
  "data": {
    "metrics": {
      "revenue": 0,
      "proceeds": 0,
      "net_revenue": 0,
      "purchases": 0,
      "trials": 0,
      "trials_cancelled": 0,
      "refunds": 0,
      "unique_subscribers": 0,
      "unique_paid_subscribers": 0,
      "views": 0,
      "unique_profiles_views": 0,
      "in_current_state": true,
      "arppu": 0,
      "arpas": 0,
      "apppu": 0,
      "appas": 0,
      "conversion_rate_purchases": 0,
      "conversion_rate_trials": 0,
      "conversion_rate_refunds": 0,
      "conversion_rate_purchases_by_users": 0,
      "conversion_rate_trials_by_users": 0,
      "items": [
        {
          "revenue": 0,
          "proceeds": 0,
          "net_revenue": 0,
          "purchases": 0,
          "trials": 0,
          "trials_cancelled": 0,
          "refunds": 0,
          "unique_subscribers": 0,
          "unique_paid_subscribers": 0,
          "views": 0,
          "unique_profiles_views": 0,
          "in_current_state": true,
          "arppu": 0,
          "arpas": 0,
          "apppu": 0,
          "appas": 0,
          "conversion_rate_purchases": 0,
          "conversion_rate_trials": 0,
          "conversion_rate_refunds": 0,
          "conversion_rate_purchases_by_users": 0,
          "conversion_rate_trials_by_users": 0
        }
      ],
      "title": "Total"
    },
    "paywall": {
      "paywall_id": "eeb111ae-cdbe-489f-9fe4-30a4b6109051",
      "title": "string",
      "use_paywall_builder": true,
      "use_paywall_builder_v4": true,
      "screenshot": {
        "image_id": 0,
        "url": "http://example.com"
      },
      "builder_screenshot": {
        "image_id": 0,
        "url": "http://example.com"
      },
      "main_screenshot": {
        "image_id": 0,
        "url": "http://example.com"
      }
    },
    "state": "live",
    "started_at": "2019-08-24T14:15:22Z",
    "stopped_at": "2019-08-24T14:15:22Z",
    "segmentation_by": "product",
    "based_on": "placement"
  },
  "meta": {
    "pagination": {
      "count": 0,
      "page": 0,
      "pages_count": 0
    }
  }
}

```

</details>

**Properties** 

| Name | Type                                                         | Required           |
| ---- | ------------------------------------------------------------ | ------------------ |
| data | [PaywallDetailMetricsCollection](#paywalldetailmetricscollection) | :heavy_plus_sign:  |
| meta | [Meta](#meta)                                                | :heavy_minus_sign: |

### PaywallLatestPlacementResponse

<details>
 <summary>Example (click to expand)</summary>


```json
{
  "data": [
    {
      "placement": {
        "placement_id": "d98659e8-3eb1-4328-89b6-1848d40b4461",
        "title": "string",
        "created_at": "2019-08-24T14:15:22Z"
      },
      "state": "live",
      "audiences": [
        {
          "audience": {
            "audience_id": "875075bb-caff-4035-8f5f-9fb1430dc417",
            "title": "string",
            "is_default": true
          },
          "started_at": "2019-08-24T14:15:22Z",
          "finished_at": "2019-08-24T14:15:22Z",
          "content_type": "ab_test"
        }
      ]
    }
  ],
  "meta": {
    "pagination": {
      "count": 0,
      "page": 0,
      "pages_count": 0
    }
  }
}

```

</details>

**Properties** 

| Name | Type                                                         | Required           |
| ---- | ------------------------------------------------------------ | ------------------ |
| data | array of [PaywallLatestPlacementUsingValue](#paywalllatestplacementusingvalue) | :heavy_plus_sign:  |
| meta | [Meta](#meta)                                                | :heavy_minus_sign: |

### PaywallLatestPlacementUsingAudienceValue

<details>
 <summary>Example (click to expand)</summary>


```json
{
  "audience": {
    "audience_id": "875075bb-caff-4035-8f5f-9fb1430dc417",
    "title": "string",
    "is_default": true
  },
  "started_at": "2019-08-24T14:15:22Z",
  "finished_at": "2019-08-24T14:15:22Z",
  "content_type": "ab_test"
}

```

</details>

**Properties** 

| Name         | Type                                          | Required           | Description     |
| ------------ | --------------------------------------------- | ------------------ | --------------- |
| audience     | [Audience](#audience)                         | :heavy_plus_sign:  |                 |
| started_at   | string(date-time)                             | :heavy_minus_sign: |                 |
| finished_at  | string(date-time)                             | :heavy_minus_sign: |                 |
| content_type | [PlacementContentType](#placementcontenttype) | :heavy_plus_sign:  | An enumeration. |

### PaywallLatestPlacementUsingValue

<details>
 <summary>Example (click to expand)</summary>


```json
{
  "placement": {
    "placement_id": "d98659e8-3eb1-4328-89b6-1848d40b4461",
    "title": "string",
    "created_at": "2019-08-24T14:15:22Z"
  },
  "state": "live",
  "audiences": [
    {
      "audience": {
        "audience_id": "875075bb-caff-4035-8f5f-9fb1430dc417",
        "title": "string",
        "is_default": true
      },
      "started_at": "2019-08-24T14:15:22Z",
      "finished_at": "2019-08-24T14:15:22Z",
      "content_type": "ab_test"
    }
  ]
}

```

</details>

**Properties** 

| Name      | Type                                                         | Required          | Description     |
| --------- | ------------------------------------------------------------ | ----------------- | --------------- |
| placement | [Placement](#placement)                                      | :heavy_plus_sign: |                 |
| state     | [State](#state)                                              | :heavy_plus_sign: | An enumeration. |
| audiences | array of [PaywallLatestPlacementUsingAudienceValue](#paywalllatestplacementusingaudiencevalue) | :heavy_plus_sign: |                 |

### PaywallListMetrics

<details>
 <summary>Example (click to expand)</summary>


```json
{
  "revenue": 0,
  "proceeds": 0,
  "net_revenue": 0,
  "purchases": 0,
  "trials": 0,
  "trials_cancelled": 0,
  "refunds": 0,
  "unique_subscribers": 0,
  "unique_paid_subscribers": 0,
  "views": 0,
  "unique_profiles_views": 0,
  "in_current_state": true,
  "arppu": 0,
  "arpas": 0,
  "apppu": 0,
  "appas": 0,
  "conversion_rate_purchases": 0,
  "conversion_rate_trials": 0,
  "conversion_rate_refunds": 0,
  "conversion_rate_purchases_by_users": 0,
  "conversion_rate_trials_by_users": 0,
  "paywall_id": "eeb111ae-cdbe-489f-9fe4-30a4b6109051",
  "last_purchases": "2019-08-24T14:15:22Z"
}

```

</details>

**Properties** 

| Name                               | Type              | Required           |
| ---------------------------------- | ----------------- | ------------------ |
| revenue                            | number            | :heavy_minus_sign: |
| proceeds                           | number            | :heavy_minus_sign: |
| net_revenue                        | number            | :heavy_minus_sign: |
| purchases                          | integer           | :heavy_minus_sign: |
| trials                             | integer           | :heavy_minus_sign: |
| trials_cancelled                   | integer           | :heavy_minus_sign: |
| refunds                            | integer           | :heavy_minus_sign: |
| unique_subscribers                 | integer           | :heavy_minus_sign: |
| unique_paid_subscribers            | integer           | :heavy_minus_sign: |
| views                              | integer           | :heavy_minus_sign: |
| unique_profiles_views              | integer           | :heavy_minus_sign: |
| in_current_state                   | boolean           | :heavy_minus_sign: |
| arppu                              | number            | :heavy_minus_sign: |
| arpas                              | number            | :heavy_minus_sign: |
| apppu                              | number            | :heavy_minus_sign: |
| appas                              | number            | :heavy_minus_sign: |
| conversion_rate_purchases          | number            | :heavy_minus_sign: |
| conversion_rate_trials             | number            | :heavy_minus_sign: |
| conversion_rate_refunds            | number            | :heavy_minus_sign: |
| conversion_rate_purchases_by_users | number            | :heavy_minus_sign: |
| conversion_rate_trials_by_users    | number            | :heavy_minus_sign: |
| paywall_id                         | string(uuid)      | :heavy_plus_sign:  |
| last_purchases                     | string(date-time) | :heavy_minus_sign: |

### PaywallListMetricsCollection

<details>
 <summary>Example (click to expand)</summary>


```json
{
  "data": [
    {
      "revenue": 0,
      "proceeds": 0,
      "net_revenue": 0,
      "purchases": 0,
      "trials": 0,
      "trials_cancelled": 0,
      "refunds": 0,
      "unique_subscribers": 0,
      "unique_paid_subscribers": 0,
      "views": 0,
      "unique_profiles_views": 0,
      "in_current_state": true,
      "arppu": 0,
      "arpas": 0,
      "apppu": 0,
      "appas": 0,
      "conversion_rate_purchases": 0,
      "conversion_rate_trials": 0,
      "conversion_rate_refunds": 0,
      "conversion_rate_purchases_by_users": 0,
      "conversion_rate_trials_by_users": 0,
      "paywall_id": "eeb111ae-cdbe-489f-9fe4-30a4b6109051",
      "last_purchases": "2019-08-24T14:15:22Z"
    }
  ],
  "meta": {
    "pagination": {
      "count": 0,
      "page": 0,
      "pages_count": 0
    }
  }
}

```

</details>

**Properties** 

| Name | Type                                               | Required           |
| ---- | -------------------------------------------------- | ------------------ |
| data | array of [PaywallListMetrics](#paywalllistmetrics) | :heavy_plus_sign:  |
| meta | [Meta](#meta)                                      | :heavy_minus_sign: |

### PaywallMetrics

<details>
 <summary>Example (click to expand)</summary>


```json
{
  "revenue": 0,
  "proceeds": 0,
  "net_revenue": 0,
  "purchases": 0,
  "trials": 0,
  "trials_cancelled": 0,
  "refunds": 0,
  "unique_subscribers": 0,
  "unique_paid_subscribers": 0,
  "views": 0,
  "unique_profiles_views": 0,
  "in_current_state": true,
  "arppu": 0,
  "arpas": 0,
  "apppu": 0,
  "appas": 0,
  "conversion_rate_purchases": 0,
  "conversion_rate_trials": 0,
  "conversion_rate_refunds": 0,
  "conversion_rate_purchases_by_users": 0,
  "conversion_rate_trials_by_users": 0,
  "paywall": {
    "paywall_id": "eeb111ae-cdbe-489f-9fe4-30a4b6109051",
    "title": "string",
    "use_paywall_builder": true,
    "use_paywall_builder_v4": true,
    "screenshot": {
      "image_id": 0,
      "url": "http://example.com"
    },
    "builder_screenshot": {
      "image_id": 0,
      "url": "http://example.com"
    },
    "main_screenshot": {
      "image_id": 0,
      "url": "http://example.com"
    }
  },
  "content_type": "paywall",
  "started_at": "2019-08-24T14:15:22Z",
  "stopped_at": "2019-08-24T14:15:22Z"
}

```

</details>

**Properties** 

| Name                               | Type                                                         | Required           | Description     |
| ---------------------------------- | ------------------------------------------------------------ | ------------------ | --------------- |
| revenue                            | number                                                       | :heavy_minus_sign: |                 |
| proceeds                           | number                                                       | :heavy_minus_sign: |                 |
| net_revenue                        | number                                                       | :heavy_minus_sign: |                 |
| purchases                          | integer                                                      | :heavy_minus_sign: |                 |
| trials                             | integer                                                      | :heavy_minus_sign: |                 |
| trials_cancelled                   | integer                                                      | :heavy_minus_sign: |                 |
| refunds                            | integer                                                      | :heavy_minus_sign: |                 |
| unique_subscribers                 | integer                                                      | :heavy_minus_sign: |                 |
| unique_paid_subscribers            | integer                                                      | :heavy_minus_sign: |                 |
| views                              | integer                                                      | :heavy_minus_sign: |                 |
| unique_profiles_views              | integer                                                      | :heavy_minus_sign: |                 |
| in_current_state                   | boolean                                                      | :heavy_minus_sign: |                 |
| arppu                              | number                                                       | :heavy_minus_sign: |                 |
| arpas                              | number                                                       | :heavy_minus_sign: |                 |
| apppu                              | number                                                       | :heavy_minus_sign: |                 |
| appas                              | number                                                       | :heavy_minus_sign: |                 |
| conversion_rate_purchases          | number                                                       | :heavy_minus_sign: |                 |
| conversion_rate_trials             | number                                                       | :heavy_minus_sign: |                 |
| conversion_rate_refunds            | number                                                       | :heavy_minus_sign: |                 |
| conversion_rate_purchases_by_users | number                                                       | :heavy_minus_sign: |                 |
| conversion_rate_trials_by_users    | number                                                       | :heavy_minus_sign: |                 |
| paywall                            | [Paywall](#paywall)                                          | :heavy_plus_sign:  |                 |
| content_type                       | [PlacementAudienceContentType](#placementaudiencecontenttype) | :heavy_minus_sign: | An enumeration. |
| started_at                         | string(date-time)                                            | :heavy_minus_sign: |                 |
| stopped_at                         | string(date-time)                                            | :heavy_minus_sign: |                 |

### PaywallProduct

<details>
 <summary>Example (click to expand)</summary>


```json
{
  "product_id": "0d012afa-f885-4e65-aeca-37e27701e2d1",
  "title": "string",
  "product_set": "uncategorised",
  "offer": {
    "product_offer_id": "beaf26e9-01fd-4b9a-a128-2872bf52e733",
    "title": "string"
  },
  "ordering_index": 0
}

```

</details>

**Properties** 

| Name           | Type                                | Required           | Description     |
| -------------- | ----------------------------------- | ------------------ | --------------- |
| product_id     | string(uuid)                        | :heavy_plus_sign:  |                 |
| title          | string                              | :heavy_plus_sign:  |                 |
| product_set    | [ProductCategory](#productcategory) | :heavy_minus_sign: | An enumeration. |
| offer          | [ProductOffer](#productoffer)       | :heavy_minus_sign: |                 |
| ordering_index | integer                             | :heavy_plus_sign:  |                 |

### PaywallProductData

<details>
 <summary>Example (click to expand)</summary>


```json
{
  "product_id": "0d012afa-f885-4e65-aeca-37e27701e2d1",
  "offer_id": "d5a7a5b7-a4a3-49e7-9c69-b44d2cbe15cf"
}

```

</details>

**Properties** 

| Name       | Type         | Required           |
| ---------- | ------------ | ------------------ |
| product_id | string(uuid) | :heavy_plus_sign:  |
| offer_id   | string(uuid) | :heavy_minus_sign: |

### PaywallRelatedAggregate

<details>
 <summary>Example (click to expand)</summary>


```json
{
  "paywall": {
    "paywall_id": "eeb111ae-cdbe-489f-9fe4-30a4b6109051",
    "title": "string",
    "use_paywall_builder": true,
    "use_paywall_builder_v4": true,
    "screenshot": {
      "image_id": 0,
      "url": "http://example.com"
    },
    "builder_screenshot": {
      "image_id": 0,
      "url": "http://example.com"
    },
    "main_screenshot": {
      "image_id": 0,
      "url": "http://example.com"
    }
  },
  "screenshot": {
    "image_id": 0,
    "url": "http://example.com"
  },
  "builder_screenshot": {
    "image_id": 0,
    "url": "http://example.com"
  },
  "products": [
    {
      "product_id": "0d012afa-f885-4e65-aeca-37e27701e2d1",
      "title": "string",
      "product_set": "uncategorised",
      "offer": {
        "product_offer_id": "beaf26e9-01fd-4b9a-a128-2872bf52e733",
        "title": "string"
      },
      "ordering_index": 0
    }
  ]
}

```

</details>

**Properties** 

| Name               | Type                                       | Required           |
| ------------------ | ------------------------------------------ | ------------------ |
| paywall            | [Paywall](#paywall)                        | :heavy_plus_sign:  |
| screenshot         | [Image](#image)                            | :heavy_minus_sign: |
| builder_screenshot | [Image](#image)                            | :heavy_minus_sign: |
| products           | array of [PaywallProduct](#paywallproduct) | :heavy_plus_sign:  |

### PaywallRemoteConfigValue

<details>
 <summary>Example (click to expand)</summary>


```json
{
  "locale": "string",
  "data": "string"
}

```

</details>

**Properties** 

| Name   | Type   | Required          |
| ------ | ------ | ----------------- |
| locale | string | :heavy_plus_sign: |
| data   | string | :heavy_plus_sign: |

### PaywallState

<details>
 <summary>Example (click to expand)</summary>


```json
"live"

```

</details>

**Properties** 

| Name         | Type   | Required           | Description     |
| ------------ | ------ | ------------------ | --------------- |
| PaywallState | string | :heavy_minus_sign: | An enumeration. |

**Enumerated Values** 

| Property     | Value    |
| ------------ | -------- |
| PaywallState | live     |
| PaywallState | inactive |
| PaywallState | draft    |
| PaywallState | archived |

### PaywallsGroup

<details>
 <summary>Example (click to expand)</summary>


```json
{
  "paywalls_group_id": "c0cb5b73-71c2-4250-9a48-b2e8da0c7144",
  "title": "string"
}

```

</details>

**Properties** 

| Name              | Type         | Required          |
| ----------------- | ------------ | ----------------- |
| paywalls_group_id | string(uuid) | :heavy_plus_sign: |
| title             | string       | :heavy_plus_sign: |

### PaywallsGroupAggregate

<details>
 <summary>Example (click to expand)</summary>


```json
{
  "paywalls_group": {
    "paywalls_group_id": "c0cb5b73-71c2-4250-9a48-b2e8da0c7144",
    "title": "string"
  },
  "paywalls": [
    {
      "paywalls_group_paywall": {
        "paywalls_group_paywall_id": "652d7bee-751c-4a11-b6de-6615a944c610",
        "paywalls_group_id": "c0cb5b73-71c2-4250-9a48-b2e8da0c7144",
        "paywall_id": "eeb111ae-cdbe-489f-9fe4-30a4b6109051",
        "ordering_index": 0
      },
      "paywall": {
        "paywall": {
          "paywall_id": "eeb111ae-cdbe-489f-9fe4-30a4b6109051",
          "title": "string",
          "use_paywall_builder": true,
          "use_paywall_builder_v4": true,
          "screenshot": {
            "image_id": 0,
            "url": "http://example.com"
          },
          "builder_screenshot": {
            "image_id": 0,
            "url": "http://example.com"
          },
          "main_screenshot": {
            "image_id": 0,
            "url": "http://example.com"
          }
        },
        "screenshot": {
          "image_id": 0,
          "url": "http://example.com"
        },
        "builder_screenshot": {
          "image_id": 0,
          "url": "http://example.com"
        },
        "products": [
          {
            "product_id": "0d012afa-f885-4e65-aeca-37e27701e2d1",
            "title": "string",
            "product_set": "uncategorised",
            "offer": {
              "product_offer_id": "beaf26e9-01fd-4b9a-a128-2872bf52e733",
              "title": "string"
            },
            "ordering_index": 0
          }
        ]
      }
    }
  ]
}

```

</details>

**Properties** 

| Name           | Type                                                         | Required          |
| -------------- | ------------------------------------------------------------ | ----------------- |
| paywalls_group | [PaywallsGroup](#paywallsgroup)                              | :heavy_plus_sign: |
| paywalls       | [[PaywallsGroupPaywallAggregate](#paywallsgrouppaywallaggregate)] | :heavy_plus_sign: |

### PaywallsGroupData

<details>
 <summary>Example (click to expand)</summary>


```json
{
  "paywalls_group_id": "c0cb5b73-71c2-4250-9a48-b2e8da0c7144",
  "title": "string"
}

```

</details>

**Properties** 

| Name              | Type         | Required           |
| ----------------- | ------------ | ------------------ |
| paywalls_group_id | string(uuid) | :heavy_minus_sign: |
| title             | string       | :heavy_minus_sign: |

### PaywallsGroupDetailMetricsCollection

<details>
 <summary>Example (click to expand)</summary>


```json
{
  "metrics": {
    "revenue": 0,
    "proceeds": 0,
    "net_revenue": 0,
    "purchases": 0,
    "trials": 0,
    "trials_cancelled": 0,
    "refunds": 0,
    "unique_subscribers": 0,
    "unique_paid_subscribers": 0,
    "views": 0,
    "unique_profiles_views": 0,
    "in_current_state": true,
    "arppu": 0,
    "arpas": 0,
    "apppu": 0,
    "appas": 0,
    "conversion_rate_purchases": 0,
    "conversion_rate_trials": 0,
    "conversion_rate_refunds": 0,
    "conversion_rate_purchases_by_users": 0,
    "conversion_rate_trials_by_users": 0,
    "items": [
      {
        "revenue": 0,
        "proceeds": 0,
        "net_revenue": 0,
        "purchases": 0,
        "trials": 0,
        "trials_cancelled": 0,
        "refunds": 0,
        "unique_subscribers": 0,
        "unique_paid_subscribers": 0,
        "views": 0,
        "unique_profiles_views": 0,
        "in_current_state": true,
        "arppu": 0,
        "arpas": 0,
        "apppu": 0,
        "appas": 0,
        "conversion_rate_purchases": 0,
        "conversion_rate_trials": 0,
        "conversion_rate_refunds": 0,
        "conversion_rate_purchases_by_users": 0,
        "conversion_rate_trials_by_users": 0
      }
    ],
    "title": "Total"
  },
  "paywalls_group": {
    "paywalls_group_id": "c0cb5b73-71c2-4250-9a48-b2e8da0c7144",
    "title": "string"
  },
  "state": "live",
  "started_at": "2019-08-24T14:15:22Z",
  "stopped_at": "2019-08-24T14:15:22Z",
  "based_on": "placement",
  "segmentation_by": "product"
}

```

</details>

**Properties** 

| Name            | Type                                                         | Required           | Description     |
| --------------- | ------------------------------------------------------------ | ------------------ | --------------- |
| metrics         | [InAppDetailTotalMetrics](#inappdetailtotalmetrics)          | :heavy_plus_sign:  |                 |
| paywalls_group  | [PaywallsGroup](#paywallsgroup)                              | :heavy_plus_sign:  |                 |
| state           | [PaywallsGroupState](#paywallsgroupstate)                    | :heavy_plus_sign:  | An enumeration. |
| started_at      | string(date-time)                                            | :heavy_minus_sign: |                 |
| stopped_at      | string(date-time)                                            | :heavy_minus_sign: |                 |
| based_on        | [InAppDetailMetricsBasedOn](#inappdetailmetricsbasedon)      | :heavy_plus_sign:  | An enumeration. |
| segmentation_by | [InAppDetailMetricsSegmentation](#inappdetailmetricssegmentation) | :heavy_minus_sign: | An enumeration. |

### PaywallsGroupDetailMetricsResponse

<details>
 <summary>Example (click to expand)</summary>


```json
{
  "data": {
    "metrics": {
      "revenue": 0,
      "proceeds": 0,
      "net_revenue": 0,
      "purchases": 0,
      "trials": 0,
      "trials_cancelled": 0,
      "refunds": 0,
      "unique_subscribers": 0,
      "unique_paid_subscribers": 0,
      "views": 0,
      "unique_profiles_views": 0,
      "in_current_state": true,
      "arppu": 0,
      "arpas": 0,
      "apppu": 0,
      "appas": 0,
      "conversion_rate_purchases": 0,
      "conversion_rate_trials": 0,
      "conversion_rate_refunds": 0,
      "conversion_rate_purchases_by_users": 0,
      "conversion_rate_trials_by_users": 0,
      "items": [
        {
          "revenue": 0,
          "proceeds": 0,
          "net_revenue": 0,
          "purchases": 0,
          "trials": 0,
          "trials_cancelled": 0,
          "refunds": 0,
          "unique_subscribers": 0,
          "unique_paid_subscribers": 0,
          "views": 0,
          "unique_profiles_views": 0,
          "in_current_state": true,
          "arppu": 0,
          "arpas": 0,
          "apppu": 0,
          "appas": 0,
          "conversion_rate_purchases": 0,
          "conversion_rate_trials": 0,
          "conversion_rate_refunds": 0,
          "conversion_rate_purchases_by_users": 0,
          "conversion_rate_trials_by_users": 0
        }
      ],
      "title": "Total"
    },
    "paywalls_group": {
      "paywalls_group_id": "c0cb5b73-71c2-4250-9a48-b2e8da0c7144",
      "title": "string"
    },
    "state": "live",
    "started_at": "2019-08-24T14:15:22Z",
    "stopped_at": "2019-08-24T14:15:22Z",
    "based_on": "placement",
    "segmentation_by": "product"
  },
  "meta": {
    "pagination": {
      "count": 0,
      "page": 0,
      "pages_count": 0
    }
  }
}

```

</details>

**Properties** 

| Name | Type                                                         | Required           |
| ---- | ------------------------------------------------------------ | ------------------ |
| data | [PaywallsGroupDetailMetricsCollection](#paywallsgroupdetailmetricscollection) | :heavy_plus_sign:  |
| meta | [Meta](#meta)                                                | :heavy_minus_sign: |

### PaywallsGroupMetrics

<details>
 <summary>Example (click to expand)</summary>


```json
{
  "revenue": 0,
  "proceeds": 0,
  "net_revenue": 0,
  "purchases": 0,
  "trials": 0,
  "trials_cancelled": 0,
  "refunds": 0,
  "unique_subscribers": 0,
  "unique_paid_subscribers": 0,
  "views": 0,
  "unique_profiles_views": 0,
  "in_current_state": true,
  "arppu": 0,
  "arpas": 0,
  "apppu": 0,
  "appas": 0,
  "conversion_rate_purchases": 0,
  "conversion_rate_trials": 0,
  "conversion_rate_refunds": 0,
  "conversion_rate_purchases_by_users": 0,
  "conversion_rate_trials_by_users": 0,
  "items": [
    {
      "revenue": 0,
      "proceeds": 0,
      "net_revenue": 0,
      "purchases": 0,
      "trials": 0,
      "trials_cancelled": 0,
      "refunds": 0,
      "unique_subscribers": 0,
      "unique_paid_subscribers": 0,
      "views": 0,
      "unique_profiles_views": 0,
      "in_current_state": true,
      "arppu": 0,
      "arpas": 0,
      "apppu": 0,
      "appas": 0,
      "conversion_rate_purchases": 0,
      "conversion_rate_trials": 0,
      "conversion_rate_refunds": 0,
      "conversion_rate_purchases_by_users": 0,
      "conversion_rate_trials_by_users": 0,
      "items": [
        {
          "revenue": 0,
          "proceeds": 0,
          "net_revenue": 0,
          "purchases": 0,
          "trials": 0,
          "trials_cancelled": 0,
          "refunds": 0,
          "unique_subscribers": 0,
          "unique_paid_subscribers": 0,
          "views": 0,
          "unique_profiles_views": 0,
          "in_current_state": true,
          "arppu": 0,
          "arpas": 0,
          "apppu": 0,
          "appas": 0,
          "conversion_rate_purchases": 0,
          "conversion_rate_trials": 0,
          "conversion_rate_refunds": 0,
          "conversion_rate_purchases_by_users": 0,
          "conversion_rate_trials_by_users": 0
        }
      ],
      "title": "string",
      "paywall": {
        "paywall_id": "eeb111ae-cdbe-489f-9fe4-30a4b6109051",
        "title": "string",
        "use_paywall_builder": true,
        "use_paywall_builder_v4": true,
        "screenshot": {
          "image_id": 0,
          "url": "http://example.com"
        },
        "builder_screenshot": {
          "image_id": 0,
          "url": "http://example.com"
        },
        "main_screenshot": {
          "image_id": 0,
          "url": "http://example.com"
        }
      },
      "values": [
        {
          "revenue": 0,
          "proceeds": 0,
          "net_revenue": 0,
          "purchases": 0,
          "trials": 0,
          "trials_cancelled": 0,
          "refunds": 0,
          "unique_subscribers": 0,
          "unique_paid_subscribers": 0,
          "views": 0,
          "unique_profiles_views": 0,
          "in_current_state": true,
          "arppu": 0,
          "arpas": 0,
          "apppu": 0,
          "appas": 0,
          "conversion_rate_purchases": 0,
          "conversion_rate_trials": 0,
          "conversion_rate_refunds": 0,
          "conversion_rate_purchases_by_users": 0,
          "conversion_rate_trials_by_users": 0,
          "period": "2019-08-24T14:15:22Z",
          "low_boundary": 0,
          "average_per_1000": 0,
          "upper_boundary": 0,
          "probability": 0
        }
      ],
      "weight": 0,
      "low_boundary": 0,
      "average_per_1000": 0,
      "upper_boundary": 0,
      "probability": 0
    }
  ],
  "paywalls_group": {
    "paywalls_group_id": "c0cb5b73-71c2-4250-9a48-b2e8da0c7144",
    "title": "string"
  }
}

```

</details>

**Properties** 

| Name                               | Type                                                   | Required           |
| ---------------------------------- | ------------------------------------------------------ | ------------------ |
| revenue                            | number                                                 | :heavy_minus_sign: |
| proceeds                           | number                                                 | :heavy_minus_sign: |
| net_revenue                        | number                                                 | :heavy_minus_sign: |
| purchases                          | integer                                                | :heavy_minus_sign: |
| trials                             | integer                                                | :heavy_minus_sign: |
| trials_cancelled                   | integer                                                | :heavy_minus_sign: |
| refunds                            | integer                                                | :heavy_minus_sign: |
| unique_subscribers                 | integer                                                | :heavy_minus_sign: |
| unique_paid_subscribers            | integer                                                | :heavy_minus_sign: |
| views                              | integer                                                | :heavy_minus_sign: |
| unique_profiles_views              | integer                                                | :heavy_minus_sign: |
| in_current_state                   | boolean                                                | :heavy_minus_sign: |
| arppu                              | number                                                 | :heavy_minus_sign: |
| arpas                              | number                                                 | :heavy_minus_sign: |
| apppu                              | number                                                 | :heavy_minus_sign: |
| appas                              | number                                                 | :heavy_minus_sign: |
| conversion_rate_purchases          | number                                                 | :heavy_minus_sign: |
| conversion_rate_trials             | number                                                 | :heavy_minus_sign: |
| conversion_rate_refunds            | number                                                 | :heavy_minus_sign: |
| conversion_rate_purchases_by_users | number                                                 | :heavy_minus_sign: |
| conversion_rate_trials_by_users    | number                                                 | :heavy_minus_sign: |
| items                              | array of [ABTestPaywallMetrics](#abtestpaywallmetrics) | :heavy_plus_sign:  |
| paywalls_group                     | [PaywallsGroup](#paywallsgroup)                        | :heavy_plus_sign:  |

### PaywallsGroupPaywall

<details>
 <summary>Example (click to expand)</summary>


```json
{
  "paywalls_group_paywall_id": "652d7bee-751c-4a11-b6de-6615a944c610",
  "paywalls_group_id": "c0cb5b73-71c2-4250-9a48-b2e8da0c7144",
  "paywall_id": "eeb111ae-cdbe-489f-9fe4-30a4b6109051",
  "ordering_index": 0
}

```

</details>

**Properties** 

| Name                      | Type         | Required           |
| ------------------------- | ------------ | ------------------ |
| paywalls_group_paywall_id | string(uuid) | :heavy_minus_sign: |
| paywalls_group_id         | string(uuid) | :heavy_minus_sign: |
| paywall_id                | string(uuid) | :heavy_plus_sign:  |
| ordering_index            | integer      | :heavy_plus_sign:  |

### PaywallsGroupPaywallAggregate

<details>
 <summary>Example (click to expand)</summary>


```json
{
  "paywalls_group_paywall": {
    "paywalls_group_paywall_id": "652d7bee-751c-4a11-b6de-6615a944c610",
    "paywalls_group_id": "c0cb5b73-71c2-4250-9a48-b2e8da0c7144",
    "paywall_id": "eeb111ae-cdbe-489f-9fe4-30a4b6109051",
    "ordering_index": 0
  },
  "paywall": {
    "paywall": {
      "paywall_id": "eeb111ae-cdbe-489f-9fe4-30a4b6109051",
      "title": "string",
      "use_paywall_builder": true,
      "use_paywall_builder_v4": true,
      "screenshot": {
        "image_id": 0,
        "url": "http://example.com"
      },
      "builder_screenshot": {
        "image_id": 0,
        "url": "http://example.com"
      },
      "main_screenshot": {
        "image_id": 0,
        "url": "http://example.com"
      }
    },
    "screenshot": {
      "image_id": 0,
      "url": "http://example.com"
    },
    "builder_screenshot": {
      "image_id": 0,
      "url": "http://example.com"
    },
    "products": [
      {
        "product_id": "0d012afa-f885-4e65-aeca-37e27701e2d1",
        "title": "string",
        "product_set": "uncategorised",
        "offer": {
          "product_offer_id": "beaf26e9-01fd-4b9a-a128-2872bf52e733",
          "title": "string"
        },
        "ordering_index": 0
      }
    ]
  }
}

```

</details>

**Properties** 

| Name                   | Type                                                | Required          | Description                                        |
| ---------------------- | --------------------------------------------------- | ----------------- | -------------------------------------------------- |
| paywalls_group_paywall | [PaywallsGroupPaywall](#paywallsgrouppaywall)       | :heavy_plus_sign: | none                                               |
| paywall                | [PaywallRelatedAggregate](#paywallrelatedaggregate) | :heavy_plus_sign: | Difference with state of included pydantic fields. |

### PaywallsGroupState

<details>
 <summary>Example (click to expand)</summary>


```json
"live"

```

</details>

**Properties** 

| Name               | Type   | Required           | Description     |
| ------------------ | ------ | ------------------ | --------------- |
| PaywallsGroupState | string | :heavy_minus_sign: | An enumeration. |

**Enumerated Values** 

| Property           | Value    |
| ------------------ | -------- |
| PaywallsGroupState | live     |
| PaywallsGroupState | inactive |
| PaywallsGroupState | draft    |
| PaywallsGroupState | archived |

### PeriodUnit

<details>
 <summary>Example (click to expand)</summary>


```json
"day"

```

</details>

**Properties** 

| Name       | Type   | Required           | Description     |
| ---------- | ------ | ------------------ | --------------- |
| PeriodUnit | string | :heavy_minus_sign: | An enumeration. |

**Enumerated Values** 

| Property   | Value   |
| ---------- | ------- |
| PeriodUnit | day     |
| PeriodUnit | week    |
| PeriodUnit | month   |
| PeriodUnit | quarter |
| PeriodUnit | year    |

### Placement

<details>
 <summary>Example (click to expand)</summary>


```json
{
  "placement_id": "d98659e8-3eb1-4328-89b6-1848d40b4461",
  "title": "string",
  "created_at": "2019-08-24T14:15:22Z"
}

```

</details>

**Properties** 

| Name         | Type              | Required          |
| ------------ | ----------------- | ----------------- |
| placement_id | string(uuid)      | :heavy_plus_sign: |
| title        | string            | :heavy_plus_sign: |
| created_at   | string(date-time) | :heavy_plus_sign: |

### PlacementAudienceContentType

<details>
 <summary>Example (click to expand)</summary>


```json
"ab_test"

```

</details>

**Properties** 

| Name                         | Type   | Required           | Description     |
| ---------------------------- | ------ | ------------------ | --------------- |
| PlacementAudienceContentType | string | :heavy_minus_sign: | An enumeration. |

**Enumerated Values** 

| Property                     | Value                                       |
| ---------------------------- | ------------------------------------------- |
| PlacementAudienceContentType | <ul><li> ab_test</li><li> paywall</li></ul> |

### PlacementAudienceData

<details>
 <summary>Example (click to expand)</summary>


```json
{
  "segments": [
    {
      "segment_id": "0dbbf761-5b2d-4647-8bfa-2b714456749c"
    }
  ],
  "priority": 0,
  "content_id": "713e4c61-5a69-43fb-a600-2e2699462e14",
  "content_type": "ab_test"
}

```

</details>

**Properties** 

| Name       | Type                                                         | Required          | Description                                                  |
| ---------- | ------------------------------------------------------------ | ----------------- | ------------------------------------------------------------ |
| segments   | array of [PlacementAudienceSegment](#placementaudiencesegment) | :heavy_plus_sign: | Annotation:     This object is immutable dataset.  @dataclass(frozen=True) |
| priority   | integer                                                      | :heavy_plus_sign: |                                                              |
| content_id | anyOf type: string(uuid)                                     | :heavy_plus_sign: |                                                              |
| content_type | [PlacementContentType](#placementcontenttype) | :heavy_minus_sign: | An enumeration. |

### PlacementAudienceSegment

<details>
 <summary>Example (click to expand)</summary>


```json
{
  "segment_id": "0dbbf761-5b2d-4647-8bfa-2b714456749c"
}

```

</details>

**Properties** 

| Name       | Type         | Required          |
| ---------- | ------------ | ----------------- |
| segment_id | string(uuid) | :heavy_plus_sign: |

### PlacementContentType

<details>
 <summary>Example (click to expand)</summary>


```json
"ab_test"

```

</details>

**Properties** 

| Name                 | Type   | Required           | Description     |
| -------------------- | ------ | ------------------ | --------------- |
| PlacementContentType | string | :heavy_minus_sign: | An enumeration. |

**Enumerated Values** 

| Property             | Value                                       |
| -------------------- | ------------------------------------------- |
| PlacementContentType | <ul><li> ab_test</li><li> paywall</li></ul> |

### PlacementData

<details>
 <summary>Example (click to expand)</summary>


```json
{
  "title": "string",
  "developer_id": "string",
  "audiences": [
    {
      "segments": [
        {
          "segment_id": "0dbbf761-5b2d-4647-8bfa-2b714456749c"
        }
      ],
      "priority": 0,
      "content_id": "713e4c61-5a69-43fb-a600-2e2699462e14",
      "content_type": "ab_test"
    }
  ]
}

```

</details>

**Properties** 

| Name         | Type                                                     | Required          | Description                                                  |
| ------------ | -------------------------------------------------------- | ----------------- | ------------------------------------------------------------ |
| title        | string                                                   | :heavy_plus_sign: |                                                              |
| developer_id | string                                                   | :heavy_plus_sign: |                                                              |
| audiences    | array of [PlacementAudienceData](#placementaudiencedata) | :heavy_plus_sign: | Annotation:     This object is immutable dataset.  @dataclass(frozen=True) |

### PlacementDetailMetricsCollection

<details>
 <summary>Example (click to expand)</summary>


```json
{
  "metrics": {
    "revenue": 0,
    "proceeds": 0,
    "net_revenue": 0,
    "purchases": 0,
    "trials": 0,
    "trials_cancelled": 0,
    "refunds": 0,
    "unique_subscribers": 0,
    "unique_paid_subscribers": 0,
    "views": 0,
    "unique_profiles_views": 0,
    "in_current_state": true,
    "arppu": 0,
    "arpas": 0,
    "apppu": 0,
    "appas": 0,
    "conversion_rate_purchases": 0,
    "conversion_rate_trials": 0,
    "conversion_rate_refunds": 0,
    "conversion_rate_purchases_by_users": 0,
    "conversion_rate_trials_by_users": 0,
    "items": [
      {
        "revenue": 0,
        "proceeds": 0,
        "net_revenue": 0,
        "purchases": 0,
        "trials": 0,
        "trials_cancelled": 0,
        "refunds": 0,
        "unique_subscribers": 0,
        "unique_paid_subscribers": 0,
        "views": 0,
        "unique_profiles_views": 0,
        "in_current_state": true,
        "arppu": 0,
        "arpas": 0,
        "apppu": 0,
        "appas": 0,
        "conversion_rate_purchases": 0,
        "conversion_rate_trials": 0,
        "conversion_rate_refunds": 0,
        "conversion_rate_purchases_by_users": 0,
        "conversion_rate_trials_by_users": 0
      }
    ],
    "title": "Total"
  },
  "placement": {
    "placement_id": "d98659e8-3eb1-4328-89b6-1848d40b4461",
    "title": "string",
    "created_at": "2019-08-24T14:15:22Z"
  },
  "based_on": "audience",
  "segmentation_by": "product"
}

```

</details>

**Properties** 

| Name            | Type                                                         | Required           | Description     |
| --------------- | ------------------------------------------------------------ | ------------------ | --------------- |
| metrics         | [InAppDetailTotalMetrics](#inappdetailtotalmetrics)          | :heavy_plus_sign:  |                 |
| placement       | [Placement](#placement)                                      | :heavy_plus_sign:  |                 |
| based_on        | [InAppDetailMetricsBasedOn](#inappdetailmetricsbasedon)      | :heavy_minus_sign: | An enumeration. |
| segmentation_by | [InAppDetailMetricsSegmentation](#inappdetailmetricssegmentation) | :heavy_minus_sign: | An enumeration. |

### PlacementDetailMetricsResponse

<details>
 <summary>Example (click to expand)</summary>


```json
{
  "data": {
    "metrics": {
      "revenue": 0,
      "proceeds": 0,
      "net_revenue": 0,
      "purchases": 0,
      "trials": 0,
      "trials_cancelled": 0,
      "refunds": 0,
      "unique_subscribers": 0,
      "unique_paid_subscribers": 0,
      "views": 0,
      "unique_profiles_views": 0,
      "in_current_state": true,
      "arppu": 0,
      "arpas": 0,
      "apppu": 0,
      "appas": 0,
      "conversion_rate_purchases": 0,
      "conversion_rate_trials": 0,
      "conversion_rate_refunds": 0,
      "conversion_rate_purchases_by_users": 0,
      "conversion_rate_trials_by_users": 0,
      "items": [
        {
          "revenue": 0,
          "proceeds": 0,
          "net_revenue": 0,
          "purchases": 0,
          "trials": 0,
          "trials_cancelled": 0,
          "refunds": 0,
          "unique_subscribers": 0,
          "unique_paid_subscribers": 0,
          "views": 0,
          "unique_profiles_views": 0,
          "in_current_state": true,
          "arppu": 0,
          "arpas": 0,
          "apppu": 0,
          "appas": 0,
          "conversion_rate_purchases": 0,
          "conversion_rate_trials": 0,
          "conversion_rate_refunds": 0,
          "conversion_rate_purchases_by_users": 0,
          "conversion_rate_trials_by_users": 0
        }
      ],
      "title": "Total"
    },
    "placement": {
      "placement_id": "d98659e8-3eb1-4328-89b6-1848d40b4461",
      "title": "string",
      "created_at": "2019-08-24T14:15:22Z"
    },
    "based_on": "audience",
    "segmentation_by": "product"
  },
  "meta": {
    "pagination": {
      "count": 0,
      "page": 0,
      "pages_count": 0
    }
  }
}

```

</details>

**Properties** 

| Name | Type                                                         | Required           |
| ---- | ------------------------------------------------------------ | ------------------ |
| data | [PlacementDetailMetricsCollection](#placementdetailmetricscollection) | :heavy_plus_sign:  |
| meta | [Meta](#meta)                                                | :heavy_minus_sign: |

### PlacementDetailTotalMetricsCollection

<details>
 <summary>Example (click to expand)</summary>


```json
{
  "metrics": [
    {
      "revenue": 0,
      "proceeds": 0,
      "net_revenue": 0,
      "purchases": 0,
      "trials": 0,
      "trials_cancelled": 0,
      "refunds": 0,
      "unique_subscribers": 0,
      "unique_paid_subscribers": 0,
      "views": 0,
      "unique_profiles_views": 0,
      "in_current_state": true,
      "arppu": 0,
      "arpas": 0,
      "apppu": 0,
      "appas": 0,
      "conversion_rate_purchases": 0,
      "conversion_rate_trials": 0,
      "conversion_rate_refunds": 0,
      "conversion_rate_purchases_by_users": 0,
      "conversion_rate_trials_by_users": 0,
      "items": [
        {
          "revenue": 0,
          "proceeds": 0,
          "net_revenue": 0,
          "purchases": 0,
          "trials": 0,
          "trials_cancelled": 0,
          "refunds": 0,
          "unique_subscribers": 0,
          "unique_paid_subscribers": 0,
          "views": 0,
          "unique_profiles_views": 0,
          "in_current_state": true,
          "arppu": 0,
          "arpas": 0,
          "apppu": 0,
          "appas": 0,
          "conversion_rate_purchases": 0,
          "conversion_rate_trials": 0,
          "conversion_rate_refunds": 0,
          "conversion_rate_purchases_by_users": 0,
          "conversion_rate_trials_by_users": 0,
          "items": [
            {
              "revenue": 0,
              "proceeds": 0,
              "net_revenue": 0,
              "purchases": 0,
              "trials": 0,
              "trials_cancelled": 0,
              "refunds": 0,
              "unique_subscribers": 0,
              "unique_paid_subscribers": 0,
              "views": 0,
              "unique_profiles_views": 0,
              "in_current_state": true,
              "arppu": 0,
              "arpas": 0,
              "apppu": 0,
              "appas": 0,
              "conversion_rate_purchases": 0,
              "conversion_rate_trials": 0,
              "conversion_rate_refunds": 0,
              "conversion_rate_purchases_by_users": 0,
              "conversion_rate_trials_by_users": 0,
              "items": [
                {
                  "revenue": 0,
                  "proceeds": 0,
                  "net_revenue": 0,
                  "purchases": 0,
                  "trials": 0,
                  "trials_cancelled": 0,
                  "refunds": 0,
                  "unique_subscribers": 0,
                  "unique_paid_subscribers": 0,
                  "views": 0,
                  "unique_profiles_views": 0,
                  "in_current_state": true,
                  "arppu": 0,
                  "arpas": 0,
                  "apppu": 0,
                  "appas": 0,
                  "conversion_rate_purchases": 0,
                  "conversion_rate_trials": 0,
                  "conversion_rate_refunds": 0,
                  "conversion_rate_purchases_by_users": 0,
                  "conversion_rate_trials_by_users": 0,
                  "items": [
                    {}
                  ],
                  "title": "string",
                  "paywall": {
                    "paywall_id": "eeb111ae-cdbe-489f-9fe4-30a4b6109051",
                    "title": "string",
                    "use_paywall_builder": true,
                    "use_paywall_builder_v4": true,
                    "screenshot": {},
                    "builder_screenshot": {},
                    "main_screenshot": {}
                  },
                  "values": [
                    {}
                  ],
                  "weight": 0,
                  "low_boundary": 0,
                  "average_per_1000": 0,
                  "upper_boundary": 0,
                  "probability": 0
                }
              ],
              "paywalls_group": {
                "paywalls_group_id": "c0cb5b73-71c2-4250-9a48-b2e8da0c7144",
                "title": "string"
              }
            }
          ],
          "ab_test": {
            "ab_test_id": "c681ac9d-21b4-4f88-8060-10a3639bfde7",
            "title": "string",
            "goal": "string",
            "paywalls_group": {
              "paywalls_group_id": "c0cb5b73-71c2-4250-9a48-b2e8da0c7144",
              "title": "string"
            },
            "created_at": "2019-08-24T14:15:22Z"
          },
          "predict": {
            "certainty": true,
            "probabilities": [
              {
                "property1": 0,
                "property2": 0
              }
            ]
          },
          "content_type": "ab_test"
        }
      ],
      "audience": {
        "audience_id": "875075bb-caff-4035-8f5f-9fb1430dc417",
        "title": "string",
        "is_default": true
      },
      "title": "string"
    }
  ],
  "placement": {
    "placement_id": "d98659e8-3eb1-4328-89b6-1848d40b4461",
    "title": "string",
    "created_at": "2019-08-24T14:15:22Z"
  }
}

```

</details>

**Properties** 

| Name      | Type                                                         | Required          |
| --------- | ------------------------------------------------------------ | ----------------- |
| metrics   | array of [AudienceBasedDetailMetrics](#audiencebaseddetailmetrics) | :heavy_plus_sign: |
| placement | [Placement](#placement)                                      | :heavy_plus_sign: |

### PlacementDetailTotalMetricsResponse

<details>
 <summary>Example (click to expand)</summary>


```json
{
  "data": {
    "metrics": [
      {
        "revenue": 0,
        "proceeds": 0,
        "net_revenue": 0,
        "purchases": 0,
        "trials": 0,
        "trials_cancelled": 0,
        "refunds": 0,
        "unique_subscribers": 0,
        "unique_paid_subscribers": 0,
        "views": 0,
        "unique_profiles_views": 0,
        "in_current_state": true,
        "arppu": 0,
        "arpas": 0,
        "apppu": 0,
        "appas": 0,
        "conversion_rate_purchases": 0,
        "conversion_rate_trials": 0,
        "conversion_rate_refunds": 0,
        "conversion_rate_purchases_by_users": 0,
        "conversion_rate_trials_by_users": 0,
        "items": [
          {
            "revenue": 0,
            "proceeds": 0,
            "net_revenue": 0,
            "purchases": 0,
            "trials": 0,
            "trials_cancelled": 0,
            "refunds": 0,
            "unique_subscribers": 0,
            "unique_paid_subscribers": 0,
            "views": 0,
            "unique_profiles_views": 0,
            "in_current_state": true,
            "arppu": 0,
            "arpas": 0,
            "apppu": 0,
            "appas": 0,
            "conversion_rate_purchases": 0,
            "conversion_rate_trials": 0,
            "conversion_rate_refunds": 0,
            "conversion_rate_purchases_by_users": 0,
            "conversion_rate_trials_by_users": 0,
            "items": [
              {
                "revenue": 0,
                "proceeds": 0,
                "net_revenue": 0,
                "purchases": 0,
                "trials": 0,
                "trials_cancelled": 0,
                "refunds": 0,
                "unique_subscribers": 0,
                "unique_paid_subscribers": 0,
                "views": 0,
                "unique_profiles_views": 0,
                "in_current_state": true,
                "arppu": 0,
                "arpas": 0,
                "apppu": 0,
                "appas": 0,
                "conversion_rate_purchases": 0,
                "conversion_rate_trials": 0,
                "conversion_rate_refunds": 0,
                "conversion_rate_purchases_by_users": 0,
                "conversion_rate_trials_by_users": 0,
                "items": [
                  {
                    "revenue": 0,
                    "proceeds": 0,
                    "net_revenue": 0,
                    "purchases": 0,
                    "trials": 0,
                    "trials_cancelled": 0,
                    "refunds": 0,
                    "unique_subscribers": 0,
                    "unique_paid_subscribers": 0,
                    "views": 0,
                    "unique_profiles_views": 0,
                    "in_current_state": true,
                    "arppu": 0,
                    "arpas": 0,
                    "apppu": 0,
                    "appas": 0,
                    "conversion_rate_purchases": 0,
                    "conversion_rate_trials": 0,
                    "conversion_rate_refunds": 0,
                    "conversion_rate_purchases_by_users": 0,
                    "conversion_rate_trials_by_users": 0,
                    "items": [],
                    "title": "string",
                    "paywall": {},
                    "values": [],
                    "weight": 0,
                    "low_boundary": 0,
                    "average_per_1000": 0,
                    "upper_boundary": 0,
                    "probability": 0
                  }
                ],
                "paywalls_group": {
                  "paywalls_group_id": "c0cb5b73-71c2-4250-9a48-b2e8da0c7144",
                  "title": "string"
                }
              }
            ],
            "ab_test": {
              "ab_test_id": "c681ac9d-21b4-4f88-8060-10a3639bfde7",
              "title": "string",
              "goal": "string",
              "paywalls_group": {
                "paywalls_group_id": "c0cb5b73-71c2-4250-9a48-b2e8da0c7144",
                "title": "string"
              },
              "created_at": "2019-08-24T14:15:22Z"
            },
            "predict": {
              "certainty": true,
              "probabilities": [
                {
                  "property1": 0,
                  "property2": 0
                }
              ]
            },
            "content_type": "ab_test"
          }
        ],
        "audience": {
          "audience_id": "875075bb-caff-4035-8f5f-9fb1430dc417",
          "title": "string",
          "is_default": true
        },
        "title": "string"
      }
    ],
    "placement": {
      "placement_id": "d98659e8-3eb1-4328-89b6-1848d40b4461",
      "title": "string",
      "created_at": "2019-08-24T14:15:22Z"
    }
  },
  "meta": {
    "pagination": {
      "count": 0,
      "page": 0,
      "pages_count": 0
    }
  }
}

```

</details>

**Properties** 

| Name | Type                                                         | Required           |
| ---- | ------------------------------------------------------------ | ------------------ |
| data | [PlacementDetailTotalMetricsCollection](#placementdetailtotalmetricscollection) | :heavy_plus_sign:  |
| meta | [Meta](#meta)                                                | :heavy_minus_sign: |

### PlacementListMetrics

<details>
 <summary>Example (click to expand)</summary>


```json
{
  "revenue": 0,
  "proceeds": 0,
  "net_revenue": 0,
  "purchases": 0,
  "trials": 0,
  "trials_cancelled": 0,
  "refunds": 0,
  "unique_subscribers": 0,
  "unique_paid_subscribers": 0,
  "views": 0,
  "unique_profiles_views": 0,
  "in_current_state": true,
  "arppu": 0,
  "arpas": 0,
  "apppu": 0,
  "appas": 0,
  "conversion_rate_purchases": 0,
  "conversion_rate_trials": 0,
  "conversion_rate_refunds": 0,
  "conversion_rate_purchases_by_users": 0,
  "conversion_rate_trials_by_users": 0,
  "placement_id": "d98659e8-3eb1-4328-89b6-1848d40b4461"
}

```

</details>

**Properties** 

| Name                               | Type         | Required           |
| ---------------------------------- | ------------ | ------------------ |
| revenue                            | number       | :heavy_minus_sign: |
| proceeds                           | number       | :heavy_minus_sign: |
| net_revenue                        | number       | :heavy_minus_sign: |
| purchases                          | integer      | :heavy_minus_sign: |
| trials                             | integer      | :heavy_minus_sign: |
| trials_cancelled                   | integer      | :heavy_minus_sign: |
| refunds                            | integer      | :heavy_minus_sign: |
| unique_subscribers                 | integer      | :heavy_minus_sign: |
| unique_paid_subscribers            | integer      | :heavy_minus_sign: |
| views                              | integer      | :heavy_minus_sign: |
| unique_profiles_views              | integer      | :heavy_minus_sign: |
| in_current_state                   | boolean      | :heavy_minus_sign: |
| arppu                              | number       | :heavy_minus_sign: |
| arpas                              | number       | :heavy_minus_sign: |
| apppu                              | number       | :heavy_minus_sign: |
| appas                              | number       | :heavy_minus_sign: |
| conversion_rate_purchases          | number       | :heavy_minus_sign: |
| conversion_rate_trials             | number       | :heavy_minus_sign: |
| conversion_rate_refunds            | number       | :heavy_minus_sign: |
| conversion_rate_purchases_by_users | number       | :heavy_minus_sign: |
| conversion_rate_trials_by_users    | number       | :heavy_minus_sign: |
| placement_id                       | string(uuid) | :heavy_plus_sign:  |

### PlacementListMetricsCollection

<details>
 <summary>Example (click to expand)</summary>


```json
{
  "data": [
    {
      "revenue": 0,
      "proceeds": 0,
      "net_revenue": 0,
      "purchases": 0,
      "trials": 0,
      "trials_cancelled": 0,
      "refunds": 0,
      "unique_subscribers": 0,
      "unique_paid_subscribers": 0,
      "views": 0,
      "unique_profiles_views": 0,
      "in_current_state": true,
      "arppu": 0,
      "arpas": 0,
      "apppu": 0,
      "appas": 0,
      "conversion_rate_purchases": 0,
      "conversion_rate_trials": 0,
      "conversion_rate_refunds": 0,
      "conversion_rate_purchases_by_users": 0,
      "conversion_rate_trials_by_users": 0,
      "placement_id": "d98659e8-3eb1-4328-89b6-1848d40b4461"
    }
  ],
  "meta": {
    "pagination": {
      "count": 0,
      "page": 0,
      "pages_count": 0
    }
  }
}

```

</details>

**Properties** 

| Name | Type                                                   | Required           |
| ---- | ------------------------------------------------------ | ------------------ |
| data | array of [PlacementListMetrics](#placementlistmetrics) | :heavy_plus_sign:  |
| meta | [Meta](#meta)                                          | :heavy_minus_sign: |

### Points

<details>
 <summary>Example (click to expand)</summary>


```json
{
  "x0": 0,
  "y0": 0,
  "x1": 0,
  "y1": 0
}

```

</details>

**Properties** 

| Name | Type   | Required          |
| ---- | ------ | ----------------- |
| x0   | number | :heavy_plus_sign: |
| y0   | number | :heavy_plus_sign: |
| x1   | number | :heavy_plus_sign: |
| y1   | number | :heavy_plus_sign: |

### Product

<details>
 <summary>Example (click to expand)</summary>


```json
{
  "product_id": "string",
  "type": "product",
  "order": 0
}

```

</details>

**Properties** 

| Name       | Type    | Required           |
| ---------- | ------- | ------------------ |
| product_id | string  | :heavy_plus_sign:  |
| type       | string  | :heavy_plus_sign:  |
| order      | integer | :heavy_minus_sign: |

**Enumerated Values** 

| Property | Value   |
| -------- | ------- |
| type     | product |

### ProductCategory

<details>
 <summary>Example (click to expand)</summary>


```json
"weekly"

```

</details>

**Properties** 

| Name            | Type   | Required           | Description     |
| --------------- | ------ | ------------------ | --------------- |
| ProductCategory | string | :heavy_minus_sign: | An enumeration. |

**Enumerated Values** 

| Property        | Value            |
| --------------- | ---------------- |
| ProductCategory | weekly           |
| ProductCategory | monthly          |
| ProductCategory | trimonthly       |
| ProductCategory | semiannual       |
| ProductCategory | annual           |
| ProductCategory | lifetime         |
| ProductCategory | uncategorised    |
| ProductCategory | nonsubscriptions |
| ProductCategory | two_months       |
| ProductCategory | consumable       |

### ProductOffer

<details>
 <summary>Example (click to expand)</summary>


```json
{
  "product_offer_id": "beaf26e9-01fd-4b9a-a128-2872bf52e733",
  "title": "string"
}

```

</details>

**Properties** 

| Name             | Type         | Required          |
| ---------------- | ------------ | ----------------- |
| product_offer_id | string(uuid) | :heavy_plus_sign: |
| title            | string       | :heavy_plus_sign: |

### ProductsBlock

<details>
 <summary>Example (click to expand)</summary>
```json
{
  "type": "single",
  "main_product_index": 0,
  "products": [
    {
      "product_id": "string",
      "type": "product",
      "order": 0
    }
  ]
}
</details>

**Properties** 

| Name               | Type                                    | Required           | Description     |
| ------------------ | --------------------------------------- | ------------------ | --------------- |
| type               | [ProductsBlockType](#productsblocktype) | :heavy_plus_sign:  | An enumeration. |
| main_product_index | integer                                 | :heavy_minus_sign: |                 |
| products           | Array of [Product](#product)            | :heavy_minus_sign: |                 |

### ProductsBlockType

<details>
 <summary>Example (click to expand)</summary>

```
```json
"single"

```

</details>

**Properties** 

| Name              | Type   | Required           | Description     |
| ----------------- | ------ | ------------------ | --------------- |
| ProductsBlockType | string | :heavy_minus_sign: | An enumeration. |

**Enumerated Values** 

| Property          | Value      |
| ----------------- | ---------- |
| ProductsBlockType | single     |
| ProductsBlockType | vertical   |
| ProductsBlockType | horizontal |

### ProfileIntegrationIdentifiersData

<details>
 <summary>Example (click to expand)</summary>


```json
{
  "profile_id": "bfcb6779-b1f9-41fc-92d7-88f8bc1d12e8",
  "facebook_anonymous_id": "string",
  "amplitude_user_id": "string",
  "amplitude_device_id": "string",
  "mixpanel_user_id": "string",
  "appmetrica_profile_id": "string",
  "appmetrica_device_id": "string",
  "one_signal_player_id": "string",
  "one_signal_subscription_id": "string",
  "pushwoosh_hwid": "string",
  "firebase_app_instance_id": "string",
  "airbridge_device_id": "string",
  "appsflyer_id": "string",
  "branch_id": "string",
  "adjust_device_id": "string"
}

```

</details>

**Properties** 

| Name                       | Type         | Required           |
| -------------------------- | ------------ | ------------------ |
| profile_id                 | string(uuid) | :heavy_plus_sign:  |
| facebook_anonymous_id      | string       | :heavy_minus_sign: |
| amplitude_user_id          | string       | :heavy_minus_sign: |
| amplitude_device_id        | string       | :heavy_minus_sign: |
| mixpanel_user_id           | string       | :heavy_minus_sign: |
| appmetrica_profile_id      | string       | :heavy_minus_sign: |
| appmetrica_device_id       | string       | :heavy_minus_sign: |
| one_signal_player_id       | string       | :heavy_minus_sign: |
| one_signal_subscription_id | string       | :heavy_minus_sign: |
| pushwoosh_hwid             | string       | :heavy_minus_sign: |
| firebase_app_instance_id   | string       | :heavy_minus_sign: |
| airbridge_device_id        | string       | :heavy_minus_sign: |
| appsflyer_id               | string       | :heavy_minus_sign: |
| branch_id                  | string       | :heavy_minus_sign: |
| adjust_device_id           | string       | :heavy_minus_sign: |

### ProfileTestUser

<details>
 <summary>Example (click to expand)</summary>


```json
{
  "test_user_id": "string",
  "user_name": "string",
  "id_type": "profile_id",
  "id_value": "string",
  "app_id": "affd1d10-9538-4fc8-9e0b-4594a28c1335"
}

```

</details>

**Properties** 

| Name         | Type                                        | Required           | Description     |
| ------------ | ------------------------------------------- | ------------------ | --------------- |
| test_user_id | string                                      | :heavy_minus_sign: |                 |
| user_name    | string                                      | :heavy_plus_sign:  |                 |
| id_type      | [ProfileTestUserType](#profiletestusertype) | :heavy_plus_sign:  | An enumeration. |
| id_value     | string                                      | :heavy_plus_sign:  |                 |
| app_id       | string(uuid)                                | :heavy_plus_sign:  |                 |

### ProfileTestUserListResponse

<details>
 <summary>Example (click to expand)</summary>


```json
{
  "data": [
    {
      "test_user_id": "string",
      "user_name": "string",
      "id_type": "profile_id",
      "id_value": "string",
      "app_id": "affd1d10-9538-4fc8-9e0b-4594a28c1335"
    }
  ]
}

```

</details>

**Properties** 

| Name | Type                                         | Required           |
| ---- | -------------------------------------------- | ------------------ |
| data | Array of [ProfileTestUser](#profiletestuser) | :heavy_minus_sign: |

### ProfileTestUserRequest

<details>
 <summary>Example (click to expand)</summary>


```json
{
  "data": {
    "test_user_id": "string",
    "user_name": "string",
    "id_type": "profile_id",
    "id_value": "string",
    "app_id": "affd1d10-9538-4fc8-9e0b-4594a28c1335"
  }
}

```

</details>

**Properties** 

| Name | Type                                | Required          |
| ---- | ----------------------------------- | ----------------- |
| data | [ProfileTestUser](#profiletestuser) | :heavy_plus_sign: |

### ProfileTestUserResponse

<details>
 <summary>Example (click to expand)</summary>


```json
{
  "data": {
    "test_user_id": "string",
    "user_name": "string",
    "id_type": "profile_id",
    "id_value": "string",
    "app_id": "affd1d10-9538-4fc8-9e0b-4594a28c1335"
  }
}

```

</details>

**Properties** 

| Name | Type                                | Required           |
| ---- | ----------------------------------- | ------------------ |
| data | [ProfileTestUser](#profiletestuser) | :heavy_minus_sign: |

### ProfileTestUserType

<details>
 <summary>Example (click to expand)</summary>


```json
"profile_id"

```

</details>

**Properties** 

| Name                | Type   | Required           | Description     |
| ------------------- | ------ | ------------------ | --------------- |
| ProfileTestUserType | string | :heavy_minus_sign: | An enumeration. |

**Enumerated Values** 

| Property            | Value            |
| ------------------- | ---------------- |
| ProfileTestUserType | profile_id       |
| ProfileTestUserType | customer_user_id |
| ProfileTestUserType | idfa             |
| ProfileTestUserType | idfv             |
| ProfileTestUserType | advertising_id   |
| ProfileTestUserType | android_id       |

### ProfilesCountingMethod

<details>
 <summary>Example (click to expand)</summary>


```json
"profile_id"

```

</details>

**Properties** 

| Name                   | Type   | Required           | Description     |
| ---------------------- | ------ | ------------------ | --------------- |
| ProfilesCountingMethod | string | :heavy_minus_sign: | An enumeration. |

**Enumerated Values** 

| Property               | Value            |
| ---------------------- | ---------------- |
| ProfilesCountingMethod | profile_id       |
| ProfilesCountingMethod | customer_user_id |
| ProfilesCountingMethod | device_id        |

### RenewalPeriodType

<details>
 <summary>Example (click to expand)</summary>


```json
"renewals"

```

</details>

**Properties** 

| Name              | Type   | Required           | Description     |
| ----------------- | ------ | ------------------ | --------------- |
| RenewalPeriodType | string | :heavy_minus_sign: | An enumeration. |

**Enumerated Values** 

| Property          | Value    |
| ----------------- | -------- |
| RenewalPeriodType | renewals |
| RenewalPeriodType | days     |

### ReplaceInPlacementData

<details>
 <summary>Example (click to expand)</summary>


```json
{
  "data": [
    {
      "placement_id": "d98659e8-3eb1-4328-89b6-1848d40b4461",
      "audience_id": "875075bb-caff-4035-8f5f-9fb1430dc417",
      "paywall_id": "eeb111ae-cdbe-489f-9fe4-30a4b6109051"
    }
  ]
}

```

</details>

**Properties** 

| Name | Type                                                         | Required          | Description                                                  |
| ---- | ------------------------------------------------------------ | ----------------- | ------------------------------------------------------------ |
| data | Array of [ReplacePlacementAudiencePaywallData](#replaceplacementaudiencepaywalldata) | :heavy_plus_sign: | Annotation:     This object is immutable dataset.  @dataclass(frozen=True) |

### ReplacePlacementAudiencePaywallData

<details>
 <summary>Example (click to expand)</summary>


```json
{
  "placement_id": "d98659e8-3eb1-4328-89b6-1848d40b4461",
  "audience_id": "875075bb-caff-4035-8f5f-9fb1430dc417",
  "paywall_id": "eeb111ae-cdbe-489f-9fe4-30a4b6109051"
}

```

</details>

**Properties** 

| Name         | Type         | Required          |
| ------------ | ------------ | ----------------- |
| placement_id | string(uuid) | :heavy_plus_sign: |
| audience_id  | string(uuid) | :heavy_plus_sign: |
| paywall_id   | string(uuid) | :heavy_plus_sign: |

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

| Name         | Type                                    | Required           | Description     |
| ------------ | --------------------------------------- | ------------------ | --------------- |
| filters      | [MetricsFilters](#metricsfilters)       | :heavy_plus_sign:  |                 |
| format       | [MetricsFormat](#metricsformat)         | :heavy_minus_sign: | An enumeration. |
| period_unit  | [PeriodUnit](#periodunit)               | :heavy_minus_sign: | An enumeration. |
| period_type  | [RenewalPeriodType](#renewalperiodtype) | :heavy_minus_sign: | An enumeration. |
| segmentation | [LTVSegmentation](#ltvsegmentation)     | :heavy_minus_sign: | An enumeration. |
| value_type   | [CohortValueType](#cohortvaluetype)     | :heavy_minus_sign: | An enumeration. |

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
</details>

**Properties** 

| Name            | Type                                                  | Required           | Description     |
| --------------- | ----------------------------------------------------- | ------------------ | --------------- |
| filters         | [MetricsFilters](#metricsfilters)                     | :heavy_plus_sign:  |                 |
| period_unit     | [PeriodUnit](#periodunit)                             | :heavy_minus_sign: | An enumeration. |
| date_type       | [DateType](#datetype)                                 | :heavy_minus_sign: | An enumeration. |
| segmentation_by | [ChartMetricsSegmentation](#chartmetricssegmentation) | :heavy_minus_sign: | An enumeration. |
| use_trial       | boolean                                               | :heavy_minus_sign: |                 |
| value_type      | [CohortValueType](#cohortvaluetype)                   | :heavy_minus_sign: | An enumeration. |
| format          | [MetricsFormat](#metricsformat)                       | :heavy_minus_sign: | An enumeration. |

### RetentionMetricsRequest

<details>
 <summary>Example (click to expand)</summary>

```
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

| Name         | Type                          | Required           | Description                                                  |
| ------------ | ----------------------------- | ------------------ | ------------------------------------------------------------ |
| filters      | [ChartFilters](#chartfilters) | :heavy_plus_sign:  | none                                                         |
| segmentation | string                        | :heavy_minus_sign: | * `period` - Period * `renewal_status` - Renewal status * `cancellation_reason` - Cancellation reason * `store_product_id` - Store product id * `country` - Country * `store` - Store * `purchase_container_id` - Purchase container id * `paywall_id` - Paywall id * `audience_id` - Audience id * `placement_id` - Placement id * `attribution_source` - Attribution source * `attribution_status` - Attribution status * `attribution_channel` - Attribution channel * `attribution_campaign` - Attribution campaign * `attribution_adgroup` - Attribution adgroup * `attribution_adset` - Attribution adset * `attribution_creative` - Attribution creative * `duration` - Duration * `day` - Day * `week` - Week * `month` - Month * `year` - Year |
| use_trial    | boolean                       | :heavy_minus_sign: | none                                                         |

**Enumerated Values** 

| Property     | Value                                                        |
| ------------ | ------------------------------------------------------------ |
| segmentation | <ul><li> `period` - Period</li><li> `renewal_status` - Renewal status</li><li> `cancellation_reason` - Cancellation reason</li><li> `store_product_id` - Store product id</li> <li> `country` - Country</li><li> `store` - Store</li><li> `purchase_container_id` - Purchase container id</li><li> `paywall_id` - Paywall id</li><li>  `audience_id` - Audience id</li><li> `placement_id` - Placement id</li><li>  `attribution_source` - Attribution source</li><li>  `attribution_status` - Attribution status</li><li>  `attribution_channel` - Attribution channel</li><li>  `attribution_campaign` - Attribution campaign</li><li>  `attribution_adgroup` - Attribution adgroup</li><li>  `attribution_adset` - Attribution adset</li><li>  `attribution_creative` - Attribution creative</li><li>  `duration` - Duration</li><li>  `day` - Day</li><li>  `week` - Week</li><li>  `month` - Month</li><li>  `year` - Year</li></ul> |

### RichText

<details>
 <summary>Example (click to expand)</summary>


```json
[
  "string"
]

```

</details>

**Properties** 

| Name     | Type                                                         | Required           | Description                                                  |
| -------- | ------------------------------------------------------------ | ------------------ | ------------------------------------------------------------ |
| RichText | anyOf: (array of [RichTextText](#richtexttext), [RichTextTag](#richtexttag), or [RichTextImage](#richtextimage)) or [RichTextText](#richtexttext) | :heavy_minus_sign: | Can be an array containing a mix of `RichTextText`, `RichTextTag`, or `RichTextImage` objects, or a single instance of `RichTextText`. |

### RichTextAttributes

<details>
 <summary>Example (click to expand)</summary>


```json
{
  "font": "string",
  "size": 0,
  "strike": true,
  "underline": true,
  "color": "string",
  "background": "string",
  "tint": "string"
}

```

</details>

**Properties** 

| Name       | Type    | Required           |
| ---------- | ------- | ------------------ |
| font       | string  | :heavy_minus_sign: |
| size       | number  | :heavy_minus_sign: |
| strike     | boolean | :heavy_minus_sign: |
| underline  | boolean | :heavy_minus_sign: |
| color      | string  | :heavy_minus_sign: |
| background | string  | :heavy_minus_sign: |
| tint       | string  | :heavy_minus_sign: |

### RichTextImage

<details>
 <summary>Example (click to expand)</summary>


```json
{
  "image": "string",
  "attributes": {
    "font": "string",
    "size": 0,
    "strike": true,
    "underline": true,
    "color": "string",
    "background": "string",
    "tint": "string"
  }
}

```

</details>

**Properties** 

| Name       | Type                                      | Required           |
| ---------- | ----------------------------------------- | ------------------ |
| image      | string                                    | :heavy_plus_sign:  |
| attributes | [RichTextAttributes](#richtextattributes) | :heavy_minus_sign: |

### RichTextTag

<details>
 <summary>Example (click to expand)</summary>


```json
{
  "tag": "string",
  "attributes": {
    "font": "string",
    "size": 0,
    "strike": true,
    "underline": true,
    "color": "string",
    "background": "string",
    "tint": "string"
  }
}

```

</details>

**Properties** 

| Name       | Type                                      | Required           |
| ---------- | ----------------------------------------- | ------------------ |
| tag        | string                                    | :heavy_plus_sign:  |
| attributes | [RichTextAttributes](#richtextattributes) | :heavy_minus_sign: |

### RichTextText

<details>
 <summary>Example (click to expand)</summary>


```json
"string"

```

</details>

**Properties** 

| Name         | Type                        | Required           | Description                                                  |
| ------------ | --------------------------- | ------------------ | ------------------------------------------------------------ |
| RichTextText | anyOf: `string` or `object` | :heavy_minus_sign: | Can be either a simple `string` or an `object` with dynamic properties where each value is either a `string` or a [`RichTextAttributes`](#richtextattributes) object. |

### Segment

<details>
 <summary>Example (click to expand)</summary>


```json
{
  "segment_id": "0dbbf761-5b2d-4647-8bfa-2b714456749c",
  "title": "string"
}

```

</details>

**Properties** 

| Name       | Type         | Required          |
| ---------- | ------------ | ----------------- |
| segment_id | string(uuid) | :heavy_plus_sign: |
| title      | string       | :heavy_plus_sign: |

### Shape

<details>
 <summary>Example (click to expand)</summary>


```json
{
  "background": "string",
  "rect_corner_radius": 0,
  "border": "string",
  "thickness": 0,
  "type": "color",
  "value": "circle"
}

```

</details>

**Properties** 

| Name  | Type                                         | Required           | Restrictions |
| ----- | -------------------------------------------- | ------------------ | ------------ |
| Shape | anyOf [Shape1](#shape1) or [Shape2](#shape2) | :heavy_minus_sign: | none         |

### Shape1

<details>
 <summary>Example (click to expand)</summary>


```json
{
  "background": "string",
  "rect_corner_radius": 0,
  "border": "string",
  "thickness": 0,
  "type": "color",
  "value": "circle"
}

```

</details>

**Properties** 

| background         | string                                  | :heavy_minus_sign: | none | asset id         |
| ------------------ | --------------------------------------- | ------------------ | ---- | ---------------- |
| rect_corner_radius | [ShapeCornerRadius](#shapecornerradius) | :heavy_minus_sign: | none |                  |
| border             | string                                  | :heavy_minus_sign: | none | asset id         |
| thickness          | number                                  | :heavy_minus_sign: | none | border thickness |
| type               | [Type](#type)                           | :heavy_plus_sign:  | none | An enumeration.  |
| value              | [ShapeType](#shapetype)                 | :heavy_plus_sign:  | none | An enumeration.  |

### Shape2

<details>
 <summary>Example (click to expand)</summary>


```json
{
  "background": "string",
  "rect_corner_radius": 0,
  "border": "string",
  "thickness": 0,
  "type": "circle"
}

```

</details>

**Properties** 

| Name               | Type                                    | Required           | Description      |
| ------------------ | --------------------------------------- | ------------------ | ---------------- |
| background         | string                                  | :heavy_minus_sign: | asset id         |
| rect_corner_radius | [ShapeCornerRadius](#shapecornerradius) | :heavy_minus_sign: |                  |
| border             | string                                  | :heavy_minus_sign: | asset id         |
| thickness          | number                                  | :heavy_minus_sign: | border thickness |
| type               | [ShapeType](#shapetype)                 | :heavy_plus_sign:  | An enumeration.  |

### ShapeCornerRadius

<details>
 <summary>Example (click to expand)</summary>


```json
0

```

</details>

**Properties** 

| Name              | Type                                                         | Required           | Description                                                  |
| ----------------- | ------------------------------------------------------------ | ------------------ | ------------------------------------------------------------ |
| ShapeCornerRadius | anyOf: `number`, `array` of `number`, or [`CornerRadius`](#cornerradius) | :heavy_minus_sign: | Can be a single `number`, an `array` of `number` values, or a reference to a [`CornerRadius`](#cornerradius) object. |

### ShapeType

<details>
 <summary>Example (click to expand)</summary>
```json
"circle"
</details>

**Properties** 

| Name      | Type   | Required           | Description     |
| --------- | ------ | ------------------ | --------------- |
| ShapeType | string | :heavy_minus_sign: | An enumeration. |

**Enumerated Values** 

| Property  | Value                                                        |
| --------- | ------------------------------------------------------------ |
| ShapeType | <ul><li> circle</li><li> rect</li><li> curve_up</li><li> curve_down</li></ul> |

### StartABTestData

<details>
 <summary>Example (click to expand)</summary>

```
```json
{
  "ab_test_id": "c681ac9d-21b4-4f88-8060-10a3639bfde7",
  "segments": [
    {
      "segment_id": "0dbbf761-5b2d-4647-8bfa-2b714456749c",
      "title": "string"
    }
  ],
  "audience_id": "875075bb-caff-4035-8f5f-9fb1430dc417"
}

```

</details>

**Properties** 

| Name        | Type                         | Required           |
| ----------- | ---------------------------- | ------------------ |
| ab_test_id  | string(uuid)                 | :heavy_plus_sign:  |
| segments    | array of [Segment](#segment) | :heavy_minus_sign: |
| audience_id | string(uuid)                 | :heavy_minus_sign: |

### State

<details>
 <summary>Example (click to expand)</summary>


```json
"live"

```

</details>

**Properties** 

| Name  | Type   | Required           | Description     |
| ----- | ------ | ------------------ | --------------- |
| State | string | :heavy_minus_sign: | An enumeration. |

**Enumerated Values** 

| Property | Value                                                        |
| -------- | ------------------------------------------------------------ |
| State    | <ul><li> live</li><li> inactive</li><li> draft</li><li> archived</li></ul> |

### StopABTestData

<details>
 <summary>Example (click to expand)</summary>


```json
{
  "winner_paywall_id": "f2ff783e-53f4-4e5a-a128-047dbbdedc81",
  "another_paywall_id_to_run": "fc5ab9f6-f5a7-47c9-b6f0-a0aa04fd14fa"
}

```

</details>

**Properties** 

| Name                      | Type         | Required           |
| ------------------------- | ------------ | ------------------ |
| winner_paywall_id         | string(uuid) | :heavy_minus_sign: |
| another_paywall_id_to_run | string(uuid) | :heavy_minus_sign: |

### String

<details>
 <summary>Example (click to expand)</summary>


```json
{
  "id": "str-title",
  "value": "Become a Premium man",
  "has_tags": false,
  "fallback": "string"
}

```

</details>

**Properties** 

| Name     | Type    | Required           |
| -------- | ------- | ------------------ |
| id       | string  | :heavy_plus_sign:  |
| value    | string  | :heavy_plus_sign:  |
| has_tags | boolean | :heavy_minus_sign: |
| fallback | string  | :heavy_minus_sign: |

### StripePurchaseDTO

<details>
 <summary>Example (click to expand)</summary>


```json
{
  "customer_user_id": "string",
  "stripe_token": "string"
}

```

</details>

**Properties** 

| Name             | Type   | Required          |
| ---------------- | ------ | ----------------- |
| customer_user_id | string | :heavy_plus_sign: |
| stripe_token     | string | :heavy_plus_sign: |

### Text

<details>
 <summary>Example (click to expand)</summary>


```json
{
  "size": 0,
  "color": "string",
  "horizontal_align": "left",
  "font": "string",
  "bullet_space": 0,
  "items": [
    {
      "string_id": "string",
      "font": "string",
      "size": 0,
      "color": "string",
      "horizontal_align": "left",
      "bullet": false
    }
  ]
}

```

</details>

**Properties** 

| Name | Type                                     | Required           | Restrictions |
| ---- | ---------------------------------------- | ------------------ | ------------ |
| Text | anyOf [Text1](#text1) or [Text2](#text2) | :heavy_minus_sign: | none         |

anyOf

or

### Text1

<details>
 <summary>Example (click to expand)</summary>


```json
{
  "size": 0,
  "color": "string",
  "horizontal_align": "left",
  "font": "string",
  "bullet_space": 0,
  "items": [
    {
      "string_id": "string",
      "font": "string",
      "size": 0,
      "color": "string",
      "horizontal_align": "left",
      "bullet": false
    }
  ]
}

```

</details>

**Properties** 

| Name             | Type                                | Required           | Description     |
| ---------------- | ----------------------------------- | ------------------ | --------------- |
| size             | number                              | :heavy_minus_sign: |                 |
| color            | string                              | :heavy_minus_sign: | asset id        |
| horizontal_align | [HorizontalAlign](#horizontalalign) | :heavy_minus_sign: | An enumeration. |
| font             | string                              | :heavy_minus_sign: | asset id        |
| bullet_space     | number                              | :heavy_minus_sign: |                 |
| items            | array of [TextItem](#textitem)      | :heavy_plus_sign:  |                 |

### Text2

<details>
 <summary>Example (click to expand)</summary>


```json
{
  "size": 0,
  "color": "string",
  "horizontal_align": "left",
  "string_id": "string",
  "font": "string"
}

```

</details>

**Properties** 

| Name             | Type                                | Required           | Description     |
| ---------------- | ----------------------------------- | ------------------ | --------------- |
| size             | number                              | :heavy_minus_sign: |                 |
| color            | string                              | :heavy_minus_sign: | asset id        |
| horizontal_align | [HorizontalAlign](#horizontalalign) | :heavy_minus_sign: | An enumeration. |
| string_id        | string                              | :heavy_plus_sign:  |                 |
| font             | string                              | :heavy_plus_sign:  | asset id        |

### TextItem

<details>
 <summary>Example (click to expand)</summary>


```json
{
  "string_id": "string",
  "font": "string",
  "size": 0,
  "color": "string",
  "horizontal_align": "left",
  "bullet": false
}

```

</details>

**Properties** 

| Name     | Type                                                         | Required           | Restrictions | Description |
| -------- | ------------------------------------------------------------ | ------------------ | ------------ | ----------- |
| TextItem | anyOf [TextItem1](#textitem1), [TextItem2](#textitem2), [TextItem3](#textitem3), or [TextItem4](#textitem4) | :heavy_minus_sign: | none         | none        |

### TextItem1

<details>
 <summary>Example (click to expand)</summary>


```json
{
  "string_id": "string",
  "font": "string",
  "size": 0,
  "color": "string",
  "horizontal_align": "left",
  "bullet": false
}

```

</details>

**Properties** 

| Name             | Type                                | Required           | Description     |
| ---------------- | ----------------------------------- | ------------------ | --------------- |
| string_id        | string                              | :heavy_plus_sign:  |                 |
| font             | string                              | :heavy_minus_sign: | asset id        |
| size             | number                              | :heavy_minus_sign: |                 |
| color            | string                              | :heavy_minus_sign: | asset id        |
| horizontal_align | [HorizontalAlign](#horizontalalign) | :heavy_minus_sign: | An enumeration. |
| bullet           | boolean                             | :heavy_minus_sign: |                 |

### TextItem2

<details>
 <summary>Example (click to expand)</summary>


```json
{
  "image": "string",
  "color": "string",
  "width": 0,
  "height": 0,
  "bullet": :heavy_minus_sign:
}

```

</details>

**Properties** 

| Name   | Type    | Required           | Description |
| ------ | ------- | ------------------ | ----------- |
| image  | string  | :heavy_plus_sign:  | asset id    |
| color  | string  | :heavy_minus_sign: | asset id    |
| width  | number  | :heavy_plus_sign:  |             |
| height | number  | :heavy_plus_sign:  |             |
| bullet | boolean | :heavy_minus_sign: |             |

### TextItem3

<details>
 <summary>Example (click to expand)</summary>


```json
{
  "newline": "string"
}

```

</details>

**Properties** 

| Name    | Type                                 | Required          |
| ------- | ------------------------------------ | ----------------- |
| newline | anyOf: `string`, `number`, `boolean` | :heavy_plus_sign: |

### TextItem4

<details>
 <summary>Example (click to expand)</summary>


```json
{
  "space": 0
}

```

</details>

**Properties** 

| Name  | Type   | Required          |
| ----- | ------ | ----------------- |
| space | number | :heavy_plus_sign: |

### TranslationPayloadType

<details>
 <summary>Example (click to expand)</summary>


```json
"localization"

```

</details>

**Properties** 

| Name                   | Type   | Required           | Description     |
| ---------------------- | ------ | ------------------ | --------------- |
| TranslationPayloadType | string | :heavy_minus_sign: | An enumeration. |

**Enumerated Values** 

| Property               | Value        |
| ---------------------- | ------------ |
| TranslationPayloadType | localization |

### Type

<details>
 <summary>Example (click to expand)</summary>


```json
"color"

```

</details>

**Properties** 

| Name | Type   | Required           | Description     |
| ---- | ------ | ------------------ | --------------- |
| Type | string | :heavy_minus_sign: | An enumeration. |

**Enumerated Values** 

| Property | Value                                                        |
| -------- | ------------------------------------------------------------ |
| Type     | <ul><li> color</li><li> shape</li><li> restore</li><li> close</li><li> custom</li><li> open_url</li><li> image</li><li> radial-gradient</li><li> conic-gradient</li><li> linear-gradient</li><li> font</li></ul> |

### Video

<details>
 <summary>Example (click to expand)</summary>


```json
{
  "master_playlist_url": "http://example.com",
  "image_url": "http://example.com",
  "image_preview_base64": "string"
}

```

</details>

**Properties** 

| Name                 | Type        | Required          |
| -------------------- | ----------- | ----------------- |
| master_playlist_url  | string(uri) | :heavy_plus_sign: |
| image_url            | string(uri) | :heavy_plus_sign: |
| image_preview_base64 | string      | :heavy_plus_sign: |

### VideoResponse

<details>
 <summary>Example (click to expand)</summary>


```json
{
  "data": {
    "master_playlist_url": "http://example.com",
    "image_url": "http://example.com",
    "image_preview_base64": "string"
  }
}

```

</details>

**Properties** 

| Name | Type            | Required           |
| ---- | --------------- | ------------------ |
| data | [Video](#video) | :heavy_minus_sign: |

### ViewItem

<details>
 <summary>Example (click to expand)</summary>


```json
"string"

```

</details>

**Properties** 

| Name     | Type                                                         | Required           | Restrictions |
| -------- | ------------------------------------------------------------ | ------------------ | ------------ |
| ViewItem | anyOf: `string`, [Shape](#shape), [Button](#button), [Text](#text), or [CustomObject](#customobject) | :heavy_minus_sign: | none         |

### ViewStyle

<details>
 <summary>Example (click to expand)</summary>
```json
{
  "footer_block": {
    "property1": "string",
    "property2": "string"
  },
  "features_block": {
    "type": "list"
  },
  "products_block": {
    "type": "single",
    "main_product_index": 0,
    "products": [
      {
        "product_id": "string",
        "type": "product",
        "order": 0
      }
    ]
  }
}
</details>

**Properties** 

| Name           | Type                            | Required           |                                             |
| -------------- | ------------------------------- | ------------------ | ------------------------------------------- |
| footer_block   | object                          | :heavy_minus_sign: | additionalProperties: [ViewItem](#viewitem) |
| features_block | [FeaturesBlock](#featuresblock) | :heavy_minus_sign: |                                             |
| products_block | [ProductsBlock](#productsblock) | :heavy_plus_sign:  |                                             |

### common__domains__value_objects__paywall_builder__v4__paywall_builder_config__PaywallBuilderV3Config

<details>
 <summary>Example (click to expand)</summary>


```
```json
{
  "format": "4.0.0",
  "template_id": "string",
  "template_revision": 0,
  "assets": [
    {
      "id": "string",
      "type": "color",
      "value": "string"
    }
  ],
  "localizations": [
    {
      "id": "string",
      "is_right_to_left": true,
      "strings": [
        {
          "id": "string",
          "value": [
            "string"
          ],
          "fallback": [
            "string"
          ]
        }
      ],
      "assets": [
        {
          "id": "string",
          "type": "color",
          "value": "string"
        }
      ]
    }
  ],
  "default_localization": "string",
  "styles": null
}

```

</details>

**Properties** 

| Parameter            | Type                                   | Description                                                  |
| -------------------- | -------------------------------------- | ------------------------------------------------------------ |
| format               | string                                 | Specifies the format version. Allowed values are `4.0.0` or `4.1.0`. |
| template_id          | string                                 | The unique identifier for the template.                      |
| template_revision    | integer                                | Specifies the revision number for the template. Must be `0` or greater. |
| assets               | array                                  | An array of assets, each identified by its `type`. Types include `color`([AssetColor](#assetcolor)), `linear-gradient`([AssetColorGradient](#assetcolorgradient)), `radial-gradient`([AssetColorGradient](#assetcolorgradient)), `conic-gradient`([AssetColorGradient](#assetcolorgradient), `font`([AssetFont](#assetfont)), `image`([AssetImage](#assetimage)), and `video`([AssetsVideo](#assetsvideo)). |
| localizations        | array of [Localization](#localization) | An array containing localization objects.                    |
| default_localization | string                                 | Specifies the default localization to be used.               |
| styles               | -                                      | Contains styling information for the paywall (details to be specified if available). |

**Enumerated Values** 

| Property | Value |
| -------- | ----- |
| format   | 4.0.0 |
| format   | 4.1.0 |

### portal__in_app_context__domains__value_objects__paywall_builder_v3_config__PaywallBuilderV3Config

<details>
 <summary>Example (click to expand)</summary>


```json
{
  "format": "2.0.0",
  "template_id": "basic",
  "template_revision": 2,
  "assets": [
    {
      "id": "string",
      "type": "color",
      "value": "string"
    }
  ],
  "default_localization": "en-GB",
  "localizations": [
    {
      "id": "en-GB",
      "strings": [
        {
          "id": "str-title",
          "value": "Become a Premium man",
          "has_tags": false,
          "fallback": "string"
        }
      ],
      "assets": [
        {
          "id": "string",
          "type": "color",
          "value": "string"
        }
      ]
    }
  ],
  "styles": {
    "property1": {
      "footer_block": {
        "property1": "string",
        "property2": "string"
      },
      "features_block": {
        "type": "list"
      },
      "products_block": {
        "type": "single",
        "main_product_index": 0,
        "products": [
          {
            "product_id": "string",
            "type": "product",
            "order": 0
          }
        ]
      }
    },
    "property2": {
      "footer_block": {
        "property1": "string",
        "property2": "string"
      },
      "features_block": {
        "type": "list"
      },
      "products_block": {
        "type": "single",
        "main_product_index": 0,
        "products": [
          {
            "product_id": "string",
            "type": "product",
            "order": 0
          }
        ]
      }
    }
  },
  "is_hard_paywall": false,
  "main_image_relative_height": 0.56
}

```

</details>

**Properties** 
| Parameter                  | Type                                   | Description                                                  | Required           |
| -------------------------- | -------------------------------------- | ------------------------------------------------------------ | ------------------ |
| format                     | string                                 | Specifies the format version. Example `3.0.0`.               | :heavy_plus_sign:  |
| template_id                | string                                 | The unique identifier for the template. Example: basic       | :heavy_plus_sign:  |
| template_revision          | integer                                | Specifies the revision number for the template. Must be `0` or greater. Example: 2 | :heavy_plus_sign:  |
| assets                     | array                                  | An array of assets, each identified by its `type`. Types include `color`([AssetColor](#assetcolor)), `linear-gradient`([AssetColorGradient](#assetcolorgradient)), `radial-gradient`([AssetColorGradient](#assetcolorgradient)), `conic-gradient`([AssetColorGradient](#assetcolorgradient), `font`([AssetFont](#assetfont)), `image`([AssetImage](#assetimage)). | :heavy_minus_sign: |
| localizations              | array of [Localization](#localization) | An array containing localization objects.                    | :heavy_minus_sign: |
| default_localization       | string                                 | Specifies the default localization to be used. Example: en-GB | :heavy_minus_sign: |
| styles                     | object                                 | Contains styling information for the paywall. Additional parameters: [ViewStyle](#viewstyle) | :heavy_plus_sign:  |
| is_hard_paywall            | boolean                                | Indicates if it’s a hard paywall (hard paywall is the one that cannot be closed) | :heavy_minus_sign: |
| main_image_relative_height | number                                 | Relative height of hero image                                | :heavy_minus_sign: |

**Enumerated Values** 

| Property | Value |
| -------- | ----- |
| format   | 3.0.0 |

