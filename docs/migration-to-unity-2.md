---
title: "Unity – What's new"
description: ""
metadataTitle: ""
---

In the new version of the Adapty SDK, we've made quite a lot of changes to the internal implementation of our SDK, applying all of our accumulated experience. We also redesigned our public API and relationships between some entities so that it causes as little misunderstanding as possible and reduces the number of errors made by developers. 

First, let's look at the main things that have been changed, and then let's discuss each item individually.

- [Profile](#profile) – we have renamed `PurchaserInfoModel ` to `Profile`. This also affected all related functions.
- [Paywalls](#paywalls) – now you can get only the necessary paywall.
- [Products](#products) – we separated the concept of paywall and product, so now the developer first asks for the paywall they want, and then the corresponding product array.
- [MakePurchase Signature](#makepurchase-signature) – we removed the `offerId` parameter from `.MakePurchase` method.
- [Introductory offer eligibility](#introductory-offer-eligibility) – instead of true/false we give an extended list of options.
- [Products Fetch Policy](#products-fetch-policy) – we have added the ability to explicitly get products after we send the receipt to our servers.

We've also compiled a full list of changes, which can be found on the release page on our [GitHub](https://github.com/adaptyteam/AdaptySDK-Unity/releases/tag/2.2.0)

### Profile

**Before:**  
Previously, all information that related to the user was in the `PurchaserInfo` model. This information was obtained by calling the `.getPurchaserInfo(forceUpdate:)` method:

```csharp title="C#"
// AdaptySDK 1.x.x
Adapty.GetPurchaserInfo(forceUpdate, (purchaserInfo, error) => {
    if (error == null) {
        // check the access
    }
});
```

**After:**  
Now we have renamed the model to [`Adapty.Profile`](sdk-models#adaptyprofile). Also it affected the corresponding method:

```csharp title="C#"
// AdaptySDK 2.0.0
Adapty.GetProfile((profile, error) => {
    if (error == null) {
        // check the access
    }
});
```

**Motivation:**  
This name reflects the essence of the model much more correctly, because not every user is a subscriber. 

This change also affected the `AdaptyEventListener` method: `.OnReceiveUpdatedPurchaserInfo` was renamed to `.OnLoadLatestProfile`

### Paywalls

**Before:**  
Previously, developers used to query an array of paywalls and then search that array for the desired element.

```csharp title="C#"
// AdaptySDK 1.x.x
Adapty.GetPaywalls(forceUpdate, (result, error) => {
  if(error != null) {
    // handle the error
    return;
  }

  var paywalls = result.Paywalls;
  var products = result.Products;
});
```

**After:**  
We have significantly simplified this use case, so now you can get only the requested object, without touching the rest. 

```csharp title="C#"
// AdaptySDK 2.0.0
Adapty.GetPaywall("YOUR_PLACEMENT_ID", (paywall, error) => {
  if(error != null) {
    // handle the error
    return;
  }
  
  // paywall - the resulting object
});
```

**Motivation:**  
In addition to simplifying the most common usage scenario, we also significantly reduce the load on our servers, which will allow us to get a response from the server as quickly as possible.

### Products

**Before:**  
Previously the product entity was a part of the paywall, so you could use it right after `.getPaywalls` method was done. Also you could use products out of the paywalls context.

```csharp title="C#"
// AdaptySDK 1.x.x
Adapty.GetPaywalls(forceUpdate, (result, error) => {
  if(error != null) {
    // handle the error
    return;
  }

  var paywalls = result.Paywalls;
  var products = result.Products;
});
```

**After:**  
Once you have obtained the desired paywall, you can query the products array for it. Now the product entity is independent, although it can only exist in the context of the paywall.

```csharp title="C#"
// AdaptySDK 2.0.0
Adapty.GetPaywallProducts(paywall, (products, error) => {
  if(error != null) {
    // handle the error
    return;
  }
  
  // products - the requested products array
});
```

**Motivation:**  
We believe that this architecture will provide more flexibility in terms of receiving paywalls and products (for example, now you are not blocked by Apple when you receive a paywall), and will also optimize the load on the servers, which will speed up the response. Also, this approach is less error-prone.

:::warning
Products outside the paywalls

If you for some reason want to work with a product (or an array of products), please create a paywall for it. This approach is great for scaling and analytics.
:::

### MakePurchase Signature

In the previous version of sdk, you had to pass `productId`, `variationId` and `offerId` as parameters in order to make a purchase. This approach caused a lot of questions and often led to errors. In the new version you only need to pass the product object, all the necessary information sdk will get from it. If your paywall has an active promotional offer for the product you are attempting to purchase, Adapty will automatically apply that offer at the time of purchase. 

**Before:**  
The `.MakePurchase` function required the`productId`, `variationId` and `offerId` parameters to be passed explicitly:

```csharp title="C#"
// AdaptySDK 1.x.x
Adapty.MakePurchase(productId, variationId, offerId, (result, error) => {
  if(error != null) {
    // handle the error
    return;
  }

  var product = result.Product;
  var purchaserInfo = result.PurchaserInfo;
  var receipt = result.Receipt;
});
```

**After:**  
Starting with version 2.0 you only need to pass the `product` parameter (and `subscriptionUpdate` for Android if needed).  
The Adapty SDK automatically reads `variationId` parameter and uses the `promotionalOfferId` field to apply the discount, taking the value of the `promotionalOfferEligibility` field into account.

```csharp title="C#"
// AdaptySDK 2.0.0
Adapty.MakePurchase(product, (profile, error) => {
  if(error != null) {
    // handle the error
    return;
  }
  
  // successful purchase
});
```

:::warning
Adapty signs the request according to Apple guidelines, please make sure you've uploaded [Subscription Key](app-store-promotional-offers) in Adapty Dashboard when using promotional offers.
:::

### Introductory offer eligibility

The `PaywallProduct` entity has the `IntroductoryOfferEligibility` property, it determines whether the introductory offer is available to the user (for example, a free trial period) or has already been used. 

**Before:**  
`IntroductoryOfferEligibility` was a Boolean value

**After:**  
`introductoryOfferEligibility` is an enumeration

```csharp title="C#"
// AdaptySDK 2.0.0
public enum Eligibility {
    Unknown,
    Ineligible,
    Eligible
}
```

**Motivation:**  
**StoreKit** does not provide a convenient and reliable way to determine this value, so we have to do it by analyzing the receipt from the system. Since there are cases when this receipt is missing, we decided to inform you about these situations using the value `unknown`. We recommend working with `unknown` in the same way as `ineligible`. 

### Products fetch policy

As mentioned in the previous section, StoreKit version 1 does not allow you to reliably determine the value of the `IntroductoryOfferEligibility` without analyzing the receipt. Despite the fact that a missing receipt at startup is a pretty rare situation, we have added the ability to explicitly get products after we send the receipt to our servers.

This mechanism is implemented in this way: we will try to request a receipt in its unavailability in advance, and there is a special parameter of `.GetPaywallProducts` function to get products with a correct `IntroductoryOfferEligibility `:

```csharp title="C#"
// AdaptySDK 2.0.0
Adapty.GetPaywallProducts(paywall, IOSProductsFetchPolicy.WaitForReceiptValidation, (products, error) => {
  if(error != null) {
    // handle the error
    return;
  }
  
  // update your UI
});
```

**Motivation:**  
The call sequence for the correct functioning of the system was unobvious and less reliable.  
We recommend first requesting products without overriding `fetchPolicy`, and then immediately rendering the UI. If you get back objects with an unknown `IntroductoryOfferEligibility` value, you can re-request products with `.WaitForReceiptValidation` policy and update the UI afterward.  
Read more about handling such a scenario in the [_Displaying Paywalls & Products_](https://docs.adapty.io/docs/unity-displaying-products#products-fetch-policy-and-intro-offer-eligibility) section.

### In lieu of a conclusion

In this article, we have listed the most significant changes introduced in the new version, which can be seen in the public API. However, most of the improvements are hidden "under the hood" and are not mentioned here. Of course, we've completely updated our documentation to reflect the new release, so you can feel free to use it. 

You can find the complete list of changes on the [release page](https://github.com/adaptyteam/AdaptySDK-Unity/releases/tag/2.2.0). 

Stay tuned for more updates!