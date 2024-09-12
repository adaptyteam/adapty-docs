---
title: "Profiles/CRM"
description: ""
metadataTitle: ""
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

Profiles is a CRM for your users. With Profiles, you can:

1. Find a user with any ID you have including email and phone number.
2. Explore the full payment path of a user including billing issues, grace periods, and other [events](events).
3. Analyze user's properties such as subscription state, total revenue/proceeds, last seen, and more.
4. Grant the user a subscription.


<Zoom>
  <img src={require('./img/profiles.png').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>





In a full table of subscribers, you can filter, sort, and find users. The state describes user state in terms of a subscription and can be:

| User state                 | Description                                                                  |
| :------------------------- | :--------------------------------------------------------------------------- |
| **Subscribed**             | The user has an active subscription                                          |
| **Active trial**           | The user has a subscription with an active trial period                      |
| **Auto renew off**         | The user turned off auto-renewal. Check [events](events)  for more info  |
| **Subscription cancelled** | The user cancelled a subscription. Check [events](events)  for more info |
| **Trial cancelled**        | The user cancelled a trial                                                   |
| **Never subscribed**       | The user has never subscribed, i.e. he's a freemium user                     |
| **Billing issue**          | The user can't be charged                                                    |
| **Grace period**           | A user entered a grace period                                                |

You can group users into Segment to create [Promo Campaigns](promo-campaigns), group analysis, and more.

## User properties


<Zoom>
  <img src={require('./img/ce8df4d-CleanShot_2023-06-26_at_20.32.232x.png').default}
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

- **Customer user ID**. Is a developer ID and can be any string
- **Adapty ID**. Internal ID of a user in Adapty
- **IDFA**
- **Country**. From IP address country of the user
- **OS**
- **Device**
- **Created at**. Profile creation date
- **Last seen**

For a better understanding of your user, we suggest sending at least your internal user ID or user email. This will help you to find a user.

After installing SDK, Adapty automatically collects user events from the payment queue and displays them in a user profile.

## Custom attributes

You can see custom attributes that were set either from SDK or manually assign them to the user using the Add attribute button in the Attributes section on the profile page.


<Zoom>
  <img src={require('./img/378c1fb-add_attribute.png').default}
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
  <img src={require('./img/b1d74fd-edit_paid_access_level.png').default}
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

Adapty creates an internal profile ID for every user. However, if you have your own authentication system, [set your own Customer User ID](identifying-users), a unique identifier for each user in your system. In this case. Adapty will add this ID to the user profile, which will give you several advantages:

1. All transactions and events will be tied to the same profile.
2. You can find users by their customer user ID in the [**Profiles**](profiles-crm) section and view their transactions and events.
3. You can use the customer user ID in the [server-side API](getting-started-with-server-side-api).
4. The customer user ID will be sent to all integrations.

If no customer user ID is passed to Adapty, Adapty will create a new additional internal profile ID in the following cases:

- When a user launches your app for the first time after installation and reinstallation.
- When a user logs out of your app.

This means that a user who installs, then uninstalls, and reinstalls your app may have several profile records in Adapty if no customer user ID is used. All transactions in a chain are tied to the profile that generated the first transaction — the "original" profile. This helps keep a complete transaction history — including trial periods, subscription purchases, renewals, and more, linked to the same profile. 

A new profile record that generates a subsequent transaction, called a "non-original" profile, may not have any events associated with it but will retain the granted access level. In some cases, you will also see "access_level_updated" events here.

Here is an example of a non-original profile. Notice the absence of events in the **User history** and the presence of an access level.


<Zoom>
  <img src={require('./img/98d0dad-non-original_profile.png').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>


