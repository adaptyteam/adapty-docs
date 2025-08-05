---
title: "Create placement"
description: "Create and manage placements in Adapty to improve paywall performance."
metadataTitle: "Creating a Placement in Adapty | Adapty Docs"
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import AddAudience from '@site/src/components/reusable/AddAudience.md';

A [Placement](placements) is a specific location in your mobile app where you can show a paywall, onboarding, or A/B test. For example, a subscription choice might appear in a startup flow, while a consumable product (like golden coins) could show when a user runs out of coins in a game.

You can show the same or different paywalls, onboardings, or A/B tests in various placements or to different user segments — called "audiences" in Adapty.

Read the [Choose meaningful placements](choose-meaningful-placements) section for more recommendations on how to choose the right placement for a paywall.

:::info
Although the placement creation process is similar for paywalls and onboardings, you can't create one placement for both as they process different metrics.
:::

To create a new placement:

1. Go to **[Placements](https://app.adapty.io/placements)** from the Adapty main menu.

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


3. Enter a **Placement Name** to identify your placement. You can edit it later.

4. Enter the **Placement ID**, a unique identifier that your mobile app code uses to call the [paywalls](paywalls), [onboardings](https://adapty.io/docs/onboardings), and [A/B tests](ab-tests) created in Adapty for this placement. You cannot change the Placement ID once created, which ensures each placement stays unique.

## Adding paywalls, onboardings, and A/B tests
Adapty lets you show paywalls, onboardings, and A/B tests to specific [audiences](audience) — user segments created to better target your content. If you don't need targeting, use the default *All users* audience.

If you use audiences, start by adding a paywall, onboarding, or A/B test to the *All users* audience. Then add more audiences to your placement. Learn more on the [Audiences](audience) page.

   <AddAudience />