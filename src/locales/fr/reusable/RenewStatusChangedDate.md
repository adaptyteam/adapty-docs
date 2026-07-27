
Le renouvellement est une prolongation d'un abonnement. L'utilisateur peut annuler la prolongation de l'abonnement, puis la reprendre. La date de ces deux actions est stockée dans le paramètre `renew_status_changed_at`. Elle ne peut jamais être antérieure à la transaction elle-même.

Pour corriger le problème, assurez-vous que `renew_status_changed_at` est postérieur à la date de la transaction (`purchased_at`).

#### Body

| Paramètre   | Type    | Description                                                  |
| ----------- | ------- | ------------------------------------------------------------ |
| errors      | Object  | <ul><li> **source** : (string) Toujours `originally_purchased_at`</li><li> **errors** : Une description de l'erreur.</li></ul> |
| error_code  | String  | Nom court de l'erreur. Toujours `originally_purchased_date_error`.  |
| status_code | Integer | Statut HTTP. Toujours `400`.                                   |

#### Exemple de réponse

```json showLineNumbers
{
  "errors": [
    {
      "source": "renew_status_changed_at",
      "errors": [
        "renew_status_changed_at must be later than purchased_at."
      ]
    }
  ],
  "error_code": "renew_status_changed_date_error",
  "status_code": 400
}
```

 

