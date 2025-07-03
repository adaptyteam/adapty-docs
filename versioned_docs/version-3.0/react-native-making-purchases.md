---
title: "Accept purchases"
description: "Learn how to accept purchases in your React Native app with Adapty SDK."
metadataTitle: "Accept Purchases | React Native SDK | Adapty Docs"
slug: /react-native-making-purchases
displayed_sidebar: sdkreactnative
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

## Make a purchase

To make a purchase, use the `makePurchase` method:

```javascript
import { Adapty } from 'react-native-adapty';

const paywalls = await Adapty.getPaywalls();
const paywall = paywalls[0];
const product = paywall.products[0];

try {
  const purchase = await Adapty.makePurchase(product);
  console.log('Purchase successful:', purchase);
} catch (error) {
  console.error('Purchase failed:', error);
}
```

## Purchase with options

You can specify additional options when making a purchase:

```javascript
const purchase = await Adapty.makePurchase(product, {
  androidSubscriptionUpdateParameters: {
    replacementMode: 'with_time_proration'
  }
});
```

## Handle purchase result

The purchase result contains detailed information:

```javascript
const purchase = await Adapty.makePurchase(product);

console.log('Purchase ID:', purchase.purchaseId);
console.log('Product ID:', purchase.vendorProductId);
console.log('Store:', purchase.store);
console.log('Purchase date:', purchase.purchaseDate);
console.log('Expires date:', purchase.expiresDate);
```

## Purchase validation

Adapty automatically validates purchases:

```javascript
try {
  const purchase = await Adapty.makePurchase(product);
  
  if (purchase.isActive) {
    console.log('Purchase is active');
    // Enable premium features
  } else {
    console.log('Purchase is not active');
    // Handle inactive purchase
  }
} catch (error) {
  if (error.code === 'PURCHASE_CANCELLED') {
    console.log('User cancelled purchase');
  } else if (error.code === 'PURCHASE_FAILED') {
    console.log('Purchase failed:', error.message);
  }
}
```

## Subscription updates (Android)

For Android subscription updates:

```javascript
const purchase = await Adapty.makePurchase(product, {
  androidSubscriptionUpdateParameters: {
    replacementMode: 'with_time_proration',
    oldPurchaseId: 'old_purchase_id'
  }
});
```

## Purchase observer

To listen for purchase events:

```javascript
import { AdaptyPurchaseObserver } from 'react-native-adapty';

const observer = new AdaptyPurchaseObserver();

observer.on('purchase_started', (product) => {
  console.log('Purchase started for:', product.vendorProductId);
});

observer.on('purchase_completed', (purchase) => {
  console.log('Purchase completed:', purchase);
});

observer.on('purchase_failed', (error) => {
  console.error('Purchase failed:', error);
});
```

## Error handling

Handle different types of purchase errors:

```javascript
try {
  const purchase = await Adapty.makePurchase(product);
} catch (error) {
  switch (error.code) {
    case 'PURCHASE_CANCELLED':
      console.log('User cancelled the purchase');
      break;
    case 'PURCHASE_FAILED':
      console.log('Purchase failed:', error.message);
      break;
    case 'NETWORK_ERROR':
      console.log('Network error during purchase');
      break;
    case 'INVALID_PRODUCT':
      console.log('Invalid product ID');
      break;
    default:
      console.log('Unknown error:', error);
  }
}
```

## Testing purchases

For testing, use sandbox accounts:

```javascript
// In development, use sandbox accounts
// The SDK automatically handles sandbox vs production
const purchase = await Adapty.makePurchase(product);
console.log('Purchase made in sandbox mode');
``` 