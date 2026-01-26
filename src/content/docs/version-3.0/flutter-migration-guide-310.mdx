---
title: "Migration guide to Flutter Adapty SDK 3.10.0"
description: ""
metadataTitle: ""
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Adapty SDK 3.10.0 is a major release that brought some improvements that however may require some migration steps from you:

1. Update the `makePurchase` method to use `AdaptyPurchaseParameters` instead of individual parameters.
2. Replace `vendorProductIds` with `productIdentifiers` in the `AdaptyPaywall` model.

## Update makePurchase method

The `makePurchase` method now uses `AdaptyPurchaseParameters` instead of individual `subscriptionUpdateParams` and `isOfferPersonalized` arguments. This provides better type safety and allows for future extensibility of purchase parameters.

```diff showLineNumbers
- final purchaseResult = await adapty.makePurchase(
-   product: product,
-   subscriptionUpdateParams: subscriptionUpdateParams,
-   isOfferPersonalized: true,
- );

+ final parameters = AdaptyPurchaseParametersBuilder()
+   ..setSubscriptionUpdateParams(subscriptionUpdateParams)
+   ..setIsOfferPersonalized(true)
+   ..setObfuscatedAccountId('your-account-id')
+   ..setObfuscatedProfileId('your-profile-id');

+ final purchaseResult = await adapty.makePurchase(
+   product: product,
+   parameters: parameters.build(),
+ );
```

If no additional parameters are needed, you can simply use:

```dart showLineNumbers
final purchaseResult = await adapty.makePurchase(
  product: product,
);
```

## Update AdaptyPaywall model usage

The `vendorProductIds` property has been deprecated in favor of `productIdentifiers`. The new property returns `AdaptyProductIdentifier` objects instead of simple strings, providing more structured product information.

```diff showLineNumbers
- paywall.vendorProductIds.map((vendorId) => 
-   ListTextTile(title: vendorId)
- ).toList()

+ paywall.productIdentifiers.map((productId) => 
+   ListTextTile(title: productId.vendorProductId)
+ ).toList()
```

The `AdaptyProductIdentifier` object provides access to the vendor product ID through the `vendorProductId` property, maintaining the same functionality while offering better structure for future enhancements.

## Backward compatibility

Both changes maintain backward compatibility:
- The old parameters in `makePurchase` are deprecated but still functional
- The `vendorProductIds` property is deprecated but still accessible
- Existing code will continue to work, though you'll see deprecation warnings

We recommend updating your code to use the new APIs to ensure future compatibility and take advantage of the improved type safety and extensibility. 