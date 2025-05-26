---
title: "Create placement"
description: "Create and manage placements in Adapty to improve paywall performance."
metadataTitle: "Creating a Placement in Adapty | Adapty Docs"
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import AddAudience from '@site/src/components/reusable/AddAudience.md';

A [Placement](placements) designates a specific location within your mobile app where a paywall or A/B test can be displayed. For example, a subscription choice might appear in a startup flow, while a consumable product (such as golden coins) could be presented when a user runs out of coins in a game. You have the flexibility to showcase the same paywall or A/B test across multiple placements or different paywalls or A/B tests in one placement for different user segments, called audiences in Adapty. 

Read the [Choose meaningful placements](choose-meaningful-placements) section for more recommendations on how to choose the right placement for a paywall.

To create a new placement:

1. Open the **[Placements](https://app.adapty.io/placements)** section in the Adapty main menu.

   

<Zoom>
  <img src={require('./img/0561bf8-placements_create_new.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>



2. In the **Placements** window, click **Create placement**.


<Zoom>
  <img src={require('./img/new_placement.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>



3. In the **Placements / New placement** window, enter **Placement Name** that is used for your reference to clearly describe the exact place in your mobile app. This name serves as a means of identification and helps you organize and manage your placements effectively. You have the flexibility to edit the placement name even after it has been created.

4. Enter the **Placement ID** which is a unique identifier of the placement that will be used in your mobile app code to call the [paywalls](paywalls) and [A/B tests](ab-tests) created in Adapty for this placement.  Placement ID cannot be modified once it has been created. It guarantees the uniqueness and integrity of each placement. 

## Adding paywalls and A/B tests
Adapty supports showing paywalls and A/B tests for specific [audiences](audience) - segments of users created to better target your paywalls. If you do not need that, you can add your paywall or A/B test to the default audience *All users,* and stop on it. If you use audiences, first add a paywall or A/B test to the *All users* audience, and then add more audiences to your placement. More details on how audiences work, you can find in the [Audiences](audience) page.

   <AddAudience />