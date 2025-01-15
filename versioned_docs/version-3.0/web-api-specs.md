---
title: "Server-side API requests"
description: ""
metadataTitle: ""
displayed_sidebar: APISidebar
---

The Web API is an extension of the server-side API designed for use with web apps. It allows you to retrieve the correct paywall using its connected placement ID and record paywall views. This helps you track which paywalls contribute to your revenue.

## Postman collection and environment

To simplify using our web API, we've prepared a Postman collection and an environment file you can download and import into Postman.

- **Request Collection**: Includes all requests available in the Adapty web API. Note that it uses variables that you can define in the environment.
- **Environment**: Contains a list of variables where you can define values once. We've prepared a unified environment for both the server-side and web APIs to make things easier for you. After making this environment active, Postman will automatically substitute the defined variable values in your requests.

:::tip

[Download the collection and environment](https://raw.githubusercontent.com/adaptyteam/adapty-docs/refs/heads/main/Downloads/Adapty_Web_API_postman_collection.zip)

:::

For info on how to import a collection and environment to Postman, please refer to the [Postman documentation](https://learning.postman.com/docs/getting-started/importing-and-exporting/importing-data/).

### Variables used

We've created a unified environment for both the server-side and web APIs to simplify your workflow. Below are the variables specific to the web API:

| Variable                | Description                                                  | Example Value                                           |
| ----------------------- | ------------------------------------------------------------ | ------------------------------------------------------- |
| public_api_key          | You can find it in the **Public key** field in the [**App settings**](https://app.adapty.io/settings/general). | `public_live_Pj1P1xzM.2CvSvE1IalQRFjsWy6csBVNpH33atnod` |
| adapty-customer-user-id | The user ID used in your system. In the Adapty Dashboard, you can find it in the **Customer user ID** field of the Profile. | `John.doe@example.com`                                  |
| adapty-profile-id       | The user ID assigned in Adapty. In the Adapty Dashboard, you can find it in the **Adapty ID** field of the Profile. | `3286abd3-48b0-4e9c-a5f6-ac0a006333a6`                  |

**What's next: Requests:**

- [Add attribution](ss-add-attribution)
- [Get paywall](ss-get-paywall)
- [Record paywall view](ss-record-paywall-view)
