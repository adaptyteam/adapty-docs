---
title: "Migrate Adapty Android SDK to v. 3.4"
description: "Migrate to Adapty Android SDK v3.4 for better performance and new monetization features."
metadataTitle: "Migrating to Adapty Android SDK v3.4 | Adapty Docs"
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem'; 

Adapty SDK 3.4.0 is a major release that introduces improvements that require migration steps on your end.

## Update fallback paywall files

Update your fallback paywall files to ensure compatibility with the new SDK version:

1. [Download the updated fallback paywall files](fallback-paywalls#download-fallback-paywalls-as-a-file-in-the-adapty-dashboard) from the Adapty Dashboard.
2. [Replace the existing fallback paywalls in your mobile app](android-use-fallback-paywalls) with the new files.

## Update implementation of Observer Mode

If you're using Observer Mode, make sure to update its implementation.

In previous versions, you had to restore purchases so Adapty could recognize transactions made through your own infrastructure, as Adapty had no direct access to them in Observer Mode. If you used paywalls, you also needed to manually associate each transaction with the paywall that initiated it.

In the new version, you must explicitly report each transaction for Adapty to recognize it. If you use paywalls, you also need to pass the variation ID to link the transaction to the paywall used.

:::warning

**Don't skip transaction reporting!**
If you don't call `reportTransaction`, Adapty won't recognize the transaction, it won't appear in analytics, and it won't be sent to integrations.

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
</Tabs> 