リクエストで指定した `revoke_at` が、現在のアクセスレベルの `expires_at` パラメータよりも後の日時であるため、リクエストに失敗しました。アクセスレベルを延長したい場合は、[アクセスレベルの付与](https://adapty.io/docs/ja/api-adapty/operations/grantAccessLevel)リクエストを使用してください。

#### Body

| パラメータ  | 型      | 説明                                                         |
| ----------- | ------- | ------------------------------------------------------------ |
| errors      | Object  | <ul><li> **source**: (string) 常に `non_field_errors`</li><li> **errors**: エラーの説明。</li></ul> |
| error_code  | String  | エラーの短縮名。常に `revocation_date_more_than_expiration_date`。 |
| status_code | Integer | HTTP ステータス。常に `400`。                                |

#### レスポンス例

```json showLineNumbers
  {
  "errors": [
    {
      "source": "revoke_at",
      "errors": [
        "Revocation date (2029-08-29 09:33:42+00:00) is more than current expiration date (2028-08-29 09:33:42+00:00)"
      ]
    }
  ],
  "error_code": "revocation_date_more_than_expiration_date",
  "status_code": 400
}
```