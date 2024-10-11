---
title: "Server-side API"
description: "Explore Adapty's server-side API for managing user subscriptions, syncing subscribers across platforms, updating user attributes, and granting access levels. Learn how to integrate payments from web stores and customize user attributes for better segmentation and A/B testing."
metadataTitle: "Unlock Subscription and User Management with Adapty's Server-Side API"
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

With the API, you can:

1. Check a user's subscription status.
2. Activate a user's subscription with an [access level](access-level).
3. Retrieve user attributes.
4. Set user attributes.

<Zoom>
  <img src={require('./img/Adapty-Communication-Scheme.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

:::note

To track subscription events, use [Webhook](webhook) integration in Adapty or integrate directly with your existing service.

:::

To use the API effectively, you need a unique ID for your users. This could be an email, phone number, or your internal ID. Without it, you won’t be able to identify the same user across multiple platforms.

## Case 1: Syncing subscribers between web and mobile

1. If you use web payment providers like Stripe, ChargeBee, or others, you can sync your subscribers easily. Here’s how:
   1. Assign a unique ID to each user.
   2. Check their subscription status using the API.
   3. If a user is on a freemium plan, display a paywall on your website.
   4. After a successful payment, [update the subscription status](server-side-api-specs#set-transaction) in Adapty via API.
   5. Your subscribers will automatically stay in sync with your mobile app.

## Case 2: Grant a subscription

:::note
Due to security reasons, you can't grant a subscription via mobile SDK.
::: 

If you're selling through your own online store, Amazon Appstore, Microsoft Store, or any other platform besides Google Play and App Store, you’ll need to sync those transactions with Adapty to provide access and track the transaction in analytics.

1. Set up a custom store for your products in the Adapty Dashboard.
2. Get the user's unique ID.
3. Sync the transaction to Adapty using the [Set transaction](server-side-api-specs#set-transaction) API request.

## Case 3: Grant an access level

Let’s say you're running a promotion offering a 7-day free trial and you want the experience to be consistent across platforms. To sync this with the mobile app:

1. Get the user's unique ID.
2. Use the API to [grant premium access](server-side-api-specs#grant-access-level) for 7 days.

After the 7 days, users who don’t subscribe will be downgraded to the free tier.

## Case 4: Syncing users' attributes and custom properties

If you have custom attributes for your users—such as the number of words learned in a language learning app—you can sync them as well.

1. Get the user's unique ID.
2. [Update the attribute](server-side-api-specs#update-profile) via API or SDK.

These custom attributes can be used to create segments and run A/B tests.

For more details, visit the [API Specs](server-side-api-specs).