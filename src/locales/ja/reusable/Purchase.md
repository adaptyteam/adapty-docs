| パラメーター                     | 型            | 必須 | Null許容 | 説明                                                         |
| :---------------------------- | :------------ | ---- | -------- | :----------------------------------------------------------- |
| purchase_type                 | String        | Yes  | No       | 購入したプロダクトの種類。使用可能な値: `one_time_purchase`。 |
| store                         | String        | Yes  | No       | プロダクトが購入されたストア。使用可能な値: `app_store`、`play_store`、`stripe`、または[カスタムストア](custom-store)のストアID。 |
| environment                   | String        | No   | No       | アクセスレベルを付与したトランザクションの環境。オプション: `Sandbox`、`Production`。デフォルトは `Production`。 |
| store_product_id              | String        | Yes  | No       | このアクセスレベルをアンロックしたアプリストア（App Store、Google Play、Stripeなど）内のプロダクトID。 |
| store_transaction_id          | String        | Yes  | No       | アプリストア（App Store、Google Play、Stripeなど）内のトランザクションID。 |
| store_original_transaction_id | String        | Yes  | No       | <p>自動更新サブスクリプションの場合、更新チェーンを紐付ける元のトランザクションID。元のトランザクションがチェーンの最初であり、以降のトランザクションは更新分です。</p><p>更新がない場合、`store_original_transaction_id` は `store_transaction_id` と一致します。</p> |
| offer                         | Object        | No   | Yes      | 購入に使用されたオファー（[Offer](server-side-api-objects#offer) オブジェクト）。 |
| is_family_shared              | Boolean       | No   | No       | App Store Connect でプロダクトがファミリー共有をサポートしているかどうかを示すブール値。iOS のみ。iOS 14.0 未満および macOS 11.0 未満では常に `false`。デフォルトは `false`。 |
| price                         | Object        | Yes  | No       | 買い切り購入の価格（[Price](server-side-api-objects#price) オブジェクト）。コストがゼロの初回サブスクリプション購入は無料トライアル、コストがゼロの更新は無料更新です。 |
| purchased_at                  | ISO 8601 date | Yes  | No       | アクセスレベルが最後に購入された日時。                        |
| refunded_at                   | ISO 8601 date | No   | No       | 返金された場合、返金日時を表示します。                        |
| cancellation_reason           | String        | No   | No       | キャンセルの理由として使用可能な値: `voluntarily_cancelled`、`billing_error`、`price_increase`、`product_was_not_available`、`refund`、`cancelled_by_developer`、`new_subscription`、`unknown`。 |
| variation_id                  | String        | No   | No       | 購入がどのペイウォールから行われたかを追跡するために使用するバリエーションID。 |