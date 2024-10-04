---
title: "Add audience and paywall or A/B test to placement"
description: "Optimize user engagement by linking audiences with paywalls or A/B tests within Adapty placements, enabling personalized content delivery for specific user groups based on various filters. Learn how to enhance targeted content delivery and improve user experience"
metadataTitle: "Targeted Content Delivery: Adding Audiences, paywalls, and A/B tests to Placements in Adapty"
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

Audiences in Adapty are segments of your customers that let you target the paywalls or A/B tests accurately. You can set up these [segments](segments) using specific filters, making sure that the right paywalls show up for the right people.

When it comes to [placement](placements) in Adapty, adding an audience to it means you're aiming specific content—like paywalls or A/B tests—at certain user groups. Linking an audience with a placement ensures that the content you want is seen by the right users at the right points in their app journey.

1. Open the **[Placements](https://app.adapty.io/placements)** section in the Adapty main menu.

   
<Zoom>
  <img src={require('./img/df6f87b-placements.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>




2. In the **Placements** window, click the **Edit** button next to the placement where you wish to add an audience.

   
<Zoom>
  <img src={require('./img/fe7154d-new_placement.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>




3. In the **Placements/ Your placement** window, click the **Add audience** button and choose the desired user segment from the list. Please note that only [segments you have previously created](segments#creation) are accessible in the list. These segments signify different audience groups defined and created within Adapty.

   
<Zoom>
  <img src={require('./img/d0d720f-Area.gif').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>




4. Associate a paywall or A/B test to display for this audience. To do this, click either the **Run paywall** or **Run A/B test** button, then select the desired paywall or A/B test from the dropdown list. Please note that only [previously created paywalls](create-paywall) and [previously created A/B tests](ab-tests#creating-ab-test-from-ab-test-section) are available in the lists.

   In Adapty, a [paywall](paywalls) serves as a screen showcasing purchasable products within your mobile app, offering users the opportunity to make in-app purchases. To tailor the paywall experience, you can designate specific audiences to view particular paywalls. It's important to note that each audience is associated with only one paywall, ensuring a personalized approach. However, the same paywall can be presented to multiple audiences. For a broader reach, the default "All users" audience is available to display the paywall to everyone. This nuanced approach allows you to optimize your paywall strategies based on audience preferences and maximize user engagement.

   If you're uncertain about the effectiveness of the created paywall, consider comparing it with another one in an A/B test. Adapty provides the flexibility to enhance your monetization strategy further by introducing A/B tests. These tests involve presenting users with multiple paywalls to evaluate and determine the most effective one. Explore further insights on A/B tests in our [A/B test](ab-tests) documentation.

   
<Zoom>
  <img src={require('./img/f23da25-Area.gif').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>




5. Click the **Save and publish** button to confirm the addition of the audiences.

When multiple audiences are associated with the same placement, you can conveniently [manage their priority](change-audience-priority).