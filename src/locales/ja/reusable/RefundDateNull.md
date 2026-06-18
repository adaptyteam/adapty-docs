リクエストに `cancellation_reason` が含まれているにもかかわらず `refunded_at` の日付がない場合、またはその逆の場合にリクエストが失敗します。

返金を設定する際は、返金日と返金理由の両方を指定する必要があります。

#### ボディ

| パラメーター | 型      | 説明                                                         |
| ------------ | ------- | ------------------------------------------------------------ |
| errors       | Object  | <ul><li> **source**: (string) 常に `refunded_at`</li><li> **errors**: エラーの説明。</li></ul> |
| error_code   | String  | エラーの短縮名。常に `refund_fields_error`。                 |
| status_code  | Integer | HTTP ステータス。常に `400`。                                |

#### レスポンス例

```json showLineNumbers
{
  "errors": [
    {
      "source": "refunded_at",
      "errors": [
        "refunded_at and cancellation_reason=refund must be specified together."
      ]
    }
  ],
  "error_code": "refund_fields_error",
  "status_code": 400
}
```