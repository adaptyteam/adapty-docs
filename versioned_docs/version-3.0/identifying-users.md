---
title: "Identify users"
description: "Identify users in Adapty to improve personalized subscription experiences."
metadataTitle: "Identifying Users in Adapty | Adapty Docs"
keywords: ['identify']
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem'; 
import SampleApp from '@site/src/components/reusable/SampleApp.md'; 

Adapty creates an internal profile ID for every user. However, if you have your own authentication system, you should set your own Customer User ID. You can find users by their Customer User ID in the [Profiles](profiles-crm) section and use it in the [server-side API](getting-started-with-server-side-api), which will be sent to all integrations.

### Setting customer user ID on configuration

If you have a user ID during configuration, just pass it as `customerUserId` parameter to `.activate()` method:

<Tabs groupId="current-os" queryString>
<TabItem value="swift" label="Swift" default>

```swift showLineNumbers
// In your AppDelegate class:
import Adapty

let configurationBuilder =
    AdaptyConfiguration
        .builder(withAPIKey: "PUBLIC_SDK_KEY")
        .with(customerUserId: "YOUR_USER_ID")

do {
  try await Adapty.activate(with: configurationBuilder.build())
} catch {
  // handle the error
}
```
</TabItem>

<TabItem value="swift-callback" label="Swift-Callback" default>

```swift showLineNumbers
// In your AppDelegate class:
import Adapty

let configurationBuilder =
    AdaptyConfiguration
        .builder(withAPIKey: "PUBLIC_SDK_KEY")
        .with(customerUserId: "YOUR_USER_ID")

Adapty.activate(with: configurationBuilder.build()) { error in
  // handle the error
}
```

</TabItem>

<TabItem value="kotlin" label="Kotlin" default>

```kotlin showLineNumbers
Adapty.activate(applicationContext, "PUBLIC_SDK_KEY", customerUserId = "YOUR_USER_ID")
```
</TabItem>
<TabItem value="java" label="Java" default>
```java showLineNumbers
try {
    await Adapty().activate(
        configuration: AdaptyConfiguration(apiKey: 'YOUR_API_KEY')
          ..withCustomerUserId('YOUR_USER_ID')
    );
} catch (e) {
    // handle the error
}
```
</TabItem>

<TabItem value="unity" label="Unity" default> 

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

</TabItem>

<TabItem value="rn" label="React Native (TS)" default>

```typescript showLineNumbers
adapty.activate("PUBLIC_SDK_KEY", {
    customerUserId: "YOUR_USER_ID"
});
```
</TabItem>

<TabItem value="kmp" label="Kotlin Multiplatform" default>

```kotlin showLineNumbers
import com.adapty.kmp.Adapty
import com.adapty.kmp.models.AdaptyConfig

val config = AdaptyConfig.Builder("PUBLIC_SDK_KEY")
    .withCustomerUserId("YOUR_USER_ID")
    .build()

Adapty.activate(configuration = config) { error ->
    if (error != null) {
        // handle the error
    } else {
        // Adapty activated successfully
    }
}
```
</TabItem>
</Tabs>

<SampleApp />

### Setting customer user ID after configuration

If you don't have a user ID in the SDK configuration, you can set it later at any time with the `.identify()` method. The most common cases for using this method are after registration or authorization, when the user switches from being an anonymous user to an authenticated user.

<Tabs groupId="current-os" queryString>
<TabItem value="swift" label="Swift" default>

```swift showLineNumbers
do {
    try await Adapty.identify("YOUR_USER_ID")
} catch {
    // handle the error
}
```
</TabItem>
<TabItem value="swift-callback" label="Swift-Callback" default>

```swift showLineNumbers
Adapty.identify("YOUR_USER_ID") { error in
    if let error {
        // handle the error
    }
}
```
</TabItem>
<TabItem value="kotlin" label="Kotlin" default>
```kotlin showLineNumbers
Adapty.identify("YOUR_USER_ID") { error ->
    if (error == null) {
        // successful identify
    }
}
```
</TabItem>
<TabItem value="java" label="Java" default>
```java showLineNumbers
Adapty.identify("YOUR_USER_ID", error -> {
    if (error == null) {
        // successful identify
    }
});
```
</TabItem>
<TabItem value="flutter" label="Flutter" default>
```javascript showLineNumbers
try {
  await Adapty().identify(customerUserId);
} on AdaptyError catch (adaptyError) {
  // handle the error
} catch (e) {
}
```
</TabItem>
<TabItem value="unity" label="Unity" default>
```csharp showLineNumbers
Adapty.Identify("YOUR_USER_ID", (error) => {
  if(error == null) {
    // successful identify
  }
});
```
</TabItem>
<TabItem value="rn" label="React Native (TS)" default>
```typescript showLineNumbers
try {
    await adapty.identify("YOUR_USER_ID");
    // successfully identified
} catch (error) {
    // handle the error
}
```
</TabItem>
<TabItem value="kmp" label="Kotlin Multiplatform" default>

```kotlin showLineNumbers
import com.adapty.kmp.Adapty

Adapty.identify("YOUR_USER_ID") { error ->
    if (error != null) {
        // handle the error
    } else {
        // successfully identified
    }
}
```
</TabItem>
</Tabs>

Request parameters:

- **Customer User ID** (required): a string user identifier.

:::warning
Resubmitting of significant user data

In some cases, such as when a user logs into their account again, Adapty's servers already have information about that user. In these scenarios, the Adapty SDK will automatically switch to work with the new user. If you passed any data to the anonymous user, such as custom attributes or attributions from third-party networks, you should resubmit that data for the identified user.

It's also important to note that you should re-request all paywalls and products after identifying the user, as the new user's data may be different.
:::

### Logging out and logging in

You can logout the user anytime by calling `.logout()` method:

<Tabs groupId="current-os" queryString>
<TabItem value="swift" label="Swift" default>

```swift showLineNumbers
do {
    try await Adapty.logout()
} catch {
    // handle the error
}
```
</TabItem>
<TabItem value="swift-callback" label="Swift-Callback" default>

```swift showLineNumbers
Adapty.logout { error in
    if error == nil {
        // successful logout
    }
}
```
</TabItem>
<TabItem value="kotlin" label="Kotlin" default>

```kotlin showLineNumbers
Adapty.logout { error ->
    if (error == null) {
        // successful logout
    }
}
```
</TabItem>
<TabItem value="java" label="Java" default>

```java showLineNumbers
Adapty.logout(error -> {
    if (error == null) {
        // successful logout
    }
});
```
</TabItem>
<TabItem value="flutter" label="Flutter" default>

```javascript showLineNumbers
try {
  await Adapty().logout();
} on AdaptyError catch (adaptyError) {
  // handle the error
} catch (e) {
}
```
</TabItem>
<TabItem value="unity" label="Unity" default>

```csharp showLineNumbers
Adapty.Logout((error) => {
  if(error == null) {
    // successful logout
  }
});
```
</TabItem>
<TabItem value="rn" label="React Native (TS)" default>

```typescript showLineNumbers
try {
    await adapty.logout();
    // successful logout
} catch (error) {
    // handle the error
}
```
</TabItem>
<TabItem value="kmp" label="Kotlin Multiplatform" default>

```kotlin showLineNumbers
import com.adapty.kmp.Adapty

Adapty.logout { error ->
    if (error != null) {
        // handle the error
    } else {
        // successful logout
    }
}
```
</TabItem>
</Tabs>

You can then login the user using `.identify()` method.