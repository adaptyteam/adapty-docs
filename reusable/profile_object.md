| Param              | Type          | Description                                                  |
| :----------------- | :------------ | :----------------------------------------------------------- |
| first_name         | String        | Your end user's first name                                   |
| last_name          | String        | Your end user's last name                                    |
| gender             | String        | Your end user's gender                                       |
| email              | String        | Your end user's email                                        |
| phone_number       | String        | Your end user's phone number                                 |
| birthday           | ISO 8601 date | Your end user's birthday                                     |
| ip_country         | String        | Country of the end user in ISO 3166-2 format. It needs to be passed if the request is made from the server and not from the client, in order to set the current country. Otherwise, we will determine the country by the IP address of the request. |
| store_country      | String        | Country of the end user app store                            |
| store              | String        | The app store                                                |
| analytics_disabled | Boolean       | <p>Optoon to [opt out external analytics](analytics-integration#disabling-external-analytics-for-a-specific-customer). If you disable analytics, then events will not be sent to integrations, and the idfa, idfv, advertising_id fields will become nullable.</p><p>ON - External analytics is opted out for this end user</p><p>OFF - Analytics works by default</p> |
| custom_attributes  | Dictionary    | <p>A maximum of 30 custom attributes for the profile are allowed to be set. If you provide the `custom_attributes` disctionary, you must provide at least one atttribute key.</p><p>**Key**: The key must be a string with no more than 30 characters. Only letters, numbers, dashes, points and underscores allowed</p><p>**Value**: The attribute value must be no more than 30 characters. Only strings and floats are allowed as values, booleans will be converted to floats. Send an empty value or null to delete the attribute.</p> |
| device_id          | String        | The device identifier is generated on the client side        |
| device             | String        | The end-user-visible device model name.                      |
| locale             | String        | The locale used by the end user                              |
| os                 | String        | The operating system used by the end user                    |
| platform           | String        | The device platform used by the end user                     |
| timezone           | String        | The timezone of the end user                                 |
| user_agent         | String        | Details about the end user environment: device, operating system, and browser information of the end user interacting with your application |
| idfa               | String        | The Identifier for Advertisers, assigned by Apple to a user's device. |
| idfv               | String        | The Identifier for Vendors (IDFV) is a code assigned to all apps by one developer and is shared across all apps by that developer on your device. |
| advertising_id     | String        | The Advertising ID is a unique identifier offered by the Android Operating System that advertisers might use to uniquely identify you. |
| android_id         | String        | On Android 8.0 (API level 26) and higher versions of the platform, a 64-bit number (expressed as a hexadecimal string), unique to each combination of app-signing key, user, and device. For more details, see [Android developer documentation](https://developer.android.com/reference/android/provider/Settings.Secure#ANDROID_ID). |
| android_app_set_id | String        | An [AppSetId](https://developer.android.com/design-for-safety/privacy-sandbox/reference/adservices/appsetid/AppSetId) - unique, per-device, per developer-account user-resettable ID for non-monetizing advertising use cases. |