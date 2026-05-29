<p> </p>
La solicitud falló porque no se encontró el perfil especificado. Comprueba que `customer_user_id` o `profile_id` no tengan errores tipográficos.

##### Body

| Parámetro   | Tipo    | Descripción                                                  |
| ----------- | ------- | ------------------------------------------------------------ |
| errors      | Object  | <ul><li> **source**: (string) Siempre `null`.</li><li> **errors**: Descripción del error.</li></ul> |
| error_code  | String  | Nombre corto del error. Siempre `profile_does_not_exist`.           |
| status_code | Integer | Estado HTTP. Siempre `404`.                                   |

##### Ejemplo de respuesta

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