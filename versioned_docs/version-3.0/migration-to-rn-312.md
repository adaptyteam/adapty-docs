---
title: "Migrate Adapty React Native SDK to v. 3.12"
description: "Migrate to Adapty React Native SDK v3.12 for better performance and new monetization features."
metadataTitle: "Migrating to Adapty React Native SDK v3.12 | Adapty Docs"
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem'; 

Adapty React Native SDK 3.12.0 is a major release that introduces improvements that require migration steps on your end.

To improve the SDK performance, we have reworked the way we handle the Adapty Paywall Builder and Adapty Onboarding Builder events, and the `registerEventHandlers` method has been replaced with the `setEventHandlers` method.
If you use the Adapty Paywall Builder and/or Adapty Onboarding Builder, find `registerEventHandlers` in your app code and replace it with `setEventHandlers`.


```diff showLineNumbers 
- const unsubscribe = view.registerEventHandlers({
-    // your event handlers
- })

  const unsubscribe = view.setEventHandlers({
    // your event handlers
 })
``` 