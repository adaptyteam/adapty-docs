
La requête a échoué car le paramètre `offer_category` a une valeur autre que `introductory` ou `offer_type`, mais n'inclut pas d'`offer_id`. Dans ce cas, fournissez un `offer_id` ou supprimez `offer_category` ou `offer_type` de la requête.

Une autre raison possible est que le paramètre `offer_id` a été ajouté mais laissé à `null`, alors qu'il ne peut pas être nul. Dans ce cas, ajoutez une valeur pour `offer_id` ou supprimez entièrement le paramètre.

#### Body

| Paramètre   | Type    | Description                                                  |
| ----------- | ------- | ------------------------------------------------------------ |
| errors      | Object  | <ul><li> **source**: (string) Toujours `offer.category`</li><li> **errors**: Une description de l'erreur. </li></ul> |
| error_code  | String  | Nom court de l'erreur. Valeur possible : `missing_offer_id`.        |
| status_code | Integer | Statut HTTP. Toujours `400`.                                   |

#### Exemple de réponse

Le profil est introuvable

```json showLineNumbers
{
  "errors": [
    {
      "source": "offer_category",
      "errors": [
        "offer_id must be specified for all offer types except 'introductory'."
      ]
    }
  ],
  "error_code": "missing_offer_id",
  "status_code": 400
}
```

 





