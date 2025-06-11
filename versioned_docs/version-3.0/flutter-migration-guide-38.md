---
title: "Migration guide to Adapty Flutter SDK 3.8.0"
description: ""
metadataTitle: ""
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem'; 

Adapty SDK 3.8.0 is a major release that brought some improvements which however may require some migration steps from you.

1. Update the observer class and method names.
2. Update the fallback paywalls method name.
3. Update the view class name in event handling methods.

## Update observer class and method names

The observer class and its registration method have been renamed:

```diff showLineNumbers
- class MyObserver extends AdaptyUIObserver {
+ class MyObserver extends AdaptyUIPaywallsEventsObserver {
   @override
   void paywallViewDidPerformAction(AdaptyUIView view, AdaptyUIAction action) {
     // Handle action
   }
 }

 // Register observer
- AdaptyUI().setObserver(this);
+ AdaptyUI().setPaywallsEventsObserver(this);
```

## Update fallback paywalls method name

The method for setting fallback paywalls has been simplified:

```diff showLineNumbers
 try {
-  await Adapty.setFallbackPaywalls(assetId);
+  await Adapty.setFallback(assetId);
 } on AdaptyError catch (adaptyError) {
   // handle the error
 } catch (e) {
   // handle the error
 }
```

## Update view class name in event handling methods

All event handling methods now use the new `AdaptyUIPaywallView` class instead of `AdaptyUIView`:

```diff showLineNumbers
- void paywallViewDidPerformAction(AdaptyUIView view, AdaptyUIAction action)
+ void paywallViewDidPerformAction(AdaptyUIPaywallView view, AdaptyUIAction action)

- void paywallViewDidSelectProduct(AdaptyUIView view, AdaptyPaywallProduct product)
+ void paywallViewDidSelectProduct(AdaptyUIPaywallView view, AdaptyPaywallProduct product)

- void paywallViewDidStartPurchase(AdaptyUIView view, AdaptyPaywallProduct product)
+ void paywallViewDidStartPurchase(AdaptyUIPaywallView view, AdaptyPaywallProduct product)

- void paywallViewDidFinishPurchase(AdaptyUIView view, AdaptyPaywallProduct product, AdaptyProfile profile)
+ void paywallViewDidFinishPurchase(AdaptyUIPaywallView view, AdaptyPaywallProduct product, AdaptyProfile profile)

- void paywallViewDidFailPurchase(AdaptyUIView view, AdaptyPaywallProduct product, AdaptyError error)
+ void paywallViewDidFailPurchase(AdaptyUIPaywallView view, AdaptyPaywallProduct product, AdaptyError error)

- void paywallViewDidFinishRestore(AdaptyUIView view, AdaptyProfile profile)
+ void paywallViewDidFinishRestore(AdaptyUIPaywallView view, AdaptyProfile profile)

- void paywallViewDidFailRestore(AdaptyUIView view, AdaptyError error)
+ void paywallViewDidFailRestore(AdaptyUIPaywallView view, AdaptyError error)

- void paywallViewDidFailLoadingProducts(AdaptyUIView view, AdaptyIOSProductsFetchPolicy? fetchPolicy, AdaptyError error)
+ void paywallViewDidFailLoadingProducts(AdaptyUIPaywallView view, AdaptyIOSProductsFetchPolicy? fetchPolicy, AdaptyError error)

- void paywallViewDidFailRendering(AdaptyUIView view, AdaptyError error)
+ void paywallViewDidFailRendering(AdaptyUIPaywallView view, AdaptyError error)
```
