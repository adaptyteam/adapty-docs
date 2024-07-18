---
title: "React Native — Subscription Status"
description: ""
metadataTitle: ""
---

With Adapty you don't have to hardcode product ids to check subscription status. You just have to verify that the user has an active access level. To do this, you have to call `.getProfile()` method:

```typescript title="title="const profile = await adapty.getProfile();""
```

Response parameters:

- **Profile**: an AdaptyProfile object. Generally, you have to check only access level status to determine whether the user has premium access to the app.

:::note
The `.getProfile` method provides the most up-to-date result as it always tries to query the API. If for some reason (e.g. no internet connection), the Adapty SDK fails to retrieve information from the server, the data from cache will be returned. It is also important to note that the Adapty SDK updates `AdaptyProfile` cache on a regular basis, in order to keep this information as up-to-date as possible.
:::

Below there is a complete example of checking the user's access level.

```typescript title="title="const profile = adapty.getProfile();""
const isActive = profile.accessLevels["premium"]?.isActive;

if (isActive) {
	// grant access to premium features
}
```

:::note
You can have multiple access levels per app. For example, if you have a newspaper app and sell subscriptions to different topics independently, you can create access levels "sports" and "science". But most of the time, you will only need one access level, in that case, you can just use the default "**premium**" access level.

Read more about access levels in the [Access Level](access-level) section.
:::

### Listening for subscription status updates

Whenever the user's subscription changes, Adapty will fire an event. To receive subscription updates, you can  implement `.addEventListener` with `'onLatestProfileLoad'`event. This event will also be called at the start of the application, and the cached profile will get into it:

```typescript title="title="adapty.addEventListener('onLatestProfileLoad', profile => {""
	// handle any changes to subscription state
});
```

:::warning
Make sure to set up [App Store Server Notifications](app-store-server-notifications) to receive subscription updates without significant delays.
:::