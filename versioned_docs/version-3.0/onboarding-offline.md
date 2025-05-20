---
title: "Offline mode"
description: "Handle trying to open an offboarding offline."
metadataTitle: "Handling Onboarding Offline Mode | Adapty Docs"
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

An internet connection is required to fetch the onboarding flow from the server. This is essential for retrieving the onboarding data and displaying the onboarding sequence and the paywall with products that follow. Both onboarding and paywall content are dynamically loaded from the server, ensuring they are always up-to-date.

## Offline mode

To optimize the user experience, the onboarding sequence is loaded this way:

- **Initial screen load**: Only the first screen of the onboarding flow is required to be loaded initially. This allows us to minimize load times, even on slower mobile connections such as 3G or 4G.
- **Preloading**: Once the first screen is loaded and displayed, we immediately start preloading the subsequent screens (including fonts, videos, images) in the background.

If a user loses internet connectivity during the onboarding process, they will encounter an error screen with two options:

- **Try again**: Upon tapping **Try again**, the system will reattempt to load the onboarding flow. If the connection is restored and the content is successfully loaded, the onboarding will resume from where the user left off, with all progress preserved.
- **Close**: If the user decides to close the onboarding, the [close](ios-handling-onboarding-events#closing-onboarding) event with `"action_id": "error"` will be triggered.

:::tip
You can [download and set up fallback onboardings](local-fallback-paywalls.md) to access local fallback onboardings when there is no internet connection.
:::

<Zoom>
  <img src={require('./img/onboarding_offline.png').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '300px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

