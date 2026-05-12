La solicitud falló porque no se encontraron los productos vinculados al token proporcionado. Asegúrate de que todos los productos necesarios estén añadidos a la app correcta en Adapty y de que su **Paddle Product ID** y **Paddle Price ID** estén correctamente configurados.

#### Body

| Parámetro   | Tipo    | Descripción                                                  |
| ----------- | ------- | ------------------------------------------------------------ |
| errors      | Object  | <ul><li> **source**: (string) Siempre `non_field_errors`.</li><li> **errors**: Descripción del error. </li></ul> |
| error_code  | String  | Nombre corto del error. Valor posible: `no_products_found`.       |
| status_code | Integer | Estado HTTP. Siempre `400`.                                   |

#### Ejemplo de respuesta

```json showLineNumbers
{
  "errors": [
    {
      "source": "non_field_errors",
      "errors": [
        "No products found for purchase"
      ]
    }
  ],
  "error_code": "no_products_found",
  "status_code": 400
}
```