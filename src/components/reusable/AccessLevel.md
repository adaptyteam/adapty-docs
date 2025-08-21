<!---AccessLevel.md --->

| Parameter                     | Type          | Required | Nullable | Description                                                  |
| :---------------------------- | :------------ | -------- | -------- | :----------------------------------------------------------- |
| access_level_id               | String        | Yes      | No       | ID for the Paid Access Level set up in the Adapty Dashboard. |
| store                         | String        | Yes      | No       | Store where the product was bought. Options: **app_store**, **play_store**, **stripe**, or the name of your [custom store](custom-store). |
| store_product_id              | String        | Yes      | No       | ID of the product in the app store (like App Store, Google Play, Stripe) that unlocked this access level. |
| store_base_plan_id            | String        | Yes      | Yes      | [Base plan ID](https://support.google.com/googleplay/android-developer/answer/12154973) in Google Play or [price ID](https://docs.stripe.com/products-prices/how-products-and-prices-work#what-is-a-price) in Stripe. |
| store_transaction_id          | String        | Yes      | No       | Transaction ID in the app store (App Store, Google Play, Stripe, etc.). |
| store_original_transaction_id | String        | Yes      | No       | <p>For subscriptions, this ID links the original transaction in the chain of renewals. Later transactions are linked as renewals.</p><p>If there's no renewal, store_original_transaction_id matches store_transaction_id.</p> |
| offer                         | Object | Yes      | No       | The [Offer](server-side-api-objects#offer) object. Can be `null` if the customer has no access levels. |
| environment                   | String        | No       | No       | Environment for the transaction that granted access. Options: `Sandbox`, `Production`. |
| starts_at                     | ISO 8601 date | Yes      | Yes      | The date time when the access level becomes active. Could be in the future. |
| purchased_at                  | ISO 8601 date | Yes      | No       | The datetime of the most recent purchase for the access level. |
| originally_purchased_at       | ISO 8601 date | Yes      | No       | For subscriptions, this is the date and time of the very first (original) purchase in the chain, tied to `store_original_transaction_id`. |
| expires_at                    | ISO 8601 date | Yes      | Yes      | The datetime when the access level expires. Might be in the past, or `null` for lifetime access. |
| renewal_cancelled_at          | ISO 8601 date | Yes      | Yes      | The datetime when auto-renewal was turned off for a subscription. The subscription can still be active; it just won't auto-renew. Set to `null` if the user reactivates the subscription. |
| billing_issue_detected_at     | ISO 8601 date | Yes      | Yes      | The datetime when a billing issue was found (like a failed card charge). The subscription might still be active. This is cleared if the payment goes through later. |
| is_in_grace_period            | Boolean       | Yes      | No       | Shows whether the subscription is in a [grace period](https://developer.apple.com/news/?id=09122019c) (only for auto-renewable subscriptions). |
| cancellation_reason           | String        | Yes      | Yes      | Reason for cancellation, with options like: `voluntarily_cancelled`, `billing_error`, `price_increase`, `product_was_not_available`, `refund`, `upgraded`, `unknown`. |
