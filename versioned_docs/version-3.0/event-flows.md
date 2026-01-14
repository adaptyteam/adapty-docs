---
title: "Event flows"
description: "Discover detailed schemes of subscription event flows in Adapty. Learn how subscription events are generated and sent to integrations, helping you track key moments in your customers' journeys."
metadataTitle: "Understanding Event Flows in Adapty: Schemes and Scenarios"
keywords: ['refund', 'trial', 'restore', 'events', 'event']
rank: 70
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import InlineTooltip from '@site/src/components/InlineTooltip';

In Adapty, you'll receive various subscription events throughout a customer’s journey in your app. These subscription flows outline common scenarios to help you understand the events that Adapty generates as users subscribe, cancel, or reactivate subscriptions.

Keep in mind that Apple processes subscription payments several hours before the actual start/ renewal time. In the flows below, we show both the subscription start/ renewal and the charge happening at the same time to keep the diagrams clear.

Also, events related to the same action occur simultaneously and may appear in your **Event Feed** in any order, which might differ from the sequence shown in our diagrams.

<!--- :::warning

Most events are created and sent to all configured integrations if they’re enabled. However, the **Access level updated** event only triggers if a [webhook integration](webhook) is configured and this event is enabled. This event will appear in the [**Event Feed**](https://app.adapty.io/event-feed) and will also be sent to the webhook, but it won’t be shared with other integrations.

If a webhook integration isn’t configured or this event type isn’t enabled, the **Access level updated** event won’t be created and won’t appear in the [**Event Feed**](https://app.adapty.io/event-feed).

::: --->

## Subscription Lifecycle

### Initial Purchase Flow

This flow happens when a customer buys a subscription for the first time without a trial. In this situation, the following events are created:

- **Subscription started**
- **Access level updated** to grant access to the user

When the subscription renewal date comes, the subscription is renewed. In this case, the following events are created:

- **Subscription renewal** to start a new period of the subscription
- **Access level updated** to update the subscription expiration date, extending access for another period

Situations when the payment is not successful or when the user cancels the renewal are described in [Billing Issue Outcome Flow](event-flows#billing-issue-outcome-flow) and [Subscription Cancellation Flow](event-flows#subscription-cancellation-flow) ,respectively.

<Zoom>
  <img src={require('./img_webhook_flows/Initial_Purchase_Flow.webp').default}
  style={{
    border: 'none', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

### Subscription Cancellation Flow

When a user cancels their subscription, the following events are created:

- **Subscription renewal canceled** to indicate that the subscription remains active until the end of the current period, after which the user will lose access
- The **Access level updated** event is created to disable auto-renewal for the access

Once the subscription ends, the **Subscription expired (churned)** event is triggered to mark the end of the subscription.

<Zoom>
  <img src={require('./img_webhook_flows/Subscription_Cancellation_Flow.webp').default}
  style={{
    border: 'none', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

If a refund is approved, the following event replaces **Subscription expired (churned)**:

- **Subscription refunded** to end the subscription and provide details about the refund

<Zoom>
  <img src={require('./img_webhook_flows/Subscription_Cancellation_Flow_with_a_Refund.webp').default}
  style={{
    border: 'none', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

For Stripe, a subscription can be canceled immediately, skipping the remaining period. In this case, all events are created simultaneously:

- **Subscription renewal cancelled**
- **Subscription expired (churned)**
- **Access Level updated** to remove the user’s access

If a refund is approved, a **Subscription refunded** event is also triggered when it’s approved.

<Zoom>
  <img src={require('./img_webhook_flows/Subscription_Immediate_Cancellation_Flow.webp').default}
  style={{
    border: 'none', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

### Subscription Reactivation Flow

If a user cancels a subscription, it expires, and they later repurchase the same subscription, a **Subscription renewed** event will be created. Even if there’s a gap in access, Adapty treats this as a single transaction chain, linked by the `vendor_original_transaction_id`. So, the repurchase is considered a renewal.

The **Access level updated** events will be created twice:

- at the subscription end to revoke the user's access
- at the subscription repurchase to grant access

<Zoom>
  <img src={require('./img_webhook_flows/Subscription_Rejoin_Flow.webp').default}
  style={{
    border: 'none', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

### Subscription Pause Flow (Android only)

This flow applies when a user pauses and later resumes a subscription on Android.

Pausing a subscription is not an immediate action. Even if the user pauses it during an active subscription period, the subscription will remain active, and the user will retain access until the end of that period.

1. When the user pauses the subscription, this action triggers the **Subscription paused (Android only)** event.
2. At the end of the subscription period Adapty triggers the **Access level updated** event to revoke the user's access.
3. When the user resumes the subscription, the following events are triggered:

  - **Subscription renewed**
  - **Access level updated** to restore the user's access

These subscriptions will belong to the same transaction chain, linked with the same **vendor_original_transaction_id**.

<Zoom>
  <img src={require('./img_webhook_flows/Subscription_Paused_Flow.webp').default}
  style={{
    border: 'none', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

## Trial Flows

If you use trials in your app, you’ll receive additional trial-related events.

### Trial with Successful Conversion Flow

The most common flow occurs when a user starts a trial, provides a credit card, and successfully converts to a standard subscription at the end of the trial period. In this situation, the following events are created at the moment of teh trial start:

- **Trial started** to mark the trial start
- **Access level updated** to grant access

The **Trial converted** event is created when the standard subscription starts.

<Zoom>
  <img src={require('./img_webhook_flows/Trial_Flow_with_Successful_Conversion.webp').default}
  style={{
    border: 'none', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

### Trial without Successful Conversion Flow

If a user cancels the trial before it converts to a subscription, the following events are created at the time of cancellation:

- **Trial renewal cancelled** to disable automatic conversion of the trial to a subscription
- **Access level updated** to disable access renewal

The user will have access until the end of the trial when the **Trial expired** event is created to mark the trial's end.

<Zoom>
  <img src={require('./img_webhook_flows/Trial_Flow_without_Successful_Conversion.webp').default}
  style={{
    border: 'none', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

### Subscription Reactivation after Expired Trial Flow

If a trial expires (due to a billing issue or cancellation) and the user later buys a subscription, the following events are created:

- **Access level updated** to grant access to the user
- **Trial converted**

Even with a gap between the trial and subscription, Adapty links the two using `vendor_original_transaction_id`. This conversion is treated as part of a continuous transaction chain, starting with a zero-price trial. That is why the **Trial converted** event is created rather than the **Subscription started**.

<Zoom>
  <img src={require('./img_webhook_flows/Subscription_Reactivation_Flow_after_Expired_Trial.webp').default}
  style={{
    border: 'none', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

## Product Changes

This section covers any adjustments made to active subscriptions, such as upgrades, downgrades or purchases of a product from another group.

### Immediate Product Change Flow

After a user changes a product, it can be changed in the system immediately before the subscription ends (mostly in case of an upgrade or replacement of a product). In this case, at the moment of the product change:

- The access level is changed, and two **Access level updated** events are created:
  1. to remove the access to the first product.
  2. to give access to the second product.
- The old subscription ends, and a refund is paid (the **Subscription refunded** event is created with the `cancellation_reason` = `upgraded`). Please note that no **Subscription expired (churned)** event is created; the **Subscription refunded** event replaces it.
- The new subscription starts (the **Subscription started** event is created for the new product).

<Zoom>
  <img src={require('./img_webhook_flows/Immediate_Product_Change_Flow_Upgrade.webp').default}
  style={{
    border: 'none', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

If a user downgrades the subscription, the first subscription will last till the end of the paid period, and when the subscription ends, it will be replaced with a new, lower-tier subscription. In this situation, only the **Access level updated** event to disable access autorenewal will be created at once. All other events will be created at the moment of the subscription's actual replacement:

- Another **Access level updated** event is created to give access to the second product.
- The **Subscription expired (churned)** event is created to end the subscription for the first product.
- The **Subscription started** event is created to start a new subscription for the new product.

<Zoom>
  <img src={require('./img_webhook_flows/Delayed_Product_Change_Downgrade.webp').default}
  style={{
    border: 'none', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

### Delayed Product Change Flow

There is also a variant when a user changes the product at the moment of the subscription renewal. This variant is very similar to the previous one: one **Access level updated** event will be created at once to disable access autorenewal for the old product. All other events will be created at the moment when the user changes the subscription and it is  changed in the system:

- Another **Access level updated** event is created to give access to the second product.
- The **Subscription expired (churned)** event is created to end the subscription for the first product.
- The **Subscription started** event is created to start a new subscription for the new product.

<Zoom>
  <img src={require('./img_webhook_flows/Product_Change_on_Renewal_Flow.webp').default}
  style={{
    border: 'none', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

## Billing Issue Outcome Flow

If attempts to convert a trial or renew a subscription fail due to a billing issue, what happens next depends on whether a grace period is enabled.

With a grace period, if the payment succeeds, the trial converts or the subscription renews. If it fails, the app store will continue to attemp to charge the user for the subscription and if still fails, the app store will end the trial or subscription itself.

Therefore, at the moment of the billing issue, the following events are created in Adapty:

- **Billing issue detected**
- **Entered grace period** (if the grace period is enabled)
- **Access level updated** to provide the access till the end of the grace period

If the payment succeeds later, Adapty records a **Trial converted** or **Subscription renewed** event, and the user does not lose access.

If the payment ultimately fails and the app store cancels the subscription, Adapty generates these events:

- **Trial expired** or **Subscription expired (churned)** with `cancellation_reason: billing_error`
- **Access level updated** to revoke the user's access

<Zoom>
  <img src={require('./img_webhook_flows/Billing_Issue_Outcome_Flow_with_Grace_Period.webp').default}
  style={{
    border: 'none', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

Without a grace period, the Billing Retry Period (the period when the app store continues to attempt to charge the user) starts immediately.

If the payment never succeeds till the end of the grace period, the flow is the same: the same events are created when the app store ends the subscription automatically:

- **Trial expired** or **Subscription expired (churned)** event with a `cancellation_reason` of `billing_error`

- **Access level updated** to revoke the user's access

<Zoom>
  <img src={require('./img_webhook_flows/Billing_Issue_Outcome_Flow_without_Grace_Period.webp').default}
  style={{
    border: 'none', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

## Sharing Purchases Across User Accounts Flows

When a <InlineTooltip tooltip="Customer User ID">[iOS](identifying-users#setting-customer-user-id-on-configuration), [Android](android-identifying-users#setting-customer-user-id-on-configuration), [React Native](react-native-identifying-users#setting-customer-user-id-on-configuration), [Flutter](flutter-identifying-users#setting-customer-user-id-on-configuration), and [Unity](unity-identifying-users#setting-customer-user-id-on-configuration)</InlineTooltip> attempts to restore or extend a subscription already tied to a different <InlineTooltip tooltip="Customer User ID">[iOS](identifying-users#setting-customer-user-id-on-configuration), [Android](android-identifying-users#setting-customer-user-id-on-configuration), [React Native](react-native-identifying-users#setting-customer-user-id-on-configuration), [Flutter](flutter-identifying-users#setting-customer-user-id-on-configuration), and [Unity](unity-identifying-users#setting-customer-user-id-on-configuration)</InlineTooltip>, Adapty's **Sharing paid access between user accounts** setting controls how access is managed. The flow will vary depending on the selected option.

### Transfer Access to New User Flow

The recommended option is to transfer the access level to the new user. This preserves the original user’s transaction history for consistent analytics. Only 2 **Access level updated** events will be created:

1. to remove the first user's access
2. to give access to the second user

<Zoom>
  <img src={require('./img_webhook_flows/Transfer_Access_to_New_User_Flow.webp').default}
  style={{
    border: 'none', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

Here’s a breakdown of the fields related to access level assignment and transferring in the events generated in this scenario:

- **User A: Access level updated (sent when User A purchases a subscription in the app)**

  ```json showLineNumbers
  {
    "profile_id": "00000000-0000-0000-0000-000000000000",
    "customer_user_id": UserA,
    "event_properties": {
      "profile_has_access_level": true,
    },
    "profiles_sharing_access_level": null
  }
  ```

- **User A: Access level updated (sent when the app is reinstalled and User B logs in, revoking User A's access)**

  ```json showLineNumbers
  {
    "profile_id": "00000000-0000-0000-0000-000000000000",
    "customer_user_id": UserA,
    "event_properties": {
      "profile_has_access_level": false,
    },
    "profiles_sharing_access_level": null
  }
  ```

- **User B: Access level updated (sent when User B logs in and access is granted)**

  ```json showLineNumbers
  {
    "profile_id": "00000000-0000-0000-0000-000000000001",
    "customer_user_id": UserB,
    "event_properties": {
      "profile_has_access_level": true,
    },
    "profiles_sharing_access_level": null
  }
  ```

### Shared Access Between Users Flow

This option allows multiple users to share the same access level if their device is signed in to the same Apple/Google ID. This is useful when a user reinstalls the app and logs in with a different email — they'll still have access to their previous purchase. With this option, multiple identified users can share the same access level. While the access level is shared, all transactions are logged under the original <InlineTooltip tooltip="Customer User ID">[iOS](identifying-users#setting-customer-user-id-on-configuration), [Android](android-identifying-users#setting-customer-user-id-on-configuration), [React Native](react-native-identifying-users#setting-customer-user-id-on-configuration), [Flutter](flutter-identifying-users#setting-customer-user-id-on-configuration), and [Unity](unity-identifying-users#setting-customer-user-id-on-configuration)</InlineTooltip> to maintain complete transaction history and analytics.

Therefore, only 1 event will be created: **Access level updated** to grant access to the second user.

<Zoom>
  <img src={require('./img_webhook_flows/Share_Access_Between_Users_Flow.webp').default}
  style={{
    border: 'none', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

Here’s a breakdown of the fields related to access level assignment and sharing in the events generated in this scenario:

**User B: Access level updated (sent when User B logs in and access is granted)**

  ```json showLineNumbers
  {
    "profile_id": "00000000-0000-0000-0000-000000000000",
    "customer_user_id": UserA,
    "event_properties": {
      "profile_has_access_level": true,
    },
    "profiles_sharing_access_level": [
      {
        "profile_id": "00000000-0000-0000-0000-000000000001,
        "customer_user_id": UserB
      }
    ]
  }
  ```

### Access Not Shared Between Users Flow

With this option, only the first user profile to receive the access level retains it permanently. This is ideal if purchases need to be tied to a single <InlineTooltip tooltip="Customer User ID">[iOS](identifying-users#setting-customer-user-id-on-configuration), [Android](android-identifying-users#setting-customer-user-id-on-configuration), [React Native](react-native-identifying-users#setting-customer-user-id-on-configuration), [Flutter](flutter-identifying-users#setting-customer-user-id-on-configuration), and [Unity](unity-identifying-users#setting-customer-user-id-on-configuration)</InlineTooltip>.

<Zoom>
  <img src={require('./img_webhook_flows/Share_Access_Between_Users_Disabled_Flow.webp').default}
  style={{
    border: 'none', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>
