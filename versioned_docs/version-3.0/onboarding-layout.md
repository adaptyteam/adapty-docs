---
title: "Onboarding layout"
description: "Adapty onboarding builder: containers for layout, tweak element spacing and style."
metadataTitle: "Onboarding layout | Adapty Docs"
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

The no-code mobile app onboarding builder offers two layout layers: 
- Screen layout: global padding and grid via containers.
- Element layout: per-element spacing, position, borders, and shadows.

## Screen layout
You can adjust a screen in two ways:
- [Using screen style settings](#screen-style-settings)
- [Using containers](#containers)

### Screen style settings
To adjust the space between elements and the screen edge:
1. Select the screen on the left.
2. Go to the **Styles** tab on the right.
3. Set the top, bottom, and horizontal padding in the **Padding** section.

<Zoom>
  <img src={require('./img/screen-layout.png').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

### Containers
Containers create flexible grids or side-by-side layouts and hold other elements such as typography or media.

To add a container:
1. Click **Add** at the top left.
2. Go to **Containers** and choose one:
- **Columns**: Splits the screen into equal vertical sections so you can place elements side-by-side (e.g., two-column text or image-plus-copy layouts).
- **Rows**: Lays out several elements in one horizontal band, keeping them aligned and evenly spaced.
- **Carousel**: Holds a set of cards in a swipeable gallery, letting users flip through multiple pieces of content without leaving the current screen.
- **Popup**: Displays content inside a centred overlay that floats above the page, great for attention-grabbing promos or notices.
3. Create the elements you want to hold, then drag&drop them into the container from the left menu.

<Zoom>
  <img src={require('./img/containers.gif').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

## Element layout
To adjust each element individually:
1. Select the element on the left.
2. Go to **Styles** on the right menu.
3. In the **Container** section set:
- **Offset**: Shifts the element horizontally or vertically.
- **Position**: Sets the element's anchor point (**Attached**, **In content**, **Attached on scroll**).
- **Padding**: Defines the inner space between the element's content and its border.
- **Background**: Applies a solid color behind the element. Ensure your element background matches the [screen background](#screen-background-customization) (e.g., use grey or black for onboardings with mostly dark screens).
- **Roundness**: Determines the radius of the element's corners.
- **Border**: Adds a stroke around the element and specifies its thickness.
- **Border Color**: Specifies the color of the element's border.
- **Add shadows**: Adds a single drop shadow with configurable offset, blur/spread, and color.

:::note
In addition to these basic element layout settings, you can further customize the appearance of specific elements like [media](onboarding-media.md#media-customization), [text](onboarding-text.md#text--list-customization), [buttons](onboarding-buttons.md#button-customization), [quizzes](onboarding-quizzes.md#quiz-customization) and others using the **Styles** tab for the element.
:::


<Zoom>
  <img src={require('./img/element-layout.png').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

## Screen background customization

The background affects not only your onboarding design but also the loading screen until the onboarding is fully loaded.

You can fill your onboarding background with a color or upload an image/video:

1. Select the screen on the left.
2. Go to the **Styles** tab on the right.
3. In the **Background** section, select a background color or click the upload area to upload an image/video.

For media uploads, follow the [supported formats and size](onboarding-media.md#supported-formats-and-size) requirements.

:::tip
For smooth screen transitions, choose a background color that matches your overall onboarding design (e.g., use grey or black for onboardings with mostly dark screens) or customize the [splash screen](ios-present-onboardings#add-smooth-transitions-between-the-splash-screen-and-onboarding).
:::

