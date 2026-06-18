リクエストは、指定された失効日が過去の日付であるために失敗しました。`revoke_at` を将来の日付に設定するか、アクセスを即時失効させる場合は `null` を設定してください。

##### Body

| パラメーター | 型      | 説明                                                         |
| ------------ | ------- | ------------------------------------------------------------ |
| errors       | Object  | <ul><li> **source**: (string) 常に `revoke_at`。</li><li> **errors**: エラーの説明。</li></ul> |
| error_code   | String  | エラーの短い名前。常に `value_error`。                       |
| status_code  | Integer | HTTP ステータス。常に `400`。                                |

##### レスポンス例

```json showLineNumbers
{
    "errors": [
        {
            "source": null,
            "errors": [
                "Must be greater than the current time or null"
            ]
        }
    ],
    "error_code": "value_error",
    "status_code": 400
}
```