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

<Details>
<summary>Event example (Click to expand)</summary>

```javascript
{
  "product": {
    "vendorProductId": "premium_monthly",
    "localizedTitle": "Premium Monthly",
    "localizedDescription": "Premium subscription for 1 month",
    "localizedPrice": "$9.99",
    "price": 9.99,
    "currencyCode": "USD"
  }
}
```
</Details>

#### Started purchase

If a user initiates the purchase process, this method will be invoked:

```swift showLineNumbers title="Swift"
func paywallController(_ controller: AdaptyPaywallController,
                       didStartPurchase product: AdaptyPaywallProduct) {
}
```

<Details>
<summary>Event example (Click to expand)</summary>

```javascript
{
  "product": {
    "vendorProductId": "premium_monthly",
    "localizedTitle": "Premium Monthly",
    "localizedDescription": "Premium subscription for 1 month",
    "localizedPrice": "$9.99",
    "price": 9.99,
    "currencyCode": "USD"
  }
}
```
</Details>

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

<Details>
<summary>Event example (Click to expand)</summary>

```javascript
{
  "product": {
    "vendorProductId": "premium_monthly",
    "localizedTitle": "Premium Monthly",
    "localizedDescription": "Premium subscription for 1 month",
    "localizedPrice": "$9.99",
    "price": 9.99,
    "currencyCode": "USD"
  }
}
```
</Details>

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

<Details>
<summary>Event examples (Click to expand)</summary>

```javascript
// Successful purchase
{
  "product": {
    "vendorProductId": "premium_monthly",
    "localizedTitle": "Premium Monthly",
    "localizedDescription": "Premium subscription for 1 month",
    "localizedPrice": "$9.99",
    "price": 9.99,
    "currencyCode": "USD"
  },
  "purchaseResult": {
    "type": "success",
    "profile": {
      "accessLevels": {
        "premium": {
          "id": "premium",
          "isActive": true,
          "expiresAt": "2024-02-15T10:30:00Z"
        }
      }
    }
  }
}

// Cancelled purchase
{
  "product": {
    "vendorProductId": "premium_monthly",
    "localizedTitle": "Premium Monthly",
    "localizedDescription": "Premium subscription for 1 month",
    "localizedPrice": "$9.99",
    "price": 9.99,
    "currencyCode": "USD"
  },
  "purchaseResult": {
    "type": "cancelled"
  }
}
```
</Details>

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

<Details>
<summary>Event example (Click to expand)</summary>

```javascript
{
  "product": {
    "vendorProductId": "premium_monthly",
    "localizedTitle": "Premium Monthly",
    "localizedDescription": "Premium subscription for 1 month",
    "localizedPrice": "$9.99",
    "price": 9.99,
    "currencyCode": "USD"
  },
  "error": {
    "code": "purchase_failed",
    "message": "Purchase failed due to insufficient funds",
    "details": {
      "underlyingError": "Insufficient funds in account"
    }
  }
}
```
</Details>

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

<Details>
<summary>Event example (Click to expand)</summary>

```javascript
{
  "product": {
    "vendorProductId": "premium_monthly",
    "localizedTitle": "Premium Monthly",
    "localizedDescription": "Premium subscription for 1 month",
    "localizedPrice": "$9.99",
    "price": 9.99,
    "currencyCode": "USD"
  },
  "error": {
    "code": "web_payment_failed",
    "message": "Web payment navigation failed",
    "details": {
      "underlyingError": "Network connection error"
    }
  }
}
```
</Details>

#### Successful restore

If `Adapty.restorePurchases()` succeeds, this method will be invoked:

```swift showLineNumbers title="Swift"
func paywallController(
    _ controller: AdaptyPaywallController, 
    didFinishRestoreWith profile: AdaptyProfile
) { }
```

<Details>
<summary>Event example (Click to expand)</summary>

```javascript
{
  "profile": {
    "accessLevels": {
      "premium": {
        "id": "premium",
        "isActive": true,
        "expiresAt": "2024-02-15T10:30:00Z"
      }
    },
    "subscriptions": [
      {
        "vendorProductId": "premium_monthly",
        "isActive": true,
        "expiresAt": "2024-02-15T10:30:00Z"
      }
    ]
  }
}
```
</Details>

We recommend dismissing the screen if a the has the required `accessLevel`. Refer to the [Subscription status](subscription-status) topic to learn how to check it.

#### Failed restore

If `Adapty.restorePurchases()` fails, this method will be invoked:

```swift showLineNumbers title="Swift"
public func paywallController(
    _ controller: AdaptyPaywallController, 
    didFailRestoreWith error: AdaptyError
) { }
```

<Details>
<summary>Event example (Click to expand)</summary>

```javascript
{
  "error": {
    "code": "restore_failed",
    "message": "Purchase restoration failed",
    "details": {
      "underlyingError": "No previous purchases found"
    }
  }
}
```
</Details>

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

<Details>
<summary>Event example (Click to expand)</summary>

```javascript
{
  "error": {
    "code": "products_loading_failed",
    "message": "Failed to load products from the server",
    "details": {
      "underlyingError": "Network timeout"
    }
  }
}
```
</Details>

If you return `true`, AdaptyUI will repeat the request after 2 seconds.

#### Rendering errors

If an error occurs during the interface rendering, it will be reported by this method:

```swift showLineNumbers title="Swift"
public func paywallController(
    _ controller: AdaptyPaywallController,
    didFailRenderingWith error: AdaptyError
) { }
```

<Details>
<summary>Event example (Click to expand)</summary>

```javascript
{
  "error": {
    "code": "rendering_failed",
    "message": "Failed to render paywall interface",
    "details": {
      "underlyingError": "Invalid paywall configuration"
    }
  }
}
```
</Details>

In a normal situation, such errors should not occur, so if you come across one, please let us know.