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

```typescript title="React Native (TSX)"
1
import {createPaywallView} from '@adapty/react-native-ui';
2
​
3
const view = await createPaywallView(paywall);
4
​
5
view.registerEventHandlers(); // handle close press, etc
6
​
7
try {
8
  await view.present();
9
} catch (error) {
10
  // handle the error
11
}
12
​
typescript title="React Native (TSX)"
```