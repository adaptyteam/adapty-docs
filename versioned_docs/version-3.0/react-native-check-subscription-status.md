---
title: "Check subscription status in React Native SDK"
description: "Learn how to check subscription status in your React Native app with Adapty."
metadataTitle: "Check Subscription Status | Adapty Docs"
displayed_sidebar: sdkreactnative
keywords: ['getProfile', 'subscription status']
rank: 90
---

To decide whether users can access paid content or see a paywall, you need to check their [access level](access-level.md) in the profile.

This article shows you how to access the profile state to decide what users need to see - whether to show them a paywall or grant access to paid features.

## Get subscription status

When you decide whether to show a paywall or paid content to a user, you check their [access level](access-level.md) in their profile. You have two options:

- Call `getProfile` if you need the latest profile data immediately (like on app launch) or want to force an update.
- Set up **automatic profile updates** to keep a local copy that's automatically refreshed whenever the subscription status changes.

### Get profile

The easiest way to get the subscription status is to use the `getProfile` method to access the profile:

```typescript showLineNumbers
try {
    const profile = await adapty.getProfile();
} catch (error) {
  // handle the error
}
```

### Listen to subscription updates

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
const checkAccessLevel = async () => {
  try {
    const profile = await adapty.getProfile();
    return profile.accessLevels['YOUR_ACCESS_LEVEL']?.isActive === true;
  } catch (error) {
    console.warn('Error checking access level:', error);
    return false; // Show paywall if access check fails
  }
};

const initializePaywall = async () => {
  try {
    await loadPaywall();
    
    const hasAccess = await checkAccessLevel();
    if (!hasAccess) {
      // Show paywall if no access
    }
  } catch (error) {
    console.warn('Error initializing paywall:', error);
  }
};
``` 

## Next steps

Now, when you know how to track the subscription status, learn how to [work with user profiles](react-native-quickstart-identify.md) to ensure they can access what they have paid for.