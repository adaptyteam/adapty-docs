---
title: "iOS - Use fallback paywalls"
description: ""
metadataTitle: ""
---

To use fallback paywalls:

1. Place the fallback JSON file you downloaded in the Adapty Dashboard alongside your app in the user's device.
2. Call the `.setFallbackPaywalls` method. Place this method in your code **before** fetching a paywall, ensuring that the mobile app possesses it when a fallback paywall is required to replace the standard one.

Here's an example of retrieving fallback paywall data from a locally stored JSON file named `ios_fallback.json`.

```swift title="Swift"
if let url = Bundle.main.url(forResource: "ios_fallback", withExtension: "json") {
     Adapty.setFallbackPaywalls(fileURL: url)

```

Parameters:

| Parameter   | Description                                                                                                                                                           |
| :---------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **fileURL** | Path to the file with fallback paywalls you [downloaded in the Adapty Dashboard](fallback-paywalls#download-fallback-paywalls-as-a-file-in-the-adapty-dashboard). |