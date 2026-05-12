<p> </p>

La solicitud se realizó correctamente. El cuerpo de la respuesta contiene el campo `data`, que encapsula el perfil del usuario y la información asociada.

| Parámetro | Tipo   | Nullable           | Descripción                                                  |
| --------- | ------ | ------------------ | ------------------------------------------------------------ |
| data      | Object | :heavy_minus_sign: | Contiene el objeto [Profile](server-side-api-objects#profile) con los detalles y metadatos del usuario. |

### Estructura del objeto data \{#data-object-structure\}

El campo `data` es el contenedor principal del perfil de usuario. Incluye varios campos: