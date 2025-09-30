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

- The `registerEventHandlers` method used to display paywalls and onboardings has been replaced with the `setEventHandlers` method.
- The platform view event handlers for onboardings have been moved outside of `eventHandlers`
- The `logShowOnboarding` method has been deleted
- The minimum React Native version has been updated to 0.73.0

## Replace `registerEventHandlers` with `setEventHandlers`

The `registerEventHandlers` method used for working with Adapty Paywall and Onboarding Builder has been replaced with the `setEventHandlers` method.
If you use the Adapty Paywall Builder and/or Adapty Onboarding Builder, find `registerEventHandlers` in your app code and replace it with `setEventHandlers`.

The change has been introduced to make the method behavior clearer: Handlers now work one-at-a-time because each returns true/false, and having multiple handlers for a single event made the resulting behavior unclear.

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

## Update onboarding event handlers in the platform view

Event handlers for onboardings have been moved outside the `eventHandlers` object in `AdaptyOnboardingView`. If you are displaying onboardings using `AdaptyOnboardingView`, update the event handling structure.

:::important
Note the way we recommend implementing event handlers. To avoid recreating objects on each render, use `useCallback` for functions that handle events.
:::

```diff showLineNumbers
- <AdaptyOnboardingView
-  onboarding={onboarding}
-  style={{ /* your styles */ }}
-  eventHandlers={{
-    onAnalytics(event, meta) { 
-      // Handle analytics events
-    },
-    onClose(actionId, meta) { 
-      // Handle close actions
-    },
-    onCustom(actionId, meta) { 
-      // Handle custom actions
-    },
-    onPaywall(actionId, meta) { 
-      // Handle paywall actions
-    },
-    onStateUpdated(action, meta) { 
-      // Handle state updates
-    },
-    onFinishedLoading(meta) { 
-      // Handle when onboarding finishes loading
-    },
-    onError(error) { 
-      // Handle errors
-    },
-  }}
- />
+ const onAnalytics = useCallback<OnboardingEventHandlers['onAnalytics']>((event, meta) => {
+   // Handle analytics events
+ }, []);
+
+ const onClose = useCallback<OnboardingEventHandlers['onClose']>((actionId, meta) => {
+   // Handle close actions
+ }, []);
+
+ const onCustom = useCallback<OnboardingEventHandlers['onCustom']>((actionId, meta) => {
+   // Handle custom actions
+ }, []);
+
+ const onPaywall = useCallback<OnboardingEventHandlers['onPaywall']>((actionId, meta) => {
+   // Handle paywall actions
+ }, []);
+
+ const onStateUpdated = useCallback<OnboardingEventHandlers['onStateUpdated']>((action, meta) => {
+   // Handle state updates
+ }, []);
+
+ const onFinishedLoading = useCallback<OnboardingEventHandlers['onFinishedLoading']>((meta) => {
+   // Handle when onboarding finishes loading
+ }, []);
+
+ const onError = useCallback<OnboardingEventHandlers['onError']>((error) => {
+   // Handle errors
+ }, []);
+
+ const eventHandlers = useMemo((): Partial<OnboardingEventHandlers> => ({
+   onFinishedLoading(meta) {
+     // Handle when onboarding finishes loading
+   }
+ }), []);
+
+ return (
+   <AdaptyOnboardingView
+     onboarding={onboarding}
+     style={styles.container}
+     onAnalytics={onAnalytics}
+     onClose={onClose}
+     onCustom={onCustom}
+     onPaywall={onPaywall}
+     onStateUpdated={onStateUpdated}
+     onFinishedLoading={onFinishedLoading}
+     onError={onError}
+   />
+ );
```


## Delete `logShowOnboarding`

In Adapty SDK 3.12.0, we have deleted the `logShowOnboarding` method from the SDK.
If you have been using this method, it won't be available when you upgrade the SDK to version 3.12 or later.

Instead, you can [create onboardings in the Adapty no-code onboarding builder](onboardings.md). Analytics for these onboardings are tracked automatically, and you have a lot of customization options.

## Update React Native

Starting from Adapty SDK 3.12.0, the minimum supported version of React Native is 0.73.0. If you are using an earlier version, update React Native to version 0.73.0 or later, so your experience with the Adapty SDK is consistent and reliable.