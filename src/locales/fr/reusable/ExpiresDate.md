
Un utilisateur ne peut pas acheter un abonnement déjà expiré. Par conséquent, la date `expires_at` (date d'expiration de l'abonnement) doit toujours être postérieure à la date `purchased_at` (date de la transaction).

Pour corriger ce problème, vérifiez ces dates et assurez-vous que `expires_at` est bien après `purchased_at`.

#### Body

| Parameter   | Type    | Description                                                  |
| ----------- | ------- | ------------------------------------------------------------ |
| errors      | Object  | <ul><li> **source** : (string) Toujours `expires_at`</li><li> **errors** : Description de l'erreur.</li></ul> |
| error_code  | String  | Nom court de l'erreur. Toujours `expires_date_error`.               |
| status_code | Integer | Statut HTTP. Toujours `400`.                                   |

#### Exemple de réponse

```json showLineNumbers
{
  "errors": [
    {
      "source": "expires_at",
      "errors": [
        "expires_at must be later than purchased_at."
      ]
    }
  ],
  "error_code": "expires_date_error",
  "status_code": 400
}
```

 