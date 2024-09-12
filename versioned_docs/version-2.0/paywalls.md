---
title: "Paywalls"
description: "Discover the power of Adapty's dynamic in-app product display solution. Learn how paywalls serve as versatile storefronts within your app, allowing you to tailor product offerings based on user subscriptions, location, and device type. With Adapty, enhance customer satisfaction and boost revenue by offering targeted product sets to different user segments effortlessly."
metadataTitle: "Unlock Revenue Growth: Adapty's Dynamic In-App Product Display Solution"
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

A paywall serves as an in-app storefront where customers can browse and make purchases. What sets it apart is its dynamic nature, allowing you to modify it without requiring app updates or even introducing new paywalls to users based on various factors using [Placements](placements).

There are two ways to design the view of a paywall: using the  [Paywall Builder](/3.0/adapty-paywall-builder), which is an easy and flexible no-code tool designed to help you create top-performing paywalls without requiring development or design skills; and the [Remote Config](customize-paywall-with-remote-config), a powerful tool that allows you to build a paywall using JSON. In both scenarios, you'll have impressive paywalls for your users.

The way you show these paywalls in your mobile app depends on the tool you decide to pick:

1. Paywalls designed with the Paywall Builder include both what to display and how to display it. They can also process most user actions such as making purchases, opening links, or clicking buttons with no development required. Refer to the [Design paywalls with Paywall Builder](/3.0/adapty-paywall-builder) for details on designing paywalls with the Paywall Builder and [Display paywalls created by Paywall Builder](display-pb-paywalls) topic for details on presenting them in your mobile app.
2. On the other hand, paywalls customized using remote config can be tailored to your specific requirements, granting you complete freedom to design and process them as needed. Refer to the [Design paywall with remote config](customize-paywall-with-remote-config) topic for details on designing paywalls with the remote config and to the   [Display paywalls created by remote config](display-remote-config-paywalls) topic for details on presenting them in your mobile app.

## Paywall states

Paywalls can have four distinct states:

- **Draft**: These paywalls are in the preparation stage has never been used in any placements or A/B tests. Use this state while you are designing your paywall until you are ready to use it in your mobile app.
- **Live**: These paywalls are currently active and running in placements and/ or A/B tests. Live paywalls can be used in multiple A/B tests and associated with various placements. You may conduct one or more A/B tests based on a live paywall if it turns out to be effective.
- **Inactive**: These paywalls were previously active in placements but are currently not live. You can repurpose an inactive paywall for a new A/B test or choose to [archive it](archive-paywalls) if it is no longer required.
- **Archived**: These paywalls are no longer in use and have been archived. You can always [restore the archived paywall to an active state](restore-paywall).