| Name                 | Type                    | Required           | Description.                                                 |
| -------------------- | ----------------------- | ------------------ | ------------------------------------------------------------ |
| date                 | array of Strings (data) | :heavy_plus_sign:  | Enter the date or period for which you want to retrieve chart data. |
| compare_date         | array of Strings (data) | :heavy_minus_sign: | If comparing two dates or periods, enter the earlier one here and the later one in the `date` parameter. |
| store                | array of Strings        | :heavy_minus_sign: | Filter by the app store where the purchase was made. Possible values include app_store, play_store, stripe, and any custom store ID. If you're using a custom store, enter its ID as set in the Adapty Dashboard. |
| country              | array of Strings        | :heavy_minus_sign: | Filter by the 2-letter country code where the purchase took place, using ISO 3166-1 standard codes. |
| store_product_id     | array of Strings        | :heavy_minus_sign: | Unique identifier of a product from the app store. You can see this ID in the [Products](https://app.adapty.io/products) section of the Adapty Dashboard. |
| duration             | array of Strings        | :heavy_minus_sign: | Specify the subscription duration. Possible values are: Weekly. Monthly. 2 months. 3 months. 6 months. Annual. Lifetime. Uncategorized. |
| attribution_source   | array of Strings        | :heavy_minus_sign: | The source integration for attribution. Possible options: adjust. airbridge. apple_search_ads. appsflyer. branch. custom. |
| attribution_status   | array of Strings        | :heavy_minus_sign: | Indicates if the attribution is organic or non-organic. Possible values are: organic. non-organic. unknown. |
| attribution_channel  | array of Strings        | :heavy_minus_sign: | Marketing channel that led to the transaction.               |
| attribution_campaign | array of Strings        | :heavy_minus_sign: | Marketing campaign that brought the transaction.             |
| attribution_adgroup  | array of Strings        | :heavy_minus_sign: | Attribution ad group that brought the transaction.           |
| attribution_adset    | array of Strings        | :heavy_minus_sign: | Attribution ad set that led to the transaction.              |
| attribution_creative | array of Strings        | :heavy_minus_sign: | Specific visual or text elements in an ad or campaign tracked to measure effectiveness (e.g., clicks, conversions). |
| offer_category       | array of Strings        | :heavy_minus_sign: | Specify the offer categories you want to retrieve data for. Possible values are: introductory. promotional. winback. |
| offer_type           | array of Strings        | :heavy_minus_sign: | Specify the offer types you want to retrieve data for. Possible values are: free_trial. pay_as_you_go. pay_up_front. |
| offer_id             | array of Strings        | :heavy_minus_sign: | Specify the specific offers you want to retrieve data for.   |

<!--- | app_id                        | array of String values(uuid) | :heavy_minus_sign: | ???                                                          |
| placement_id                  | array of String values(uuid) | :heavy_minus_sign: | Filtration with the specific placements.                     |
| audience_id                   | array of String values(uuid) | :heavy_minus_sign: | Filtration with the specific audiences.                      |
| ab_test_id                    | array of String values(uuid) | :heavy_minus_sign: | Filtration with the specific A/B tests.                      |
| paywall_id                    | array of String values(uuid) | :heavy_minus_sign: | Filtration with the specific paywalls.                       |
| placement_audience_version_id | array of String values(uuid) | :heavy_minus_sign: | ???                                                          |
--->