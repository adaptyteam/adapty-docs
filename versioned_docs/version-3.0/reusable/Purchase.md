<!--- Purchase.md --->

| Parameter                     | Type          | Required in request | Nullable in request | Description                                                  |
| ----------------------------- | ------------- | ------------------- | ------------------- | ------------------------------------------------------------ |
| purchase_type                 | String        | :heavy_plus_sign:   | :heavy_minus_sign:  | The type of product purchased. Possible values is: `one_time_purchase. |
| store                         | String        | :heavy_plus_sign:   | :heavy_minus_sign:  | Store where the product was purchased. Possible values are **app_store**, **play_store**, **stripe**, **Store ID** of your [custom store](initial-custom) |
| environment                   | String        | :heavy_minus_sign:  | :heavy_minus_sign:  | Environment of the transaction that provided the access level. Possible values: `Sandbox`, `Production` |
| store_product_id              | String        | :heavy_plus_sign:   | :heavy_minus_sign:  | Identifier of the product in the app store (App Store/Google Play/Stripe, etc.) that unlocked this access level |
| store_transaction_id          | String        | :heavy_plus_sign:   | :heavy_minus_sign:  | The ID of the transaction in the app store (App Store/Google Play/Stripe, etc.) |
| store_original_transaction_id | String        | :heavy_plus_sign:   | :heavy_minus_sign:  | <p>In case of prolonged subscriptions, a chain of subscriptions is generated. The original transaction i the very first transaction in this chain and the chain is linked by it. Other transactions in the chain are prolongations.</p><br /><p>If no prolongation, `store_original_transaction_id` will coincide with `store_transaction_id`</p> |
| offer                         | Object        | :heavy_minus_sign:  | :heavy_minus_sign:  | The offer used in the purchase as an [Offer](server-side-api-objects#offer) object. |
| is_family_shared              | Boolean       | :heavy_minus_sign:  | :heavy_minus_sign:  | A Boolean value that indicates whether the product is available for family sharing in App Store Connect. For iOS only. Will be always `false` for iOS version below 14.0 and macOS version below 11.0 |
| price                         | Object        | :heavy_plus_sign:   | :heavy_minus_sign:  | Price of the subscription/purchase as a [Price](server-side-api-objects#price) object. The first subscription purchase with a zero price is considered a free trial, while a renewal with a zero price is considered a free subscription renewal. |
| purchased_at                  | ISO 8601 date | :heavy_plus_sign:   | :heavy_minus_sign:  | The datetime when the access level was purchased the latest time |
| refunded_at                   | ISO 8601 date | :heavy_minus_sign:  | :heavy_minus_sign:  | If the purchase was refunded, the datetime of the refund.    |
| cancellation_reason           | String        | :heavy_minus_sign:  | :heavy_minus_sign:  | Possible values: `voluntarily_cancelled`, `billing_error`, `price_increase`, `product_was_not_available`, `refund`, `cancelled_by_developer`, `new_subscription_replace`,`upgraded`, `unknown`, `adapty_revoked`. |
| variation_id                  | String        | :heavy_minus_sign:  | :heavy_minus_sign:  | The variation ID used to attribute purchases to the paywall via which they were made |

