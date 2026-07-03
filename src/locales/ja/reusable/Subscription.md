| パラメータ | 型 | 必須 | Null許容 | 説明 |
| :---------------------------- | :------------ | -------- | -------- | :----------------------------------------------------------- |
| purchase_type | String | Yes | No | 購入したプロダクトの種別。指定可能な値: `subscription`。 |
| store | String | Yes | No | プロダクトを購入したストア。`app_store`、`play_store`、`stripe`、または[カスタムストア](custom-store)のストアIDを指定します。 |
| environment | String | No | No | トランザクションが発生した環境。`Sandbox` または `Production` を指定します。デフォルトは `Production` です。 |
| store_product_id | String | Yes | No | このアクセスレベルをアンロックしたアプリストア（App Store、Google Play、Stripeなど）上のプロダクトID。 |
| store_transaction_id | String | Yes | No | アプリストア（App Store、Google Play、Stripeなど）上のトランザクションID。 |
| store_original_transaction_id | String | Yes | No | <p>サブスクリプションの場合、このIDは更新チェーン内の最初のトランザクションに紐づきます。各更新はこのオリジナルトランザクションと連結されます。</p><p>更新がない場合、`store_original_transaction_id` は `store_transaction_id` と同じ値になります。</p> |
| offer | Object | No | Yes | 購入に使用されたオファー。[Offer](server-side-api-objects#offer) オブジェクトとして指定します。 |
| is_family_shared | Boolean | No | No | App Store Connectでプロダクトがファミリー共有をサポートしているかどうかを示すBoolean値。iOSのみ対応。iOS 14.0未満およびmacOS 11.0未満では常に `false`。デフォルトは `false` です。 |
| price | Object | Yes | No | サブスクリプションまたは購入の価格。[Price](server-side-api-objects#price) オブジェクトとして指定します。コストがゼロの初回サブスクリプション購入は無料トライアル、コストがゼロの更新は無料更新となります。 |
| purchased_at | ISO 8601 date | Yes | No | 直近のアクセスレベル購入日時。 |
| refunded_at | ISO 8601 date | No | No | サブスクリプションが返金された日時（該当する場合）。 |
| cancellation_reason | String | No | No | キャンセル理由として指定可能な値: `voluntarily_cancelled`、`billing_error`、`price_increase`、`product_was_not_available`、`refund`、`upgraded`、または `unknown`。 |
| variation_id | String | No | No | 購入がどのペイウォールから行われたかを追跡するためのバリエーションID。 |
| originally_purchased_at | ISO 8601 date | Yes | No | サブスクリプションチェーンの場合、`store_original_transaction_id` に紐づくオリジナルトランザクションの購入日時。 |
| expires_at | ISO 8601 date | Yes | No | アクセスレベルの有効期限日時。過去の日時になることもあり、永続アクセスの場合は `null` になります。 |
| renew_status | Boolean | Yes | No | サブスクリプションの自動更新が有効かどうかを示します。 |
| renew_status_changed_at | ISO 8601 date | No | No | 自動更新が有効化または無効化された日時。 |
| billing_issue_detected_at | ISO 8601 date | No | No | 請求上の問題（カード決済の失敗など）が検出された日時。サブスクリプション自体はまだ有効な場合があります。決済が完了するとクリアされます。 |
| grace_period_expires_at | ISO 8601 date | No | No | サブスクリプションが現在[グレース期間](https://developer.apple.com/news/?id=09122019c)中の場合、その終了日時。 |