---
title: "Fetch legacy Paywall Builder paywalls and their configuration"
description: "Learn how to fetch paywalls and products for remote config paywalls in your app, crucial for displaying the right content to users based on their placements."
metadataTitle: "Learn how to fetch paywalls and products for remote config paywalls in your app"
---

<!--- get-legacy-pb-paywalls.md --->
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem'; 
import Details from '@site/src/components/Details';

After [you designed the visual part for your paywall](adapty-paywall-builder-legacy) with Paywall Builder in the Adapty Dashboard, you can display it in your mobile app. The first step in this process is to get the paywall associated with the placement and its view configuration as described below.

:::warning

This guide covers the process for **legacy Paywall Builder paywalls** only which requires SDK v2.x or earlier. The process for fetching paywalls differs for paywalls designed with different versions of Paywall Builder and remote config paywalls.

- For fetching **New Paywall Builder paywalls**, check out [Fetch new Paywall Builder paywalls and their configuration](get-pb-paywalls).
- For fetching **Remote config paywalls**, see [Fetch paywalls and products for remote config paywalls](fetch-paywalls-and-products).

:::

<details>
   <summary>Before you start displaying paywalls in your mobile app (click to expand)</summary>

   1. [Create your products](create-product) in the Adapty Dashboard.
2. [Create a paywall and incorporate the products into it](create-paywall) in the Adapty Dashboard.
3. [Create placements and incorporate your paywall into it](create-placement) in the Adapty Dashboard.
4. [Install Adapty SDK and AdaptyUI DSK](installation-of-adapty-sdks) in your mobile app.
</details>

## Fetch paywall designed with Paywall Builder

If you've [designed a paywall using the Paywall Builder](adapty-paywall-builder-legacy), you don't need to worry about rendering it in your mobile app code to display it to the user. Such a paywall contains both what should be shown within the paywall and how it should be shown. Nevertheless, you need to get its ID via the placement, its view configuration, and then present it in your mobile app.

To ensure optimal performance, it's crucial to retrieve the paywall and its [view configuration](get-pb-paywalls#fetch-the-view-configuration-of-paywall-designed-using-paywall-builder) as early as possible, allowing sufficient time for images to download before presenting them to the user.

To get a paywall, use the `getPaywall` method:

<Tabs>
<TabItem value="Swift" label="Swift" default>
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
</TabItem>
<TabItem value="kotlin" label="Kotlin" default>
```kotlin 
import com.adapty.utils.seconds

...

Adapty.getPaywall("YOUR_PLACEMENT_ID", locale = "en", loadTimeout = 10.seconds) { result ->
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
```java 
import com.adapty.utils.TimeInterval;

...

Adapty.getPaywall("YOUR_PLACEMENT_ID", "en", TimeInterval.seconds(10), result -> {
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
```javascript 
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
```csharp 
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
```typescript 
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
| **placementId** | required | The identifier of the desired [Placement](placements). This is the value you specified when creating a placement in the Adapty Dashboard. |
| **locale** | <p>optional</p><p>default: `en`</p> | <p>The identifier of the [paywall localization](add-paywall-locale-in-adapty-paywall-builder). This parameter is expected to be a language code composed of one or two subtags separated by the minus (**-**) character. The first subtag is for the language, the second one is for the region.</p><p></p><p>Example: `en` means English, `pt-br` represents the Brazilian Portuguese language.</p><p></p><p>See [Localizations and locale codes](localizations-and-locale-codes) for more information on locale codes and how we recommend using them.</p> |
| **fetchPolicy** | default: `.reloadRevalidatingCacheData` | <p>By default, SDK will try to load data from the server and will return cached data in case of failure. We recommend this variant because it ensures your users always get the most up-to-date data.</p><p></p><p>However, if you believe your users deal with unstable internet, consider using `.returnCacheDataElseLoad` to return cached data if it exists. In this scenario, users might not get the absolute latest data, but they'll experience faster loading times, no matter how patchy their internet connection is. The cache is updated regularly, so it's safe to use it during the session to avoid network requests.</p><p></p><p>Note that the cache remains intact upon restarting the app and is only cleared when the app is reinstalled or through manual cleanup.</p><p></p><p>Adapty SDK stores paywalls locally in two layers: regularly updated cache described above and [fallback paywalls](fallback-paywalls). We also use CDN to fetch paywalls faster and a stand-alone fallback server in case the CDN is unreachable. This system is designed to make sure you always get the latest version of your paywalls while ensuring reliability even in cases where internet connection is scarce.</p> |
| **loadTimeout** | default: 5 sec | <p>This value limits the timeout for this method. If the timeout is reached, cached data or local fallback will be returned.</p><p></p><p>Note that in rare cases this method can timeout slightly later than specified in `loadTimeout`, since the operation may consist of different requests under the hood.</p><p></p><p>For Android: You can create `TimeInterval` with extension functions (like `5.seconds`, where `.seconds` is from `import com.adapty.utils.seconds`), or `TimeInterval.seconds(5)`. To set no limitation, use `TimeInterval.INFINITE`.</p> |


Don't hardcode product IDs! Since paywalls are configured remotely, the available products, the number of products, and special offers (such as free trials) can change over time. Make sure your code handles these scenarios.  
For example, if you initially retrieve 2 products, your app should display those 2 products. However, if you later retrieve 3 products, your app should display all 3 without requiring any code changes. The only thing you should hardcode is the placement ID.

Response parameters:

| Parameter | Description                                                                                                                                                 |
| :-------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Paywall   | An [`AdaptyPaywall`](sdk-models#adaptypaywall)  object with a list of product IDs, the paywall identifier, remote config, and several other properties. |

## Fetch the view configuration of paywall designed using Paywall Builder

After fetching the paywall, check if it includes a `viewConfiguration`, which indicates that it was created using Paywall Builder. This will guide you on how to display the paywall. If the `viewConfiguration` is present, treat it as a Paywall Builder paywall; if not,  [handle it as a remote config paywall](present-remote-config-paywalls).

For paywalls with a `viewConfiguration`, use the `getViewConfiguration` method to load the view configuration. In cross-platform SDKs, you can directly call the `createPaywallView` method without manually fetching the view configuration first. 

:::warning
The result of the `createPaywallView` method can be used only once. If you need to reuse it, call the `createPaywallView` method again.
:::

<Tabs>
<TabItem value="Swift" label="Swift" default>
```swift 
import Adapty

guard paywall.hasViewConfiguration else {
    //  use your custom logic
    return
}

AdaptyUI.getViewConfiguration(forPaywall: paywall) { result in
    switch result {
    case let .success(viewConfiguration):
        // use loaded configuration
    case let .failure(error):
        // handle the error
    }
}
```
</TabItem>
<TabItem value="kotlin" label="Kotlin" default>
```kotlin 
if (!paywall.hasViewConfiguration) {
    // use your custom logic
    return
}

AdaptyUI.getViewConfiguration(paywall) { result ->
    when(result) {
        is AdaptyResult.Success -> {
            val viewConfiguration = result.value
            // use loaded configuration
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
```java 
if (!paywall.hasViewConfiguration()) {
    // use your custom logic
    return;
}

AdaptyUI.getViewConfiguration(paywall, result -> {
    if (result instanceof AdaptyResult.Success) {
        AdaptyUI.ViewConfiguration viewConfiguration =
          ((AdaptyResult.Success<AdaptyUI.ViewConfiguration>) result).getValue();
        // use loaded configuration
    } else if (result instanceof AdaptyResult.Error) {
        AdaptyError error = ((AdaptyResult.Error) result).getError();
        // handle the error
    }
});
```
</TabItem>
<TabItem value="Flutter" label="Flutter" default>
```javascript 
import 'package:adapty_ui_flutter/adapty_ui_flutter.dart';

try {
  final view = await AdaptyUI().createPaywallView(paywall: paywall);
} on AdaptyError catch (e) {
  // handle the error
} catch (e) {
  // handle the error
}
```
</TabItem>
<TabItem value="Unity" label="Unity" default>
```typescript 
import {createPaywallView} from '@adapty/react-native-ui';

if (paywall.hasViewConfiguration) {
  try {
    const view = await createPaywallView(paywall);
  } catch (error) {
    // handle the error
  }
} else {
    //use your custom logic
}
```
</TabItem>
<TabItem value="RN" label="React Native (TS)" default>
```csharp 
AdaptyUI.CreatePaywallView(paywall, preloadProducts: true, (view, error) => {
  // use the view
});
```
</TabItem>
</Tabs>

Request parameters:

| Parameter   | Presence | Description                                                  |
| ----------- | -------- | ------------------------------------------------------------ |
| **paywall** | Required | Paywall_id you received as a response parameter of the `getPaywall` method in the [Fetch paywall designed with Paywall Builder](get-pb-paywalls#fetch-paywall-designed-with-paywall-builder) step. |

Response parameters:

| Parameter             | Description                                                  |
| --------------------- | ------------------------------------------------------------ |
| **viewConfiguration** | An `AdaptyUI.LocalizedViewConfiguration` object containing visual details of the paywall. You'll need it when [presenting the paywall](present-pb-paywalls) in your mobile app. |

:::note
If you are using multiple languages, learn how to add a [Paywall builder localization](add-paywall-locale-in-adapty-paywall-builder) and how to use locale codes correctly [here](localizations-and-locale-codes).
:::

Once you have successfully loaded the paywall and its view configuration, you can proceed to [presenting the paywall](present-pb-paywalls) in your mobile app.

## Speed up paywall fetching with default audience paywall

Typically, paywalls are fetched almost instantly, so you don’t need to worry about speeding up this process. However, in cases where you have numerous audiences and paywalls, and your users have a weak internet connection, fetching a paywall may take longer than you'd like. In such situations, you might want to display a default paywall to ensure a smooth user experience rather than showing no paywall at all.

To address this, you can use the `getPaywallForDefaultAudience`  method, which fetches the paywall of the specified placement for the **All Users** audience. However, it's crucial to understand that the recommended approach is to fetch the paywall by the `getPaywall` method, as detailed in the [Fetch Paywall Information](get-pb-paywalls#fetch-paywall-designed-with-paywall-builder) section above.

:::warning
Why we recommend using `getPaywall`

The `getPaywallForDefaultAudience` method comes with a few significant drawbacks:

- **Potential backward compatibility issues**: If you need to show different paywalls for different app versions (current and future), you may face challenges. You’ll either have to design paywalls that support the current (legacy) version or accept that users with the current (legacy) version might encounter issues with non-rendered paywalls.
- **Loss of targeting**: All users will see the same paywall designed for the **All Users** audience, which means you lose personalized targeting (including based on countries, marketing attribution or your own custom attributes).

If you're willing to accept these drawbacks to benefit from faster paywall fetching, use the `getPaywallForDefaultAudience` method as follows. Otherwise stick to `getPaywall` described [above](get-pb-paywalls#fetch-paywall-designed-with-paywall-builder).
:::

<Tabs>
<TabItem value="Swift" label="Swift" default>
```swift 
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
```kotlin 
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
```java 
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
<TabItem value="RN" label="React Native" default>
```typescript
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
</Tabs>

:::note
The `getPaywallForDefaultAudience` method is available starting from these versions:

- iOS: 2.11.2
- Android: 2.11.3
- React Native: 2.11.2

The method is not yet supported in Flutter and Unity, but support will be added soon.
:::

| Parameter | Presence | Description |
|---------|--------|-----------|
| **placementId** | required | The identifier of the [Placement](placements). This is the value you specified when creating a placement in your Adapty Dashboard. |
| **locale** | <p>optional</p><p>default: `en`</p> | <p>The identifier of the [paywall localization](add-remote-config-locale). This parameter is expected to be a language code composed of one or more subtags separated by the minus (**-**) character. The first subtag is for the language, the second one is for the region.</p><p></p><p>Example: `en` means English, `pt-br` represents the Brazilian Portuguese language.</p><p></p><p>See [Localizations and locale codes](localizations-and-locale-codes) for more information on locale codes and how we recommend using them.</p> |
| **fetchPolicy** | default: `.reloadRevalidatingCacheData` | <p>By default, SDK will try to load data from the server and will return cached data in case of failure. We recommend this variant because it ensures your users always get the most up-to-date data.</p><p></p><p>However, if you believe your users deal with unstable internet, consider using `.returnCacheDataElseLoad` to return cached data if it exists. In this scenario, users might not get the absolute latest data, but they'll experience faster loading times, no matter how patchy their internet connection is. The cache is updated regularly, so it's safe to use it during the session to avoid network requests.</p><p></p><p>Note that the cache remains intact upon restarting the app and is only cleared when the app is reinstalled or through manual cleanup.</p> |

**Next step:**

- [Present legacy Paywall Builder paywalls](present-legacy-pb-paywalls)