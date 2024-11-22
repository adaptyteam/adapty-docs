---
title: "Webhook integration"
description: "Learn how to use webhooks to get instant notifications about subscription events like new trials and billing issues, enabling seamless automation and enhanced backend management for your app."
metadataTitle: "Understanding Webhooks: Real-Time Notifications for Subscription Events"
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

A webhook is a convenient and fast way to get notifications about [events](events). For example, if a new trial is started, a subscription is renewed, or a billing issue happens. The webhook mechanism works through a callback function. You set up a URL (called Endpoint URL) to which an HTTP request is sent when an event occurs. 

<Zoom>
  <img src={require('./img/e5dce30-image_3.webp').default}
  style={{
    border: 'none', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

Unlike API requests, which require repeatedly requesting information from the server, a webhook is configured only once. When the target event occurs in your app, it immediately sends data via the HTTP protocol.

With webhooks integrated, you can:

- Keep track of subscriptions and purchases in your backend system.
- Automate processes and workflows based on subscription lifecycles.
- Engage with subscribers by reminding them of app benefits, addressing unsubscribe decisions, and handling billing issues.
- Conduct a detailed analysis of the user behavior.

**Integration characteristics**

| Integration characteristic | Description                                                 |
| :------------------------- | :---------------------------------------------------------- |
| Schedule                   | Real-time updates                                           |
| Data direction             | One-way data transmission: from Adapty to your server       |
| Adapty integration flow    | Events are sent by the Adapty server once they are received |

## Events than can be sent to a webhook

| Event Name                             | Description                                                  |
| :------------------------------------- | :----------------------------------------------------------- |
| **subscription_started**               | A user has activated a subscription without a trial period i.e. he was billed instantly. |
| **subscription_renewed**               | A subscription was renewed and the user was charged. For both trial and non-trial subscriptions, this event is sent starting from the second billing. |
| **subscription_expired**               | A user has canceled a subscription and it is completely finished. |
| **trial_started**                      | A user has activated a trial subscription.                   |
| **trial_converted**                    | A trial period has ended and the user was billed, i.e. first purchase was made. |
| **trial_expired**                      | A trial has expired without converting to a subscription.    |
| **non_subscription_purchase**          | Any non-subscription purchase e.g. lifetime access or consumable product such as coins. |
| **billing_issue_detected**             | An attempt to charge the user was made, but a billing issue happened. Usually, it means the user doesn't have enough card balance. |
| **entered_grace_period**               | The payment was not successful and the user entered into a grace period. The user still has access to the premium features of your app until the grace period is finished. |
| **trial_renewal_cancelled**            | A user turned off subscription auto-renewal during the trial. A user still has access to the premium features of your app until the end of the trial period. |
| **trial_renewal_reactivated**          | A user turned on subscription auto-renewal during the trial period. |
| **subscription_renewal_cancelled**     | A user turned off subscription auto-renewal. A user still has access to the premium features of your app until the end of the subscription period. |
| **subscription_renewal_reactivated**   | A user turned on subscription auto-renewal.                  |
| **subscription_refunded**              | A subscription was refunded \(e.g. by Apple support\).       |
| **non_subscription_purchase_refunded** | Non-subscription purchase was refunded.                      |
| **subscription_paused**                | User activated [subscription pause](https://developer.android.com/google/play/billing/subs#pause) (Android only). |
| **subscription_deferred**              | A user's subscription has been deferred, ie they were granted free usage time (Android only). Usually, it happens in response to an [API](https://developers.google.com/android-publisher/api-ref/rest/v3/purchases.subscriptions/defer) call from your servers. |
| **access_level_updated**               | User's access level updated (Webhook only).                  |

:::note
**SUBSCRIPTION\_EXPIRED**(previously **SUBSCRIPTION\_CANCELED**) event means that the subscription completely finished and the user has no longer access to the premium features of the app. When the user unsubscribes, **AUTO\_RENEW\_OFF** or **AUTO\_RENEW\_OFF\_SUBSCRIPTION** is sent. The same logic applied to **TRIAL\_CANCELLED.**
:::

The events above fully cover the users' state in terms of purchases. Let's look at some examples.

## Webhook integration configuration

Adapty [webhook integration](webhook) consists of the following steps:

1. You set up your endpoint:
   1.  To [have the **Content-Type** header as `application/json`](set-up-webhook-integration#set-up-your-server-to-process-adapty-events). 
   2.  To [receive the first Adapty verification request](set-up-webhook-integration#adaptys-verification-request) - the initial request to verify the connection is set up correctlyю
   3.  And after that to [response](set-up-webhook-integration#your-servers-verification-response) to it for the Adapty server to learn the connection is successfully established.
   4.  To [receive the standard events and process them](set-up-webhook-integration#adapty-standard-event-request).

2. [You configure the integration](set-up-webhook-integration#configure-webhook-integration-in-the-adapty-dashboard) in the Adapty Dashboard. Within this step, you can optionally [map Adapty events with your event names](set-up-webhook-integration#choose-events-to-send-and-map-event-names). We recommend to first use the Sandbox environment to test how your server processes Adapty events and after you make sure it does it as expected, switch to the production environment 
3. Adapty sends a verification request to your server.
4. Your server sends a verification response to Adapty.
5. After the Adapty server receives the verification response in the expected format, it's ready to send standard event requests.
6. [Test your webhook integration](test-webhook).

## Step 1. Set up your server to process Adapty requests

Adapty will send to your webhook endpoint 2 types of requests:

1. [**Verification request**](set-up-webhook-integration#adaptys-verification-request): the initial request to verify the connection is set up correctly. This request will not contain any event and will be sent the moment you click the **Save** button in the Webhook integration of the Adapty Dashboard. To confirm your endpoint successfully received the verification request, your endpoint should answer with a [verification response](set-up-webhook-integration#your-servers-verification-response).
2. [**Usual event**](set-up-webhook-integration#webhook-event-structure): A standard request Adapty server sends every time an event is created in it. You server does not need to  reply with any specific responce. The only thing the Adapty server needs is to receive a standard 200-code HTTP responce if it successfully received the message.

### Step 1.1. Set up receiving Adapty's verification request by your server

After you enable webhook integration in the Adapty Dashboard, Adapty will automatically send a `isMount` POST verification request to your endpoint.

```json title="Json"
{
    adapty_check: {{check_string}}
}
```
Set up your endpoint to have the **Content-Type header** as `application/json`, i.e. your server's endpoint should expect the incoming webhook request to have its payload formatted as JSON.

### Step1.2. Set up your server's verification response

Your server must reply with a 200 or 201 HTTP status code and send the response outlined below with the identical `check_string`. 

```json title="Json"
{
    adapty_check_response: {{check_string}}
}
```

Once Adapty receives the verification response in the correct format, your Adapty webhook integration is fully configured.

From then on, Adapty will send the selected events to your specified URL as they happen. Ensure your server promptly confirms each Adapty event with a response status code in the 200-404 range, the `check_string` is not required anymore.

## Step 2. Set up processing of Adapty standard events

For webhook event types and fields, see the [Webhook event types and fields page](event-types-and-fields).

## Step 3. Configure webhook integration in the Adapty Dashboard

Within Adapty, you can configure separate flows for production events and test events received from the Apple or Stripe sandbox environment or Google test account. 

For production events, use the **Production endpoint URL** field specifying the URL to which the callbacks will be sent. Additionally, configure the **Authorization header value for production endpoint** field - the header for your server to authenticate Adapty events. Note that we'll use the value specified in the **Authorization header value for production endpoint** field as the `Authorization` header exactly as provided, without any changes or additions.

For test events, employ the  **Sandbox endpoint URL** and **Authorization header value for sandbox endpoint** fields accordingly.

To set up the webhook integration:

1. Open [**Integrations** -> **Webhook**](https://app.adapty.io/integrations/customwebhook) in your Adapty Dashboard.


<Zoom>
  <img src={require('./img/a3e49a8-webhook_integration.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>


2. Turn on the toggle to initiate the integration.
3. Fill out the integration fields:

| Field                                                  | Description                                                  |
| ------------------------------------------------------ | ------------------------------------------------------------ |
| **Production endpoint URL**                            | URL that is used by Adapty to send HTTP POST requests to this URL when events occur. |
| **Authorization header value for production endpoint** | <p>The header that your server will use to authenticate requests from Adapty in production. Note that we'll use the value specified in this field as the `Authorization` header exactly as provided, without any changes or additions.</p><p></p><p>Although not mandatory, it's strongly recommended for enhanced security.</p> |

   Additionally, for your testing needs in the staging environment, two other fields are available:

| Testing field                                       | Description                                                  |
| --------------------------------------------------- | ------------------------------------------------------------ |
| **Sandbox endpoint URL**                            | Adapty will use this URL to send HTTP POST requests when events occur in the staging environment. |
| **Authorization header value for sandbox endpoint** | <p>The header that your server will use to authenticate requests from Adapty during testing in the sandbox environment. Note that we'll use the value specified in this field as the `Authorization` header exactly as provided, without any changes or additions.</p><p></p><p>Although not mandatory, it's strongly recommended for enhanced security.</p> |

4. Choose the events you want to receive and [map their names](set-up-webhook-integration#choose-events-to-send-and-map-event-names).
5. Additional fields and options are not obligatory; use them as needed. 
6. Remember to click the **Save** button to confirm the changes.

Please note that the moment you click the **Save** button, Adapty will send a verification request and will wait for your server verification response.

## Step 4. (optional) Choose events to send and map event names

Choose the events you want to receive in your server by enabling the toggle next to it. If your event IDs differ from those used in Adapty and keep the IDs in your system as is and replace the default Adapty event IDs with yours in the **Events names** section of the [**Integrations** ->  **Webhooks**](https://app.adapty.io/integrations/customwebhook) page.

<Zoom>
  <img src={require('./img/86942b8-event_names_renaming.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

The event ID can be any string, simply make sure the event ID in your webhook processing server coinside with the one you eneterd in the Adapty Dashboard. You cannot leave the event ID empty for enabled events. If you accidentally removed Adapty event ID and need to restore it, you can always copy it from the **Webhook events** table below.

### Webhook events

For webhook event types, see the [Webhook event types and fields page](event-types-and-fields).

## Step 5. Handle webhook events

Webhooks are typically delivered within 5 to 60 seconds of the event occurring. Cancellation events, however, may take up to 2 hours to be delivered after a user cancels their subscription.

If your server's response status code is outside the 200-404 range, Adapty will retry sending the event up to 9 times over 24 hours with exponential backoff. We suggest you set up your webhook to do only basic validation of the event body from Adapty before responding. If your server can't process the event and you don't want Adapty to retry, use a status code within the 200-404 range. Also, handle any time-consuming tasks asynchronously and respond to Adapty quickly. If Adapty doesn't receive a response within 10 seconds, it will consider the attempt a failure and will retry
