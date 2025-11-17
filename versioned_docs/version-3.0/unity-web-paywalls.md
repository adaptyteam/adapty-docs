---
title: "Implement web paywalls in Unity SDK"
description: "Set up a web paywall to get paid without the App Store fees and audits."
metadataTitle: "Accept payments in web for Unity apps in the US"
displayed_sidebar: sdkunity
---

:::important
Before you begin, make sure you have [configured your web paywall in the dashboard](web-paywall.md) and installed Adapty SDK version 3.6.1 or later.
:::

If you are working with a paywall you developed yourself, you need to handle web paywalls using the SDK method. The `Adapty.OpenWebPaywall` method:
1. Generates a unique URL allowing Adapty to link a specific paywall shown to a particular user to the web page they are redirected to.
2. Tracks when your users return to the app and then requests `Adapty.GetProfile` at short intervals to determine whether the profile access rights have been updated.

This way, if the payment has been successful and access rights have been updated, the subscription activates in the app almost immediately.

```csharp showLineNumbers title="Unity"
Adapty.OpenWebPaywall(
    product,
    (error) =>
    {
        if (error != null)
        {
            Debug.LogError($"Failed to open web paywall: {error.Message}");
        }
        else
        {
            Debug.Log("Web paywall opened successfully");
        }
    }
);
```

:::note
There are two versions of the `OpenWebPaywall` method:
1. `OpenWebPaywall(product)` that generates URLs by paywall and adds the product data to URLs as well.
2. `OpenWebPaywall(paywall)` that generates URLs by paywall without adding the product data to URLs. Use it when your products in the Adapty paywall differ from those in the web paywall.
:::

#### Handle errors

| Error Code | Description                                            | Recommended action                                                        |
|-----------|--------------------------------------------------------|---------------------------------------------------------------------------|
| `AdaptyErrorCode.WrongParam`   | The paywall or product doesn't have a web purchase URL configured, or failed to open the URL in the browser | Check the error message for details. Verify the paywall/product configuration in the Adapty Dashboard, or check device settings. |
| `AdaptyErrorCode.DecodingFailed` | Failed to properly encode parameters in the URL        | Verify URL parameters are valid and properly formatted                    |

:::note
Check the error's `Message` property to get specific details about what went wrong, as `WrongParam` can indicate several issues (missing purchase URL, failed to open browser, etc.).
:::
