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

- **React component**: Embedded component gives you complete control over the UI and logic. 

- **Modal presentation**

## React component

:::note
The **React component** approach requires SDK 3.12.0 or later.
:::


To embed a paywall within your existing component tree, use the `AdaptyPaywallView` component directly in your React Native component hierarchy. This approach gives you full control over when and how the paywall can be dismissed.

:::note

This approach is ideal for required paywalls, mandatory purchase flows, or any scenario where you need to ensure users complete the purchase before proceeding. You can control dismissal through your own UI elements and logic. The paywall cannot be dismissed by system gestures (swipe, back button) when embedded.

:::

```typescript showLineNumbers title="React Native (TSX)"
import { AdaptyPaywallView } from 'react-native-adapty';

const onCloseButtonPress = useCallback<EventHandlers['onCloseButtonPress']>(() => {
  // Handle close button press
}, []);

const onAndroidSystemBack = useCallback<EventHandlers['onAndroidSystemBack']>(() => {
  // Handle Android back button
}, []);

const onProductSelected = useCallback<EventHandlers['onProductSelected']>((productId) => {
  // Handle product selection
}, []);

const onPurchaseStarted = useCallback<EventHandlers['onPurchaseStarted']>((product) => {
  // Handle purchase start
}, []);

const onPurchaseCompleted = useCallback<EventHandlers['onPurchaseCompleted']>((purchaseResult, product) => {
  // Handle successful purchase
}, []);

const onPurchaseFailed = useCallback<EventHandlers['onPurchaseFailed']>((error, product) => {
  // Handle purchase failure
}, []);

const onRestoreStarted = useCallback<EventHandlers['onRestoreStarted']>(() => {
  // Handle restore start
}, []);

const onRestoreCompleted = useCallback<EventHandlers['onRestoreCompleted']>((profile) => {
  // Handle successful restore
}, []);

const onRestoreFailed = useCallback<EventHandlers['onRestoreFailed']>((error) => {
  // Handle restore failure
}, []);

const onRenderingFailed = useCallback<EventHandlers['onRenderingFailed']>((error) => {
  // Handle rendering errors
}, []);

const onLoadingProductsFailed = useCallback<EventHandlers['onLoadingProductsFailed']>((error) => {
  // Handle product loading errors
}, []);

const onUrlPress = useCallback<EventHandlers['onUrlPress']>((url) => {
  // Handle URL press
}, []);

const onCustomAction = useCallback<EventHandlers['onCustomAction']>((actionId) => {
  // Handle custom actions
}, []);

<AdaptyPaywallView
  paywall={paywall}
  style={styles.container}
  onCloseButtonPress={onCloseButtonPress}
  onAndroidSystemBack={onAndroidSystemBack}
  onProductSelected={onProductSelected}
  onPurchaseStarted={onPurchaseStarted}
  onPurchaseCompleted={onPurchaseCompleted}
  onPurchaseFailed={onPurchaseFailed}
  onRestoreStarted={onRestoreStarted}
  onRestoreCompleted={onRestoreCompleted}
  onRestoreFailed={onRestoreFailed}
  onRenderingFailed={onRenderingFailed}
  onLoadingProductsFailed={onLoadingProductsFailed}
  onUrlPress={onUrlPress}
  onCustomAction={onCustomAction}
/>
```

## Modal presentation

To display a paywall as a standalone screen that users can dismiss, use the `view.present()` method on the `view` created by the `createPaywallView` method. Each `view` can only be used once. If you need to display the paywall again, call `createPaywallView` one more time to create a new `view` instance.

:::warning
Reusing the same `view` without recreating it may result in an `AdaptyUIError.viewAlreadyPresented` error.
:::

<Tabs groupId="version" queryString>
<TabItem value="new" label="SDK version 3.12 or later" default>
```typescript showLineNumbers title="React Native (TSX)"
import { createPaywallView } from 'react-native-adapty';

const view = await createPaywallView(paywall);

view.setEventHandlers(); // handle close press, etc

try {
  await view.present();
} catch (error) {
  // handle the error
}
```

:::important
Calling `setEventHandlers` multiple times will re-register **all** event handlers (both default and provided ones), not just the ones you pass. This means all previous event listeners will be replaced with the new merged set.
:::

</TabItem>

<TabItem value="old" label="SDK version < 3.12" default>
```typescript showLineNumbers title="React Native (TSX)"
import { createPaywallView } from 'react-native-adapty';

const view = await createPaywallView(paywall);

view.registerEventHandlers(); // handle close press, etc

try {
  await view.present();
} catch (error) {
  // handle the error
}
```

</TabItem>
</Tabs>


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
