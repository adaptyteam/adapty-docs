---
title: "Server-side API Authorization and request format"
description: ""
metadataTitle: ""
displayed_sidebar: APISidebar
toc_max_heading_level: 2
---

## Authorization

API requests must be authenticated with your secret API key as an Authothization header. You can find it in the [**App Settings**](https://app.adapty.io/settings/general). The format of the value is `Api-Key {YOUR_SECRET_API_KEY}`, for example, `Api-Key secret_live_...`.

## Request format

**Headers**

The server-side API requests require specific headers and a JSON body. Use the details below to structure your requests:

| **Header**                  | **Description**                                              |
| --------------------------- | ------------------------------------------------------------ |
| **adapty-profile-id**       | (Required, choose one) The user’s Adapty profile ID. Visible in the **Adapty ID** field in the [Adapty Dashboard -> **Profiles**](https://app.adapty.io/profiles/users) -> specific profile page. Interchangeable with **adapty-customer-user-id**, use any of them. |
| **adapty-customer-user-id** | <p>(Required, choose one) The user’s ID in your system. Visible in the **Customer user ID** field in the [Adapty Dashboard -> **Profiles**](https://app.adapty.io/profiles/users) -> specific profile page. Interchangeable with **adapty-profile-id**, use any of them.</p><p> ⚠️ Works only if you [identify users](identifying-users) in your app code using the Adapty SDK.</p> |
| **adapty-platform**         | Specify the app's platform. Possible options: `iOS`, `macOS`, `iPadOS`, `visionOS`, `Android`. |
| **Content-Type**            | Set to `application/json` for the API to process the request. |

**Body**

The API expects a JSON-formatted body with the necessary data for the request.

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