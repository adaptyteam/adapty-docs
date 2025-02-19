---
title: "Fetch paywalls and products for remote config paywalls"
description: "Fetch paywalls and products in Adapty to enhance user monetization."
metadataTitle: "Fetching Paywalls & Products | Adapty Docs"
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem'; 
import Details from '@site/src/components/Details';
import SampleApp from '@site/src/components/reusable/SampleApp.md'; 

Before showcasing remote config and custom paywalls, you need to fetch the information about them. Please be aware that this topic refers to remote config and custom paywalls. For guidance on fetching paywalls for Paywall Builder-customized paywalls, please consult [Fetch Paywall Builder paywalls and their configuration](get-pb-paywalls).

<SampleApp />

<details>
   <summary>Before you start fetching paywalls and products in your mobile app (click to expand)</summary>

   1. [Create your products](create-product) in the Adapty Dashboard.

2. [Create a paywall and incorporate the products into your paywall](create-paywall) in the Adapty Dashboard.

3. [Create placements and incorporate your paywall into the placement](create-placement) in the Adapty Dashboard.

4. [Install Adapty SDK](installation-of-adapty-sdks) in your mobile app.
</details>

## Fetch paywall information

In Adapty, a [product](product) serves as a combination of products from both the App Store and Google Play. These cross-platform products are integrated into paywalls, enabling you to showcase them within specific mobile app placements.

To display the products, you need to obtain a [Paywall](paywalls) from one of your [placements](placements) with `getPaywall` method.

<Tabs>
<TabItem value="Swift" label="Swift" default>

```swift showLineNumbers
do {
    let paywall = try await Adapty.getPaywall(placementId: "YOUR_PLACEMENT_ID")
    // the requested paywall
} catch {
    // handle the error
}
```
</TabItem>
<TabItem value="Swift-Callback" label="Swift-Callback" default>

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
</TabItem>
<TabItem value="kotlin" label="Kotlin" default>

```kotlin showLineNumbers
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
</TabItem>
<TabItem value="java" label="Java" default>

```java showLineNumbers
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
</TabItem>
<TabItem value="Flutter" label="Flutter" default>

```javascript showLineNumbers
try {
  final paywall = await Adapty().getPaywall(id: "YOUR_PLACEMENT_ID", locale: "en");
  // the requested paywall
} on AdaptyError catch (adaptyError) {
  // handle the error
} catch (e) {
}
```
</TabItem>
<TabItem value="Unity" label="Unity" default>

```csharp showLineNumbers
Adapty.GetPaywall("YOUR_PLACEMENT_ID", "en", (paywall, error) => {
  if(error != null) {
    // handle the error
    return;
  }
  
  // paywall - the resulting object
});
```
</TabItem>
<TabItem value="RN" label="React Native (TS)" default>

```typescript showLineNumbers
try {
    const id = 'YOUR_PLACEMENT_ID';
    const locale = 'en';

    const paywall = await adapty.getPaywall(id, locale);
    // the requested paywall
} catch (error) {
    // handle the error
}
```
</TabItem>
</Tabs>

| Parameter | Presence | Description |
|---------|--------|-----------|
| **placementId** | required | The identifier of the [Placement](placements). This is the value you specified when creating a placement in your Adapty Dashboard. |
| **locale** | <p>optional</p><p>default: `en`</p> | <p>The identifier of the [paywall localization](add-remote-config-locale). This parameter is expected to be a language code composed of one or more subtags separated by the minus (**-**) character. The first subtag is for the language, the second one is for the region.</p><p></p><p>Example: `en` means English, `pt-br` represents the Brazilian Portuguese language.</p><p></p><p>See [Localizations and locale codes](localizations-and-locale-codes) for more information on locale codes and how we recommend using them.</p> |
| **fetchPolicy** | default: `.reloadRevalidatingCacheData` | <p>By default, SDK will try to load data from the server and will return cached data in case of failure. We recommend this variant because it ensures your users always get the most up-to-date data.</p><p></p><p>However, if you believe your users deal with unstable internet, consider using `.returnCacheDataElseLoad` to return cached data if it exists. In this scenario, users might not get the absolute latest data, but they'll experience faster loading times, no matter how patchy their internet connection is. The cache is updated regularly, so it's safe to use it during the session to avoid network requests.</p><p></p><p>Note that the cache remains intact upon restarting the app and is only cleared when the app is reinstalled or through manual cleanup.</p><p></p><p>Adapty SDK stores paywalls in two layers: regularly updated cache described above and [fallback paywalls](fallback-paywalls) . We also use CDN to fetch paywalls faster and a stand-alone fallback server in case the CDN is unreachable. This system is designed to make sure you always get the latest version of your paywalls while ensuring reliability even in cases where internet connection is scarce.</p> |
| **loadTimeout** | default: 5 sec | <p>This value limits the timeout for this method. If the timeout is reached, cached data or local fallback will be returned.</p><p></p><p>Note that in rare cases this method can timeout slightly later than specified in `loadTimeout`, since the operation may consist of different requests under the hood.</p> |


Don't hardcode product IDs! Since paywalls are configured remotely, the available products, the number of products, and special offers (such as free trials) can change over time. Make sure your code handles these scenarios.  
For example, if you initially retrieve 2 products, your app should display those 2 products. However, if you later retrieve 3 products, your app should display all 3 without requiring any code changes. The only thing you have to hardcode is placement ID.

Response parameters:

| Parameter | Description                                                                                                                                                  |
| :-------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Paywall   | An [`AdaptyPaywall`](sdk-models#adaptypaywall)  object with: a list of product IDs, the paywall identifier, remote config, and several other properties. |

## Fetch products

Once you have the paywall, you can query the product array that corresponds to it:

<Tabs>
<TabItem value="Swift" label="Swift" default>

```swift showLineNumbers
do {
    let products = try await Adapty.getPaywallProducts(paywall: paywall)
    // the requested products array
} catch {
    // handle the error
}
```
</TabItem>
<TabItem value="Swift-Callback" label="Swift-Callback" default>

```swift showLineNumbers
Adapty.getPaywallProducts(paywall: paywall) { result in    
    switch result {
    case let .success(products):
        // the requested products array
    case let .failure(error):
        // handle the error
    }
}
```
</TabItem>
<TabItem value="kotlin" label="Kotlin" default>

```kotlin showLineNumbers
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
</TabItem>
<TabItem value="java" label="Java" default>

```java showLineNumbers
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
</TabItem>
<TabItem value="Flutter" label="Flutter" default>

```javascript showLineNumbers
try {
  final products = await Adapty().getPaywallProducts(paywall: paywall);
  // the requested products array
} on AdaptyError catch (adaptyError) {
  // handle the error
} catch (e) {
}
```
</TabItem>
<TabItem value="Unity" label="Unity" default>

```csharp showLineNumbers
Adapty.GetPaywallProducts(paywall, (products, error) => {
  if(error != null) {
    // handle the error
    return;
  }
  
  // products - the requested products array
});
```
</TabItem>
<TabItem value="RN" label="React Native (TS)" default>

```typescript showLineNumbers
try {
    // ...paywall
    const products = await adapty.getPaywallProducts(paywall);
  // the requested products list
} catch (error) {
    // handle the error
}
```
</TabItem>
</Tabs>

Response parameters:

| Parameter | Description                                                                                                                                                                                 |
| :-------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Products  | List of  [`AdaptyPaywallProduct`](sdk-models#adaptypaywallproduct)  objects with: product identifier, product name, price, currency, subscription length, and several other properties. |

## Check intro offer eligibility on iOS

By default, the `getPaywallProducts` method checks eligibility for introductory, promotional, and win-back offers. If you need to display products before the SDK determines offer eligibility, use the `getPaywallProductsWithoutDeterminingOffer` method instead.

:::note
After showing the initial products, be sure to call the regular `getPaywallProducts` method to update the products with accurate offer eligibility information.
:::

<Tabs>
<TabItem value="Swift" label="Swift" default>

```swift showLineNumbers
do {
    let products = try await Adapty.getPaywallProductsWithoutDeterminingOffer(paywall: paywall)
    // the requested products array without subscriptionOffer
} catch {
    // handle the error
}
```
</TabItem>
<TabItem value="Swift-Callback" label="Swift" default>

```swift showLineNumbers
Adapty.getPaywallProductsWithoutDeterminingOffer(paywall: paywall) { result in    
    switch result {
    case let .success(products):
        // the requested products array without subscriptionOffer
    case let .failure(error):
        // handle the error
    }
}
```
</TabItem>
</Tabs>

## Speed up paywall fetching with default audience paywall

Typically, paywalls are fetched almost instantly, so you don’t need to worry about speeding up this process. However, in cases where you have numerous audiences and paywalls, and your users have a weak internet connection, fetching a paywall may take longer than you'd like. In such situations, you might want to display a default paywall to ensure a smooth user experience rather than showing no paywall at all.

To address this, you can use the `getPaywallForDefaultAudience` method, which fetches the paywall of the specified placement for the **All Users** audience. However, it's crucial to understand that the recommended approach is to fetch the paywall by the `getPaywall` method, as detailed in the [Fetch Paywall Information](fetch-paywalls-and-products#fetch-paywall-information) section above.

:::warning
Why we recommend using `getPaywall`

The `getPaywallForDefaultAudience` method comes with a few significant drawbacks:

- **Potential backward compatibility issues**: If you need to show different paywalls for different app versions (current and future), you may face challenges. You’ll either have to design paywalls that support the current (legacy) version or accept that users with the current (legacy) version might encounter issues with non-rendered paywalls.
- **Loss of targeting**: All users will see the same paywall designed for the **All Users** audience, which means you lose personalized targeting (including based on countries, marketing attribution or your own custom attributes).

If you're willing to accept these drawbacks to benefit from faster paywall fetching, use the `getPaywallForDefaultAudience` method as follows. Otherwise, stick to the `getPaywall` described [above](fetch-paywalls-and-products#fetch-paywall-information).
:::

<Tabs>
<TabItem value="Swift" label="Swift" default>

```swift showLineNumbers
do {
    let paywall = try await Adapty.getPaywallForDefaultAudience("YOUR_PLACEMENT_ID")
   // the requested paywall
} catch {
    // handle the error
}
```
</TabItem>
<TabItem value="Swift-Callback" label="Swift-Callback" default>

```swift showLineNumbers
Adapty.getPaywallForDefaultAudience(placementId: "YOUR_PLACEMENT_ID", locale: "en") { result in
    switch result {
        case let .success(paywall):
            // the requested paywall
        case let .failure(error):
            // handle the error
    }
}
```
</TabItem>
<TabItem value="kotlin" label="Kotlin" default>

```kotlin showLineNumbers
Adapty.getPaywallForDefaultAudience("YOUR_PLACEMENT_ID", locale = "en") { result ->
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
</TabItem>
<TabItem value="java" label="Java" default>

```java showLineNumbers
Adapty.getPaywallForDefaultAudience("YOUR_PLACEMENT_ID", "en", result -> {
    if (result instanceof AdaptyResult.Success) {
        AdaptyPaywall paywall = ((AdaptyResult.Success<AdaptyPaywall>) result).getValue();
        // the requested paywall
      
    } else if (result instanceof AdaptyResult.Error) {
        AdaptyError error = ((AdaptyResult.Error) result).getError();
        // handle the error
      
    }
});
```
</TabItem>
<TabItem value="RN" label="React Native (TS)" default>

```typescript showLineNumbers
try {
    const id = 'YOUR_PLACEMENT_ID';
    const locale = 'en';

    const paywall = await adapty.getPaywallForDefaultAudience(id, locale);
  // the requested paywall
} catch (error) {
    // handle the error
}
```
</TabItem>
<!--- <TabItem value="Dart" label="Flutter" default>

```typescript showLineNumbers
// TODO: add Dart example
```
</TabItem> --->
</Tabs>

:::note
The `getPaywallForDefaultAudience` method is available starting from these versions:

- iOS: 2.11.2
- Android: 2.11.3
- React Native: 2.11.2
- Flutter 3.2.0

The method is not yet supported in Flutter and Unity, but support will be added soon.
:::

| Parameter | Presence | Description |
|---------|--------|-----------|
| **placementId** | required | The identifier of the [Placement](placements). This is the value you specified when creating a placement in your Adapty Dashboard. |
| **locale** | <p>optional</p><p>default: `en`</p> | <p>The identifier of the [paywall localization](add-remote-config-locale). This parameter is expected to be a language code composed of one or more subtags separated by the minus (**-**) character. The first subtag is for the language, the second one is for the region.</p><p></p><p>Example: `en` means English, `pt-br` represents the Brazilian Portuguese language.</p><p></p><p>See [Localizations and locale codes](localizations-and-locale-codes) for more information on locale codes and how we recommend using them.</p> |
| **fetchPolicy** | default: `.reloadRevalidatingCacheData` | <p>By default, SDK will try to load data from the server and will return cached data in case of failure. We recommend this variant because it ensures your users always get the most up-to-date data.</p><p></p><p>However, if you believe your users deal with unstable internet, consider using `.returnCacheDataElseLoad` to return cached data if it exists. In this scenario, users might not get the absolute latest data, but they'll experience faster loading times, no matter how patchy their internet connection is. The cache is updated regularly, so it's safe to use it during the session to avoid network requests.</p><p></p><p>Note that the cache remains intact upon restarting the app and is only cleared when the app is reinstalled or through manual cleanup.</p> |