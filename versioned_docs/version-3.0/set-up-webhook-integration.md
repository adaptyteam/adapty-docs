---
title: "Set up webhook integration"
description: "Set up webhook integration in Adapty to automate event tracking."
metadataTitle: "Setting Up Webhook Integration | Adapty Docs"
---
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'

Adapty [webhook integration](webhook) consists of the following steps:

<Zoom>
  <img src={require('./img/webhook-setup.png').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '300px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

<p> </p>

1. **Prepare your endpoint**
   1. Make sure your server accepts requests with **Content-Type: `application/json`**.
   2. Configure it to handle Adapty's verification request and reply with any `2xx` status and a JSON body.
   3. [Process subscription events](#subscription-events) after the connection is verified.
2. **Enable the webhook integration** in the [Adapty Dashboard](#configure-webhook-integration-in-the-adapty-dashboard). You can also [map Adapty events to custom event names](#configure-webhook-integration-in-the-adapty-dashboard). Test everything in the **Sandbox environment** before going live.
3. **Adapty sends a verification request**.
4. **Your server replies** with `2xx` and JSON.
5. **Adapty starts sending subscription events**.

## Set up your server to process Adapty requests
Adapty sends two kinds of requests to your webhook endpoint:
1. [Verification request](#verification-request): Adapty uses this initial request to verify the connection. It contains no event data and is sent as soon as you click **Save** in the Webhook integration. Respond with a verification response to confirm you received it.
2. [Subscription event](#subscription-events): Sent every time a subscription event occurs. Return any 200-level HTTP status to acknowledge receipt; no other response is required.

### Verification request

After you enable the integration, Adapty sends a POST verification request with an empty JSON body `{}`.

Ensure your endpoint expects JSON (`Content-Type: application/json`).

Your server must reply with a 2xx status code and send any valid JSON response, for example:

```json title="Json"
{}
```

Once Adapty receives the verification response in the correct format and with a 2xx status code, your Adapty webhook integration is fully configured.

### Subscription events

Subscription events are also sent as JSON (`Content-Type: application/json`). For event types and payloads, see [Webhook event types and fields](webhook-event-types-and-fields).

## Configure webhook integration in the Adapty Dashboard

You can configure separate flows for production events and test events (Apple or Stripe sandbox, Google test accounts).

For production, enter the URL in **Production endpoint URL** and the auth header in **Authorization header value for production endpoint**. Adapty passes this value as the `Authorization` header unchanged.

For sandbox, fill **Sandbox endpoint URL** and **Authorization header value for sandbox endpoint**.

To set up the webhook integration:

1. Open [Integrations -> Webhook](https://app.adapty.io/integrations/customwebhook) in your Adapty Dashboard.

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

2. Enable the toggle to activate the integration.
3. Fill out the integration fields:

    | Field                                                  | Description                                                  |
    | ------------------------------------------------------ | ------------------------------------------------------------ |
    | **Production endpoint URL**                            | The URL Adapty uses to send HTTP POST requests for events in production. |
    | **Authorization header value for production endpoint** | <p>The header that your server will use to authenticate requests from Adapty in production. Note that we'll use the value specified in this field as the `Authorization` header exactly as provided, without any changes or additions.</p><p></p><p>Although not mandatory, it's strongly recommended for enhanced security.</p> |

    Additionally, for your testing needs in the sandbox environment, two other fields are available:

    | Testing field                                       | Description                                                  |
    | --------------------------------------------------- | ------------------------------------------------------------ |
    | **Sandbox endpoint URL**                            | The URL Adapty uses to send HTTP POST requests for events in the sandbox environment. |
    | **Authorization header value for sandbox endpoint** | <p>The header that your server will use to authenticate requests from Adapty during testing in the sandbox environment. Note that we'll use the value specified in this field as the `Authorization` header exactly as provided, without any changes or additions.</p><p></p><p>Although not mandatory, it's strongly recommended for enhanced security.</p> |

4. (optional) Pick the events you want to receive and map their names. Check out our [Event flows](event-flows) to see which events are triggered in different situations.

   If your event IDs differ from those used in Adapty, keep the IDs in your system as is and replace the default Adapty event IDs with yours in the **Events names** section of the [Integrations ->  Webhooks](https://app.adapty.io/integrations/customwebhook) page.
   
   The event ID can be any string; simply make sure the event ID in your webhook processing server coincides with the one you entered in the Adapty Dashboard. You cannot leave the event ID empty for enabled events. 

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

5. The remaining fields are optional; use them as needed:

    | Setting                            | Description                                                  |
    | :--------------------------------- | :----------------------------------------------------------- |
    | **Send Trial Price**               | When enabled, Adapty will include the subscription price in the `price_local` and `price_usd` fields for the **Trial Started** event. |
    | **Exclude Historical Events**      | Opt to exclude events that occurred before the user installed the app with Adapty SDK. This prevents duplication of events and ensures accurate reporting. For instance, if a user activated a monthly subscription on January 10th and updated the app with Adapty SDK on March 6th, Adapty will omit events before March 6th and retain subsequent events. |
    | **Send user attributes**           | Enable this option to send user-specific attributes, such as language preferences. These attributes will appear in the `user_attributes` field. See [Event fields](webhook-event-types-and-fields#event-fields) for more information. |
    | **Send attribution**               | Turn on this option to include attribution information (e.g., AppsFlyer data) in the `attributions` field. Refer to the [Attribution data](webhook-event-types-and-fields#attribution-data) section for details. |
    | **Send Play Store purchase token** | Turn on this option to receive the Play Store token required for purchase revalidation, if needed. Enabling it will add the `play_store_purchase_token` parameter to the event. For details on its content, refer to the [Play Store purchase token](webhook-event-types-and-fields#play-store-purchase-token) section. |

6. When you click the **Save** button, Adapty immediately sends a verification request and waits for your response.

### Choose events to send and map event names

Enable the toggle next to each event you want to receive. If your event names differ from Adapty's and you need to keep your own naming, replace the default names in the **Events names** section of the [Integrations ->  Webhooks](https://app.adapty.io/integrations/customwebhook) page.

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


The event name can be any string. You cannot leave the fields empty for enabled events. If you accidentally removed Adapty event name, you can always copy the name from the [Events to send to third-party integrations](events) topic.

## Handle webhook events

Webhooks are typically delivered within 5 to 60 seconds after the event occurs. Cancellation events, however, may take up to 2 hours to be delivered after a user cancels their subscription.

If your server's response status code is outside the 200-404 range, Adapty will retry sending the event up to 9 times over 24 hours with exponential backoff. We suggest you set up your webhook to do only basic validation of the event body from Adapty before responding. If your server can't process the event and you don't want Adapty to retry, use a status code within the 200-404 range. Also, handle any time-consuming tasks asynchronously and respond to Adapty quickly. If Adapty doesn't receive a response within 10 seconds, it will consider the attempt a failure and will retry.
