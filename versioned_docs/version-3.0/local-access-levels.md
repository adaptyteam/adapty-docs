---
title: "Local access levels"
description: "Manage access levels in case of temporary outages."
metadataTitle: "Local access levels | Adapty Docs"
---

:::important
Note the following:
- Local access levels are supported in the Adapty SDK starting from version 3.12.
- By default, local access levels are disabled on Android. If you need them, enable them during the SDK activation: [Android](sdk-installation-android#enable-local-access-levels), [React Native](sdk-installation-reactnative#enable-local-access-levels-android).
:::

Each product you configure has an [**access level**](access-level.md) linked to it. When your users make a purchase, the Adapty SDK assigns the access level to the user [profile](profiles-crm.md), so you need to use this access level to determine whether users can access paid content in the app.

The Adapty SDK is very reliable, and it's very rare for its servers to be unavailable. However, even in this rare case, your users won't notice it.

If a user makes a purchase, but Adapty cannot receive a response, the SDK switches to verifying purchases directly in the store. Therefore, the access level is granted locally in the app, and no additional setup is required to enable it. The SDK handles this automatically behind the scenes, and users will access what they paid for just like normal.

Note the following about how local access levels work:

- When users are back online, transaction information is automatically pushed to the Adapty servers, which then applies the transactions to the user profile and returns the updated profile to the SDK.
- Updated data won't appear in the Adapty analytics until data is pushed.
- Local access levels work only when the Adapty servers are down. Otherwise, the SDK will use any cached data.
- Local access levels don't work for consumable products, except when a consumable product is assigned a subscription type (monthly, annual, weekly, etc.) in the Adapty dashboard.
