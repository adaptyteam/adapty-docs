---
title: "Use fallbacks in iOS SDK"
description: "Handle cases when users are offline or Adapty servers aren't available"
metadataTitle: "Using Fallback Paywalls on iOS | Adapty Docs"
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import Tabs from '@theme/Tabs'; 
import TabItem from '@theme/TabItem'; 

import FallbackPaywallIntroduction from '@site/src/components/reusable/FallbackPaywallIntroduction.md';

<FallbackPaywallIntroduction />

## Configuration

1. Add the fallback JSON file to your project bundle: open the **File** menu in XCode and select the **Add Files to "YourProjectName"** option.
2. Add the `.setFallback` method to your application code. Place it **before** the method that fetches the target paywall or [onboarding](/localize-onboardings).
3. Pass the fallback configuration file path to the method.

Example: 

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
| **fileURL** | Path to the fallback paywall / onboarding configuration file. |