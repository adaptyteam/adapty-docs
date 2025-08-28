

| Parameter          | Type          | Required | Nullable | Description                                                  |
| :----------------- | :------------ | -------- | -------- | :----------------------------------------------------------- |
| first_name         | String        | No       | Yes      | Your end user's first name.                                  |
| last_name          | String        | No       | Yes      | Your end user's last name.                                   |
| gender             | String        | No       | Yes      | Your end user's gender.                                      |
| email              | String        | No       | Yes      | Your end user's email.                                       |
| phone_number       | String        | No       | Yes      | Your end user's phone number.                                |
| birthday           | ISO 8601 date | No       | No       | Your end user's birthday.                                    |
| ip_country         | String        | No       | No       | Country of the end user in ISO 3166-2 format. It needs to be passed if the request is made from the server and not from the client in order to set the current country. Otherwise, we determine the country by the IP address of the request. |
| store_country      | String        | No       | Yes      | Country of the end user's app store.                         |
| store              | String        | No       | Yes      | The platform the user uses to make purchases in your app. Possible values: `app_store`, `play_store`, or `stripe`. |
| analytics_disabled | Boolean       | No       | No       | <p>Option to opt out of external analytics. When analytics is disabled, events won't be sent to integrations, and the fields `idfa`, `idfv`, and `advertising_id` will become nullable.</p><p>ON: External analytics is opted out for this user.</p><p>OFF: Analytics is active by default.</p> |
| custom_attributes  | Array         | No       | No       | <p>Allows setting up to 30 custom attributes for the profile. If you use the `custom_attributes` array, at least one pair of a key and value is required.</p><p>**Key:** Must be a string with no more than 30 characters, using only letters, numbers, dashes, periods, and underscores.</p><p>**Value:** Must be a string or float with no more than 30 characters. Booleans and integers will be converted to floats. To delete an attribute, send an empty value or `null`.</p> |
| installation_meta  | Object        | No       | No       | Contains information about the specific app on a specific device, structured as an [Installation Meta](server-side-api-objects#installation-meta) object. |