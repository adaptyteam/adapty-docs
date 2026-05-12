La solicitud falló porque el parámetro `is_family_shared` está establecido en `true`, lo que significa que el nivel de acceso se comparte con un familiar de forma gratuita. Sin embargo, el parámetro `value` del objeto [Price](server-side-api-objects#price) no está establecido en cero.

Si `is_family_shared` debe ser `true`, asegúrate de establecer el parámetro `value` del objeto [Price](server-side-api-objects#price) en `0`.

#### Body

| Parámetro   | Tipo    | Descripción                                                  |
| ----------- | ------- | ------------------------------------------------------------ |
| errors      | Object  | <ul><li> **source**: (string) Siempre `is_family_shared`</li><li> **errors**: Una descripción del error.</li></ul> |
| error_code  | String  | Nombre corto del error. Siempre: `family_share_price_error`. |
| status_code | Integer | Estado HTTP. Siempre `400`.                                  |

#### Ejemplo de respuesta

El perfil no se encuentra

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