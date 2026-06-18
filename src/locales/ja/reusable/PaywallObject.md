ペイウォールに関する情報を含むオブジェクトです。

#### プロパティ

| 名前          | 型             | 必須           | 説明                                                  |
| ------------- | ---------------- | ------------------ | ------------------------------------------------------------ |
| placement_id  | String           | :heavy_plus_sign:  | このペイウォールが表示される[プレースメント](placements)のID。Adapty ダッシュボードでプレースメントを作成する際に設定します。 |
| variation_id  | String(uuid)     | :heavy_plus_sign:  | この特定のペイウォールに紐づく購入を追跡するために使用するバリアションID。 |
| paywall_id    | String(uuid)     | :heavy_plus_sign:  | ペイウォールの一意の識別子。                        |
| ab_test_name  | String           | :heavy_minus_sign: | 親A/B テストの名前。                             |
| paywall_name  | String           | :heavy_plus_sign:  | Adapty ダッシュボードで定義されたペイウォールの名前。 |
| products      | Array of objects | :heavy_plus_sign:  | ペイウォールのプロダクト情報を含む[プロダクト](server-side-api-objects#product)オブジェクトの配列。 |
| remote_config | JSON             | :heavy_minus_sign: | ペイウォールの完全な[リモートコンフィグ](customize-paywall-with-remote-config)をJSON形式で含む[RemoteConfig](web-api-objects#remoteconfig-object)オブジェクト。 |

#### 例

```json showLineNumbers title="JSON"
{
  "placement_id": "PaywallPlacementId",
  "variation_id": "00000000-0000-0000-0000-000000000000",
  "paywall_id": "InternalPaywallId",
  "ab_test_name": "Existing Offer | Improved Offer",
  "paywall_name": "Used Paywall",
  "products": [
    {
      "title": "Monthly Subscription w/o Trial",
      "is_consumable": true,
      "adapty_product_id": "InternalProductId",
      "vendor_product_id": "onemonth_no_trial",
      "introductory_offer_eligibility": false,
      "promotional_offer_eligibility": true,
      "base_plan_id": "B1",
      "offer": {
        "category": "promotional",
        "type": "pay_up_front",
        "id": "StoreOfferId"
      }
    }
  ],
  "remote_config": {
    "lang": "en",
    "data": "RemoteConfigObject"
  }
}
```