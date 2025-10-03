---
title: "Fetch Paywall Builder paywalls and their configuration in Android SDK"
description: "Learn how to retrieve PB paywalls in Adapty for better subscription control in your Android app."
metadataTitle: "Retrieving PB Paywalls in Adapty | Adapty Docs"
displayed_sidebar: sdkandroid
keywords: ['getPaywall', 'getPaywallConfiguration', 'getViewConfiguration', 'createPaywallView', 'getPaywallForDefaultAudience']
rank: 95
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Details from '@site/src/components/Details';
import SampleApp from '@site/src/components/reusable/SampleApp.md';

After [you designed the visual part for your paywall](adapty-paywall-builder) with the new Paywall Builder in the Adapty Dashboard, you can display it in your mobile app. The first step in this process is to get the paywall associated with the placement and its view configuration as described below.

:::warning
The new Paywall Builder works with Android SDK version 3.0 or higher. For presenting paywalls in Adapty SDK v2 designed with the legacy Paywall Builder, see [Display paywalls designed with legacy Paywall Builder](android-present-paywalls-legacy.md).
:::

Please be aware that this topic refers to Paywall Builder-customized paywalls. For guidance on fetching remote config paywalls, please refer to the [Fetch paywalls and products for remote config paywalls in your mobile app](fetch-paywalls-and-products-android) topic.

<SampleApp />

<details>
   <summary>Before you start displaying paywalls in your mobile app (click to expand)</summary>

1. [Create your products](create-product) in the Adapty Dashboard.
2. [Create a paywall and incorporate the products into it](create-paywall) in the Adapty Dashboard.
3. [Create placements and incorporate your paywall into it](create-placement) in the Adapty Dashboard.
4. Install [Adapty SDK](sdk-installation-android) in your mobile app.
</details>

## Fetch paywall designed with Paywall Builder

If you've [designed a paywall using the Paywall Builder](adapty-paywall-builder), you don't need to worry about rendering it in your mobile app code to display it to the user. Such a paywall contains both what should be shown within the paywall and how it should be shown. Nevertheless, you need to get its ID via the placement, its view configuration, and then present it in your mobile app.

To ensure optimal performance, it's crucial to retrieve the paywall and its [view configuration](android-get-pb-paywalls#fetch-the-view-configuration-of-paywall-designed-using-paywall-builder) as early as possible, allowing sufficient time for images to download before presenting them to the user.

To get a paywall, use the `getPaywall` method:

<Tabs groupId="current-os" queryString>

<TabItem value="kotlin" label="Kotlin" default>

```kotlin showLineNumbers
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

```java showLineNumbers
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


</Tabs>

Parameters:

| Parameter | Presence | Description |
|---------|--------|-----------|
| **placementId** | required | The identifier of the desired [Placement](placements). This is the value you specified when creating a placement in the Adapty Dashboard. |
| **locale** | <p>optional</p><p>default: `en`</p> | <p>The identifier of the [paywall localization](add-paywall-locale-in-adapty-paywall-builder). This parameter is expected to be a language code composed of one or two subtags separated by the minus (**-**) character. The first subtag is for the language, the second one is for the region.</p><p></p><p>Example: `en` means English, `pt-br` represents the Brazilian Portuguese language.</p><p>See [Localizations and locale codes](localizations-and-locale-codes) for more information on locale codes and how we recommend using them.</p> |
| **fetchPolicy** | default: `.reloadRevalidatingCacheData` | <p>By default, SDK will try to load data from the server and will return cached data in case of failure. We recommend this variant because it ensures your users always get the most up-to-date data.</p><p></p><p>However, if you believe your users deal with unstable internet, consider using `.returnCacheDataElseLoad` to return cached data if it exists. In this scenario, users might not get the absolute latest data, but they'll experience faster loading times, no matter how patchy their internet connection is. The cache is updated regularly, so it's safe to use it during the session to avoid network requests.</p><p></p><p>Note that the cache remains intact upon restarting the app and is only cleared when the app is reinstalled or through manual cleanup.</p><p></p><p>Adapty SDK stores paywalls locally in two layers: regularly updated cache described above and [fallback paywalls](fallback-paywalls). We also use CDN to fetch paywalls faster and a stand-alone fallback server in case the CDN is unreachable. This system is designed to make sure you always get the latest version of your paywalls while ensuring reliability even in cases where internet connection is scarce.</p> |
| **loadTimeout** | default: 5 sec | <p>This value limits the timeout for this method. If the timeout is reached, cached data or local fallback will be returned.</p><p>Note that in rare cases this method can timeout slightly later than specified in `loadTimeout`, since the operation may consist of different requests under the hood.</p><p>For Android: You can create `TimeInterval` with extension functions (like `5.seconds`, where `.seconds` is from `import com.adapty.utils.seconds`), or `TimeInterval.seconds(5)`. To set no limitation, use `TimeInterval.INFINITE`.</p> |


Don't hardcode product IDs! Since paywalls are configured remotely, the available products, the number of products, and special offers (such as free trials) can change over time. Make sure your code handles these scenarios.  
For example, if you initially retrieve 2 products, your app should display those 2 products. However, if you later retrieve 3 products, your app should display all 3 without requiring any code changes. The only thing you should hardcode is the placement ID.

Response parameters:

| Parameter | Description                                                                                                                                                     |
| :-------- |:----------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Paywall   | An [`AdaptyPaywall`](android-sdk-models#adaptypaywall)  object with a list of product IDs, the paywall identifier, remote config, and several other properties. |

## Fetch the view configuration of paywall designed using Paywall Builder

:::important
Make sure to enable the **Show on device** toggle in the paywall builder. If this option isn't turned on, the view configuration won't be available to retrieve.
:::

After fetching the paywall, check if it includes a `ViewConfiguration`, which indicates that it was created using Paywall Builder. This will guide you on how to display the paywall. If the `ViewConfiguration` is present, treat it as a Paywall Builder paywall; if not,  [handle it as a remote config paywall](present-remote-config-paywalls).

<Tabs groupId="current-os" queryString>

<TabItem value="kotlin" label="Kotlin" default>

Use the `getViewConfiguration` method to load the view configuration.

```kotlin showLineNumbers
if (!paywall.hasViewConfiguration) {
    // use your custom logic
    return
}

AdaptyUI.getViewConfiguration(paywall, loadTimeout = 10.seconds) { result ->
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
| Parameter       | Presence       | Description                                                  |
| :-------------- | :------------- | :----------------------------------------------------------- |
| **paywall**     | required       | An `AdaptyPaywall` object to obtain a controller for the desired paywall. |
| **loadTimeout** | default: 5 sec | This value limits the timeout for this method. If the timeout is reached, cached data or local fallback will be returned.Note that in rare cases this method can timeout slightly later than specified in `loadTimeout`, since the operation may consist of different requests under the hood. |

</TabItem>
<TabItem value="java" label="Java" default>

Use the `getViewConfiguration` method to load the view configuration.

```java showLineNumbers
if (!paywall.hasViewConfiguration()) {
    // use your custom logic
    return;
}

AdaptyUI.getViewConfiguration(paywall, TimeInterval.seconds(10), result -> {
    if (result instanceof AdaptyResult.Success) {
        AdaptyUI.LocalizedViewConfiguration viewConfiguration =
          ((AdaptyResult.Success<AdaptyUI.LocalizedViewConfiguration>) result).getValue();
        // use loaded configuration
    } else if (result instanceof AdaptyResult.Error) {
        AdaptyError error = ((AdaptyResult.Error) result).getError();
        // handle the error
    }
});
```
| Parameter                | Presence       | Description                                                  |
| :----------------------- | :------------- | :----------------------------------------------------------- |
| **paywall**              | required       | An `AdaptyPaywall` object to obtain a controller for the desired paywall. |
| **loadTimeout**          | default: 5 sec | This value limits the timeout for this method. If the timeout is reached, cached data or local fallback will be returned.Note that in rare cases this method can timeout slightly later than specified in `loadTimeout`, since the operation may consist of different requests under the hood. |

</TabItem>

</Tabs>

:::note
If you are using multiple languages, learn how to add a [Paywall Builder localization](add-paywall-locale-in-adapty-paywall-builder) and how to use locale codes correctly [here](android-localizations-and-locale-codes).
:::

Once you have successfully loaded the paywall and its view configuration, you can present it in your mobile app.

## Get a paywall for a default audience to fetch it faster

Typically, paywalls are fetched almost instantly, so you don’t need to worry about speeding up this process. However, in cases where you have numerous audiences and paywalls, and your users have a weak internet connection, fetching a paywall may take longer than you'd like. In such situations, you might want to display a default paywall to ensure a smooth user experience rather than showing no paywall at all.

To address this, you can use the `getPaywallForDefaultAudience`  method, which fetches the paywall of the specified placement for the **All Users** audience. However, it's crucial to understand that the recommended approach is to fetch the paywall by the `getPaywall` method, as detailed in the [Fetch Paywall Information](#fetch-paywall-designed-with-paywall-builder) section above.

:::warning
Why we recommend using `getPaywall`

The `getPaywallForDefaultAudience` method comes with a few significant drawbacks:

- **Potential backward compatibility issues**: If you need to show different paywalls for different app versions (current and future), you may face challenges. You’ll either have to design paywalls that support the current (legacy) version or accept that users with the current (legacy) version might encounter issues with non-rendered paywalls.
- **Loss of targeting**: All users will see the same paywall designed for the **All Users** audience, which means you lose personalized targeting (including based on countries, marketing attribution or your own custom attributes).

If you're willing to accept these drawbacks to benefit from faster paywall fetching, use the `getPaywallForDefaultAudience` method as follows. Otherwise stick to `getPaywall` described [above](#fetch-paywall-designed-with-paywall-builder).
:::

<Tabs groupId="current-os" queryString>

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

</Tabs>

:::note
The `getPaywallForDefaultAudience` method is available starting from Android SDK 2.11.3
:::

| Parameter | Presence | Description |
|---------|--------|-----------|
| **placementId** | required | The identifier of the [Placement](placements). This is the value you specified when creating a placement in your Adapty Dashboard. |
| **locale** | <p>optional</p><p>default: `en`</p> | <p>The identifier of the [paywall localization](add-remote-config-locale). This parameter is expected to be a language code composed of one or more subtags separated by the minus (**-**) character. The first subtag is for the language, the second one is for the region.</p><p></p><p>Example: `en` means English, `pt-br` represents the Brazilian Portuguese language.</p><p></p><p>See [Localizations and locale codes](localizations-and-locale-codes) for more information on locale codes and how we recommend using them.</p> |
| **fetchPolicy** | default: `.reloadRevalidatingCacheData` | <p>By default, SDK will try to load data from the server and will return cached data in case of failure. We recommend this variant because it ensures your users always get the most up-to-date data.</p><p></p><p>However, if you believe your users deal with unstable internet, consider using `.returnCacheDataElseLoad` to return cached data if it exists. In this scenario, users might not get the absolute latest data, but they'll experience faster loading times, no matter how patchy their internet connection is. The cache is updated regularly, so it's safe to use it during the session to avoid network requests.</p><p></p><p>Note that the cache remains intact upon restarting the app and is only cleared when the app is reinstalled or through manual cleanup.</p> |

## Customize assets

To customize images and videos in your paywall, implement the custom assets.

Hero images and videos have predefined IDs: `hero_image` and `hero_video`. In a custom asset bundle, you target these elements by their IDs and customize their behavior.

For other images and videos, you need to [set a custom ID](https://adapty.io/docs/custom-media) in the Adapty dashboard.

For example, you can:

- Show a different image or video to some users.
- Show a local preview image while a remote main image is loading.
- Show a preview image before running a video.

:::important
To use this feature, update the Adapty Android SDK to version 3.7.0 or higher.
:::

Here’s an example of how you can provide custom asssets via a simple dictionary:

```kotlin showLineNumbers
val customAssets = AdaptyCustomAssets.of(
    "hero_image" to
            AdaptyCustomImageAsset.remote(
                url = "https://example.com/image.jpg",
                preview = AdaptyCustomImageAsset.file(
                    FileLocation.fromAsset("images/hero_image_preview.png"),
                )
            ),
    "hero_video" to
            AdaptyCustomVideoAsset.file(
                FileLocation.fromResId(requireContext(), R.raw.custom_video),
                preview = AdaptyCustomImageAsset.file(
                    FileLocation.fromResId(requireContext(), R.drawable.video_preview),
                ),
            ),
)

val paywallView = AdaptyUI.getPaywallView(
    activity,
    viewConfiguration,
    products,
    eventListener,
    insets,
    customAssets,
)
```


:::note
If an asset is not found, the paywall will fall back to its default appearance.
:::

