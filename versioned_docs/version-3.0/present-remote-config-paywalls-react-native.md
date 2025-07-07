---
title: "Present remote config paywalls"
description: "Display paywalls designed with remote config in your React Native app."
metadataTitle: "Present remote config paywalls | React Native SDK | Adapty Docs"
displayed_sidebar: sdkreactnative
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

You can present paywalls that are designed using remote config in your React Native app. This allows you to create and modify paywalls without updating your app.

## Get paywalls

First, fetch the paywalls data from Adapty:

```javascript
try {
  const paywalls = await Adapty.getPaywalls();
  // Present paywall
} catch (error) {
  // Handle error
}
```

## Present paywall

Use the `Adapty.presentPaywall()` method to display a paywall:

```javascript
try {
  const purchase = await Adapty.presentPaywall(paywall);
  // Handle successful purchase
} catch (error) {
  // Handle error
}
```

## Handle paywall events

You can listen for paywall events to track user interactions:

```javascript
Adapty.setPaywallListener((event) => {
  switch (event.type) {
    case 'paywall_shown':
      // Paywall was displayed
      break;
    case 'paywall_closed':
      // Paywall was closed
      break;
    case 'purchase_started':
      // Purchase process started
      break;
    case 'purchase_cancelled':
      // Purchase was cancelled
      break;
    case 'purchase_completed':
      // Purchase completed successfully
      break;
    case 'purchase_failed':
      // Purchase failed
      break;
  }
});
```

## Customize paywall presentation

You can customize how the paywall is presented:

```javascript
const options = {
  style: 'modal', // or 'sheet'
  animated: true,
};

try {
  const purchase = await Adapty.presentPaywall(paywall, options);
  // Handle result
} catch (error) {
  // Handle error
}
```

## Handle purchase results

After a successful purchase, you'll receive a purchase object:

```javascript
try {
  const purchase = await Adapty.presentPaywall(paywall);
  // Access purchase details
  const productId = purchase.productId;
  const transactionId = purchase.transactionId;
  const purchaseDate = purchase.purchaseDate;
} catch (error) {
  // Handle purchase error
}
```

## Error handling

Handle various error scenarios:

```javascript
try {
  const purchase = await Adapty.presentPaywall(paywall);
  // Handle success
} catch (error) {
  switch (error.code) {
    case 'PURCHASE_CANCELLED':
      // User cancelled the purchase
      break;
    case 'PURCHASE_FAILED':
      // Purchase failed
      break;
    case 'NETWORK_ERROR':
      // Network issues
      break;
    default:
      // Other errors
      break;
  }
}
```

## Next steps

After presenting paywalls, you can:

1. [Handle paywall events](/react-native-handling-events-1)
2. [Check subscription status](/react-native-check-subscription-status)
3. [Restore purchases](/react-native-restore-purchase) 