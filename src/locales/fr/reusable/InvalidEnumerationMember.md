
La requête a échoué car la valeur du champ `status` est invalide. Vérifiez les fautes de frappe. Les valeurs possibles sont `organic`, `non_organic` et `unknown`.

#### Body

| Paramètre   | Type    | Description                                                  |
| ----------- | ------- | ------------------------------------------------------------ |
| errors      | Object  | <ul><li> **source** : (string) Toujours `status`.</li><li> **errors** : Description de l'erreur. Ici : `value is not a valid enumeration member; permitted: 'organic', 'non_organic', 'unknown'`</li></ul> |
| error_code  | String  | Nom court de l'erreur. Ici : `enum`.                              |
| status_code | Integer | Statut HTTP. Toujours `400`.                                   |

#### Exemple de réponse

```json showLineNumbers
{
    "errors": [
        {
            "source": "status",
            "errors": [
                "value is not a valid enumeration member; permitted: 'organic', 'non_organic', 'unknown'"
            ]
        }
    ],
    "error_code": "enum",
    "status_code": 400
}
```

