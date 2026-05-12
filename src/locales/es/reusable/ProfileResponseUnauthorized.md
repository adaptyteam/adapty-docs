<p> </p>

La solicitud falló por falta de autorización o porque la autorización es incorrecta. Consulta la página de [Autorización](ss-authorization), prestando especial atención al **encabezado Authorization**.

La solicitud también falló porque el perfil especificado no se encontró.

#### Body

| Parámetro   | Tipo    | Descripción                                                  |
| ----------- | ------- | ------------------------------------------------------------ |
| errors      | Object  | <ul><li> **source**: (string) Siempre `non_field_errors`.</li><li> **errors**: Una descripción del error.</li></ul> |
| error_code  | String  | Nombre corto del error. Siempre `not_authenticated`.                |
| status_code | Integer | Estado HTTP. Siempre `401.`                                   |

#### Ejemplo de respuesta

```json showLineNumbers
{
  "errors": [
    {
      "source": "non_field_errors",
      "errors": [
        "Authentication credentials were not provided."
      ]
    }
  ],
  "error_code": "not_authenticated",
  "status_code": 401
}
```