---
title: "Report transactions in Observer Mode in Kotlin Multiplatform SDK"
description: "Report purchase transactions in Adapty Observer Mode for user insights and revenue tracking in Kotlin Multiplatform SDK."
metadataTitle: "Reporting Transactions in Observer Mode in Kotlin Multiplatform SDK | Adapty Docs"
displayed_sidebar: sdkkmp
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem'; 


In Observer mode, the Adapty SDK can't track purchases made through your existing purchase system on its own. You need to report transactions from your app store. It's crucial to set this up **before** releasing your app to avoid errors in analytics.

Use `reportTransaction` to explicitly report each transaction for Adapty to recognize it.

:::warning
**Don't skip transaction reporting!**
If you don't call `reportTransaction`, Adapty won't recognize the transaction, it won't appear in analytics, and it won't be sent to integrations.
:::

If you use Adapty paywalls, include the `variationId` when reporting a transaction. This links the purchase to the paywall that triggered it, ensuring accurate paywall analytics.


```kotlin showLineNumbers
import com.adapty.kmp.Adapty

Adapty.reportTransaction(
    transactionId = "your_transaction_id",
    variationId = paywall.variationId
).onSuccess { profile ->
    // Transaction reported successfully
    // profile contains updated user data
}.onError { error ->
    // handle the error
}
```

Parameters:

| Parameter       | Presence | Description                                                                                                                                                                                  |
| --------------- | -------- |----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| transactionId   | required | The transaction ID from your app store purchase. This is typically the purchase token or transaction identifier returned by the store.                                                       |
| variationId     | optional | The string identifier of the variation. You can get it using `variationId` property of the [AdaptyPaywall](https://kmp.adapty.io//////adapty/com.adapty.kmp.models/-adapty-paywall/) object. |
