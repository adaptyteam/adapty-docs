---
title: "Present legacy Paywall Builder paywalls in React Native SDK"
description: "Present paywalls in React Native (Legacy) apps using Adapty."
metadataTitle: "Presenting Paywalls in React Native (Legacy) | Adapty Docs"
---

If you've customized a paywall using the Paywall Builder, you don't need to worry about rendering it in your mobile app code to display it to the user. Such a paywall contains both what should be shown within the paywall and how it should be shown.

:::warning

This guide is for **legacy Paywall Builder paywalls** only which require SDK v2.x or earlier. The process for presenting paywalls differs for paywalls designed with different versions of Paywall Builder and remote config paywalls.

- For presenting **New Paywall Builder paywalls**, check out [React Native - Present new Paywall Builder paywalls](react-native-present-paywalls).
- For presenting **Remote config paywalls**, see [Render paywall designed by remote config](present-remote-config-paywalls).

:::

To display a paywall, use the `view.present()` method on the `view` created by the `createPaywallView` method. Each `view` can only be used once. If you need to display the paywall again, call `createPaywallView` one more to create a new `view` instance. 

:::warning

Reusing the same `view` without recreating it may result in an `AdaptyUIError.viewAlreadyPresented` error.
:::

```typescript showLineNumbers title="React Native (TSX)"
import {createPaywallView} from '@adapty/react-native-ui';

const view = await createPaywallView(paywall);

view.registerEventHandlers(); // handle close press, etc

try {
  await view.present();
} catch (error) {
  // handle the error
}

```

**Next step:**

- [Handle paywall events](react-native-handling-events-legacy)