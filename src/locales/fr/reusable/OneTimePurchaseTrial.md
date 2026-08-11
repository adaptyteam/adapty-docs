
La requête a échoué car un essai a été fourni avec un achat unique. Contrairement aux abonnements, les achats uniques ne peuvent pas avoir d'essai. Pour corriger cela, vérifiez le champ `offer_type` dans l'objet [Offer](server-side-api-objects#offer) au sein de l'objet [One-Time Purchase](server-side-api-objects#one-time-purchase). La valeur de `offer_type` ne peut pas être `free_trial`. Modifiez la valeur du champ `offer_type` ou utilisez l'objet [Subscription](server-side-api-objects#subscription) à la place de One-Time Purchase.

#### Body

| Parameter   | Type    | Description                                                  |
| ----------- | ------- | ------------------------------------------------------------ |
| errors      | Object  | <ul><li> **source**: (string) Toujours offer.type</li><li> **errors**: Une description de l'erreur.</li></ul> |
| error_code  | String  | Nom court de l'erreur. Toujours `one_time_purchase_trial_error`.    |
| status_code | Integer | Statut HTTP. Toujours `400`.                                   |

#### Exemple de réponse

```json showLineNumbers
{
  "errors": [
    {
      "source": "offer.type",
      "errors": [
        "One-time purchase cannot have a trial."
      ]
    }
  ],
  "error_code": "one_time_purchase_trial_error",
  "status_code": 400
}
```

 
