---
title: "Android – Making Purchases"
description: ""
metadataTitle: ""
---

To make the purchase, you have to call `.makePurchase()` method:

```kotlin title="Kotlin"
Adapty.makePurchase(activity, product) { result ->
    when (result) {
        is AdaptyResult.Success -> {
            val profile = result.value              
            //NOTE: profile is null in case of cross-grade with DEFERRED proration mode
            
            // successful purchase
        }
        is AdaptyResult.Error -> {
            val error = result.error
            // handle the error
        }
    }
}
```
```java title="Java"
Adapty.makePurchase(activity, product, result -> {
    if (result instanceof AdaptyResult.Success) {
        AdaptyProfile profile = ((AdaptyResult.Success<AdaptyProfile>) result).getValue();
        //NOTE: profile is null in case of cross-grade with DEFERRED proration mode
        
      	// successful purchase
    } else if (result instanceof AdaptyResult.Error) {
        AdaptyError error = ((AdaptyResult.Error) result).getError();
        // handle the error
    }
});
```

Request parameters:

- **Product** (required): an [`AdaptyPaywallProduct`](sdk-models#adaptypaywallproduct) object retrieved from the paywall.

Response parameters:

- **Profile**: an [`AdaptyProfile`](sdk-models#adaptyprofile) object. This model contains info about access levels, subscriptions, and non-subscription purchases. Generally, you have to check only access level status to determine whether the user has premium access to the app.

:::warning
Make sure you've uploaded [Service Account Key File](service-account-key-file) in Adapty Dashboard, without it, we can't validate purchases.
:::

Below is a complete example of making the purchase and checking the user's access level.

```kotlin title="Kotlin"
Adapty.makePurchase(activity, product) { result ->
    when (result) {
        is AdaptyResult.Success -> {
            val profile = result.value
            //NOTE: profile is null in case of cross-grade of DEFERRED proration mode
            
            if (profile?.accessLevels?.get("premium")?.isActive == true) {
                // grant access to premium features
            }
        }
        is AdaptyResult.Error -> {
            val error = result.error
            // handle the error
        }
    }
}
```
```java title="Java"
Adapty.makePurchase(activity, product, result -> {
    if (result instanceof AdaptyResult.Success) {
        AdaptyProfile profile = ((AdaptyResult.Success<AdaptyProfile>) result).getValue();
        //NOTE: profile is null in case of cross-grade with DEFERRED proration mode
        
      	if (profile != null) {
            AdaptyProfile.AccessLevel premium = profile.getAccessLevels().get("premium");
            
          	if (premium != null && premium.isActive()) {
                // grant access to premium features
            }
        }
    } else if (result instanceof AdaptyResult.Error) {
        AdaptyError error = ((AdaptyResult.Error) result).getError();
        // handle the error
    }
});
```

:::warning
Make sure to set up [Real-time Developer Notifications (RTDN)](real-time-developer-notifications-rtdn) to receive subscription updates without significant delays.
:::

### Change subscription

If you need a subscription to be replaced with another one, you have to call `.makePurchase()` method with additional parameter:

```kotlin title="Kotlin"
Adapty.makePurchase(activity, product, subscriptionUpdateParams) { result ->
    when (result) {
        is AdaptyResult.Success -> {
            val profile = result.value              
            //NOTE: profile is null in case of cross-grade with DEFERRED proration mode
            
            // successful cross-grade
        }
        is AdaptyResult.Error -> {
            val error = result.error
            // handle the error
        }
    }
}
```
```java title="Java"
Adapty.makePurchase(activity, product, subscriptionUpdateParams, result -> {
    if (result instanceof AdaptyResult.Success) {
        AdaptyProfile profile = ((AdaptyResult.Success<AdaptyProfile>) result).getValue();
        //NOTE: profile is null in case of cross-grade with DEFERRED proration mode
        
      	// successful cross-grade
    } else if (result instanceof AdaptyResult.Error) {
        AdaptyError error = ((AdaptyResult.Error) result).getError();
        // handle the error
    }
});
```

Additional request parameter:

- **subscriptionUpdateParams**: an [`AdaptySubscriptionUpdateParameters`](sdk-models#adaptysubscriptionupdateparameters) object.

You can read more about proration modes [here](https://developer.android.com/google/play/billing/subscriptions#proration).

:::note
Please read [recommendations from Google](https://developer.android.com/google/play/billing/subscriptions#proration-recommendations) for proration modes.
:::

:::note
[`IMMEDIATE_AND_CHARGE_PRORATED_PRICE`](https://developer.android.com/reference/com/android/billingclient/api/BillingFlowParams.ProrationMode#IMMEDIATE_AND_CHARGE_PRORATED_PRICE) proration mode is available only for a subscription upgrade, where the price per unit of time increases.
:::

:::note
If you use [`DEFERRED`](https://developer.android.com/reference/com/android/billingclient/api/BillingFlowParams.ProrationMode#DEFERRED) proration mode, in case of success, `profile` in the callback is null since real subscription change will occur only when current subscription's billing period ends.
:::

### Restoring purchases

To restore purchases, you have to call `.restorePurchases()` method:

```kotlin title="Kotlin"
Adapty.restorePurchases { result ->
    when (result) {
        is AdaptyResult.Success -> {
            val profile = result.value
            // check the access level
        }
        is AdaptyResult.Error -> {
            val error = result.error
            // handle the error
        }
    }
}
```
```java title="Java"
Adapty.restorePurchases(result -> {
    if (result instanceof AdaptyResult.Success) {
        AdaptyProfile profile = ((AdaptyResult.Success<AdaptyProfile>) result).getValue();
        // check the access level
      
    } else if (result instanceof AdaptyResult.Error) {
        AdaptyError error = ((AdaptyResult.Error) result).getError();
        // handle the error
    }
});
```

Response parameters:

- **Profile**: an [`AdaptyProfile`](sdk-models#adaptyprofile) object. This model contains info about access levels, subscriptions, and non-subscription purchases. Generally, you have to check only access level status to determine whether the user has premium access to the app.

In [Observer mode](android-observer-mode), after any purchase or restore in your application, you should call **`.restorePurchases()`** method to record the action in Adapty.