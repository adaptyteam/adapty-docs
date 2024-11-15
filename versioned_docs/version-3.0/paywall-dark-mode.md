---
title: "Paywall dark mode"
description: ""
metadataTitle: ""
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

Dark mode has become an essential feature for improving user experience in mobile apps, especially for users who spend long periods interacting with content. Most apps that support dark mode also choose to have two different versions of the paywall (light and dark) for consistency, and Adapty allows to do exactly that.

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
Dark mode is supported on iOS starting with version 3.1.0 and Android starting with version 3.1.1. Support for React Native, Flutter, and Unity is coming soon. Dark mode is also included in fallback paywalls.
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

4. Once you’ve switched to dark mode, you can adjust the elements as needed. Dark mode lets you use a different image or video, as well as separate color and background options.

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
