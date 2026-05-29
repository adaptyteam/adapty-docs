El objeto que contiene información sobre un paywall.

#### Propiedades

| Nombre        | Tipo             | Requerido          | Descripción                                                  |
| ------------- | ---------------- | ------------------ | ------------------------------------------------------------ |
| placement_id  | String           | :heavy_plus_sign:  | El ID del [Placement](placements) donde se muestra este paywall. Este valor se define al crear un placement en tu Adapty Dashboard. |
| variation_id  | String(uuid)     | :heavy_plus_sign:  | El ID de variante usado para rastrear las compras vinculadas a este paywall específico. |
| paywall_id    | String(uuid)     | :heavy_plus_sign:  | El identificador único del paywall.                          |
| ab_test_name  | String           | :heavy_minus_sign: | El nombre de la prueba A/B principal.                        |
| paywall_name  | String           | :heavy_plus_sign:  | El nombre del paywall, tal como se define en tu Adapty Dashboard. |
| products      | Array of objects | :heavy_plus_sign:  | Array de objetos [Products](server-side-api-objects#product) con la información de los productos del paywall. |
| remote_config | JSON             | :heavy_minus_sign: | Un objeto [RemoteConfig](web-api-objects#remoteconfig-object) en formato JSON que contiene el [Remote Config](customize-paywall-with-remote-config) completo del paywall. |

#### Ejemplo

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