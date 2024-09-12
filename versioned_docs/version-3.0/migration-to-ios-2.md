---
title: "iOS – What's new"
description: ""
metadataTitle: ""
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

In the new version of the Adapty SDK, we've made quite a lot of changes to the internal implementation of our SDK, applying all of our accumulated experience. We also redesigned our public API and relationships between some entities so that it causes as little misunderstanding as possible and reduces the number of errors made by developers. 

First, let's look at the main things that have been changed, and then let's discuss each item individually.

- [Profile](#profile) – we have renamed `PurchaserInfo` to `AdaptyProfile`. This also affected all related functions.
- [Paywalls](#paywalls) – now you can get only the necessary paywall.
- [Products](#products) – we separated the concept of paywall and product, so now the developer first asks for the paywall they want, and then the corresponding product array.
- [Fallback Paywalls](#fallback-paywalls) – `.setFallbackPaywalls` method now accepts `Data` type as a parameter.
- [Promotional offers](#promotional-offers) – we removed the `offerId` parameter from `.makePurchase` method.
- [Introductory offer eligibility](#introductory-offer-eligibility) – instead of true/false we give an extended list of options.
- [Products Fetch Policy](#products-fetch-policy) – we have added the ability to explicitly get products after we send the receipt to our servers.
- [Logging](#logging) – We redesigned the logging module so that you can integrate your systems into it and use the logs as you see fit.
- [Swift](#ios-and-swift) – our iOS SDK is now written in pure Swift.

We've also compiled a full list of changes, which can be found on the release page on our [GitHub](https://github.com/adaptyteam/AdaptySDK-iOS/releases/tag/2.0.2)

### Profile

**Before:**  
Previously, all information that related to the user was in the `PurchaserInfo` model. This information was obtained by calling the `.getPurchaserInfo(forceUpdate:)` method:

```swift title="Swift"
// AdaptySDK 1.x.x
Adapty.getPurchaserInfo(forceUpdate: Bool) { (purchaserInfo, error) in
    if error == nil {
        // check the accesss 
    }
}
```

**After:**  
Now we have renamed the model to [`AdaptyProfile`](sdk-models#adaptyprofile). Also it affected the corresponding method:

```swift title="Swift"
// AdaptySDK 2.0.0
Adapty.getProfile { result in
    if let profile = try? result.get() {
        // check the access
    }
}
```

**Motivation:**  
This name reflects the essence of the model much more correctly, because not every user is a subscriber. 

This change also affected the delegate method `.didReceiveUpdatedProfile` to `.didLoadLatestProfile`

### Paywalls

**Before:**  
Previously, developers used to query an array of paywalls and then search that array for the desired element.

```swift title="Swift"
// AdaptySDK 1.x.x
Adapty.getPaywalls(forceUpdate: Bool) { (paywalls, products, error) in
    if error == nil {
        // retrieve the products from paywalls
    }
}
```

**After:**  
We have significantly simplified this use case, so now you can get only the requested object, without touching the rest. 

```swift title="Swift"
// AdaptySDK 2.0.0
Adapty.getPaywall("YOUR_PLACEMENT_ID") { result in
    switch result {
        case let .success(paywall):
            // the requested paywall
        case let .failure(error):
            // handle the error
    }
}
```

**Motivation:**  
In addition to simplifying the most common usage scenario, we also significantly reduce the load on our servers, which will allow us to get a response from the server as quickly as possible.

### Products

**Before:**  
Previously the product entity was a part of the paywall, so you could use it right after `.getPaywalls` method was done. Also you could use products out of the paywalls context.

```swift title="Swift"
// AdaptySDK 1.x.x
Adapty.getPaywalls(forceUpdate: Bool) { (paywalls, products, error) in
    if error == nil {
        // retrieve the products from paywalls
    }
}
```

**After:**  
Once you have obtained the desired paywall, you can query the products array for it. Now the product entity is independent, although it can only exist in the context of the paywall.

```swift title="Swift"
// AdaptySDK 2.0.0
Adapty.getPaywallProducts(paywall: paywall) { result in    
    switch result {
    case let .success(products):
        // the requested products array
    case let .failure(error):
        // handle the error
    }
}
```

**Motivation:**  
We believe that this architecture will provide more flexibility in terms of receiving paywalls and products (for example, now you are not blocked by Apple when you receive a paywall), and will also optimize the load on the servers, which will speed up the response. Also, this approach is less error-prone.

:::warning
Products outside the paywalls

If you for some reason want to work with a product (or an array of products), please create a paywall for it. This approach is great for scaling and analytics.
:::

### Fallback paywalls

**Before:**  
We used to accept fallback paywalls in `String` format:

```swift title="Swift"
if let path = Bundle.main.path(forResource: "fallback_paywalls", ofType: "json"), 
   let paywalls = try? String(contentsOfFile: path, encoding: .utf8) {
     Adapty.setFallbackPaywalls(paywalls)
}
```

**After:**  
We have now replaced this function with one that takes a parameter of type `Data`:

```swift title="Swift"
if let urlPath = Bundle.main.url(forResource: "fallback_paywalls", withExtension: "json"),
   let paywallsData = try? Data(contentsOf: urlPath) {
     Adapty.setFallbackPaywalls(paywallsData)
}
```

**Motivation:**  
We changed the type of accepted parameter to avoid unnecessary conversions. 

### Promotional offers

If your paywall has an active promotional offer for the product you are attempting to purchase, Adapty will automatically apply that offer at the time of purchase.

**Before:**  
The `makePurchase` function required the `offerId` parameter to be passed explicitly:

```swift title="Swift"
Adapty.makePurchase(product: <product>, offerId: <offerId>) { (purchaserInfo, receipt, appleValidationResult, product, error) in
    if error == nil {
        // successful purchase
    }
}
```

**After:**  
Starting with version 2.0 this parameter is no longer present. The Adapty SDK automatically uses the `promotionalOfferId` field to apply the discount, taking the value of the `promotionalOfferEligibility` field into account.

```swift title="Swift"
Adapty.makePurchase(paywall: paywall, product: product) { result in
    switch result {
    case let .success(response):
        // successful purchase
    case let .failure(error):
        // handle the error
    }
}
```

:::warning
Adapty signs the request according to Apple guidelines, please make sure you've uploaded [Subscription Key](app-store-promotional-offers) in Adapty Dashboard when using promotional offers.
:::

### Introductory offer eligibility

The `Product` entity has the `introductoryOfferEligibility` property, it determines whether the introductory offer is available to the user (for example, a free trial period) or has already been used. 

**Before:**  
`introductoryOfferEligibility` was a Boolean value

**After:**  
`introductoryOfferEligibility` is an enumeration

```swift title="Swift"
// AdaptySDK 2.0.0
public enum AdaptyEligibility {
    case unknown
    case ineligible
    case eligible
}
```

**Motivation:**  
**StoreKit** does not provide a convenient and reliable way to determine this value, so we have to do it by analyzing the receipt from the system. Since there are cases when this receipt is missing, we decided to inform you about these situations using the value `unknown`. We recommend working with `unknown` in the same way as `ineligible`. 

### Products fetch policy

As mentioned in the previous section, StoreKit version 1 does not allow you to reliably determine the value of the `introductoryOfferEligibility` without analyzing the receipt. Despite the fact that a missing receipt at startup is a pretty rare situation, we have added the ability to explicitly get products after we send the receipt to our servers.

**Before:**  
In previous versions, the `syncTransactionsHistory` function was added for such situations, which often conflicted with internal SDK calls, slowing it down.

```swift title="Swift"
Adapty.syncTransactionsHistory { params, products, error in
    Adapty.getPaywall("paywall_id") { paywall, error in
        // use paywall and products
    }
}
```

**After:**  
Now this mechanism is implemented much more reliably, we will try to request a receipt in its unavailability in advance, and there is a special parameter of `.getPaywallProducts` function to get products with a correct `introductoryOfferEligibility`:

```swift title="Swift"
Adapty.getPaywallProducts(paywall: paywall, fetchPolicy: .waitForReceiptValidation) { result in
    if let products = try? result.get() {
        // update your UI
    }
}
```

**Motivation:**  
The call sequence for the correct functioning of the system was unobvious and less reliable.  
We recommend first requesting products without overriding `fetchPolicy`, and then immediately rendering the UI. If you get back objects with an unknown `introductoryOfferEligibility` value, you can re-request products with `.waitForReceiptValidation` policy and update the UI afterward.  
Read more about handling such a scenario in the [_Displaying Paywalls & Products_](display-remote-config-paywalls) section.

### Logging

It is critical for a library such as ours to have an understandable and customizable logging system. Just as before, our SDK has several levels of logging, but now you can also override the stream the messages will be sent to. By default, messages will be sent to the console, but you can optionally write them to a file or send them to your favorite logging system.

```swift title="Swift"
Adapty.setLogHandler { level, message in
    logToSomeFancyLoggingSystem("Adapty \(level): \(message)")
}
```

### iOS and Swift

Despite the fact that technically the first version of the SDK was written in Swift, we were forced to maintain backward compatibility with Objective-C, as there are a huge number of projects created using this obsolete programming language.  
This approach prevented us from using Swift to its full potential. We did not take full advantage of the Value Types, as well as the many other features available only in Swift.

For example, we can now happily use the built-in Result type. This led to a slight change in callbacks in many places in the public API.

**Before:**  
The callback contains a lot of variables, including an error.

```swift title="Swift"
Adapty.makePurchase(product: <product>, offerId: <offerId>) { (purchaserInfo, receipt, appleValidationResult, product, error) in
    if error == nil {
        // successful purchase
    }
}
```

**After:**  
A much more elegant and familiar way to handle the result

```swift title="Swift"
Adapty.makePurchase(paywall: paywall, product: product) { result in
    switch result {
    case let .success(response):
        // successful purchase
    case let .failure(error):
        // handle the error
    }
}
```

### In lieu of a conclusion

In this article, we have listed the most significant changes introduced in the new version, which can be seen in the public API. However, most of the improvements are hidden "under the hood" and are not mentioned here. Of course, we've completely updated our documentation to reflect the new release, so you can feel free to use it. 

You can find the complete list of changes on the [release page](https://github.com/adaptyteam/AdaptySDK-iOS/releases/tag/2.0.2). 

Stay tuned for more updates!