---
title: "Getting started with server-side API"
description: ""
metadataTitle: ""
displayed_sidebar: APISidebar
hide_table_of_contents: true
---
import Details from '@site/src/components/Details';
import CreateProfileRequestExample from '@site/reusable/api-create-profile-example_request.md';
import ResponseExample from '@site/reusable/api-responses.md';

import ProfileObject from '@site/reusable/profile_object.md';

Adapty's API lets you access and modify your Adapty data programmatically. We also support [webhooks](webhook), where we notify your server of events as they happen.

This API enables you to seamlessly integrate Adapty with your existing services.

## Authorization

- **Base URL**: https://api.adapty.io/api/v1/server-side-api/
- **Authorization header**: API requests must be authenticated by including your secret API key as **Authorization** header with value `Api-Key {secret_token}` to each request, for example, `Api-Key secret_live_BEHrYLTr.ce5zuDEWz06lFRNiaJC8mrLtL8fUwswD`. You can find your secret API key in [Adapty Dashboard -> **App Settings** -> **General** tab API -> **API keys** section](https://app.adapty.io/settings/general). This key is secret, so be careful not to share it publicly.

- **Content-Type header**: The API expects the request to use the **Content-Type** header set to `application/json`.
- **Header**: One of the following parameters:
  - **adapty-profile-id**: The ID of your user's profile. You can see it in the **Adapty ID** field on the Adapty Dashboard -> [**Profiles**](https://app.adapty.io/profiles/users) -> specific profile page.
  - **adapty-customer-user-id**: The ID of your user in your system. You can see it in the **Customer user ID** field on the Adapty Dashboard -> [**Profiles**](https://app.adapty.io/profiles/users) -> specific profile page. It will work only if you [identify the users](identifying-users) in your mobile app code via Adapty SDK.

- **Body**:  The API expects the request to use the body as JSON.

---

## Profile



### Profile object

Info about your customer and their subscription.

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

None (profile_id or customer_user_id must ne set up as a header as described in [Authorization](getting-started-with-server-side-api#authorization))

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

[Profile object](getting-started-with-server-side-api#profile). All parameters are optional. 

<details>    <summary>Profile object (click to expand)</summary> <ProfileObject /> </details>

##### Example request

<details>    <summary>Example request (click to expand)</summary> <CreateProfileRequestExample /> </details>

##### Response

<details>    <summary>Example response (click to expand)</summary> <ResponseExample /> </details>

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

[Profile object](getting-started-with-server-side-api#profile). All parameters are optional. 

<details>    <summary>Profile object (click to expand)</summary> <ProfileObject /> </details>

##### Example request

<details>    <summary>Example request (click to expand)</summary> <CreateProfileRequestExample /> </details>

##### Response

<details>    <summary>Example response (click to expand)</summary> <ResponseExample /> </details>

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

Example request

```text

```

