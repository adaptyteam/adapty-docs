`offer_type` パラメーターが `free_trial` に設定されているにもかかわらず、[Price](server-side-api-objects#price) オブジェクトの `value` パラメーターがゼロに設定されていないため、リクエストが失敗しました。

別の原因として、`offer_id` パラメーターが含まれているにもかかわらず `null` のままになっているケースが考えられます。このパラメーターに `null` は指定できません。`offer_id` に値を指定するか、パラメーター自体を削除してください。

#### Body

| パラメーター | 型      | 説明                                                         |
| ------------ | ------- | ------------------------------------------------------------ |
| errors       | Object  | <ul><li> **source**: (string) 常に `offer.type`</li><li> **errors**: エラーの説明。</li></ul> |
| error_code   | String  | エラーの短い名前。常に `free_trial_price_error`。            |
| status_code  | Integer | HTTP ステータス。常に `400`。                                |

#### レスポンス例

プロファイルが見つかりません

```json showLineNumbers
{
  "errors": [
    {
      "source": "offer_type",
      "errors": [
        "If offer_type is 'free_trial', price.value must be 0."
      ]
    }
  ],
  "error_code": "free_trial_price_error",
  "status_code": 400
}
```