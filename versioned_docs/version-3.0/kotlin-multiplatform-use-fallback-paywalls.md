---
title: "Kotlin Multiplatform - Use fallback paywalls"
description: "Learn how to use fallback paywalls on Kotlin Multiplatform for reliable monetization."
metadataTitle: "Using Fallback Paywalls on Kotlin Multiplatform | Adapty Docs"
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import SampleApp from '@site/src/components/reusable/SampleApp.md'; 

To use fallback paywalls and onboardings:

1. Place the fallback JSON file you downloaded in the Adapty Dashboard alongside your app in the user's device.
2. Call the `.setFallbackPaywalls` method. Place this method in your code **before** fetching a paywall or onboarding, ensuring that the mobile app possesses it when a fallback paywall or onboarding is required to replace the standard one.

Here's an example of retrieving fallback paywall or onboarding data from a locally stored JSON file named `ios_fallback.json`.

```kotlin showLineNumbers
Adapty.setFallbackPaywalls(assetId = "ios_fallback.json") { error ->
    if (error != null) {
        // handle the error
    }
}
```

Parameters:

| Parameter   | Description                                                                                                                                                                       |
| :---------- |:----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **assetId** | Path to the file with fallback paywalls and onboardings you [downloaded in the Adapty Dashboard](fallback-paywalls#download-fallback-paywalls-as-a-file-in-the-adapty-dashboard). |

<SampleApp /> 