---
title: "Connect paywalls to onboardings"
metadataTitle: "Connect paywalls to onboardings in Adapty | Adapty Docs"
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import Contentid from '@site/src/components/InlineTooltip';
import InlineTooltip from '@site/src/components/InlineTooltip';

You can set up a seamless transition from onboardings to paywalls, so that onboardings not only improve the user experience and retention but also generate revenue for you.

There are two ways to connect paywalls to onboardings:

- **Showing a paywall after onboarding**: Implement opening a paywall after onboarding is closed.
- **Showing a paywall inside onboarding**: Trigger opening a paywall on tapping a button.

Before you start, create a [paywall](paywalls.md) and [onboarding](onboardings.md) and add them to placements.

:::important
You need two different placements: one for a paywall and another for an onboarding. Ensure you use proper placement IDs when getting onboarding and paywall in your code.
:::

## Show paywall after onboarding

To show a paywall after onboarding, you only need to handle an event generated each time users close the onboarding.

As soon as users close onboarding, the [event](ios-handling-onboarding-events#closing-onboarding) is triggered. So, if you want to display a paywall after your onboarding immediately, you can implement <InlineTooltip tooltip="getting and displaying a paywall">[iOS](ios-present-paywalls.md), [Android](android-present-paywalls.md), [Flutter](flutter-present-paywalls.md), [React Native](react-native-present-paywalls.md), and [Unity](unity-present-paywalls.md)</InlineTooltip> as a reaction to the event.

## Show paywall inside onboarding


1. In the onboarding builder, create a button that will redirect users to the paywall. Select **Open paywall** as its action.

2. You can assign any action ID to the button and use it to identify the paywall you need to open. However, the easiest way to open paywalls from onboardings is to make the action ID equal to a placement ID. This way, you can get and display paywalls right away without hardcoding placement IDs. 

   To do this, go to the Adapty dashboard and find the paywall's placement ID. In the builder, paste the paywall placement ID in the ID field.

 <Zoom>
   <img src={require('./img/get-paid-in-onboardings2.png').default}
   style={{
   border: '1px solid #727272', /* border width and color */
   width: '700px', /* image width */
   display: 'block', /* for alignment */
   margin: '0 auto' /* center alignment */
   }}
   />
   </Zoom>

   3. Now, when you have this button, each time your users tap it, it will generate an action containing the action ID. 

   To handle this action in your app code, you will need to [get the paywall](fetch-paywalls-and-products.md) and then [display it](ios-quickstart-paywalls.md).