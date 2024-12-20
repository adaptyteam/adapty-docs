---
title: "Webhook integration"
description: "Learn how to use webhooks to get instant notifications about subscription events like new trials and billing issues, enabling seamless automation and enhanced backend management for your app."
metadataTitle: "Understanding Webhooks: Real-Time Notifications for Subscription Events"
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import WebhookEvents from '@site/src/components/reusable/WebhookEvents.md';


A webhook is a convenient and fast way to get notifications about [events](webhook-event-types-and-fields#webhook-event-types). For example, if a new trial is started, a subscription is renewed, or a billing issue occurs. The webhook mechanism works through a callback function. You set up a URL (called Endpoint URL) to which an HTTP request is sent when an event occurs. 

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

## Events that can be sent to a webhook

You can send all event types to your webhook or choose only some of them. You can consult our [Event flows](event-flows) to decide which events are required or not. You can disable the event types you do not need when you [set up your Webhook integration](webhook#step-4-optional-choose-events-to-send-and-map-event-names). There you can also replace the Adapty default event IDs with your own if required.

## Webhook integration configuration

Adapty [webhook integration](webhook) consists of the following steps:

1. You set up your endpoint:
   1.  To [have the **Content-Type** header as `application/json`](/webhook#step-1-set-up-your-server-to-process-adapty-requests). 
   2.  To [receive the first Adapty verification request](webhook#step-11-set-up-receiving-adaptys-verification-request-by-your-server) - the initial request to verify the connection is set up correctly.
   3.  And after that to [response](webhook#step12-set-up-your-servers-verification-response) to it for the Adapty server to learn the connection is successfully established.
   4.  To [receive the standard events and process them](webhook#step-2-set-up-processing-of-adapty-standard-events).

2. [You configure the integration](webhook#step-3-configure-webhook-integration-in-the-adapty-dashboard) in the Adapty Dashboard. Within this step, you can optionally [map Adapty events with your event names](webhook#step-4-optional-choose-events-to-send-and-map-event-names). We recommend to first use the Sandbox environment to test how your server processes Adapty events and after you make sure it does it as expected, switch to the production environment.

3. Adapty sends a verification request to your server.

4. Your server sends a verification response to Adapty.

5. After the Adapty server receives the verification response in the expected format, it's ready to send standard event requests.

After that, we recommend [testing your webhook integration](test-webhook).

## Step 1. Set up your server to process Adapty requests

Adapty will send to your webhook endpoint 2 types of requests:

1. [**Verification request**](webhook#step-11-set-up-receiving-adaptys-verification-request-by-your-server): the initial request to verify the connection is set up correctly. This request will not contain any event and will be sent the moment you click the **Save** button in the Webhook integration of the Adapty Dashboard. To confirm your endpoint successfully received the verification request, your endpoint should answer with the [verification response](webhook#step12-set-up-your-servers-verification-response).
2. [**Usual event**](webhook#step-2-set-up-processing-of-adapty-standard-events): A standard request Adapty server sends every time an event is created in it. Your server does not need to reply with any specific response. The only thing the Adapty server needs is to receive a standard 200-code HTTP response if it successfully receives the message.

### Step 1.1. Set up receiving Adapty's verification request by your server

After you enable webhook integration in the Adapty Dashboard, Adapty will automatically send a `isMount` POST verification request to your endpoint.

```json title="Json"
{
    adapty_check: {{check_string}}
}
```
Set up your endpoint to have the **Content-Type header** as `application/json`, i.e. your server's endpoint should expect the incoming webhook request to have its payload formatted as JSON.

### Step 1.2. Set up your server's verification response

Your server must reply with a 200 or 201 HTTP status code and send the response outlined below with the identical `check_string`. 

```json title="Json"
{
    adapty_check_response: {{check_string}}
}
```

Once Adapty receives the verification response in the correct format, your Adapty webhook integration is fully configured.

From then on, Adapty will send the selected events to your specified URL as they happen. Ensure your server promptly confirms each Adapty event with a response status code in the 200-404 range, the `check_string` is not required anymore.

## Step 2. Set up the processing of Adapty standard events

Ensure your endpoint includes the Content-Type header set to application/json, so your server expects incoming webhook requests with JSON-formatted payloads.

For the webhook event structure and detailed description of its fields, see the [Webhook event types and fields page](webhook-event-types-and-fields#webhook-event-structure).

## Step 3. Configure webhook integration in the Adapty Dashboard

Within Adapty, you can configure separate flows for production events and test events received from the Apple or Stripe sandbox environment or Google test account. 



Open [**Integrations** -> **Webhook**](https://app.adapty.io/integrations/customwebhook) in your Adapty Dashboard.

<Zoom>
  <img src={require('./img/webhook_integration.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

1. Turn on the toggle to initiate the integration.


2. Fill out the integration fields:

   | Field                                                  | Description                                                  |
    | ------------------------------------------------------ | ------------------------------------------------------------ |
   | **Production endpoint URL**                            | The URL Adapty uses to send HTTP POST requests for events in production. |
   | **Authorization header value for production endpoint** | <p>The header that your server will use to authenticate requests from Adapty in production. Note that we'll use the value specified in this field as the `Authorization` header exactly as provided, without any changes or additions.</p><p></p><p>Although not mandatory, it's strongly recommended for enhanced security.</p> |

   Additionally, for your testing needs in the sandbox environment, two other fields are available:

   | Testing field                                       | Description                                                  |
   | --------------------------------------------------- | ------------------------------------------------------------ |
   | **Sandbox endpoint URL**                            | The URL Adapty uses to send HTTP POST requests for events in the sandbox environment. |
   | **Authorization header value for sandbox endpoint** | <p>The header that your server will use to authenticate requests from Adapty during testing in the sandbox environment. Note that we'll use the value specified in this field as the `Authorization` header exactly as provided, without any changes or additions.</p><p></p><p>Although not mandatory, it's strongly recommended for enhanced security.</p> |

3. Choose the events you want to receive and map their names. Consult our [Event flows](event-flows) to decide which events are required or not.

   If your event IDs differ from those used in Adapty, keep the IDs in your system as is and replace the default Adapty event IDs with yours in the **Events names** section of the [**Integrations** ->  **Webhooks**](https://app.adapty.io/integrations/customwebhook) page.

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

   The event ID can be any string; simply make sure the event ID in your webhook processing server coincides with the one you entered in the Adapty Dashboard. You cannot leave the event ID empty for enabled events. If you accidentally removed the Adapty event ID and need to restore it, you can always copy it from the [Events that can be sent to a webhook table](webhook#events-than-can-be-sent-to-a-webhook).

4. Additional fields and options are not obligatory; use them as needed. 
5. Remember to click the **Save** button to confirm the changes.

Please note that the moment you click the **Save** button, Adapty will send a verification request and will wait for your server verification response.

## Step 4. Handle webhook events

Webhooks are typically delivered within 5 to 60 seconds after the event occurs. Cancellation events, however, may take up to 2 hours to be delivered after a user cancels their subscription.

If your server's response status code is outside the 200-404 range, Adapty will retry sending the event up to 9 times over 24 hours with exponential backoff. We suggest you set up your webhook to do only basic validation of the event body from Adapty before responding. If your server can't process the event and you don't want Adapty to retry, use a status code within the 200-404 range. Also, handle any time-consuming tasks asynchronously and respond to Adapty quickly. If Adapty doesn't receive a response within 10 seconds, it will consider the attempt a failure and will retry.
