
Le délai de grâce est une période supplémentaire que vous pouvez accorder aux clients pour prolonger leur abonnement s'ils n'ont pas pu le renouveler à temps — par exemple, si leur carte bancaire a été refusée. Cela permet de conserver leurs paramètres intacts le temps qu'ils règlent le problème. Proposer un délai de grâce est facultatif.

Si vous proposez un délai de grâce, la date d'expiration de celui-ci (`grace_period_expires_at`) doit être postérieure à la date d'expiration de l'abonnement (`expires_at`). Sinon, la date d'expiration du délai de grâce correspondra à celle de l'abonnement. Dans tous les cas, la date d'expiration du délai de grâce ne peut pas être antérieure à celle de l'abonnement.

Pour corriger cela, assurez-vous que la date d'expiration du délai de grâce (`grace_period_expires_at`) est postérieure à la date d'expiration de l'abonnement (`expires_at`).

#### Body

| Parameter   | Type    | Description                                                  |
| ----------- | ------- | ------------------------------------------------------------ |
| errors      | Object  | <ul><li> **source**: (string) Toujours `grace_period_expires_at`</li><li> **errors**: Description de l'erreur.</li></ul> |
| error_code  | String  | Nom court de l'erreur. Toujours `grace_period_expires_date_error`.  |
| status_code | Integer | Statut HTTP. Toujours `400`.                                   |

#### Exemple de réponse

```json showLineNumbers
{
  "errors": [
    {
      "source": "grace_period_expires_at",
      "errors": [
        "grace_period_expires_at must be later or equal to expires_at."
      ]
    }
  ],
  "error_code": "grace_period_expires_date_error",
  "status_code": 400
}
```

