---
title: "Identify users in Capacitor SDK"
description: "Learn how to identify users in your Capacitor app with Adapty SDK."
metadataTitle: "Identify Users | Capacitor SDK | Adapty Docs"
slug: /capacitor-identifying-users
displayed_sidebar: sdkcapacitor
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import SampleApp from '@site/src/components/reusable/SampleApp.md';

Adapty creates an internal profile ID for every user. However, if you have your own authentication system, you should set your own Customer User ID. You can find users by their Customer User ID in the [Profiles](profiles-crm) section and use it in the [server-side API](getting-started-with-server-side-api), which will be sent to all integrations.

### Setting customer user ID on configuration

If you have a user ID during configuration, just pass it as `customerUserId` parameter to `.activate()` method:

```typescript showLineNumbers
import { adapty } from '@adapty/capacitor';

try {
  await adapty.activate({
    apiKey: 'YOUR_PUBLIC_SDK_KEY',
    params: {
      customerUserId: 'YOUR_USER_ID'
    }
  });
} catch (error) {
  console.error('Failed to activate Adapty:', error);
}
```


### Setting customer user ID after configuration

If you don't have a user ID in the SDK configuration, you can set it later at any time with the `.identify()` method. The most common cases for using this method are after registration or authorization, when the user switches from being an anonymous user to an authenticated user.

```typescript showLineNumbers
import { adapty } from '@adapty/capacitor';

try {
  await adapty.identify({ customerUserId: 'YOUR_USER_ID' });
  console.log('User identified successfully');
} catch (error) {
  console.error('Failed to identify user:', error);
}
```

Request parameters:

| Parameter | Presence | Description |
|---------|--------|-----------|
| **customerUserId** | required | A string user identifier. |

:::warning
Resubmitting of significant user data

In some cases, such as when a user logs into their account again, Adapty's servers already have information about that user. In these scenarios, the Adapty SDK will automatically switch to work with the new user. If you passed any data to the anonymous user, such as custom attributes or attributions from third-party networks, you should resubmit that data for the identified user.

It's also important to note that you should re-request all paywalls and products after identifying the user, as the new user's data may be different.
:::

### Logging out and logging in

You can logout the user anytime by calling `.logout()` method:

```typescript showLineNumbers
import { adapty } from '@adapty/capacitor';

try {
  await adapty.logout();
  console.log('User logged out successfully');
} catch (error) {
  console.error('Failed to logout user:', error);
}
```

You can then login the user using `.identify()` method.

## Assign `appAccountToken` (iOS)

[`appAccountToken`](https://developer.apple.com/documentation/storekit/product/purchaseoption/appaccounttoken(_:)) is a **UUID** that lets you link App Store transactions to your internal user identity.  
StoreKit associates this token with every transaction, so your backend can match App Store data to your users.

Use a stable UUID generated per user and reuse it for the same account across devices.
This ensures that purchases and App Store notifications stay correctly linked.

You can set the token in two ways – during the SDK activation or when identifying the user.

:::important
You must always pass `appAccountToken` together with `customerUserId`.
If you pass only the token, it will not be included in the transaction.
:::

```typescript showLineNumbers
import { adapty } from '@adapty/capacitor';
// During configuration:
await adapty.activate({
    apiKey: 'YOUR_PUBLIC_SDK_KEY',
    params: {
        customerUserId: 'YOUR_USER_ID',
        ios: { appAccountToken: "YOUR_APP_ACCOUNT_TOKEN" },
    }
});
// Or when identifying users
await adapty.identify({
    customerUserId: 'YOUR_USER_ID',
    params: {
        ios: { appAccountToken: 'YOUR_APP_ACCOUNT_TOKEN' },
    }
});
```

### Set obfuscated account IDs (Android)

Google Play requires obfuscated account IDs for certain use cases to enhance user privacy and security. These IDs help Google Play identify purchases while keeping user information anonymous, which is particularly important for fraud prevention and analytics.

You may need to set these IDs if your app handles sensitive user data or if you're required to comply with specific privacy regulations. The obfuscated IDs allow Google Play to track purchases without exposing actual user identifiers.

```typescript showLineNumbers
// During configuration:
await adapty.activate({
  apiKey: 'YOUR_PUBLIC_SDK_KEY',
  params: {
    android: { obfuscatedAccountId: 'YOUR_OBFUSCATED_ACCOUNT_ID' },
  }
});
// Or when identifying users
await adapty.identify({
    customerUserId: 'YOUR_USER_ID',
    params: {
        android: { obfuscatedAccountId: 'YOUR_OBFUSCATED_ACCOUNT_ID' },
    }
});
```