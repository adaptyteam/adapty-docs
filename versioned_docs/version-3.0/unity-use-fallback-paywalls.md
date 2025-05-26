---
title: "Unity - Use fallback paywalls"
description: "Implement fallback paywalls in Unity apps using Adapty."
metadataTitle: "Using Fallback Paywalls in Unity | Adapty Docs"
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import SampleApp from '@site/src/components/reusable/SampleApp.md'; 

To use fallback paywalls:

1. Save fallback paywalls to files in `/Assets/StreamingAssets/`, 1 file for Android and another for iOS.
2. Pass the file names to the `SetFallbackPaywalls` method. Place this method in your code **before** fetching a paywall, ensuring that the mobile app possesses it when a fallback paywall is required to replace the standard one.

```csharp showLineNumbers title="Unity"
using AdaptySDK;

void SetFallBackPaywalls() {
#if UNITY_IOS
  var assetId = "adapty_fallback_ios.json";
#elif UNITY_ANDROID
  var assetId = "adapty_fallback_android.json";
#else
  var assetId = "";
#endif

  Adapty.SetFallbackPaywalls(assetId, (error) => {
    // handle the error
  });
}
```

Parameters:

| Parameter   | Description                                                  |
| :---------- | :----------------------------------------------------------- |
| **assetId** | The path to the fallback JSON file you [downloaded in the Adapty Dashboard](fallback-paywalls#download-fallback-paywalls-as-a-file-in-the-adapty-dashboard). |

<SampleApp />