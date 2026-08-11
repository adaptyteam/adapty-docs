
La requête a échoué car le paramètre `is_family_shared` est défini sur `true`, ce qui signifie que le niveau d'accès est partagé gratuitement avec un membre de la famille. Cependant, le paramètre `value` de l'objet [Price](server-side-api-objects#price) n'est pas défini sur zéro.

Si `is_family_shared` doit être `true`, assurez-vous de définir le paramètre `value` de l'objet [Price](server-side-api-objects#price) sur `0`.

#### Body

| Paramètre   | Type    | Description                                                  |
| ----------- | ------- | ------------------------------------------------------------ |
| errors      | Object  | <ul><li> **source** : (string) Toujours `is_family_shared`</li><li> **errors** : Description de l'erreur.</li></ul> |
| error_code  | String  | Nom court de l'erreur. Toujours : `family_share_price_error`. |
| status_code | Integer | Statut HTTP. Toujours `400`.                                 |

#### Exemple de réponse

Le profil est introuvable

```json showLineNumbers
{
  "errors": [
    {
      "source": "is_family_shared",
      "errors": [
        "If is_family_shared is true, price.value must be 0."
      ]
    }
  ],
  "error_code": "family_share_price_error",
  "status_code": 400
}
```

 
