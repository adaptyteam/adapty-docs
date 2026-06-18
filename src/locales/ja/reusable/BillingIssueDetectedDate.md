請求の問題は、サブスクリプションの更新試行中に問題が発生した際に起こるため、常にトランザクション日（`purchased_at`）より後に発生します。

これを解決するには、請求問題の日付（`billing_issue_detected_at`）がトランザクション日（`purchased_at`）より後になるように設定してください。

#### Body

| Parameter   | Type    | Description                                                  |
| ----------- | ------- | ------------------------------------------------------------ |
| errors      | Object  | <ul><li> **source**: (string) 常に `billing_issue_detected_at`</li><li> **errors**: エラーの説明。</li></ul> |
| error_code  | String  | エラーの短縮名。常に `billing_issue_detected_at_date_comparison_error`。 |
| status_code | Integer | HTTP ステータス。常に `400`。                                   |

#### レスポンス例

```json showLineNumbers
{
  "errors": [
    {
      "source": "billing_issue_detected_at",
      "errors": [
        "billing_issue_detected_at must be later than purchased_at."
      ]
    }
  ],
  "error_code": "billing_issue_detected_at_date_comparison_error",
  "status_code": 400
}
```