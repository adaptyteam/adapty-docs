
La requête a échoué car la **Paddle API Key** dans [App Settings](https://app.adapty.io/settings/paddle) est incorrecte. Veuillez vérifier qu'elle est exacte et associée à la bonne application.

#### Body

| Paramètre   | Type    | Description                                                  |
| ----------- | ------- | ------------------------------------------------------------ |
| errors      | Object  | <ul><li> **source**: (string) Toujours `non_field_errors`.</li><li> **errors**: Une description de l'erreur. </li></ul> |
| error_code  | String  | Nom court de l'erreur. Valeur possible : `paddle_api_key_not_found`. |
| status_code | Integer | Statut HTTP. Toujours `400`.                                   |

#### Exemple de réponse

```json showLineNumbers
{
  "errors": [
    {
      "source": "non_field_errors",
      "errors": [
        "Paddle API key not found"
      ]
    }
  ],
  "error_code": "paddle_api_key_not_found",
  "status_code": 400
}
```

