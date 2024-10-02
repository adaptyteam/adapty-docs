---
title: "Paywall Video"
description: ""
metadataTitle: ""
---



<!--- paywall-video.md --->

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

Adding a video clip to your paywall can be a powerful way to engage users and boost conversions. Videos help explain your offers more clearly, highlight key features, and create a more dynamic, visually appealing experience that captures attention.

<Zoom>
  <img src={require('./img/paywall-video-hands.gif').default}
  style={{
    width: '200px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

Add it instead of the picture in the Hero image element:

<Zoom>
  <img src={require('./img/add-paywall-video.png').default}
  style={{
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

You can upload a video either as a file or as a URL. If you are going to upload the file via a link, please place the file on the sites that can provide a direct link to the file rather than the link to the built-in editor/viewer. That is the format of the link should be: `https://example-domain.com/folders/filename.mp4`. Services like Google Cloud and Amazon Cloud provide the correct format, but you can use any platform or your own storage as long as it meets this requirement.

:::info

Video is supported on iOS starting with version 3.0.1. Support for Android, React Native, Flutter, and Unity is coming soon. If the video isn't supported or in fallback cases, the first frame of the video will be shown instead.

:::

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
