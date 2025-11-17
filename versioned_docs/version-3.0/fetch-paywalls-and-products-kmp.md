---
title: "Fetch paywalls and products for remote config paywalls in Kotlin Multiplatform SDK"
description: "Fetch paywalls and products in Adapty Kotlin Multiplatform SDK to enhance user monetization."
metadataTitle: "Fetching Paywalls & Products | Kotlin Multiplatform SDK | Adapty Docs"
keywords: ['getPaywall', 'getPaywallProducts', 'getPaywallProductsWithoutDeterminingOffer', 'getPaywallForDefaultAudience', 'remote config', 'Kotlin Multiplatform']
displayed_sidebar: sdkkmp
rank: 95
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem'; 
import Details from '@site/src/components/Details';
import SampleApp from '@site/src/components/reusable/SampleApp.md'; 

Before showcasing remote config and custom paywalls, you need to fetch the information about them. Please be aware that this topic refers to remote config and custom paywalls. For guidance on fetching paywalls for Paywall Builder-customized paywalls, please consult [Fetch Paywall Builder paywalls and their configuration](kmp-get-pb-paywalls).

<SampleApp />

<details>
   <summary>Before you start fetching paywalls and products in your mobile app (click to expand)</summary>

   1. [Create your products](create-product) in the Adapty Dashboard.

2. [Create a paywall and incorporate the products into your paywall](create-paywall) in the Adapty Dashboard.

3. [Create placements and incorporate your paywall into the placement](create-placement) in the Adapty Dashboard.

4. [Install Adapty SDK](sdk-installation-kotlin-multiplatform.md) in your mobile app.
</details>

## Fetch paywall information

In Adapty, a [product](product) serves as a combination of products from both the App Store and Google Play. These cross-platform products are integrated into paywalls, enabling you to showcase them within specific mobile app placements.

To display the products, you need to obtain a [Paywall](paywalls) from one of your [placements](placements) with `getPaywall` method.

:::important
Don't hardcode product IDs! Since paywalls are configured remotely, the available products, the number of products, and special offers (such as free trials) can change over time. Make sure your code handles these scenarios.  
For example, if you initially retrieve two products, your app should display those two products. However, if you later retrieve three products, your app should display all three without requiring any code changes. The only thing you should hardcode is the placement ID.
:::

```kotlin showLineNumbers
import com.adapty.kmp.Adapty
import com.adapty.kmp.models.AdaptyPaywallFetchPolicy

Adapty.getPaywall(
    placementId = "YOUR_PLACEMENT_ID", 
    locale = "en",
    fetchPolicy = AdaptyPaywallFetchPolicy.Default,
    loadTimeout = 5.seconds
).onSuccess { paywall ->
    // the requested paywall
}.onError { error ->
    // handle the error
}
```

| Parameter | Presence | Description |
|---------|--------|-----------|
| **placementId** | required | The identifier of the [Placement](placements). This is the value you specified when creating a placement in your Adapty Dashboard. |
| **locale** | <p>optional</p><p>default: `en`</p> | <p>The identifier of the [paywall localization](add-remote-config-locale). This parameter is expected to be a language code composed of one or more subtags separated by the minus (**-**) character. The first subtag is for the language, the second one is for the region.</p><p></p><p>Example: `en` means English, `pt-br` represents the Brazilian Portuguese language.</p> |
| **fetchPolicy** | default: `AdaptyPaywallFetchPolicy.Default` | <p>By default, SDK will try to load data from the server and will return cached data in case of failure. We recommend this variant because it ensures your users always get the most up-to-date data.</p><p></p><p>However, if you believe your users deal with unstable internet, consider using `AdaptyPaywallFetchPolicy.ReturnCacheDataElseLoad` to return cached data if it exists. In this scenario, users might not get the absolute latest data, but they'll experience faster loading times, no matter how patchy their internet connection is. The cache is updated regularly, so it's safe to use it during the session to avoid network requests.</p><p></p><p>Note that the cache remains intact upon restarting the app and is only cleared when the app is reinstalled or through manual cleanup.</p><p></p><p>Adapty SDK stores paywalls in two layers: regularly updated cache described above and [fallback paywalls](kmp-use-fallback-paywalls) . We also use CDN to fetch paywalls faster and a stand-alone fallback server in case the CDN is unreachable. This system is designed to make sure you always get the latest version of your paywalls while ensuring reliability even in cases where internet connection is scarce.</p> |
| **loadTimeout** | default: 5 sec | <p>This value limits the timeout for this method. If the timeout is reached, cached data or local fallback will be returned.</p><p></p><p>Note that in rare cases this method can timeout slightly later than specified in `loadTimeout`, since the operation may consist of different requests under the hood.</p> |


Don't hardcode product IDs! Since paywalls are configured remotely, the available products, the number of products, and special offers (such as free trials) can change over time. Make sure your code handles these scenarios.  
For example, if you initially retrieve 2 products, your app should display those 2 products. However, if you later retrieve 3 products, your app should display all 3 without requiring any code changes. The only thing you have to hardcode is placement ID.

Response parameters:

| Parameter | Description                                                                                                                                                  |
| :-------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Paywall   | An [`AdaptyPaywall`](https://kmp.adapty.io///adapty/com.adapty.kmp.models/-adapty-paywall/)  object with: a list of product IDs, the paywall identifier, remote config, and several other properties. |

## Fetch products

Once you have the paywall, you can query the product array that corresponds to it:

```kotlin showLineNumbers
Adapty.getPaywallProducts(paywall).onSuccess { products ->
    // the requested products
}.onError { error ->
    // handle the error
}
```

Response parameters:

| Parameter | Description                                                                                                                                                                                                                           |
| :-------- |:--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Products  | List of  [`AdaptyPaywallProduct`](https://kmp.adapty.io///adapty/com.adapty.kmp.models/-adapty-paywall-product/)  objects with: product identifier, product name, price, currency, subscription length, and several other properties. |

When implementing your own paywall design, you will likely need access to these properties from the [`AdaptyPaywallProduct`](https://kmp.adapty.io///adapty/com.adapty.kmp.models/-adapty-paywall-product/) object. Illustrated below are the most commonly used properties, but refer to the linked document for full details on all available properties.

| Property                | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
|-------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Title**               | To display the title of the product, use `product.localizedTitle`. Note that the localization is based on the users' selected store country rather than the locale of the device itself.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| **Price**               | To display a localized version of the price, use `product.price.localizedString`. This localization is based on the locale info of the device. You can also access the price as a number using `product.price.amount`. The value will be provided in the local currency. To get the associated currency symbol, use `product.price.currencySymbol`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| **Subscription Period** | To display the period (e.g. week, month, year, etc.), use `product.subscriptionDetails?.localizedSubscriptionPeriod`. This localization is based on the locale of the device. To fetch the subscription period programmatically, use `product.subscriptionDetails?.subscriptionPeriod`. From there you can access the `unit` enum to get the length (i.e. DAY, WEEK, MONTH, YEAR, or UNKNOWN). The `numberOfUnits` value will get you the number of period units. For example, for a quarterly subscription, you'd see `MONTH` in the unit property, and `3` in the numberOfUnits property.                                                                                                                                                                                                                                                                                                       |
| **Introductory Offer**  | To display a badge or other indicator that a subscription contains an introductory offer, check out the `product.subscriptionDetails?.introductoryOfferPhases` property. This is a list that can contain up to two discount phases: the free trial phase and the introductory price phase. Within each phase object are the following helpful properties:<br/>• `paymentMode`: an enum with values `FREE_TRIAL`, `PAY_AS_YOU_GO`, `PAY_UPFRONT`, and `UNKNOWN`. Free trials will be the `FREE_TRIAL` type.<br/>• `price`: The discounted price as a number. For free trials, look for `0` here.<br/>• `localizedNumberOfPeriods`: a string localized using the device's locale describing the length of the offer. For example, a three day trial offer shows `3 days` in this field.<br/>• `subscriptionPeriod`: Alternatively, you can get the individual details of the offer period with this property. It works in the same manner for offers as the previous section describes.<br/>• `localizedSubscriptionPeriod`: A formatted subscription period of the discount for the user's locale. |

## Speed up paywall fetching with default audience paywall

Typically, paywalls are fetched almost instantly, so you don't need to worry about speeding up this process. However, in cases where you have numerous audiences and paywalls, and your users have a weak internet connection, fetching a paywall may take longer than you'd like. In such situations, you might want to display a default paywall to ensure a smooth user experience rather than showing no paywall at all.

To address this, you can use the `getPaywallForDefaultAudience` method, which fetches the paywall of the specified placement for the **All Users** audience. However, it's crucial to understand that the recommended approach is to fetch the paywall by the `getPaywall` method, as detailed in the [Fetch Paywall Information](fetch-paywalls-and-products-kmp#fetch-paywall-information) section above.

:::warning
Why we recommend using `getPaywall`

The `getPaywallForDefaultAudience` method comes with a few significant drawbacks:

- **Potential backward compatibility issues**: If you need to show different paywalls for different app versions (current and future), you may face challenges. You'll either have to design paywalls that support the current (legacy) version or accept that users with the current (legacy) version might encounter issues with non-rendered paywalls.
- **Loss of targeting**: All users will see the same paywall designed for the **All Users** audience, which means you lose personalized targeting (including based on countries, marketing attribution or your own custom attributes).

If you're willing to accept these drawbacks to benefit from faster paywall fetching, use the `getPaywallForDefaultAudience` method as follows. Otherwise, stick to the `getPaywall` described [above](fetch-paywalls-and-products-kmp#fetch-paywall-information).
:::

```kotlin showLineNumbers
import com.adapty.kmp.Adapty
import com.adapty.kmp.models.AdaptyPaywall
import com.adapty.kmp.models.AdaptyPaywallFetchPolicy
import com.adapty.kmp.models.onError
import com.adapty.kmp.models.onSuccess

Adapty.getPaywallForDefaultAudience(
    placementId = "YOUR_PLACEMENT_ID",
    locale = "en",
    fetchPolicy = AdaptyPaywallFetchPolicy.Default
).onSuccess { paywall ->
    // the requested paywall
}.onError { error ->
    // handle the error
}
```

| Parameter | Presence | Description |
|---------|--------|-----------|
| **placementId** | required | The identifier of the [Placement](placements). This is the value you specified when creating a placement in your Adapty Dashboard. |
| **locale** | <p>optional</p><p>default: `en`</p> | <p>The identifier of the [paywall localization](add-remote-config-locale). This parameter is expected to be a language code composed of one or more subtags separated by the minus (**-**) character. The first subtag is for the language, the second one is for the region.</p><p></p><p>Example: `en` means English, `pt-br` represents the Brazilian Portuguese language.</p><p></p> |
| **fetchPolicy** | default: `AdaptyPaywallFetchPolicy.Default` | <p>By default, SDK will try to load data from the server and will return cached data in case of failure. We recommend this variant because it ensures your users always get the most up-to-date data.</p><p></p><p>However, if you believe your users deal with unstable internet, consider using `AdaptyPaywallFetchPolicy.ReturnCacheDataElseLoad` to return cached data if it exists. In this scenario, users might not get the absolute latest data, but they'll experience faster loading times, no matter how patchy their internet connection is. The cache is updated regularly, so it's safe to use it during the session to avoid network requests.</p><p></p><p>Note that the cache remains intact upon restarting the app and is only cleared when the app is reinstalled or through manual cleanup.</p> |
