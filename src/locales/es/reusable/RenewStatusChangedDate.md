La renovación es una prolongación de una suscripción. El usuario puede cancelar la prolongación de la suscripción y luego volver a prolongarla. La fecha de ambas acciones se almacena en el parámetro `renew_status_changed_at`, que nunca puede ser anterior a la propia transacción.

Para solucionar el problema, asegúrate de que `renew_status_changed_at` sea posterior a la fecha de la transacción (`purchased_at`).

#### Body \{#body\}

| Parámetro   | Tipo    | Descripción                                                  |
| ----------- | ------- | ------------------------------------------------------------ |
| errors      | Object  | <ul><li> **source**: (string) Siempre `originally_purchased_at`</li><li> **errors**: Una descripción del error.</li></ul> |
| error_code  | String  | Nombre corto del error. Siempre `originally_purchased_date_error`.  |
| status_code | Integer | Estado HTTP. Siempre `400`.                                   |

#### Ejemplo de respuesta \{#response-example\}

```json showLineNumbers
{
  "errors": [
    {
      "source": "renew_status_changed_at",
      "errors": [
        "renew_status_changed_at must be later than purchased_at."
      ]
    }
  ],
  "error_code": "renew_status_changed_date_error",
  "status_code": 400
}
```