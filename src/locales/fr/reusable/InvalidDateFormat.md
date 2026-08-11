
La requête a échoué car le format du champ `visited_at` est incorrect. Utilisez le format **date ISO 8601**, par exemple `2025-01-14T14:15:22Z`.

#### Body

| Paramètre   | Type    | Description                                                  |
| ----------- | ------- | ------------------------------------------------------------ |
| errors      | Object  | <ul><li> **source** : (string) Toujours `visited_at`.</li><li> **errors** : Une description de l'erreur. </li></ul> |
| error_code  | String  | Nom court de l'erreur. Ici : `base_error`.                   |
| status_code | Integer | Statut HTTP. Toujours `400`.                                 |

#### Exemple de réponse

```json showLineNumbers
{
    "errors": [
        {
            "source": "visited_at",
            "errors": [
                "invalid datetime format"
            ]
        }
    ],
    "error_code": "datetime",
    "status_code": 400
}
```

 
