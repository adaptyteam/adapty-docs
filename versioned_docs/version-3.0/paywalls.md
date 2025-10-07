---
title: "Paywalls"
description: "Explore Adapty’s paywall system and best practices for revenue growth."
metadataTitle: "Overview of Paywalls in Adapty | Adapty Docs"
keywords: ['paywall']
---

import ZoomImage from '@site/src/components/ZoomImage';
import Contentid from '@site/src/components/InlineTooltip';
import InlineTooltip from '@site/src/components/InlineTooltip';
import CustomDocCardList from '@site/src/components/CustomDocCardList';

<CustomDocCardList ids={['create-paywall', 'adapty-paywall-builder', 'paywall-metrics']} />

<ZoomImage id="paywall.webp" width="500px" />

In Adapty, **paywalls are the only way to deliver products through your app**. This way you can easily track how different product sets perform across user groups and manage how products are visually presented.

Adapty offers you two main ways to design a paywall:
- **Use the Adapty Paywall Builder**: You [create a complete, purchase-ready paywall in the no-code builder](quickstart-paywalls). Adapty automatically renders it and handles all the complex purchase flow, receipt validation, and subscription management behind the scenes.
- **Design your paywall manually**: When designing a paywall manually, you have the following options:
   - [Use a remote config](customize-paywall-with-remote-config.md): Instead of hardcoding values in your app code, you can manage your paywall elements (like text and media) dynamically from the dashboard without redeploying your app.
   - <InlineTooltip tooltip="Delegate handling purchases to Adapty">[iOS](making-purchases.md), [Android](android-making-purchases.md), [Flutter](flutter-making-purchases.md), [React Native](react-native-making-purchases.md), and [Unity](unity-making-purchases.md)</InlineTooltip>: Integrating with the store APIs on your own is very time-consuming. Instead of doing it, you can use just one method in the Adapty SDK that handles all the complicated purchase logic.

<CustomDocCardList ids={['fallback-paywalls', 'paywall-localization', 'customize-paywall-with-remote-config', 'web-paywall']} />