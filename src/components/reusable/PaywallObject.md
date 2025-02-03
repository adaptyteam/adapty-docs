



<!-- PaywallObject -->

The object that contains information on a paywall.

#### Properties

| Name          | Type             | Required           | Description                                                  |
| ------------- | ---------------- | ------------------ | ------------------------------------------------------------ |
| placement_id  | String           | :heavy_plus_sign:  | The ID of the [Placement](https://adapty.io/docs/placements) where this paywall is shown. This value is set when creating a placement in your Adapty Dashboard. |
| variation_id  | String(uuid)     | :heavy_plus_sign:  | The variation ID used to track purchases linked to this specific paywall. |
| paywall_id    | String(uuid)     | :heavy_plus_sign:  | The unique identifier of the paywall.                        |
| ab_test_name  | String           | :heavy_minus_sign: | The name of the parent A/B test.                             |
| paywall_name  | String           | :heavy_plus_sign:  | The name of the paywall, as defined in your Adapty Dashboard. |
| products      | Arrow of objects | :heavy_plus_sign:  | Array of [Products](server-side-api-objects#product) objects containing product information for the paywall. |
| remote_config | JSON             | :heavy_minus_sign: | A [RemoteConfig](web-api-objects#remoteconfig-object) object in JSON format containing the full [remote config](customize-paywall-with-remote-config) of the paywall. |

#### Example

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
