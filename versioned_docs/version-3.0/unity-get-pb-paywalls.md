---
title: "Fetch Paywall Builder paywalls and their configuration in Unity SDK"
description: "Learn how to retrieve PB paywalls in Adapty for better subscription control in your Unity app."
metadataTitle: "Retrieving PB Paywalls in Adapty | Adapty Docs"
displayed_sidebar: sdkunity
keywords: ['getPaywall', 'getPaywallConfiguration', 'getViewConfiguration', 'createPaywallView', 'getPaywallForDefaultAudience']
rank: 80
---

import Details from '@site/src/components/Details';
import SampleApp from '@site/src/components/reusable/SampleApp.md';

After [you designed the visual part for your paywall](adapty-paywall-builder) with the new Paywall Builder in the Adapty Dashboard, you can display it in your mobile app. The first step in this process is to get the paywall associated with the placement and its view configuration as described below.

:::warning
The new Paywall Builder works with Unity SDK version 3.3.0 or higher. For presenting paywalls in Adapty SDK v2 designed with the legacy Paywall Builder, see [Display paywalls designed with legacy Paywall Builder](unity-legacy.md).
:::

Please be aware that this topic refers to Paywall Builder-customized paywalls. For guidance on fetching remote config paywalls, please refer to the [Fetch paywalls and products for remote config paywalls in your mobile app](fetch-paywalls-and-products-unity) topic.

<SampleApp />

<details>
   <summary>Before you start displaying paywalls in your mobile app (click to expand)</summary>

1. [Create your products](create-product) in the Adapty Dashboard.
2. [Create a paywall and incorporate the products into it](create-paywall) in the Adapty Dashboard.
3. [Create placements and incorporate your paywall into it](create-placement) in the Adapty Dashboard.
4. Install [Adapty SDK](sdk-installation-unity) in your mobile app.
</details>

## Fetch paywall designed with Paywall Builder

If you've [designed a paywall using the Paywall Builder](adapty-paywall-builder), you don't need to worry about rendering it in your mobile app code to display it to the user. Such a paywall contains both what should be shown within the paywall and how it should be shown. Nevertheless, you need to get its ID via the placement, its view configuration, and then present it in your mobile app.

To ensure optimal performance, it's crucial to retrieve the paywall and its [view configuration](unity-get-pb-paywalls#fetch-the-view-configuration-of-paywall-designed-using-paywall-builder) as early as possible, allowing sufficient time for images to download before presenting them to the user.

To get a paywall, use the `getPaywall` method:

```csharp showLineNumbers
Adapty.GetPaywall("YOUR_PLACEMENT_ID", "en", (paywall, error) => {
  if(error != null) {
    // handle the error
    return;
  }
  
  // paywall - the resulting object
});
```

Parameters:

| Parameter | Presence | Description |
|---------|--------|-----------|
| **placementId** | required | The identifier of the desired [Placement](placements). This is the value you specified when creating a placement in the Adapty Dashboard. |
| **locale** | <p>optional</p><p>default: `en`</p> | <p>The identifier of the [paywall localization](add-paywall-locale-in-adapty-paywall-builder). This parameter is expected to be a language code composed of one or two subtags separated by the minus (**-**) character. The first subtag is for the language, the second one is for the region.</p><p></p><p>Example: `en` means English, `pt-br` represents the Brazilian Portuguese language.</p><p>See [Localizations and locale codes](localizations-and-locale-codes) for more information on locale codes and how we recommend using them.</p> |
| **fetchPolicy** | default: `.reloadRevalidatingCacheData` | <p>By default, SDK will try to load data from the server and will return cached data in case of failure. We recommend this variant because it ensures your users always get the most up-to-date data.</p><p></p><p>However, if you believe your users deal with unstable internet, consider using `.returnCacheDataElseLoad` to return cached data if it exists. In this scenario, users might not get the absolute latest data, but they'll experience faster loading times, no matter how patchy their internet connection is. The cache is updated regularly, so it's safe to use it during the session to avoid network requests.</p><p></p><p>Note that the cache remains intact upon restarting the app and is only cleared when the app is reinstalled or through manual cleanup.</p><p></p><p>Adapty SDK stores paywalls locally in two layers: regularly updated cache described above and [fallback paywalls](fallback-paywalls). We also use CDN to fetch paywalls faster and a stand-alone fallback server in case the CDN is unreachable. This system is designed to make sure you always get the latest version of your paywalls while ensuring reliability even in cases where internet connection is scarce.</p> |
| **loadTimeout** | default: 5 sec | <p>This value limits the timeout for this method. If the timeout is reached, cached data or local fallback will be returned.</p><p>Note that in rare cases this method can timeout slightly later than specified in `loadTimeout`, since the operation may consist of different requests under the hood.</p> |

Don't hardcode product IDs! Since paywalls are configured remotely, the available products, the number of products, and special offers (such as free trials) can change over time. Make sure your code handles these scenarios.  
For example, if you initially retrieve 2 products, your app should display those 2 products. However, if you later retrieve 3 products, your app should display all 3 without requiring any code changes. The only thing you should hardcode is the placement ID.

Response parameters:

| Parameter | Description                                                                                                                                                 |
| :-------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Paywall   | An [`AdaptyPaywall`](unity-sdk-models#adaptypaywall)  object with a list of product IDs, the paywall identifier, remote config, and several other properties. |

## Fetch the view configuration of paywall designed using Paywall Builder

:::important
Make sure to enable the **Show on device** toggle in the paywall builder. If this option isn't turned on, the view configuration won't be available to retrieve.
:::

After fetching the paywall, check if it includes a `ViewConfiguration`, which indicates that it was created using Paywall Builder. This will guide you on how to display the paywall. If the `ViewConfiguration` is present, treat it as a Paywall Builder paywall; if not,  [handle it as a remote config paywall](present-remote-config-paywalls-unity).

In Unity SDK, directly call the `CreateView` method without manually fetching the view configuration first.

:::warning
The result of the `CreateView` method can only be used once. If you need to use it again, call the `CreateView` method anew. Calling it twice without recreating may result in the `AdaptyUIError.viewAlreadyPresented` error.
:::

```csharp showLineNumbers
var parameters = new AdaptyUICreateViewParameters()
  .SetPreloadProducts(preloadProducts)
  .SetLoadTimeout(new TimeSpan(0, 0, 3));

AdaptyUI.CreateView(paywall, parameters, (view, error) => {
  // handle the result
});
```

Parameters:

| Parameter           | Presence       | Description                                                  |
| :------------------ | :------------- | :----------------------------------------------------------- |
| **paywall**         | required       | An `AdaptyPaywall` object to obtain a controller for the desired paywall. |
| **loadTimeout**     | default: 5 sec | This value limits the timeout for this method. If the timeout is reached, cached data or local fallback will be returned.Note that in rare cases this method can timeout slightly later than specified in `loadTimeout`, since the operation may consist of different requests under the hood. |
| **PreloadProducts** | optional       | Provide an array of `AdaptyPaywallProducts` to optimize the display timing of products on the screen. If `nil` is passed, AdaptyUI will automatically fetch the necessary products. |
| **CustomTags**      | optional       | Define a dictionary of custom tags and their resolved values. Custom tags serve as placeholders in the paywall content, dynamically replaced with specific strings for personalized content within the paywall. Refer to [Custom tags in paywall builder](custom-tags-in-paywall-builder) topic for more details. |
| **CustomTimers**    | optional       | Define a dictionary of custom timers and their end dates. Custom timers allow you to display countdown timers in your paywall. |

:::note
If you are using multiple languages, learn how to add a [Paywall Builder localization](add-paywall-locale-in-adapty-paywall-builder) and how to use locale codes correctly [here](localizations-and-locale-codes).
:::

Once you have successfully loaded the paywall and its view configuration, you can present it in your mobile app.


## Set up developer-defined timers

To use custom timers in your Unity app, you can pass a dictionary of timer IDs and their end dates directly to the `SetCustomTimers` method. Here is an example:

```csharp showLineNumbers
var customTimers = new Dictionary<string, DateTime> {
    { "CUSTOM_TIMER_6H", DateTime.Now.AddHours(6) },
    { "CUSTOM_TIMER_NY", new DateTime(2025, 1, 1) }
};

var parameters = new AdaptyUICreateViewParameters()
    .SetCustomTimers(customTimers)
    .SetLoadTimeout(new TimeSpan(0, 0, 3));

AdaptyUI.CreateView(paywall, parameters, (view, error) => {
    // handle the result
});
```

In this example, `CUSTOM_TIMER_NY` and `CUSTOM_TIMER_6H` are the **Timer ID**s of developer-defined timers you set in the Adapty Dashboard. The timer resolver ensures your app dynamically updates each timer with the correct value. For example:

- `CUSTOM_TIMER_NY`: The time remaining until the timer's end, such as New Year's Day.
- `CUSTOM_TIMER_6H`: The time left in a 6-hour period that started when the user opened the paywall.