---
title: "Migration guide to Android Adapty SDK 3.10.0"
description: ""
metadataTitle: ""
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Adapty SDK 3.10.0 is a major release that brought some improvements that however may require some migration steps from you:

1. `AdaptyUiPersonalizedOfferResolver` has been removed. If you are using it, pass it in the `onAwaitingPurchaseParams` callback.
2. Update the `onAwaitingSubscriptionUpdateParams` method signature for Paywall Builder paywalls.

## Update purchase parameters callback

The `onAwaitingSubscriptionUpdateParams` method has been renamed to `onAwaitingPurchaseParams` and now uses `AdaptyPurchaseParameters` instead of `AdaptySubscriptionUpdateParameters`. This allows you to specify personalized offer information and other purchase parameters.

```diff showLineNumbers
- public override fun onAwaitingSubscriptionUpdateParams(
-     product: AdaptyPaywallProduct,
-     context: Context,
-     onSubscriptionUpdateParamsReceived: SubscriptionUpdateParamsCallback,
- ) {
-     onSubscriptionUpdateParamsReceived(AdaptySubscriptionUpdateParameters(...))
- }

+ public override fun onAwaitingPurchaseParams(
+     product: AdaptyPaywallProduct,
+     context: Context,
+     onPurchaseParamsReceived: AdaptyUiEventListener.PurchaseParamsCallback,
+ ): AdaptyUiEventListener.PurchaseParamsCallback.IveBeenInvoked {
+     onPurchaseParamsReceived(
+         AdaptyPurchaseParameters.Builder()
+             .withSubscriptionUpdateParams(AdaptySubscriptionUpdateParameters(...)) 
+             .withOfferPersonalized(true) 
+             .build()
+     )
+     return AdaptyUiEventListener.PurchaseParamsCallback.IveBeenInvoked
+ }
```

If no additional parameters are needed, you can simply use:

```kotlin showLineNumbers
+ public override fun onAwaitingPurchaseParams(
    product: AdaptyPaywallProduct,
    context: Context,
    onPurchaseParamsReceived: AdaptyUiEventListener.PurchaseParamsCallback,
): AdaptyUiEventListener.PurchaseParamsCallback.IveBeenInvoked {
    onPurchaseParamsReceived(AdaptyPurchaseParameters.Empty)
    return AdaptyUiEventListener.PurchaseParamsCallback.IveBeenInvoked
}
```

