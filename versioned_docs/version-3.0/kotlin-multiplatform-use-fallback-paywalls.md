---
title: "Kotlin Multiplatform - Use fallback paywalls"
description: "Learn how to use fallback paywalls on Kotlin Multiplatform for reliable monetization."
metadataTitle: "Using Fallback Paywalls on Kotlin Multiplatform | Adapty Docs"
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import SampleApp from '@site/src/components/reusable/SampleApp.md'; 

Fallback paywalls are a safety mechanism that ensures your app can still display paywalls even when there are issues with the main paywall configuration. This is particularly useful for handling network issues, configuration errors, or other edge cases.

## How fallback paywalls work

When you try to present a paywall and it fails to load or render, Adapty can automatically fall back to a predefined fallback paywall. This ensures that users can still make purchases even when there are technical issues.

## Setting up fallback paywalls

To use fallback paywalls, you need to configure them in your Adapty dashboard and then handle them in your code:

```kotlin showLineNumbers
import com.adapty.kmp.Adapty
import com.adapty.kmp.AdaptyUI
import com.adapty.kmp.models.AdaptyPaywall
import com.adapty.kmp.models.onError
import com.adapty.kmp.models.onSuccess

// Fetch paywall with fallback handling
Adapty.getPaywall(placementId = "YOUR_PLACEMENT_ID")
    .onSuccess { paywall ->
        // Present paywall
        AdaptyUI.getPaywallView(
            paywall = paywall,
            products = null,
            observer = yourObserver,
            loadProducts = true
        )
    }.onError { error ->
        // Handle error - Adapty will automatically use fallback if configured
        // You can also manually handle fallback logic here
    }
```

## Configuring fallback paywalls in dashboard

1. Go to your Adapty dashboard
2. Navigate to the Paywall Builder
3. Create a fallback paywall with basic styling and essential elements
4. Configure it as a fallback for your main paywalls

## Best practices

- Keep fallback paywalls simple and focused on core functionality
- Test fallback scenarios regularly
- Monitor fallback usage to identify potential issues with main paywalls
- Ensure fallback paywalls have the same products as main paywalls

<SampleApp /> 