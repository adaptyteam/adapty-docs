---
title: "Check the subscription status"
description: "Learn how to check subscription status in your React Native app with Adapty SDK."
metadataTitle: "Check Subscription Status | React Native SDK | Adapty Docs"
slug: /react-native-check-subscription-status
displayed_sidebar: sdkreactnative
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

## Get access level

To check if a user has access to premium content:

```javascript
import { Adapty } from 'react-native-adapty';

const profile = await Adapty.getProfile();

if (profile.accessLevels.premium?.isActive) {
  // User has active premium subscription
  console.log('Premium access granted');
} else {
  // User doesn't have premium access
  console.log('Premium access denied');
}
```

## Check specific access level

You can check specific access levels:

```javascript
const profile = await Adapty.getProfile();

// Check premium access
const hasPremium = profile.accessLevels.premium?.isActive;

// Check pro access
const hasPro = profile.accessLevels.pro?.isActive;

// Check any active subscription
const hasAnySubscription = Object.values(profile.accessLevels)
  .some(level => level?.isActive);
```

## Listen for subscription changes

To listen for subscription status changes:

```javascript
import { AdaptyProfileObserver } from 'react-native-adapty';

const observer = new AdaptyProfileObserver();

observer.on('profile_updated', (profile) => {
  if (profile.accessLevels.premium?.isActive) {
    console.log('User gained premium access');
  } else {
    console.log('User lost premium access');
  }
});
```

## Get subscription details

To get detailed subscription information:

```javascript
const profile = await Adapty.getProfile();

// Get active subscriptions
const activeSubscriptions = profile.subscriptions.filter(sub => sub.isActive);

activeSubscriptions.forEach(subscription => {
  console.log('Product ID:', subscription.vendorProductId);
  console.log('Expires at:', subscription.expiresAt);
  console.log('Store:', subscription.store);
});
``` 