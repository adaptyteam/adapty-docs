---
title: "Report transactions in Observer Mode in Capacitor SDK"
description: "Report purchase transactions in Adapty Observer Mode for user insights and revenue tracking in Capacitor SDK."
metadataTitle: "Reporting Transactions in Observer Mode in Capacitor SDK | Adapty Docs"
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

In Observer mode, the Adapty SDK can't track purchases made through your existing purchase system on its own. You need to report transactions from your app store. It's crucial to set this up **before** releasing your app to avoid errors in analytics.

Use `reportTransaction` to explicitly report each transaction for Adapty to recognize it.

:::warning

**Don't skip transaction reporting!**
If you don't call `reportTransaction`, Adapty won't recognize the transaction, it won't appear in analytics, and it won't be sent to integrations.

:::

If you use Adapty paywalls, include the `variationId` when reporting a transaction. This links the purchase to the paywall that triggered it, ensuring accurate paywall analytics.

```typescript showLineNumbers
import { adapty } from '@adapty/capacitor';

const variationId = paywall.variationId;

try {
  await adapty.reportTransaction({ 
    transactionId: 'your_transaction_id',
    variationId: variationId 
  });
} catch (error) {
  console.error('Failed to report transaction:', error);
}
```

Parameters:

| Parameter     | Presence | Description                                                  |
| ------------- | -------- | ------------------------------------------------------------ |
| **transactionId** | required | <ul><li> For iOS: Identifier of the transaction.</li><li> For Android: String identifier (`purchase.getOrderId`) of the purchase, where the purchase is an instance of the billing library [Purchase](https://developer.android.com/reference/com/android/billingclient/api/Purchase) class.</li></ul> |
| **variationId**   | optional | The string identifier of the variation. You can get it using `variationId` property of the [AdaptyPaywall](https://capacitor.adapty.io/interfaces/adaptypaywall) object. | 
