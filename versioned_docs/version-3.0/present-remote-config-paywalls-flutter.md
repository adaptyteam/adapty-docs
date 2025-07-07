---
title: "Present remote config paywalls"
description: "Display paywalls designed with remote config in your Flutter app."
metadataTitle: "Present remote config paywalls | Flutter SDK | Adapty Docs"
displayed_sidebar: sdkflutter
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

You can present paywalls that are designed using remote config in your Flutter app. This allows you to create and modify paywalls without updating your app.

## Get paywalls

First, fetch the paywalls data from Adapty:

```dart
try {
  final paywalls = await Adapty.getPaywalls();
  // Present paywall
} catch (e) {
  // Handle error
}
```

## Present paywall

Use the `Adapty.presentPaywall()` method to display a paywall:

```dart
try {
  final purchase = await Adapty.presentPaywall(paywall);
  // Handle successful purchase
} catch (e) {
  // Handle error
}
```

## Handle paywall events

You can listen for paywall events to track user interactions:

```dart
Adapty.setPaywallListener((event) {
  switch (event.runtimeType) {
    case AdaptyPaywallShownEvent:
      // Paywall was displayed
      break;
    case AdaptyPaywallClosedEvent:
      // Paywall was closed
      break;
    case AdaptyPurchaseStartedEvent:
      // Purchase process started
      break;
    case AdaptyPurchaseCancelledEvent:
      // Purchase was cancelled
      break;
    case AdaptyPurchaseCompletedEvent:
      // Purchase completed successfully
      break;
    case AdaptyPurchaseFailedEvent:
      // Purchase failed
      break;
  }
});
```

## Customize paywall presentation

You can customize how the paywall is presented:

```dart
final options = AdaptyPaywallPresentationOptions(
  style: AdaptyPaywallStyle.modal, // or sheet
  animated: true,
);

try {
  final purchase = await Adapty.presentPaywall(paywall, options);
  // Handle result
} catch (e) {
  // Handle error
}
```

## Handle purchase results

After a successful purchase, you'll receive a purchase object:

```dart
try {
  final purchase = await Adapty.presentPaywall(paywall);
  // Access purchase details
  final productId = purchase.productId;
  final transactionId = purchase.transactionId;
  final purchaseDate = purchase.purchaseDate;
} catch (e) {
  // Handle purchase error
}
```

## Error handling

Handle various error scenarios:

```dart
try {
  final purchase = await Adapty.presentPaywall(paywall);
  // Handle success
} catch (e) {
  if (e is AdaptyError) {
    switch (e.runtimeType) {
      case AdaptyPurchaseCancelledError:
        // User cancelled the purchase
        break;
      case AdaptyPurchaseFailedError:
        // Purchase failed
        break;
      case AdaptyNetworkError:
        // Network issues
        break;
      default:
        // Other errors
        break;
    }
  }
}
```

## Next steps

After presenting paywalls, you can:

1. [Handle paywall events](/flutter-handling-events)
2. [Check subscription status](/flutter-check-subscription-status)
3. [Restore purchases](/flutter-restore-purchase) 