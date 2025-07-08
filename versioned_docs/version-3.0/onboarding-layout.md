---
title: "Onboarding layout"
description: "Adapty onboarding builder: containers for layout, tweak element spacing and style."
metadataTitle: "Onboarding layout | Adapty Docs"
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

The no-code mobile app onboarding builder gives you two layout layers: 
- Screen layout: global padding and grid via containers.
- Element layout: per-element spacing, position, borders, and shadows.

## Screen layout
Adjust a screen in two ways:
- [Using screen style settings](#screen-style-settings)
- [Using containers](#containers)

### Screen style settings
Tweak the space between elements and the screen edge:
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

After adding a container, create the elements you want, then drag them into the container from the left menu.

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
Adjust each element on its own:
1. Select the element on the left.
2. Go to **Styles** on the right menu.
3. In the **Container** section set:
- **Offset**: shifts the element horizontally and/or vertically.
- **Position**: sets the element’s anchor point (**Attached**, **In content**, **Attached on scroll**).
- **Padding**: defines the inner space between the element’s content and its border.
- **Background**: applies a solid color behind the element.
- **Roundness**: determines the radius of the element’s corners.
- **Border**: adds a stroke around the element and specifies its thickness.
- **Border Color**: specifies the color of the element’s border.
- **Add shadows**: adds a single drop shadow with configurable offset, blur/spread, and color.

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
