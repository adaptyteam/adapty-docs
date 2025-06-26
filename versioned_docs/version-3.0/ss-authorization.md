---
title: "Server-side API Authorization and request format"
description: ""
metadataTitle: ""
displayed_sidebar: APISidebar
toc_max_heading_level: 2
keywords: ['rate limit', 'api rate limit']
---

import ProfileResponse from '@site/src/components/reusable/ProfileResponse.md';
import ResponseExample from '@site/src/components/reusable/ResponseExample.md';

## Authorization

API requests must be authenticated with either your secret or your public API key as an Authorization header. You can find them in the [**App Settings**](https://app.adapty.io/settings/general). The format of the value is `Api-Key {your-secret-api-key}`, for example, `Api-Key secret_live_...`.

## Request format

**Headers**

The server-side API requests require specific headers and a JSON body. Use the details below to structure your requests. 

| **Header**                  | **Description**                                              |
| --------------------------- | ------------------------------------------------------------ |
| **adapty-profile-id**       | <p>The user’s Adapty profile ID. Visible in the **Adapty ID** field in the [Adapty Dashboard -> **Profiles**](https://app.adapty.io/profiles/users) -> specific profile page. </p><p>Interchangeable with **adapty-customer-user-id**, use any of them.</p> |
| **adapty-customer-user-id** | <p>The user’s ID in your system. Visible in the **Customer user ID** field in the [Adapty Dashboard -> **Profiles**](https://app.adapty.io/profiles/users) -> specific profile page. </p><p>Interchangeable with **adapty-profile-id**, use any of them.</p><p> ⚠️ Works only if you [identify users](identifying-users) in your app code using the Adapty SDK.</p> |
| **adapty-platform**         | (optional) Specify the platform of the device on which the app is installed. We recommend setting this parameter in the [Create profile](ss-create-profile) and [Update profile](ss-update-profile) requests when modifying the [Installation Meta](server-side-api-objects#installation-meta) object, as it depends on the device the user is using, and a single user may have multiple devices. Possible values: `iOS`, `macOS`, `iPadOS`, `visionOS`, `Android`, or `web`. |
| **Content-Type**            | Set to `application/json` for the API to process the request. |

**Body**

The API expects a JSON-formatted body with the necessary data for the request.

## Rate limits

To avoid throttling, ensure that the number of requests (per app) stays below 300 per minute.

If this limit is exceeded, the system may slow down or temporarily block further requests to maintain optimal performance for all users.

---

**What's next: requests:**

- [Get profile](ss-get-profile)
- [Create profile](ss-create-profile)
- [Update profile](ss-update-profile)
- [Delete profile](ss-delete-profile) 
- [Grant access level](ss-grant-access-level)
- [Revoke access level](ss-revoke-access-level)
- [Set transaction](ss-set-transaction)
- [Validate purchase, provide access level to customer, and import their transaction history](ss-purchase-in-stripe)