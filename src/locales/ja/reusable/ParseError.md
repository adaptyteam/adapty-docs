このレスポンスは、リクエストが有効なJSONではないか、必須フィールドが不足していることを示しています。JSONを修正して有効な形式にし、不足しているパラメーターを追加してください。

#### ボディ

| パラメーター | 型      | 説明                                                         |
| ------------ | ------- | ------------------------------------------------------------ |
| errors       | Object  | <ul><li> **source**: (string) 無効なJSONの場合、`null` になります。</li><li> **errors**: エラーの説明。</li></ul> |
| error_code   | String  | エラーの短い名称。ここでは `parse_error`。                   |
| status_code  | Integer | HTTPステータス。常に `400`。                                 |

#### レスポンス例

```json showLineNumbers
{
    "errors": [
        {
            "source": null,
            "errors": [
                "JSON parse error - Expecting ',' delimiter: line 4 column 3 (char 67)"
            ]
        }
    ],
    "error_code": "parse_error",
    "status_code": 400
}
```