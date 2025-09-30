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

## Replace `registerEventHandlers` with `setEventHandlers`

To improve the SDK performance, we have reworked the way we handle the Adapty Paywall Builder and Adapty Onboarding Builder events, and the `registerEventHandlers` method has been replaced with the `setEventHandlers` method.
If you use the Adapty Paywall Builder and/or Adapty Onboarding Builder, find `registerEventHandlers` in your app code and replace it with `setEventHandlers`.

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

Event handlers for onboardings have been moved outside the `eventHandlers` object in `AdaptyOnboardingView`. If you are displaying onboardings using `AdaptyOnboardingView`, update the event handling structure:

```diff showLineNumbers
<AdaptyOnboardingView
  onboarding={onboarding}
  style={{ /* your styles */ }}
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
    onAnalytics={(event, meta) => {
      // Handle analytics events
    }}
    onClose={(actionId, meta) => {
      // Handle close actions
    }}
    onCustom={(actionId, meta) => {
      // Handle custom actions
    }}
    onPaywall={(actionId, meta) => {
      // Handle paywall actions
    }}
    onStateUpdated={(action, meta) => {
      // Handle state updates
    }}
    onFinishedLoading={(meta) => {
      // Handle when onboarding finishes loading
    }}
    onError={(error) => {
      // Handle errors
    }}
/>
```