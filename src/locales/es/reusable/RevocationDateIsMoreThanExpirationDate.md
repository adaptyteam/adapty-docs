La solicitud falló porque el `revoke_at` que definiste en la solicitud es posterior al parámetro `expires_at` del nivel de acceso actual. Si deseas prolongar el nivel de acceso, utiliza la solicitud [Conceder nivel de acceso](ss-grant-access-level).

#### Body

| Parámetro   | Tipo    | Descripción                                                  |
| ----------- | ------- | ------------------------------------------------------------ |
| errors      | Object  | <ul><li> **source**: (string) Siempre `non_field_errors`</li><li> **errors**: Una descripción del error.</li></ul> |
| error_code  | String  | Nombre corto del error. Siempre `revocation_date_more_than_expiration_date`. |
| status_code | Integer | Estado HTTP. Siempre `400`.                                   |

#### Ejemplo de respuesta

```json showLineNumbers
  {
  "errors": [
    {
      "source": "revoke_at",
      "errors": [
        "Revocation date (2029-08-29 09:33:42+00:00) is more than current expiration date (2028-08-29 09:33:42+00:00)"
      ]
    }
  ],
  "error_code": "revocation_date_more_than_expiration_date",
  "status_code": 400
}
```