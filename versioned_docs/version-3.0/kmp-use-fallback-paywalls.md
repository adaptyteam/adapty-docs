---
title: "Use fallback paywalls in Kotlin Multiplatform SDK"
description: "Handle cases when users are offline or Adapty servers aren't available"
metadataTitle: "Using Fallback Paywalls on Kotlin Multiplatform | Adapty Docs"
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import SampleApp from '@site/src/components/reusable/SampleApp.md';

To use fallback paywalls in your Kotlin Multiplatform project, you need to place the fallback JSON file in the appropriate location for each platform and then call the `setFallbackPaywalls` method.

## Platform-specific setup

### For Android

1. Place the fallback file you [downloaded in the Adapty Dashboard](fallback-paywalls#download-fallback-paywalls-as-a-file-in-the-adapty-dashboard) in the `android/app/src/main/assets/` directory.
2. Use the relative path from the `assets` directory as the `assetId` parameter.

### For iOS

1. In Xcode, use the menu **File** -> **Add Files to "YourProjectName"** to add the fallback file you [downloaded in the Adapty Dashboard](fallback-paywalls#download-fallback-paywalls-as-a-file-in-the-adapty-dashboard).
2. Use the filename (including extension) as the `assetId` parameter.

## Implementation

Here's an example of setting up fallback paywalls for both platforms:

```kotlin showLineNumbers
import com.adapty.kmp.Adapty

Adapty.setFallback(assetId = "fallback.json")
    .onSuccess { 
        // Fallback paywalls loaded successfully
    }
    .onError { error ->
        // Handle the error
    }
```

:::note
The same `assetId` parameter works for both platforms, but the file needs to be placed in the correct location for each platform:
- **Android**: `android/app/src/main/assets/fallback.json`
- **iOS**: Add to Xcode project bundle as `fallback.json`
:::

Parameters:

| Parameter   | Description                                                                                                                                                                       |
| :---------- |:----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **assetId** | The filename (including extension) of the fallback paywalls JSON file. For Android, this should be the relative path from the `assets` directory. For iOS, this should be the filename as it appears in the Xcode project bundle. |

<SampleApp /> 