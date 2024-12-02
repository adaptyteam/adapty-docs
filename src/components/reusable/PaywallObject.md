



<!-- PaywallObject -->

The object that contains information on a paywall

| Name          | Type                                                         | Required | Description                                                  |
| ------------- | ------------------------------------------------------------ | -------- | ------------------------------------------------------------ |
| placement_id  | string                                                       | true     | The identifier of the [Placement](https://adapty.io/docs/placements). This is the value you specified when creating a placement in your Adapty Dashboard. |
| variation_id  | string(uuid)                                                 | true     | The variation ID used to trace purchases to the specific paywall they were made from. |
| paywall_id    | string(uuid)                                                 | true     | An identifier of the newly created paywall.                  |
| ab_test_name  | string                                                       | false    | Parent A/B test name                                         |
| paywall_name  | string                                                       | true     | Paywall name                                                 |
| products      | Arrow of [VariationProduct](web-api#variationproduct)        | true     | Array of related products ids                                |
| remote_config | [VariationRemoteConfigData](web-api#variationremoteconfigdata) | false    | none                                                         |

#### Example

```json
{
  "placement_id": "string",
  "variation_id": "5130138e-590b-4f7e-8df9-63af0004262c",
  "paywall_id": "eeb111ae-cdbe-489f-9fe4-30a4b6109051",
  "ab_test_name": "string",
  "paywall_name": "string",
  "products": [
    {
      "title": "string",
      "is_consumable": true,
      "adapty_product_id": "6414dbe0-1fa8-4590-a838-ec1ead8ab951",
      "vendor_product_id": "string",
      "introductory_offer_eligibility": false,
      "promotional_offer_eligibility": false,
      "base_plan_id": "string",
      "offer": {
        "category": "no_offer",
        "type": "free_trial",
        "id": "string"
      }
    }
  ],
  "remote_config": {
    "lang": "string",
    "data": "string"
  }
}

```