La solicitud falló porque incluye `cancellation_reason` sin una fecha `refunded_at`, o tiene `refunded_at` sin un `cancellation_reason`.

Cuando se establece un reembolso, hay que especificar tanto la fecha como el motivo del reembolso.

#### Cuerpo

| Parámetro   | Tipo    | Descripción                                                  |
| ----------- | ------- | ------------------------------------------------------------ |
| errors      | Object  | <ul><li> **source**: (string) Siempre `refunded_at`</li><li> **errors**: Una descripción del error.</li></ul> |
| error_code  | String  | Nombre corto del error. Siempre `refund_fields_error`.              |
| status_code | Integer | Estado HTTP. Siempre `400`.                                   |

#### Ejemplo de respuesta

```json showLineNumbers
{
  "errors": [
    {
      "source": "refunded_at",
      "errors": [
        "refunded_at and cancellation_reason=refund must be specified together."
      ]
    }
  ],
  "error_code": "refund_fields_error",
  "status_code": 400
}
```