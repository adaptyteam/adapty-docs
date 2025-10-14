---
title: "React Native - Present new Paywall Builder paywalls"
description: "Present paywalls in React Native apps using Adapty."
metadataTitle: "Presenting Paywalls in React Native | Adapty Docs"

---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import SampleApp from '@site/src/components/reusable/SampleApp.md'; 

If you've customized a paywall using the Paywall Builder, you don't need to worry about rendering it in your mobile app code to display it to the user. Such a paywall contains both what should be shown within the paywall and how it should be shown.

:::warning

This guide is for **new Paywall Builder paywalls** only, which require SDK v3.0 or later. The process for presenting paywalls differs for paywalls designed with different versions of Paywall Builder and remote config paywalls.

- For presenting **legacy Paywall Builder paywalls**, check out [React Native - Present Paywall Builder paywalls](react-native-present-paywalls-legacy).
- For presenting **remote config paywalls**, see [Render paywall designed by remote config](present-remote-config-paywalls).

:::

To display a paywall, use the `view.present()` method on the `view` created by the `createPaywallView` method. Each `view` can only be used once. If you need to display the paywall again, call `createPaywallView` one more to create a new `view` instance. 

:::warning

Reusing the same `view` without recreating it may result in an `AdaptyUIError.viewAlreadyPresented` error.
:::

```typescript showLineNumbers title="React Native (TSX)"
import { createPaywallView } from 'react-native-adapty/dist/ui';

const view = await createPaywallView(paywall);

view.registerEventHandlers(); // handle close press, etc

try {
  await view.present();
} catch (error) {
  // handle the error
}
```

## Use developer-defined timer

To use developer-defined timers in your mobile app, use the `timerId`, in this example, `CUSTOM_TIMER_NY`, the **Timer ID** of the developer-defined timer you set in the Adapty dashboard. It ensures your app dynamically updates the timer with the correct value—like `13d 09h 03m 34s` (calculated as the timer’s end time, such as New Year’s Day, minus the current time).

```typescript showLineNumbers title="React Native (TSX)"
let customTimers = { 'CUSTOM_TIMER_NY': new Date(2025, 0, 1) }
//and then you can pass it to createPaywallView as follows:
view = await createPaywallView(paywall, { customTimers })
```

In this example, `CUSTOM_TIMER_NY` is the **Timer ID** of the developer-defined timer you set in the Adapty dashboard. The `timerResolver` ensures your app dynamically updates the timer with the correct value—like `13d 09h 03m 34s` (calculated as the timer's end time, such as New Year's Day, minus the current time).

## Show dialog

Use this method instead of native alert dialogs when paywall view is presented on Android. On Android, regular RN alerts appear behind the paywall view, making them invisible to users. This method ensures proper dialog presentation above the paywall on all platforms.

```typescript showLineNumbers title="React Native (TSX)"
try {
  const selectedAction = await view.showDialog({
    title: 'Open URL?',
    content: 'Do you want to open this link?',
    primaryActionTitle: 'Cancel',
    secondaryActionTitle: 'OK',
  });
  
  // handle dialog action
} catch (error) {
  // handle the error
}
```
