| Parámetro          | Tipo   | Obligatorio | Nullable | Descripción                                                  |
| :----------------- | :----- | ----------- | -------- | :----------------------------------------------------------- |
| device_id          | String | Sí          | No       | El identificador del dispositivo se genera en el lado del cliente. |
| device             | String | No          | Sí       | El nombre del modelo de dispositivo visible para el usuario final. |
| locale             | String | No          | Sí       | La configuración regional utilizada por el usuario final.    |
| os                 | String | No          | Sí       | El sistema operativo utilizado por el usuario final.         |
| platform           | String | No          | Sí       | La plataforma del dispositivo utilizada por el usuario final. |
| timezone           | String | No          | Sí       | La zona horaria del usuario final.                           |
| user_agent         | String | No          | Sí       | Detalles sobre el entorno del usuario final: información del dispositivo, sistema operativo y navegador del usuario final que interactúa con tu aplicación. |
| idfa               | String | No          | Sí       | El Identificador para Anunciantes, asignado por Apple al dispositivo de un usuario. |
| idfv               | String | No          | Sí       | El Identificador para Proveedores (IDFV) es un código asignado a todas las apps de un mismo desarrollador y se comparte entre todas sus apps en tu dispositivo. |
| advertising_id     | String | No          | Sí       | El ID de publicidad es un identificador único que ofrece el sistema operativo Android y que los anunciantes pueden usar para identificarte de forma única. |
| android_id         | String | No          | Sí       | En Android 8.0 (nivel de API 26) y versiones superiores de la plataforma, un número de 64 bits (expresado como cadena hexadecimal), único para cada combinación de clave de firma de la app, usuario y dispositivo. Para más detalles, consulta la [documentación para desarrolladores de Android](https://developer.android.com/reference/android/provider/Settings.Secure#ANDROID_ID). |
| android_app_set_id | String | No          | Sí       | Un [AppSetId](https://developer.android.com/design-for-safety/privacy-sandbox/reference/adservices/appsetid/AppSetId): ID único por dispositivo y por cuenta de desarrollador, restablecible por el usuario, para casos de uso publicitario sin monetización. |