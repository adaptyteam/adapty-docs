---
title: "iOS - Present Paywall Builder paywalls in Observer mode"
description: ""
metadataTitle: ""
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import Details from '@site/src/components/Details';

If you've customized a paywall using the Paywall Builder, you don't need to worry about rendering it in your mobile app code to display it to the user. Such a paywall contains both what should be shown within the paywall and how it should be shown.

:::note
This section refers to [Observer mode](observer-vs-full-mode) only. If you do not work in Observer mode, refer to the [iOS - Present Paywall Builder paywalls](ios-present-paywalls).
:::

<details>
   <summary>Before you start presenting paywalls (Click to Expand)</summary>

   1. Set up initial integration of Adapty [with the Google Play](initial-android) and [with the App Store](initial_ios). 
2. Install and configure Adapty SDK. Make sure to set the `observerMode` parameter to `true`. Refer to our framework-specific instructions [for iOS](sdk-installation-ios#configure-adapty-sdk), [for Android](sdk-installation-android), [for Flutter](/2.0/sdk-installation-flutter#configure-adapty-sdks-for-ios), [for React Native](/2.0/sdk-installation-reactnative#configure-adapty-sdks), and [for Unity](/2.0/sdk-installation-unity#initiate-adapty-unity-plugin-on-ios).
3. [Create products](create-product) in the Adapty Dashboard.
4. [Configure paywalls, assign products to them](create-paywall), and customize them using Paywall Builder in the Adapty Dashboard.
5. [Create placements and assign your paywalls to them](create-placement) in the Adapty Dashboard.
6. [Fetch Paywall Builder paywalls and their configuration](get-pb-paywalls) in your mobile app code.
</details>

## Present Paywall Builder paywalls in Swift

1. Implement the `AdaptyObserverModeResolver` object:

   ```swift title="Swift"
   func observerMode(didInitiatePurchase product: AdaptyPaywallProduct,
                     onStartPurchase: @escaping () -> Void,
                     onFinishPurchase: @escaping () -> Void) {
          // use the product object to handle the purchase
          // use the onStartPurchase and onFinishPurchase callbacks to notify AdaptyUI about the process of the purchase
   }
   ```

   The `observerMode(didInitiatePurchase:onStartPurchase:onFinishPurchase:)` event will inform you that the user has initiated a purchase. You can trigger your custom purchase flow in response to this callback.

   Also, remember to invoke the following callbacks to notify AdaptyUI about the process of the purchase. This is necessary for proper paywall behavior, such as showing the loader, among other things:

   | Callback           | Description                                                                      |
   | :----------------- | :------------------------------------------------------------------------------- |
   | onStartPurchase()  | The callback should be invoked to notify AdaptyUI that the purchase is started.  |
   | onFinishPurchase() | The callback should be invoked to notify AdaptyUI that the purchase is finished. |

2. Initialize the visual paywall you want to display by using the  `.paywallController(for:products:viewConfiguration:delegate:)` method:

   ```swift title="Swift"
   import Adapty
   import AdaptyUI
   
   let visualPaywall = AdaptyUI.paywallController(
       for: <paywall object>,
       products: <paywall products array>,
       viewConfiguration: <LocalizedViewConfiguration>,
       delegate: <AdaptyPaywallControllerDelegate>
       observerModeResolver: <AdaptyObserverModeResolver>
   )
   ```

Request parameters:

| Parameter                | Presence | Description                                                                                                                                                                                                                                                                                                           |
| :----------------------- | :------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Paywall**              | required | An `AdaptyPaywall` object to obtain a controller for the desired paywall.                                                                                                                                                                                                                                             |
| **Products**             | optional | Provide an array of `AdaptyPaywallProducts` to optimize the display timing of products on the screen. If `nil` is passed, AdaptyUI will automatically fetch the necessary products.                                                                                                                                   |
| **ViewConfiguration**    | required | An `AdaptyUI.LocalizedViewConfiguration` object containing visual details of the paywall. Use the `AdaptyUI.getViewConfiguration(paywall:locale:)` method.  Refer to [Fetch Paywall Builder paywalls and their configuration](get-pb-paywalls) topic for more details.                                            |
| **Delegate**             | required | An `AdaptyPaywallControllerDelegate` to listen to paywall events. Refer to [Handling paywall events](ios-handling-events) topic for more details.                                                                                                                                                                 |
| **ObserverModeResolver** | required | The  `AdaptyObserverModeResolver` object you've implemented in the previous step                                                                                                                                                                                                                                      |
| **TagResolver**          | optional | Define a dictionary of custom tags and their resolved values. Custom tags serve as placeholders in the paywall content, dynamically replaced with specific strings for personalized content within the paywall. Refer to [Custom tags in paywall builder](custom-tags-in-paywall-builder) topic for more details. |

Returns:

| Object                  | Description                                          |
| :---------------------- | :--------------------------------------------------- |
| AdaptyPaywallController | An object, representing the requested paywall screen |

After the object has been successfully created, you can display it like so: 

```swift title="Swift"
present(visualPaywall, animated: true)
```

:::warning
Don't forget to [Associate paywalls to purchase transactions](associate-paywalls-to-transactions). Otherwise, Adapty will not determine the source paywall of the purchase.
:::

## Present Paywall Builder paywalls in SwiftUI

In order to display the visual paywall on the device screen, use the `.paywall` modifier in SwiftUI:

```swift title="SwiftUI"
@State var paywallPresented = false

var body: some View {
	Text("Hello, AdaptyUI!")
			.paywall(
          isPresented: $paywallPresented,
          paywall: <paywall object>,
          configuration: <LocalizedViewConfiguration>,
          observerModeResolver: <AdaptyObserverModeResolver>,
          didPerformAction: { action in
              switch action {
                  case .close:
                      paywallPresented = false
                  default:
                      // Handle other actions
                      break
              }
          },
          didFinishRestore: { profile in /* check access level and dismiss */  },
          didFailRestore: { error in /* handle the error */ },
          didFailRendering: { error in paywallPresented = false }
      )
}
```

Request parameters:

| Parameter                | Presence | Description                                                                                                                                                                                                                                                                                                            |
| :----------------------- | :------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Paywall**              | required | An `AdaptyPaywall` object to obtain a controller for the desired paywall.                                                                                                                                                                                                                                              |
| **Product**              | optional | Provide an array of `AdaptyPaywallProducts` to optimize the display timing of products on the screen. If `nil` is passed, AdaptyUI will automatically fetch the necessary products.                                                                                                                                    |
| **Configuration**        | required | An `AdaptyUI.LocalizedViewConfiguration` object containing visual details of the paywall. Use the `AdaptyUI.getViewConfiguration(paywall:locale:)` method.  Refer to [Fetch Paywall Builder paywalls and their configuration](get-pb-paywalls) topic for more details.                                             |
| **TagResolver**          | optional | Define a dictionary of custom tags and their resolved values. Custom tags serve as placeholders in the paywall content, dynamically replaced with specific strings for personalized content within the paywall. Refer to [Custom tags in paywall builder](custom-tags-in-paywall-builder)  topic for more details. |
| **ObserverModeResolver** | optional | The `AdaptyObserverModeResolver` object you've implemented in the previous step                                                                                                                                                                                                                                        |

Closure parameters:

| Closure parameter    | Description                                                                       |
| :------------------- | :-------------------------------------------------------------------------------- |
| **didFinishRestore** | If Adapty.restorePurchases() succeeds, this callback will be invoked.             |
| **didFailRestore**   | If Adapty.restorePurchases() fails, this callback will be invoked.                |
| **didFailRendering** | If an error occurs during the interface rendering, this callback will be invoked. |

Refer to the [iOS - Handling events](ios-handling-events) topic for other closure parameters.

:::warning
Don't forget to [Associate paywalls to purchase transactions](associate-paywalls-to-transactions). Otherwise, Adapty will not determine the source paywall of the purchase.
:::