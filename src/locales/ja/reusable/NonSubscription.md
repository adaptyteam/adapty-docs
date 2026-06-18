| パラメーター                     | 型            | 必須 | Null許容 | 説明                                                  |
| :---------------------------- | :------------ | ---- | -------- | :----------------------------------------------------------- |
| purchase_id                   | String        | Yes  | No       | Adapty における購入の識別子。たとえば消耗型アイテムのトラッキングなど、すでにその購入を処理済みかどうか確認するために使用できます。 |
| store                         | String        | Yes  | No       | プロダクトが購入されたストア。使用可能な値: **app_store**、**play_store**、**stripe**、または [カスタムストア](custom-store) 名。 |
| store_product_id              | String        | Yes  | No       | このアクセスレベルをアンロックした、アプリストア（App Store / Google Play / Stripe など）におけるプロダクトの識別子。 |
| store_base_plan_id            | String        | Yes  | Yes      | Google Play Store の [ベースプランID](https://support.google.com/googleplay/android-developer/answer/12154973)、または Stripe の [価格ID](https://docs.stripe.com/products-prices/how-products-and-prices-work#use-products-and-prices)。 |
| store_transaction_id          | String        | Yes  | No       | アプリストア（App Store / Google Play / Stripe など）におけるトランザクションのID。 |
| store_original_transaction_id | String        | Yes  | No       | <p>サブスクリプションが延長された場合、一連のサブスクリプションチェーンが生成されます。オリジナルトランザクションはそのチェーンの最初のトランザクションであり、チェーン全体のリンクとして機能します。チェーン内の他のトランザクションは延長分です。</p><br /><p>延長がない場合、`store_original_transaction_id` は `store_transaction_id` と一致します。</p> |
| purchased_at                  | ISO 8601 date | Yes  | No       | アクセスレベルが最後に購入された日時。 |
| environment                   | String        | No   | No       | アクセスレベルを付与したトランザクションの環境。使用可能な値: `Sandbox`、`Production`。 |
| is_refund                     | Boolean       | Yes  | No       | プロダクトが返金されたかどうかを示します。                  |
| is_consumable                 | Boolean       | Yes  | No       | プロダクトが消耗型アイテムかどうかを示します。                 |