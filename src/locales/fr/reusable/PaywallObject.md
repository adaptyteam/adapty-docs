
L'objet qui contient les informations sur un paywall.

#### Propriétés

| Nom           | Type             | Requis             | Description                                                  |
| ------------- | ---------------- | ------------------ | ------------------------------------------------------------ |
| placement_id  | String           | :heavy_plus_sign:  | L'ID du [Placement](placements) où ce paywall est affiché. Cette valeur est définie lors de la création d'un placement dans votre Adapty Dashboard. |
| variation_id  | String(uuid)     | :heavy_plus_sign:  | L'ID de variante utilisé pour suivre les achats liés à ce paywall spécifique. |
| paywall_id    | String(uuid)     | :heavy_plus_sign:  | L'identifiant unique du paywall.                             |
| ab_test_name  | String           | :heavy_minus_sign: | Le nom du test A/B parent.                                   |
| paywall_name  | String           | :heavy_plus_sign:  | Le nom du paywall, tel que défini dans votre Adapty Dashboard. |
| products      | Array of objects | :heavy_plus_sign:  | Tableau d'objets [Products](server-side-api-objects#product) contenant les informations sur les produits du paywall. |
| remote_config | JSON             | :heavy_minus_sign: | Un objet [RemoteConfig](web-api-objects#remoteconfig-object) au format JSON contenant la [Remote Config](customize-paywall-with-remote-config) complète du paywall. |

#### Exemple

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
