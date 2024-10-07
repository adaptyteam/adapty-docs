---
title: "React Native - Present Paywall Builder paywalls"
description: ""
metadataTitle: ""
---

If you've customized a paywall using the Paywall Builder, you don't need to worry about rendering it in your mobile app code to display it to the user. Such a paywall contains both what should be shown within the paywall and how it should be shown.

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