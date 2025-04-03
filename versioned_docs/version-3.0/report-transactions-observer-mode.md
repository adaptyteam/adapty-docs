---
title: "Report transactions in Observer Mode"
description: "Report purchase transactions in Adapty Observer Mode for user insights and revenue tracking."
metadataTitle: "Reporting Transactions in Observer Mode | Adapty Docs"
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem'; 


<Tabs groupId="sdk-version" queryString> 

<TabItem value="current" label="Adapty SDK v3.4+ (current)" default> 
In Observer mode, the Adapty SDK can't track purchases made through your existing purchase system on its own. You need to report transactions from your app store. It's crucial to set this up **before** releasing your app to avoid errors in analytics.

<Tabs groupId="current-os" queryString>
<TabItem value="swift" label="Swift" default>

Use `reportTransaction` to explicitly report each transaction for Adapty to recognize it.

:::warning

**Don't skip transaction reporting!**
If you don't call `reportTransaction`, Adapty won't recognize the transaction, it won’t appear in analytics, and it won’t be sent to integrations.

:::

If you use Adapty paywalls, include the `variationId` when reporting a transaction. This links the purchase to the paywall that triggered it, ensuring accurate paywall analytics.

```swift showLineNumbers
do {
    // every time when calling transasction.finish()
    try await Adapty.reportTransaction(transaction, withVariationId: <YOUR_PAYWALL_VARIATION_ID>)
} catch {
    // handle the error
}
```

Parameters:

| Parameter       | Presence | Description                                                  |
| --------------- | -------- | ------------------------------------------------------------ |
| **transaction** | required | <ul><li> For StoreKit 1: SKPaymentTransaction.</li><li> For StoreKit 2: Transaction.</li></ul> |
| **variationId** | optional | The unique ID of the paywall variation. Retrieve it from the `variationId` property of the [AdaptyPaywall](sdk-models#adaptypaywall) object. |

</TabItem>
<TabItem value="kotlin" label="Kotlin" default>

Use `reportTransaction` to explicitly report each transaction for Adapty to recognize it.

:::warning

**Don't skip transaction reporting!**
If you don't call `reportTransaction`, Adapty won't recognize the transaction, it won’t appear in analytics, and it won’t be sent to integrations.

:::

If you use Adapty paywalls, include the `variationId` when reporting a transaction. This links the purchase to the paywall that triggered it, ensuring accurate paywall analytics.

```kotlin showLineNumbers
val transactionInfo = TransactionInfo.fromPurchase(purchase)

Adapty.reportTransaction(transactionInfo, variationId) { result ->
    if (result is AdaptyResult.Success) {
        // success
    }
}
```

Parameters:

| Parameter       | Presence | Description                                                  |
| --------------- | -------- | ------------------------------------------------------------ |
| transactionInfo | required | The TransactionInfo from the purchase, where the purchase is an instance of the billing library [Purchase](https://developer.android.com/reference/com/android/billingclient/api/Purchase) class. |
| variationId     | optional | The string identifier of the variation. You can get it using `variationId` property of the [AdaptyPaywall](sdk-models#adaptypaywall) object. |

</TabItem>
<TabItem value="java" label="Java" default>

Use `reportTransaction` to explicitly report each transaction for Adapty to recognize it.

:::warning

**Don't skip transaction reporting!**
If you don't call `reportTransaction`, Adapty won't recognize the transaction, it won’t appear in analytics, and it won’t be sent to integrations.

:::

If you use Adapty paywalls, include the `variationId` when reporting a transaction. This links the purchase to the paywall that triggered it, ensuring accurate paywall analytics.

```java showLineNumbers
TransactionInfo transactionInfo = TransactionInfo.fromPurchase(purchase);

Adapty.reportTransaction(transactionInfo, variationId, result -> {
    if (result instanceof AdaptyResult.Success) {
        // success
    }
});
```

Parameters:

| Parameter       | Presence | Description                                                  |
| --------------- | -------- | ------------------------------------------------------------ |
| transactionInfo | required | The TransactionInfo from the purchase, where the purchase is an instance of the billing library [Purchase](https://developer.android.com/reference/com/android/billingclient/api/Purchase) class. |
| variationId     | optional | The string identifier of the variation. You can get it using `variationId` property  of the [AdaptyPaywall](sdk-models#adaptypaywall)  object. |

</TabItem>
 <TabItem value="flutter" label="Flutter" default>

Use `reportTransaction` to explicitly report each transaction for Adapty to recognize it.

:::warning

**Don't skip transaction reporting!**
If you don't call `reportTransaction`, Adapty won't recognize the transaction, it won’t appear in analytics, and it won’t be sent to integrations.

:::

If you use Adapty paywalls, include the `variationId` when reporting a transaction. This links the purchase to the paywall that triggered it, ensuring accurate paywall analytics.

```javascript showLineNumbers
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

Parameters:

| Parameter     | Presence | Description                                                  |
| ------------- | -------- | ------------------------------------------------------------ |
| transactionId | required | <ul><li> For iOS: Identifier of the transaction.</li><li> For Android: String identifier `purchase.getOrderId` of the purchase, where the purchase is an instance of the billing library [Purchase](https://developer.android.com/reference/com/android/billingclient/api/Purchase) class.</li></ul> |
| variationId   | optional | The string identifier of the variation. You can get it using `variationId` property  of the [AdaptyPaywall](sdk-models#adaptypaywall) object. |

</TabItem>
<!--- <TabItem value="unity" label="Unity" default>

Use `reportTransaction` on both platforms to explicitly report each transaction, and use `restorePurchases` on Android as an additional step to ensure Adapty recognizes it.

:::warning

**Don't skip transaction reporting!**
If you don't call `reportTransaction`, Adapty won't recognize the transaction, it won’t appear in analytics, and it won’t be sent to integrations.

:::

If you use Adapty paywalls, include the `variationId` when reporting a transaction. This links the purchase to the paywall that triggered it, ensuring accurate paywall analytics.

```csharp showLineNumbers
// every time when calling transasction.finish()

#if UNITY_ANDROID && !UNITY_EDITOR
  Adapty.RestorePurchases((profile, error) => {
    // handle the error
  });
#endif

Adapty.ReportTransaction(
  "YOUR_TRANSACTION_ID", 
  "PAYWALL_VARIATION_ID", // optional
  (error) => {
  // handle the error
});
```

Parameters:

| Parameter     | Presence | Description                                                  |
| ------------- | -------- | ------------------------------------------------------------ |
| transactionId | required | <ul><li> For iOS, StoreKit 1: an [SKPaymentTransaction](https://developer.apple.com/documentation/storekit/skpaymenttransaction) object.</li><li> For iOS, StoreKit 2: [Transaction](https://developer.apple.com/documentation/storekit/transaction) object.</li><li> For Android: String identifier (`purchase.getOrderId`) of the purchase, where the purchase is an instance of the billing library [Purchase](https://developer.android.com/reference/com/android/billingclient/api/Purchase) class.</li></ul> |
| variationId   | optional | The string identifier of the variation. You can get it using `variationId` property  of the [AdaptyPaywall](sdk-models#adaptypaywall) object. |

</TabItem> --->
<TabItem value="rn" label="React Native (TS)" default>

Use `reportTransaction` to explicitly report each transaction for Adapty to recognize it.

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
| transactionId | required | <ul><li> For iOS: Identifier of the transaction.</li><li> For Android: String identifier (`purchase.getOrderId`) of the purchase, where the purchase is an instance of the billing library [Purchase](https://developer.android.com/reference/com/android/billingclient/api/Purchase) class.</li></ul> |
| variationId   | optional | The string identifier of the variation. You can get it using `variationId` property of the [AdaptyPaywall](sdk-models#adaptypaywall) object. |

</TabItem>
</Tabs>
</TabItem>
<TabItem value="old" label="Adapty SDK 3.3.x (legacy)" default> 

In Observer mode, the Adapty SDK can't track purchases made through your existing purchase system on its own. You need to report transactions from your app store or restore them. It's crucial to set this up **before** releasing your app to avoid errors in analytics.

<Tabs groupId="current-os" queryString>
<TabItem value="swift" label="Swift" default>

Use `reportTransaction` to send the transaction data to Adapty.

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

| Parameter       | Presence | Description                                                  |
| --------------- | -------- | ------------------------------------------------------------ |
| **transaction** | required | <ul><li> For StoreKit 1: SKPaymentTransaction.</li><li> For StoreKit 2: Transaction.</li></ul> |
| **variationId** | optional | The unique ID of the paywall variation. Retrieve it from the `variationId` property of the [AdaptyPaywall](sdk-models#adaptypaywall) object. |

<!---
Comment for TW, do not open it!!!
Although the parameter is used as `withVariationId` in the snippet, it's correct to call it `variationId`. It's the best practice to use it this way in Apple docs

![apple-example.webp](../../../Backup/img/apple-example.webp)

From Alex G (https://adapty-team.slack.com/archives/C06R77S3LDA/p1739562944223879?thread_ts=1738929145.728859&cid=C06R77S3LDA)

Сокращенно: `Adapty.reportTransaction(:withVariationId:)`
Полностью:

```
Adapty.reportTransaction(
    _ transaction: Transaction, 
    withVariationId variationId: String?
) async throws
```

Parameters:

- transaction - ...
- variationId - ...

https://developer.apple.com/documentation/uikit/uiviewcontroller/targetviewcontroller(foraction:sender:)

--->
</TabItem>
<TabItem value="kotlin" label="Kotlin" default>

Use `restorePurchases` to report the transaction to Adapty.

:::warning

**Don't skip purchase restoring!**
If you don't call `restorePurchases`, Adapty won't recognize the transaction, it won’t appear in analytics, and it won’t be sent to integrations. 

:::

If you use Adapty paywalls, link your transaction to the paywall that led to the purchase using the `setVariationId` method. This ensures the purchase is correctly attributed to the triggering paywall for accurate analytics. This step is only necessary if you're using Adapty paywalls.

```kotlin showLineNumbers
Adapty.restorePurchases { result ->
    if (result is AdaptyResult.Success) {
        // success
    }
}

Adapty.setVariationId(transactionId, variationId) { error ->
    if (error == null) {
        // success
    }
}
```

Parameters:

| Parameter     | Presence | Description                                                  |
| ------------- | -------- | ------------------------------------------------------------ |
| transactionId | required | String identifier (`purchase.getOrderId`) of the purchase, where the purchase is an instance of the billing library [Purchase](https://developer.android.com/reference/com/android/billingclient/api/Purchase) class. |
| variationId   | required | The string identifier of the variation. You can get it using `variationId` property of the [AdaptyPaywall](sdk-models#adaptypaywall) object. |


</TabItem>
<TabItem value="java" label="Java" default>

Use `restorePurchases` to report the transaction to Adapty.

:::warning

**Don't skip purchase restoring!**
If you don't call `restorePurchases`, Adapty won't recognize the transaction, it won’t appear in analytics, and it won’t be sent to integrations. 

:::

If you use Adapty paywalls, link your transaction to the paywall that led to the purchase using the `setVariationId` method. This ensures the purchase is correctly attributed to the triggering paywall for accurate analytics. This step is only necessary if you're using Adapty paywalls.

```java showLineNumbers
Adapty.restorePurchases(result -> {
    if (result instanceof AdaptyResult.Success) {
        // success
    }
});

Adapty.setVariationId(transactionId, variationId, error -> {
    if (error == null) {
        // success
    }
});
```

Parameters:

| Parameter     | Presence | Description                                                  |
| ------------- | -------- | ------------------------------------------------------------ |
| transactionId | required | String identifier (`purchase.getOrderId`) of the purchase, where the purchase is an instance of the billing library [Purchase](https://developer.android.com/reference/com/android/billingclient/api/Purchase) class. |
| variationId   | required | The string identifier of the variation. You can get it using `variationId` property  of the [AdaptyPaywall](sdk-models#adaptypaywall)  object. |


</TabItem>
<TabItem value="flutter" label="Flutter" default>

Use `reportTransaction` on both platforms to explicitly report each transaction, and use `restorePurchases` on Android as an additional step to ensure Adapty recognizes it.

:::warning

**Don't skip transaction reporting and purchase restoring!**
If you don't call these methods, Adapty won't recognize the transaction, it won’t appear in analytics, and it won’t be sent to integrations.

:::

If you use Adapty paywalls, include the `variationId` when reporting a transaction. This links the purchase to the paywall that triggered it, ensuring accurate paywall analytics.

```javascript showLineNumbers
// every time when calling transaction.finish()
if (Platform.isAndroid) {
    try {
        await Adapty().restorePurchases();
    } on AdaptyError catch (adaptyError) {
        // handle the error
    } catch (e) {
    }
}

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

Parameters:

| Parameter     | Presence | Description                                                  |
| ------------- | -------- | ------------------------------------------------------------ |
| transactionId | required | <ul><li> For iOS, StoreKit 1: an [SKPaymentTransaction](https://developer.apple.com/documentation/storekit/skpaymenttransaction)  object.</li><li> For iOS, StoreKit 2: [Transaction](https://developer.apple.com/documentation/storekit/transaction)  object.</li><li> For Android: String identifier (purchase.getOrderId of the purchase, where the purchase is an instance of the billing library [Purchase](https://developer.android.com/reference/com/android/billingclient/api/Purchase) class.</li></ul> |
| variationId   | optional | The string identifier of the variation. You can get it using `variationId` property  of the [AdaptyPaywall](sdk-models#adaptypaywall) object. |


</TabItem>
<TabItem value="unity" label="Unity" default>

Use `reportTransaction` on both platforms to explicitly report each transaction, and use `restorePurchases` on Android as an additional step to ensure Adapty recognizes it.

:::warning

**Don't skip transaction reporting and purchase restoring!**
If you don't call these methods, Adapty won't recognize the transaction, it won’t appear in analytics, and it won’t be sent to integrations.

:::

If you use Adapty paywalls, include the `PAYWALL_VARIATION_ID` when reporting a transaction. This links the purchase to the paywall that triggered it, ensuring accurate paywall analytics.

```csharp showLineNumbers
// every time when calling transasction.finish()

#if UNITY_ANDROID && !UNITY_EDITOR
  Adapty.RestorePurchases((profile, error) => {
    // handle the error
  });
#endif

Adapty.ReportTransaction(
  "YOUR_TRANSACTION_ID", 
  "PAYWALL_VARIATION_ID", // optional
  (error) => {
  // handle the error
});
```

Parameters:

| Parameter     | Presence | Description                                                  |
| ------------- | -------- | ------------------------------------------------------------ |
| transactionId | required | <ul><li> For iOS, StoreKit 1: an [SKPaymentTransaction](https://developer.apple.com/documentation/storekit/skpaymenttransaction) object.</li><li> For iOS, StoreKit 2: [Transaction](https://developer.apple.com/documentation/storekit/transaction) object.</li><li> For Android: String identifier (`purchase.getOrderId`) of the purchase, where the purchase is an instance of the billing library [Purchase](https://developer.android.com/reference/com/android/billingclient/api/Purchase) class.</li></ul> |
| variationId   | optional | The string identifier of the variation. You can get it using `variationId` property  of the [AdaptyPaywall](sdk-models#adaptypaywall) object. |


</TabItem>
<TabItem value="rn" label="React Native (TS)" default>

Use `reportTransaction` on both platforms to explicitly report each transaction, and use `restorePurchases` on Android as an additional step to ensure Adapty recognizes it.

:::warning

**Don't skip transaction reporting!**
If you don't call these methods, Adapty won't recognize the transaction, it won’t appear in analytics, and it won’t be sent to integrations.

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
| variationId   | optional | The string identifier of the variation. You can get it using `variationId` property of the [AdaptyPaywall](sdk-models#adaptypaywall) object. |

</TabItem>
</Tabs>

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

Use `restorePurchases` to report a transaction to Adapty in Observer Mode, as explained on the [Restore Purchases in Mobile Code](restore-purchase) page.

:::warning
**Don't skip transaction reporting!**
If you don’t call `restorePurchases`, Adapty won’t recognize the transaction, it won’t appear in analytics, and it won’t be sent to integrations.
::: 

</TabItem>
</Tabs>

**Associating paywalls to transactions**

Adapty SDK cannot determine the source of purchases, as you are the one processing them. Therefore, if you intend to use paywalls and/or A/B tests in Observer mode, you need to associate the transaction coming from your app store with the corresponding paywall in your mobile app code. This is important to get right before releasing your app, otherwise, it will lead to errors in analytics.

<Tabs groupId="current-os" queryString>
<TabItem value="swift" label="Swift" default>

```swift 
let variationId = paywall.variationId
// There are two overloads: for StoreKit 1 and StoreKit 2
Adapty.setVariationId(variationId, forPurchasedTransaction: transactionId) { error in
    if error == nil {
        // successful binding
    }    
}
```

Request parameters:

| Parameter     | Presence | Description                                                  |
| ------------- | -------- | ------------------------------------------------------------ |
| variationId   | required | The string identifier of the variation. You can get it using `variationId` property of the [AdaptyPaywall](sdk-models#adaptypaywall) object. |
| transactionId | required | <p>For StoreKit 1: an [SKPaymentTransaction](https://developer.apple.com/documentation/storekit/skpaymenttransaction)  object.</p><p>For StoreKit 2: [Transaction](https://developer.apple.com/documentation/storekit/transaction)  object.</p> |

</TabItem>
<TabItem value="kotlin" label="Kotlin" default>

```kotlin 
Adapty.setVariationId(transactionId, variationId) { error ->
    if (error == null) {
        // success
    }
}
```

Request parameters:

| Parameter     | Presence | Description                                                  |
| ------------- | -------- | ------------------------------------------------------------ |
| transactionId | required | String identifier (purchase.getOrderId of the purchase, where the purchase is an instance of the billing library [Purchase](https://developer.android.com/reference/com/android/billingclient/api/Purchase) class. |
| variationId   | required | The string identifier of the variation. You can get it using `variationId` property of the [AdaptyPaywall](sdk-models#adaptypaywall) object. |

</TabItem>
<TabItem value="java" label="Java" default>

```java 
Adapty.setVariationId(transactionId, variationId, error -> {
    if (error == null) {
        // success
    }
});
```

| Parameter                                         | Presence | Description                                                  |
| ------------------------------------------------- | -------- | ------------------------------------------------------------ |
| transactionId                                     | required | String identifier (purchase.getOrderId of the purchase, where the purchase is an instance of the billing library [Purchase](https://developer.android.com/reference/com/android/billingclient/api/Purchase) class. |
| variationId                                       | required | The string identifier of the variation. You can get it using `variationId` property of the [AdaptyPaywall](sdk-models#adaptypaywall) object. |

</TabItem>
<TabItem value="flutter" label="Flutter" default>

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
<TabItem value="unity" label="Unity" default>

```csharp 
Adapty.SetVariationForTransaction("<variationId>", "<transactionId>", (error) => { 
    if(error != null) {
        // handle the error
        return;
    }

    // successful binding
});
```

| Parameter                                              | Presence | Description                                                  |
| ------------------------------------------------------ | -------- | ------------------------------------------------------------ |
| transactionId                                          | required | <p>For iOS, StoreKit 1: an [SKPaymentTransaction](https://developer.apple.com/documentation/storekit/skpaymenttransaction)  object.</p><p>For iOS, StoreKit 2: [Transaction](https://developer.apple.com/documentation/storekit/transaction)  object.</p><p>For Android: String identifier (purchase.getOrderId of the purchase, where the purchase is an instance of the billing library [Purchase](https://developer.android.com/reference/com/android/billingclient/api/Purchase) class.</p> |
| variationId                                            | required | The string identifier of the variation. You can get it using `variationId` property of the [AdaptyPaywall](sdk-models#adaptypaywall) object. |


</TabItem>
<TabItem value="rn" label="React Native (TS)" default>


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
| variationId   | required | The string identifier of the variation. You can get it using `variationId` property of the [AdaptyPaywall](sdk-models#adaptypaywall) object. |

</TabItem>
</Tabs>

 </TabItem> 
 </Tabs>
