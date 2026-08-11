
<p> </p>

La requête a échoué car le profil indiqué dans l'en-tête de la requête est introuvable. Vérifiez qu'il n'y a pas de fautes de frappe dans le `profile_id` ou le `customer_user_id` saisi dans l'en-tête, et assurez-vous qu'il correspond à la bonne application.

#### Corps

| Paramètre   | Type    | Description                                                  |
| ----------- | ------- | ------------------------------------------------------------ |
| errors      | Object  | <ul><li> **source** : (string) Toujours `non_field_errors`</li><li> **errors** : Une description de l'erreur. </li></ul> |
| error_code  | String  | Nom court de l'erreur. Valeur possible : `profile_does_not_exist`.  |
| status_code | Integer | Statut HTTP. Toujours `400`.                                   |

#### Exemple de réponse

Le profil est introuvable

```json showLineNumbers
{
  "errors": [
    {
      "source": "non_field_errors",
      "errors": [
        "Profile not found"
      ]
    }
  ],
  "error_code": "profile_does_not_exist",
  "status_code": 400
}
```

 