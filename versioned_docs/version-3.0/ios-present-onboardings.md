---
title: "Present onboardings"
description: "Discover how to present onboardings on iOS to boost conversions and revenue."
metadataTitle: "Presenting onboardings on iOS | Adapty Docs"
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import SampleApp from '@site/src/components/reusable/SampleApp.md';

If you've customized an onboarding using the builder, you don't need to worry about rendering it in your mobile app code to display it to the user. Such an onboarding contains both what should be shown within the onboarding and how it should be shown.

Before you start, ensure that:

1. You have installed [Adapty iOS SDK](installation-of-adapty-sdks.md) 3.8.0 or later.
2. You have [created an onboarding](create-onboarding.md).
3. You have added the onboarding to a [placement](placements.md).

## Present onboardings in Swift

In order to display the visual onboarding on the device screen, do the following:

1. Initialize the visual onboarding you want to display by using the  `.onboardingController` method:

     ```swift showLineNumbers title="Swift"
     import Adapty
     import AdaptyUI
        
     let visualOnboarding = AdaptyUI.onboardingViewController(onboarding)
        visualOnboarding.delegate = self
     ```

   Request parameters:

   | Parameter                    | Presence | Description                                                                                                                        |
   |:-----------------------------|:---------|:-----------------------------------------------------------------------------------------------------------------------------------|
   | **onboarding configuration** | required | An `AdaptyOnboarding` object containing all the onboarding properties. Use the [`AdaptyUI.getOnboarding`](get-onboardings) method. |
   | **delegate**                 | required | An `AdaptyOnboardingControllerDelegate` to listen to onboarding events.                                                            |

   Returns:

   | Object                         | Description                                             |
   |:-------------------------------|:--------------------------------------------------------|
   | **AdaptyOnboardingController** | An object, representing the requested onboarding screen |

2. After the object has been successfully created, you can display it on the screen of the device:

   ```swift showLineNumbers title="Swift"
   import Adapty
   import AdaptyUI
        
   let onboarding = try await Adapty.getOnboarding("YOUR_PLACEMENT_ID")
   let visualOnboarding = AdaptyUI.onboardingViewController(onboarding)
   visualOnboarding.delegate = self
   present(visualOnboarding, animated: true)
   ```

## Present onboardings in SwiftUI

To display the visual onboarding on the device screen in SwiftUI:

```swift showLineNumbers title="SwiftUI"
@State private var showOnboarding = false
@State private var onboardingConfig: AdaptyUI.OnboardingConfiguration?

var body: some View {
    SomeView()
        .onAppear {
            Task {
                onboardingConfig = AdaptyUI.getOnboardingConfiguration(forOnboarding: onboarding)
                showOnboarding = true
            }
        }
        .fullScreenCover(isPresented: $showOnboarding) {
            if let config = onboardingConfig {
                AdaptyUI.createOnboardingController(
                    configuration: config,
                    delegate: OnboardingDelegateImpl(onCloseAction: { _ in showOnboarding = false })
                )
            }
        }
}
```

## Add smooth transitions between the splash screen and onboarding

By default, between the splash screen and onboarding, you will see the loading screen until the onboarding is fully loaded. However, if you want to make the transition smoother, you can customize it and either extend the splash screen or display something else.

To do this, instead of a regular onboarding controller, create a splash controller that will show the splash screen, load the onboarding in the background and then display it.

```swift showLineNumbers
import Adapty
import AdaptyUI

// Create splash controller instead of regular onboarding controller
let splashController = AdaptyUI.createSplashController(
    configuration: AdaptyUI.getOnboardingConfiguration(forOnboarding: onboarding),
    delegate: self,
    placeholderDelegate: self
)
present(splashController, animated: true)

// Required delegate methods
extension YourViewController: AdaptyOnboardingControllerDelegate, AdaptyOnboardingPlaceholderDelegate {
    func onboardingsControllerPlaceholderController() -> UIViewController? {
        return SplashViewController() // Your splash screen
    }

 func onboardingController(_ controller: AdaptyOnboardingController, onCloseAction action: AdaptyOnboardingsCloseAction) {
        dismiss(animated: true)
    }
}
```