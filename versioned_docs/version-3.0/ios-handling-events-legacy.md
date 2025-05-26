---
title: "iOS - Handle paywall events"
description: "Handle events in iOS (Legacy) apps with Adapty’s event tracking system."
metadataTitle: "Handling Events in iOS (Legacy) | Adapty Docs"
toc_max_heading_level: 4
---

Paywalls configured with the [Paywall Builder](adapty-paywall-builder-legacy) don't need extra code to make and restore purchases. However, they generate some events that your app can respond to. Those events include button presses (close buttons, URLs, product selections, and so on) as well as notifications on purchase-related actions taken on the paywall. Learn how to respond to these events below.

:::warning
This guide is for **legacy Paywall Builder paywalls** only which require Adapty SDK up to v2.x. For presenting paywalls in Adapty SDK v3.0 or later designed with new Paywall Builder, see [iOS - Handle paywall events designed with new Paywall Builder](ios-handling-events).
:::

## Handling events in Swift

To control or monitor processes occurring on the paywall screen within your mobile app, implement the `AdaptyPaywallControllerDelegate` methods.

### User-generated events

#### Actions

If a user performs some action (`close`, `openURL(url:)` or `custom(id:)`), the method below will be invoked. Note that this is just an example and you can implement the response to actions differently:

```swift showLineNumbers title="Swift"
func paywallController(_ controller: AdaptyPaywallController,
                       didPerform action: AdaptyUI.Action) {

    switch action {
        case .close:
            controller.dismiss(animated: true)
        case let .openURL(url):
      			// handle URL opens (incl. terms and privacy links)
            UIApplication.shared.open(url, options: [:])
        case let .custom(id):
            if id == "login" {
               // implement login flow 
            }
            break
    }
}
```

For example, if a user taps the close button, the action `close` will occur and you are supposed to dismiss the paywall. Note that at the very least you need to implement the reactions to both `close` and `openURL`.

> 💡 Login Action
> 
> If you have configured Login Action in the dashboard, you should also implement reaction for custom action with id `"login"`.

#### Product selection

If a user selects a product for purchase, this method will be invoked:

```swift showLineNumbers title="Swift"
    func paywallController(_ controller: AdaptyPaywallController,
                           didSelectProduct product: AdaptyPaywallProduct) {
    }
```

#### Started purchase

If a user initiates the purchase process, this method will be invoked:

```swift showLineNumbers title="Swift"
func paywallController(_ controller: AdaptyPaywallController,
                       didStartPurchase product: AdaptyPaywallProduct) {
}
```

It will not be invoked in Observer mode. Refer to the [iOS - Present Paywall Builder paywalls in Observer mode](ios-present-paywall-builder-paywalls-in-observer-mode) topic for details.

#### Canceled purchase

If a user initiates the purchase process but manually interrupts it, the method below will be invoked. This event occurs when the `Adapty.makePurchase()` function completes with a `.paymentCancelled` error:

```swift showLineNumbers title="Swift"
func paywallController(_ controller: AdaptyPaywallController,
                       didCancelPurchase product: AdaptyPaywallProduct) {
}
```

It will not be invoked in Observer mode. Refer to the [iOS - Present Paywall Builder paywalls in Observer mode](ios-present-paywall-builder-paywalls-in-observer-mode)  topic for details.

#### Successful purchase

If `Adapty.makePurchase()` succeeds, this method will be invoked:

```swift showLineNumbers title="Swift"
func paywallController(_ controller: AdaptyPaywallController,
                       didFinishPurchase product: AdaptyPaywallProduct,
                       purchasedInfo: AdaptyPurchasedInfo) {      
    controller.dismiss(animated: true)
}
```

We recommend dismissing the paywall screen in that case. 

It will not be invoked in Observer mode. Refer to the [iOS - Present Paywall Builder paywalls in Observer mode](ios-present-paywall-builder-paywalls-in-observer-mode) topic for details.

#### Failed purchase

If `Adapty.makePurchase()` fails, this method will be invoked:

```swift showLineNumbers title="Swift"
func paywallController(_ controller: AdaptyPaywallController,
                       didFailPurchase product: AdaptyPaywallProduct,
                       error: AdaptyError) {
}
```

It will not be invoked in Observer mode. Refer to the [iOS - Present Paywall Builder paywalls in Observer mode](ios-present-paywall-builder-paywalls-in-observer-mode) topic for details.

#### Successful restore

If `Adapty.restorePurchases()` succeeds, this method will be invoked:

```swift showLineNumbers title="Swift"
func paywallController(_ controller: AdaptyPaywallController, 
                       didFinishRestoreWith profile: AdaptyProfile) {
}
```

We recommend dismissing the screen if a the has the required `accessLevel`. Refer to the [Subscription status](subscription-status) topic to learn how to check it.

#### Failed restore

If `Adapty.restorePurchases()` fails, this method will be invoked:

```swift showLineNumbers title="Swift"
public func paywallController(_ controller: AdaptyPaywallController, 
                              didFailRestoreWith error: AdaptyError) {
}
```

### Data fetching and rendering

#### Product loading errors

If you don't pass the product array during the initialization, AdaptyUI will retrieve the necessary objects from the server by itself. If this operation fails, AdaptyUI will report the error by calling this method:

```swift showLineNumbers title="Swift"
public func paywallController(_ controller: AdaptyPaywallController,
                              didFailLoadingProductsWith error: AdaptyError) -> Bool {
    return true
}
```

If you return `true`, AdaptyUI will repeat the request after 2 seconds.

#### Rendering errors

If an error occurs during the interface rendering, it will be reported by this method:

```swift showLineNumbers title="Swift"
public func paywallController(_ controller: AdaptyPaywallController,
                              didFailRenderingWith error: AdaptyError) {
}
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
          configuration: viewConfig,
          didPerformAction: { action in
              switch action {
                  case .close:
                      paywallPresented = false
                	case .openURL(url):
                			// handle opening the URL (incl. for terms and privacy)
                	case 
                  default:
                      // handle other actions
                      break
              }
          },
          didSelectProduct: { /* Handle the event */  },
          didStartPurchase: { /* Handle the event */ },
          didFinishPurchase: { product, info in /* Handle the event */ },
          didFailPurchase: { product, error in /* Handle the event */ },
          didCancelPurchase: { /* Handle the event */ },
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
| **didFinishPurchase**      | If Adapty.makePurchase() succeeds, this parameter will be invoked.                                                                                                                                   |
| **didFailPurchase**        | If Adapty.makePurchase() fails, this parameter will be invoked.                                                                                                                                      |
| **didCancelPurchase**      | If a user initiates the purchase process but manually interrupts it, this parameter will be invoked.                                                                                                 |
| **didStartRestore**        | If a user initiates the purchase restoration, this parameter will be invoked.                                                                                                                        |
| **didFinishRestore**       | If `Adapty.restorePurchases()` succeeds, this parameter will be invoked.                                                                                                                             |
| **didFailRestore**         | If `Adapty.restorePurchases()` fails, this parameter will be invoked.                                                                                                                                |
| **didFailRendering**       | If an error occurs during the interface rendering, this parameter will be invoked.                                                                                                                   |
| **didFailLoadingProducts** | If you don't pass the product array during the initialization, AdaptyUI will retrieve the necessary objects from the server by itself. If this operation fails, AdaptyUI will invoke this parameter. |

Note that at the very least you need to implement the reactions to both `close` and `openURL`.