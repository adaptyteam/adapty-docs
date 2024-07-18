---
title: "Android - Observer mode"
description: ""
metadataTitle: ""
---

If you have a functioning subscription system and want to give Adapty SDK a quick try, you can use Observer mode. With just one line of code you can:

- get insights by using our top-class [analytics](analytics-charts);
- send [subscription events](events) to your server and 3rd party services;
- view and analyze customers in Adapty [CRM](profiles-crm).

At any purchase or restore in your application, you need to call .`restorePurchases()` method to record the action in Adapty.

```kotlin title="title="Adapty.restorePurchases { result ->""
    when (result) {
        is AdaptyResult.Success -> {
            // successful restore
        }
        is AdaptyResult.Error -> {
            val error = result.error
            // handle the error
        }
    }
}
```
```java title="title="Adapty.restorePurchases(result -> {""
    if (result instanceof AdaptyResult.Success) {
        // successful restore
    } else if (result instanceof AdaptyResult.Error) {
        AdaptyError error = ((AdaptyResult.Error) result).getError();
        // handle the error
    }
});
```

:::danger
When running in Observer mode, Adapty SDK won't consume or acknowledge any purchases, so make sure you're handling it. Otherwise, the purchases will be automatically refunded after 3 days.
:::

### A/B tests analytics

In Observer mode, Adapty SDK doesn't know, where the purchase was made from. If you display products using our [Paywalls](paywalls) or [A/B Tests](ab-test), you can manually assign variation to the purchase. After doing this, you'll be able to see metrics in Adapty Dashboard.

```kotlin title="title="Adapty.setVariationId(transactionId, variationId) { error ->""
    if (error == null) {
        // success
    }
}
```
```java title="title="Adapty.setVariationId(transactionId, variationId, error -> {""
    if (error == null) {
        // success
    }
});
```

Request parameters:

- **Transaction Id** (required): a string identifier (`purchase.getOrderId()`) of the purchase, where the purchase is an instance of the billing library [Purchase](https://developer.android.com/reference/com/android/billingclient/api/Purchase) class.
- **Variation Id** (required): a string identifier of variation. You can get it using `variationId` property of [`AdaptyPaywall`](sdk-models#adaptypaywall).