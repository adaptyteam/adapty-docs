---
title: "Flutter - Present new Paywall Builder paywalls"
description: ""
metadataTitle: ""
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

If you've customized a paywall using the Paywall Builder, you don't need to worry about rendering it in your mobile app code to display it to the user. Such a paywall contains both what should be shown within the paywall and how it should be shown.

:::important

This guide covers the process for **new Paywall Builder paywalls** only. The new Paywall Builder is currently supported only on iOS and Android, as it requires SDK v3.0, which is available for iOS and Android only. Support for Flutter, React Native, and Unity is coming soon.

The process for presenting paywalls differs for paywalls designed with different versions of Paywall Builder and remote config paywalls as well as for [Observer mode](observer-vs-full-mode).

For presenting:

- **Legacy Paywall Builder paywalls**, check out [iOS - Present legacy Paywall Builder paywalls](ios-present-paywalls-legacy).
- **Remote config paywalls**, see [Render paywall designed by remote config](present-remote-config-paywalls).
- **Observer mode paywalls**, see [iOS - Present Paywall Builder paywalls in Observer mode](ios-present-paywall-builder-paywalls-in-observer-mode)

:::

To show a paywall, call `view.present()` method. You can use `view` from the previous step, we will introduce a new one for visibility reasons:

```typescript title="Flutter"
try {
  await view.present();
} on AdaptyError catch (e) {
  // handle the error
} catch (e) {
  // handle the error
}
```