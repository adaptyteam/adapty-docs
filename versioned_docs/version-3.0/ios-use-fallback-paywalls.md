---
title: "iOS - Use fallback paywalls"
description: "Handle cases when users are offline or Adapty servers aren't available"
metadataTitle: "Using Fallback Paywalls on iOS | Adapty Docs"
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import Tabs from '@theme/Tabs'; 
import TabItem from '@theme/TabItem'; 

import FallbackPaywallIntroduction from '@site/src/components/reusable/FallbackPaywallIntroduction.md';

:::warning
Fallback paywall support requires iOS SDK v2.11 or later.
:::

<FallbackPaywallIntroduction />

## Configuration

1. Add the fallback JSON file to your project bundle: open the **File** menu in XCode and select the **Add Files to "YourProjectName"** option.
2. Call the `.setFallback` method **before** you fetch the target paywall or onboarding.

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
| **fileURL** | Path to the fallback configuration file. |