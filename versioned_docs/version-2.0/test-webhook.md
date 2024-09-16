---
title: "Test webhook integration"
description: "Learn how to test your Adapty webhook integration, validate event delivery, and ensure correct setup for historical events, subscriptions, and more"
metadataTitle: "Testing Your Webhook Integration with Adapty"
---

After you set up your integration, it's time to test it. You can test both your sandbox and production integration. We recommend starting with the sandbox one and validating the maximum on it:

- The events are sent and successfully delivered 
- You set up the options correctly for historical events, subscription price for the **Trial started** event, attribution, user attributes, and Google Play Store purchase token to be sent or not sent with an event
- You mapped event names correctly and your server can process them

## How to test

Before you start testing an integration, make sure you have already:

1. Set up the webhook integration as described in the [Set up webhook integration](set-up-webhook-integration) topic.
2. Set up the environment as described in the [Test in-app purchases in Apple App Store](testing-purchases-ios) and [Test in-app purchases in Google Play Store](testing-on-android) topics. Make sure you built your test app in the sandbox environment rather than in the production one.

To test the integration:

Make a purchase/start a trial/make a refund that will raise an event you've chosen to send to the webhook. For example, to get the **Subscription started** event, purchase a new subscription.

## Validation of the result

### Successful sending events result

In case of successful integration, an event will appear in the **Last sent events** section of the integration and will have the **Success** status. 


<img
  src={require('./img/6ccc3bb-webhook_integration_success.png').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>





### Unsuccessful sending events result

| Issue | Solution |
|-----|--------|
| The event did not appear | Your purchase did not occur and therefore the event was not created. Refer to the [Troubleshooting test purchases](troubleshooting-test-purchases) topic for the solution. |
| The event appeared and has the **Sending failed** status | <p>We determine the deliverability based on HTTP status and consider everything **outside the 200-399 range** to be a fail.</p><p>To find more on the issue, hover over the **Sending failed** status of your unsuccessful event as shown below.</p> |



<img
  src={require('./img/12ff189-hover_sending_failed.png').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>


