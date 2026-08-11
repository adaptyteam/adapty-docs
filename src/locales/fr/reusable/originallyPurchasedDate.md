Pour les abonnements prolongés, une chaîne de transactions est créée. La transaction originale est la première de cette chaîne et relie toutes les transactions suivantes. Chaque renouvellement est simplement une extension de cette transaction originale. Si la transaction est le premier achat, elle sert elle-même de transaction originale.

L'horodatage `originally_purchased_at` indique la date du premier achat, tandis que `purchased_at` correspond à la date de la transaction en cours. De ce fait, `purchased_at` ne peut jamais être antérieur à `originally_purchased_at` ; tout au plus, ils peuvent être identiques pour la toute première transaction.

La requête a échoué car `originally_purchased_at` est défini à une date postérieure à `purchased_at`. Assurez-vous qu'il est antérieur ou égal à `purchased_at`.

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
      "source": "originally_purchased_at",
      "errors": [
        "originally_purchased_at must be earlier than or equal to purchased_at."
      ]
    }
  ],
  "error_code": "originally_purchased_date_error",
  "status_code": 400
}
```

 
