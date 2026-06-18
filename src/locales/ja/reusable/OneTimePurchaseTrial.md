リクエストは、買い切り購入にトライアルが指定されていたため失敗しました。サブスクリプションとは異なり、買い切り購入にはトライアルを設定できません。修正するには、[One-Time Purchase](server-side-api-objects#one-time-purchase) オブジェクト内の [Offer](server-side-api-objects#offer) オブジェクトにある `offer_type` を確認してください。`offer_type` の値に `free_trial` は指定できません。`offer_type` フィールドの値を変更するか、買い切り購入の代わりに [Subscription](server-side-api-objects#subscription) オブジェクトを使用してください。

#### Body

| パラメーター | 型      | 説明                                                         |
| ----------- | ------- | ------------------------------------------------------------ |
| errors      | Object  | <ul><li> **source**: (string) 常に offer.type</li><li> **errors**: エラーの説明。</li></ul> |
| error_code  | String  | エラーの短い名前。常に `one_time_purchase_trial_error`。    |
| status_code | Integer | HTTP ステータス。常に `400`。                                   |

#### レスポンス例

```json showLineNumbers
{
  "errors": [
    {
      "source": "offer.type",
      "errors": [
        "One-time purchase cannot have a trial."
      ]
    }
  ],
  "error_code": "one_time_purchase_trial_error",
  "status_code": 400
}
```