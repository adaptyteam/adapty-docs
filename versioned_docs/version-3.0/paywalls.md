---
title: "Paywalls"
description: "Explore Adapty’s paywall system and best practices for revenue growth."
metadataTitle: "Overview of Paywalls in Adapty | Adapty Docs"
keywords: ['paywall']
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import Contentid from '@site/src/components/InlineTooltip';
import InlineTooltip from '@site/src/components/InlineTooltip';

A paywall serves as an in-app storefront where customers can browse and make purchases. What sets it apart is its dynamic nature, allowing you to modify it without requiring app updates. You can even introduce new paywalls to users based on various factors using [Placements](placements).

There are two ways to design a paywall:

- **[Paywall Builder](adapty-paywall-builder)**: An easy and flexible no-code tool designed to help you create top-performing paywalls without requiring development or design skills.

- **[Remote Config](customize-paywall-with-remote-config)**: A powerful tool that allows you to build a paywall using JSON.

With either approach, you'll create impressive paywalls for your users.

How you display these paywalls in your mobile app depends on the tool you choose:

1. **Paywalls designed with the Paywall Builder** include both what to display and how to display it. They can also process most user actions such as making purchases, opening links, or clicking buttons without requiring development. 

   Refer to [Design paywalls with Paywall Builder](adapty-paywall-builder) for design details and <InlineTooltip tooltip="quickstart guides">[iOS](ios-quickstart-paywalls.md), [Android](android-quickstart-paywalls.md), [Flutter](flutter-quickstart-paywalls.md), [React Native](react-native-quickstart-paywalls.md), and [Unity](unity-quickstart-paywalls.md)</InlineTooltip> for implementation guidance.

2. **Paywalls customized using remote config** can be tailored to your specific requirements, giving you complete freedom to design and process them as needed. 

   Refer to [Design paywall with remote config](customize-paywall-with-remote-config) for design details and [Display paywalls created by remote config](display-remote-config-paywalls) for implementation guidance.

## Paywall states

Paywalls can have four distinct states:

- **Draft**: These paywalls are in the preparation stage and have never been used in any placements or A/B tests. Use this state while you are designing your paywall until you are ready to use it in your mobile app.
- **Live**: These paywalls are currently active and running in placements and/or A/B tests. Live paywalls can be used in multiple A/B tests and associated with various placements. You may conduct one or more A/B tests based on a live paywall if it turns out to be effective.
- **Inactive**: These paywalls were previously active in placements but are no longer live. You can repurpose an inactive paywall for a new A/B test or choose to [archive it](archive-paywalls) if it is no longer required.
- **Archived**: These paywalls are no longer in use and have been archived. You can always [restore the archived paywall to an active state](restore-paywall).

:::info
Changes to live paywalls are reflected immediately.
:::