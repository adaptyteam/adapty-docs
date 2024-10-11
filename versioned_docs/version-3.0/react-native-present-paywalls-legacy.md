---
title: "React Native - Present legacy Paywall Builder paywalls"
description: ""
metadataTitle: ""
---

If you've customized a paywall using the Paywall Builder, you don't need to worry about rendering it in your mobile app code to display it to the user. Such a paywall contains both what should be shown within the paywall and how it should be shown.

:::warning

This guide covers the process for **legacy Paywall Builder paywalls** only which requires SDK v2.x or earlier. The process for presenting paywalls differs for paywalls designed with different versions of Paywall Builder and remote config paywalls.

- For presenting **New Paywall Builder paywalls**, check out [React Native - Present new Paywall Builder paywalls](react-native-present-paywalls).
- For presenting **Remote config paywalls**, see [Render paywall designed by remote config](present-remote-config-paywalls).

:::

To display a paywall view, simply call the `view.present()` method. If you've already defined a `view` object in a previous step, feel free to use it. In the following snippet, we'll introduce a new `view` for better visibility.

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

**Next step:**

- [Handle paywall events](react-native-handling-events-legacy)