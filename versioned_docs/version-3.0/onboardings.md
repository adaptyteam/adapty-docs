---
title: "Onboardings"
metadataTitle: "Overview of Onboardings in Adapty | Adapty Docs"
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

Adapty's onboardings let your non-technical teams create attractive and customizable onboarding flows without coding. Our no-code builder helps you design a series of screens that guide users through their first app experience.

:::important
Onboardings are currently available only for apps using Adapty iOS or Android SDK version 3.8.0 or higher. Support for React Native, Flutter, and Unity SDKs is coming soon.
:::

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

Good onboarding introduces users to your app by:
- Showing your app's core value 
- Explaining key features and functionality
- Providing essential usage tips

Adapty's onboarding solution stands out with:
- No-code onboarding builder that empowers non-technical teams
- The ability to [personalize experiences through interactive questions and variables](onboarding-user-engagement.md)
- A/B testing support to determine which onboarding flows perform best

## Pricing

Onboardings are a paid feature in Adapty. Note the following about the pricing:

- Using onboardings costs 0.2% of the MTR for all the other apps.
- You can test onboardings in the sandbox freely. You start getting billed only after the first transaction in the production environment.

## How it works

To launch your onboarding:

1. [Design an onboarding in the no-code editor.](design-onboarding.md)
2. [Create a placement for the onboarding.](https://adapty.io/docs/create-onboarding#create-a-placement-for-your-onboarding)
3. [Integrate the onboarding with your project using the Adapty SDK.](onboarding-sdk.md)
4. Test the onboarding and release it for your users.

To grow further, you can also try more advanced ways to work with onboardings:

- Add more audiences to the placement to show different onboardings to different user groups.
- Run A/B tests of onboardings to find the most efficient option.
- Connect onboardings to paywalls and increase the conversion.