包含付费墙信息的对象。

#### 属性 \{#properties\}

| 名称          | 类型             | 是否必填           | 描述                                                  |
| ------------- | ---------------- | ------------------ | ------------------------------------------------------------ |
| placement_id  | String           | :heavy_plus_sign:  | 显示此付费墙的[版位](placements)的 ID。该值在 Adapty 控制台中创建版位时设置。 |
| variation_id  | String(uuid)     | :heavy_plus_sign:  | 用于追踪与此特定付费墙关联购买记录的实验变体 ID。 |
| paywall_id    | String(uuid)     | :heavy_plus_sign:  | 付费墙的唯一标识符。                        |
| ab_test_name  | String           | :heavy_minus_sign: | 父级 A/B 测试的名称。                             |
| paywall_name  | String           | :heavy_plus_sign:  | 付费墙的名称，如在 Adapty 控制台中定义的。 |
| products      | Array of objects | :heavy_plus_sign:  | 包含付费墙产品信息的[产品](server-side-api-objects#product)对象数组。 |
| remote_config | JSON             | :heavy_minus_sign: | JSON 格式的 [RemoteConfig](web-api-objects#remoteconfig-object) 对象，包含付费墙的完整[远程配置](customize-paywall-with-remote-config)。 |

#### 示例 \{#example\}

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