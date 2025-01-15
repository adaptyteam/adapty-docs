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
5. Record a transaction from your web app and link it to the used paywall.

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


				HTML


​					
​				
​				
​						
​				
​			
		 ​

:::note

To track subscription events, use [Webhook](webhook) integration in Adapty or integrate directly with your existing service.

:::

## Case 1: Syncing subscribers between web and mobile

1. If you use web payment providers like Stripe, ChargeBee, or others, you can sync your subscribers easily. Here’s how:
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
2. [Set up a custom store for your products in the Adapty Dashboard](initial-custom).
3. Sync the transaction to Adapty using the [Set transaction](ss-set-transaction) API request.

## Case 3: Grant an access level

Let’s say you're running a promotion offering a 7-day free trial and you want the experience to be consistent across platforms. To sync this with the mobile app:

1. [Assign a unique ID to each user](identifying-users).
2. Use the API to [grant premium access](ss-grant-access-level) for 7 days.

After the 7 days, users who don’t subscribe will be downgraded to the free tier.

## Case 4: Syncing users' properties and custom attributes 

If you have custom attributes for your users—such as the number of words learned in a language learning app—you can sync them as well.

1. [Assign a unique ID to each user](identifying-users).
2. [Update the attribute](ss-update-profile) via API or SDK.

These custom attributes can be used to create segments and run A/B tests.

## Case 5: Record a transaction from your web app and link it to the used paywall

Let's say you sell products in your web app. You need to display a paywall to your users, let them purchase a product, and then add the transaction details to Adapty. It’s essential to link these transactions to the specific paywalls through which the user made the purchase so that your analytics reflect accurate data. This can be easily accomplished using the Adapty API

#### Prerequisites

1. [Create the products](create-product) you’ll use in the paywall within the Adapty Dashboard.
2. [Create the paywall](create-paywall) in the Adapty Dashboard. [Use remote config](customize-paywall-with-remote-config) to design your web paywall.
3. [Set up a placement](create-placement) and link the paywall to it in the Adapty Dashboard.

#### Steps with Adapty API

1. **Fetch and display the paywall:** When the user reaches the placement in your web app where the paywall should be shown, use the placement ID to retrieve the paywall via the Adapty API. Display the paywall in your web app.
2. **Record the paywall view:** Log the paywall view with Adapty to ensure your analytics accurately reflect the event.
3. **Record the purchase:** If the user completes a purchase, send the transaction details to Adapty using the Adapty API. Include the **variation ID** in this request to link the transaction to the specific paywall displayed. For guidance, check out our page on [associating paywalls with transactions in mobile apps](associate-paywalls-to-transactions)—the same approach applies to web apps.
4. **Add attribution data (if applicable):** If you have any attribution data (e.g., campaign or ad details), merge it into the user profile to enrich the analytics and improve insights.

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
  - [Add attribution to profile](ss-add-attribution)
  - [Get paywall](ss-get-paywall)
  - [Record paywall view](ss-record-paywall-view)
  - [Add integration identifiers](ss-add-integration)
