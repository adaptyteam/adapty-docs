リクエストが失敗した原因として、[App Settings](https://app.adapty.io/settings/paddle) の Paddle 認証情報が正しくないか、指定されたトークンが無効であることが考えられます。以下をご確認ください。

1. [App Settings](https://app.adapty.io/settings/paddle) の **Paddle API Key** が正しく、対象アプリのものであること。
2. 使用している `paddle_token` がアプリに存在し、リクエスト内にタイプミスがないこと。

#### ボディ

| パラメータ  | 型      | 説明                                                         |
| ----------- | ------- | ------------------------------------------------------------ |
| errors      | Object  | <ul><li> **source**: (string) 常に `non_field_errors`。</li><li> **errors**: エラーの説明。 </li></ul> |
| error_code  | String  | エラーの短縮名。指定可能な値: `invalid_paddle_credentials_or_purchase_not_found`。 |
| status_code | Integer | HTTP ステータス。常に `400`。                                |

#### レスポンス例

```json showLineNumbers
{
  "errors": [
    {
      "source": "non_field_errors",
      "errors": [
        "Invalid Paddle credentials or purchase not found"
      ]
    }
  ],
  "error_code": "invalid_paddle_credentials_or_purchase_not_found",
  "status_code": 400
}
```