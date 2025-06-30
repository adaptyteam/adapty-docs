---
title: "Flutter - Use fallback paywalls"
description: "Implement fallback paywalls in Flutter with Adapty to ensure seamless subscription handling."
metadataTitle: "Using Fallback Paywalls in Flutter | Adapty Docs"
---

import SampleApp from '@site/src/components/reusable/SampleApp.md'; 

To use fallback paywalls, call the `.setFallback` method. Pass the path to the fallback JSON file you [downloaded in the Adapty Dashboard](fallback-paywalls#download-fallback-paywalls-as-a-file-in-the-adapty-dashboard). Place this method in your code **before** fetching a paywall, ensuring that the mobile app possesses it when a fallback paywall is required to replace the standard one.

```javascript showLineNumbers title="javascript"
import 'dart:async' show Future;
import 'dart:io' show Platform;

final assetId = Platform.isIOS ? 'assets/ios_fallback.json' : 'assets/android_fallback.json';

try {
  await Adapty.setFallback(assetId);
} on AdaptyError catch (adaptyError) {
  // handle the error
} catch (e) {
}
```

Parameters:

| Parameter      | Description                                                                                                                                                          |
| :------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **assetId**    | The path to the fallback JSON file you [downloaded in the Adapty Dashboard](fallback-paywalls#download-fallback-paywalls-as-a-file-in-the-adapty-dashboard). |

<SampleApp />
