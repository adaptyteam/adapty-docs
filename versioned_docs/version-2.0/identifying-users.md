---
title: "Identify users"
description: ""
metadataTitle: ""
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Adapty creates an internal profile ID for every user. However, if you have your own authentication system, you should set your own Customer User ID. You can find users by their Customer User ID in the [Profiles](profiles-crm) section and use it in the [server-side API](getting-started-with-server-side-api), which will be sent to all integrations.

### Setting customer user ID on configuration

If you have a user ID during configuration, just pass it as `customerUserId` parameter to `.activate()` method:

<Tabs>
  <TabItem value="Swift" label="SwiftSwift" default>
```swift
Adapty.activate("PUBLIC_SDK_KEY", customerUserId: "YOUR_USER_ID")
```
</TabItem>
<TabItem value="Kotlin" label="Kotlin" default>
```kotlin
Adapty.activate(applicationContext, "PUBLIC_SDK_KEY", customerUserId = "YOUR_USER_ID")
```
</TabItem>
<TabItem value="java" label="Java" default>
```java
Adapty.activate(getApplicationContext(), "PUBLIC_SDK_KEY", observerMode, "YOUR_USER_ID");
```
</TabItem>
<TabItem value="ReactNative" label="React Native (TS)" default>
```typescript 
adapty.activate("PUBLIC_SDK_KEY", {
    customerUserId: "YOUR_USER_ID"
});
```
</TabItem>
</Tabs>

You may notice that there are no snippets for Flutter and Unity. Unfortunately, there are technical limitations that won't allow passing the ID upon activation. 

### Setting customer user ID after configuration

If you don't have a user ID in the SDK configuration, you can set it later at any time with the `.identify()` method. The most common cases for using this method are after registration or authorization, when the user switches from being an anonymous user to an authenticated user.

<Tabs>
  <TabItem value="Swift" label="Swift" default>
```swift
Adapty.identify("YOUR_USER_ID") { error in
    if error == nil {
        // successful identify
    }
}
```
</TabItem>
<TabItem value="kotlin" label="Kotlin" default>
```kotlin
Adapty.identify("YOUR_USER_ID") { error ->
    if (error == null) {
        // successful identify
    }
}
```
</TabItem>
<TabItem value="java" label="Java" default>
```java 
Adapty.identify("YOUR_USER_ID", error -> {
    if (error == null) {
        // successful identify
    }
});
```
</TabItem>
<TabItem value="Flutter" label="Flutter" default>
```javascript
try {
  await Adapty().identify(customerUserId);
} on AdaptyError catch (adaptyError) {
  // handle the error
} catch (e) {
}
```
</TabItem>
<TabItem value="Unity" label="Unity" default>
```csharp
Adapty.Identify("YOUR_USER_ID", (error) => {
  if(error == null) {
    // successful identify
  }
});
```
</TabItem>
<TabItem value="RN" label="React Native (TS)" default>
```typescript 
try {
    await adapty.identify("YOUR_USER_ID");
    // successfully identified
} catch (error) {
    // handle the error
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

<Tabs>
<TabItem value="Swift" label="Swift" default>
```swift
Adapty.logout { error in
    if error == nil {
        // successful logout
    }
}
```
</TabItem>
<TabItem value="kotlin" label="Kotlin" default>
```kotlin
Adapty.logout { error ->
    if (error == null) {
        // successful logout
    }
}
```
</TabItem>
<TabItem value="java" label="Java" default>
```java
Adapty.logout(error -> {
    if (error == null) {
        // successful logout
    }
});
```
</TabItem>
<TabItem value="Flutter" label="Flutter" default>
```javascript
try {
  await Adapty().logout();
} on AdaptyError catch (adaptyError) {
  // handle the error
} catch (e) {
}
```
</TabItem>
<TabItem value="Unity" label="Unity" default>
```csharp 
Adapty.Logout((error) => {
  if(error == null) {
    // successful logout
  }
});
```
</TabItem>
<TabItem value="RN" label="React Native (TS)" default>
```typescript 
try {
    await adapty.logout();
    // successful logout
} catch (error) {
    // handle the error
}
```
</TabItem>
</Tabs>

You can then login the user using `.identify()` method.