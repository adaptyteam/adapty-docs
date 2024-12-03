---
title: "iOS - Present new Paywall Builder paywalls"
description: ""
metadataTitle: ""
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

If you've customized a paywall using the Paywall Builder, you don't need to worry about rendering it in your mobile app code to display it to the user. Such a paywall contains both what should be shown within the paywall and how it should be shown.

:::warning

This guide is for **new Paywall Builder paywalls** only which require SDK v3.0 or later. The process for presenting paywalls differs for paywalls designed with different versions of Paywall Builde, remote config paywalls, and [Observer mode](observer-vs-full-mode).

- For presenting **Legacy Paywall Builder paywalls**, check out [iOS - Present legacy Paywall Builder paywalls](ios-present-paywalls-legacy).
- For presenting **Remote config paywalls**, see [Render paywall designed by remote config](present-remote-config-paywalls).
- For presenting **Observer mode paywalls**, see [iOS - Present Paywall Builder paywalls in Observer mode](ios-present-paywall-builder-paywalls-in-observer-mode)

:::

## Present paywalls in Swift

In order to display the visual paywall on the device screen, do the following:

1. Initialize the visual paywall you want to display by using the  `.paywallController(for:products:viewConfiguration:delegate:)` method:

   ```swift title="Swift"
   import Adapty
   import AdaptyUI
   
   let visualPaywall = AdaptyUI.paywallController(
       with: <paywall configuration object>,
       delegate: <AdaptyPaywallControllerDelegate>
   )
   ```

    Request parameters:

    | Parameter                | Presence | Description |
    | :----------------------- | :------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
    | **Paywall Configuration**              | required | An `AdaptyUI.PaywallConfiguration` object containing visual details of the paywall. Use the `AdaptyUI.getPaywallConfiguration(forPaywall:locale:)` method.  Refer to [Fetch Paywall Builder paywalls and their configuration](get-pb-paywalls) topic for more details.                                                                                                                                                                                                                                             |
    | **Delegate**             | required | An `AdaptyPaywallControllerDelegate` to listen to paywall events. Refer to [Handling paywall events](ios-handling-events) topic for more details.                                                                                                                                                                 |


   Returns:

    | Object                  | Description                                          |
    | :---------------------- | :--------------------------------------------------- |
    | **AdaptyPaywallController** | An object, representing the requested paywall screen |

2. After the object has been successfully created, you can display it on the screen of the device: 

    ```swift title="Swift"
    present(visualPaywall, animated: true)
    ```

## Present paywalls in SwiftUI

In order to display the visual paywall on the device screen, use the `.paywall` modifier in SwiftUI:

```swift title="SwiftUI"
@State var paywallPresented = false

var body: some View {
	Text("Hello, AdaptyUI!")
			.paywall(
          isPresented: $paywallPresented,
          paywallConfiguration: <AdaptyUI.PaywallConfiguration>,
          didPerformAction: { action in
              switch action {
                  case .close:
                      paywallPresented = false
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

Parameters:

| Parameter          | Presentce | Description                                                  |
| :------------------------- | --------- | :----------------------------------------------------------- |
| **isPresented**            | required  | Binding that controls the paywall screen presentation.       |
| **fullScreen**             | optional  | Controls if the paywall occupies 100% or is shown as a modal screen. True by default |
| **paywallConfiguration**             | required | An `AdaptyUI.PaywallConfiguration` object containing visual details of the paywall. Use the `AdaptyUI.getPaywallConfiguration(forPaywall:locale:)` method.  Refer to [Fetch Paywall Builder paywalls and their configuration](get-pb-paywalls) topic for more details.|
| **didPerformAction**       | optional  | If the user performs an action (close paywall, click button or URL), this action is invoked. |
| **didSelectProduct**       | optional  | If the product was selected for purchase (by a user or by the system), this callback will be invoked. |
| **didStartPurchase**       | optional  | If the user initiates the purchase process, this callback will be invoked. |
| **didFinishPurchase**      | optional  | If `Adapty.makePurchase()` succeeds, this callback will be invoked. |
| **didFailPurchase**        | required  | If `Adapty.makePurchase()` fails, this callback will be invoked. |
| **didFinishRestore**       | required  | If `Adapty.restorePurchases()` succeeds, this callback will be invoked. |
| **didFailRestore**         | required  | If `Adapty.restorePurchases()` fails, this callback will be invoked. |
| **didStartRestore**        | optional  | If user initiates the restore process, this method will be invoked. |
| **didFailRendering**       | required  | If an error occurs during the interface rendering, this callback will be invoked. |
| **didFailLoadingProducts** | optional  | This method is invoked in case of errors during the products loading process. Return `true` if you want to retry the loading. |
| **showAlertItem**          | optional  | Binding that controls alert items showing above the paywall. |
| **showAlertBuilder**       | optional  | Function that renders the alert view.                        |

Refer to the [iOS - Handling events](ios-handling-events) topic for more details on parameters. 
