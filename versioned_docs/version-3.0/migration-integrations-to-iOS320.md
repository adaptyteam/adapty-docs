---
title: "Migration guide to Adapty iOS SDK 3.2.x"
description: ""
metadataTitle: ""
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem'; 

Adapty iOS SDK 3.2.0 is a major release that brought some improvements which however may require some migration steps from you.

1. Rename `Adapty.Configuration` to `AdaptyConfiguration`.
2. Rename the `getViewConfiguration` method to `getPaywallConfiguration`.
3. Remove several paywall builder events.
4. Update how you handle promotional in-app purchases from the App Store (remove the `defermentCompletion` parameter from the `AdaptyDelegate` method)
5. Remove the `getProductsIntroductoryOfferEligibility` method
6. Update integration configuration: [Adjust](migration-integrations-to-iOS320#adjust), [Appsflyer](migration-integrations-to-iOS320#appsflyer), [Branch](migration-integrations-to-iOS320#branch)

## Rename Adapty.Configuration to AdaptyConfiguration

Update the code of Adapty iOS SDK activation in the following way:

<Tabs>
<TabItem value="Swift" label="Swift" default>

```diff
// In your AppDelegate class:
import Adapty

let configurationBuilder =
-        Adapty.Configuration
+        AdaptyConfiguration
          .Builder(withAPIKey: "PUBLIC_SDK_KEY")
          .with(observerMode: false)
          .with(customerUserId: "YOUR_USER_ID")
          .with(idfaCollectionDisabled: false)
          .with(ipAddressCollectionDisabled: false)

Adapty.activate(with: configurationBuilder) { error in
  // handle the error
}
```

</TabItem>
<TabItem value="SwiftUI" label="SwiftUI" default>

```diff
import Adapty

@main
struct SampleApp: App {
    init() 
      let configurationBuilder =
-        Adapty.Configuration
+        AdaptyConfiguration
          .Builder(withAPIKey: "PUBLIC_SDK_KEY")
          .with(observerMode: false) // optional
          .with(customerUserId: "YOUR_USER_ID") // optional
          .with(idfaCollectionDisabled: false) // optional
          .with(ipAddressCollectionDisabled: false) // optional

        Task {
            try await Adapty.activate(with: configurationBuilder)
        }
    }

    var body: some Scene {
        WindowGroup {
            ContentView()
        }
    }
}
```

</TabItem>
</Tabs>

## Rename getViewConfiguration method to getPaywallConfiguration

Update the method name to fetch the paywall's `viewConfiguration`:

```diff
import Adapty
import AdaptyUI

guard paywall.hasViewConfiguration else {
    //  use your custom logic
    return
}

do {
-    let paywallConfiguration = try await AdaptyUI.getViewConfiguration(
+    let paywallConfiguration = try await AdaptyUI.getPaywallConfiguration(
            forPaywall: paywall
    )
    // use loaded configuration
} catch {
    // handle the error
}
```

For more details about the method, check out [Fetch the view configuration of paywall designed using Paywall Builder](get-pb-paywalls#fetch-the-view-configuration-of-paywall-designed-using-paywall-builder)..



## Remove some paywall builder events



## Update handling of promotional in-app purchases from App Store

Update how you handle promotional in-app purchases from the App Store by removing the `defermentCompletion` parameter from the `AdaptyDelegate` method, as shown in the example below:

```swift title="Swift"
final class YourAdaptyDelegateImplementation: AdaptyDelegate {
    nonisolated func shouldAddStorePayment(for product: AdaptyDeferredProduct) -> Bool {
        // 1a.
        // Return `true` to continue the transaction in your app.

        // 1b.
        // Store the product object and return `false` to defer or cancel the transaction.
        false
    }
    
    // 2. Continue the deferred purchase later on by passing the product to `makePurchase`
    func continueDeferredPurchase() async {
        let storedProduct: AdaptyDeferredProduct = // get the product object from the 1b.
        do {
            try await Adapty.makePurchase(product: storedProduct)
        } catch {
            // handle the error
        }
    }
}
```



## Remove getProductsIntroductoryOfferEligibility method

Before Adapty iOS SDK 3.2.0, the product object always included offers, regardless of whether the user was eligible. You had to manually check eligibility before using the offer.

Now, the product object only includes an offer if the user is eligible. This means you no longer need to check eligibility—if an offer is present, the user is eligible.

If you still want to view offers for users who are not eligible, refer to `sk1Product` and `sk2Product`.

## Update 3d-party integration SDK configuration

Starting with Adapty iOS SDK 3.2.0, we’ve updated the public API for the `updateAttribution` method. Previously, it accepted a `[AnyHashable: Any]` dictionary, allowing you to pass attribution objects directly from various services. Now, it requires a `[String: any Sendable]`, so you’ll need to convert attribution objects before passing them.

To ensure integrations work properly with Adapty iOS SDK 3.2.0 and later, update your SDK configurations for the following integrations as described:

- [Adjust](migration-integrations-to-iOS320#adjust)
- [Appsflyer](migration-integrations-to-iOS320#appsflyer)
- [Branch](migration-integrations-to-iOS320#branch)

### Adjust

Update your mobile app code in the following way. The final code example you can find the in the [SDK configuration for Adjust integration](adjust#sdk-configuration).

<Tabs>

<TabItem value="v5" label="Adjust 5.x+" default>

For Adjust version 5.0 or later, use the following:

```diff
class AdjustModuleImplementation {
    func updateAdjustAttribution() {
        Adjust.attribution { attribution in
-            guard let attributionDictionary = attribution?.dictionary() else { return }
+            guard let attributionDictionary = attribution?.dictionary()?.toSendableDict() else { return }

            Adjust.adid { adid in
                guard let adid else { return }

                Adapty.updateAttribution(attributionDictionary, source: .adjust, networkUserId: adid) { error in
                    // handle the error
                }
            }
        }
    }
}

+ extension [AnyHashable: Any] {
+    func toSendableDict() -> [String: any Sendable] {
+       var result = [String: any Sendable]()
+
+        for (key, value) in self {
+            guard let stringKey = key as? String else { continue }
+
+            switch value {
+            case let boolValue as Bool:
+                result[stringKey] = boolValue
+            case let stringValue as String:
+                result[stringKey] = stringValue
+            case let stringArrayValue as [String]:
+                result[stringKey] = stringArrayValue
+            case let intValue as Int:
+                result[stringKey] = intValue
+            case let intArrayValue as [Int]:
+                result[stringKey] = intArrayValue
+            case let dictValue as [AnyHashable: Any]:
+                result[stringKey] = dictValue.toSendableDict()
+            default:
+                break
+            }
+        }
+
+        return result
+    }
+}
```

</TabItem>

<TabItem value="v4" label="Adjust 4.x" default>

For Adjust version 4.x or earlier, use the following:

```diff
class YourAdjustDelegateImplementation {
    // Find your implementation of AdjustDelegate 
    // and update adjustAttributionChanged method:
    func adjustAttributionChanged(_ attribution: ADJAttribution?) {
-       if let attribution = attribution?.dictionary() {
+       if let attribution = attribution?.dictionary()?.toSendableDict() {
	        Adapty.updateAttribution(attribution, source: .adjust)
        }
    }
}

+ extension [AnyHashable: Any] {
+    func toSendableDict() -> [String: any Sendable] {
+        var result = [String: any Sendable]()
+
+        for (key, value) in self {
+            guard let stringKey = key as? String else { continue }
+
+            switch value {
+            case let boolValue as Bool:
+                result[stringKey] = boolValue
+            case let stringValue as String:
+                result[stringKey] = stringValue
+            case let stringArrayValue as [String]:
+                result[stringKey] = stringArrayValue
+            case let intValue as Int:
+                result[stringKey] = intValue
+            case let intArrayValue as [Int]:
+                result[stringKey] = intArrayValue
+            case let dictValue as [AnyHashable: Any]:
+                result[stringKey] = dictValue.toSendableDict()
+            default:
+                break
+            }
+       }
+
+        return result
+    }
+}
```

</TabItem>
</Tabs>

### AppsFlyer

Update your mobile app code in the following way. The final code example you can find the in the [SDK configuration for AppsFlyer integration](appsflyer#sdk-configuration).

```diff
class YourAppsFlyerLibDelegateImplementation {
    // Find your implementation of AppsFlyerLibDelegate 
    // and update onConversionDataSuccess method:
    func onConversionDataSuccess(_ conversionInfo: [AnyHashable : Any]) {
        // It's important to include the network user ID
        let networkUserId = AppsFlyerLib.shared().getAppsFlyerUID()

        Adapty.updateAttribution(
-           conversionInfo,
+           conversionInfo.toSendableDict(),
            source: .appsflyer,
            networkUserId: networkUserId
        )
    }
}

+ extension [AnyHashable: Any] {
+    func toSendableDict() -> [String: any Sendable] {
+        var result = [String: any Sendable]()
+
+        for (key, value) in self {
+            guard let stringKey = key as? String else { continue }
+
+            switch value {
+            case let boolValue as Bool:
+                result[stringKey] = boolValue
+            case let stringValue as String:
+                result[stringKey] = stringValue
+            case let stringArrayValue as [String]:
+                result[stringKey] = stringArrayValue
+            case let intValue as Int:
+                result[stringKey] = intValue
+            case let intArrayValue as [Int]:
+                result[stringKey] = intArrayValue
+            case let dictValue as [AnyHashable: Any]:
+                result[stringKey] = dictValue.toSendableDict()
+            default:
+                break
+            }
+        }
+
+        return result
+    }
}
```

### Branch

Update your mobile app code in the following way. The final code example you can find the in the [SDK configuration for Branch integration](branch#sdk-configuration).

```diff
class YourBranchImplementation {
    func initializeBranch() {
        // Pass the attribution you receive from the initializing method of Branch iOS SDK to Adapty.
        Branch.getInstance().initSession(launchOptions: launchOptions) { (data, error) in
-               if let data = data {
+               if let data = data?.toSendableDict() {
                    Adapty.updateAttribution(data, source: .branch)
                }
            }
        }
    }
}

+ extension [AnyHashable: Any] {
+    func toSendableDict() -> [String: any Sendable] {
+        var result = [String: any Sendable]()
+
+        for (key, value) in self {
+            guard let stringKey = key as? String else { continue }
+
+            switch value {
+            case let boolValue as Bool:
+                result[stringKey] = boolValue
+            case let stringValue as String:
+                result[stringKey] = stringValue
+            case let stringArrayValue as [String]:
+                result[stringKey] = stringArrayValue
+            case let intValue as Int:
+                result[stringKey] = intValue
+            case let intArrayValue as [Int]:
+                result[stringKey] = intArrayValue
+            case let dictValue as [AnyHashable: Any]:
+                result[stringKey] = dictValue.toSendableDict()
+            default:
+                break
+            }
+        }
+
+        return result
+    }
+}
```