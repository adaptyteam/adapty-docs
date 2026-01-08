---
title: "Unity - Use fallback paywalls"
description: "Handle cases when users are offline or Adapty servers aren't available"
metadataTitle: "Using fallback paywalls and onboardings | Unity SDK | Adapty Docs"
slug: /unity-use-fallback-paywalls
displayed_sidebar: sdkunity
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import SampleApp from '@site/src/components/reusable/SampleApp.md'; 

import FallbackPaywallIntroduction from '@site/src/components/reusable/FallbackPaywallIntroduction.md';

:::warning
Fallback paywall support requires Unity SDK v2.11 and later.
:::

<FallbackPaywallIntroduction />

## Configuration

1. Move the fallback configuration file to your project directory.
2. Call the `.setFallback` method **before** you fetch the target paywall or onboarding.

```csharp
using UnityEngine;
using AdaptySDK;

#if UNITY_IOS
    string fileName = "ios_fallback.json";
#elif UNITY_ANDROID
    string fileName = "android_fallback.json";
#else
    // Optional: handle Editor or other platforms
    string fileName = "fallback.json"; 
#endif

Adapty.SetFallback(fileName, (error) => {
    if (error != null) {
        Debug.LogError($"Failed to set fallback: {error}");
        return;
    }
    
    // Fallback set successfully
});
```

Parameters:

| Parameter    | Description                                          |
|:-------------|:-----------------------------------------------------|
| **fileName** | The string with the name of the fallback configuration file. |