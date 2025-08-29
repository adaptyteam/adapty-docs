---
title: "Use fallback paywalls in Kotlin Multiplatform SDK"
description: "Learn how to use fallback paywalls on Kotlin Multiplatform for reliable monetization."
metadataTitle: "Using Fallback Paywalls on Kotlin Multiplatform | Adapty Docs"
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import SampleApp from '@site/src/components/reusable/SampleApp.md';

To use fallback paywalls and onboardings:

1. Place the fallback JSON file you [downloaded in the Adapty Dashboard](fallback-paywalls#download-fallback-paywalls-as-a-file-in-the-adapty-dashboard) in the `assets` or `res/raw` directory of your Kotlin Multiplatform project.
2. Call the `.setFallbackPaywalls` method. Place this method in your code **before** fetching a paywall or onboarding, ensuring that the mobile app possesses it when a fallback paywall or onboarding is required to replace the standard one.

Here's an example of retrieving fallback paywall or onboarding data from a locally stored JSON file named `ios_fallback.json`.

:::note
The SDK provides two approaches for setting fallback paywalls:
- **Callback-based**: `setFallbackPaywalls(assetId, onError)` - for immediate execution
- **Suspend function**: `awaitSetFallbackPaywalls(assetId)` - for use in coroutines
:::

```kotlin showLineNumbers
import com.adapty.kmp.Adapty

// Using callback-based approach
Adapty.setFallbackPaywalls(assetId = "ios_fallback.json") { error ->
    if (error != null) {
        // handle the error
    }
}

// Alternative: Using suspend function approach
// Adapty.awaitSetFallbackPaywalls(assetId = "ios_fallback.json")
```

Parameters:

| Parameter   | Description                                                                                                                                                                       |
| :---------- |:----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **assetId** | The filename (including extension) of the fallback paywalls JSON file you [downloaded in the Adapty Dashboard](fallback-paywalls#download-fallback-paywalls-as-a-file-in-the-adapty-dashboard). This file should be placed in your app's `assets` or `res/raw` directory. |

<SampleApp /> 