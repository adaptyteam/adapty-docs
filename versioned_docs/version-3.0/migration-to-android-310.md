---
title: "Migration guide to Android Adapty SDK 3.10.0"
description: ""
metadataTitle: ""
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Adapty SDK 3.10.0 is a major release that brought some improvements that however may require some migration steps from you:

1. `AdaptyUiPersonalizedOfferResolver` has been removed. If you are using it, pass it in the `subscriptionUpdateParams` parameter in the `makePurchase` method.
2. Update the `onAwaitingPurchaseParams` method signature for Paywall Builder paywalls.

## Update personalized offer resolver

The `AdaptyUiPersonalizedOfferResolver` interface has been removed. If you were using it to indicate whether a product price is personalized, you now need to pass this information in the `isOfferPersonalized` parameter in the [`makePurchase`](making-purchases.md) method.

```diff showLineNumbers
- personalizedOfferResolver = object : AdaptyUiPersonalizedOfferResolver {
-     override fun resolve(product: AdaptyPaywallProduct): Boolean {
-         // Your personalized offer logic
-         return isPersonalizedOffer(product)
-     }
- },

+ makePurchase(product, {
+     android: {
+         subscriptionUpdateParams: {
+             oldSubVendorProductId: 'old_product_id',
+             prorationMode: 'charge_prorated_price'
+         },
+         isOfferPersonalized: true,  // Note: moved to upper level
+         obfuscatedAccountId: 'account_123',
+         obfuscatedProfileId: 'profile_456'
+     }
+ });
```

## Update purchase parameters callback

The `onAwaitingPurchaseParams` method signature has been updated. Update your implementation as follows:

```diff showLineNumbers
- public override fun onAwaitingPurchaseParams(
-     product: AdaptyPaywallProduct,
-     context: Context,
- ): AdaptyPurchaseParameters? {
-     return AdaptyPurchaseParameters.Builder()
-         .setPersonalizedOffer(isPersonalizedOffer(product))
-         .build()
- }

+ public override fun onAwaitingPurchaseParams(
+     product: AdaptyPaywallProduct,
+     context: Context,
+     onPurchaseParamsReceived: AdaptyUiEventListener.PurchaseParamsCallback,
+ ): AdaptyUiEventListener.PurchaseParamsCallback.IveBeenInvoked {
+     onPurchaseParamsReceived(
+         AdaptyPurchaseParameters.Builder()
+             .setPersonalizedOffer(isPersonalizedOffer(product))
+             .build()
+     )
+     return AdaptyUiEventListener.PurchaseParamsCallback.IveBeenInvoked
+ }
```

