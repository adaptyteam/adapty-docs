---
title: "Handle paywall events in iOS SDK"
description: "Handle subscription-related events in iOS using Adapty for better app monetization."
metadataTitle: "Handling Events in iOS | Adapty Docs"
toc_max_heading_level: 4
keywords: ['event', 'AdaptyPaywallControllerDelegate', 'didSelectProduct', 'didStartPurchase', 'shouldContinueWebPaymentNavigation', 'didFinishPurchase', 'didFailPurchase', 'didFailWebPaymentNavigation', 'didFinishRestoreWith', 'didFailRestoreWith', 'didFailLoadingProductsWith',  'didFailRenderingWith']
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import SampleApp from '@site/src/components/reusable/SampleApp.md';
import PaywallAction from '@site/src/components/reusable/PaywallAction.md';
import Details from '@site/src/components/Details';

<PaywallAction />

Paywalls configured with the [Paywall Builder](adapty-paywall-builder) don't need extra code to make and restore purchases. However, they generate some events that your app can respond to. Those events include button presses (close buttons, URLs, product selections, and so on) as well as notifications on purchase-related actions taken on the paywall. Learn how to respond to these events below.

This guide is for **new Paywall Builder paywalls** only which require Adapty SDK v3.0 or later. For presenting paywalls in Adapty SDK v2 designed with legacy Paywall Builder, see [iOS - Handle paywall events designed with legacy Paywall Builder](ios-handling-events-legacy).

<SampleApp />

## Handling events in SwiftUI

To control or monitor processes occurring on the paywall screen within your mobile app, use the `.paywall` modifier in SwiftUI:

```swift showLineNumbers title="Swift"
@State var paywallPresented = false

var body: some View {
	Text("Hello, AdaptyUI!")
			.paywall(
          isPresented: $paywallPresented,
          paywall: paywall,
          viewConfiguration: viewConfig,
          didPerformAction: { action in
              switch action {
                  case .close:
                      paywallPresented = false
                  case let .openURL(url):
                      // handle opening the URL (incl. for terms and privacy)
                  default:
                      // handle other actions
              }
          },
          didSelectProduct: { /* Handle the event */  },
          didStartPurchase: { /* Handle the event */ },
          didFinishPurchase: { product, info in /* Handle the event */ },
          didFailPurchase: { product, error in /* Handle the event */ },
          didStartRestore: { /* Handle the event */ },
          didFinishRestore: { /* Handle the event */ },
          didFailRestore: { /* Handle the event */ },
          didFailRendering: { error in
              paywallPresented = false
          },
          didFailLoadingProducts: { error in
              return false
          }
      )
}
```

You can register only the closure parameters you need, and omit those you do not need. In this case, unused closure parameters will not be created.

| Parameter                         | Required | Description                                                                                                                                                                                                                                                                                                                    |
|:----------------------------------|:---------|:-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **isPresented**                   | required | A binding that manages whether the paywall screen is displayed.                                                                                                                                                                                                                                                                |
| **paywallConfiguration**          | required | An `AdaptyUI.PaywallConfiguration` object containing visual details of the paywall. Use the `AdaptyUI.paywallConfiguration(for:products:viewConfiguration:observerModeResolver:tagResolver:timerResolver:)` method. Refer to [Fetch Paywall Builder paywalls and their configuration](get-pb-paywalls) topic for more details. |
| **didFailPurchase**               | required | Invoked when `Adapty.makePurchase()` fails.                                                                                                                                                                                                                                                                                    |
| **didFinishRestore**              | required | Invoked when `Adapty.restorePurchases()` completes successfully.                                                                                                                                                                                                                                                               |
| **didFailRestore**                | required | Invoked when `Adapty.restorePurchases()` fails.                                                                                                                                                                                                                                                                                |
| **didFailRendering**              | required | Invoked if an error occurs while rendering the interface. In this case, [contact Adapty Support](mailto:support@adapty.io).                                                                                                                                                                                                    |
| **fullScreen**                    | optional | Determines if the paywall appears in full-screen mode or as a modal. Defaults to `true`.                                                                                                                                                                                                                                       |
| **didAppear**                     | optional | Invoked when the paywall view was presented.                                                                                                                                                                                                                                                                                   |
| **didDisappear**                  | optional | Invoked when the paywall view was dismissed.                                                                                                                                                                                                                                                                                   |
| **didPerformAction**              | optional | Invoked when a user clicks a button. Different buttons have different action IDs. Two action IDs are pre-defined: `close` and `openURL`, while others are custom and can be set in the builder.                                                                                                                                |
| **didSelectProduct**              | optional | If the product was selected for purchase (by a user or by the system), this callback will be invoked.                                                                                                                                                                                                                          |
| **didStartPurchase**              | optional | Invoked when the user begins the purchase process.                                                                                                                                                                                                                                                                             |
| **didFinishPurchase**             | optional | Invoked when `Adapty.makePurchase()` completes successfully.                                                                                                                                                                                                                                                                   |
| **didFinishWebPaymentNavigation** | optional | Invoked when web payment navigation finishes.                                                                                                                                                                                                                                                                                  |
| **didStartRestore**               | optional | Invoked when the user starts the restore process.                                                                                                                                                                                                                                                                              |
| **didFailLoadingProducts**        | optional | Invoked when errors occur during product loading. Return `true` to retry loading.                                                                                                                                                                                                                                              |
| **didPartiallyLoadProducts**      | optional | Invoked when products are partially loaded.                                                                                                                                                                                                                                                                                    |
| **showAlertItem**                 | optional | A binding that manages the display of alert items above the paywall.                                                                                                                                                                                                                                                           |
| **showAlertBuilder**              | optional | A function for rendering the alert view.                                                                                                                                                                                                                                                                                       |
| **placeholderBuilder**            | optional | A function for rendering the placeholder view while the paywall is loading.                                                                                                                                                                                                                                                    |


## Handling events in UIKit

To control or monitor processes occurring on the paywall screen within your mobile app, implement the `AdaptyPaywallControllerDelegate` methods.

### User-generated events

#### Product selection

If a user selects a product for purchase, this method will be invoked:

```swift showLineNumbers title="Swift"
    func paywallController(
        _ controller: AdaptyPaywallController,
        didSelectProduct product: AdaptyPaywallProductWithoutDeterminingOffer
    ) { }
```

#### Started purchase

If a user initiates the purchase process, this method will be invoked:

```swift showLineNumbers title="Swift"
func paywallController(_ controller: AdaptyPaywallController,
                       didStartPurchase product: AdaptyPaywallProduct) {
}
```

It will not be invoked in Observer mode. Refer to the [iOS - Present Paywall Builder paywalls in Observer mode](ios-present-paywall-builder-paywalls-in-observer-mode) topic for details.

#### Started purchase using a web paywall

If a user initiates the purchase process using a web paywall, this method will be invoked:

```swift showLineNumbers title="Swift"
func paywallController(
        _ controller: AdaptyPaywallController,
        shouldContinueWebPaymentNavigation product: AdaptyPaywallProduct
    ) {
    }
```

#### Successful or canceled purchase

If `Adapty.makePurchase()` succeeds, this method will be invoked:

```swift showLineNumbers title="Swift"
func paywallController(
    _ controller: AdaptyPaywallController,
    didFinishPurchase product: AdaptyPaywallProductWithoutDeterminingOffer,
    purchaseResult: AdaptyPurchaseResult
) {
    if !purchaseResult.isPurchaseCancelled {
        controller.dismiss(animated: true)
    }
}
```

We recommend dismissing the paywall screen in that case. 

It will not be invoked in Observer mode. Refer to the [iOS - Present Paywall Builder paywalls in Observer mode](ios-present-paywall-builder-paywalls-in-observer-mode) topic for details.

#### Failed purchase

If `Adapty.makePurchase()` fails, this method will be invoked:

```swift showLineNumbers title="Swift"
func paywallController(
    _ controller: AdaptyPaywallController,
    didFailPurchase product: AdaptyPaywallProduct,
    error: AdaptyError
) { }
```

It will not be invoked in Observer mode. Refer to the [iOS - Present Paywall Builder paywalls in Observer mode](ios-present-paywall-builder-paywalls-in-observer-mode) topic for details.

#### Failed purchase using a web paywall

If `Adapty.openWebPaywall()` fails, this method will be invoked:

```swift showLineNumbers title="Swift"
func paywallController(
        _ controller: AdaptyPaywallController,
        didFailWebPaymentNavigation product: AdaptyPaywallProduct,
        error: AdaptyError
    ) { }
```

#### Successful restore

If `Adapty.restorePurchases()` succeeds, this method will be invoked:

```swift showLineNumbers title="Swift"
func paywallController(
    _ controller: AdaptyPaywallController, 
    didFinishRestoreWith profile: AdaptyProfile
) { }
```

We recommend dismissing the screen if a the has the required `accessLevel`. Refer to the [Subscription status](subscription-status) topic to learn how to check it.

#### Failed restore

If `Adapty.restorePurchases()` fails, this method will be invoked:

```swift showLineNumbers title="Swift"
public func paywallController(
    _ controller: AdaptyPaywallController, 
    didFailRestoreWith error: AdaptyError
) { }
```

### Data fetching and rendering

#### Product loading errors

If you don't pass the product array during the initialization, AdaptyUI will retrieve the necessary objects from the server by itself. If this operation fails, AdaptyUI will report the error by calling this method:

```swift showLineNumbers title="Swift"
public func paywallController(
    _ controller: AdaptyPaywallController,
    didFailLoadingProductsWith error: AdaptyError
) -> Bool {
    return true
}
```

If you return `true`, AdaptyUI will repeat the request after 2 seconds.

#### Rendering errors

If an error occurs during the interface rendering, it will be reported by this method:

```swift showLineNumbers title="Swift"
public func paywallController(
    _ controller: AdaptyPaywallController,
    didFailRenderingWith error: AdaptyError
) { }
```

In a normal situation, such errors should not occur, so if you come across one, please let us know.

## Handling events in SwiftUI

To control or monitor processes occurring on the paywall screen within your mobile app, use the `.paywall` modifier in SwiftUI:

```swift showLineNumbers title="Swift"
@State var paywallPresented = false

var body: some View {
	Text("Hello, AdaptyUI!")
			.paywall(
          isPresented: $paywallPresented,
          paywall: paywall,
          viewConfiguration: viewConfig,
          didSelectProduct: { /* Handle the event */  },
          didStartPurchase: { /* Handle the event */ },
          didFinishPurchase: { product, info in /* Handle the event */ },
          didFailPurchase: { product, error in /* Handle the event */ },
          didStartRestore: { /* Handle the event */ },
          didFinishRestore: { /* Handle the event */ },
          didFailRestore: { /* Handle the event */ },
          didFailRendering: { error in
              paywallPresented = false
          },
          didFailLoadingProducts: { error in
              return false
          }
      )
}
```

You can register only the closure parameters you need, and omit those you do not need. In this case, unused closure parameters will not be created.

| Closure parameter          | Description                                                                                                                                                                                          |
| :------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **didSelectProduct**       | If a user selects a product for purchase, this parameter will be invoked.                                                                                                                            |
| **didStartPurchase**       | If a user initiates the purchase process, this parameter will be invoked.                                                                                                                            |
| **didFinishPurchase**      | If `Adapty.makePurchase()` succeeds or is cancelled by the user, this parameter will be invoked.                                                                                                                                   |
| **didFailPurchase**        | If Adapty.makePurchase() fails, this parameter will be invoked.                                                                                                                                      |
| **didStartRestore**        | If a user initiates the purchase restoration, this parameter will be invoked.                                                                                                                        |
| **didFinishRestore**       | If `Adapty.restorePurchases()` succeeds, this parameter will be invoked.                                                                                                                             |
| **didFailRestore**         | If `Adapty.restorePurchases()` fails, this parameter will be invoked.                                                                                                                                |
| **didFailRendering**       | If an error occurs during the interface rendering, this parameter will be invoked.                                                                                                                   |
| **didFailLoadingProducts** | If you don't pass the product array during the initialization, AdaptyUI will retrieve the necessary objects from the server by itself. If this operation fails, AdaptyUI will invoke this parameter. |

Note that at the very least you need to implement the reactions to both `close` and `openURL`.