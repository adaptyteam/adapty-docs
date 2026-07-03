[App Settings](https://app.adapty.io/settings/paddle) の **Paddle API Key** が正しくないためリクエストが失敗しました。APIキーが正確であり、正しいアプリに紐付けられているか確認してください。

#### Body

| パラメーター | タイプ  | 説明                                                         |
| ------------ | ------- | ------------------------------------------------------------ |
| errors       | Object  | <ul><li> **source**: (string) 常に `non_field_errors`。</li><li> **errors**: エラーの説明。</li></ul> |
| error_code   | String  | エラーの短い名前。設定可能な値: `paddle_api_key_not_found`。 |
| status_code  | Integer | HTTPステータス。常に `400`。                                 |

#### レスポンス例

```json showLineNumbers
{
  "errors": [
    {
      "source": "non_field_errors",
      "errors": [
        "Paddle API key not found"
      ]
    }
  ],
  "error_code": "paddle_api_key_not_found",
  "status_code": 400
}
```