---
title: "Get onboardings in Capacitor SDK"
description: "Learn how to retrieve onboardings in Adapty for Capacitor."
metadataTitle: "Retrieving onboardings in Adapty | Adapty Docs"
slug: /capacitor-get-onboardings
displayed_sidebar: sdkcapacitor
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

After [you designed the visual part for your onboarding](design-onboarding.md) with the builder in the Adapty Dashboard, you can display it in your Capacitor app. The first step in this process is to get the onboarding associated with the placement and its view configuration as described below.

Before you start, ensure that:

1. You have [created an onboarding](create-onboarding.md).
2. You have added the onboarding to a [placement](placements.md).

## Fetch onboarding

When you create an [onboarding](onboardings.md) with our no-code builder, it's stored as a container with configuration that your app needs to fetch and display. This container manages the entire experience - what content appears, how it's presented, and how user interactions (like quiz answers or form inputs) are processed. The container also automatically tracks analytics events, so you don't need to implement separate view tracking.

For best performance, fetch the onboarding configuration early to give images enough time to download before showing to users.

To get an onboarding, use the `getOnboarding` method:

```typescript showLineNumbers
import { adapty } from '@adapty/capacitor';

try {
  const onboarding = await adapty.getOnboarding({ 
    placementId: 'YOUR_PLACEMENT_ID', 
    locale: 'en',
    params: {
      fetchPolicy: 'reload_revalidating_cache_data', // Load from server, fallback to cache
      loadTimeoutMs: 5000 // 5 second timeout
    }
  });
  console.log('Onboarding fetched successfully');
} catch (error) {
  console.error('Failed to fetch onboarding:', error);
}
```

Then, call the `createOnboardingView` method to create a view instance.

:::warning
The result of the `createOnboardingView` method can only be used once. If you need to use it again, call the `createOnboardingView` method anew. Calling it twice without recreating may result in the `AdaptyUIError.viewAlreadyPresented` error.
:::

```typescript showLineNumbers
import { adapty, createOnboardingView } from '@adapty/capacitor';

if (onboarding.hasViewConfiguration) {
  try {
    const view = await createOnboardingView(onboarding);
    console.log('Onboarding view created successfully');
  } catch (error) {
    console.error('Failed to create onboarding view:', error);
  }
} else {
  // Use your custom logic
  console.log('Onboarding does not have view configuration');
}
```

Parameters:

| Parameter | Presence | Description |
|---------|--------|-----------|
| **placementId** | required | The identifier of the desired [Placement](placements). This is the value you specified when creating a placement in the Adapty Dashboard. |
| **locale** | <p>optional</p><p>default: `en`</p> | <p>The identifier of the onboarding localization. This parameter is expected to be a language code composed of one or two subtags separated by the minus (**-**) character. The first subtag is for the language, the second one is for the region.</p><p></p><p>Example: `en` means English, `pt-br` represents the Brazilian Portuguese language.</p><p>See [Localizations and locale codes](localizations-and-locale-codes) for more information on locale codes and how we recommend using them.</p> |
| **params.fetchPolicy** | <p>optional</p><p>default: `'reload_revalidating_cache_data'`</p> | <p>By default, SDK will try to load data from the server and will return cached data in case of failure. We recommend this option because it ensures your users always get the most up-to-date data.</p><p></p><p>However, if you believe your users deal with unstable internet, consider using `'return_cache_data_else_load'` to return cached data if it exists. In this scenario, users might not get the absolute latest data, but they'll experience faster loading times, no matter how patchy their internet connection is. The cache is updated regularly, so it's safe to use it during the session to avoid network requests.</p><p></p><p>Note that the cache remains intact upon restarting the app and is only cleared when the app is reinstalled or through manual cleanup.</p> |
| **params.loadTimeoutMs** | <p>optional</p><p>default: 5000 ms</p> | <p>This value limits the timeout (in milliseconds) for this method. If the timeout is reached, cached data or local fallback will be returned.</p><p>Note that in rare cases this method can timeout slightly later than specified in `loadTimeoutMs`, since the operation may consist of different requests under the hood.</p> |

Response parameters:

| Parameter | Description |
|:----------|:-----------------------------------------------------------------------------------------------------------------------------------------------------------|
| **onboarding** | An [`AdaptyOnboarding`](capacitor-sdk-models#adaptyonboarding) object with: the onboarding identifier and configuration, remote config, and several other properties. |

## Speed up onboarding fetching with default audience onboarding

Typically, onboardings are fetched almost instantly, so you don't need to worry about speeding up this process. However, in cases where you have numerous audiences and onboardings, and your users have a weak internet connection, fetching a onboarding may take longer than you'd like. In such situations, you might want to display a default onboarding to ensure a smooth user experience rather than showing no onboarding at all.

To address this, you can use the `getOnboardingForDefaultAudience` method, which fetches the onboarding of the specified placement for the **All Users** audience. However, it's crucial to understand that the recommended approach is to fetch the onboarding by the `getOnboarding` method, as detailed in the [Fetch Onboarding](#fetch-onboarding) section above.

:::warning
Consider using `getOnboarding` instead of `getOnboardingForDefaultAudience`, as the latter has important limitations:

- **Compatibility issues**: May create problems when supporting multiple app versions, requiring either backward-compatible designs or accepting that older versions might display incorrectly.
- **No personalization**: Only shows content for the "All Users" audience, removing targeting based on country, attribution, or custom attributes.

If faster fetching outweighs these drawbacks for your use case, use `getOnboardingForDefaultAudience` as shown below. Otherwise, use `getOnboarding` as described [above](#fetch-onboarding).
:::

```typescript showLineNumbers
import { adapty } from '@adapty/capacitor';

try {
  const onboarding = await adapty.getOnboardingForDefaultAudience({ 
    placementId: 'YOUR_PLACEMENT_ID', 
    locale: 'en',
    params: {
      fetchPolicy: 'reload_revalidating_cache_data' // Load from server, fallback to cache
    }
  });
  console.log('Default audience onboarding fetched successfully');
} catch (error) {
  console.error('Failed to fetch default audience onboarding:', error);
}
```

Parameters:

| Parameter | Presence | Description |
|---------|--------|-----------|
| **placementId** | required | The identifier of the desired [Placement](placements). This is the value you specified when creating a placement in the Adapty Dashboard. |
| **locale** | <p>optional</p><p>default: `en`</p> | <p>The identifier of the onboarding localization. This parameter is expected to be a language code composed of one or two subtags separated by the minus (**-**) character. The first subtag is for the language, the second one is for the region.</p><p></p><p>Example: `en` means English, `pt-br` represents the Brazilian Portuguese language.</p><p>See [Localizations and locale codes](localizations-and-locale-codes) for more information on locale codes and how we recommend using them.</p> |
| **params.fetchPolicy** | <p>optional</p><p>default: `'reload_revalidating_cache_data'`</p> | <p>By default, SDK will try to load data from the server and will return cached data in case of failure. We recommend this option because it ensures your users always get the most up-to-date data.</p><p></p><p>However, if you believe your users deal with unstable internet, consider using `'return_cache_data_else_load'` to return cached data if it exists. In this scenario, users might not get the absolute latest data, but they'll experience faster loading times, no matter how patchy their internet connection is. The cache is updated regularly, so it's safe to use it during the session to avoid network requests.</p><p></p><p>Note that the cache remains intact upon restarting the app and is only cleared when the app is reinstalled or through manual cleanup.</p> | 