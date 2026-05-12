| Nombre             | Requerido | Descripción                                                  |
| ---------------- | -------- | ------------------------------------------------------------ |
| store            | true     | El app store                                                |
| locale           | False    | Un identificador de la configuración regional del paywall. Se espera que este parámetro sea un código de idioma compuesto por una o más subetiquetas separadas por el carácter "-". La primera subetiqueta corresponde al idioma y la segunda a la región (la compatibilidad con regiones se añadirá más adelante). Ejemplo: `en` significa inglés, `en-US` representa inglés de EE. UU. El paywall se creará en la configuración regional predeterminada si se omite el parámetro. |
| placement_id     | true     | El identificador del [Placement](placements). Es el valor que especificaste al crear un placement en tu Adapty Dashboard. |
| customer_user_id | true*    | Un identificador de un usuario en tu sistema. Se requiere `customer_user_id` o `profile_id`. |
| profile_id       | true*    | Un identificador de un usuario en Adapty. Se requiere `customer_user_id` o `profile_id`. |

**Ejemplo**

```
{
  "store": "adapty",
  "locale": "string",
  "placement_id": "string",
  "customer_user_id": "string"
}
```