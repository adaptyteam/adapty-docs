---
title: "Migration guide to iOS Adapty SDK v.3.4"
description: "Migrate to Adapty SDK v3.4 for better performance and new monetization features."
metadataTitle: "Migrating to Adapty SDK v3.4 | Adapty Docs"
---

Adapty SDK 3.4.0 is a major release that introduces improvements that require migration steps on your end.

<Tabs groupId="current-os" queryString> 

<TabItem value="swift" label="iOS" default> 

No changes are needed in your mobile app code. However, you must update your fallback paywall files to ensure compatibility with the new SDK version:

1. [Download the updated fallback paywall files](fallback-paywalls#download-fallback-paywalls-as-a-file-in-the-adapty-dashboard) from the Adapty Dashboard.
2. [Replace the existing fallback paywalls in your mobile app](ios-use-fallback-paywalls) with the new files.

 </TabItem> 

<TabItem value="kotlin" label="Android" default> Text </TabItem>

**Update fallback paywall files**

Update your fallback paywall files to ensure compatibility with the new SDK version:

1. [Download the updated fallback paywall files](fallback-paywalls#download-fallback-paywalls-as-a-file-in-the-adapty-dashboard) from the Adapty Dashboard.
2. [Replace the existing fallback paywalls in your mobile app](android-use-fallback-paywalls) with the new files.

**Update implementation of Observer Mode**

If you use Observer mode, update its implementation. 

In previous versions, you were to restore purchases for Adapty to learn about transactions that were made through your own infrastructure, as Adapty knows nothing about your transactions in the Observer mode. After that, if you use paywalls, you were to assiciate the made transction with the paywalls used to start it.

In new version, you need to explicitelly report the made transaction for Adapty to learn aboout it. If you use paywalls, additionally pass the variation ID for Adapty to associate the transaction with the used paywall.

:::warning

**Don't skip transaction reporting!**
If you don't call `restorePurchases`, Adapty won't recognize the transaction, it won’t appear in analytics, and it won’t be sent to integrations. 

:::

<Tabs groupId="current-os" queryString> 
<TabItem value="kotlin" label="Kotlin" default> 

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

+ Adapty.reportTransaction(TransactionInfo.fromPurchase(purchase), variationId) { result ->
+     if (result is AdaptyResult.Success) {
+         // success
+     }
+ }
```

</TabItem> 

<TabItem value="java" label="Java" default> 

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

+ Adapty.reportTransaction(TransactionInfo.fromId(transactionId), variationId, result -> {
+     if (result instanceof AdaptyResult.Success) {
+         // success
+     }
+ });
```

</TabItem> 

</Tabs>

</Tabs>