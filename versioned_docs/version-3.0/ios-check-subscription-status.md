---
title: "Check subscription status"
description: "Learn how to check subscription status in your iOS app with Adapty."
metadataTitle: "Check Subscription Status | Adapty Docs"
slug: /ios-check-subscription-status
displayed_sidebar: sdkios
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

This guide will help you implement subscription status checking in your iOS app using Adapty. This is a crucial step in the quick-start process to ensure your app properly handles user access to premium features.

## Basic Implementation

Here's a simple example of how to check subscription status:

```swift showLineNumbers
do {
    let profile = try await Adapty.getProfile()
    
    if profile.accessLevels["premium"]?.isActive ?? false {
        // User has active premium subscription
        // Enable premium features
    } else {
        // User doesn't have premium access
        // Show paywall or restrict features
    }
} catch {
    // Handle error
}
```

## Next Steps

After implementing subscription status checking, you can:
- [Present paywalls](ios-present-paywalls) to users without premium access
- [Handle subscription events](ios-handling-events)
- [Implement restore purchases](restore-purchase)

For more detailed information about subscription management, check out our [complete subscription status guide](subscription-status). 