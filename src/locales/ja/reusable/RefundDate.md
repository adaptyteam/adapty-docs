リクエストが失敗しました。購入日（`purchased_at`）が返金日（`refunded_at`）以前の日時になっているためです。返金はトランザクションの取り消しであるため、必ず購入後に行われます。

修正するには、`purchased_at` と `refunded_at` パラメータを確認し、返金日が購入日より後になっていることを確認してください。

#### Body

| パラメータ  | 型      | 説明                                                         |
| ----------- | ------- | ------------------------------------------------------------ |
| errors      | Object  | <ul><li> **source**: (string) 常に `refunded_at`</li><li> **errors**: エラーの説明。</li></ul> |
| error_code  | String  | エラーの短い名前。常に `refund_date_error`。                 |
| status_code | Integer | HTTP ステータス。常に `400`。                                |

#### レスポンス例

```json showLineNumbers
{
  "errors": [
    {
      "source": "refunded_at",
      "errors": [
        "refunded_at must be later than purchased_at."
      ]
    }
  ],
  "error_code": "refund_date_error",
  "status_code": 400
}
```