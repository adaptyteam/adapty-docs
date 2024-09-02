---
title: "Set up webhook integration"
description: "Discover the step-by-step process to set up webhook integration in Adapty, enabling your server to receive real-time notifications for subscription events efficiently."
metadataTitle: "Set Up Webhook Integration for Real-Time Subscription Notifications"
---

Adapty [webhook integration](webhook) consists of the following steps:

1. You set up your endpoint to have the **Content-Type** header as `application/json`. 
2. [You configure the integration](set-up-webhook-integration#configure-webhook-integration-in-the-adapty-dashboard) in the Adapty Dashboard. Within this step, you can optionally [map Adapty events with your event names](set-up-webhook-integration#choose-events-to-send-and-map-event-names).
3. [Adapty sends a verification request to your server](set-up-webhook-integration#adaptys-verification-request).
4. [Your server sends a verification response to Adapty](set-up-webhook-integration#your-servers-verification-response)
5. [Test your webhook integration](test-webhook).

## Configure webhook integration in the Adapty Dashboard

Within Adapty, you can configure separate flows for production events and test events received from the Apple or Stripe sandbox environment or Google test account. 

For production events, use the **Production endpoint URL** field specifying the URL to which the callbacks will be sent. Additionally, configure the **Authorization header value for production endpoint** field - the header for your server to authenticate Adapty events. Note that we'll use the value specified in the **Authorization header value for production endpoint** field as the `Authorization` header exactly as provided, without any changes or additions.

For test events, employ the  **Sandbox endpoint URL** and **Authorization header value for sandbox endpoint** fields accordingly.

To set up the webhook integration:

1. Open [**Integrations** -> **Webhook**](https://app.adapty.io/integrations/customwebhook) in your Adapty Dashboard.


<img
  src={require('./img/a3e49a8-webhook_integration.png').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>


2. Turn on the toggle to initiate the integration.
3. Fill out the integration fields:

| Field | Description |
|-----|-----------|
| **Production endpoint URL** | URL that is used by Adapty to send HTTP POST requests to this URL when events occur. |
| **Authorization header value for production endpoint** | <p>The header that your server will use to authenticate requests from Adapty in production. Note that we'll use the value specified in this field as the `Authorization` header exactly as provided, without any changes or additions.</p><p></p><p>Although not mandatory, it's strongly recommended for enhanced security.</p> |

   Additionally, for your testing needs in the staging environment, two other fields are available:

| Testing field | Description |
|-------------|-----------|
| **Sandbox endpoint URL** | Adapty will use this URL to send HTTP POST requests when events occur in the staging environment. |
| **Authorization header value for sandbox endpoint** | <p>The header that your server will use to authenticate requests from Adapty during testing in the sandbox environment. Note that we'll use the value specified in this field as the `Authorization` header exactly as provided, without any changes or additions.</p><p></p><p>Although not mandatory, it's strongly recommended for enhanced security.</p> |
4. Choose the events you want to receive and [map their names](set-up-webhook-integration#choose-events-to-send-and-map-event-names).
5. Additional fields and options are not obligatory; use them as needed. 
6. Remember to click the **Save** button to confirm the changes.

Please note that the moment you click the **Save** button, Adapty will send a verification request and will wait for your server verification response.

## Choose events to send and map event names

Choose the events you want to receive in your server by enabling the toggle next to it. If your event names differ from those used in Adapty and you need to keep your names as is, you can set up the mapping by replacing the default Adapty event names with your own in the **Events names** section of the [**Integrations** ->  **Webhooks**](https://app.adapty.io/integrations/customwebhook) page.


<img
  src={require('./img/86942b8-event_names_renaming.png').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>


The event name can be any string. You cannot leave the fields empty for enabled events. If you accidentally removed Adapty event name, you can always copy the name from the [Events to send to 3d-party integrations](events) topic.

## Adapty's verification request

After you enable webhook integration in the Adapty Dashboard, Adapty will automatically send a `isMount` POST verification request to your endpoint.

```json title="Json"
{
    adapty_check: {{check_string}}
}
```

:::note
Be sure your endpoint supports **Content-Type**: `application/json` header
:::

## Your server's verification response

Your server must reply with a 200 or 201 HTTP status code and send the response outlined below with the identical `check_string`. 

```json title="Json"
{
    adapty_check_response: {{check_string}}
}
```

Once Adapty receives the verification response in the correct format, your Adapty webhook integration is fully configured.

From then on, Adapty will send the selected events to your specified URL as they happen. Ensure your server promptly confirms each Adapty event with a response status code in the 200-404 range.

## Handle webhook events

Webhooks are typically delivered within 5 to 60 seconds of the event occurring. Cancellation events, however, may take up to 2 hours to be delivered after a user cancels their subscription.

If your server's response status code is outside the 200-404 range, Adapty will retry sending the event up to 9 times over 24 hours with exponential backoff. We suggest you set up your webhook to do only basic validation of the event body from Adapty before responding. If your server can't process the event and you don't want Adapty to retry, use a status code within the 200-404 range. Also, handle any time-consuming tasks asynchronously and respond to Adapty quickly. If Adapty doesn't receive a response within 10 seconds, it will consider the attempt a failure and will retry