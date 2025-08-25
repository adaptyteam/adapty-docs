---
title: "Check subscription status in Flutter SDK"
description: "Learn how to check subscription status in your Flutter app with Adapty."
metadataTitle: "Check Subscription Status | Adapty Docs"
displayed_sidebar: sdkflutter
---

To decide whether users can access paid content or see a paywall, you need to check their [access level](access-level.md) in the profile.

This article shows you how to access the profile state to decide what users need to see - whether to show them a paywall or grant access to paid features.

## Get subscription status

When you decide whether to show a paywall or paid content to a user, you check their [access level](access-level.md) in their profile. You have two options:

- Call `getProfile` if you need the latest profile data immediately (like on app launch) or want to force an update.
- Set up **automatic profile updates** to keep a local copy that's automatically refreshed whenever the subscription status changes.

### Get profile

The easiest way to get the subscription status is to use the `getProfile` method to access the profile:

```javascript showLineNumbers
try {
  final profile = await Adapty().getProfile();
  // check the access
} on AdaptyError catch (adaptyError) {
  // handle the error
} catch (e) {
}
```

### Listen to subscription updates

To automatically receive profile updates in your app:

1. Use `Adapty().didUpdateProfileStream.listen()` to listen for profile changes - Adapty will automatically call this method whenever the user's subscription status changes.
2. Store the updated profile data when this method is called, so you can use it throughout your app without making additional network requests.

```dart
class SubscriptionManager {
  AdaptyProfile? _currentProfile;
  
  SubscriptionManager() {
    // Listen for profile updates
    Adapty().didUpdateProfileStream.listen((profile) {
      _currentProfile = profile;
      // Update UI, unlock content, etc.
    });
  }
  
  // Use stored profile instead of calling getProfile()
  bool hasAccess() {
    return _currentProfile?.accessLevels['premium']?.isActive ?? false;
  }
}
```

:::note
Adapty automatically calls the profile update stream listener when your app starts, providing cached subscription data even if the device is offline.
:::

## Connect profile with paywall logic

When you need to make immediate decisions about showing paywalls or granting access to paid features, you can check the user's profile directly. This approach is useful for scenarios like app launch, when entering premium sections, or before displaying specific content.

```dart
Future<bool> _checkAccessLevel() async {
  try {
    final profile = await Adapty().getProfile();
    return profile.accessLevels['YOUR_ACCESS_LEVEL']?.isActive ?? false;
  } catch (e) {
    print('Error checking access level: $e');
    return false; // Show paywall if access check fails
  }
}

Future<void> _initializePaywall() async {
  await _loadPaywall();
  
  final hasAccess = await _checkAccessLevel();
  if (!hasAccess) {
    // Show paywall if no access
  }
}
``` 

## Next steps

Now, when you know how to track the subscription status, learn how to [work with user profiles](flutter-quickstart-identify.md) to ensure they can access what they have paid for.