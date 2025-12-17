---
title: "Present onboardings in iOS SDK"
description: "Discover how to present onboardings on iOS to boost conversions and revenue."
metadataTitle: "Presenting onboardings on iOS | Adapty Docs"
keywords: ['getOnboardingConfiguration']
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import SampleApp from '@site/src/components/reusable/SampleApp.md';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

If you've customized an onboarding using the builder, you don't need to worry about rendering it in your mobile app code to display it to the user. Such an onboarding contains both what should be shown within the onboarding and how it should be shown.

Before you start, ensure that:

1. You have installed [Adapty iOS SDK](sdk-installation-ios.md) 3.8.0 or later.
2. You have [created an onboarding](create-onboarding.md).
3. You have added the onboarding to a [placement](placements.md).

## Present onboardings in Swift

In order to display the visual onboarding on the device screen, do the following:

1. Get the onboarding view configuration using the `.getOnboardingConfiguration` method.
2. Initialize the visual onboarding you want to display by using the  `.onboardingController` method:

   Request parameters:

   | Parameter                    | Presence | Description                                                                                                                                                 |
   |:-----------------------------|:---------|:------------------------------------------------------------------------------------------------------------------------------------------------------------|
   | **onboarding configuration** | required | An `AdaptyUI.OnboardingConfiguration` object containing all the onboarding properties. Use the `AdaptyUI.getOnboardingConfiguration` method to obtain it. |
   | **delegate**                 | required | An `AdaptyOnboardingControllerDelegate` to listen to onboarding events.                                                                                     |

   Returns:

   | Object                         | Description                                             |
   |:-------------------------------|:--------------------------------------------------------|
   | **AdaptyOnboardingController** | An object, representing the requested onboarding screen |

3. After the object has been successfully created, you can display it on the screen of the device:

   ```swift showLineNumbers title="Swift"
   import Adapty
   import AdaptyUI
   
   // 0. Get an onboarding if you haven't done it yet     
   let onboarding = try await Adapty.getOnboarding(placementId: "YOUR_PLACEMENT_ID")
   
   // 1. Obtain the onboarding view configuration:
   let configuration = try AdaptyUI.getOnboardingConfiguration(forOnboarding: onboarding)

   // 2. Create Onboarding View Controller
   let onboardingController = try AdaptyUI.onboardingController(
       with: configuration,
       delegate: <AdaptyOnboardingControllerDelegate>
   ) 

   // 3. Present it to the user
   present(onboardingController, animated: true)
   ```

## Present onboardings in SwiftUI

To display the visual onboarding on the device screen in SwiftUI:

```swift showLineNumbers title="SwiftUI"
// 1. Obtain the onboarding view configuration:
let configuration = try AdaptyUI.getOnboardingConfiguration(forOnboarding: onboarding)

// 2. Display the Onboarding View within your view hierarchy
AdaptyOnboardingView(
    configuration: configuration,
    placeholder: { Text("Your Placeholder View") },
    onCloseAction: { action in
        // hide the onboarding view
    },
    onError: { error in
         // handle the error
    }
)
```

## Add smooth transitions between the splash screen and onboarding

By default, between the splash screen and onboarding, you will see the loading screen until the onboarding is fully loaded. However, if you want to make the transition smoother, you can customize it and either extend the splash screen or display something else.

To do this, define a placeholder (what exactly will be shown while the onboarding is being loaded). If you define a placeholder, the onboarding will be loaded in the background and automatically displayed once ready.

<Tabs>
<TabItem value="swift" label="UIKit">
```swift showLineNumbers
import Adapty
import AdaptyUI

extension YourOnboardingManagerClass: AdaptyOnboardingControllerDelegate {
   func onboardingsControllerLoadingPlaceholder(
      _ controller: AdaptyOnboardingController
      ) -> UIView? {
         // instantiate and return the UIView which will be presented while onboarding is being loaded
   }
}
```
</TabItem>

<TabItem value="swiftui" label="SwiftUI">
```swift showLineNumbers
AdaptyOnboardingView(
    configuration: configuration,
    placeholder: { 
        // define your placeholder view, which will be presented while onboarding is being loaded
    },
    // the rest of the implementation
)
```
</TabItem>

</Tabs>

## Customize how links open in onboardings

:::important
Opening links in onboardings in an in-app browser is supported starting from Adapty SDK v. 3.15.1.
:::

By default, links in onboardings open in an in-app browser. This provides a seamless user experience by displaying web pages within your application, allowing users to view them without switching apps.

If you prefer to open links in an external browser instead, you can customize this behavior by setting the `externalUrlsPresentation` parameter to `.externalBrowser`:

<Tabs>
<TabItem value="swift" label="UIKit">

```swift showLineNumbers
import Adapty
import AdaptyUI

let configuration = try AdaptyUI.getOnboardingConfiguration(
    forOnboarding: onboarding,
    externalUrlsPresentation: .externalBrowser // default – .inAppBrowser
)
```
</TabItem>

<TabItem value="swiftui" label="SwiftUI">

```swift showLineNumbers
import Adapty
import AdaptyUI

let configuration = try AdaptyUI.getOnboardingConfiguration(
    forOnboarding: onboarding,
    externalUrlsPresentation: .externalBrowser // default – .inAppBrowser
)
```
</TabItem>
</Tabs>