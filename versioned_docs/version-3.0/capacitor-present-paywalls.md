---
title: "Present Paywall Builder paywalls in Capacitor SDK"
description: "Present paywalls in Capacitor apps using Adapty."
metadataTitle: "Presenting Paywalls in Capacitor | Adapty Docs"
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import SampleApp from '@site/src/components/reusable/SampleApp.md'; 

If you've customized a paywall using the Paywall Builder, you don't need to worry about rendering it in your mobile app code to display it to the user. Such a paywall contains both what should be shown within the paywall and how it should be shown.

:::warning
This guide is for **Paywall Builder paywalls** only. The process for presenting paywalls differs for remote config paywalls. For presenting **remote config paywalls**, see [Render paywall designed by remote config](present-remote-config-paywalls).
:::

To display a paywall, use the `view.present()` method on the `view` created by the `createPaywallView` method. Each `view` can only be used once. If you need to display the paywall again, call `createPaywallView` one more to create a new `view` instance. 

:::warning

Reusing the same `view` without recreating it may result in an error.
:::

```typescript showLineNumbers
import { adapty, createPaywallView } from '@adapty/capacitor';

const view = await createPaywallView(paywall);

view.setEventHandlers({
  onUrlPress(url) {
    window.open(url, '_blank');
    return false; 
  },
});

try {
  await view.present();
} catch (error) {
  // handle the error
}
```

## Use developer-defined timer

To use developer-defined timers in your mobile app, use the `timerId`, in this example, `CUSTOM_TIMER_NY`, the **Timer ID** of the developer-defined timer you set in the Adapty dashboard. It ensures your app dynamically updates the timer with the correct value—like `13d 09h 03m 34s` (calculated as the timer's end time, such as New Year's Day, minus the current time).

```typescript showLineNumbers
const customTimers = { 'CUSTOM_TIMER_NY': new Date(2025, 0, 1) };

const view = await createPaywallView(paywall, { customTimers });
```

In this example, `CUSTOM_TIMER_NY` is the **Timer ID** of the developer-defined timer you set in the Adapty dashboard. The timer ensures your app dynamically updates the timer with the correct value—like `13d 09h 03m 34s` (calculated as the timer's end time, such as New Year's Day, minus the current time).
