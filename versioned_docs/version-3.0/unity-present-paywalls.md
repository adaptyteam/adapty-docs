---
title: "Display paywalls"
description: "Learn how to display paywalls in your Unity app with Adapty SDK."
metadataTitle: "Display Paywalls | Unity SDK | Adapty Docs"
slug: /unity-present-paywalls
displayed_sidebar: sdkunity
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import SampleApp from '@site/src/components/reusable/SampleApp.md'; 

If you've customized a paywall using the Paywall Builder, you don't need to worry about rendering it in your mobile app code to display it to the user. Such a paywall contains both what should be shown within the paywall and how it should be shown.

:::warning

This guide covers the **new Paywall Builder**, which requires Adapty SDK 3.3.0 or later. If you're using the legacy Paywall Builder (compatible with Adapty SDK version 2.x and earlier), check out [Present legacy Paywall Builder paywalls in Unity](unity-present-paywalls-legacy).

To present remote config paywalls, see [Render paywalls designed with remote config](present-remote-config-paywalls).

:::

To display a paywall, use the `view.Present()` method on the `view` created by the `CreateView` method. Each `view` can only be used once. If you need to display the paywall again, call `createView` one more to create a new `view` instance. 

:::warning

Reusing the same `view` without recreating it may result in an `AdaptyUIError.viewAlreadyPresented` error.
:::

```csharp showLineNumbers title="Unity"
view.Present((error) => {
  // handle the error
});
```
<SampleApp />

## Show dialog

Use this method instead of native alert dialogs when paywall view is presented on Android. On Android, regular alerts appear behind the paywall view, making them invisible to users. This method ensures proper dialog presentation above the paywall on all platforms.

```csharp showLineNumbers title="Unity"
var dialog = new AdaptyUIDialogConfiguration()
    .SetTitle("Open URL?")
    .SetContent("Do you want to open this link?")
    .SetDefaultActionTitle("Cancel")
    .SetSecondaryActionTitle("OK");

AdaptyUI.ShowDialog(view, dialog, (action, error) => {
    if (error == null) {
        // handle dialog action
    }
});
```
