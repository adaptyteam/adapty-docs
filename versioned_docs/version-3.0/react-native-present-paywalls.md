---
title: "React Native - Present new Paywall Builder paywalls"
description: "Present paywalls in React Native apps using Adapty."
metadataTitle: "Presenting Paywalls in React Native | Adapty Docs"

---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import SampleApp from '@site/src/components/reusable/SampleApp.md';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

If you've customized a paywall using the Paywall Builder, you don't need to worry about rendering it in your mobile app code to display it to the user. Such a paywall contains both what should be shown within the paywall and how it should be shown.

Before you start, ensure that:

1. You have [created a paywall](create-paywall.md).
2. You have added the paywall to a [placement](placements.md).

:::warning

This guide is for **new Paywall Builder paywalls** only, which require SDK v3.0 or later. The process for presenting paywalls differs for paywalls designed with different versions of Paywall Builder and remote config paywalls.

- For presenting **legacy Paywall Builder paywalls**, check out [React Native - Present Paywall Builder paywalls](react-native-present-paywalls-legacy).
- For presenting **remote config paywalls**, see [Render paywall designed by remote config](present-remote-config-paywalls).

:::

Adapty React Native SDK provides two ways to present paywalls:

- **Embedded component**: Embedded component gives you complete control over dismissal through your own UI and logic. Ideal for required paywalls where you want to ensure users complete the purchase flow before proceeding.

- **Standalone screen**: Modal presentation that can be dismissed by users through native platform gestures (swipe, back button). Best for optional paywalls where users should be able to skip or dismiss the content.

## Embed in component hierarchy

:::note
The **embedded component** approach requires SDK 3.12.0 or later.
:::


To embed a paywall within your existing component tree, use the `AdaptyPaywallView` component directly in your React Native component hierarchy. This approach gives you full control over when and how the paywall can be dismissed.

:::note

This approach is ideal for required paywalls, mandatory purchase flows, or any scenario where you need to ensure users complete the purchase before proceeding. You can control dismissal through your own UI elements and logic. The paywall cannot be dismissed by system gestures (swipe, back button) when embedded.

:::

```typescript showLineNumbers title="React Native (TSX)"
import { AdaptyPaywallView } from 'react-native-adapty/dist/ui';

<AdaptyPaywallView
  paywall={paywall}
  style={{ /* your styles */ }}
  eventHandlers={{ /* your event handlers */ }}
/>
```

## Present as standalone screen

To display a paywall as a standalone screen that users can dismiss, use the `view.present()` method on the `view` created by the `createPaywallView` method. Each `view` can only be used once. If you need to display the paywall again, call `createPaywallView` one more time to create a new `view` instance.

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

To use developer-defined timers in your mobile app, use the `timerId`, in this example, `CUSTOM_TIMER_NY`, the **Timer ID** of the developer-defined timer you set in the Adapty dashboard. It ensures your app dynamically updates the timer with the correct value—like `13d 09h 03m 34s` (calculated as the timer's end time, such as New Year's Day, minus the current time).

<Tabs>
<TabItem value="embed" label="Embedded component">
```typescript showLineNumbers title="React Native (TSX)"
let customTimers = { 'CUSTOM_TIMER_NY': new Date(2025, 0, 1) }
//and then you can pass it to createPaywallView as follows:
view = await createPaywallView(paywall, { customTimers })
```
</TabItem>
<TabItem value="standalone" label="Standalone screen">
```typescript showLineNumbers title="React Native (TSX)"
// Custom timers are not currently supported with AdaptyPaywallView
<AdaptyPaywallView
  paywall={paywall}
  eventHandlers={{
    // ... your event handlers
  }}
  customTimers={{ 'CUSTOM_TIMER_NY': new Date(2025, 0, 1) }}
/>
```
</TabItem>
</Tabs>

In this example, `CUSTOM_TIMER_NY` is the **Timer ID** of the developer-defined timer you set in the Adapty dashboard. The `timerResolver` ensures your app dynamically updates the timer with the correct value—like `13d 09h 03m 34s` (calculated as the timer's end time, such as New Year's Day, minus the current time).