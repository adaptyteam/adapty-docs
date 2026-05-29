Un problema de facturación ocurre cuando hay un error durante un intento de renovación de suscripción, por lo que siempre ocurre después de la fecha de la transacción (`purchased_at`).

Para resolverlo, asegúrate de que la fecha del problema de facturación (`billing_issue_detected_at`) sea posterior a la fecha de la transacción (`purchased_at`).

#### Body

| Parámetro   | Tipo    | Descripción                                                  |
| ----------- | ------- | ------------------------------------------------------------ |
| errors      | Object  | <ul><li> **source**: (string) Siempre `billing_issue_detected_at`</li><li> **errors**: Una descripción del error.</li></ul> |
| error_code  | String  | Nombre corto del error. Siempre `billing_issue_detected_at_date_comparison_error`. |
| status_code | Integer | Estado HTTP. Siempre `400`.                                   |

#### Ejemplo de respuesta

```json showLineNumbers
{
  "errors": [
    {
      "source": "billing_issue_detected_at",
      "errors": [
        "billing_issue_detected_at must be later than purchased_at."
      ]
    }
  ],
  "error_code": "billing_issue_detected_at_date_comparison_error",
  "status_code": 400
}
```