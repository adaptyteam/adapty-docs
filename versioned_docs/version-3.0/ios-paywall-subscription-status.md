---
title: "Paywall subscription status"
description: "Learn how to handle subscription status with paywalls in your iOS app."
metadataTitle: "Paywall Subscription Status | Adapty Docs"
slug: /ios-paywall-subscription-status
displayed_sidebar: sdkios
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

When working with paywalls in your iOS app, it's important to properly handle subscription status to provide a seamless user experience. This guide covers how to manage subscription status in the context of paywalls.

## Checking Status Before Showing Paywall

```swift showLineNumbers
do {
    let profile = try await Adapty.getProfile()
    
    if !(profile.accessLevels["premium"]?.isActive ?? false) {
        // User doesn't have premium access
        // Show paywall
        try await Adapty.showPaywall()
    }
} catch {
    // Handle error
}
```

## Handling Paywall Events

```swift showLineNumbers
Adapty.addPaywallObserver { event in
    switch event {
    case .purchaseCompleted:
        // User completed a purchase
        // Update UI or grant access
    case .purchaseCancelled:
        // User cancelled the purchase
        // Handle cancellation
    case .purchaseFailed(let error):
        // Purchase failed
        // Handle error
    }
}
```

## Best Practices

1. **Check Status First**: Always verify subscription status before showing paywalls
2. **Handle All Events**: Implement proper event handling for all paywall interactions
3. **Update UI**: Refresh your app's UI after subscription changes
4. **Error Handling**: Implement proper error handling for failed purchases

For more detailed information about subscription management, check out our [complete subscription status guide](subscription-status). 