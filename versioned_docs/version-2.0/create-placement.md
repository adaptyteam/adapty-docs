---
title: "Create placement"
description: "Drive user interaction and optimize conversions by creating targeted placements for paywalls and A/B tests in your app with Adapty's user-friendly platform. Learn how to effortlessly deploy and manage placements for enhanced engagement"
metadataTitle: "Boost Engagement: Creating Placements in Adapty for Paywalls and A/B Tests"
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

A [Placement](placements) designates a specific location within your mobile app where a paywall or A/B test can be displayed. For example, a subscription choice might appear in a startup flow, while a consumable product (such as golden coins) could be presented when a user runs out of coins in a game. You have the flexibility to showcase the same paywall or A/B test across multiple placements or different paywalls or A/B tests in one placement for different user segments, called audiences in Adapty. 

Read the [Choose meaningful placements](choose-meaningful-placements) section for more recommendations on how to choose the right placement for a paywall.

To create a new placement:

1. Open the **[Placements](https://app.adapty.io/placements)** section in the Adapty main menu.

   
<Zoom>
  <img src={require('./img/0561bf8-placements_create_new.png').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>



2. In the **Placements** window, click the **Create placement** button.

   
<Zoom>
  <img src={require('./img/3dc0e8c-new_placement.png').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>



3. In the **Placements / New placement** window, enter **Placement Name ** that is used for your reference to clearly describe the exact place in your mobile app. This name serves as a means of identification and helps you organize and manage your placements effectively. You have the flexibility to edit the placement name even after it has been created.
4. Enter the **Placement ID** which is a unique identifier of the placement that will be used in your mobile app code to call the [paywalls](paywalls) and [A/B tests](ab-tests) created in Adapty for this placement.  Placement ID cannot be modified once it has been created. It guarantees the uniqueness and integrity of each placement. 
5. [Add a paywall or A/B test to the "All users" audience](add-audience-paywall-ab-test), which is automatically created for every placement.
6. [Add more audiences and paywalls or A/B tests](add-audience-paywall-ab-test) if required.
7. If you have more than one audience, check that the audiences have the correct priorities. When you have different user audiences, a user can belong to more than one audience. For instance, if you've defined audiences like "US users, "Facebook users", and a general audience like "All users," it's crucial to determine which specific audience to consider first when a user falls into multiple categories. [Correct the priorities](change-audience-priority) if required.
8. Click the **Save and publish button**.