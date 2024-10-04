---
title: "Test Adjust integration"
description: "Learn how to test the integration of Adapty with Adjust to ensure successful event and attribution data flow. Follow our comprehensive guide to validate end-to-end integration before going live."
metadataTitle: "How to Test Adjust Integration with Adapty: A Step-by-Step Guide"
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

We recommend testing the Adjust integration end-to-end before going live. Since the integration of Adapty with Adjust is bidirectional, that is sends both Adapty events from Adapty server to Adjust server and Adjust attribution from AppsFlyer SDK to Adapty server, we recommend validating both flow success.

1. Set up the test Adjust integration as described in the [Set up Adjust integration](adjust-setup) topic. Make sure to use the **Sandbox** fields in the **iOS app token** and **Android app token** sections in step 9.
2. Make a test purchase. Refer to [Test in-app purchases in Apple App Store](testing-purchases-ios) and [Test in-app purchases in Google Play Store](testing-on-android) topics for detailed guidance. It's important here to:
   1. Build the test app in a sandbox environment rather than the production one.
   2. Make the purchase that will raise an event you've chosen to send to Adjust. For example, to get the **Subscription started** event, purchase a new subscription rather than renew an existing one.
3. [Check that Adapty received the required attribution data](test-adjust-integration#validate-successful-adapty-event-delivery-to-adjust).
4. [Check that the event is delivered to Adjust successfully](test-adjust-integration#validate-successful-adjust-attribution-delivery-to-adapty).

## Validate successful Adapty event delivery to Adjust

### Successful sending events result

In case of successful integration, an event will appear in the **Last sent events** section of the integration and will have the **Success** status. 


<Zoom>
  <img src={require('./img/0a79033-adjust_adapty_success.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>





### Unsuccessful sending events result

In case of unsuccessful integration, the event will either not appear at all or will have the **Sending failed** status in the **Last sent events** section of the integration.


<Zoom>
  <img src={require('./img/67df7e0-adjust_adapty_sending_failed.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>





## Troubleshoot unsuccessful event sending

Please consult the table below for guidance on resolving the issues:

| Issue                                                    | Solution                                                     |
| :------------------------------------------------------- | :----------------------------------------------------------- |
| The event did not appear                                 | Your purchase did not occur and therefore the event was not created. Refer to the [Troubleshooting test purchases](troubleshooting-test-purchases) topic for the solution. |
| The event appeared and has the **Sending failed** status | The event was created but for some reason, it was not successfully delivered to the AppsFlyer server. |

## Validate successful Adjust attribution delivery to Adapty

AppsFlyer attribution is sent from Adjust SDK in your mobile app code to Adapty server tother with the event. 

In case of successful Adjust attribution receiving, you will see these attributes on the profile. For this:

1. Expand a successful event in the **Last sent events** section of the integration.

   

<Zoom>
  <img src={require('./img/743211b-adjust_adapty_view_profile.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>



2. Click the **View Profile** button.
3. In the **Profile** window, make sure the **Attributes -> Adjust** section is presented.

   

<Zoom>
  <img src={require('./img/dfbb1ca-adjust_adapty_attribution.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>




## Troubleshoot missing Adjust attribution

If the attribution is absent:

1. Make sure you've set up the integration on the mobile app code level as described in our [Enable integration on the Adapty SDK level](appsflyer-setup#enable-integration-on-the-adapty-sdk-level) section.
2. Make sure you've updated the mobile app on your test device after you set up the integration.