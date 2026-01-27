---
title: "Implement web paywalls in Flutter SDK"
description: "Set up a web paywall to get paid without the App Store fees and audits."
metadataTitle: "Accept payments in web for Flutter apps in the US"
displayed_sidebar: sdkflutter
---

:::important
Before you begin, make sure you have [configured your web paywall in the dashboard](web-paywall.md) and installed Adapty SDK version 3.6.1 or later.
:::

If you are working with a paywall you developed yourself, you need to handle web paywalls using the SDK method. The `.openWebPaywall` method:
1. Generates a unique URL allowing Adapty to link a specific paywall shown to a particular user to the web page they are redirected to.
2. Tracks when your users return to the app and then requests `.getProfile` at short intervals to determine whether the profile access rights have been updated.

This way, if the payment has been successful and access rights have been updated, the subscription activates in the app almost immediately.

```dart showLineNumbers title="Flutter"
try {
  await Adapty().openWebPaywall(product: <YOUR_PRODUCT>);
  // The web paywall will be opened
} on AdaptyError catch (adaptyError) {
  // handle the error
} catch (e) {
  // handle other errors
}
```

:::note
There are two versions of the `openWebPaywall` method:
1. `openWebPaywall(product)` that generates URLs by paywall and adds the product data to URLs as well.
2. `openWebPaywall(paywall)` that generates URLs by paywall without adding the product data to URLs. Use it when your products in the Adapty paywall differ from those in the web paywall.
:::

#### Handle errors

| Error                                   | Description                                            | Recommended action                                                        |
|-----------------------------------------|--------------------------------------------------------|---------------------------------------------------------------------------|
| AdaptyError.paywallWithoutPurchaseUrl   | The paywall doesn't have a web purchase URL configured | Check if the paywall has been properly configured in the Adapty Dashboard |
| AdaptyError.productWithoutPurchaseUrl   | The product doesn't have a web purchase URL            | Verify the product configuration in the Adapty Dashboard                  |
| AdaptyError.failedOpeningWebPaywallUrl  | Failed to open the URL in the browser                  | Check device settings or provide an alternative purchase method           |
| AdaptyError.failedDecodingWebPaywallUrl | Failed to properly encode parameters in the URL        | Verify URL parameters are valid and properly formatted                    |

## Open web paywalls in an in-app browser

:::important
Opening web paywalls in an in-app browser is supported starting from Adapty SDK v. 3.15.
:::

By default, web paywalls open in the external browser.

To provide a seamless user experience, you can open web paywalls in an in-app browser. This displays the web purchase page within your application, allowing users to complete transactions without switching apps.

To enable this, set the `in` parameter to `.inAppBrowser`:

```dart showLineNumbers
try {
  await Adapty().openWebPaywall(
    product: <YOUR_PRODUCT>,
    openIn: AdaptyWebPresentation.inAppBrowser,
  );
  // The web paywall will be opened in the in-app browser
} on AdaptyError catch (adaptyError) {
  // handle the error
} catch (e) {
  // handle other errors
}

```