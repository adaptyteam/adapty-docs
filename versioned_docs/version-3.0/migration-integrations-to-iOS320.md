---
title: "Updating integration configurations for Adapty iOS SDK 3.2.0"
description: ""
metadataTitle: ""
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem'; 

Starting with Adapty iOS SDK 3.2.0, we’ve updated the public API for the `updateAttribution` method. Previously, it accepted a `[AnyHashable: Any]` dictionary, allowing you to pass attribution objects directly from various services. Now, it requires a `[String: any Sendable]`, so you’ll need to convert attribution objects before passing them.

## Update 3d-party integration SDK configuration

To ensure integrations work properly with Adapty iOS SDK 3.2.0 and later, update your SDK configurations for the following integrations as described:

- [Adjust](migration-integrations-to-iOS320#adjust)
- [Appsflyer](migration-integrations-to-iOS320#appsflyer)
- [Branch](migration-integrations-to-iOS320#branch)

## Adjust

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

## AppsFlyer

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

## Branch

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