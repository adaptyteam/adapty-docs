<!---Purchase.md--->

| Parameter                     | Type          | Required | Nullable | Description                                                  |
| :---------------------------- | :------------ | -------- | -------- | :----------------------------------------------------------- |
| purchase_type                 | String        | Yes      | No       | The type of product purchased. Possible value: `one_time_purchase`. |
| store                         | String        | Yes      | No       | Store where the product was bought. Possible values: `app_store`, `play_store`, `stripe`, or the Store ID of your [custom store](custom-store). |
| environment                   | String        | No       | No       | Transaction environment that provided the access level. Options: `Sandbox`, `Production`. `Production` is used by default. |
| store_product_id              | String        | Yes      | No       | The product ID in the app store (App Store, Google Play, Stripe, etc.) that unlocked this access level. |
| store_transaction_id          | String        | Yes      | No       | Transaction ID in the app store (App Store, Google Play, Stripe, etc.). |
| store_original_transaction_id | String        | Yes      | No       | <p>For recurring subscriptions, this is the original transaction ID that links the chain of renewals. The original transaction is the first in the chain; later transactions are renewals.</p><p>If there's no renewal, `store_original_transaction_id` matches `store_transaction_id`.</p> |
| offer                         | Object        | No       | Yes      | The offer used for the purchase as an [Offer](server-side-api-objects#offer) object. |
| is_family_shared              | Boolean       | No       | No       | A Boolean value indicating whether the product supports family sharing in App Store Connect. iOS only. Always `false` for iOS below 14.0 and macOS below 11.0. `false` is used by default. |
| price                         | Object        | Yes      | No       | Price of the one-time purchase as a [Price](server-side-api-objects#price) object. An initial subscription purchase with zero cost is a free trial; a renewal with zero cost is a free renewal. |
| purchased_at                  | ISO 8601 date | Yes      | No       | The datetime when the access level was last purchased.       |
| refunded_at                   | ISO 8601 date | No       | No       | If refunded, shows the datetime of the refund.               |
| cancellation_reason           | String        | No       | No       | Possible reasons for cancellation: `voluntarily_cancelled`, `billing_error`, `price_increase`, `product_was_not_available`, `refund`, `cancelled_by_developer`, `new_subscription`, `unknown`. |
| variation_id                  | String        | No       | No       | The variation ID used to trace purchases to the specific paywall they were made from. |
