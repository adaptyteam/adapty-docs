`visited_at` フィールドのフォーマットが正しくないため、リクエストが失敗しました。**ISO 8601 日付**フォーマット（例: `2025-01-14T14:15:22Z`）を使用してください。

#### Body

| Parameter   | Type    | Description                                                  |
| ----------- | ------- | ------------------------------------------------------------ |
| errors      | Object  | <ul><li> **source**: (string) 常に `visited_at`。</li><li> **errors**: エラーの説明。 </li></ul> |
| error_code  | String  | エラーの短い名前。ここでは: `base_error`。                        |
| status_code | Integer | HTTP ステータス。常に `400`。                                   |

#### レスポンス例

```json showLineNumbers
{
    "errors": [
        {
            "source": "visited_at",
            "errors": [
                "invalid datetime format"
            ]
        }
    ],
    "error_code": "datetime",
    "status_code": 400
}
```