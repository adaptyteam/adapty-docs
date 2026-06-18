継続するサブスクリプションでは、トランザクションのチェーンが作成されます。最初のトランザクションがこのチェーンの起点となり、以降のすべてのトランザクションをリンクします。各更新はこの最初のトランザクションの延長に過ぎません。トランザクションが初回購入の場合、それ自体が元のトランザクションとなります。

`originally_purchased_at` タイムスタンプは最初の購入日時を示し、`purchased_at` は現在のトランザクションの日時を示します。そのため、`purchased_at` が `originally_purchased_at` より早くなることはありません。最初のトランザクションの場合に限り、両者が同じ値になることがあります。

`originally_purchased_at` が `purchased_at` より後の日付に設定されているため、リクエストが失敗しました。`originally_purchased_at` が `purchased_at` 以前の日付になるよう確認してください。

#### ボディ \{#body\}

| パラメータ   | 型      | 説明                                                         |
| ------------ | ------- | ------------------------------------------------------------ |
| errors       | Object  | <ul><li> **source**: (string) 常に `originally_purchased_at`</li><li> **errors**: エラーの説明。</li></ul> |
| error_code   | String  | エラーの短い名前。常に `originally_purchased_date_error`。   |
| status_code  | Integer | HTTP ステータス。常に `400`。                                |

#### レスポンス例 \{#response-example\}

```json showLineNumbers
{
  "errors": [
    {
      "source": "originally_purchased_at",
      "errors": [
        "originally_purchased_at must be earlier than or equal to purchased_at."
      ]
    }
  ],
  "error_code": "originally_purchased_date_error",
  "status_code": 400
}
```