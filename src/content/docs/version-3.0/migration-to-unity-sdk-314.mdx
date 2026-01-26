---
title: "Migrate Adapty Unity SDK to v. 3.14"
description: "Migrate to Adapty Unity SDK v3.14 for better performance and new monetization features."
metadataTitle: "Migrating to Adapty Unity SDK v3.14 | Adapty Docs"
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem'; 

Adapty SDK 3.14.0 is a major release that brought some improvements that however may require some migration steps from you:

1. Separate event listener for paywall events.
2. Rename `AdaptyUI.CreateView` to `AdaptyUI.CreatePaywallView` and related methods.
3. Update the `MakePurchase` method to use `AdaptyPurchaseParameters` instead of individual parameters.
4. Replace `SetFallbackPaywalls` with `SetFallback` method.
5. Update paywall property access to use `AdaptyPlacement`.
6. Update remote config access to use `AdaptyRemoteConfig` object.
7. Replace `VendorProductIds` with `ProductIdentifiers` in the `AdaptyPaywall` model.
8. Update `GetPaywall` fetch policy to use `AdaptyFetchPolicy`.

## Separate event listener for paywall events

If you display paywalls designed with the [Paywall Builder](adapty-paywall-builder), paywall view events now use the dedicated `AdaptyPaywallsEventsListener` interface and `SetPaywallsEventsListener` method. The core `AdaptyEventListener` interface remains for profile updates and installation details.

```diff showLineNumbers
using UnityEngine;
using AdaptySDK;

public class AdaptyListener : MonoBehaviour, 
-    AdaptyEventListener {
+    AdaptyEventListener,
+    AdaptyPaywallsEventsListener {
    
    void Start() {
        Adapty.SetEventListener(this);
+       Adapty.SetPaywallsEventsListener(this);
    }
    
    // AdaptyEventListener methods
    public void OnLoadLatestProfile(AdaptyProfile profile) { }
    public void OnInstallationDetailsSuccess(AdaptyInstallationDetails details) { }
    public void OnInstallationDetailsFail(AdaptyError error) { }
    
+   // AdaptyPaywallsEventsListener methods
+   // Implement paywall event handlers here
}
```

[Learn more about handling paywall events](unity-handling-events).

## Rename view creation and presentation methods

The view creation and presentation methods have been renamed:

```diff showLineNumbers
using AdaptySDK;

- AdaptyUI.CreateView(paywall, parameters, (view, error) => {
+ AdaptyUI.CreatePaywallView(paywall, parameters, (view, error) => {
    if (error != null) {
      // handle the error
      return;
    }

-   AdaptyUI.PresentView(view, (error) => {
+   AdaptyUI.PresentPaywallView(view, (error) => {
      // handle the error
    });
  });
}
```

Similarly, the dismiss method has been renamed:

```diff showLineNumbers
- AdaptyUI.DismissView(view, (error) => {
+ AdaptyUI.DismissPaywallView(view, (error) => {
    // handle the error
  });
```

## Update MakePurchase method

The `MakePurchase` method now uses `AdaptyPurchaseParameters` instead of individual `subscriptionUpdateParams` and `isOfferPersonalized` arguments. This provides better type safety and allows for future extensibility of purchase parameters.

```diff showLineNumbers
using AdaptySDK;

void MakePurchase(
  AdaptyPaywallProduct product,
  AdaptySubscriptionUpdateParameters subscriptionUpdate,
  bool? isOfferPersonalized
) {
-  Adapty.MakePurchase(product, subscriptionUpdate, isOfferPersonalized, (result, error) => {
+  var parameters = new AdaptyPurchaseParametersBuilder()
+    .SetSubscriptionUpdateParams(subscriptionUpdate)
+    .SetIsOfferPersonalized(isOfferPersonalized)
+    .Build();
+
+  Adapty.MakePurchase(product, parameters, (result, error) => {
    switch (result.Type) {
      case AdaptyPurchaseResultType.Pending:
        // handle pending purchase
        break;
      case AdaptyPurchaseResultType.UserCancelled:
        // handle purchase cancellation
        break;
      case AdaptyPurchaseResultType.Success:
        var profile = result.Profile;
        // handle successful purchase
        break;
      default:
        break;
    }
  });
}
```

If no additional parameters are needed, you can simply use:

```csharp showLineNumbers
using AdaptySDK;

void MakePurchase(AdaptyPaywallProduct product) {
  Adapty.MakePurchase(product, (result, error) => {
    // handle purchase result
  });
}
```

## Update fallback method

:::important
When upgrading to Unity SDK 3.14, you’ll need to download the new fallback files from the Adapty dashboard and replace the existing ones in your project.
:::

The method for setting fallbacks has been updated. The `SetFallbackPaywalls` method has been renamed to `SetFallback`:

```diff showLineNumbers
using AdaptySDK;

void SetFallBackPaywalls() {
  #if UNITY_IOS
    var assetId = "adapty_fallback_ios.json";
  #elif UNITY_ANDROID
    var assetId = "adapty_fallback_android.json";
  #else
    var assetId = "";
  #endif

-  Adapty.SetFallbackPaywalls(assetId, (error) => {
+  Adapty.SetFallback(assetId, (error) => {
    // handle the error
  });
}
```

Check out the final code example in the [Use fallback paywalls in Unity](unity-use-fallback-paywalls) page.

## Update paywall property access

The following properties have been moved from `AdaptyPaywall` to `AdaptyPlacement`:

```diff showLineNumbers
using AdaptySDK;

void ProcessPaywall(AdaptyPaywall paywall) {
-  var abTestName = paywall.ABTestName;
-  var audienceName = paywall.AudienceName;
-  var revision = paywall.Revision;
-  var placementId = paywall.PlacementId;

+  var abTestName = paywall.Placement.ABTestName;
+  var audienceName = paywall.Placement.AudienceName;
+  var revision = paywall.Placement.Revision;
+  var placementId = paywall.Placement.Id;
}
```

## Update remote config access

The remote config properties have been restructured into an `AdaptyRemoteConfig` object for better organization:

```diff showLineNumbers
using AdaptySDK;

void ProcessRemoteConfig(AdaptyPaywall paywall) {
-  var remoteConfigString = paywall.RemoteConfigString;
-  var locale = paywall.Locale;
-  var remoteConfigDict = paywall.RemoteConfig;

+  var remoteConfigString = paywall.RemoteConfig.Data;
+  var locale = paywall.RemoteConfig.Locale;
+  var remoteConfigDict = paywall.RemoteConfig.Dictionary;
}
```

## Update AdaptyPaywall model usage

The `VendorProductIds` property has been deprecated in favor of `ProductIdentifiers`. The new property returns `AdaptyProductIdentifier` objects instead of simple strings, providing more structured product information.

```diff showLineNumbers
using AdaptySDK;

void ProcessPaywallProducts(AdaptyPaywall paywall) {
-  var productIds = paywall.VendorProductIds;
-  foreach (var vendorId in productIds) {
-    // use vendorId
-  }

+  var productIdentifiers = paywall.ProductIdentifiers;
+  foreach (var productId in productIdentifiers) {
+    var vendorId = productId.VendorProductId;
+    // use vendorId
+  }
}
```

The `AdaptyProductIdentifier` object provides access to the vendor product ID through the `VendorProductId` property, maintaining the same functionality while offering better structure for future enhancements.

## Update GetPaywall fetch policy

The `fetchPolicy` parameter type in the `GetPaywall` method has been changed from `AdaptyPaywallFetchPolicy` to `AdaptyPlacementFetchPolicy`. This change unifies the fetch policy usage across the SDK.

```diff showLineNumbers
using AdaptySDK;

void GetPaywall(string placementId) {
-  Adapty.GetPaywall(placementId, AdaptyPaywallFetchPolicy.ReloadRevalidatingCacheData, null, (paywall, error) => {
+  Adapty.GetPaywall(placementId, AdaptyPlacementFetchPolicy.ReloadRevalidatingCacheData, null, (paywall, error) => {
    // handle the result
  });
}
```
