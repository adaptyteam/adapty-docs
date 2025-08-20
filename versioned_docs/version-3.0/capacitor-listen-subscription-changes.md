---
title: "Check subscription status in Capacitor SDK"
description: "Track and manage user subscription status in Adapty for improved customer retention in your Capacitor app."
metadataTitle: "Understanding Subscription Status | Adapty Docs"
keywords: ['getProfile']
---

import Details from '@site/src/components/Details';
import SampleApp from '@site/src/components/reusable/SampleApp.md';

With Adapty, keeping track of subscription status is made easy. You don't have to manually insert product IDs into your code. Instead, you can effortlessly confirm a user's subscription status by checking for an active [access level](access-level).

<details>
   <summary>Before you start checking subscription status (Click to Expand)</summary>

- For iOS, set up [App Store Server Notifications](enable-app-store-server-notifications)
- For Android, set up [Real-time Developer Notifications (RTDN)](enable-real-time-developer-notifications-rtdn)
</details>

## Access level and the AdaptyProfile object

Access levels are properties of the [AdaptyProfile](sdk-models#adaptyprofile) object. We recommend retrieving the profile when your app starts, such as when you [identify a user](capacitor-identifying-users#setting-customer-user-id-on-configuration) , and then updating it whenever changes occur. This way, you can use the profile object without repeatedly requesting it.

To be notified of profile updates, listen for profile changes as described in the [Listening for profile updates, including access levels](capacitor-listen-subscription-changes.md) section below.

<SampleApp />

## Retrieving the access level from the server

To get the access level from the server, use the `.getProfile()` method:

```typescript showLineNumbers
try {
    const profile = await adapty.getProfile();
} catch (error) {
  // handle the error
}
```

Response parameters:

| Parameter | Description                                                  |
| --------- | ------------------------------------------------------------ |
| Profile   | <p>An [AdaptyProfile](sdk-models#adaptyprofile) object. Generally, you have to check only the access level status of the profile to determine whether the user has premium access to the app.</p><p></p><p>The `.getProfile` method provides the most up-to-date result as it always tries to query the API. If for some reason (e.g. no internet connection), the Adapty SDK fails to retrieve information from the server, the data from the cache will be returned. It is also important to note that the Adapty SDK updates `AdaptyProfile` cache regularly, to keep this information as up-to-date as possible.</p> |


The `.getProfile()` method provides you with the user profile from which you can get the access level status. You can have multiple access levels per app. For example, if you have a newspaper app and sell subscriptions to different topics independently, you can create access levels "sports" and "science". But most of the time, you will only need one access level, in that case, you can just use the default "premium" access level.

Here is an example for checking for the default "premium" access level:

```typescript showLineNumbers
try {
    const profile = await adapty.getProfile();
    
  const isActive = profile.accessLevels["premium"]?.isActive;
    if (isActive) {
        // grant access to premium features
    }
} catch (error) {
    // handle the error
}
```


### Listening for subscription status updates

Whenever the user's subscription changes, Adapty fires an event.

To receive messages from Adapty, you need to make some additional configuration:

```typescript showLineNumbers
// Create an "onLatestProfileLoad" event listener
adapty.addEventListener('onLatestProfileLoad', profile => {
    // handle any changes to subscription state
});
```


Adapty also fires an event at the start of the application. In this case, the cached subscription status will be passed.

### Subscription status cache

The cache implemented in the Adapty SDK stores the subscription status of the profile. This means that even if the server is unavailable, the cached data can be accessed to provide information about the profile's subscription status.

However, it's important to note that direct data requests from the cache are not possible. The SDK periodically queries the server every minute to check for any updates or changes related to the profile. If there are any modifications, such as new transactions or other updates, they will be sent to the cached data in order to keep it synchronized with the server.