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
   | :----------------------- | :------- | :---------- |
   | **paywall configuration**         | required | An `AdaptyUI.PaywallConfiguration` object containing visual details of the paywall. Use the `AdaptyUI.getPaywallConfiguration(forPaywall:locale:)` method.  Refer to [Fetch Paywall Builder paywalls and their configuration](get-pb-paywalls) topic for more details. |
   | **delegate**            | required | An `AdaptyPaywallControllerDelegate` to listen to paywall events. Refer to [Handling paywall events](ios-handling-events) topic for more details.

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
| **isPresented**            | required  | A binding that manages whether the paywall screen is displayed. |
| **fullScreen**             | optional  | Determines if the paywall appears in full-screen mode or as a modal. Defaults to `true`. |
| **paywallConfiguration**             | required | An `AdaptyUI.PaywallConfiguration` object containing visual details of the paywall. Use the `AdaptyUI.getPaywallConfiguration(forPaywall:locale:)` method.  Refer to [Fetch Paywall Builder paywalls and their configuration](get-pb-paywalls) topic for more details.|
| **didPerformAction**       | optional  | Invoked when a product is selected for purchase by the user or the system. |
| **didSelectProduct**       | optional  | If the product was selected for purchase (by a user or by the system), this callback will be invoked. |
| **didStartPurchase**       | optional  | Invoked when the user begins the purchase process. |
| **didFinishPurchase**      | optional  | Invoked when `Adapty.makePurchase()` completes successfully. |
| **didFailPurchase**        | required  | Invoked when `Adapty.makePurchase()` fails. |
| **didFinishRestore**       | required  | Invoked when `Adapty.restorePurchases()` completes successfully. |
| **didFailRestore**         | required  | Invoked when `Adapty.restorePurchases()` fails. |
| **didStartRestore**        | optional  | Invoked when the user starts the restore process. |
| **didFailRendering**       | required  | Invoked if an error occurs while rendering the interface. In this case, [contact Adapty Support](mailto:support@adapty.io). |
| **didFailLoadingProducts** | optional  | Invoked when errors occur during product loading. Return `true` to retry loading. |
| **showAlertItem**          | optional  | A binding that manages the display of alert items above the paywall. |
| **showAlertBuilder**       | optional  | A function for rendering the alert view. |


Refer to the [iOS - Handling events](ios-handling-events) topic for more details on parameters. 
