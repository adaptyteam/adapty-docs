---
title: "Report transactions in Observer Mode in React Native SDK"
description: "Report purchase transactions in Adapty Observer Mode for user insights and revenue tracking in React Native SDK."
metadataTitle: "Reporting Transactions in Observer Mode in React Native SDK | Adapty Docs"
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem'; 


<Tabs groupId="sdk-version" queryString> 

<TabItem value="current" label="Adapty SDK v3.4+ (current)" default> 
In Observer mode, the Adapty SDK can't track purchases made through your existing purchase system on its own. You need to report transactions from your app store. It's crucial to set this up **before** releasing your app to avoid errors in analytics.

Use `reportTransaction` to explicitly report each transaction for Adapty to recognize it.

:::warning

**Don't skip transaction reporting!**
If you don't call `reportTransaction`, Adapty won't recognize the transaction, it won't appear in analytics, and it won't be sent to integrations.

:::

If you use Adapty paywalls, include the `variationId` when reporting a transaction. This links the purchase to the paywall that triggered it, ensuring accurate paywall analytics.

```typescript showLineNumbers
const variationId = paywall.variationId;

try {
    await adapty.reportTransaction(transactionId, variationId);
} catch (error) {
    // handle the `AdaptyError`
}
```

Parameters:

| Parameter     | Presence | Description                                                  |
| ------------- | -------- | ------------------------------------------------------------ |
| transactionId | required | <ul><li> For iOS: Identifier of the transaction.</li><li> For Android: String identifier (`purchase.getOrderId`) of the purchase, where the purchase is an instance of the billing library [Purchase](https://developer.android.com/reference/com/android/billingclient/api/Purchase) class.</li></ul> |
| variationId   | optional | The string identifier of the variation. You can get it using `variationId` property of the [AdaptyPaywall](https://react-native.adapty.io/interfaces/adaptypaywall) object. |

</TabItem>
<TabItem value="old" label="Adapty SDK 3.3.x (legacy)" default> 

In Observer mode, the Adapty SDK can't track purchases made through your existing purchase system on its own. You need to report transactions from your app store or restore them. It's crucial to set this up **before** releasing your app to avoid errors in analytics.

Use `reportTransaction` on both platforms to explicitly report each transaction, and use `restorePurchases` on Android as an additional step to ensure Adapty recognizes it.

:::warning

**Don't skip transaction reporting!**
If you don't call these methods, Adapty won't recognize the transaction, it won't appear in analytics, and it won't be sent to integrations.

:::

If you use Adapty paywalls, include the `variationId` when reporting a transaction. This links the purchase to the paywall that triggered it, ensuring accurate paywall analytics.

```typescript showLineNumbers
if (Platform.OS === 'android') {
    try {
        await adapty.restorePurchases();
    } catch (error) {
        // handle the error
    }
}

...

const variationId = paywall.variationId;

try {
    await adapty.reportTransaction(transactionId, variationId);
} catch (error) {
    // handle the `AdaptyError`
}
```

Parameters:

| Parameter     | Presence | Description                                                  |
| ------------- | -------- | ------------------------------------------------------------ |
| transactionId | required | <ul><li> For iOS, StoreKit 1: an [SKPaymentTransaction](https://developer.apple.com/documentation/storekit/skpaymenttransaction) object.</li><li> For iOS, StoreKit 2: [Transaction](https://developer.apple.com/documentation/storekit/transaction) object.</li><li> For Android: String identifier (`purchase.getOrderId`) of the purchase, where the purchase is an instance of the billing library [Purchase](https://developer.android.com/reference/com/android/billingclient/api/Purchase) class.</li></ul> |
| variationId   | optional | The string identifier of the variation. You can get it using `variationId` property of the [AdaptyPaywall](https://react-native.adapty.io/interfaces/adaptypaywall) object. |

</TabItem>
<TabItem value="old2" label="Adapty SDK up to 3.2.x (legacy)" default> 

<Tabs groupId="current-os" queryString> 
<TabItem value="swift" label="iOS" default> 

**Reporting transactions**

- Versions up to 3.1.x automatically listen for transactions in the App Store, so manual reporting is not required.
- Version 3.2 does not support Observer Mode.

</TabItem> 
<TabItem value="kotlin" label="Android and Android-based cross-platforms" default> 

**Reporting transactions**

Use `restorePurchases` to report a transaction to Adapty in Observer Mode, as explained on the [Restore Purchases in Mobile Code](react-native-restore-purchase) page.

:::warning
**Don't skip transaction reporting!**
If you don't call `restorePurchases`, Adapty won't recognize the transaction, it won't appear in analytics, and it won't be sent to integrations.
::: 

</TabItem>
</Tabs>

**Associating paywalls to transactions**

Adapty SDK cannot determine the source of purchases, as you are the one processing them. Therefore, if you intend to use paywalls and/or A/B tests in Observer mode, you need to associate the transaction coming from your app store with the corresponding paywall in your mobile app code. This is important to get right before releasing your app, otherwise, it will lead to errors in analytics.

```typescript 
const variationId = paywall.variationId;

try {
    await adapty.setVariationId('transactionId', variationId);
} catch (error) {
    // handle the `AdaptyError`
}
```

Request parameters:

| Parameter     | Presence | Description                                                  |
| ------------- | -------- | ------------------------------------------------------------ |
| transactionId | required | <p>For iOS, StoreKit 1: an [SKPaymentTransaction](https://developer.apple.com/documentation/storekit/skpaymenttransaction)  object.</p><p>For iOS, StoreKit 2: [Transaction](https://developer.apple.com/documentation/storekit/transaction)  object.</p><p>For Android: String identifier (purchase.getOrderId of the purchase, where the purchase is an instance of the billing library [Purchase](https://developer.android.com/reference/com/android/billingclient/api/Purchase) class.</p> |
| variationId   | required | The string identifier of the variation. You can get it using `variationId` property of the [AdaptyPaywall](https://react-native.adapty.io/interfaces/adaptypaywall) object. |

</TabItem> 
</Tabs> 