---
title: "Report transactions in Observer Mode"
description: "Reporting Transactions in Observer Mode | Adapty Docs"
metadataTitle: "Report purchase transactions in Adapty Observer Mode for user insights and revenue tracking."
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem'; 

In Observer mode, the Adapty SDK can't track purchases made through your existing purchase system on its own. You need to report transactions from your app store. It's crucial to set this up **before** releasing your app to avoid errors in analytics.

## In the current SDK version (3.3 and later)

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

If you use Adapty paywalls, link your transaction to the paywall that led to the purchase using the `setVariationId` method. This ensures the purchase is correctly attributed to the triggering paywall for accurate analytics. This step is only necessary if you're using Adapty paywalls.

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

If you use Adapty paywalls, link your transaction to the paywall that led to the purchase using the `setVariationId` method. This ensures the purchase is correctly attributed to the triggering paywall for accurate analytics. This step is only necessary if you're using Adapty paywalls.

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

If you use Adapty paywalls, include the `withVariationId` when reporting a transaction. This links the purchase to the paywall that triggered it, ensuring accurate paywall analytics.

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

If you use Adapty paywalls, include the `withVariationId` when reporting a transaction. This links the purchase to the paywall that triggered it, ensuring accurate paywall analytics.

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

If you use Adapty paywalls, include the `withVariationId` when reporting a transaction. This links the purchase to the paywall that triggered it, ensuring accurate paywall analytics.

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
| variationId   | optional | The string identifier of the variation. You can get it using `variationId` property  of the [`AdaptyPaywall`](sdk-models#adaptypaywall)  object. |
| transactionId | required | <p>For iOS, StoreKit1: an [`SKPaymentTransaction`](https://developer.apple.com/documentation/storekit/skpaymenttransaction)  object.</p><p>For iOS, StoreKit 2: [Transaction](https://developer.apple.com/documentation/storekit/transaction)  object.</p><p>For Android: String identifier (`purchase.getOrderId()`) of the purchase, where the purchase is an instance of the billing library [Purchase](https://developer.android.com/reference/com/android/billingclient/api/Purchase) class.</p> |

</TabItem>
</Tabs>


For accurate analytics, ensure the transaction is associated with the paywall within 3 hours of its creation.

## In legacy SDK versions (before 3.3.0)

<!--- In Observer mode, Adapty SDK cannot determine the source of purchases as you are the one processing them. Therefore, if you intend to use paywalls and/or A/B tests in Observer mode, you need to associate the transaction coming from your app store with the corresponding paywall in your mobile app code. This is important to get right before releasing your app, otherwise, it will lead to errors in analytics.

After the preliminary configuration is done, you need to associate the transaction generated by Apple or Google to the corresponding paywall in your mobile app code using the `variationId` parameter as shown in the example below. Make sure you always associate the transaction with the paywall that generated it, only then you will be able to see the correct metrics in the Adapty Dashboard. --->

### Reporting transactions

Use `.restorePurchases()` to report a transaction to Adapty in Observer Mode, as explained on the [Restore Purchases in Mobile Code](estore-purchase) page.

:::warning

**Don't skip transaction reporting!**
If you don't call `.restorePurchases()`, Adapty won't recognize the transaction, it won’t appear in analytics, and it won’t be sent to integrations. 

:::

### Associating paywalls to transactions

If you use Adapty paywalls, link your transaction to the paywall that led to the purchase using the `setVariationId` method. This ensures the purchase is correctly attributed to the triggering paywall for accurate analytics. This step is only necessary if you're using Adapty paywalls.

<Tabs>
<TabItem value="Swift" label="Swift" default>
```swift 
let variationId = paywall.variationId
// There are two overloads: for StoreKit 1 and StoreKit 2
Adapty.setVariationId(variationId, forPurchasedTransaction: transactionId) { error in
    if error == nil {
        // successful binding
    }    
}
```
</TabItem>
<TabItem value="kotlin" label="Kotlin" default>

```kotlin 
Adapty.setVariationId(transactionId, variationId) { error ->
    if (error == null) {
        // success
    }
}
```
</TabItem>
<TabItem value="java" label="Java" default>
```java 
Adapty.setVariationId(transactionId, variationId, error -> {
    if (error == null) {
        // success
    }
});
```
</TabItem>
<TabItem value="Flutter" label="Flutter" default>
```javascript
final transactionId = transaction.transactionIdentifier
final variationId = paywall.variationId

try {
  await Adapty().setVariationId('transactionId', variationId);
} on AdaptyError catch (adaptyError) {
  // handle the error
} catch (e) {
}
```
</TabItem>
<TabItem value="Unity" label="Unity" default>
```csharp 
Adapty.SetVariationForTransaction("<variationId>", "<transactionId>", (error) => { 
    if(error != null) {
        // handle the error
        return;
    }

    // successful binding
});
```
</TabItem>
<TabItem value="RN" label="React Native (TS)" default>
```typescript 
const variationId = paywall.variationId;

try {
    await adapty.setVariationId('transactionId', variationId);
} catch (error) {
    // handle the `AdaptyError`
}
```
</TabItem>
</Tabs>

Request parameters:

| Parameter | Presence | Description |
|---------|--------|-----------|
| variationId | required | The string identifier of the variation. You can get it using `variationId` property  of the [`AdaptyPaywall`](sdk-models#adaptypaywall)  object. |
| transactionId | required | <p>For iOS, StoreKit1: an [`SKPaymentTransaction`](https://developer.apple.com/documentation/storekit/skpaymenttransaction)  object.</p><p>For iOS, StoreKit 2: [Transaction](https://developer.apple.com/documentation/storekit/transaction)  object.</p><p>For Android: String identifier (`purchase.getOrderId()`) of the purchase, where the purchase is an instance of the billing library [Purchase](https://developer.android.com/reference/com/android/billingclient/api/Purchase) class.</p> |


For accurate analytics, ensure the transaction is associated with the paywall within 3 hours of its creation.
