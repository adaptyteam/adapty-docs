---
title: "Server-side API Authorization"
description: ""
metadataTitle: ""
displayed_sidebar: APISidebar
---

- **Base URL**: https://api.adapty.io/api/v2/server-side-api/
- **Authorization header**: API requests must be authenticated with your API key:
  - Your public or secret API key as the **Authorization** header is required. You can find your API keys in the [**App Settings**](https://app.adapty.io/settings/general). 

  - For access level and transaction requests, use your secret API key. For other requests, use either the public or secret API key. Remember to keep your secret key private.

  - Format of the value is `Api-Key {YOUR_SECRET_API_KEY}` or `Api-Key {YOUR_PUBLIC_API_KEY}`, for example, `Api-Key public_live_iNuUlSsN.83zcTTT8D5Y8FI9cGUI6`.

- **Content-Type header**: Set the **Content-Type** header to `application/json` for the API to process your request.
- **Header**: Use one of the following to identify the user profile
  - **adapty-profile-id**: The user’s Adapty profile ID, visible in the **Adapty ID** field in the [Adapty Dashboard -> **Profiles**](https://app.adapty.io/profiles/users) -> specific profile page.
  - **adapty-customer-user-id**: The user’s ID in your system, visible in the **Customer user ID** field in the [Adapty Dashboard -> **Profiles**](https://app.adapty.io/profiles/users) -> specific profile page.
    ⚠️ This works only if you [identify users](identifying-users) in your app code using the Adapty SDK.

- **adapty-platform header**: Use this header to specify the app's platform. Possible options include:
  `iOS`, `macOS`, `iPadOS`, `visionOS`, `Android`.
- **Body**:  The API expects the request to use the body as JSON.

---

**What's next:**

- Proceed with [API requests](server-side-api-specs).