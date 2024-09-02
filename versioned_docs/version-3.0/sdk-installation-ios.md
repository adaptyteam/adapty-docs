---
title: "iOS - Adapty SDK installation & configuration"
description: "Discover step-by-step instructions for installing and configuring Adapty SDK and AdaptyUI SDK on iOS, enabling seamless integration of Adapty into your mobile app. Find the correct pair of SDKs with the compatibility table provided."
metadataTitle: "iOS - Adapty SDK Installation and Configuration Guide"
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem'; 

Adapty SDK includes two key modules for seamless integration into your mobile app:

- **Core Adapty**: This essential SDK is required for Adapty to function properly in your app.
- **AdaptyUI**: This optional module is needed if you use the Adapty Paywall Builder, a user-friendly, no-code tool for easily creating cross-platform paywalls. These paywalls are built with a visual constructor right in our dashboard, run natively on the device, and require minimal effort to create high-performing designs.

:::info
If you’re using an older version of Adapty SDK and want to upgrade to version 3.x, we recommend following our [Migration guide to Adapty SDK v.3.x or later](migration-to-adapty-sdk-v3).
:::

You can install Adapty SDK via CocoaPods or Swift Package Manager.

:::danger
Review the release checklist before launching your app

Before releasing your application, make sure to thoroughly review the  [Release Checklist](release-checklist). This checklist ensures that you've completed all necessary steps and provides criteria for evaluating the success of your integration.
:::

## Install Adapty SDK via Swift Package Manager

In Xcode, go to **File** -> **Add Package Dependency...**. Note that the steps to add package dependencies may vary between Xcode versions, so refer to Xcode documentation if needed.

1. Enter the repository URL: [https://github.com/adaptyteam/AdaptySDK-iOS.git(https://github.com/adaptyteam/AdaptySDK-iOS.git).
2. Select the version and click Add Package.
3. Choose the modules you need:
   1. **Adapty** is the mandatory module.
   2. **AdaptyUI** is optional and needed if you plan to use the Adapty Paywall Builder.
4. Xcode will add the package dependency to your project. To import it, in the **Choose Package Products** window, click the **Add package** button once again. The package will then appear in the **Packages** list.

## Install SDKs via CocoaPods

1. Add Adapty to your `Podfile`. Choose the modules you need:

   1. **Adapty** is the mandatory module.
   2. **AdaptyUI** is an optional module you need if you plan to use the [Adapty Paywall Builder](adapty-paywall-builder).

   ```shell title="Podfile"
   pod 'Adapty', '~> 3.0.3'
   pod 'AdaptyUI', '~> 3.0.3' # optional module needed only for Paywall Builder
   ```

2. Run:

   ```sh title="Shell"
   pod install
   ```

This will create a `.xcworkspace` file for your app. Use this file for all future development.

## Configure Adapty SDK

You only need to configure the Adapty SDK once, typically early in your app's lifecycle. 

### Activate Adapty module of Adapty SDK

<Tabs>
<TabItem value="Swift" label="Swift" default>
```swift title="Swift"
// In your AppDelegate class:
import Adapty

let configurationBuilder =
    Adapty.Configuration
        .Builder(withAPIKey: "PUBLIC_SDK_KEY")
        .with(observerMode: false)
        .with(customerUserId: "YOUR_USER_ID")
        .with(idfaCollectionDisabled: false)
        .with(ipAddressCollectionDisabled: false)

Adapty.activate(with: configurationBuilder) { error in
  // handle the error
}
```
</TabItem>
<TabItem value="SwiftUI" label="SwiftUI" default>
```swift 
import Adapty

@main
struct SampleApp: App {
    init() 
      let configurationBuilder =
        Adapty.Configuration
          .Builder(withAPIKey: "PUBLIC_SDK_KEY")
          .with(observerMode: false) // optional
          .with(customerUserId: "YOUR_USER_ID") // optional
          .with(idfaCollectionDisabled: false) // optional
          .with(ipAddressCollectionDisabled: false) // optional

        Adapty.activate(with: configurationBuilder) { error in
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

| Parameter | Presence | Description |
|---------|--------|-----------|
| **PUBLIC_SDK_KEY** | required | The key you can find in the **Public SDK key** field of your app settings in Adapty: [**App settings**-> **General** tab -> **API keys** subsection](https://app.adapty.io/settings/general) |
| **observerMode** | optional | <p>A boolean value controlling [Observer mode](observer-vs-full-mode). Turn it on if you handle purchases and subscription status yourself and use Adapty for sending subscription events and analytics.</p><p>The default value is `false`.</p><p></p><p>🚧 When running in Observer mode, Adapty SDK won't close any transactions, so make sure you're handling it.</p> |
| **customerUserId** | optional | An identifier of the user in your system. We send it in subscription and analytical events, to attribute events to the right profile. You can also find customers by `customerUserId` in the [**Profiles and Segments**](https://app.adapty.io/profiles/users) menu. |
| **idfaCollectionDisabled** | optional | <p>Set to `true` to disable IDFA collection and sharing.</p><p>the user IP address sharing.</p><p>The default value is `false`.</p><p>For more details on IDFA collection, refer to the [Analytics integration](analytics-integration#ios)   section.</p> |
| **ipAddressCollectionDisabled** | optional | <p>Set to `true` to disable user IP address collection and sharing.</p><p>The default value is `false`.</p> |


:::note
- Note, that StoreKit 2 is available since iOS 15.0. Adapty will implement the legacy logic for older versions.
- Make sure you use the **Public SDK key** for Adapty initialization, the **Secret key** should be used for [server-side API](getting-started-with-server-side-api) only.
- **SDK keys** are unique for every app, so if you have multiple apps make sure you choose the right one.
:::

Remember that for paywalls and products to display in your app, and for analytics to function, you need to [display the paywalls](display-pb-paywalls) and, if you're not using the Paywall Builder, [handle the purchase process](making-purchases) within your app.

### Activate AdaptyUI module of Adapty SDK

You need to configure the AdaptyUI module only if you plan to use [Paywall Builder](display-pb-paywalls) and have [installed AdaptyUI module](sdk-installation-ios#install-sdks-via-cocoapods):

```swift title="Swift"
import AdaptyUI // Only if you are going to use AdaptyUI

// After calling Adapty.activate()
        let adaptyUIConfiguration = AdaptyUI.Configuration(
            mediaCacheConfiguration: .init(
                memoryStorageTotalCostLimit: 100 * 1024 * 1024,
                memoryStorageCountLimit: .max,
                diskStorageSizeLimit: 100 * 1024 * 1024
            )
        )
        AdaptyUI.activate(
            configuration: adaptyUIConfiguration
        )
```

Please note that AdaptyUI configuration is optional, you can activate AdaptyUI module without its config. However, if you use the config, all parameters are required in it.

Parameters:

| Parameter                   | Presence | Description                                                            |
| :-------------------------- | :------- | :--------------------------------------------------------------------- |
| memoryStorageTotalCostLimit | required | Total cost limit of the storage in bytes.                              |
| memoryStorageCountLimit     | required | The item count limit of the memory storage.                            |
| diskStorageSizeLimit        | required | The file size limit on disk of the storage in bytes. 0 means no limit. |

## Set up the logging system

Adapty logs errors and other crucial information to provide insight into your app's functionality. Available levels:

| Level   | Description                                                                                            |
| :------ | :----------------------------------------------------------------------------------------------------- |
| error   | Only errors will be logged.                                                                            |
| warn    | Logs errors and non-critical messages that warrant attention.                                          |
| info    | Logs errors, warnings, and significant informational messages, such as module lifecycle events.        |
| verbose | Logs detailed information that may be useful during debugging, such as function calls and API queries. |

You can set `logLevel` at any time, but it's recommended to do so before configuring Adapty.

```swift title="Swift"
Adapty.logLevel = .verbose
```

## Redirect the logging system messages

If you need to send Adapty's log messages to your system or save them to a file, you can override the default behavior:

```swift title="Swift"
Adapty.setLogHandler { level, message in
    writeToLocalFile("Adapty \(level): \(message)")
}
```