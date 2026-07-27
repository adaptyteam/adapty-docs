
La réponse signifie que votre requête n'est pas un JSON valide ou qu'un champ est manquant. Corrigez le JSON pour le rendre valide et ajoutez le paramètre manquant.

#### Corps

| Paramètre   | Type    | Description                                                  |
| ----------- | ------- | ------------------------------------------------------------ |
| errors      | Object  | <ul><li> **source**: (string) Pour un JSON invalide, la valeur sera `null`.</li><li> **errors**: Une description de l'erreur. </li></ul> |
| error_code  | String  | Nom court de l'erreur. Ici : `parse_error`.                       |
| status_code | Integer | Statut HTTP. Toujours `400`.                                   |

#### Exemple de réponse

```json showLineNumbers
{
    "errors": [
        {
            "source": null,
            "errors": [
                "JSON parse error - Expecting ',' delimiter: line 4 column 3 (char 67)"
            ]
        }
    ],
    "error_code": "parse_error",
    "status_code": 400
}
```
