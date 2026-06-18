グレース期間とは、期限内にサブスクリプションを更新できなかったユーザー（例：クレジットカードの決済が通らなかった場合など）に対して、延長の猶予を与えるための仕組みです。問題を解決する間もユーザーの設定をそのまま維持できるため、解約を防ぐ効果があります。グレース期間の提供は任意です。

グレース期間を設定する場合、グレース期間の有効期限（`grace_period_expires_at`）はサブスクリプションの有効期限（`expires_at`）より後の日時である必要があります。そうでない場合、グレース期間の有効期限はサブスクリプションの有効期限と同じになります。いずれの場合も、グレース期間の有効期限がサブスクリプションの有効期限より前になることはありません。

この問題を解決するには、グレース期間の有効期限（`grace_period_expires_at`）がサブスクリプションの有効期限（`expires_at`）より後の日時になるよう設定してください。

#### Body

| パラメータ  | 型      | 説明                                                         |
| ----------- | ------- | ------------------------------------------------------------ |
| errors      | Object  | <ul><li> **source**: (string) 常に `grace_period_expires_at`</li><li> **errors**: エラーの説明。</li></ul> |
| error_code  | String  | エラーの短い名称。常に `grace_period_expires_date_error`。  |
| status_code | Integer | HTTPステータス。常に `400`。                                   |

#### レスポンス例

```json showLineNumbers
{
  "errors": [
    {
      "source": "grace_period_expires_at",
      "errors": [
        "grace_period_expires_at must be later or equal to expires_at."
      ]
    }
  ],
  "error_code": "grace_period_expires_date_error",
  "status_code": 400
}
```