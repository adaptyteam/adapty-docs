
La requête a échoué car le profil dans la requête ne correspond pas au niveau d'accès spécifié. Vérifiez que l'ID de profil dans l'en-tête et l'ID de niveau d'accès dans le corps sont corrects, et assurez-vous qu'il n'y a pas de fautes de frappe.

#### Corps

| Paramètre   | Type    | Description                                                  |
| ----------- | ------- | ------------------------------------------------------------ |
| errors      | Object  | <ul><li> **source**: (string) Toujours `non_field_errors`</li><li> **errors**: Une description de l'erreur.</li></ul> |
| error_code  | String  | Nom court de l'erreur. Toujours `profile_paid_access_level_does_not_exist`. |
| status_code | Integer | Statut HTTP. Toujours `400`.                                   |

#### Exemple de réponse

```json showLineNumbers
{
  "errors": [
    {
      "source": "non_field_errors",
      "errors": [
        "Profile `478b2e7f-d557-4b8b-9c5f-cbd46fc2dee2` has no `premium` access level"
      ]
    }
  ],
  "error_code": "profile_paid_access_level_does_not_exist",
  "status_code": 400
}
```

 