---
title: "Working with Postman Collection and Environment"
description: "Explore how to easily start using Adapty's Server-Side API with Postman"
metadataTitle: "Working with Postman Collection and Environment | Adapty Docs"
---

To simplify using our server-side API, we've prepared a Postman collection and an environment file you can download and import into Postman.

- **Request Collection**: Includes all requests available in the Adapty server-side API. Note that it uses variables that you can define in the environment.
- **Environment**: Contains a list of variables where you can define values once. We've prepared a unified environment for the server-side API, web API, and analytics export API to make things easier for you. After making this environment active, Postman will automatically substitute the defined variable values in your requests.

:::tip

[Download the collection and environment](https://raw.githubusercontent.com/adaptyteam/adapty-docs/refs/heads/main/Downloads/Adapty_server_side_API_postman_collection.zip)

:::

For info on how to import a collection and environment to Postman, please refer to the [Postman documentation](https://learning.postman.com/docs/getting-started/importing-and-exporting/importing-data/).

### Variables used

We've created a unified environment for the server-side API, web API, and analytics export API to simplify your workflow. Below are the variables specific to the server-side API:

| Variable                | Description                                                  | Example Value                                           |
| ----------------------- | ------------------------------------------------------------ | ------------------------------------------------------- |
| secret_api_key          | You can find it in the **Secret key** field in the [**App settings**](https://app.adapty.io/settings/general). | `secret_live_Pj1P1xzM.2CvSvE1IalQRFjsWy6csBVNpH33atnod` |
| adapty-customer-user-id | The user ID used in your system. In the Adapty Dashboard, you can find it in the **Customer user ID** field of the Profile. | `john.doe@example.com`                                  |
| adapty-profile-id       | The user ID assigned in Adapty. In the Adapty Dashboard, you can find it in the **Adapty ID** field of the Profile. | `3286abd3-48b0-4e9c-a5f6-ac0a006333a6`                  |
| Adapty-platform         | The platform used by the user for your app. Possible values: `iOS`, `macOS`, `iPadOS`, `visionOS`, `Android`, `web`. | `iOS`                                                   |
| stripe_token            | Token of a Stripe object representing a unique purchase, such as a Subscription (`sub_XXX`) or Payment Intent (`pi_XXX`). | `sub_1JY8xLLy6P12345a`                                  |