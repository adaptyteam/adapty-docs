 

La requête a échoué pour l'une des deux raisons suivantes : soit les identifiants Paddle dans [App Settings](https://app.adapty.io/settings/paddle) sont incorrects, soit le token fourni est invalide. Veuillez vérifier les points suivants :

1. La **Paddle API Key** dans [App Settings](https://app.adapty.io/settings/paddle) est correcte et appartient à la bonne application.
2. Le `paddle_token` que vous utilisez existe dans l'application et ne contient pas de fautes de frappe dans votre requête.

#### Body

| Paramètre   | Type    | Description                                                  |
| ----------- | ------- | ------------------------------------------------------------ |
| errors      | Object  | <ul><li> **source** : (string) Toujours `non_field_errors`.</li><li> **errors** : Une description de l'erreur. </li></ul> |
| error_code  | String  | Nom court de l'erreur. Valeur possible : `invalid_paddle_credentials_or_purchase_not_found`. |
| status_code | Integer | Statut HTTP. Toujours `400`.                                 |

#### Exemple de réponse

```json showLineNumbers
{
  "errors": [
    {
      "source": "non_field_errors",
      "errors": [
        "Invalid Paddle credentials or purchase not found"
      ]
    }
  ],
  "error_code": "invalid_paddle_credentials_or_purchase_not_found",
  "status_code": 400
}
```

