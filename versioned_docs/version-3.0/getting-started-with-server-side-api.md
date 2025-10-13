---
title: "Server-side API"
description: "Get started with Adapty's server-side API for subscription management."
metadataTitle: "Getting Started with Server-Side API | Adapty Docs"
keywords: ['api']
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import InlineTooltip from '@site/src/components/InlineTooltip';

With the API, you can:

1. Check a user's subscription status.
2. Activate a user's subscription with an access level.
3. Retrieve user attributes.
4. Set user attributes.
5. Get and update paywall configurations.

<Zoom>
  <img src={require('./img/server.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

<p> </p>

:::note

To track subscription events, use [Webhook](webhook) integration in Adapty or integrate directly with your existing service.

:::

## Case 1: Sync subscribers between web and mobile

If you use web payment providers like Stripe, ChargeBee, or others, you can sync your subscribers easily. Here's how:
1. <InlineTooltip tooltip="Assign a unique ID to each user">[iOS](identifying-users), [Android](android-identifying-users), [Flutter](flutter-identifying-users), [React Native](react-native-identifying-users), and [Unity](unity-identifying-users)</InlineTooltip>.
2. [Check their subscription status](api-adapty#/operations/getProfile) using the API.
3. If a user is on a freemium plan, display a paywall on your website.
4. After a successful payment, [update the subscription status](api-adapty#/operations/setTransaction) in Adapty via API.
5. Your subscribers will automatically stay in sync with your mobile app.

## Case 2: Grant a subscription

:::note
Due to security reasons, you can't grant a subscription via mobile SDK.
::: 

If you're selling through your own online store, Amazon Appstore, Microsoft Store, or any other platform besides Google Play and App Store, you'll need to sync those transactions with Adapty to provide access and track the transaction in analytics.

1. <InlineTooltip tooltip="Assign a unique ID to each user">[iOS](identifying-users), [Android](android-identifying-users), [Flutter](flutter-identifying-users), [React Native](react-native-identifying-users), and [Unity](unity-identifying-users)</InlineTooltip>.
2. [Set up a custom store for your products in the Adapty Dashboard](custom-store).
3. Sync the transaction to Adapty using the [Set transaction](api-adapty#/operations/setTransaction) API request.

## Case 3: Grant an access level

Let's say you're running a promotion offering a 7-day free trial and you want the experience to be consistent across platforms. To sync this with the mobile app:

1. <InlineTooltip tooltip="Assign a unique ID to each user">[iOS](identifying-users), [Android](android-identifying-users), [Flutter](flutter-identifying-users), [React Native](react-native-identifying-users), and [Unity](unity-identifying-users)</InlineTooltip>.
2. Use the API to [grant premium access](api-adapty#/operations/grantAccessLevel) for 7 days.

After the 7 days, users who don't subscribe will be downgraded to the free tier.

## Case 4: Sync users' properties and custom attributes

If you have custom attributes for your users—such as the number of words learned in a language learning app—you can sync them as well.

1. <InlineTooltip tooltip="Assign a unique ID to each user">[iOS](identifying-users), [Android](android-identifying-users), [Flutter](flutter-identifying-users), [React Native](react-native-identifying-users), and [Unity](unity-identifying-users)</InlineTooltip>.
2. [Update the attribute](api-adapty#/operations/updateProfile) via API or SDK.

These custom attributes can be used to create segments and run A/B tests.

## Case 5: Manage paywall configurations

You can [update remote configs in paywalls](api-adapty#/operations/updatePaywall.md) to dynamically adjust your paywall appearance and behavior without redeploying your app.

---

**What's next:**

- Proceed with [authorization for server-side API](ss-authorization)
- Requests:
  - [Get profile](api-adapty#/operations/getProfile)
  - [Create profile](api-adapty#/operations/createProfile)
  - [Update profile](api-adapty#/operations/updateProfile)
  - [Delete profile](api-adapty#/operations/deleteProfile) 
  - [Grant access level](api-adapty#/operations/grantAccessLevel)
  - [Revoke access level](api-adapty#/operations/revokeAccessLevel)
  - [Set transaction](api-adapty#/operations/setTransaction)
  - [Validate purchase, provide access level to customer, and import their transaction history](api-adapty#/operations/validateStripePurchase)
  - [Add integration identifiers](api-adapty#/operations/setIntegrationIdentifiers)
  - [Get paywall](api-adapty#/operations/getPaywall)
  - [List paywalls](api-adapty#/operations/listPaywalls)
  - [Update paywall](api-adapty#/operations/updatePaywall)
