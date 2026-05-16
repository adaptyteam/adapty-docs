Un usuario no puede comprar una suscripción que ya ha expirado. Por lo tanto, la fecha `expires_at` (cuando expira la suscripción) siempre debe ser posterior a la fecha `purchased_at` (cuando se realizó la transacción).

Para solucionar esto, comprueba estas fechas y asegúrate de que `expires_at` sea posterior a `purchased_at`.

#### Body

| Parámetro   | Tipo    | Descripción                                                  |
| ----------- | ------- | ------------------------------------------------------------ |
| errors      | Object  | <ul><li> **source**: (string) Siempre `expires_at`</li><li> **errors**: Una descripción del error.</li></ul> |
| error_code  | String  | Nombre corto del error. Siempre `expires_date_error`.               |
| status_code | Integer | Estado HTTP. Siempre `400`.                                   |

#### Ejemplo de respuesta

```json showLineNumbers
{
  "errors": [
    {
      "source": "expires_at",
      "errors": [
        "expires_at must be later than purchased_at."
      ]
    }
  ],
  "error_code": "expires_date_error",
  "status_code": 400
}
```