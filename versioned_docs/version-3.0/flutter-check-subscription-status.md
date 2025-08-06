---
title: "Check subscription status in Flutter SDK"
description: "Learn how to check subscription status in your Flutter app with Adapty."
metadataTitle: "Check Subscription Status | Adapty Docs"
displayed_sidebar: sdkflutter
---

When you decide whether to show a paywall or paid content to a user, you check their [access level](access-level.md) in their profile. You have two options:

- Call [`getProfile`](flutter-listen-subscription-changes.md) if you need the latest profile data immediately (like on app launch) or want to force an update.
- Set up **automatic profile updates** to keep a local copy that's automatically refreshed whenever the subscription status changes.

This article shows you how to access the profile state to decide what users need to see - whether to show them a paywall or grant access to paid features.

## Listen to subscription updates

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
import 'package:flutter/material.dart';
import 'package:adapty_flutter/adapty_flutter.dart';

class PaywallScreen extends StatefulWidget {
  @override
  State<PaywallScreen> createState() => _PaywallScreenState();
}

class _PaywallScreenState extends State<PaywallScreen> {
  @override
  void initState() {
    super.initState();
    _initializePaywall();
  }

  Future<void> _initializePaywall() async {
    // Load paywall configuration
    await _loadPaywall();
    
    // Check if user has access to premium features
    final hasAccess = await _checkAccessLevel();
    if (!hasAccess) {
      await _showPaywall(); // Show paywall if no access
    }
  }

  Future<bool> _checkAccessLevel() async {
    try {
      final profile = await Adapty().getProfile();
      return profile.accessLevels['premium']?.isActive ?? false;
    } catch (e) {
      print('Error checking access level: $e');
      return false; // Show paywall if access check fails
    }
  }

  Future<void> _loadPaywall() async {
    // Load paywall configuration
    // ... paywall loading logic
  }

  Future<void> _showPaywall() async {
    // Present paywall
    // ... paywall presentation logic
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Your App')),
      body: Center(
        child: Text('Your App Content'),
      ),
    );
  }
}
``` 