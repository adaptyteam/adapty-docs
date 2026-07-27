 

Dans le cas d'abonnements prolongés, une chaîne d'abonnements est générée. La transaction d'origine est la toute première transaction de cette chaîne, et la chaîne y est liée. Les autres transactions de la chaîne sont des prolongations. Si la transaction est le tout premier achat dans la chaîne d'abonnement, elle peut être sa propre transaction d'origine.

Un autre cas est celui d'un achat unique. Il ne crée jamais de chaînes car il ne peut pas avoir de prolongations. Pour lui, le `store_transaction_id` est toujours identique au `store_original_transaction_id`.

Votre requête a échoué car la valeur `store_transaction_id` de l'objet [Achat unique](server-side-api-objects#one-time-purchase) diffère de son `store_original_transaction_id`. Pour résoudre le problème, soit rendez-les identiques, soit changez l'objet — utilisez [Abonnement](server-side-api-objects#subscription) à la place de l'[Achat unique](server-side-api-objects#one-time-purchase).

#### Corps \{#body\}

| Paramètre   | Type    | Description                                                  |
| ----------- | ------- | ------------------------------------------------------------ |
| errors      | Object  | <ul><li> **source** : (string) Toujours `store_transaction_id`</li><li> **errors** : Une description de l'erreur.</li></ul> |
| error_code  | String  | Nom court de l'erreur. Toujours `store_transaction_id_error`.       |
| status_code | Integer | Statut HTTP. Toujours `400.`                                   |

#### Exemple de réponse \{#response-example\}

```json showLineNumbers
{
  "errors": [
    {
      "source": "store_transaction_id",
      "errors": [
        "store_transaction_id must be equal to store_original_transaction_id for purchase."
      ]
    }
  ],
  "error_code": "store_transaction_id_error",
  "status_code": 400
}
```

 