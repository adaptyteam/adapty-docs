En el caso de suscripciones prorrogadas, se genera una cadena de suscripciones. La transacción original es la primera transacción de esta cadena y la cadena se vincula mediante ella. Las demás transacciones de la cadena son prórrogas. Si la transacción es la primera compra de la cadena de suscripción, puede ser su propia transacción original.

Otro caso es el de una compra única. Nunca crea cadenas porque no puede tener prórrogas. Para ella, el `store_transaction_id` siempre es igual al `store_original_transaction_id`.

Tu solicitud falló porque el valor de `store_transaction_id` del objeto [Compra única](server-side-api-objects#one-time-purchase) difiere de su `store_original_transaction_id`. Para solucionar el problema, haz que sean iguales o cambia el objeto: usa [Suscripción](server-side-api-objects#subscription) en lugar de [Compra única](server-side-api-objects#one-time-purchase).

#### Body

| Parámetro   | Tipo    | Descripción                                                  |
| ----------- | ------- | ------------------------------------------------------------ |
| errors      | Object  | <ul><li> **source**: (string) Siempre `store_transaction_id`</li><li> **errors**: Una descripción del error.</li></ul> |
| error_code  | String  | Nombre corto del error. Siempre `store_transaction_id_error`.       |
| status_code | Integer | Estado HTTP. Siempre `400.`                                   |

#### Ejemplo de respuesta

```json showLineNumbers
{
  "errors": [
    {
      "source": "store_transaction_id",
      "errors": [
        "store_transaction_id must be equal to store_original_transaction_id for purchase."
      ]
    }
  ],
  "error_code": "store_transaction_id_error",
  "status_code": 400
}
```