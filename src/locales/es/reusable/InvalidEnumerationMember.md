La solicitud falló porque el valor del campo `status` no es válido. Comprueba que no haya errores tipográficos. Los valores posibles son `organic`, `non_organic` y `unknown`.

#### Body

| Parámetro   | Tipo    | Descripción                                                  |
| ----------- | ------- | ------------------------------------------------------------ |
| errors      | Object  | <ul><li> **source**: (string) Siempre `status`.</li><li> **errors**: Descripción del error. En este caso, `value is not a valid enumeration member; permitted: 'organic', 'non_organic', 'unknown'`</li></ul> |
| error_code  | String  | Nombre corto del error. Aquí: `enum`.                        |
| status_code | Integer | Estado HTTP. Siempre `400`.                                  |

#### Ejemplo de respuesta

```json showLineNumbers
{
    "errors": [
        {
            "source": "status",
            "errors": [
                "value is not a valid enumeration member; permitted: 'organic', 'non_organic', 'unknown'"
            ]
        }
    ],
    "error_code": "enum",
    "status_code": 400
}
```