---
title: "Implement web paywalls"
description: "Learn how to implement web paywalls in your Capacitor app with Adapty SDK."
metadataTitle: "Implement Web Paywalls | Capacitor SDK | Adapty Docs"
slug: /capacitor-web-paywall
displayed_sidebar: sdkcapacitor
---

:::important
Before you begin, make sure you have [configured your web paywall in the dashboard](web-paywall.md) and installed Adapty SDK version 3.6.1 or later.
:::

If you are working with a paywall you developed yourself, you need to handle web paywalls using the SDK method. The `.openWebPaywall` method:
1. Generates a unique URL allowing Adapty to link a specific paywall shown to a particular user to the web page they are redirected to.
2. Tracks when your users return to the app and then requests `.getProfile` at short intervals to determine whether the profile access rights have been updated.

This way, if the payment has been successful and access rights have been updated, the subscription activates in the app almost immediately.

```typescript showLineNumbers
import { adapty } from '@adapty/capacitor';

try {
  await adapty.openWebPaywall({ paywallOrProduct: product });
} catch (error) {
  console.error('Failed to open web paywall:', error);
}
```

:::note
There are two versions of the `openWebPaywall` method:
1. `openWebPaywall({ paywallOrProduct: product })` that generates URLs by paywall and adds the product data to URLs as well.
2. `openWebPaywall({ paywallOrProduct: paywall })` that generates URLs by paywall without adding the product data to URLs. Use it when your products in the Adapty paywall differ from those in the web paywall.
:::

#### Handle errors

| Error                                   | Description                                            | Recommended action                                                        |
|-----------------------------------------|--------------------------------------------------------|---------------------------------------------------------------------------|
| AdaptyError.paywallWithoutPurchaseUrl   | The paywall doesn't have a web purchase URL configured | Check if the paywall has been properly configured in the Adapty Dashboard |
| AdaptyError.productWithoutPurchaseUrl   | The product doesn't have a web purchase URL            | Verify the product configuration in the Adapty Dashboard                  |
| AdaptyError.failedOpeningWebPaywallUrl  | Failed to open the URL in the browser                  | Check device settings or provide an alternative purchase method           |
| AdaptyError.failedDecodingWebPaywallUrl | Failed to properly encode parameters in the URL        | Verify URL parameters are valid and properly formatted                    |
