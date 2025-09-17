---
title: "Android - Handle paywall events"
description: "Handle Android subscription events efficiently with Adapty's event tracking tools."
metadataTitle: "Handling Events in Android | Adapty Docs"
toc_max_heading_level: 4
keywords: ['AdaptyUiEventListener', 'onActionPerformed', 'onProductSelected', 'onPurchaseStarted', 'onPurchaseFinished', 'onPurchaseFailure', 'onRestoreSuccess', 'onRestoreFailure', 'onAwaitingSubscriptionUpdateParams', 'onLoadingProductsFailure', 'onRenderingError']
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import SampleApp from '@site/src/components/reusable/SampleApp.md';
import PaywallAction from '@site/src/components/reusable/PaywallAction.md';
import Details from '@site/src/components/Details';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

:::important
This guide covers event handling for purchases, restorations, product selection, and paywall rendering. You must also implement button handling (closing paywall, opening links, etc.). See our [guide on handling button actions](android-handle-paywall-actions.md) for details.
:::

Paywalls configured with the [Paywall Builder](adapty-paywall-builder) don't need extra code to make and restore purchases. However, they generate some events that your app can respond to. Those events include button presses (close buttons, URLs, product selections, and so on) as well as notifications on purchase-related actions taken on the paywall. Learn how to respond to these events below.

:::warning
This guide is for **new Paywall Builder paywalls** only which require Adapty SDK v3.0 or later. For presenting paywalls in Adapty SDK v2 designed with legacy Paywall Builder, see [Handle paywall events designed with legacy Paywall Builder](android-handling-events-legacy).
:::

<SampleApp />

If you need to control or monitor the processes that take place on the purchase screen, implement the `AdaptyUiEventListener` methods.

If you would like to leave the default behavior in some cases, you can extend `AdaptyUiDefaultEventListener` and override only those methods you want to change.

Below are the defaults from `AdaptyUiDefaultEventListener`.

### User-generated events

#### Product selection

If a product is selected for purchase (by a user or by the system), this method will be invoked:

```kotlin showLineNumbers title="Kotlin"
public override fun onProductSelected(
    product: AdaptyPaywallProduct,
    context: Context,
) {}
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

```kotlin showLineNumbers title="Kotlin"
public override fun onPurchaseStarted(
    product: AdaptyPaywallProduct,
    context: Context,
) {}
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

The method will not be invoked in Observer mode. Refer to the [Android - Present Paywall Builder paywalls in Observer mode](android-present-paywall-builder-paywalls-in-observer-mode) topic for details.

#### Successful, canceled, or pending purchase

If purchase succeeds, this method will be invoked:

```kotlin showLineNumbers title="Kotlin"
public override fun onPurchaseFinished(
    purchaseResult: AdaptyPurchaseResult,
    product: AdaptyPaywallProduct,
    context: Context,
) {
    if (purchaseResult !is AdaptyPurchaseResult.UserCanceled)
        context.getActivityOrNull()?.onBackPressed()
}
```

<Details>
<summary>Event examples (Click to expand)</summary>

```javascript
// Successful purchase
{
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
  },
  "product": {
    "vendorProductId": "premium_monthly",
    "localizedTitle": "Premium Monthly",
    "localizedDescription": "Premium subscription for 1 month",
    "localizedPrice": "$9.99",
    "price": 9.99,
    "currencyCode": "USD"
  }
}

// Cancelled purchase
{
  "purchaseResult": {
    "type": "UserCanceled"
  },
  "product": {
    "vendorProductId": "premium_monthly",
    "localizedTitle": "Premium Monthly",
    "localizedDescription": "Premium subscription for 1 month",
    "localizedPrice": "$9.99",
    "price": 9.99,
    "currencyCode": "USD"
  }
}

// Pending purchase
{
  "purchaseResult": {
    "type": "Pending"
  },
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

We recommend dismissing the screen in that case. 

The method will not be invoked in Observer mode. Refer to the [Android - Present Paywall Builder paywalls in Observer mode](android-present-paywall-builder-paywalls-in-observer-mode) topic for details.

#### Failed purchase

If purchase fails, this method will be invoked:

```kotlin showLineNumbers title="Kotlin"
public override fun onPurchaseFailure(
    error: AdaptyError,
    product: AdaptyPaywallProduct,
    context: Context,
) {}
```

<Details>
<summary>Event example (Click to expand)</summary>

```javascript
{
  "error": {
    "code": "purchase_failed",
    "message": "Purchase failed due to insufficient funds",
    "details": {
      "underlyingError": "Insufficient funds in account"
    }
  },
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

The method will not be invoked in Observer mode. Refer to the [Android - Present Paywall Builder paywalls in Observer mode](android-present-paywall-builder-paywalls-in-observer-mode) topic for details.

#### Successful restore

If restoring a purchase succeeds, this method will be invoked:

```kotlin showLineNumbers title="Kotlin"
public override fun onRestoreSuccess(
    profile: AdaptyProfile,
    context: Context,
) {}
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

We recommend dismissing the screen if the user has the required `accessLevel`. Refer to the [Subscription status](android-listen-subscription-changes.md) topic to learn how to check it.

#### Failed restore

If `Adapty.restorePurchases()` fails, this method will be invoked:

```kotlin showLineNumbers title="Kotlin"
public override fun onRestoreFailure(
    error: AdaptyError,
    context: Context,
) {}
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

#### Upgrade subscription

<Tabs groupId="current-os" queryString>
<TabItem value="new" label="SDK version 3.10.0 or later" default>

When a user attempts to purchase a new subscription while another subscription is active, you can control how the new purchase should be handled by overriding this method. You have two options:

1. **Replace the current subscription** with the new one:
```kotlin showLineNumbers title="Kotlin"
public override fun onAwaitingPurchaseParams(
    product: AdaptyPaywallProduct,
    context: Context,
    onPurchaseParamsReceived: AdaptyUiEventListener.PurchaseParamsCallback,
): AdaptyUiEventListener.PurchaseParamsCallback.IveBeenInvoked {
    onPurchaseParamsReceived(
        AdaptyPurchaseParameters.Builder()
            .withSubscriptionUpdateParams(AdaptySubscriptionUpdateParameters(...))
            .build()
    )
    return AdaptyUiEventListener.PurchaseParamsCallback.IveBeenInvoked
}
```

2. **Keep both subscriptions** (add the new one separately):
```kotlin showLineNumbers title="Kotlin"
public override fun onAwaitingPurchaseParams(
    product: AdaptyPaywallProduct,
    context: Context,
    onPurchaseParamsReceived: AdaptyUiEventListener.PurchaseParamsCallback,
): AdaptyUiEventListener.PurchaseParamsCallback.IveBeenInvoked {
    onPurchaseParamsReceived(AdaptyPurchaseParameters.Empty)
    return AdaptyUiEventListener.PurchaseParamsCallback.IveBeenInvoked
}
```

:::note
If you don't override this method, the default behavior is to keep both subscriptions active (equivalent to using `AdaptyPurchaseParameters.Empty`).
:::

You can also set additional purchase parameters if needed:
```kotlin
AdaptyPurchaseParameters.Builder()
    .withSubscriptionUpdateParams(AdaptySubscriptionUpdateParameters(...)) // optional - for replacing current subscription
    .withOfferPersonalized(true) // optional - if using personalized pricing
    .build()
```

</TabItem>
<TabItem value="old" label="SDK version earlier than 3.10.0" default>

If a new subscription is purchased while another is still active, override this method to replace the current one with the new one. If the active subscription should remain active and the new one is added separately, call `onSubscriptionUpdateParamsReceived(null)`:

```kotlin showLineNumbers title="Kotlin"
public override fun onAwaitingSubscriptionUpdateParams(
    product: AdaptyPaywallProduct,
    context: Context,
    onSubscriptionUpdateParamsReceived: SubscriptionUpdateParamsCallback,
) {
    onSubscriptionUpdateParamsReceived(AdaptySubscriptionUpdateParameters(...))
}
```

</TabItem>
</Tabs>

<Details>
<summary>Event example (Click to expand)</summary>

```javascript
{
  "product": {
    "vendorProductId": "premium_yearly",
    "localizedTitle": "Premium Yearly",
    "localizedDescription": "Premium subscription for 1 year",
    "localizedPrice": "$99.99",
    "price": 99.99,
    "currencyCode": "USD"
  },
  "subscriptionUpdateParams": {
    "replacementMode": "with_time_proration"
  }
}
```
</Details>

### Data fetching and rendering

#### Product loading errors

If you don't pass the products during the initialization, AdaptyUI will retrieve the necessary objects from the server by itself. If this operation fails, AdaptyUI will report the error by invoking this method:

```kotlin showLineNumbers title="Kotlin"
public override fun onLoadingProductsFailure(
    error: AdaptyError,
    context: Context,
): Boolean = false
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

If you return `true`, AdaptyUI will repeat the request in 2 seconds.

#### Rendering errors

If an error occurs during the interface rendering, it will be reported by calling this method:

```kotlin showLineNumbers title="Kotlin"
public override fun onRenderingError(
    error: AdaptyError,
    context: Context,
) {}
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