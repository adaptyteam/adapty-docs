---
title: "Present onboardings in React Native SDK"
description: "Discover how to present onboardings on React Native to boost conversions and revenue."
metadataTitle: "Presenting onboardings on React Native | Adapty Docs"
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import SampleApp from '@site/src/components/reusable/SampleApp.md';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

If you've customized an onboarding using the builder, you don't need to worry about rendering it in your mobile app code to display it to the user. Such an onboarding contains both what should be shown within the onboarding and how it should be shown.

Before you start, ensure that:

1. You have installed [Adapty React Native SDK](sdk-installation-reactnative.md) 3.8.0 or later.
2. You have [created an onboarding](create-onboarding.md).
3. You have added the onboarding to a [placement](placements.md).

Adapty React Native SDK provides two ways to present onboardings:

- **React component**: Embedded component allows you to integrate it into your app's architecture and navigation system.

- **Modal presentation**

## React component

To embed an onboarding within your existing component tree, use the `AdaptyOnboardingView` component directly in your React Native component hierarchy. Embedded component allows you to integrate it into your app's architecture and navigation system.

<Tabs groupId="version" queryString>
<TabItem value="new" label="SDK version 3.14 or later" default>

```typescript showLineNumbers title="React Native (TSX)"
import React, { useCallback } from 'react';
import { AdaptyOnboardingView } from 'react-native-adapty';
import type { OnboardingEventHandlers } from 'react-native-adapty';

function MyOnboarding({ onboarding }) {
  const onAnalytics = useCallback<OnboardingEventHandlers['onAnalytics']>((event, meta) => {}, []);
  const onClose = useCallback<OnboardingEventHandlers['onClose']>((actionId, meta) => {}, []);
  const onCustom = useCallback<OnboardingEventHandlers['onCustom']>((actionId, meta) => {}, []);
  const onPaywall = useCallback<OnboardingEventHandlers['onPaywall']>((actionId, meta) => {}, []);
  const onStateUpdated = useCallback<OnboardingEventHandlers['onStateUpdated']>((action, meta) => {}, []);
  const onFinishedLoading = useCallback<OnboardingEventHandlers['onFinishedLoading']>((meta) => {}, []);
  const onError = useCallback<OnboardingEventHandlers['onError']>((error) => {}, []);

  return (
    <AdaptyOnboardingView
      onboarding={onboarding}
      style={styles.container}
      onAnalytics={onAnalytics}
      onClose={onClose}
      onCustom={onCustom}
      onPaywall={onPaywall}
      onStateUpdated={onStateUpdated}
      onFinishedLoading={onFinishedLoading}
      onError={onError}
    />
  );
}
```
</TabItem>

<TabItem value="old" label="SDK version < 3.14" default>

```typescript showLineNumbers title="React Native (TSX)"
import React from 'react';
import { AdaptyOnboardingView } from 'react-native-adapty';

function MyOnboarding({ onboarding }) {
  return (
    <AdaptyOnboardingView
      onboarding={onboarding}
      style={{ flex: 1 }}
      eventHandlers={{
        onAnalytics(event, meta) { 
          // Handle analytics events
        },
        onClose(actionId, meta) { 
          // Handle close actions
        },
        onCustom(actionId, meta) { 
          // Handle custom actions
        },
        onPaywall(actionId, meta) { 
          // Handle paywall actions
        },
        onStateUpdated(action, meta) { 
          // Handle state updates
        },
        onFinishedLoading(meta) { 
          // Handle when onboarding finishes loading
        },
        onError(error) { 
          // Handle errors
        },
      }}
    />
  );
}
```
</TabItem>
</Tabs>


## Modal presentation

To display an onboarding as a standalone screen that users can dismiss, use the `view.present()` method on the `view` created by the `createOnboardingView` method. Each `view` can only be used once. If you need to display the onboarding again, call `createOnboardingView` one more time to create a new `view` instance.

:::warning
Reusing the same `view` without recreating it is forbidden. It will result in an `AdaptyUIError.viewAlreadyPresented` error.
:::


<Tabs groupId="version" queryString>
<TabItem value="new" label="SDK version 3.14 or later" default>
```typescript showLineNumbers title="React Native (TSX)"
import { createOnboardingView } from 'react-native-adapty';

const view = await createOnboardingView(onboarding);

// Optional: handle onboarding events (close, custom actions, etc)
// view.setEventHandlers({ ... });

try {
    await view.present();
} catch (error) {
    // handle the error
}
```
</TabItem>

<TabItem value="old" label="SDK version < 3.14" default>
```typescript showLineNumbers title="React Native (TSX)"
import { createOnboardingView } from 'react-native-adapty/dist/ui';

const view = await createOnboardingView(onboarding);

view.registerEventHandlers(); // handle close press, etc

try {
    await view.present();
} catch (error) {
    // handle the error
}
```
</TabItem>
</Tabs>

### Configure iOS presentation style

Configure how the paywall is presented on iOS by passing the `iosPresentationStyle` parameter to the `present()` method. The parameter accepts `'full_screen'` (default) or `'page_sheet'` values.

```typescript showLineNumbers
try {
  await view.present(iosPresentationStyle: 'page_sheet');
} catch (error) {
  // handle the error
}
```

## Loader during onboarding

When presenting an onboarding in React Native, you may notice a short white flash or loading screen before the onboarding appears. This happens while the underlying native view is being initialized. You can handle this in different ways depending on your needs and your workflow.

#### Control splash screen using onFinishedLoading

:::note
This approach is only available when using the React component. It is not available for modal presentation.
:::

The recommended approach for React Native is to keep your splash screen or a custom overlay visible until the onboarding is fully loaded, then hide it manually.

When using the React component (`AdaptyOnboardingView`), wait for the `onFinishedLoading` event before hiding your splash screen or overlay:

<Tabs groupId="version" queryString>
<TabItem value="new" label="SDK version 3.14 or later" default>

```typescript showLineNumbers title="React Native (TSX)"
import React, { useCallback, useState } from 'react';
import { AdaptyOnboardingView } from 'react-native-adapty';
import type { OnboardingEventHandlers } from 'react-native-adapty';

function MyOnboarding({ onboarding }) {
  const [isLoading, setIsLoading] = useState(true);

  const onFinishedLoading = useCallback<OnboardingEventHandlers['onFinishedLoading']>((meta) => {
    // Hide your splash screen or custom overlay here
    setIsLoading(false);
  }, []);

  return (
    <>
      <AdaptyOnboardingView
        onboarding={onboarding}
        style={styles.container}
        onFinishedLoading={onFinishedLoading}
        // ... other callbacks
      />
      {isLoading && <YourCustomLoadingOverlay />}
    </>
  );
}
```

</TabItem>

<TabItem value="old" label="SDK version < 3.14">

```typescript showLineNumbers title="React Native (TSX)"
import React, { useState } from 'react';
import { AdaptyOnboardingView } from 'react-native-adapty';

function MyOnboarding({ onboarding }) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      <AdaptyOnboardingView
        onboarding={onboarding}
        style={{ flex: 1 }}
        eventHandlers={{
          onFinishedLoading(meta) {
            // Hide your splash screen or custom overlay here
            setIsLoading(false);
          },
          // ... other handlers
        }}
      />
      {isLoading && <YourCustomLoadingOverlay />}
    </>
  );
}
```

</TabItem>
</Tabs>

#### Customize native loader

:::important
Expo does not support placing custom native layouts (e.g., `res/layout` on Android). For Expo apps, controlling the splash screen or using a React Native overlay is the only viable solution.
:::

You can replace the native loader using platform-specific layouts on Android and iOS. However, this approach is usually less convenient for React Native apps:

- Requires separate Android and iOS implementations
- Not compatible with Expo (Expo doesn't allow adding custom native layouts)
- Higher maintenance cost

Define a placeholder for each platform:

- **iOS**: Add `AdaptyOnboardingPlaceholderView.xib` to your Xcode project
- **Android**: Create `adapty_onboarding_placeholder_view.xml` in `res/layout` and define a placeholder there

## Customize how links open in onboardings

:::important
Customizing how links open in onboardings is supported starting from Adapty SDK v. 3.15.1.
:::

By default, links in onboardings open in an in-app browser. This provides a seamless user experience by displaying web pages within your application, allowing users to view them without switching apps.

If you prefer to open links in an external browser instead, you can customize this behavior by setting the `externalUrlsPresentation` parameter to `WebPresentation.BrowserOutApp`:

<Tabs groupId="rn-onboarding-views" queryString>
<TabItem value="component" label="React component" default>

```typescript showLineNumbers title="React Native (TSX)"
import React, { useCallback } from 'react';
import { AdaptyOnboardingView, WebPresentation } from 'react-native-adapty';
import type { OnboardingEventHandlers } from 'react-native-adapty';

function MyOnboarding({ onboarding }) {
  const onAnalytics = useCallback<OnboardingEventHandlers['onAnalytics']>((event, meta) => {}, []);
  const onClose = useCallback<OnboardingEventHandlers['onClose']>((actionId, meta) => {}, []);
  const onCustom = useCallback<OnboardingEventHandlers['onCustom']>((actionId, meta) => {}, []);
  const onPaywall = useCallback<OnboardingEventHandlers['onPaywall']>((actionId, meta) => {}, []);
  const onStateUpdated = useCallback<OnboardingEventHandlers['onStateUpdated']>((action, meta) => {}, []);
  const onFinishedLoading = useCallback<OnboardingEventHandlers['onFinishedLoading']>((meta) => {}, []);
  const onError = useCallback<OnboardingEventHandlers['onError']>((error) => {}, []);

  return (
    <AdaptyOnboardingView
      onboarding={onboarding}
      style={styles.container}
      externalUrlsPresentation={WebPresentation.BrowserOutApp} // default – BrowserInApp
      onAnalytics={onAnalytics}
      onClose={onClose}
      onCustom={onCustom}
      onPaywall={onPaywall}
      onStateUpdated={onStateUpdated}
      onFinishedLoading={onFinishedLoading}
      onError={onError}
    />
  );
}
```
</TabItem>

<TabItem value="modal" label="Modal presentation">

```typescript showLineNumbers title="React Native (TSX)"
import { createOnboardingView, WebPresentation } from 'react-native-adapty';

const view = await createOnboardingView(
  onboarding, 
  { externalUrlsPresentation: WebPresentation.BrowserOutApp } // default – BrowserInApp
);

try {
    await view.present();
} catch (error) {
    // handle the error
}
```
</TabItem>
</Tabs>

## Disable safe area paddings (Android)

:::note
This setting is only supported in bare React Native projects.

If you are using an Expo managed workflow, you cannot add this Android resource directly. To apply this setting, you must create a custom Expo config plugin that adds the corresponding Android resource and register it in app.config.js. This is required because Expo manages the native Android project for you.
:::

By default, on Android devices, the onboarding view automatically applies safe area paddings to avoid system UI elements like status bar and navigation bar. However, if you want to disable this behavior and have full control over the layout, you can do so by adding a boolean resource to your app:

1. Go to `android/app/src/main/res/values`. If there is no `bools.xml` file, create it.

2. Add the following resource:

```xml
<resources>
    <bool name="adapty_onboarding_enable_safe_area_paddings">false</bool>
</resources>
```

Note that the changes apply globally for all onboardings in your app.

## Next steps

Once you've presented your onboarding, you'll want to [handle user interactions and events](react-native-handling-onboarding-events.md). Learn how to handle onboarding events to respond to user actions and track analytics.
