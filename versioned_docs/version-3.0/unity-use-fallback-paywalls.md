---
title: "Use fallback paywalls"
description: "Handle cases when users are offline or Adapty servers aren't available"
metadataTitle: "Work with Paywalls Offline | Unity SDK | Adapty Docs"
slug: /unity-use-fallback-paywalls
displayed_sidebar: sdkunity
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import SampleApp from '@site/src/components/reusable/SampleApp.md'; 

To use fallback paywalls, call the `SetFallback` method. 

For this to work, place the fallback JSON file you [downloaded in the Adapty Dashboard](fallback-paywalls#download-fallback-paywalls-as-a-file-in-the-adapty-dashboard) in the `Assets/StreamingAssets` folder of your Unity project.

Place the `SetFallback` method in your code **before** fetching a paywall, ensuring that the mobile app possesses it when a fallback paywall is required to replace the standard one.

Here's an example of retrieving fallback paywall data from locally stored JSON files named `android_fallback.json` and `ios_fallback.json`.

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
| **fileName** | The object represents the name of the file resource. |