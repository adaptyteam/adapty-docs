---
title: " Web API Requests"
description: ""
metadataTitle: ""
toc_max_heading_level: 4
---

Adapty's server-side API empowers you to programmatically access and manage your subscription data, enabling seamless integration with your existing services and infrastructure. Whether you're syncing data across platforms, granting access levels, or validating purchases in Stripe, this API provides the tools to keep your systems in sync and your users engaged.

## Postman collection and environment

To simplify using our web API, we've prepared a Postman collection and an environment file you can download and import into Postman.

- **Request Collection**: Includes all requests available in the Adapty web API. Note that it uses variables that you can define in the environment.
- **Environment**: Contains a list of variables where you can define values once. We've prepared a unified environment for both the server-side and web APIs to make things easier for you. After making this environment active, Postman will automatically substitute the defined variable values in your requests.

:::tip

[Download the collection and environment](https://raw.githubusercontent.com/adaptyteam/adapty-docs/refs/heads/main/Downloads/Adapty_Web_API_postman_collection.zip)

:::

For info on how to import a collection and environment to Postman, please refer to the [Postman documentation](https://learning.postman.com/docs/getting-started/importing-and-exporting/importing-data/).

## Variables used

We've created a unified environment for both the server-side and web APIs to simplify your workflow. Below are the variables specific to the web API:

| Variable                | Description                                                  | Example Value                                           |
| ----------------------- | ------------------------------------------------------------ | ------------------------------------------------------- |
| public_api_key          | You can find it in the **Public SDK key** field in the [**App settings**](https://app.adapty.io/settings/general). | `public_live_Pj1P1xzM.2CvSvE1IalQRFjsWy6csBVNpH33atnod` |
| adapty-customer-user-id | The user ID used in your system. In the Adapty Dashboard, you can find it in the **Customer user ID** field of the Profile. | `john.doe@example.com`                                  |
| adapty-profile-id       | The user ID assigned in Adapty. In the Adapty Dashboard, you can find it in the **Adapty ID** field of the Profile. | `3286abd3-48b0-4e9c-a5f6-ac0a006333a6`                  |

**What's next: Requests:**

- [Get paywall](web-api-get-paywall)

- [Record paywall view](web-api-record-paywall-view)

- [Add attribution](web-api-add-attribution)
