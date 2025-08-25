---
title: "Present legacy Paywall Builder paywalls in Unity SDK"
description: ""
metadataTitle: ""
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

If you've customized a paywall using the Paywall Builder, you don't need to worry about rendering it in your mobile app code to display it to the user. Such a paywall contains both what should be shown within the paywall and how it should be shown.

:::warning

This guide is for **legacy Paywall Builder paywalls**, which require Adapty SDK up to version 2.x. The [new Paywall Builder](adapty-paywall-builder) requires Adapty SDK 3.0 or later, which is currently not available for Unity.

For presenting remote config paywalls, see [Render paywall designed by remote config](present-remote-config-paywalls).
:::

To display a paywall, use the `view.present()` method on the `view` created by the `createPaywallView` method. Each `view` can only be used once. If you need to display the paywall again, call `createPaywallView` one more to create a new `view` instance. 

:::warning

Reusing the same `view` without recreating it may result in an `AdaptyUIError.viewAlreadyPresented` error.
:::

```csharp showLineNumbers title="Unity"
view.Present((error) => {
  // handle the error
});
```