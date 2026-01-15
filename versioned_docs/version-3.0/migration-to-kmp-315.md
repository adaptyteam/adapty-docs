---
title: "Migration guide to Adapty Kotlin Multiplatform SDK 3.15.0"
description: "Migration steps for Adapty Kotlin Multiplatform SDK 3.15.0"
metadataTitle: "Migration to Adapty KMP SDK 3.15.0 | Adapty Docs"
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Adapty Kotlin Multiplatform SDK 3.15.0 is a major release that brings new features and improvements which, however, may require some migration steps from you.

1. Update the observer class and method names.
2. Update the fallback paywalls method name.
3. Update the view class name in event handling methods.

## Update observer class and method names

The observer class and its registration method have been renamed:

```diff
import com.adapty.kmp.AdaptyUI
- import com.adapty.kmp.AdaptyUIObserver
+ import com.adapty.kmp.AdaptyUIPaywallsEventsObserver
import com.adapty.kmp.models.AdaptyUIAction
- import com.adapty.kmp.models.AdaptyUIView
+ import com.adapty.kmp.models.AdaptyUIPaywallView

- class MyAdaptyUIObserver : AdaptyUIObserver {
-    override fun paywallViewDidPerformAction(view: AdaptyUIView, action: AdaptyUIAction) {
+ class MyAdaptyUIPaywallsEventsObserver : AdaptyUIPaywallsEventsObserver {
+    override fun paywallViewDidPerformAction(view: AdaptyUIPaywallView, action: AdaptyUIAction) {
        // handle actions
    }
}

// Set up the observer
- AdaptyUI.setObserver(MyAdaptyUIObserver())
+ AdaptyUI.setPaywallsEventsObserver(MyAdaptyUIPaywallsEventsObserver())
```

## Update fallback paywalls method name

The method name for setting fallback paywalls has been changed:

```diff showLineNumbers
import com.adapty.kmp.Adapty

- Adapty.setFallbackPaywalls(assetId = "fallback.json")
+ Adapty.setFallback(assetId = "fallback.json")
    .onSuccess { 
        // Fallback paywalls loaded successfully
    }
    .onError { error ->
        // Handle the error
    }
```

## Update view class name in event handling methods

All event handling methods now use the new `AdaptyUIPaywallView` class instead of `AdaptyUIView`:

```diff
- override fun paywallViewDidAppear(view: AdaptyUIView) {
+ override fun paywallViewDidAppear(view: AdaptyUIPaywallView) {
    // Handle paywall appearance
}

- override fun paywallViewDidDisappear(view: AdaptyUIView) {
+ override fun paywallViewDidDisappear(view: AdaptyUIPaywallView) {
    // Handle paywall disappearance
}

- override fun paywallViewDidSelectProduct(view: AdaptyUIPaywallView, productId: String) {
+ override fun paywallViewDidSelectProduct(view: AdaptyUIView, productId: String) {
    // Handle product selection
}

- override fun paywallViewDidStartPurchase(view: AdaptyUIView, product: AdaptyPaywallProduct) {
+ override fun paywallViewDidStartPurchase(view: AdaptyUIPaywallView, product: AdaptyPaywallProduct) {
    // Handle purchase start
}

- override fun paywallViewDidFinishPurchase(view: AdaptyUIView, product: AdaptyPaywallProduct, purchaseResult: AdaptyPurchaseResult) {
+ override fun paywallViewDidFinishPurchase(view: AdaptyUIPaywallView, product: AdaptyPaywallProduct, purchaseResult: AdaptyPurchaseResult) {
    // Handle purchase result
}

- override fun paywallViewDidFailPurchase(view: AdaptyUIView, product: AdaptyPaywallProduct, error: AdaptyError) {
+ override fun paywallViewDidFailPurchase(view: AdaptyUIPaywallView, product: AdaptyPaywallProduct, error: AdaptyError) {
    // Add your purchase failure handling logic here
}

- override fun paywallViewDidFinishRestore(view: AdaptyUIView, profile: AdaptyProfile) {
+ override fun paywallViewDidFinishRestore(view: AdaptyUIPaywallView, profile: AdaptyProfile) {
    // Add your successful restore handling logic here
}

- override fun paywallViewDidFailRestore(view: AdaptyUIView, error: AdaptyError) {
+ override fun paywallViewDidFailRestore(view: AdaptyUIPaywallView, error: AdaptyError) {
    // Add your restore failure handling logic here
}

- override fun paywallViewDidFinishWebPaymentNavigation(view: AdaptyUIView, product: AdaptyPaywallProduct?, error: AdaptyError?) {
+ override fun paywallViewDidFinishWebPaymentNavigation(view: AdaptyUIPaywallView, product: AdaptyPaywallProduct?, error: AdaptyError?) {
    // Handle web payment navigation result
}

- override fun paywallViewDidFailLoadingProducts(view: AdaptyUIView, error: AdaptyError) {
+ override fun paywallViewDidFailLoadingProducts(view: AdaptyUIPaywallView, error: AdaptyError) {
    // Add your product loading failure handling logic here
}

- override fun paywallViewDidFailRendering(view: AdaptyUIView, error: AdaptyError) {
+ override fun paywallViewDidFailRendering(view: AdaptyUIPaywallView, error: AdaptyError) {
    // Handle rendering error
}
```