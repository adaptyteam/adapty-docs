| Name                     | Type                         | Required           | Description                                                  |
| ------------------------ | ---------------------------- | ------------------ | ------------------------------------------------------------ |
| date                     | array of String values(data) | :heavy_plus_sign:  | <p>If you need to get analytics for 1 date or period, enter it here as an array. </p><p>If you plan to compare 2 dates or periods, enter the later one into this parameter and the earlier one to the `compare_date` parameter. </p> |
| compare_date             | array of String values(data) | :heavy_minus_sign: | If you plan to compare 2 dates or periods, enter the earlier one into this parameter and the later one into the `date` parameter. |
| store                    | array of String values       | :heavy_minus_sign: | Filtration by the app stores through which the purchase was made. Possible values are |
| country                  | array of String values       | :heavy_minus_sign: | Filtration by the countries of the purchase.                 |
| store_product_id         | array of String values       | :heavy_minus_sign: | Unique identifier of a product from the app store. Please note that you enter an array of the same product identifier in this parameter. |
| duration                 | array of String              | :heavy_minus_sign: | Possible values are: <ul><li> Weekly</li><li> Monthly</li><li> 2 months</li><li> 3 months</li><li> 6 months</li><li> Annual</li><li> Lifetime</li><li> Uncategorized</li></ul> |
| attribution_source       | array of String values       | :heavy_minus_sign: | The source integration of the attribution, for example, appsflyer. |
| attribution_status       | array of String values       | :heavy_minus_sign: | organic                                                      |
| attribution_channel      | array of String values       | :heavy_minus_sign: | The attribution channel that brought the transaction.        |
| attribution_campaign     | array of String values       | :heavy_minus_sign: | The attribution campaign that brought the transaction.       |
| attribution_adgroup      | array of String values       | :heavy_minus_sign: | The attribution ad group that brought the transaction        |
| attribution_adset        | array of String values       | :heavy_minus_sign: | The attribution ad set that brought the transaction          |
| attribution_creative     | array of String values       | :heavy_minus_sign: | Specific visual or textual elements used in an advertisement or marketing campaign that are tracked to determine their effectiveness in driving desired actions, such as clicks, conversions, or installs |
| renewal_period           | array of integers            | :heavy_minus_sign: | Filtration by the period of the renewal.                     |
| subscription_duration    | Integer                      | :heavy_minus_sign: | Filtration by the length of the subscription.                |
| profiles_counting_method | String                       | :heavy_minus_sign: | Define how to count the installs. See [**Installs definition for analytics** parameter](general#4-installs-definition-for-analytics) description for detailed description. Possible values are: <ul><li> profile_id</li><li> customer_user_id</li><li> device_id</li></ul> |

<!--- | app_id                        | array of String values(uuid) | :heavy_minus_sign: | ???                                                          |
| placement_id                  | array of String values(uuid) | :heavy_minus_sign: | Filtration with the specific placements.                     |
| audience_id                   | array of String values(uuid) | :heavy_minus_sign: | Filtration with the specific audiences.                      |
| ab_test_id                    | array of String values(uuid) | :heavy_minus_sign: | Filtration with the specific A/B tests.                      |
| paywall_id                    | array of String values(uuid) | :heavy_minus_sign: | Filtration with the specific paywalls.                       |
| placement_audience_version_id | array of String values(uuid) | :heavy_minus_sign: | ???                                                          |
--->