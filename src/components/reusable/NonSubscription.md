

| Parameter                     | Type          | Required | Nullable | Description                                                  |
| :---------------------------- | :------------ | -------- | -------- | :----------------------------------------------------------- |
| purchase_id                   | String        | Yes      | No       | Identifier of the purchase in Adapty. You can use it to ensure that you've already processed this purchase, for example tracking one-time products. |
| store                         | String        | Yes      | No       | Store where the product was purchased. Possible values are: **app_store**, **play_store**, **stripe**, name of your [custom store.](custom-store) |
| store_product_id              | String        | Yes      | No       | Identifier of the product in the app store (App Store/Google Play/Stripe, etc.) that unlocked this access level. |
| store_base_plan_id            | String        | Yes      | Yes      | [Base plan ID](https://support.google.com/googleplay/android-developer/answer/12154973) in the Google Play Store or [price ID](https://docs.stripe.com/products-prices/how-products-and-prices-work#what-is-a-price) in Stripe. |
| store_transaction_id          | String        | Yes      | No       | The ID of the transaction in the app store (App Store/Google Play/Stripe, etc.). |
| store_original_transaction_id | String        | Yes      | No       | <p>In case of prolonged subscriptions, a chain of subscriptions is generated. The original transaction i the very first transaction in this chain and the chain is linked by it. Other transactions in the chain are prolongations.</p><br /><p>If no prolongation, `store_original_transaction_id` will coincide with `store_transaction_id`.</p> |
| purchased_at                  | ISO 8601 date | Yes      | No       | The datetime when the access level was purchased the latest time. |
| environment                   | String        | No       | No       | Environment of the transaction that provided the access level. Possible values: `Sandbox`, `Production.` |
| is_refund                     | Boolean       | Yes      | No       | Indicates if the product has been refunded.                  |
| is_consumable                 | Boolean       | Yes      | No       | Indicates whether the product is consumable.                 |