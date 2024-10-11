---
title: "Paywall Video"
description: ""
metadataTitle: ""
---



<!--- paywall-video.md --->

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

Adding a video clip to your paywall is a great way to engage users and increase conversions. Videos can explain your offers more clearly, highlight key features, and create a more dynamic, visually appealing experience that grabs attention.

<Zoom>
  <img src={require('./img/paywall-video-hands.gif').default}
  style={{
    width: '200px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

:::info

Video is supported on iOS starting with version 3.1.0. Support for Android, React Native, Flutter, and Unity is coming soon. If the video isn't supported or in fallback cases, the first frame of the video will be shown instead.

:::

Add the video in place of the **Hero image** element:

1. First, switch to video mode.

<Zoom>
  <img src={require('./img/add-paywall-video.webp').default}
  style={{
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

1. Then, drag and drop your video file into the **Video file** area.

<Zoom>
<img src={require('./img/drag-and-drop-video.webp').default}
  style={{
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>


## Supported Formats and Specifications

| Specification     | Details                                                      |
| ----------------- | ------------------------------------------------------------ |
| Supported formats | <ul><li> mp4</li><li> webm</li><li> mov</li><li> avi</li><li> gif</li></ul> |
| Minimum size      | 640х480                                                      |
| Maximum length    | 30 sec                                                       |

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
