---
title: "Custom images and video in new Paywall Builder"
description: ""
metadataTitle: ""
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import Tabs from '@theme/Tabs'; import TabItem from '@theme/TabItem'; 

You can set up any image or video on a paywall, but sometimes you might want to display a custom image or video that’s personalized for the user — for example, a video with their chosen avatar. That’s where custom media comes in.

Custom media is an image or video that your app calls by ID from your code. It replaces a standard media file you’ve added to the paywall in the Paywall Builder.

:::info
To use this feature, update the Adapty SDK to version 3.7.0 or later.
:::

## Where can I use custom media?

Anywhere you’d normally use a regular image or video:

- As a hero image
- As a hero video
- As a regular icon
- In a card background
- In a carousel background

## How to use custom media?

<Zoom>
     <img src={require('./img/custom-image.webp').default}
     style={{
       border: '1px solid #727272', /* border width and color */
       width: '700px', /* image width */
       display: 'block', /* for alignment */
       margin: '0 auto' /* center alignment */
     }}
   />
   </Zoom>

1. Turn on the **Use custom media ID** or **Background image custom ID** toggle under the upload area. The toggle name depends on the media type you’re replacing.

2. Enter the media ID. For hero images and hero videos, the field already include a predefined ID. If that's the case, you can skip this step. Here’s an example of a predefined custom media ID:

   <Zoom>
     <img src={require('./img/custom-media-predefined-id.webp').default}
     style={{
       border: '1px solid #727272', /* border width and color */
       width: '700px', /* image width */
       display: 'block', /* for alignment */
       margin: '0 auto' /* center alignment */
     }}
   />
   </Zoom>

3. (optional) Upload a fallback image or video. This will be shown if the custom media can't be loaded — for example, if the Adapty SDK version is below 3.7.0 or the custom media ID isn't defined in your code.

4. Follow the SDK documentation [section on assets customization](https://adapty.io/docs/get-pb-paywalls#customize-assets) and call the media by its ID in your code. 