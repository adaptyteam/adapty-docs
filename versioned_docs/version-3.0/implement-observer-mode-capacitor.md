---
title: "Implement Observer mode in Capacitor SDK"
description: "Implement observer mode in Adapty to track user subscription events in Capacitor SDK."
metadataTitle: "Implementing Observer Mode in Capacitor SDK | Adapty Docs"
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

If you already have your own purchase infrastructure and aren't ready to fully switch to Adapty, you can explore [Observer mode](observer-vs-full-mode). In its basic form, Observer Mode offers advanced analytics and seamless integration with attribution and analytics systems.

If this meets your needs, you only need to:
1. Turn it on when configuring the Adapty SDK by setting the `observerMode` parameter to `true`. Follow the setup instructions for [Capacitor](sdk-installation-capacitor#configure-adapty-sdk).
2. [Report transactions](report-transactions-observer-mode-capacitor) from your existing purchase infrastructure to Adapty.

### Observer mode setup

Turn on the Observer mode if you handle purchases and subscription status yourself and use Adapty only for sending subscription events and analytics.

:::important
When running in the Observer mode, Adapty SDK won't close any transactions, so make sure you're handling it.
:::

```typescript showLineNumbers
import { adapty } from '@adapty/capacitor';

try {
  await adapty.activate({
    apiKey: 'YOUR_PUBLIC_SDK_KEY',
    params: {
      observerMode: true // Enable observer mode
    }
  });
} catch (error) {
  console.error('Failed to activate Adapty:', error);
}
```

Parameters:

| Parameter                   | Description                                                  |
| --------------------------- | ------------------------------------------------------------ |
| **observerMode**            | A boolean value that controls [Observer mode](observer-vs-full-mode). The default value is `false`. |

## Using Adapty paywalls in Observer Mode

If you also want to use Adapty's paywalls and A/B testing features, you can — but it requires some extra setup in Observer mode. Here's what you'll need to do in addition to the steps above:

1. Display paywalls as usual for [remote config paywalls](present-remote-config-paywalls-capacitor.md).
2. [Associate paywalls](report-transactions-observer-mode-capacitor) with purchase transactions. 
