| パラメータ         | 型         | Null許容           | 説明                                                  |
| ----------------- | ---------- | ------------------ | ------------------------------------------------------------ |
| app_id            | String     | :heavy_minus_sign: | アプリの内部IDです。Adapty ダッシュボードの [App Settings -> General tab](https://app.adapty.io/settings/general) で確認できます。 |
| profile_id        | UUID       | :heavy_minus_sign: | Adapty プロファイルID。Adapty ダッシュボードの **Adapty ID** フィールド -> [Profiles](https://app.adapty.io/profiles/users) -> 各プロファイルページで確認できます。 |
| customer_user_id  | String     | :heavy_plus_sign:  | お使いのシステムにおけるユーザーIDです。Adapty ダッシュボードの **Customer user ID** フィールド -> [Profiles](https://app.adapty.io/profiles/users) -> 各プロファイルページで確認できます。モバイルアプリのコードで Adapty SDK を使って[ユーザーを識別](identifying-users)している場合にのみ機能します。 |
| total_revenue_usd | Float      | :heavy_minus_sign: | そのプロファイルで獲得した USD 建て総収益を表す浮動小数点数の値です。 |
| segment_hash      | String     | :heavy_minus_sign: | 内部パラメータです。                                          |
| timestamp         | Integer    | :heavy_minus_sign: | レスポンス時間（ミリ秒）。競合状態の解決に使用します。 |
| custom_attributes | Array      | :heavy_minus_sign: | <p>プロファイルに設定できるカスタム属性は最大30件です。`custom_attributes` 配列を指定する場合は、少なくとも1つの属性キーを含める必要があります。</p><p>**キー：** 30文字以内の文字列である必要があります。使用できるのは英字、数字、ダッシュ、ピリオド、アンダースコアのみです。</p><p>**値：** 属性値は30文字以内である必要があります。値として使用できるのは文字列と浮動小数点数のみです。ブール値は浮動小数点数に変換されます。属性を削除するには空の値または null を送信してください。</p> |
| access_levels     | Array      | :heavy_plus_sign:  | [アクセスレベル](server-side-api-objects#access-level) オブジェクトの配列です。ユーザーがアクセスレベルを持たない場合は null になることがあります。 |
| subscriptions     | Array      | :heavy_plus_sign:  | [サブスクリプション](server-side-api-objects#subscription) オブジェクトの配列です。ユーザーがサブスクリプションを持たない場合は null になることがあります。 |
| non_subscriptions | Array      | :heavy_plus_sign:  | [Non-Subscription](server-side-api-objects#non-subscription) オブジェクトの配列です。ユーザーが購入履歴を持たない場合は null になることがあります。 |