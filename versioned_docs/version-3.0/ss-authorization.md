---
title: "Server-side API Authorization"
description: ""
metadataTitle: ""
displayed_sidebar: APISidebar
toc_max_heading_level: 2
---

- **Base URL**: `https://api.adapty.io/api/v2/server-side-api/`

- **Authorization header**: API requests must be authenticated with your secret API key. You can find it in the [**App Settings**](https://app.adapty.io/settings/general). 
  
  Format of the value is `Api-Key {YOUR_SECRET_API_KEY}`, for example, `Api-Key secret_live_Pj1P1xzM.3CvSvE3IalQRFjsWy3csBVNpH71atnod`.
  
- **Headers**: Use one of the following to identify the user profile
  
  - **adapty-profile-id**: The user’s Adapty profile ID, visible in the **Adapty ID** field in the [Adapty Dashboard -> **Profiles**](https://app.adapty.io/profiles/users) -> specific profile page.
  - **adapty-customer-user-id**: The user’s ID in your system, visible in the **Customer user ID** field in the [Adapty Dashboard -> **Profiles**](https://app.adapty.io/profiles/users) -> specific profile page.
    ⚠️ This works only if you [identify users](identifying-users) in your app code using the Adapty SDK.
  
- **adapty-platform header**: Use this header to specify the app's platform. Possible options include:
  `iOS`, `macOS`, `iPadOS`, `visionOS`, `Android`.
  
- **Content-Type header**: Set the **Content-Type** header to `application/json` for the API to process your request.
  
- **Body**:  The API expects the request to use the body as JSON.

## Postman collection and environment

To simplify using our server-side API, we've prepared a Postman collection and an environment file you can download and import into Postman.
- **Request Collection**: Includes all requests available in the Adapty server-side API. Note that it uses variables that you can define in the environment.
- **Environment**: Contains a list of variables where you can define values once. After making this environment active, Postman will automatically substitute the defined variable values in your requests.

:::tip

[Download the collection and environment](https://raw.githubusercontent.com/adaptyteam/adapty-docs/refs/heads/main/Downloads/Adapty_server_side_API_postman_collection.zip)

:::

For info on how to import a collection and environment to Postman, please refer to the [Postman documentation](https://learning.postman.com/docs/getting-started/importing-and-exporting/importing-data/).

### Variables used

| Variable                | Description                                                  | Example Value                                           |
| ----------------------- | ------------------------------------------------------------ | ------------------------------------------------------- |
| secret_api_key          | You can find it in the **Secret key** field in the [**App settings**](https://app.adapty.io/settings/general). | `secret_live_Pj1P1xzM.2CvSvE1IalQRFjsWy6csBVNpH33atnod` |
| adapty-customer-user-id | The user ID used in your system. In the Adapty Dashboard, you can find it in the **Customer user ID** field of the Profile. | `John.doe@example.com`                                  |
| adapty-profile-id       | The user ID assigned in Adapty. In the Adapty Dashboard, you can find it in the **Adapty ID** field of the Profile. | `3286abd3-48b0-4e9c-a5f6-ac0a006333a6`                  |
| adapty-platform         | The platform used by the user for your app. Possible values: `iOS`, `macOS`, `iPadOS`, `visionOS`, `Android`. | `iOS`                                                   |
| stripe_token            | Token of a Stripe object representing a unique purchase, such as a Subscription (`sub_XXX`) or Payment Intent (`pi_XXX`). | `sub_1JY8xLLy6P12345a`                                  |

---

**What's next:**

- Proceed with [API requests](server-side-api-specs).