La solicitud falló porque el parámetro `offer_type` está configurado como `free_trial`, pero el parámetro `value` del objeto [Price](server-side-api-objects#price) no está establecido en cero.

Otra razón posible es que el parámetro `offer_id` se incluyó pero se dejó como `null`, aunque no puede ser null. En ese caso, proporciona un valor para `offer_id` o elimina el parámetro por completo.

#### Body

| Parámetro   | Tipo    | Descripción                                                  |
| ----------- | ------- | ------------------------------------------------------------ |
| errors      | Object  | <ul><li> **source**: (string) Siempre `offer.type`</li><li> **errors**: Una descripción del error.</li></ul> |
| error_code  | String  | Nombre corto del error. Siempre: `free_trial_price_error`.   |
| status_code | Integer | Estado HTTP. Siempre `400`.                                  |

#### Ejemplo de respuesta

No se encontró el perfil

```json showLineNumbers
{
  "errors": [
    {
      "source": "offer_type",
      "errors": [
        "If offer_type is 'free_trial', price.value must be 0."
      ]
    }
  ],
  "error_code": "free_trial_price_error",
  "status_code": 400
}
```