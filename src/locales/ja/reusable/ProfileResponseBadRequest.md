フィールドのエラーによりリクエストが失敗しました。

###### ボディ

| パラメーター | 型      | 説明                                                         |
| ------------ | ------- | ------------------------------------------------------------ |
| errors       | Object  | <ul><li> **source**: (string) エラーが発生したフィールド</li><li> **errors**: (list) エラーの一覧</li></ul> |
| error_code   | String  | エラーの短縮名                                               |
| status_code  | Integer | HTTP ステータス。常に `400`                                  |

###### レスポンス例

```json showLineNumbers
{
  "errors": [
    {
      "source": "string",
      "errors": [
        "string"
      ]
    }
  ],
  "error_code": "string",
  "status_code": 0
}
```