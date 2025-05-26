---
title: "Paywall dark mode"
description: "Enable dark mode for paywalls in Adapty to improve user experience."
metadataTitle: "Enabling Paywall Dark Mode | Adapty Docs"
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

Dark mode has become an essential feature for improving user experience in mobile apps, especially for users who spend long periods interacting with content. Most apps that support dark mode also choose to have two different versions of the paywall (light and dark) for consistency, and Adapty allows doing exactly that. 

When dark mode is enabled, the paywall automatically matches the device’s current mode: it shows the light version if the device is in light mode, and the dark one if it’s in dark mode.

:::note

To use the Paywall dark mode, you’ll need a paid plan: Pro, Pro+, or Enterprise.

:::

<Zoom>
  <img src={require('./img/darkmode.webp').default}
  style={{
    border: 'none', /* border width and color */
    width: '400px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>
:::warning

Dark mode is supported:

- iOS: starting with v3.1.0
- Android: starting with v3.1.1
- Flutter: starting with v3.2.0
- React Native: starting with v3.1.0
- Unity: starting with v3.3.0

It’s also available in fallback paywalls.

:::
  To set up dark mode for your paywall:

1. First, enable dark mode in the paywall’s **Layout settings**:

<Zoom>
  <img src={require('./img/dark-mode.webp').default}
  style={{
    border: 'none', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

2. Now, you can configure light and dark modes separately. To switch to dark mode, turn on the **Dark Mode** toggle in the left paywall menu:

<Zoom>
     <img src={require('./img/dark-mode-switch.webp').default}
     style={{
       border: 'none', /* border width and color */
       width: '700px', /* image width */
       display: 'block', /* for alignment */
       margin: '0 auto' /* center alignment */
     }}
     />
     </Zoom>

3. Once you’ve switched to dark mode, you can adjust the elements as needed. Dark mode lets you use a different image or video, as well as separate color and background options.

<Zoom>
  <img src={require('./img/dark-mode-done.webp').default}
  style={{
    border: 'none', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
  />
  </Zoom>
