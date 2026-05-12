La solicitud falló porque se proporcionó un período de prueba con una compra única. A diferencia de las suscripciones, las compras únicas no pueden tener período de prueba. Para solucionarlo, revisa el campo `offer_type` en el objeto [Offer](server-side-api-objects#offer) dentro del objeto [One-Time Purchase](server-side-api-objects#one-time-purchase). El valor de `offer_type` no puede ser `free_trial`. Cambia el valor del campo `offer_type` o usa el objeto [Subscription](server-side-api-objects#subscription) en lugar de One-Time Purchase.

#### Body

| Parámetro   | Tipo    | Descripción                                                  |
| ----------- | ------- | ------------------------------------------------------------ |
| errors      | Object  | <ul><li> **source**: (string) Siempre offer.type</li><li> **errors**: Descripción del error.</li></ul> |
| error_code  | String  | Nombre corto del error. Siempre `one_time_purchase_trial_error`. |
| status_code | Integer | Estado HTTP. Siempre `400`.                                  |

#### Ejemplo de respuesta

```json showLineNumbers
{
  "errors": [
    {
      "source": "offer.type",
      "errors": [
        "One-time purchase cannot have a trial."
      ]
    }
  ],
  "error_code": "one_time_purchase_trial_error",
  "status_code": 400
}
```