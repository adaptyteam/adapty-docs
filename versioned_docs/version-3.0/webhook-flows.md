---
title: "Webhook event flows"
description: "Discover detailed schemes of webhook event flows in Adapty. Learn how subscription events are generated and sent to webhook integrations, helping you track key moments in your customers’ journeys."
metadataTitle: "Understanding Webhook Event Flows in Adapty: Schemes and Scenarios"
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';



In Adapty, you'll receive various webhook events throughout a customer’s journey in your app. These subscription flows outline common scenarios to help you understand the events that Adapty generates as users subscribe, cancel, or reactivate subscriptions.

Most events are created and sent to all configured integrations if they’re enabled. However, the **Access level updated** event only triggers if a [webhook integration](webhook) is configured and this event is enabled. This event will appear in the [**Event Feed**](https://app.adapty.io/event-feed) and be sent to the webhook, but it won’t be shared with other integrations.

If a webhook integration isn’t configured or this event type isn’t enabled, the **Access level updated** event won’t be created and won’t appear in the [**Event Feed**](https://app.adapty.io/event-feed).

## Subscription Lifecycle



### Initial Purchase Flow

This flow happens when a customer buys a subscription for the first time without a trial. In this situation, the following events are created:

- **Subscription started**
- **Access level updated** to grant access to the user

When the subscription renewal date comes, the subscription is renewed. In this case, the **Subscription renewal** event is created. Situations when the payment is not successful or when the user cancels the renewal are described in [Billing Issue Outcome Flow](webhook-flows#billing-issue-outcome-flow) and [Subscription Cancellation Flow](webhook-flows#subscription-cancellation-flow) respectively.

<Zoom>
  <img src={require('./img_webhook_flows/Initial_Purchase_Flow.webp').default}
  style={{
    border: 'none', /* border width and color 
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

### Subscription Cancellation Flow

When a user cancels their subscription, a **Subscription renewal canceled** event is created, which means the subscription will stay active until the end of the period and the user will lose their access at the end of the subscription period. Once the subscription ends:

- the **Subscription expired (churned)** event is triggered, revoking access 
- The **Access level updated** event is created to remove the user’s access.

<Zoom>
  <img src={require('./img_webhook_flows/Subscription_Cancellation_Flow.webp').default}
  style={{
    border: 'none', /* border width and color 
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

If a refund is approved, an additional **Subscription refunded** event occurs at the moment of the approval which is usually does not coincide with any of other events.

<Zoom>
  <img src={require('./img_webhook_flows/Subscription_Cancellation_Flow_with_a_Refund.webp').default}
  style={{
    border: 'none', /* border width and color 
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

For Stripe, a subscription can be canceled immediately, skipping the remaining period. In this case, all events are created simultaneously:

- **Subscription renewal cancelled** 
- **Subscription expired (churned)**
- **Access Level updated** to remove the  the user’s access 

If a refund is approved, a **Subscription refunded** event is also triggered when it’s approved.

<Zoom>
  <img src={require('./img_webhook_flows/Subscription_Immediate_Cancellation_Flow.webp').default}
  style={{
    border: 'none', /* border width and color 
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

### Subscription Reactivation Flow

If a user cancels a subscription, it expires, and they later repurchase the same subscription, a **Subscription renewed** event will be created. Even if there’s a gap in access, Adapty treats this as a single transaction chain, linked by the **vendor_original_transaction_id**. So, the repurchase is considered a renewal.

The **Access level updated** events will be created twice: 

- at the subscription end to revoke the user's access
- at the subscription repurchase to grant the access.

<Zoom>
  <img src={require('./img_webhook_flows/Subscription_Rejoin_Flow.webp').default}
  style={{
    border: 'none', /* border width and color 
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

### Subscription Pause Flow (Android only)

This flow applies when a user pauses and later resumes a subscription on Android. Pausing a subscription is not an immediate action. Even if the user pauses it during an active subscription period, the subscription will remain active, and the user will retain access until the end of that period.

The subscription is officially paused at the end of the subscription period. At this point, the user loses access and remains without it until they choose to resume the subscription.

No events are triggered when the user pauses the subscription. However, the following events are created at the end of the subscription period:

- **Subscription paused (Android only)**
- **Access level updated** to revoke the user's access

When the user resumes the subscription, the following events are triggered:

- **Subscription renewed**
- **Access level updated** to restore the user's access.

These subscriptions will belong to the same transaction chain, linked with the same **vendor_original_transaction_id**.

<Zoom>
  <img src={require('./img_webhook_flows/Subscription_Paused_Flow.webp').default}
  style={{
    border: 'none', /* border width and color 
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

### Billing Issue Outcome Flow

If attempts to renew a subscription fail due to a billing issue, what happens next depends on whether a grace period is enabled. 

With a grace period, if the payment succeeds, the subscription renews. If it fails, the subscription expires, the subscription will end and the user will loose their access..

Therefore, at the moment of the billing issue, the following events are created in Adapty:

- **Billing issue detected**
- **Enterd grace period** (if the grace period is enabled)

If the payment succeeds later, the Subscription renewed event is created and the user does not loose their access.

If the payment never succeeds till the end of the grace period, the following events are created:

-  **Subscription expired (churned)** event with a `cancellation_reason` of `billing_error

- **Access level updated** to revoke the user's access.

<Zoom>
  <img src={require('./img_webhook_flows/Billing_Issue_Outcome_Flow_with_Grace_Period.webp').default}
  style={{
    border: 'none', /* border width and color 
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

Without a grace period, the **Subscription expired (churned)** event is created immediately with the same cancellation reason as well as the **Access level updated** to revoke the user's access.

<Zoom>
  <img src={require('./img_webhook_flows/Billing_Issue_Outcome_Flow_without_Grace_Period.webp').default}
  style={{
    border: 'none', /* border width and color 
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

## Trial Flows

If you use trials in your app, you’ll receive additional trial-related events.

### Trial with Successful Conversion Flow

The most standard flow is the trial with a successful conversion when a user starts a trial, provides a credit card, and at the moment of the trial expiration, the payment is successful and the trial is converted to a standard subscription. In this situation, the **Trial started** event is created at the moment when the user starts it and the **Trial converted** event is created after the payment and when the standard subscription starts.

In this flow, a user starts a trial with a payment method on file. A **Trial started** event is triggered when the trial begins.  If the payment succeeds at the end of the trial, it's followed by a **Trial converted** event after the successful payment, marking the start of a standard subscription.

<Zoom>
  <img src={require('./img_webhook_flows/Trial_Flow_with_Successful_Conversion.webp').default}
  style={{
    border: 'none', /* border width and color 
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

### Trial without Successful Conversion Flow

If a user cancels the trial before it converts to a subscription, a **Trial renewal cancelled** event is triggered at the time of cancellation. The user will have access until the end of the trial when the following events are created:

- **Trial expired**
- **Access level updated** to revoke the user's access.

<Zoom>
  <img src={require('./img_webhook_flows/Trial_Flow_without_Successful_Conversion.webp').default}
  style={{
    border: 'none', /* border width and color 
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

### Trial Billing Issue Outcome Flow

If a user doesn’t cancel their trial but a billing issue occurs at the conversion point, the flow varies depending on whether a grace period is enabled. 

**With a Grace Period:**
When the first payment fails, the following events are triggered:

- **Billing issue detected**
- **Entered grace period** since the grace periood is enabled

If the payment succeeds during the grace period, the trial converts to a subscription, triggering the **Trial converted** event.

If the payment never succeeds, the following events occur at the end of the grace period:

- **Trial expired** event with a `cancellation_reason` of `billing_error`
- **Access level updated** to revoke the user's access.

<Zoom>
  <img src={require('./img_webhook_flows/Billing_Issue_Outcome_Flow_with_Grace_Period_trial.webp').default}
  style={{
    border: 'none', /* border width and color 
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

**Without a Grace Period:**
If no grace period is enabled, the trial ends immediately. No grace period or subscription is started, and access is revoked. The following events are triggered:

- **Billing issue detected**
- **Trial expired** event with a `cancellation_reason` of `billing_error`
- **Access level updated** to revoke the user's access.

<Zoom>
  <img src={require('./img_webhook_flows/Billing_Issue_Outcome_Flow_Without_Grace_Period_trial.webp').default}
  style={{
    border: 'none', /* border width and color 
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

### Subscription Reactivation after Expired Trial Flow

If a trial expires (due to a billing issue or cancellation) and the user later buys a subscription, the following events are created:

-  **Access level updated** to grant access to the user
- **Trial converted**

Even with a gap between the trial and subscription, Adapty links the two using **vendor_original_transaction_id**. This conversion is treated as part of a continuous transaction chain, starting with a zero-price trial. That is why the **Trial converted** event is created rather than the **Subscription started**.

<Zoom>
  <img src={require('./img_webhook_flows/Subscription_Reactivation_Flow_after_Expired_Trial.webp').default}
  style={{
    border: 'none', /* border width and color 
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

## Product Changes

This section covers any adjustments made to active subscriptions, such as upgrades, downgrades or purchases of a product from another group.

## Immediate Product Change Flow

After a user changes a product, it can be changed in the system immediately before the subscription ends (mostly in case of an upgrade or replacement of a product). In this case, at the moment of the product change:

- the access level is changed  and 2 **Access level updated** events are created:
  1. to remove the access to the first product 
  2. to give access to the second product

- old subscription ends (the **Subscription expired (churned)** event is created for the first product)
- new subscription starts (the **Subscription started** event is created for the new product)
- if a refund is paid, the **Subscription refunded** event is also created, and the `cancellation_reason` will be `upgraded`.

<Zoom>
  <img src={require('./img_webhook_flows/Immediate_Product_Change_Flow_Upgrade.webp').default}
  style={{
    border: 'none', /* border width and color 
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

If a user downgrades the subscription, most probably the first subscription will last till the end of the paid period, and when the subscription ends it will be replaced with a new, lower-tier subscription. In this situation, all events will be created at the moment of the subscription's actual replacement:

- the access level is changed and 2 **Access level updated** events are created:
  1. to remove the access to the first product
  2. to give access to the second product

- old subscription ends (the **Subscription expired (churned)** event is created for the first product)
- new subscription starts (the **Subscription started** event is created for the new product)

<Zoom>
  <img src={require('./img_webhook_flows/Delayed_Product_Change_Downgrade.webp').default}
  style={{
    border: 'none', /* border width and color 
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

There is also a variant when a user changes the product at the moment of the subscription renewal. This variant is very similar to the previous one: all events will be created at the moment when the user changes the subscription and it is  changed in the system:

- the access level is changed and 2 **Access level updated** events are created:
  1. to remove the access to the first product
  2. to give access to the second product
- old subscription ends (the **Subscription expired (churned)** event is created for the first product)
- new subscription starts (the **Subscription started** event is created for the new product)

<Zoom>
  <img src={require('./img_webhook_flows/Product_Change_on_Renewal_Flow.webp').default}
  style={{
    border: 'none', /* border width and color 
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

## Sharing Purchases Across User Accounts Flows

When a [Customer User ID](identifying-users#setting-customer-user-id-on-configuration) attempts to restore or extend a subscription already tied to a different [Customer User ID](identifying-users#setting-customer-user-id-on-configuration), Adapty’s **Sharing paid access between user accounts** setting controls how access is managed. The flow will vary depending on the selected option.

###  Transfer Access to New User Flow

The recommended option is to transfer the access level to the new user. This preserves the original user’s transaction history for consistent analytics. So only 2 **Access level updated** events will be created:

1. to remove the first user's access
2. to give access to the second user

<Zoom>
  <img src={require('./img_webhook_flows/Transfer_Access_to_New_User_Flow.webp').default}
  style={{
    border: 'none', /* border width and color 
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

###  Shared Access Between Users Flow

This option allows multiple users to share the same access level, though it’s a bit risky since it may lead to multiple users accessing the same content. While the access level is shared, all transactions are logged under the original [Customer User ID](identifying-users#setting-customer-user-id-on-configuration) to maintain complete transaction history and analytics.

Therefore, only 1 event will be created: **Access level updated** to grant access to the second user.

<Zoom>
  <img src={require('./img_webhook_flows/Share_Access_Between_Users_Flow.webp').default}
  style={{
    border: 'none', /* border width and color 
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

###  Access Not Shared Between Users Flow

With this option, only the first user profile to receive the access level retains it permanently. This is ideal if purchases need to be tied to a single [Customer User ID](identifying-users#setting-customer-user-id-on-configuration). 

<Zoom>
  <img src={require('./img_webhook_flows/Share_Access_Between_Users_Disabled_Flow.webp').default}
  style={{
    border: 'none', /* border width and color 
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>