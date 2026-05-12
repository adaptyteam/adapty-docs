La solicitud falló por una de dos razones: las credenciales de Paddle en [App Settings](https://app.adapty.io/settings/paddle) son incorrectas, o el token proporcionado no es válido. Por favor, comprueba lo siguiente:

1. La **Paddle API Key** en [App Settings](https://app.adapty.io/settings/paddle) es correcta y pertenece a la app adecuada.
2. El `paddle_token` que estás usando existe en la app y no tiene errores tipográficos en tu solicitud.

#### Body

| Parámetro   | Tipo    | Descripción                                                  |
| ----------- | ------- | ------------------------------------------------------------ |
| errors      | Object  | <ul><li> **source**: (string) Siempre `non_field_errors`.</li><li> **errors**: Una descripción del error. </li></ul> |
| error_code  | String  | Nombre corto del error. Valor posible: `invalid_paddle_credentials_or_purchase_not_found`. |
| status_code | Integer | Estado HTTP. Siempre `400`.                                   |

#### Ejemplo de respuesta

```json showLineNumbers
{
  "errors": [
    {
      "source": "non_field_errors",
      "errors": [
        "Invalid Paddle credentials or purchase not found"
      ]
    }
  ],
  "error_code": "invalid_paddle_credentials_or_purchase_not_found",
  "status_code": 400
}
```