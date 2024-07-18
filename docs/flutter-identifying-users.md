---
title: "Flutter – Identifying Users"
description: ""
metadataTitle: ""
---

Adapty creates an internal profile id for every user. But if you have your authentification system you should set your own Customer User Id. You can find the users by Customer User Id in [Profiles](profiles-crm), use it in [server-side API](getting-started-with-server-side-api), it will be sent to all integrations.

### Setting Customer User Id

You can set your user id at any time with `.identify()` method. The most common cases are after registration/authorization when the user switches from being an anonymous user to an authenticated user.

```javascript title="Flutter"
try {
  await Adapty().identify(customerUserId);
} on AdaptyError catch (adaptyError) {
  // handle the error
} catch (e) {
}
```

Request parameters:

- **Customer User Id** (required): a string user identifier.

:::warning
Resubmitting of significant user data

In some cases (for example, when a user logs into his account again), Adapty's servers already have information about that user. In such a scenario, Adapty SDK will automatically switch to work with the new user. If, during the anonymous user's existence, you passed some data to it (for example, custom attributes or attributions from third-party networks), you should resubmit that data.

it is also quite important to re-request all paywalls and products after identify, because the data of the new user may be different
:::

### Logging out and logging in

You can logout the user anytime by calling `.logout()` method:

```javascript title="Flutter"
try {
  await Adapty().logout();
} on AdaptyError catch (adaptyError) {
  // handle the error
} catch (e) {
}
```

You can then login the user using `.identify()` method.