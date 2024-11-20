---
title: "Migration guide to Adapty SDK v.3.x or later"
description: ""
metadataTitle: ""
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem'; 

Adapty SDK v.3.0 brings support for the new exciting [Adapty Paywall Builder](adapty-paywall-builder), the new version of the no-code user-friendly tool to create paywalls. With its maximum flexibility and rich design capabilities, your paywalls will become most effective and profitable.

## Upgrade process includes

1. Upgrading to Adapty SDK v3.x (instructions differ for platforms).
2. Migrating your existing paywalls to the new Paywall Builder.

## Upgrading to Adapty SDK v3.x

<Tabs> 

<TabItem value="iOS" label="For iOS" default> 

:::info

Please note that the AdaptyUI library is deprecated and is now included as part of AdaptySDK.

:::

### Reinstall Adapty SDK v3.x via Swift Package Manager

1. Delete AdaptyUI SDK package dependency from your project, you won't need it anymore.
2. Even though you have it already, you'll need to re-add the Adapty SDK dependency. For this, in Xcode, open **File** ->  **Add Package Dependency...**. Please note the way to add package dependencies can differ in XCode versions. Refer to XCode documentation if necessary.
3. Enter the repository URL `https://github.com/adaptyteam/AdaptySDK-iOS.git`
4. Choose the version, and click the **Add package** button. 
5. Choose the modules you need:
   1. **Adapty** is the mandatory module
   2. **AdaptyUI** is an optional module you need if you plan to use the [Adapty Paywall Builder](adapty-paywall-builder).
6. Xcode will add the package dependency to your project, and you can import it. For this, in the **Choose Package Products** window, click the **Add package** button once again. The package will appear in the **Packages** list.

### Reinstall Adapty SDK v3.x via CocoaPods

1. Add Adapty to your `Podfile`. Choose the modules you need:
   1. **Adapty** is the mandatory module.
   2. **AdaptyUI** is an optional module you need if you plan to use the [Adapty Paywall Builder](adapty-paywall-builder).


2. ```shell title="Podfile"
   pod 'Adapty', '~> 3.0.1'
   pod 'AdaptyUI', '~> 3.0.1' # optional module needed only for Paywall Builder
   ```

3. Run:

   ```sh title="Shell"
   pod install
   ```

This creates a `.xcworkspace` file for your app. Use this file for all future development of your application.

Activate Adapty and AdaptyUI SDK modules. Before v3.0, you did not activate AdaptyUI, remember to **add AdaptyUI activation**. Parameters are not changes, so keep them as is. 

<Tabs>
<TabItem value="Swift" label="Swift" default>

```swift 
// In your AppDelegate class:
import Adapty
import AdaptyUI // Only if you are going to use AdaptyUI

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

// Only if you are going to use AdaptyUI
AdaptyUI.activate()
```

</TabItem>
<TabItem value="kotlin" label="SwiftUI" default>

```swift title="" showLineNumbers
import Adapty
import AdaptyUI // Only if you are going to use AdaptyUI

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
              
            // Only if you are going to use AdaptyUI
                AdaptyUI.activate()
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

</TabItem> 

<TabItem value="Android" label="For Android" default> 

Adapty SDKs are delivered as a BoM (Bill of Materials), ensuring that the Adapty SDK and AdaptyUI SDK versions in your app remain consistent.

To migrate to v3.0, update your code as follows:

<Tabs>
  <TabItem value="module-level build.gradle" label="module-level build.gradle" default>

```diff 
dependencies {
    ...
-   implementation 'io.adapty:android-sdk:2.11.5'
-   implementation 'io.adapty:android-ui:2.11.3'
+   implementation platform('io.adapty:adapty-bom:3.0.2')
+   implementation 'io.adapty:android-sdk'
+   implementation 'io.adapty:android-ui'
}
```

</TabItem>
<TabItem value="module-level build.gradle.kts" label="module-level build.gradle.kts" default>

```diff
dependencies {
    ...
-   implementation("io.adapty:android-sdk:2.11.5")
-   implementation("io.adapty:android-ui:2.11.3")
+   implementation(platform("io.adapty:adapty-bom:3.0.2"))
+   implementation("io.adapty:android-sdk")
+   implementation("io.adapty:android-ui")
}
```

</TabItem>
<TabItem value="version catalog" label="version catalog" default>

```diff
//libs.versions.toml

[versions]
..
- adapty = "2.11.5"
- adaptyUi = "2.11.3"
+ adaptyBom = "3.0.2"

[libraries]
..
- adapty = { group = "io.adapty", name = "android-sdk", version.ref = "adapty" }
- adapty-ui = { group = "io.adapty", name = "android-ui", version.ref = "adaptyUi" }
+ adapty-bom = { module = "io.adapty:adapty-bom", version.ref = "adaptyBom" }
+ adapty = { module = "io.adapty:android-sdk" }
+ adapty-ui = { module = "io.adapty:android-ui" }


//module-level build.gradle.kts

dependencies {
    ...
+   implementation(libs.adapty.bom)    
    implementation(libs.adapty)
    implementation(libs.adapty.ui)
}
```

</TabItem>
</Tabs>

 </TabItem> 

<TabItem value="Flutter" label="For Flutter" default> 

:::info

Please note that the AdaptyUI library is deprecated and is now included as part of AdaptySDK.

:::

## Remove AdaptyUI SDK

1. AdaptyUI becomes a module in SAdapty SDK, so please remove `adapty_ui_flutter` from your  `pubspec.yaml` file:

   ```diff
   dependencies:
   adapty_flutter: ^3.2.0
   - adapty_ui_flutter: ^2.1.3
   ```

2. Run:

   ```bash title="Bash"
   flutter pub get
   ```

3. Remove import of SDKs form your application:

   ```diff
   - import 'package:adapty_flutter/adapty_flutter.dart';
   - import 'package:adapty_ui_flutter/adapty_ui_flutter.dart';
   ```

   

## Configure Adapty SDKs

Previously you created a Adapty-Info.plist file and added it to your project and then Adapty SDK configuration used theis file.

Now you do not nee to create additional files. Instead provide all required parameters during activation

You only need to configure the Adapty SDK once, typically early in your app's lifecycle.

### Activate Adapty module of Adapty SDK

1. Import Adapty SDKs in your application in the following way:

   ```dart title="Dart"
   import 'package:adapty_flutter/adapty_flutter.dart';
   ```

2. Activate Adapty SDK with the following code:

   ```diff
   try {
   -	Adapty().activate();  
   +    await Adapty().activate(
   +        configuration: AdaptyConfiguration(apiKey: 'YOUR_API_KEY')
   +         ..withLogLevel(AdaptyLogLevel.debug)
   +         ..withObserverMode(false)
   +         ..withCustomerUserId(null)
   +         ..withIpAddressCollectionDisabled(false)
   +         ..withIdfaCollectionDisabled(false),
   +   );
   } catch (e) {
       // handle the error
   }
   ```

Parameters:

| Parameter                           | Presence | Description                                                  |
| ----------------------------------- | -------- | ------------------------------------------------------------ |
| **PUBLIC_SDK_KEY**                  | required | The key you can find in the **Public SDK key** field of your app settings in Adapty: [**App settings**-> **General** tab -> **API keys** subsection](https://app.adapty.io/settings/general) |
| **withLogLevel**                    | optional | Adapty logs errors and other crucial information to provide insight into your app's functionality. There are the following available levels:<ul><li> error: Only errors will be logged.</li><li> warn: Errors and messages from the SDK that do not cause critical errors, but are worth paying attention to will be logged.</li><li> info: Errors, warnings, and serious information messages, such as those that log the lifecycle of various modules will be logged.</li><li> verbose: Any additional information that may be useful during debugging, such as function calls, API queries, etc. will be logged.</li></ul> |
| **withObserverMode**                | optional | <p>A boolean value controlling [Observer mode](observer-vs-full-mode). Turn it on if you handle purchases and subscription status yourself and use Adapty for sending subscription events and analytics.</p><p>The default value is `false`.</p><p></p><p>🚧 When running in Observer mode, Adapty SDK won't close any transactions, so make sure you're handling it.</p> |
| **withCustomerUserId**              | optional | An identifier of the user in your system. We send it in subscription and analytical events, to attribute events to the right profile. You can also find customers by `customerUserId` in the [**Profiles and Segments**](https://app.adapty.io/profiles/users) menu. |
| **withIdfaCollectionDisabled**      | optional | <p>Set to `true` to disable IDFA collection and sharing.</p><p>the user IP address sharing.</p><p>The default value is `false`.</p><p>For more details on IDFA collection, refer to the [Analytics integration](analytics-integration#disable-collection-of-idfa)   section.</p> |
| **withIpAddressCollectionDisabled** | optional | <p>Set to `true` to disable user IP address collection and sharing.</p><p>The default value is `false`.</p> |

### Activate AdaptyUI module of Adapty SDK

You need to configure the AdaptyUI module only if you plan to use [Paywall Builder](display-pb-paywalls) and have [installed AdaptyUI module](sdk-installation-ios#install-sdks-via-cocoapods):

```dart title="Dart"
try {
    final mediaCache = AdaptyUIMediaCacheConfiguration(
        memoryStorageTotalCostLimit: 100 * 1024 * 1024, // 100MB
        memoryStorageCountLimit: 2147483647, // 2^31 - 1, max int value in Dart
        diskStorageSizeLimit: 100 * 1024 * 1024, // 100MB
    );

    await AdaptyUI().activate(
        configuration: AdaptyUIConfiguration(mediaCache: mediaCache),
        observer: <AdaptyUIObserver Implementation>,
    );
} catch (e) {
    // handle the error
}
```

Please note that AdaptyUI configuration is optional, you can activate AdaptyUI module without its config. However, if you use the config, all parameters are required in it.

Parameters:

| Parameter                       | Presence | Description                                                  |
| :------------------------------ | :------- | :----------------------------------------------------------- |
| **memoryStorageTotalCostLimit** | required | Total cost limit of the storage in bytes.                    |
| **memoryStorageCountLimit**     | required | The item count limit of the memory storage.                  |
| **diskStorageSizeLimit**        | required | The file size limit on disk of the storage in bytes. 0 means no limit. |

</TabItem>

</Tabs>

## Migrate your paywalls to new Paywall Builder

Starting with Adapty SDK v3.x, legacy Paywall Builder paywalls are no longer supported. [Migrate your existing legacy Paywall Builder paywalls](migration-to-new-paywall-builder) to the new Paywall Builder, one at a time. During this migration, Adapty will create a new version of each paywall that is compatible with the updated Paywall Builder. The old version, compatible with the legacy Paywall Builder, will remain unchanged, so users with app versions using Adapty SDK v2.x or earlier will still see their paywalls as before.

Paywalls designed without using a Paywall Builder are not affected.