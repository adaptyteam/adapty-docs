
La requête a échoué car le niveau d'accès spécifié dans la requête est introuvable. Vérifiez qu'il n'y a pas de fautes de frappe dans `access_level_id` et qu'il correspond à la bonne application.

#### Body

| Paramètre   | Type    | Description                                                  |
| ----------- | ------- | ------------------------------------------------------------ |
| errors      | Object  | <ul><li> **source** : (string) Toujours `non_field_errors`</li><li> **errors** : Description de l'erreur.</li></ul> |
| error_code  | String  | Nom court de l'erreur. Valeur possible : `paid_access_level_does_not_exist`. |
| status_code | Integer | Statut HTTP. Toujours `404`.                                   |

#### Exemple de réponse

Le niveau d'accès est introuvable.

```json showLineNumbers
{
  "errors": [
    {
      "source": "non_field_errors",
      "errors": [
        "Paid access level `premium` does not exist"
      ]
    }
  ],
  "error_code": "paid_access_level_does_not_exist",
  "status_code": 400
}
```