---
title: "Android Subscription Status"
description: "Track and manage user subscription status in your Android app with Adapty."
metadataTitle: "Android Subscription Status | Adapty Docs"
slug: /android-subscription-status
displayed_sidebar: sdkandroid
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

With Adapty's Android SDK, managing subscription status is straightforward and efficient. You can easily track user subscriptions and access levels without manually handling Google Play receipts.

## Getting Started

Before implementing subscription status checks, ensure you have:

1. Set up [Real-time developer notifications (RTDN)](enable-real-time-developer-notifications-rtdn)
2. Initialized the Adapty SDK in your app
3. Identified your users with [Adapty.identify()](identifying-users)

## Checking Subscription Status

The Adapty Android SDK provides two main ways to check subscription status:

### 1. Using getProfile()

```kotlin showLineNumbers
try {
    val profile = Adapty.getProfile()
    
    if (profile.accessLevels["premium"]?.isActive == true) {
        // User has active premium subscription
        // Grant access to premium features
    }
} catch (e: Exception) {
    // Handle error
}
```

### 2. Listening for Profile Updates

```kotlin showLineNumbers
Adapty.addProfileObserver { profile ->
    if (profile.accessLevels["premium"]?.isActive == true) {
        // User's subscription status has changed
        // Update UI or grant/revoke access
    }
}
```

## Best Practices

1. **Check on App Launch**: Always verify subscription status when your app starts
2. **Listen for Changes**: Implement profile observers to handle real-time subscription updates
3. **Handle Offline Mode**: The SDK provides cached data when offline
4. **Error Handling**: Implement proper error handling for network issues

## Common Use Cases

- Granting access to premium features
- Showing/hiding premium content
- Updating UI based on subscription status
- Handling subscription expiration
- Managing trial periods

For more detailed information about subscription management, check out our [complete subscription status guide](subscription-status). 