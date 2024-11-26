---
title: "React Native - Present new Paywall Builder paywalls"
description: ""
metadataTitle: ""

---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

If you've customized a paywall using the Paywall Builder, you don't need to worry about rendering it in your mobile app code to display it to the user. Such a paywall contains both what should be shown within the paywall and how it should be shown.

:::warning

This guide is for **new Paywall Builder paywalls** only which require SDK v3.0 or later. The process for presenting paywalls differs for paywalls designed with different versions of Paywall Builder and remote config paywalls.

- For presenting **legacy Paywall Builder paywalls**, check out [React Native - Present Paywall Builder paywalls](react-native-present-paywalls-legacy).
- For presenting **remote config paywalls**, see [Render paywall designed by remote config](present-remote-config-paywalls).

:::

To display a paywall view, simply call the `view.present()` method. If you've already defined a `view` object in a previous step, feel free to use it. In the following snippet, we'll introduce a new `view` for better visibility.

:::warning
The result of the `createPaywallView` method can only be used once. If you need to use it again, call the `createPaywallView` method anew. Calling it twice without recreating may result in the `AdaptyUIError.viewAlreadyPresented` error.
:::

```typescript title="React Native (TSX)"
import {createPaywallView} from '@adapty/react-native-ui';

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

```typescript title="React Native (TSX)"
let timerInfo = { 'CUSTOM_TIMER_NY': new Date(2025, 0, 1) }
//and then you can pass it to createPaywallView as follows:
view = await createPaywallView(paywall, { timerInfo })
```

In this example, `CUSTOM_TIMER_NY` is the **Timer ID** of the developer-defined timer you set in the Adapty dashboard. The `timerResolver` ensures your app dynamically updates the timer with the correct value—like `13d 09h 03m 34s` (calculated as the timer’s end time, such as New Year’s Day, minus the current time).
