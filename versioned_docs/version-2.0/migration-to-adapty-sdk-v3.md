---
title: "Migration guide to Adapty SDK v.3.x or later"
description: ""
metadataTitle: ""
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem'; 

Adapty SDK v.3.0 brings support for the new exciting [Adapty Paywall Builder](/docs/adapty-paywall-builder), the new version of the no-code user-friendly tool to create paywalls. With its maximum flexibility and rich design capabilities, your paywalls will become most effective and profitable.

## Upgrade process includes

1. Upgrading to Adapty SDK v3.x (instructions differ for iOS and Android).
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
   2. **AdaptyUI** is an optional module you need if you plan to use the [Adapty Paywall Builder](/docs/adapty-paywall-builder).
6. Xcode will add the package dependency to your project, and you can import it. For this, in the **Choose Package Products** window, click the **Add package** button once again. The package will appear in the **Packages** list.

### Reinstall Adapty SDK v3.x via CocoaPods

1. Add Adapty to your `Podfile`. Choose the modules you need:
   1. **Adapty** is the mandatory module.
   2. **AdaptyUI** is an optional module you need if you plan to use the [Adapty Paywall Builder](/docs/adapty-paywall-builder).


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
+   implementation platform('io.adapty:adapty-bom:3.0.1')
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
+   implementation(platform("io.adapty:adapty-bom:3.0.1"))
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
+ adaptyBom = "3.0.1"

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

</Tabs>

## Migrate your paywalls to new Paywall Builder

Starting with Adapty SDK v3.x, legacy Paywall Builder paywalls are no longer supported. [Migrate your existing legacy Paywall Builder paywalls](migration-to-new-paywall-builder) to the new Paywall Builder, one at a time. During this migration, Adapty will create a new version of each paywall that is compatible with the updated Paywall Builder. The old version, compatible with the legacy Paywall Builder, will remain unchanged, so users with app versions using Adapty SDK v2.x or earlier will still see their paywalls as before.

Paywalls designed without using a Paywall Builder are not affected.