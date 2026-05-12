La solicitud falló porque el formato del campo `visited_at` es incorrecto. Usa el formato de **fecha ISO 8601**, por ejemplo `2025-01-14T14:15:22Z`.

#### Body

| Parámetro   | Tipo    | Descripción                                                  |
| ----------- | ------- | ------------------------------------------------------------ |
| errors      | Object  | <ul><li> **source**: (string) Siempre `visited_at`.</li><li> **errors**: Una descripción del error. </li></ul> |
| error_code  | String  | Nombre corto del error. Aquí: `base_error`.                  |
| status_code | Integer | Estado HTTP. Siempre `400`.                                  |

#### Ejemplo de respuesta

```json showLineNumbers
{
    "errors": [
        {
            "source": "visited_at",
            "errors": [
                "invalid datetime format"
            ]
        }
    ],
    "error_code": "datetime",
    "status_code": 400
}
```