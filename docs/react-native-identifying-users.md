---
title: "React Native — Identifying Users"
description: ""
metadataTitle: ""
---

Adapty creates an internal profile id for every user. But if you have your authentification system you should set your own Customer User Id. You can find the users by Customer User Id in [Profiles](profiles-crm), use it in [server-side API](getting-started-with-server-side-api), it will be sent to all integrations.

### Setting Customer User Id on configuration

If you have a user id during configuration, just pass it as `customerUserId` parameter to `activate` method:

```typescript title="title="adapty.activate("PUBLIC_SDK_KEY", {""
	customerUserId: "YOUR_USER_ID"
});
```

### Setting customer user ID after configuration

If you don't have a user id on SDK configuration, you can set it later at any time with `.identify()` method. The most common cases are after registration/authorization when the user switches from being an anonymous user to an authenticated user.

```typescript title="title="try {""
	await adapty.identify("YOUR_USER_ID");
	// successfully identified
} catch (error) {
	// handle the AdaptyError
}
```

Request parameters:

- **Customer User ID** (required): a string user identifier.

:::warning
Resubmitting of significant user data

In some cases (for example, when a user logs into his account again), Adapty's servers already have information about that user. In such a scenario, Adapty SDK will automatically switch to work with the new user. If, during the anonymous user's existence, you passed some data to it (for example, custom attributes or attributions from third-party networks), you should resubmit that data.

it is also quite important to re-request all paywalls and products after identify, because the data of the new user may be different
:::

### Logging out and logging in

You can logout the user anytime by calling `.logout()` method:

```typescript title="title="try {""
	await adapty.logout();
	// successful logout
} catch (error) {
	// handle `AdaptyError`
}
```

You can then login the user using `.identify()` method.