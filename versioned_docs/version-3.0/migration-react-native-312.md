---
title: "Migrate Adapty React Native SDK to v. 3.12"
description: "Migrate to Adapty React Native SDK v3.12 for better performance and new monetization features."
metadataTitle: "Migrating to Adapty React Native SDK v3.12 | Adapty Docs"
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem'; 

Adapty React Native SDK 3.12.0 is a major release that introduces improvements that require migration steps on your end:

- The `registerEventHandlers` method has been replaced with the `setEventHandlers` method.
- In `AdaptyOnboardingView`, event handlers are now passed as individual props instead of an `eventHandlers` object
- The `logShowOnboarding` method has been deleted
- The minimum React Native version has been updated to 0.73.0

## Replace `registerEventHandlers` with `setEventHandlers`

The `registerEventHandlers` method used for working with Adapty Paywall and Onboarding Builder has been replaced with the `setEventHandlers` method.
If you use the Adapty Paywall Builder and/or Adapty Onboarding Builder, find `registerEventHandlers` in your app code and replace it with `setEventHandlers`.

The change has been introduced to make the method behavior clearer: Handlers now work one-at-a-time because each returns `true`/`false`, and having multiple handlers for a single event made the resulting behavior unclear.

Note that when using React components like `AdaptyOnboardingView` or `AdaptyPaywallView`, you don't need to return `true`/`false` from event handlers since you control the component's visibility through your own state management. Return values are only needed for modal screen presentation where the SDK manages the view lifecycle.

:::important
Calling this method multiple times will re-register **all** event handlers (both default and provided ones), not just the ones you pass. This means all previous event listeners will be replaced with the new merged set.
:::

```diff showLineNumbers 
- const unsubscribe = view.registerEventHandlers({
-    // your event handlers
- })

 const unsubscribe = view.setEventHandlers({
    // your event handlers
 })
``` 

## Update onboarding event handlers in the React component

Event handlers for onboardings have been moved outside the `eventHandlers` object in `AdaptyOnboardingView`. If you are displaying onboardings using `AdaptyOnboardingView`, update the event handling structure.

:::important
Note the way we recommend implementing event handlers. To avoid recreating objects on each render, use `useCallback` for functions that handle events.
:::

```diff showLineNumbers
 import React, { useCallback } from 'react';
- import { AdaptyOnboardingView } from 'react-native-adapty/dist/ui';
+ import { AdaptyOnboardingView } from 'react-native-adapty';
+ import type { OnboardingEventHandlers } from 'react-native-adapty';
+
+ function MyOnboarding({ onboarding }) {
+   const onAnalytics = useCallback<OnboardingEventHandlers['onAnalytics']>((event, meta) => {}, []);
+   const onClose = useCallback<OnboardingEventHandlers['onClose']>((actionId, meta) => {}, []);
+   const onCustom = useCallback<OnboardingEventHandlers['onCustom']>((actionId, meta) => {}, []);
+   const onPaywall = useCallback<OnboardingEventHandlers['onPaywall']>((actionId, meta) => {}, []);
+   const onStateUpdated = useCallback<OnboardingEventHandlers['onStateUpdated']>((action, meta) => {}, []);
+   const onFinishedLoading = useCallback<OnboardingEventHandlers['onFinishedLoading']>((meta) => {}, []);
+   const onError = useCallback<OnboardingEventHandlers['onError']>((error) => {}, []);
+
   return (
     <AdaptyOnboardingView
       onboarding={onboarding}
       style={styles.container}
-       eventHandlers={{
-         onAnalytics(event, meta) { /* ... */ },
-         onClose(actionId, meta) { /* ... */ },
-         onCustom(actionId, meta) { /* ... */ },
-         onPaywall(actionId, meta) { /* ... */ },
-         onStateUpdated(action, meta) { /* ... */ },
-         onFinishedLoading(meta) { /* ... */ },
-         onError(error) { /* ... */ },
-       }}
+       onAnalytics={onAnalytics}
+       onClose={onClose}
+       onCustom={onCustom}
+       onPaywall={onPaywall}
+       onStateUpdated={onStateUpdated}
+       onFinishedLoading={onFinishedLoading}
+       onError={onError}
     />
   );
+ }
```

:::note
For backward compatibility, the `eventHandlers` prop is still supported but is deprecated. We recommend migrating to individual event handler props as shown above.
:::


## Delete `logShowOnboarding`

In Adapty SDK 3.12.0, we have deleted the `logShowOnboarding` method from the SDK.
If you have been using this method, it won't be available when you upgrade the SDK to version 3.12 or later.

Instead, you can [create onboardings in the Adapty no-code onboarding builder](onboardings.md). Analytics for these onboardings are tracked automatically, and you have a lot of customization options.

## Update React Native

Starting from Adapty SDK 3.12.0, the minimum supported version of React Native is 0.73.0. If you are using an earlier version, update React Native to version 0.73.0 or later, so your experience with the Adapty SDK is consistent and reliable.