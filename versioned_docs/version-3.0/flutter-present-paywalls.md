---
title: "Flutter - Present new Paywall Builder paywalls"
description: ""
metadataTitle: ""
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

If you've customized a paywall using the Paywall Builder, you don't need to worry about rendering it in your mobile app code to display it to the user. Such a paywall contains both what should be shown within the paywall and how it should be shown.

:::warning

This guide is for **legacy Paywall Builder paywalls**, which require Adapty SDK up to version 2.x. The [new Paywall Builder](adapty-paywall-builder) requires Adapty SDK 3.0 or later, which is currently not available for Flutter.

For presenting remote config paywalls, see [Render paywall designed by remote config](present-remote-config-paywalls).
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

## Using custom timers

To use custom timers in your mobile app, create a `timerResolver` object—a dictionary or map that pairs custom timers with the string values that will replace them when the paywall is rendered. Here's an example:

```typescript title="Flutter"
try {
      final view = await AdaptyUI().createPaywallView(
        paywall: paywall,
        customTags: ...,
        customTimers: {
          'CUSTOM_TIMER_6H': DateTime.now().add(const Duration(seconds: 3600 * 6)),
          'CUSTOM_TIMER_NY': DateTime(2025, 1, 1), // New Year 2025
        },
        preloadProducts: ...,
      );
    } on AdaptyError catch (e) {
      // handle the error
    } catch (e) {
      // handle the error
    }
```

In this example, `CUSTOM_TIMER_NY` and `CUSTOM_TIMER_6H` are the IDs of custom timers you set in the Adapty Dashboard. The `timerResolver` ensures your app dynamically updates each timer with the correct value—for example:

- `CUSTOM_TIMER_NY`: The time remaining until the timer’s end, such as New Year’s Day.
- `CUSTOM_TIMER_6H`: The time left in a 6-hour period that started when the user opened the paywall.