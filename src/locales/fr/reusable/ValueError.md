
La requête a échoué car la date de révocation spécifiée est dans le passé. Définissez `revoke_at` à une date future ou à `null` pour révoquer l'accès immédiatement.

##### Body

| Paramètre   | Type    | Description                                                  |
| ----------- | ------- | ------------------------------------------------------------ |
| errors      | Object  | <ul><li> **source**: (string) Toujours `revoke_at`.</li><li> **errors**: Une description de l'erreur.</li></ul> |
| error_code  | String  | Nom court de l'erreur. Toujours `value_error`.               |
| status_code | Integer | Statut HTTP. Toujours `400`.                                 |

##### Exemple de réponse

```json showLineNumbers
{
    "errors": [
        {
            "source": null,
            "errors": [
                "Must be greater than the current time or null"
            ]
        }
    ],
    "error_code": "value_error",
    "status_code": 400
}
```

 

