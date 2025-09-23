---
title: "Kotlin Multiplatform - Handle paywall events"
description: "Handle Kotlin Multiplatform subscription events efficiently with Adapty's event tracking tools."
metadataTitle: "Handling Events in Kotlin Multiplatform | Adapty Docs"
toc_max_heading_level: 4
keywords: ['AdaptyUIObserver', 'paywallViewDidPerformAction', 'paywallViewDidSelectProduct', 'paywallViewDidStartPurchase', 'paywallViewDidFinishPurchase', 'paywallViewDidFailPurchase', 'paywallViewDidFinishRestore', 'paywallViewDidFailRestore', 'paywallViewDidFailLoadingProducts', 'paywallViewDidFailRendering']
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import SampleApp from '@site/src/components/reusable/SampleApp.md';
import Details from '@site/src/components/Details';

Paywalls configured with the [Paywall Builder](adapty-paywall-builder) don't need extra code to make and restore purchases. However, they generate some events that your app can respond to. Those events include button presses (close buttons, URLs, product selections, and so on) as well as notifications on purchase-related actions taken on the paywall. Learn how to respond to these events below.

:::warning
This guide is for **new Paywall Builder paywalls** only.
:::

To control or monitor processes occurring on the paywall screen within your mobile app, implement the `AdaptyUIObserver` interface methods. Some methods have default implementations that handle common scenarios automatically.

:::note
**Implementation Notes**: These methods are where you add your custom logic to respond to paywall events. You can use `view.showDialog()` (a suspend function) to show dialogs, `view.dismiss()` to close the paywall, or implement any other custom behavior you need.
:::

## User-generated events

### Paywall appearance and disappearance

When a paywall appears or disappears, these methods will be invoked:

```kotlin showLineNumbers title="Kotlin"
override fun paywallViewDidAppear(view: AdaptyUIView) {
    // Handle paywall appearance
    // You can track analytics or update UI here
}

override fun paywallViewDidDisappear(view: AdaptyUIView) {
    // Handle paywall disappearance
    // You can track analytics or update UI here
}
```

<Details>
<summary>Event examples (Click to expand)</summary>

```javascript
// Paywall appeared
{
  // No additional data
}

// Paywall disappeared
{
  // No additional data
}
```
</Details>

### Product selection

If a user selects a product for purchase, this method will be invoked:

```kotlin showLineNumbers title="Kotlin"
override fun paywallViewDidSelectProduct(view: AdaptyUIView, productId: String) {
    // Handle product selection
    // You can update UI or track analytics here
}
```

<Details>
<summary>Event example (Click to expand)</summary>

```javascript
{
  "productId": "premium_monthly"
}
```
</Details>

### Started purchase

If a user initiates the purchase process, this method will be invoked:

```kotlin showLineNumbers title="Kotlin"
override fun paywallViewDidStartPurchase(view: AdaptyUIView, product: AdaptyPaywallProduct) {
    // Handle purchase start
    // You can show loading indicators or track analytics here
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

### Successful, canceled, or pending purchase

If a purchase succeeds, this method will be invoked. By default, it automatically dismisses the paywall unless the purchase was canceled by the user:

```kotlin showLineNumbers title="Kotlin"
override fun paywallViewDidFinishPurchase(
    view: AdaptyUIView,
    product: AdaptyPaywallProduct,
    purchaseResult: AdaptyPurchaseResult
) {
    when (purchaseResult) {
        is AdaptyPurchaseResult.Success -> {
            // Check if user has access to premium features
            if (purchaseResult.profile.accessLevels["premium"]?.isActive == true) {
                view.dismiss()
            }
        }
        AdaptyPurchaseResult.Pending -> {
            // Handle pending purchase (e.g., user will pay offline with cash)
        }
        AdaptyPurchaseResult.UserCanceled -> {
            // Handle user cancellation
        }
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
    "type": "Success",
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

// Pending purchase
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
    "type": "Pending"
  }
}

// User canceled purchase
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
    "type": "UserCanceled"
  }
}
```
</Details>

We recommend dismissing the paywall screen in case of successful purchase.

### Failed purchase

If a purchase fails, this method will be invoked:

```kotlin showLineNumbers title="Kotlin"
override fun paywallViewDidFailPurchase(
    view: AdaptyUIView,
    product: AdaptyPaywallProduct,
    error: AdaptyError
) {
    // Add your purchase failure handling logic here
    // For example: show error message, retry option, or custom error handling
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

### Successful restore

If restoring a purchase succeeds, this method will be invoked:

```kotlin showLineNumbers title="Kotlin"
override fun paywallViewDidFinishRestore(view: AdaptyUIView, profile: AdaptyProfile) {
    // Add your successful restore handling logic here
    // For example: show success message, update UI, or dismiss paywall
    
    // Check if user has access to premium features
    if (profile.accessLevels["premium"]?.isActive == true) {
        view.dismiss()
    }
}
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

We recommend dismissing the screen if the user has the required `accessLevel`. Refer to the [Subscription status](subscription-status) topic to learn how to check it.

### Failed restore

If `Adapty.restorePurchases()` fails, this method will be invoked:

```kotlin showLineNumbers title="Kotlin"
override fun paywallViewDidFailRestore(view: AdaptyUIView, error: AdaptyError) {
    // Add your restore failure handling logic here
    // For example: show error message, retry option, or custom error handling
}
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

### Web payment navigation completion

If a user completes web payment navigation, this method will be invoked:

```kotlin showLineNumbers title="Kotlin"
override fun paywallViewDidFinishWebPaymentNavigation(
    view: AdaptyUIView,
    product: AdaptyPaywallProduct?,
    error: AdaptyError?
) {
    if (error != null) {
        // Handle web payment navigation error
    } else {
        // Handle successful web payment navigation
    }
}
```

<Details>
<summary>Event examples (Click to expand)</summary>

```javascript
// Successful web payment navigation
{
  "product": {
    "vendorProductId": "premium_monthly",
    "localizedTitle": "Premium Monthly",
    "localizedDescription": "Premium subscription for 1 month",
    "localizedPrice": "$9.99",
    "price": 9.99,
    "currencyCode": "USD"
  },
  "error": null
}

// Failed web payment navigation
{
  "product": null,
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

## Data fetching and rendering

### Product loading errors

If you don't pass the products during the initialization, AdaptyUI will retrieve the necessary objects from the server by itself. If this operation fails, AdaptyUI will report the error by calling this method:

```kotlin showLineNumbers title="Kotlin"
override fun paywallViewDidFailLoadingProducts(view: AdaptyUIView, error: AdaptyError) {
    // Add your product loading failure handling logic here
    // For example: show error message, retry option, or custom error handling
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

### Rendering errors

If an error occurs during the interface rendering, it will be reported by this method:

```kotlin showLineNumbers title="Kotlin"
override fun paywallViewDidFailRendering(view: AdaptyUIView, error: AdaptyError) {
    // Handle rendering error
    // In a normal situation, such errors should not occur
    // If you come across one, please let us know
}
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
