
La requête a échoué car la date d'achat (`purchased_at`) est antérieure ou égale à la date de remboursement (`refunded_at`). Un remboursement intervient toujours après un achat, puisqu'il annule la transaction.

Pour corriger ce problème, vérifiez les paramètres `purchased_at` et `refunded_at` et assurez-vous que la date de remboursement est postérieure à la date d'achat.

#### Body

| Paramètre   | Type    | Description                                                  |
| ----------- | ------- | ------------------------------------------------------------ |
| errors      | Object  | <ul><li> **source** : (string) Toujours `refunded_at`</li><li> **errors** : Description de l'erreur.</li></ul> |
| error_code  | String  | Nom court de l'erreur. Toujours `refund_date_error`.                |
| status_code | Integer | Statut HTTP. Toujours `400`.                                   |

#### Exemple de réponse

```json showLineNumbers
{
  "errors": [
    {
      "source": "refunded_at",
      "errors": [
        "refunded_at must be later than purchased_at."
      ]
    }
  ],
  "error_code": "refund_date_error",
  "status_code": 400
}
```

 
