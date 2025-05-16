---
title: "Onboardings"
metadataTitle: "Overview of Onboardings in Adapty | Adapty Docs"
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import DocCardList from '@theme/DocCardList';

Good onboarding introduces new users to your mobile app's value, features, and usage tips. A clear onboarding experience boosts initial engagement, improves retention rates, and helps users get more value from your app.

## What it is for

   <Zoom>
   <img src={require('./img/onboardings1.webp').default}
   style={{
   border: '1px solid #727272', /* border width and color */
   width: '700px', /* image width */
   display: 'block', /* for alignment */
   margin: '0 auto' /* center alignment */
   }}
   />
   </Zoom>

Adapty's onboardings let your non-technical teams create attractive and customizable onboarding flows without coding. Our no-code builder helps you design a series of screens that guide users through their first app experience.

What makes Adapty's onboarding useful is the ability to [customize the user experience with interactive questions and use variables that personalize the user journey](onboarding-user-engagement.md).

This personalization helps each user quickly find value in your app, making them more likely to continue using your product.

You can also run A/B tests with different onboarding flows in Adapty to discover which versions perform better. This helps you refine your approach and create onboarding experiences that truly connect with users.

## Pricing

Onboardings are a paid feature in Adapty. Note the following about the pricing:

- Onboardings are free for apps with less than $5000 MTR (monthly tracked revenue).
- Using onboardings costs 0.2% of the MTR for all the other apps.
- You can test onboardings in the sandbox freely. You start getting billed only after the first transaction in the production environment.

## How it works

To launch your onboarding:

1. [Design an onboarding in the no-code editor.](design-onboarding.md)
2. [Create a placement for the onboarding.](create-onboarding#create-a-placement-for-your-onboarding)
3. [Integrate the onboarding with your project using the Adapty SDK.](onboarding-sdk.md)
4. Test the onboarding and release it for your users.

To grow further, you can also try more advanced ways to work with onboardings:

- Add more audiences to the placement to show different onboardings to different user groups.
- Run A/B tests of onboardings to find the most efficient option.
- Connect onboardings to paywalls and increase the conversion.