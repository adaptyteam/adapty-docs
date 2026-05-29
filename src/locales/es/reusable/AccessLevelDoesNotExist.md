La solicitud falló porque el nivel de acceso indicado en la solicitud no se encontró. Verifica que no haya errores tipográficos en `access_level_id` y que corresponda a la app correcta.

#### Body

| Parámetro   | Tipo    | Descripción                                                  |
| ----------- | ------- | ------------------------------------------------------------ |
| errors      | Object  | <ul><li> **source**: (string) Siempre `non_field_errors`</li><li> **errors**: Una descripción del error.</li></ul> |
| error_code  | String  | Nombre corto del error. Valor posible: `paid_access_level_does_not_exist`. |
| status_code | Integer | Estado HTTP. Siempre `404`.                                  |

#### Ejemplo de respuesta

El nivel de acceso no fue encontrado.

```json showLineNumbers
{
  "errors": [
    {
      "source": "non_field_errors",
      "errors": [
        "Paid access level `premium` does not exist"
      ]
    }
  ],
  "error_code": "paid_access_level_does_not_exist",
  "status_code": 400
}
```