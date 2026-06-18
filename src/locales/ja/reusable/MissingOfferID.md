`offer_category` パラメーターの値が `introductory` 以外であるか、`offer_type` が指定されているにもかかわらず `offer_id` が含まれていない場合、リクエストは失敗します。この場合、`offer_id` を指定するか、リクエストから `offer_category` または `offer_type` を削除してください。

また、`offer_id` パラメーターが追加されているにもかかわらず `null` のままになっている場合も原因として考えられます（`null` は許容されません）。その場合は、`offer_id` に値を設定するか、パラメーター自体を削除してください。

#### Body

| パラメーター | 型      | 説明                                                         |
| ------------ | ------- | ------------------------------------------------------------ |
| errors       | Object  | <ul><li> **source**: (string) 常に `offer.category`</li><li> **errors**: エラーの説明。</li></ul> |
| error_code   | String  | エラーの短い名前。設定可能な値: `missing_offer_id`。         |
| status_code  | Integer | HTTP ステータス。常に `400`。                                |

#### レスポンス例

プロファイルが見つかりません

```json showLineNumbers
{
  "errors": [
    {
      "source": "offer_category",
      "errors": [
        "offer_id must be specified for all offer types except 'introductory'."
      ]
    }
  ],
  "error_code": "missing_offer_id",
  "status_code": 400
}
```