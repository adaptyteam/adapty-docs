| Name                     | Type                         | Required           | Description                                                  |
| ------------------------ | ---------------------------- | ------------------ | ------------------------------------------------------------ |
| date                     | array of String values(data) | :heavy_plus_sign:  | <p>If you’re looking for analytics for a single date or period, enter it here as an array.</p><p>For comparing two dates or periods, enter the later one here and the earlier one in the compare_date parameter.</p> |
| compare_date             | array of String values(data) | :heavy_minus_sign: | If comparing two dates or periods, enter the earlier one here and the later one in the `date` parameter. |
| store                    | array of String values       | :heavy_minus_sign: | Filter by the app store where the purchase was made. Possible values include: **app_store**, **play_store**, etc. |
| country                  | array of String values       | :heavy_minus_sign: | Filter by the country where the purchase occurred.           |
| store_product_id         | array of String values       | :heavy_minus_sign: | Unique identifier of a product from the app store.           |
| duration                 | array of String              | :heavy_minus_sign: | Specify the subscription duration. Possible values are: <ul><li>Weekly</li><li>Monthly</li><li>2 months</li><li>3 months</li><li>6 months</li><li>Annual</li><li>Lifetime</li><li>Uncategorized</li></ul> |
| attribution_source       | array of String values       | :heavy_minus_sign: | The source integration for attribution, e.g., **appsflyer**. |
| attribution_status       | array of String values       | :heavy_minus_sign: | Indicates if the attribution is **organic** or non-organic.  |
| attribution_channel      | array of String values       | :heavy_minus_sign: | Attribution channel that led to the transaction.             |
| attribution_campaign     | array of String values       | :heavy_minus_sign: | Attribution campaign that brought the transaction.           |
| attribution_adgroup      | array of String values       | :heavy_minus_sign: | Attribution ad group that brought the transaction.           |
| attribution_adset        | array of String values       | :heavy_minus_sign: | Attribution ad set that led to the transaction.              |
| attribution_creative     | array of String values       | :heavy_minus_sign: | Specific visual or text elements in an ad or campaign tracked to measure effectiveness (e.g., clicks, conversions). |
| renewal_period           | array of integers            | :heavy_minus_sign: | Filter by the renewal period.                                |
| subscription_duration    | Integer                      | :heavy_minus_sign: | Filter by subscription length.                               |
| profiles_counting_method | String                       | :heavy_minus_sign: | Defines how installs are counted. See [Installs definition for analytics](general#4-installs-definition-for-analytics) for details. Possible values: <ul><li>profile_id</li><li>customer_user_id</li><li>device_id</li></ul> |

<!--- | app_id                        | array of String values(uuid) | :heavy_minus_sign: | ???                                                          |
| placement_id                  | array of String values(uuid) | :heavy_minus_sign: | Filtration with the specific placements.                     |
| audience_id                   | array of String values(uuid) | :heavy_minus_sign: | Filtration with the specific audiences.                      |
| ab_test_id                    | array of String values(uuid) | :heavy_minus_sign: | Filtration with the specific A/B tests.                      |
| paywall_id                    | array of String values(uuid) | :heavy_minus_sign: | Filtration with the specific paywalls.                       |
| placement_audience_version_id | array of String values(uuid) | :heavy_minus_sign: | ???                                                          |
--->