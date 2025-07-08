---
title: "Migrate Adapty iOS SDK to v. 3.0"
description: "Migrate to Adapty iOS SDK v3.0 for better performance and new monetization features."
metadataTitle: "Migrating to Adapty iOS SDK v3.0 | Adapty Docs"
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem'; 

Adapty SDK v.3.0 brings support for the new exciting [Adapty Paywall Builder](adapty-paywall-builder), the new version of the no-code user-friendly tool to create paywalls. With its maximum flexibility and rich design capabilities, your paywalls will become most effective and profitable.

:::info

Please note that the AdaptyUI library is deprecated and is now included as part of AdaptySDK.

:::

## Reinstall Adapty SDK v3.x via Swift Package Manager

1. Delete AdaptyUI SDK package dependency from your project, you won't need it anymore.
2. Even though you have it already, you'll need to re-add the Adapty SDK dependency. For this, in Xcode, open **File** ->  **Add Package Dependency...**. Please note the way to add package dependencies can differ in XCode versions. Refer to XCode documentation if necessary.
3. Enter the repository URL `https://github.com/adaptyteam/AdaptySDK-iOS.git`
4. Choose the version, and click the **Add package** button. 
5. Choose the modules you need:
   1. **Adapty** is the mandatory module
   2. **AdaptyUI** is an optional module you need if you plan to use the [Adapty Paywall Builder](adapty-paywall-builder).
6. Xcode will add the package dependency to your project, and you can import it. For this, in the **Choose Package Products** window, click the **Add package** button once again. The package will appear in the **Packages** list.

## Reinstall Adapty SDK v3.x via CocoaPods

1. Add Adapty to your `Podfile`. Choose the modules you need:
   1. **Adapty** is the mandatory module.
   2. **AdaptyUI** is an optional module you need if you plan to use the [Adapty Paywall Builder](adapty-paywall-builder).

2. ```shell showLineNumbers title="Podfile"
   pod 'Adapty', '~> 3.2.0'
   pod 'AdaptyUI', '~> 3.2.0' # optional module needed only for Paywall Builder
   ```

3. Run:

   ```sh showLineNumbers title="Shell"
   pod install
   ```

This creates a `.xcworkspace` file for your app. Use this file for all future development of your application.

Activate Adapty and AdaptyUI SDK modules. Before v3.0, you did not activate AdaptyUI, remember to **add AdaptyUI activation**. Parameters are not changes, so keep them as is. 

<Tabs groupId="current-os" queryString>
<TabItem value="swift" label="Swift" default>

```swift showLineNumbers
// In your AppDelegate class:
import Adapty
import AdaptyUI // Only if you are going to use AdaptyUI

let configurationBuilder =
    AdaptyConfiguration
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
<TabItem value="swiftui" label="SwiftUI" default>

```swift title="" showLineNumbers
import Adapty
import AdaptyUI // Only if you are going to use AdaptyUI

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