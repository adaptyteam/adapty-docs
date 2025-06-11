---
title: "Create onboarding"
metadataTitle: "Create Onboardings in Adapty | Adapty Docs"
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import Details from '@site/src/components/Details';

[Onboardings](onboardings.md) introduce new users to your mobile app's value, features, and usage tips.

## Step 1. Create an onboarding

To create a new onboarding in the Adapty dashboard:

1. Go to **Onboardings** from the Adapty main menu. This page gives an overview of all onboardings you’ve set up, along with their metrics. Click **Create onboarding**.

<Zoom>
  <img src={require('./img/create-onboarding1.png').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

2. Create a descriptive name for your onboarding and click **Proceed to build onboarding**.

<Zoom>
  <img src={require('./img/create-onboarding2.png').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '400px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

3. You will be redirected to the onboarding builder. 
   
   It contains a default demo template, which you can study to understand how onboardings collect data and how you can [personalize them using variables and quizzes](onboarding-user-engagement.md). Feel free to remove any screens you don't need and [design your own onboarding experience](design-onboarding.md) there.

<Zoom>
  <img src={require('./img/create-onboarding3.png').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

4. When ready, click the **Preview** button at the top right. Complete your onboarding flow yourself to ensure everything works as expected.
   <Zoom>
   <img src={require('./img/create-onboarding4.png').default}
   style={{
   border: '1px solid #727272', /* border width and color */
   width: '400px', /* image width */
   display: 'block', /* for alignment */
   margin: '0 auto' /* center alignment */
   }}
   />
   </Zoom>
5. If everything works fine, click **Publish** at the top right. Please wait until it is published before getting back to Adapty. Otherwise, your progress will be lost.
   <Zoom>
   <img src={require('./img/create-onboarding5.png').default}
   style={{
   border: '1px solid #727272', /* border width and color */
   width: '400px', /* image width */
   display: 'block', /* for alignment */
   margin: '0 auto' /* center alignment */
   }}
   />
   </Zoom>
After your onboarding is published, click **Back to Adapty**. Your onboarding is created, and you can add it to a placement to start using it.

## Step 2. Create a placement for your onboarding

1. Go to **Placements** from the main menu and switch to the **Onboardings** tab. Click **Create placement**.

   <Zoom>
   <img src={require('./img/create-onboarding6.png').default}
   style={{
   border: '1px solid #727272', /* border width and color */
   width: '400px', /* image width */
   display: 'block', /* for alignment */
   margin: '0 auto' /* center alignment */
   }}
   />
   </Zoom>

2. Enter the placement name and ID. Then, click **Run onboarding** and select an onboarding to show to all users.
3. If you have a separate onboarding prepared for a specific user group, [add more audiences](#audience) and select a different onboarding for them.

:::info
You can also run [A/B tests](ab-tests.md) to understand which onboarding works better.
:::

## Step 3. Integrate the onboarding into your app

:::important
Onboardings are available only for apps using Adapty iOS, Android, or Flutter SDK version 3.8.0 or higher.
:::

To start displaying onboardings in your app, [integrate them using Adapty SDK](onboarding-sdk.md).

