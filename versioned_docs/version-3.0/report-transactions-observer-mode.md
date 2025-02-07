---
title: "Report transactions in Observer mode"
description: "Reporting Transactions in Observer Mode | Adapty Docs"
metadataTitle: "Report purchase transactions in Adapty Observer Mode for user insights and revenue tracking."
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem'; 

In Observer mode, the Adapty SDK can't track purchases made through your existing purchase system on its own. You need to report transactions from your app store. It's crucial to set this up **before** releasing your app to avoid errors in analytics.

<Tabs groupId="report-transactions-observer-mode">
<TabItem value="Swift" label="Swift" default>

Use `.reportTransaction()` to send the transaction data to Adapty.

:::warning

**Don't skip transaction reporting!**
If you don't call `reportTransaction`, Adapty won't recognize the transaction, it won’t appear in analytics, and it won’t be sent to integrations.

:::

If you use Adapty paywalls, include the `withVariationId` when reporting a transaction. This links the purchase to the paywall that triggered it, ensuring accurate paywall analytics.

```swift showLineNumbers
do {
    // every time when calling transasction.finish()
    try await Adapty.reportTransaction(transaction, withVariationId: <YOUR_PAYWALL_VARIATION_ID>)
} catch {
    // handle the error
}
```
Parameters:

| Parameter           | Presence | Description                                                  |
| ------------------- | -------- | ------------------------------------------------------------ |
| **withVariationId** | optional | The unique ID of the paywall variation. Retrieve it from the `variationId` property of the [`AdaptyPaywall`](sdk-models#adaptypaywall) object. |
| **transaction**     | required | <p>For StoreKit 1: SKPaymentTransaction.</p><p>For StoreKit 2: Transaction.</p> |

</TabItem>
<TabItem value="kotlin" label="Kotlin" default>

Use `.restorePurchases()` to report the transaction to Adapty.

:::warning

**Don't skip transaction reporting!**
If you don't call `.restorePurchases()`, Adapty won't recognize the transaction, it won’t appear in analytics, and it won’t be sent to integrations. 

:::

If you use Adapty paywalls, include the `variationId` when reporting a transaction. This links the purchase to the paywall that triggered it, ensuring accurate paywall analytics.

```kotlin showLineNumbers
Adapty.setVariationId(transactionId, variationId) { error ->
    if (error == null) {
        // success
    }
}
```
Parameters:

| Parameter     | Presence | Description                                                  |
| ------------- | -------- | ------------------------------------------------------------ |
| variationId   | required | The string identifier of the variation. You can get it using `variationId` property  of the [`AdaptyPaywall`](sdk-models#adaptypaywall)  object. |
| transactionId | required | String identifier (`purchase.getOrderId()`) of the purchase, where the purchase is an instance of the billing library [Purchase](https://developer.android.com/reference/com/android/billingclient/api/Purchase) class. |

</TabItem>
<TabItem value="java" label="Java" default>

Use `.restorePurchases()` to report the transaction to Adapty.

:::warning

**Don't skip transaction reporting!**
If you don't call `.restorePurchases()`, Adapty won't recognize the transaction, it won’t appear in analytics, and it won’t be sent to integrations. 

:::

If you use Adapty paywalls, include the `variationId` when reporting a transaction. This links the purchase to the paywall that triggered it, ensuring accurate paywall analytics.

```java showLineNumbers
Adapty.setVariationId(transactionId, variationId, error -> {
    if (error == null) {
        // success
    }
});
```
Parameters:

| Parameter     | Presence | Description                                                  |
| ------------- | -------- | ------------------------------------------------------------ |
| variationId   | required | The string identifier of the variation. You can get it using `variationId` property  of the [`AdaptyPaywall`](sdk-models#adaptypaywall)  object. |
| transactionId | required | <p>For iOS, StoreKit1: an [`SKPaymentTransaction`](https://developer.apple.com/documentation/storekit/skpaymenttransaction)  object.</p><p>For iOS, StoreKit 2: [Transaction](https://developer.apple.com/documentation/storekit/transaction)  object.</p><p>For Android: String identifier (`purchase.getOrderId()`) of the purchase, where the purchase is an instance of the billing library [Purchase](https://developer.android.com/reference/com/android/billingclient/api/Purchase) class.</p> |

</TabItem>
<TabItem value="Flutter" label="Flutter" default>

Use `.reportTransaction()` to send the transaction data to Adapty.

:::warning

**Don't skip transaction reporting!**
If you don't call `reportTransaction`, Adapty won't recognize the transaction, it won’t appear in analytics, and it won’t be sent to integrations.

:::

If you use Adapty paywalls, include the `variationId` when reporting a transaction. This links the purchase to the paywall that triggered it, ensuring accurate paywall analytics.

```javascript showLineNumbers
try {
    // every time when calling transasction.finish()
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
Parameters:

| Parameter           | Presence | Description                                                  |
| ------------------- | -------- | ------------------------------------------------------------ |
| variationId         | optional | The string identifier of the variation. You can get it using `variationId` property  of the [`AdaptyPaywall`](sdk-models#adaptypaywall)  object. |
| YOUR_TRANSACTION_ID | required | <p>For iOS, StoreKit1: an [`SKPaymentTransaction`](https://developer.apple.com/documentation/storekit/skpaymenttransaction)  object.</p><p>For iOS, StoreKit 2: [Transaction](https://developer.apple.com/documentation/storekit/transaction)  object.</p><p>For Android: String identifier (`purchase.getOrderId()`) of the purchase, where the purchase is an instance of the billing library [Purchase](https://developer.android.com/reference/com/android/billingclient/api/Purchase) class.</p> |

</TabItem>
<TabItem value="Unity" label="Unity" default>

Use `.reportTransaction()` to send the transaction data to Adapty.

:::warning

**Don't skip transaction reporting!**
If you don't call `ReportTransaction`, Adapty won't recognize the transaction, it won’t appear in analytics, and it won’t be sent to integrations.

:::

If you use Adapty paywalls, include the `PAYWALL_VARIATION_ID` when reporting a transaction. This links the purchase to the paywall that triggered it, ensuring accurate paywall analytics.

```csharp showLineNumbers
// every time when calling transasction.finish()

Adapty.ReportTransaction(
  "YOUR_TRANSACTION_ID", 
  "PAYWALL_VARIATION_ID", // optional
  (error) => {
  // handle the error
});
```
Parameters:

| Parameter            | Presence | Description                                                  |
| -------------------- | -------- | ------------------------------------------------------------ |
| PAYWALL_VARIATION_ID | optional | The string identifier of the variation. You can get it using `variationId` property  of the [`AdaptyPaywall`](sdk-models#adaptypaywall)  object. |
| YOUR_TRANSACTION_ID  | required | <p>For iOS, StoreKit1: an [`SKPaymentTransaction`](https://developer.apple.com/documentation/storekit/skpaymenttransaction)  object.</p><p>For iOS, StoreKit 2: [Transaction](https://developer.apple.com/documentation/storekit/transaction)  object.</p><p>For Android: String identifier (`purchase.getOrderId()`) of the purchase, where the purchase is an instance of the billing library [Purchase](https://developer.android.com/reference/com/android/billingclient/api/Purchase) class.</p> |

</TabItem>
<TabItem value="RN" label="React Native (TS)" default>

Use `.reportTransaction()` to send the transaction data to Adapty.

:::warning

**Don't skip transaction reporting!**
If you don't call `reportTransaction`, Adapty won't recognize the transaction, it won’t appear in analytics, and it won’t be sent to integrations.

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
| variationId   | required | The string identifier of the variation. You can get it using `variationId` property  of the [`AdaptyPaywall`](sdk-models#adaptypaywall)  object. |
| transactionId | required | <p>For iOS, StoreKit1: an [`SKPaymentTransaction`](https://developer.apple.com/documentation/storekit/skpaymenttransaction)  object.</p><p>For iOS, StoreKit 2: [Transaction](https://developer.apple.com/documentation/storekit/transaction)  object.</p><p>For Android: String identifier (`purchase.getOrderId()`) of the purchase, where the purchase is an instance of the billing library [Purchase](https://developer.android.com/reference/com/android/billingclient/api/Purchase) class.</p> |

</TabItem>
</Tabs>


For accurate analytics, ensure the transaction is associated with the paywall within 3 hours of its creation.

## Using Observer Mode in version below 3.3.0