---
title: "Sharing paid access between user accounts"
description: "Sharing paid access between different user accounts to accommodate users with multiple devices or multiple app profiles"
metadataTitle: "Sharing paid access between different user accounts to make sure the user doesn't lose access to purchases | Adapty Docs"
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import Details from '@site/src/components/Details';

When a user makes a purchase, Adapty assigns a new [access level](access-level) to their active [profile](identifying-users). This access level authorizes the buyer to access paid content.

The buyer's profile may inadvertently change if they reinstall your app, or log into a new in-app account. To ensure uninterrupted access, Adapty automatically shares the user's access level between the original profile and the ones that follow.

This approach works best for most applications. But if your business logic demands it, you can select a more limited paid access sharing policy.

Open the [General Settings](https://app.adapty.io/settings/general) page to set an access level sharing policy. To facilitate testing, you can change this setting for the [sandbox environment only](#sharing-paid-access-on-sandbox).

<Details>

:::important
If your application doesn't authenticate users, you can ignore this setting. Anonymous profiles associated with the same store account *always* share their access level.
:::

    <summary>Which access sharing policy should I choose? (Click to expand)</summary>

    | My app...                                                    | Best option                                             |
    | ------------------------------------------------------------ | ------------------------------------------------------------ |
    | Does not have authentication capabilities, and only uses Adapty’s anonymous profile IDs. | Use the **Enabled (default)** setting. |
    | Can authenticate users, but allows them to make purchases without an account. | Enable the **Transfer access to new user** setting. The users will be able to sign up and claim anonymous purchases. |
    | Requires customers to create an account before a purchase, but can link a single product to multiple Customer User IDs. | Enable the **Transfer access to new user** setting. Multiple accounts will be able to access the product, but only in sequence. |
    | Requires customers to create an account before purchasing, with strict rules that tie purchases to a single Customer User ID. | **Disable** access level sharing. |
</Details>

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

## Enabled (default)

This setting works best for applications **without built-in authentication**. After the purchase, all profiles associated with same store account automatically *inherit* the access level.

* If a user logs into your app with a new set of credentials, they retain access to paid content.
* If a user reinstalls your application after a factory reset, they retain access to paid content.
* If a user installs the application on other devices with the same store account, the purchase is made available on all devices. Even if each instance of the application has its own customer profile.

## Transfer access to new user

This setting works best for applications that allow purchases **with or without authentication**, or want to enforce a **one-device-per-user** policy.

Adapty limits purchase access to 1 customer ID at a time. The device owner can reinstall the app, log in and out, but cannot access the same product from more than one customer ID simultaneously.

With this setting enabled, anonymous profiles (for example, a profile that becomes active after the user logs out) always inherit the access level of the last active customer ID. This is necessary to prevent loss of access later on.

:::warning
When you disable the default setting, and enable **Transfer access to new user**, Adapty does not immediately update the access levels of existing customer profiles.

The switch occurs when a user triggers a new store event: for example, renews the subscription, or restores their purchases.
:::

## Disable paid access sharing

This setting is **only appropriate** for applications with **mandatory authentication** or an independent access management implementation. In other cases, the users may not be able to access their purchases, and your application risks **failing the mandatory store review**.

If you disable paid access sharing, Adapty ties the product to the active [customer ID](identifying-users#setting-customer-user-id-on-configuration) at the time of the purchase, and does not share the access level with any other customer profiles. This policy allows for strict 1-to-1 product distribution.

:::warning
When you disable paid access sharing, you prevent customer IDs from inheriting paid access. If a customer ID inherited paid access in the past, it cannot be revoked automatically.
:::

:::important
In emergency situations, you may need to [delete a user profile](https://adapty.io/docs/api-adapty#/operations/deleteProfile) in order for the next available profile (whether identified or anonymous) to claim its access level.
:::

## Sharing paid access on sandbox

You can set a sharing paid access policy specifically for the sandbox environment.

:::important
Clear the purchase history of your sandbox account before you test. A strict paid access sharing policy does not prevent Adapty from detecting existing transactions.
:::

## Paid access sharing in analytics

* Adapty logs transactions as they occur. A single transaction may be associated with more than one profile, but isn't counted more than once.
* If two or more profiles share the same access level, the purchase is attributed to the [parent profile](profiles-crm#parent-and-inheritor-profiles).
* Access level inheritance does not impact installation statistics. To determine how Adapty counts installations, you can select one of the two available [installation definitions](installs#calculation) on the settings page.
