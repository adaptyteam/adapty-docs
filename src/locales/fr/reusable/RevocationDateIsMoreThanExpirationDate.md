
La requête a échoué car le paramètre `revoke_at` défini dans la requête est postérieur au paramètre `expires_at` du niveau d'accès actuel. Si vous souhaitez prolonger le niveau d'accès, utilisez la requête [Accorder un niveau d'accès](https://adapty.io/docs/fr/api-adapty/operations/grantAccessLevel).

#### Body

| Paramètre   | Type    | Description                                                  |
| ----------- | ------- | ------------------------------------------------------------ |
| errors      | Object  | <ul><li> **source** : (string) Toujours `non_field_errors`</li><li> **errors** : Une description de l'erreur.</li></ul> |
| error_code  | String  | Nom court de l'erreur. Toujours `revocation_date_more_than_expiration_date`. |
| status_code | Integer | Statut HTTP. Toujours `400`.                                   |

#### Exemple de réponse

```json showLineNumbers
  {
  "errors": [
    {
      "source": "revoke_at",
      "errors": [
        "Revocation date (2029-08-29 09:33:42+00:00) is more than current expiration date (2028-08-29 09:33:42+00:00)"
      ]
    }
  ],
  "error_code": "revocation_date_more_than_expiration_date",
  "status_code": 400
}
```
