---
title: "iOS - Present Paywall Builder paywalls in Observer mode"
description: ""
metadataTitle: ""
---

If you've customized a paywall using the Paywall Builder, you don't need to worry about rendering it in your mobile app code to display it to the user. Such a paywall contains both what should be shown within the paywall and how it should be shown.

## Present Paywall Builder paywalls in Swift

1. Implement the `AdaptyObserverModeDelegate` object:

   ```swift
   func paywallController(_ controller: AdaptyPaywallController,
                          didInitiatePurchase product: AdaptyPaywallProduct,
                          onStartPurchase: @escaping () -> Void,
                          onFinishPurchase: @escaping () -> Void) {
          // use the product object to handle the purchase
          // use the onStartPurchase and onFinishPurchase callbacks to notify AdaptyUI about the process of the purchase
   }
   ```

      The `observerModeDidInitiatePurchase` event informs you that the user has initiated a purchase. You can trigger your custom purchase flow in response to this callback. Remember to also invoke the following callbacks to notify AdaptyUI about the process of the purchase:

   | Callback           | Description                                                                      |
   | :----------------- | :------------------------------------------------------------------------------- |
   | onStartPurchase()  | The callback should be invoked to notify AdaptyUI that the purchase is started.  |
   | onFinishPurchase() | The callback should be invoked to notify AdaptyUI that the purchase is finished. |

2. Initialize the visual paywall you want to display by using the  `.paywallController(for:products:viewConfiguration:delegate:)` method:

```swift
import Adapty
import AdaptyUI

let visualPaywall = AdaptyUI.paywallController(
    for: <paywall object>,
    products: <paywall products array>,
    viewConfiguration: <LocalizedViewConfiguration>,
    delegate: <AdaptyPaywallControllerDelegate>
    observerModeDelegate: < AdaptyObserverModeDelegate>
)
```

Request parameters:

| Parameter                | Presence | Description                                                                                                                                                                                                                                                                                                           |
| :----------------------- | :------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Paywall**              | required | An `AdaptyPaywall` object to obtain a controller for the desired paywall.                                                                                                                                                                                                                                             |
| **Products**             | optional | Provide an array of `AdaptyPaywallProducts` to optimize the display timing of products on the screen. If `nil` is passed, AdaptyUI will automatically fetch the necessary products.                                                                                                                                   |
| **ViewConfiguration**    | required | An `AdaptyUI.LocalizedViewConfiguration` object containing visual details of the paywall. Use the `AdaptyUI.getViewConfiguration(paywall:locale:)` method.  Refer to [Fetch Paywall Builder paywalls and their configuration](get-and-show-paywall-builder-paywalls) topic for more details.                      |
| **Delegate**             | required | An `AdaptyPaywallControllerDelegate` to listen to paywall events. Refer to [Handling paywall events](ios-handling-events) topic for more details.                                                                                                                                                                 |
| **ObserverModeDelegate** | required | The  `AdaptyObserverModeDelegate` object you've implemented in the previous step                                                                                                                                                                                                                                      |
| **TagResolver**          | optional | Define a dictionary of custom tags and their resolved values. Custom tags serve as placeholders in the paywall content, dynamically replaced with specific strings for personalized content within the paywall. Refer to [Custom tags in paywall builder](custom-tags-in-paywall-builder) topic for more details. |

Returns:

| Object                  | Description                                          |
| :---------------------- | :--------------------------------------------------- |
| AdaptyPaywallController | An object, representing the requested paywall screen |

After the object has been successfully created, you can display it like so: 

```swift
present(visualPaywall, animated: true)
```

## Present Paywall Builder paywalls in SwiftUI

In order to display the visual paywall on the device screen, use the `.paywall` modifier in SwiftUI:

```swift SwiftUI
@State var paywallPresented = false

var body: some View {
	Text("Hello, AdaptyUI!")
			.paywall(
          isPresented: $paywallPresented,
          paywall: <paywall object>,
          configuration: <LocalizedViewConfiguration>,
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
          observerModeDidInitiatePurchase: { product, onStartPurchase, onFinishPurchase in
              // use the product object to handle the purchase
              // use the onStartPurchase and onFinishPurchase callbacks to notify AdaptyUI about the process of the purchase
          }, 
      )
}
```

Request parameters:

| Parameter         | Presence | Description                                                                                                                                                                                                                                                                                                            |
| :---------------- | :------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Paywall**       | required | An `AdaptyPaywall` object to obtain a controller for the desired paywall.                                                                                                                                                                                                                                              |
| **Product**       | optional | Provide an array of `AdaptyPaywallProducts` to optimize the display timing of products on the screen. If `nil` is passed, AdaptyUI will automatically fetch the necessary products.                                                                                                                                    |
| **Configuration** | required | An `AdaptyUI.LocalizedViewConfiguration` object containing visual details of the paywall. Use the `AdaptyUI.getViewConfiguration(paywall:locale:)` method.  Refer to [Fetch Paywall Builder paywalls and their configuration](get-and-show-paywall-builder-paywalls) topic for more details.                       |
| **TagResolver**   | optional | Define a dictionary of custom tags and their resolved values. Custom tags serve as placeholders in the paywall content, dynamically replaced with specific strings for personalized content within the paywall. Refer to [Custom tags in paywall builder](custom-tags-in-paywall-builder)  topic for more details. |

Closure parameters:

| Closure parameter                   | Description                                                                       |
| :---------------------------------- | :-------------------------------------------------------------------------------- |
| **didFinishRestore**                | If Adapty.restorePurchases() succeeds, this callback will be invoked.             |
| **didFailRestore**                  | If Adapty.restorePurchases() fails, this callback will be invoked.                |
| **didFailRendering**                | If an error occurs during the interface rendering, this callback will be invoked. |
| **observerModeDidInitiatePurchase** | This callback is invoked when a user initiates a purchase.                        |

Refer to the [iOS - Handling events](ios-handling-events) topic for other closure parameters.

## Make purchase

The `observerModeDidInitiatePurchase` event informs you that the user has initiated a purchase. You can trigger your custom purchase flow in response to this callback. Remember to also invoke the following callbacks to notify AdaptyUI about the process of the purchase:

| Callback           | Description                                                                      |
| :----------------- | :------------------------------------------------------------------------------- |
| onStartPurchase()  | The callback should be invoked to notify AdaptyUI that the purchase is started.  |
| onFinishPurchase() | The callback should be invoked to notify AdaptyUI that the purchase is finished. |

:::warning
Don't forget to [Associate paywalls to purchase transactions](associate-paywalls-to-transactions). Otherwise, Adapty will not determine the source paywall of the purchase.
:::