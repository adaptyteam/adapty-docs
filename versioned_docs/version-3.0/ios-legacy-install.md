---
title: "Legacy installation guide"
description: "Get started with Adapty on iOS to streamline subscription setup and management."
metadataTitle: "Getting Started with iOS | Adapty Docs"
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Please consult the compatibility table below to choose the correct pair of Adapty SDK and AdaptyUI SDK.

| Adapty SDK version                   | AdaptyUI SDK version |
| :----------------------------------- | :------------------- |
| 2.7.x, 2.8.x                         | 2.0.x                |
| 2.9.x - 2.10.0                       | 2.1.2                |
| 2.10.1                               | 2.1.3                |
| 2.10.3 and all later 2.10.x versions | 2.1.5                |
| 2.11.1                               | 2.11.1               |
| 2.11.2                               | 2.11.2               |
| 2.11.3                               | 2.11.3               |

You can install AdaptySDK and AdaptyUI SDK via CocoaPods, or Swift Package Manager.

:::danger
Go through release checklist before releasing your app

Before releasing your application, make sure to carefully review the [Release Checklist](release-checklist) thoroughly. This checklist ensures that you've completed all necessary steps and provides criteria for evaluating the success of your integration.
:::

## Install SDKs via Swift Package Manager

1. In Xcode go to **File** ->  **Add Package Dependency...**. Please note the way to add package dependencies can differ in XCode versions. Refer to XCode documentation if necessary.
2. Enter the repository URL `https://github.com/adaptyteam/AdaptySDK-iOS.git`
3. Choose the version, and click the **Add package** button. Xcode will add the package dependency to your project, and you can import it.
4. In the **Choose Package Products** window, click the **Add package** button once again. The package will appear in the **Packages** list.
5. Repeat steps 2-3 for AdaptyUI SDK URL: `https://github.com/adaptyteam/AdaptyUI-iOS.git`.

## Install SDKs via CocoaPods

:::info

CocoaPods is now in maintenance mode, with development officially stopped. We recommend switching to [Swift Package Manager](sdk-installation-ios#install-adapty-sdk-via-swift-package-manager).

:::

1. Add Adapty to your `Podfile`:

   ```shell showLineNumbers title="Podfile"
   pod 'Adapty', '~> 2.11.3'
   pod 'AdaptyUI', '~> 2.11.3'
   ```

2. Run:

   ```sh showLineNumbers title="Shell"
   pod install
   ```

This creates a `.xcworkspace` file for your app. Use this file for all future development of your application.

## Configure Adapty SDK

You only need to configure the Adapty SDK once, typically early in your application lifecycle:

<Tabs groupId="current-os" queryString>
<TabItem value="swift" label="Swift" default>

```swift showLineNumbers
// In your AppDelegate class:

let configurationBuilder =
    AdaptyConfiguration
        .Builder(withAPIKey: "PUBLIC_SDK_KEY")
        .with(observerMode: false) // optional
        .with(customerUserId: "YOUR_USER_ID") // optional
        .with(idfaCollectionDisabled: false) // optional
        .with(ipAddressCollectionDisabled: false) // optional

Adapty.activate(with: configurationBuilder.build()) { error in
  // handle the error
}
```

</TabItem>
<TabItem value="swiftui" label="SwiftUI" default>

```swift showLineNumbers
import Adapty

@main
struct SampleApp: App {
    init() 
      let configurationBuilder =
        AdaptyConfiguration
          .Builder(withAPIKey: "PUBLIC_SDK_KEY")
          .with(observerMode: false) // optional
          .with(customerUserId: "YOUR_USER_ID") // optional
          .with(idfaCollectionDisabled: false) // optional
          .with(ipAddressCollectionDisabled: false) // optional
          .with(LogLevel: verbose) // optional  

        Adapty.activate(with: configurationBuilder.build()) { error in
          // handle the error
        }
    }

    var body: some Scene {
        WindowGroup {
            ContentView()
        }
    }
}
```

</TabItem>
</Tabs>



Parameters:

| Parameter                   | Presence | Description                                                  |
| --------------------------- | -------- | ------------------------------------------------------------ |
| apiKey                      | required | The key you can find in the **Public SDK key** field of your app settings in Adapty: [**App settings**-> **General** tab -> **API keys** subsection](https://app.adapty.io/settings/general) |
| observerMode                | optional | <p>A boolean value controlling [Observer mode](observer-vs-full-mode). Turn it on if you handle purchases and subscription status yourself and use Adapty for sending subscription events and analytics.</p><p>The default value is `false`.</p><p></p><p>🚧 When running in Observer mode, Adapty SDK won't close any transactions, so make sure you're handling it.</p> |
| customerUserId              | optional | An identifier of the user in your system. We send it in subscription and analytical events, to attribute events to the right profile. You can also find customers by `customerUserId` in the [**Profiles and Segments**](https://app.adapty.io/profiles/users) menu. |
| idfaCollectionDisabled      | optional | <p>Set to `true` to disable IDFA collection and sharing.</p><p>the user IP address sharing.</p><p>The default value is `false`.</p><p>For more details on IDFA collection, refer to the [Analytics integration](analytics-integration#disable-collection-of-advertising-identifiers)   section.</p> |
| ipAddressCollectionDisabled | optional | <p>Set to `true` to disable user IP address collection and sharing.</p><p>The default value is `false`.</p> |
| logLevel                    | optional | Adapty logs errors and other crucial information to provide insight into your app's functionality. There are the following available levels:<ul><li> error: Only errors will be logged.</li><li> warn: Errors and messages from the SDK that do not cause critical errors, but are worth paying attention to will be logged.</li><li> info: Errors, warnings, and serious information messages, such as those that log the lifecycle of various modules will be logged.</li><li> verbose: Any additional information that may be useful during debugging, such as function calls, API queries, etc. will be logged.</li></ul> |


:::note

- Note, that StoreKit 2 is available since iOS 15.0. Adapty will implement the legacy logic for older versions.
- Make sure you use the **Public SDK key** for Adapty initialization, the **Secret key** should be used for [server-side API](getting-started-with-server-side-api) only.
- **SDK keys** are unique for every app, so if you have multiple apps make sure you choose the right one.
  :::

Please keep in mind that for paywalls and products to be displayed in your mobile application, and for analytics to work, you need to [display the paywalls](display-pb-paywalls) and, if you're using paywalls not created with the Paywall Builder, [handle the purchase process](making-purchases) within your app.