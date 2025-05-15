---
title: "Fetch onboardings and their configuration"
description: "Learn how to retrieve onboardings in Adapty for."
metadataTitle: "Retrieving onboardings in Adapty | Adapty Docs"
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

After [you designed the visual part for your onboarding](design-onboarding.md) with the builder in the Adapty Dashboard, you can display it in your mobile app. The first step in this process is to get the onboarding associated with the placement and its view configuration as described below.

Before you start, ensure that:

1. You have installed [Adapty SDK](installation-of-adapty-sdks.md) 3.8.0 or later.
2. You have [created an onboarding](create-onboarding.md).
3. You have added the onboarding to a [placement](placements.md).

## Fetch onboarding

If you've [designed an onboarding using the builder](design-onboarding.md), you don't need to worry about rendering it in your mobile app code to display it to the user. Such an onboarding contains both what should be shown within the onboarding and how it should be shown. Nevertheless, you need to get its ID via the placement, its view configuration, and then present it in your mobile app.

To ensure optimal performance, it's crucial to retrieve the onboarding and its configuration as early as possible, allowing sufficient time for images to download before presenting them to the user.

To get an onboarding, use the `getOnboarding` method:

<Tabs groupId="current-os" queryString>
<TabItem value="swift" label="Swift" default>

```swift showLineNumbers
do {
    let onboarding = try await Adapty.getOnboarding("YOUR_PLACEMENT_ID")
    // the requested onboarding
} catch {
    // handle the error
}
```
</TabItem>
<TabItem value="swift-callback" label="Swift-Callback" default>

```swift showLineNumbers
Adapty.getOnboarding(placementId: "YOUR_PLACEMENT_ID", locale: "en") { result in
    switch result {
        case let .success(onboarding):
            // the requested onboarding
        case let .failure(error):
            // handle the error
    }
}
```
</TabItem>
<TabItem value="kotlin" label="Kotlin" default>

```kotlin showLineNumbers
import com.adapty.utils.seconds

...

Adapty.getOnboarding("YOUR_PLACEMENT_ID", locale = "en", loadTimeout = 10.seconds) { result ->
    when (result) {
        is AdaptyResult.Success -> {
            val onboarding = result.value
            // the requested onboarding
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

Adapty.getOnboarding("YOUR_PLACEMENT_ID", "en", TimeInterval.seconds(10), result -> {
    if (result instanceof AdaptyResult.Success) {
        AdaptyOnboarding onboarding = ((AdaptyResult.Success<AdaptyOnboarding>) result).getValue();
        // the requested onboarding
      
    } else if (result instanceof AdaptyResult.Error) {
        AdaptyError error = ((AdaptyResult.Error) result).getError();
        // handle the error
      
    }
});
```
</TabItem>
<TabItem value="flutter" label="Flutter" default>

```javascript showLineNumbers
try {
  final onboarding = await Adapty().getOnboarding(placementId: "YOUR_PLACEMENT_ID", locale: "en");
  // the requested onboarding
} on AdaptyError catch (adaptyError) {
  // handle the error
} catch (e) {
}
```
</TabItem>

<TabItem value="unity" label="Unity" default>

```csharp showLineNumbers
Adapty.GetOnboarding("YOUR_PLACEMENT_ID", "en", (onboarding, error) => {
  if(error != null) {
    // handle the error
    return;
  }
  
  // onboarding - the resulting object
});
```

</TabItem>

<TabItem value="rn" label="React Native (TS)" default>

```typescript showLineNumbers
try {
    const placementId = 'YOUR_PLACEMENT_ID';
    const locale = 'en';

    const onboarding = await adapty.getOnboarding(placementId, locale);
  // the requested onboarding
} catch (error) {
    // handle the error
}
```
</TabItem>

</Tabs>

Parameters:

| Parameter | Presence | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
|---------|--------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **placementId** | required | The identifier of the desired [Placement](placements). This is the value you specified when creating a placement in the Adapty Dashboard.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| **locale** | <p>optional</p><p>default: `en`</p> | <p>The identifier of the onboarding localization. This parameter is expected to be a language code composed of one or two subtags separated by the minus (**-**) character. The first subtag is for the language, the second one is for the region.</p><p></p><p>Example: `en` means English, `pt-br` represents the Brazilian Portuguese language.</p><p>See [Localizations and locale codes](localizations-and-locale-codes) for more information on locale codes and how we recommend using them.</p>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| **fetchPolicy** | default: `.reloadRevalidatingCacheData` | <p>By default, SDK will try to load data from the server and will return cached data in case of failure. We recommend this option because it ensures your users always get the most up-to-date data.</p><p></p><p>However, if you believe your users deal with unstable internet, consider using `.returnCacheDataElseLoad` to return cached data if it exists. In this scenario, users might not get the absolute latest data, but they'll experience faster loading times, no matter how patchy their internet connection is. The cache is updated regularly, so it's safe to use it during the session to avoid network requests.</p><p></p><p>Note that the cache remains intact upon restarting the app and is only cleared when the app is reinstalled or through manual cleanup.</p><p></p><p>Adapty SDK stores onboardings locally in two layers: regularly updated cache described above and fallback onboardings. We also use CDN to fetch onboardings faster and a stand-alone fallback server in case the CDN is unreachable. This system is designed to make sure you always get the latest version of your onboardings while ensuring reliability even in cases where internet connection is scarce.</p> |
| **loadTimeout** | default: 5 sec | <p>This value limits the timeout for this method. If the timeout is reached, cached data or local fallback will be returned.</p><p>Note that in rare cases this method can timeout slightly later than specified in `loadTimeout`, since the operation may consist of different requests under the hood.</p><p>For Android: You can create `TimeInterval` with extension functions (like `5.seconds`, where `.seconds` is from `import com.adapty.utils.seconds`), or `TimeInterval.seconds(5)`. To set no limitation, use `TimeInterval.INFINITE`.</p>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |

## Speed up onboarding fetching with default audience onboarding

Typically, onboardings are fetched almost instantly, so you don’t need to worry about speeding up this process. However, in cases where you have numerous audiences and onboardings, and your users have a weak internet connection, fetching a onboarding may take longer than you'd like. In such situations, you might want to display a default onboarding to ensure a smooth user experience rather than showing no onboarding at all.

To address this, you can use the `getOnboardingForDefaultAudience`  method, which fetches the onboarding of the specified placement for the **All Users** audience. However, it's crucial to understand that the recommended approach is to fetch the onboarding by the `getOnboarding` method, as detailed in the [Fetch Onboarding Information](get-pb-onboardings#fetch-onboarding-designed-with-onboarding-builder) section above.

:::warning
Why we recommend using `getOnboarding`

The `getOnboardingForDefaultAudience` method comes with a few significant drawbacks:

- **Potential backward compatibility issues**: If you need to show different onboardings for different app versions (current and future), you may face challenges. You’ll either have to design onboardings that support the current (legacy) version or accept that users with the current (legacy) version might encounter issues with non-rendered onboardings.
- **Loss of targeting**: All users will see the same onboarding designed for the **All Users** audience, which means you lose personalized targeting (including based on countries, marketing attribution or your own custom attributes).

If you're willing to accept these drawbacks to benefit from faster onboarding fetching, use the `getOnboardingForDefaultAudience` method as follows. Otherwise stick to `getOnboarding` described [above](get-pb-onboardings#fetch-onboardings).
:::

<Tabs groupId="current-os" queryString>
<TabItem value="swift" label="Swift" default>
```swift showLineNumbers
Adapty.getOnboardingForDefaultAudience(placementId: "YOUR_PLACEMENT_ID", locale: "en") { result in
    switch result {
        case let .success(onboarding):
            // the requested onboarding
        case let .failure(error):
            // handle the error
    }
}
```
</TabItem>
<TabItem value="kotlin" label="Kotlin" default>
```kotlin showLineNumbers
Adapty.getOnboardingForDefaultAudience("YOUR_PLACEMENT_ID", locale = "en") { result ->
    when (result) {
        is AdaptyResult.Success -> {
            val onboarding = result.value
            // the requested onboarding
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
Adapty.getOnboardingForDefaultAudience("YOUR_PLACEMENT_ID", "en", result -> {
    if (result instanceof AdaptyResult.Success) {
        AdaptyOnboarding onboarding = ((AdaptyResult.Success<AdaptyOnboarding>) result).getValue();
        // the requested onboarding

    } else if (result instanceof AdaptyResult.Error) {
        AdaptyError error = ((AdaptyResult.Error) result).getError();
        // handle the error
      
    }
});
```
</TabItem>
<TabItem value="flutter" label="Flutter" default>

```typescript showLineNumbers
try {
    final onboarding = await Adapty().getOnboardingForDefaultAudience(placementId: 'YOUR_PLACEMENT_ID');
} on AdaptyError catch (adaptyError) {
    // handle error
} catch (e) {
    // handle unknown error
}
```
</TabItem>

<TabItem value="unity" label="Unity" default>

```csharp showLineNumbers
using AdaptySDK;

Adapty.GetOnboardingForDefaultAudience(
  "YOUR_PLACEMENT_ID", 
  (onboarding, error) => {
  
  if (error != null) {
    // handle the error
  }
  
  // use the requested onboarding
});
```

</TabItem>

<TabItem value="rn" label="React Native" default>

```typescript showLineNumbers
try {
    const id = 'YOUR_PLACEMENT_ID';
    const locale = 'en';

    const onboarding = await adapty.getOnboardingForDefaultAudience(id, locale);
  // the requested onboarding
} catch (error) {
    // handle the error
}
```

</TabItem>

</Tabs>

Parameters:

| Parameter | Presence | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
|---------|--------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **placementId** | required | The identifier of the desired [Placement](placements). This is the value you specified when creating a placement in the Adapty Dashboard.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| **locale** | <p>optional</p><p>default: `en`</p> | <p>The identifier of the onboarding localization. This parameter is expected to be a language code composed of one or two subtags separated by the minus (**-**) character. The first subtag is for the language, the second one is for the region.</p><p></p><p>Example: `en` means English, `pt-br` represents the Brazilian Portuguese language.</p><p>See [Localizations and locale codes](localizations-and-locale-codes) for more information on locale codes and how we recommend using them.</p>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| **fetchPolicy** | default: `.reloadRevalidatingCacheData` | <p>By default, SDK will try to load data from the server and will return cached data in case of failure. We recommend this option because it ensures your users always get the most up-to-date data.</p><p></p><p>However, if you believe your users deal with unstable internet, consider using `.returnCacheDataElseLoad` to return cached data if it exists. In this scenario, users might not get the absolute latest data, but they'll experience faster loading times, no matter how patchy their internet connection is. The cache is updated regularly, so it's safe to use it during the session to avoid network requests.</p><p></p><p>Note that the cache remains intact upon restarting the app and is only cleared when the app is reinstalled or through manual cleanup.</p><p></p><p>Adapty SDK stores onboardings locally in two layers: regularly updated cache described above and fallback onboardings. We also use CDN to fetch onboardings faster and a stand-alone fallback server in case the CDN is unreachable. This system is designed to make sure you always get the latest version of your onboardings while ensuring reliability even in cases where internet connection is scarce.</p> |

