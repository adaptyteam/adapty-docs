---
title: "Create placement"
description: "Create and manage placements in Adapty to improve paywall performance."
metadataTitle: "Creating a Placement in Adapty | Adapty Docs"
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import AddAudience from '@site/src/components/reusable/AddAudience.md';

A [Placement](placements) designates a specific location within your mobile app where a paywall, onboarding, or A/B test can be displayed. For example, a subscription choice might appear in a startup flow, while a consumable product (such as golden coins) could be presented when a user runs out of coins in a game. 

:::info
[Onboardings](https://adapty.io/docs/onboardings) are currently available only on the Enterprise plan.
:::

You have the flexibility to showcase the same or different paywalls, onboardings, or A/B tests in various placements or to different user segments — called "audiences" in Adapty. 

Read the [Choose meaningful placements](choose-meaningful-placements) section for more recommendations on how to choose the right placement for a paywall.

To create a new placement:

1. Go to **[Placements](https://app.adapty.io/placements)** from the Adapty main menu. If you want to create a placement for [onboarding](https://adapty.io/docs/onboardings), switch to the **Onboardings** tab.

   

<Zoom>
  <img src={require('./img/create-placement-1.png').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

:::info
Although the placement creation process is similar for paywalls and onboardings, you can't create one placement for both.
:::

2. Click **Create placement**.


<Zoom>
  <img src={require('./img/create-placement-2.png').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>



3. In the **Placements / New placement** window, enter **Placement Name** that is used for your reference to clearly describe the exact place in your mobile app. This name serves as a means of identification and helps you organize and manage your placements effectively. You have the flexibility to edit the placement name even after it has been created.

4. Enter the **Placement ID** which is a unique identifier of the placement that will be used in your mobile app code to call the [paywalls](paywalls), [onboardings](https://docs.adapty.io/docs/onboardings),  and [A/B tests](ab-tests) created in Adapty for this placement.  Placement ID cannot be modified once it has been created. It guarantees the uniqueness and integrity of each placement. 

## Adding paywalls, onboardings, and A/B tests
Adapty supports showing paywalls, onboardings, and A/B tests for specific [audiences](audience) - segments of users created to better target your paywalls. If you do not need that, you can use the default audience *All users,* and stop on it. 

If you use audiences, start by adding a paywall, onboarding, or A/B test to the *All users* audience. Then, add more audiences to your placement. You can learn more on the [Audiences](audience) page.

   <AddAudience />