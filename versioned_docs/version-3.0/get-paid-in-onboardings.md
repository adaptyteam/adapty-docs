---
title: "Get paid in onboardings"
metadataTitle: "Get paid in onboardings in Adapty | Adapty Docs"
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

You can set up a seamless transition from onboardings to paywalls, so that onboardings not only improve the user experience and retention but also generate revenue for you.

Before you start, create a [paywall](paywalls.md) and [onboarding](onboardings.md). 

## Step 1. Set up a button

1. In the onboarding builder, create a button that will redirect users to the paywall. Select **Open paywall** as its action.
   <Zoom>
   <img src={require('./img/get-paid-in-onboardings1.png').default}
   style={{
   border: '1px solid #727272', /* border width and color */
   width: '700px', /* image width */
   display: 'block', /* for alignment */
   margin: '0 auto' /* center alignment */
   }}
   />
   </Zoom>
2. Go to the Adapty dashboard and find the paywall's placement ID. In the builder, paste the paywall placement ID in the ID field.

 <Zoom>
   <img src={require('./img/get-paid-in-onboardings2.png').default}
   style={{
   border: '1px solid #727272', /* border width and color */
   width: '700px', /* image width */
   display: 'block', /* for alignment */
   margin: '0 auto' /* center alignment */
   }}
   />
   </Zoom>
  

## Step 2. Handle an SDK action
   
Now, when you have this button, each time your users tap it, it will generate an action containing the action ID. In this context, action ID is the placement ID.

To handle this action in your app code, use the placement ID to [get the paywall](fetch-paywalls-and-products.md) and then [display it](display-pb-paywalls.md).

```swift showLineNumbers
func onboardingController(_ controller: AdaptyOnboardingController, onPaywallAction action: AdaptyOnboardingsOpenPaywallAction) {
    Task {
        do {
            // Get the paywall using the placement ID from the action
            let paywall = try await Adapty.getPaywall(placementId: action.actionId)
            
            // Get the paywall configuration
            let paywallConfig = try await AdaptyUI.getPaywallConfiguration(
                forPaywall: paywall
            )
            
            // Create and present the paywall controller
            let paywallController = try AdaptyUI.paywallController(
                with: paywallConfig,
                delegate: self
            )
            
            // Present the paywall
            controller.present(paywallController, animated: true)
        } catch {
            // Handle any errors that occur during paywall loading
            print("Failed to present paywall: \(error)")
        }
    }
}
```