---
title: "Identify users in Unity SDK"
description: "Learn how to identify users in your Unity app with Adapty SDK."
metadataTitle: "Identify Users | Unity SDK | Adapty Docs"
slug: /unity-identifying-users
displayed_sidebar: sdkunity
---

import SampleApp from '@site/src/components/reusable/SampleApp.md';

Adapty creates an internal profile ID for every user. However, if you have your own authentication system, you should set your own Customer User ID. You can find users by their Customer User ID in the [Profiles](profiles-crm) section and use it in the [server-side API](getting-started-with-server-side-api), which will be sent to all integrations.

### Setting customer user ID on configuration

If you have a user ID during configuration, just pass it as `customerUserId` parameter to `.activate()` method:


```csharp showLineNumbers
using UnityEngine;
using AdaptySDK;

var builder = new AdaptyConfiguration.Builder("YOUR_API_KEY")
    .SetCustomerUserId("YOUR_USER_ID");

Adapty.Activate(builder.Build(), (error) => {
    if (error != null) {
        // handle the error
        return;
    }
}); 
```

<SampleApp />

### Setting customer user ID after configuration

If you don't have a user ID in the SDK configuration, you can set it later at any time with the `.identify()` method. The most common cases for using this method are after registration or authorization, when the user switches from being an anonymous user to an authenticated user.

```csharp showLineNumbers
Adapty.Identify("YOUR_USER_ID", (error) => {
  if(error == null) {
    // successful identify
  }
});
```

Request parameters:

- **Customer User ID** (required): a string user identifier.

:::warning
Resubmitting of significant user data

In some cases, such as when a user logs into their account again, Adapty's servers already have information about that user. In these scenarios, the Adapty SDK will automatically switch to work with the new user. If you passed any data to the anonymous user, such as custom attributes or attributions from third-party networks, you should resubmit that data for the identified user.

It's also important to note that you should re-request all paywalls and products after identifying the user, as the new user's data may be different.
:::

### Logging out and logging in

You can logout the user anytime by calling `.logout()` method:


```csharp showLineNumbers
Adapty.Logout((error) => {
  if(error == null) {
    // successful logout
  }
});
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

```csharp showLineNumbers title="Unity"
using UnityEngine;
using AdaptySDK;
using System;

// During configuration:
var appAccountToken = new Guid("YOUR_APP_ACCOUNT_TOKEN");
var builder = new AdaptyConfiguration.Builder("YOUR_API_KEY")
    .SetCustomerUserId("YOUR_USER_ID", appAccountToken);

Adapty.Activate(builder.Build(), (error) => {
    if (error != null) {
        // handle the error
        return;
    }
}); 

// Or when identifying users
Adapty.Identify("YOUR_USER_ID", appAccountToken, (error) => {
    if (error == null) {
        // successful identify
    }
});
```