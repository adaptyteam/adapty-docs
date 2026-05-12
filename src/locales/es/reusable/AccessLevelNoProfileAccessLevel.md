La solicitud falló porque el perfil en la solicitud no coincide con el nivel de acceso especificado. Verifica que el ID de perfil en el encabezado y el ID de nivel de acceso en el cuerpo sean correctos, y asegúrate de que no haya errores tipográficos.

#### Body

| Parámetro   | Tipo    | Descripción                                                  |
| ----------- | ------- | ------------------------------------------------------------ |
| errors      | Object  | <ul><li> **source**: (string) Siempre `non_field_errors`</li><li> **errors**: Una descripción del error.</li></ul> |
| error_code  | String  | Nombre corto del error. Siempre `profile_paid_access_level_does_not_exist`. |
| status_code | Integer | Estado HTTP. Siempre `400`.                                   |

#### Ejemplo de respuesta

```json showLineNumbers
{
  "errors": [
    {
      "source": "non_field_errors",
      "errors": [
        "Profile `478b2e7f-d557-4b8b-9c5f-cbd46fc2dee2` has no `premium` access level"
      ]
    }
  ],
  "error_code": "profile_paid_access_level_does_not_exist",
  "status_code": 400
}
```