
La requête a échoué en raison d'une erreur dans un champ.

###### Corps

| Paramètre   | Type    | Description                                                  |
| ----------- | ------- | ------------------------------------------------------------ |
| errors      | Object  | <ul><li> **source**: (string) Champ à l'origine de la ou des erreur(s)</li><li> **errors**: (list) erreurs listées.</li></ul> |
| error_code  | String  | Nom court de l'erreur.                                       |
| status_code | Integer | Statut HTTP, toujours `400`.                                 |

###### Exemple de réponse

```json showLineNumbers
{
  "errors": [
    {
      "source": "string",
      "errors": [
        "string"
      ]
    }
  ],
  "error_code": "string",
  "status_code": 0
}
```