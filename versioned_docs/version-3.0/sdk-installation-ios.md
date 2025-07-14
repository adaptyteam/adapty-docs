---
title: "iOS - Adapty SDK installation & configuration"
description: "Step-by-step guide on installing Adapty SDK on iOS for subscription-based apps."
metadataTitle: "Installing Adapty SDK on iOS | Adapty Docs"
keywords: ['install sdk', 'sdk install', 'install sdk ios']
rank: 80
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import SampleApp from '@site/src/components/reusable/SampleApp.md';
import GetKey from '@site/src/components/reusable/GetKey.md';

Adapty SDK includes two key modules for seamless integration into your mobile app:

- **Core Adapty**: This essential SDK is required for Adapty to function properly in your app.
- **AdaptyUI**: This optional module is needed if you use the [Adapty Paywall Builder](adapty-paywall-builder), a user-friendly, no-code tool for easily creating cross-platform paywalls. 


:::info
If you’re using an older version of Adapty SDK and want to upgrade to version 3.x, we recommend following our [Migration guide to Adapty SDK v.3.x or later](migration-to-adapty-sdk-v3).
:::

## Requirements

- **iOS 13.0+** 
- **Swift 5.9+**
- **Xcode 15.0+** (recommended – to support Swift 5.9+ and iOS 15.0+ deployment targets)

:::note
While the SDK technically supports iOS 13.0+ for the core module, iOS 15.0+ is effectively required for practical use since:
- All StoreKit 2 features require iOS 15.0+
- AdaptyUI module is iOS 15.0+ only
:::

## Install Adapty SDK

<Tabs>
<TabItem value="spm" label="Swift Package Manager (recommended)" default>
In Xcode, go to **File** -> **Add Package Dependency...**. Note that the steps to add package dependencies may vary between Xcode versions, so refer to Xcode documentation if needed.

1. Enter the repository URL: 
   ```
   https://github.com/adaptyteam/AdaptySDK-iOS.git
   ```
2. Select the version (latest stable version is recommended) and click **Add Package**.
3. In the **Choose Package Products** window, select the modules you need:
   - **Adapty** (mandatory - always select this)
   - **AdaptyUI** (optional - only if you plan to use Paywall Builder)
4. Click **Add Package** to complete the installation.
5. **Verify installation:** In your project navigator, you should see "Adapty" (and "AdaptyUI" if selected) under **Package Dependencies**.

</TabItem>
   
<TabItem value="cocoapods" label="CocoaPods (legacy)" default>

:::info

CocoaPods is now in maintenance mode, with development officially stopped. We recommend switching to [Swift Package Manager](sdk-installation-ios#install-adapty-sdk-via-swift-package-manager).

:::

1. Add Adapty to your `Podfile`. Choose the modules you need:

    1. **Adapty** is the mandatory module.
    2. **AdaptyUI** is an optional module you need if you plan to use the [Adapty Paywall Builder](adapty-paywall-builder).

   ```shell showLineNumbers title="Podfile"
   pod 'Adapty', '~> 3.8.0'
   pod 'AdaptyUI', '~> 3.8.0' # optional module needed only for Paywall Builder
   ```

2. Run:

   ```sh showLineNumbers title="Shell"
   pod install
   ```

This will create a `.xcworkspace` file for your app. Use this file for all future development.
</TabItem>
</Tabs>

## Activate Adapty module of Adapty SDK

<Tabs groupId="current-os" queryString>
<TabItem value="swiftui" label="SwiftUI">

```swift showLineNumbers
import SwiftUI
import Adapty

@main
struct YourApp: App {
    @StateObject private var eventData = EventData()
    
    init() {
        // Configure Adapty SDK
        let configurationBuilder = AdaptyConfiguration
            .builder(withAPIKey: "YOUR_SDK_KEY") // Get from Adapty dashboard
            .with(observerMode: false) // optional

        // Set log level – it is optional but recommended
        Adapty.logLevel = .verbose

        // Activate Adapty SDK asynchronously
        Task {
            do {
                try await Adapty.activate(with: configurationBuilder.build())
            } catch {
                // Handle error appropriately for your app
            }
        }

    var body: some Scene {
        WindowGroup {
            // Your content view
        }
    }
}
```
Parameters:

| Parameter                   | Presence | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| --------------------------- | -------- |------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| apiKey                      | required | The key you can find in the **Public SDK key** field of your app settings in Adapty: [**App settings**-> **General** tab -> **API keys** subsection](https://app.adapty.io/settings/general)                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| observerMode                | optional | <p>A boolean value controlling [Observer mode](observer-vs-full-mode). Turn it on if you handle purchases and subscription status yourself and use Adapty for sending subscription events and analytics.</p><p>The default value is `false`.</p>                                                                                                                                                                                                                                              |
| customerUserId              | optional | An identifier of the user in your system. We recommend passing this parameter if it is known before you call `Adapty.activate`. <br/> We send it in subscription and analytical events to attribute events to the right profile. You can also find customers by `customerUserId` in the [**Profiles and Segments**](https://app.adapty.io/profiles/users) menu.                                                                                                                                                                                                                                                              |

Adapty logs errors and other crucial information to provide insight into your app's functionality. There are the following available levels:
- `error`: Only errors will be logged. 
- `warn`: Errors and messages from the SDK that do not cause critical errors, but are worth paying attention to will be logged.
- `info`: Errors, warnings, and serious information messages, such as those that log the lifecycle of various modules will be logged.
- `verbose`: Any additional information that may be useful during debugging, such as function calls, API queries, etc. will be logged.

</TabItem>
<TabItem value="swift" label="UIKit" default>

```swift showLineNumbers
// In your AppDelegate class:
import Adapty

let configurationBuilder = AdaptyConfiguration
    .builder(withAPIKey: "YOUR_PUBLIC_SDK_KEY") // Get from Adapty dashboard
    .with(observerMode: false)
    .with(logLevel: .verbose) // Recommended for development

Adapty.activate(with: configurationBuilder.build()) { error in
    if let error = error {
        // Handle error appropriately for your app
    }
}
```
Parameters:

| Parameter      | Presence | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
|----------------| -------- |-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| apiKey         | required | The key you can find in the **Public SDK key** field of your app settings in Adapty: [**App settings**-> **General** tab -> **API keys** subsection](https://app.adapty.io/settings/general)                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| observerMode   | optional | <p>A boolean value controlling [Observer mode](observer-vs-full-mode). Turn it on if you handle purchases and subscription status yourself and use Adapty for sending subscription events and analytics.</p><p>The default value is `false`.</p><p></p><p>🚧 When running in Observer mode, Adapty SDK won't close any transactions, so make sure you're handling it.</p>                                                                                                                                                                                                                                                     |
| customerUserId | optional | An identifier of the user in your system. We recommend passing this parameter if it is known before you call `Adapty.activate`. <br/> We send it in subscription and analytical events, to attribute events to the right profile. You can also find customers by `customerUserId` in the [**Profiles and Segments**](https://app.adapty.io/profiles/users) menu.                                                                                                                                                                                                                                                              |
| loglevel       | optional | Adapty logs errors and other crucial information to provide insight into your app's functionality. There are the following available levels:<ul><li> error: Only errors will be logged.</li><li> warn: Errors and messages from the SDK that do not cause critical errors, but are worth paying attention to will be logged.</li><li> info: Errors, warnings, and serious information messages, such as those that log the lifecycle of various modules will be logged.</li><li> verbose: Any additional information that may be useful during debugging, such as function calls, API queries, etc. will be logged.</li></ul> |


</TabItem>
</Tabs>


Remember that for paywalls and products to display in your app, and for analytics to function, you need to [display the paywalls](display-pb-paywalls) and, if you're not using the Paywall Builder, [handle the purchase process](making-purchases) within your app.

<SampleApp />

### Get the SDK key

<GetKey />

## Activate AdaptyUI module of Adapty SDK

If you plan to use [Paywall Builder](display-pb-paywalls) and have [installed AdaptyUI module](sdk-installation-ios#install-sdks-via-cocoapods), you also need to activate AdaptyUI.

:::important
In your code, you must activate the core Adapty module before activating AdaptyUI.
:::

```swift showLineNumbers title="Swift"
import AdaptyUI 

AdaptyUI.activate()
```

:::tip
Optionally, when activating AdaptyUI, you can [override default caching settings for paywalls](#set-up-media-cache-configuration-for-adaptyui).
:::

## Optional setup

#### Disable IDFA collection and sharing

When activating the Adapty module, set `idfaCollectionDisabled` to `true` to disable IDFA collection and sharing.

Use this parameter to comply with App Store Review Guidelines or avoid triggering the App Tracking Transparency prompt when IDFA isn't needed for your app. The default value is `false`. For more details on IDFA collection, refer to the [Analytics integration](analytics-integration#disable-collection-of-advertising-identifiers)   section.

```swift showLineNumbers
let configurationBuilder =
    AdaptyConfiguration
        .builder(withAPIKey: "YOUR_PUBLIC_SDK_KEY")
        .with(idfaCollectionDisabled: true)
```

#### Disable IP collection and sharing

When activating the Adapty module, set `ipAddressCollectionDisabled` to `true` to disable user IP address collection and sharing. The default value is `false`

Use this parameter to enhance user privacy, comply with regional data protection regulations (like GDPR or CCPA), or reduce unnecessary data collection when IP-based features aren't required for your app.


```swift showLineNumbers
let configurationBuilder =
    AdaptyConfiguration
        .builder(withAPIKey: "YOUR_PUBLIC_SDK_KEY")
        .with(ipAddressCollectionDisabled: true)
```

#### Set up media cache configuration for AdaptyUI

Please note that the AdaptyUI configuration is optional. You can activate the AdaptyUI module without its config. However, if you use the config, all parameters are required.

```swift showLineNumbers title="Swift"
import AdaptyUI 

// Configure AdaptyUI
        let adaptyUIConfiguration = AdaptyUI.Configuration(
            mediaCacheConfiguration: .init(
                memoryStorageTotalCostLimit: 100 * 1024 * 1024,
                memoryStorageCountLimit: .max,
                diskStorageSizeLimit: 100 * 1024 * 1024
            )
        )

        // Activate AdaptyUI
        AdaptyUI.activate(configuration: adaptyUIConfiguration)
```
Parameters:

| Parameter                   | Presence | Description                                                  |
| :-------------------------- | :------- | :----------------------------------------------------------- |
| memoryStorageTotalCostLimit | required | Total cost limit of the storage in bytes.                    |
| memoryStorageCountLimit     | required | The item count limit of the memory storage.                  |
| diskStorageSizeLimit        | required | The file size limit on disk of the storage in bytes. 0 means no limit. |

#### Redirect the logging system messages

If you need to send Adapty's log messages to your system or save them to a file, use the `setLogHandler` method and implement your custom logging logic inside it. This handler receives log records containing message content and severity level.

```swift showLineNumbers title="Swift"
Adapty.setLogHandler { record in
    writeToLocalFile("Adapty \(record.level): \(record.message)")
}
```