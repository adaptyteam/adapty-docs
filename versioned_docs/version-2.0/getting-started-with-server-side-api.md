---
title: "Getting started with server-side API"
description: ""
metadataTitle: ""
hide_table_of_contents: true
displayed_sidebar: APISidebar
---
import Details from '@site/src/components/Details';
import CreateProfileRequestExample from './reusable/api-create-profile-example_request.md';
import ResponseExample from './reusable/api-responses.md';
import ProfileObject from './reusable/ProfileObject.md';
import CustomerAccessLevel from './reusable/CustomerAccessLevel.md';
import GrantAccessLevelRequestExample from './reusable/GrantAccessLevelRequestExample.md';

Adapty's API lets you access and modify your Adapty data programmatically. We also support [webhooks](webhook), where we notify your server of events as they happen.

This API enables you to seamlessly integrate Adapty with your existing services.

---

## Authorization

- **Base URL**: https://api.adapty.io/api/v1/server-side-api/
- **Authorization header**: API requests must be authenticated by including your secret API key as an **Authorization** header with value `Api-Key {secret_token}` to each request, for example, `Api-Key secret_live_BEHrYLTr.ce5zuDEWz06lFRNiaJC8mrLtL8fUwswD`. You can find your secret API key in [Adapty Dashboard -> **App Settings** -> **General** tab API -> **API keys** section](https://app.adapty.io/settings/general). This key is secret, so be careful not to share it publicly.

- **Content-Type header**: The API expects the request to use the **Content-Type** header set to `application/json`.
- **Header**: One of the following parameters:
  - **adapty-profile-id**: The ID of your user's profile. You can see it in the **Adapty ID** field on the Adapty Dashboard -> [**Profiles**](https://app.adapty.io/profiles/users) -> specific profile page.
  - **adapty-customer-user-id**: The ID of your user in your system. You can see it in the **Customer user ID** field on the Adapty Dashboard -> [**Profiles**](https://app.adapty.io/profiles/users) -> specific profile page. It will work only if you [identify the users](identifying-users) in your mobile app code via Adapty SDK.

- **Body**:  The API expects the request to use the body as JSON.

---

## Profile

Info about your customer and their subscription.

### Profile object

Object that contains details about your customer and their subscription.

<ProfileObject />

---

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

None in the JSON body. `Profile_id` or `customer_user_id`  must be set up as a header as described in [Authorization](getting-started-with-server-side-api#authorization).

##### Response

<details>    <summary>Profile object (click to expand)</summary> <ProfileObject /> </details>

<details>    <summary>Example response (click to expand)</summary> <ResponseExample /> </details>

___

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

<details> 
  <summary>Profile object (click to expand)</summary>
  All parameters are optional. `Profile_id` or `customer_user_id` must be set up as a header as described in [Authorization](getting-started-with-server-side-api#authorization).
  <ProfileObject /> 
</details>

##### Example request

<details>    <summary>Example request (click to expand)</summary> <CreateProfileRequestExample /> </details>

##### Response

<!--- ??? response --->

___

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

<details> 
  <summary> Profile object (click to expand) </summary>
  All parameters are optional. `Profile_id` or `customer_user_id` must be set up as a header as described in [Authorization](getting-started-with-server-side-api#authorization).
  <ProfileObject /> 
</details>

##### Example request

<details>    <summary>Example request (click to expand)</summary> <CreateProfileRequestExample /> </details>

##### Response

Returns a profile object, if a valid `profile_id` or `customer_user_id` was supplied. If not, please review possible errors.

<details> 
  <summary> Profile object (click to expand) </summary>
  All parameters are optional. `Profile_id` or `customer_user_id` must be set up as a header as described in [Authorization](getting-started-with-server-side-api#authorization).
  <ProfileObject /> 
</details>

<!--- ??? response --->


___

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

##### Parameters

None in the JSON body. `Profile_id` or `customer_user_id`  must be set up as a header as described in [Authorization](getting-started-with-server-side-api#authorization).

##### Response

<!--- ??? response --->



## Access levels

### Access Level object

<CustomerAccessLevel />

### Grant access level

Provides access level to your end-user without providing an info on the transaction. This comes in handy if you have bonuses for referrals or other events related to your products.

To grant access with providing the transaction details, please use the Set Transaction request <!--- ??? --->

##### Endpoint

```
https://api.adapty.io/api/v1/server-side-api/grant/access-level/
```

##### Method

```
POST
```

##### Parameters

| Parameter       | Type          | Required in request | Nullable in request | Description                                                  |
| --------------- | ------------- | ------------------- | ------------------- | ------------------------------------------------------------ |
| access_level_id | String        | :heavy_plus_sign:   | :heavy_minus_sign:  | [Paid access level](access-level) ID configured by you in the [**Access Levels**](https://app.adapty.io/access-levels) page of the Adapty Dashboard |
| starts_at       | ISO 8601 date | :heavy_minus_sign:  | :heavy_plus_sign:   | The datetime when the access level will be active. May be in the future |
| expires_at      | ISO 8601 date | :heavy_minus_sign:  | :heavy_plus_sign:   | The datetime when the access level will expire. It may be in the past and may be `null` for lifetime access |

<details>    <summary>Example request (click to expand)</summary> <GrantAccessLevelRequestExample /> </details>

##### Response

### Revoke access level

### Set transaction
