---
title: "Unity - Present new Paywall Builder paywalls"
description: ""
metadataTitle: ""
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

If you've customized a paywall using the Paywall Builder, you don't need to worry about rendering it in your mobile app code to display it to the user. Such a paywall contains both what should be shown within the paywall and how it should be shown.

:::warning

This guide covers the **new Paywall Builder**, which requires Adapty SDK 3.3.0 or later. If you're using the legacy Paywall Builder (compatible with Adapty SDK version 2.x and earlier), check out [Present legacy Paywall Builder paywalls in Unity](unity-present-paywalls-legacy).

To present remote config paywalls, see [Render paywalls designed with remote config](present-remote-config-paywalls).

:::

To display a paywall, use the `view.Present()` method on the `view` created by the `CreateView` method. Each `view` can only be used once. If you need to display the paywall again, call `createView` one more to create a new `view` instance. 

:::warning

Reusing the same `view` without recreating it may result in an `AdaptyUIError.viewAlreadyPresented` error.
:::

```csharp title="Unity"
view.Present((error) => {
  // handle the error
});
```