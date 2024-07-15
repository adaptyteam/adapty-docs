---
title: "Displaying paywalls & products"
description: ""
metadataTitle: ""
---

Adapty allows you to remotely configure the products that will be displayed in your app. This way, you don't have to hardcode your products, and you can dynamically change offers or run A/B tests without needing to release a new version of your app.

:::warning
Make sure you've created the [products](product), [paywalls](https://docs.adapty.io/docs/paywalls) and [placements](placements) in Adapty before fetching them.
:::

In order to display the products, you need to get a paywall from one of your placements:

```swift
Adapty.getPaywall(placementId: "YOUR_PLACEMENT_ID", locale: "en") { result in
    switch result {
        case let .success(paywall):
            // the requested paywall
        case let .failure(error):
            // handle the error
    }
}
```
```kotlin
Adapty.getPaywall("YOUR_PLACEMENT_ID", locale = "en") { result ->
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
```java
Adapty.getPaywall("YOUR_PLACEMENT_ID", "en", result -> {
    if (result instanceof AdaptyResult.Success) {
        AdaptyPaywall paywall = ((AdaptyResult.Success<AdaptyPaywall>) result).getValue();
        // the requested paywall
      
    } else if (result instanceof AdaptyResult.Error) {
        AdaptyError error = ((AdaptyResult.Error) result).getError();
        // handle the error
      
    }
});
```
```javascript Flutter
try {
  final paywall = await Adapty().getPaywall(id: "YOUR_PLACEMENT_ID", locale: "en");
  // the requested paywall
} on AdaptyError catch (adaptyError) {
  // handle the error
} catch (e) {
}
```
```csharp Unity
Adapty.GetPaywall("YOUR_PLACEMENT_ID", "en", (paywall, error) => {
  if(error != null) {
    // handle the error
    return;
  }
  
  // paywall - the resulting object
});
```
```typescript React Native (TS)
try {
	const id = 'YOUR_PLACEMENT_ID';
	const locale = 'en';

	const paywall = await adapty.getPaywall(id, locale);
  // the requested paywall
} catch (error) {
	// handle the error
}
```

#### `getPaywall` parameters

- **`placementId`** (required): The identifier of the desired [Placement](placements). This is the value you specified when creating a placement in your Adapty Dashboard.
- **`locale`** (optional): The identifier of the [paywall localization](https://docs.adapty.io/docs/paywalls#localizations). This parameter is expected to be a language code composed of one or more subtags separated by the "-" character. The first subtag is for the language, the second one is for the region.  
  Example: `en` means English, `en-US` represents US English.  
  If this parameter is omitted, the paywall will be returned in the default locale.

:::note
Learn more about locale codes and how we recommend using them here: [Localizations and locale codes](localizations-and-locale-codes)
:::

- **`fetchPolicy`** (default: `.reloadRevalidatingCacheData`): by default SDK will try to load data from the server and will return cached data in case of failure. Otherwise, use `.returnCacheDataElseLoad` to return cached data if it exists.

:::note
Adapty SDK includes a cache that will be used when it's not possible to fetch the latest data from the server. This typically occurs when there is no internet connection or other factors that hinder communication with the server. The cache is updated regularly, so it's safe to use it during the session to avoid network requests. We recommend using `.returnCacheDataElseLoad` in most cases.

Note that the cache remains intact upon restarting the app and is only cleared when the app is reinstalled or through manual cleanup.
:::

- **`loadTimeout`** (default: 5 sec): This value limits the timeout for this method. If the timeout is reached, cached data or local fallback will be returned.

:::note
Adapty SDK stores paywalls in two layers: regularly updated cache described above and [local fallbacks](https://docs.adapty.io/docs/placements#fallback-paywalls). We also use CDN to faster fetch paywalls and a stand-alone fallback server in case the CDN is unreachable. This system is designed to make sure you always get the latest version of your paywalls while ensuring reliability even in cases where internet connection is scarce.

Note that in rare cases this method can timeout slightly later than specified in `loadTimeout`, since the operation may consist of different requests under the hood.
:::

#### Response

In response you receive a **Paywall**: an [`AdaptyPaywall`](sdk-models#adaptypaywall) object. This model contains the list of the product IDs, paywall's identifier, remote config, and several other properties.

Once you have the paywall, you can query the product array that corresponds to it:

```swift
Adapty.getPaywallProducts(paywall: paywall) { result in    
    switch result {
    case let .success(products):
        // the requested products array
    case let .failure(error):
        // handle the error
    }
}
```
```kotlin
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
```java
Adapty.getPaywallProducts(paywall, result -> {
    if (result instanceof AdaptyResult.Success) {
        List<AdaptyPaywallProduct> products = ((AdaptyResult.Success<List<AdaptyPaywallProduct>>) result).getValue();
        // the requested products
      
    } else if (result instanceof AdaptyResult.Error) {
        AdaptyError error = ((AdaptyResult.Error) result).getError();
        // handle the error
      
    }
});
```
```javascript Flutter
try {
  final products = await Adapty().getPaywallProducts(paywall: paywall);
  // the requested products array
} on AdaptyError catch (adaptyError) {
  // handle the error
} catch (e) {
}
```
```csharp Unity
Adapty.GetPaywallProducts(paywall, (products, error) => {
  if(error != null) {
    // handle the error
    return;
  }
  
  // products - the requested products array
});
```
```typescript React Native (TS)
try {
	// ...paywall
	const products = await adapty.getPaywallProducts(paywall);
  // the requested products list
} catch (error) {
	// handle the error
}
```

Next, build your paywall view using the fetched products and show it to the user. When the user makes a purchase, simply call `.makePurchase()` with the product from your paywall.

```swift
let product = products.first

Adapty.makePurchase(product: product) { result in
    switch result {
    case let .success(profile):
        // successful purchase
    case let .failure(error):
        // handle the error
    }
}
```
```kotlin
Adapty.makePurchase(activity, product) { result ->
    when (result) {
        is AdaptyResult.Success -> {
            val profile = result.value              
            // successful purchase
        }
        is AdaptyResult.Error -> {
            val error = result.error
            // handle the error
        }
    }
}
```
```java
Adapty.makePurchase(activity, product, result -> {
    if (result instanceof AdaptyResult.Success) {
        AdaptyProfile profile = ((AdaptyResult.Success<AdaptyProfile>) result).getValue();
        // successful purchase
    } else if (result instanceof AdaptyResult.Error) {
        AdaptyError error = ((AdaptyResult.Error) result).getError();
        // handle the error
    }
});
```
```javascript Flutter
final product = products.first; // don't forget to check the List is not empty

try {
  final result = await Adapty().makePurchase(product: product);
  // successful purchase
} on AdaptyError catch (adaptyError) {
  // handle the error
} catch (e) {
}
```
```csharp Unity
Adapty.MakePurchase(product, (profile, error) => {
  if(error != null) {
      // handle error
      return;
  }
  
  // successful purchase
});
```
```typescript React Native (TS)
try {
	// ...product
	const result = await adapty.makePurchase(product);
  // successful purchase
} catch (error) {
	// handle the error
}
```

You can find more information on how to make purchases in the corresponding [article](making-purchases).

:::warning
Since paywalls are configured remotely, the available products, the number of products, and special offers (such as free trials) can change over time. Make sure your code handles these scenarios.
For example, if you initially retrieve 2 products, your app should display those 2 products. However, if you later retrieve 3 products, your app should display all 3 without requiring any code changes.

**Don't hardcode product IDs** — you won't need them.
:::

### Intro offer eligibility (not applicable for Android)

:::warning
We urge you to be very careful with this scenario, as Apple's reviewers can check it quite rigorously. However, based on our experience with them, we conclude that the behavior of the payment environment in which they perform their checks may be somewhat different from our usual sandbox and production.
:::

After getting a products array you might want to ensure user is eligible to get an introductory offer. To do this you should simply call `getProductsIntroductoryOfferEligibility(products:)` method:

```swift
Adapty.getProductsIntroductoryOfferEligibility(products: products) { result in
	switch result {
		case .success(let eligibilities):
			// update your UI
		case let .failure(error):
			// handle the error
	}
}
```
```javascript Flutter
try {
  final eligibilities = await Adapty().getProductsIntroductoryOfferEligibility(products: products);
	// update your UI
} on AdaptyError catch (adaptyError) {
  // handle the error
} catch (e) {
  // handle the error
}
```
```csharp Unity
Adapty.GetProductsIntroductoryOfferEligibility(products, (eligibilities, error) => {
  if (eligibilities != null) {
    // update your UI
  }
  if (error != null {
    // handle the error
  }
});
```

Next you can see all the possible values of `AdaptyEligibility`

| Value         | Descriptions                                                                 |
| :------------ | :--------------------------------------------------------------------------- |
| eligble       | User is eligible for intro offer, it is safe to reflect this info in you UI. |
| ineligible    | User is not eligible to get any offer, you should't present it in your UI.   |
| notApplicable | This kind of product is not configured to have an offer.                     |

### Paywall analytics

Adapty helps you to measure the performance of your paywalls. We automatically collect all the metrics related to purchases except for paywall views. This is because only you know when the paywall was shown to a customer.  
Whenever you show a paywall to your user, call `.logShowPaywall(paywall)` to log the event, and it will be accumulated in your paywall metrics.

```swift
Adapty.logShowPaywall(paywall)
```
```kotlin
Adapty.logShowPaywall(paywall)
```
```java
Adapty.logShowPaywall(paywall);
```
```javascript Flutter
try {
  final result = await Adapty().logShowPaywall(paywall: paywall);
} on AdaptyError catch (adaptyError) {
  // handle the error
} catch (e) {
}
```
```csharp Unity
Adapty.LogShowPaywall(paywall, (error) => {
    // handle the error
});
```
```typescript React Native (TS)
await adapty.logShowPaywall(paywall);
```

Request parameters:

- **AdaptyPaywall** (required): an [`AdaptyPaywall`](sdk-models#adaptypaywall) object.

### Fallback paywalls

Adapty allows you to provide fallback paywalls that will be used when a user opens the app and there's no connection with Adapty backend (e.g. no internet connection or in the rare case when backend is down) and there's no cache on the device.

To set fallback paywalls, use `.setFallbackPaywalls` method. You should pass exactly the same payload you're getting from Adapty backend. You can copy it from Adapty Dashboard.  
Here's an example of getting fallback paywall data from the locally stored JSON file named `fallback_paywalls`.

```swift
if let urlPath = Bundle.main.url(forResource: "fallback_paywalls", withExtension: "json"),
   let paywallsData = try? Data(contentsOf: urlPath) {
     Adapty.setFallbackPaywalls(paywallsData)
}
```
```kotlin
val paywalls: String = //get paywalls JSON from where you stored it

Adapty.setFallbackPaywalls(paywalls)
```
```java
String paywalls = //get paywalls JSON from where you stored it

Adapty.setFallbackPaywalls(paywalls);
```
```javascript Flutter
import 'dart:async' show Future;
import 'dart:io' show Platform;
import 'package:flutter/services.dart' show rootBundle;

final filePath = Platform.isIOS ? 'assets/fallback_ios.json' : 'assets/fallback_android.json';
final jsonString = await rootBundle.loadString(filePath);

try {
  await adapty.setFallbackPaywalls(jsonString);
} on AdaptyError catch (adaptyError) {
  // handle the error
} catch (e) {
}
```
```csharp Unity
Adapty.SetFallbackPaywalls("<FALLBACK_PAYWALL_DATA>", (error) => {
    if(error != null) {
        // handle error
    }
});
```
```typescript React Native (TS)
const fallbackPaywalls = require('./fallback_paywalls.json');
// React Native automatically parses JSON, but we do not need that
const fallbackString = JSON.stringify(fallbackPaywalls);

await adapty.setFallbackPaywalls(fallbackString);
```

Request parameters:

- **Paywalls** (required): a JSON representation of your paywalls/products list in the exact same format as provided by Adapty backend.

:::note
You can also hardcode fallback paywall data or receive it from your remote server. Keep in mind that this data will only be valid for the date you hardcoded it, so it's important  to update locally stored JSON file periodically together with your app release.
:::

Please also keep in mind, that there is no way to manually request data from the cache/fallback paywalls. Adapty also does not have the ability to configure retries and timeouts, but it's important to note that the timeout for requests is already set to a reasonable duration of 30 seconds. The allocated 30 seconds will elapse in the presence of a connection, even if it's of subpar quality. However, in cases where there is a complete absence of connection or if the server is offline, an error will be promptly received without waiting for the full 30-second timeframe.

### Paywall remote config

There is a remote config available with Adapty which [can be built](https://docs.adapty.io/docs/paywalls#paywall-remote-config) right through the dashboard and then used inside your app. To get such a config, just access the`remoteConfig` property and extract needed values.

```swift
Adapty.getPaywall("YOUR_PLACEMENT_ID") { result in
    let paywall = try? result.get()
    let headerText = paywall?.remoteConfig?["header_text"] as? String
}
```
```kotlin
Adapty.getPaywall("YOUR_PLACEMENT_ID") { result ->
    when (result) {
        is AdaptyResult.Success -> {
            val paywall = result.value
            val headerText = paywall.remoteConfig?.get("header_text") as? String
        }
        is AdaptyResult.Error -> {
            val error = result.error
            // handle the error
        }
    }
}
```
```java
Adapty.getPaywall("YOUR_PLACEMENT_ID", result -> {
    if (result instanceof AdaptyResult.Success) {
        AdaptyPaywall paywall = ((AdaptyResult.Success<AdaptyPaywall>) result).getValue();
        
        ImmutableMap<String, Object> remoteConfig = paywall.getRemoteConfig();
        
        if (remoteConfig != null) {
            if (paywall.getRemoteConfig().get("header_text") instanceof String) {
                            String headerText = (String) paywall.getRemoteConfig().get("header_text");
                        }
        }
    } else if (result instanceof AdaptyResult.Error) {
        AdaptyError error = ((AdaptyResult.Error) result).getError();
        // handle the error
    }
});
```
```javascript Flutter
try {
  final paywall = await Adapty().getPaywall(id: "YOUR_PLACEMENT_ID");
  final String? headerText = paywall.remoteConfig?['header_text'];
} on AdaptyError catch (adaptyError) {
  // handle the error
} catch (e) {
}
```