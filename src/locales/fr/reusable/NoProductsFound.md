
La requête a échoué car les produits associés au jeton fourni n'ont pas été trouvés. Veuillez vous assurer que tous les produits requis sont ajoutés à la bonne application dans Adapty et que leur **Paddle Product ID** et **Paddle Price ID** sont correctement renseignés.

#### Body

| Parameter   | Type    | Description                                                  |
| ----------- | ------- | ------------------------------------------------------------ |
| errors      | Object  | <ul><li> **source**: (string) Toujours `non_field_errors`.</li><li> **errors**: Une description de l'erreur. </li></ul> |
| error_code  | String  | Nom court de l'erreur. Valeur possible : `no_products_found`.       |
| status_code | Integer | Statut HTTP. Toujours `400`.                                   |

#### Exemple de réponse

```json showLineNumbers
{
  "errors": [
    {
      "source": "non_field_errors",
      "errors": [
        "No products found for purchase"
      ]
    }
  ],
  "error_code": "no_products_found",
  "status_code": 400
}
```

