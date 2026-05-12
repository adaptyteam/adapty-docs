El inicio de un período de gracia se considera un problema de facturación. Por lo tanto, si el período de gracia ha comenzado (indicado por el parámetro `grace_period_expires_at` con un valor), su fecha de inicio debe registrarse en el parámetro `billing_issue_detected_at`.

Para corregir esto, establece el inicio del período de gracia en `billing_issue_detected_at` o, si el período de gracia aún no ha comenzado, elimina el parámetro `grace_period_expires_at`.

#### Body

| Parámetro   | Tipo    | Descripción                                                  |
| ----------- | ------- | ------------------------------------------------------------ |
| errors      | Object  | <ul><li> **source**: (string) Siempre `grace_period_billing_error`</li><li> **errors**: Una descripción del error.</li></ul> |
| error_code  | String  | Nombre corto del error. Siempre `grace_period_billing_error`.       |
| status_code | Integer | Estado HTTP. Siempre `400`.                                   |

#### Ejemplo de respuesta

```json showLineNumbers
{
  "errors": [
    {
      "source": "grace_period_billing_error",
      "errors": [
        "If grace_period_expires_at is specified, billing_issue_detected_at must also be specified."
      ]
    }
  ],
  "error_code": "grace_period_billing_error",
  "status_code": 400
}
```