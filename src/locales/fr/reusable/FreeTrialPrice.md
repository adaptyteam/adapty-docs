 

La requête a échoué car le paramètre `offer_type` est défini sur `free_trial`, mais le paramètre `value` de l'objet [Price](server-side-api-objects#price) n'est pas à zéro.

Une autre raison possible est que le paramètre `offer_id` a été inclus mais laissé à `null`, alors qu'il ne peut pas être null. Dans ce cas, fournissez une valeur pour `offer_id` ou supprimez entièrement le paramètre.

#### Body

| Parameter   | Type    | Description                                                  |
| ----------- | ------- | ------------------------------------------------------------ |
| errors      | Object  | <ul><li> **source**: (string) Toujours `offer.type`</li><li> **errors**: Description de l'erreur.</li></ul> |
| error_code  | String  | Nom court de l'erreur. Toujours : `free_trial_price_error`.          |
| status_code | Integer | Statut HTTP. Toujours `400`.                                   |

#### Exemple de réponse

Le profil est introuvable

```json showLineNumbers
{
  "errors": [
    {
      "source": "offer_type",
      "errors": [
        "If offer_type is 'free_trial', price.value must be 0."
      ]
    }
  ],
  "error_code": "free_trial_price_error",
  "status_code": 400
}
```

 