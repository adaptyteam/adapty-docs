---
title: "Create placement"
description: "Create and manage placements in Adapty to improve paywall performance."
metadataTitle: "Creating a Placement in Adapty | Adapty Docs"
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import AddAudience from '@site/src/components/reusable/AddAudience.md';

A [Placement](placements) is a spot in your app where you can show a paywall or A/B test. For example:

- A subscription screen in the startup flow
- Offering gold coins when a player runs out

You can use the same paywall or A/B test across multiple placements. You can also show different paywalls or A/B tests in one placement to different user segments (called audiences in Adapty).

Read the [Choose meaningful placements](choose-meaningful-placements) section for tips on picking the right placement.

To create a new placement:

1. Go to **[Placements](https://app.adapty.io/placements)** in the Adapty main menu.

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



3. Enter a **Placement name**. This is an internal identifier in the Adapty Dashboard. You can edit it later if needed.

4. Enter a **Placement ID**. You'll use this ID in the Adapty SDK to call the placement's [paywalls](paywalls) and [A/B tests](ab-tests). You cannot edit it later as it's unique for each placement.

5. Click **Run Paywall** or **Run A/B test** depending on the placement's purpose. Learn more in the section below.

## Adding paywalls and A/B tests
Adapty supports showing paywalls and A/B tests to specific [audiences](audience). Audiences are groups of users based on [segments](segments.md).

- If you don't need audiences, add your paywall or A/B test to the default *All users* audience and you're done.
- If you use audiences, first add a paywall or A/B test to *All users*. Then add more audiences to the placement.

Find more details in the [Audiences](audience) page.

   <AddAudience />