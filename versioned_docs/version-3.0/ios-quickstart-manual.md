---
title: "Quickstart for integrating purchases with Adapty into your custom paywall in iOS SDK"
description: "Quickstart guide to setting up Adapty for in-app subscription management."
metadataTitle: "Adapty Quickstart Guide | Adapty Docs"
keywords: ['paywalls ios', 'sdk ios', 'paywall', 'getPaywall']
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';


## Before you start

### Set up products

To enable in-app purchases, you need to understand three key concepts:

- [**Products**](product.md) – anything users can buy (subscriptions, consumables, lifetime access)
- [**Paywalls**](paywalls.md) are configurations that define which products to offer. In Adapty, paywalls are the only way to retrieve products, but this design lets you modify offerings, pricing, and product combinations without touching your app code.
- [**Placements**](placements.md) – where and when you show paywalls in your app (like `main`, `onboarding`, `settings`). You set up paywalls for placements in the dashboard, then request them by placement ID in your code. This makes it easy to run A/B tests and show different paywalls to different users.

Working with these concepts is required even if you work with your custom paywall. Basically, they are just your way to manage the products you sell in your app.

So, before you impl

### Manage users

You can 