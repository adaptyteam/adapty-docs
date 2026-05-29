<p> </p>

La solicitud falló porque el perfil indicado en el encabezado de la solicitud no se encontró. Comprueba que no haya erratas en el `profile_id` o `customer_user_id` que introdujiste en el encabezado de la solicitud, y asegúrate de que corresponde a la app correcta.

#### Body

| Parámetro   | Tipo    | Descripción                                                  |
| ----------- | ------- | ------------------------------------------------------------ |
| errors      | Object  | <ul><li> **source**: (string) Siempre `non_field_errors`</li><li> **errors**: Una descripción del error. </li></ul> |
| error_code  | String  | Nombre corto del error. Valor posible: `profile_does_not_exist`.  |
| status_code | Integer | Estado HTTP. Siempre `400`.                                   |

#### Ejemplo de respuesta

El perfil no se encuentra

```json showLineNumbers
{
  "errors": [
    {
      "source": "non_field_errors",
      "errors": [
        "Profile not found"
      ]
    }
  ],
  "error_code": "profile_does_not_exist",
  "status_code": 400
}
```