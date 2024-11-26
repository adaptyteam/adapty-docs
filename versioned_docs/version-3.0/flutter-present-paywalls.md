---
title: "Flutter - Present new Paywall Builder paywalls"
description: ""
metadataTitle: ""
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

If you've customized a paywall using the Paywall Builder, you don't need to worry about rendering it in your mobile app code to display it to the user. Such a paywall contains both what should be shown within the paywall and how it should be shown.

:::warning

This guide is for **new Paywall Builder paywalls** only which require SDK v3.2.0 or later. The process for presenting paywalls differs for paywalls designed with different versions of Paywall Builde and remote config paywalls.

- For presenting **Legacy Paywall Builder paywalls**, check out [Flutter - Present legacy Paywall Builder paywalls](flutter-present-paywalls-legacy).
- For presenting **Remote config paywalls**, see [Render paywall designed by remote config](present-remote-config-paywalls).

:::

To show a paywall, call `view.present()` method on a view which is a result of the `createPaywallView` method. You can do it once for the specific `view` from the previous step. If you need to use a `view` again, call the `createPaywallView` method anew to create a new instance of `view`. Using  the same `view` twice without recreating may result in the `AdaptyUIError.viewAlreadyPresented` error.

:::warning
The result of the `createPaywallView` method can only be used once. If you need to use a `view` again, call the `createPaywallView` method anew to create a new instance of `view`. Using  it twice without recreating may result in the `AdaptyUIError.viewAlreadyPresented` error.
:::

```typescript title="Flutter"
try {
  await view.present();
} on AdaptyError catch (e) {
  // handle the error
} catch (e) {
  // handle the error
}
```
