---
title: "Flutter - Use fallback paywalls"
description: "Handle cases when users are offline or Adapty servers aren't available"
metadataTitle: "Using Fallback Paywalls in Flutter | Adapty Docs"
---

import SampleApp from '@site/src/components/reusable/SampleApp.md'; 

import FallbackPaywallIntroduction from '@site/src/components/reusable/FallbackPaywallIntroduction.md';

<FallbackPaywallIntroduction />

## Configuration

1. Move the fallback configuration file to your project directory.
2. Add the `.setFallback` method to your application code. Place it **before** the method that fetches the target paywall or [onboarding](/localize-onboardings).
3. Pass the fallback configuration file path to the method.

Example:


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
| **assetId**    | Path to the fallback paywall / onboarding configuration file. |

<SampleApp />
