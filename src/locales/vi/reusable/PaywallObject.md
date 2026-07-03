Đối tượng chứa thông tin về một paywall.

#### Thuộc tính

| Tên           | Kiểu             | Bắt buộc           | Mô tả                                                        |
| ------------- | ---------------- | ------------------ | ------------------------------------------------------------ |
| placement_id  | String           | :heavy_plus_sign:  | ID của [Placement](placements) nơi paywall này được hiển thị. Giá trị này được đặt khi tạo placement trong Adapty Dashboard của bạn. |
| variation_id  | String(uuid)     | :heavy_plus_sign:  | ID biến thể dùng để theo dõi các giao dịch mua liên kết với paywall cụ thể này. |
| paywall_id    | String(uuid)     | :heavy_plus_sign:  | Mã định danh duy nhất của paywall.                           |
| ab_test_name  | String           | :heavy_minus_sign: | Tên của A/B test cha.                                        |
| paywall_name  | String           | :heavy_plus_sign:  | Tên của paywall, như đã được định nghĩa trong Adapty Dashboard của bạn. |
| products      | Array of objects | :heavy_plus_sign:  | Mảng các đối tượng [Products](server-side-api-objects#product) chứa thông tin sản phẩm cho paywall. |
| remote_config | JSON             | :heavy_minus_sign: | Đối tượng [RemoteConfig](web-api-objects#remoteconfig-object) ở định dạng JSON chứa toàn bộ [remote config](customize-paywall-with-remote-config) của paywall. |

#### Ví dụ

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