Объект, содержащий информацию о пейволе.

#### Свойства

| Название      | Тип              | Обязательное       | Описание                                                     |
| ------------- | ---------------- | ------------------ | ------------------------------------------------------------ |
| placement_id  | String           | :heavy_plus_sign:  | ID [плейсмента](placements), в котором отображается этот пейвол. Задаётся при создании плейсмента в дашборде Adapty. |
| variation_id  | String(uuid)     | :heavy_plus_sign:  | ID варианта, используемый для отслеживания покупок, связанных с этим конкретным пейволом. |
| paywall_id    | String(uuid)     | :heavy_plus_sign:  | Уникальный идентификатор пейвола.                            |
| ab_test_name  | String           | :heavy_minus_sign: | Название родительского A/B-теста.                            |
| paywall_name  | String           | :heavy_plus_sign:  | Название пейвола, заданное в дашборде Adapty.                |
| products      | Array of objects | :heavy_plus_sign:  | Массив объектов [Products](server-side-api-objects#product), содержащих информацию о продуктах пейвола. |
| remote_config | JSON             | :heavy_minus_sign: | Объект [RemoteConfig](web-api-objects#remoteconfig-object) в формате JSON, содержащий полный [Remote Config](customize-paywall-with-remote-config) пейвола. |

#### Пример

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