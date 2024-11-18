---
title: "Flutter - Use fallback paywalls"
description: ""
metadataTitle: ""
---

To use fallback paywalls, call the `.setFallbackPaywalls` method. Pass the path to the fallback JSON file you [downloaded in the Adapty Dashboard](fallback-paywalls#download-fallback-paywalls-as-a-file-in-the-adapty-dashboard). Place this method in your code **before** fetching a paywall, ensuring that the mobile app possesses it when a fallback paywall is required to replace the standard one.

```javascript title="javascript"
import 'dart:async' show Future;
import 'dart:io' show Platform;
import 'package:flutter/services.dart' show rootBundle;

final assetId = Platform.isIOS ? 'assets/ios_fallback.json' : 'assets/android_fallback.json';

try {
  await adapty.setFallbackPaywalls(assetId);
} on AdaptyError catch (adaptyError) {
  // handle the error
} catch (e) {
}
```

Parameters:

| Parameter      | Description                                                                                                                                                          |
| :------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **assetId**    | The path to the fallback JSON file you [downloaded in the Adapty Dashboard](fallback-paywalls#download-fallback-paywalls-as-a-file-in-the-adapty-dashboard). |
