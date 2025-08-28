---
title: "Implement Observer mode in iOS SDK"
description: "Implement observer mode in Adapty to track user subscription events in iOS SDK."
metadataTitle: "Implementing Observer Mode in iOS SDK | Adapty Docs"
keywords: ['observer', 'report transactions']
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

If you already have your own purchase infrastructure and aren't ready to fully switch to Adapty, you can explore [Observer mode](observer-vs-full-mode). In its basic form, Observer Mode offers advanced analytics and seamless integration with attribution and analytics systems.

If this meets your needs, you only need to:
1. Turn it on when configuring the Adapty SDK by setting the `observerMode` parameter to `true`.
2. [Report transactions](report-transactions-observer-mode) from your existing purchase infrastructure to Adapty.

If you also need paywalls and A/B testing, additional setup is required, as described below.

## Observer mode setup

Turn on the Observer mode if you handle purchases and subscription status yourself and use Adapty for sending subscription events and analytics.

:::important
When running in Observer mode, Adapty SDK won't close any transactions, so make sure you're handling it.
:::

<Tabs groupId="current-os" queryString>
<TabItem value="swiftui" label="SwiftUI">

```swift showLineNumbers
import SwiftUI
import Adapty

@main
struct YourApp: App {
  init() {
    // Configure Adapty SDK
    let configurationBuilder = AdaptyConfiguration
      .builder(withAPIKey: "YOUR_PUBLIC_SDK_KEY") // Get from Adapty dashboard
      .with(observerMode: true) 
      
    let config = configurationBuilder.build()
    
    // Activate Adapty SDK asynchronously
    Task {
      do {
        try await Adapty.activate(with: configurationBuilder)
      } catch {
        // Handle error appropriately for your app
        print("Adapty activation failed: ", error)
      }
    }
    
    var body: some Scene {
      WindowGroup {
        // Your content view
      }
    }
  }
}
```

</TabItem>
<TabItem value="swift" label="UIKit" default>

```swift showLineNumbers
import Adapty

Task {
  do {
    let configurationBuilder = AdaptyConfiguration
      .builder(withAPIKey: "YOUR_PUBLIC_SDK_KEY") // Get from Adapty dashboard
      .with(observerMode: true) 
    
    let config = configurationBuilder.build()
    try await Adapty.activate(with: config)
  } catch {
    // Handle error appropriately for your app
    print("Adapty activation failed: ", error)
  }
}

```

</TabItem>
</Tabs>

Parameters:

| Parameter                   | Description                                                  |
| --------------------------- | ------------------------------------------------------------ |
| observerMode                | A boolean value that controls [Observer mode](observer-vs-full-mode). The default value is `false`. |


## Using Adapty paywalls in Observer Mode

If you also want to use Adapty's paywalls and A/B testing features, you can — but it requires some extra setup in Observer mode. Here's what you'll need to do in addition to the steps above:

1. Display paywalls as usual for [remote config paywalls](present-remote-config-paywalls). For Paywall Builder paywalls, follow the specific setup guides for [iOS](ios-present-paywall-builder-paywalls-in-observer-mode).
3. [Associate paywalls](report-transactions-observer-mode) with purchase transactions.

