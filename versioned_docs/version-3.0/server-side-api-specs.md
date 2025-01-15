---
title: "Server-side API requests"
description: ""
metadataTitle: ""
displayed_sidebar: APISidebar
---

Adapty's server-side API empowers you to programmatically access and manage your subscription data, enabling seamless integration with your existing services and infrastructure. Whether you're syncing data across platforms, granting access levels, or validating purchases in Stripe, this API provides the tools to keep your systems in sync and your users engaged.

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

**What's new: requests:**

- [Get profile](ss-get-profile)
- [Create profile](ss-create-profile)
- [Update profile](ss-update-profile)
- [Delete profile](ss-delete-profile) 
- [Grant access level](ss-grant-access-level)
- [Revoke access level](ss-revoke-access-level)
- [Set transaction](ss-set-transaction)
- [Validate purchase, provide access level to customer, and import their transaction history](ss-purchase-in-stripe)
- [Add attribution to profile](ss-add-attribution)
- [Get paywall](ss-get-paywall)
- [Record paywall view](ss-record-paywall-view)
- [Add integration identifiers](ss-add-integration)
