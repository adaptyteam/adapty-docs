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

In order to display the visual paywall on the device screen, you must first configure it. To do this, use the method `.paywallController(for:products:introductoryOffersEligibilities:viewConfiguration:delegate:)`:

```swift title="Swift"
import Adapty
import AdaptyUI

do {
	let visualPaywall = try AdaptyUI.paywallController(
			for: <paywall object>,
			products: <paywall products array>,
			introductoryOffersEligibilities: <intro offers eligibilities dictionary>,
			viewConfiguration: <LocalizedViewConfiguration>,
			delegate: <AdaptyPaywallControllerDelegate>
	)
} catch {
	// handle the error
}
```

Request parameters:

| Parameter                           | Presence | Description                                                                                                                                                                                                                                                                                                           |
| :---------------------------------- | :------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Paywall**                         | required | An `AdaptyPaywall` object to obtain a controller for the desired paywall.                                                                                                                                                                                                                                             |
| **Products**                        | optional | Provide an array of `AdaptyPaywallProducts` to optimize the display timing of products on the screen. If `nil` is passed, AdaptyUI will automatically fetch the necessary products.                                                                                                                                   |
| **IntroductoryOffersEligibilities** | optional | Provide the dictionary of offers eligibilities to optimize the display timing of offers eligibilities on the screen. If `nil` is passed, AdaptyUI will automatically fetch the necessary offers eligibilities.                                                                                                        |
| **ViewConfiguration**               | required | An `AdaptyUI.LocalizedViewConfiguration` object containing visual details of the paywall. Use the `AdaptyUI.getViewConfiguration(paywall:locale:)` method.  Refer to [Fetch Paywall Builder paywalls and their configuration](get-pb-paywalls) topic for more details.                                            |
| **Delegate**                        | required | An `AdaptyPaywallControllerDelegate` to listen to paywall events. Refer to [Handling paywall events](ios-handling-events) topic for more details.                                                                                                                                                                 |
| **TagResolver**                     | optional | Define a dictionary of custom tags and their resolved values. Custom tags serve as placeholders in the paywall content, dynamically replaced with specific strings for personalized content within the paywall. Refer to [Custom tags in paywall builder](custom-tags-in-paywall-builder) topic for more details. |
| **TimerResolver**                   | optional | Pass the resolver here if you are going to use custom timer functionality.                                                                                                                                                                                                                                            |

Returns:

| Object                  | Description                                          |
| :---------------------- | :--------------------------------------------------- |
| AdaptyPaywallController | An object, representing the requested paywall screen |

After the object has been successfully created, you can display it on the screen of the device: 

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
          paywall: <paywall object>,
          viewConfiguration: <LocalizedViewConfiguration>,
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

Request parameters:

| Parameter                           | Presence | Description                                                                                                                                                                                                                                                                                                            |
| :---------------------------------- | :------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Paywall**                         | required | An `AdaptyPaywall` object to obtain a controller for the desired paywall.                                                                                                                                                                                                                                              |
| **Product**                         | optional | Provide an array of `AdaptyPaywallProducts` to optimize the display timing of products on the screen. If `nil` is passed, AdaptyUI will automatically fetch the necessary products.                                                                                                                                    |
| **IntroductoryOffersEligibilities** | optional | Provide the dictionary of offers eligibilities to optimize the display timing of offers eligibilities on the screen. If `nil` is passed, AdaptyUI will automatically fetch the necessary offers eligibilities.                                                                                                         |
| **Configuration**                   | required | An `AdaptyUI.LocalizedViewConfiguration` object containing visual details of the paywall. Use the `AdaptyUI.getViewConfiguration(paywall:locale:)` method.  Refer to [Fetch Paywall Builder paywalls and their configuration](get-pb-paywalls) topic for more details.                                             |
| **TagResolver**                     | optional | Define a dictionary of custom tags and their resolved values. Custom tags serve as placeholders in the paywall content, dynamically replaced with specific strings for personalized content within the paywall. Refer to [Custom tags in paywall builder](custom-tags-in-paywall-builder)  topic for more details. |
| **TimerResolver**                   | optional | Pass the resolver here if you are going to use custom timer functionality.                                                                                                                                                                                                                                             |

Closure parameters:

| Closure parameter     | Description                                                                       |
| :-------------------- | :-------------------------------------------------------------------------------- |
| **didFinishPurchase** | If Adapty.makePurchase() succeeds, this callback will be invoked.                 |
| **didFailPurchase**   | If Adapty.makePurchase() fails, this callback will be invoked.                    |
| **didFinishRestore**  | If Adapty.restorePurchases() succeeds, this callback will be invoked.             |
| **didFailRestore**    | If Adapty.restorePurchases() fails, this callback will be invoked.                |
| **didFailRendering**  | If an error occurs during the interface rendering, this callback will be invoked. |

Refer to the [iOS - Handling events](ios-handling-events) topic for other closure parameters. 

