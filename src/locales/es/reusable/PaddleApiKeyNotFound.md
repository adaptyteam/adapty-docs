La solicitud falló porque la **Paddle API Key** en [App Settings](https://app.adapty.io/settings/paddle) es incorrecta. Por favor, verifica que sea correcta y esté asociada a la app correspondiente.

#### Body

| Parámetro   | Tipo    | Descripción                                                  |
| ----------- | ------- | ------------------------------------------------------------ |
| errors      | Object  | <ul><li> **source**: (string) Siempre `non_field_errors`.</li><li> **errors**: Una descripción del error. </li></ul> |
| error_code  | String  | Nombre corto del error. Valor posible: `paddle_api_key_not_found`. |
| status_code | Integer | Estado HTTP. Siempre `400`.                                   |

#### Ejemplo de respuesta

```json showLineNumbers
{
  "errors": [
    {
      "source": "non_field_errors",
      "errors": [
        "Paddle API key not found"
      ]
    }
  ],
  "error_code": "paddle_api_key_not_found",
  "status_code": 400
}
```