<!--- ProfileObject.md --->

| Parameter         | Type       | Nullable           | Description                                                  |
| ----------------- | ---------- | ------------------ | ------------------------------------------------------------ |
| app_id            | String     | :heavy_minus_sign: | The ID of your app. You can see in the the Adapty Dashboard: App Settings -> General tab. |
| profile_id        | UUID       | :heavy_minus_sign: | Adapty profile ID                                            |
| customer_user_id  | String     | :heavy_plus_sign:  | User ID in developer’s (your) system.                        |
| total_revenue_usd | Float      | :heavy_minus_sign: | Float value, it is equal to all total revenue USD which earned in the profile. |
| segment_hash      | String     | :heavy_minus_sign: |                                                              |
| timestamp         | Integer    | :heavy_minus_sign: | Response time in milliseconds, needs for resolve a race condition |
| custom_attributes | Dictionary | :heavy_minus_sign: | <p>A maximum of 30 custom attributes to the profile are allowed to be set. If you provide the `custom_attributes` dictionary, you must provide at least one attribute key.</p><p>**Key**: The key must be a string with no more than 30 characters. Only letters, numbers, dashes, points, and underscores allowed</p><p>**Value**: The attribute value must be no more than 30 characters. Only strings and floats are allowed as values, booleans will be converted to floats. Send an empty value or null to delete the attribute.</p> |
| access_levels     | Dictionary | :heavy_plus_sign:  | Profile Paid Access Level objects. Dictionary where the keys are paid access level identifiers configured by a developer in the Adapty Dashboard. Values are [Access level](https://adapty.io/docs/server-side-api-objects#customeraccesslevel) objects. Can be null if the customer has no access levels |
| subscriptions     | Dictionary | :heavy_plus_sign:  | Dictionary where the keys are vendor product IDs. Values are [Subscription](https://adapty.io/docs/server-side-api-objects#subscription) objects. Can be null if the customer has no subscriptions |
| non_subscriptions | Dictionary | :heavy_plus_sign:  | Dictionary where the keys are vendor product ids. Values are an array of [Non-Subscription](https://adapty.io/docs/server-side-api-objects#non-subscription) objects. Can be null if the customer has no purchases. |