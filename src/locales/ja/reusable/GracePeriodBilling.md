グレース期間の開始は請求の問題としてカウントされます。そのため、グレース期間が開始している場合（`grace_period_expires_at` パラメーターに値が設定されていることで確認できます）、その開始日を `billing_issue_detected_at` パラメーターに記録する必要があります。

これを修正するには、`billing_issue_detected_at` にグレース期間の開始日を設定するか、グレース期間がまだ開始していない場合は `grace_period_expires_at` パラメーターを削除してください。

#### ボディ \{#body\}

| パラメーター | 型      | 説明                                                         |
| ----------- | ------- | ------------------------------------------------------------ |
| errors      | Object  | <ul><li> **source**: (string) 常に `grace_period_billing_error`</li><li> **errors**: エラーの説明。</li></ul> |
| error_code  | String  | エラーの短い名前。常に `grace_period_billing_error`。        |
| status_code | Integer | HTTP ステータス。常に `400`。                                |

#### レスポンス例 \{#response-example\}

```json showLineNumbers
{
  "errors": [
    {
      "source": "grace_period_billing_error",
      "errors": [
        "If grace_period_expires_at is specified, billing_issue_detected_at must also be specified."
      ]
    }
  ],
  "error_code": "grace_period_billing_error",
  "status_code": 400
}
```