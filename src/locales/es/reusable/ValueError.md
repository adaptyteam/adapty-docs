La solicitud falló porque la fecha de revocación especificada está en el pasado. Establece `revoke_at` en una fecha futura o `null` para revocar el acceso de inmediato.

##### Body

| Parámetro   | Tipo    | Descripción                                                  |
| ----------- | ------- | ------------------------------------------------------------ |
| errors      | Object  | <ul><li> **source**: (string) Siempre `revoke_at`.</li><li> **errors**: Una descripción del error.</li></ul> |
| error_code  | String  | Nombre corto del error. Siempre `value_error`.               |
| status_code | Integer | Estado HTTP. Siempre `400`.                                  |

##### Ejemplo de respuesta

```json showLineNumbers
{
    "errors": [
        {
            "source": null,
            "errors": [
                "Must be greater than the current time or null"
            ]
        }
    ],
    "error_code": "value_error",
    "status_code": 400
}
```