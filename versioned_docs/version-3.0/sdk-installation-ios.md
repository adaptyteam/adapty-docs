---
title: "Install & configure iOS SDK"
description: "Step-by-step guide on installing Adapty SDK on iOS for subscription-based apps."
metadataTitle: "Installing Adapty SDK on iOS | Adapty Docs"
keywords: ['install sdk', 'sdk install', 'install sdk ios', 'adaptyui']
rank: 100
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

:::tip
Want to see a real-world example of how Adapty SDK is integrated into a mobile app? Check out our [sample apps](https://github.com/adaptyteam/AdaptySDK-iOS/tree/master/Examples), which demonstrate the full setup, including displaying paywalls, making purchases, and other basic functionality.
:::

For a complete implementation walkthrough, you can also see the videos:

<Tabs groupId="current-os" queryString>
<TabItem value="swiftui" label="iOS (SwiftUI)" default> 

<div style={{ textAlign: 'center' }}>
<iframe width="560" height="315" src="https://www.youtube.com/embed/cSChHc8k2zA?si=KhNFhqXccIzYwTcm" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
</div>
</TabItem>
<TabItem value="uikit" label="iOS (UIKit)" default> 

<div style={{ textAlign: 'center' }}>
<iframe width="560" height="315" src="https://www.youtube.com/embed/WEUnlaAjSI0?si=sjXKVVb56tEHDKzJ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
</div>
</TabItem>
</Tabs>

## Requirements

While the SDK technically supports iOS 13.0+ for the core module, iOS 15.0+ is effectively required for practical use since:
- All StoreKit 2 features require iOS 15.0+
- AdaptyUI module is iOS 15.0+ only

## Install Adapty SDK

[![Release](https://img.shields.io/github/v/release/adaptyteam/AdaptySDK-iOS.svg?style=flat&logo=apple)](https://github.com/adaptyteam/AdaptySDK-iOS/releases)

<Tabs>
<TabItem value="spm" label="Swift Package Manager (recommended)" default>
In Xcode, go to **File** -> **Add Package Dependency...**. Note that the steps to add package dependencies may vary between Xcode versions, so refer to Xcode documentation if needed.

1. Enter the repository URL: 
   ```
   https://github.com/adaptyteam/AdaptySDK-iOS.git
   ```
2. Select the version (latest stable version is recommended) and click **Add Package**.
3. In the **Choose Package Products** window, select the modules you need:
   - **Adapty** (core module)
   - **AdaptyUI** (optional - only if you plan to use Paywall Builder)
   :::note
   Note:
     - To enable the [Kids mode](kids-mode.md), select **Adapty_KidsMode** instead of **Adapty**.
     - Don't select any other packages from the list – you won't need them. 
   :::
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
   pod 'Adapty'
   pod 'AdaptyUI'  # optional module needed only for Paywall Builder
   ```

2. Run:

   ```sh showLineNumbers title="Shell"
   pod install
   ```

This will create a `.xcworkspace` file for your app. Use this file for all future development.
</TabItem>
</Tabs>

## Activate Adapty module of Adapty SDK

Activate the Adapty SDK in your app code.

:::note
The Adapty SDK only needs to be activated once in your app.
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
  
   Adapty.logLevel = .verbose // recommended for development and the first production release
    
    let config = configurationBuilder.build()
    
    // Activate Adapty SDK asynchronously
    Task {
      do {
        try await Adapty.activate(with: config)
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
// In your AppDelegate class:
// If you only use an AppDelegate, place the following code in the
// application(_:didFinishLaunchingWithOptions:) method.

// If you use a SceneDelegate, place the following code in the
// scene(_:willConnectTo:options:) method.

import Adapty

Task {
  do {
    let configurationBuilder = AdaptyConfiguration
      .builder(withAPIKey: "YOUR_PUBLIC_SDK_KEY") // Get from Adapty dashboard
      .with(logLevel: .verbose) // recommended for development and the first production release
    
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

<GetKey />

## Activate AdaptyUI module of Adapty SDK

If you plan to use [Paywall Builder](adapty-paywall-builder.md) and have [installed AdaptyUI module](sdk-installation-ios#install-sdks-via-cocoapods), you also need to activate AdaptyUI.

:::important
In your code, you must activate the core Adapty module before activating AdaptyUI.
:::

<Tabs groupId="current-os" queryString>
<TabItem value="swiftui" label="SwiftUI">

```swift showLineNumbers title="Swift"
import SwiftUI
import Adapty
import AdaptyUI

@main
struct YourApp: App {
  init() {
    // ...ConfigurationBuilder steps
    
    // Activate Adapty SDK asynchronously
    Task {
      do {
        try await Adapty.activate(with: config)
        try await AdaptyUI.activate()
      } catch {
        // Handle error appropriately for your app
        print("Adapty activation failed: ", error)
      }
    }
    
    // main body...
  }
}
```
</TabItem>
<TabItem value="uikit" label="UIKit" default>

```swift showLineNumbers title="UIKit"
// If you only use an AppDelegate, place the following code in the
// application(_:didFinishLaunchingWithOptions:) method.

// If you use a SceneDelegate, place the following code in the
// scene(_:willConnectTo:options:) method.

import Adapty
import AdaptyUI

Task {
   do {
      let configurationBuilder = AdaptyConfiguration
         .builder(withAPIKey: "YOUR_PUBLIC_SDK_KEY") // Get from Adapty dashboard
         .with(logLevel: .verbose) // recommended for development

   let config = configurationBuilder.build()
   try await Adapty.activate(with: config)
   try await AdaptyUI.activate()
      } catch {
      // Handle error appropriately for your app
      print("Adapty activation failed: ", error)
   }
}
```
</TabItem>
</Tabs>

:::tip
Optionally, when activating AdaptyUI, you can [override default caching settings for paywalls](#set-up-media-cache-configuration-for-adaptyui).
:::

## Optional setup

### Logging 

#### Set up the logging system

Adapty logs errors and other important information to help you understand what is going on. There are the following levels available:

| Level      | Description                                                  |
| ---------- | ------------------------------------------------------------ |
| `error`    | Only errors will be logged                                    |
| `warn`     | Errors and messages from the SDK that do not cause critical errors, but are worth paying attention to will be logged |
| `info`     | Errors, warnings, and various information messages will be logged |
| `verbose`  | Any additional information that may be useful during debugging, such as function calls, API queries, etc. will be logged |

```swift showLineNumbers
 let configurationBuilder = AdaptyConfiguration
         .builder(withAPIKey: "YOUR_PUBLIC_SDK_KEY") 
         .with(logLevel: .verbose) // recommended for development
```

#### Redirect the logging system messages

If you need to send Adapty's log messages to your system or save them to a file, use the `setLogHandler` method and implement your custom logging logic inside it. This handler receives log records containing message content and severity level.

```swift showLineNumbers title="Swift"
Adapty.setLogHandler { record in
    writeToLocalFile("Adapty \(record.level): \(record.message)")
}
```

### Data policies

Adapty doesn't store personal data of your users unless you explicitly send it, but you can implement additional data security policies to comply with the store or country guidelines.

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

#### Media cache configuration for paywalls in AdaptyUI

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

### Transaction finishing behavior

:::info
This feature is available starting from SDK version 3.12.0.
:::

By default, Adapty automatically finishes transactions after successful validation. However, if you need advanced transaction validation (such as server-side receipt validation, fraud detection, or custom business logic), you can configure the SDK to use manual transaction finishing.

```swift showLineNumbers title="Swift"
let configurationBuilder = AdaptyConfiguration
    .builder(withAPIKey: "YOUR_PUBLIC_SDK_KEY")
    .with(transactionsFinishBehavior: .manual) // .auto is the default
```

See more details on how to finish transactions in the [guide](ios-transaction-management).

### Clear data on backup restore

When `clearDataOnBackup` is set to `true`, the SDK detects when the app is restored from an iCloud backup and deletes all locally stored SDK data, including cached profile information, product details, and paywalls. The SDK then initializes with a clean state. Default value is `false`.

:::note
Only local SDK cache is deleted. Transaction history with Apple and user data on Adapty servers remain unchanged.
:::

```swift showLineNumbers
let configurationBuilder = AdaptyConfiguration
    .builder(withAPIKey: "YOUR_PUBLIC_SDK_KEY")
    .with(clearDataOnBackup: true) // default – false
```