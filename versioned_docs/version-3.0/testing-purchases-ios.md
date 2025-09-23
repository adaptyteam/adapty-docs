---
title: "Test in-app purchases in Apple App Store"
description: "Learn how to test in-app purchases on iOS with Adapty’s sandbox mode."
metadataTitle: "Testing Purchases on iOS | Adapty Docs"
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

Once you've configured everything in the Adapty Dashboard and your mobile app, it's time to conduct in-app purchase testing.

:::warning
Test on a real device

Whatever tool you choose, it's essential to conduct testing on a real device to validate the end-to-end purchase process. While testing on a simulator allows you to examine paywalls, it does not enable interaction with the Apple's servers, making it impossible to test purchases.
:::

**Note:** none of the test tools charge users when they test buying a product. The App Store doesn’t send emails for purchases or refunds made in the test environments.

You can either choose to test in Sandbox or using TestFlight. Sandbox is the best choice when you as a developer want to test the purchases yourself on a device linked to your Mac with XCode, while TestFlight is more convenient for other members of the team.

Choose the method that works best for you:

- [Testing in Sandbox](test-purchases-in-sandbox)