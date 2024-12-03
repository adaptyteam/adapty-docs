



<!-- PaywallObject -->

The object that contains information on a paywall

| Name          | Type             | Required           | Description                                                  |
| ------------- | ---------------- | ------------------ | ------------------------------------------------------------ |
| placement_id  | String           | :heavy_plus_sign:  | The identifier of the [Placement](https://adapty.io/docs/placements). This is the value you specified when creating a placement in your Adapty Dashboard. |
| variation_id  | String(uuid)     | :heavy_plus_sign:  | The variation ID used to trace purchases to the specific paywall they were made from. |
| paywall_id    | String(uuid)     | :heavy_plus_sign:  | An identifier of the newly created paywall.                  |
| ab_test_name  | String           | :heavy_minus_sign: | Parent A/B test name                                         |
| paywall_name  | String           | :heavy_plus_sign:  | Paywall name                                                 |
| products      | Arrow of objects | :heavy_plus_sign:  | Array of [Products](web-api-objects#variationproduct) objects that contain paywall product info. |
| remote_config | JSON             | :heavy_minus_sign: | [RemoteConfig](web-api-objects#variationremoteconfigdata) object as a JSON that contains the complete [remote config](customize-paywall-with-remote-config) of the paywall. |

#### Example

```json
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