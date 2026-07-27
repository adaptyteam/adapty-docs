 

Un problème de facturation survient lorsqu'il y a un problème lors d'une tentative de renouvellement d'abonnement, il se produit donc toujours après la date de transaction (`purchased_at`).

Pour résoudre ce problème, assurez-vous que la date du problème de facturation (`billing_issue_detected_at`) est postérieure à la date de transaction (`purchased_at`).

#### Body

| Parameter   | Type    | Description                                                  |
| ----------- | ------- | ------------------------------------------------------------ |
| errors      | Object  | <ul><li> **source**: (string) Toujours `billing_issue_detected_at`</li><li> **errors**: Une description de l'erreur.</li></ul> |
| error_code  | String  | Nom court de l'erreur. Toujours `billing_issue_detected_at_date_comparison_error`. |
| status_code | Integer | Statut HTTP. Toujours `400`.                                   |

#### Exemple de réponse

```json showLineNumbers
{
  "errors": [
    {
      "source": "billing_issue_detected_at",
      "errors": [
        "billing_issue_detected_at must be later than purchased_at."
      ]
    }
  ],
  "error_code": "billing_issue_detected_at_date_comparison_error",
  "status_code": 400
}
```

