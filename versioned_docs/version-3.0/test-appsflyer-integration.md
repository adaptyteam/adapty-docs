---
title: "Test AppsFlyer integration"
description: ""
metadataTitle: ""
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

We recommend testing the AppsFlyer integration end-to-end before going live. Since the integration of Adapty with AppsFlyer is bidirectional, that is sends both Adapty events from Adapty server to AppsFlyer server and AppsFlyer attribution from AppsFlyer SDK to Adapty server, we recommend validating both flow success.

1. Set up the test AppsFlyer integration as described in the [Set up AppsFlyer integration](appsflyer-setup) topic. Make sure to use the **Sandbox** fields in the **Dev key for iOS** and **Dev key for Android** sections in step 6.
2. Make a test purchase. Refer to [Test in-app purchases in Apple App Store](testing-purchases-ios) and [Test in-app purchases in Google Play Store](testing-on-android) topics for detailed guidance. It's important here to:
   1. Build the test app in a sandbox environment rather than the production one.
   2. Make the purchase that will raise an event you've chosen to send to AppsFlyer. For example, to get the **Subscription started** event, purchase a new subscription rather than renew an existing one.
3. [Check that Adapty received the required attribution data](test-appsflyer-integration#validate-successful-adapty-event-delivery-to-appsflyer).
4. [Check that the event is delivered to AppsFlyer successfully](test-appsflyer-integration#validate-successful-appsflyer-attribution-delivery-to-adapty).

## Validate successful Adapty event delivery to AppsFlyer

### Successful sending events result

In case of successful integration, an event will appear in the **Last sent events** section of the integration and will have the **Success** status. 


<Zoom>
  <img src={require('./img/6ccc3bb-webhook_integration_success.png').default}
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
  <img src={require('./img/995b3bb-sending_failed.png').default}
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

| Issue                                                    | Solution                                                                                                                                                                                                                   |
| :------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| The event did not appear                                 | Your purchase did not occur and therefore the event was not created. Refer to the [Troubleshooting test purchases](troubleshooting-test-purchases) topic for the solution.                                             |
| The event appeared and has the **Sending failed** status | The event was created but for some reason, it was not successfully delivered to the AppsFlyer server. To solve the issue, consult the [Troubleshooting on integration event sending failures](sending_failed) section. |

## Validate successful AppsFlyer attribution delivery to Adapty

AppsFlyer attribution is sent from AppsFlyer SDK in your mobile app code to Adapty server tother with the event. 

In case of successful AppsFlyer attribution receiving, you will see these attributes on the profile. For this:

1. Expand a successful event in the **Last sent events** section of the integration.

   
<Zoom>
  <img src={require('./img/7aef747-view_profile.png').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>



2. Click the **View Profile** button.
3. In the **Profile** window, make sure the **Attribution -> AppsFlyer** section is presented.

   
<Zoom>
  <img src={require('./img/943148a-profile_attribution.png').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>




## Troubleshoot missing AppsFlyer attribution

If the attribution is absent:

1. Make sure you've set up the integration on the mobile app code level as described in our [Enable integration on the Adapty SDK level](appsflyer-setup#enable-integration-on-the-adapty-sdk-level) section.
2. Make sure you've updated the mobile app on your test device after you set up the integration.