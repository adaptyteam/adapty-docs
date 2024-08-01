---
title: "Make purchases in mobile app"
description: "Learn how to seamlessly integrate paywalls into your mobile app and enable purchases using Adapty. Discover the .makePurchase() method for making purchases. Explore how Adapty automatically applies promotional offers to enhance user transactions."
metadataTitle: "How to Make Purchases in Code for Paywalls in Adapty"
---

Displaying paywalls within your mobile app is an essential step in offering users access to premium content or services. However, simply presenting these paywalls is enough to support purchases only if you use [Paywall Builder](paywall-builder-getting-started) to customize your paywalls.

If you don't use the Paywall Builder, you must use a separate method called `.makePurchase()` to complete a purchase and unlock the desired content. This method serves as the gateway for users to engage with the paywalls and proceed with their desired transactions.

If your paywall has an active promotional offer for the product a user is trying to buy, Adapty will automatically apply it at the time of purchase.

:::warning
Keep in mind that the introductory offer will be applied automatically only if you use the paywalls set up using the Paywall Builder.

In other cases, you'll need to [verify the user's eligibility for an introductory offer on iOS](fetch-paywalls-and-products#check-intro-offer-eligibility-on-ios).  Skipping this step may result in your app being rejected during release. Moreover, it could lead to charging the full price to users who are eligible for an introductory offer.
:::

Make sure you've [done the initial configuration](quickstart) without skipping a single step. Without it, we can't validate purchases.

## Make purchase

:::note
In paywalls built with [Paywall Builder](/3.0/adapty-paywall-builder) purchases are processed automatically with no additional code. If that's your case — you can skip this step.
:::

```swift title="Swift"
Adapty.makePurchase(product: product) { result in
    switch result {
    case let .success(info):
      if info.profile.accessLevels["YOUR_ACCESS_LEVEL"]?.isActive ?? false {
        // successful purchase
      }
    case let .failure(error):
        // handle the error
    }
}
```
```kotlin title="Kotlin"
Adapty.makePurchase(activity, product) { result ->
    when (result) {
        is AdaptyResult.Success -> {
            val info = result.value
            //NOTE: info is null in case of cross-grade with DEFERRED proration mode
            val profile = info?.profile
        
            if (profile?.accessLevels?.get("YOUR_ACCESS_LEVEL")?.isActive == true) {
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
        AdaptyPurchasedInfo info = ((AdaptyResult.Success<AdaptyPurchasedInfo>) result).getValue();
        //NOTE: info is null in case of cross-grade with DEFERRED proration mode
        AdaptyProfile profile = info != null ? info.getProfile() : null;
        
      	if (profile != null) {
            AdaptyProfile.AccessLevel premium = profile.getAccessLevels().get("YOUR_ACCESS_LEVEL");
            
          	if (premium != null && premium.isActive()) {
                // successful purchase
            }
        }
    } else if (result instanceof AdaptyResult.Error) {
        AdaptyError error = ((AdaptyResult.Error) result).getError();
        // handle the error
    }
});
```
```javascript title="Flutter"
try {
  final profile = await Adapty().makePurchase(product: product);
  if (profile?.accessLevels['YOUR_ACCESS_LEVEL']?.isActive ?? false) {
		// successful purchase      
  }
} on AdaptyError catch (adaptyError) {
	// handle the error
} catch (e) {
}
```
```csharp title="Unity"
Adapty.MakePurchase(product, (profile, error) => {
  if(error != null) {
      // handle error
      return;
  }
  
  var accessLevel = profile.AccessLevels["YOUR_ACCESS_LEVEL"];
  if (accessLevel != null && accessLevel.IsActive) {
      // grant access to features
  }
});
```
```typescript title="React Native (TS)"
try {
	const profile = await adapty.makePurchase(product);
  const isSubscribed = profile?.accessLevels['YOUR_ACCESS_LEVEL']?.isActive;
  
	if (isSubscribed) {
		// grant access to features in accordance with access level
	}
} catch (error) {
	// handle the error
}
```

Request parameters:

| Parameter   | Presence | Description                                                                                         |
| :---------- | :------- | :-------------------------------------------------------------------------------------------------- |
| **Product** | required | An [`AdaptyPaywallProduct`](sdk-models#adaptypaywallproduct) object retrieved from the paywall. |

Response parameters:

| Parameter | Description |
|---------|-----------|
| **Profile** | <p>An [AdaptyProfile](sdk-models#adaptyprofile) object provides comprehensive information about a user's access levels, subscriptions, and non-subscription purchases within the app.</p><p>Check the access level status to ascertain whether the user has the required access to the app.</p> |


Below is a complete example of making the purchase of the access level `premium`. `Premium` is the default access level, so in most cases, your code will look this way:

```swift title="Swift"
Adapty.makePurchase(product: product) { result in
    switch result {
    case let .success(info):
        if info.profile.accessLevels["premium"]?.isActive ?? false {
            // grant access to premium features
        }
    case let .failure(error):
        // handle the error
    }
}
```
```kotlin title="Kotlin"
Adapty.makePurchase(activity, product) { result ->
    when (result) {
        is AdaptyResult.Success -> {
            val info = result.value
            //NOTE: info is null in case of cross-grade with DEFERRED proration mode
            val profile = info?.profile
            
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
        AdaptyPurchasedInfo info = ((AdaptyResult.Success<AdaptyPurchasedInfo>) result).getValue();
        //NOTE: info is null in case of cross-grade with DEFERRED proration mode
        AdaptyProfile profile = info != null ? info.getProfile() : null;
        
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
```javascript title="Flutter"
try {
  final profile = await Adapty().makePurchase(product: product);
  if (profile?.accessLevels['premium']?.isActive ?? false) {
		// grant access to premium features      
  }
} on AdaptyError catch (adaptyError) {
	// handle the error
} catch (e) {
}
```
```csharp title="Unity"
Adapty.MakePurchase(product, (profile, error) => {
  if(error != null) {
      // handle error
      return;
  }
  
  // "premium" is an identifier of default access level
  var accessLevel = profile.AccessLevels["premium"];
  if (accessLevel != null && accessLevel.IsActive) {
      // grant access to premium features
  }
});
```
```typescript title="React Native (TS)"
try {
	const profile = await adapty.makePurchase(product);
	const isSubscribed = profile?.accessLevels['premium']?.isActive;
  
	if (isSubscribed) {
		// grant access to premium features
	}
} catch (error) {
	// handle the error
}
```

:::warning
**Note:** if you're still on Apple's StoreKit version lower than v2.0 and Adapty SDK version lowers than v.2.9.0, you need to provide [Apple App Store shared secret](app-store-shared-secret) instead. This method is currently deprecated by Apple.
:::

## Change subscription when making a purchase

When a user opts for a new subscription instead of renewing the current one, the way it works depends on the app store:

- For the App Store, the subscription is automatically updated within the subscription group. If a user purchases a subscription from one group while already having a subscription from another, both subscriptions will be active at the same time.
- For Google Play, the subscription isn't automatically updated. You'll need to manage the switch in your mobile app code as described below.

To replace the subscription with another one in Android, call `.makePurchase()` method with the additional parameter:

```kotlin title="Kotlin"
Adapty.makePurchase(activity, product, subscriptionUpdateParams) { result ->
    when (result) {
        is AdaptyResult.Success -> {
            val info = result.value
            //NOTE: info is null in case of cross-grade with DEFERRED proration mode
            val profile = info?.profile
            
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
        AdaptyPurchasedInfo info = ((AdaptyResult.Success<AdaptyPurchasedInfo>) result).getValue();
        //NOTE: info is null in case of cross-grade with DEFERRED proration mode
        AdaptyProfile profile = info != null ? info.getProfile() : null;
        
      	// successful cross-grade
    } else if (result instanceof AdaptyResult.Error) {
        AdaptyError error = ((AdaptyResult.Error) result).getError();
        // handle the error
    }
});
```
```javascript title="Flutter"
// TODO: add example
```
```csharp title="Unity"
// TODO: add example
```
```typescript title="React Native (TS)"
// TODO: add example
```

Additional request parameter:

| Parameter                    | Presence | Description                                                                                          |
| :--------------------------- | :------- | :--------------------------------------------------------------------------------------------------- |
| **subscriptionUpdateParams** | required | an [`AdaptySubscriptionUpdateParameters`](sdk-models#adaptysubscriptionupdateparameters) object. |

You can read more about subscriptions and proration modes in the Google Developer documentation:

- [About subscriptions](https://developer.android.com/google/play/billing/subscriptions#proration)
- [Recommendations from Google for proration modes](https://developer.android.com/google/play/billing/subscriptions#proration-recommendations)
- Proration mode [`IMMEDIATE_AND_CHARGE_PRORATED_PRICE`](https://developer.android.com/reference/com/android/billingclient/api/BillingFlowParams.ProrationMode#IMMEDIATE_AND_CHARGE_PRORATED_PRICE). Note: this method is available only for subscription upgrades. Downgrades are not supported.
- Proration mode [`DEFERRED`](https://developer.android.com/reference/com/android/billingclient/api/BillingFlowParams.ProrationMode#DEFERRED). Note: in case of success, `profile` in the callback will be returned as `null` since a real subscription change will occur only when the current subscription's billing period ends.

## Make a deferred purchase in iOS

For deferred purchases on iOS, Adapty SDK has an optional delegate method, which is called when the user starts the purchase in the App Store, and the transaction continues in your app. Just store `makeDeferredPurchase` and call it later if you want to hold your purchase for now. Then show the paywall to your user. To continue purchase, call `makeDeferredPurchase`.

```swift title="Swift"
extension AppDelegate: AdaptyDelegate {
    func paymentQueue(shouldAddStorePaymentFor product: AdaptyDeferredProduct, defermentCompletion makeDeferredPurchase: @escaping (ResultCompletion<AdaptyPurchasedInfo>?) -> Void) {
        // you can store makeDeferredPurchase callback and call it later
        
        // or you can call it right away
        makeDeferredPurchase { result in
            // check the purchase
        }
    }
}
```

## Redeem Offer Code in iOS

Since iOS 14.0, your users can redeem Offer Codes. Code redemption means using a special code, like a promotional or gift card code, to get free access to content or features in an app or on the App Store. To enable users to redeem offer codes, you can display the offer code redemption sheet by using the appropriate SDK method:

```swift title="Swift"
Adapty.presentCodeRedemptionSheet()
```
```typescript title="React Native (TS)"
adapty.presentCodeRedemptionSheet();
```

:::danger
Based on our observations, the Offer Code Redemption sheet in some apps may not work reliably. We recommend redirecting the user directly to the App Store.

In order to do this, you need to open the url of the following format:
`https://apps.apple.com/redeem?ctx=offercodes&id={apple_app_id}&code={code}`
:::