---
title: "Onboarding buttons"
description: "Add buttons to navigate users between screens, close the onboarding or move to the paywall."
metadataTitle: "Onboarding buttons | Adapty Docs"
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';


Learn how to add and configure standard, animated, glossy, and countdown buttons in Adapty’s no‑code onboarding builder to guide users, drive conversions, and close your flow—without writing a single line of code.

## Add buttons

You can use a Pulse Button to draw attention and boost click‑through, or leverage a Countdown Button on trial‑expiration slides to create FOMO and increase upgrades.

To add a button:
1. Click **Add** at the top left.
2. Go to **Buttons** and choose one:
- **Button**: A basic button with a custom label.
- **Pulse Button**: A button with a subtle pulsing animation.
- **Glossy Button**: A button with a moving glossy line animation.
- **Pulse Glossy Button**: A pulsing button with a moving glossy line.
- **Countdown Button**: A button that shows a live countdown.
3. Select the button action from the **On Press** dropdown on the right:
- **Navigate**: moves the user to a specified onboarding screen.
- **Show/Hide element**: toggles the visibility of a target element.
- **Open paywall**: opens the paywall screen for purchases.
- **Scroll to**: scrolls the page to a specific element.
- **Custom**: executes your custom event logic.
- **Close onboarding**: ends and closes the onboarding flow.

To edit button text, click the button preview and make your edits in WYSIWYG mode.

:::tip
[Nest a popup](onboarding-layout.md#containers) with a Pulse Glossy Button to upsell premium features mid‑flow.
:::


<Zoom>
  <img src={require('./img/add-button.png').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

## Button customization

In addition to the basic [element layout](onboarding-layout.md#element-layout), you can further customize the appearance of buttons:

1. Select the button element on the left.
2. Go to **Styles** on the right menu.
3. Based on the button type, you can adjust the following options:
- **All buttons**: Width, padding, background, roundness, border, border color, shadows, next arrow and arrow size, and right offset, text or countdown color, font and line height.
- **Pulse Button**: Animation duration and easing, shadow color and size, button grow.
- **Glossy Button**: Glossy line color, width, angle and animation duration.
- **Pulse Glossy Button**: Animation duration and easing, shadow color and size, button grow, glossy line color, width, angle and animation duration.

<Zoom>
  <img src={require('./img/button-customize.png').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

