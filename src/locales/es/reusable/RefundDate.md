La solicitud falló porque la fecha de compra (`purchased_at`) es anterior o igual a la fecha de reembolso (`refunded_at`). Un reembolso siempre ocurre después de una compra, ya que revierte la transacción.

Para solucionarlo, revisa los parámetros `purchased_at` y `refunded_at` y asegúrate de que la fecha de reembolso sea posterior a la fecha de compra.

#### Body

| Parámetro   | Tipo    | Descripción                                                  |
| ----------- | ------- | ------------------------------------------------------------ |
| errors      | Object  | <ul><li> **source**: (string) Siempre `refunded_at`</li><li> **errors**: Una descripción del error.</li></ul> |
| error_code  | String  | Nombre corto del error. Siempre `refund_date_error`.                |
| status_code | Integer | Estado HTTP. Siempre `400`.                                   |

#### Ejemplo de respuesta

```json showLineNumbers
{
  "errors": [
    {
      "source": "refunded_at",
      "errors": [
        "refunded_at must be later than purchased_at."
      ]
    }
  ],
  "error_code": "refund_date_error",
  "status_code": 400
}
```