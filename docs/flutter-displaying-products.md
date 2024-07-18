---
title: "Flutter– Displaying Paywalls & Products"
description: ""
metadataTitle: ""
---

Adapty allows you remotely configure the products that will be displayed in your app. This way you don't have to hardcode the products and can dynamically change offers or run A/B tests without app releases.

:::warning
Make sure you've added the [products](product)  and [paywalls](paywall) in Adapty Dashboard before fetching the products.
:::

In order to display the products, you first need to query the paywall that contains them:

```javascript title="title="Flutter""
try {
  final paywall = await Adapty().getPaywall(id: "YOUR_PAYWALL_ID", locale: "en");
  // the requested paywall
} on AdaptyError catch (adaptyError) {
  // handle the error
} catch (e) {
}
```

Request parameters:

- **id** (required): The identifier of the desired paywall. This is the value you specified when you created the paywall in the Adapty Dashboard.
- **locale** (optional): The identifier of the [paywall localization](https://docs.adapty.io/docs/paywall#localizations). This parameter is expected to be a language code composed of one or more subtags separated by the "-" character. The first subtag is for the language, the second one is for the region (The support for regions will be added later).  
  Example: `en` means English, `en-US` represents US English.  
  If the parameter is omitted, the paywall will be returned in the default locale.

Response:

- **Paywall**: an [`AdaptyPaywall`](sdk-models#adaptypaywall) object. This model contains the list of the products ids, paywall's identifier, remote config, and several other properties.

Once you have the paywall, you can query the product array that corresponds to it:

```javascript title="title="Flutter""
try {
  final products = await Adapty().getPaywallProducts(paywall: paywall);
  // the requested products array
} on AdaptyError catch (adaptyError) {
  // handle the error
} catch (e) {
}
```

:::note
Every time the data is fetched from a remote server, it will be stored in the local cache. This way, you can display the products even when the user is offline.
:::

Next, build your paywall view using fetched products and show it to the user. Later on, when the user makes a purchase, simply call `.makePurchase()` with the product from your paywall.

```swift title="title="final product = products.first; // don't forget to check the List is not empty""

try {
  final result = await Adapty().makePurchase(product: product);
  // successful purchase
} on AdaptyError catch (adaptyError) {
  // handle the error
} catch (e) {
}
```

You can find more information on how to make purchases in the corresponding [article](ios-making-purchases).

:::warning
Since the paywalls are configured remotely, the available products, the number of the products, and the special offers (eg free trials) can change over time. Make sure your code handles these scenarios. For example, if you get 2 products, the 2 products will be displayed, but when you get 3, all of them should be displayed without code changes.

**Don't hard code product ids**, you won't need them.
:::

### Products fetch policy and intro offer eligibility

A quite important aspect that we want to clarify is how to properly handle the availability of the intro offer. The point is that StoreKit version 1 does not provide a simple and reliable way to determine this value. The only option is to calculate this value based on a receipt that must be on your user's device. However, in rare situations (and in Sandbox mode - always) the check is not present on the device at the first startup.

In order not to mislead the user by displaying an incorrect intro offer value, we have introduced a special value `unknown` for such situations. Next you can see all the possible values of `introductoryOfferEligibility`

| Value      | Descriptions                                                                   |
| :--------- | :----------------------------------------------------------------------------- |
| unknown    | We are not sure about the eligibility at this moment                           |
| ineligible | User is not eligible to get any into offer, you should't present it in your UI |
| eligible   | User is eligible for intro offer, it is safe to reflect this info in you UI    |

:::warning
We recommend working with `unknown` in the same way as `ineligible`
:::

If for some reason you observe `.unknown` values in the `introductoryOfferEligibility` fields when loading products for the first time, you should restart the `.getProductsForPaywall` method in special mode:

```javascript title="title="Flutter""
try {
  final products = await Adapty().getPaywallProducts(paywall: paywall, fetchPolicy: AdaptyIOSProductsFetchPolicy.waitForReceiptValidation);
  // update your UI
} on AdaptyError catch (adaptyError) {
  // handle the error
} catch (e) {
}
```

In this case, the function will wait for the receipt to be refreshed on the device, and only after validation will return the correctly configured products. If at this point the user has not yet started the purchase process, update your interface according to the latest values.

:::warning
We urge you to be very careful with this scenario, as Apple's reviewers can check it quite rigorously. However, based on our experience with them, we conclude that the behavior of the payment environment in which they perform their checks may be somewhat different from our usual sandbox and production.
:::

### Paywall analytics

Adapty helps you to measure the performance of the paywalls. We automatically collect all the metrics related to purchases except for paywall views. This is because only you know when the paywall was shown to a customer.  
Whenever you show a paywall to your user, call `.logShowPaywall(paywall)` to log the event, and it will be accumulated in the paywall metrics.

```javascript title="title="Flutter""
try {
  await adapty.logShowPaywall(paywall: paywall);
} on AdaptyError catch (adaptyError) {
  // handle the error
} catch (e) {
}
```

Request parameters:

- **AdaptyPaywall** (required): an [`AdaptyPaywall`](sdk-models#adaptypaywall) object.

### Fallback paywalls

Adapty allows you to provide fallback paywalls that will be used when a user opens the app and there's no connection with Adapty backend (e.g. no internet connection or in the rare case when backend is down) and there's no cache on the device.

Keep in mind that if your application is offline during the first run, the `.getPaywall` function will necessarily wait for the user's profile to be created and only after that it will be able to make a paywall request.

To set fallback paywalls, use `.setFallbackPaywalls` method. You should pass exactly the same payload you're getting from Adapty backend. You can copy it from Adapty Dashboard.  
Here's an example of getting fallback paywall data from the locally stored JSON file named `fallback_paywalls`.

```javascript title="title="Flutter""
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

Request parameters:

- **Paywalls** (required): a JSON representation of your paywalls/products list in the exact same format as provided by Adapty backend.

:::note
You can also hardcode fallback paywall data or receive it from your remote server.
:::

### Paywall remote config

There is a remote config available with Adapty which [can be built](https://docs.adapty.io/docs/paywall#paywall-remote-config) right through the dashboard and then used inside your app. To get such config, just access `remoteConfig` property and extract needed values.

```javascript title="title="Flutter""
try {
  final paywall = await Adapty().getPaywall(id: "YOUR_PAYWALL_ID");
  final String? headerText = paywall.remoteConfig?['header_text'];
} on AdaptyError catch (adaptyError) {
  // handle the error
} catch (e) {
}
```