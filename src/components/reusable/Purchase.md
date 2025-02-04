<!--- Purchase.md --->

<!--- Purchase.md --->

| Parameter                     | Type          | Required in&nbsp;request | Nullable in&nbsp;request | Description                                                  |
| ----------------------------- | ------------- | ------------------------ | ------------------------ | ------------------------------------------------------------ |
| purchase_type                 | String        | :heavy_plus_sign:        | :heavy_minus_sign:       | The type of product purchased. Possible value: `one_time_purchase`. |
| store                         | String        | :heavy_plus_sign:        | :heavy_minus_sign:       | Store where the product was bought. Possible values: `app_store`, `play_store`, `stripe`, or the Store ID of your [custom store](custom-store). |
| environment                   | String        | :heavy_minus_sign:       | :heavy_minus_sign:       | Transaction environment that provided the access level. Options: `Sandbox`, `Production`. `Production` is used by default. |
| store_product_id              | String        | :heavy_plus_sign:        | :heavy_minus_sign:       | The product ID in the app store (App Store, Google Play, Stripe, etc.) that unlocked this access level. |
| store_transaction_id          | String        | :heavy_plus_sign:        | :heavy_minus_sign:       | Transaction ID in the app store (App Store, Google Play, Stripe, etc.). |
| store_original_transaction_id | String        | :heavy_plus_sign:        | :heavy_minus_sign:       | <p>For recurring subscriptions, this is the original transaction ID that links the chain of renewals. The original transaction is the first in the chain; later transactions are extensions of it.</p><p>If there are no extensions, `store_original_transaction_id` matches `store_transaction_id`.</p> |
| offer                         | Object        | :heavy_minus_sign:       | :heavy_plus_sign:        | The offer used for the purchase as an [Offer](server-side-api-objects#offer) object. |
| is_family_shared              | Boolean       | :heavy_minus_sign:       | :heavy_minus_sign:       | A Boolean value indicating whether the product supports family sharing in App Store Connect. iOS only. Always `false` for iOS below 14.0 and macOS below 11.0. `false` is used by default. |
| price                         | Object        | :heavy_plus_sign:        | :heavy_minus_sign:       | Price of the one-time purchase as a [Price](server-side-api-objects#price) object. An initial subscription purchase with zero cost is a free trial; a renewal with zero cost is a free renewal. |
| purchased_at                  | ISO 8601 date | :heavy_plus_sign:        | :heavy_minus_sign:       | The datetime when the access level was last purchased.       |
| refunded_at                   | ISO 8601 date | :heavy_minus_sign:       | :heavy_minus_sign:       | If refunded, shows the datetime of the refund.               |
| cancellation_reason           | String        | :heavy_minus_sign:       | :heavy_minus_sign:       | Possible reasons for cancellation: `voluntarily_cancelled`, `billing_error`, `price_increase`, `product_was_not_available`, `refund`, `cancelled_by_developer`, `new_subscription_replace`, `upgraded`, `unknown`, `adapty_revoked`. |
| variation_id                  | String        | :heavy_minus_sign:       | :heavy_minus_sign:       | The variation ID used to trace purchases to the specific paywall they were made from. |
