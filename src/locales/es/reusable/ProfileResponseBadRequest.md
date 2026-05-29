La solicitud falló debido a un error en algún campo.

###### Body

| Parámetro   | Tipo    | Descripción                                                  |
| ----------- | ------- | ------------------------------------------------------------ |
| errors      | Object  | <ul><li> **source**: (string) Campo que causó el/los error(es)</li><li> **errors**: (list) errores enumerados.</li></ul> |
| error_code  | String  | Nombre corto del error.                                      |
| status_code | Integer | Estado HTTP, siempre `400`.                                  |

###### Ejemplo de respuesta

```json showLineNumbers
{
  "errors": [
    {
      "source": "string",
      "errors": [
        "string"
      ]
    }
  ],
  "error_code": "string",
  "status_code": 0
}
```