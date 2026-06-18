`status`フィールドの値が無効なため、リクエストが失敗しました。入力ミスがないか確認してください。使用可能な値は `organic`、`non_organic`、`unknown` です。

#### ボディ

| パラメーター | 型      | 説明                                                         |
| ------------ | ------- | ------------------------------------------------------------ |
| errors       | Object  | <ul><li> **source**: (string) 常に `status`。</li><li> **errors**: エラーの説明。この場合、`value is not a valid enumeration member; permitted: 'organic', 'non_organic', 'unknown'`</li></ul> |
| error_code   | String  | エラーの短い名前。ここでは `enum`。                          |
| status_code  | Integer | HTTP ステータス。常に `400`。                                |

#### レスポンスの例

```json showLineNumbers
{
    "errors": [
        {
            "source": "status",
            "errors": [
                "value is not a valid enumeration member; permitted: 'organic', 'non_organic', 'unknown'"
            ]
        }
    ],
    "error_code": "enum",
    "status_code": 400
}
```