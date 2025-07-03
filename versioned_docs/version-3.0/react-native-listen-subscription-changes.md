---
title: "Listen for subscription status changes"
description: "Learn how to listen for subscription status changes in your React Native app with Adapty SDK."
metadataTitle: "Listen for Subscription Changes | React Native SDK | Adapty Docs"
slug: /react-native-listen-subscription-changes
displayed_sidebar: sdkreactnative
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

## Profile observer

To listen for subscription status changes, use the `AdaptyProfileObserver`:

```javascript
import { AdaptyProfileObserver } from 'react-native-adapty';

const observer = new AdaptyProfileObserver();

observer.on('profile_updated', (profile) => {
  console.log('Profile updated:', profile);
  
  // Check if premium access changed
  const hasPremium = profile.accessLevels.premium?.isActive;
  if (hasPremium) {
    console.log('User gained premium access');
    // Enable premium features
  } else {
    console.log('User lost premium access');
    // Disable premium features
  }
});

observer.on('profile_loaded', (profile) => {
  console.log('Profile loaded:', profile);
});
```

## Check access levels

You can check specific access levels when the profile updates:

```javascript
observer.on('profile_updated', (profile) => {
  // Check premium access
  const hasPremium = profile.accessLevels.premium?.isActive;
  
  // Check pro access
  const hasPro = profile.accessLevels.pro?.isActive;
  
  // Check any active subscription
  const hasAnySubscription = Object.values(profile.accessLevels)
    .some(level => level?.isActive);
    
  console.log('Premium:', hasPremium);
  console.log('Pro:', hasPro);
  console.log('Any subscription:', hasAnySubscription);
});
```

## Handle subscription changes

React to subscription changes in your app:

```javascript
observer.on('profile_updated', (profile) => {
  const hasPremium = profile.accessLevels.premium?.isActive;
  
  if (hasPremium) {
    // User gained premium access
    enablePremiumFeatures();
    showPremiumWelcomeMessage();
  } else {
    // User lost premium access
    disablePremiumFeatures();
    showUpgradePrompt();
  }
});

function enablePremiumFeatures() {
  // Enable premium features in your app
}

function disablePremiumFeatures() {
  // Disable premium features in your app
}
```

## Clean up observer

Don't forget to clean up the observer when it's no longer needed:

```javascript
// In React component
useEffect(() => {
  const observer = new AdaptyProfileObserver();
  
  observer.on('profile_updated', handleProfileUpdate);
  
  return () => {
    observer.off('profile_updated', handleProfileUpdate);
  };
}, []);
```

## Manual profile refresh

You can also manually refresh the profile:

```javascript
import { Adapty } from 'react-native-adapty';

const profile = await Adapty.getProfile();
console.log('Current profile:', profile);
``` 