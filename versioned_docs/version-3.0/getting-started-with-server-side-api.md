---
title: "Server-side API"
description: "Explore Adapty's server-side API for managing user subscriptions, syncing subscribers across platforms, updating user attributes, and granting access levels. Learn how to integrate payments from web stores and customize user attributes for better segmentation and A/B testing."
metadataTitle: "Unlock Subscription and User Management with Adapty's Server-Side API"

---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

With the API, you can:

1. Check a user's subscription status.
2. Activate a user's subscription with an access level.
3. Retrieve user attributes.
4. Set user attributes.

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

If you use web payment providers like Stripe, ChargeBee, or others, you can sync your subscribers easily. Here’s how:
1. [Assign a unique ID to each user](identifying-users).
2. [Check their subscription status](ss-get-profile) using the API.
3. If a user is on a freemium plan, display a paywall on your website.
4. After a successful payment, [update the subscription status](ss-set-transaction) in Adapty via API.
5. Your subscribers will automatically stay in sync with your mobile app.

## Case 2: Grant a subscription

:::note
Due to security reasons, you can't grant a subscription via mobile SDK.
::: 

If you're selling through your own online store, Amazon Appstore, Microsoft Store, or any other platform besides Google Play and App Store, you’ll need to sync those transactions with Adapty to provide access and track the transaction in analytics.

1. [Assign a unique ID to each user](identifying-users).
2. [Set up a custom store for your products in the Adapty Dashboard](custom-store).
3. Sync the transaction to Adapty using the [Set transaction](ss-set-transaction) API request.

## Case 3: Grant an access level

Let’s say you're running a promotion offering a 7-day free trial and you want the experience to be consistent across platforms. To sync this with the mobile app:

1. [Assign a unique ID to each user](identifying-users).
2. Use the API to [grant premium access](ss-grant-access-level) for 7 days.

After the 7 days, users who don’t subscribe will be downgraded to the free tier.

## Case 4: Sync users' properties and custom attributes

If you have custom attributes for your users—such as the number of words learned in a language learning app—you can sync them as well.

1. [Assign a unique ID to each user](identifying-users).
2. [Update the attribute](ss-update-profile) via API or SDK.

These custom attributes can be used to create segments and run A/B tests.

---

**What's next:**

- Proceed with [authorization for server-side API](ss-authorization)
- Requests:
  - [Get profile](ss-get-profile)
  - [Create profile](ss-create-profile)
  - [Update profile](ss-update-profile)
  - [Delete profile](ss-delete-profile) 
  - [Grant access level](ss-grant-access-level)
  - [Revoke access level](ss-revoke-access-level)
  - [Set transaction](ss-set-transaction)
  - [Validate purchase, provide access level to customer, and import their transaction history](ss-purchase-in-stripe)
  - [Add integration identifiers](ss-add-integration)
