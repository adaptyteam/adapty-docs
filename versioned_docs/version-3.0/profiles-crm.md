---
title: "Profiles/CRM"
description: "Manage user profiles and CRM data in Adapty to enhance audience segmentation."
metadataTitle: "Managing Profiles & CRM | Adapty Docs"
keywords: ['profile', 'customer_user_id', 'customer user id', 'custom attribute']
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import Sharingaccesslevel from '@site/src/components/reusable/sharingaccesslevel.md';
import SubscriptionState from '@site/src/components/reusable/SubscriptionState.md';


Profiles is a CRM for your users. With Profiles, you can:

1. Find specific users by profile ID, customer user ID, email, or transaction ID.
2. Explore the full payment path of a user including billing issues, grace periods, and other [events](events).
3. Analyze user's properties such as subscription state, total revenue/proceeds, and more.
4. Grant the user a subscription.

<Zoom>
  <img src={require('./img/profiles.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

## Subscription state

In a full table of subscribers, you can filter, sort, and find users. The state describes the user state in terms of a subscription and can be:

<SubscriptionState />

## User attributes

<Zoom>
  <img src={require('./img/ce8df4d-CleanShot_2023-06-26_at_20.32.232x.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

You can send any properties that you want for the user.

By default, Adapty sets:

| Property         | Description                                                  |
| ---------------- | ------------------------------------------------------------ |
| Customer user ID | An identifier of your end user in your system.               |
| Adapty ID        | Internal Adapty identifier of your end user, called Profile ID. |
| IDFA             | The Identifier for Advertisers, assigned by Apple to a user's device. |
| Country          | Country of your end user.                                    |
| OS               | The operating system used by the end user.                   |
| Device           | The end-user-visible device model name.                      |
| Install date     | The date when the user was first recorded in Adapty: <ul><li>The date the user was created. </li><li>If the user installed your app before you integrated Adapty, it reflects the date of their first transaction.</li><li>If applicable, the date provided during a historical data import.</li></ul> |
| Created at       | The date the user was created.                               |

For a better understanding of your user, we suggest sending at least your internal user ID or user email. This will help you to find a user.

After installing SDK, Adapty automatically collects user events from the payment queue and displays them in a user profile.

## Custom attributes

You can see custom attributes that were set either from SDK or manually assign them to the user using the Add attribute button in the Attributes section on the profile page.

<Zoom>
  <img src={require('./img/378c1fb-add_attribute.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

## Grant a subscription

In a profile, you can find an active subscription. At any time you can prolong the user's subscription or grant lifetime access.

<Zoom>
  <img src={require('./img/b1d74fd-edit_paid_access_level.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

It's most useful for users without an active subscription so you can grant the individual user or a group of users premium features for some time. Please note that adjusting the subscription date for active subscriptions will not impact the ongoing payments.

:::note
**Expires at** must be a date in the future and can't be decreased ones set.
:::

## Profile record creation

Adapty creates an internal profile ID for every user to track their purchases, events, and subscription state. You can optionally [set a Customer User ID](identifying-users) to identify users in your own system.

**Without a Customer User ID**, a new profile is created each time:
- A user launches your app for the first time after installation
- A user reinstalls the app
- A user logs out of your app

**With a Customer User ID**, profile behavior depends on when you identify:

- **Identify during SDK activation**: Adapty uses the existing profile with that customer user ID (for returning users) or creates a new profile (for first-time users).
- **Identify after SDK activation**: Adapty creates an anonymous profile on activation. When you later identify the user, it links that customer user ID to the anonymous profile (for first-time users) or switches to the existing profile with that ID (for returning users).

Using a customer user ID gives you several advantages:

1. You can track a user across app reinstalls and multiple devices, making it easier to maintain a complete user history.
2. You can find users by their customer user ID in the [**Profiles**](profiles-crm) section and view their transactions and events.
3. You can use the customer user ID in the [server-side API](getting-started-with-server-side-api).
4. The customer user ID will be sent to all integrations.

### Parent and inheritor profiles

When multiple profiles are connected to the same subscription (through the same Apple/Google ID), Adapty tracks them using a parent-inheritor relationship. This happens when a user reinstalls the app without identifying, or when different identified users restore purchases on the same device. 

The **parent profile** is the one that made the purchase—not necessarily the first profile created. For example, if you install the app, don't buy anything, then reinstall and purchase a subscription, your second profile becomes the parent (it made the purchase), while your first profile becomes the inheritor (it gains access through sharing).

**How events are distributed:**

- **Transactional events** (purchases, renewals, cancellations, billing issues, grace periods, refunds): Only appear on the **parent profile** that made the purchase. All subscription renewals and updates continue appearing on this profile.
- **access_level_updated events**: Appear on **both parent and inheritor profiles** whenever the access level state changes, ensuring all connected profiles stay updated about their current access status.

This means the parent profile (the one that purchased) shows the complete transaction history, while inheritor profiles show only their access level updates along with a link to the parent profile in the **Access level** section.

<Zoom>
  <img src={require('./img/98d0dad-non-original_profile.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

The [**Sharing paid access between user accounts**](profiles-crm#sharing-access-levels-between-profiles) setting controls which profiles receive access level updates:

- **Enabled (default)**: Both parent and inheritor profiles receive access_level_updated events as long as access remains shared
- **Transfer access to new user**: When access is transferred, the new owner becomes the active profile and receives access_level_updated events, while the previous owner stops receiving them
- **Disabled**: Only the parent profile maintains the access level. Inheritor profiles don't receive access unless explicitly granted

## Event timestamps with future dates

Why do events show future timestamps in profiles and integrations? Event timestamps may appear with future dates in profiles and integrations because Apple sends renewal events in advance.

- **Why it happens**: Apple does this to ensure subscriptions renew automatically before expiring, preventing user service interruptions. For more details, check Apple’s Developer Forum: [Server Notifications for Subscriptions](Server Notifications for Subscriptions).
- **Event types affected**: Typically, this applies to subscription renewals and trial-to-paid conversions. These events may have future timestamps because Apple notifies systems about them ahead of time.
  All other events—like additional in-app purchases or subscription plan changes—are recorded with their actual timestamps since they cannot be predicted in advance.
- **Impact on Analytics and Event Feed**: These events will only appear in **Analytics** and the **Event Feed** once their timestamps have passed. Events with future timestamps are not shown in either section.
- **Impact on Integrations**: Adapty sends events to integrations as soon as they are received. If an event has a future timestamp, it will be shared with your integration exactly as received.

## Sharing paid access between user accounts

<Sharingaccesslevel />

### Access sharing history

When access levels are shared or transferred, you might want to know who granted access to the current user or who the current user shared their access with. To find out, just open the user’s **Profile** and click the link to view the connected profile.

<Zoom>
  <img src={require('./img/profile-access-level-origin.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>
