サブスクリプションが継続される場合、サブスクリプションのチェーンが生成されます。オリジナルトランザクションはこのチェーンの最初のトランザクションであり、チェーンはそれによってリンクされています。チェーン内の他のトランザクションは継続分です。そのトランザクションがサブスクリプションチェーンの最初の購入である場合、それ自身がオリジナルトランザクションになることがあります。

もう一つのケースは買い切り購入です。継続が発生しないため、チェーンは作成されません。買い切り購入の場合、`store_transaction_id` は常に `store_original_transaction_id` と同じ値になります。

[買い切り購入](server-side-api-objects#one-time-purchase)オブジェクトの `store_transaction_id` の値が `store_original_transaction_id` と異なるため、リクエストが失敗しました。この問題を解決するには、両者を同じ値にするか、オブジェクトを変更して [買い切り購入](server-side-api-objects#one-time-purchase)の代わりに[サブスクリプション](server-side-api-objects#subscription)を使用してください。

#### ボディ \{#body\}

| パラメーター | 型 | 説明 |
| ----------- | ------- | ------------------------------------------------------------ |
| errors      | Object  | <ul><li> **source**: (string) 常に `store_transaction_id`</li><li> **errors**: エラーの説明。</li></ul> |
| error_code  | String  | エラーの短い名称。常に `store_transaction_id_error`。       |
| status_code | Integer | HTTPステータス。常に `400`。                                   |

#### レスポンス例 \{#response-example\}

```json showLineNumbers
{
  "errors": [
    {
      "source": "store_transaction_id",
      "errors": [
        "store_transaction_id must be equal to store_original_transaction_id for purchase."
      ]
    }
  ],
  "error_code": "store_transaction_id_error",
  "status_code": 400
}
```