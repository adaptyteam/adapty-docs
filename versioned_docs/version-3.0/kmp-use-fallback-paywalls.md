---
title: "Use fallback paywalls in Kotlin Multiplatform SDK"
description: "Handle cases when users are offline or Adapty servers aren't available"
metadataTitle: "Using Fallback Paywalls on Kotlin Multiplatform | Adapty Docs"
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import SampleApp from '@site/src/components/reusable/SampleApp.md';

import FallbackPaywallIntroduction from '@site/src/components/reusable/FallbackPaywallIntroduction.md';

<FallbackPaywallIntroduction />

## Configuration

1. Add the fallback configuration file to your application.

    * If your target platform is Android, move the fallback configuration file to the `android/app/src/main/assets/` folder.
    * If your target platform is iOS, add the fallback JSON file to your project bundle. (**File** -> **Add Files to YourProjectName**)

2. Add the `.setFallback` method to your application code. Place it **before** the method that fetches the target paywall or [onboarding](/localize-onboardings).
3. Set the `assetId` parameter, depending on your target platform.
    * Android: Use the file path relative to the `assets` directory.
    * iOS: Use the complete filename.

Example:

```kotlin showLineNumbers
import com.adapty.kmp.Adapty

Adapty.setFallbackPaywalls(assetId = "fallback.json")
    .onSuccess { 
        // Fallback paywalls loaded successfully
    }
    .onError { error ->
        // Handle the error
    }
```
Parameters:

| Parameter   | Description                                                                                                                                                                       |
| :---------- |:----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **assetId** | Fallback configuration filename (iOS). <br /> Fallback configuration file path, relative to the `assets` directory (Android). |

<SampleApp /> 