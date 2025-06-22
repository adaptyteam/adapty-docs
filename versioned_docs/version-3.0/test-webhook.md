---
title: "Test webhook integration"
description: "Test webhook integrations in Adapty to automate subscription event tracking."
metadataTitle: "Testing Webhook Integrations | Adapty Docs"
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

After you set up your integration, it's time to test it. You can test both your sandbox and production integration. We recommend starting with the sandbox one and validating the maximum on it:
After the integration is configured, test it. You can check both the sandbox and production setups, but start with the sandbox and run all checks there:

- Events are sent and delivered successfully.
- Options for historical events, subscription price in the **Trial started** event, attribution, user attributes, and the Google Play Store purchase token behave as expected.
- Event names are mapped correctly and your server processes them.

## How to test

Before you start testing the integration, make sure you have:

1. Set up the webhook integration as described in the [Set up webhook integration](set-up-webhook-integration) topic.
2. Prepared the test environment as described in the [Test in-app purchases in Apple App Store](testing-purchases-ios) and [Test in-app purchases in Google Play Store](testing-on-android) guides. Build your test app for the sandbox environment, not production.
3. Triggered an event you selected for the webhook (for example, buy a new subscription to get **Subscription started**).

## Validation of the result

### Successful result

If the integration works, the event appears in **Last sent events** with status **Success**.

<Zoom>
  <img src={require('./img/6ccc3bb-webhook_integration_success.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

### Unsuccessful result

| Issue | Solution |
| ----- | -------- |
| The event didn't appear | The purchase didn't happen, so no event was created. See [Troubleshooting test purchases](troubleshooting-test-purchases). |
| The event appeared with **Sending failed** | <p>Adapty treats any HTTP status **outside 200-399** as a failure.</p><p>Hover over **Sending failed** to see the error details (example below).</p> |

<Zoom>
  <img src={require('./img/12ff189-hover_sending_failed.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

