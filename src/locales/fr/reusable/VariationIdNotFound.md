
La requête a échoué car le `variation_ID` du paywall demandé est introuvable. Vérifiez que le `placement_id` que vous demandez existe bien dans l'application et qu'il ne contient pas de fautes de frappe.

#### Body

| Paramètre   | Type    | Description                                                  |
| ----------- | ------- | ------------------------------------------------------------ |
| errors      | Object  | <ul><li> **source** : (string) Toujours `bull`.</li><li> **errors** : Une description de l'erreur. </li></ul> |
| error_code  | String  | Nom court de l'erreur. Valeur possible : `VARIATION_DOES_NOT_EXIST_ERROR`. |
| status_code | Integer | Statut HTTP. Toujours `404`.                                 |

#### Exemple de réponse

```json showLineNumbers
{
    "errors": [
        {
            "source": null,
            "errors": [
                "Variation for example_onboarding does not exist."
            ]
        }
    ],
    "error_code": "VARIATION_DOES_NOT_EXIST_ERROR",
    "status_code": 404
}
```

