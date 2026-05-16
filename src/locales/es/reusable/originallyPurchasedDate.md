<!--- originallyPurchasedDate.md --->

En las suscripciones prolongadas se crea una cadena de transacciones. La transacción original es la primera de esa cadena y vincula todas las siguientes. Cada renovación es simplemente una extensión de esa transacción original. Si la transacción es la primera compra, actúa como su propia transacción original.

El timestamp `originally_purchased_at` indica el momento de la compra original, mientras que `purchased_at` corresponde al momento de la transacción actual. Por ello, `purchased_at` nunca puede ser anterior a `originally_purchased_at`; como máximo, ambos pueden coincidir en la primera transacción.

La solicitud falló porque `originally_purchased_at` tiene una fecha posterior a `purchased_at`. Asegúrate de que sea anterior o igual a `purchased_at`.

#### Body \{#body\}

| Parámetro   | Tipo    | Descripción                                                  |
| ----------- | ------- | ------------------------------------------------------------ |
| errors      | Object  | <ul><li> **source**: (string) Siempre `originally_purchased_at`</li><li> **errors**: Descripción del error.</li></ul> |
| error_code  | String  | Nombre corto del error. Siempre `originally_purchased_date_error`.  |
| status_code | Integer | Estado HTTP. Siempre `400`.                                   |

#### Ejemplo de respuesta \{#response-example\}

```json showLineNumbers
{
  "errors": [
    {
      "source": "originally_purchased_at",
      "errors": [
        "originally_purchased_at must be earlier than or equal to purchased_at."
      ]
    }
  ],
  "error_code": "originally_purchased_date_error",
  "status_code": 400
}
```