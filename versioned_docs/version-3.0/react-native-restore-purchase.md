---
title: "Restore purchases"
description: "Learn how to restore purchases in your React Native app with Adapty SDK."
metadataTitle: "Restore Purchases | React Native SDK | Adapty Docs"
slug: /react-native-restore-purchase
displayed_sidebar: sdkreactnative
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

## Restore purchases

To restore purchases, use the `restorePurchases` method:

```javascript
import { Adapty } from 'react-native-adapty';

try {
  await Adapty.restorePurchases();
  console.log('Purchases restored successfully');
} catch (error) {
  console.error('Restore failed:', error);
}
```

## Check restored purchases

After restoring, check the user's profile for active subscriptions:

```javascript
await Adapty.restorePurchases();

const profile = await Adapty.getProfile();
const activeSubscriptions = profile.subscriptions.filter(sub => sub.isActive);

if (activeSubscriptions.length > 0) {
  console.log('Found active subscriptions:', activeSubscriptions.length);
  activeSubscriptions.forEach(sub => {
    console.log('Product:', sub.vendorProductId);
    console.log('Expires:', sub.expiresAt);
  });
} else {
  console.log('No active subscriptions found');
}
```

## Restore with progress

You can track restore progress:

```javascript
import { AdaptyRestoreObserver } from 'react-native-adapty';

const observer = new AdaptyRestoreObserver();

observer.on('restore_started', () => {
  console.log('Restore started');
  // Show loading indicator
});

observer.on('restore_completed', (profile) => {
  console.log('Restore completed');
  // Hide loading indicator
  // Update UI with restored purchases
});

observer.on('restore_failed', (error) => {
  console.error('Restore failed:', error);
  // Hide loading indicator
  // Show error message
});

// Start restore
await Adapty.restorePurchases();
```

## Handle restore errors

Handle different types of restore errors:

```javascript
try {
  await Adapty.restorePurchases();
} catch (error) {
  switch (error.code) {
    case 'RESTORE_CANCELLED':
      console.log('User cancelled restore');
      break;
    case 'RESTORE_FAILED':
      console.log('Restore failed:', error.message);
      break;
    case 'NETWORK_ERROR':
      console.log('Network error during restore');
      break;
    case 'NO_PURCHASES_TO_RESTORE':
      console.log('No purchases to restore');
      break;
    default:
      console.log('Unknown restore error:', error);
  }
}
```

## Restore specific products

You can restore specific products if needed:

```javascript
// Get user profile to see what products they might have
const profile = await Adapty.getProfile();

// Check if user has any subscriptions
if (profile.subscriptions.length > 0) {
  console.log('User has subscription history');
  await Adapty.restorePurchases();
} else {
  console.log('No subscription history found');
}
```

## Restore UI integration

Integrate restore functionality into your UI:

```javascript
const RestoreButton = () => {
  const [isRestoring, setIsRestoring] = useState(false);
  
  const handleRestore = async () => {
    setIsRestoring(true);
    
    try {
      await Adapty.restorePurchases();
      const profile = await Adapty.getProfile();
      
      if (profile.subscriptions.some(sub => sub.isActive)) {
        Alert.alert('Success', 'Your purchases have been restored!');
      } else {
        Alert.alert('No Purchases', 'No active purchases found to restore.');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to restore purchases. Please try again.');
    } finally {
      setIsRestoring(false);
    }
  };
  
  return (
    <Button
      title={isRestoring ? 'Restoring...' : 'Restore Purchases'}
      onPress={handleRestore}
      disabled={isRestoring}
    />
  );
};
```

## Automatic restore

You can automatically restore purchases on app launch:

```javascript
// In your app initialization
const initializeApp = async () => {
  try {
    // Activate Adapty
    await Adapty.activate();
    
    // Automatically restore purchases
    await Adapty.restorePurchases();
    
    // Get updated profile
    const profile = await Adapty.getProfile();
    console.log('App initialized with profile:', profile);
  } catch (error) {
    console.error('App initialization failed:', error);
  }
};
``` 