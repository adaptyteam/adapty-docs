---
title: "Android – Displaying Paywalls & Products"
description: ""
metadataTitle: ""
---

Adapty allows you to remotely configure the products that will be displayed in your app. This way you don't have to hardcode the products and can dynamically change offers or run A/B tests without app releases.

:::warning
Make sure you've added the [products](product)  and [paywalls](paywall) in Adapty Dashboard before fetching the products.
:::

In order to display the products, you first need to query the paywall that contains them:

```kotlin title="title="Adapty.getPaywall("YOUR_PAYWALL_ID", locale = "en") { result ->""
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
```java title="title="Adapty.getPaywall("YOUR_PAYWALL_ID", "en", result -> {""
    if (result instanceof AdaptyResult.Success) {
        AdaptyPaywall paywall = ((AdaptyResult.Success<AdaptyPaywall>) result).getValue();
      	// the requested paywall
      
    } else if (result instanceof AdaptyResult.Error) {
        AdaptyError error = ((AdaptyResult.Error) result).getError();
      	// handle the error
      
    }
});
```

Request parameters:

- **id** (required): The identifier of the desired paywall. This is the value you specified when you created the paywall in the Adapty Dashboard.

- **locale** (optional): The identifier of the [paywall localization](paywall#localizations).. This parameter is expected to be a language code composed of one or more subtags separated by the "-" character. The first subtag is for the language, the second one is for the region (The support for regions will be added later).  
  Example: `en` means English, `en-US` represents US English.  
  If the parameter is omitted, the paywall will be returned in the default locale.

Response:

- **Paywall**: an [`AdaptyPaywall`](sdk-models#adaptypaywall) object. This model contains the list of the products ids, paywall's identifier, custom payload, and several other properties.

Once you have the paywall, you can query the product array that corresponds to it:

```kotlin title="title="Adapty.getPaywallProducts(paywall) { result ->""
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
```java title="title="Adapty.getPaywallProducts(paywall, result -> {""
    if (result instanceof AdaptyResult.Success) {
        List<AdaptyPaywallProduct> products = ((AdaptyResult.Success<List<AdaptyPaywallProduct>>) result).getValue();
        // the requested products
      
    } else if (result instanceof AdaptyResult.Error) {
        AdaptyError error = ((AdaptyResult.Error) result).getError();
        // handle the error
      
    }
});
```

:::note
Every time the data is fetched from a remote server, it will be stored in the local cache. This way, you can display the products even when the user is offline.
:::

Next, build your paywall view using `products` and show it to the user. Later on, when the user makes a purchase, simply call `.makePurchase()` with the product from your paywall.

```kotlin title="title="Adapty.makePurchase(activity, product) { result ->""
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
```java title="title="Adapty.makePurchase(activity, product, result -> {""
    if (result instanceof AdaptyResult.Success) {
        AdaptyProfile profile = ((AdaptyResult.Success<AdaptyProfile>) result).getValue();
        // successful purchase
    } else if (result instanceof AdaptyResult.Error) {
        AdaptyError error = ((AdaptyResult.Error) result).getError();
        // handle the error
    }
});
```

You can find more information on how to make purchases in the corresponding [article](android-making-purchases).

:::warning
Since the paywalls are configured remotely, the available products, the number of the products, and the special offers (eg free trials) can change over time. Make sure your code handles these scenarios. For example, if you get 2 products, the 2 products will be displayed, but when you get 3, all of them should be displayed without code changes.

**Don't hard code product ids**, you won't need them.
:::

### Paywall analytics

Adapty helps you to measure the performance of the paywalls. We automatically collect all the metrics related to purchases except for paywall views. This is because only you know when the paywall was shown to a customer.  
Whenever you show a paywall to your user, call `.logShowPaywall(paywall)` to log the event, and it will be accumulated in the paywall metrics.

```kotlin title="title="Adapty.logShowPaywall(paywall)""
```
```java title="title="Adapty.logShowPaywall(paywall);""
```

Request parameters:

- **Paywall** (required): an [`AdaptyPaywall`](sdk-models#adaptypaywall) object.

### Fallback paywalls

Adapty allows you to provide fallback paywalls that will be used when a user opens the app and there's no connection with Adapty backend (e.g. no internet connection or in the rare case when backend is down) and there's no cache on the device.

Keep in mind that if your application is offline during the first run, the `.getPaywall` function will necessarily wait for the user's profile to be created and only after that it will be able to make a paywall request.

To set fallback paywalls, use `.setFallbackPaywalls` method. You should pass exactly the same payload you're getting from Adapty backend. You can copy it from Adapty Dashboard.  
Here's an example of getting fallback paywall data from the locally stored JSON file named `fallback_paywalls`.

```kotlin title="title="val paywalls: String = //get paywalls JSON from where you stored it""

Adapty.setFallbackPaywalls(paywalls)
```
```java title="title="String paywalls = //get paywalls JSON from where you stored it""

Adapty.setFallbackPaywalls(paywalls);
```

Request parameters:

- **Paywalls** (required): a JSON representation of your paywalls/products list in the exact same format as provided by Adapty backend.

:::note
You can also hardcode fallback paywall data or receive it from your remote server.
:::

### Paywall remote config

There is a remote config available with Adapty which [can be built](https://docs.adapty.io/docs/paywall#paywall-remote-config) right through the dashboard and then used inside your app. To get such config, just access `remoteConfig` property and extract needed values.

```kotlin title="title="Adapty.getPaywall("YOUR_PAYWALL_ID") { result ->""
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
```java title="title="Adapty.getPaywall("YOUR_PAYWALL_ID", result -> {""
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