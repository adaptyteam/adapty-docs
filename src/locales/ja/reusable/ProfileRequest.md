| パラメーター          | 型            | 必須 | Null許可 | 説明                                                  |
| :----------------- | :------------ | -------- | -------- | :----------------------------------------------------------- |
| first_name         | String        | No       | Yes      | エンドユーザーの名前（名）。                                  |
| last_name          | String        | No       | Yes      | エンドユーザーの名前（姓）。                                   |
| gender             | String        | No       | Yes      | エンドユーザーの性別。                                      |
| email              | String        | No       | Yes      | エンドユーザーのメールアドレス。                                       |
| phone_number       | String        | No       | Yes      | エンドユーザーの電話番号。                                |
| birthday           | ISO 8601 date | No       | No       | エンドユーザーの誕生日。                                    |
| ip_country         | String        | No       | No       | ISO 3166-2形式によるエンドユーザーの国。現在の国を設定するために、クライアントではなくサーバーからリクエストを行う場合に渡す必要があります。指定しない場合は、リクエストのIPアドレスから国を判定します。 |
| store_country      | String        | No       | Yes      | エンドユーザーのアプリストアの国。                         |
| store              | String        | No       | Yes      | ユーザーがアプリ内で購入する際に使用するプラットフォーム。使用可能な値: `app_store`、`play_store`、または `stripe`。 |
| analytics_disabled | Boolean       | No       | No       | <p>外部アナリティクスをオプトアウトするオプション。アナリティクスが無効の場合、イベントはインテグレーションに送信されず、`idfa`、`idfv`、`advertising_id` フィールドがNullable になります。</p><p>ON: このユーザーの外部アナリティクスがオプトアウトされます。</p><p>OFF: アナリティクスはデフォルトで有効です。</p> |
| custom_attributes  | Array         | No       | No       | <p>プロファイルに最大30個のカスタム属性を設定できます。`custom_attributes` 配列を使用する場合、少なくとも1組のキーと値が必要です。</p><p>**キー:** 30文字以内の文字列で、英字・数字・ダッシュ・ピリオド・アンダースコアのみ使用できます。</p><p>**値:** 30文字以内の文字列またはfloat。BooleanおよびIntegerはfloatに変換されます。属性を削除するには、空の値または `null` を送信してください。</p> |
| installation_meta  | Object        | No       | No       | 特定のデバイス上の特定のアプリに関する情報を含むオブジェクトで、[Installation Meta](server-side-api-objects#installation-meta) オブジェクトとして構造化されています。 |