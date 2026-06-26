ユーザーはすでに期限切れのサブスクリプションを購入することはできません。そのため、`expires_at`の日付（サブスクリプションの有効期限）は、`purchased_at`の日付（トランザクションの発生日）より後である必要があります。

これを修正するには、これらの日付を確認し、`expires_at`が`purchased_at`より後になっていることを確認してください。

#### ボディ

| パラメータ   | 型      | 説明                                                         |
| ----------- | ------- | ------------------------------------------------------------ |
| errors      | Object  | <ul><li> **source**: (string) 常に `expires_at`</li><li> **errors**: エラーの説明。</li></ul> |
| error_code  | String  | エラーの短縮名。常に `expires_date_error`。               |
| status_code | Integer | HTTPステータス。常に `400`。                                   |

#### レスポンス例

```json showLineNumbers
{
  "errors": [
    {
      "source": "expires_at",
      "errors": [
        "expires_at must be later than purchased_at."
      ]
    }
  ],
  "error_code": "expires_date_error",
  "status_code": 400
}
```