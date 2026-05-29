El período de gracia es tiempo adicional que puedes conceder a tus clientes para renovar su suscripción si no pudieron hacerlo a tiempo, por ejemplo, si su tarjeta de crédito fue rechazada. Esto permite mantener su configuración intacta mientras resuelven el problema. Ofrecer un período de gracia es opcional.

Si ofreces un período de gracia, la fecha de vencimiento del mismo (`grace_period_expires_at`) debe ser posterior a la fecha de vencimiento de la suscripción (`expires_at`). De lo contrario, la fecha de vencimiento del período de gracia coincidirá con la de la suscripción. En cualquier caso, el vencimiento del período de gracia no puede ser anterior al de la suscripción.

Para solucionar esto, asegúrate de que la fecha de vencimiento del período de gracia (`grace_period_expires_at`) sea posterior a la fecha de vencimiento de la suscripción (`expires_at`).

#### Body

| Parámetro   | Tipo    | Descripción                                                  |
| ----------- | ------- | ------------------------------------------------------------ |
| errors      | Object  | <ul><li> **source**: (string) Siempre `grace_period_expires_at`</li><li> **errors**: Descripción del error.</li></ul> |
| error_code  | String  | Nombre corto del error. Siempre `grace_period_expires_date_error`.  |
| status_code | Integer | Estado HTTP. Siempre `400`.                                   |

#### Ejemplo de respuesta

```json showLineNumbers
{
  "errors": [
    {
      "source": "grace_period_expires_at",
      "errors": [
        "grace_period_expires_at must be later or equal to expires_at."
      ]
    }
  ],
  "error_code": "grace_period_expires_date_error",
  "status_code": 400
}
```