---
title: "Migration guide to Adapty SDK v.3.4"
description: "Migrate to Adapty SDK v3.4 for better performance and new monetization features."
metadataTitle: "Migrating to Adapty SDK v3.4 | Adapty Docs"
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem'; 

Adapty SDK 3.4.0 is a major release that introduces improvements that require migration steps on your end.

<Tabs groupId="current-os" queryString> 

<TabItem value="swift" label="Swift" default>

**Update Adapty SDK activation**

```diff showLineNumbers
// In your AppDelegate class:
import Adapty

let configurationBuilder =
    AdaptyConfiguration
        .builder(withAPIKey: "PUBLIC_SDK_KEY")

- Adapty.activate(with: configurationBuilder) { error in
+ Adapty.activate(with: configurationBuilder.build()) { error in
  // handle the error
}
```
**Update fallback paywall files**

Update your fallback paywall files to ensure compatibility with the new SDK version:

1. [Download the updated fallback paywall files](fallback-paywalls#download-fallback-paywalls-as-a-file-in-the-adapty-dashboard) from the Adapty Dashboard.
2. [Replace the existing fallback paywalls in your mobile app](ios-use-fallback-paywalls) with the new files.
</TabItem>
<TabItem value="swiftui" label="SwiftUI" default>

**Update Adapty SDK activation**

```diff showLineNumbers
import Adapty

@main
struct SampleApp: App {
    init() {
      let configurationBuilder =
        AdaptyConfiguration
          .builder(withAPIKey: "PUBLIC_SDK_KEY")
      
        Task {
-            try await Adapty.activate(with: configurationBuilder)
+            try await Adapty.activate(with: configurationBuilder.build())
        }
    }

    var body: some Scene {
        WindowGroup {
            ContentView()
        }
    }
}
```

**Update fallback paywall files**

Update your fallback paywall files to ensure compatibility with the new SDK version:

1. [Download the updated fallback paywall files](fallback-paywalls#download-fallback-paywalls-as-a-file-in-the-adapty-dashboard) from the Adapty Dashboard.
2. [Replace the existing fallback paywalls in your mobile app](ios-use-fallback-paywalls) with the new files.
</TabItem>

<TabItem value="kotlin" label="Kotlin" default> 

**Update fallback paywall files**

Update your fallback paywall files to ensure compatibility with the new SDK version:

1. [Download the updated fallback paywall files](fallback-paywalls#download-fallback-paywalls-as-a-file-in-the-adapty-dashboard) from the Adapty Dashboard.
2. [Replace the existing fallback paywalls in your mobile app](ios-use-fallback-paywalls) with the new files.

**Update implementation of Observer Mode**

If you're using Observer Mode, make sure to update its implementation.

In previous versions, you had to restore purchases so Adapty could recognize transactions made through your own infrastructure, as Adapty had no direct access to them in Observer Mode. If you used paywalls, you also needed to manually associate each transaction with the paywall that initiated it.

In the new version, you must explicitly report each transaction for Adapty to recognize it. If you use paywalls, you also need to pass the variation ID to link the transaction to the paywall used.

:::warning

**Don't skip transaction reporting!**
If you don't call `reportTransaction`, Adapty won't recognize the transaction, it won’t appear in analytics, and it won’t be sent to integrations.

:::


```diff showLineNumbers
- Adapty.restorePurchases { result ->
-     if (result is AdaptyResult.Success) {
-         // success
-     }
- }
- 
- Adapty.setVariationId(transactionId, variationId) { error ->
-     if (error == null) {
-         // success
-     }
- }

+ val transactionInfo = TransactionInfo.fromPurchase(purchase)
+ 
+ Adapty.reportTransaction(transactionInfo, variationId) { result ->
+     if (result is AdaptyResult.Success) {
+         // success
+     }
+ }
```

</TabItem> 

<TabItem value="java" label="Java" default> 

**Update fallback paywall files**

Update your fallback paywall files to ensure compatibility with the new SDK version:

1. [Download the updated fallback paywall files](fallback-paywalls#download-fallback-paywalls-as-a-file-in-the-adapty-dashboard) from the Adapty Dashboard.
2. [Replace the existing fallback paywalls in your mobile app](ios-use-fallback-paywalls) with the new files.

**Update implementation of Observer Mode**

If you're using Observer Mode, make sure to update its implementation.

In previous versions, you had to restore purchases so Adapty could recognize transactions made through your own infrastructure. If you used paywalls, you also needed to manually associate each transaction with the paywall that initiated it.

In the new version, you must explicitly report each transaction for Adapty to recognize it. If you use paywalls, you also need to pass the variation ID to link the transaction to the paywall used.

:::warning

**Don't skip transaction reporting!**
If you don't call `reportTransaction`, Adapty won't recognize the transaction, it won’t appear in analytics, and it won’t be sent to integrations.

:::

```diff showLineNumbers
- Adapty.restorePurchases(result -> {
-     if (result instanceof AdaptyResult.Success) {
-         // success
-     }
- });
- 
- Adapty.setVariationId(transactionId, variationId, error -> {
-     if (error == null) {
-         // success
-     }
- });

+ TransactionInfo transactionInfo = TransactionInfo.fromPurchase(purchase);
+ 
+ Adapty.reportTransaction(transactionInfo, variationId, result -> {
+     if (result instanceof AdaptyResult.Success) {
+         // success
+     }
+ });
```

</TabItem>

<TabItem value="flutter" label="Flutter" default> 

**Update fallback paywall files**

Update your fallback paywall files to ensure compatibility with the new SDK version:

1. [Download the updated fallback paywall files](fallback-paywalls#download-fallback-paywalls-as-a-file-in-the-adapty-dashboard) from the Adapty Dashboard.
2. [Replace the existing fallback paywalls in your mobile app](ios-use-fallback-paywalls) with the new files.

**Update implementation of Observer Mode**

If you're using Observer Mode, make sure to update its implementation.

Previously, different methods were used to report transactions to Adapty. In the new version, the `reportTransaction` method should be used consistently across both Android and iOS. This method explicitly reports each transaction to Adapty, ensuring it's recognized. If a paywall was used, pass the variation ID to link the transaction to it.

:::warning

**Don't skip transaction reporting!**
If you don't call `reportTransaction`, Adapty won't recognize the transaction, it won’t appear in analytics, and it won’t be sent to integrations.

:::

```diff showLineNumbers
- // every time when calling transaction.finish()
- if (Platform.isAndroid) {
-     try {
-         await Adapty().restorePurchases();
-     } on AdaptyError catch (adaptyError) {
-         // handle the error
-     } catch (e) {
-     }
- }

  try {
      // every time when calling transaction.finish()
      await Adapty().reportTransaction(
          "YOUR_TRANSACTION_ID", 
          variationId: "PAYWALL_VARIATION_ID", // optional
      );
  } on AdaptyError catch (adaptyError) {
      // handle the error
  } catch (e) {
      // handle the error
  }
```

 

</TabItem>

<TabItem value="rn" label="React Native (TS)" default>

**Update fallback paywall files**

Update your fallback paywall files to ensure compatibility with the new SDK version:

1. [Download the updated fallback paywall files](fallback-paywalls#download-fallback-paywalls-as-a-file-in-the-adapty-dashboard) from the Adapty Dashboard.
2. [Replace the existing fallback paywalls in your mobile app](ios-use-fallback-paywalls) with the new files.

**Update implementation of Observer Mode**

If you're using Observer Mode, make sure to update its implementation.

Previously, different methods were used to report transactions to Adapty. In the new version, the `reportTransaction` method should be used consistently across both Android and iOS. This method explicitly reports each transaction to Adapty, ensuring it's recognized. If a paywall was used, pass the variation ID to link the transaction to it.

:::warning

**Don't skip transaction reporting!**
If you don't call `reportTransaction`, Adapty won't recognize the transaction, it won’t appear in analytics, and it won’t be sent to integrations.

:::

 ```diff showLineNumbers 
 - if (Platform.OS === 'android') {
 -     try {
 -         await adapty.restorePurchases();
 -     } catch (error) {
 -         // handle the error
 -     }
 - }
 
  const variationId = paywall.variationId;
 
  try {
      await adapty.reportTransaction(transactionId, variationId);
  } catch (error) {
      // handle the `AdaptyError`
  }
  
 ```

</TabItem>

</Tabs>

