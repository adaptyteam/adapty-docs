---
title: "Fetch legacy Paywall Builder paywalls in iOS SDK"
description: "Retrieve legacy PB paywalls in your iOS app with Adapty SDK."
metadataTitle: "Fetch Legacy PB Paywalls | iOS SDK | Adapty Docs"
displayed_sidebar: sdkios
---

After [you designed the visual part for your paywall](adapty-paywall-builder-legacy) with Paywall Builder in the Adapty Dashboard, you can display it in your iOS app. The first step in this process is to get the paywall associated with the placement and its view configuration as described below.

:::warning

This guide is for **legacy Paywall Builder paywalls** only which require SDK v2.x or earlier. The process for fetching paywalls differs for paywalls designed with different versions of Paywall Builder and remote config paywalls.

- For fetching **New Paywall Builder paywalls**, check out [Fetch new Paywall Builder paywalls and their configuration](get-pb-paywalls).
- For fetching **Remote config paywalls**, see [Fetch paywalls and products for remote config paywalls](fetch-paywalls-and-products).

:::

<details>
   <summary>Before you start displaying paywalls in your iOS app (click to expand)</summary>

   1. [Create your products](create-product) in the Adapty Dashboard.
2. [Create a paywall and incorporate the products into it](create-paywall) in the Adapty Dashboard.
3. [Create placements and incorporate your paywall into it](create-placement) in the Adapty Dashboard.
4. [Install Adapty SDK and AdaptyUI DSK](sdk-installation-ios) in your iOS app.
</details>

## Fetch paywall designed with Paywall Builder

If you've [designed a paywall using the Paywall Builder](adapty-paywall-builder-legacy), you don't need to worry about rendering it in your iOS app code to display it to the user. Such a paywall contains both what should be shown within the paywall and how it should be shown. Nevertheless, you need to get its ID via the placement, its view configuration, and then present it in your iOS app.

To ensure optimal performance, it's crucial to retrieve the paywall and its [view configuration](#fetch-the-view-configuration-of-paywall-designed-using-paywall-builder) as early as possible, allowing sufficient time for images to download before presenting them to the user.

To get a paywall, use the `getPaywall` method:

```swift showLineNumbers
Adapty.getPaywall(placementId: "YOUR_PLACEMENT_ID", locale: "en") { result in
    switch result {
        case let .success(paywall):
            // the requested paywall
        case let .failure(error):
            // handle the error
    }
}
```

| Parameter | Presence | Description |
|---------|--------|-----------|
| **placementId** | required | The identifier of the desired [Placement](placements). This is the value you specified when creating a placement in the Adapty Dashboard. |
| **locale** | <p>optional</p><p>default: `en`</p> | <p>The identifier of the [paywall localization](add-paywall-locale-in-adapty-paywall-builder). This parameter is expected to be a language code composed of one or two subtags separated by the minus (**-**) character. The first subtag is for the language, the second one is for the region.</p><p></p><p>Example: `en` means English, `pt-br` represents the Brazilian Portuguese language.</p><p></p><p>See [Localizations and locale codes](localizations-and-locale-codes) for more information on locale codes and how we recommend using them.</p> |
| **fetchPolicy** | default: `.reloadRevalidatingCacheData` | <p>By default, SDK will try to load data from the server and will return cached data in case of failure. We recommend this variant because it ensures your users always get the most up-to-date data.</p><p></p><p>However, if you believe your users deal with unstable internet, consider using `.returnCacheDataElseLoad` to return cached data if it exists. In this scenario, users might not get the absolute latest data, but they'll experience faster loading times, no matter how patchy their internet connection is. The cache is updated regularly, so it's safe to use it during the session to avoid network requests.</p><p></p><p>Note that the cache remains intact upon restarting the app and is only cleared when the app is reinstalled or through manual cleanup.</p><p></p><p>Adapty SDK stores paywalls locally in two layers: regularly updated cache described above and [fallback paywalls](fallback-paywalls). We also use CDN to fetch paywalls faster and a stand-alone fallback server in case the CDN is unreachable. This system is designed to make sure you always get the latest version of your paywalls while ensuring reliability even in cases where internet connection is scarce.</p> |

Don't hardcode product IDs! Since paywalls are configured remotely, the available products, the number of products, and special offers (such as free trials) can change over time. Make sure your code handles these scenarios.  
For example, if you initially retrieve 2 products, your app should display those 2 products. However, if you later retrieve 3 products, your app should display all 3 without requiring any code changes. The only thing you should hardcode is the placement ID.

Response parameters:

| Parameter | Description                                                                                                                                                 |
| :-------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Paywall   | An [`AdaptyPaywall`](sdk-models#adaptypaywall)  object with a list of product IDs, the paywall identifier, remote config, and several other properties. |

## Fetch the view configuration of paywall designed using Paywall Builder

After fetching the paywall, check if it includes a `viewConfiguration`, which indicates that it was created using Paywall Builder. This will guide you on how to display the paywall. If the `viewConfiguration` is present, treat it as a Paywall Builder paywall; if not,  [handle it as a remote config paywall](present-remote-config-paywalls).

Use the `getViewConfiguration` method to load the view configuration.

```swift showLineNumbers
import Adapty
import AdaptyUI

do {
    guard paywall.hasViewConfiguration else {
        //  use your custom logic
        return
    }

    let paywallConfiguration = try await AdaptyUI.getPaywallConfiguration(forPaywall: paywall)
    
    // use loaded configuration
} catch {
    // handle the error
}
``` 