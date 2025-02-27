<!---Subscription.md--->

<!---Subscription.md--->

| Parameter                     | Type          | Required in&nbsp;request | Nullable in&nbsp;request | Description                                                  |
| :---------------------------- | :------------ | :----------------------- | :----------------------- | :----------------------------------------------------------- |
| purchase_type                 | String        | :heavy_plus_sign:        | :heavy_minus_sign:       | The type of product purchased. Possible value: `subscription`. |
| store                         | String        | :heavy_plus_sign:        | :heavy_minus_sign:       | Store where the product was bought. Options include `app_store`, `play_store`, `stripe`, or the Store ID of your [custom store](custom-store). |
| environment                   | String        | :heavy_minus_sign:       | :heavy_minus_sign:       | Environment where the transaction took place. Options are `Sandbox` or `Production`. `Production` is used by default. |
| store_product_id              | String        | :heavy_plus_sign:        | :heavy_minus_sign:       | ID of the product in the app store (App Store, Google Play, Stripe, etc.) that unlocked this access level. |
| store_transaction_id          | String        | :heavy_plus_sign:        | :heavy_minus_sign:       | Transaction ID in the app store (App Store, Google Play, Stripe, etc.). |
| store_original_transaction_id | String        | :heavy_plus_sign:        | :heavy_minus_sign:       | <p>For subscriptions, this ID links to the first transaction in a renewal chain. Each renewal is connected to this original transaction.</p><p>If there’s no renewal, `store_original_transaction_id` matches `store_transaction_id`.</p> |
| offer                         | Object        | :heavy_minus_sign:       | :heavy_plus_sign:        | The offer used in the purchase, provided as an [Offer](server-side-api-objects#offer) object. |
| is_family_shared              | Boolean       | :heavy_minus_sign:       | :heavy_minus_sign:       | A Boolean value indicating whether the product supports family sharing in App Store Connect. iOS only. Always `false` for iOS below 14.0 and macOS below 11.0. `false` is used by default. |
| price                         | Object        | :heavy_plus_sign:        | :heavy_minus_sign:       | Price of the subscription or purchase as a [Price](server-side-api-objects#price) object. An initial subscription purchase with zero cost is a free trial; a renewal with zero cost is a free renewal. |
| purchased_at                  | ISO 8601 date | :heavy_plus_sign:        | :heavy_minus_sign:       | The datetime of the most recent access level purchase.       |
| refunded_at                   | ISO 8601 date | :heavy_minus_sign:       | :heavy_minus_sign:       | The datetime when the subscription was refunded, if applicable. |
| cancellation_reason           | String        | :heavy_minus_sign:       | :heavy_minus_sign:       | Possible reasons for cancellation include: `voluntarily_cancelled`, `billing_error`, `price_increase`, `product_was_not_available`, `refund`, `upgraded`, or `unknown`. |
| variation_id                  | String        | :heavy_minus_sign:       | :heavy_minus_sign:       | The variation ID used to trace purchases to the specific paywall they were made from. |
| originally_purchased_at       | ISO 8601 date | :heavy_plus_sign:        | :heavy_minus_sign:       | For subscription chains, this is the purchase date of the original transaction, linked by `store_original_transaction_id`. |
| expires_at                    | ISO 8601 date | :heavy_plus_sign:        | :heavy_minus_sign:       | The datetime when the access level expires. It may be in the past and `null` for lifetime access. |
| renew_status                  | Boolean       | :heavy_plus_sign:        | :heavy_minus_sign:       | Indicates if auto-renewal is enabled for the subscription.   |
| renew_status_changed_at       | ISO 8601 date | :heavy_minus_sign:       | :heavy_minus_sign:       | The datetime when auto-renewal was either enabled or disabled. |
| billing_issue_detected_at     | ISO 8601 date | :heavy_minus_sign:       | :heavy_minus_sign:       | The datetime when a billing issue was detected (e.g., a failed card charge). The subscription might still be active. This is cleared if the payment goes through. |
| grace_period_expires_at       | ISO 8601 date | :heavy_minus_sign:       | :heavy_minus_sign:       | The datetime when the [grace period](https://developer.apple.com/news/?id=09122019c) will end if the subscription is currently in one. |
