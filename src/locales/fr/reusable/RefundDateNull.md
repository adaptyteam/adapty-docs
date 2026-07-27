
La requête a échoué car elle contient `cancellation_reason` sans date `refunded_at`, ou `refunded_at` sans `cancellation_reason`.

Lorsqu'un remboursement est défini, la date et la raison du remboursement doivent toutes les deux être renseignées.

#### Corps

| Paramètre   | Type    | Description                                                  |
| ----------- | ------- | ------------------------------------------------------------ |
| errors      | Object  | <ul><li> **source** : (string) Toujours `refunded_at`</li><li> **errors** : Description de l'erreur.</li></ul> |
| error_code  | String  | Nom court de l'erreur. Toujours `refund_fields_error`.              |
| status_code | Integer | Statut HTTP. Toujours `400`.                                   |

#### Exemple de réponse

```json showLineNumbers
{
  "errors": [
    {
      "source": "refunded_at",
      "errors": [
        "refunded_at and cancellation_reason=refund must be specified together."
      ]
    }
  ],
  "error_code": "refund_fields_error",
  "status_code": 400
}
```

 
