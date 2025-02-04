

| Parameter          | Type          | Required in request | Nullable in request | Description                                                  |
| :----------------- | :------------ | ------------------- | ------------------- | :----------------------------------------------------------- |
| first_name         | String        | :heavy_minus_sign:  | :heavy_plus_sign:   | Your end user's first name.                                  |
| last_name          | String        | :heavy_minus_sign:  | :heavy_plus_sign:   | Your end user's last name.                                   |
| gender             | String        | :heavy_minus_sign:  | :heavy_plus_sign:   | Your end user's gender.                                      |
| email              | String        | :heavy_minus_sign:  | :heavy_plus_sign:   | Your end user's email.                                       |
| phone_number       | String        | :heavy_minus_sign:  | :heavy_plus_sign:   | Your end user's phone number.                                |
| birthday           | ISO 8601 date | :heavy_minus_sign:  | :heavy_minus_sign:  | Your end user's birthday.                                    |
| ip_country         | String        | :heavy_minus_sign:  | :heavy_minus_sign:  | Country of the end user in ISO 3166-2 format. It needs to be passed if the request is made from the server and not from the client, in order to set the current country. Otherwise, we will determine the country by the IP address of the request. |
| store_country      | String        | :heavy_minus_sign:  | :heavy_plus_sign:   | Country of the end user app store.                           |
| store              | String        | :heavy_minus_sign:  | :heavy_plus_sign:   | The app store.                                               |
| analytics_disabled | Boolean       | :heavy_minus_sign:  | :heavy_minus_sign:  | <p>Option to opt out of external analytics. When analytics is disabled, events won’t be sent to integrations, and the fields idfa, idfv, and advertising_id will become nullable.</p><p>ON: External analytics is opted out for this user</p><p>OFF: Analytics is active by default.</p> |
| custom_attributes  | Dictionary    | :heavy_minus_sign:  | :heavy_minus_sign:  | <p>Allows setting up to 30 custom attributes for the profile. If you use the custom_attributes dictionary, at least one attribute key is required.</p><p>Key: Must be a string with no more than 30 characters, using only letters, numbers, dashes, periods, and underscores.</p><p>Value: Must be a string or float with no more than 30 characters. Booleans will be converted to floats. To delete an attribute, send an empty value or null.</p> |
| installation_meta  | Dictionary    | :heavy_minus_sign:  | :heavy_minus_sign:  | Contains information about the specific app on a specific device, structured as a dictionary of [Installation Meta](server-side-api-objects#installation-meta) objects. |