---
title: "Use fallbacks in iOS SDK"
description: "Use fallbacks to handle cases when users are offline or Adapty servers aren't available"
metadataTitle: "Using Fallback Paywalls on iOS | Adapty Docs"
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import Tabs from '@theme/Tabs'; 
import TabItem from '@theme/TabItem'; 

To use fallback paywalls and onboardings:

1. In Xcode, use the menu **File** -> **Add Files to "YourProjectName"** to add the fallback JSON file you [downloaded in the Adapty Dashboard](fallback-paywalls#download-fallback-paywalls-as-a-file-in-the-adapty-dashboard) to your project bundle.
2. Call the `.setFallback` method. Place this method in your code **before** fetching a paywall or onboarding, ensuring that the mobile app possesses it when a fallback paywall or onboarding is required to replace the standard one.

Here's an example of retrieving fallback paywall or onboarding data from a locally stored JSON file named `ios_fallback.json`.

<Tabs groupId="current-os" queryString>
<TabItem value="swift" label="Swift" default>

```swift showLineNumbers
do {
     if let urlPath = Bundle.main.url(forResource: fileName, withExtension: "json") {
          try await Adapty.setFallback(fileURL: urlPath)
     }
} catch {
    // handle the error
}
```
</TabItem>
<TabItem value="swift-callback" label="Swift-Callback" default>

```swift showLineNumbers
if let url = Bundle.main.url(forResource: "ios_fallback", withExtension: "json") {
     Adapty.setFallback(fileURL: url)
}
```
</TabItem>
</Tabs>


Parameters:

| Parameter   | Description                                                                                                                                                                       |
| :---------- |:----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **fileURL** | Path to the file with fallback paywalls and onboardings you [downloaded in the Adapty Dashboard](fallback-paywalls#download-fallback-paywalls-as-a-file-in-the-adapty-dashboard). |