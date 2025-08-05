---
title: "Manage offline access"
description: "Manage offline access in case of poor internet connection or temporary outages."
metadataTitle: "Manage offline access | Adapty Docs"
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

In this guide, we describe different ways you can ensure your users can access the features they paid for regardless of the user's internet connection state or the SDK availability:
- **Local access levels**: Handle successful purchases regardless of the SDK availability.
- **Fallback paywalls**: Display paywalls even if you can't fetch them from servers.
- **Caching user profiles**: Enable purchased features even if the app users don't have the Internet connection.


## Local access levels

Each product you configure has an [**access level**](access-level.md) linked to it. When your app users make a purchase, the Adapty SDK assigns the access level to the user [profile](profiles-crm.md), so you need to use it to determine whether users can access paid content in the app.

The Adapty SDK is very reliable, and it's very uncommon that its servers are unavailable. However, even in this rare case, your users won't notice it.

If a user makes a purchase, but Adapty can't get a response, the SDK switches to verifying purchases directly in the store. So, the access level is granted locally in the app, and you don't need to set up anything to enable it. The SDK handles this behind the scenes automatically, and you'll see the access levels show up in the customer data just like normal.

Note the following about how local access levels work:

- When users are back online, their updated access levels are automatically pushed to the Adapty servers.
- Updated data won't appear in the Adapty analytics until data is pushed.
- Purchases won't be recognized for cross-platforms until data is pushed.
- Local access levels work only in case the Adapty servers are down. Otherwise, the SDK will use any cached data.
- Local access levels don't work for consumable products.

## Fallback paywalls

A paywall is your in-app store where customers can browse and purchase your products. Normally, paywalls are loaded from Adapty servers when users need them. But Adapty also provides [**fallback paywalls**](fallback-paywalls.md) for when users open your app without internet or when our backend is temporarily unavailable and there's no cached data on their device.

This prevents showing empty screens during critical moments — users can still see your pricing and offerings, even if they need to wait until they're back online to actually purchase.

Adapty creates these fallbacks as JSON files that match the English versions of the paywalls you've configured in your dashboard. Download the file, place it in your app's assets and pass it to the [appropriate SDK method](fallback-paywalls.md).

## Caching user profiles

To determine user access to paid features, you typically request their profile at app launch using the [`getProfile` method or listen for automatic profile updates](subscription-status.md).

When users have poor connectivity or are offline, the SDK cannot retrieve profile updates. To maintain seamless access, cache the access level and expiration date whenever you successfully retrieve a profile.

During offline periods, your app can reference this cached data to determine feature access, ensuring users retain their purchased functionality regardless of connection status.
