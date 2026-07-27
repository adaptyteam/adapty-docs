
| Paramètre          | Type   | Requis | Nullable | Description                                                  |
| :----------------- | :----- | -------- | -------- | :----------------------------------------------------------- |
| device_id          | String | Oui      | Non      | L'identifiant de l'appareil est généré côté client.       |
| device             | String | Non      | Oui      | Le nom du modèle d'appareil visible par l'utilisateur final.                      |
| locale             | String | Non      | Oui      | La langue utilisée par l'utilisateur final.                             |
| os                 | String | Non      | Oui      | Le système d'exploitation utilisé par l'utilisateur final.                   |
| platform           | String | Non      | Oui      | La plateforme de l'appareil utilisée par l'utilisateur final.                    |
| timezone           | String | Non      | Oui      | Le fuseau horaire de l'utilisateur final.                                |
| user_agent         | String | Non      | Oui      | Informations sur l'environnement de l'utilisateur final : appareil, système d'exploitation et navigateur de l'utilisateur final interagissant avec votre application. |
| idfa               | String | Non      | Oui      | L'Identifier for Advertisers, attribué par Apple à l'appareil d'un utilisateur. |
| idfv               | String | Non      | Oui      | L'Identifier for Vendors (IDFV) est un code attribué à toutes les applications d'un même développeur et partagé entre toutes ses applications sur votre appareil. |
| advertising_id     | String | Non      | Oui      | L'Advertising ID est un identifiant unique proposé par le système d'exploitation Android que les annonceurs peuvent utiliser pour vous identifier de manière unique. |
| android_id         | String | Non      | Oui      | Sur Android 8.0 (API niveau 26) et les versions supérieures, un nombre de 64 bits (exprimé en chaîne hexadécimale), unique pour chaque combinaison de clé de signature d'application, d'utilisateur et d'appareil. Pour plus de détails, consultez la [documentation Android pour les développeurs](https://developer.android.com/reference/android/provider/Settings.Secure#ANDROID_ID). |
| android_app_set_id | String | Non      | Oui      | Un [AppSetId](https://developer.android.com/design-for-safety/privacy-sandbox/reference/adservices/appsetid/AppSetId) — identifiant unique par appareil, par compte développeur, réinitialisable par l'utilisateur, destiné aux cas d'usage publicitaires sans monétisation. |