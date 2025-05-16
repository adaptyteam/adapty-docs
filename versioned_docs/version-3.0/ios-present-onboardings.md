---
title: "iOS - Present onboardings"
description: "Discover how to present onboardings on iOS to boost conversions and revenue."
metadataTitle: "Presenting onboardings on iOS | Adapty Docs"
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import SampleApp from '@site/src/components/reusable/SampleApp.md';

If you've customized an onboarding using the builder, you don't need to worry about rendering it in your mobile app code to display it to the user. Such an onboarding contains both what should be shown within the onboarding and how it should be shown.

## Present onboardings in Swift

In order to display the visual onboarding on the device screen, do the following:

1. Initialize the visual onboarding you want to display by using the  `.onboardingController` method:

     ```swift showLineNumbers title="Swift"
     import Adapty
     import AdaptyUI
        
     let visualOnboarding = AdaptyUI.onboardingController(
         with: <onboarding configuration object>,
         delegate: <AdaptyOnboardingControllerDelegate>
     )
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
   present(visualOnboarding, animated: true)
   ```

## Present onboardings in SwiftUI

In order to display the visual onboarding on the device screen, use the `.onboarding` modifier in SwiftUI:

```swift showLineNumbers title="SwiftUI"
@State var onboardingPresented = false

var body: some View {
  Text("Hello, AdaptyUI!")
      .onboarding(
          isPresented: $onboardingPresented,
          onboardingConfiguration: <AdaptyUI.Onboarding.ViewConfiguration>,
          didPerformAction: { action in
              switch action {
                  case .close:
                      onboardingPresented = false
                  default:
                      // Handle other actions
                      break
              }
          },
          didFinishPurchase: { product, profile in paywallPresented = false },
          didFailPurchase: { product, error in /* handle the error */ },
          didFinishRestore: { profile in /* check access level and dismiss */  },
          didFailRestore: { error in /* handle the error */ },
          didFailRendering: { error in paywallPresented = false }
      )
}
```


