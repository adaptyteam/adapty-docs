---
title: "Getting started with server-side API"
description: ""
metadataTitle: ""
---

Adapty's API lets you access and modify your Adapty data programmatically. We also support [webhooks](webhook), where we notify your server of events as they happen.

This API enables you to seamlessly integrate Adapty with your existing services.

## Authorization

- **BaseURL**: https://api.adapty.io/api/v1/server-side-api/
- **Authorization header**: API requests must be authenticated by including your secret API key as **Authorization** header with value `Api-Key {secret_token}` to each request, for example, `Api-Key secret_live_BEHrYLTr.ce5zuDEWz06lFRNiaJC8mrLtL8fUwswD`. You can find your secret API key in [Adapty Dashboard -> **App Settings** -> **General** tab API -> **API keys** section](https://app.adapty.io/settings/general). This key is secret, so be careful not to share it publicly.

- **Content-Type header**: The API expects the request to use the **Content-Type** header set to `application/json`.
- **Header**: One of the following parameters:
  - **adapty-profile-id**: The ID of your user's profile. You can see it in the **Adapty ID** field on the Adapty Dashboard -> [**Profiles**](https://app.adapty.io/profiles/users) -> specific profile page.
  - **adapty-customer-user-id**: The ID of your user in your system. You can see it in the **Customer user ID** field on the Adapty Dashboard -> [**Profiles**](https://app.adapty.io/profiles/users) -> specific profile page. It will work only if you [identify the users](identifying-users) in your mobile app code via Adapty SDK.

- **Body**:  The API expects the request to use the body as JSON.

## Profile

Info about your customer and their subscription.

### The Profile object

| Param                    | Type  | Description                                                  |
| :----------------------- | :---- | :----------------------------------------------------------- |
| first_name            | String        | Your end user's first name                                  |
| last_name             | String     | Your end user's last name                             |
| gender                | String     | Your end user's gender                                |
| email                 | String     | Your end user's email                                 |
| phone_number          | String     | Your end user's phone number                          |
| birthday              | ISO 8601 date | Your end user's birthday                              |
|ip_country|String|Country of the end user in ISO 3166-2 format. It needs to be passed if the request is made from the server and not from the client, in order to set the current country. Otherwise, we will determine the country by the IP address of the request.|
|store_country|String|Country of the end user app store|
|store|String|The app store|
|analytics_disabled|Boolean|<p>Optoon to [opt out external analytics](analytics-integration#disabling-external-analytics-for-a-specific-customer). If you disable analytics, then events will not be sent to integrations, and the idfa, idfv, advertising_id fields will become nullable.</p><p>ON - External analytics is opted out for this end user</p><p>OFF - Analytics works by default</p>|
|custom_attributes|Dictionary|<p>A maximum of 30 custom attributes for the profile are allowed to be set. If you provide the `custom_attributes` disctionary, you must provide at least one atttribute key.</p><p>**Key**: The key must be a string with no more than 30 characters. Only letters, numbers, dashes, points and underscores allowed</p><p>**Value**: The attribute value must be no more than 30 characters. Only strings and floats are allowed as values, booleans will be converted to floats. Send an empty value or null to delete the attribute.</p>|
|device_id|String|The device identifier is generated on the client side|
|device|String|The end-user-visible device model name.|
|locale|String|The locale used by the end user|
|os|String|The operating system used by the end user|
|platform|String|The device platform used by the end user|
|timezone|String|The timezone of the end user|
|user_agent|String|Details about the end user environment: device, operating system, and browser information of the end user interacting with your application|
| idfa                  | String     | The Identifier for Advertisers, assigned by Apple to a user's device. |
| idfv                  | String     | The Identifier for Vendors (IDFV) is a code assigned to all apps by one developer and is shared across all apps by that developer on your device. |
| advertising_id        | String     | The Advertising ID is a unique identifier offered by the Android Operating System that advertisers might use to uniquely identify you. |
|android_id|String|On Android 8.0 (API level 26) and higher versions of the platform, a 64-bit number (expressed as a hexadecimal string), unique to each combination of app-signing key, user, and device. For more details, see [Android developer documentation](https://developer.android.com/reference/android/provider/Settings.Secure#ANDROID_ID).|
|android_app_set_id|String|An [AppSetId](https://developer.android.com/design-for-safety/privacy-sandbox/reference/adservices/appsetid/AppSetId) - unique, per-device, per developer-account user-resettable ID for non-monetizing advertising use cases.|
### Retrieve profile

Retrieves the details of an existing end user of your app.

##### Endpoint

```
https://api.adapty.io/api/v1/server-side-api/profiles/
```

##### Method

```
GET
```

##### Parameters

None

##### Response

[Profile object](getting-started-with-server-side-api#profile)

### Create profile

Creates a new end user of your app in Adapty.

##### Endpoint

```
https://api.adapty.io/api/v1/server-side-api/profiles/
```

##### Method

```
POST
```

##### Parameters

[Profile object](getting-started-with-server-side-api#profile). All parameters are optional. 

##### Example request

```json
{
  "first_name": "Jane",
  "last_name": "Doe",
  "gender": "f",
  "email": "jane.dow@example.com",
  "phone_number": "+1234567890",
  "birthday": "2000-12-31",
  "ip_country": "FR, US",
  "store_country": "FR, US",
  "store": "app_store",
  "analytics_disabled": true,
  "custom_attributes": [
    {
      "key": "string",
      "value": "string"
    }
  ],
  "installation_meta": {
    "device_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "device": "string",
    "locale": "string",
    "os": "string",
    "platform": "iOS",
    "timezone": "Europe/Rome",
    "user_agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 17_1_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.1 Mobile/15E148 Safari/604.1",
    "idfa": "string",
    "idfv": "string",
    "advertising_id": "string",
    "android_id": "string",
    "android_app_set_id": "string"
  }
}
```

##### Example response

[Example response](api-responses)

### Update profile

Changes your end user profile attributes.

Endpoint

```
https://api.adapty.io/api/v1/server-side-api/profiles/
```

Method

```
PATCH
```

##### Parameters

[Profile object](getting-started-with-server-side-api#profile). All parameters are optional. 

Example request

```text

```

##### Example response

[Example response](api-responses)

### Delete profile

Deletes an end user of your app in Adapty.

Calling this endpoint enables the deletion of a user's profile and all related data, rendering it inaccessible to the client. Any profile history linked to the deleted profile will be detached, and integration events previously sent to integrations will be deleted from the event feed. 

Should another profile make a purchase from the device with the same Apple ID (or when subscription is restored), the profile history will be reassigned to the new profile, and integration events will be reissued.

Please be aware that this endpoint does not support bulk deletion, therefore each request must be handled individually. For managing a substantial number of users, it is advisable to execute requests concurrently.

##### Endpoint

```
https://api.adapty.io/api/v1/server-side-api/profiles/
```

##### Method

```
DELETE
```

Example request

```text

```



## Archive

