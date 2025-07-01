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

<SampleApp />

To control or monitor processes occurring on the paywall screen within your mobile app, implement the `AdaptyUIObserver` interface methods. Some methods have default implementations that handle common scenarios automatically.

## User-generated events

### Actions

When a user performs an action (like clicking a close button, custom button, or opening a URL), the `paywallViewDidPerformAction` method will be triggered. You'll need to define what each action should do.

The following built-in actions are supported:

- `CloseAction`
- `AndroidSystemBackAction`
- `OpenUrlAction(url)`

Custom actions are handled differently. For example, if a user taps a custom button, like **Login** or **Open another paywall**, the observer method `paywallViewDidPerformAction` will be triggered with the `CustomAction(action)` case and the `action` parameter is the **Button action ID** from the Adapty Dashboard. The ID for the custom action "login" is predefined, but for other custom actions, you can create your own IDs, like "open_another_paywall".

Here's an example, but feel free to handle the actions in your own way:

```kotlin showLineNumbers title="Kotlin"
override fun paywallViewDidPerformAction(view: AdaptyUIView, action: AdaptyUIAction) {
    when (action) {
        AdaptyUIAction.CloseAction, AdaptyUIAction.AndroidSystemBackAction -> {
            view.dismiss()
        }
        is AdaptyUIAction.OpenUrlAction -> {
            // Handle URL opening - you can show a confirmation dialog
            val selectedAction = view.showDialog(
                title = "Open URL?",
                content = action.url,
                primaryActionTitle = "Cancel",
                secondaryActionTitle = "OK"
            )

            when (selectedAction) {
                AdaptyUIDialogActionType.PRIMARY -> {
                    // User chose to cancel
                }
                AdaptyUIDialogActionType.SECONDARY -> {
                    // Open URL - implement your URL opening logic here
                }
            }
        }
        is AdaptyUIAction.CustomAction -> {
            when (action.action) {
                "login" -> {
                    // Implement login flow
                }
                "open_another_paywall" -> {
                    // Implement opening another paywall
                }
                else -> {
                    // Handle other custom actions
                }
            }
        }
    }
}
```

<Details>
<summary>Event examples (Click to expand)</summary>

```javascript
// Close action
{
  "action": "CloseAction"
}

// Android system back action
{
  "action": "AndroidSystemBackAction"
}

// Open URL action
{
  "action": "OpenUrlAction",
  "url": "https://example.com/terms"
}

// Custom action
{
  "action": "CustomAction",
  "action": "login"
}
```
</Details>

:::tip
Make sure to implement responses for all [predefined and custom actions](paywall-buttons) you've set up in the Adapty Dashboard.
:::

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

If `Adapty.makePurchase()` succeeds, this method will be invoked. By default, it automatically dismisses the paywall on successful purchase:

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

If `Adapty.makePurchase()` fails, this method will be invoked:

```kotlin showLineNumbers title="Kotlin"
override fun paywallViewDidFailPurchase(
    view: AdaptyUIView,
    product: AdaptyPaywallProduct,
    error: AdaptyError
) {
    // Handle purchase failure
    // You can show error messages or retry options
    view.showDialog(
        title = "Purchase Failed",
        content = error.message ?: "An error occurred during purchase",
        primaryActionTitle = "OK"
    )
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

If `Adapty.restorePurchases()` succeeds, this method will be invoked:

```kotlin showLineNumbers title="Kotlin"
override fun paywallViewDidFinishRestore(view: AdaptyUIView, profile: AdaptyProfile) {
    // Handle successful restore
    view.showDialog(
        title = "Success",
        content = "Purchases were successfully restored.",
        primaryActionTitle = "OK"
    )
    
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
    // Handle restore failure
    view.showDialog(
        title = "Restore Failed",
        content = error.message ?: "An error occurred during restore",
        primaryActionTitle = "OK"
    )
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
    // Handle product loading failure
    // You can show error messages or retry options
    view.showDialog(
        title = "Loading Error",
        content = "Failed to load products. Please try again.",
        primaryActionTitle = "OK"
    )
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

