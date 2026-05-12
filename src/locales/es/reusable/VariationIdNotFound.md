La solicitud falló porque no se encontró el `variation_ID` para el paywall solicitado. Comprueba que el `placement_id` que estás solicitando existe en la app y que no hay erratas en él.

#### Body

| Parámetro   | Tipo    | Descripción                                                  |
| ----------- | ------- | ------------------------------------------------------------ |
| errors      | Object  | <ul><li> **source**: (string) Siempre `bull`.</li><li> **errors**: Una descripción del error. </li></ul> |
| error_code  | String  | Nombre corto del error. Valor posible: `VARIATION_DOES_NOT_EXIST_ERROR`. |
| status_code | Integer | Estado HTTP. Siempre `404`.                                   |

#### Ejemplo de respuesta

```json showLineNumbers
{
    "errors": [
        {
            "source": null,
            "errors": [
                "Variation for example_onboarding does not exist."
            ]
        }
    ],
    "error_code": "VARIATION_DOES_NOT_EXIST_ERROR",
    "status_code": 404
}
```