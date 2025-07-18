---
title: "iOS - Handle paywall events"
description: "Handle subscription-related events in iOS using Adapty for better app monetization."
metadataTitle: "Handling Events in iOS | Adapty Docs"
toc_max_heading_level: 4
keywords: ['AdaptyPaywallControllerDelegate', 'didSelectProduct', 'didStartPurchase', 'shouldContinueWebPaymentNavigation', 'didFinishPurchase', 'didFailPurchase', 'didFailWebPaymentNavigation', 'didFinishRestoreWith', 'didFailRestoreWith', 'didFailLoadingProductsWith',  'didFailRenderingWith']
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

## Handling events in Swift

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