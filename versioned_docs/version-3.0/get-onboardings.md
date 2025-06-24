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

1. You have installed [Adapty iOS, Android, Flutter, or React Native SDK](installation-of-adapty-sdks.md) version 3.8.0 or higher.
2. You have [created an onboarding](create-onboarding.md).
3. You have added the onboarding to a [placement](placements.md).

## Fetch onboarding

When you create an [onboarding](onboardings.md) with our no-code builder, it's stored as a container with configuration that your app needs to fetch and display. This container manages the entire experience - what content appears, how it's presented, and how user interactions (like quiz answers or form inputs) are processed. The container also automatically tracks analytics events, so you don't need to implement separate view tracking.

For best performance, fetch the onboarding configuration early to give images enough time to download before showing to users.

To get an onboarding, use the `getOnboarding` method:

<Tabs>
<TabItem value="ios" label="iOS" default>
```swift showLineNumbers
do {
    let onboarding = try await Adapty.getOnboarding(placementId: "YOUR_PLACEMENT_ID")
    // the requested onboarding
} catch {
    // handle the error
}
```
</TabItem>
<TabItem value="android" label="Android">
```kotlin showLineNumbers

Adapty.getOnboarding("YOUR_PLACEMENT_ID") { result ->
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

<TabItem value="flutter" label="Flutter" default>

```javascript showLineNumbers
try {
  final onboarding = await Adapty().getOnboarding(placementId: "YOUR_PLACEMENT_ID");
} on AdaptyError catch (e) {
    //handle error
} catch (e) { 
    //handle error
}
```

Then, call the `createOnboardingView` method to get the view you will be displaying.

:::warning
The result of the `createOnboardingView` method can only be used once. If you need to use it again, call the `createOnboardingView` method anew. Calling it twice without recreating may result in the `AdaptyUIError.viewAlreadyPresented` error.
:::

```javascript showLineNumbers
import 'package:adapty_flutter/adapty_flutter.dart';

try {
    final onboardingView = await Adapty().createOnboardingView(onboarding: onboarding);
} on AdaptyError catch (e) { 
    //handle error
} catch (e) { 
    //handle error
}
```
</TabItem>

<TabItem value="rn" label="React Native (TS)" default>

```typescript showLineNumbers
try {
    const placementId = 'YOUR_PLACEMENT_ID';

    const onboarding = await adapty.getOnboarding(placementId);
  // the requested onboarding
} catch (error) {
    // handle the error
}
```

Then, call the `createOnboardingView` method to create a view instance.


Then, call the `createOnboardingView` method to create a view instance.

:::warning
The result of the `createOnboardingView` method can only be used once. If you need to use it again, call the `createOnboardingView` method anew. Calling it twice without recreating may result in the `AdaptyUIError.viewAlreadyPresented` error.
:::

```typescript showLineNumbers
import {createOnboardingView} from '@adapty/react-native-ui';

if (onboarding.hasViewConfiguration) {
  try {
    const view = await createOnboardingView(onboarding);
  } catch (error) {
    // handle the error
  }
} else {
    //use your custom logic
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

Response parameters:

| Parameter | Description                                                                                                                                                |
|:----------|:-----------------------------------------------------------------------------------------------------------------------------------------------------------|
| Onboarding      | An [`AdaptyOnboarding`](sdk-models#adaptyonboarding) object with: the onboarding identifier and configuration, remote config, and several other properties. |


## Speed up onboarding fetching with default audience onboarding

Typically, onboardings are fetched almost instantly, so you don't need to worry about speeding up this process. However, in cases where you have numerous audiences and onboardings, and your users have a weak internet connection, fetching a onboarding may take longer than you'd like. In such situations, you might want to display a default onboarding to ensure a smooth user experience rather than showing no onboarding at all.

To address this, you can use the `getOnboardingForDefaultAudience`  method, which fetches the onboarding of the specified placement for the **All Users** audience. However, it's crucial to understand that the recommended approach is to fetch the onboarding by the `getOnboarding` method, as detailed in the [Fetch Onboarding](#fetch-onboarding) section above.

:::warning
Consider using `getOnboarding` instead of `getOnboardingForDefaultAudience`, as the latter has important limitations:

- **Compatibility issues**: May create problems when supporting multiple app versions, requiring either backward-compatible designs or accepting that older versions might display incorrectly.
- **No personalization**: Only shows content for the "All Users" audience, removing targeting based on country, attribution, or custom attributes.

If faster fetching outweighs these drawbacks for your use case, use `getOnboardingForDefaultAudience` as shown below. Otherwise, use `getOnboarding` as described [above](#fetch-onboarding).
:::

<Tabs>
<TabItem value="ios" label="iOS" default>
```swift showLineNumbers
Adapty.getOnboardingForDefaultAudience(placementId: "YOUR_PLACEMENT_ID") { result in
    switch result {
        case let .success(onboarding):
            // the requested onboarding
        case let .failure(error):
            // handle the error
    }
}
```
</TabItem>

<TabItem value="android" label="Android">
```kotlin
Adapty.getOnboardingForDefaultAudience("YOUR_PLACEMENT_ID") { result ->
    when (result) {
        is AdaptyResult.Success -> {
            val onboarding = result.value
            // Handle successful onboarding retrieval
        }
        is AdaptyResult.Error -> {
            val error = result.error
            // Handle error case
        }
    }
}
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

<TabItem value="rn" label="React Native" default>

```typescript showLineNumbers
try {
    const id = 'YOUR_PLACEMENT_ID';

    const onboarding = await adapty.getOnboardingForDefaultAudience(id);
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

