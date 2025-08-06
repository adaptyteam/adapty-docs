---
title: "Check subscription status in React Native SDK"
description: "Learn how to check subscription status in your React Native app with Adapty."
metadataTitle: "Check Subscription Status | Adapty Docs"
displayed_sidebar: sdkreactnative
---

When you decide whether to show a paywall or paid content to a user, you check their [access level](access-level.md) in their profile. You have two options:

- Call [`getProfile`](react-native-listen-subscription-changes.md) if you need the latest profile data immediately (like on app launch) or want to force an update.
- Set up **automatic profile updates** to keep a local copy that's automatically refreshed whenever the subscription status changes.

This article shows you how to access the profile state to decide what users need to see - whether to show them a paywall or grant access to paid features.

## Listen to subscription updates

To automatically receive profile updates in your app:

1. Use `adapty.addEventListener('onLatestProfileLoad')` to listen for profile changes - Adapty will automatically call this method whenever the user's subscription status changes.
2. Store the updated profile data when this method is called, so you can use it throughout your app without making additional network requests.

```javascript
class SubscriptionManager {
    private currentProfile: any = null;
    
    constructor() {
        // Listen for profile updates
        adapty.addEventListener('onLatestProfileLoad', (profile) => {
            this.currentProfile = profile;
            // Update UI, unlock content, etc.
        });
    }
    
    // Use stored profile instead of calling getProfile()
    hasAccess(): boolean {
        return this.currentProfile?.accessLevels?.['premium']?.isActive ?? false;
    }
}
```

:::note
Adapty automatically calls the `onLatestProfileLoad` event listener when your app starts, providing cached subscription data even if the device is offline.
:::

## Connect profile with paywall logic

When you need to make immediate decisions about showing paywalls or granting access to paid features, you can check the user's profile directly. This approach is useful for scenarios like app launch, when entering premium sections, or before displaying specific content.

```javascript
import React, { useEffect } from 'react';
import { Button, View } from 'react-native';
import { adapty, createPaywallView } from '@adapty/react-native-ui';

export default function PaywallScreen() {
  const initializePaywall = async () => {
    try {
      // Load paywall configuration
      await loadPaywall();
      
      // Check if user has access to premium features
      const hasAccess = await checkAccessLevel();
      if (!hasAccess) {
        await showPaywall(); // Show paywall if no access
      }
    } catch (error) {
      console.warn('Error initializing paywall:', error);
    }
  };

  const checkAccessLevel = async () => {
    try {
      const profile = await adapty.getProfile();
      return profile.accessLevels['premium']?.isActive === true;
    } catch (error) {
      console.warn('Error checking access level:', error);
      return false; // Show paywall if access check fails
    }
  };

  const loadPaywall = async () => {
    // Load paywall configuration
    // ... paywall loading logic
  };

  const showPaywall = async () => {
    // Present paywall
    // ... paywall presentation logic
  };

  useEffect(() => {
    initializePaywall();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button title="Show Paywall" onPress={showPaywall} />
    </View>
  );
}
``` 