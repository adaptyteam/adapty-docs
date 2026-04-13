Paywall hakkında bilgi içeren nesne.

#### Özellikler

| Ad            | Tür              | Zorunlu            | Açıklama                                                     |
| ------------- | ---------------- | ------------------ | ------------------------------------------------------------ |
| placement_id  | String           | :heavy_plus_sign:  | Bu paywall'ın gösterildiği [Placement](placements)'ın ID'si. Bu değer, Adapty Kontrol Paneli'nde bir placement oluştururken belirlenir. |
| variation_id  | String(uuid)     | :heavy_plus_sign:  | Bu paywall'a bağlı satın alımları takip etmek için kullanılan varyant ID'si. |
| paywall_id    | String(uuid)     | :heavy_plus_sign:  | Paywall'ın benzersiz tanımlayıcısı.                          |
| ab_test_name  | String           | :heavy_minus_sign: | Üst A/B testinin adı.                                        |
| paywall_name  | String           | :heavy_plus_sign:  | Adapty Kontrol Paneli'nde tanımlandığı şekliyle paywall'ın adı. |
| products      | Array of objects | :heavy_plus_sign:  | Paywall için ürün bilgilerini içeren [Products](server-side-api-objects#product) nesnelerinden oluşan dizi. |
| remote_config | JSON             | :heavy_minus_sign: | Paywall'ın tam [remote config](customize-paywall-with-remote-config)'unu içeren JSON formatında bir [RemoteConfig](web-api-objects#remoteconfig-object) nesnesi. |

#### Örnek

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