---
title: "Report transactions in Observer Mode in Android SDK"
description: "Report purchase transactions in Adapty Observer Mode for user insights and revenue tracking in Android SDK."
metadataTitle: "Reporting Transactions in Observer Mode in Android SDK | Adapty Docs"
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

<Tabs groupId="current-os" queryString>
<TabItem value="kotlin" label="Kotlin" default>

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
</Tabs>
</TabItem>
<TabItem value="old" label="Adapty SDK 3.3.x (legacy)" default> 

In Observer mode, the Adapty SDK can't track purchases made through your existing purchase system on its own. You need to report transactions from your app store or restore them. It's crucial to set this up **before** releasing your app to avoid errors in analytics.

Use `restorePurchases` to report the transaction to Adapty.

:::warning

**Don't skip purchase restoring!**
If you don't call `restorePurchases`, Adapty won't recognize the transaction, it won't appear in analytics, and it won't be sent to integrations. 

:::

If you use Adapty paywalls, link your transaction to the paywall that led to the purchase using the `setVariationId` method. This ensures the purchase is correctly attributed to the triggering paywall for accurate analytics. This step is only necessary if you're using Adapty paywalls.

<Tabs groupId="current-os" queryString>
<TabItem value="kotlin" label="Kotlin" default>

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
</Tabs>
</TabItem>
<TabItem value="old2" label="Adapty SDK up to 3.2.x (legacy)" default> 

**Reporting transactions**

Use `restorePurchases` to report a transaction to Adapty in Observer Mode, as explained on the [Restore Purchases in Mobile Code](restore-purchase-android) page.

:::warning
**Don't skip transaction reporting!**
If you don't call `restorePurchases`, Adapty won't recognize the transaction, it won't appear in analytics, and it won't be sent to integrations.
::: 

**Associating paywalls to transactions**

Adapty SDK cannot determine the source of purchases, as you are the one processing them. Therefore, if you intend to use paywalls and/or A/B tests in Observer mode, you need to associate the transaction coming from your app store with the corresponding paywall in your mobile app code. This is important to get right before releasing your app, otherwise, it will lead to errors in analytics.

<Tabs groupId="current-os" queryString>
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
</Tabs>
</TabItem> 
</Tabs> 