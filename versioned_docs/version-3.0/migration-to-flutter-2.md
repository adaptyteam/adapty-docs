---
title: "Flutter – What's new"
description: "Migrating to Flutter 2 | Adapty Docs"
metadataTitle: "Migrate your app to Flutter 2 with Adapty for better monetization support."
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

In the new version of the Adapty SDK, we've made quite a lot of changes to the internal implementation of our SDK, applying all of our accumulated experience. We also redesigned our public API and relationships between some entities so that it causes as little misunderstanding as possible and reduces the number of errors made by developers. 

First, let's look at the main things that have been changed, and then let's discuss each item individually.

- [Profile](#profile) – we have renamed `AdaptyPurchaserInfo` to `AdaptyProfile`. This also affected all related functions.
- [Paywalls](#paywalls) – now you can get only the necessary paywall.
- [Products](#products) – we separated the concept of paywall and product, so now the developer first asks for the paywall they want, and then the corresponding product array.
- [Promotional offers](#promotional-offers) – we removed the `offerId` parameter from `.makePurchase` method.
- [Introductory offer eligibility](#introductory-offer-eligibility) – instead of true/false we give an extended list of options.
- [Products Fetch Policy](#products-fetch-policy) – we have added the ability to explicitly get products after we send the receipt to our servers.

We've also compiled a full list of changes, which can be found on the release page on our [GitHub](https://github.com/adaptyteam/AdaptySDK-Flutter/releases/tag/2.2.0)

### Profile

**Before:**  
Previously, all information that related to the user was in the `PurchaserInfo` model. This information was obtained by calling the `.getPurchaserInfo(forceUpdate:)` method:

```javascript showLineNumbers title="Flutter"
// AdaptySDK 1.x.x
try {
	AdaptyPurchaserInfo purchaserInfo = await Adapty().getPurchaserInfo({bool forceUpdate = false});
  // "premium" is an identifier of default access level
  if (purchaserInfo.accessLevels['premium']?.isActive ?? false) {
    // grant access to premium features
  }
} on AdaptyError catch (adaptyError) {
  // handle the error
} catch (e) {
}
```

**After:**  
Now we have renamed the model to [`AdaptyProfile`](sdk-models#adaptyprofile). Also, it affected the corresponding method:

```javascript showLineNumbers title="Flutter"
// AdaptySDK 2.0.0
try {
	AdaptyProfile profile = await Adapty().getProfile();
  // "premium" is an identifier of default access level
  if (profile.accessLevels['premium']?.isActive ?? false) {
    // grant access to premium features
  }
} on AdaptyError catch (adaptyError) {
  // handle the error
} catch (e) {
}
```

**Motivation:**  
This name reflects the essence of the model much more correctly because not every user is a subscriber. 

This change also affected the corresponding stream: `didReceivePurchaserInfoStream` was renamed to `didUpdateProfileStream`

### Paywalls

**Before:**  
Previously, developers used to query an array of paywalls and then search that array for the desired element.

```javascript showLineNumbers title="Flutter"
// AdaptySDK 1.x.x
try {
	final GetPaywallsResult getPaywallsResult = await Adapty().getPaywalls(forceUpdate: Bool);
	final List<AdaptyPaywall> paywalls = getPaywallsResult.paywalls;
} on AdaptyError catch (adaptyError) {
  // handle the error
} catch (e) {
}
```

**After:**  
We have significantly simplified this use case, so now you can get only the requested object, without touching the rest. 

```javascript showLineNumbers title="Flutter"
// AdaptySDK 2.0.0
try {
	final AdaptyPaywall paywall = await Adapty().getPaywall(id: 'YOUR_PLACEMENT_ID');
} on AdaptyError catch (adaptyError) {
  // handle the error
} catch (e) {
}
```

**Motivation:**  
In addition to simplifying the most common usage scenario, we also significantly reduce the load on our servers, which will allow us to get a response from the server as quickly as possible.

### Products

**Before:**  
Previously the product entity was a part of the paywall so that you could use it right after `.getPaywalls` method was done. Also, you could use products out of the paywall context.

```javascript showLineNumbers title="Flutter"
// AdaptySDK 1.x.x
try {
	final GetPaywallsResult getPaywallsResult = await Adapty().getPaywalls(forceUpdate: Bool);
	final List<AdaptyPaywall> paywalls = getPaywallsResult.paywalls;
  // retrieve the products from paywalls
} on AdaptyError catch (adaptyError) {
  // handle the error
} catch (e) {
}
```

**After:**  
Once you have obtained the desired paywall, you can query the products array for it. Now the product entity is independent, although it can only exist in the context of the paywall.

```javascript showLineNumbers title="Flutter"
// AdaptySDK 2.0.0
try {
  final products = await Adapty().getPaywallProducts(paywall: paywall, fetchPolicy: fetchPolicy);
  // the requested products array
} on AdaptyError catch (adaptyError) {
  // handle the error
} catch (e) {
}
```

**Motivation:**  
We believe that this architecture will provide more flexibility in terms of receiving paywalls and products (for example, now you are not blocked by Apple when you receive a paywall), and will also optimize the load on the servers, which will speed up the response. Also, this approach is less error-prone.

:::warning
Products outside the paywalls

If you for some reason want to work with a product (or an array of products), please create a paywall for it. This approach is great for scaling and analytics.
:::

### Promotional offers

If your paywall has an active promotional offer for the product you are attempting to purchase, Adapty will automatically apply that offer at the time of purchase.

**Before:**  
The `makePurchase` function required the `offerId` parameter to be passed explicitly:

```javascript showLineNumbers title="Flutter"
// AdaptySDK 1.x.x
try {
  final MakePurchaseResult makePurchaseResult = await Adapty().makePurchase(<product>, offerId: <offer_id>);
} on AdaptyError catch (adaptyError) {
  // handle the error
} catch (e) {
}
```

**After:**  
Starting with version 2.0 this parameter is no longer present. The Adapty SDK automatically uses the `promotionalOfferId` field to apply the discount, taking the value of the `promotionalOfferEligibility` field into account.

```javascript showLineNumbers title="Flutter"
// AdaptySDK 2.0.0
try {
  final profile = await Adapty().makePurchase(product: product);
} on AdaptyError catch (adaptyError) {
	// handle the error
} catch (e) {
  onUnknownErrorOccured?.call(e);
}
```

:::warning
Adapty signs the request according to Apple guidelines, please make sure you've uploaded [Subscription Key](app-store-connection-configuration#step-3-upload-in-app-purchase-key-file) in Adapty Dashboard when using promotional offers.
:::

### Introductory offer eligibility

The `Product` entity has the `introductoryOfferEligibility` property, it determines whether the introductory offer is available to the user (for example, a free trial period) or has already been used. 

**Before:**  
`introductoryOfferEligibility` was a Boolean value

**After:**  
`introductoryOfferEligibility` is an enumeration

```javascript showLineNumbers title="Flutter"
// AdaptySDK 2.0.0
enum AdaptyEligibility {
  unknown,
  ineligible,
  eligible,
}
```

**Motivation:**  
**StoreKit** does not provide a convenient and reliable way to determine this value, so we have to do it by analyzing the receipt from the system. Since there are cases when this receipt is missing, we decided to inform you about these situations using the value `unknown`. We recommend working with `unknown` in the same way as `ineligible`. 

### Products fetch policy

As mentioned in the previous section, StoreKit version 1 does not allow you to reliably determine the value of the `introductoryOfferEligibility` without analyzing the receipt. Despite the fact that a missing receipt at startup is a pretty rare situation, we have added the ability to explicitly get products after we send the receipt to our servers.

This mechanism is implemented in this way: we will try to request a receipt in its unavailability in advance, and there is a special parameter of `.getPaywallProducts` function to get products with a correct `introductoryOfferEligibility`:

```javascript showLineNumbers title="Flutter"
// AdaptySDK 2.0.0
try {
  final products = await Adapty().getPaywallProducts(paywall: paywall, fetchPolicy: AdaptyIOSProductsFetchPolicy.waitForReceiptValidation);
} on AdaptyError catch (adaptyError) {
  // handle the error
} catch (e) {
}
```

**Motivation:**  
The call sequence for the correct functioning of the system was unobvious and less reliable.  
We recommend first requesting products without overriding `fetchPolicy`, and then immediately rendering the UI. If you get back objects with an unknown `introductoryOfferEligibility` value, you can re-request products with `.waitForReceiptValidation` policy and update the UI afterward.  
Read more about handling such a scenario in the [_Displaying Paywalls & Products_](https://docs.adapty.io/v2.0/docs/flutter-displaying-products#products-fetch-policy-and-intro-offer-eligibility) section.

### In lieu of a conclusion

In this article, we have listed the most significant changes introduced in the new version, which can be seen in the public API. However, most of the improvements are hidden "under the hood" and are not mentioned here. Of course, we've completely updated our documentation to reflect the new release, so you can feel free to use it. 

You can find the complete list of changes on the [release page](https://github.com/adaptyteam/AdaptySDK-Flutter/releases/tag/2.2.0). 

Stay tuned for more updates!



---

**What's next:**

- [Migrate to Adapty SDK 3.0.x](migration-to-adapty-sdk-v3)
