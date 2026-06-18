| パラメーター                        | 型            | 必須 | Null 許容 | 説明                                                         |
| :-------------------------------- | :------------ | ---- | --------- | :----------------------------------------------------------- |
| access_level_id                   | String        | Yes  | No        | Adapty ダッシュボードで設定されたアクセスレベルの ID。 |
| store                             | String        | Yes  | No        | プロダクトが購入されたストア。選択肢: **app_store**、**play_store**、**stripe**、または[カスタムストア](custom-store)の名前。 |
| store_product_id                  | String        | Yes  | No        | このアクセスレベルを解放した、アプリストア（App Store、Google Play、Stripe など）内のプロダクト ID。 |
| store_base_plan_id                | String        | Yes  | Yes       | Google Play の[ベースプラン ID](https://support.google.com/googleplay/android-developer/answer/12154973)、または Stripe の[価格 ID](https://docs.stripe.com/products-prices/how-products-and-prices-work#use-products-and-prices)。 |
| store_transaction_id              | String        | Yes  | No        | アプリストア（App Store、Google Play、Stripe など）でのトランザクション ID。 |
| store_original_transaction_id     | String        | Yes  | No        | <p>サブスクリプションの場合、このIDは更新チェーン内の最初のトランザクションを紐付けます。それ以降のトランザクションは更新として関連付けられます。</p><p>更新がない場合、store_original_transaction_id は store_transaction_id と一致します。</p> |
| offer                             | Object        | Yes  | No        | [オファー](server-side-api-objects#offer)オブジェクト。顧客がアクセスレベルを持っていない場合は `null` になることがあります。 |
| environment                       | String        | No   | No        | アクセスを付与したトランザクションの環境。選択肢: `Sandbox`、`Production`。 |
| starts_at                         | ISO 8601 date | Yes  | Yes       | アクセスレベルが有効になる日時。将来の日時になる場合があります。 |
| purchased_at                      | ISO 8601 date | Yes  | No        | アクセスレベルに対する最新の購入日時。 |
| originally_purchased_at           | ISO 8601 date | Yes  | No        | サブスクリプションの場合、チェーン内の最初（オリジナル）の購入日時。`store_original_transaction_id` に紐付きます。 |
| expires_at                        | ISO 8601 date | Yes  | Yes       | アクセスレベルが期限切れになる日時。過去の日時になる場合や、永続アクセスの場合は `null` になります。 |
| renewal_cancelled_at              | ISO 8601 date | Yes  | Yes       | サブスクリプションの自動更新がオフにされた日時。サブスクリプション自体はまだ有効な場合があり、自動更新されないだけです。ユーザーがサブスクリプションを再有効化した場合は `null` に設定されます。 |
| billing_issue_detected_at         | ISO 8601 date | Yes  | Yes       | 請求の問題（カードへの課金失敗など）が検出された日時。サブスクリプションはまだ有効な場合があります。その後の支払いが成功した場合はクリアされます。 |
| is_in_grace_period                | Boolean       | Yes  | No        | サブスクリプションが[グレース期間](https://developer.apple.com/news/?id=09122019c)中かどうかを示します（自動更新サブスクリプションのみ）。 |
| cancellation_reason               | String        | Yes  | Yes       | キャンセルの理由。選択肢: `voluntarily_cancelled`、`billing_error`、`price_increase`、`product_was_not_available`、`refund`、`upgraded`、`unknown`。 |