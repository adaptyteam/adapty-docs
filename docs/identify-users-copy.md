---
title: "Identify users"
description: "Learn how to use Customer User ID in Adapty for consistent user profiles, linking transactions and events, and enhancing integration with your own authentication system"
metadataTitle: "Identify Users in Adapty: Using Customer User ID for Seamless Profile Management"
---

Adapty creates an internal profile ID for every user. However, if you have your own authentication system, set your own Customer User ID, a unique identifier for each user in your system. In this case. Adapty will add this ID to the user profile, which will give you several advantages:

1. All transactions and events will be tied to the same profile.
2. You can find users by their customer user ID in the [**Profiles**](profiles-crm) section and view their transactions and events.
3. You can use the customer user ID in the [server-side API](getting-started-with-server-side-api).
4. The customer user ID will be sent to all integrations.

If no customer user ID is passed to Adapty, Adapty will create a new additional internal profile ID in the following cases:

- When a user launches your app for the first time after installation and reinstallation.
- When a user logs out of your app.

This means that a user who installs, then uninstalls, and reinstalls your app may have several profile records in Adapty if no customer user ID is used. All transactions in a chain are tied to the profile that generated the first transaction — the "original" profile. This helps keep a complete transaction history — including trial periods, subscription purchases, renewals, and more, linked to the same profile. 

A new profile record that generates a subsequent transaction, called a "non-original" profile, may not have any events associated with it but will retain the granted access level. In some cases, you will also see "access_level_updated" events here.

The best time to pass your customer user ID to Adapty is during [the Adapty SDK configuration](identify-users#setting-customer-user-id-on-configuration). If a user registers a new account, Adapty will create a new profile ID and link this new profile to the user's new customer user ID for consistency. Remember to [use the `.identify()` Adapty method](identify-users#setting-customer-user-id-after-configuration) once you know the new customer user ID to ensure it is correctly linked to the user profile. 

## Setting customer user ID on configuration

If you have a user ID during configuration, pass it as `customerUserId` parameter to `.activate()` method during Adapty SDK configuration:

```swift
Adapty.activate("PUBLIC_SDK_KEY", customerUserId: "YOUR_USER_ID")
```
```kotlin
Adapty.activate(applicationContext, "PUBLIC_SDK_KEY", customerUserId = "YOUR_USER_ID")
```
```java
Adapty.activate(getApplicationContext(), "PUBLIC_SDK_KEY", observerMode, "YOUR_USER_ID");
```
```typescript React Native (TS)
adapty.activate("PUBLIC_SDK_KEY", {
	customerUserId: "YOUR_USER_ID"
});
```

Although it is not mandatory to pass the`customerUserId` parameter during the configuration stage, we highly recommend doing so for easier management of user profiles in Adapty. If you do not pass `customerUserId` during the Adapty SDK configuration, Adapty will create a new profile when a user launches your app for the first time. Even if you pass `customerUserId` to Adapty after user authorization, the created empty profile will remain in the system and increase your profile list.

On the other hand, if you do pass the `customerUserId` parameter during the configuration stage, Adapty will use it to identify the user, preventing the creation of additional empty profiles. That will keep your user profile list in Adapty clear and concise.

You may notice that there are no snippets for Flutter and Unity. Unfortunately, technical limitations prevent passing the ID upon activation in these frameworks. 

## Setting customer user ID after configuration

If you don't have a user ID at the time of the SDK configuration, you can pass it later using the `.identify()` method. The most common scenarios for using this method are after user registration or authorization when the user switches from being an anonymous user to an authenticated user.

```swift
Adapty.identify("YOUR_USER_ID") { error in
    if error == nil {
        // successful identify
    }
}
```
```kotlin
Adapty.identify("YOUR_USER_ID") { error ->
    if (error == null) {
        // successful identify
    }
}
```
```java
Adapty.identify("YOUR_USER_ID", error -> {
    if (error == null) {
        // successful identify
    }
});
```
```javascript Flutter
try {
  await Adapty().identify(customerUserId);
} on AdaptyError catch (adaptyError) {
  // handle the error
} catch (e) {
}
```
```csharp Unity
Adapty.Identify("YOUR_USER_ID", (error) => {
  if(error == null) {
    // successful identify
  }
});
```
```typescript React Native (TS)
try {
	await adapty.identify("YOUR_USER_ID");
	// successfully identified
} catch (error) {
	// handle the error
}
```

Request parameters:

| Parameter            | Presence | Description                                  |
| :------------------- | :------- | :------------------------------------------- |
| **Customer User ID** | required | A string user identifier used in your system |

:::warning
Resubmitting of significant user data

In some cases, such as when a user logs into their account again, Adapty's servers already have information about that user. In these scenarios, the Adapty SDK will automatically switch to work with the new user. If you passed any data to the anonymous user, such as custom attributes or attributions from third-party networks, you should resubmit that data for the identified user.

It's also important to note that you should re-request all paywalls and products after identifying the user, as the new user's data may be different.
:::

## Logging out and logging in

You can logout the user anytime by calling `.logout()` method:

```swift
Adapty.logout { error in
    if error == nil {
        // successful logout
    }
}
```
```kotlin
Adapty.logout { error ->
    if (error == null) {
        // successful logout
    }
}
```
```java
Adapty.logout(error -> {
    if (error == null) {
        // successful logout
    }
});
```
```javascript Flutter
try {
  await Adapty().logout();
} on AdaptyError catch (adaptyError) {
  // handle the error
} catch (e) {
}
```
```csharp Unity
Adapty.Logout((error) => {
  if(error == null) {
    // successful logout
  }
});
```
```typescript React Native (TS)
try {
	await adapty.logout();
	// successful logout
} catch (error) {
	// handle the error
}
```

You can then login the user using `.identify()` method.