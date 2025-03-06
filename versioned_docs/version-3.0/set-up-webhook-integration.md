---
title: "Set up webhook integration"
description: ""
metadataTitle: ""
---
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'

1. **You set up your endpoint:**
   1. Ensure your server can process Adapty requests with the **Content-Type** header set to `application/json`.
   2. Configure your server to receive Adapty's verification request and respond with any `2xx` status and a JSON body.
   3. [Handle subscription events](set-up-webhook-integration#step-2-set-up-the-processing-of-adapty-standard-events) once the connection is verified.
2. **You configure and enable the webhook integration** in the [Adapty Dashboard](set-up-webhook-integration#step-3-configure-webhook-integration-in-the-adapty-dashboard). You can also [map Adapty events to custom event names](set-up-webhook-integration#step-3-configure-webhook-integration-in-the-adapty-dashboard). We recommend testing in the **Sandbox environment** before switching to production.
3. **Adapty sends a verification request** to your server.
4. **Your server responds** with a `2XX` status and a JSON body.
5. **Once Adapty receives a valid response, it starts sending subscription events.**

<Zoom>
  <img src={require('./img/webhook-setup.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

<!--- 

Adapty [webhook integration](webhook) consists of the following steps:

1. You set up your endpoint:
   1.  To [have the **Content-Type** header as `application/json`](set-up-webhook-integration#step-1-set-up-your-server-to-process-adapty-requests). 
   2.  To [receive the first Adapty verification request](set-up-webhook-integration#step-11-set-up-receiving-adaptys-verification-request-by-your-server) - the initial request to verify the connection is set up correctly and [respond](set-up-webhook-integration#step-12-set-up-your-servers-verification-response) to it for the Adapty server to learn the connection is successfully established.
   4.  To [receive the standard events and process them](set-up-webhook-integration#step-2-set-up-the-processing-of-adapty-standard-events).
   
2. [You configure the integration](set-up-webhook-integration#step-3-configure-webhook-integration-in-the-adapty-dashboard) in the Adapty Dashboard. Within this step, you can optionally [map Adapty events with your event names](set-up-webhook-integration#step-3-configure-webhook-integration-in-the-adapty-dashboard). We recommend to first use the Sandbox environment to test how your server processes Adapty events and after you make sure it does it as expected, switch to the production environment.

3. Adapty sends a verification request to your server.

4. Your server sends a verification response to Adapty.

5. After the Adapty server receives the verification response in the expected format, it's ready to send standard event requests.

After that, we recommend testing your webhook integration. --->

## Set up your server to process Adapty requests

Adapty will send to your webhook endpoint 2 types of requests:

1. [**Verification request**](set-up-webhook-integration#step-11-set-up-receiving-adaptys-verification-request-by-your-server): the initial request to verify the connection is set up correctly. This request will not contain any event and will be sent the moment you click the **Save** button in the Webhook integration of the Adapty Dashboard. To confirm your endpoint successfully received the verification request, your endpoint should answer with the [verification response](set-up-webhook-integration#step-12-set-up-your-servers-verification-response).
2. [**Usual event**](set-up-webhook-integration#step-2-set-up-the-processing-of-adapty-standard-events): A standard request Adapty server sends every time an event is created in it. Your server does not need to reply with any specific response. The only thing the Adapty server needs is to receive a standard 200-code HTTP response if it successfully receives the message.

### Step 1. Set up receiving Adapty's verification request by your server

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

Ensure your endpoint includes the **Content-Type** header set to `application/json`, so your server expects incoming webhook requests with JSON-formatted payloads.

For the webhook event structure and detailed description of its fields, see the [Webhook event types and fields page](webhook-event-types-and-fields#webhook-event-structure).

## Step 3. Configure webhook integration in the Adapty Dashboard

Within Adapty, you can configure separate flows for production events and test events received from the Apple or Stripe sandbox environment or Google test account. 

For production events, use the **Production endpoint URL** field specifying the URL to which the callbacks will be sent. Additionally, configure the **Authorization header value for production endpoint** field - the header for your server to authenticate Adapty events. Note that we'll use the value specified in the **Authorization header value for production endpoint** field as the `Authorization` header exactly as provided, without any changes or additions.

For test events, employ the  **Sandbox endpoint URL** and **Authorization header value for sandbox endpoint** fields accordingly.

To set up the webhook integration:

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

   The event ID can be any string; simply make sure the event ID in your webhook processing server coincides with the one you entered in the Adapty Dashboard. You cannot leave the event ID empty for enabled events. If you accidentally removed the Adapty event ID and need to restore it, you can always copy it from the [Webhook event types](webhook-event-types-and-fields#webhook-event-types) table.

4. Additional fields and options are not obligatory; use them as needed:

   | Setting                            | Description                                                  |
   | :--------------------------------- | :----------------------------------------------------------- |
   | **Send Trial Price**               | When enabled, Adapty will include the subscription price in the `price_local` and `price_usd` fields for the **Trial Started** event. |
   | **Exclude Historical Events**      | Opt to exclude events that occurred before the user installed the app with Adapty SDK. This prevents duplication of events and ensures accurate reporting. For instance, if a user activated a monthly subscription on January 10th and updated the app with Adapty SDK on March 6th, Adapty will omit events before March 6th and retain subsequent events. |
   | **Send user attributes**           | Enable this option to send user-specific attributes, such as language preferences. These attributes will appear in the `user_attributes` field. See [Event fields](webhook-event-types-and-fields#event-fields) for more information. |
   | **Send attribution**               | Turn on this option to include attribution information (e.g., AppsFlyer data) in the `attributions` field. Refer to the [Attribution data](webhook-event-types-and-fields#attribution-data) section for details. |
   | **Send Play Store purchase token** | Turn on this option to receive the Play Store token required for purchase revalidation, if needed. Enabling it will add the `play_store_purchase_token` parameter to the event. For details on its content, refer to the [Play Store purchase token](webhook-event-types-and-fields#play-store-purchase-token) section. |

5. Remember to click the **Save** button to confirm the changes.

The moment you click the **Save** button, Adapty will send a verification request and will wait for your server verification response.

## Step 4. Handle webhook events

Webhooks are typically delivered within 5 to 60 seconds after the event occurs. Cancellation events, however, may take up to 2 hours to be delivered after a user cancels their subscription.

If your server's response status code is outside the 200-404 range, Adapty will retry sending the event up to 9 times over 24 hours with exponential backoff. We suggest you set up your webhook to do only basic validation of the event body from Adapty before responding. If your server can't process the event and you don't want Adapty to retry, use a status code within the 200-404 range. Also, handle any time-consuming tasks asynchronously and respond to Adapty quickly. If Adapty doesn't receive a response within 10 seconds, it will consider the attempt a failure and will retry.