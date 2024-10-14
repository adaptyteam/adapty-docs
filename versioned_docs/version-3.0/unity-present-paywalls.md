---
title: "Unity - Present Paywall Builder paywalls"
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

To display a paywall view, simply call the `view.present()` method. If you've already defined a `view` object in a previous step, feel free to use it. In the following snippet, we'll introduce a new `view` for better visibility.

```csharp title="Unity"
view.Present((error) => {
  // handle the error
});
```