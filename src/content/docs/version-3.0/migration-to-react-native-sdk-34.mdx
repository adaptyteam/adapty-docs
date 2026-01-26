---
title: "Migrate Adapty React Native SDK to v. 3.4"
description: "Migrate to Adapty React Native SDK v3.4 for better performance and new monetization features."
metadataTitle: "Migrating to Adapty React Native SDK v3.4 | Adapty Docs"
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem'; 

Adapty SDK 3.4.0 is a major release that introduces improvements that require migration steps on your end.

## Update fallback paywall files

Update your fallback paywall files to ensure compatibility with the new SDK version:

1. [Download the updated fallback paywall files](fallback-paywalls#download-fallback-paywalls-as-a-file-in-the-adapty-dashboard) from the Adapty Dashboard.
2. [Replace the existing fallback paywalls in your mobile app](react-native-use-fallback-paywalls) with the new files.

## Update implementation of Observer Mode

If you're using Observer Mode, make sure to update its implementation.

Previously, different methods were used to report transactions to Adapty. In the new version, the `reportTransaction` method should be used consistently across both Android and iOS. This method explicitly reports each transaction to Adapty, ensuring it's recognized. If a paywall was used, pass the variation ID to link the transaction to it.

:::warning

**Don't skip transaction reporting!**
If you don't call `reportTransaction`, Adapty won't recognize the transaction, it won't appear in analytics, and it won't be sent to integrations.

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