Renewalはサブスクリプションの延長を指します。ユーザーはサブスクリプションの延長をキャンセルし、その後再度延長することができます。これらのアクションが行われた時刻は `renew_status_changed_at` パラメータに保存されます。この値がトランザクション自体よりも早くなることはありません。

この問題を解決するには、`renew_status_changed_at` がトランザクションの時刻（`purchased_at`）より後であることを確認してください。

#### Body

| パラメータ  | 型      | 説明                                                         |
| ----------- | ------- | ------------------------------------------------------------ |
| errors      | Object  | <ul><li> **source**: (string) 常に `originally_purchased_at`</li><li> **errors**: エラーの説明。</li></ul> |
| error_code  | String  | エラーの短い名称。常に `originally_purchased_date_error`。   |
| status_code | Integer | HTTPステータス。常に `400`。                                 |

#### レスポンス例

```json showLineNumbers
{
  "errors": [
    {
      "source": "renew_status_changed_at",
      "errors": [
        "renew_status_changed_at must be later than purchased_at."
      ]
    }
  ],
  "error_code": "renew_status_changed_date_error",
  "status_code": 400
}
```