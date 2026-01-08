---
title: "Sharing paid access between user accounts"
description: "Sharing paid access between different user accounts to accomodate users with multiple devices or multiple app profiles"
metadataTitle: "Sharing paid access between different user accounts to make sure the user doesn't lose access to purchases | Adapty Docs"
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

When a user makes a purchase, Adapty assigns a new [access level](access-level) to the active [customer profile](identifying-users).

But the user's customer profile may change — if they reinstall the application, log into a new account, or purchase a new device. How does Adapty ensure that the buyer doesn't lose access to paid content?

If the **Sharing paid access between user accounts** setting is on, new customer profiles associated with the same store account will *inherit* the access level of the original. This is the default behavior for Adapty apps.

* If a user logs into your app with a new set of credentials, they retain access to paid content.
* If a user reinstalls your application after a factory reset, they retain access to paid content.
* If a user installs the application on other devices with the same store account, the purchase is made available on all devices. Even if each instance of the application has its own customer profile.

This behavior is best for common use cases and store compliance. Do not change it if your app does not have authentication capabilities, and only uses Adapty’s anonymous profiles.

:::important
If you need to test purchases on a sandbox account, change the setting for [sandbox accounts only](#sharing-paid-access-on-sandbox).
:::

If your business model demands a different policy, open the [App Settings](https://app.adapty.io/settings/general) page, and navigate to the **Sharing paid access between users** section. You can select an independent paid access sharing policy for the production environment and for your [sandbox accounts](#sharing-paid-access-on-sandbox).

<Zoom>
  <img src={require('./img/sharing-paid-access.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

:::note
Anonymous user profiles associated with the same store account *always* share their access level, regardless of this setting.
:::

We recommend **the Enabled (default) setting** for most applications. There are two other options to choose from:

## Transfer access to new user

If you select this setting, Adapty limits purchase access to 1 customer ID at a time. The device owner can reinstall the app, log in and out, but cannot access the same product from more than one customer ID simultaneously.

For example, if a customer downloads your application on a second device, Adapty will transfer paid access privileges to the customer ID associated with the new device. The original device will lose access.

If one of the customer profiles is *anonymous* (not associated with a specific customer ID), the two will continue to share the access level. This is necessary to prevent access loss in applications without mandatory authentication.

:::warning
When you disable from the default setting, and enable **Transfer access to new user**, Adapty does not immediately update the access levels of existing customer profiles.

The switch occurs when a user triggers a new store event: for example, renews the subscription, or restores their purchases.
:::

## Disable paid access sharing

If you disable paid access sharing, Adapty ties the product to the active [customer ID](identifying-users#setting-customer-user-id-on-configuration) at the time of the purchase, and does not share these privileges with any other customer profiles. This policy allows for stict 1-to-1 product distribution, but demands mandatory in-app authenticaion.

You need to implement your own authentication logic to make sure that users retain access to their purchases. Select this setting if your app requires customers to create an account before completing a transaction, with strict rules that tie purchases to a single user entity.

:::warning
If you disable paid access sharing, some users may not be able to restore their purchases.

If your application does not guarantee that the user retains access to their purchases, it may fail the mandatory store review.
:::

You can transfer the product from one profile to another without sharing paid access. When you [delete a user profile](https://adapty.io/docs/api-adapty#/operations/deleteProfile), Adapty transfers access to the next available profile, whether anonymous or identified.

## Sharing paid access on sandbox

Paid access sharing allows users to access their purchases even if the original transaction originated from a different customer ID. When you're using a sandbox account, this benefit can become a limitation.

As you test your paywalls with a sandbox account, you may need to purchase the same product more than once. This is impossible to achieve if Adapty detects that the account has already made the purchase.

Adapty allows you to change the sharing paid access setting for *sandbox accounts only*. To purchase the same product more than once, disable paid access sharing, and change the customer ID. Adapty will not be able to restore the earlier purchases with the new customer ID.

## Paid access sharing in analytics

Paid access sharing does not impact revenue metrics. Adapty logs transactions as they occur. The credit for the transactions depends on [which install definition](general#4-installs-definition-for-analytics) you use.
