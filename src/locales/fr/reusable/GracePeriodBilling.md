
Le début d'un délai de grâce est considéré comme un problème de facturation. Par conséquent, si le délai de grâce a commencé (ce qu'indique le paramètre `grace_period_expires_at` renseigné), sa date de début doit être enregistrée dans le paramètre `billing_issue_detected_at`.

Pour corriger cela, soit définissez le début du délai de grâce dans `billing_issue_detected_at`, soit, si le délai de grâce n'a pas encore commencé, supprimez le paramètre `grace_period_expires_at`.

#### Body

| Paramètre   | Type    | Description                                                  |
| ----------- | ------- | ------------------------------------------------------------ |
| errors      | Object  | <ul><li> **source**: (string) Toujours `grace_period_billing_error`</li><li> **errors**: Une description de l'erreur.</li></ul> |
| error_code  | String  | Nom court de l'erreur. Toujours `grace_period_billing_error`.       |
| status_code | Integer | Statut HTTP. Toujours `400`.                                   |

#### Exemple de réponse

```json showLineNumbers
{
  "errors": [
    {
      "source": "grace_period_billing_error",
      "errors": [
        "If grace_period_expires_at is specified, billing_issue_detected_at must also be specified."
      ]
    }
  ],
  "error_code": "grace_period_billing_error",
  "status_code": 400
}
```

 