---
title: "Identify users in iOS SDK"
description: "Quickstart guide to setting up Adapty for in-app subscription management."
metadataTitle: "Adapty Quickstart Guide | Adapty Docs"
rank: 70
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Choose how to identify users in your app:

- **Use customer user IDs (recommended):**
If you already authenticate users in your backend, create and send customer user IDs to Adapty. This lets you track the same user across devices and aggregate their data properly.

- **Anonymous users (not recommended):**
Adapty creates a profile ID stored locally on the device. This makes cross-device tracking difficult and requires purchase restoration setup.

:::tip
**Key concept**:

Customer user IDs are identifiers you create for Adapty to link your users to their Adapty profiles. Every user has a profile ID in Adapty, and when you send a customer user ID, it gets associated with that profile.
:::

This guide shows how to connect **authenticated** users to their Adapty profiles, so you can check their subscription status and show the right content.

## Identify users in the app

You have two options to identify users in the app:

- **During login/signup:** If users sign in after your app starts, call `identify()` with a customer user ID when they authenticate.

- **At app startup:** If you already have a customer user ID stored when the app launches (from previous sessions), send it during Adapty activation.

### During login/signup

If you're identifying users after the app launch (for example, after they log into your app or sign up), use the `identify` method to set their customer user ID. If it doesn't exist yet, it will be created in Adapty automatically. 

:::tip
When creating a customer user ID, save it with your user data so you can send the same ID when they log in from new devices.
:::

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
</Tabs>

:::tip
Users with anonymous profiles (no customer user ID) can still use subscriptions, but they'll need to [restore purchases](restore-purchase.md) on new devices.
:::

### At app startup

If you already have a customer user ID stored from previous sessions, you can send it during Adapty activation instead of calling `identify` separately.

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

</Tabs>

## Log users out

If you have a button for logging users out, use the `logout` method. This removes the customer user ID from the current session and creates a new anonymous profile ID for the user.

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
</Tabs>

:::info
To log users back into the app, use the `identify` method.
:::