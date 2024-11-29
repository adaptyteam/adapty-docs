



| Parameter          | Type   | Required in request | Nullable in request | Description                                                  |
| :----------------- | :----- | ------------------- | ------------------- | :----------------------------------------------------------- |
| device_id          | String | :heavy_plus_sign:   | :heavy_minus_sign:  | The device identifier is generated on the client side.       |
| device             | String | :heavy_minus_sign:  | :heavy_plus_sign:   | The end-user-visible device model name.                      |
| locale             | String | :heavy_minus_sign:  | :heavy_plus_sign:   | The locale used by the end user.                             |
| os                 | String | :heavy_minus_sign:  | :heavy_plus_sign:   | The operating system used by the end user.                   |
| platform           | String | :heavy_minus_sign:  | :heavy_plus_sign:   | The device platform used by the end user.                    |
| timezone           | String | :heavy_minus_sign:  | :heavy_plus_sign:   | The timezone of the end user.                                |
| user_agent         | String | :heavy_minus_sign:  | :heavy_plus_sign:   | Details about the end user environment: device, operating system, and browser information of the end user interacting with your application. |
| idfa               | String | :heavy_minus_sign:  | :heavy_plus_sign:   | The Identifier for Advertisers, assigned by Apple to a user's device. |
| idfv               | String | :heavy_minus_sign:  | :heavy_plus_sign:   | The Identifier for Vendors (IDFV) is a code assigned to all apps by one developer and is shared across all apps by that developer on your device. |
| advertising_id     | String | :heavy_minus_sign:  | :heavy_plus_sign:   | The Advertising ID is a unique identifier offered by the Android Operating System that advertisers might use to uniquely identify you. |
| android_id         | String | :heavy_minus_sign:  | :heavy_plus_sign:   | On Android 8.0 (API level 26) and higher versions of the platform, a 64-bit number (expressed as a hexadecimal string), unique to each combination of app-signing key, user, and device. For more details, see [Android developer documentation](https://developer.android.com/reference/android/provider/Settings.Secure#ANDROID_ID). |
| android_app_set_id | String | :heavy_minus_sign:  | :heavy_plus_sign:   | An [AppSetId](https://developer.android.com/design-for-safety/privacy-sandbox/reference/adservices/appsetid/AppSetId) - unique, per-device, per developer-account user-resettable ID for non-monetizing advertising use cases. |