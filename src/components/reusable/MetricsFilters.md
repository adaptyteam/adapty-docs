| Name                     | Type                         | Required           | Description                                                  |
| ------------------------ | ---------------------------- | ------------------ | ------------------------------------------------------------ |
| date                     | array of String values(data) | :heavy_plus_sign:  | Enter the date or period for which you want to retrieve chart data. |
| compare_date             | array of String values(data) | :heavy_minus_sign: | If comparing two dates or periods, enter the earlier one here and the later one in the `date` parameter. |
| store                    | array of String values       | :heavy_minus_sign: | Filter by the app store where the purchase was made. Possible values include **app_store**, **play_store**, **stripe**, and any custom store ID. If using a custom store, enter its ID as set in the Adapty Dashboard. |
| country                  | array of String values       | :heavy_minus_sign: | Filter by the 2-letter country code where the purchase took place, using ISO 3166-1 standard codes. |
| store_product_id         | array of String values       | :heavy_minus_sign: | Unique identifier of a product from the app store. You can see this ID in the [**Products**](https://app.adapty.io/products) section of the Adapty Dashboard. |
| duration                 | array of String              | :heavy_minus_sign: | Specify the subscription duration. Possible values are: <ul><li>Weekly</li><li>Monthly</li><li>2 months</li><li>3 months</li><li>6 months</li><li>Annual</li><li>Lifetime</li><li>Uncategorized</li></ul> |
| attribution_source       | array of String values       | :heavy_minus_sign: | The source integration for attribution. Possible options:<ul><li>adjust</li><li>airbridge</li><li>apple_search_ads</li><li>appsflyer</li><li>branch</li><li>custom</li></ul> |
| attribution_status       | array of String values       | :heavy_minus_sign: | Indicates if the attribution is organic or non-organic. Possible values are: <ul><li>organic</li><li>non-organic</li><li>unknown</li></ul> |
| attribution_channel      | array of String values       | :heavy_minus_sign: | Marketing channel that led to the transaction.               |
| attribution_campaign     | array of String values       | :heavy_minus_sign: | Marketing campaign that brought the transaction.             |
| attribution_adgroup      | array of String values       | :heavy_minus_sign: | Attribution ad group that brought the transaction.           |
| attribution_adset        | array of String values       | :heavy_minus_sign: | Attribution ad set that led to the transaction.              |
| attribution_creative     | array of String values       | :heavy_minus_sign: | Specific visual or text elements in an ad or campaign tracked to measure effectiveness (e.g., clicks, conversions). |
| renewal_period           | array of integers            | :heavy_minus_sign: | Filter by the renewal period.                                |
| subscription_duration    | Integer                      | :heavy_minus_sign: | Filter by subscription length.                               |
| profiles_counting_method | String                       | :heavy_minus_sign: | Defines how installs are counted. See [Installs definition for analytics](general#4-installs-definition-for-analytics) for details. Possible values: <ul><li>profile_id</li><li>customer_user_id</li><li>device_id</li></ul> |
| offer_category       | array of String values       | :heavy_minus_sign: | Specify the offer categories you want to retrieve data for. Possible values are:<ul><li>introductory</li><li>promotional</li><li>winback</li></ul> |
| offer_type           | array of String values       | :heavy_minus_sign: | Specify the offer types you want to retrieve data for. Possible values are:<ul><li>free_trial</li><li>pay_as_you_go</li><li>pay_up_front</li></ul>. |
| offer_id             | array of String values       | :heavy_minus_sign: | Specify the specific offers you want to retrieve data for.   |

<!--- | app_id                        | array of String values(uuid) | :heavy_minus_sign: | ???                                                          |
| placement_id                  | array of String values(uuid) | :heavy_minus_sign: | Filtration with the specific placements.                     |
| audience_id                   | array of String values(uuid) | :heavy_minus_sign: | Filtration with the specific audiences.                      |
| ab_test_id                    | array of String values(uuid) | :heavy_minus_sign: | Filtration with the specific A/B tests.                      |
| paywall_id                    | array of String values(uuid) | :heavy_minus_sign: | Filtration with the specific paywalls.                       |
| placement_audience_version_id | array of String values(uuid) | :heavy_minus_sign: | ???                                                          |
--->