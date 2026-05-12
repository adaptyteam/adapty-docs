La solicitud falló porque el parámetro `offer_category` tiene un valor distinto de `introductory` o `offer_type`, pero no incluye un `offer_id`. En ese caso, proporciona un `offer_id` o elimina `offer_category` o `offer_type` de la solicitud.

Otra posible causa es que el parámetro `offer_id` se haya añadido pero dejado como `null`, cuando no puede ser nulo. Si es así, asigna un valor a `offer_id` o elimina el parámetro por completo.

#### Body

| Parámetro   | Tipo    | Descripción                                                  |
| ----------- | ------- | ------------------------------------------------------------ |
| errors      | Object  | <ul><li> **source**: (string) Siempre `offer.category`</li><li> **errors**: Descripción del error. </li></ul> |
| error_code  | String  | Nombre corto del error. Valor posible: `missing_offer_id`.   |
| status_code | Integer | Estado HTTP. Siempre `400`.                                  |

#### Ejemplo de respuesta

El perfil no se encuentra

```json showLineNumbers
{
  "errors": [
    {
      "source": "offer_category",
      "errors": [
        "offer_id must be specified for all offer types except 'introductory'."
      ]
    }
  ],
  "error_code": "missing_offer_id",
  "status_code": 400
}
```