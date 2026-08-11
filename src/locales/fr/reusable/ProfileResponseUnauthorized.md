
<p> </p>

La requête a échoué en raison d'une autorisation manquante ou incorrecte. Consultez la page [Autorisation](ss-authorization), en portant une attention particulière à l'**Authorization header**.

La requête a également échoué car le profil spécifié est introuvable.

#### Body

| Paramètre   | Type    | Description                                                  |
| ----------- | ------- | ------------------------------------------------------------ |
| errors      | Object  | <ul><li> **source** : (string) Toujours `non_field_errors`.</li><li> **errors** : Description de l'erreur.</li></ul> |
| error_code  | String  | Nom court de l'erreur. Toujours `not_authenticated`.                |
| status_code | Integer | Statut HTTP. Toujours `401.`                                   |

#### Exemple de réponse

```json showLineNumbers
{
  "errors": [
    {
      "source": "non_field_errors",
      "errors": [
        "Authentication credentials were not provided."
      ]
    }
  ],
  "error_code": "not_authenticated",
  "status_code": 401
}
```

 
