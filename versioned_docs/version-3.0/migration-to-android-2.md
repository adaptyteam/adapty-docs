---
title: "Android – What's new"
description: ""
metadataTitle: ""
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

In the new version of the Adapty SDK, we've made quite a lot of changes to the internal implementation of our SDK, applying all of our accumulated experience. We also redesigned our public API and relationships between some entities so that it causes as little misunderstanding as possible and reduces the number of errors made by developers. 

First, let's look at the main things that have been changed, and then let's discuss each item individually.

- [Profile](#profile) – we have renamed `PurchaserInfo` to `AdaptyProfile`. This also affected all related functions.
- [Paywalls](#paywalls) – now you can get only the necessary paywall.
- [Products](#products) – we separated the concept of paywall and product, so now the developer first asks for the paywall they want, and then the corresponding product list.

We've also compiled a full list of changes, which can be found on the release page on our [GitHub](https://github.com/adaptyteam/AdaptySDK-Android/releases/tag/2.0.0)

### Profile

**Before:**  
Previously, all information that related to the user was in the `PurchaserInfo` model. This information was obtained by calling the `.getPurchaserInfo(forceUpdate)` method:

```kotlin title="Kotlin"
// AdaptySDK 1.x.x
Adapty.getPurchaserInfo(forceUpdate) { purchaserInfo, error ->
    if (error == null) {
        // check the access 
    }
}
```

**After:**  
Now we have renamed the model to [`AdaptyProfile`](sdk-models#adaptyprofile). Also it affected the corresponding method:

```kotlin title="Kotlin"
// AdaptySDK 2.0.0
Adapty.getProfile { result ->
    if (result is AdaptyResult.Success) {
        val profile = result.value
        //check the access
    }
}
```

**Motivation:**  
This name reflects the essence of the model much more correctly, because not every user is a subscriber. 

This change also affected the method `.setOnPurchaserInfoUpdatedListener()` to `.setOnProfileUpdatedListener()`

### Paywalls

**Before:**  
Previously, developers used to query a list of paywalls and then search that list for the desired element.

```kotlin title="Kotlin"
// AdaptySDK 1.x.x
Adapty.getPaywalls(forceUpdate) { paywalls, products, error ->
    if (error == null) {
        // retrieve the products from paywalls
    }
}
```

**After:**  
We have significantly simplified this use case, so now you can get only the requested object, without touching the rest. 

```kotlin title="Kotlin"
// AdaptySDK 2.0.0
Adapty.getPaywall("YOUR_PLACEMENT_ID") { result ->
    when (result) {
        is AdaptyResult.Success -> {
            val paywall = result.value
            // the requested paywall
        }
        is AdaptyResult.Error -> {
            val error = result.error
            // handle the error
        }
    }
}
```

**Motivation:**  
In addition to simplifying the most common usage scenario, we also significantly reduce the load on our servers, which will allow us to get a response from the server as quickly as possible.

### Products

**Before:**  
Previously the product entity was a part of the paywall, so you could use it right after `.getPaywalls` method was done. Also you could use products out of the paywalls context.

```kotlin title="Kotlin"
// AdaptySDK 1.x.x
Adapty.getPaywalls(forceUpdate) { paywalls, products, error ->
    if (error == null) {
        // retrieve the products from paywalls
    }
}
```

**After:**  
Once you have obtained the desired paywall, you can query the list of products for it. Now the product entity is independent, although it can only exist in the context of the paywall.

```kotlin title="Kotlin"
// AdaptySDK 2.0.0
Adapty.getPaywallProducts(paywall) { result ->
    when (result) {
        is AdaptyResult.Success -> {
            val products = result.value
            // the requested products
        }
        is AdaptyResult.Error -> {
            val error = result.error
            // handle the error
        }
    }
}
```

**Motivation:**  
We believe that this architecture will provide more flexibility in terms of receiving paywalls and products (for example, now you are not blocked by Google when you receive a paywall), and will also optimize the load on the servers, which will speed up the response. Also, this approach is less error-prone.

:::warning
Products outside the paywalls

If you for some reason want to work with a product (or an array of products), please create a paywall for it. This approach is great for scaling and analytics.
:::

### In lieu of a conclusion

In this article, we have listed the most significant changes introduced in the new version, which can be seen in the public API. However, most of the improvements are hidden "under the hood" and are not mentioned here. Of course, we've completely updated our documentation to reflect the new release, so you can feel free to use it. 

You can find the complete list of changes on the [release page](https://github.com/adaptyteam/AdaptySDK-Android/releases/tag/2.0.0). 

Stay tuned for more updates!



---

**What's next:**

- [Migrate to Adapty SDK 3.0.x](migration-to-adapty-sdk-v3)