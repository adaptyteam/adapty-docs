<!---Subscription.md--->



| Parameter                     | Type          | Required in request | Nullable in request | Description                                                  |
| :---------------------------- | :------------ | :------------------ | :------------------ | :----------------------------------------------------------- |
| store                         | String        | :heavy_plus_sign:   | :heavy_minus_sign:  | Store where the product was bought. Options include **app_store**, **play_store**, **stripe**, or the name of your [custom store](initial-custom). |
| store_product_id              | String        | :heavy_plus_sign:   | :heavy_minus_sign:  | ID of the product in the app store (like App Store, Google Play, Stripe) that unlocked this access level. |
| store_base_plan_id            | String        | :heavy_plus_sign:   | :heavy_plus_sign:   | [Base plan ID](https://support.google.com/googleplay/android-developer/answer/12154973) in Google Play or [price ID](https://docs.stripe.com/products-prices/how-products-and-prices-work#what-is-a-price) in Stripe. |
| store_transaction_id          | String        | :heavy_plus_sign:   | :heavy_minus_sign:  | Transaction ID in the app store (App Store, Google Play, Stripe, etc.). |
| store_original_transaction_id | String        | :heavy_plus_sign:   | :heavy_minus_sign:  | <p>For subscriptions, this ID links to the first transaction in a renewal chain. Each renewal is connected to this original transaction.</p><br /><p>If there’s no renewal, store_original_transaction_id matches store_transaction_id.</p> |
| offer                         | Object        | :heavy_plus_sign:   | :heavy_minus_sign:  | The offer used in the purchase, provided as an [Offer](server-side-api-objects#offer) object. |
| environment                   | String        | :heavy_minus_sign:  | :heavy_minus_sign:  | Environment where the transaction took place. Options are `Sandbox` or `Production`. |
| starts_at                     | ISO 8601 date | :heavy_plus_sign:   | :heavy_plus_sign:   | The datetime when the access level becomes active. Could be in the future. |
| purchased_at                  | ISO 8601 date | :heavy_plus_sign:   | :heavy_minus_sign:  | The datetime of the most recent access level purchase.       |
| originally_purchased_at       | ISO 8601 date | :heavy_plus_sign:   | :heavy_minus_sign:  | For subscription chains, this is the purchase date of the original transaction, linked by `store_original_transaction_id`. |
| expires_at                    | ISO 8601 date | :heavy_plus_sign:   | :heavy_plus_sign:   | The datetime when the access level expires. It may be in the past and may be `null` for lifetime access. |
| renewal_cancelled_at          | ISO 8601 date | :heavy_plus_sign:   | :heavy_plus_sign:   | The datetime when auto-renewal was canceled. The subscription can still be active; it just won’t renew automatically. Set to `null` if the user reactivates. |
| billing_issue_detected_at     | ISO 8601 date | :heavy_plus_sign:   | :heavy_plus_sign:   | The datetime when a billing issue was detected (e.g., a failed card charge). Subscription might still be active. This is cleared if the payment goes through. |
| is_in_grace_period            | Boolean       | :heavy_plus_sign:   | :heavy_minus_sign:  | Indicates if the auto-renewable subscription is currently in a [grace period](https://developer.apple.com/news/?id=09122019c). |
| cancellation_reason           | String        | :heavy_plus_sign:   | :heavy_plus_sign:   | Possible reasons for cancellation include: `voluntarily_cancelled`, `billing_error`, `price_increase`, `product_was_not_available`, `refund`, `upgraded`, or `unknown`. |