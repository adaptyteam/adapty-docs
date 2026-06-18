リクエストで指定されたアクセスレベルが見つからなかったため、リクエストが失敗しました。`access_level_id` にタイポがないか、また正しいアプリに対応しているかを確認してください。

#### ボディ

| パラメーター | 型      | 説明                                                         |
| ------------ | ------- | ------------------------------------------------------------ |
| errors       | Object  | <ul><li> **source**: (string) 常に `non_field_errors`</li><li> **errors**: エラーの説明。</li></ul> |
| error_code   | String  | エラーの短い名称。取りうる値: `paid_access_level_does_not_exist`。 |
| status_code  | Integer | HTTP ステータス。常に `404`。                                |

#### レスポンス例

アクセスレベルが見つかりませんでした。

```json showLineNumbers
{
  "errors": [
    {
      "source": "non_field_errors",
      "errors": [
        "Paid access level `premium` does not exist"
      ]
    }
  ],
  "error_code": "paid_access_level_does_not_exist",
  "status_code": 400
}
```