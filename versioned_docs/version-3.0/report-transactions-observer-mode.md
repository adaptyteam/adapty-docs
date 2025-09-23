---
title: "Report transactions in Observer Mode in iOS SDK"
description: "Report purchase transactions in Adapty Observer Mode for user insights and revenue tracking in iOS SDK."
metadataTitle: "Reporting Transactions in Observer Mode | Adapty Docs"
keywords: ['reportTransaction', 'report transactions']
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
<TabItem value="old" label="Adapty SDK 3.3.x (legacy)" default> 

In Observer mode, the Adapty SDK can't track purchases made through your existing purchase system on its own. You need to report transactions from your app store or restore them. It's crucial to set this up **before** releasing your app to avoid errors in analytics.

Use `reportTransaction` to send the transaction data to Adapty.

:::warning

**Don't skip transaction reporting!**
If you don't call `reportTransaction`, Adapty won't recognize the transaction, it won't appear in analytics, and it won't be sent to integrations.

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

</TabItem>
<TabItem value="old2" label="Adapty SDK up to 3.2.x (legacy)" default> 

**Reporting transactions**

- Versions up to 3.1.x automatically listen for transactions in the App Store, so manual reporting is not required.
- Version 3.2 does not support Observer Mode.

**Associating paywalls to transactions**

Adapty SDK cannot determine the source of purchases, as you are the one processing them. Therefore, if you intend to use paywalls and/or A/B tests in Observer mode, you need to associate the transaction coming from your app store with the corresponding paywall in your mobile app code. This is important to get right before releasing your app, otherwise, it will lead to errors in analytics.

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
</Tabs>
