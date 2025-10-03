---
title: "Onboarding media"
description: "Create engaging Adapty onboarding flows with images, videos, animated charts, and custom backgrounds."
metadataTitle: "Onboarding media | Adapty Docs"
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

Rich media elements help you create engaging onboarding experiences that demonstrate your app's value and guide users toward conversion. Use images and videos to showcase features, animated charts to visualize benefits, and strategic backgrounds to reinforce your brand.

## Images and videos

Images and videos are perfect for feature previews and app tours. Showing users what they'll unlock is more effective than describing it.

To upload media:

1. Click **Add** at the top left.
2. Go to **Media & Display** and choose **Image/Video**.
3. Click the upload area on the right and select your image or video to upload.

<Zoom>
  <img src={require('./img/onboarding-media.gif').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

### Supported formats and size

| Specification     | Details                          |
|-------------------|----------------------------------|
| Extensions        | PNG, JPG, JPEG, WEBP, MP4, WEBM  |
| Maximum file size | 15 MB                            |

If you want to add an unsupported animated element (like Lottie), you can convert it to a video (for example, with [this tool](https://www.lottielab.com/lottie-to-video)) and embed it as a video.

## Animated charts

Charts are animations that visualize results and personalize the user experience in your onboardings. To add a chart:

1. Click **Add** at the top left.
2. Go to **Media & Display** and choose **Chart**.
3. Customize your chart on the right:
   - **Type**: Choose a curve type. Note that the curve type is not directly connected to the values.
   - **Left** and **Right badges**: Name the initial and final points of the chart.
   - **X Labels** and **Date Range**: By default, the X-axis displays dates. You can customize the date range or specify custom values.
   - **Animation Duration**: Set the animation duration to fit your design.

:::tip
Use [variables](onboarding-variables.md) for dynamic data visualization in charts.
:::

<Zoom>
  <img src={require('./img/chart-onboarding.png').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

## Media customization

In addition to the basic [element layout](onboarding-layout.md#element-layout), you can further customize the appearance of images, videos, and charts:

1. Select the element on the left.
2. Go to **Styles** on the right menu.
3. Based on the element type, you can adjust the following options:
   - **Image/video**: Width, height, roundness, opacity, alignment.
   - **Chart**: Line color and width, badge padding, roundness, font and color, X-axis font and color.

## Delete media

You can delete the entire media element or just the file to upload a new one:

- **Delete media element**: Right-click the media element on the left and select **Delete**.
- **Delete media file**: Click the media preview on the right. The upload area for your new file will appear.

<Zoom>
  <img src={require('./img/onboarding-delete.gif').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

