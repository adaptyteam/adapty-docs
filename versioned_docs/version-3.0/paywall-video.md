---
title: "Paywall hero video"
description: "Enhance paywalls with video content to boost engagement in Adapty."
metadataTitle: "Adding Video to Paywalls | Adapty Docs"
---



<!--- paywall-video.md --->

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

Adding a video clip to your paywall is a great way to engage users and increase conversions. Videos can explain your offers more clearly, highlight key features, and create a more dynamic, visually appealing experience that grabs attention.

:::note

To use the Paywall hero video, you’ll need a paid plan: Pro, Pro+, or Enterprise.
:::

<Zoom>
  <img src={require('./img/paywall-video-hands.gif').default}
  style={{
    width: '200px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

:::warning

Hero video is supported on Adapty SDK:

- iOS: starting with v3.1.0
- Android: starting with v3.1.1
- Flutter: starting with v3.2.0
- React Native: starting with v3.1.0
- Unity: starting with v3.3.0

If the video isn't supported or in fallback cases, the first frame of the video will be shown instead.

:::

Add the **Hero video** in place of the **Hero image** element:

1. First, switch to the video mode.

<Zoom>
  <img src={require('./img/add-paywall-video.webp').default}
  style={{
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

2. Then, drag and drop your video file into the **Video file** area.

<Zoom>
<img src={require('./img/drag-and-drop-video.webp').default}
  style={{
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

## Supported formats and specifications

| Specification     | Details      |
| ----------------- | ------------ |
| Supported formats | mp4 and webp |
| Minimum size      | 640х480      |
| Maximum length    | 30 sec       |

<!--- <Zoom>
  <img src={require('./img/paywall-video-config.png').default}
  style={{
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>
 -->
