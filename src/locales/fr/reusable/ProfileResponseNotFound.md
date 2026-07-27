
<p> </p>
La requête a échoué car le profil spécifié est introuvable. Vérifiez que le `customer_user_id` ou le `profile_id` ne contient pas de fautes de frappe.

##### Body

| Parameter   | Type    | Description                                                  |
| ----------- | ------- | ------------------------------------------------------------ |
| errors      | Object  | <ul><li> **source**: (string) Toujours `null`.</li><li> **errors**: Une description de l'erreur.</li></ul> |
| error_code  | String  | Nom court de l'erreur. Toujours `profile_does_not_exist`.           |
| status_code | Integer | Statut HTTP. Toujours `404`.                                   |

##### Exemple de réponse

```json showLineNumbers
{
    "errors": [
        {
            "source": null,
            "errors": [
                "Profile not found"
            ]
        }
    ],
    "error_code": "profile_does_not_exist",
    "status_code": 404
}
```

 

