La respuesta indica que tu solicitud no es un JSON válido o falta algún campo. Corrige el JSON para que sea válido y añade el parámetro que falta.

#### Body

| Parámetro   | Tipo    | Descripción                                                  |
| ----------- | ------- | ------------------------------------------------------------ |
| errors      | Object  | <ul><li> **source**: (string) En caso de JSON inválido, será `null`.</li><li> **errors**: Descripción del error. </li></ul> |
| error_code  | String  | Nombre corto del error. En este caso: `parse_error`.         |
| status_code | Integer | Estado HTTP. Siempre `400`.                                  |

#### Ejemplo de respuesta

```json showLineNumbers
{
    "errors": [
        {
            "source": null,
            "errors": [
                "JSON parse error - Expecting ',' delimiter: line 4 column 3 (char 67)"
            ]
        }
    ],
    "error_code": "parse_error",
    "status_code": 400
}
```