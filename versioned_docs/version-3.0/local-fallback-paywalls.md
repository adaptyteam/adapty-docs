---
title: "Download fallback paywalls & onboardings"
description: "Use local fallback paywalls in Adapty to ensure seamless subscription flows."
metadataTitle: "Using Local Fallback Paywalls | Adapty Docs"
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import Details from '@site/src/components/Details';

Typically, [paywalls](paywalls.md) and [onboardings](onboardings.md) are fetched from the server when a customer accesses them. 

Adapty allows you to define fallback paywalls and onboardings for the situations when a user opens the app without a connection to the Adapty backend (e.g., no internet connection or in the rare case of backend unavailability) and there's no cache on the device.

Adapty generates fallbacks as a JSON file in the necessary format, reflecting the default (English) versions of the paywalls you've configured in the Adapty Dashboard. Simply download the file - one per app store, place it alongside your app on the user's device, and pass its contents to the `.setFallback` method, following the instructions outlined below.

<details>
   <summary>Before you start adding local fallback paywalls and onboardings (Click to Expand)</summary>

   1. For paywalls: [Create products](create-product) you want to sell.
2. Create [paywalls](paywalls.md) and/or [onboardings](onboardings.md).
3. [Create placements and add paywalls and onboardings to the placements](create-placement). Placement is the location where the paywall/onboarding will be shown.
</details>

To download the JSON file with the fallback paywalls and onboardings, open **[Placements](https://app.adapty.io/placements)** in the Adapty main menu. Click the **Fallbacks** button. You will get the JSON file. [Use its contents in the `.setFallback` method in your mobile app code](use-fallback-paywalls).

   
<Zoom>
  <img src={require('./img/9c63367-placements.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>



